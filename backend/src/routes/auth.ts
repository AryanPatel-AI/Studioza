import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { verifyPassword, hashToken, generateOpaqueToken } from '../lib/hash';
import { ApiError } from '../middleware/errorHandler';
import { authenticate } from '../middleware/auth';
import { LoginSchema } from '@studio/shared';
import { validate } from '../middleware/validate';

const router = Router();

router.post(
  '/login',
  validate(LoginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      // Generic authentication error message (never reveal if email exists)
      const invalidMsg = 'Those details do not match our records.';

      if (!user || !user.isActive) {
        throw new ApiError(401, 'INVALID_CREDENTIALS', invalidMsg);
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        throw new ApiError(401, 'INVALID_CREDENTIALS', invalidMsg);
      }

      // Generate opaque 256-bit token & store SHA-256 hash in Session
      const opaqueToken = generateOpaqueToken();
      const tokenHash = hashToken(opaqueToken);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      await prisma.session.create({
        data: {
          tokenHash,
          userId: user.id,
          expiresAt,
          userAgent: req.headers['user-agent'] || null,
        },
      });

      // Update user lastLoginAt
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // Set HttpOnly, Secure, SameSite=Lax cookie
      const isProduction = process.env.NODE_ENV === 'production';
      const cookieName = isProduction ? '__Secure-sid' : 'sid';

      res.cookie(cookieName, opaqueToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
        meta: { requestId: (req as any).id },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawCookie = req.headers.cookie;
    if (rawCookie) {
      const match = rawCookie.match(/(?:^|;\s*)(?:__Secure-sid|sid)=([^;]+)/);
      const token = match ? match[1] : null;
      if (token) {
        const tokenHash = hashToken(token);
        await prisma.session.deleteMany({ where: { tokenHash } }).catch(() => null);
      }
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const cookieName = isProduction ? '__Secure-sid' : 'sid';
    res.clearCookie(cookieName, { path: '/' });

    res.json({
      data: { success: true },
      meta: { requestId: (req as any).id },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/me', authenticate, (req: Request, res: Response) => {
  res.json({
    data: req.user,
    meta: { requestId: (req as any).id },
  });
});

export default router;
