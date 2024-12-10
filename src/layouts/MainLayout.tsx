import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { usePersonContext } from '../contexts/PersonContext';
import { VacationList } from '../components/VacationList';
import { GermanState, stateNames } from '../types/GermanState';
import { VacationDaysInput } from '../components/VacationDaysInput';
import { HomePage } from '../pages/HomePage';
import { KeyboardShortcutsHelper } from '../components/KeyboardShortcutsHelper';
import { useBridgeDays } from '../hooks/useBridgeDays';
import { eachDayOfInterval, isSameDay, isWithinInterval, isWeekend, subDays, addDays, differenceInDays, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Holiday } from '../types/holiday';
import { VacationPlan } from '../types/vacationPlan';
import { VacationEfficiencyInsights } from '../components/VacationEfficiencyInsights';
import { AppWrapper } from '../components/AppWrapper';
import { MobileExportModal } from '../components/Mobile/Export/MobileExportModal';
import { ExportService } from '../services/exportService';
import { TutorialModal } from '../components/Mobile/Tutorial/TutorialModal';
import { DesktopEfficiencyScore } from '../components/Desktop/DesktopEfficiencyScore';

// Helper function to download files
const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Generate ICS calendar data
const generateICSData = (persons: { person1: any; person2: any }) => {
  const events: Array<{
    start: Date;
    end: Date;
    summary: string;
    description: string;
  }> = [];

  // Add person 1 vacations
  if (persons.person1?.vacationPlans) {
    persons.person1.vacationPlans.forEach((vacation: VacationPlan) => {
      events.push({
        start: vacation.start,
        end: vacation.end,
        summary: 'Urlaub Person 1',
        description: `Urlaub in ${stateNames[vacation.state]}`
      });
    });
  }

  // Add person 2 vacations
  if (persons.person2?.vacationPlans) {
    persons.person2.vacationPlans.forEach((vacation: VacationPlan) => {
      events.push({
        start: vacation.start,
        end: vacation.end,
        summary: 'Urlaub Person 2',
        description: `Urlaub in ${stateNames[vacation.state]}`
      });
    });
  }

  return ExportService.createICSFile(events);
};

// Generate HR format data
const generateHRData = (persons: { person1: any; person2: any }) => {
  const lines = ['Urlaubsantrag\n'];

  // Helper to format date for HR
  const formatHRDate = (date: Date) => format(date, 'dd.MM.yyyy', { locale: de });

  // Add person 1 vacations
  if (persons.person1?.vacationPlans) {
    lines.push('\nPerson 1:');
    persons.person1.vacationPlans.forEach((vacation: VacationPlan) => {
      lines.push(
        `Von: ${formatHRDate(vacation.start)}`,
        `Bis: ${formatHRDate(vacation.end)}`,
        `Bundesland: ${stateNames[vacation.state]}`,
        ''
      );
    });
  }

  // Add person 2 vacations
  if (persons.person2?.vacationPlans) {
    lines.push('\nPerson 2:');
    persons.person2.vacationPlans.forEach((vacation: VacationPlan) => {
      lines.push(
        `Von: ${formatHRDate(vacation.start)}`,
        `Bis: ${formatHRDate(vacation.end)}`,
        `Bundesland: ${stateNames[vacation.state]}`,
        ''
      );
    });
  }

  return lines.join('\n');
};

// Generate holiday data
const generateHolidayData = (holidays1: Holiday[], holidays2: Holiday[]) => {
  const lines = ['Feiertagsübersicht 2025\n'];

  // Helper to format date for holidays
  const formatHolidayDate = (date: Date) => format(date, 'dd.MM.yyyy', { locale: de });

  // Add person 1 holidays
  lines.push('\nPerson 1:');
  holidays1.forEach(holiday => {
    lines.push(
      `${formatHolidayDate(new Date(holiday.date))} - ${holiday.name}`,
      `Typ: ${holiday.type}`,
      holiday.state ? `Bundesland: ${stateNames[holiday.state]}` : '',
      ''
    );
  });

  // Add person 2 holidays if different
  if (holidays2 && holidays2.length > 0) {
    lines.push('\nPerson 2:');
    holidays2.forEach(holiday => {
      lines.push(
        `${formatHolidayDate(new Date(holiday.date))} - ${holiday.name}`,
        `Typ: ${holiday.type}`,
        holiday.state ? `Bundesland: ${stateNames[holiday.state]}` : '',
        ''
      );
    });
  }

  return lines.join('\n');
};

const StateSelector = React.forwardRef<HTMLSelectElement, {
  value: GermanState;
  onChange: (value: GermanState) => void;
  label: string;
  personId: 1 | 2;
}>(({ value, onChange, label, personId }, ref) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-900">{label}</span>
    <select
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value as GermanState)}
      className={`px-2 py-1 bg-white/80 border-0 rounded-full text-sm text-gray-900
        shadow-sm hover:bg-white/90 transition-all cursor-pointer
        focus:ring-4 focus:ring-offset-2 focus:outline-none
        appearance-none bg-no-repeat bg-right pr-8 ${
          personId === 1 
            ? 'focus:ring-emerald-500/50' 
            : 'focus:ring-cyan-500/50'
        }`}
    >
      <option value="">Bundesland wählen</option>
      {Object.entries(GermanState).map(([key, value]) => (
        <option key={key} value={value}>{stateNames[value as GermanState]}</option>
      ))}
    </select>
  </div>
));

export const MainLayout: React.FC = () => {
  const [isSelectingVacation, setIsSelectingVacation] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<1 | 2 | undefined>(undefined);
  const [showSecondPerson, setShowSecondPerson] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { persons, updatePerson } = usePersonContext();
  
  // Add refs for focusing elements
  const person2StateRef = useRef<HTMLSelectElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const vacationListRef = useRef<HTMLDivElement>(null);

  // Move hook calls outside of conditional rendering
  const person1BridgeDays = useBridgeDays(persons.person1?.selectedState || null);
  const person2BridgeDays = useBridgeDays(persons.person2?.selectedState || null);

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle shortcuts if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '?':
          e.preventDefault();
          setShowKeyboardShortcuts(prev => !prev);
          break;
        case 'p':
          e.preventDefault();
          setShowSecondPerson(prev => {
            // Focus state selection after a short delay to allow for DOM update
            if (!prev) {
              setTimeout(() => {
                person2StateRef.current?.focus();
              }, 100);
            }
            return !prev;
          });
          break;
        case 'n':
          e.preventDefault();
          if (!isSelectingVacation) {
            setSelectedPersonId(1);
            setIsSelectingVacation(true);
            // Focus January 1st after a short delay
            setTimeout(() => {
              const jan1Button = calendarRef.current?.querySelector('[data-date="2025-01-01"]') as HTMLButtonElement;
              if (jan1Button) {
                jan1Button.focus();
              }
            }, 100);
          }
          break;
        case 'm':
          e.preventDefault();
          if (!isSelectingVacation) {
            setShowSecondPerson(true); // Ensure Person 2 is visible
            setSelectedPersonId(2);
            setIsSelectingVacation(true);
            // Focus January 1st after a short delay
            setTimeout(() => {
              const jan1Button = calendarRef.current?.querySelector('[data-date="2025-01-01"]') as HTMLButtonElement;
              if (jan1Button) {
                jan1Button.focus();
              }
            }, 100);
          }
          break;
        case 'q':
        case 'w':
          e.preventDefault();
          const personId = e.key === 'q' ? 1 : 2;
          if (personId === 2 && !showSecondPerson) {
            setShowSecondPerson(true);
          }
          // Focus the first recommendation in the vacation list
          setTimeout(() => {
            const sidebarSection = vacationListRef.current?.querySelector(`[data-person="${personId}"]`);
            const firstRecommendation = sidebarSection?.querySelector('.recommendation-item') as HTMLElement;
            if (firstRecommendation) {
              firstRecommendation.focus();
            }
          }, 100);
          break;
        case 'Escape':
          e.preventDefault();
          // Close keyboard shortcuts if open
          if (showKeyboardShortcuts) {
            setShowKeyboardShortcuts(false);
          }
          // Cancel vacation selection if active
          if (isSelectingVacation) {
            setIsSelectingVacation(false);
            setSelectedPersonId(undefined);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showKeyboardShortcuts, isSelectingVacation, selectedPersonId]);

  // Memoize holiday data to prevent unnecessary re-renders
  const holidayData = useMemo(() => {
    return {
      person1: {
        holidays: person1BridgeDays.holidays || [],
        bridgeDays: person1BridgeDays.bridgeDays || []
      },
      person2: {
        holidays: person2BridgeDays.holidays || [],
        bridgeDays: person2BridgeDays.bridgeDays || []
      }
    };
  }, [person1BridgeDays, person2BridgeDays]);

  // Memoize vacation calculation functions
  const calculateRequiredDays = useCallback((start: Date, end: Date, holidays: Holiday[]) => {
    const allDays = eachDayOfInterval({ start, end });
    return allDays.reduce((count, d) => {
      if (isWeekend(d)) return count;
      const isPublicHoliday = holidays.some(h => 
        h.type === 'public' && isSameDay(new Date(h.date), d)
      );
      return isPublicHoliday ? count : count + 1;
    }, 0);
  }, []);

  const findConnectedFreeDays = useCallback((
    date: Date,
    direction: 'forward' | 'backward',
    holidays: Holiday[]
  ): Date => {
    let currentDay = direction === 'forward' ? addDays(date, 1) : subDays(date, 1);
    let lastFreeDay = date;

    while (isWeekend(currentDay) || holidays.some(h => 
      h.type === 'public' && isSameDay(new Date(h.date), currentDay)
    )) {
      lastFreeDay = currentDay;
      currentDay = direction === 'forward' ? addDays(currentDay, 1) : subDays(currentDay, 1);
    }

    return lastFreeDay;
  }, []);

  const calculateVacationEfficiency = useCallback((
    start: Date,
    end: Date,
    holidays: Holiday[]
  ) => {
    const requiredDays = calculateRequiredDays(start, end, holidays);
    const displayStart = findConnectedFreeDays(start, 'backward', holidays);
    const displayEnd = findConnectedFreeDays(end, 'forward', holidays);
    const gainedDays = differenceInDays(displayEnd, displayStart) + 1;

    return {
      requiredDays,
      gainedDays,
      displayStart,
      displayEnd,
      efficiency: gainedDays / requiredDays
    };
  }, [calculateRequiredDays, findConnectedFreeDays]);

  // Calculate efficiency for a person's vacations
  const calculatePersonEfficiency = useCallback((
    vacations: VacationPlan[],
    holidays: Holiday[]
  ) => {
    if (!vacations?.length) return 1;
    
    let totalRequiredDays = 0;
    let totalGainedDays = 0;
    
    vacations.forEach(vacation => {
      const days = eachDayOfInterval({ start: vacation.start, end: vacation.end });
      // Required days are workdays that aren't public holidays
      const requiredDays = days.filter(d => 
        !isWeekend(d) && !holidays.some(h => 
          h.type === 'public' && isSameDay(new Date(h.date), d)
        )
      ).length;
      
      // Gained days are the total consecutive days off (including weekends and holidays)
      const gainedDays = days.length;
      
      totalRequiredDays += requiredDays;
      totalGainedDays += gainedDays;
    });
    
    return totalRequiredDays > 0 ? totalGainedDays / totalRequiredDays : 1;
  }, []);

  const renderPersonConfig = (personId: 1 | 2) => {
    const person = personId === 1 ? persons.person1 : persons.person2;
    
    if (personId === 2 && !showSecondPerson) return null;

    return (
      <div className="flex items-center justify-between gap-4 p-2">
        {/* State Selection */}
        <div className="flex items-center gap-2">
          <StateSelector
            value={person?.selectedState || GermanState.BE}
            onChange={(value) => updatePerson(personId, { selectedState: value })}
            label={`Person ${personId}`}
            personId={personId}
            ref={personId === 2 ? person2StateRef : undefined}
          />
        </div>

        {/* Vacation Days Input and Add Button */}
        {person?.selectedState && (
          <>
            <div className="flex items-center gap-4">
              <div className={`text-sm font-medium ${
                personId === 1 ? 'text-emerald-600' : 'text-cyan-600'
              }`}>
                <VacationDaysInput
                  value={person.availableVacationDays}
                  onChange={(days) => updatePerson(personId, { availableVacationDays: days })}
                  personId={personId}
                />
                Urlaubstage
              </div>
            </div>

            {/* Add Vacation Button */}
            <button
              onClick={() => {
                setSelectedPersonId(personId);
                setIsSelectingVacation(true);
                // Focus January 1st after a short delay when clicking the button
                setTimeout(() => {
                  const jan1Button = calendarRef.current?.querySelector('[data-date="2025-01-01"]') as HTMLButtonElement;
                  if (jan1Button) {
                    jan1Button.focus();
                  }
                }, 100);
              }}
              className={`px-3 py-1 text-sm font-medium text-white rounded-full transition-colors ${
                personId === 1
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-cyan-500 hover:bg-cyan-600'
              }`}
            >
              + Urlaub planen
            </button>
          </>
        )}
      </div>
    );
  };

  const handleStartVacationSelection = (personId: 1 | 2) => {
    if (personId === 2 && !showSecondPerson) {
      setShowSecondPerson(true);
      // If person2 doesn't exist yet, initialize it
      if (!persons.person2) {
        updatePerson(2, {
          selectedState: persons.person1.selectedState,
          availableVacationDays: 30,
          vacationPlans: []
        });
      }
    }
    setIsSelectingVacation(true);
    setSelectedPersonId(personId);
  };

  const handleVacationSelectComplete = () => {
    setIsSelectingVacation(false);
    setSelectedPersonId(undefined);
  };

  const toggleSecondPerson = () => {
    if (showSecondPerson) {
      updatePerson(2, { selectedState: undefined });
      setShowSecondPerson(false);
    } else {
      setShowSecondPerson(true);
      // If person2 doesn't exist yet, initialize it
      if (!persons.person2) {
        updatePerson(2, {
          selectedState: persons.person1.selectedState,
          availableVacationDays: 30,
          vacationPlans: []
        });
      }
    }
  };

  const renderLegend = (personId: 1 | 2) => {
    const colors = {
      holiday: personId === 1 ? '#EF4444' : '#A855F7',     // red-500 : purple-500
      bridge: personId === 1 ? '#FB923C' : '#EC4899',      // orange-400 : pink-400
      school: personId === 1 ? '#6366F1' : '#EAB308',      // indigo-500 : yellow-500
      vacation: personId === 1 ? '#22C55E' : '#3B82F6'     // green-500 : blue-500
    };

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.holiday }} />
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.bridge }} />
          <span className="text-xs text-gray-600">Feiertage & Brücken</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.school }} />
          <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: colors.vacation }} />
          <span className="text-xs text-gray-600">Schule & Urlaub</span>
        </div>
      </div>
    );
  };

  const renderSidebarContent = (personId: 1 | 2) => {
    const person = personId === 1 ? persons.person1 : persons.person2;
    const { holidays: sidebarHolidays, bridgeDays } = personId === 1 ? person1BridgeDays : person2BridgeDays;
    const colors = personId === 1 ? 'emerald' : 'cyan';
    
    if (personId === 2 && !showSecondPerson) return null;

    const efficiency = calculatePersonEfficiency(
      person?.vacationPlans || [],
      [...(sidebarHolidays || []), ...(bridgeDays || [])]
    );

    const handleVacationAdd = (start: Date, end: Date) => {
      const person = personId === 2 ? persons.person2 : persons.person1;
      if (!person) return;

      const newVacation: VacationPlan = {
        id: Math.random().toString(36).substr(2, 9),
        start,
        end,
        isVisible: true,
        personId,
        state: person.selectedState
      };

      updatePerson(personId, {
        vacationPlans: [...(person.vacationPlans || []), newVacation]
      });
    };

    return (
      <div className="space-y-3" data-person={personId}>
        {/* Person Header with Legend */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-medium text-gray-900">{personId === 1 ? 'Ich' : 'Person 2'}</h3>
            {renderLegend(personId)}
          </div>
        </div>

        {/* Efficiency Score */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <DesktopEfficiencyScore efficiency={efficiency} personId={personId} />
        </div>

        {/* Vacation Days Input */}
        <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
          <span className="text-sm text-gray-600">Urlaubstage pro Jahr:</span>
          <VacationDaysInput
            value={person?.availableVacationDays || 30}
            onChange={(days) => updatePerson(personId, { availableVacationDays: days })}
            personId={personId}
          />
        </div>

        {/* Add Vacation Button */}
        <button
          onClick={() => handleStartVacationSelection(personId)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-${colors}-500 hover:bg-${colors}-600 text-white rounded-lg transition-colors`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Urlaub planen</span>
        </button>

        {/* Selection Info */}
        {isSelectingVacation && selectedPersonId === personId && (
          <div className={`${
            personId === 1 ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'
          } p-2 rounded-lg text-xs`}>
            Bitte wählen Sie das Startdatum Ihres Urlaubs
          </div>
        )}

        {/* Vacation List with Recommendations */}
        <div ref={vacationListRef} data-person={personId} className="focus-within:outline-none">
          <VacationList
            vacations={person?.vacationPlans || []}
            otherPersonVacations={personId === 1 ? persons.person2?.vacationPlans : persons.person1?.vacationPlans}
            holidays={[...(sidebarHolidays || []), ...(bridgeDays || [])]}
            bridgeDays={bridgeDays || []}
            onToggleVisibility={(id) => {
              const updatedPlans = person?.vacationPlans.map(plan =>
                plan.id === id ? { ...plan, isVisible: !plan.isVisible } : plan
              );
              if (updatedPlans) {
                updatePerson(personId, { vacationPlans: updatedPlans });
              }
            }}
            onRemove={(id) => {
              const updatedPlans = person?.vacationPlans.filter(plan => plan.id !== id);
              if (updatedPlans) {
                updatePerson(personId, { vacationPlans: updatedPlans });
              }
            }}
            personId={personId}
            availableVacationDays={person?.availableVacationDays || 30}
            onAddVacation={handleVacationAdd}
            state={person?.selectedState || GermanState.BE}
          />
        </div>
      </div>
    );
  };

  const handleAddVacation = useCallback((start: Date, end: Date) => {
    const person = selectedPersonId === 2 ? persons.person2 : persons.person1;
    if (!person) return;

    const holidays = holidayData[selectedPersonId === 2 ? 'person2' : 'person1'].holidays;
    const { requiredDays, gainedDays, displayStart, displayEnd, efficiency } = 
      calculateVacationEfficiency(start, end, holidays);

    const newVacation: VacationPlan = {
      id: Math.random().toString(36).substr(2, 9),
      start,
      end,
      isVisible: true,
      personId: selectedPersonId || 1,
      state: person.selectedState,
      efficiency: {
        requiredDays,
        gainedDays,
        score: efficiency
      }
    };

    updatePerson(selectedPersonId || 1, {
      vacationPlans: [...(person.vacationPlans || []), newVacation]
    });
  }, [selectedPersonId, persons, holidayData, calculateVacationEfficiency, updatePerson]);

  const handleExport = async (type: 'ics' | 'hr' | 'celebration') => {
    switch (type) {
      case 'ics':
        // Export as iCal
        const icsData = generateICSData(persons);
        downloadFile(icsData, 'urlaubsplan.ics', 'text/calendar');
        break;
      case 'hr':
        // Export as HR format PDF
        if (persons.person2?.vacationPlans) {
          // If we have two persons, ask which one to export
          const personId = await new Promise<1 | 2>((resolve) => {
            const confirmPerson = window.confirm('Für Person 2 exportieren? (Abbrechen für Person 1)');
            resolve(confirmPerson ? 2 : 1);
          });

          const hrPdf = ExportService.createHRDocument(
            personId === 1 ? persons.person1.vacationPlans : persons.person2.vacationPlans,
            personId,
            personId === 1 ? holidayData.person1.holidays : holidayData.person2.holidays
          );
          await ExportService.downloadPDF(hrPdf, `urlaubsantrag_person${personId}.pdf`);
        } else {
          // If only person 1 exists, export directly
          const hrPdf = ExportService.createHRDocument(
            persons.person1.vacationPlans,
            1,
            holidayData.person1.holidays
          );
          await ExportService.downloadPDF(hrPdf, 'urlaubsantrag.pdf');
        }
        break;
      case 'celebration':
        // Export holidays as PDF
        const celebrationPdf = ExportService.createCelebrationDocument(
          persons.person1.vacationPlans,
          1,
          holidayData.person1.holidays,
          persons.person2?.vacationPlans || [],
          holidayData.person2.holidays || [],
          {
            person1State: persons.person1.selectedState,
            person2State: persons.person2?.selectedState,
            showSharedAnalysis: !!persons.person2?.selectedState
          }
        );
        await ExportService.downloadPDF(celebrationPdf, 'urlaubsplanung.pdf');
        break;
    }
    setShowExportModal(false);
  };

  return (
    <AppWrapper
      mobileProps={persons.person1?.selectedState ? {
        personId: selectedPersonId || 1,
        selectedState: persons.person1.selectedState,
        onStateChange: (value) => updatePerson(selectedPersonId || 1, { selectedState: value }),
        holidays: selectedPersonId === 2 ? holidayData.person2.holidays : holidayData.person1.holidays,
        bridgeDays: selectedPersonId === 2 ? holidayData.person2.bridgeDays : holidayData.person1.bridgeDays,
        vacationPlans: (selectedPersonId === 2 ? persons.person2?.vacationPlans : persons.person1.vacationPlans) || [],
        onAddVacation: handleAddVacation,
        onRemoveVacation: (id) => {
          const person = selectedPersonId === 2 ? persons.person2 : persons.person1;
          const updatedPlans = person?.vacationPlans.filter(plan => plan.id !== id);
          if (updatedPlans) {
            updatePerson(selectedPersonId || 1, { vacationPlans: updatedPlans });
          }
        },
        onPersonSwitch: () => {
          setShowSecondPerson(true);
          const nextPersonId = selectedPersonId === 1 ? 2 : 1;
          setSelectedPersonId(nextPersonId);
          
          // Initialize person 2 if not already initialized
          if (nextPersonId === 2 && !persons.person2?.selectedState) {
            updatePerson(2, {
              selectedState: persons.person1.selectedState,
              availableVacationDays: 30,
              vacationPlans: []
            });
          }
        },
        availableVacationDays: selectedPersonId === 2 ? persons.person2?.availableVacationDays || 30 : persons.person1.availableVacationDays || 30,
        onAvailableDaysChange: (days: number) => {
          updatePerson(selectedPersonId || 1, { availableVacationDays: days });
        },
        otherPersonVacations: selectedPersonId === 2 ? persons.person1?.vacationPlans || [] : persons.person2?.vacationPlans || []
      } : undefined}
    >
      <div className="h-screen bg-gray-50 flex flex-col">
        <KeyboardShortcutsHelper
          isOpen={showKeyboardShortcuts}
          onClose={() => setShowKeyboardShortcuts(false)}
        />
        
        <MobileExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          hasTwoPersons={!!persons.person2?.vacationPlans}
        />

        <TutorialModal
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
        />
        
        {/* Header */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b z-50">
          <div className="w-full px-2 h-12 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 min-w-[80px]">
              <div className="w-7 h-7">
                <img src="/favicon.svg" alt="Logo" className="w-full h-full" />
              </div>
              <span className="text-lg font-medium text-gray-900">
                Urlaub
              </span>
            </div>

            {/* Center Content */}
            <div className="flex items-center gap-4">
              {/* Person 2 Toggle */}
              <button
                onClick={toggleSecondPerson}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  showSecondPerson
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={showSecondPerson 
                      ? "M20 12H4" 
                      : "M12 4v16m8-8H4"} 
                  />
                </svg>
                <span>Person 2</span>
              </button>

              {/* Year Display */}
              <div className="text-sm font-medium text-gray-600">2025</div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export</span>
              </button>

              <button
                onClick={() => setShowTutorial(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Tutorial</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 w-full px-2 py-2 flex gap-4 min-h-0">
          {/* Left Sidebar - Person 1 */}
          <aside className="w-80 space-y-2">
            {renderSidebarContent(1)}
          </aside>

          {/* Calendar */}
          <div ref={calendarRef} className="flex-1 overflow-auto">
            <HomePage
              isSelectingVacation={isSelectingVacation}
              selectedPersonId={selectedPersonId}
              onVacationSelectComplete={handleVacationSelectComplete}
            />
          </div>

          {/* Right Sidebar - Person 2 */}
          {showSecondPerson && (
            <aside className="w-80 space-y-2">
              {renderSidebarContent(2)}
            </aside>
          )}
        </main>
      </div>
    </AppWrapper>
  );
}; 