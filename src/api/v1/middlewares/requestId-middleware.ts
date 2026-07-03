import type { NextFunction, Request, Response } from 'express';
import { requestContext } from '../../../lib/request-context.js';
import crypto from 'crypto';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // get incoming request ID or generate new one
  const requestId = (req.header('x-request-id') as string) ?? crypto.randomUUID();

  // Attach to response headers (for tracing)
  res.setHeader('x-request-id', requestId);

  // store / create in AsyncLocalStorage context
  requestContext.run({ requestId }, () => {
    next();
  });
};
