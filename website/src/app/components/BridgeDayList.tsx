import Link from 'next/link';
import { PLAN_YEAR, plannerUrl } from '@/constants/planYear';
import type { BridgeOpportunity } from '@/utils/bridgeDays';
import shared from '@/app/styles/shared.module.css';
import styles from './BridgeDayList.module.css';

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
    <section className={`${shared.card} ${styles.section}`} aria-labelledby="bridge-days-heading">
      <h2 id="bridge-days-heading" className={styles.heading}>
        {heading || `Beste Brückentage ${PLAN_YEAR} in ${stateName}`}
      </h2>
      <p className={styles.intro}>
        Mit einem Urlaubstag mehrere freie Tage gewinnen – berechnet aus den gesetzlichen Feiertagen {PLAN_YEAR}.
      </p>
      <ol className={styles.list}>
        {opportunities.map((opportunity) => (
          <li key={`${opportunity.vacationDate}-${opportunity.holidayDate}`} className={styles.item}>
            <div>
              <strong className={styles.holidayName}>{opportunity.holidayName}</strong>
              <div className={styles.dateRange}>{opportunity.displayRange}</div>
            </div>
            <div className={shared.efficiencyBadge}>{opportunity.efficiencyLabel}</div>
          </li>
        ))}
      </ol>
      {stateSlug && (
        <p className={styles.footerLink}>
          <Link href={`/states/${stateSlug}/brueckentage-${PLAN_YEAR}/`} className={shared.linkAccent}>
            Alle Brückentage {PLAN_YEAR} in {stateName}
          </Link>
          {' · '}
          <Link href={plannerUrl(stateSlug)} className={shared.linkAccent}>
            Im Ferienplaner einplanen
          </Link>
        </p>
      )}
    </section>
  );
}
