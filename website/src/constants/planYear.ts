/** Planning year used by marketing pages, sitemaps, and SEO copy. */
export const PLAN_YEAR = 2026;

export function plannerUrl(stateSlug?: string): string {
  return stateSlug ? `/app/?state=${encodeURIComponent(stateSlug)}` : '/app/';
}
