import { useState } from 'react';
import { ONBOARDING_KEYS } from '../constants/onboardingKeys';

export const useFirstTimeUser = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const hasSeenTutorial = localStorage.getItem(ONBOARDING_KEYS.firstTimeUser);
    return !hasSeenTutorial;
  });

  const markTutorialAsSeen = () => {
    localStorage.setItem(ONBOARDING_KEYS.firstTimeUser, 'true');
    setIsFirstTimeUser(false);
  };

  return {
    isFirstTimeUser,
    markTutorialAsSeen,
  };
};
