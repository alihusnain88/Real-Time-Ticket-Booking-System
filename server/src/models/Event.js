import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide an event title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide an event description"],
    },
    date: {
      type: Date,
      required: [true, "Please provide an event date"],
    },
    venue: {
      type: String,
      required: [true, "Pleasse provide an event venue"],
      trim: true,
    },
  },

  { timestamps: true },
);

const Event = mongoose.model("event", eventSchema);

export default Event;
