# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow

Spec-driven, deliberately lightweight: every feature has a file in `specs/` (see `specs/README.md` for the rules and template). Read the relevant spec before coding, fix the spec before the code if it is wrong, and tick its tasks as they are completed. Repo documents are written in English.

## Commands

Run from the repo root (npm workspaces: `client`, `server`).

```bash
npm install
npm run dev:server     # wrangler dev on :8787 (API + built client assets, local D1)
npm run dev:client     # Vite dev server; proxies /api to :8787
npm run typecheck
npm test               # vitest, server only
npm run build          # client build into client/dist
npm run deploy         # build + wrangler deploy
```

Dependencies come from the public npm registry only. `package-lock.json` must keep `registry.npmjs.org` URLs in its `resolved` fields, since CI runs on GitHub-hosted runners.

Single test: `npm run test -w server -- src/index.test.ts -t "reports ok"`.

## Architecture

- **One Cloudflare Worker serves everything.** `server/wrangler.jsonc` points its `assets` at `../client/dist` (SPA fallback), and `run_worker_first: ["/api/*"]` sends API paths to the Hono app in `server/src/index.ts`. Because of that, `client/dist` must exist before `wrangler dev`/`deploy`; `npm run dev -w server` creates an empty one, and deploys build the client first.
- **Database is D1 (SQLite), bound as `DB`.** The `database_id` in `wrangler.jsonc` is the id of the production `spendship` database.
- **The client is a PWA** (`vite-plugin-pwa`, config in `client/vite.config.ts`). The service worker's navigation fallback must keep denying `/api/*`, otherwise API requests get the SPA shell.
- **Server code is Workers-runtime TypeScript, not a Node server.** Do not add Express-style or Node-only dependencies without checking they work on Workers.

## CI/CD

`.github/workflows/pipeline.yml`: `check` (typecheck, test, build) runs on PRs and pushes; `deploy` runs only on pushes to `main` after `check`, using the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets and the `production` environment.
