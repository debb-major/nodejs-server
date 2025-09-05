import Event from '@models/Event';
import { IEvent } from '../types/event';
import mongoose from "mongoose";

// Service functions for event operations
// this creates a new event
export const createEventService = async (eventData: Partial<IEvent>) => {
  const event = new Event(eventData);
  await event.save();
  return event;
};

// this fetches all events
export const getAllEventsService = async () => {
  return Event.find().populate("organizerId", "firstName lastName email");
};

// this fetches a single event by ID
export const getEventByIdService = async (eventId: string) => {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    const err: any = new Error("Invalid event ID");
    err.statusCode = 400;
    throw err;
  }
  const event = await Event.findById(eventId).populate("organizerId", "firstName lastName email");
  if (!event) {
    const err: any = new Error("Event not found");
    err.statusCode = 404;
    throw err;
  }
  return event;
};


// this updates an event (only by the organizer)
export const updateEventService = async (eventId: string, userId: string, updateData: Partial<IEvent>) => {
  const event = await Event.findById(eventId);
  if (!event) {
    const err: any = new Error("Event not found");
    err.statusCode = 404;
    throw err;
  }
  if (event.organizerId.toString() !== userId) {
    const err: any = new Error("Unauthorized to update this event");
    err.statusCode = 403;
    throw err;
  }
  Object.assign(event, updateData);
  await event.save();
  return event;
};


// this deletes an event (only by the organizer)
export const deleteEventService = async (eventId: string, userId: string) => {
  const event = await Event.findById(eventId);
  if (!event) {
    const err: any = new Error("Event not found");
    err.statusCode = 404;
    throw err;
  }
  if (event.organizerId.toString() !== userId) {
    const err: any = new Error("Unauthorized to delete this event");
    err.statusCode = 403;
    throw err;
  }
  await event.deleteOne();
  return event;
};
