import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { PLAN_YEAR, plannerUrl } from '@/constants/planYear';
import type { BridgeOpportunity } from '@/utils/bridgeDays';
import shared from '@/app/styles/shared.module.css';
import styles from './NextBridgeBanner.module.css';

interface NextBridgeBannerProps {
  stateName: string;
  stateSlug: string;
  opportunity: BridgeOpportunity;
}

export default function NextBridgeBanner({
  stateName,
  stateSlug,
  opportunity,
}: NextBridgeBannerProps) {
  const vacationLabel = format(parseISO(opportunity.vacationDate), 'EEEE, dd. MMMM yyyy', {
    locale: de,
  });

  return (
    <aside className={styles.banner} aria-labelledby="next-bridge-heading">
      <div className={styles.content}>
        <p className={styles.eyebrow}>Nächster Brückentag in {stateName}</p>
        <h2 id="next-bridge-heading" className={styles.title}>
          {opportunity.holidayName}
        </h2>
        <p className={styles.detail}>
          Urlaubstag am <strong>{vacationLabel}</strong> – {opportunity.displayRange} frei (
          {opportunity.efficiencyLabel}).
        </p>
        <Link href={plannerUrl(stateSlug)} className={shared.linkAccent}>
          Im Ferienplaner einplanen
        </Link>
      </div>
      <div className={shared.efficiencyBadge}>{opportunity.efficiencyLabel}</div>
    </aside>
  );
}
