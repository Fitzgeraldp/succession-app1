# CLAUDE.md

Guidance for future Claude sessions working in this repo. Read this
alongside `VISION.md` (product vision, priorities, open questions) — this
file is about the codebase as it exists; VISION.md is about where it's
going.

## What this project is

A self-service web app ("The Succession Register" in the UI copy;
`succession-app` / "Succession Template App" elsewhere) that generates a
first-draft will — and, as it grows, an enduring power of attorney and
other estate planning documents — from a conditional-logic questionnaire,
for members of the public across all Australian states/territories. See
`VISION.md` for the full picture and current priorities.

## Structure

- `client/` — React + Vite frontend (questionnaire UI, document preview)
- `server/` — Node/Express backend (REST API, clause matching, document
  assembly)
- `database/` — PostgreSQL schema (`schema.sql`) + seed data (`seeds/`).
  `database/migrations/*.sql` is the same schema split into one file per
  table for reference — running both `schema.sql` and the migrations
  against the same database will error with "relation already exists";
  only one or the other is needed.
- `docs/` — jurisdiction notes / clause library reference

## Architecture in brief

1. A person answers a questionnaire in the client. On submit, the client
   currently auto-creates a client record (see "Known gaps" — there's no
   real account/intake flow yet) and POSTs the raw answers object to
   `/api/wills/generate`.
2. The server looks up clauses for the client's `jurisdiction` whose
   `clause_rules` conditions are satisfied by the answers
   (`server/src/services/clauseMatchingService.js` →
   `server/src/db/queries/clauseQueries.js`). A clause with no rules at
   all is always included (unconditional).
3. Matched clauses are assembled into one document by filling
   `{{placeholder}}` tokens with values from `placeholderData`
   (`server/src/services/documentAssemblyService.js`).
4. Clause content and conditional rules live entirely in the database
   (`clauses`, `clause_rules` tables), not in code, so new
   clauses/conditions can be added via SQL without a deploy.

## Local dev

- Database: `createdb succession_app && psql succession_app -f database/schema.sql`
  then load seeds: `psql succession_app -f database/seeds/seed_jurisdiction_rules.sql`
  , `psql succession_app -f database/seeds/seed_clauses_nsw.sql` and
  `psql succession_app -f database/seeds/seed_clauses_nsw_epoa.sql`
  (don't also run `database/migrations/*.sql` — see Structure above).
- Server: `cd server && npm install && cp .env.example .env` (edit
  `DATABASE_URL` if needed) `&& npm run dev` — listens on `:4001`
  (`PORT` in `.env`; 5000 is taken by macOS's AirPlay Receiver).
- Client: `cd client && npm install && npm run dev` — listens on `:5173`
  (Vite dev server proxies `/api/*` to `:4001`, see `client/vite.config.js`).
- Postgres on this machine is Postgres.app in `~/Applications` (no Homebrew);
  if it's down: `pg_ctl -D "$HOME/Library/Application Support/Postgres/var-16" start`.

## Known gaps / state as of 2026-09-24

Read this before assuming something works.

- **Routing** (`client/src/App.jsx`, react-router): `/` → `pages/Wills.jsx`
  (the front door — tabs, jurisdiction notes, login/register), plus
  `/questionnaire` (will), `/epoa`, `/probate`, `/templates`
  (`EstateDocumentTemplates.jsx`, self-contained letter templates), `/faqs`,
  `/library`. `pages/Home.jsx` is just a comment block of feature ideas,
  not a component, and isn't routed.
- **Only NSW has seeded clause content** (will + EPOA seeds). The other 7
  states/territories have `jurisdiction_rules` rows but no `clauses`.
  Both questionnaires hard-code `DEMO_JURISDICTION = 'NSW'`.
- **No `clause_rules` are seeded at all.** Every active clause for a
  jurisdiction is always included — the conditional-logic engine
  (`evaluateRule` in `clauseQueries.js`, operators `equals` /
  `not_equals` / `greater_than` / `contains`) has nothing to evaluate
  yet. Priority #1 in VISION.md.
- **Auth is applied.** Every `/api/*` route except `/api/auth/*` sits
  behind `requireAuth` (`server/src/app.js`); the client stores the JWT
  in localStorage (`client/src/api/client.js`), and a 401 clears it and
  surfaces a "please log in" error in the questionnaire. Clients created
  via `POST /api/clients` are linked to the logged-in lawyer's id.
- **Placeholders the questionnaires don't collect stay as raw
  `{{tokens}}`** in the generated document (e.g. `{{alternate_executor_name}}`).
- **Verifying pages:** headless Chrome hangs in this environment; to check
  every route renders, server-render `App` inside a `MemoryRouter` via
  Vite's `ssrLoadModule` (import react/react-dom/react-router natively).

## Conventions

Not yet established beyond what's visible in the existing code (plain
CSS-in-JS-via-inline-styles in some places, a dedicated `.css` file in
others; no test suite yet). Fill this section in as conventions emerge.

---
Keep this file and `VISION.md` current as decisions get made — a future
session should be able to read both and pick up context without
re-deriving it from scratch or re-discovering the same gaps.
