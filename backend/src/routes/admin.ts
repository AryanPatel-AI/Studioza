import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { ApiError } from '../middleware/errorHandler';

const router = Router();

// Protect all /admin endpoints
router.use(authenticate);

// 1. Studio Desk Urgency Dashboard
router.get('/dashboard', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const [urgentInquiries, awaitingBookings, draftsInReview, failedOutbox] = await Promise.all([
      prisma.inquiry.count({
        where: { status: 'NEW', createdAt: { lte: twoDaysAgo } },
      }),
      prisma.booking.count({
        where: { status: 'REQUESTED' },
      }),
      prisma.project.count({
        where: { status: 'REVIEW' },
      }),
      prisma.notificationOutbox.count({
        where: { status: 'FAILED' },
      }),
    ]);

    res.json({
      data: {
        needsAttention: {
          urgentInquiries,
          awaitingBookings,
          draftsInReview,
          failedOutbox,
        },
      },
      meta: { requestId: (req as any).id },
    });
  } catch (err) {
    next(err);
  }
});

// 2. Monograph Publication Gate
router.post(
  '/projects/:id/publish',
  authorize('project:publish'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const project = await prisma.project.findUnique({
        where: { id },
        include: { images: true },
      });

      if (!project) {
        throw new ApiError(404, 'NOT_FOUND', 'Monograph does not exist.');
      }

      // Enforce publish checklist
      const hasCover = project.images.some((img) => img.isCover);
      const allPlatesHaveAlt = project.images.every((img) => Boolean(img.altText && img.altText.trim()));
      const hasSeo = Boolean(project.seoDescription && project.seoDescription.trim());

      if (!hasCover || !allPlatesHaveAlt || !hasSeo) {
        throw new ApiError(
          400,
          'PUBLISH_GATE_FAILED',
          'Publishing blocked: Monograph must have a cover plate, alt text on every plate, and an SEO description.'
        );
      }

      const updated = await prisma.project.update({
        where: { id },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
      });

      // Audit log activity
      await prisma.activity.create({
        data: {
          actorId: req.user!.id,
          action: 'PROJECT_PUBLISHED',
          targetType: 'project',
          targetId: project.id,
          summary: `Published monograph: ${project.title}`,
        },
      });

      res.json({
        data: updated,
        meta: { requestId: (req as any).id },
      });
    } catch (err) {
      next(err);
    }
  }
);

// 3. Plate Sequencer Order Batch PATCH
router.patch(
  '/galleries/:id/order',
  authorize('project:update'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: projectId } = req.params;
      const { images, coverId } = req.body;

      if (!Array.isArray(images)) {
        throw new ApiError(400, 'VALIDATION_ERROR', 'Array of plate images required.');
      }

      // Reorder atomically in a single transaction
      await prisma.$transaction(async (tx) => {
        for (const item of images) {
          await tx.projectImage.update({
            where: { id: item.id },
            data: {
              sortOrder: item.sortOrder,
              isCover: item.id === coverId || Boolean(item.isCover),
              ...(item.layout && { layout: item.layout }),
              ...(item.caption !== undefined && { caption: item.caption }),
              ...(item.altText !== undefined && { altText: item.altText }),
            },
          });
        }
      });

      res.json({
        data: { success: true, count: images.length },
        meta: { requestId: (req as any).id },
      });
    } catch (err) {
      next(err);
    }
  }
);

// 4. Inquiries Kanban Status Transition
router.patch(
  '/inquiries/:id',
  authorize('inquiry:update'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status, internalNotes } = req.body;

      const updated = await prisma.inquiry.update({
        where: { id },
        data: {
          ...(status && { status }),
          ...(internalNotes !== undefined && { internalNotes }),
        },
      });

      await prisma.activity.create({
        data: {
          actorId: req.user!.id,
          action: 'INQUIRY_STATUS_UPDATED',
          targetType: 'inquiry',
          targetId: id,
          summary: `Inquiry status changed to ${status}`,
        },
      });

      res.json({
        data: updated,
        meta: { requestId: (req as any).id },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
