import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';
import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    statusCode,
  });
};