import { Holiday, BridgeDay } from '../types/holiday';
import { addDays, isWeekend, isSameDay, isWithinInterval, subDays, getDay, differenceInDays, eachDayOfInterval, format, parseISO } from 'date-fns';
import { GermanState } from '../types/GermanState';

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

const SEASONAL_FACTORS = {
  SUMMER_PEAK: {
    months: [7, 8],
    factor: 0.7,
    description: 'Hauptsaison'
  },
  WINTER_HOLIDAYS: {
    months: [12, 1],
    factor: 0.8,
    description: 'Winterferien'
  },
  SHOULDER_SEASON: {
    months: [5, 6, 9],
    factor: 1.3,
    description: 'Optimale Reisezeit'
  },
  OFF_PEAK: {
    months: [2, 3, 4, 10, 11],
    factor: 1.2,
    description: 'Nebensaison'
  }
};

// Helper function to convert string date to Date object
const toDate = (dateStr: string | undefined): Date | undefined => {
  if (!dateStr) return undefined;
  return parseISO(dateStr);
};

// Helper function to convert Date to string in ISO format
const toISOString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

// Helper function to find a holiday on a specific date
const findHolidayOnDate = (date: Date, holidays: Holiday[]): Holiday | undefined => {
  return holidays.find(h => {
    if (h.type !== 'public') return false;
    const holidayDate = 'date' in h && h.date ? toDate(h.date) : undefined;
    const holidayStart = 'start' in h && h.start ? toDate(h.start) : undefined;
    return holidayDate ? isSameDay(date, holidayDate) : holidayStart ? isSameDay(date, holidayStart) : false;
  });
};

// Helper function to find connected free days
const findConnectedFreeDays = (
  date: Date,
  direction: 'forward' | 'backward',
  holidays: Holiday[]
): { dates: Date[]; holidays: Holiday[] } => {
  const dates: Date[] = [];
  const connectedHolidays: Holiday[] = [];
  let currentDate = date;

  for (let i = 0; i < 5; i++) {
    currentDate = direction === 'forward' ? addDays(currentDate, 1) : subDays(currentDate, 1);
    
    // Check if it's a weekend
    if (isWeekend(currentDate)) {
      dates.push(currentDate);
      continue;
    }

    // Check if it's a holiday
    const holiday = findHolidayOnDate(currentDate, holidays);
    if (holiday) {
      dates.push(currentDate);
      connectedHolidays.push(holiday);
      continue;
    }

    // If we hit a regular workday, stop looking
    break;
  }

  return {
    dates: direction === 'forward' ? dates : dates.reverse(),
    holidays: connectedHolidays
  };
};

// Calculate workdays needed between two dates
const calculateWorkdays = (startDate: Date, endDate: Date, holidays: Holiday[]): number => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  return days.filter(day => {
    if (isWeekend(day)) return false;
    if (findHolidayOnDate(day, holidays)) return false;
    return true;
  }).length;
};

// Helper function to get seasonal factor
const getSeasonalFactor = (date: Date): number => {
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  
  for (const season of Object.values(SEASONAL_FACTORS)) {
    if (season.months.includes(month)) {
      return season.factor;
    }
  }
  return 1.0; // Default factor if no season matches
};

export const bridgeDayService = {
  calculateBridgeDays(holidays: Holiday[], state: GermanState): BridgeDay[] {
    const bridgeDays: BridgeDay[] = [];
    
    // Filter holidays to only include public holidays for 2025
    const publicHolidays = holidays.filter(h => {
      if (h.type !== 'public') return false;
      const holidayDate = 'date' in h && h.date ? toDate(h.date) : undefined;
      const holidayStart = 'start' in h && h.start ? toDate(h.start) : undefined;
      const date = holidayDate || holidayStart;
      return h.state === state && date && date.getFullYear() === 2025;
    });

    // Process each public holiday that's not on a weekend
    for (const holiday of publicHolidays) {
      const holidayDate = 'date' in holiday && holiday.date ? toDate(holiday.date) : 
                         'start' in holiday && holiday.start ? toDate(holiday.start) : undefined;
      if (!holidayDate || isWeekend(holidayDate)) continue;
      
      // Check days before holiday
      for (let i = 1; i <= 2; i++) {
        const bridgeDate = subDays(holidayDate, i);
        if (isWeekend(bridgeDate) || findHolidayOnDate(bridgeDate, publicHolidays)) continue;

        // Find connected free days
        const before = findConnectedFreeDays(bridgeDate, 'backward', publicHolidays);
        const after = findConnectedFreeDays(bridgeDate, 'forward', publicHolidays);

        // Calculate period
        const allDates = [...before.dates, bridgeDate, ...after.dates];
        const allHolidays = [...before.holidays, ...after.holidays];
        
        const periodStart = before.dates.length > 0 ? before.dates[0] : bridgeDate;
        const periodEnd = after.dates.length > 0 ? after.dates[after.dates.length - 1] : holidayDate;

        // Calculate workdays needed
        const requiredDays = i;
        const totalDaysOff = differenceInDays(periodEnd, periodStart) + 1;

        // Determine pattern
        let pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_NORMAL');
        if (before.holidays.length > 0 && after.holidays.length > 0) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_HOLIDAY');
        } else if (before.dates.some(isWeekend) && after.holidays.length > 0) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'WEEKEND_BRIDGE_HOLIDAY');
        } else if (before.holidays.length > 0 && after.dates.some(isWeekend)) {
          pattern = COMBINATION_PATTERNS.find(p => p.pattern === 'HOLIDAY_BRIDGE_WEEKEND');
        }

        if (!pattern) continue;

        // Calculate efficiency
        const seasonalFactor = getSeasonalFactor(bridgeDate);
        const efficiency = (totalDaysOff / requiredDays) * pattern.weight * seasonalFactor;

        bridgeDays.push({
          date: toISOString(bridgeDate),
          name: pattern.description,
          type: 'bridge',
          state,
          pattern: pattern.pattern,
          efficiency,
          requiredVacationDays: requiredDays,
          totalDaysOff,
          connectedHolidays: allHolidays,
          periodStart: toISOString(periodStart),
          periodEnd: toISOString(periodEnd)
        });
      }
    }

    // Sort by efficiency
    return bridgeDays.sort((a, b) => {
      const dateA = toDate(a.date);
      const dateB = toDate(b.date);
      if (!dateA || !dateB) return 0;
      return dateA.getTime() - dateB.getTime();
    });
  }
}; 