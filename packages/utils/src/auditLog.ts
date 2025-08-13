import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const STREAM_KEY = "audit:events"; // append-only stream

export type AuditEvent = {
  ts?: number;
  actor: { id?: string; email?: string; role?: string };
  action: string;           // 'user.create', 'offer.update', etc.
  target?: { type?: string; id?: string };
  details?: Record<string, unknown>; // avoid PHI/PII
};

export async function logAudit(event: AuditEvent) {
  const payload = { ...event, ts: Date.now() };
  const pairs = objectToPairs(payload);
  // Redis.xadd expects alternating key-value pairs
  await (redis.xadd as any)(STREAM_KEY, "*", ...pairs);
}

function objectToPairs(obj: Record<string, unknown>, prefix = ""): string[] {
  const pairs: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v === null || v === undefined) continue;
    if (typeof v === "object" && !Array.isArray(v) && v !== null) {
      pairs.push(...objectToPairs(v as Record<string, unknown>, key));
    } else {
      pairs.push(key, String(v));
    }
  }
  return pairs;
}
