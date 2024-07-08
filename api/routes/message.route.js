import express from 'express';
import { sendmessage, getmessages, deletemessage } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/sendmessage', sendmessage);
router.get('/getmessages', getmessages);
router.delete('/deletemessage/:id', deletemessage);





export default router;
