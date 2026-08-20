import { describe, expect, it } from 'vitest';
import {
  isAvailablePlanYear,
  parsePlanYearParam,
  parsePlanYearQuery,
  PLAN_YEAR,
} from './planYear';

describe('planYear helpers', () => {
  it('defaults PLAN_YEAR to 2027', () => {
    expect(PLAN_YEAR).toBe(2027);
  });

  it('accepts available years only', () => {
    expect(isAvailablePlanYear(2026)).toBe(true);
    expect(isAvailablePlanYear(2027)).toBe(true);
    expect(isAvailablePlanYear(2025)).toBe(false);
  });

  it('parses year query params', () => {
    expect(parsePlanYearParam('2026')).toBe(2026);
    expect(parsePlanYearParam('2028')).toBeNull();
    expect(parsePlanYearQuery('?state=berlin&year=2026')).toBe(2026);
    expect(parsePlanYearQuery('year=2027')).toBe(2027);
  });
});
