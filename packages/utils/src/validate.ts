import { ZodSchema } from "zod";

/**
 * Validates unknown data with a Zod schema and returns a typed value.
 * Throws a 400 error with a concise message if validation fails.
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const message = parsed.error.errors
      .map((e) => `${e.path.join(".") || "(root)"}: ${e.message}`)
      .join("; ");
    const err = new Error(`ValidationError: ${message}`) as Error & { status?: number };
    err.status = 400;
    throw err;
  }
  return parsed.data;
}
