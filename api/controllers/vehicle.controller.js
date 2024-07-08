import Vehicle from '../models/vehicle.model.js';

export const addVehicle = async (req, res, next) => {

    const { vehicleName, vehicleType, vehicleNumber, vehicleModel, vehiclePower, vehicleTorque, vehicleSeats, vehicleCc, vehiclePicture, vehicleRrpm } = req.body;

    if(!vehicleName || !vehicleType || !vehicleNumber || !vehicleModel || !vehiclePower || !vehicleTorque || !vehicleSeats || !vehicleCc || !vehiclePicture || !vehicleRrpm){
        res.status(401).json({ message: 'please give the all the fields' });
    }

    const newVehicle = new Vehicle({ vehicleName, vehicleType, vehicleNumber, vehicleModel, vehiclePower, vehicleTorque, vehicleSeats, vehicleCc, vehiclePicture, vehicleRrpm});
    try {
        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle created successfully' });
      } catch (error) {
        res.status(400).json({message : 'error occured'})
      }
}

export const getVehicles = async(req, res, next) => {
    try {
        const data = await Vehicle.find();
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({message : 'error occured'})
      }
}

export const getVehicle = async(req, res, next) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
          return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.json({ success: true, vehicle });
      } catch (error) {
        res.status(400).json({message : 'error occured'})
      }
}

export const deleteVehicle = async (req, res, next) => {
  try{
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(200).json('Vehicle has been deleted');
  }catch(error){
    res.status(400).json({message : 'error occured'})
}
}

export const updateVehicle = async (req, res, next) => {
  try{
    const updateVehicle = await Vehicle.findByIdAndUpdate(req.params.id,{
      $set: {
          vehicleName: req.body.vehicleName,
          vehicleType: req.body.vehicleType,
          vehicleNumber: req.body.vehicleNumber,
          vehicleModel: req.body.vehicleModel,
          vehiclePower: req.body.vehiclePower,
          vehicleTorque: req.body.vehicleTorque,
          vehicleSeats: req.body.vehicleSeats,
          vehicleCc: req.body.vehicleCc,
          vehiclePicture: req.body.vehiclePicture,
          vehicleRrpm: req.body.vehicleRrpm,
          vehicleRentStatus: req.body.vehicleRentStatus
         },
    }, { new: true})
  
    res.status(200).json(updateVehicle)
  }catch(error){
    res.status(400).json({message : 'error occured'})
  }
}