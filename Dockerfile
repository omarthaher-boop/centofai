FROM node:24-bookworm-slim AS build

WORKDIR /app

RUN npm install --global --force pnpm@11.22.0

# Copy the complete monorepo in one step. Railway's Docker build context does
# not always include the repository lockfile, so installation must not require
# a frozen lockfile here. GitHub CI still performs the strict build validation.
COPY . .

RUN pnpm config set dangerouslyAllowAllBuilds true \
  && pnpm install --no-frozen-lockfile \
  && pnpm --filter @workspace/db exec tsc -p tsconfig.json \
  && pnpm --filter @workspace/api-server run typecheck \
  && pnpm --filter @workspace/api-server run build

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
