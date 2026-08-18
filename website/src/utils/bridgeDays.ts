import { addDays, differenceInDays, format, isWeekend } from 'date-fns';
import { de } from 'date-fns/locale';
import { PLAN_YEAR } from '@/constants/planYear';
import type { Holiday } from '@/types/holiday';

export interface BridgeOpportunity {
  holidayName: string;
  holidayDate: string;
  vacationDate: string;
  periodStart: string;
  periodEnd: string;
  requiredDays: number;
  totalDaysOff: number;
  efficiencyLabel: string;
  displayRange: string;
}

function parseIso(iso: string): Date {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}

function toIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function holidayIso(holiday: Holiday): string | null {
  const value = holiday.start || ('date' in holiday ? String(holiday.date) : '');
  return value ? value.slice(0, 10) : null;
}

function isPublicHolidayOn(date: Date, holidays: Holiday[]): boolean {
  const iso = toIso(date);
  return holidays.some((holiday) => holidayIso(holiday) === iso && holiday.type === 'public');
}

function expandFreeRange(center: Date, holidays: Holiday[]): { start: Date; end: Date } {
  let start = center;
  let end = center;
  let cursor = addDays(center, -1);
  while (isWeekend(cursor) || isPublicHolidayOn(cursor, holidays)) {
    start = cursor;
    cursor = addDays(cursor, -1);
  }
  cursor = addDays(center, 1);
  while (isWeekend(cursor) || isPublicHolidayOn(cursor, holidays)) {
    end = cursor;
    cursor = addDays(cursor, 1);
  }
  return { start, end };
}

export function getBridgeOpportunities(
  holidays: Holiday[],
  year: number = PLAN_YEAR
): BridgeOpportunity[] {
  const publicHolidays = holidays.filter(
    (holiday) => holiday.type === 'public' && (holidayIso(holiday) || '').startsWith(String(year))
  );
  const results: BridgeOpportunity[] = [];
  const seen = new Set<string>();

  for (const holiday of publicHolidays) {
    const holidayIsoDate = holidayIso(holiday);
    if (!holidayIsoDate) continue;
    const holidayDate = parseIso(holidayIsoDate);
    if (isWeekend(holidayDate)) continue;

    for (const offset of [-1, 1]) {
      const candidate = addDays(holidayDate, offset);
      if (candidate.getFullYear() !== year) continue;
      if (isWeekend(candidate) || isPublicHolidayOn(candidate, publicHolidays)) continue;

      const { start, end } = expandFreeRange(candidate, publicHolidays);
      const requiredDays = 1;
      const totalDaysOff = differenceInDays(end, start) + 1;
      if (totalDaysOff <= requiredDays) continue;

      const key = `${toIso(candidate)}-${toIso(start)}-${toIso(end)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      results.push({
        holidayName: holiday.name,
        holidayDate: holidayIsoDate,
        vacationDate: toIso(candidate),
        periodStart: toIso(start),
        periodEnd: toIso(end),
        requiredDays,
        totalDaysOff,
        efficiencyLabel: `${requiredDays} Tag = ${totalDaysOff} frei`,
        displayRange: `${format(start, 'dd.MM.', { locale: de })}–${format(end, 'dd.MM.yyyy', { locale: de })}`,
      });
    }
  }

  return results.sort((a, b) => {
    const efficiencyDelta = b.totalDaysOff / b.requiredDays - a.totalDaysOff / a.requiredDays;
    return efficiencyDelta !== 0 ? efficiencyDelta : a.vacationDate.localeCompare(b.vacationDate);
  });
}

export function getTopBridgeOpportunities(
  holidays: Holiday[],
  limit = 3,
  year: number = PLAN_YEAR
): BridgeOpportunity[] {
  return getBridgeOpportunities(holidays, year).slice(0, limit);
}

/** Bridge opportunities whose vacation day is on or after referenceDate (local calendar day). */
export function getUpcomingBridgeOpportunities(
  holidays: Holiday[],
  referenceDate: Date = new Date(),
  year: number = PLAN_YEAR
): BridgeOpportunity[] {
  const refIso = toIso(referenceDate);
  return getBridgeOpportunities(holidays, year)
    .filter((opportunity) => opportunity.vacationDate >= refIso)
    .sort((a, b) => a.vacationDate.localeCompare(b.vacationDate));
}

/** The chronologically next bridge opportunity from today onward. */
export function getNextBridgeOpportunity(
  holidays: Holiday[],
  referenceDate: Date = new Date(),
  year: number = PLAN_YEAR
): BridgeOpportunity | null {
  const upcoming = getUpcomingBridgeOpportunities(holidays, referenceDate, year);
  return upcoming[0] ?? null;
}

export function bridgeLabelByHolidayDate(
  holidays: Holiday[],
  year: number = PLAN_YEAR
): Record<string, string> {
  const labels: Record<string, string> = {};
  for (const opportunity of getBridgeOpportunities(holidays, year)) {
    if (!labels[opportunity.holidayDate]) {
      labels[opportunity.holidayDate] = opportunity.efficiencyLabel;
    }
  }
  return labels;
}

export function schoolHolidayDays(holidays: Holiday[], year: number = PLAN_YEAR): number {
  return holidays
    .filter((holiday) => (holidayIso(holiday) || '').startsWith(String(year)))
    .reduce((total, holiday) => {
      if (!holiday.start || !holiday.end) return total;
      return total + differenceInDays(parseIso(holiday.end), parseIso(holiday.start)) + 1;
    }, 0);
}
