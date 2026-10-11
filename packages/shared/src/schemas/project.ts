import { z } from 'zod';

export const ContentStatusEnum = z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']);
export type ContentStatus = z.infer<typeof ContentStatusEnum>;

export const PlateLayoutEnum = z.enum(['FULL', 'PAIR']);
export type PlateLayout = z.infer<typeof PlateLayoutEnum>;

export const PlateSequenceItemSchema = z.object({
  id: z.string().min(1, 'Plate identifier required.'),
  sortOrder: z.number().int().min(0),
  layout: PlateLayoutEnum.default('FULL'),
  isCover: z.boolean().default(false),
  caption: z.string().max(400).optional().nullable(),
  altText: z.string().min(1, 'Archival accessibility description required.'),
});

export const BatchReorderPlatesSchema = z.object({
  projectId: z.string().min(1),
  plates: z.array(PlateSequenceItemSchema).min(1, 'Monograph must contain at least one plate.'),
});

export const CreateProjectSchema = z.object({
  title: z.string().min(2, 'Title must contain at least 2 characters.').max(120),
  subtitle: z.string().max(200).optional().nullable(),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens.'),
  categoryId: z.string().min(1, 'Category selection required.'),
  issueNumber: z.number().int().positive().optional().nullable(),
  intro: z.string().max(500).optional().nullable(),
  narrative: z.record(z.string(), z.any()).optional().nullable(),
  credits: z.record(z.string(), z.any()).optional().nullable(),
  shotOn: z.string().datetime().optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
  status: ContentStatusEnum.optional(),
});

export const PublishChecklistSchema = z.object({
  hasCover: z.literal(true, {
    message: 'A cover plate must be designated before publication.',
  }),
  allPlatesHaveAltText: z.literal(true, {
    message: 'Every plate must contain descriptive accessibility text.',
  }),
  hasSeoDescription: z.literal(true, {
    message: 'SEO summary description required for archive index.',
  }),
  hasUniqueSlug: z.literal(true, {
    message: 'Issue slug must be unique in the public register.',
  }),
});
