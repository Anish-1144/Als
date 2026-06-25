# Deploying to a VPS with Docker

This project runs as two containers orchestrated by `docker-compose.yml`:

| Service | What it is              | Port  | Public? |
| ------- | ----------------------- | ----- | ------- |
| `web`   | Next.js frontend        | 3000  | yes     |
| `api`   | Express API (`apps/api`)| 4000  | no (internal only) |

MongoDB is **external** (MongoDB Atlas) — it is configured through `MONGO_URI`,
so there is no database container.

Uploaded media is stored on a shared Docker volume (`media`) that the API writes
to and the web container serves at `/media/*`.

> For a full step-by-step VPS walkthrough (git → env → docker → Nginx → HTTPS →
> domain → CORS), see **`VPS-SETUP.md`**.

---

## 1. Prerequisites on the VPS

- Docker Engine + Docker Compose plugin
  ```bash
  curl -fsSL https://get.docker.com | sh
  ```
- This repository on the server (e.g. `git clone …`).

## 2. Configure environment

Create a `.env` file in the project root (copy from `.env.example`) and set real
values. Compose reads it via `env_file`:

```bash
cp .env.example .env
nano .env
```

Important for production:

- `MONGO_URI` — your Atlas connection string (must include the DB name).
- `JWT_SECRET` — a long random string.
- `CORS_ORIGIN` — your public site URL, e.g. `https://yourdomain.com`.
- `CLOUDINARY_*` — required; media uploads are stored in Cloudinary.

> `API_URL` is set automatically to `http://api:4000` inside the stack — you do
> not need to set it in `.env` for Docker.

## 3. Build and start

```bash
docker compose up -d --build
```

Check status and logs:

```bash
docker compose ps
docker compose logs -f
```

The site is now on `http://<your-server-ip>:3000`.

## 4. Seed the first admin user

Run once after the database is reachable (uses `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` from `.env`):

```bash
docker compose run --rm api npm run seed
```

## 5. Put it behind a domain + HTTPS (recommended)

Only port 3000 is published. Run a reverse proxy in front of it. Example with
Caddy (automatic HTTPS):

```
yourdomain.com {
    reverse_proxy localhost:3000
}
```

Or nginx:

```nginx
server {
    server_name yourdomain.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    client_max_body_size 12M;   # allow media uploads (API limit is 10MB)
}
```

After adding a proxy, set `CORS_ORIGIN=https://yourdomain.com` in `.env` and
restart: `docker compose up -d`.

## Common operations

```bash
# Rebuild after code changes
docker compose up -d --build

# Stop / start
docker compose down
docker compose up -d

# View only the API logs
docker compose logs -f api

# Open a shell in a container
docker compose exec web sh
```

## Notes

- Uploaded media persists in the `media` Docker volume across rebuilds.
  Back it up with `docker run --rm -v new-als_media:/data -v $PWD:/backup \
  busybox tar czf /backup/media-backup.tar.gz -C /data .`
- The web build does not need the API or database running — pages fall back to
  bundled mock data during the build.

---

## Local commands (testing on your own machine)

```bash
# Stop the local containers
docker compose down
# Add -v only if you also want to delete the media volume (you usually don't):
docker compose down -v

# Start it again later
docker compose up -d --build    # rebuild + start (use after code changes)
docker compose up -d            # just start (no rebuild)

# Check it's working
docker compose ps               # container status
docker compose logs -f          # live logs (Ctrl+C to exit)
docker compose logs -f api      # API logs only
docker compose logs -f web      # web logs only
# Then open http://localhost:3000 in your browser.

# Other handy ones
docker compose restart          # restart both containers
docker compose stop             # stop without removing
docker compose start            # start stopped containers
docker compose exec web sh      # shell inside the web container
```
