# API Contracts (OpenAPI)

- Source of truth: Zod schemas in `packages/api/schemas/*`.
- Build OpenAPI: `pnpm openapi:build` ⇒ `openapi/openapi.json`.
- Generate typed client (optional): `openapi-typescript openapi/openapi.json -o packages/api/client/types.ts`.
- Contract tests: add E2E checks to ensure responses conform to spec.
