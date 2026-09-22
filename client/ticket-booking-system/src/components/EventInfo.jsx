import React from "react";

const EventInfo = ({ event }) => {
  return (
    <div className="rounded-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-white">
          {event.event}
        </h2>

        <span className="shrink-0 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
          Event
        </span>
      </div>

      <div className="space-y-3 border-t border-slate-800 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Venue
          </p>
          <p className="mt-1 text-sm font-medium text-slate-200">
            {event.venue}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Location
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {event.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
