import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { ApiError } from '../middleware/errorHandler';

const router = Router();

// GET /api/v1/projects (Public: returns PUBLISHED monographs only)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt((req.query.pageSize as string) || '20', 10)));
    const categorySlug = req.query.category as string | undefined;

    const where: any = { status: 'PUBLISHED' };
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const [total, items] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { publishedAt: 'desc' },
        include: {
          category: { select: { slug: true, name: true } },
          images: {
            where: { isCover: true },
            take: 1,
            include: { media: true },
          },
        },
      }),
    ]);

    res.json({
      data: items,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        requestId: (req as any).id,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/projects/:slug (Public: with adjacent prev/next published records)
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const project = await prisma.project.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          include: { media: true },
        },
      },
    });

    if (!project) {
      throw new ApiError(404, 'NOT_FOUND', "This plate isn't in the archive. Here is the latest work.");
    }

    // Retrieve previous and next published monographs
    const [prevProject, nextProject] = await Promise.all([
      prisma.project.findFirst({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lt: project.publishedAt || new Date() },
        },
        orderBy: { publishedAt: 'desc' },
        select: { slug: true, title: true, issueNumber: true },
      }),
      prisma.project.findFirst({
        where: {
          status: 'PUBLISHED',
          publishedAt: { gt: project.publishedAt || new Date() },
        },
        orderBy: { publishedAt: 'asc' },
        select: { slug: true, title: true, issueNumber: true },
      }),
    ]);

    res.json({
      data: {
        ...project,
        navigation: {
          prev: prevProject,
          next: nextProject,
        },
      },
      meta: { requestId: (req as any).id },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
