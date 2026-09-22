import React, { useState } from "react";
import SeatSelectionSummary from "./SeatSelectionSummary";

const ShowSeats = ({ eventID, seats, selectedSeats, onSeatClick }) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-5 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          Available
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
          Selected
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          Sold
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seat_id);
          const isSold = seat.status === "sold";

          return (
            <div
              key={seat.seat_id}
              onClick={() => {
                if (!isSold) {
                  onSeatClick(seat.seat_id);
                }
              }}
              className={`rounded-xl border-2 p-4 text-center transition duration-200 ${
                isSelected
                  ? "cursor-pointer border-blue-500 bg-blue-500/15 shadow-lg shadow-blue-500/10"
                  : isSold
                    ? "cursor-not-allowed border-red-500/40 bg-red-500/10 opacity-60"
                    : "cursor-pointer border-green-500/50 bg-green-500/10 hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-500/15"
              }`}
            >
              <div
                className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : isSold
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {seat.seat_number}
              </div>

              <h3 className="font-semibold text-white">
                Seat {seat.seat_number}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Row {seat.row}
              </p>

              <p
                className={`mt-3 text-xs font-semibold uppercase tracking-wide ${
                  isSelected
                    ? "text-blue-400"
                    : isSold
                      ? "text-red-400"
                      : "text-green-400"
                }`}
              >
                {isSelected ? "Selected" : seat.status}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowSummary(true)}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
        >
          Done
        </button>
      </div>

      <SeatSelectionSummary
        eventID={eventID}
        seats={seats}
        selectedSeatsIDs={selectedSeats}
        showSummary={showSummary}
      />
    </div>
  );
};

export default ShowSeats;