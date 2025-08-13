import { NextResponse, NextRequest } from "next/server";
import { logAudit } from "packages/utils/src/auditLog";
import { hasRole } from "packages/utils/src/rbac";

export async function POST(req: NextRequest) {
  const role = "user"; // TODO: read from your cookie/JWT
  if (!hasRole(role, "user")) return new NextResponse("Forbidden", { status: 403 });
  const body = await req.json();
  // ... perform the state change ...
  await logAudit({
    actor: { email: "demo@example.com", role },
    action: "demo.create",
    target: { type: "demo", id: "123" },
    details: { size: body?.size }
  });
  return NextResponse.json({ ok: true });
}
