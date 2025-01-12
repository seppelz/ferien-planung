import { Holiday } from '../../types/holiday';
import { getStateHolidays } from '../utils/getStateHolidays';

const getHolidaysForYear = (year: number): Holiday[] => {
  const stateHolidays = getStateHolidays('BW', year).map((holiday: Holiday) => ({
    ...holiday,
    type: 'public' as const
  }));

  return stateHolidays;
};

export const baden_wuerttemberg = {
  2024: getHolidaysForYear(2024),
  2025: getHolidaysForYear(2025),
  2026: getHolidaysForYear(2026)
};