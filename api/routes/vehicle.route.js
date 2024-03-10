import express from 'express';
import { addVehicle } from '../controllers/vehicle.controller.js';
const router = express.Router();

router.post('/add', addVehicle);


export default router;
