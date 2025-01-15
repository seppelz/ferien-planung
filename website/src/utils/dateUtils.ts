import { parseISO, format } from 'date-fns';
import { de } from 'date-fns/locale';

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
 * Formats a date in a consistent way across server and client
 */
export const formatDate = (date: Date): string => {
  return format(date, 'dd.MM.yyyy', { locale: de });
};

/**
 * Formats a date with full month and weekday names
 */
export const formatDateLong = (date: Date): string => {
  return format(date, 'EEEE, d. MMMM yyyy', { locale: de });
};

export const calculateDuration = (start: Date, end: Date): number => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
}; 