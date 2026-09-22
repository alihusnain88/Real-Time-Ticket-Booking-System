import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getEvent, getEventSeats } from "../api/eventsApi";
import EventInfo from "../components/EventInfo";
import ReadOnlySeatsList from "../components/ReadOnlySeatsList";
import { bookEvent } from "../api/bookingsApi";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSeatsIDs = location.state.selectedSeatsIDs;

  const [event, setEvent] = useState({});
  const [seats, setSeats] = useState([]);
  const [booking, setBooking] = useState(null);

  const selectedSeats = seats.filter((seat) =>
    selectedSeatsIDs.includes(seat.seat_id)
  );

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEvent(id);
      setEvent(fetchedEvent);
    };

    const fetchSeats = async (id) => {
      const fetchedSeats = await getEventSeats(id);
      setSeats(fetchedSeats);
    };

    fetchEvent(id);
    fetchSeats(id);
  }, [id]);

  const handleBooking = async () => {
    const bookingDetails = await bookEvent(id, selectedSeatsIDs);
    setBooking(bookingDetails);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            Confirm Booking
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Review Your Booking
          </h1>

          <p className="mt-3 text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Review
            your event and selected seats before confirming your reservation.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
          <EventInfo event={event} />

          <div className="my-8 border-t border-slate-800" />

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Selected Seats
            </h3>

            <ReadOnlySeatsList seats={selectedSeats} />
          </div>

          {!booking && (
            <button
              onClick={handleBooking}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Confirm Booking
            </button>
          )}
        </div>

        {booking && (
          <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 text-2xl">
              ✓
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Booking Confirmed! 🎉
            </h2>

            <p className="mt-2 text-slate-400">
              Your reservation has been successfully created.
            </p>

            <div className="mx-auto mt-6 max-w-md space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-left">
              <p className="text-sm text-slate-400">
                Booking ID
                <span className="float-right font-semibold text-white">
                  #{booking.booking}
                </span>
              </p>

              <p className="text-sm text-slate-400">
                Event
                <span className="float-right font-semibold text-white">
                  {booking.event.name}
                </span>
              </p>

              <p className="text-sm text-slate-400">
                Seats
                <span className="float-right font-semibold text-blue-400">
                  {booking.seats.join(", ")}
                </span>
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-7 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              Back To Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Booking;
