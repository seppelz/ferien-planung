export interface Holiday {
  name: string;
  start: string;
  end?: string;
  type: 'public' | 'school';
  isRegional?: boolean;
  details?: {
    description?: string;
    traditions?: string[];
    locations?: string[];
    familyActivities?: string[];
  };
}

export interface KeyFacts {
  population: string;
  area: string;
  founded: string;
  economicStrength: string[];
}

export interface VacationDestination {
  name: string;
  type: string;
  description: string;
  season: string;
  attractions: string[];
  activities: string[];
  imageId: string;
}

export interface RegionalSpecialtyItem {
  title: string;
  description: string;
  icon: string;
}

export interface RegionalSpecialty {
  name: string;
  type: string;
  description: string;
  icon: string;
}

export interface SeasonalTradition {
  season: string;
  description: string;
}

export interface RegionalCategory {
  name: string;
  description: string;
  items?: string[];
}

export interface StateInfo {
  id: string;
  name: string;
  shortName: string;
  capital: string;
  population: number;
  area: number;
  description: string;
  highlights: string[];
  traditions: {
    season: 'Frühling' | 'Sommer' | 'Herbst' | 'Winter';
    description: string;
    events?: string[];
  }[];
  traditionInfo?: string;
  specialties: RegionalCategory[];
}

export type StatePageHoliday = Holiday; 