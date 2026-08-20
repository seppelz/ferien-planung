/** Planning year used by marketing pages, sitemaps, and SEO copy. */
export const PLAN_YEAR = 2027;

/** Next planning year — mirror of planner constant for SEO/content rollover. */
export const NEXT_PLAN_YEAR = 2028;

export function plannerUrl(stateSlug?: string): string {
  return stateSlug ? `/app/?state=${encodeURIComponent(stateSlug)}` : '/app/';
}
