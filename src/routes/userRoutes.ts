import express from 'express';
import type { Request, Response } from 'express';
import { authMiddleware } from "../middlewares/authMiddleware.js";

interface AuthRequest extends Request {
  user?: any;
}

const router = express.Router();

// GET /api/v1/user/me

// protected user route
// this route returns the authenticated user's information
// it uses the authMiddleware to ensure the user is authenticated
// if the user is authenticated, it responds with the user's data
// if the user is not authenticated, it responds with an error
// this route is part of the user module of the application

router.get("/me", authMiddleware, (req: AuthRequest, res: Response) => {
  res.json(req.user);  // user was attached in middleware
});

export default router;


