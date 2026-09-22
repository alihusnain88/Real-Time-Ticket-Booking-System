import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEvents } from "../api/eventsApi.js";
import EventInfo from "../components/EventInfo.jsx";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">
            Discover
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Upcoming Events
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore
            upcoming experiences and find the perfect event for your next outing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            return (
              <div
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-800"
              >
                <EventInfo event={event} />
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            ← Back To Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Events;
