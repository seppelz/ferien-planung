import { addDays, eachDayOfInterval, format, isWeekend, isSameDay, differenceInDays, subDays, startOfDay } from 'date-fns';
import { Holiday, BridgeDay } from '../types/holiday';

export interface VacationRecommendation {
  startDate: Date;
  endDate: Date;
  periodStart: Date;
  periodEnd: Date;
  requiredDays: number;
  gainedDays: number;
  efficiency: number;
  efficiencyDisplay: string;
  type: 'bridge' | 'extended';
  publicHolidays: Holiday[];
  weekendDays: Date[];
  displayRange: string;
  vacationDays: Date[];
}

const formatEfficiency = (requiredDays: number, gainedDays: number): string => {
  if (requiredDays === 0) return '0d = 0d';
  return `${requiredDays}d = ${gainedDays}d`;
};

const formatDateRange = (start: Date, end: Date): string => {
  if (isSameDay(start, end)) {
    return format(start, 'dd.MM.yy');
  }
  return `${format(start, 'dd.MM.')} - ${format(end, 'dd.MM.yy')}`;
};

const isPublicHoliday = (date: Date, holidays: Holiday[]): boolean => {
  if (isWeekend(date)) return false;
  return holidays.some(h => h.type === 'public' && isSameDay(new Date(h.start), date));
};

// Calculate workdays needed between two dates
const calculateWorkdays = (startDate: Date, endDate: Date, holidays: Holiday[]): number => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  return days.filter(day => {
    if (isWeekend(day)) return false;
    if (isPublicHoliday(day, holidays)) return false;
    return true;
  }).length;
};

// Find all free days in a period (weekends and public holidays)
const findFreeDays = (start: Date, end: Date, holidays: Holiday[]): {
  weekendDays: Date[];
  publicHolidays: Holiday[];
} => {
  const days = eachDayOfInterval({ start, end });
  return {
    weekendDays: days.filter(d => isWeekend(d)),
    publicHolidays: holidays.filter(h => 
      h.type === 'public' && 
      days.some(d => isSameDay(d, new Date(h.start))) &&
      !isWeekend(new Date(h.start))
    )
  };
};

const analyzeBridgeDayOpportunity = (
  start: Date,
  end: Date,
  holidays: Holiday[]
): VacationRecommendation | null => {
  // Calculate required workdays
  const requiredDays = calculateWorkdays(start, end, holidays);
  if (requiredDays === 0) return null;

  // Get free days in the period
  const { weekendDays, publicHolidays } = findFreeDays(start, end, holidays);
  
  // Calculate total days in period
  const totalDays = differenceInDays(end, start) + 1;
  
  // Total gained days is the period length
  const gainedDays = totalDays;
  
  // Calculate efficiency based on actual benefit
  const efficiency = gainedDays / requiredDays;

  // Only return if we gain more days than we take off
  if (efficiency <= 1) return null;
  
  // Only return if there's at least one public holiday on a workday
  if (publicHolidays.length === 0) return null;

  // Find the actual vacation days (workdays)
  const vacationDays = eachDayOfInterval({ start, end })
    .filter(d => !isWeekend(d) && !isPublicHoliday(d, holidays));

  // Find the display period (including surrounding weekends)
  let displayStart = start;
  let displayEnd = end;
  
  // Check if start date itself is a free day
  if (isWeekend(start) || isPublicHoliday(start, holidays)) {
    displayStart = start;
  } else {
    // Look backwards for connected free days
    let currentDay = subDays(start, 1);
    while (isWeekend(currentDay) || isPublicHoliday(currentDay, holidays)) {
      displayStart = currentDay;
      currentDay = subDays(currentDay, 1);
    }
  }
  
  // Check if end date itself is a free day
  if (isWeekend(end) || isPublicHoliday(end, holidays)) {
    displayEnd = end;
  } else {
    // Look forwards for connected free days
    let currentDay = addDays(end, 1);
    while (isWeekend(currentDay) || isPublicHoliday(currentDay, holidays)) {
      displayEnd = currentDay;
      currentDay = addDays(currentDay, 1);
    }
  }

  // Ensure all dates are at the start of their respective days
  const startOfDisplayStart = startOfDay(displayStart);
  const startOfDisplayEnd = startOfDay(displayEnd);
  const startOfStart = startOfDay(start);
  const startOfEnd = startOfDay(end);

  return {
    startDate: startOfStart,
    endDate: startOfEnd,
    periodStart: startOfDisplayStart,
    periodEnd: startOfDisplayEnd,
    requiredDays,
    gainedDays,
    efficiency,
    efficiencyDisplay: formatEfficiency(requiredDays, gainedDays),
    type: requiredDays === 1 ? 'bridge' : 'extended',
    publicHolidays,
    weekendDays,
    displayRange: formatDateRange(startOfDisplayStart, startOfDisplayEnd),
    vacationDays: vacationDays.map(d => startOfDay(d))
  };
};

export function analyzeVacationOpportunities(
  holidays: Holiday[]
): VacationRecommendation[] {
  const recommendations: VacationRecommendation[] = [];
  
  // Get bridge days from holidays
  const bridgeDays = holidays.filter(h => h.type === 'bridge') as BridgeDay[];
  
  // Group bridge days that are close to each other (within 3 days)
  const groupedBridgeDays: BridgeDay[][] = [];
  let currentGroup: BridgeDay[] = [];
  
  const sortedBridgeDays = [...bridgeDays].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  for (const bridgeDay of sortedBridgeDays) {
    if (currentGroup.length === 0) {
      currentGroup.push(bridgeDay);
    } else {
      const lastDay = currentGroup[currentGroup.length - 1];
      const daysBetween = differenceInDays(new Date(bridgeDay.start), new Date(lastDay.start));
      
      if (daysBetween <= 3) {
        currentGroup.push(bridgeDay);
      } else {
        groupedBridgeDays.push([...currentGroup]);
        currentGroup = [bridgeDay];
      }
    }
  }
  if (currentGroup.length > 0) {
    groupedBridgeDays.push(currentGroup);
  }

  // Analyze each group of bridge days
  for (const group of groupedBridgeDays) {
    // For each group, try different combinations of start and end dates
    const firstDay = group[0];
    const lastDay = group[group.length - 1];
    
    // Look at a window around the group
    const windowStart = addDays(new Date(firstDay.start), -3);
    const windowEnd = addDays(new Date(lastDay.start), 3);
    
    // Try different period lengths
    for (let start = windowStart; start <= new Date(firstDay.start); start = addDays(start, 1)) {
      for (let end = new Date(lastDay.start); end <= windowEnd; end = addDays(end, 1)) {
        const rec = analyzeBridgeDayOpportunity(start, end, holidays);
        if (rec) recommendations.push(rec);
      }
    }
  }
  
  // Find holiday periods for extended opportunities
  const publicHolidays = holidays.filter(h => h.type === 'public');
  
  // Group holidays that are close to each other
  const groupedHolidays: Holiday[][] = [];
  let currentHolidayGroup: Holiday[] = [];
  
  const sortedHolidays = [...publicHolidays].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  for (const holiday of sortedHolidays) {
    if (currentHolidayGroup.length === 0) {
      currentHolidayGroup.push(holiday);
    } else {
      const lastHoliday = currentHolidayGroup[currentHolidayGroup.length - 1];
      const daysBetween = differenceInDays(new Date(holiday.start), new Date(lastHoliday.start));
      
      if (daysBetween <= 5) {
        currentHolidayGroup.push(holiday);
      } else {
        groupedHolidays.push([...currentHolidayGroup]);
        currentHolidayGroup = [holiday];
      }
    }
  }
  if (currentHolidayGroup.length > 0) {
    groupedHolidays.push(currentHolidayGroup);
  }

  // Analyze each group of holidays
  for (const group of groupedHolidays) {
    const firstHoliday = group[0];
    const lastHoliday = group[group.length - 1];
    
    // Look at a window around the group
    const windowStart = addDays(new Date(firstHoliday.start), -5);
    const windowEnd = addDays(new Date(lastHoliday.start), 5);
    
    // Try different period lengths
    for (let start = windowStart; start <= new Date(firstHoliday.start); start = addDays(start, 1)) {
      for (let end = new Date(lastHoliday.start); end <= windowEnd; end = addDays(end, 1)) {
        const rec = analyzeBridgeDayOpportunity(start, end, holidays);
        if (rec) recommendations.push(rec);
      }
    }
  }

  return recommendations;
}