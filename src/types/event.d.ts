export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  ticketPrice: number;
  capacity: number;
  organizerId: mongoose.Types.ObjectId;
}