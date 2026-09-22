import express from 'express';
import {getAllEvents, getEventSeats, getEvent} from '../controllers/eventController.js'

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.get('/:id/seats', getEventSeats);

export default router;