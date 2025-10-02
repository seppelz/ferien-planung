import { StateInfo } from '../types/StateInfo';
import { Holiday, SeasonalTradition } from '@/types/holiday';
import { VacationDestination } from '../types/StateInfo';
import { holidays } from '../../data/holidays';

const stateSpecificHolidayDetails: Record<string, { description: string, traditions?: string[], culturalSignificance?: string, locations?: string[] }> = {
  "Neujahr": {
    description: "Die Berliner Silvesterfeier am Brandenburger Tor ist eine der größten Freiluftpartys Europas mit spektakulärem Feuerwerk.",
    traditions: ["Silvesterparty am Brandenburger Tor", "Neujahrslauf", "Neujahrskonzerte"],
    locations: ["Brandenburger Tor", "Alexanderplatz", "Kulturbrauerei"]
  },
  "Karfreitag": {
    description: "Der Berliner Karfreitag verbindet zeitgenössische Kunstausstellungen mit traditionellen Passionskonzerten in historischen Kirchen.",
    traditions: ["Passionskonzerte", "Kreuzwege", "Kunstausstellungen"],
    locations: ["Berliner Dom", "Gedächtniskirche", "Gethsemanekirche"]
  },
  "Ostermontag": {
    description: "Die Berliner Osterfeierlichkeiten vereinen urbane Brunchkultur mit traditionellen Osterfeuern in den Stadtparks.",
    traditions: ["Osterfeuer", "Osterbrunch", "Ostermärkte"],
    locations: ["Britzer Garten", "Botanischer Garten", "Domäne Dahlem"]
  },
  "Tag der Arbeit": {
    description: "Der Berliner 1. Mai ist bekannt für das multikulturelle MyFest in Kreuzberg und friedliche politische Demonstrationen.",
    traditions: ["MyFest in Kreuzberg", "Demonstrationen", "Straßenfeste"],
    locations: ["Kreuzberg", "Prenzlauer Berg", "Friedrichshain"]
  },
  "Christi Himmelfahrt": {
    description: "An Christi Himmelfahrt verwandeln sich Berlins Grünanlagen und Seen in beliebte Ausflugsziele für Vatertagstouren.",
    traditions: ["Vatertagstouren", "Picknicks", "Bootsfahrten"],
    locations: ["Wannsee", "Müggelsee", "Tiergarten"]
  },
  "Pfingstmontag": {
    description: "Der Berliner Pfingstmontag ist untrennbar mit dem bunten Karneval der Kulturen und Open-Air-Festivals verbunden.",
    traditions: ["Karneval der Kulturen", "Pfingstkonzerte", "Stadtfeste"],
    locations: ["Kreuzberg", "Tempelhof", "Mauerpark"]
  },
  "Tag der Deutschen Einheit": {
    description: "Berlin feiert die Deutsche Einheit mit besonderer Intensität entlang der ehemaligen Mauer mit Festmeile und Bürgerfest.",
    traditions: ["Bürgerfest", "Festmeile", "Konzerte"],
    culturalSignificance: "Symbol für die Überwindung der deutschen Teilung",
    locations: ["Brandenburger Tor", "East Side Gallery", "Potsdamer Platz"]
  },
  "1. Weihnachtstag": {
    description: "Der erste Weihnachtsfeiertag in Berlin vereint festliche Konzerte in der Philharmonie mit stimmungsvollen Gottesdiensten im Dom.",
    traditions: ["Weihnachtsgottesdienste", "Konzerte", "Festessen"],
    locations: ["Berliner Dom", "Konzerthaus", "Gendarmenmarkt"]
  },
  "2. Weihnachtstag": {
    description: "Am zweiten Weihnachtsfeiertag locken Berlins Kulturinstitutionen mit besonderen Aufführungen und winterlichen Veranstaltungen.",
    traditions: ["Theaterbesuche", "Weihnachtskonzerte", "Wintermärkte"],
    locations: ["Staatsoper", "Philharmonie", "Charlottenburg"]
  },
  "Internationaler Frauentag": {
    description: "Der Internationale Frauentag als Berliner Feiertag würdigt die Geschichte der Frauenbewegung mit vielfältigen Veranstaltungen.",
    traditions: ["Demonstrationen", "Kulturveranstaltungen", "Diskussionsrunden"],
    culturalSignificance: "Symbol für die Gleichberechtigung und Emanzipation",
    locations: ["Unter den Linden", "Alexanderplatz", "Kurfürstendamm"]
  }
};

const seasonalTraditions: SeasonalTradition[] = [
  {
    season: "spring",
    description: "Internationales Filmfestival Berlinale, Karneval der Kulturen, Gallery Weekend"
  },
  {
    season: "summer",
    description: "Fête de la Musique, Christopher Street Day, Open Air Kinos und Konzerte"
  },
  {
    season: "autumn",
    description: "Festival of Lights, Berlin Art Week, Berliner Oktoberfest"
  },
  {
    season: "winter",
    description: "Weihnachtsmärkte in allen Bezirken, Silvesterfeier am Brandenburger Tor"
  }
];

const vacationDestinations: VacationDestination[] = [
  {
    name: "Mitte",
    description: "Das historische Zentrum Berlins mit Weltklasse-Museen und Sehenswürdigkeiten",
    attractions: ["Museumsinsel", "Brandenburger Tor", "Reichstag", "Hackescher Markt"],
    activities: [
      "Museumsbesuche",
      "Stadtführungen",
      "Shopping in den Hackeschen Höfen",
      "Bootstouren auf der Spree"
    ]
  },
  {
    name: "Charlottenburg-Wilmersdorf",
    description: "Prachtvolle Schlösser und Gärten im Westen der Stadt",
    attractions: ["Schloss Charlottenburg", "Kurfürstendamm", "Zoo Berlin", "Grunewald"],
    activities: [
      "Schlossbesichtigungen",
      "Shopping am Ku'damm",
      "Tierbeobachtungen im Zoo",
      "Waldwanderungen"
    ]
  },
  {
    name: "Friedrichshain-Kreuzberg",
    description: "Berlins kreatives Herz mit Street Art und alternativer Kultur",
    attractions: ["East Side Gallery", "RAW-Gelände", "Görlitzer Park", "Oberbaumbrücke"],
    activities: [
      "Street Art Touren",
      "Streetfood-Märkte besuchen",
      "Konzerte und Clubs",
      "Urban Gardening"
    ]
  }
];

function getHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const allHolidays = holidays.publicHolidays[yearStr]?.["ALL"] || [];
  const beHolidays = holidays.publicHolidays[yearStr]?.["BE"] || [];
  
  return [
    ...allHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: false,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Berlin ein gesetzlicher Feiertag.`
      }
    })),
    ...beHolidays.map((holiday) => ({
      name: holiday.name,
      date: holiday.start,
      type: "public" as const,
      isRegional: true,
      details: stateSpecificHolidayDetails[holiday.name] || {
        description: `${holiday.name} ist in Berlin ein gesetzlicher Feiertag.`
      }
    }))
  ];
}

function getSchoolHolidaysForYear(year: number): Holiday[] {
  const yearStr = year.toString();
  const beSchoolHolidays = holidays.schoolHolidays[yearStr]?.["BE"] || [];
  
  return beSchoolHolidays.map((holiday) => {
    const familyActivities: Record<string, { description: string, activities: string[] }> = {
      "Winterferien": {
        description: "Winterferien in Berlin - Kultur und Indoor-Abenteuer",
        activities: [
          "Besuch der Kindermuseen auf der Museumsinsel",
          "Eislaufen im Horst-Dohm-Eisstadion",
          "Naturkundemuseum mit Dinosaurierskeletten",
          "Indoor-Spielplätze wie das Legoland Discovery Centre"
        ]
      },
      "Osterferien": {
        description: "Osterferien in Berlin - Frühling in der Hauptstadt",
        activities: [
          "Ostereisuche im Britzer Garten",
          "Tierpark und Zoo Berlin",
          "Domäne Dahlem mit Osterprogramm",
          "Familien-Workshops in den Museen"
        ]
      },
      "Pfingstferien": {
        description: "Pfingstferien in Berlin - Frühsommer und Outdoor-Aktivitäten",
        activities: [
          "Picknick im Tempelhofer Feld",
          "Bootstouren auf der Spree",
          "Kletterpark Wuhlheide",
          "Karneval der Kulturen"
        ]
      },
      "Sommerferien": {
        description: "Sommerferien in Berlin - Badeseen und Stadtabenteuer",
        activities: [
          "Baden am Wannsee oder Müggelsee",
          "FEZ-Berlin Sommerprogramm",
          "Outdoor-Kino und Open-Air-Konzerte",
          "Tagesausflüge nach Potsdam"
        ]
      },
      "Herbstferien": {
        description: "Herbstferien in Berlin - Kulturprogramm und Herbstfarben",
        activities: [
          "Festival of Lights",
          "Herbstwanderungen im Grunewald",
          "Theaterprogramm für Kinder",
          "Herbstmärkte besuchen"
        ]
      },
      "Weihnachtsferien": {
        description: "Weihnachtsferien in Berlin - Weihnachtszauber in der Hauptstadt",
        activities: [
          "Weihnachtsmärkte auf dem Gendarmenmarkt",
          "Eislaufen vorm Brandenburger Tor",
          "Weihnachtsprogramme in den Theatern",
          "Silvesterfeier am Brandenburger Tor"
        ]
      }
    };

    const holidayName = Object.keys(familyActivities).find(key => 
      holiday.name.toLowerCase().includes(key.toLowerCase())
    );
    const activities = holidayName ? familyActivities[holidayName] : null;

    return {
      name: holiday.name,
      date: holiday.start,
      type: "school" as const,
      period: holiday.end ? `${holiday.start} - ${holiday.end}` : holiday.start,
      details: {
        description: activities?.description || `Schulferien in Berlin`,
        familyActivities: activities?.activities || []
      }
    };
  });
}

export const berlin: StateInfo = {
  fullName: "Berlin",
  shortName: "BE",
  capital: "Berlin",
  description: "Berlin ist die Hauptstadt und ein Stadtstaat der Bundesrepublik Deutschland. Als Metropole vereint sie Geschichte, Kultur, Politik und eine lebendige internationale Szene.",
  culturalHighlights: [
    "Museumsinsel (UNESCO-Weltkulturerbe)",
    "East Side Gallery",
    "Brandenburger Tor",
    "Reichstagsgebäude",
    "Berliner Philharmonie"
  ],
  keyFacts: {
    population: "3,7 Millionen",
    area: "892 km²",
    founded: "1237",
    economicStrength: [
      "Kreativwirtschaft",
      "Technologie und Startups",
      "Tourismus",
      "Wissenschaft und Forschung",
      "Medien"
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
  uniqueHolidayInfo: "Berlin verbindet bei seinen Feiertagen internationale Weltoffenheit mit deutscher Geschichte und Tradition.",
  traditionInfo: "Die Feiertage in Berlin spiegeln die Vielfalt der Metropole wider, von traditionellen Festen bis zu modernen Kulturveranstaltungen.",
  seasonalTraditions,
  vacationDestinations,
  regionalSpecialties: [
    {
      title: "Kulturelle Events",
      icon: "event",
      items: [
        {
          title: "Berlinale",
          description: "Internationales Filmfestival mit speziellem Kinder- und Jugendprogramm",
          icon: "film"
        },
        {
          title: "Karneval der Kulturen",
          description: "Multikulturelles Straßenfest mit Umzug und Kinderprogramm",
          icon: "carnival"
        }
      ]
    },
    {
      title: "Urbane Highlights",
      icon: "city",
      items: [
        {
          title: "Museumsinsel",
          description: "UNESCO-Weltkulturerbe mit fünf weltberühmten Museen",
          icon: "museum"
        },
        {
          title: "Mauergedenkstätten",
          description: "Geschichte zum Anfassen an East Side Gallery und Bernauer Straße",
          icon: "monument"
        }
      ]
    }
  ]
}; 