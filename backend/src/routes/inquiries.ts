import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { validate } from '../middleware/validate';
import { CreateInquirySchema } from '@studio/shared';

const router = Router();

router.post(
  '/',
  validate(CreateInquirySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, message, serviceId, source } = req.body;

      // Atomic write: Insert inquiry record + notification outbox row
      const result = await prisma.$transaction(async (tx) => {
        const inquiry = await tx.inquiry.create({
          data: {
            name,
            email,
            message,
            serviceId: serviceId || null,
            source: source || 'website',
            status: 'NEW',
          },
        });

        await tx.notificationOutbox.create({
          data: {
            type: 'INQUIRY_RECEIVED',
            payload: {
              inquiryId: inquiry.id,
              name: inquiry.name,
              email: inquiry.email,
              message: inquiry.message,
            },
            status: 'PENDING',
          },
        });

        return inquiry;
      });

      res.status(201).json({
        data: {
          id: result.id,
          status: result.status,
          message: 'Inquiry logged with the atelier.',
        },
        meta: { requestId: (req as any).id },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
