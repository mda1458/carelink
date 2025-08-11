import { z } from "zod";
export const envSchema = z.object({
  NODE_ENV: z.enum(["development","test","production"]).default("development"),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  ROLE_COOKIE_SECRET: z.string().min(16).optional(),
  JWT_SECRET: z.string().min(16).optional(),
  SENTRY_DSN: z.string().url().optional()
});
export type Env = z.infer<typeof envSchema>;
export function loadEnv(): Env { return envSchema.parse(process.env); }
