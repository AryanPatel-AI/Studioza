import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public fields?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const reqId = (req as any).id || 'req_unknown';

  // 1. Zod Validation Error
  if (err instanceof ZodError) {
    const fields: Record<string, string> = {};
    for (const issue of err.issues) {
      const path = issue.path.join('.');
      fields[path] = issue.message;
    }

    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Please review the highlighted fields',
        fields,
      },
      meta: { requestId: reqId },
    });
  }

  // 2. Custom Domain ApiError
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        fields: err.fields,
      },
      meta: { requestId: reqId },
    });
  }

  // 3. Prisma Unique Constraint Violation (P2002)
  if (err?.code === 'P2002') {
    const target = Array.isArray(err.meta?.target)
      ? err.meta.target.join(', ')
      : err.meta?.target || 'record';
    return res.status(409).json({
      error: {
        code: 'CONFLICT',
        message: `A record with this ${target} already exists in the archive index.`,
      },
      meta: { requestId: reqId },
    });
  }

  // 4. Prisma Record Not Found (P2025)
  if (err?.code === 'P2025') {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'The requested archival plate or dossier could not be located.',
      },
      meta: { requestId: reqId },
    });
  }

  // 5. Unhandled Server Error (never leak stack or SQL internals)
  const isDev = process.env.NODE_ENV === 'development';
  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected internal error occurred within the atelier backend.',
      ...(isDev && { debugMessage: err?.message }),
    },
    meta: { requestId: reqId },
  });
}
