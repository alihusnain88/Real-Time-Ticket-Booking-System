import { useNavigate } from "react-router-dom";

const SeatSelectionSummary = ({
  eventID,
  seats,
  selectedSeatsIDs,
  showSummary,
}) => {
  const navigate = useNavigate();

  const seatsToShow = seats.filter((seat) => {
    return selectedSeatsIDs.includes(seat.seat_id);
  });

  return (
    <div
      hidden={!showSummary}
      className="mt-8 rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-xl"
    >
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
          Booking Summary
        </p>

        <h3 className="mt-1 text-xl font-bold text-white">
          Your Selected Seats
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Review your seats before continuing with your booking.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {seatsToShow.map((seat) => {
          return (
            <span
              key={seat.seat_id}
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-400"
            >
              {seat.seat_number}
            </span>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">
        <span className="text-sm text-slate-400">
          Total Seats
        </span>

        <span className="text-lg font-bold text-white">
          {selectedSeatsIDs.length}
        </span>
      </div>

      <button
        onClick={() => {
          navigate(`/events/${eventID}/booking`, {
            state: {
              selectedSeatsIDs,
            },
          });
        }}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
      >
        Continue to Booking →
      </button>
    </div>
  );
};

export default SeatSelectionSummary;
