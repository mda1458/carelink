import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { roleCookieName, verifyRoleCookie, allowed, type Role } from "./roleCookie";
const enc = new TextEncoder();
export async function currentUser(): Promise<{ id?: string; role: Role }> {
  const jar = await cookies();
  const roleSig = jar.get(roleCookieName())?.value;
  if (roleSig) { const v = await verifyRoleCookie(roleSig); if (v) return { id: v.sub, role: v.role }; }
  const token = jar.get("auth_token")?.value;
  const secret = process.env.JWT_SECRET;
  if (token && secret) { try { const { payload } = await jwtVerify(token, enc.encode(secret));
    const role = (payload.role as Role) ?? "guest"; return { id: (payload.sub as string)||undefined, role }; } catch {} }
  return { role: "guest" };
}
export { allowed, type Role };
