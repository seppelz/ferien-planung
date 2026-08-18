import { holidays } from '../../data/holidays';
import { Holiday } from '../../types/holiday';
import { GermanState } from '../../types/GermanState';

export function getStateHolidays(state: GermanState, year: number): Holiday[] {
  const stateHolidays = holidays.publicHolidays[year]?.[state] || [];
  
  return stateHolidays.map((holiday): Holiday => ({
    name: holiday.name,
    date: holiday.start,
    type: 'public',
    details: {
      description: ''
    },
    nationwide: false
  }));
} 