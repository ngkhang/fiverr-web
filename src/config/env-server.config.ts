import { validateEnv } from '@/lib/validate/env.validate';
import z from 'zod';

const serverEnvSchema = z.object({
  ACADEMY_API_BASE_URL: z.url('Academy API URL is must be validate URL or not empty'),
  ACADEMY_TOKEN: z.string().min(1, 'Academy token is required'),
});

export const serverEnv = validateEnv(serverEnvSchema, 'server', {
  ACADEMY_API_BASE_URL: process.env.ACADEMY_API_BASE_URL,
  ACADEMY_TOKEN: process.env.ACADEMY_TOKEN,
});
