import { Holiday, SingleDayHoliday } from '../types/holiday';
import { formatDateString } from '../utils/dateUtils';

export const commonHolidays: Record<number, Holiday[]> = {
  2024: [
    {
      name: "Neujahr",
      date: "2024-01-01",
      type: "public",
      nationwide: true,
      details: {
        description: "Der erste Tag des neuen Jahres ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Karfreitag",
      date: "2024-03-29",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Karfreitag erinnert an die Kreuzigung Jesu und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Ostermontag",
      date: "2024-04-01",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Ostermontag folgt auf das Osterfest und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Tag der Arbeit",
      date: "2024-05-01",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Tag der Arbeit ist ein internationaler Feiertag der Arbeiterbewegung und bundesweit gesetzlich."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Christi Himmelfahrt",
      date: "2024-05-09",
      type: "public",
      nationwide: true,
      details: {
        description: "Christi Himmelfahrt wird 40 Tage nach Ostern gefeiert und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Pfingstmontag",
      date: "2024-05-20",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Pfingstmontag folgt auf das Pfingstfest und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Tag der Deutschen Einheit",
      date: "2024-10-03",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Tag der Deutschen Einheit erinnert an die deutsche Wiedervereinigung und ist bundesweit gesetzlich."
      }
    } satisfies SingleDayHoliday,
    {
      name: "1. Weihnachtstag",
      date: "2024-12-25",
      type: "public",
      nationwide: true,
      details: {
        description: "Der erste Weihnachtsfeiertag ist bundesweit ein gesetzlicher Feiertag.",
        culturalSignificance: "Feiert die Geburt Jesu Christi.",
        traditions: ["Bescherung", "Festessen", "Gottesdienste"]
      }
    } satisfies SingleDayHoliday,
    {
      name: "2. Weihnachtstag",
      date: "2024-12-26",
      type: "public",
      nationwide: true,
      details: {
        description: "Der zweite Weihnachtsfeiertag ist bundesweit ein gesetzlicher Feiertag.",
        culturalSignificance: "Fortsetzung der Weihnachtsfeierlichkeiten.",
        traditions: ["Familienbesuche", "Festessen", "Weihnachtskonzerte"]
      }
    } satisfies SingleDayHoliday
  ],
  2025: [
    {
      name: "Neujahr",
      date: "2025-01-01",
      type: "public",
      nationwide: true,
      details: {
        description: "Der erste Tag des neuen Jahres ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Karfreitag",
      date: "2025-04-18",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Karfreitag erinnert an die Kreuzigung Jesu und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Ostermontag",
      date: "2025-04-21",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Ostermontag folgt auf das Osterfest und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Tag der Arbeit",
      date: "2025-05-01",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Tag der Arbeit ist ein internationaler Feiertag der Arbeiterbewegung und bundesweit gesetzlich."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Christi Himmelfahrt",
      date: "2025-05-29",
      type: "public",
      nationwide: true,
      details: {
        description: "Christi Himmelfahrt wird 40 Tage nach Ostern gefeiert und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Pfingstmontag",
      date: "2025-06-09",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Pfingstmontag folgt auf das Pfingstfest und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Tag der Deutschen Einheit",
      date: "2025-10-03",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Tag der Deutschen Einheit erinnert an die deutsche Wiedervereinigung und ist bundesweit gesetzlich."
      }
    } satisfies SingleDayHoliday,
    {
      name: "1. Weihnachtstag",
      date: "2025-12-25",
      type: "public",
      nationwide: true,
      details: {
        description: "Der erste Weihnachtsfeiertag ist bundesweit ein gesetzlicher Feiertag.",
        culturalSignificance: "Feiert die Geburt Jesu Christi.",
        traditions: ["Bescherung", "Festessen", "Gottesdienste"]
      }
    } satisfies SingleDayHoliday,
    {
      name: "2. Weihnachtstag",
      date: "2025-12-26",
      type: "public",
      nationwide: true,
      details: {
        description: "Der zweite Weihnachtsfeiertag ist bundesweit ein gesetzlicher Feiertag.",
        culturalSignificance: "Fortsetzung der Weihnachtsfeierlichkeiten.",
        traditions: ["Familienbesuche", "Festessen", "Weihnachtskonzerte"]
      }
    } satisfies SingleDayHoliday
  ],
  2026: [
    {
      name: "Neujahr",
      date: "2026-01-01",
      type: "public",
      nationwide: true,
      details: {
        description: "Der erste Tag des neuen Jahres ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Karfreitag",
      date: "2026-04-03",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Karfreitag erinnert an die Kreuzigung Jesu und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Ostermontag",
      date: "2026-04-06",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Ostermontag folgt auf das Osterfest und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Tag der Arbeit",
      date: "2026-05-01",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Tag der Arbeit ist ein internationaler Feiertag der Arbeiterbewegung und bundesweit gesetzlich."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Christi Himmelfahrt",
      date: "2026-05-14",
      type: "public",
      nationwide: true,
      details: {
        description: "Christi Himmelfahrt wird 40 Tage nach Ostern gefeiert und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Pfingstmontag",
      date: "2026-05-25",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Pfingstmontag folgt auf das Pfingstfest und ist bundesweit ein gesetzlicher Feiertag."
      }
    } satisfies SingleDayHoliday,
    {
      name: "Tag der Deutschen Einheit",
      date: "2026-10-03",
      type: "public",
      nationwide: true,
      details: {
        description: "Der Tag der Deutschen Einheit erinnert an die deutsche Wiedervereinigung und ist bundesweit gesetzlich."
      }
    } satisfies SingleDayHoliday,
    {
      name: "1. Weihnachtstag",
      date: "2026-12-25",
      type: "public",
      nationwide: true,
      details: {
        description: "Der erste Weihnachtsfeiertag ist bundesweit ein gesetzlicher Feiertag.",
        culturalSignificance: "Feiert die Geburt Jesu Christi.",
        traditions: ["Bescherung", "Festessen", "Gottesdienste"]
      }
    } satisfies SingleDayHoliday,
    {
      name: "2. Weihnachtstag",
      date: "2026-12-26",
      type: "public",
      nationwide: true,
      details: {
        description: "Der zweite Weihnachtsfeiertag ist bundesweit ein gesetzlicher Feiertag.",
        culturalSignificance: "Fortsetzung der Weihnachtsfeierlichkeiten.",
        traditions: ["Familienbesuche", "Festessen", "Weihnachtskonzerte"]
      }
    } satisfies SingleDayHoliday
  ]
}; 