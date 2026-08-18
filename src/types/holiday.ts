import { GermanState } from './GermanState';

export type HolidayType = 'public' | 'school' | 'vacation' | 'bridge';

export interface HolidayDetails {
  description?: string;
  traditions?: string[];
  culturalSignificance?: string;
  locations?: string[];
  familyActivities?: string[];
}

export interface Holiday {
  name: string;
  type: HolidayType;
  /** ISO date (YYYY-MM-DD) for single-day holidays */
  date?: string;
  /** ISO start date for multi-day holidays */
  start?: string;
  /** ISO end date for multi-day holidays */
  end?: string;
  /** Alias used by some UI components for the end of a range */
  endDate?: string;
  details?: HolidayDetails;
  isRegional?: boolean;
  nationwide?: boolean;
  state?: GermanState;
}

export type SingleDayHoliday = Holiday & { date: string; type: 'public' | 'vacation' | 'bridge' };
export type MultiDayHoliday = Holiday & { start: string; end: string; type: 'school' };

export interface BridgeDay extends Holiday {
  type: 'bridge';
  date: string;
  start: string;
  end: string;
  days: number;
  holidays: Holiday[];
  efficiency: number;
  requiredVacationDays: number;
  totalDaysOff: number;
  periodStart: string;
  periodEnd: string;
}

export interface RawHolidayDate {
  date: string;
  name: string;
  type: HolidayType;
  details?: HolidayDetails;
  nationwide?: boolean;
}

export interface RawSchoolHoliday {
  start: string;
  end: string;
  name: string;
  type?: 'school';
  details?: HolidayDetails;
}

export interface RawPublicHoliday {
  date?: string;
  start?: string;
  name: string;
  type?: 'public';
  details?: HolidayDetails;
  nationwide?: boolean;
  end?: string;
}

export interface HolidayData {
  publicHolidays: {
    [year: string]: {
      [state in GermanState]?: Array<{
        name: string;
        start: string;
        end?: string;
        type?: 'public';
        nationwide?: boolean;
      }>;
    };
  };
  schoolHolidays: {
    [year: string]: {
      [state in GermanState]?: Array<{
        name: string;
        start: string;
        end: string;
        type?: 'school';
        details?: HolidayDetails;
      }>;
    };
  };
}

export interface SeasonalTradition {
  name?: string;
  description: string;
  season: string;
  dates?: {
    start: string;
    end: string;
  };
  locations?: string[];
  activities?: string[];
  culturalSignificance?: string;
}
