import type { NextFunction, Request, Response } from 'express';
import { logger } from '../../../utils/logger/app-logger.js';

// Error Middleware Types
interface IError extends Error {
  statusCode?: number;
}

// catch async errors
export const asyncHandler =
  <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// error handling middleware
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const error = err as IError;
  const statusCode = error.statusCode || 500;

  // Log error details
  logger.error(
    `${statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    err,
  );

  //perpare error response
  const response: { success: boolean; error: { message: string; stack?: string } } = {
    success: false,
    error: {
      message: error.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
  };
  res.status(statusCode).json(response);
};

//custome API error class
export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// not found error middleware
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Route not found: ${req.originalUrl}`, 401));
};
