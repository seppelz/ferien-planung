# Ferien Planung

German holiday planner: marketing site in `website/` (Next.js, port 3000) and the interactive planner SPA in `src/` (Vite, port 5173, base path `/app/`).

## Cursor Cloud specific instructions

- Planner URL is only `/app/` (locally `http://localhost:5173/app/`, production `https://ferien-planung.de/app/`). Deep links use `?state=berlin` or `?state=BE`.
- Website and planner are separate installs. After `npm install` at the repo root, also run `npm install --prefix website`.
- Start the planner with `npm run dev` (Vite). Start the website with `npm run dev --prefix website` (Next). Do not expect `/app` on port 3000 during local Next export; production copies `dist/` into `website/out/app` via `scripts/copy-app-build.js`.
- `website/next.config.ts` sets `distDir: 'out'`. After `npm run build --prefix website`, remove `website/out` before `next dev` or Next will look for server files in the static export and fail with a missing `middleware-manifest.json`.
- Planning year is `PLAN_YEAR` (`2026`) in `src/constants/planYear.ts` and `website/src/constants/planYear.ts`.
- Ignore `_archive/` and empty `holiday-planner-app/`. Persistence is localStorage/IndexedDB only.
- Planner lint: `npm run lint`. Planner tests: `npm test`. Website lint: `npm run lint --prefix website`.
