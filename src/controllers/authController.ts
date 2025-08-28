import { Request, Response } from "express";
import * as authService from '@services/authService';

// controllers: thin, only handle req/res

export const registerUser = async (req: Request, res: Response, next: Function) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await authService.registerUserService(firstName, lastName, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    next(error); // forward to error handler
  }
};

export const loginUser = async (req: Request, res: Response, next: Function) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await authService.loginUserService(email, password);
    const token = user.generateAuthToken();

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    next(error); // forward to error handler
  }
};

