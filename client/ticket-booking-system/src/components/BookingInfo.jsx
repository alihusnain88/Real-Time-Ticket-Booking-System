import React from "react";

const BookingInfo = ({ booking, onDeleteBooking }) => {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-slate-700 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Booking
          </p>

          <p className="mt-1 text-sm text-slate-500">
            ID: #{booking.booking_id}
          </p>
        </div>

        <button
          onClick={() => onDeleteBooking(booking.booking_id)}
          className="rounded-lg border border-red-500/30 px-3 py-2 text-sm font-medium text-red-400 transition hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-300"
        >
          Delete
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {booking.event_name}
        </h2>

        <div className="mt-3 space-y-1">
          <p className="text-sm text-slate-300">
            <span className="font-medium text-slate-500">Venue:</span>{" "}
            {booking.venue_name}
          </p>

          <p className="text-sm text-slate-400">
            <span className="font-medium text-slate-500">Starting:</span>{" "}
            {booking.starts_at}
          </p>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Seats
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {booking.seats.map((seat) => (
            <span
              key={seat}
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-400"
            >
              {seat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
