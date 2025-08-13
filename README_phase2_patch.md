# Phase 2 — Quality Gates & Testing PR Pack

This pack adds:

- **Lighthouse CI** budgets (LCP/TBT/CLS) + workflow
- **Playwright** E2E, a11y (axe), and visual baseline tests + workflow
- **Gitleaks** secret scanning workflow + config
- **Renovate** bot config (weekly, low-noise)
- **Knip** config for dead code detection
- **Stryker** config for mutation testing (utils)

## Integration steps

1. Copy files into the repo preserving paths.
2. Install required dev deps:
   ```bash
   pnpm add -D @axe-core/playwright @playwright/test @lhci/cli knip stryker @stryker-mutator/core gitleaks
   ```
   (Playwright will prompt to install browsers.)
3. Add scripts to root `package.json` (if you want):
   ```json
   {
     "scripts": {
       "e2e": "playwright test apps/web/tests --config=apps/web/playwright.config.ts",
       "lhci": "lhci autorun --config=./lighthouserc.json",
       "knip": "knip",
       "mutate": "stryker run"
     }
   }
   ```
4. Commit on a branch and open a PR. The three workflows will appear:
   - **Playwright** (E2E/a11y/visual)
   - **Lighthouse CI**
   - **Gitleaks**
5. For visual tests, approve the **first** baseline image (`home.png`) by committing the snapshot produced locally.
