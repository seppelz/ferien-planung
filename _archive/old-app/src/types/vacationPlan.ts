import { GermanState } from './GermanState';

export interface VacationPlan {
  id: string;
  personId: 1 | 2;
  start: string;
  end: string;
  isVisible: boolean;
  state: GermanState;
  efficiency?: {
    requiredDays: number;
    gainedDays: number;
    score: number;  // Gewonnene Tage / Urlaubstage
    bridgeDayBenefit?: {
      dates: string[];
      description: string;
    };
    schoolHolidayOverlap?: {
      days: number;
      percentage: number;
    };
  };
}

export interface BridgeDayRecommendation {
  dates: string[];
  requiredVacationDays: number;
  gainedFreeDays: number;
  efficiency: number;
  description: string;
  isOptimal: boolean;  // Beste Option für diesen Zeitraum
}