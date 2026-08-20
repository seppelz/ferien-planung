/** Planning year used by the vacation planner UI, exports, and calendar. */
export const PLAN_YEAR = 2027;

/** Next planning year — update both constants and rerun content generation when rolling over. */
export const NEXT_PLAN_YEAR = 2028;

export const planYearStart = (): Date => new Date(PLAN_YEAR, 0, 1);

export const isPlanYear = (date: Date): boolean => date.getFullYear() === PLAN_YEAR;
