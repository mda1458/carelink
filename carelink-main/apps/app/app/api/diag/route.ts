export async function GET() {
  const api = process.env.NEXT_PUBLIC_API_BASE_URL; let apiBase = false;
  try { if (api) { const r = await fetch(`${api}/v1/health`, { cache: "no-store" }); apiBase = r.ok; } } catch {}
  return Response.json({ status:"ok", envs:["NEXT_PUBLIC_API_BASE_URL","SENTRY_DSN"].filter((k)=>!!process.env[k as keyof NodeJS.ProcessEnv]), sentry:!!process.env.SENTRY_DSN, apiBase });
}
