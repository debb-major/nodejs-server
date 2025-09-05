import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from '@config/db';
import authRoutes from '@routes/authRoutes';
import userRoutes from '@routes/userRoutes';
import { errorHandler } from '@middlewares/errorHandler';
import morgan from "morgan";
import logger from '@utils/logger';
import eventRoutes from '@routes/eventRoutes';


dotenv.config();
connectDB();

const app = express();

// Morgan middleware to log HTTP requests
// We tell Morgan to use 'combined' format (you can also use 'tiny' in dev)
// and instead of logging to console, pass it into Winston
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => {
        // remove trailing newline, Winston adds its own
        logger.http(message.trim());
      },
    },
  })
);

// Body parser middleware
app.use(express.json());


// api version prefix
const apiVersion = "/api/v1";

// Routes
// GET endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Define routes

app.use(`${apiVersion}/auth`, authRoutes); // Authentication routes
app.use(`${apiVersion}/user`, userRoutes); // User routes
app.use(`${apiVersion}/events`, eventRoutes); // Event routes

// global error handler (must be the last middleware)
app.use(errorHandler);


export default app;

// this is the main application file
