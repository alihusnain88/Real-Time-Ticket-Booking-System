    import axios from "axios";

export const getEvents = async () => {
  const eventsInfo = await axios.get("http://localhost:3000/api/events", {
    withCredentials: true,
  });

  const events = eventsInfo.data?.events;

  if (!Array.isArray(events)) {
    throw new Error("Invalid events response");
  }

  return events;
};

export const getEvent = async (id) => {
  if (!id) {
    throw new Error("Event ID is required");
  }

  const eventInfo = await axios.get(`http://localhost:3000/api/events/${id}`, {
    withCredentials: true,
  });

  const event = eventInfo.data?.event;

  if (!event || typeof event !== "object") {
    throw new Error("Invalid event response");
  }

  return event;
};

export const getEventSeats = async (id) => {
  if (!id) {
    throw new Error("Event ID is required");
  }

  const seatsInfo = await axios.get(
    `http://localhost:3000/api/events/${id}/seats`,
    {
      withCredentials: true,
    },
  );

  const seats = seatsInfo.data?.seats;

  if (!Array.isArray(seats)) {
    throw new Error("Invalid seats response");
  }

  return seats;
};
