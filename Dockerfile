# syntax=docker/dockerfile:1

# ---- Next.js frontend (web) ----
# Builds the Next.js app and runs `next start` on port 3000.
# The API is a separate container; this container reaches it via API_URL.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts skips the root `postinstall` (which installs apps/api).
# The web image does not need the API's dependencies.
RUN npm ci --ignore-scripts

FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# The Next.js `rewrites()` destination for /api/v1/* uses API_URL. Default to
# the compose service address (api service name + its PORT). docker-compose
# overrides this via build args / environment.
ARG API_URL=http://api:4001
ENV API_URL=${API_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Install production deps only (Next.js itself is a runtime dependency).
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts
EXPOSE 3000
# `next start` reads API_URL at startup to wire up the /api/v1 rewrite,
# and serves the public/ folder (including the shared media volume) from disk.
CMD ["npm", "start"]
