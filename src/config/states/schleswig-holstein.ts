import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Das neue Jahr wird mit maritimen Traditionen und nordischen Bräuchen begrüßt.",
    traditions: ["Feuerwerk über den Häfen", "Neujahrsschwimmen", "Maritime Konzerte"],
    locations: ["Kiel", "Lübeck", "Flensburg"]
  },
  "Karfreitag": {
    description: "Die Karfreitagstraditionen verbinden hanseatisches Erbe mit nordischer Frömmigkeit.",
    traditions: ["Passionskonzerte", "Prozessionen", "Andachten"],
    locations: ["Lübecker Dom", "Schleswiger Dom", "St. Nikolai Kiel"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von Küstenfeuer bis zu friesischen Bräuchen.",
    traditions: ["Osterfeuer", "Eiersuche am Strand", "Ostermärkte"],
    locations: ["Nordfriesische Inseln", "Ostseeküste", "Holsteinische Schweiz"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag wird mit maritimen Traditionen und Hafenfesten gefeiert.",
    traditions: ["Hafenfeste", "Maibaumaufstellung", "Seglerparaden"],
    locations: ["Kieler Hafen", "Lübecker Hafen", "Flensburger Förde"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Ausflügen an die Küste und zu den Seen gefeiert.",
    traditions: ["Wattwanderungen", "Segeltouren", "Strandwanderungen"],
    locations: ["Wattenmeer", "Ostseestrand", "Plöner See"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von maritimen Festen bis zu Landpartien.",
    traditions: ["Hafenfeste", "Pfingstregatta", "Strandpicknicks"],
    locations: ["Kieler Förde", "Lübecker Bucht", "Schlei"]
  },
  "Tag der Deutschen Einheit": {
    description: "Der Tag der Deutschen Einheit wird mit Fokus auf die maritime Verbindung gefeiert.",
    traditions: ["Hafenfeste", "Segelparaden", "Konzerte"],
    culturalSignificance: "Bedeutung der maritimen Verbindung zwischen Ost und West",
    locations: ["Kiel", "Lübeck", "Flensburg"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird als wichtiger protestantischer Feiertag begangen.",
    traditions: ["Reformationsgottesdienste", "Kirchenkonzerte", "Historische Führungen"],
    culturalSignificance: "Bedeutende protestantische Tradition im Norden",
    locations: ["Lübeck", "Schleswig", "Husum"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag verbindet maritime mit nordischen Traditionen.",
    traditions: ["Weihnachtsgottesdienste", "Hafenweihnacht", "Konzerte"],
    locations: ["Lübecker Dom", "Kieler St. Nikolai", "Flensburger Nikolaikirche"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtstag locken winterliche Aktivitäten an Küste und Seen.",
    traditions: ["Winterwanderungen", "Familienbesuche", "Konzerte"],
    locations: ["Ostseeküste", "Holsteinische Schweiz", "Nordfriesische Inseln"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "Frühjahr",
    description: "Erste Strandtage, Hafenfeste und maritime Veranstaltungen läuten die Saison ein."
  },
  {
    season: "Sommer",
    description: "Kieler Woche, Strandleben und Wassersport prägen den Sommer an Nord- und Ostsee."
  },
  {
    season: "autumn",
    description: "Herbststürme, Krabbenfang und gemütliche Teestuben bestimmen die Jahreszeit."
  },
  {
    season: "winter",
    description: "Maritimes Winterflair mit Weihnachtsmärkten in historischen Hafenstädten."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Nordseeküste & Inseln",
    description: "Wattenmeer und Nordfriesische Inseln",
    attractions: [
      "UNESCO-Weltnaturerbe Wattenmeer",
      "Sylt",
      "Amrum",
      "Halligen"
    ],
    activities: [
      "Wattwandern",
      "Strandleben",
      "Inselerkundung",
      "Wellness"
    ]
  },
  {
    name: "Ostseeküste",
    description: "Badeorte und historische Hansestädte",
    attractions: [
      "Lübecker Altstadt",
      "Timmendorfer Strand",
      "Kieler Förde",
      "Flensburger Förde"
    ],
    activities: [
      "Baden",
      "Segeln",
      "Stadtbesichtigungen",
      "Strandwandern"
    ]
  },
  {
    name: "Binnenland",
    description: "Holsteinische Schweiz und historische Städte",
    attractions: [
      "Plöner See",
      "Schleswig",
      "Holsteinische Schweiz",
      "Viking Museum Haithabu"
    ],
    activities: [
      "Wassersport",
      "Radfahren",
      "Kulturerkundung",
      "Naturerlebnis"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const SHHolidays = holidays.publicHolidays[yearStr]?.["SH"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Schleswig-Holstein ein gesetzlicher Feiertag.`
      }
    })),
    ...SHHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Schleswig-Holstein ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const SHSchoolHolidays = holidays.schoolHolidays[yearStr]?.["SH"] || [];
  
  return SHSchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Schleswig-Holstein`,
      familyActivities: []
    }
  }));
}

export const schleswigHolstein: StateInfo = {
  fullName: "Schleswig-Holstein",
  shortName: "SH",
  capital: "Kiel",
  description: "Schleswig-Holstein, das Land zwischen den Meeren, verbindet maritimes Flair mit nordischer Lebensart. Von den Nordfriesischen Inseln über das UNESCO-Weltnaturerbe Wattenmeer bis zur Ostseeküste und der Holsteinischen Schweiz bietet das nördlichste Bundesland eine einzigartige Vielfalt.",
  culturalHighlights: [
    "UNESCO-Weltnaturerbe Wattenmeer",
    "UNESCO-Weltkulturerbe Lübeck",
    "Kieler Woche",
    "Wikingererbe",
    "Hansestädte",
    "Maritime Kultur"
  ],
  keyFacts: {
    population: "2,9 Millionen (2021)",
    area: "15.804 km²",
    founded: "1946",
    economicStrength: [
      "Maritime Wirtschaft",
      "Tourismus",
      "Erneuerbare Energien",
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
  uniqueHolidayInfo: "Schleswig-Holstein verbindet maritime Festkultur mit nordischen Traditionen. Die Vielfalt der Regionen von der Nordsee über die Ostsee bis zur Holsteinischen Schweiz spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Schleswig-Holsteins sind geprägt von maritimer Geschichte, hanseatischem Erbe und nordischer Kultur. Hafenfeste, Segelsport und Küstenbrauchtum prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Maritimes Erbe",
      icon: "anchor",
      items: [
        {
          title: "Küstenkultur",
          description: "Zwischen Nord- und Ostsee",
          icon: "water"
        },
        {
          title: "Hanseerbe",
          description: "Historische Hafenstädte",
          icon: "ship"
        }
      ]
    },
    {
      title: "Natur & Kultur",
      icon: "leaf",
      items: [
        {
          title: "Wattenmeer",
          description: "UNESCO-Weltnaturerbe",
          icon: "wave"
        },
        {
          title: "Seenland",
          description: "Holsteinische Schweiz",
          icon: "lake"
        }
      ]
    }
  ]
}; 