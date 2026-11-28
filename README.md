# Twitch Cafe Monstarx · Cloud

A fresh MonstarX Cloud version of Twitch Cafe Monstarx.

Generated with [MonstarX](https://github.com/) — a full-stack **TanStack Start** app (React 19, TanStack Router, server functions, Tailwind CSS v4).

## Approved design and photos

Nocturne is the single approved design across the homepage, story, menu, gatherings, visit, and account pages. There is no appearance switch or design collection bar. Old `/atelier` and `/nocturne` URLs redirect to `/`; old design preferences cannot change the appearance. Menu categories remain shareable in the URL.

English and Tamil are available. Malay and Chinese are temporarily hidden while their translations are corrected; their existing translation catalogs are retained. Previously saved unsupported language selections fall back to English.

All 113 images are included in `public/assets/`: 65 supplied slide crops, 37 larger company-profile photographs, and 11 new client-supplied coffee photographs. `src/data/assets.json` records provenance, dimensions, and size. The homepage highlights the client's coffee with a dedicated photography section and three featured coffee drinks. Existing menu items are unchanged; ingredient notes and the separate Tuesday note are not published as menu items or specials.

The new photographs are optimized WebP files and travel with the GitHub source, so MonstarX needs no separate upload step. To re-import the supplied photographs locally (requires Python and Pillow):

```bash
python3 scripts/import-coffee-photos.py --source-dir /path/to/twitch-cafe-logo
```

Cormorant Garamond and DM Sans load through the existing Google Fonts links used by the MonstarX build. Native viewport reveals, hero animation, and image hover effects respect reduced motion.

MonstarX's accounts, private saved drafts, database schema, migrations, service helpers, and owner-managed SEO/GEO configuration are retained. The gathering flow prepares an Instagram message; saving a private draft does not send an enquiry or confirm a booking.

To continue in MonstarX, sync the latest `main` from this repository, inspect the preview, then publish through MonstarX. No remote database migration or deployment is performed by the source update itself.

## Run locally

Local development runs the app in Cloudflare's Workers runtime with a local D1 database.

```bash
npm ci
cp .dev.vars.example .dev.vars   # set BETTER_AUTH_SECRET
npm run db:migrate:local         # creates the tables in the local D1 database
npm run dev                      # http://localhost:3000
```

Use an available port when the original local website is also running, for example `npm run dev -- --port 3002`.

## Validate changes

```bash
npm run check:assets             # checks every bundled image and its dimensions
npm run typecheck
npm run build                    # the native Cloudflare Worker build
```

Application copy and menu items live in `src/data/cafe.ts`. The main design system is `src/styles.css`; `src/cloud-features.css` styles the retained account features. Current hours, menu prices, public contact details, and delivery URLs remain owner-supplied values. SEO/GEO settings continue to be managed from MonstarX's SEO/GEO tab.

Verified on 28 November 2026: asset integrity, TypeScript, the native Worker build, and a Wrangler deployment dry run passed. HTTP checks covered all 113 bundled images, public and account-access pages, and permanent redirects for the old design URLs. Browser checks covered 320, 390, 768, and 1440 pixel layouts, English/Tamil switching, menu filters, enquiry edits, mobile navigation, and the coffee photography. A fresh browser session reported no console warnings or errors. The retained account and private-draft flows were previously verified with synthetic accounts in a local database. No remote account or database was used for those tests.

The existing owner settings have search indexing disabled, so the managed `/sitemap.xml` intentionally returns 404. Enable indexing and set the production URL in MonstarX's SEO/GEO settings when ready for search discovery.

## Deploy to Cloudflare Workers

```bash
npx wrangler login
npx wrangler d1 create twitch-cafe-monstarx-cloud-db   # copy the database_id into wrangler.jsonc
npm run db:migrate                                 # applies migrations/ to the remote database
npx wrangler secret put BETTER_AUTH_SECRET
npm run deploy
```

Data lives in the D1 database bound as `DB` (see `src/lib/db.ts`); user accounts use Better Auth
(`src/lib/auth.ts`) with tables created by `migrations/0000_monstarx_auth.sql`.

## Project layout

- `src/routes/` – file-based routes (`index.tsx` → `/`, `about.tsx` → `/about`, `blog.$slug.tsx` → `/blog/:slug`)
- `src/routes/__root.tsx` – document shell and global layout
- `src/server/` – server functions (`createServerFn`)
- `src/components/` – UI components
- `src/db/schema.ts` – Drizzle schema; `migrations/` – SQL migrations applied with wrangler
- `MONSTARX.md` – how the built-in services work (accounts, database, email, storage, AI), kept up to date by MonstarX
- `src/lib/db.ts`, `src/lib/auth.ts`, `src/lib/session.ts`, `src/lib/session.server.ts` – database and accounts plumbing
- `src/lib/email.ts` – sendEmail(); works inside MonstarX (previews and published apps). Self-hosted, set `MONSTARX_MAIL_URL` + `MONSTARX_DATA_TOKEN` from your MonstarX host or replace the file with your own provider
- `src/lib/monstarx/country-data.ts` – countryData.call(); live public country data (weather, transport, registries…) for the countries switched on in Backend → Country data. Self-hosted, set `MONSTARX_COUNTRY_DATA_URL` + `MONSTARX_DATA_TOKEN` from your MonstarX host
- `src/styles.css` – Tailwind v4 entry point and design tokens
- `src/routeTree.gen.ts` – generated by TanStack Router (do not edit)
