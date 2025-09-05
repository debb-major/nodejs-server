import { Request, Response } from 'express';
import * as eventService from '@services/eventService';

// Controller functions for event routes
// this creates a new event
export const createEvent = async (req: Request, res: Response, next: Function) => {
  try {
    const eventData = { ...req.body, organizerId: (req as any).user._id };
    const event = await eventService.createEventService(eventData);
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    next(error);
  }
};

// this fetches all events
export const getAllEvents = async (req: Request, res: Response, next: Function) => {
  try {
    const events = await eventService.getAllEventsService();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// this fetches a single event by ID
export const getEventById = async (req: Request, res: Response, next: Function) => {
  try {
    const event = await eventService.getEventByIdService(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// this updates an event (only by the organizer)
export const updateEvent = async (req: Request, res: Response, next: Function) => {
  try {
    const event = await eventService.updateEventService(req.params.id, (req as any).user._id, req.body);
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    next(error);
  }
};

// this deletes an event (only by the organizer)
export const deleteEvent = async (req: Request, res: Response, next: Function) => {
  try {
    await eventService.deleteEventService(req.params.id, (req as any).user._id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};
