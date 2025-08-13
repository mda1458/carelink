setup:
	pnpm i --frozen-lockfile

dev:
	pnpm -C apps/web dev

test:
	npx playwright install --with-deps || true
	pnpm e2e

lhci:
	pnpm -C apps/web export && pnpm lhci

openapi:
	pnpm openapi:build

audit:
	npx knip && npx gitleaks detect --no-banner -v
