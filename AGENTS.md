# AGENTS.md

## Cursor Cloud specific instructions

This repo is a monorepo with **two independent, fully client-side front-ends** (no backend, database, API, or secrets). Node 22 works (CI pins Node 20.x; both are fine).

### Services

| Service | Dir | Dev command | Port | URL |
| --- | --- | --- | --- | --- |
| Vite React PWA — the vacation planner (core product) | repo root (`src/`) | `npm run dev` | 5173 | http://localhost:5173/app/ (base path is `/app/`) |
| Next.js 15 marketing/SEO site | `website/` | `npm run dev` | 3000 | http://localhost:3000 |

Standard scripts live in each `package.json`; production build/lint/deploy commands are documented there and in `README.md`. In production (`vercel.json`) only the website is built, and `scripts/copy-app-build.js` copies the Vite app's `dist/` into `website/out/app`.

Notes / gotchas:
- The website uses `trailingSlash: true` (`website/next.config.ts`), so routes without a trailing slash return a `308` redirect (e.g. request `/states/`, not `/states`). This is expected.
- Ignore `_archive/` (legacy copy) and the empty `holiday-planner-app/` directory.
- Running the website build first creates `website/out/`, which the root Vite dev server then also scans as extra HTML entry points (harmless dep-scan noise in the Vite log).

### Known pre-existing issues (NOT environment problems — do not "fix" as part of setup)

These are bugs in the committed source, unrelated to dependency/setup. The environment is correctly configured; these fail regardless of setup:
- **Vite planner fails to render in the browser.** `src/services/bridgeDayService.ts` uses `continue` inside a `.forEach(...)` arrow callback (~line 115), which is invalid JS. esbuild returns HTTP 500 for that module, and it is imported (via `src/hooks/useBridgeDays.ts`) by the planner's core pages, so the app crashes on load. Changing `continue` → `return` is the one-line fix, but that is application code, not environment.
- **Root `npm run build` fails** at the `tsc` type-check step with many pre-existing TypeScript errors (e.g. `src/utils/smartVacationAnalysis.ts`, `src/utils/vacationAnalysis.ts`). Vite dev does not type-check, so this does not affect `npm run dev`.
- **Root `npm run lint` is broken**: the script passes `--ext` (unsupported with the flat `eslint.config.js`), and `eslint.config.js` imports `typescript-eslint`, `@eslint/js`, and `globals`, which are not declared in the root `package.json`.
- The `website/` app builds, lints (`npm run lint`), and runs cleanly — use it to verify the environment.
