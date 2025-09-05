import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";

interface AppError extends Error {
  statusCode?: number;
  details?: string[]; 
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;

  logger.error({
    message: err.message,
    details: err.details, // log details if any
    stack: err.stack,
    status,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(err.details ? { details: err.details } : {}), // include details
  });
};

// This middleware captures errors passed to next(err) in route handlers or other middlewares
// It logs the error details using the logger utility and sends a structured JSON response to the client