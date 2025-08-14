import type { Request, Response } from 'express';
import User from '../models/User.js';
import { hashPassword } from '../utils/hashPassword.js';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // hash password
        const hashed = await hashPassword(password);

        // create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashed
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch(error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error
        });

    }
}

// this controller is used to register a new user
// it checks if the user already exists, hashes the password, and saves the new user to the database
// if successful, it returns a success message and the new user object
// if there is an error, it returns an error message
// this controller is part of the authentication module of the application