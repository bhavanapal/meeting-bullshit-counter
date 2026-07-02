import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import type { ZodType } from 'zod';

export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);

    next();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    next(error);
  }
};
