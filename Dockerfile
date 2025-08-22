# Stage 1 - Build
FROM node:22 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /app/

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm install --frozen-lockfile

COPY src /app/
RUN pnpm exec next build

# remove development dependencies
RUN pnpm prune --prod

# Stage 2 - Running the app
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /app/next.config.js ./
#COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

EXPOSE 80

ENTRYPOINT ["pnpm", "exec", "next", "start", "-p", "80"]
