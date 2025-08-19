import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import type { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

interface AuthRequest extends Request {
    user?: any; // Extend Request to include user property
}


// this middleware checks for a valid JWT token in the request headers (authentication middleware)
// it extracts the token, verifies it, and attaches the user information to the request object

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization; // Get the Authorization header

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized: No token provided' });
            return;
        }
        // Extract token from header
        const token = authHeader.split(' ')[1]; // Get the token part after "Bearer "
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({ message: 'Internal server error: JWT secret not configured' });
            return;
        }
        // Verify token
        
        const decoded = jwt.verify(token!, jwtSecret as string) as unknown as CustomJwtPayload;

        // attach user to request
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password from user object
        if (!user) return res.status(401).json({ message: "Unauthorized: User not found" });

        req.user = user;
        next();


                
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

