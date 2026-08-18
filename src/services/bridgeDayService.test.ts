import { describe, expect, it } from 'vitest';
import { calculateBridgeDays } from './bridgeDayService';
import { Holiday } from '../types/holiday';
import { GermanState } from '../types/GermanState';

describe('calculateBridgeDays', () => {
  it('finds a weekday between a Friday holiday and the weekend', () => {
    // 2026-10-03 is a Saturday (Tag der Deutschen Einheit is often used as a sample).
    // Use a Thursday public holiday so Friday is a bridge day.
    const holidays: Holiday[] = [
      {
        name: 'Testfeiertag',
        type: 'public',
        date: '2026-05-14', // Thursday
        state: GermanState.BE,
      },
    ];

    const bridgeDays = calculateBridgeDays(holidays, GermanState.BE);
    expect(bridgeDays.length).toBeGreaterThan(0);
    expect(bridgeDays.some((day) => day.date === '2026-05-15' || day.date === '2026-05-13')).toBe(true);
    expect(bridgeDays.every((day) => day.type === 'bridge')).toBe(true);
  });

  it('skips weekends instead of treating them as bridge days', () => {
    const holidays: Holiday[] = [
      {
        name: 'Samstagsfeiertag',
        type: 'public',
        date: '2026-01-03', // Saturday
        state: GermanState.BE,
      },
    ];

    const bridgeDays = calculateBridgeDays(holidays, GermanState.BE);
    expect(bridgeDays.every((day) => day.date !== '2026-01-04')).toBe(true);
  });
});
