# Twitch Cafe Monstarx · Cloud

A fresh MonstarX Cloud version of Twitch Cafe Monstarx.

Generated with [MonstarX](https://github.com/) — a full-stack **TanStack Start** app (React 19, TanStack Router, server functions, Tailwind CSS v4).

## Café designs and photos

The original local Twitch Cafe design is integrated into this native MonstarX Cloud project:

- `/` — Forest: warm ivory, forest green, and an asymmetric coffee composition.
- `/atelier` — Atelier: a light editorial layout with a photographic triptych.
- `/nocturne` — Nocturne: a dark, cinematic café composition.
- `/story`, `/menu`, `/gather`, and `/visit` share the selected design.

The collection bar switches between all three directions. The header's light/dark switch still remembers the visitor's appearance preference; changing appearance preserves enquiry edits and menu filters. Menu categories remain shareable in the URL.

All 102 images are included in `public/assets/`: 65 supplied slide crops and 37 larger photographs recovered from the company profile. `src/data/assets.json` records each image's source, dimensions, and size. There is no separate image upload step. The original Cormorant Garamond and DM Sans fonts are bundled locally. Viewport reveals and hero animation respect reduced motion.

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

Application copy and menu items live in `src/data/cafe.ts`. The main design system is `src/styles.css`; `src/cloud-features.css` styles the retained account and appearance features. Current hours, menu prices, public contact details, and delivery URLs remain owner-supplied values. SEO/GEO settings continue to be managed from MonstarX's SEO/GEO tab.

Verified on 26 November 2026: TypeScript, the native Worker build, and a Wrangler deployment dry run passed. HTTP checks passed for the public/account-access pages and all 102 images. Browser checks covered 320, 390, 768, and 1440 pixel layouts, menu filtering without scroll jumps, appearance changes preserving form edits and filters, mobile navigation, and gallery focus restoration. Synthetic local accounts verified draft saving, reload persistence, owner isolation, sign-out protection, and deletion persistence. No remote account or database was used for these tests.

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
