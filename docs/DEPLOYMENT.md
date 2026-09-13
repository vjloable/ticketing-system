# Deployment — opfbex.project01.ph

This app deploys to a **shared VPS** using the same pattern as `ripple-of-hope`:
one shared Caddy reverse proxy fronts many app containers, each on the external
Docker network `proxy-net`. Caddy terminates TLS (auto Let's Encrypt) and routes
by hostname.

```
Internet ──▶ Caddy (:80/:443, shared)
                ├─ rippleofhope.ph        ──▶ ripple:3000
                └─ opfbex.project01.ph    ──▶ opfbex:3000   ← this app
```

The app container exposes port 3000 **only inside `proxy-net`** — never to the
host. Only Caddy is published on :80/:443.

## Files in this repo

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build → minimal `node server.js` standalone image |
| `.dockerignore` | Keeps the build context small |
| `next.config.ts` | `output: "standalone"` + version injection |
| `compose.app.yml` | The app service, joined to `proxy-net` (deployed by CI) |
| `.github/workflows/deploy.yml` | Build → push to GHCR → deploy on VPS, on `v*` tags |
| `deploy/Caddyfile.block` | The routing block to add to the VPS's shared Caddyfile |
| `scripts/release.sh` | Bump version + create a `v*` tag locally |

## One-time setup

### 1. GitHub repository secrets

Settings → Secrets and variables → Actions. (Reuse the same VPS_* values as
ripple-of-hope — it's the same server.)

| Secret | Value |
|--------|-------|
| `VPS_HOST` | VPS IP / hostname |
| `VPS_USER` | SSH user |
| `VPS_SSH_KEY` | Private SSH key for that user |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon / publishable key |

`GITHUB_TOKEN` is provided automatically and is used to push to GHCR.

> These `NEXT_PUBLIC_*` values are inlined into the client bundle at build time,
> so they must exist as secrets for the image to be built correctly.

### 2. On the VPS (mostly already done for ripple-of-hope)

The shared proxy network and Caddy stack already exist if ripple-of-hope is
running. Verify:

```bash
docker network ls | grep proxy-net      # must exist
docker ps | grep caddy                  # must be running
```

If for some reason they don't exist:

```bash
docker network create proxy-net
# then bring up the shared proxy stack (deploy/compose.proxy.yml + Caddyfile
# from the ripple-of-hope repo)
```

### 3. Add the Caddy route

Edit the **shared** Caddyfile on the VPS (the one mounted into the `caddy`
container) and paste the block from `deploy/Caddyfile.block`:

```caddy
opfbex.project01.ph {
	encode gzip zstd
	header Strict-Transport-Security "max-age=31536000; includeSubDomains"
	reverse_proxy opfbex:3000
}
```

Reload without downtime:

```bash
docker exec -w /etc/caddy caddy caddy reload
```

### 4. DNS

Add an **A record** for `opfbex.project01.ph` → the VPS IP (same IP as the other
projects). Once it resolves, Caddy will fetch a Let's Encrypt cert automatically
on first request.

### 5. Prepare the deploy target directory on the VPS

```bash
mkdir -p ~/opfbex-ticketing
```

The workflow SCPs `compose.app.yml` here and runs `docker compose` from it.

## Deploying a new version

```bash
scripts/release.sh patch        # or minor / major / X.Y.Z
git push origin main --follow-tags
```

Pushing the `v*` tag triggers `.github/workflows/deploy.yml`, which:

1. Builds the image with the Supabase build-args.
2. Pushes `ghcr.io/vjloable/ticketing-system:<version>` and `:latest` to GHCR.
3. Copies `compose.app.yml` to `~/opfbex-ticketing` on the VPS.
4. SSHes in and runs `docker compose pull && up -d`, then prunes old images.

## Local production check

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=... \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  -t opfbex-ticketing:local .

docker run --rm -p 3000:3000 opfbex-ticketing:local
# open http://localhost:3000
```

## Notes

- **GHCR package visibility**: the first push creates a private package under
  your GHCR account. The VPS pulls it authenticated with `GITHUB_TOKEN` during
  deploy, so it can stay private.
- **Migrations / Supabase**: this app talks to Supabase directly; there is no DB
  container to run on the VPS.
