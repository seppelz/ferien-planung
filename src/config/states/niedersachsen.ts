import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Von der Nordseeküste bis zum Harz wird das neue Jahr mit regionaltypischen Bräuchen begrüßt.",
    traditions: ["Neujahrsschwimmen in der Nordsee", "Bergfeuer im Harz", "Rathausempfänge"],
    locations: ["Cuxhaven", "Goslar", "Hannover"]
  },
  "Karfreitag": {
    description: "Die niedersächsischen Karfreitagstraditionen verbinden Küstenrituale mit Harzer Bergbautraditionen.",
    traditions: ["Fischertradition", "Bergmannsandachten", "Passionskonzerte"],
    locations: ["Ostfriesland", "Clausthal-Zellerfeld", "Lüneburg"]
  },
  "Ostermontag": {
    description: "Ostertraditionen von den Osterfeuern an der Küste bis zu den Bergosterfeuern im Harz.",
    traditions: ["Osterfeuer", "Ostereiersuche in den Dünen", "Bergosterfeuer"],
    locations: ["Ostfriesische Inseln", "Lüneburger Heide", "Harz"]
  },
  "Tag der Arbeit": {
    description: "Der Maifeiertag verbindet Hafenfeste mit traditionellen Maibräuchen im Binnenland.",
    traditions: ["Hafenfeste", "Maibaumaufstellen", "Wanderungen"],
    locations: ["Wilhelmshaven", "Oldenburg", "Göttingen"]
  },
  "Christi Himmelfahrt": {
    description: "Vatertag wird mit Wattwanderungen an der Küste und Wanderungen im Harz gefeiert.",
    traditions: ["Wattwanderungen", "Harzwanderungen", "Vatertagstouren"],
    locations: ["Wattenmeer", "Braunlage", "Weserbergland"]
  },
  "Pfingstmontag": {
    description: "Pfingsttraditionen von maritimen Festen bis zu Bergfesten im Harz.",
    traditions: ["Küstenfeste", "Bergfeste", "Pfingstmärkte"],
    locations: ["Emden", "Sankt Andreasberg", "Hameln"]
  },
  "Tag der Deutschen Einheit": {
    description: "Der Tag wird besonders im ehemaligen Grenzgebiet mit Fokus auf die Wiedervereinigung gefeiert.",
    traditions: ["Grenzwanderungen", "Festakte", "Konzerte"],
    culturalSignificance: "Besondere Bedeutung durch die ehemalige innerdeutsche Grenze",
    locations: ["Helmstedt", "Braunschweig", "Hannover"]
  },
  "Reformationstag": {
    description: "Der Reformationstag wird mit besonderem Bezug zu den historischen Hansestädten begangen.",
    traditions: ["Reformationsgottesdienste", "Historische Führungen", "Konzerte"],
    culturalSignificance: "Wichtiger protestantischer Feiertag mit historischer Bedeutung",
    locations: ["Lüneburg", "Goslar", "Hildesheim"]
  },
  "1. Weihnachtstag": {
    description: "Weihnachten verbindet maritime Traditionen der Küste mit Bergmannsweihnacht im Harz.",
    traditions: ["Maritime Weihnacht", "Bergmannsweihnacht", "Weihnachtsgottesdienste"],
    locations: ["Nordseeküste", "Goslar", "Lüneburg"]
  },
  "2. Weihnachtstag": {
    description: "Der zweite Weihnachtstag lädt zu winterlichen Aktivitäten von der Küste bis zum verschneiten Harz.",
    traditions: ["Winterwanderungen", "Winterspaziergang am Strand", "Skifahren im Harz"],
    locations: ["Norderney", "Lüneburger Heide", "Wurmberg"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Krokusse in der Lüneburger Heide, erste Wattwanderungen und Frühlingserwachen im Harz."
  },
  {
    season: "summer",
    description: "Wattenmeerfestival, Heideblüte und Bergfeste im Harz prägen den Sommer."
  },
  {
    season: "autumn",
    description: "Erntefeste in der Heide, Zugvogelbeobachtung im Wattenmeer und Indian Summer im Harz."
  },
  {
    season: "winter",
    description: "Wintervergnügen von Winterwanderungen im Watt bis zum Skifahren im Harz."
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Nordseeküste & Inseln",
    description: "UNESCO-Weltnaturerbe Wattenmeer und Ostfriesische Inseln",
    attractions: [
      "Nationalpark Wattenmeer",
      "Ostfriesische Inseln",
      "Cuxhaven Strand",
      "Seehundsbänke"
    ],
    activities: [
      "Wattwanderungen",
      "Inselhopping",
      "Seehundbeobachtung",
      "Wellness am Meer"
    ]
  },
  {
    name: "Harz & Weserbergland",
    description: "Höchstes Mittelgebirge Norddeutschlands mit reicher Bergbautradition",
    attractions: [
      "Brocken",
      "Goslar Altstadt",
      "Harzer Schmalspurbahn",
      "Weserbergland"
    ],
    activities: [
      "Wandern",
      "Skifahren",
      "Bergbaumuseen erkunden",
      "Märchenwege entdecken"
    ]
  },
  {
    name: "Lüneburger Heide",
    description: "Einzigartige Heidelandschaft mit historischen Heidedörfern",
    attractions: [
      "Heideblüte",
      "Wilseder Berg",
      "Lüneburger Altstadt",
      "Heide-Erlebniszentrum"
    ],
    activities: [
      "Kutschfahrten",
      "Radwandern",
      "Heidschnucken beobachten",
      "Naturerkundungen"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const NIHolidays = holidays.publicHolidays[yearStr]?.["NI"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Niedersachsen ein gesetzlicher Feiertag.`
      }
    })),
    ...NIHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Niedersachsen ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const NISchoolHolidays = holidays.schoolHolidays[yearStr]?.["NI"] || [];
  
  return NISchoolHolidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.start,
    type: "school" as const,
    period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
    details: {
      description: `Schulferien in Niedersachsen`,
      familyActivities: []
    }
  }));
}

export const niedersachsen: StateInfo = {
  fullName: "Niedersachsen",
  shortName: "NI",
  capital: "Hannover",
  description: "Niedersachsen vereint Küste, Heide und Berge zu einer einzigartigen Kulturlandschaft. Von den Ostfriesischen Inseln über die Lüneburger Heide bis zum Harz bietet das Land vielfältige Urlaubserlebnisse.",
  culturalHighlights: [
    "UNESCO-Weltnaturerbe Wattenmeer",
    "UNESCO-Weltkulturerbe Goslar",
    "Historische Hansestädte",
    "Lüneburger Heide",
    "Harzer Bergbautradition",
    "Ostfriesische Teekultur"
  ],
  keyFacts: {
    population: "8,0 Millionen (2021)",
    area: "47.614 km²",
    founded: "1946",
    economicStrength: [
      "Automobilindustrie",
      "Maritime Wirtschaft",
      "Landwirtschaft",
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
  uniqueHolidayInfo: "Niedersachsen verbindet maritime Festkultur der Küste mit Bergbautraditionen des Harzes. Die Vielfalt der Landschaften spiegelt sich in den Feierlichkeiten wider.",
  traditionInfo: "Die Traditionen Niedersachsens sind geprägt von der Vielfalt seiner Landschaften: Maritime Bräuche der Küste, Heidetraditionen und Bergbaukultur des Harzes prägen das kulturelle Leben.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Küstenkultur",
      icon: "water",
      items: [
        {
          title: "Wattenmeer",
          description: "UNESCO-Weltnaturerbe mit einzigartiger Tierwelt",
          icon: "fish"
        },
        {
          title: "Inselleben",
          description: "Traditionelle Seebäder und maritime Kultur",
          icon: "umbrella-beach"
        }
      ]
    },
    {
      title: "Landschaftsvielfalt",
      icon: "mountain",
      items: [
        {
          title: "Harz",
          description: "Bergbautradition und Winterparadies",
          icon: "skiing"
        },
        {
          title: "Heide",
          description: "Historische Kulturlandschaft mit Heidschnucken",
          icon: "flower"
        }
      ]
    }
  ]
}; 