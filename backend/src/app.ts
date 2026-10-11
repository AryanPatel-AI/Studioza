import express, { Express } from 'express';
import cors from 'cors';
import { requestIdMiddleware } from './middleware/requestId';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import inquiryRoutes from './routes/inquiries';
import bookingRoutes from './routes/bookings';
import adminRoutes from './routes/admin';

export function createApp(): Express {
  const app = express();

  // Security: Explicit CORS with credentials (never wildcard)
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || env.ALLOWED_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Cross-Origin Request Blocked by Studioza Security Policy'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key', 'x-request-id'],
    })
  );

  // Body parser with 100 KB limit (Section 26)
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // Attach x-request-id correlation tracking
  app.use(requestIdMiddleware);

  // API Routes (/api/v1)
  app.use('/api/v1', healthRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/projects', projectRoutes);
  app.use('/api/v1/inquiries', inquiryRoutes);
  app.use('/api/v1/bookings', bookingRoutes);
  app.use('/api/v1/admin', adminRoutes);

  // Fallback 404 handler for unknown routes
  app.use((req, res) => {
    res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'The requested API route does not exist.',
      },
      meta: { requestId: (req as any).id },
    });
  });

  // Central Error Handler
  app.use(errorHandler);

  return app;
}
