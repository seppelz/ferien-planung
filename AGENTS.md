# Ferien Planung

German holiday planner: marketing site in `website/` (Next.js, port 3000) and the interactive planner SPA in `src/` (Vite, port 5173, base path `/app/`).

## Product roadmap (SEO & planner)

| Step | Scope | Status |
|------|--------|--------|
| 1–9 | Brückentage SEO pages, trust/schema, plan share, checklist, next-bridge, export | Done (merged) |
| 10 | **2027 rollover** — `PLAN_YEAR=2027`, holiday data, `/brueckentage-2027/`, redirects from 2026 | In progress |

Bridge math verification runs in website build: `website/scripts/verify-bridge-math.ts`.

## Cursor Cloud specific instructions

- Planner URL is only `/app/` (locally `http://localhost:5173/app/`, production `https://ferien-planung.de/app/`). Deep links use `?state=berlin` or `?state=BE`.
- Website and planner are separate installs. After `npm install` at the repo root, also run `npm install --prefix website`.
- Start the planner with `npm run dev` (Vite). Start the website with `npm run dev --prefix website` (Next). With both running, `/app/` on port 3000 proxies to Vite in development (`website/next.config.ts` rewrites). Production copies `dist/` into `website/out/app` via `scripts/copy-app-build.js`.
- `website/next.config.ts` sets `distDir: 'out'`. After `npm run build --prefix website`, remove `website/out` before `next dev` or Next will look for server files in the static export and fail with a missing `middleware-manifest.json`.
- Planning year is `PLAN_YEAR` (`2027`) in `src/constants/planYear.ts` and `website/src/constants/planYear.ts`. Brückentage SEO URLs are `/states/[state]/brueckentage-2027/`; Vercel redirects map old `brueckentage-2026` paths.
- **State page colors:** Each `/states/[state]/` page uses its own theme from `website/src/utils/stateColorSchemes.ts` (flag/regional colors). That per-state branding is intentional; the marketing landing page uses the shared ocean-blue brand tokens in `website/src/app/globals.css`.
- Planner onboarding uses localStorage keys in `src/constants/onboardingKeys.ts` (`holiday-planner-state-picked`, `holiday-planner-plan-hint-seen`, `holiday-planner-checklist-dismissed`). After Bundesland pick, a hint badge points users to **Urlaub planen** (desktop) or calendar range selection (mobile).
- Ignore `_archive/` and empty `holiday-planner-app/`. Persistence is localStorage/IndexedDB only.
- Planner lint: `npm run lint`. Planner tests: `npm test`. Website lint: `npm run lint --prefix website`.
