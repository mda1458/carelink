# Security Policy

## Threat Model (high level)
- Credential stuffing & brute-force → rate limiting + lockout
- CSRF on cookie-based flows → double-submit token
- XSS → strong CSP, `next-safe` headers, encode untrusted content
- SSRF/file upload abuse → content-type checks, size limits, AV scanning (if applicable)
- Secrets exposure → env-only, rotated, no logs of secrets

## Controls Checklist
- [x] CSP & security headers
- [x] RBAC cookie with HttpOnly+Secure+SameSite=strict
- [x] Distributed rate limiting (Redis/Upstash)
- [x] CSRF protection on state-changing routes
- [x] Zod validation on all request boundaries
- [x] Logging with redaction (Pino) + Sentry breadcrumbs
- [ ] Regular dependency updates (Renovate)
- [ ] Quarterly security review

## Snyk
- Action workflow runs on PRs/weekly schedule
- Fails build on Critical/High
- Policy file (`.snyk`) used only with expiry for justified ignores

## Incident Response
1. Rotate affected secrets immediately.
2. Disable vulnerable endpoints or feature flags if needed.
3. Triage severity and user impact; notify stakeholders.
4. Postmortem within 72 hours with remediation tasks.
