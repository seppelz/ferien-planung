import { isWithinInterval } from 'date-fns';
import { Holiday, BridgeDay } from '../types';
import { VacationPlan } from '../types/vacationPlan';
import { GermanState } from '../types/GermanState';
import { isSameDayAs, toDate, formatDisplayDate } from '../utils/dateUtils';
import { analyzeVacationOpportunities } from '../utils/smartVacationAnalysis';
import { useTheme } from '../hooks/useTheme';

interface VacationRecommendation {
  start: string;
  end: string;
  requiredDays: number;
  totalDaysOff: number;
  efficiency: number;
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  displayRange: string;
  efficiencyDisplay: string;
}

interface VacationListProps {
  vacations: VacationPlan[];
  holidays: Holiday[];
  onAddVacation?: (vacation: Omit<VacationPlan, 'id' | 'personId' | 'isVisible'> | { start: Date; end: Date }) => void;
  onRemoveVacation?: (vacation: VacationPlan) => void;
  state: GermanState;
  otherPersonVacations?: VacationPlan[];
  bridgeDays?: BridgeDay[];
  onToggleVisibility?: (id: string) => void;
  onRemove?: (id: string) => void;
  personId?: 1 | 2;
  availableVacationDays?: number;
}

const formatDateRange = (start: Date, end: Date): string => {
  if (isSameDayAs(start, end)) {
    return formatDisplayDate(start);
  }
  return `${formatDisplayDate(start, 'dd.MM.')} - ${formatDisplayDate(end)}`;
};

const overlaps = (a: VacationPlan, b: VacationPlan): boolean => {
  return a.start <= b.end && a.end >= b.start;
};

export const VacationList: React.FC<VacationListProps> = ({
  vacations,
  holidays,
  onAddVacation,
  onRemoveVacation,
  onRemove,
  otherPersonVacations = [],
  state
}) => {
  const theme = useTheme();

  const handleRecommendationClick = (rec: VacationRecommendation) => {
    const startDate = toDate(rec.start);
    const endDate = toDate(rec.end);
    if (!startDate || !endDate) return;

    onAddVacation?.({
      start: startDate,
      end: endDate,
      state,
      efficiency: {
        requiredDays: rec.requiredDays,
        gainedDays: rec.totalDaysOff,
        score: rec.efficiency,
        bridgeDayBenefit: rec.bridgeDays.length > 0 ? {
          dates: rec.bridgeDays.map(bd => toDate(bd.date)).filter((d): d is Date => d !== null),
          description: 'Brückentag'
        } : undefined
      }
    });
  };

  const recommendations = analyzeVacationOpportunities(holidays);
  const unusedRecommendations = recommendations.filter(rec => {
    const startDate = toDate(rec.start);
    const endDate = toDate(rec.end);
    if (!startDate || !endDate) return false;

    return !vacations.some(vacation =>
      isWithinInterval(startDate, { start: vacation.start, end: vacation.end }) ||
      isWithinInterval(endDate, { start: vacation.start, end: vacation.end })
    );
  });
  const topSuggestions = unusedRecommendations.slice(0, 3);
  const suggestionHeading = vacations.length === 0 ? 'Top 3 Brückentage' : 'Weitere Vorschläge';

  return (
    <div className="space-y-4">
      {vacations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Geplante Urlaube</h4>
          {vacations.map((vacation) => {
            const isShared = otherPersonVacations.some((other) => overlaps(vacation, other));
            return (
              <div
                key={`${vacation.start.toISOString()}-${vacation.end.toISOString()}`}
                className={`${theme.card.base} p-3 flex justify-between items-center`}
              >
                <div>
                  <div className="font-medium">
                    {formatDateRange(vacation.start, vacation.end)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {vacation.efficiency?.requiredDays} Urlaubstage • {vacation.efficiency?.gainedDays} Tage frei
                    {(vacation.efficiency?.score ?? 0) > 1 && ` • ${Math.round((vacation.efficiency?.score ?? 0) * 100)}% Effizienz`}
                    {isShared && ' • Gemeinsam frei'}
                  </div>
                </div>
                {(onRemoveVacation || onRemove) && (
                  <button
                    onClick={() => {
                      onRemoveVacation?.(vacation);
                      onRemove?.(vacation.id);
                    }}
                    className={`${theme.button.base} text-red-600 hover:text-red-700 ml-2`}
                    aria-label="Urlaub entfernen"
                  >
                    <span className="sr-only">Entfernen</span>
                    <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {topSuggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">{suggestionHeading}</h4>
          {vacations.length === 0 && (
            <p className="text-xs text-gray-500">Klicken, um den Vorschlag in den Kalender zu übernehmen.</p>
          )}
          {topSuggestions.map((rec, index) => {
            const displayRange = formatDateRange(toDate(rec.start)!, toDate(rec.end)!);
            const efficiencyDisplay = `${rec.requiredDays} Urlaubstage • ${rec.totalDaysOff} Tage frei • ${Math.round(rec.efficiency * 100)}% Effizienz`;

            return (
              <button
                key={`${rec.start}-${rec.end}-${index}`}
                onClick={() => handleRecommendationClick({...rec, displayRange, efficiencyDisplay})}
                className={`${theme.card.base} recommendation-item hover:bg-gray-50 w-full text-left py-1.5 px-3`}
                aria-label={`Brückentag-Empfehlung: ${displayRange}`}
              >
                <div className="font-medium">
                  {displayRange}
                </div>
                <div className="text-sm text-gray-600">
                  {efficiencyDisplay}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
