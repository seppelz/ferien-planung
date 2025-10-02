import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit thüringischen Traditionen und kulturellem Erbe begrüßt.",
    traditions: ["Feuerwerk über der Wartburg", "Neujahrskonzerte", "Traditionelle Umzüge"],
    locations: ["Erfurt", "Weimar", "Eisenach"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden Bachs Erbe mit regionaler Frömmigkeit.",
    traditions: ["Bach-Passionen", "Prozessionen", "Andachten"],
    locations: ["Eisenach", "Erfurter Dom", "Weimarer Stadtkirche"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von mittelalterlichen Bräuchen bis zu Thüringer Spezialitäten.",
    traditions: ["Ostermärkte", "Osterfeuer", "Traditionelle Festessen"],
    locations: ["Erfurt", "Thüringer Wald", "Kyffhäuser"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird mit traditionellen Festen und Handwerkskunst gefeiert.",
    traditions: ["Maifeste", "Handwerkermärkte", "Frühlingsmärkte"],
    locations: ["Erfurt", "Jena", "Gera"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch den Thüringer Wald und kulturelle Landschaften gefeiert.",
    traditions: ["Wanderungen", "Himmelfahrtsgottesdienste", "Familienausflüge"],
    locations: ["Thüringer Wald", "Hainich", "Saaletal"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von mittelalterlichen Festspielen bis zu Naturerlebnissen.",
    traditions: ["Pfingstmärkte", "Ritterspiele", "Naturführungen"],
    locations: ["Wartburg", "Erfurt", "Nationalpark Hainich"]
  },
  "Tag der Deutschen Einheit": {
    description: "Der Tag der Deutschen Einheit wird mit Fokus auf die friedliche Revolution gefeiert.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Bedeutender Ort der Friedlichen Revolution",
    locations: ["Erfurt", "Jena", "Weimar"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird als wichtiger protestantischer Feiertag mit historischer Bedeutung begangen.",
    traditions: ["Reformationsgottesdienste", "Lutherfeste", "Historische Führungen"],
    culturalSignificance: "Zentrale Bedeutung für die Reformation",
    locations: ["Eisenach", "Erfurt", "Schmalkalden"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet kulturelles Erbe mit regionalen Traditionen.",
    traditions: ["Weihnachtsgottesdienste", "Konzerte", "Krippenspiele"],
    locations: ["Erfurter Dom", "Bachkirche Arnstadt", "Wartburg"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken winterliche Aktivitäten in Kultur und Natur.",
    traditions: ["Winterwanderungen", "Familienbesuche", "Konzerte"],
    locations: ["Thüringer Wald", "Weimar", "Erfurt"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Kulturelle Frühlingsfeste, erste Wanderungen im Thüringer Wald und Bach-Festspiele."
  },
  {
    season: "summer",
    description: "Klassik-Festivals, mittelalterliche Burgfeste und Naturerlebnisse prägen den Sommer."
  },
  {
    season: "autumn",
    description: "Kulturherbst mit Festivals, Wanderungen im bunten Thüringer Wald und regionale Feste."
  },
  {
    season: "winter",
    description: "Historische Weihnachtsmärkte, Wintersport im Thüringer Wald und kulturelle Veranstaltungen."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Kulturstädte",
    description: "UNESCO-Welterbestätten und historische Zentren",
    attractions: [
      "Klassisches Weimar",
      "Wartburg Eisenach",
      "Erfurter Altstadt",
      "Bachhaus Eisenach"
    ],
    activities: [
      "Stadtführungen",
      "Museumsbesuche",
      "Kulturveranstaltungen",
      "Historische Rundgänge"
    ]
  },
  {
    name: "Thüringer Wald",
    description: "Naturpark und Aktivregion",
    attractions: [
      "Rennsteig",
      "Oberhofer Sportstätten",
      "Nationalpark Hainich",
      "Inselsberg"
    ],
    activities: [
      "Wandern",
      "Wintersport",
      "Naturerkundung",
      "Mountainbiking"
    ]
  },
  {
    name: "Historische Regionen",
    description: "Burgen, Schlösser und Kulturlandschaften",
    attractions: [
      "Kyffhäuser",
      "Drei Gleichen",
      "Schwarzatal",
      "Saaletal"
    ],
    activities: [
      "Burgenbesichtigungen",
      "Wanderungen",
      "Kulturtouren",
      "Naturerlebnis"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const THHolidays = holidays.publicHolidays[yearStr]?.["TH"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Thüringen ein gesetzlicher Feiertag.`
      }
    })),
    ...THHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Thüringen ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const THSchoolHolidays = holidays.schoolHolidays[yearStr]?.["TH"] || [];
  
  return THSchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Thüringen`,
      familyActivities: []
    }
  }));
}

export const thueringen: StateInfo = {
  fullName: "Thüringen",
  shortName: "TH",
  capital: "Erfurt",
  description: "Thüringen, das grüne Herz Deutschlands, verbindet kulturelles Erbe mit einzigartiger Naturlandschaft. Von der UNESCO-Welterbestadt Weimar über die Wartburg bis zum Thüringer Wald bietet das Land eine faszinierende Mischung aus Kultur und Natur.",
  culturalHighlights: [
    "UNESCO-Welterbe Klassisches Weimar",
    "UNESCO-Welterbe Wartburg",
    "Bachstadt Eisenach",
    "Mittelalterliches Erfurt",
    "Thüringer Wald",
    "Nationalpark Hainich"
  ],
  keyFacts: {
    population: "2,1 Millionen (2021)",
    area: "16.171 km²",
    founded: "1990",
    economicStrength: [
      "Hochtechnologie",
      "Tourismus",
      "Kulturwirtschaft",
      "Optische Industrie"
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
  uniqueHolidayInfo: "Thüringen verbindet kulturelle Festtraditionen mit historischem Erbe. Die Vielfalt der Regionen vom Thüringer Wald über die Kulturstädte bis zu den historischen Landschaften spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Thüringens sind geprägt von kultureller Geschichte, mittelalterlichem Erbe und regionaler Kultur. Klassische Musik, historische Feste und lebendiges Brauchtum prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturerbe",
      icon: "landmark",
      items: [
        {
          title: "Klassik",
          description: "Weimar und das kulturelle Erbe",
          icon: "music"
        },
        {
          title: "Geschichte",
          description: "Burgen und Mittelalter",
          icon: "castle"
        }
      ]
    },
    {
      title: "Natur & Aktiv",
      icon: "leaf",
      items: [
        {
          title: "Thüringer Wald",
          description: "Wandern und Wintersport",
          icon: "hiking"
        },
        {
          title: "Nationalpark",
          description: "UNESCO-Weltnaturerbe Hainich",
          icon: "tree"
        }
      ]
    }
  ]
}; 