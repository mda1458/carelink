# Phase 3 — Contracts, Observability, RBAC & Audit Log

This pack adds:

- Zod → OpenAPI generation (`scripts/generate-openapi.ts`)
- Next.js bundle analyzer wiring
- OpenTelemetry stubs for tracing
- Central RBAC guard
- Append-only audit log via Upstash Redis Streams

## Install

```bash
pnpm add -D @asteasolutions/zod-to-openapi openapi-typescript @next/bundle-analyzer
pnpm add @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node   @opentelemetry/exporter-trace-otlp-http
pnpm add @upstash/redis
```

Add scripts to root package.json:

```json
{
  "scripts": {
    "openapi:build": "tsx scripts/generate-openapi.ts",
    "analyze:web": "ANALYZE=true pnpm -C apps/web build"
  }
}
```

Env additions:

```
OTEL_EXPORTER_OTLP_ENDPOINT=
OTEL_EXPORTER_OTLP_HEADERS=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Wire analyzer in `apps/web/next.config.mjs`:

```js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  /* existing config */
});
```

Add `instrumentation.ts` to apps where you want tracing (example included).
