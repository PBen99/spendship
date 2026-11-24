# 000 – Skeleton

Status: in progress

## Goal
A deployable end-to-end skeleton: an installable React PWA and a TypeScript API backed by
D1, shipped to Cloudflare by a GitHub Actions pipeline. No business features yet.

## Behaviour
- Opening the app shows a page that reports whether the API and its database are reachable.
- The app can be installed to a phone's home screen as a PWA.
- Every push to `main` that passes checks is deployed automatically.

## Acceptance criteria
- [ ] `GET /api/health` returns `{ "status": "ok", "db": true }` when D1 answers.
- [ ] `npm run typecheck`, `npm test` and `npm run build` pass locally and in CI.
- [ ] The deployed site serves the SPA for unknown paths and never serves the SPA for `/api/*`.
- [ ] Lighthouse reports the deployed site as installable.
- [ ] Merging to `main` deploys to Cloudflare without manual steps.

## Out of scope
- Real data model, authentication, offline support, custom domain.

## Tasks
- [x] Workspace with `client` (React + Vite + vite-plugin-pwa) and `server` (Hono on Workers).
- [x] Health endpoint with a unit test.
- [x] GitHub Actions pipeline (`check` on PRs, `deploy` on `main`).
- [x] Create the D1 database: `npx wrangler d1 create spendship`, put the id in `server/wrangler.jsonc`.
- [ ] First manual deploy: `npx wrangler login`, then `npm run deploy`.
- [ ] Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub repository secrets
      (token scoped to Workers edit + D1 edit only) and create the `production` environment.
- [ ] Replace the placeholder icons in `client/public/` (`pwa-192.png`, `pwa-512.png`).
