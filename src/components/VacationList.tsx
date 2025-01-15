import { format, isWeekend, addDays, subDays, isWithinInterval } from 'date-fns';
import { de } from 'date-fns/locale';
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
  onAddVacation?: (vacation: Omit<VacationPlan, 'id' | 'personId' | 'isVisible'>) => void;
  onRemoveVacation?: (vacation: VacationPlan) => void;
  state: GermanState;
}

const formatDateRange = (start: Date, end: Date): string => {
  if (isSameDayAs(start, end)) {
    return formatDisplayDate(start);
  }
  return `${formatDisplayDate(start, 'dd.MM.')} - ${formatDisplayDate(end)}`;
};

const isHolidayOnDate = (holidays: Holiday[], d: Date): boolean => {
  return holidays.some(h => 
    h.type === 'public' && isSameDayAs(h.date, d)
  );
};

const findConnectedFreeDays = (date: Date, direction: 'forward' | 'backward', holidays: Holiday[]): Date[] => {
  const dates: Date[] = [];
  let currentDay = direction === 'forward' ? addDays(date, 1) : subDays(date, 1);
  
  while (isWeekend(currentDay) || isHolidayOnDate(holidays, currentDay)) {
    dates.push(currentDay);
    currentDay = direction === 'forward' ? addDays(currentDay, 1) : subDays(currentDay, 1);
  }
  
  return dates;
};

export const VacationList: React.FC<VacationListProps> = ({
  vacations,
  holidays,
  onAddVacation,
  onRemoveVacation,
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
          dates: rec.bridgeDays.map(bd => toDate(bd.date)).filter((d): d is Date => d !== undefined),
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

  return (
    <div className="space-y-4">
      {/* Existing vacations */}
      {vacations.map((vacation, index) => (
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
            </div>
          </div>
          {onRemoveVacation && (
            <button
              onClick={() => onRemoveVacation(vacation)}
              className={`${theme.button.base} text-red-600 hover:text-red-700 ml-2`}
              aria-label="Urlaub entfernen"
            >
              <span className="sr-only">Entfernen</span>
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      ))}

      {/* Recommendations */}
      {unusedRecommendations.map((rec, index) => {
        const displayRange = formatDateRange(toDate(rec.start)!, toDate(rec.end)!);
        const efficiencyDisplay = `${rec.requiredDays} Urlaubstage • ${rec.totalDaysOff} Tage frei • ${Math.round(rec.efficiency * 100)}% Effizienz`;
        
        return (
          <button
            key={`${rec.start}-${rec.end}-${index}`}
            onClick={() => handleRecommendationClick({...rec, displayRange, efficiencyDisplay})}
            className={`${theme.card.base} hover:bg-gray-50 w-full text-left py-1.5 px-3`}
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
  );
}; 