import React from 'react';

interface PlanVacationHintProps {
  show: boolean;
  onDismiss: () => void;
  variant?: 'sidebar' | 'mobile';
}

export const PlanVacationHint: React.FC<PlanVacationHintProps> = ({
  show,
  onDismiss,
  variant = 'sidebar',
}) => {
  if (!show) return null;

  const isMobile = variant === 'mobile';

  return (
    <div
      role="status"
      className={`relative rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-950 shadow-md ${
        isMobile ? 'mx-1 mb-2 px-3 py-2.5 text-xs' : 'mb-2 px-3 py-2.5 text-sm'
      }`}
    >
      <div className="flex items-start gap-2">
        <span
          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
          aria-hidden
        >
          i
        </span>
        <p className="flex-1 leading-snug">
          {isMobile ? (
            <>
              Tippe <strong>zwei Tage im Kalender</strong> an – Start und Ende deines Urlaubs.
            </>
          ) : (
            <>
              Klicke auf <strong>Urlaub planen</strong> und wähle anschließend Start- und Enddatum im
              Kalender.
            </>
          )}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-full p-1 text-emerald-700 hover:bg-emerald-100"
          aria-label="Hinweis schließen"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {!isMobile && (
        <span
          className="pointer-events-none absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-emerald-200 bg-emerald-50"
          aria-hidden
        />
      )}
    </div>
  );
};
