import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit sächsischen Traditionen und barockem Glanz begrüßt.",
    traditions: ["Feuerwerk über der Elbe", "Neujahrskonzerte", "Bergparaden"],
    locations: ["Dresden", "Leipzig", "Chemnitz"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden Bachsche Passionsmusik mit erzgebirgischer Frömmigkeit.",
    traditions: ["Bach-Passionen", "Kreuzwege", "Bergmannsandachten"],
    locations: ["Thomaskirche Leipzig", "Kreuzkirche Dresden", "Dom zu Freiberg"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von sorbischen Osterfesten bis zu erzgebirgischen Bergmannsbräuchen.",
    traditions: ["Sorbische Osterreiter", "Osterfeuer", "Bergmannsosterfeste"],
    locations: ["Lausitz", "Erzgebirge", "Vogtland"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird besonders in den Industrieregionen mit Bezug zur Tradition gefeiert.",
    traditions: ["Maikundgebungen", "Bergmannsfeste", "Handwerkerfeste"],
    locations: ["Chemnitz", "Zwickau", "Plauen"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wanderungen durch die sächsische Schweiz und das Erzgebirge gefeiert.",
    traditions: ["Wanderungen", "Himmelfahrtsgottesdienste", "Familienausflüge"],
    locations: ["Sächsische Schweiz", "Erzgebirge", "Zittauer Gebirge"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von sorbischen Pfingstfesten bis zu barocken Kirchenfeiern.",
    traditions: ["Sorbische Feste", "Pfingstkonzerte", "Bergmannsfeste"],
    locations: ["Dresden", "Bautzen", "Annaberg-Buchholz"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird als wichtiger protestantischer Feiertag mit historischer Bedeutung begangen.",
    traditions: ["Reformationsgottesdienste", "Lutherfeste", "Kirchenmusik"],
    culturalSignificance: "Zentrum der Reformation mit besonderer historischer Bedeutung",
    locations: ["Leipzig", "Dresden", "Torgau"]
  },
  "Buß- und Bettag": {
    description: "Der Buß- und Bettag wird als einziges Bundesland als gesetzlicher Feiertag begangen.",
    traditions: ["Gottesdienste", "Konzerte", "Besinnungstage"],
    culturalSignificance: "Einziges Bundesland mit diesem gesetzlichen Feiertag",
    locations: ["Dresden", "Leipzig", "Chemnitz"]
  },
  "Tag der Deutschen Einheit": {
    description: "Sachsen feiert die Deutsche Einheit mit Fokus auf die Friedliche Revolution.",
    traditions: ["Friedensgebete", "Lichtfeste", "Konzerte"],
    culturalSignificance: "Besondere Bedeutung durch die Rolle bei der Friedlichen Revolution",
    locations: ["Leipzig", "Dresden", "Plauen"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet erzgebirgische Traditionen mit barocker Kirchenmusik.",
    traditions: ["Christvespern", "Bergparaden", "Weihnachtskonzerte"],
    locations: ["Dresdner Kreuzchor", "Thomaskirche Leipzig", "Dom zu Freiberg"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken erzgebirgische Traditionen und winterliche Aktivitäten.",
    traditions: ["Bergparaden", "Mettenschichten", "Winterwanderungen"],
    locations: ["Erzgebirge", "Sächsische Schweiz", "Vogtland"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Leipziger Buchmesse, Dresdner Musikfestspiele und erste Bergparaden im Erzgebirge."
  },
  {
    season: "summer",
    description: "Elbhangfest in Dresden, Bach-Fest Leipzig und Bergbautraditionen prägen den Sommer."
  },
  {
    season: "autumn",
    description: "Filmfest Dresden, Leipziger Jazztage und traditionelle Bergparaden bestimmen die Jahreszeit."
  },
  {
    season: "winter",
    description: "Berühmte Weihnachtsmärkte, erzgebirgische Traditionen und Wintersport im Erzgebirge."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Dresden & Elbtal",
    description: "Barockstadt und UNESCO-Weltkulturerbe",
    attractions: [
      "Frauenkirche",
      "Zwinger",
      "Semperoper",
      "Brühlsche Terrasse"
    ],
    activities: [
      "Kulturgenuss",
      "Elbschifffahrt",
      "Museumsbesuche",
      "Stadtführungen"
    ]
  },
  {
    name: "Sächsische Schweiz",
    description: "Einzigartiges Felsengebirge und Naturparadies",
    attractions: [
      "Bastei",
      "Festung Königstein",
      "Malerweg",
      "Nationalpark"
    ],
    activities: [
      "Wandern",
      "Klettern",
      "Naturerkundung",
      "Fototouren"
    ]
  },
  {
    name: "Erzgebirge",
    description: "UNESCO-Weltkulturerbe Montanregion",
    attractions: [
      "Bergbaumuseen",
      "Weihnachtsmärkte",
      "Fichtelberg",
      "Bergstädte"
    ],
    activities: [
      "Wintersport",
      "Bergbautraditionen",
      "Handwerkskunst",
      "Wandern"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const SNHolidays = holidays.publicHolidays[yearStr]?.["SN"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen ein gesetzlicher Feiertag.`
      }
    })),
    ...SNHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Sachsen ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const SNSchoolHolidays = holidays.schoolHolidays[yearStr]?.["SN"] || [];
  
  return SNSchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Sachsen`,
      familyActivities: []
    }
  }));
}

export const sachsen: StateInfo = {
  fullName: "Sachsen",
  shortName: "SN",
  capital: "Dresden",
  description: "Sachsen vereint barocke Pracht mit lebendiger Kulturszene und innovativer Wirtschaft. Von der Barockstadt Dresden über die Musikstadt Leipzig bis zum UNESCO-Welterbe Erzgebirge bietet das Land eine einzigartige Mischung aus Tradition und Moderne.",
  culturalHighlights: [
    "UNESCO-Welterbe Dresdner Altstadt",
    "Leipziger Musikerbe",
    "UNESCO-Welterbe Montanregion Erzgebirge",
    "Sächsische Schweiz",
    "Barockarchitektur",
    "Kunstsammlungen"
  ],
  keyFacts: {
    population: "4,0 Millionen (2021)",
    area: "18.450 km²",
    founded: "1990",
    economicStrength: [
      "Hochtechnologie",
      "Automobilindustrie",
      "Kultur und Tourismus",
      "Mikroelektronik"
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
  uniqueHolidayInfo: "Sachsen verbindet barocke Festkultur mit erzgebirgischen Traditionen. Die Vielfalt der Regionen von Dresden über Leipzig bis zum Erzgebirge spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Sachsens sind geprägt von barocker Kultur, Musikgeschichte und Bergbautradition. Klassische Musik, erzgebirgisches Brauchtum und lebendige Stadtkultur prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturerbe",
      icon: "landmark",
      items: [
        {
          title: "Barockkultur",
          description: "Weltberühmte Architektur und Kunstschätze",
          icon: "building"
        },
        {
          title: "Musikstadt",
          description: "Bach, Gewandhaus und lebendige Szene",
          icon: "music"
        }
      ]
    },
    {
      title: "Tradition & Innovation",
      icon: "cogs",
      items: [
        {
          title: "Bergbautradition",
          description: "UNESCO-Welterbe Montanregion",
          icon: "mountain"
        },
        {
          title: "Silicon Saxony",
          description: "Moderne Hochtechnologie",
          icon: "microchip"
        }
      ]
    }
  ]
}; 