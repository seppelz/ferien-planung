import { StateInfo } from '../../types/StateInfo';
import { SeasonalTradition } from '../../types/holiday';
import { VacationDestination } from '../../types/StateInfo';
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
    season: "Frühling",
    description: "Kulturelle Frühlingsfeste, erste Wanderungen im Thüringer Wald und Bach-Festspiele."
  },
  {
    season: "Sommer",
    description: "Klassik-Festivals, mittelalterliche Burgfeste und Naturerlebnisse prägen den Sommer."
  },
  {
    season: "Herbst",
    description: "Kulturherbst mit Festivals, Wanderungen im bunten Thüringer Wald und regionale Feste."
  },
  {
    season: "Winter",
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

export const thueringen: StateInfo = {
  name: "Thüringen",
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
    capital: "Erfurt",
    area: "16.171 km²",
    founded: "1990",
    economicStrength: [
      "Hochtechnologie",
      "Tourismus",
      "Kulturwirtschaft",
      "Optische Industrie"
    ]
  },
  holidays: [
    ...holidays.publicHolidays["2025"]["ALL"].map(holiday => ({
      name: holiday.name,
      type: "public" as const,
      isRegional: false,
      start: holiday.start,
      end: holiday.end,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Thüringen ein gesetzlicher Feiertag.`
      }
    })),
    ...(holidays.publicHolidays["2025"]["TH"] || []).map(holiday => ({
      name: holiday.name,
      type: "public" as const,
      isRegional: true,
      start: holiday.start,
      end: holiday.end,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Thüringen ein gesetzlicher Feiertag.`
      }
    }))
  ],
  schoolHolidays: holidays.schoolHolidays["2025"]["TH"].map(holiday => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien zwischen Kultur und Natur - Vielfältiges Vergnügen",
        activities: [
          "Wintersport im Thüringer Wald",
          "Museumsbesuche",
          "Stadtführungen",
          "Indoor-Aktivitäten"
        ]
      },
      "Osterferien": {
        description: "Osterferien im Kulturland - Zwischen Tradition und Natur",
        activities: [
          "Ostermärkte besuchen",
          "Frühlingsradtouren",
          "Kulturstätten erkunden",
          "Wanderungen"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in der Kulturregion - Aktiv zwischen Geschichte und Natur",
        activities: [
          "Burgen erkunden",
          "Wandern im Thüringer Wald",
          "Stadtführungen",
          "Naturparks entdecken"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien im Erlebnisland - Sechs Wochen Kultur und Natur",
        activities: [
          "Kulturveranstaltungen",
          "Wanderungen",
          "Freibäder besuchen",
          "Naturerkundung"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in bunter Vielfalt - Kultur und Natur",
        activities: [
          "Herbstwanderungen",
          "Kulturtouren",
          "Museumsbesuche",
          "Burgenbesichtigungen"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien im Kulturland - Festliche Zeit in historischer Kulisse",
        activities: [
          "Weihnachtsmärkte besuchen",
          "Winterwandern",
          "Kulturgenuss",
          "Wintersport"
        ]
      }
    };

    // Extract the base holiday name and capitalize it
    const baseHolidayName = holiday.name
      .split(" ")  // Split on spaces
      .filter(part => !part.includes("thueringen") && !part.includes("thüringen") && !part.includes("2025") && !part.includes("("))  // Remove state, year, and extra info
      .join(" ");  // Join remaining parts
    const holidayName = baseHolidayName.charAt(0).toUpperCase() + baseHolidayName.slice(1);

    // Find the matching holiday info case-insensitively
    const matchingKey = Object.keys(familyActivities).find(
      key => key.toLowerCase() === holidayName.toLowerCase()
    );
    const holidayInfo = matchingKey ? familyActivities[matchingKey] : {
      description: `${holiday.name} in Thüringen`,
      activities: []
    };

    return {
      name: holiday.name,
      type: "school" as const,
      start: holiday.start,
      end: holiday.end,
      isRegional: true,
      details: {
        description: holidayInfo.description,
        familyActivities: holidayInfo.activities
      }
    };
  }),
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