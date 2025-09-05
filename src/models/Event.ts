import mongoose, { Schema, Document } from 'mongoose';
import { IEvent } from '../types/event';

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    capacity: { type: Number, required: true },
    organizerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", eventSchema);