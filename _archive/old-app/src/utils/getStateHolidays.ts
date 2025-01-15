import { holidays } from '../data/holidays';
import { Holiday, SingleDayHoliday, MultiDayHoliday } from '../types/holiday';
import { GermanState } from '../types/GermanState';

export function getStateHolidays(state: GermanState, year: number): Holiday[] {
  const stateHolidays = holidays.publicHolidays[year]?.[state] || [];
  const nationalHolidays = holidays.publicHolidays[year]?.ALL || [];

  const convertHoliday = (holiday: { name: string; start: string; end?: string; nationwide?: boolean }) => {
    if (holiday.end) {
      const multiDayHoliday: MultiDayHoliday = {
        name: holiday.name,
        type: 'public',
        state,
        start: holiday.start,
        end: holiday.end
      };
      return multiDayHoliday;
    } else {
      const singleDayHoliday: SingleDayHoliday = {
        name: holiday.name,
        type: 'public',
        state,
        date: holiday.start
      };
      return singleDayHoliday;
    }
  };

  return [
    ...stateHolidays.map(convertHoliday),
    ...nationalHolidays.map(convertHoliday)
  ];
} 