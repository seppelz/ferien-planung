import { describe, expect, it } from 'vitest';
import { holidayOccursOn, isSameDayAs, parseDateString, toDate, toDateString } from './dateUtils';

describe('dateUtils', () => {
  it('parses ISO dates at noon UTC to avoid timezone shifts', () => {
    const date = parseDateString('2026-10-03');
    expect(date.getUTCHours()).toBe(12);
    expect(toDateString(date)).toBe('2026-10-03');
  });

  it('treats the same calendar day as equal regardless of Date vs string', () => {
    expect(isSameDayAs('2026-10-03', parseDateString('2026-10-03'))).toBe(true);
    expect(isSameDayAs('2026-10-03', '2026-10-04')).toBe(false);
    expect(toDate(undefined)).toBeNull();
  });

  it('detects holidays that span a range', () => {
    const schoolHoliday = {
      name: 'Osterferien',
      type: 'school' as const,
      start: '2026-03-30',
      end: '2026-04-10',
    };
    expect(holidayOccursOn(schoolHoliday, parseDateString('2026-04-03'))).toBe(true);
    expect(holidayOccursOn(schoolHoliday, parseDateString('2026-04-20'))).toBe(false);
  });
});
