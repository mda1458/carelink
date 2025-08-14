export async function GET() {
  return Response.json({ ok:true, version: process.env.VERCEL_GIT_COMMIT_SHA ?? "local", buildTime: new Date().toISOString() });
}
