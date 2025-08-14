// import { string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;

// this model defines the User schema for MongoDB
// it includes fields for first name, last name, email, and password
// the email field is unique to prevent duplicate registrations
// the IUser interface extends Document to include Mongoose document properties
// this model is used in the authentication module of the application
// it allows for creating, reading, updating, and deleting user records in the database
// it is part of the Mongoose ODM (Object Data Modeling) layer for MongoDB
// it is used in the authentication module of the application