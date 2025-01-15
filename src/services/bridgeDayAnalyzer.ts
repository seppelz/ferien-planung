import { Holiday } from '../types';
import { isSameDay } from 'date-fns';
import { GermanState } from '../types/GermanState';
import { getHolidayDate, isSameHolidayDate, parseDateString, formatDateString } from '../utils/dateUtils';

export function findCloseHolidays(holidays: Holiday[], state?: GermanState): Holiday[] {
  const publicHolidays = holidays.filter(h => h.type === 'public' && (!state || h.state === state));
  
  // Sort holidays by date
  const sortedHolidays = [...publicHolidays].sort((a, b) => {
    const dateA = getHolidayDate(a);
    const dateB = getHolidayDate(b);
    if (!dateA || !dateB) return 0;
    return dateA.localeCompare(dateB);
  });

  // Find holidays that are close to each other
  const closeHolidays: Holiday[] = [];
  for (let i = 0; i < sortedHolidays.length - 1; i++) {
    const currentHoliday = sortedHolidays[i];
    const nextHoliday = sortedHolidays[i + 1];
    
    const currentDate = getHolidayDate(currentHoliday);
    const nextDate = getHolidayDate(nextHoliday);
    
    if (!currentDate || !nextDate) continue;
    
    const currentDateObj = parseDateString(currentDate);
    const nextDateObj = parseDateString(nextDate);
    
    // If holidays are within 5 days of each other
    const diffInDays = Math.abs((nextDateObj.getTime() - currentDateObj.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays <= 5) {
      if (!closeHolidays.includes(currentHoliday)) {
        closeHolidays.push(currentHoliday);
      }
      if (!closeHolidays.includes(nextHoliday)) {
        closeHolidays.push(nextHoliday);
      }
    }
  }

  return closeHolidays;
}

export function isHoliday(date: string, holidays: Holiday[]): boolean {
  return holidays.some(holiday => {
    const holidayDate = getHolidayDate(holiday);
    return holidayDate === date;
  });
} 