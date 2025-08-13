# Testing Strategy

## Layers
- **Unit**: logic in `packages/*` with Jest/ts-jest.
- **E2E**: Playwright flows in `apps/web/tests`.
- **A11y**: Axe checks in Playwright (fail on critical violations).
- **Visual**: baseline screenshots in Playwright (review diffs in PRs).
- **Mutation**: Stryker for `packages/utils` to prove unit tests.

## Commands
```bash
pnpm test            # unit
npx playwright test  # e2e+a11y+visual (see workflow)
npx stryker run      # mutation testing (longer; run nightly)
npx knip             # dead code
```
