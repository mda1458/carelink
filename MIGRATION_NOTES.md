# Migration Notes — Security & Quality Packs Injected

This repo has been patched with Phase 1–3 enhancements.

## Files added/updated

- added: packages/utils/src/validate.ts
- added: packages/utils/src/csrf.ts
- added: packages/utils/src/logger.ts
- added: packages/utils/src/rateLimit.ts
- added: docs/Architecture.md
- added: docs/SECURITY.md
- added: .github/workflows/snyk.yml
- added: .snyk.example
- added: README_patch.md
- added: packages/utils/src/env.example.extend.md
- added: examples/api/login.route.example.ts
- added: apps/web/middleware.ts
- created: .gitignore with additions
- added: lighthouserc.json
- added: .github/workflows/lighthouse.yml
- added: apps/web/playwright.config.ts
- added: apps/web/tests/a11y.spec.ts
- added: apps/web/tests/flows.smoke.spec.ts
- added: apps/web/tests/visual-home.spec.ts
- added: .github/workflows/playwright.yml
- added: stryker.conf.json
- added: knip.json
- added: .github/workflows/gitleaks.yml
- added: .gitleaks.toml
- added: renovate.json
- added: docs/TESTING.md
- added: README_phase2_patch.md
- added: packages/api/schemas/index.ts
- added: scripts/generate-openapi.ts
- added: docs/CONTRACTS.md
- added: apps/web/instrumentation.ts
- added: packages/utils/src/rbac.ts
- added: packages/utils/src/auditLog.ts
- added: examples/api/audit.example.ts
- added: README_phase3_patch.md

## Next steps (run locally)

1. Install packages:
   pnpm add @upstash/ratelimit @upstash/redis pino zod
   pnpm add -D @axe-core/playwright @playwright/test @lhci/cli knip @stryker-mutator/core gitleaks @asteasolutions/zod-to-openapi openapi-typescript @next/bundle-analyzer

2. Env vars (local + prod):
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   LOG_LEVEL=info
   ROLE_COOKIE_SECRET=change_me
   JWT_SECRET=change_me
   SENTRY_DSN= (optional)
   OTEL_EXPORTER_OTLP_ENDPOINT= (optional)
   OTEL_EXPORTER_OTLP_HEADERS= (optional)

3. If you already have apps/web/middleware.ts, compare with middleware.ts.rate-limit.merge and integrate.

4. For bundle analyzer, wrap apps/web/next.config.\* with @next/bundle-analyzer as described in README_phase3_patch.md.

5. Run the gates:
   pnpm typecheck && pnpm lint
   pnpm -C apps/web dev (in one terminal)
   npx playwright install --with-deps && pnpm e2e
   pnpm lhci
   pnpm openapi:build

6. Commit all changes on a feature branch and open a PR. CI should show Lighthouse/Playwright/Gitleaks/Snyk.

## Phase 4: Finalization files added

- added: .zap-rules.tsv
- added: commitlint.config.cjs
- added: .lintstagedrc.json
- added: eslint.strict.mjs
- added: cspell.json
- added: .editorconfig
- added: .nvmrc
- added: Makefile
- added: .github/pull_request_template.md
- added: .github/workflows/codeql.yml
- added: .github/workflows/zap-baseline.yml
- added: .github/workflows/coverage.yml
- added: .github/workflows/spellcheck.yml
- added: .github/ISSUE_TEMPLATE/acceptance-checklist.md
- added: .husky/pre-commit
- added: .husky/commit-msg
- added: apps/web/app/api/health/route.ts
- added: apps/web/app/api/diag/route.ts
- added: apps/web/tests/keyboard.spec.ts
- added: apps/web/tests/headers.spec.ts
- added: docs/adr/0000-template.md

### After pulling this branch, run:

pnpm add -D @commitlint/config-conventional @commitlint/cli husky lint-staged prettier eslint cspell
pnpm add -D zaproxy/actions-common @zapier/wait-on # optional

# Initialize husky hooks

pnpm prepare
