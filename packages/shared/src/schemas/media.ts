import { z } from 'zod';

export const RequestPresignedUploadSchema = z.object({
  filename: z.string().min(1).max(255),
  mimeType: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/tiff',
  ]),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(52428800, 'Master photographic asset must not exceed 50 MB.'),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  defaultAlt: z.string().max(255).optional(),
});

export const RegisterMediaSchema = z.object({
  storageKey: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().positive(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  blurDataUrl: z.string().min(1, 'Blur placeholder data URL required.'),
  defaultAlt: z.string().min(1, 'Default alt text required.'),
});

export type RequestPresignedUploadInput = z.infer<typeof RequestPresignedUploadSchema>;
export type RegisterMediaInput = z.infer<typeof RegisterMediaSchema>;
