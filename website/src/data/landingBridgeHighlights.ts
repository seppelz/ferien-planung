import type { LandingIconName } from '@/app/components/LandingIcon';

export interface LandingBridgeHighlight {
  icon: LandingIconName;
  title: string;
  recommendation: string;
  explanation: string;
}

export const LANDING_BRIDGE_HIGHLIGHTS: LandingBridgeHighlight[] = [
  {
    icon: 'sparkles',
    title: 'Neujahr (1. Januar 2026 – Donnerstag)',
    recommendation: 'Nehmen Sie Freitag, den 2. Januar frei',
    explanation: 'Donnerstag bis Sonntag am Stück freihaben. Perfekter Start ins neue Jahr!',
  },
  {
    icon: 'crown',
    title: 'Heilige Drei Könige (6. Januar 2026 – Dienstag)',
    recommendation: 'Nehmen Sie Montag, den 5. Januar frei',
    explanation: 'Gilt für Baden-Württemberg, Bayern und Sachsen-Anhalt. Verlängertes Wochenende zu Jahresbeginn.',
  },
  {
    icon: 'egg',
    title: 'Ostern (3.–6. April 2026)',
    recommendation: 'Nehmen Sie Donnerstag, den 2. April frei',
    explanation:
      'Von Karfreitag (3. April) bis Ostermontag (6. April) ist bereits frei. Mit einem zusätzlichen Urlaubstag am Donnerstag davor genießen Sie vier Tage am Stück.',
  },
  {
    icon: 'flower',
    title: 'Tag der Arbeit (1. Mai 2026 – Freitag)',
    recommendation: 'Nehmen Sie Donnerstag, den 30. April frei',
    explanation:
      'Der 1. Mai fällt auf einen Freitag – ideal für ein verlängertes Wochenende. Mit einem Brückentag am Donnerstag haben Sie vier Tage frei.',
  },
  {
    icon: 'cloud',
    title: 'Christi Himmelfahrt (14. Mai 2026 – Donnerstag)',
    recommendation: 'Nehmen Sie Freitag, den 15. Mai frei',
    explanation: 'Einer der beliebtesten Brückentage! Mit nur einem Urlaubstag ein langes Wochenende sichern.',
  },
  {
    icon: 'bird',
    title: 'Pfingstmontag (25. Mai 2026 – Montag)',
    recommendation: 'Nehmen Sie Freitag, den 22. Mai frei',
    explanation: 'Pfingsten bietet bereits ein verlängertes Wochenende. Optimieren Sie es mit einem Brückentag.',
  },
  {
    icon: 'cross',
    title: 'Fronleichnam (4. Juni 2026 – Donnerstag)',
    recommendation: 'Nehmen Sie Freitag, den 5. Juni frei',
    explanation: 'Gilt für Baden-Württemberg, Bayern, Hessen, NRW, Rheinland-Pfalz und Saarland.',
  },
  {
    icon: 'treePine',
    title: 'Weihnachten (25. Dezember 2026 – Freitag)',
    recommendation: 'Nehmen Sie Donnerstag, den 24. Dezember frei',
    explanation: 'Heiligabend bis Sonntag frei – der perfekte Start in die Feiertage.',
  },
];
