# Ferien Planung

German holiday planner: marketing site in `website/` (Next.js, port 3000) and the interactive planner SPA in `src/` (Vite, port 5173, base path `/app/`).

## Product roadmap (SEO & planner)

Work in this order; **2027 rollover only after steps 1–9**:

| Step | Scope | Status |
|------|--------|--------|
| 1 | Verify server-side Brückentag math (`website/src/utils/bridgeDays.ts` vs planner); programmatic `/states/[state]/brueckentage-2026/` pages | In progress |
| 2 | `FAQPage` + `BreadcrumbList` JSON-LD; visible breadcrumbs on state/subpages | In progress |
| 3 | Remove unverified `AggregateRating` and testimonials (Search Console connected separately) | Done |
| 4 | Keep SEO on `/`; enrich `/app/` static shell (`index.html` noscript + meta) without competing with home | Done |
| 5 | Keep `website/scripts/generate-sitemap.ts` in sync when adding URLs (sitemap already submitted in GSC) | Ongoing |
| 6 | **Plan kopieren** — shareable URL via `?plan=` base64 payload (`src/services/planShareService.ts`) | Done |
| 7 | First-run checklist after Bundesland pick (scroll to top-3, export hint) | Done |
| 8 | **Nächster Brückentag** — date-aware banner/widget (not past dates) on state pages + planner | Done |
| 9 | Export UX — ICS prominence, Google Calendar link, HR/PDF via existing export modal | Done |
| 10 | **2027** — set `NEXT_PLAN_YEAR`, duplicate `brueckentage-2027` routes, holiday data, redirects | After 1–9 |

Bridge math verification runs in website build: `website/scripts/verify-bridge-math.ts`.

## Cursor Cloud specific instructions

- Planner URL is only `/app/` (locally `http://localhost:5173/app/`, production `https://ferien-planung.de/app/`). Deep links use `?state=berlin` or `?state=BE`.
- Website and planner are separate installs. After `npm install` at the repo root, also run `npm install --prefix website`.
- Start the planner with `npm run dev` (Vite). Start the website with `npm run dev --prefix website` (Next). With both running, `/app/` on port 3000 proxies to Vite in development (`website/next.config.ts` rewrites). Production copies `dist/` into `website/out/app` via `scripts/copy-app-build.js`.
- `website/next.config.ts` sets `distDir: 'out'`. After `npm run build --prefix website`, remove `website/out` before `next dev` or Next will look for server files in the static export and fail with a missing `middleware-manifest.json`.
- Planning year is `PLAN_YEAR` (`2026`) in `src/constants/planYear.ts` and `website/src/constants/planYear.ts`.
- **State page colors:** Each `/states/[state]/` page uses its own theme from `website/src/utils/stateColorSchemes.ts` (flag/regional colors). That per-state branding is intentional; the marketing landing page uses the shared ocean-blue brand tokens in `website/src/app/globals.css`.
- Planner onboarding uses localStorage keys in `src/constants/onboardingKeys.ts` (`holiday-planner-state-picked`, `holiday-planner-plan-hint-seen`). After Bundesland pick, a hint badge points users to **Urlaub planen** (desktop) or calendar range selection (mobile).
- Ignore `_archive/` and empty `holiday-planner-app/`. Persistence is localStorage/IndexedDB only.
- Planner lint: `npm run lint`. Planner tests: `npm test`. Website lint: `npm run lint --prefix website`.
