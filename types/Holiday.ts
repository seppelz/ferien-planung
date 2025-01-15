import { GermanState } from './GermanState';

export type HolidayType = 'public' | 'regional' | 'bridge' | 'school';

export interface HolidayDetails {
  description: string;
  traditions?: string[];
  culturalSignificance?: string;
  locations?: string[];
  familyActivities?: string[];
}

export interface BaseHoliday {
  name: string;
  type: 'public' | 'school' | 'optional' | 'bridge';
  details?: HolidayDetails;
  isRegional?: boolean;
  nationwide?: boolean;
  state?: GermanState;
}

export interface SingleDayHoliday extends BaseHoliday {
  date: string;
  start?: never;
  end?: never;
}

export interface MultiDayHoliday extends BaseHoliday {
  start: string;
  end: string;
  date?: never;
}

export interface BridgeDay extends BaseHoliday {
  type: 'bridge';
  start: string;
  end: string;
  date: string;
  days: number;
  holidays: Holiday[];
  efficiency: number;
  description?: string;
  pattern?: string;
  periodStart: string;
  periodEnd: string;
  requiredVacationDays: number;
  totalDaysOff: number;
  state?: GermanState;
}

export type Holiday = SingleDayHoliday | MultiDayHoliday | BridgeDay;

export interface VacationPlan {
  id: string;
  start: string;
  end: string;
  days: number;
  type: 'vacation' | 'bridge';
  efficiency?: number;
  bridgeDayCount?: number;
  holidayCount?: number;
  weekendCount?: number;
  totalDays?: number;
  description?: string;
}

export interface StateVacationInfo {
  state: GermanState;
  availableVacationDays: number;
  vacationPlans: VacationPlan[];
}

export interface VacationPeriod {
  startDate: string;
  endDate: string;
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  requiredVacationDays: number;
  totalDaysOff: number;
  efficiency: number;
}

export interface SeasonalTradition {
  season: string;
  description: string;
}

// Raw data interfaces
export interface RawHolidayDate {
  start: string;
  end?: string;
}

export interface RawSchoolHoliday extends RawHolidayDate {
  name: string;
}

export interface RawPublicHoliday extends RawHolidayDate {
  name: string;
  nationwide?: boolean;
}

export interface HolidayData {
  schoolHolidays: Record<number, Record<GermanState, RawSchoolHoliday[]>>;
  publicHolidays: Record<number, Record<GermanState | 'ALL', RawPublicHoliday[]>>;
} 