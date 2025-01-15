import { parse, parseISO, format } from 'date-fns';
import { Holiday, RawPublicHoliday, RawSchoolHoliday, SingleDayHoliday, MultiDayHoliday } from '../types/holiday';

/**
 * Parses a date string in YYYY-MM-DD format into a Date object,
 * ensuring consistent behavior across timezones by setting the time to noon UTC.
 * This prevents the date from shifting due to timezone offsets.
 */
export const parseDateString = (dateStr: string): Date => {
  // Parse the date string into a Date object
  const date = parseISO(dateStr);
  
  // Set the time to 12:00:00 UTC to avoid timezone issues
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    12, // noon UTC
    0,
    0,
    0
  ));
};

/**
 * Formats a Date object into a YYYY-MM-DD string
 */
export const formatDateString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Converts a raw public holiday into a SingleDayHoliday
 */
export const convertRawPublicHoliday = (raw: RawPublicHoliday): SingleDayHoliday => {
  return {
    ...raw,
    date: raw.date,
    endDate: raw.end
  };
};

/**
 * Converts a raw school holiday into a MultiDayHoliday
 */
export const convertRawSchoolHoliday = (raw: RawSchoolHoliday): MultiDayHoliday => {
  return {
    ...raw,
    start: raw.start,
    end: raw.end,
    date: raw.start // For compatibility
  };
}; 