import { z } from 'zod';

export const BookingStatusEnum = z.enum([
  'REQUESTED',
  'CONFIRMED',
  'RESCHEDULE_PROPOSED',
  'COMPLETED',
  'CANCELLED',
]);
export type BookingStatus = z.infer<typeof BookingStatusEnum>;

export const CreateBookingSchema = z
  .object({
    idempotencyKey: z.string().uuid({ message: 'Valid idempotency token required.' }),
    serviceId: z.string().min(1, { message: 'Service selection required.' }),
    packageId: z.string().optional().nullable(),
    inquiryId: z.string().optional().nullable(),
    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be formatted as YYYY-MM-DD.' })
      .refine(
        (val) => {
          const selected = new Date(val);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selected >= today;
        },
        { message: 'Preferred date cannot reside in the past.' }
      ),
    backupDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be formatted as YYYY-MM-DD.' })
      .optional()
      .nullable(),
    venue: z.string().min(2, { message: 'Venue location required.' }).max(120),
    city: z.string().min(2, { message: 'City required.' }).max(80),
    accessNotes: z.string().max(500).optional().nullable(),
    details: z.record(z.string(), z.any()).default({}),
    contactName: z.string().min(2, { message: 'Contact name required.' }).max(80),
    contactEmail: z.string().email({ message: 'Valid correspondence email required.' }),
    contactPhone: z.string().min(8, { message: 'Contact phone number required.' }).max(25),
    consentAt: z.string().datetime(),
    dossier: z.record(z.string(), z.any()).default({}),
  })
  .refine(
    (data) => {
      if (!data.backupDate) return true;
      const preferred = new Date(data.preferredDate);
      const backup = new Date(data.backupDate);
      return backup > preferred;
    },
    {
      message: 'Backup commission date must occur after the preferred date.',
      path: ['backupDate'],
    }
  );

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
