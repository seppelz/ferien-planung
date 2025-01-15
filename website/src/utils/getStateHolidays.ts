import { Holiday } from '../types/holiday';
import { holidays } from '../data/holidays';
import { GermanState } from '../types/GermanState';

export function getStateHolidays(state: GermanState, year: number): Holiday[] {
  const stateHolidays = holidays.publicHolidays[year]?.[state] || [];
  
  return stateHolidays.map(holiday => ({
    name: holiday.name,
    start: holiday.start,
    end: holiday.end,
    type: "public" as const,
    isRegional: true,
    details: {
      description: "" // State-specific descriptions will be added in state files
    }
  }));
} 