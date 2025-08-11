import { SignJWT, jwtVerify } from "jose";
export type Role = "admin" | "employer" | "clinician" | "guest";
const ROLE_COOKIE_NAME = "role_sig";
const ROLE_TTL_SECONDS = 60 * 60 * 4;
const enc = new TextEncoder();
export function roleCookieName() { return ROLE_COOKIE_NAME; }
function secret(): Uint8Array {
  const k = process.env.ROLE_COOKIE_SECRET ?? process.env.JWT_SECRET ?? "";
  if (!k || k.length < 16) throw new Error("ROLE_COOKIE_SECRET/JWT_SECRET not set or too short");
  return enc.encode(k);
}
export async function signRoleCookie(input: { role: Role; sub?: string }) {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ role: input.role, sub: input.sub })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now).setExpirationTime(now + ROLE_TTL_SECONDS).sign(secret());
}
export async function verifyRoleCookie(token: string): Promise<{ role: Role; sub?: string } | null> {
  try { const { payload } = await jwtVerify(token, secret());
    const role = (payload.role as Role) ?? "guest";
    const sub = payload.sub as string | undefined;
    if (!role || role === "guest") return { role: "guest" };
    return { role, sub };
  } catch { return null; }
}
export function allowed(needle: Role, list: Role[]) { return list.includes(needle); }
