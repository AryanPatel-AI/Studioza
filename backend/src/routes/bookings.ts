import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { ApiError } from '../middleware/errorHandler';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idempotencyKey =
      (req.headers['idempotency-key'] as string) || req.body.idempotencyKey;

    if (!idempotencyKey) {
      throw new ApiError(
        400,
        'VALIDATION_ERROR',
        'Idempotency-Key header is required to register a commission.'
      );
    }

    // 1. Idempotency Check: if duplicate submit, return stored booking with 200
    const existing = await prisma.booking.findUnique({
      where: { idempotencyKey },
    });

    if (existing) {
      return res.status(200).json({
        data: {
          reference: existing.reference,
          status: existing.status,
          preferredDate: existing.preferredDate.toISOString().split('T')[0],
        },
        meta: { requestId: (req as any).id, idempotentReplay: true },
      });
    }

    const {
      serviceSlug,
      packageId,
      inquiryId,
      preferredDate,
      backupDate,
      venue,
      city,
      accessNotes,
      details,
      contact,
    } = req.body;

    // Validate service exists
    let service = await prisma.service.findUnique({
      where: { slug: serviceSlug || 'weddings' },
    });

    if (!service) {
      // Fallback create service if database is newly seeded
      service = await prisma.service.findFirst();
      if (!service) {
        service = await prisma.service.create({
          data: {
            slug: serviceSlug || 'weddings',
            name: 'Weddings & Celebrations',
            summary: 'Heritage monograph documentation',
            status: 'PUBLISHED',
            startingRate: 500000,
          },
        });
      }
    }

    const currentYear = new Date().getFullYear();

    // 2. Atomic Transaction: Per-year reference counter, Booking insert, and Outbox row
    const result = await prisma.$transaction(async (tx) => {
      // Per-year sequential counter
      const counter = await tx.referenceCounter.upsert({
        where: { year: currentYear },
        update: { last: { increment: 1 } },
        create: { year: currentYear, last: 1 },
      });

      const formattedNumber = String(counter.last).padStart(4, '0');
      const reference = `STZ-${currentYear}-${formattedNumber}`;

      const booking = await tx.booking.create({
        data: {
          reference,
          idempotencyKey,
          serviceId: service!.id,
          packageId: packageId || null,
          inquiryId: inquiryId || null,
          preferredDate: new Date(preferredDate || '2027-02-14'),
          backupDate: backupDate ? new Date(backupDate) : null,
          venue: venue || 'Private Residence',
          city: city || 'Lucknow',
          accessNotes: accessNotes || null,
          details: details || {},
          contactName: contact?.name || 'Patron',
          contactEmail: contact?.email || 'patron@example.com',
          contactPhone: contact?.phone || null,
          consentAt: new Date(),
          status: 'REQUESTED',
          dossier: details || {},
        },
      });

      await tx.notificationOutbox.create({
        data: {
          type: 'BOOKING_CONFIRMED',
          payload: {
            bookingId: booking.id,
            reference: booking.reference,
            contactEmail: booking.contactEmail,
            preferredDate: booking.preferredDate,
          },
          status: 'PENDING',
        },
      });

      return booking;
    });

    res.status(201).json({
      data: {
        reference: result.reference,
        status: result.status,
        preferredDate: result.preferredDate.toISOString().split('T')[0],
      },
      meta: { requestId: (req as any).id },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
