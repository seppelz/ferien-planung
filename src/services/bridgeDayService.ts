import { Holiday, BridgeDay } from '@/types';
import { addDays, differenceInDays, isWeekend } from 'date-fns';
import { getHolidayDate, isSameDayAs, toDate, toDateString } from '@/utils/dateUtils';

type CombinationPattern = {
  pattern: string;
  weight: number;
  description: string;
}

const COMBINATION_PATTERNS: CombinationPattern[] = [
  {
    pattern: 'HOLIDAY_BRIDGE_WEEKEND',
    weight: 3.0,
    description: 'Brückentag verbindet Feiertag mit Wochenende'
  },
  {
    pattern: 'HOLIDAY_BRIDGE_HOLIDAY',
    weight: 4.0,
    description: 'Brückentag zwischen zwei Feiertagen'
  },
  {
    pattern: 'WEEKEND_BRIDGE_HOLIDAY',
    weight: 3.0,
    description: 'Brückentag verbindet Wochenende mit Feiertag'
  },
  {
    pattern: 'HOLIDAY_BRIDGE_NORMAL',
    weight: 2.0,
    description: 'Einzelner Brückentag nach Feiertag'
  }
];

// Helper to find a holiday on a specific date
const findHolidayOnDate = (dateStr: string, holidays: Holiday[]): Holiday | undefined => {
  return holidays.find(h => {
    if (h.type !== 'public') return false;
    const holidayDate = getHolidayDate(h);
    return holidayDate === dateStr;
  });
};

const findConnectedFreeDays = (
  dateStr: string,
  direction: 'forward' | 'backward',
  holidays: Holiday[]
): { dates: string[]; holidays: Holiday[] } => {
  const result = {
    dates: [] as string[],
    holidays: [] as Holiday[]
  };

  let currentDate = toDate(dateStr);
  if (!currentDate) return result;

  let keepGoing = true;
  let daysChecked = 0;
  const MAX_DAYS = 7; // Reasonable limit for connected days

  do {
    daysChecked++;
    if (daysChecked > MAX_DAYS) {
      keepGoing = false;
      break;
    }

    const nextDate = direction === 'forward' ? addDays(currentDate, 1) : addDays(currentDate, -1);
    const nextDateStr = toDateString(nextDate);
    if (!nextDateStr) {
      keepGoing = false;
      break;
    }

    const holiday = holidays.find(h => {
      if (h.type !== 'public') return false;
      const holidayDate = getHolidayDate(h);
      return holidayDate === nextDateStr;
    });

    if (isWeekend(nextDate) || holiday) {
      result.dates.push(nextDateStr);
      if (holiday) result.holidays.push(holiday);
      currentDate = nextDate;
    } else {
      keepGoing = false;
    }
  } while (keepGoing);

  return result;
};

export function calculateBridgeDays(holidays: Holiday[], state?: string): BridgeDay[] {
  const publicHolidays = holidays.filter(h => {
    if (h.type !== 'public') return false;
    if (state && h.state !== state) return false;
    return true;
  });

  const bridgeDays: BridgeDay[] = [];

  // Process each holiday
  for (const holiday of publicHolidays) {
    const holidayDate = getHolidayDate(holiday);
    if (!holidayDate) continue;

    const holidayDateObj = toDate(holidayDate);
    if (!holidayDateObj) continue;

    // Check days before and after the holiday
    [-1, 1].forEach(offset => {
      const bridgeDate = toDateString(addDays(holidayDateObj, offset));
      if (!bridgeDate) return;

      // Skip if it's a weekend or another holiday
      if (isWeekend(toDate(bridgeDate)!) || findHolidayOnDate(bridgeDate, publicHolidays)) continue;

      // Find connected free days
      const before = findConnectedFreeDays(bridgeDate, 'backward', publicHolidays);
      const after = findConnectedFreeDays(bridgeDate, 'forward', publicHolidays);

      // Calculate efficiency
      const totalDaysOff = before.dates.length + after.dates.length + 1;
      const requiredVacationDays = 1;
      const efficiency = totalDaysOff / requiredVacationDays;

      // Create bridge day
      const bridgeDay: BridgeDay = {
        name: `Brückentag ${toDateString(bridgeDate)}`,
        type: 'bridge',
        date: bridgeDate,
        start: before.dates[0] || bridgeDate,
        end: after.dates[after.dates.length - 1] || bridgeDate,
        days: totalDaysOff,
        holidays: [...before.holidays, holiday, ...after.holidays].filter(h => h.type === 'public'),
        efficiency,
        requiredVacationDays,
        totalDaysOff,
        periodStart: before.dates[0] || bridgeDate,
        periodEnd: after.dates[after.dates.length - 1] || bridgeDate,
        state: state as any,
        details: undefined,
        isRegional: false,
        nationwide: false
      };

      bridgeDays.push(bridgeDay);
    });
  }

  // Remove duplicates and sort
  return bridgeDays
    .filter((bridgeDay, index, self) =>
      self.findIndex(bd =>
        isSameDayAs(bd.date, bridgeDay.date) &&
        isSameDayAs(bd.periodStart, bridgeDay.periodStart) &&
        isSameDayAs(bd.periodEnd, bridgeDay.periodEnd)
      ) === index
    )
    .sort((a, b) => {
      const dateA = getHolidayDate(a);
      const dateB = getHolidayDate(b);
      if (!dateA || !dateB) return 0;
      return dateA.localeCompare(dateB);
    });
} 