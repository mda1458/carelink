import { NextResponse } from "next/server";

export async function GET() {
  const checks = {
    node: process.version,
    mode: process.env.NODE_ENV,
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    sentryConfigured: Boolean(process.env.SENTRY_DSN),
    upstashConfigured: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  };
  return NextResponse.json(checks);
}
