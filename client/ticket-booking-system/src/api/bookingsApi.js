import axios from "axios";

export const bookEvent = async (eventID, seatIDs) => {
  if (!eventID) {
    throw new Error("Event ID is required");
  }

  if (!Array.isArray(seatIDs) || seatIDs.length === 0) {
    throw new Error("At least one seat is required");
  }

  const bookingInfo = await axios.post(
    "http://localhost:3000/api/bookings",
    {
      eventID,
      seatIDs,
    },
    {
      withCredentials: true,
    },
  );

  const booking = bookingInfo.data?.bookingDetails;

  if (!booking || typeof booking !== "object") {
    throw new Error("Invalid booking response");
  }

  return booking;
};

export const getMyBookings = async () => {
  const bookingsInfo = await axios.get("http://localhost:3000/api/bookings", {
    withCredentials: true,
  });

  const bookings = bookingsInfo.data?.bookings;

  if (!Array.isArray(bookings)) {
    throw new Error("Invalid bookings response");
  }

  return bookings;
};

export const deleteBooking = async (id) => {
  if (!id) {
    throw new Error("Booking ID is required");
  }

  const response = await axios.delete(
    `http://localhost:3000/api/bookings/${id}`,
    {
      withCredentials: true,
    },
  );

  const message = response.data?.message;

  if (!message) {
    throw new Error("Invalid delete booking response");
  }

  return message;
};
