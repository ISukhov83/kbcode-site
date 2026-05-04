# KBCODE Site

Static business-card website for KBCODE Poland (Kraków).

## Stack

- Plain HTML / CSS / JS — no build step
- Cloudflare Pages hosting
- Cloudflare Email Routing (planned) for `hello@kbcode.pl`

## Local development

```
python -m http.server 8765
# open http://localhost:8765/
```

Hard-refresh (`Ctrl+Shift+R`) after edits if the browser caches the old CSS.

## Deploy to Cloudflare Pages

### Option A — auto-deploy via GitHub
The repo is connected to a Cloudflare Pages project. Pushing to `main` triggers a deploy.

### Option B — manual via Wrangler CLI
```
npx wrangler pages deploy . --project-name=kbcode-site
```

## Files

| File | Purpose |
|------|---------|
| `index.html` | The site (English in markup; PL/UK swapped in by `i18n.js`) |
| `styles.css` | All styling |
| `i18n.js` | Translations + language switcher logic |
| `main.js` | Small interactions (ticker hover pause) |
| `kbcode-avatar.jpg` | Company logo (in masthead, also used as OG image) |
| `world-map.jpg` | Hero vintage world map |
| `_headers` | Cloudflare Pages security & cache headers |
| `_redirects` | `www.kbcode.pl` → `kbcode.pl` (apex canonical) |
| `robots.txt`, `sitemap.xml` | Minimal SEO |

## TODO before production deploy

- [ ] Replace `world-map.jpg` with a licensed or PD/CC0 alternative — the current file is a watermarked stock image and must not ship as is.
- [ ] Confirm contact email aliases match Cloudflare Email Routing setup (`hello@`, `press@`, `careers@`).
- [ ] Create a proper Open Graph image (1200×630 recommended) and update `<meta property="og:image">` and `<meta name="twitter:image">`.
- [ ] When the production URL is live, verify `sitemap.xml` `<loc>` is correct.
