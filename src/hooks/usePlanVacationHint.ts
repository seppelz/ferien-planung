import { useCallback, useEffect, useState } from 'react';
import { ONBOARDING_KEYS } from '../constants/onboardingKeys';

export function usePlanVacationHint(isReady: boolean) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(ONBOARDING_KEYS.planHintSeen)) return;
    if (!localStorage.getItem(ONBOARDING_KEYS.statePicked)) return;
    setShowHint(true);
  }, [isReady]);

  const dismissHint = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEYS.planHintSeen, 'true');
    setShowHint(false);
  }, []);

  return { showHint, dismissHint };
}
