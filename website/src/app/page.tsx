import { Metadata } from 'next'
import Link from 'next/link'
import styles from './styles/LandingPage.module.css'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'
import { PLAN_YEAR, plannerUrl } from '@/constants/planYear'
import { getTopBridgeOpportunities } from '@/utils/bridgeDays'
import { berlin } from '@/config/states/berlin'
import BridgeDayList from '@/app/components/BridgeDayList'
import { LandingIcon } from '@/app/components/LandingIcon'
import { LANDING_BENEFITS, LANDING_FEATURES, LANDING_STEPS } from '@/data/landingContent'
import { LANDING_BRIDGE_HIGHLIGHTS } from '@/data/landingBridgeHighlights'

const FAQ_DATA = [
  {
    question: 'Was sind Brückentage?',
    answer: 'Brückentage sind Arbeitstage, die zwischen Feiertagen und Wochenenden liegen. Durch geschickte Planung dieser Tage können Sie Ihren Urlaub optimal verlängern.'
  },
  {
    question: 'Wie funktioniert die Zwei-Personen Planung?',
    answer: 'Sie können zwei verschiedene Bundesländer auswählen und separate Urlaubstage planen. Ideal für Paare oder Familien, die in unterschiedlichen Bundesländern arbeiten.'
  },
  {
    question: 'Ist die Nutzung kostenlos?',
    answer: 'Ja, alle Funktionen des Holiday Planners sind komplett kostenlos verfügbar. Es gibt keine versteckten Kosten oder Premium-Features.'
  },
  {
    question: 'Werden meine Daten gespeichert?',
    answer: 'Ihre Urlaubsplanung wird nur lokal in Ihrem Browser gespeichert. Es werden keine persönlichen Daten an Server übertragen.'
  },
];

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Holiday Planner',
  description: 'Intelligente Urlaubsplanung mit Brückentagen-Optimierung für Deutschland',
  url: 'https://ferien-planung.de',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Brückentage-Optimierung',
    'Zwei-Personen Planung',
    'Bundesland-spezifische Feiertage',
    'Schulferien-Integration',
    'ICS-Kalender-Export',
    'Kostenlose Nutzung',
  ],
};

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const landingBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Start',
      item: 'https://ferien-planung.de/',
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ferien-planung.de'),
  title: `Brückentage ${PLAN_YEAR} & Ferienplaner ${PLAN_YEAR} | Urlaubsplanung optimal`,
  description: `Brückentage ${PLAN_YEAR} optimal nutzen! Intelligenter Ferienplaner ${PLAN_YEAR} mit allen Feiertagen, Schulferien und Brückentag-Empfehlungen für Deutschland. Maximiere deinen Urlaub ${PLAN_YEAR} - Jetzt clever planen!`,
  keywords: [
    `Brückentage ${PLAN_YEAR}`,
    `Ferienplaner ${PLAN_YEAR}`,
    `Urlaubsplaner ${PLAN_YEAR}`,
    `Feiertage ${PLAN_YEAR} Deutschland`,
    `Brückentage ${PLAN_YEAR} Deutschland`,
    `Urlaubsplanung ${PLAN_YEAR}`,
    `Schulferien ${PLAN_YEAR}`,
    'Brückentage optimal nutzen',
    `Feiertage Kalender ${PLAN_YEAR}`,
    `Urlaubstage planen ${PLAN_YEAR}`
  ].join(', '),
  openGraph: {
    title: 'Ferien Planung - Dein Urlaubsplaner',
    description: 'Plane deinen Urlaub mit unserem Ferien Planer. Finde die besten Zeiträume für deinen Urlaub und maximiere deine freien Tage.',
    url: 'https://ferien-planung.de',
    siteName: 'Holiday Planner',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Holiday Planner - Intelligente Urlaubsplanung',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferien Planung - Dein Urlaubsplaner',
    description: 'Plane deinen Urlaub mit unserem Ferien Planer. Finde die besten Zeiträume für deinen Urlaub und maximiere deine freien Tage.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://ferien-planung.de',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'application/ld+json': JSON.stringify(webApplicationSchema),
  },
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingBreadcrumbSchema) }}
      />
      <Navigation />
      <main className={styles.landingPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>Brückentage {PLAN_YEAR} optimal nutzen – Ferienplaner {PLAN_YEAR}</h1>
              <p>
                Maximiere deinen Urlaub {PLAN_YEAR} mit unserem intelligenten Ferienplaner!
                Brückentage {PLAN_YEAR} clever planen und mit wenigen Urlaubstagen viele freie Tage gewinnen.
              </p>
              <Link href={plannerUrl()} className={`${styles.ctaButton} ${styles.ctaButtonHero}`}>
                Jetzt Urlaub {PLAN_YEAR} Planen
              </Link>
            </div>
            <div className={styles.heroIllustration}>
              <div className={styles.calendarStrip}>
                <div className={styles.calendarLabel}>
                  <span className={styles.multiplier}>1 Urlaubstag = 4 Tage frei!</span>
                </div>
                <div className={styles.weekRow}>
                  <div className={styles.dayLabel}>Mo</div>
                  <div className={styles.dayLabel}>Di</div>
                  <div className={styles.dayLabel}>Mi</div>
                  <div className={styles.dayLabel}>Do</div>
                  <div className={styles.dayLabel}>Fr</div>
                  <div className={styles.dayLabel}>Sa</div>
                  <div className={styles.dayLabel}>So</div>
                </div>
                <div className={styles.daysRow}>
                  <div className={styles.day}>3</div>
                  <div className={styles.day}>4</div>
                  <div className={styles.day}>5</div>
                  <div className={`${styles.day} ${styles.holiday}`}>6</div>
                  <div className={`${styles.day} ${styles.bridgeDay}`}>7</div>
                  <div className={`${styles.day} ${styles.weekend}`}>8</div>
                  <div className={`${styles.day} ${styles.weekend}`}>9</div>
                </div>
                <div className={styles.daysRow}>
                  <div className={styles.day}>10</div>
                  <div className={styles.day}>11</div>
                  <div className={styles.day}>12</div>
                  <div className={styles.day}>13</div>
                  <div className={styles.day}>14</div>
                  <div className={`${styles.day} ${styles.weekend}`}>15</div>
                  <div className={`${styles.day} ${styles.weekend}`}>16</div>
                </div>
                <div className={styles.legend}>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.legendDotHoliday}`} />
                    <span>Christi Himmelfahrt (6. Mai {PLAN_YEAR})</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.legendDotBridge}`} />
                    <span>Brückentag</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.legendDotWeekend}`} />
                    <span>Wochenende</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.bridgeDays2026}`} id="brueckentage">
          <div className={styles.sectionContent}>
            <BridgeDayList
              stateName="Berlin"
              stateSlug="berlin"
              opportunities={getTopBridgeOpportunities(berlin.holidays, 3)}
              heading={`Nächste starke Brückentage Berlin ${PLAN_YEAR}`}
            />

            <h2 className={styles.sectionTitle}>Brückentage {PLAN_YEAR}: So verlängern Sie Ihren Urlaub</h2>
            
            <div className={styles.introText}>
              <p>
                Das Jahr {PLAN_YEAR} bietet zahlreiche Möglichkeiten, mit wenigen Urlaubstagen viel Freizeit zu gewinnen.
                Viele gesetzliche Feiertage fallen günstig auf Wochentage. Mit unserem Ferienplaner {PLAN_YEAR}
                finden Sie die optimalen Brückentage für Ihr Bundesland.
              </p>
            </div>

            <div className={styles.bridgeDaysList}>
              {LANDING_BRIDGE_HIGHLIGHTS.map((highlight) => (
                <article key={highlight.title} className={styles.bridgeDayCard}>
                  <h3 className={styles.bridgeDayTitle}>
                    <span className={styles.iconBadge} aria-hidden>
                      <LandingIcon name={highlight.icon} size={20} />
                    </span>
                    <span>{highlight.title}</span>
                  </h3>
                  <div className={styles.bridgeDayContent}>
                    <div className={styles.recommendation}>
                      <strong>Empfehlung:</strong> {highlight.recommendation}
                    </div>
                    <div className={styles.benefit}>
                      <span className={styles.days}>1 Urlaubstag</span>
                      <span className={styles.benefitEquals} aria-hidden>=</span>
                      <span className={styles.freeDays}>4 Tage frei</span>
                    </div>
                    <p className={styles.explanation}>{highlight.explanation}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.seoText}>
              <h3>Ferienplaner {PLAN_YEAR}: Alle Feiertage im Überblick</h3>
              <p>
                Unser Ferienplaner {PLAN_YEAR} berücksichtigt alle gesetzlichen Feiertage in Deutschland und zeigt Ihnen
                automatisch die besten Brückentage für Ihr Bundesland. Mit der intelligenten Brückentag-Berechnung
                können Sie Ihren Jahresurlaub optimal planen und mit wenigen Urlaubstagen maximale Freizeit gewinnen.
              </p>
              <p>
                <strong>Wichtig:</strong> Nicht alle Feiertage gelten in allen Bundesländern. Unser Ferienplaner
                zeigt Ihnen nur die für Ihr Bundesland relevanten Feiertage und Brückentage {PLAN_YEAR} an.
              </p>
            </div>

            <div className={styles.ctaBox}>
              <h3>Jetzt Ihren Urlaub {PLAN_YEAR} optimal planen</h3>
              <p>Nutzen Sie unseren kostenlosen Ferienplaner, um die besten Brückentage {PLAN_YEAR} für Ihr Bundesland zu finden.</p>
              <Link href={plannerUrl()} className={styles.ctaButton}>
                Zum Ferienplaner {PLAN_YEAR}
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={`${styles.section} ${styles.features}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Unsere Features</h2>
            <div className={styles.featureGrid}>
              {LANDING_FEATURES.map((feature) => (
                <div key={feature.title} className={styles.featureCard}>
                  <div className={styles.featureIcon} aria-hidden>
                    <LandingIcon name={feature.icon} size={28} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={`${styles.section} ${styles.benefits}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Deine Vorteile</h2>
            <div className={styles.benefitsGrid}>
              {LANDING_BENEFITS.map((benefit) => (
                <div key={benefit.title} className={styles.benefitCard}>
                  <div className={styles.benefitIcon} aria-hidden>
                    <LandingIcon name={benefit.icon} size={28} />
                  </div>
                  <div className={styles.benefitValue}>{benefit.value}</div>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={`${styles.section} ${styles.howItWorks}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>So funktioniert&apos;s</h2>
            <div className={styles.stepsContainer}>
              {LANDING_STEPS.map((step, index) => (
                <div key={step.title} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepIcon} aria-hidden>
                    <LandingIcon name={step.icon} size={26} />
                  </div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < LANDING_STEPS.length - 1 && (
                    <div className={styles.stepConnector}>
                      <svg viewBox="0 0 24 24" className={styles.connectorArrow}>
                        <path d="M5 12h14m-4 4l4-4-4-4" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`${styles.section} ${styles.faq}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Häufige Fragen</h2>
            <div className={styles.faqGrid}>
              {FAQ_DATA.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = 'force-static'
export const revalidate = 86400

