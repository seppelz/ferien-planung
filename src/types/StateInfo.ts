import { Holiday, SeasonalTradition } from '@/types';

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
  population: string;
  area: string;
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