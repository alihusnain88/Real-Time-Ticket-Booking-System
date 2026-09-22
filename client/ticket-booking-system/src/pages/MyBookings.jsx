import React, { useEffect, useState } from "react";
import { deleteBooking, getMyBookings } from "../api/bookingsApi";
import BookingInfo from "../components/BookingInfo";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await getMyBookings();
      setBookings(bookings);
    };
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    await deleteBooking(id);
    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.booking_id !== id)
    );
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-950 px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
            Your Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Manage
            your reservations and keep track of your upcoming events.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {bookings.map((booking) => (
            <BookingInfo
              booking={booking}
              onDeleteBooking={handleDeleteBooking}
            />
          ))}
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

export default MyBookings;
