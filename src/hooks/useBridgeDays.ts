import { useState, useEffect, useMemo } from 'react';
import { Holiday, BridgeDay } from '../types/holiday';
import { GermanState } from '../types/GermanState';
import { calculateBridgeDays } from '../services/bridgeDayService';
import { holidayService } from '../services/holidayService';
import { isSameDay } from 'date-fns';
import { usePlanYear } from '../contexts/PlanYearContext';

type CacheEntry = {
  holidays: Holiday[];
  bridgeDays: BridgeDay[];
  timestamp: number;
};

const bridgeDayCache: Record<string, CacheEntry> = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000;

function cacheKey(state: GermanState, year: number): string {
  return `${year}:${state}`;
}

export function useBridgeDays(state: GermanState | null) {
  const { planYear } = usePlanYear();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [bridgeDays, setBridgeDays] = useState<BridgeDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const memoizedState = useMemo(() => state, [state]);

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        if (!memoizedState) {
          setHolidays([]);
          setBridgeDays([]);
          setIsLoading(false);
          return;
        }

        const key = cacheKey(memoizedState, planYear);
        const now = Date.now();
        const cached = bridgeDayCache[key];

        if (cached && now - cached.timestamp < CACHE_DURATION) {
          setHolidays(cached.holidays);
          setBridgeDays(cached.bridgeDays);
          setIsLoading(false);
          return;
        }

        const [publicHolidays, schoolHolidays] = await Promise.all([
          holidayService.getPublicHolidays(memoizedState, planYear),
          holidayService.getSchoolHolidays(memoizedState, planYear),
        ]);

        const allHolidays: Holiday[] = [...publicHolidays];
        schoolHolidays.forEach((holiday) => {
          const exists = allHolidays.some(
            (h) =>
              h.date &&
              holiday.date &&
              isSameDay(new Date(h.date), new Date(holiday.date)) &&
              h.name === holiday.name
          );
          if (!exists) allHolidays.push(holiday);
        });

        const calculatedBridgeDays = calculateBridgeDays(publicHolidays, memoizedState);

        bridgeDayCache[key] = {
          holidays: allHolidays,
          bridgeDays: calculatedBridgeDays,
          timestamp: now,
        };

        setHolidays(allHolidays);
        setBridgeDays(calculatedBridgeDays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setHolidays([]);
        setBridgeDays([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, [memoizedState, planYear]);

  return useMemo(
    () => ({
      holidays,
      bridgeDays,
      isLoading,
      planYear,
    }),
    [holidays, bridgeDays, isLoading, planYear]
  );
}
