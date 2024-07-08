import express from 'express';
import { getdetails } from '../controllers/admin.controller.js';
const router = express.Router();
router.get('/getdetails', getdetails);
export default router;
