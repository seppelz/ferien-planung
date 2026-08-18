import type { LandingIconName } from '@/app/components/LandingIcon';

export interface LandingFeature {
  icon: LandingIconName;
  title: string;
  description: string;
}

export interface LandingBenefit {
  icon: LandingIconName;
  title: string;
  value: string;
  description: string;
}

export interface LandingStep {
  icon: LandingIconName;
  title: string;
  description: string;
}

export const LANDING_FEATURES: LandingFeature[] = [
  {
    icon: 'calendarRange',
    title: 'Brückentage-Optimierung',
    description: 'Intelligente Berechnung der effizientesten Urlaubstage mit Berücksichtigung von Feiertagen.',
  },
  {
    icon: 'users',
    title: 'Zwei-Personen Planung',
    description: 'Plane deinen Urlaub gemeinsam mit Partner oder Familie, mit separater Verwaltung pro Person.',
  },
  {
    icon: 'landmark',
    title: 'Bundesland-spezifisch',
    description: 'Alle Feiertage für jedes Bundesland, inklusive Schulferien als zusätzliche Information.',
  },
  {
    icon: 'upload',
    title: 'Kalender-Export',
    description: 'Exportiere deinen Plan als ICS-Datei und übernimm ihn in Outlook, Google Kalender oder Apple Kalender.',
  },
];

export const LANDING_BENEFITS: LandingBenefit[] = [
  {
    icon: 'barChart',
    title: 'Maximale Effizienz',
    value: 'Bis zu 24 Tage',
    description: 'Verlängere deinen Urlaub durch optimale Nutzung von Brückentagen und Feiertagen.',
  },
  {
    icon: 'rocket',
    title: 'Schnelle Planung',
    value: '< 5 Minuten',
    description: 'Plane deinen gesamten Jahresurlaub in weniger als 5 Minuten.',
  },
  {
    icon: 'gift',
    title: 'Kostenlos',
    value: '100% Gratis',
    description: 'Alle Features kostenlos verfügbar, keine versteckten Kosten.',
  },
];

export const LANDING_STEPS: LandingStep[] = [
  {
    icon: 'mapPin',
    title: 'Bundesland auswählen',
    description: 'Wähle dein Bundesland aus, um alle relevanten Feiertage zu sehen.',
  },
  {
    icon: 'users',
    title: 'Optional: Zweite Person',
    description: 'Plane gemeinsam mit Partner oder Familie durch Aktivierung der Zwei-Personen Ansicht.',
  },
  {
    icon: 'calendarDays',
    title: 'Brückentage anzeigen',
    description: 'Lass dir die effizientesten Brückentage für dein Bundesland anzeigen.',
  },
  {
    icon: 'sparkles',
    title: 'Urlaub optimieren',
    description: 'Wähle die Brückentage aus und optimiere deinen Jahresurlaub mit wenigen Klicks.',
  },
];
