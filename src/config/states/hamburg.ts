import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die Hamburger Neujahrsfeiern beeindrucken mit spektakulärem Feuerwerk über Alster und Elbe sowie traditionellen Hafenrundfahrten.",
    traditions: ["Feuerwerk über der Elbe", "Hafenrundfahrten", "Neujahrsempfänge"],
    locations: ["Landungsbrücken", "Jungfernstieg", "Speicherstadt"]
  },
  "Karfreitag": {
    description: "Der Hamburger Karfreitag vereint hanseatische Würde mit beeindruckenden Passionskonzerten in den historischen Hauptkirchen.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Fastenbräuche"],
    locations: ["Michel", "Hauptkirche St. Petri", "St. Katharinen"]
  },
  "Ostermontag": {
    description: "Die Hamburger Ostertraditionen verbinden maritime Bräuche mit festlichen Osterfeuern entlang der Elbe und in den Stadtparks.",
    traditions: ["Osterfeuer an der Elbe", "Ostermärkte", "Hafenrundfahrten"],
    locations: ["Planten un Blomen", "Stadtpark", "Alsterpark"]
  },
  "Tag der Arbeit": {
    description: "Der Hamburger Maifeiertag ist eng mit dem Hafengeburtstag verknüpft und feiert die maritime Arbeiterkultur der Hansestadt.",
    traditions: ["Hafengeburtstag", "Maikundgebungen", "Stadtteilfeste"],
    locations: ["Landungsbrücken", "Fischmarkt", "Hafencity"]
  },
  "Christi Himmelfahrt": {
    description: "Die Hamburger Himmelfahrtstraditionen locken zu Ausflügen an Alster und Elbe sowie zu besonderen Hafenrundfahrten.",
    traditions: ["Vatertagstouren", "Alstervergnügen", "Hafenrundfahrten"],
    locations: ["Außenalster", "Stadtpark", "Övelgönne"]
  },
  "Pfingstmontag": {
    description: "Der Hamburger Pfingstmontag bietet maritime Feste in der HafenCity und traditionelle Veranstaltungen an der Alster.",
    traditions: ["Hafenfeste", "Alstervergnügen", "Pfingstkonzerte"],
    locations: ["Hafencity", "Blankenese", "St. Pauli"]
  },
  "Tag der Deutschen Einheit": {
    description: "Hamburg feiert die Deutsche Einheit als internationales Tor zur Welt mit einer Verbindung aus Hafentradition und Weltoffenheit.",
    traditions: ["Bürgerfeste", "Hafenkonzerte", "Kulturveranstaltungen"],
    culturalSignificance: "Symbol für Weltoffenheit und internationale Verbindungen",
    locations: ["Rathausmarkt", "Hafencity", "Speicherstadt"]
  },
  "Reformationstag": {
    description: "Als protestantische Hansestadt zelebriert Hamburg den Reformationstag mit besonderen Gottesdiensten in den historischen Hauptkirchen.",
    traditions: ["Reformationsgottesdienste", "Kirchenkonzerte", "Historische Führungen"],
    culturalSignificance: "Erinnerung an die protestantische Tradition der Hansestadt",
    locations: ["Hauptkirche St. Michaelis", "St. Petri", "St. Nikolai"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Hamburg verbindet festliche Gottesdienste im Michel mit der einzigartigen Illumination der Speicherstadt.",
    traditions: ["Weihnachtsgottesdienste", "Hafenlichter", "Festessen"],
    locations: ["Michel", "Speicherstadt", "Blankenese"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Hamburg zu winterlichen Hafenrundfahrten und stimmungsvollen Spaziergängen am Elbstrand.",
    traditions: ["Winterliche Hafenrundfahrten", "Konzerte", "Spaziergänge"],
    locations: ["Landungsbrücken", "Alster", "Elbstrand"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Kirschblütenfest in der Hafencity, Hafengeburtstag, Alstervergnügen"
  },
  {
    season: "summer",
    description: "Hamburger DOM, Altonale, Dockville Festival, Cruise Days"
  },
  {
    season: "autumn",
    description: "Hamburger Filmfest, Reeperbahn Festival, Laternenumzüge"
  },
  {
    season: "winter",
    description: "Historischer Weihnachtsmarkt, Winterdom, Alstertanne"
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "HafenCity & Speicherstadt",
    description: "Moderne Architektur trifft UNESCO-Weltkulturerbe",
    attractions: [
      "Elbphilharmonie",
      "Speicherstadt",
      "Miniatur Wunderland",
      "HafenCity Universität"
    ],
    activities: [
      "Hafenrundfahrten",
      "Speicherstadtführungen",
      "Miniatur Wunderland besuchen",
      "Maritime Architekturtouren"
    ]
  },
  {
    name: "Alster & Stadtparks",
    description: "Grüne Oasen und Wasserwege im Herzen der Stadt",
    attractions: [
      "Außenalster",
      "Planten un Blomen",
      "Stadtpark",
      "Alsterarkaden"
    ],
    activities: [
      "Alstervergnügen",
      "Bootfahren und Segeln",
      "Picknick im Stadtpark",
      "Botanische Führungen"
    ]
  },
  {
    name: "St. Pauli & Altona",
    description: "Hamburgs bunte Seite mit Kultur und Entertainment",
    attractions: [
      "Reeperbahn",
      "Fischmarkt",
      "Landungsbrücken",
      "Altonaer Balkon"
    ],
    activities: [
      "Fischmarkt am frühen Morgen",
      "Musicalbesuche",
      "Hafenrundgänge",
      "Stadtteilführungen"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const HHHolidays = holidays.publicHolidays[yearStr]?.["HH"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Hamburg ein gesetzlicher Feiertag.`
      }
    })),
    ...HHHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Hamburg ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const HHSchoolHolidays = holidays.schoolHolidays[yearStr]?.["HH"] || [];
  
  return HHSchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Hamburg`,
      familyActivities: []
    }
  }));
}

export const hamburg: StateInfo = {
  fullName: "Hamburg",
  shortName: "HH",
  capital: "Hamburg",
  description: "Hamburg ist ein Stadtstaat und die zweitgrößte Stadt Deutschlands. Als wichtigster deutscher Seehafen und traditionelle Hansestadt verbindet Hamburg maritime Geschichte mit moderner Weltoffenheit.",
  culturalHighlights: [
    "UNESCO-Welterbe Speicherstadt und Kontorhausviertel",
    "Elbphilharmonie",
    "Michel (Wahrzeichen)",
    "Hamburger Hafen",
    "Reeperbahn und St. Pauli"
  ],
  keyFacts: {
    population: "1,9 Millionen",
    area: "755 km²",
    founded: "808",
    economicStrength: [
      "Hafen und Logistik",
      "Medien und Kultur",
      "Luftfahrtindustrie",
      "Handel",
      "Tourismus"
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
  uniqueHolidayInfo: "Hamburg verbindet bei seinen Feiertagen hanseatische Tradition mit maritimem Flair und weltoffener Modernität.",
  traditionInfo: "Die Feiertage in Hamburg sind geprägt von der protestantischen Tradition und der engen Verbindung zum Hafen und zur Seefahrt.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Maritime Kultur",
      icon: "anchor",
      items: [
        {
          title: "Hamburger Hafen",
          description: "Deutschlands größter Seehafen mit jahrhundertealter Geschichte",
          icon: "ship"
        },
        {
          title: "Speicherstadt",
          description: "UNESCO-Weltkulturerbe und größter historischer Lagerhauskomplex der Welt",
          icon: "building"
        }
      ]
    },
    {
      title: "Hanseatische Tradition",
      icon: "landmark",
      items: [
        {
          title: "Historische Hauptkirchen",
          description: "Die fünf Hauptkirchen als Wahrzeichen hanseatischer Tradition",
          icon: "church"
        },
        {
          title: "Alster & Elbe",
          description: "Die prägenden Wasserwege der Hansestadt",
          icon: "water"
        }
      ]
    }
  ]
}; 