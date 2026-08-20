import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  AVAILABLE_PLAN_YEARS,
  AvailablePlanYear,
  PLAN_YEAR_QUERY_KEY,
  resolveInitialPlanYear,
  storePlanYear,
} from '../constants/planYear';

interface PlanYearContextType {
  planYear: AvailablePlanYear;
  availableYears: readonly AvailablePlanYear[];
  setPlanYear: (year: AvailablePlanYear) => void;
}

const PlanYearContext = createContext<PlanYearContextType | null>(null);

function syncYearToUrl(year: AvailablePlanYear): void {
  const url = new URL(window.location.href);
  url.searchParams.set(PLAN_YEAR_QUERY_KEY, String(year));
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

export const PlanYearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planYear, setPlanYearState] = useState<AvailablePlanYear>(() => resolveInitialPlanYear());

  const setPlanYear = useCallback((year: AvailablePlanYear) => {
    setPlanYearState(year);
    storePlanYear(year);
    syncYearToUrl(year);
  }, []);

  const value = useMemo(
    () => ({
      planYear,
      availableYears: AVAILABLE_PLAN_YEARS,
      setPlanYear,
    }),
    [planYear, setPlanYear]
  );

  return <PlanYearContext.Provider value={value}>{children}</PlanYearContext.Provider>;
};

export function usePlanYear(): PlanYearContextType {
  const context = useContext(PlanYearContext);
  if (!context) {
    throw new Error('usePlanYear must be used within a PlanYearProvider');
  }
  return context;
}
