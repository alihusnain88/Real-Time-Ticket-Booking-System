import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from '../components/NavBar.jsx'
import Home from "../pages/Home.jsx";
import Events from "../pages/Events.jsx";
import EventDetails from "../pages/EventDetails.jsx";
import Booking from "../pages/Booking.jsx";
import MyBookings from "../pages/MyBookings.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import ProtectedRoute from "../components/ProtectedRoutes.jsx";

const Router = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* Protected */}
        <Route
          path="/events/:id/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myBookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
