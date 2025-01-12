import { GermanState } from './GermanState';

export interface HolidayDetails {
  description: string;
  traditions?: string[];
  locations?: string[];
  culturalSignificance?: string;
  familyActivities?: string[];
}

export interface BaseHoliday {
  name: string;
  start: string;
  end?: string;
  type: 'public' | 'school' | 'bridge';
  isRegional?: boolean;
  details?: HolidayDetails;
}

export interface SingleDayHoliday extends BaseHoliday {
  nationwide?: boolean;
}

export interface MultiDayHoliday extends BaseHoliday {
  state: string;
}

export type Holiday = SingleDayHoliday | MultiDayHoliday;

export interface VacationPlan {
  start: Date;
  end: Date;
  id: string;
  state: GermanState;
  isVisible?: boolean;
}

export interface StateVacationInfo {
  state: GermanState;
  availableVacationDays: number;
  vacationPlans: VacationPlan[];
}

export interface BridgeDay extends SingleDayHoliday {
  type: 'bridge';
  connectedHolidays: Holiday[];
  requiredVacationDays: number;
  totalDaysOff: number;
  efficiency: number;
  pattern: string;
  periodStart: Date;
  periodEnd: Date;
}

export interface VacationPeriod {
  startDate: Date;
  endDate: Date;
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  requiredVacationDays: number;
  totalDaysOff: number;
  efficiency: number;
}

// Raw data interfaces for the holidays.json/ts file
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

export interface SeasonalTradition {
  season: 'Frühling' | 'Sommer' | 'Herbst' | 'Winter';
  description: string;
  events?: string[];
}