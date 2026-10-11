import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('4000')
    .transform((v) => parseInt(v, 10)),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().optional(),
  SESSION_SECRET: z.string().min(16).default('studioza-production-secret-signing-key-32b'),
  COOKIE_DOMAIN: z.string().optional(),
  ALLOWED_ORIGINS: z
    .string()
    .default('http://localhost:3000,http://localhost:4000')
    .transform((v) => v.split(',').map((s) => s.trim())),
  REVALIDATE_SECRET: z.string().default('studioza-revalidate-secret'),
});

export const env = EnvSchema.parse(process.env);
