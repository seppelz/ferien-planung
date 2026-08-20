import { describe, expect, it } from 'vitest';
import { GermanState } from '../types/GermanState';
import { encodePlanToParam, decodePlanFromParam } from './planShareService';

describe('planShareService', () => {
  it('round-trips a minimal plan payload', () => {
    const encoded = encodePlanToParam({
      person1: {
        id: 1,
        selectedState: GermanState.BE,
        availableVacationDays: 30,
        vacationPlans: [
          {
            id: '1',
            personId: 1,
            isVisible: true,
            state: GermanState.BE,
            start: new Date(2027, 4, 7),
            end: new Date(2027, 4, 10),
            efficiency: { requiredDays: 1, gainedDays: 4, score: 4 },
          },
        ],
      },
      person2: null,
    });

    const decoded = decodePlanFromParam(encoded);
    expect(decoded?.s).toBe(GermanState.BE);
    expect(decoded?.p1).toEqual([['2027-05-07', '2027-05-10']]);
  });
});
