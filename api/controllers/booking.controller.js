import Booking from '../models/booking.model.js';
import Vehicle from '../models/vehicle.model.js';


export const addbooking = async (req, res, next) => {
  const { userId, vehicleId, startDateTime, endDateTime, totalPrice, advPayed } = req.body;

  if (!userId || !vehicleId || !startDateTime || !endDateTime || !totalPrice || !advPayed) {
      return res.status(400).json({ "message": "Fill all the fields" });
  }

  try {
      const vehicle = await Vehicle.findById(vehicleId)
      if(vehicle.vehicleRentStatus){
        return res.status(400).json({"message" : "Vehicle unavailable please choose another vehicle"});
      }

      const result = await Vehicle.updateOne(
          { _id: vehicleId },
          { $set: { vehicleRentStatus: true } }
      );
      const newBooking = new Booking({ userId, vehicleId, startDateTime, endDateTime, totalPrice, advPayed });
      await newBooking.save();

      if(result.modifiedCount === 1){
        res.status(200).json({"message" : "Vehicle booked successfully"})
      }
      
  } catch (error) {
      console.log(error.message);
      res.status(400).json({ "message": "Error occurred" });
  }
}

export const getbookings = async (req, res, next) => {
  const userId = req.params.id;
  try{
    const bookings = await Booking.find({userId});
    res.status(200).json(bookings)
  }catch(error){
    res.status(400).json({"message" : "error occured"})
  }
}

export const removebooking = async (req, res, next) => {
  const bookingId = req.params.id;
  try{
    const booking = await Booking.findById({_id: bookingId});
    if(booking){
      const result = await Vehicle.updateOne(
        { _id: booking.vehicleId },
        { $set: { vehicleRentStatus: false } }
    );
    await Booking.findByIdAndDelete(bookingId)
    return res.status(200).json({"message" : "Booking removed successfully"})
    }
    return res.status(400).json({"message" : "Booking not available"})
  }catch(error){
      console.log(error.message);
      res.status(400).json({"message" : "Error occured"})
  }
}

export const getallbookings = async (req, res, next) => {
  try{
    const bookings = await Booking.find();
    res.status(200).json(bookings)
  }
  catch(error){
    res.status(400).json({"message" : "error occured"})
  }
}