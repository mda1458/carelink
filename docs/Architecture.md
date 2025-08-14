# Architecture Overview

## Topology
- Monorepo (Turborepo) with apps: `web`, `platform`, `telehealth`, `app`
- Shared packages: `ui`, `utils`, `api`, `copilot`
- Hosting: (fill in) — e.g., Vercel (web), Railway/Supabase (API/DB)
- Observability: Sentry (errors+perf), OpenTelemetry (optional)
- Security posture: CSP + headers, RBAC, CSRF, distributed rate limiting

## Request Lifecycle (Web/API)
1. **Client** → Next.js route (server action or route handler)
2. **Middleware**: rate limit (Upstash Redis), auth gate for protected paths
3. **Handler**: `validate()` input with Zod → call service → return typed response
4. **Errors**: throw typed errors; centralized error boundary logs to Pino/Sentry
5. **Response**: set security headers; cache or tag revalidate where safe

## Data & Secrets
- Secrets via platform env; never committed
- Env schema validated on boot
- Access control: RBAC via signed cookie/JWT
- PHI/PII redaction in logs

## Build & CI
- CI stages: typecheck → lint → unit → build → E2E + a11y → SAST/SBOM → DAST
- Budgets: Lighthouse (LCP/CLS/TBT), bundle analyzer thresholds

## Diagrams
- Insert architecture diagram (web ↔ api ↔ db ↔ redis) here.
