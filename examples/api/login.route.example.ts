import { z } from "zod";
import { NextResponse, NextRequest } from "next/server";
import { validate } from "packages/utils/src/validate";
import { verifyCsrf } from "packages/utils/src/csrf";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  if (!verifyCsrf(req)) {
    return new NextResponse("Bad CSRF token", { status: 403 });
  }
  const body = await req.json();
  const dto = validate(LoginSchema, body);

  // ... authenticate and set cookie ...
  return NextResponse.json({ ok: true, user: { email: dto.email } });
}
