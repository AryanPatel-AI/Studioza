import { z } from 'zod';

export const InquiryStatusEnum = z.enum([
  'NEW',
  'CONTACTED',
  'IN_PROGRESS',
  'BOOKED',
  'ARCHIVED',
]);
export type InquiryStatus = z.infer<typeof InquiryStatusEnum>;

export const CreateInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(80),
  email: z.string().email('Please supply a valid correspondence email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(2000),
  serviceId: z.string().optional().nullable(),
  source: z.string().max(80).default('website'),
});

export const UpdateInquiryStatusSchema = z.object({
  status: InquiryStatusEnum,
  internalNotes: z.string().max(1000).optional().nullable(),
  assignedToId: z.string().optional().nullable(),
});

export type CreateInquiryInput = z.infer<typeof CreateInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof UpdateInquiryStatusSchema>;
