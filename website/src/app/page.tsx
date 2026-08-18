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

const TESTIMONIALS_DATA = [
  {
    name: 'Sarah M.',
    role: 'Projektmanagerin',
    text: 'Dank der Zwei-Personen Planung können mein Partner und ich unseren Urlaub perfekt aufeinander abstimmen.',
    rating: 5
  },
  {
    name: 'Michael K.',
    role: 'Lehrer',
    text: 'Die Berücksichtigung der Schulferien ist super praktisch. So kann ich meinen Urlaub optimal mit dem Schuljahr koordinieren.',
    rating: 5
  },
  {
    name: 'Lisa B.',
    role: 'Teamleiterin',
    text: 'Die Effizienzberechnung hat mir geholfen, aus meinen 30 Urlaubstagen das Maximum herauszuholen.',
    rating: 5
  }
];

// Add JSON-LD structured data
const structuredData = {
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
    'Kostenlose Nutzung'
  ],
  review: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '3',
    bestRating: '5',
    worstRating: '1'
  }
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ferien-planung.de'),
  title: 'Brückentage 2026 & Ferienplaner 2026 | Urlaubsplanung optimal',
  description: 'Brückentage 2026 optimal nutzen! Intelligenter Ferienplaner 2026 mit allen Feiertagen, Schulferien und Brückentag-Empfehlungen für Deutschland. Maximiere deinen Urlaub 2026 - Jetzt clever planen!',
  keywords: [
    'Brückentage 2026',
    'Ferienplaner 2026',
    'Urlaubsplaner 2026',
    'Feiertage 2026 Deutschland',
    'Brückentage 2026 Deutschland',
    'Urlaubsplanung 2026',
    'Schulferien 2026',
    'Brückentage optimal nutzen',
    'Feiertage Kalender 2026',
    'Urlaubstage planen 2026'
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
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'application/ld+json': JSON.stringify(structuredData),
  }
}

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <main className={styles.landingPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>Brückentage 2026 optimal nutzen – Ferienplaner 2026</h1>
              <p>
                Maximiere deinen Urlaub 2026 mit unserem intelligenten Ferienplaner! 
                Brückentage 2026 clever planen und mit wenigen Urlaubstagen viele freie Tage gewinnen.
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
                  <div className={styles.day}>11</div>
                  <div className={styles.day}>12</div>
                  <div className={styles.day}>13</div>
                  <div className={`${styles.day} ${styles.holiday}`}>14</div>
                  <div className={`${styles.day} ${styles.bridgeDay}`}>15</div>
                  <div className={`${styles.day} ${styles.weekend}`}>16</div>
                  <div className={`${styles.day} ${styles.weekend}`}>17</div>
                </div>
                <div className={styles.daysRow}>
                  <div className={styles.day}>18</div>
                  <div className={styles.day}>19</div>
                  <div className={styles.day}>20</div>
                  <div className={styles.day}>21</div>
                  <div className={styles.day}>22</div>
                  <div className={`${styles.day} ${styles.weekend}`}>23</div>
                  <div className={`${styles.day} ${styles.weekend}`}>24</div>
                </div>
                <div className={styles.legend}>
                  <div className={styles.legendItem}>
                    <span className={`${styles.legendDot} ${styles.legendDotHoliday}`} />
                    <span>Christi Himmelfahrt (14. Mai 2026)</span>
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

            <h2 className={styles.sectionTitle}>Brückentage 2026: So verlängern Sie Ihren Urlaub</h2>
            
            <div className={styles.introText}>
              <p>
                Das Jahr 2026 bietet zahlreiche Möglichkeiten, mit wenigen Urlaubstagen viel Freizeit zu gewinnen. 
                Viele gesetzliche Feiertage fallen günstig auf Wochentage. Mit unserem Ferienplaner 2026 
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
              <h3>Ferienplaner 2026: Alle Feiertage im Überblick</h3>
              <p>
                Unser Ferienplaner 2026 berücksichtigt alle gesetzlichen Feiertage in Deutschland und zeigt Ihnen 
                automatisch die besten Brückentage für Ihr Bundesland. Mit der intelligenten Brückentag-Berechnung 
                können Sie Ihren Jahresurlaub optimal planen und mit wenigen Urlaubstagen maximale Freizeit gewinnen.
              </p>
              <p>
                <strong>Wichtig:</strong> Nicht alle Feiertage gelten in allen Bundesländern. Unser Ferienplaner 
                zeigt Ihnen nur die für Ihr Bundesland relevanten Feiertage und Brückentage 2026 an.
              </p>
            </div>

            <div className={styles.ctaBox}>
              <h3>Jetzt Ihren Urlaub 2026 optimal planen</h3>
              <p>Nutzen Sie unseren kostenlosen Ferienplaner, um die besten Brückentage 2026 für Ihr Bundesland zu finden.</p>
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

        {/* Testimonials Section */}
        <section className={`${styles.section} ${styles.testimonials}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Das sagen unsere Nutzer</h2>
            <div className={styles.testimonialsGrid}>
              {TESTIMONIALS_DATA.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.testimonialContent}>
                    <p>{testimonial.text}</p>
                    <div className={styles.testimonialRating}>
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                  <div className={styles.testimonialAuthor}>
                    <p>
                      {testimonial.name}
                      <span className={styles.testimonialRole}>{testimonial.role}</span>
                    </p>
                  </div>
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

