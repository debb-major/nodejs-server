import { Request, Response } from 'express';
import * as userService from '@services/userService';

export const getCurrentUser = async (req: Request, res: Response, next: Function) => {
  try {
    const userId = (req as any).user._id; // comes from authMiddleware
    const user = await userService.getCurrentUserService(userId);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
