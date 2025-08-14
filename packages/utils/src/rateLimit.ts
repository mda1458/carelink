// Distributed rate limiter using Upstash Redis (Edge-compatible)
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Requires env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

// Example: 100 requests per minute, sliding window
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
});

export async function limit(key: string) {
  return limiter.limit(key);
}
