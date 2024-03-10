import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehiclePower: {
        type: String,
        required: true,
    },
    vehicleTorque: {
        type: String,
        required: true,
    },
    vehicleSeats: {
        type: Number,
        required: true,
    },
    vehicleCc: {
        type: String,
        required: true,
    },
    vehiclePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
