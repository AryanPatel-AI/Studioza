import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const reqId = (req.headers['x-request-id'] as string) || `req_${crypto.randomBytes(4).toString('hex')}`;
  (req as any).id = reqId;
  res.setHeader('x-request-id', reqId);
  next();
}
