import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getEventSeats } from "../api/eventsApi";
import EventInfo from "../components/EventInfo";
import ShowSeats from "../components/ShowSeats";
import SeatSelection from "../components/SeatSelection";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEvent(id);
      setEvent(fetchedEvent);
    };

    const fetchSeats = async (id) => {
      const fetchedSeats = await getEventSeats(id);
      setSeats(fetchedSeats);
    };

    fetchEvent();
    fetchSeats(id);
  }, [id]);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">
            Event Details
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {event.event || "Loading event..."}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Choose
            your preferred seats below and continue to secure your booking.
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <EventInfo event={event} />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Select Your Seats
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Choose from the available seats. Sold seats cannot be selected.
            </p>
          </div>

          <SeatSelection seats={seats} eventID={id} />
        </div>

      </div>
    </div>
  );
};

export default EventDetails;
