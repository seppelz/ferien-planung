import { format, isSameDay, isWithinInterval, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday, RawPublicHoliday, RawSchoolHoliday, SingleDayHoliday, MultiDayHoliday } from '../types/holiday';

export type DateInput = string | Date | null | undefined;

/**
 * Parses a YYYY-MM-DD string into a Date at noon UTC to avoid timezone shifts.
 */
export const parseDateString = (dateStr: string): Date => {
  const date = parseISO(dateStr);
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    12,
    0,
    0,
    0
  ));
};

export const formatDateString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export function toDate(value: DateInput): Date | null {
  if (!value) return null;
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  try {
    const parsed = parseDateString(String(value).slice(0, 10));
    return isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
}

export function toDateString(value: DateInput): string | null {
  if (!value) return null;
  if (typeof value === 'string') {
    const trimmed = value.slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : formatDateString(parseISO(value));
  }
  return isNaN(value.getTime()) ? null : formatDateString(value);
}

export function getHolidayDate(holiday: Holiday): string | null {
  return toDateString(holiday.date ?? holiday.start ?? null);
}

export function getHolidayEnd(holiday: Holiday): string | null {
  return toDateString(holiday.endDate ?? holiday.end ?? holiday.date ?? holiday.start ?? null);
}

export function holidayStartTime(holiday: Holiday): number {
  const date = toDate(holiday.date ?? holiday.start);
  return date ? date.getTime() : 0;
}

export function isSameDayAs(a: DateInput, b: DateInput): boolean {
  const dateA = toDate(a);
  const dateB = toDate(b);
  if (!dateA || !dateB) return false;
  return isSameDay(dateA, dateB);
}

export const areSameDays = isSameDayAs;
export const isSameHolidayDate = isSameDayAs;

export function formatDisplayDate(date: DateInput, pattern = 'dd.MM.yyyy'): string {
  const parsed = toDate(date);
  if (!parsed) return '';
  return format(parsed, pattern, { locale: de });
}

/** True if `date` falls on this holiday (single day or inclusive range). */
export function holidayOccursOn(holiday: Holiday, date: Date): boolean {
  const start = toDate(holiday.date ?? holiday.start);
  if (!start) return false;
  const end = toDate(holiday.endDate ?? holiday.end);
  if (end && end.getTime() !== start.getTime()) {
    const rangeStart = start <= end ? start : end;
    const rangeEnd = start <= end ? end : start;
    return isWithinInterval(date, { start: rangeStart, end: rangeEnd });
  }
  return isSameDay(start, date);
}

export function isPublicHolidayOnDate(holidays: Holiday[], date: Date): boolean {
  return holidays.some((holiday) => holiday.type === 'public' && holidayOccursOn(holiday, date));
}

export const convertRawPublicHoliday = (raw: RawPublicHoliday): SingleDayHoliday => {
  const date = raw.date ?? raw.start ?? '';
  return {
    ...raw,
    name: raw.name,
    type: 'public',
    date,
    endDate: raw.end,
  };
};

export const convertRawSchoolHoliday = (raw: RawSchoolHoliday): MultiDayHoliday => {
  return {
    ...raw,
    name: raw.name,
    type: 'school',
    start: raw.start,
    end: raw.end,
    date: raw.start,
    endDate: raw.end,
  };
};
