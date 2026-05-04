# KBCODE Site — Infrastructure & Technical Documentation

Last updated: **2026-05-04**

---

## 1. Overview

| Property | Value |
|---|---|
| **Production URL** | https://kbcode.pl |
| **Pages preview URL** | https://kbcode-site.pages.dev |
| **Project type** | Static single-page business-card site |
| **Tech stack** | Plain HTML / CSS / JS — no build step |
| **Languages** | English (default), Polish, Ukrainian (switcher: EN · PL · UA) |
| **Design direction** | Cartographic-editorial — *Field Circular* layout with *Mappa Mundi* hero |
| **Total annual cost** | ~ 70 PLN (~ €16) — only the .pl domain |

---

## 2. Domain & DNS

### Registrar
| | |
|---|---|
| Provider | **nazwa.pl** |
| Domain | `kbcode.pl` |
| Registered to | KBCODE sp. z o.o. (Igor Sukhov) |
| Renewal cost | ~ 70 PLN/year |
| DNSSEC | **Disabled** (auto-disabled when switching to external NS; can be re-enabled in Cloudflare → DNS → Settings) |

### Nameservers (delegated to Cloudflare)
- `denver.ns.cloudflare.com`
- `shaz.ns.cloudflare.com`

Configured in: **nazwa.pl panel → Domains → kbcode.pl → External DNS servers**.

### DNS Records (managed in Cloudflare)
| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| CNAME | `kbcode.pl` | `kbcode-site.pages.dev` | Proxied 🟠 | Auto |
| CNAME | `www` | `kbcode-site.pages.dev` | Proxied 🟠 | Auto |
| MX | `kbcode.pl` | `route1.mx.cloudflare.net` (priority 91) | DNS only | Auto |
| MX | `kbcode.pl` | `route2.mx.cloudflare.net` (priority 83) | DNS only | Auto |
| MX | `kbcode.pl` | `route3.mx.cloudflare.net` (priority 84) | DNS only | Auto |
| TXT | `kbcode.pl` | `"v=spf1 include:_spf.mx.cloudflare.net ~all"` | — | Auto |
| TXT (DKIM) | (Cloudflare Email Routing keys) | auto-managed | — | Auto |

⚠️ **Cleared during initial setup** — old nazwa.pl defaults (A `*` / `kbcode.pl` / `www` → 85.128.128.104; CAA × 4; default MX, _dmarc, _domainkey TXT). All deleted before NS delegation to avoid SSL issuance blocks and stale routes.

---

## 3. Hosting — Cloudflare Pages

### Project
| | |
|---|---|
| Project name | `kbcode-site` |
| Plan | Free |
| Production branch | `main` |
| Framework preset | None |
| Build command | *(empty — pure static)* |
| Build output directory | `/` (repo root) |
| Root directory | `/` |

### Custom Domains
| Hostname | Status | SSL | Notes |
|---|---|---|---|
| `kbcode.pl` | Active | Universal SSL (auto-renewed) | apex, canonical |
| `www.kbcode.pl` | Active | Universal SSL | redirects to apex (see §6) |

### Auto-deploy
- Trigger: push to `main` on GitHub
- Build duration: ~30-60 s
- Deploy preview: each commit gets `https://<hash>.kbcode-site.pages.dev`

---

## 4. Email — Cloudflare Email Routing

### Status
- ✅ Active for `kbcode.pl`
- **Inbound only** (forwarding). Outbound from `@kbcode.pl` is **not configured**.

### Destination address
- `isukhov83@gmail.com` (verified)

### Custom routes
| From | To | Status |
|---|---|---|
| `support@kbcode.pl` | `isukhov83@gmail.com` | ✅ |
| `careers@kbcode.pl` | `isukhov83@gmail.com` | ✅ |
| `rnd@kbcode.pl` | `isukhov83@gmail.com` | ✅ |

Catch-all: not enabled. Unknown addresses bounce.

### Phone (not email-routed)
- `+48 576 011 838` — displayed on site, links via `tel:` schema. No infrastructure.

### Outbound (Stage 7, optional, not done)
To send *from* `hello@/support@/...kbcode.pl` natively in Gmail, the recommended path is:
1. Brevo (free 300 emails/day) or Resend (free 100/day) — domain-verify `kbcode.pl` via TXT/CNAME records added in Cloudflare DNS.
2. Gmail → Settings → Accounts → "Send mail as" with their SMTP credentials.

---

## 5. Source Code — GitHub

| | |
|---|---|
| Repository | https://github.com/ISukhov83/kbcode-site |
| Visibility | **Private** |
| Default branch | `main` |
| License | None (all rights reserved by default) |
| Commit author | `Igor Sukhov <isukhov83@gmail.com>` |
| Author identity | per-commit `-c user.name/email` (global `git config` not modified) |

### Local working copy
```
D:\AI\Claude_Project\KBCODE_Site\
```

This folder is itself a git repo with `origin = https://github.com/ISukhov83/kbcode-site.git`.
The parent directory `D:\AI\Claude_Project\` is a separate (uncommitted) git repo and is unrelated to the site deploy.

---

## 6. Redirects

| Source | Destination | Code | Implemented via |
|---|---|---|---|
| `http://kbcode.pl/*` | `https://kbcode.pl/*` | 301 | Cloudflare automatic Always-Use-HTTPS |
| `https://www.kbcode.pl/*` | `https://kbcode.pl/$1` | 301 | **Cloudflare Page Rule** (`www.kbcode.pl/*` → Forwarding URL) |

⚠️ The `_redirects` file in the repo contains the apex/www rule but **does not actually take effect** — Cloudflare Pages did not apply cross-domain redirects from `_redirects` for this project, so the redirect is handled at the Cloudflare zone layer via Page Rule (uses 1 of 3 free Page Rules).

---

## 7. Security Headers (`_headers` file)

Cloudflare Pages reads `_headers` at deploy time and applies these to every response.

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `Content-Security-Policy` | `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |

Verified live with `curl -I https://kbcode.pl/`.

---

## 8. Caching (`_headers` file)

| URL pattern | Cache-Control |
|---|---|
| `/*.css`, `/*.js`, `/*.jpg`, `/*.png`, `/*.svg` | `public, max-age=31536000, immutable` |
| `/*.html` | `public, max-age=300, must-revalidate` |

### Cache-busting
- `index.html` references `styles.css?v=N` — bump `N` on each CSS edit.
- `i18n.js` is **not cache-busted** — clients may see stale translations until natural cache expiry (browser default ~1 day) unless they hard-refresh. Consider adding `?v=N` to `<script src="i18n.js">` if frequent translation edits become routine.

---

## 9. SEO & Metadata

### `robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://kbcode.pl/sitemap.xml
```

### `sitemap.xml`
Single URL, `priority=1.0`, `changefreq=monthly`, `lastmod=2026-05-04`.

### Open Graph + Twitter Card (in `index.html` head)
| Tag | Value |
|---|---|
| `og:type` | website |
| `og:url` | https://kbcode.pl/ |
| `og:title` | KBCODE Poland — Cartographers of Presence |
| `og:description` | A software studio in Kraków building Avatar Platform — a real-time human-telepresence network. |
| `og:image` | https://kbcode.pl/kbcode-avatar.jpg (1024×1024) |
| `og:locale` | en_GB (alternates: pl_PL, uk_UA) |
| `twitter:card` | summary_large_image |
| `<link rel="canonical">` | https://kbcode.pl/ |

⚠️ The OG image is the company avatar (1024×1024); standard for social cards is 1200×630. Could be improved with a dedicated banner.

---

## 10. File Structure & Sizes

| File | Lines | Purpose |
|---|---|---|
| `index.html` | 368 | All page markup, EN as source-of-truth for i18n |
| `styles.css` | 1050 | Complete styling — palette, typography, layout, animations, responsive |
| `i18n.js` | 232 | Translations object + language switcher logic |
| `main.js` | 9 | Pause coordinate ticker on hover |
| `kbcode-avatar.jpg` | — | 1024×1024, ~90 KB — company logo (also used for OG image) |
| `world-map.jpg` | — | ~107 KB — vintage world map for hero |
| `_headers` | — | Cloudflare Pages security & cache headers |
| `_redirects` | — | (currently overridden by Cloudflare Page Rule) |
| `robots.txt`, `sitemap.xml` | — | SEO basics |
| `README.md` | — | Local dev + deploy guide |
| `.gitignore` | — | Excludes `.claude/`, `.playwright-mcp/`, debug PNGs, MHTML refs, `DEPLOY_PLAN.md` |
| `DEPLOY_PLAN.md` | — | (untracked) Original Stage 0–8 deployment plan |

---

## 11. Architecture & Sections

### Page sections (top to bottom)
1. **Masthead** — company avatar (38 px circle), "KBCODE" wordmark, location + coordinates, navigation, language switcher (`EN · PL · UA`)
2. **Field Circular rule** — decorative typographic separator
3. **Hero** — eyebrow, H1 (3-line display headline), drop-cap lede, two CTA buttons, founding/discipline/project metrics, *Mappa Mundi* visual + figcaption
4. **Coordinate ticker** — animated horizontal marquee of city coords (10 cities, looped)
5. **Studio (Field Note №01)** — pull-quote, prose, ledger card with legal info
6. **Instrument (Field Note №02)** — Avatar Platform pitch + 3-role triptych (Operator / Avatar / Platform) on dark background
7. **Apparatus (Field Note №03)** — 6 features grid: world atlas, HD stream, twin-thumb controls, Avatar specialisations, vetted ledger, field equipment
8. **Dispatch (Field Note №04)** — contact channels (support / careers / R&D / phone) with coords card
9. **Colophon** — typographic credits + "End of document" rule

### Typography stack
| Family | Use | Source |
|---|---|---|
| **Fraunces** (variable, opsz axis) | Display headlines, italic accents, atlas labels | Google Fonts |
| **Albert Sans** (300/400/500/600) | Body copy | Google Fonts |
| **JetBrains Mono** (400/500) | Coordinates, technical micro-labels, eyebrows | Google Fonts |

### Color palette (CSS custom properties)
| Variable | Hex | Use |
|---|---|---|
| `--paper` | `#F1E9D6` | Main page background (cream) |
| `--paper-deep` | `#E7DCC1` | Cards, alt sections |
| `--paper-dark` | `#1B2433` | Dark Instrument section |
| `--ink` | `#1A2434` | Primary text + ink linework |
| `--ink-soft` | `#485468` | Secondary text |
| `--ink-faint` | `#8A95A6` | Tertiary text, mono labels |
| `--brass` | `#B8783D` | Italic display accent, brass pinpoints, link hovers |
| `--brass-light` | `#D8A063` | Brass on dark sections |
| `--terracotta` | `#C84B31` | Reserved hot accent (sparingly used) |

### Visual effects
- Paper grain: SVG turbulence noise overlay (`mix-blend-mode: multiply`)
- Corner crosshairs: 4 fixed-position SVG marks
- Decorative typographic rules with terminal ticks
- Map background blends via `background-blend-mode: multiply` over `var(--paper)` so the white JPG fuses with the page background

---

## 12. Localization (i18n)

### Implementation
- English content lives directly in `index.html` markup
- PL/UK translations defined in `i18n.js` as a `{ lang: { key: html } }` object
- Each translatable element has `data-i18n="key"` (or `data-i18n-attr="content:key"` for meta attrs)
- On page load, `captureEN()` reads initial DOM and stores it as the EN value
- `applyLang(lang)` replaces `innerHTML` for every `[data-i18n]` element with translated content
- HTML in translation values supported (italic, drop-cap, br, strong, etc.)

### Persistence
- Choice stored in `localStorage` under key `kbcode-lang`
- First visit auto-detects via `navigator.language`
- Language switcher updates `<html lang="...">` and `aria-pressed` on buttons

### Coverage
~70 keys in 3 languages = ~210 strings total. All major content (titles, paragraphs, labels, alts, meta description, OG title, etc.) is translated.

### UA vs UK
The internal language code is `uk` (ISO 639-1 for Ukrainian). The user-facing button label shows **UA** (more familiar to most users).

---

## 13. Performance & Accessibility

### Bundle size (gzipped, approximately)
- HTML: ~7 KB
- CSS: ~10 KB
- JS (i18n + main): ~5 KB
- Images: ~200 KB (avatar + map)
- Google Fonts (woff2): ~80 KB
- **Total first-load: ~300 KB**

### Lighthouse expectations (after Cloudflare's HTTP/3, edge caching, Brotli)
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

(Not formally measured yet — recommended.)

### Reduced motion
CSS animations respect `prefers-reduced-motion: reduce` (hero stagger animation skipped).

---

## 14. Development Workflow

### Local dev
```
cd D:\AI\Claude_Project\KBCODE_Site
python -m http.server 8765
# open http://localhost:8765/
```

### Editing
1. Modify `index.html` / `styles.css` / `i18n.js` in any editor.
2. For CSS changes, bump `?v=N` in `<link rel="stylesheet" href="styles.css?v=N">`.
3. Hard-refresh browser (`Ctrl+Shift+R`) to bypass HTML cache.

### Deploy
```
git add -A
git commit -m "..."
git push
```
Cloudflare Pages picks up the push within 30-60 s and updates `https://kbcode.pl`.

### Debug (Playwright)
The `.playwright-mcp/` and various `debug-*.png` files are local artefacts from Playwright-driven QA sessions and are gitignored.

---

## 15. Verified Health Checks

| Check | Method | Last result |
|---|---|---|
| HTTPS apex | `curl -I https://kbcode.pl/` | ✅ HTTP 200, Cloudflare edge |
| HTTP → HTTPS | `curl -I http://kbcode.pl/` | ✅ 301 |
| www → apex | `curl -I https://www.kbcode.pl/` | ✅ 301 |
| Security headers | `curl -I` | ✅ HSTS, CSP, X-Frame, X-Content-Type, Permissions, Referrer all set |
| Static cache | `curl -I /styles.css` | ✅ `max-age=31536000, immutable` |
| MX records | `nslookup -type=MX kbcode.pl` | ✅ route1/2/3.mx.cloudflare.net |
| SPF | `nslookup -type=TXT kbcode.pl` | ✅ `v=spf1 include:_spf.mx.cloudflare.net ~all` |
| Robots / Sitemap | `curl /robots.txt`, `/sitemap.xml` | ✅ both served |

Recommended periodic checks (not yet wired):
- SSL Labs grade — https://www.ssllabs.com/ssltest/?d=kbcode.pl (expect A+)
- OG preview — https://www.opengraph.xyz/url/https%3A%2F%2Fkbcode.pl
- Lighthouse — Chrome DevTools

---

## 16. Annual Costs

| Item | Provider | Cost |
|---|---|---|
| Domain `.pl` | nazwa.pl | ~70 PLN/year (~€16) |
| DNS, SSL, CDN, Email Routing | Cloudflare Free | €0 |
| Static hosting | Cloudflare Pages | €0 |
| Source repo | GitHub Free (private) | €0 |
| Fonts | Google Fonts | €0 |
| **Total** | — | **~€16/year** |

Optional add-ons not currently active:
- Cloudflare Pro: $25/month (image optimisation, more page rules, advanced analytics)
- Brevo / Resend SMTP for outbound: free tiers available
- Cloudflare Web Analytics (privacy-first): €0 — recommended

---

## 17. Known Issues & TODO

### Recommended polish
1. **Dedicated OG image** at 1200×630 (currently using square avatar)
2. **Cloudflare Web Analytics** — free, privacy-friendly; enable in Pages project → Analytics
3. **Cache-bust `i18n.js`** when translations change (similar to styles.css `?v=N`)
4. **DNSSEC** — re-enable via Cloudflare → DNS → Settings (was disabled when switching to external NS)
5. **Lighthouse audit** + remediation if any score < 90
6. **Real OG image** — could be a hero crop with overlaid "KBCODE Poland" wordmark

### Nice-to-have
7. **Outbound email** (Brevo SMTP relay) so replies from `support@kbcode.pl` actually originate from that address
8. **Catch-all email route** — useful if you want any `*@kbcode.pl` to forward
9. **Privacy-friendly form** for contact (Cloudflare Turnstile CAPTCHA + Pages Functions to email)
10. **Hreflang tags** — currently rely on JS i18n; for SEO add static `<link rel="alternate" hreflang="...">` tags or per-language URLs
11. **Sitemap-alternates** — list `kbcode.pl/?lang=pl` etc. as alternates if i18n becomes URL-based

---

## 18. Recovery / Rebuild Notes

If the site needs to be rebuilt from scratch:

1. **Restore from GitHub** — clone https://github.com/ISukhov83/kbcode-site to a clean folder.
2. **Cloudflare Pages** — connect the same repo, branch `main`, no build command, output dir `/`.
3. **Custom domains** — add `kbcode.pl` and `www.kbcode.pl` in Pages → Custom domains.
4. **DNS** — already in Cloudflare (CNAMEs auto-managed by Pages once domain attached).
5. **Email Routing** — already configured at zone level; no rebuild needed unless zone is deleted.
6. **Page Rule** — recreate `www.kbcode.pl/* → https://kbcode.pl/$1 301` if zone is deleted.
7. **NS at nazwa.pl** — already pointing to Cloudflare; no change unless registrar changes.

Total rebuild time from cold: ~30 minutes (most of it waiting for SSL issuance and DNS propagation).

---

## 19. Contact & Operational

- **Domain owner / payer**: Igor Sukhov (`isukhov83@gmail.com`)
- **Cloudflare account**: same email
- **GitHub account**: ISukhov83
- **Email forwarding destination**: `isukhov83@gmail.com`

All credentials in single hands; consider:
- Cloudflare 2FA enabled
- GitHub 2FA enabled
- Backup of recovery codes for both
