import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
        
        <span className="mb-5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          Your Events. Your Seats. Your Experience.
        </span>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Book Your Next
          <span className="text-blue-500"> Experience</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere, libero at tincidunt facilisis, justo ipsum consequat
          mauris, vitae tincidunt justo neque at erat.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/events")}
            className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/30"
          >
            Explore Events
          </button>

          <button
            onClick={() => navigate("/myBookings")}
            className="rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
          >
            My Bookings
          </button>
        </div>

        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-3 text-2xl">🎟️</div>
            <h3 className="font-semibold text-white">Easy Booking</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-3 text-2xl">💺</div>
            <h3 className="font-semibold text-white">Choose Your Seat</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-3 text-2xl">⚡</div>
            <h3 className="font-semibold text-white">Instant Confirmation</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
