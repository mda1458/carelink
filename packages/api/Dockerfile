# ---- deps ----
    FROM node:20-alpine AS deps
    WORKDIR /repo
    # Enable pnpm via corepack
    RUN corepack enable && corepack prepare pnpm@9.4.0 --activate
    # Copy workspace manifests so pnpm can resolve the monorepo
    COPY pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.base.json ./
    COPY packages/api/package.json packages/api/package.json
    # Install all deps needed for building the API
    RUN pnpm install --frozen-lockfile

    # ---- build ----
    FROM node:20-alpine AS build
    WORKDIR /repo
    RUN corepack enable && corepack prepare pnpm@9.4.0 --activate
    # Bring in installed deps and full source
    COPY --from=deps /repo /repo
    COPY . .
    # Build only the API package
    RUN pnpm --filter @carelink/api build

    # ---- runtime ----
    FROM node:20-alpine
    WORKDIR /app
    ENV NODE_ENV=production
    # Minimal runtime: only API dist and runtime deps
    COPY packages/api/package.json ./
    RUN corepack enable && corepack prepare pnpm@9.4.0 --activate \
      && pnpm add express@^4.19.2
    COPY --from=build /repo/packages/api/dist ./dist
    EXPOSE 4000
    CMD ["node", "dist/index.js"]
