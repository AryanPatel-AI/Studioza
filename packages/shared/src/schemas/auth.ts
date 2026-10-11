import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Valid studio credentials required.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const UserRoleEnum = z.enum(['ADMIN', 'EDITOR', 'PHOTOGRAPHER']);

export const UpdateUserRoleSchema = z.object({
  role: UserRoleEnum,
});

export type LoginInput = z.infer<typeof LoginSchema>;
