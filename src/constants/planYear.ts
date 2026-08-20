/** Default / marketing planning year. */
export const PLAN_YEAR = 2027;

/** Next planning year after the default (for future rollovers). */
export const NEXT_PLAN_YEAR = 2028;

/** Years users can select in the planner (newest first for display). */
export const AVAILABLE_PLAN_YEARS = [2027, 2026] as const;

export type AvailablePlanYear = (typeof AVAILABLE_PLAN_YEARS)[number];

export const PLAN_YEAR_STORAGE_KEY = 'holiday-planner-plan-year';
export const PLAN_YEAR_QUERY_KEY = 'year';
export const PLAN_YEAR_BANNER_KEY = 'holiday-planner-year-banner-seen';

export function isAvailablePlanYear(value: number): value is AvailablePlanYear {
  return (AVAILABLE_PLAN_YEARS as readonly number[]).includes(value);
}

export function parsePlanYearParam(value: string | null | undefined): AvailablePlanYear | null {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && isAvailablePlanYear(parsed) ? parsed : null;
}

export function parsePlanYearQuery(search: string): AvailablePlanYear | null {
  const query = search.startsWith('?') ? search.slice(1) : search;
  return parsePlanYearParam(new URLSearchParams(query).get(PLAN_YEAR_QUERY_KEY));
}

export function readStoredPlanYear(): AvailablePlanYear | null {
  try {
    return parsePlanYearParam(localStorage.getItem(PLAN_YEAR_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function storePlanYear(year: AvailablePlanYear): void {
  try {
    localStorage.setItem(PLAN_YEAR_STORAGE_KEY, String(year));
  } catch {
    // ignore quota / private mode
  }
}

export function resolveInitialPlanYear(search = typeof window !== 'undefined' ? window.location.search : ''): AvailablePlanYear {
  return parsePlanYearQuery(search) ?? readStoredPlanYear() ?? PLAN_YEAR;
}

export function planYearStart(year: number = PLAN_YEAR): Date {
  return new Date(year, 0, 1);
}

export function isPlanYear(date: Date, year: number = PLAN_YEAR): boolean {
  return date.getFullYear() === year;
}
