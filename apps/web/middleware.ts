import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { limit } from "packages/utils/src/rateLimit"; // adjust path alias if needed

export async function middleware(req: NextRequest) {
  // Only rate-limit API routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const key = `ip:${ip}:path:${req.nextUrl.pathname}`;
    const { success, limit: l, remaining, reset } = await limit(key);

    const res = NextResponse.next();
    res.headers.set("X-RateLimit-Limit", String(l));
    res.headers.set("X-RateLimit-Remaining", String(remaining));
    res.headers.set("X-RateLimit-Reset", String(reset));

    if (!success) {
      return new NextResponse("Too Many Requests", { status: 429, headers: res.headers });
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
