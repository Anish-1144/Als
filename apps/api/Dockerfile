# syntax=docker/dockerfile:1

# ---- Express API ----
# Runs the API with tsx (TypeScript executed directly, matching `npm start`).
# Build context must be the repository ROOT so the monorepo layout
# (/app/apps/api + /app/public/media) is preserved — the API resolves its
# uploads dir relative to its own source location.

FROM node:22-bookworm-slim
WORKDIR /app/apps/api

# Build tools so the native `bcrypt` module installs reliably on any arch.
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Install deps (includes tsx, which `npm start` uses at runtime).
COPY apps/api/package.json apps/api/package-lock.json ./
RUN npm ci

COPY apps/api/ ./

# The API imports shared modules from the repo-root `lib/` directory via
# ../../../../lib/* (resolving to /app/lib) and the @/lib/* path alias.
COPY lib /app/lib

# Uploads + static media live here and are shared with the web container.
RUN mkdir -p /app/public/media

EXPOSE 4001
CMD ["npm", "start"]
