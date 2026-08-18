import React from 'react';
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { BridgeDay } from '../types/holiday';

interface NextBridgeWidgetProps {
  bridgeDays: BridgeDay[];
  onAddBridge?: (bridge: BridgeDay) => void;
}

function todayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export const NextBridgeWidget: React.FC<NextBridgeWidgetProps> = ({ bridgeDays, onAddBridge }) => {
  const ref = todayIso();
  const upcoming = bridgeDays
    .filter((day) => day.date >= ref)
    .sort((a, b) => a.date.localeCompare(b.date));
  const next = upcoming[0];

  if (!next) return null;

  const label = format(parseISO(next.date), 'EEEE, dd. MMMM', { locale: de });

  return (
    <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Nächster Brückentag</p>
      <p className="mt-1 font-semibold">{label}</p>
      <p className="mt-1 text-amber-900">
        1 Urlaubstag = {next.totalDaysOff} Tage frei
      </p>
      {onAddBridge && (
        <button
          type="button"
          onClick={() => onAddBridge(next)}
          className="mt-2 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600"
        >
          Vorschlag übernehmen
        </button>
      )}
    </div>
  );
};
