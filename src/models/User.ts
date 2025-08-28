import mongoose, { Document, Schema } from 'mongoose';
import jwt from "jsonwebtoken";
// import { IUser } from '@types/user';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email:     { type: String, required: true, unique: true, lowercase: true }, // lowercase enforced,
    password: { type: String, required: true }
}, 
{ 
    timestamps: true 
}
);

// Adding method to the schema
userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return token;
};

// to remove other senstive fields like _v, timestamps, etc, automatically when converting to JSON
// userSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     delete ret.password;
//     delete ret.__v;
//     return ret;
//   },
// });


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