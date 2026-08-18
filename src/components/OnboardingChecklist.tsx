import React from 'react';
import { ONBOARDING_KEYS } from '../constants/onboardingKeys';

interface OnboardingChecklistProps {
  hasVacationPlan: boolean;
  onScrollToRecommendations: () => void;
  onDismiss: () => void;
}

const STEPS = [
  { id: 'state', label: 'Bundesland gewählt' },
  { id: 'bridge', label: 'Brückentag auswählen oder Urlaub planen' },
  { id: 'export', label: 'Plan exportieren oder teilen' },
] as const;

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({
  hasVacationPlan,
  onScrollToRecommendations,
  onDismiss,
}) => {
  const completed = {
    state: true,
    bridge: hasVacationPlan,
    export: false,
  };

  return (
    <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="font-semibold">Erste Schritte</p>
        <button
          type="button"
          onClick={onDismiss}
          className="text-xs text-emerald-700 hover:underline"
          aria-label="Checkliste schließen"
        >
          Schließen
        </button>
      </div>
      <ol className="space-y-2">
        {STEPS.map((step, index) => {
          const done =
            step.id === 'state'
              ? completed.state
              : step.id === 'bridge'
                ? completed.bridge
                : completed.export;
          return (
            <li key={step.id} className="flex items-center gap-2">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                  done ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 ring-1 ring-emerald-300'
                }`}
              >
                {done ? '✓' : index + 1}
              </span>
              {step.id === 'bridge' && !done ? (
                <button
                  type="button"
                  onClick={onScrollToRecommendations}
                  className="text-left font-medium text-emerald-800 underline-offset-2 hover:underline"
                >
                  {step.label}
                </button>
              ) : (
                <span className={done ? 'text-emerald-800' : 'text-emerald-900'}>{step.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export function dismissOnboardingChecklist(): void {
  localStorage.setItem(ONBOARDING_KEYS.checklistDismissed, 'true');
}

export function isOnboardingChecklistVisible(): boolean {
  return !localStorage.getItem(ONBOARDING_KEYS.checklistDismissed);
}
