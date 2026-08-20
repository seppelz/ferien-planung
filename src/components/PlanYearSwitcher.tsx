import React from 'react';
import { AvailablePlanYear } from '../constants/planYear';
import { usePlanYear } from '../contexts/PlanYearContext';

interface PlanYearSwitcherProps {
  className?: string;
  compact?: boolean;
}

export const PlanYearSwitcher: React.FC<PlanYearSwitcherProps> = ({ className = '', compact = false }) => {
  const { planYear, availableYears, setPlanYear } = usePlanYear();

  return (
    <div
      className={className}
      role="group"
      aria-label="Planungsjahr wählen"
    >
      {availableYears.map((year) => {
        const active = year === planYear;
        return (
          <button
            key={year}
            type="button"
            onClick={() => setPlanYear(year as AvailablePlanYear)}
            aria-pressed={active}
            className={
              compact
                ? `rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    active
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
                  }`
                : undefined
            }
            data-year={year}
            data-active={active ? 'true' : 'false'}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};
