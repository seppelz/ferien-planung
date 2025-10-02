import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit einer Mischung aus französischen und deutschen Traditionen begrüßt.",
    traditions: ["Deutsch-französische Neujahrsfeste", "Feuerwerk an der Saar", "Neujahrskonzerte"],
    locations: ["Saarbrücken", "Saarlouis", "Merzig"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden deutsch-französische Bräuche mit Bergbautraditionen.",
    traditions: ["Kreuzwege", "Passionskonzerte", "Bergmannsandachten"],
    locations: ["St. Johann Basilika", "Ludwigskirche", "Völklinger Hütte"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von französisch inspirierten Ostermärkten bis zu Bergmannsfesten.",
    traditions: ["Ostermärkte", "Osterfeuer", "Bergmannsfeste"],
    locations: ["Saarbrücken", "Neunkirchen", "St. Wendel"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird besonders im ehemaligen Bergbaurevier mit Bezug zur Industriegeschichte gefeiert.",
    traditions: ["Maikundgebungen", "Bergmannsfeste", "Deutsch-französische Feste"],
    locations: ["Völklingen", "Saarlouis", "Dillingen"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch die deutsch-französische Grenzregion gefeiert.",
    traditions: ["Grenzwanderungen", "Vatertagstouren", "Familienausflüge"],
    locations: ["Bliesgau", "Saargau", "Hunsrück"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von französisch geprägten Festen bis zu saarländischen Bergmannsfeiern.",
    traditions: ["Pfingstmärkte", "Bergmannsfeste", "Grenzfeste"],
    locations: ["Saarbrücken", "Homburg", "St. Ingbert"]
  },
  "Fronleichnam": {
    description: "Das Fronleichnamsfest wird mit deutsch-französischer Prägung und prächtigen Prozessionen gefeiert.",
    traditions: ["Prozessionen", "Blumenteppiche", "Kirchenfeste"],
    culturalSignificance: "Wichtiger katholischer Feiertag mit grenzüberschreitender Bedeutung",
    locations: ["Saarbrücken", "Merzig", "Saarlouis"]
  },
  "Mariä Himmelfahrt": {
    description: "Mariä Himmelfahrt wird als wichtiger katholischer Feiertag mit französischem Einfluss begangen.",
    traditions: ["Prozessionen", "Kräuterweihe", "Marienfeste"],
    culturalSignificance: "Bedeutender katholischer Feiertag mit regionaler Tradition",
    locations: ["Saarbrücken", "Merzig", "Saarlouis"]
  },
  "Tag der Deutschen Einheit": {
    description: "Das Saarland feiert die Deutsche Einheit mit Fokus auf deutsch-französische Freundschaft.",
    traditions: ["Bürgerfeste", "Grenzfeste", "Konzerte"],
    culturalSignificance: "Symbol für europäische Integration",
    locations: ["Saarbrücken", "Saarlouis", "Völklingen"]
  },
  "Allerheiligen": {
    description: "Allerheiligen wird mit deutsch-französischen Traditionen als wichtiger Gedenktag begangen.",
    traditions: ["Gräberbesuche", "Gedenkgottesdienste", "Lichtermeere"],
    culturalSignificance: "Bedeutender katholischer Feiertag",
    locations: ["Saarbrücken", "Dillingen", "Merzig"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet deutsche und französische Weihnachtstraditionen.",
    traditions: ["Weihnachtsgottesdienste", "Festessen", "Konzerte"],
    locations: ["Saarbrücken", "St. Wendel", "Homburg"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken deutsch-französische Traditionen und winterliche Aktivitäten.",
    traditions: ["Weihnachtskonzerte", "Winterwanderungen", "Familienbesuche"],
    locations: ["Bliesgau", "Saargau", "Saarbrücken"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Deutsch-französische Frühlingsfeste, erste Bergmannsfeste und Wanderungen im Bliesgau."
  },
  {
    season: "summer",
    description: "Industriekultur-Events, deutsch-französische Stadtfeste und Saar-Spektakel prägen den Sommer."
  },
  {
    season: "autumn",
    description: "Erntedankfeste mit französischem Einfluss, Bergmannsfeste und kulinarische Wochen."
  },
  {
    season: "winter",
    description: "Französisch inspirierte Weihnachtsmärkte, Bergmannsweihnacht und winterliche Industriekultur."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "UNESCO-Weltkulturerbe Völklinger Hütte",
    description: "Industriekultur von Weltrang und lebendige Geschichte",
    attractions: [
      "Völklinger Hütte",
      "Science Center Ferrodrom",
      "Industriekulturpfad",
      "Ausstellungen"
    ],
    activities: [
      "Industriekultur erleben",
      "Führungen",
      "Kulturveranstaltungen",
      "Fototouren"
    ]
  },
  {
    name: "UNESCO-Biosphärenreservat Bliesgau",
    description: "Einzigartige Naturlandschaft mit deutsch-französischem Charakter",
    attractions: [
      "Orchideenwiesen",
      "Streuobstwiesen",
      "Historische Städte",
      "Kulturlandschaft"
    ],
    activities: [
      "Naturwanderungen",
      "Radtouren",
      "Kulturerbe erkunden",
      "Kulinarische Entdeckungen"
    ]
  },
  {
    name: "Saarschleife & Saartal",
    description: "Naturwunder und deutsch-französische Kulturregion",
    attractions: [
      "Saarschleife",
      "Baumwipfelpfad",
      "Burgruinen",
      "Weinberge"
    ],
    activities: [
      "Schifffahrten",
      "Wandern",
      "Weinproben",
      "Aussichtsplattformen"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const SLHolidays = holidays.publicHolidays[yearStr]?.["SL"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Saarland ein gesetzlicher Feiertag.`
      }
    })),
    ...SLHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Saarland ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const SLSchoolHolidays = holidays.schoolHolidays[yearStr]?.["SL"] || [];
  
  return SLSchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Saarland`,
      familyActivities: []
    }
  }));
}

export const saarland: StateInfo = {
  fullName: "Saarland",
  shortName: "SL",
  capital: "Saarbrücken",
  description: "Das Saarland vereint deutsch-französische Lebensart mit industriellem Weltkulturerbe und reizvoller Natur. Von der UNESCO-Welterbestätte Völklinger Hütte über das Biosphärenreservat Bliesgau bis zur eindrucksvollen Saarschleife bietet das Land eine einzigartige Mischung aus Kultur und Natur.",
  culturalHighlights: [
    "UNESCO-Weltkulturerbe Völklinger Hütte",
    "UNESCO-Biosphärenreservat Bliesgau",
    "Deutsch-französische Kultur",
    "Industriekultur",
    "Saarschleife",
    "Kulinarische Tradition"
  ],
  keyFacts: {
    population: "0,98 Millionen (2021)",
    area: "2.570 km²",
    founded: "1957",
    economicStrength: [
      "Automobilindustrie",
      "IT-Technologie",
      "Tourismus",
      "Kulturwirtschaft"
    ]
  },
  publicHolidays: {
    2024: getHolidaysForYear(2024),
    2025: getHolidaysForYear(2025),
    2026: getHolidaysForYear(2026)
  },
  schoolHolidays: {
    2024: getSchoolHolidaysForYear(2024),
    2025: getSchoolHolidaysForYear(2025),
    2026: getSchoolHolidaysForYear(2026)
  },
  uniqueHolidayInfo: "Das Saarland verbindet deutsch-französische Festkultur mit Industrietraditionen. Die Vielfalt der Regionen und die Nähe zu Frankreich spiegeln sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen des Saarlandes sind geprägt von deutsch-französischer Lebensart, Industriegeschichte und katholischen Bräuchen. Bergmannsfeste, französisch inspirierte Feiern und regionale Traditionen prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturmix",
      icon: "globe-europe",
      items: [
        {
          title: "Deutsch-französisch",
          description: "Einzigartige Mischung der Kulturen",
          icon: "flag"
        },
        {
          title: "Industriekultur",
          description: "Lebendiges Weltkulturerbe",
          icon: "industry"
        }
      ]
    },
    {
      title: "Naturerlebnis",
      icon: "leaf",
      items: [
        {
          title: "Bliesgau",
          description: "UNESCO-Biosphärenreservat",
          icon: "tree"
        },
        {
          title: "Saarschleife",
          description: "Einzigartiges Naturwunder",
          icon: "water"
        }
      ]
    }
  ]
}; 