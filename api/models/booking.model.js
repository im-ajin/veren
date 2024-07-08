import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    vehicleId: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: String,
      default: ""
    },
    endDateTime: {
        type: String,
        default: ""
    },
    totalPrice: {
        type: Number,
        required: true
    },
    advPayed: {
        type: Number,
        required: true
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
