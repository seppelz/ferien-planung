import { Holiday, BridgeDay } from '../types/holiday';
import { addDays, isWeekend, differenceInDays } from 'date-fns';
import { parseDateString, formatDateString, areSameDays } from './dateUtils';

interface VacationRecommendation {
  start: string;
  end: string;
  requiredDays: number;
  totalDaysOff: number;
  efficiency: number;
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
}

// Helper to find a holiday on a specific date
const findHolidayOnDate = (dateStr: string, holidays: Holiday[]): Holiday | undefined => {
  return holidays.find(h => {
    if (h.type === 'bridge') return false;
    return h.type === 'public' && (h.date === dateStr || h.start === dateStr);
  });
};

// Helper to check if a date is a holiday
const isHolidayOnDate = (dateStr: string, holidays: Holiday[]): boolean => {
  return holidays.some(h => {
    if (h.type === 'bridge') return false;
    return h.type === 'public' && (h.date === dateStr || h.start === dateStr);
  });
};

// Helper to calculate workdays between two dates
const calculateWorkdays = (startDate: Date, endDate: Date, holidays: Holiday[]): number => {
  let workdays = 0;
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const currentDateStr = formatDateString(currentDate);
    if (!isWeekend(currentDate) && !isHolidayOnDate(currentDateStr, holidays)) {
      workdays++;
    }
    currentDate = addDays(currentDate, 1);
  }

  return workdays;
};

// Helper to analyze a potential bridge day opportunity
const analyzeBridgeDayOpportunity = (
  startDate: Date,
  endDate: Date,
  holidays: Holiday[]
): VacationRecommendation => {
  const startStr = formatDateString(startDate);
  const endStr = formatDateString(endDate);
  const requiredDays = calculateWorkdays(startDate, endDate, holidays);
  const totalDaysOff = differenceInDays(endDate, startDate) + 1;

  const relevantHolidays = holidays.filter(h => {
    if (h.type === 'bridge') return false;
    const dateStr = h.date || h.start;
    if (!dateStr) return false;
    const holidayDate = parseDateString(dateStr);
    return holidayDate >= startDate && holidayDate <= endDate;
  });

  const relevantBridgeDays = holidays.filter((h): h is BridgeDay => {
    if (h.type !== 'bridge') return false;
    const bridgeDate = parseDateString(h.date);
    return bridgeDate >= startDate && bridgeDate <= endDate;
  });

  return {
    start: startStr,
    end: endStr,
    requiredDays,
    totalDaysOff,
    efficiency: totalDaysOff / requiredDays,
    holidays: relevantHolidays,
    bridgeDays: relevantBridgeDays
  };
};

// Main function to analyze vacation opportunities
export const analyzeVacationOpportunities = (holidays: Holiday[]): VacationRecommendation[] => {
  const recommendations: VacationRecommendation[] = [];

  // Group holidays by proximity
  const holidayGroups: Holiday[][] = [];
  const sortedHolidays = holidays
    .filter(h => h.type === 'public')
    .sort((a, b) => {
      const dateA = parseDateString(a.date || a.start || '');
      const dateB = parseDateString(b.date || b.start || '');
      return dateA.getTime() - dateB.getTime();
    });

  let currentGroup: Holiday[] = [];
  for (let i = 0; i < sortedHolidays.length; i++) {
    const holiday = sortedHolidays[i];
    const lastHoliday = currentGroup[currentGroup.length - 1];

    if (!lastHoliday) {
      currentGroup.push(holiday);
      continue;
    }

    const holidayDateStr = holiday.date || holiday.start;
    const lastHolidayDateStr = lastHoliday.date || lastHoliday.start;
    if (!holidayDateStr || !lastHolidayDateStr) continue;

    const daysBetween = differenceInDays(
      parseDateString(holidayDateStr),
      parseDateString(lastHolidayDateStr)
    );

    if (daysBetween <= 5) {
      currentGroup.push(holiday);
    } else {
      holidayGroups.push([...currentGroup]);
      currentGroup = [holiday];
    }
  }

  if (currentGroup.length > 0) {
    holidayGroups.push(currentGroup);
  }

  // Analyze each group for vacation opportunities
  for (const group of holidayGroups) {
    const firstHoliday = group[0];
    const lastHoliday = group[group.length - 1];

    const firstDateStr = firstHoliday.date || firstHoliday.start;
    const lastDateStr = lastHoliday.date || lastHoliday.start;
    if (!firstDateStr || !lastDateStr) continue;

    const firstDate = parseDateString(firstDateStr);
    const lastDate = parseDateString(lastDateStr);

    const windowStart = addDays(firstDate, -5);
    const windowEnd = addDays(lastDate, 5);

    // Try different combinations of start and end dates
    for (let start = windowStart; start <= firstDate; start = addDays(start, 1)) {
      for (let end = lastDate; end <= windowEnd; end = addDays(end, 1)) {
        const rec = analyzeBridgeDayOpportunity(start, end, holidays);
        if (rec.requiredDays > 0 && rec.requiredDays <= 5) {
          recommendations.push(rec);
        }
      }
    }
  }

  // Sort by efficiency and remove duplicates
  return recommendations
    .sort((a, b) => b.efficiency - a.efficiency)
    .filter((rec, index, self) =>
      index === self.findIndex(r =>
        areSameDays(r.start, rec.start) &&
        areSameDays(r.end, rec.end)
      )
    );
};