import { VacationPlan, BridgeDayRecommendation } from '../types/vacationPlan';
import { Holiday } from '../types';
import { 
  addDays, 
  differenceInBusinessDays,
  differenceInDays,
  eachDayOfInterval, 
  isWeekend,
  isSameDay,
  subDays,
  isWithinInterval
} from 'date-fns';
import { parseDateString, formatDateString, areSameDays } from './dateUtils';

export interface VacationAnalysis {
  bridgeDayOpportunities: BridgeDayRecommendation[];
  schoolHolidayOverlaps: {
    total: number;
    percentage: number;
    recommendations: string[];
  };
  efficiency: {
    score: number;
    recommendations: string[];
  };
}

interface VacationPeriod {
  startDate: string;
  endDate: string;
  days: number;
  holidays: Holiday[];
  weekends: number;
  workdays: number;
}

function getValidDateString(holiday: Holiday): string {
  return holiday.date || holiday.start || '';
}

function safeParseDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  try {
    return parseDateString(dateStr);
  } catch {
    return null;
  }
}

export function getHolidayPeriods(holidays: Holiday[]): VacationPeriod[] {
  const validHolidays = holidays
    .filter(h => h.type === 'public' && (h.date || h.start))
    .map(h => {
      const start = getValidDateString(h);
      const end = h.date || h.end || start;
      return { start, end, holiday: h };
    })
    .filter(({ start }) => {
      const date = safeParseDate(start);
      return date !== null;
    });

  const sortedHolidays = [...validHolidays].sort((a, b) => {
    const dateA = safeParseDate(a.start);
    const dateB = safeParseDate(b.start);
    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });

  const periods: VacationPeriod[] = [];
  let currentPeriod: VacationPeriod | null = null;

  for (const { start, end, holiday } of sortedHolidays) {
    const startDate = safeParseDate(start);
    if (!startDate) continue;
    
    if (!currentPeriod) {
      currentPeriod = {
        startDate: start,
        endDate: end,
        days: 1,
        holidays: [holiday],
        weekends: isWeekend(startDate) ? 1 : 0,
        workdays: isWeekend(startDate) ? 0 : 1
      };
      continue;
    }

    const currentEndDate = safeParseDate(currentPeriod.endDate);
    const nextStartDate = startDate;
    if (!currentEndDate) continue;

    const daysBetween = differenceInDays(nextStartDate, currentEndDate);

    if (daysBetween <= 3) {
      // Extend current period
      currentPeriod.endDate = end;
      currentPeriod.days += daysBetween + 1;
      currentPeriod.holidays.push(holiday);
      currentPeriod.weekends += isWeekend(nextStartDate) ? 1 : 0;
      currentPeriod.workdays += isWeekend(nextStartDate) ? 0 : 1;
    } else {
      // Start new period
      periods.push(currentPeriod);
      currentPeriod = {
        startDate: start,
        endDate: end,
        days: 1,
        holidays: [holiday],
        weekends: isWeekend(nextStartDate) ? 1 : 0,
        workdays: isWeekend(nextStartDate) ? 0 : 1
      };
    }
  }

  if (currentPeriod) {
    periods.push(currentPeriod);
  }

  return periods;
}

export function isHolidayOrWeekend(date: Date, publicHolidays: Holiday[]): boolean {
  return publicHolidays.some(h => {
    const dateStr = getValidDateString(h);
    const holidayDate = safeParseDate(dateStr);
    return holidayDate ? isSameDay(holidayDate, date) : false;
  }) || isWeekend(date);
}

function getHolidayDate(holiday: Holiday): string {
  if ('date' in holiday && holiday.date) {
    return holiday.date;
  }
  if ('start' in holiday && holiday.start) {
    return holiday.start;
  }
  // Fallback to current date as string - this should never happen in practice
  // as our holiday data is validated, but TypeScript needs this
  return new Date().toISOString().split('T')[0];
}

export function findBridgeDayOpportunities(
  holidays: Holiday[],
  existingVacations: VacationPlan[],
  startDate: Date = new Date(2025, 0, 1),
  endDate: Date = new Date(2025, 11, 31)
): BridgeDayRecommendation[] {
  const opportunities: BridgeDayRecommendation[] = [];
  
  // Filter out school holidays
  const publicHolidays = holidays.filter(h => !h.name.toLowerCase().includes('ferien'));
  const schoolHolidays = holidays.filter(h => h.name.toLowerCase().includes('ferien'));

  // Create intervals for school holidays to check overlaps
  const schoolHolidayIntervals = schoolHolidays.map(h => {
    const date = getHolidayDate(h);
    return {
      start: new Date(date),
      end: new Date(date)
    };
  });

  // Sort holidays chronologically
  const sortedHolidays = publicHolidays.sort((a, b) => {
    const dateA = new Date(getHolidayDate(a));
    const dateB = new Date(getHolidayDate(b));
    return dateA.getTime() - dateB.getTime();
  });

  // Helper function to check if a date is a holiday or school holiday
  const isHolidayOrSchoolHoliday = (date: Date) => {
    return publicHolidays.some(h => isSameDay(new Date(getHolidayDate(h)), date)) ||
           schoolHolidayIntervals.some(interval => isWithinInterval(date, interval));
  };

  // Look for bridge day opportunities
  for (let i = 0; i < sortedHolidays.length; i++) {
    const holiday = sortedHolidays[i];
    const holidayDate = new Date(getHolidayDate(holiday));
    
    if (holidayDate < startDate || holidayDate > endDate) continue;

    // Look ahead up to 7 days to find connected holidays
    let connectedDays = [holidayDate];
    let nextDate = holidayDate;
    let j = i + 1;

    while (j < sortedHolidays.length) {
      const nextHoliday = sortedHolidays[j];
      const nextHolidayDate = new Date(getHolidayDate(nextHoliday));
      const daysBetween = differenceInBusinessDays(nextHolidayDate, nextDate);

      if (daysBetween > 5) break;

      connectedDays.push(nextHolidayDate);
      nextDate = nextHolidayDate;
      j++;
    }

    // For each connected period, look for bridge opportunities
    if (connectedDays.length > 0) {
      const start = connectedDays[0];
      const end = connectedDays[connectedDays.length - 1];
      
      // Get all days in the interval
      const allDays = eachDayOfInterval({ start, end });
      
      // Find required bridge days (workdays that aren't holidays or school holidays)
      const bridgeDates = allDays.filter(date => 
        !isWeekend(date) && 
        !isHolidayOrSchoolHoliday(date)
      );

      if (bridgeDates.length > 0) {
        // Calculate total gained days (including weekends and holidays)
        const gainedDays = differenceInDays(end, start) + 1;
        
        // Only count workdays as required days
        const requiredDays = bridgeDates.length;
        
        // Calculate efficiency percentage
        const efficiency = ((gainedDays - requiredDays) / requiredDays) * 100;

        opportunities.push({
          dates: bridgeDates,
          requiredVacationDays: requiredDays,
          gainedFreeDays: gainedDays,
          efficiency,
          description: `${bridgeDates[0].toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} - ${end.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })} (${requiredDays}d = ${gainedDays}d, +${Math.round(efficiency)}%) (${bridgeDates.map(d => d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })).join(' + ')})`,
          isOptimal: efficiency >= 200
        });
      }
    }

    // Skip the holidays we've already processed in this chain
    i = j - 1;
  }

  // Sort by efficiency and remove duplicates
  return opportunities
    .sort((a, b) => b.efficiency - a.efficiency)
    .filter((opp, index, self) => 
      index === self.findIndex(o => 
        o.dates.length === opp.dates.length &&
        o.dates.every((d, i) => isSameDay(d, opp.dates[i]))
      )
    );
}

export function analyzeSchoolHolidayOverlap(
  vacations: VacationPlan[],
  schoolHolidays: Holiday[]
): { overlappingDays: number; percentage: number } {
  let totalVacationDays = 0;
  let overlappingDays = 0;

  vacations.forEach(vacation => {
    const vacationDays = eachDayOfInterval({ start: vacation.start, end: vacation.end });
    totalVacationDays += vacationDays.length;

    vacationDays.forEach(day => {
      if (schoolHolidays.some(holiday => 
        isSameDay(new Date(getHolidayDate(holiday)), day)
      )) {
        overlappingDays++;
      }
    });
  });

  return {
    overlappingDays,
    percentage: totalVacationDays > 0 ? (overlappingDays / totalVacationDays) * 100 : 0
  };
}

export function analyzeVacationEfficiency(
  vacations: VacationPlan[],
  holidays: Holiday[],
  schoolHolidays: Holiday[]
): VacationAnalysis {
  const bridgeDayOpportunities = findBridgeDayOpportunities(holidays, vacations);
  const schoolOverlap = analyzeSchoolHolidayOverlap(vacations, schoolHolidays);
  
  // Calculate overall efficiency
  let totalRequiredDays = 0;
  let totalGainedDays = 0;
  
  vacations.forEach(vacation => {
    const days = eachDayOfInterval({ start: vacation.start, end: vacation.end });
    const requiredDays = days.filter(d => !isWeekend(d)).length;
    const gainedDays = days.length;
    
    totalRequiredDays += requiredDays;
    totalGainedDays += gainedDays;
  });

  const efficiencyScore = totalRequiredDays > 0 ? 
    (totalGainedDays - totalRequiredDays) / totalRequiredDays : 0;

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (bridgeDayOpportunities.length > 0) {
    const optimalOpportunities = bridgeDayOpportunities.filter(o => o.isOptimal);
    if (optimalOpportunities.length > 0) {
      recommendations.push(`${optimalOpportunities.length} besonders effiziente Brückentag-Möglichkeiten gefunden`);
    } else {
      recommendations.push(`${bridgeDayOpportunities.length} Brückentag-Möglichkeiten gefunden`);
    }
  }
  
  if (efficiencyScore < 1) {
    recommendations.push('Versuche mehr Feiertage und Wochenenden in deine Urlaubsplanung einzubeziehen');
  }

  if (schoolOverlap.percentage < 30 && schoolHolidays.length > 0) {
    recommendations.push('Prüfe Schulferien für familienfreundliche Urlaubszeiten');
  }

  return {
    bridgeDayOpportunities,
    schoolHolidayOverlaps: {
      total: schoolOverlap.overlappingDays,
      percentage: schoolOverlap.percentage,
      recommendations: []
    },
    efficiency: {
      score: efficiencyScore,
      recommendations
    }
  };
} 