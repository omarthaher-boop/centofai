FROM node:24-bookworm-slim AS build

WORKDIR /app

RUN npm install --global --force pnpm@11.22.0

# Copy the complete monorepo in one step. Railway's Docker cache had trouble
# resolving individual workspace COPY paths even though they exist in Git.
COPY . .

RUN pnpm config set dangerouslyAllowAllBuilds true \
  && pnpm install --frozen-lockfile \
  && pnpm --filter @workspace/db exec tsc -p tsconfig.json \
  && pnpm --filter @workspace/api-server run typecheck \
  && pnpm --filter @workspace/api-server run build

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
