import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth");
  };

  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4 shadow-lg">
      <Link
        to="/"
        className="text-2xl font-bold tracking-tight text-white transition hover:text-blue-400"
      >
        Ticket<span className="text-blue-500">Book</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-slate-300 transition hover:text-white"
        >
          Home
        </Link>

        <Link
          to="/events"
          className="text-sm font-medium text-slate-300 transition hover:text-white"
        >
          Events
        </Link>

        <Link
          to="/myBookings"
          className="text-sm font-medium text-slate-300 transition hover:text-white"
        >
          My Bookings
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;