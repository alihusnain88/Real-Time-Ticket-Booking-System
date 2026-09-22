// import pool from "../config/db.js";

// const createBooking = async (req, res) => {
//     try {
//         const user = req.user;

//         const { eventID, seatIDs } = req.body;

//         if (!eventID || !seatIDs || seatIDs.length === 0) {
//             return res.status(400).json({
//                 message: "Event and seats are required"
//             });
//         }

//         // Get event
//         const eventInfo = await pool.query(
//             "SELECT * FROM events WHERE id = $1",
//             [eventID]
//         );

//         if (eventInfo.rows.length === 0) {
//             return res.status(404).json({
//                 message: "Event not found"
//             });
//         }

//         const event = eventInfo.rows[0];

//         // Get seats
//         const seatsInfo = await pool.query(
//             "SELECT * FROM seats WHERE id = ANY($1)",
//             [seatIDs]
//         );

//         if (seatsInfo.rows.length !== seatIDs.length) {
//             return res.status(400).json({
//                 message: "One or more seats are invalid"
//             });
//         }

//         const seats = seatsInfo.rows;

//         const bookingInfo = await pool.query(
//             `INSERT INTO bookings (user_id, event_id) VALUES ($1, $2)
//             RETURNING (id)`, [user.id, eventID]
//         );

//         const bookingID = bookingInfo.rows[0].id;

//         for(const seatID of seatIDs){
//             await pool.query(
//                 `INSERT INTO booking_seats (booking_id, seat_id)
//                 VALUES ($1, $2)`, [bookingID, seatID]
//             )
//         }

//         return res.status(200).json({
//             message: "Booking data is valid",
//             bookingDetails: {
//                 name: user.name,
//                 eventDetails: {
//                     id: event.id,
//                     name: event.name
//                 },
//                 seats: seats
//             }
//         });

//     } catch (err) {
//         return res.status(500).json({
//             message: err.message
//         });
//     }
// };

// export { createBooking };

import pool from "../config/db.js";

const createBooking = async (req, res) => {
    const client = await pool.connect();

    try {
        const user = req.user;
        const { eventID, seatIDs } = req.body;

        if (!eventID || !seatIDs || seatIDs.length === 0) {
            return res.status(400).json({
                message: "Incomplete data"
            });
        }

        await client.query("BEGIN");

        // Get event
        const eventInfo = await client.query(
            `SELECT *
             FROM events
             WHERE id = $1`,
            [eventID]
        );

        if (eventInfo.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                message: "Event doesn't exist"
            });
        }

        const event = eventInfo.rows[0];

        // Get physical seats
        const seatsInfo = await client.query(
            `SELECT *
             FROM seats
             WHERE id = ANY($1)`,
            [seatIDs]
        );

        if (seatsInfo.rows.length !== seatIDs.length) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                message: "One or more seats are invalid"
            });
        }

        const seats = seatsInfo.rows;

        // Make sure seats belong to the event's venue
        const allSeatsValid = seats.every(
            (seat) => seat.venue_id === event.venue_id
        );

        if (!allSeatsValid) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                message: "One or more seats do not belong to this event's venue"
            });
        }

        // Check event-specific seat availability
        // FOR UPDATE locks these rows until COMMIT/ROLLBACK
        const eventSeatsInfo = await client.query(
            `SELECT *
             FROM event_seats
             WHERE event_id = $1
             AND seat_id = ANY($2)
             FOR UPDATE`,
            [eventID, seatIDs]
        );

        if (eventSeatsInfo.rows.length !== seatIDs.length) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                message: "One or more seats are not available for this event"
            });
        }

        const allSeatsAvailable = eventSeatsInfo.rows.every(
            (seat) => seat.status === "available"
        );

        if (!allSeatsAvailable) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                message: "One or more seats are already booked or held"
            });
        }

        // Create booking
        const bookingInfo = await client.query(
            `INSERT INTO bookings (user_id, event_id)
             VALUES ($1, $2)
             RETURNING id`,
            [user.id, eventID]
        );

        const bookingID = bookingInfo.rows[0].id;

        // Add seats to booking
        for (const seatID of seatIDs) {
            await client.query(
                `INSERT INTO booking_seats (booking_id, seat_id)
                 VALUES ($1, $2)`,
                [bookingID, seatID]
            );
        }

        // Mark seats as sold
        await client.query(
            `UPDATE event_seats
             SET status = 'sold'
             WHERE event_id = $1
             AND seat_id = ANY($2)`,
            [eventID, seatIDs]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            message: "Booking successful",
            bookingDetails: {
                name: user.name,
                booking: bookingID,
                event: {
                    id: event.id, 
                    name: event.name
                },
                seats: seatIDs
            }
        });

    } catch (err) {
        await client.query("ROLLBACK");

        return res.status(500).json({
            message: err.message
        });

    } finally {
        client.release();
    }
};


const getBookings = async (req, res) => {
    try{
        const user = req.user;
        const bookingsInfo = await pool.query(
            `SELECT
            b.id AS booking_id,
            e.name AS event_name,
            v.name AS venue_name,
            e.starts_at,
            ARRAY_AGG(s.seatnumber ORDER BY s.id) AS seats
        FROM bookings b
        JOIN events e
            ON b.event_id = e.id
        JOIN venues v
            ON v.id = e.venue_id
        JOIN booking_seats bs
            ON bs.booking_id = b.id
        JOIN seats s
            ON s.id = bs.seat_id
        WHERE b.user_id = $1
        GROUP BY
            b.id,
            e.name,
            v.name,
            e.starts_at
        ORDER BY b.created_at DESC;`, [user.id]
        )

        const bookings = bookingsInfo.rows;

        res.status(200).json({
            message: "Bookings fetched successfully",
            bookings
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    } 
}


const deleteBooking = async (req, res) => {
    const client = await pool.connect();

    try {
        const user = req.user;
        const bookingID = req.params.id;

        await client.query("BEGIN");

        // Find booking
        const bookingInfo = await client.query(
            `SELECT *
             FROM bookings
             WHERE id = $1`,
            [bookingID]
        );

        if (bookingInfo.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const booking = bookingInfo.rows[0];

        // Verify booking belongs to this user
        if (booking.user_id !== user.id) {
            await client.query("ROLLBACK");

            return res.status(403).json({
                message: "You are not allowed to delete this booking"
            });
        }

        // Get seats belonging to this booking
        const bookingSeatsInfo = await client.query(
            `SELECT seat_id
             FROM booking_seats
             WHERE booking_id = $1`,
            [bookingID]
        );

        const seatIDs = bookingSeatsInfo.rows.map(
            (seat) => seat.seat_id
        );

        // Make the event seats available again
        await client.query(
            `UPDATE event_seats
             SET status = 'available'
             WHERE event_id = $1
             AND seat_id = ANY($2)`,
            [booking.event_id, seatIDs]
        );

        // Delete booking-seat relationships
        await client.query(
            `DELETE FROM booking_seats
             WHERE booking_id = $1`,
            [bookingID]
        );

        // Delete booking
        await client.query(
            `DELETE FROM bookings
             WHERE id = $1`,
            [bookingID]
        );

        await client.query("COMMIT");

        return res.status(200).json({
            message: "Booking deleted successfully"
        });

    } catch (err) {
        await client.query("ROLLBACK");

        return res.status(500).json({
            message: err.message
        });
    } finally {
        client.release();
    }
};





export { createBooking, getBookings, deleteBooking};