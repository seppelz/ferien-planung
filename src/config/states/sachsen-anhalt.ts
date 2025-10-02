import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit mittelalterlichen Traditionen und Brauchtum begrüßt.",
    traditions: ["Feuerwerk über der Altstadt", "Neujahrskonzerte", "Traditionelle Umzüge"],
    locations: ["Magdeburg", "Halle", "Wernigerode"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden Luthers Erbe mit regionalen Bräuchen.",
    traditions: ["Passionsmusik", "Kreuzwege", "Andachten"],
    locations: ["Lutherstadt Wittenberg", "Magdeburger Dom", "Halberstadt"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von mittelalterlichen Ostermärkten bis zu Harzer Bräuchen.",
    traditions: ["Ostermärkte", "Osterfeuer", "Traditionelle Umzüge"],
    locations: ["Quedlinburg", "Harz", "Altmark"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird mit traditionellen Festen und regionalen Bräuchen gefeiert.",
    traditions: ["Maifeste", "Handwerkerfeste", "Frühlingsmärkte"],
    locations: ["Magdeburg", "Dessau", "Stendal"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch den Harz und die Kulturlandschaften gefeiert.",
    traditions: ["Wanderungen", "Himmelfahrtsgottesdienste", "Familienausflüge"],
    locations: ["Harz", "Saale-Unstrut", "Altmark"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von mittelalterlichen Festspielen bis zu regionalen Festen.",
    traditions: ["Pfingstmärkte", "Ritterspiele", "Kirchenfeste"],
    locations: ["Wernigerode", "Tangermünde", "Naumburg"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird als wichtiger protestantischer Feiertag mit historischer Bedeutung begangen.",
    traditions: ["Reformationsgottesdienste", "Lutherfeste", "Historische Führungen"],
    culturalSignificance: "Zentrum der Reformation mit Luthers Wirkungsstätten",
    locations: ["Lutherstadt Wittenberg", "Eisleben", "Mansfeld"]
  },
  "Tag der Deutschen Einheit": {
    description: "Sachsen-Anhalt feiert die Deutsche Einheit mit Fokus auf die Friedliche Revolution.",
    traditions: ["Bürgerfeste", "Konzerte", "Ausstellungen"],
    culturalSignificance: "Bedeutender Ort der Friedlichen Revolution",
    locations: ["Magdeburg", "Halle", "Dessau"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet mittelalterliche Traditionen mit Harzer Brauchtum.",
    traditions: ["Christvespern", "Weihnachtskonzerte", "Krippenspiele"],
    locations: ["Magdeburger Dom", "Quedlinburg", "Wernigerode"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken winterliche Aktivitäten und traditionelle Feste.",
    traditions: ["Weihnachtskonzerte", "Winterwanderungen", "Familienbesuche"],
    locations: ["Harz", "Altmark", "Saale-Unstrut"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Mittelalterliche Frühlingsfeste, erste Wanderungen im Harz und Kulturveranstaltungen in den UNESCO-Welterbestätten."
  },
  {
    season: "summer",
    description: "Historische Festspiele, Schloss- und Burgenfeste und Open-Air-Events prägen den Sommer."
  },
  {
    season: "autumn",
    description: "Weinfeste im Saale-Unstrut-Gebiet, mittelalterliche Herbstmärkte und Wanderungen im Harz."
  },
  {
    season: "winter",
    description: "Historische Weihnachtsmärkte in Fachwerkstädten, Harzer Wintertraditionen und kulturelle Veranstaltungen."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "UNESCO-Welterbestätten",
    description: "Mittelalterliche Städte und Reformationsgeschichte",
    attractions: [
      "Lutherstadt Wittenberg",
      "Quedlinburg",
      "Dessau-Wörlitzer Gartenreich",
      "Naumburger Dom"
    ],
    activities: [
      "Stadtführungen",
      "Museumsbesuche",
      "Kulturveranstaltungen",
      "Historische Rundgänge"
    ]
  },
  {
    name: "Harz & Vorland",
    description: "Mittelgebirge und historische Bergbauregion",
    attractions: [
      "Brocken",
      "Wernigerode",
      "Harzer Schmalspurbahnen",
      "Bodetal"
    ],
    activities: [
      "Wandern",
      "Wintersport",
      "Dampflokfahrten",
      "Naturerkundung"
    ]
  },
  {
    name: "Saale-Unstrut-Region",
    description: "Weinanbaugebiet und Kulturlandschaft",
    attractions: [
      "Weinberge",
      "Burgen und Schlösser",
      "Romanische Straße",
      "Klöster"
    ],
    activities: [
      "Weinproben",
      "Radwandern",
      "Kulturtouren",
      "Schifffahrten"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const STHolidays = holidays.publicHolidays[yearStr]?.["ST"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen-Anhalt ein gesetzlicher Feiertag.`
      }
    })),
    ...STHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen-Anhalt ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const STSchoolHolidays = holidays.schoolHolidays[yearStr]?.["ST"] || [];
  
  return STSchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Sachsen-Anhalt`,
      familyActivities: []
    }
  }));
}

export const sachsenAnhalt: StateInfo = {
  fullName: "Sachsen-Anhalt",
  shortName: "ST",
  capital: "Magdeburg",
  description: "Sachsen-Anhalt vereint mittelalterliches Erbe mit UNESCO-Weltkulturerbe und reizvoller Natur. Von der Lutherstadt Wittenberg über die Fachwerkstadt Quedlinburg bis zum Harz bietet das Land eine einzigartige Mischung aus Geschichte und Landschaft.",
  culturalHighlights: [
    "UNESCO-Welterbe Lutherstätten",
    "UNESCO-Welterbe Quedlinburg",
    "UNESCO-Welterbe Dessau-Wörlitz",
    "Romanische Straße",
    "Mittelalterliche Städte",
    "Harz-Region"
  ],
  keyFacts: {
    population: "2,2 Millionen (2021)",
    area: "20.454 km²",
    founded: "1990",
    economicStrength: [
      "Chemische Industrie",
      "Erneuerbare Energien",
      "Tourismus",
      "Landwirtschaft"
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
  uniqueHolidayInfo: "Sachsen-Anhalt verbindet mittelalterliche Festkultur mit Reformationsgeschichte. Die Vielfalt der Regionen von der Altmark über den Harz bis zur Saale-Unstrut spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Sachsen-Anhalts sind geprägt von mittelalterlicher Geschichte, Reformationsgeschichte und regionaler Kultur. Historische Feste, Luthergedenken und lebendiges Brauchtum prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturerbe",
      icon: "landmark",
      items: [
        {
          title: "Mittelalter",
          description: "UNESCO-Welterbe und lebendige Geschichte",
          icon: "castle"
        },
        {
          title: "Reformation",
          description: "Luthers Wirkungsstätten",
          icon: "book"
        }
      ]
    },
    {
      title: "Naturerlebnis",
      icon: "mountain",
      items: [
        {
          title: "Harz",
          description: "Höchster Norden Deutschlands",
          icon: "hiking"
        },
        {
          title: "Weinland",
          description: "Saale-Unstrut-Region",
          icon: "wine-glass"
        }
      ]
    }
  ]
}; 