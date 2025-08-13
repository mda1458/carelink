/**
 * Aggregate and export your Zod schemas here.
 * Example user/login route schema included.
 */
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const LoginRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const LoginResponse = z.object({
  ok: z.literal(true),
  user: z.object({
    id: z.string().optional(),
    email: z.string().email()
  })
});

export type LoginRequest = z.infer<typeof LoginRequest>;
export type LoginResponse = z.infer<typeof LoginResponse>;
