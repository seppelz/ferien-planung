import Link from 'next/link';
import { PLAN_YEAR, plannerUrl } from '@/constants/planYear';
import type { BridgeOpportunity } from '@/utils/bridgeDays';

interface BridgeDayListProps {
  stateName: string;
  stateSlug?: string;
  opportunities: BridgeOpportunity[];
  heading?: string;
}

export default function BridgeDayList({
  stateName,
  stateSlug,
  opportunities,
  heading,
}: BridgeDayListProps) {
  if (opportunities.length === 0) return null;

  return (
    <section
      aria-labelledby="bridge-days-heading"
      style={{
        margin: '0 0 2rem',
        padding: '1.5rem',
        background: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      }}
    >
      <h2 id="bridge-days-heading" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        {heading || `Beste Brückentage ${PLAN_YEAR} in ${stateName}`}
      </h2>
      <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
        Mit einem Urlaubstag mehrere freie Tage gewinnen – berechnet aus den gesetzlichen Feiertagen {PLAN_YEAR}.
      </p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
        {opportunities.map((opportunity) => (
          <li
            key={`${opportunity.vacationDate}-${opportunity.holidayDate}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              padding: '0.85rem 1rem',
              background: '#f7fafc',
              borderRadius: '0.75rem',
            }}
          >
            <div>
              <strong>{opportunity.holidayName}</strong>
              <div style={{ color: '#4a5568', fontSize: '0.95rem' }}>{opportunity.displayRange}</div>
            </div>
            <div style={{ fontWeight: 700, color: '#276749' }}>{opportunity.efficiencyLabel}</div>
          </li>
        ))}
      </ol>
      {stateSlug && (
        <p style={{ marginTop: '1rem' }}>
          <Link href={plannerUrl(stateSlug)} style={{ color: '#2b6cb0', fontWeight: 600 }}>
            Diese Brückentage in {stateName} {PLAN_YEAR} jetzt einplanen
          </Link>
        </p>
      )}
    </section>
  );
}
