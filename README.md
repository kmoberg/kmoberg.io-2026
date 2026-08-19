# kmoberg.io

Static blog for [kmoberg.io](https://kmoberg.io) — Eleventy, markdown, no servers, no tunnels.
Successor to the Ghost instance that lived in a Proxmox DMZ behind a Cloudflare Tunnel until the tunnel died.

Design matches [kmoberg.no](https://kmoberg.no) (dark editorial: Newsreader / Hanken Grotesk / IBM Plex Mono).

## Writing a post

Create `src/posts/YYYY-MM-DD-some-slug.md`:

```markdown
---
title: My post title
date: 2026-08-19
---

Markdown body here. Inline HTML also works.
```

Commit and push — DigitalOcean App Platform builds and deploys automatically.

## Local preview

```bash
npm install
npm run serve
```

## Importing old Ghost posts

1. On a Proxmox node, find and enter the old Ghost container:
   `pct list`, then `pct exec <ctid> -- bash`
2. Get a JSON export, either from the admin UI (Settings → Labs → Export) or by
   grabbing the content directory: `tar czf /tmp/ghost-content.tgz /var/lib/ghost/content`
   (SQLite database at `content/data/ghost.db`, images at `content/images`).
3. Run the importer against the JSON export:
   `node scripts/import-ghost.mjs path/to/export.json`
4. Copy old images to `src/images/ghost/` so migrated posts find them.

## Hosting (DigitalOcean App Platform)

Static site component:

- Build command: `npm ci && npm run build`
- Output directory: `_site`
- Catchall document: `404.html`
- Custom domain: `kmoberg.io` (apex). `blog.kmoberg.io` redirects here via a
  Cloudflare redirect rule.

## Analytics

Cloudflare Web Analytics — the beacon snippet slot is in
`src/_layouts/base.njk` (see the comment in `<head>`). Enable it in the
Cloudflare dashboard: Analytics & Logs → Web Analytics → add `kmoberg.io`,
copy the snippet, paste, push.
