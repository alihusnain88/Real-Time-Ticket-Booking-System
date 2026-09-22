import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A booking must belong to a user'],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'A booking must belong to a specific event'],
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: [true, 'A booking must include at least one seat'],
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, 'Please provide the total transaction amount'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // Tracks when the ticket was generated and finalized
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
