import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// GET endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Define routes
app.use("/api/v1/auth", authRoutes); // Authentication routes
app.use("/api/v1/user", userRoutes); // User routes

export default app;

// this is the main application file
// it sets up the Express server, connects to the database, and defines routes
// it uses dotenv to load environment variables
// it includes a basic GET endpoint that returns the server status and current timestamp
// it imports and uses the authentication routes defined in authRoutes.js
// this file is the entry point for the application
// it is responsible for initializing the server and handling incoming requests
// it is part of the overall application architecture that includes models, controllers, and routes