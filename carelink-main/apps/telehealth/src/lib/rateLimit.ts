type Bucket = { tokens: number; updatedAt: number };
const buckets = new Map<string, Bucket>(); const CAP = 10; const WINDOW_MS = 5*60*1000;
export function clientKey(ip: string | null | undefined, cookieId: string | null | undefined) { return [ip||"noip", cookieId||"noc"].join(":"); }
export function take(key: string) { const now = Date.now(); const b = buckets.get(key) ?? { tokens: CAP, updatedAt: now };
  const elapsed = now - b.updatedAt; const refill = Math.floor(elapsed / WINDOW_MS) * CAP;
  const tokens = Math.min(CAP, b.tokens + refill); const next = tokens > 0 ? tokens - 1 : 0;
  buckets.set(key, { tokens: next, updatedAt: tokens !== b.tokens ? now : b.updatedAt }); return next >= 0 && tokens > 0; }
