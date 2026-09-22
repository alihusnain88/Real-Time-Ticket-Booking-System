import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../api/authApi.js";

const AuthForm = ({ mode, onToggleMode }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (mode === "signup") {
      const user = await signupUser(name, email, password);
    } else {
      const user = await loginUser(email, password);
    }

    navigate("/");
  };

  return (
    <div className="mt-10 flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={handleFormSubmit}
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8"
      >
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-white">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {mode === "signup"
              ? "Create an account to start booking."
              : "Login to manage your bookings."}
          </p>
        </div>

        {mode === "signup" && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-300"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-300"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-300"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          {mode === "signup" ? "Create Account" : "Login"}
        </button>

        <div className="border-t border-slate-800 pt-5 text-center">
          <p className="text-sm text-slate-400">
            {mode === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>

          <button
            type="button"
            onClick={onToggleMode}
            className="mt-1 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            {mode === "signup" ? "Login" : "Create an account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;