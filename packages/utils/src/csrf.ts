/**
 * Double-submit cookie CSRF helper.
 * Use in Node (route handlers); do not call from Edge middleware.
 */
import { randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const CSRF_COOKIE = "csrf-token";

export function createCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

export function setCsrfCookie(token: string, opts?: { secure?: boolean }) {
  cookies().set({
    name: CSRF_COOKIE,
    value: token,
    httpOnly: false, // double-submit cookie is readable by JS
    sameSite: "strict",
    secure: opts?.secure ?? true,
    path: "/",
  });
}

export function getCsrfCookie(): string | null {
  return cookies().get(CSRF_COOKIE)?.value ?? null;
}

/**
 * Verifies CSRF by comparing header to cookie value using a timing-safe compare.
 * Expect header: `x-csrf-token`.
 */
export function verifyCsrf(req: NextRequest): boolean {
  const cookieVal = getCsrfCookie();
  const headerVal = req.headers.get("x-csrf-token");
  if (!cookieVal || !headerVal) return false;
  try {
    return timingSafeEqual(Buffer.from(cookieVal), Buffer.from(headerVal));
  } catch {
    return false;
  }
}
