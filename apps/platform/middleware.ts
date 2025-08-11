import { NextResponse, type NextRequest } from "next/server";
import { roleCookieName, verifyRoleCookie } from "./src/lib/roleCookie";

export const config = { matcher: ["/protected/:path*"] };

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const sig = req.cookies.get(roleCookieName())?.value;
  if (sig) {
    const v = await verifyRoleCookie(sig);
    if (v && v.role && v.role !== "guest") return NextResponse.next();
  }
  if (process.env.NODE_ENV !== "production") {
    const devRole = req.cookies.get("role")?.value;
    if (devRole && ["admin","employer","clinician"].includes(devRole)) return NextResponse.next();
  }
  const login = new URL("/login", req.url);
  login.searchParams.set("returnTo", url.pathname);
  return NextResponse.redirect(login);
}
