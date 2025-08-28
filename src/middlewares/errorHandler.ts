import { Request, Response, NextFunction } from "express";
import logger from '@utils/logger';

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    status: err.statusCode || 500,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};
// This middleware captures errors passed to next(err) in route handlers or other middlewares
// It logs the error details using the logger utility and sends a structured JSON response to the client