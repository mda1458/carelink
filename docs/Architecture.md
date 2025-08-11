# Architecture

- Turbo workspaces: apps/_ and packages/_.
- Next.js 14 App Router for web/platform/telehealth/app.
- Shared packages: ui, utils, api, copilot.
- Strict TS base + ESLint flat + a11y guard.
- Security: CSP (Report-Only non-prod; Enforce prod), RBAC, hardened upload, SAST/DAST/SBOM.
- Observability: Pino, OTel traces.
