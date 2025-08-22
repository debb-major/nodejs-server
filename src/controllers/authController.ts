// create a service folder that now has an authService file, that handls the actual buisness logic or core funciton. for example: if you want to get current auth user you don't want to do it in the controller cos what if you want to get the current user in another route, would you have to duplicate the code or call multiple routes?

// but if the function for getting current user is in the service file, then all you would have to do is to call the get current authenticated user funciton from any route whatsoever

// also create a user router, controller, and service file structure to get current authenticated user

import type { Request, Response } from "express";

// using named imports from you ts config
import User from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// this controller is used to register a new user
// it checks if the user already exists, hashes the password, and saves the new user to the database
// if successful, it returns a success message and the new user object
// if there is an error, it returns an error message
// this controller is part of the authentication module of the application
// it is responsible for handling user registration requests
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash password
    const hashed = await hashPassword(password);

    // create new user
    // always convert email to all small letters
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error,
    });
  }
};

// this controller is used to log in a user
// it checks the user's credentials, compares the password, and generates a JWT token if successful
// if the login is successful, it returns the user data (excluding the password) and the JWT token
// if there is an error, it returns an error message
// this controller is part of the authentication module of the application
// it is responsible for handling user login requests
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    // validate it properly

    // validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // find user by email
    const user = await User.findOne({ email });

    // error message here should be something like, user with email not found
    if (!user) return res.status(401).json({ message: "Invalid email" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // change error message, invalid credentials
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // add a method to your user model to generate jwt, so that here you just call user.gen_jwt()

    // create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // return user minus password and token
    // using toObject to convert Mongoose document to plain object
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
