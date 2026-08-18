import React, { useState } from 'react';
import { usePersonContext } from '../contexts/PersonContext';
import { buildShareUrl } from '../services/planShareService';

export const SharePlanButton: React.FC = () => {
  const { persons } = usePersonContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = buildShareUrl(persons);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Link kopieren:', url);
    }
  };

  const hasPlans =
    (persons.person1.vacationPlans?.length || 0) > 0 ||
    (persons.person2?.vacationPlans?.length || 0) > 0;

  if (!hasPlans) return null;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-900 hover:bg-sky-100"
    >
      {copied ? 'Link kopiert!' : 'Plan kopieren (Link teilen)'}
    </button>
  );
};
