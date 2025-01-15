import { GermanState } from './GermanState';

export type HolidayType = 'public' | 'school' | 'vacation';

export interface HolidayDetails {
  description?: string;
  traditions?: string[];
  culturalSignificance?: string;
  locations?: string[];
  familyActivities?: string[];
}

export interface BaseHoliday {
  name: string;
  type: HolidayType;
  details?: HolidayDetails;
  isRegional?: boolean;
  nationwide?: boolean;
  state?: GermanState;
}

export interface SingleDayHoliday extends BaseHoliday {
  date: string | Date;
  endDate?: string | Date;
}

export interface MultiDayHoliday extends BaseHoliday {
  start: string | Date;
  end: string | Date;
  date?: string | Date; // For compatibility with single day holiday interface
}

export type Holiday = SingleDayHoliday | MultiDayHoliday;

// Raw data interfaces (for API/storage)
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
  type: 'school';
  details?: HolidayDetails;
}

export interface RawPublicHoliday {
  date: string;
  name: string;
  type: 'public';
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
        type: 'public';
      }>;
    };
  };
  schoolHolidays: {
    [year: string]: {
      [state in GermanState]?: Array<{
        name: string;
        start: string;
        end: string;
        type: 'school';
        details?: HolidayDetails;
      }>;
    };
  };
}

export interface SeasonalTradition {
  name?: string;
  description: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  dates?: {
    start: string;
    end: string;
  };
  locations?: string[];
  activities?: string[];
  culturalSignificance?: string;
} 