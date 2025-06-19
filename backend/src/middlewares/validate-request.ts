import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../errors/app-error';

export const validateRequest =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(', ');
      throw new AppError(`Validation failed: ${message}`, 400);
    }
    next();
  };
