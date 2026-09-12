import { validateEnv } from '@/lib/validate/env.validate';
import z from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_TIMEOUT: z
    .string()
    .default('15000')
    .transform((val) => Number(val))
    .pipe(z.number().positive()),
});

export const clientEnv = validateEnv(clientEnvSchema, 'client', {
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
});
