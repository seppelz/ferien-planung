import { Holiday, SeasonalTradition } from './holiday';

export interface StateInfo {
  name: string;
  shortName: string;
  capital: string;
  population: number;
  area: number;
  gdp: number;
  universities: number;
  touristAttractions: string[];
  famousFor: string[];
  culturalEvents: string[];
  regionalSpecialties: string[];
  seasonalTraditions: SeasonalTradition[];
  holidays: Holiday[];
  schoolHolidays: Holiday[];
  keyFacts: {
    population: string;
    area: string;
    density: string;
    gdp: string;
    gdpPerCapita: string;
    industries: string[];
    universities: string;
    students: string;
  };
}