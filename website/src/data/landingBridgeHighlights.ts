import type { LandingIconName } from '@/app/components/LandingIcon';

export interface LandingBridgeHighlight {
  icon: LandingIconName;
  title: string;
  recommendation: string;
  explanation: string;
}

/** Strong Brückentag opportunities for PLAN_YEAR (2027). */
export const LANDING_BRIDGE_HIGHLIGHTS: LandingBridgeHighlight[] = [
  {
    icon: 'sparkles',
    title: 'Neujahr (1. Januar 2027 – Freitag)',
    recommendation: 'Nehmen Sie Donnerstag, den 31. Dezember 2026 frei',
    explanation:
      'Mit Heiligabend-Planung und Neujahr am Freitag starten Sie mit einem langen Wochenende ins neue Jahr.',
  },
  {
    icon: 'crown',
    title: 'Heilige Drei Könige (6. Januar 2027 – Mittwoch)',
    recommendation: 'Nehmen Sie Dienstag, den 5. Januar frei',
    explanation:
      'Gilt für Baden-Württemberg, Bayern und Sachsen-Anhalt. Mit einem Brückentag ein verlängertes Wochenende zu Jahresbeginn.',
  },
  {
    icon: 'egg',
    title: 'Ostern (26.–29. März 2027)',
    recommendation: 'Nehmen Sie Donnerstag, den 25. März frei',
    explanation:
      'Karfreitag (26. März) bis Ostermontag (29. März) sind bereits frei. Mit einem Urlaubstag am Donnerstag davor gewinnen Sie vier Tage am Stück.',
  },
  {
    icon: 'cloud',
    title: 'Christi Himmelfahrt (6. Mai 2027 – Donnerstag)',
    recommendation: 'Nehmen Sie Freitag, den 7. Mai frei',
    explanation: 'Klassischer Brückentag: Mit nur einem Urlaubstag vier Tage am Stück freihaben.',
  },
  {
    icon: 'bird',
    title: 'Pfingstmontag (17. Mai 2027 – Montag)',
    recommendation: 'Nehmen Sie Freitag, den 14. Mai frei',
    explanation: 'Pfingsten verlängert das Wochenende bereits. Mit einem Brückentag davor wird daraus ein Mini-Urlaub.',
  },
  {
    icon: 'cross',
    title: 'Fronleichnam (27. Mai 2027 – Donnerstag)',
    recommendation: 'Nehmen Sie Freitag, den 28. Mai frei',
    explanation: 'Gilt für Baden-Württemberg, Bayern, Hessen, NRW, Rheinland-Pfalz und Saarland.',
  },
  {
    icon: 'flower',
    title: 'Allerheiligen (1. November 2027 – Montag)',
    recommendation: 'Nehmen Sie Freitag, den 29. Oktober frei',
    explanation:
      'Gilt u. a. für Baden-Württemberg, Bayern, NRW, Rheinland-Pfalz und Saarland. Langes Wochenende im Herbst.',
  },
  {
    icon: 'treePine',
    title: 'Buß- und Bettag (17. November 2027 – Mittwoch)',
    recommendation: 'Nehmen Sie Dienstag und Donnerstag frei',
    explanation: 'Nur in Sachsen gesetzlich frei. Mit zwei Brückentagen eine volle freie Woche möglich.',
  },
];
