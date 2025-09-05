import express from 'express';
import { authMiddleware } from '@middlewares/authMiddleware';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '@controllers/eventController';
import { validateCreateEvent, validateUpdateEvent } from '@middlewares/validateRequest';

const router = express.Router();

router.post("/", authMiddleware, validateCreateEvent, createEvent);        // Authenticate, validate and create event (only organizer; protected route)
router.get("/", getAllEvents);                      // Get all events
router.get("/:id", getEventById);                   // Get single event
router.put("/:id", authMiddleware, validateUpdateEvent, updateEvent);      // uthenticate, validate and update event (only organizer; protected route)
router.delete("/:id", authMiddleware, deleteEvent);   // Delete event (only organizer; protected route)

export default router;
