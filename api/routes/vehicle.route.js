import express from 'express';
import { addVehicle, getVehicles, getVehicle, deleteVehicle, updateVehicle } from '../controllers/vehicle.controller.js';
const router = express.Router();

router.post('/add', addVehicle);
router.get('/getVehicles', getVehicles);
router.get('/getVehicle/:id', getVehicle);
router.delete('/deleteVehicle/:id', deleteVehicle);
router.put('/updateVehicle/:id', updateVehicle);



export default router;
