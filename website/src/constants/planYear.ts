/** Default / marketing planning year. */
export const PLAN_YEAR = 2027;

/** Next planning year after the default (for future rollovers). */
export const NEXT_PLAN_YEAR = 2028;

/** Years the planner can open via ?year= (keep in sync with app AVAILABLE_PLAN_YEARS). */
export const AVAILABLE_PLAN_YEARS = [2026, 2027] as const;

export function plannerUrl(stateSlug?: string, year?: number): string {
  const params = new URLSearchParams();
  if (stateSlug) params.set('state', stateSlug);
  if (year) params.set('year', String(year));
  const query = params.toString();
  return query ? `/app/?${query}` : '/app/';
}
