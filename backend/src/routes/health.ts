import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Process liveness
router.get('/health', (req: Request, res: Response) => {
  res.json({
    data: { status: 'healthy', uptimeSeconds: Math.floor(process.uptime()) },
    meta: { requestId: (req as any).id },
  });
});

// Database readiness check
router.get('/ready', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      data: { status: 'ready', database: 'connected' },
      meta: { requestId: (req as any).id },
    });
  } catch (err: any) {
    res.status(503).json({
      error: { code: 'SERVICE_UNAVAILABLE', message: 'Database unreachable.' },
      meta: { requestId: (req as any).id },
    });
  }
});

export default router;
