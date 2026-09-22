import mongoose from "mongoose";

const seatSchema = mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "A seat must belong to an event"],
    },
    seatNumber: {
      type: String,
      required: [true, "Please provide a seat number (e.g. A-12)"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "Locked", "Sold"],
      default: "Available",
    },
    lockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true },
);

seatSchema.index({ eventId: 1, seatNumber: 1 }, { unique: true });

seatSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
