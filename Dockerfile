FROM node:24-bookworm-slim AS build

WORKDIR /app

# Install pnpm directly and avoid Corepack/Railway shim conflicts.
RUN npm install --global --force pnpm@11.22.0

# Copy only files that actually exist at the monorepo root.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY .npmrc .npmrc
COPY .pnpmrc .pnpmrc
COPY artifacts/api-server/package.json artifacts/api-server/package.json
COPY lib/db/package.json lib/db/package.json
COPY lib/api-zod/package.json lib/api-zod/package.json
COPY lib/data/package.json lib/data/package.json
COPY lib/api-client-react/package.json lib/api-client-react/package.json
COPY lib/api-spec/package.json lib/api-spec/package.json

RUN pnpm config set dangerouslyAllowAllBuilds true && pnpm install --frozen-lockfile

COPY artifacts/api-server artifacts/api-server
COPY lib/db lib/db
COPY lib/api-zod lib/api-zod
COPY lib/data lib/data
COPY lib/api-client-react lib/api-client-react
COPY lib/api-spec lib/api-spec

RUN pnpm --filter @workspace/db exec tsc -p tsconfig.json \
  && pnpm --filter @workspace/api-server run typecheck \
  && pnpm --filter @workspace/api-server run build

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
