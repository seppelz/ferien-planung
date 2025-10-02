import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die Bremer Neujahrsfeiern verbinden maritimes Flair an der Schlachte mit traditionellem Neujahrsschwimmen in der Weser.",
    traditions: ["Feuerwerk an der Weser", "Neujahrsschwimmen", "Neujahrsempfänge"],
    locations: ["Bremer Rathaus", "Schlachte", "Vegesack"]
  },
  "Karfreitag": {
    description: "Der Bremer Karfreitag ist geprägt von protestantischen Passionskonzerten in den historischen Kirchen der Hansestadt.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Fastenbräuche"],
    locations: ["Bremer Dom", "St. Petri Dom", "Unser Lieben Frauen"]
  },
  "Ostermontag": {
    description: "Die Bremer Ostertraditionen vereinen hanseatisches Brauchtum mit niederdeutschen Osterfeuern im Blockland.",
    traditions: ["Osterfeuer", "Ostereiersuche", "Ostermärkte"],
    locations: ["Bürgerpark", "Wallanlagen", "Blockland"]
  },
  "Tag der Arbeit": {
    description: "Der Bremer Maifeiertag steht im Zeichen der Hafenarbeiter-Tradition mit Festen entlang der Weser.",
    traditions: ["Maikundgebungen", "Hafenfeste", "Gewerkschaftsveranstaltungen"],
    locations: ["Marktplatz", "Überseestadt", "Gröpelingen"]
  },
  "Christi Himmelfahrt": {
    description: "Die Bremer Himmelfahrtstraditionen locken zu Bollerwagen-Touren durch den Bürgerpark und entlang der Weser.",
    traditions: ["Vatertagstouren", "Bollerwagen-Touren", "Familienausflüge"],
    locations: ["Bürgerpark", "Werdersee", "Stadtwaldsee"]
  },
  "Pfingstmontag": {
    description: "Der Bremer Pfingstmontag begeistert mit maritimen Festen und traditionellen Schiffsparaden auf der Weser.",
    traditions: ["Hafenfeste", "Pfingstkonzerte", "Schiffsparaden"],
    locations: ["Schlachte", "Vegesack", "Überseestadt"]
  },
  "Tag der Deutschen Einheit": {
    description: "Die Hansestadt Bremen feiert die Deutsche Einheit mit einer Mischung aus maritimer Tradition und modernen Bürgerfesten.",
    traditions: ["Bürgerfeste", "Hafenkonzerte", "Kulturveranstaltungen"],
    culturalSignificance: "Symbol für die Verbindung von Tradition und Moderne",
    locations: ["Marktplatz", "Schlachte", "Überseestadt"]
  },
  "Reformationstag": {
    description: "Als protestantische Hansestadt begeht Bremen den Reformationstag mit besonderen Gottesdiensten und historischen Stadtführungen.",
    traditions: ["Reformationsgottesdienste", "Kirchenkonzerte", "Historische Führungen"],
    culturalSignificance: "Erinnerung an die protestantische Tradition der Hansestadt",
    locations: ["Bremer Dom", "St. Martini", "Unser Lieben Frauen"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Bremen vereint hanseatische Festlichkeit mit norddeutschen Weihnachtstraditionen.",
    traditions: ["Weihnachtsgottesdienste", "Festessen", "Konzerte"],
    locations: ["Bremer Dom", "Schnoor", "Böttcherstraße"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag lädt Bremen zu winterlichen Spaziergängen durch historische Gassen und verschneite Parks.",
    traditions: ["Weihnachtskonzerte", "Verwandtenbesuche", "Winterwanderungen"],
    locations: ["Bürgerpark", "Blockland", "Werdersee"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Osterwiese, Bremer Freimarkt Frühlingsflohmarkt, Maritime Woche an der Schlachte"
  },
  {
    season: "summer",
    description: "Breminale, Musikfest Bremen, Maritime Woche, Vegesacker Hafenfest"
  },
  {
    season: "autumn",
    description: "Bremer Freimarkt, Maritimer Markt, Ischa Freimaak"
  },
  {
    season: "winter",
    description: "Bremer Weihnachtsmarkt, Schlachte-Zauber, Winterlights im Bürgerpark"
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Historische Altstadt",
    description: "UNESCO-Weltkulturerbe mit mittelalterlichem Charme und hanseatischer Geschichte",
    attractions: [
      "Bremer Rathaus und Roland",
      "Schnoorviertel",
      "Böttcherstraße",
      "Bremer Stadtmusikanten"
    ],
    activities: [
      "Historische Stadtführungen",
      "Märchentouren",
      "Shopping in der Sögestraße",
      "Museumsbesuche"
    ]
  },
  {
    name: "Maritime Überseestadt",
    description: "Modernes Hafenviertel mit historischem Charme und Wasserlage",
    attractions: [
      "Hafenwelten",
      "Europahafen",
      "Speicher XI",
      "Waterfront"
    ],
    activities: [
      "Hafenrundfahrten",
      "Industriekultur erkunden",
      "Gastronomie am Wasser",
      "Kulturveranstaltungen"
    ]
  },
  {
    name: "Bremerhaven",
    description: "Seestadt mit Wissenschafts- und Erlebniszentren",
    attractions: [
      "Klimahaus 8° Ost",
      "Deutsches Auswandererhaus",
      "Zoo am Meer",
      "Deutsches Schifffahrtsmuseum"
    ],
    activities: [
      "Wissenschaftliche Experimente",
      "Maritime Geschichte erleben",
      "Tierbeobachtungen",
      "Hafenbesichtigungen"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const HBHolidays = holidays.publicHolidays[yearStr]?.["HB"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Bremen ein gesetzlicher Feiertag.`
      }
    })),
    ...HBHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Bremen ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const HBSchoolHolidays = holidays.schoolHolidays[yearStr]?.["HB"] || [];
  
  return HBSchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Bremen`,
      familyActivities: []
    }
  }));
}

export const bremen: StateInfo = {
  fullName: "Bremen",
  shortName: "HB",
  capital: "Bremen",
  description: "Bremen ist ein Stadtstaat mit langer hanseatischer Tradition. Die Freie Hansestadt Bremen besteht aus den Städten Bremen und Bremerhaven und ist geprägt von maritimer Geschichte und moderner Hafenwirtschaft.",
  culturalHighlights: [
    "UNESCO-Welterbe Bremer Rathaus und Roland",
    "Bremer Stadtmusikanten",
    "Historische Böttcherstraße",
    "Überseestadt",
    "Deutsches Schifffahrtsmuseum"
  ],
  keyFacts: {
    population: "680.000",
    area: "419 km²",
    founded: "787",
    economicStrength: [
      "Hafen und Logistik",
      "Luft- und Raumfahrt",
      "Maritime Wirtschaft",
      "Wissenschaft",
      "Lebensmittelindustrie"
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
  uniqueHolidayInfo: "Bremen verbindet bei seinen Feiertagen hanseatische Tradition mit norddeutscher Lebensart und maritimem Flair.",
  traditionInfo: "Die Feiertage in Bremen sind geprägt von der protestantischen Tradition und der engen Verbindung zur Seefahrt und zum Handel.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Maritime Traditionen",
      icon: "anchor",
      items: [
        {
          title: "Hafenkultur",
          description: "Historische Häfen und moderne Maritime Meile",
          icon: "ship"
        },
        {
          title: "Schlachte-Promenade",
          description: "Historisches Weserufer mit maritimem Flair",
          icon: "water"
        }
      ]
    },
    {
      title: "Hanseatisches Erbe",
      icon: "landmark",
      items: [
        {
          title: "Bremer Stadtmusikanten",
          description: "Wahrzeichen und Märchenfiguren der Stadt",
          icon: "music"
        },
        {
          title: "UNESCO-Welterbe",
          description: "Rathaus und Roland als Symbol bürgerlicher Freiheit",
          icon: "monument"
        }
      ]
    }
  ]
}; 