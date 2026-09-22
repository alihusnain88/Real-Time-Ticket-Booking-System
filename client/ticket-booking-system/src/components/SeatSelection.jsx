import React, { useState } from "react";
import ShowSeats from "./ShowSeats";

const SeatSelection = ({ seats, eventID }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatID) => {
    const isSelected = selectedSeats.includes(seatID);

    const newSelectedSeats = isSelected
      ? selectedSeats.filter((id) => id !== seatID)
      : [...selectedSeats, seatID];

    setSelectedSeats(newSelectedSeats);
  };

  return (
    <div>
      <ShowSeats
        eventID={eventID}
        seats={seats}
        selectedSeats={selectedSeats}
        onSeatClick={handleSeatClick}
      />
    </div>
  );
};

export default SeatSelection;
