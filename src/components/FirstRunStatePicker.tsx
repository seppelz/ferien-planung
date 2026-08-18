import React, { useState } from 'react';
import { GermanState, stateNames } from '../types/GermanState';
import { PLAN_YEAR } from '../constants/planYear';

interface FirstRunStatePickerProps {
  isOpen: boolean;
  onSelect: (state: GermanState) => void;
}

const STATES = (Object.values(GermanState) as GermanState[])
  .filter((state) => state !== GermanState.ALL)
  .map((value) => ({ value, label: stateNames[value] }))
  .sort((a, b) => a.label.localeCompare(b.label, 'de'));

export const FirstRunStatePicker: React.FC<FirstRunStatePickerProps> = ({ isOpen, onSelect }) => {
  const [selectedState, setSelectedState] = useState<GermanState>(GermanState.BE);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-gray-900/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900">Bundesland für {PLAN_YEAR} wählen</h2>
        <p className="mt-2 text-sm text-gray-600">
          Danach siehst du die drei stärksten Brückentage und kannst sie mit einem Klick in den Plan übernehmen.
        </p>
        <div className="mt-4 max-h-72 space-y-1 overflow-y-auto">
          {STATES.map((state) => (
            <button
              key={state.value}
              type="button"
              onClick={() => setSelectedState(state.value)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                selectedState === state.value
                  ? 'bg-emerald-100 font-medium text-emerald-800'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {state.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelect(selectedState)}
          className="mt-4 w-full rounded-full bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-600"
        >
          Brückentage für {stateNames[selectedState]} zeigen
        </button>
      </div>
    </div>
  );
};
