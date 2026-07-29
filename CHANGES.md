# What changed in this copy

## 1. Fixed unverifiable metrics
DailiQ, IQVIA, and PriOSS project bullets had precise, unsourced stats
("~40%", "~35%", "~200ms", "100%", "45%"). Rewrote these as honest,
qualitative claims. Also removed a leftover "// per your mapping" comment
that would look odd to anyone reading the source.

## 2. Real Postgres wiring (server/db.ts, server/storage.ts)
`shared/schema.ts` already defined a Drizzle schema, but `storage.ts` only
ever used an in-memory Map — so nothing persisted across restarts. Added:
- `server/db.ts`: a Neon-backed Drizzle client, only loaded if `DATABASE_URL` is set.
- `DbStorage` class in `server/storage.ts` implementing the same `IStorage`
  interface as the old `MemStorage`, using real queries.
- The exported `storage` now picks Postgres automatically when `DATABASE_URL`
  is present, and falls back to in-memory otherwise — nothing breaks if you
  don't set it up yet.

**To activate:** create a free Postgres DB at neon.tech or supabase.com, set
`DATABASE_URL` in your environment, then run `npx drizzle-kit push` to create
the tables.

**Important:** the contact form on the live site currently uses EmailJS
(client-side), not `/api/contact` — because the site deploys to GitHub Pages,
which can't run the Express server at all. This backend work only matters in
production if you deploy `server/` somewhere that runs Node (Render, Railway,
Fly.io) and point the contact form at it. Otherwise it's a good local
dev/demo capability, not something a visitor to the live site benefits from.

## 3. Command palette (⌘K)
New `client/src/components/command-palette.tsx`, built on the shadcn
`Command` component and `cmdk` (both were already installed, unused).
- Press ⌘K / Ctrl+K anywhere, or click the "Search ⌘K" button in the nav
- Jump to any section, open GitHub/LinkedIn, email you, or toggle dark mode

## 4. Local assets instead of third-party domains
The hero section pulled the profile photo and CV from `edgeone.app`
subdomains. Switched to locally bundled files:
- `client/src/assets/profile.jpg` — add your headshot here
- `client/public/Mukul_Sachdeva_CV.pdf` — add your CV PDF here

Both have README notes in place; the code already points at them.

## Not done (needs a design decision from you)
- Visual identity refresh (typography/color beyond default shadcn blue+teal)
- Project detail/case-study pages instead of cards
- Deploying the backend so it's actually live
These are bigger, more opinionated changes — happy to do any of them next,
just tell me which to prioritize.
