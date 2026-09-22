import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {createBooking, getBookings, deleteBooking} from '../controllers/bookingController.js'
const router = express.Router();


router.get('/', authMiddleware, getBookings);
router.post('/', authMiddleware, createBooking);
router.delete('/:id', authMiddleware, deleteBooking);


export default router;