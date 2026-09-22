import pool from '../config/db.js';
import Event from '../models/Event.js';
import Seat from '../models/Seat.js';


const getAllEvents = async (req, res) => {
    const eventsInfo = await pool.query(
        `select e.id as id, e.name as event, v.name as venue, v.location as location, e.starts_at as "startsAt" from events e 
        join venues v on v.id = e.venue_id;`
    )
    if(eventsInfo.rows.length === 0){
        return res.status(404).json({
            message: "No events found"
        })
    }

    const events = eventsInfo.rows;

    res.status(200).json({
        message: "Events fetched successfully",
        events
    })
}

const getEvent = async (req, res) => {
    const eventID = req.params.id;
    const eventInfo = await pool.query(
        `select e.id as id, e.name as event, v.name as venue, v.location as location, e.starts_at as "startsAt"
        from events e join venues v on v.id = e.venue_id where e.id = $1;`, [eventID]
    )
    if(eventInfo.rows.length === 0){
        return res.status(404).json({
            message: "Invalid event"
        })
    }

    const event = eventInfo.rows[0];

    res.status(200).json({
        message: "Event fetched successfully",
        event
    })
}

const getEventSeats = async (req, res) => {
    const eventID = req.params.id;
    const seatsInfo = await pool.query(
        `SELECT
        e.id AS event_id,
        e.name AS event_name,
        v.name AS venue_name,
        s.id AS seat_id,
        s.seatnumber AS seat_number,
        s.row,
        es.status
        FROM events e
        JOIN venues v
            ON v.id = e.venue_id
        JOIN event_seats es
            ON es.event_id = e.id
        JOIN seats s
            ON s.id = es.seat_id
        WHERE e.id = $1;`, [eventID]
    )
    if(seatsInfo.rows.length === 0){
        return res.status(404).json({
            message: "Invalid event"
        })
    }
    const seats = seatsInfo.rows;
    res.status(200).json({
        message: "Seats fetched successfully",
        seats
    })
}

export {getAllEvents, getEventSeats, getEvent};