# Succession Template App

A conditional-logic will/succession document generator for legal practices.

## Structure
- `client/` — React frontend (questionnaire UI, document preview, lawyer review)
- `server/` — Node/Express backend (clause matching, document assembly, API)
- `database/` — SQL schema, migrations, and seed data
- `docs/` — jurisdiction notes and clause library reference

## Getting started

1. Set up the database:
   ```
   createdb succession_app
   psql succession_app -f database/schema.sql
   psql succession_app -f database/seeds/seed_jurisdiction_rules.sql
   psql succession_app -f database/seeds/seed_clauses_nsw.sql
   ```

2. Set up the backend:
   ```
   cd server
   npm install
   cp .env.example .env
   # edit .env with your database connection string
   npm run dev
   ```

3. Set up the frontend:
   ```
   cd client
   npm install
   npm run dev
   ```

## Disclaimer
This template is a starting point for building legal document automation tooling.
All generated documents must be reviewed by a qualified solicitor before execution.
Will formalities (witnesses, execution requirements) vary by Australian state/territory.
# Succession-App
