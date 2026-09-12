import z from 'zod';

export const validateEnv = <T>(
  schema: z.ZodType<T>,
  label: string,
  values: Record<string, unknown>,
): T => {
  const parsed = schema.safeParse(values);
  const errorMes = `Invalid ${label} environment variables`;

  if (!parsed.success) {
    console.error(errorMes, z.flattenError(parsed.error).fieldErrors);
    throw new Error(errorMes);
  }

  return parsed.data;
};
