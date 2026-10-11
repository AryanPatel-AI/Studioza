import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { hashToken } from '../lib/hash';
import { ApiError } from './errorHandler';
import { can, Action, Role } from '@studio/shared';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  name?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Validates opaque session token from cookie, checks database Session row,
 * rejects inactive users, and attaches user to req.
 */
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const rawCookie = req.headers.cookie;
    if (!rawCookie) {
      throw new ApiError(401, 'UNAUTHORIZED', 'Authentication credentials missing.');
    }

    // Extract __Secure-sid or sid cookie
    const match = rawCookie.match(/(?:^|;\s*)(?:__Secure-sid|sid)=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      throw new ApiError(401, 'UNAUTHORIZED', 'Invalid session credential format.');
    }

    const tokenHash = hashToken(token);

    const session = await prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
      throw new ApiError(401, 'UNAUTHORIZED', 'Session expired or invalidated.');
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role as Role,
      name: session.user.name,
    };

    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Route authorization guard using the pure can() policy engine from @studio/shared
 */
export function authorize(action: Action) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'UNAUTHORIZED', 'Authentication required.'));
    }

    const isAllowed = can(req.user, action);
    if (!isAllowed) {
      return next(
        new ApiError(403, 'FORBIDDEN', 'Insufficient operational clearance for this action.')
      );
    }

    next();
  };
}
