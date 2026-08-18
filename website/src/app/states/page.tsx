import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllStates, getStateInfo } from '@/config';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { PLAN_YEAR, plannerUrl } from '@/constants/planYear';
import { getTopBridgeOpportunities, schoolHolidayDays } from '@/utils/bridgeDays';
import styles from './styles/StatesPage.module.css';

export const metadata: Metadata = {
  title: `Alle Bundesländer ${PLAN_YEAR} - Feiertage, Schulferien, Brückentage`,
  description: `Feiertage, Schulferien und die besten Brückentage ${PLAN_YEAR} für alle deutschen Bundesländer. Direkt in den Urlaubsplaner übernehmen.`,
};

export default function StatesPage() {
  const states = getAllStates().map(state => {
    const info = getStateInfo(state)!;
    const publicHolidays = info.holidays.filter(h => h.type === 'public' && h.start?.startsWith(String(PLAN_YEAR)));
    const topBridge = getTopBridgeOpportunities(info.holidays, 1)[0];
    return {
      id: state,
      ...info,
      publicHolidayCount: publicHolidays.length,
      schoolHolidayDayCount: schoolHolidayDays(info.schoolHolidays || []),
      bestBridge: topBridge,
    };
  });

  return (
    <>
      <Navigation />
      <main className={styles.statesPage}>
        <header className={styles.header}>
          <h1>Feiertage und Brückentage {PLAN_YEAR} nach Bundesland</h1>
          <p>
            Wählen Sie ein Bundesland, um gesetzliche Feiertage, Schulferien und konkrete Brückentag-Effizienz
            für {PLAN_YEAR} zu sehen – und den Planer unter {plannerUrl()} mit dem passenden Bundesland zu öffnen.
          </p>
        </header>

        <div className={styles.stateGrid}>
          {states.map(state => (
            <Link
              key={state.id}
              href={`/states/${state.id}`}
              className={styles.stateCard}
            >
              <div className={styles.stateSymbols}>
                <Image
                  src={`/images/states/${state.id}/flag.svg`}
                  alt={`Flagge von ${state.fullName}`}
                  width={60}
                  height={36}
                  className={styles.stateFlag}
                />
                <Image
                  src={`/images/states/${state.id}/coat.svg`}
                  alt={`Wappen von ${state.fullName}`}
                  width={32}
                  height={40}
                  className={styles.stateCoat}
                />
              </div>
              <div className={styles.stateInfo}>
                <h2>{state.fullName}</h2>
                <p className={styles.stateCapital}>
                  {state.publicHolidayCount} gesetzliche Feiertage {PLAN_YEAR}
                </p>
                <div className={styles.stateStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Schulferien</span>
                    <span className={styles.statValue}>{state.schoolHolidayDayCount} Tage</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Stärkster Brückentag</span>
                    <span className={styles.statValue}>
                      {state.bestBridge ? state.bestBridge.efficiencyLabel : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
