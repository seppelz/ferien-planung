import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import BridgeDayList from '@/app/components/BridgeDayList';
import NextBridgeBanner from '@/app/components/NextBridgeBanner';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import { PLAN_YEAR, plannerUrl } from '@/constants/planYear';
import type { Holiday } from '@/types/holiday';
import {
  getBridgeOpportunities,
  getNextBridgeOpportunity,
} from '@/utils/bridgeDays';
import { getStateIds, getStateInfo } from '@/utils/stateUtils';
import shared from '@/app/styles/shared.module.css';
import styles from './BrueckentagePage.module.css';

type Props = {
  params: Promise<{ state: string }>;
};

export async function generateStaticParams(): Promise<{ state: string }[]> {
  return getStateIds().map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateId } = await params;
  const stateInfo = await getStateInfo(stateId);
  if (!stateInfo) return { title: 'Bundesland nicht gefunden' };

  const title = `Brückentage ${PLAN_YEAR} ${stateInfo.fullName} – alle Termine & Tipps`;
  const description = `Alle Brückentage ${PLAN_YEAR} in ${stateInfo.fullName}: Feiertage clever nutzen, Urlaub verlängern und freie Tage maximieren. Kostenloser Ferienplaner.`;

  return {
    metadataBase: new URL('https://ferien-planung.de'),
    title,
    description,
    alternates: {
      canonical: `/states/${stateId}/brueckentage-${PLAN_YEAR}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://ferien-planung.de/states/${stateId}/brueckentage-${PLAN_YEAR}/`,
      locale: 'de_DE',
      type: 'article',
    },
  };
}

function buildBreadcrumbSchema(stateId: string, stateName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://ferien-planung.de/' },
      { '@type': 'ListItem', position: 2, name: 'Bundesländer', item: 'https://ferien-planung.de/states/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: stateName,
        item: `https://ferien-planung.de/states/${stateId}/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `Brückentage ${PLAN_YEAR}`,
        item: `https://ferien-planung.de/states/${stateId}/brueckentage-${PLAN_YEAR}/`,
      },
    ],
  };
}

export default async function BrueckentagePage({ params }: Props) {
  const { state: stateId } = await params;
  const stateInfo = await getStateInfo(stateId);
  if (!stateInfo) notFound();

  const { fullName, holidays = [] } = stateInfo;

  const publicHolidays = (holidays as Holiday[]).filter((h) => {
    if (h.type !== 'public') return false;
    return h.start?.startsWith(String(PLAN_YEAR));
  });

  const allOpportunities = getBridgeOpportunities(publicHolidays);
  const nextBridge = getNextBridgeOpportunity(publicHolidays);
  const breadcrumbSchema = buildBreadcrumbSchema(stateId, fullName);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navigation />
      <main className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Start', href: '/' },
            { label: 'Bundesländer', href: '/states/' },
            { label: fullName, href: `/states/${stateId}/` },
            { label: `Brückentage ${PLAN_YEAR}` },
          ]}
        />

        <header className={styles.header}>
          <h1>
            Brückentage {PLAN_YEAR} in {fullName}
          </h1>
          <p>
            {allOpportunities.length} Brückentag-Möglichkeiten für {fullName} im Jahr {PLAN_YEAR}.
            Mit einem Urlaubstag mehrere freie Tage gewinnen – berechnet aus allen gesetzlichen
            Feiertagen in {fullName}.
          </p>
          <Link href={plannerUrl(stateId)} className={shared.ctaPrimary}>
            Brückentage in {fullName} planen
          </Link>
        </header>

        {nextBridge && (
          <NextBridgeBanner
            stateName={fullName}
            stateSlug={stateId}
            opportunity={nextBridge}
          />
        )}

        <BridgeDayList
          stateName={fullName}
          stateSlug={stateId}
          opportunities={allOpportunities}
          heading={`Alle Brückentage ${PLAN_YEAR} in ${fullName}`}
        />

        <section className={styles.seoBlock}>
          <h2>Brückentage {PLAN_YEAR} in {fullName} optimal nutzen</h2>
          <p>
            Brückentage liegen zwischen Feiertagen und Wochenenden. Nehmen Sie einen Urlaubstag davor
            oder danach, verlängern Sie das Wochenende ohne viele Urlaubstage zu verbrauchen. Unser
            Ferienplaner zeigt für {fullName} automatisch die effizientesten Termine.
          </p>
          <p>
            <Link href={`/states/${stateId}/`}>Feiertage und Schulferien {fullName} {PLAN_YEAR}</Link>
            {' · '}
            <Link href={plannerUrl(stateId)}>Zum interaktiven Ferienplaner</Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = 'force-static';
export const revalidate = 86400;
