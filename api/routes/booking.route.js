import express from 'express';
import { addbooking, getbookings, removebooking, getallbookings} from '../controllers/booking.controller.js';
const router = express.Router();

router.post('/addbooking', addbooking);
router.get('/getbookings/:id', getbookings);
router.get('/getallbookings', getallbookings);
router.delete('/removebooking/:id', removebooking);




export default router;
