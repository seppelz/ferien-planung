import { Metadata } from 'next'
import Link from 'next/link'
import styles from './styles/LandingPage.module.css'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'

// Constants from old landing page
const FEATURES = [
  {
    icon: '🗓️',
    title: 'Brückentage-Optimierung',
    description: 'Intelligente Berechnung der effizientesten Urlaubstage mit Berücksichtigung von Feiertagen.',
  },
  {
    icon: '👥',
    title: 'Zwei-Personen Planung',
    description: 'Plane deinen Urlaub gemeinsam mit Partner oder Familie, mit separater Verwaltung pro Person.',
  },
  {
    icon: '🏛️',
    title: 'Bundesland-spezifisch',
    description: 'Alle Feiertage für jedes Bundesland, inklusive Schulferien als zusätzliche Information.',
  },
  {
    icon: '⌨️',
    title: 'Schnelle Bedienung',
    description: 'Effiziente Tastatursteuerung für schnelle und komfortable Urlaubsplanung.',
  },
];

const BENEFITS = [
  {
    icon: '📊',
    title: 'Maximale Effizienz',
    value: 'Bis zu 24 Tage',
    description: 'Verlängere deinen Urlaub durch optimale Nutzung von Brückentagen und Feiertagen.',
  },
  {
    icon: '🚀',
    title: 'Schnelle Planung',
    value: '< 5 Minuten',
    description: 'Plane deinen gesamten Jahresurlaub in weniger als 5 Minuten.',
  },
  {
    icon: '🎁',
    title: 'Kostenlos',
    value: '100% Gratis',
    description: 'Alle Features kostenlos verfügbar, keine versteckten Kosten.',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    icon: '🗺️',
    title: 'Bundesland auswählen',
    description: 'Wähle dein Bundesland aus, um alle relevanten Feiertage zu sehen.',
  },
  {
    icon: '👥',
    title: 'Optional: Zweite Person',
    description: 'Plane gemeinsam mit Partner oder Familie durch Aktivierung der Zwei-Personen Ansicht.',
  },
  {
    icon: '📅',
    title: 'Brückentage anzeigen',
    description: 'Lass dir die effizientesten Brückentage für dein Bundesland anzeigen.',
  },
  {
    icon: '✨',
    title: 'Urlaub optimieren',
    description: 'Wähle die Brückentage aus und optimiere deinen Jahresurlaub mit wenigen Klicks.',
  },
];

const PWA_FEATURES = [
  {
    icon: '🔌',
    title: 'Offline verfügbar',
    description: 'Nutze die App auch ohne Internetverbindung. Alle Funktionen bleiben erhalten.',
  },
  {
    icon: '📱',
    title: 'App Installation',
    description: 'Installiere die App direkt auf deinem Smartphone oder Desktop für schnellen Zugriff.',
  },
  {
    icon: '🚀',
    title: 'Schnellzugriff',
    description: 'Greife blitzschnell auf deine Urlaubsplanung zu - direkt vom Homescreen.',
  },
  {
    icon: '🔄',
    title: 'Automatische Updates',
    description: 'Bleibe immer auf dem neuesten Stand mit automatischen App-Updates.',
  },
];

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
    'Offline-Verfügbarkeit',
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
              <Link href="/app" className={styles.ctaButton}>
                Jetzt Urlaub 2026 Planen
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
                  <div className={styles.day}>29</div>
                  <div className={styles.day}>30</div>
                  <div className={styles.day}>1</div>
                  <div className={`${styles.day} ${styles.bridgeDay}`}>2</div>
                  <div className={`${styles.day} ${styles.holiday}`}>3</div>
                  <div className={`${styles.day} ${styles.weekend}`}>4</div>
                  <div className={`${styles.day} ${styles.weekend}`}>5</div>
                </div>
                <div className={styles.daysRow}>
                  <div className={styles.day}>6</div>
                  <div className={styles.day}>7</div>
                  <div className={styles.day}>8</div>
                  <div className={styles.day}>9</div>
                  <div className={styles.day}>10</div>
                  <div className={`${styles.day} ${styles.weekend}`}>11</div>
                  <div className={`${styles.day} ${styles.weekend}`}>12</div>
                </div>
                <div className={styles.legend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#2D7D9A' }}></span>
                    <span>Tag der Deutschen Einheit</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: '#FFB347' }}></span>
                    <span>Brückentag</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: 'rgba(45, 125, 154, 0.05)' }}></span>
                    <span>Wochenende</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bridge Days 2026 Section */}
        <section className={`${styles.section} ${styles.bridgeDays2026}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Brückentage 2026: So verlängern Sie Ihren Urlaub</h2>
            
            <div className={styles.introText}>
              <p>
                Das Jahr 2026 bietet zahlreiche Möglichkeiten, mit wenigen Urlaubstagen viel Freizeit zu gewinnen. 
                Viele gesetzliche Feiertage fallen günstig auf Wochentage. Mit unserem Ferienplaner 2026 
                finden Sie die optimalen Brückentage für Ihr Bundesland.
              </p>
            </div>

            <div className={styles.bridgeDaysList}>
              <article className={styles.bridgeDayCard}>
                <h3>🎆 Neujahr (1. Januar 2026 – Donnerstag)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Freitag, den 2. Januar frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Donnerstag bis Sonntag am Stück freihaben. Perfekter Start ins neue Jahr!
                  </p>
                </div>
              </article>

              <article className={styles.bridgeDayCard}>
                <h3>👑 Heilige Drei Könige (6. Januar 2026 – Dienstag)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Montag, den 5. Januar frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Gilt für Baden-Württemberg, Bayern und Sachsen-Anhalt. Verlängertes Wochenende zu Jahresbeginn.
                  </p>
                </div>
              </article>

              <article className={styles.bridgeDayCard}>
                <h3>🐣 Ostern (3.-6. April 2026)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Donnerstag, den 2. April frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Von Karfreitag (3. April) bis Ostermontag (6. April) ist bereits frei. 
                    Mit einem zusätzlichen Urlaubstag am Donnerstag davor genießen Sie vier Tage am Stück.
                  </p>
                </div>
              </article>

              <article className={styles.bridgeDayCard}>
                <h3>🌹 Tag der Arbeit (1. Mai 2026 – Freitag)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Donnerstag, den 30. April frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Der 1. Mai fällt auf einen Freitag – ideal für ein verlängertes Wochenende. 
                    Mit einem Brückentag am Donnerstag haben Sie vier Tage frei.
                  </p>
                </div>
              </article>

              <article className={styles.bridgeDayCard}>
                <h3>☁️ Christi Himmelfahrt (14. Mai 2026 – Donnerstag)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Freitag, den 15. Mai frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Einer der beliebtesten Brückentage! Mit nur einem Urlaubstag ein langes Wochenende sichern.
                  </p>
                </div>
              </article>

              <article className={styles.bridgeDayCard}>
                <h3>🕊️ Pfingstmontag (25. Mai 2026 – Montag)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Freitag, den 22. Mai frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Pfingsten bietet bereits ein verlängertes Wochenende. Optimieren Sie es mit einem Brückentag.
                  </p>
                </div>
              </article>

              <article className={styles.bridgeDayCard}>
                <h3>✝️ Fronleichnam (4. Juni 2026 – Donnerstag)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Freitag, den 5. Juni frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Gilt für Baden-Württemberg, Bayern, Hessen, NRW, Rheinland-Pfalz und Saarland.
                  </p>
                </div>
              </article>

              <article className={styles.bridgeDayCard}>
                <h3>🎄 Weihnachten (25. Dezember 2026 – Freitag)</h3>
                <div className={styles.bridgeDayContent}>
                  <div className={styles.recommendation}>
                    <strong>Empfehlung:</strong> Nehmen Sie Donnerstag, den 24. Dezember frei
                  </div>
                  <div className={styles.benefit}>
                    <span className={styles.days}>1 Urlaubstag</span> = 
                    <span className={styles.freeDays}>4 Tage frei</span>
                  </div>
                  <p className={styles.explanation}>
                    Heiligabend bis Sonntag frei – der perfekte Start in die Feiertage.
                  </p>
                </div>
              </article>
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
              <Link href="/app" className={styles.ctaButton}>
                Zum Ferienplaner 2026
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`${styles.section} ${styles.features}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Unsere Features</h2>
            <div className={styles.featureGrid}>
              {FEATURES.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
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
              {BENEFITS.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
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
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <div key={index} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
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

        {/* PWA Section */}
        <section className={`${styles.section} ${styles.pwa}`}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Immer & Überall verfügbar</h2>
            <div className={styles.pwaContent}>
              <div className={styles.pwaFeatures}>
                {PWA_FEATURES.map((feature, index) => (
                  <div key={index} className={styles.pwaFeatureCard}>
                    <div className={styles.pwaFeatureIcon}>{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
              <div className={styles.pwaDemo}>
                <div className={styles.deviceFrame}>
                  <div className={styles.deviceScreen}>
                    <div className={styles.installPrompt}>
                      <div className={styles.appIcon}>🏖️</div>
                      <div className={styles.installText}>
                        <h4>Holiday Planner</h4>
                        <p>Zum Homescreen hinzufügen</p>
                      </div>
                      <button className={styles.installButton}>Installieren</button>
                    </div>
                  </div>
                </div>
              </div>
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

