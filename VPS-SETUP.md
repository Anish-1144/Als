# VPS Deployment — From Scratch (Docker + Nginx + HTTPS)

Full walkthrough in order:
**git pull → env setup → docker up → verify web:3002 & api:4001 → Nginx →
Certbot/HTTPS → domain → update CORS to the domain.**

The stack = two containers:
- **web** (Next.js) → host port **3002** (public via Nginx; 3000 is used by another project)
- **api** (Express) → host port **4001** (loopback only, proxied internally by web)

MongoDB is **Atlas** (external, allows all networks). Media uploads go to
**Cloudinary**.

Throughout, replace:
- `USER@SERVER_IP` → your VPS login + IP
- `yourdomain.com` → your domain

---

## STEP 0 — Connect & install Docker (first time only)

```bash
ssh USER@SERVER_IP

# Install Docker + Compose
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
docker --version && docker compose version
```

---

## STEP 1 — Get the code (git)

```bash
mkdir -p ~/apps && cd ~/apps

# First time:
git clone <your-repo-url> new-als
cd new-als

# Later updates (re-deploy):
# cd ~/apps/new-als && git pull
```

---

## STEP 2 — Environment setup (.env)

`.env` is NOT in git, so create it on the server:

```bash
cp .env.example .env
nano .env
```

Fill in your real values:

```ini
# MongoDB Atlas (include the db name, e.g. /als-mortgage)
MONGO_URI=mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/als-mortgage?appName=Cluster0

JWT_SECRET=a-long-random-secret-string
JWT_EXPIRES_IN=7d

# Set to your domain (used by API CORS). For now you can keep localhost;
# we update this in STEP 8 once the domain works.
CORS_ORIGIN=http://SERVER_IP:3002

# First admin account (created by the seed step)
SEED_ADMIN_EMAIL=admin@yourdomain.com
SEED_ADMIN_PASSWORD=ChangeThisStrongPassword!

# Cloudinary (required — media is stored here)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=als
```

> You do NOT need to set `API_URL` — Docker wires `web → api` automatically
> (built in as `http://api:4001`).

Save: `Ctrl+O`, `Enter`, then `Ctrl+X`.

---

## STEP 3 — Build & start with Docker

```bash
docker compose up -d --build
```

(First build takes a few minutes.)

```bash
docker compose ps          # both should say "Up"
docker compose logs -f     # watch startup; Ctrl+C to stop watching
```

---

## STEP 4 — Verify the backend (api:4001)

```bash
# API health (bound to localhost on the VPS)
curl http://localhost:4001/health
# -> {"success":true,"data":{"status":"ok"}}

# Check the api logs say it connected
docker compose logs api | tail -5
# -> MongoDB connected
# -> API running on http://localhost:4001
# -> Cloudinary: configured
```

If `MongoDB connected` is missing, your `MONGO_URI` is wrong — fix `.env` and run
`docker compose up -d` again.

---

## STEP 5 — Verify the frontend (web:3002)

```bash
curl -I http://localhost:3002          # -> HTTP/1.1 200 OK
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3002/api/v1/homepage
# -> 200  (confirms web is proxying to the api correctly)
```

If your firewall allows port 3002 you can also open
`http://SERVER_IP:3002` in a browser — but the proper way is via Nginx below.

---

## STEP 6 — Create the first admin user (run once)

```bash
docker compose run --rm api npm run seed
```

Uses `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` from `.env`.

---

## STEP 7 — Nginx reverse proxy + HTTPS

### 7a. Point your domain at the server
In your DNS provider, create an **A record**:
`yourdomain.com → SERVER_IP` (and optionally `www → SERVER_IP`).
Wait a few minutes for it to propagate (`ping yourdomain.com` should show your IP).

### 7b. Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
```

### 7c. Create the site config

```bash
sudo nano /etc/nginx/sites-available/als
```

Paste:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Allow media uploads (API limit is 10MB)
    client_max_body_size 12M;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable it and reload:

```bash
sudo ln -s /etc/nginx/sites-available/als /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # remove the default page
sudo nginx -t                                 # test config
sudo systemctl reload nginx
```

Now `http://yourdomain.com` should load the site.

### 7d. Firewall (if ufw is enabled)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'    # opens 80 + 443
sudo ufw enable
```

### 7e. HTTPS with Certbot (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts (enter email, agree to terms, choose redirect HTTP→HTTPS).
Certbot edits the Nginx config for SSL and sets up **auto-renewal**.

Verify renewal works:

```bash
sudo certbot renew --dry-run
```

Now `https://yourdomain.com` is live with a valid certificate.

---

## STEP 8 — Update CORS to your domain

Edit `.env`:

```bash
cd ~/apps/new-als
nano .env
```

Change:

```ini
CORS_ORIGIN=https://yourdomain.com
```

Apply it (recreates the api container with the new env):

```bash
docker compose up -d
```

> No rebuild needed — `CORS_ORIGIN` is a runtime value. (The internal
> `API_URL=http://api:4001` is unaffected by your domain.)

---

## Done ✅

- Site: `https://yourdomain.com`
- Admin: `https://yourdomain.com` → log in with your seeded admin account.

---

## Re-deploying after code changes

```bash
cd ~/apps/new-als
git pull
docker compose up -d --build
```

## Everyday commands

```bash
docker compose ps                 # status
docker compose logs -f web        # web logs
docker compose logs -f api        # api logs
docker compose restart            # restart both
docker compose down               # stop & remove containers (media volume kept)
docker compose up -d              # start again
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `MongoDB connected` missing in api logs | Wrong `MONGO_URI` in `.env`; fix and `docker compose up -d` |
| Site shows generic/"mock" content | api can't reach DB — check `docker compose logs api` |
| Image uploads fail | Check `CLOUDINARY_*` in `.env` (api logs print `Cloudinary: configured`) |
| `502 Bad Gateway` from Nginx | web container down — `docker compose ps` / `logs web`; ensure proxy_pass is `127.0.0.1:3002` |
| `permission denied` on docker | You skipped `usermod -aG docker $USER` (re-login) |
| Certbot fails | DNS A record not propagated yet, or port 80 blocked by firewall |
