# Vision — Succession Register / Succession Template App

Living document. Update this as decisions get made together — it's project
memory for future sessions, not a locked spec. Last updated: 2026-09-14.

## Who this is for

Self-service / public product. A person creates their own account and
works through a guided questionnaire to produce a first-draft legal
document themselves — this is not a lawyer-operated drafting tool. A
qualified solicitor's review before execution is still part of the
picture (see the README disclaimer and the app's own "requires solicitor
review" note on generated wills), but as a downstream step for the user
to arrange, not a gate that blocks someone from seeing their draft.

## Document scope

Start with wills, bring the already-written EPOA (enduring power of
attorney) questionnaire online next, and design the clause-library /
conditional-rule architecture so it generalises to further estate
planning documents later (e.g. advance care directives, testamentary
trusts) rather than being rebuilt each time.

## Jurisdiction scope

All 8 Australian states/territories from the start, not NSW-only. The
schema already models this per-clause (`clauses.jurisdiction`) and
`jurisdiction_rules` already has execution-requirement rows seeded for
all 8 — what's missing is actual clause content and conditional rules
for anything other than NSW.

## Current priorities (agreed 2026-09-14, roughly in order)

1. **Make the conditional logic real.** No `clause_rules` rows are
   seeded for any jurisdiction yet, so every active clause for a
   jurisdiction is always included in a generated document regardless
   of the person's answers — the app's whole premise (a document that
   changes based on your circumstances) isn't actually switched on.
   `evaluateRule` in `server/src/db/queries/clauseQueries.js` supports
   `equals` / `not_equals` / `greater_than` / `contains` and works
   correctly against whatever rules exist — this is a data/seeding gap,
   not a code gap.
2. **Real auth / user accounts.** JWT scaffolding exists
   (`server/src/middleware/authMiddleware.js`,
   `server/src/routes/auth.routes.js`) but `requireAuth` isn't applied
   to any route yet, so `/api/clients`, `/api/parties`, `/api/wills` are
   all open. There's also no working login UI — Homepage's "Login &
   account" tab is a static form. For a public product, people need to
   be able to create an account and come back to a saved draft.
3. **Wire up the EPOA questionnaire.**
   `client/src/components/EpoaQuestionnaire.jsx/EpoaQuestionnaire.jsx`
   is fully written (mirrors the will questionnaire's pattern) but the
   folder is never imported anywhere — no route or button in the running
   app reaches it.

## Open questions to revisit together

- Should creating an account be required before starting the
  questionnaire at all, or only before generating/saving a draft?
  (Affects onboarding friction for a public product.)
- For multi-jurisdiction rollout: is per-jurisdiction clause content
  (same `clause_key`, different `clause_text` per state, as the schema
  already allows) enough, or does expanding beyond NSW need a bigger
  content-authoring workflow/tooling?
- Should a Will and an EPOA for the same person share one client record,
  or be tracked as separate "matters"?
- What does "solicitor review" concretely look like in a self-service
  product — an optional paid add-on, a marketplace/directory of
  reviewing solicitors, or just a strong disclaimer at draft time?
- Any plan for jurisdiction detection/selection in the real UI (ask
  directly vs. infer from the address the person enters)?

## Explicit non-goals for now

- Not building a law-firm case-management system.
- Not handling digital execution/witnessing (e-signing) yet —
  `jurisdiction_rules.allows_electronic_execution` is modelled for
  future use but nothing reads it yet.
