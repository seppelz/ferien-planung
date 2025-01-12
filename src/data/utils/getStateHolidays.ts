import { Holiday, SingleDayHoliday } from '../../types/Holiday';
import { commonHolidays } from '../commonHolidays';

type StateCode = 'BW' | 'BY' | 'BE' | 'BB' | 'HB' | 'HH' | 'HE' | 'MV' | 'NI' | 'NW' | 'RP' | 'SL' | 'SN' | 'ST' | 'SH' | 'TH';

export const getStateHolidays = (stateCode: StateCode, year: number): Holiday[] => {
  // Get common holidays for the year
  const holidays = commonHolidays[year] || [];

  // Add state-specific holidays
  switch (stateCode) {
    case 'BW':
      holidays.push({
        name: 'Heilige Drei Könige',
        date: `${year}-01-06`,
        type: 'public',
        details: {
          description: 'Heilige Drei Könige ist in Baden-Württemberg ein gesetzlicher Feiertag.'
        }
      } satisfies SingleDayHoliday);
      holidays.push({
        name: 'Fronleichnam',
        date: `${year}-06-08`, // This is approximate, needs to be calculated based on Easter
        type: 'public',
        details: {
          description: 'Fronleichnam ist in Baden-Württemberg ein gesetzlicher Feiertag.'
        }
      } satisfies SingleDayHoliday);
      holidays.push({
        name: 'Allerheiligen',
        date: `${year}-11-01`,
        type: 'public',
        details: {
          description: 'Allerheiligen ist in Baden-Württemberg ein gesetzlicher Feiertag.'
        }
      } satisfies SingleDayHoliday);
      break;
    // Add cases for other states
  }

  return holidays;
}; 