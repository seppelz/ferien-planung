import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStateInfo, getStateIds, getStateEnum } from '@/utils/stateUtils';
import { getStateColorScheme } from '@/utils/stateColorSchemes';
import { StateInfo } from '@/types/StateInfo';
import { Holiday } from '@/types/Holiday';
import styles from '@/app/styles/StatePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatePageStyles from '@/app/components/StatePageStyles';
import ScrollButton from '@/app/components/ScrollButton';
import Navigation from '@/components/Navigation/Navigation';
import SeasonalSection from '@/app/components/SeasonalSection';
import RegionalSpecialties from '@/app/components/RegionalSpecialties';
import HolidayList from '@/app/components/HolidayList';
import VacationDestinations from '@/app/components/VacationDestinations';
import CulturalHighlights from '@/app/components/CulturalHighlights';
import { 
  faArrowRight,
  faBuilding,
  faUsers,
  faRulerCombined,
  faIndustry,
  faCalendarDays,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const stateIds = getStateIds();
  return stateIds.map((stateId) => ({
    state: stateId,
  }));
}

interface StatePageProps {
  params: {
    state: string;
  };
}

// Enhance structured data
const generateStructuredData = (stateInfo: StateInfo) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'State',
    name: stateInfo.name,
    description: stateInfo.description,
    url: `https://holiday-planner.de/states/${stateInfo.name.toLowerCase().replace(/\s+/g, '-')}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
      addressRegion: stateInfo.name,
    },
    publicAccess: true,
    tourismType: [
      ...(stateInfo.keyFacts?.economicStrength || []),
      'Tourism',
      'Holidays',
    ],
    event: [
      ...stateInfo.holidays
        .filter(holiday => holiday.start?.startsWith('2025'))
        .map(holiday => ({
          '@type': 'Event',
          name: holiday.name,
          startDate: holiday.start,
          endDate: holiday.end || holiday.start,
          description: holiday.type === 'public' ? 'Gesetzlicher Feiertag' : 'Schulferien',
          location: {
            '@type': 'State',
            name: stateInfo.name,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'DE',
              addressRegion: stateInfo.name,
            }
          }
        }))
    ],
    mainEntity: {
      '@type': 'WebPage',
      name: `Feiertage und Schulferien ${stateInfo.name} 2025`,
      description: `Alle Feiertage und Schulferien für ${stateInfo.name} im Jahr 2025. Optimale Urlaubsplanung mit Brückentagen.`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Holiday Planner',
            item: 'https://holiday-planner.de'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bundesländer',
            item: 'https://holiday-planner.de/states'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: stateInfo.name,
            item: `https://holiday-planner.de/states/${stateInfo.name.toLowerCase().replace(/\s+/g, '-')}`
          }
        ]
      }
    }
  };
};

export async function generateMetadata(
  { params }: StatePageProps
): Promise<Metadata> {
  const stateId = params.state;
  const stateInfo = await getStateInfo(stateId);
  if (!stateInfo) return { title: 'Bundesland nicht gefunden' };

  const publicHolidaysCount = stateInfo.holidays.filter(h => h.type === 'public').length;
  const schoolHolidaysCount = stateInfo.schoolHolidays?.length || 0;

  const metaTitle = `${stateInfo.name} - Ferien und Feiertage 2025 | Urlaubsplaner`;
  const metaDescription = `Planen Sie Ihren Urlaub 2025 in ${stateInfo.name}. ${publicHolidaysCount} Feiertage, ${schoolHolidaysCount} Ferienzeiten und optimale Brückentage. ${stateInfo.keyFacts.population} Einwohner, ${stateInfo.keyFacts.area}.`;

  return {
    metadataBase: new URL('https://holiday-planner.de'),
    title: metaTitle,
    description: metaDescription,
    keywords: [
      stateInfo.name,
      'Feiertage 2025',
      'Schulferien 2025',
      'Brückentage',
      'Urlaub',
      'Urlaubsplanung',
      'Ferien',
      'Ferienkalender',
      ...stateInfo.keyFacts.economicStrength
    ].join(', '),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      locale: 'de_DE',
      url: `https://holiday-planner.de/states/${stateId}`,
      siteName: 'Holiday Planner',
      images: [
        {
          url: `/images/states/${stateId}.jpg`,
          width: 1200,
          height: 630,
          alt: `${stateInfo.name} - Urlaubsplanung 2025`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [`/images/states/${stateId}.jpg`],
    },
    alternates: {
      canonical: `/states/${stateId}`,
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
  };
}

export default async function StatePage({ params }: StatePageProps) {
  const stateId = params.state;
  const stateInfo = await getStateInfo(stateId);
  const stateEnum = getStateEnum(stateId);

  if (!stateInfo || !stateEnum) {
    notFound();
  }

  const colorScheme = getStateColorScheme(stateEnum);

  const {
    fullName,
    description,
    holidays = [],
    schoolHolidays = [],
    vacationDestinations = [],
    regionalSpecialties = [],
    seasonalTraditions = [],
    culturalHighlights = [],
    keyFacts = {
      population: '',
      capital: '',
      area: '',
      economicStrength: [],
      majorCities: []
    }
  } = stateInfo;

  // Define CSS variables for the state's color scheme
  const colorStyles = {
    '--state-primary-color': colorScheme.primary.main,
    '--state-primary-light': colorScheme.primary.light,
    '--state-primary-dark': colorScheme.primary.dark,
    '--state-secondary-color': colorScheme.secondary.main,
    '--state-secondary-light': colorScheme.secondary.light,
    '--state-secondary-dark': colorScheme.secondary.dark,
    '--state-accent-color': colorScheme.accent.main,
    '--state-accent-light': colorScheme.accent.light,
    '--state-accent-dark': colorScheme.accent.dark,
    '--state-background-default': colorScheme.background.default,
    '--state-background-paper': colorScheme.background.paper,
    '--state-background-subtle': colorScheme.background.subtle,
    '--state-text-primary': colorScheme.text.primary,
    '--state-text-secondary': colorScheme.text.secondary,
    '--state-text-light': colorScheme.text.light,
    '--state-text-dark': colorScheme.text.dark,
    '--state-gradient-primary': colorScheme.gradients.primary,
    '--state-gradient-secondary': colorScheme.gradients.secondary,
    '--state-gradient-accent': colorScheme.gradients.accent,
    '--state-gradient-hero': `linear-gradient(135deg, ${colorScheme.primary.main}, ${colorScheme.primary.light} 50%, ${colorScheme.accent.light})`,
    '--state-gradient-intense': `linear-gradient(135deg, ${colorScheme.primary.dark}, ${colorScheme.primary.main} 50%, ${colorScheme.primary.light})`,
    '--state-gradient-subtle': `linear-gradient(135deg, ${colorScheme.background.paper}, ${colorScheme.background.subtle})`,
    '--state-border-light': colorScheme.border.light,
    '--state-border-medium': colorScheme.border.medium,
    '--state-border-dark': colorScheme.border.dark,
    '--state-shadow-small': colorScheme.shadow.small,
    '--state-shadow-medium': colorScheme.shadow.medium,
    '--state-shadow-large': colorScheme.shadow.large,
    '--state-button-primary-bg': colorScheme.button.primary.background,
    '--state-button-primary-hover': colorScheme.button.primary.hover,
    '--state-button-primary-text': colorScheme.button.primary.text,
    '--state-button-secondary-bg': colorScheme.button.secondary.background,
    '--state-button-secondary-hover': colorScheme.button.secondary.hover,
    '--state-button-secondary-text': colorScheme.button.secondary.text,
    '--state-button-accent-bg': colorScheme.button.accent.background,
    '--state-button-accent-hover': colorScheme.button.accent.hover,
    '--state-button-accent-text': colorScheme.button.accent.text,
    '--state-primary-alpha-10': `${colorScheme.primary.main}1A`,
    '--state-primary-alpha-20': `${colorScheme.primary.main}33`,
    '--state-hover-overlay': 'rgba(255, 255, 255, 0.1)',
    '--state-text-on-primary': colorScheme.text.light,
    '--state-text-on-secondary': colorScheme.text.dark,
    '--state-text-on-accent': colorScheme.text.light,
    '--state-text-on-hero': colorScheme.text.light,
  } as React.CSSProperties;

  const structuredData = generateStructuredData(stateInfo);

  const publicHolidays = (holidays as Holiday[]).filter(h => {
    if (h.type !== 'public') return false;
    if (h.isRegional) return false;
    return h.start?.startsWith('2025');
  });

  const regionalHolidays = (holidays as Holiday[]).filter(h => {
    if (h.type !== 'public') return false;
    if (!h.isRegional) return false;
    return h.start?.startsWith('2025');
  });

  const filteredSchoolHolidays = (schoolHolidays as Holiday[]).filter(h => {
    return h.start?.startsWith('2025');
  });

  const totalSchoolHolidayDays = filteredSchoolHolidays.reduce((total, holiday) => {
    if (holiday.start && holiday.end) {
      const startDate = new Date(holiday.start);
      const endDate = new Date(holiday.end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return total + Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return total;
  }, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className={styles.statePage} style={colorStyles}>
        <Navigation />
        <StatePageStyles 
          primaryColor={colorScheme.primary.main}
          secondaryColor={colorScheme.secondary.main}
          tertiaryColor={colorScheme.accent.main}
        />
        <div className={styles.statePageContent}>
          <header className={styles.stateHeader}>
            <div className={styles.animatedBackground}>
              <div className={styles.celestialBody} style={{
                '--state-primary-color': colorScheme.primary.main,
                '--state-secondary-color': colorScheme.secondary.main,
                '--state-tertiary-color': colorScheme.accent.main
              } as React.CSSProperties} />
              
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              <div className={styles.cloud} style={{ '--state-primary-color': 'var(--state-primary-lighter)' } as React.CSSProperties} />
              
              <div className={styles.seasonalDecorations}>
                <div className={styles.springDandelion}>
                  <div className={styles.dandelionStem}></div>
                  <div className={styles.dandelionHead}>
                    <div className={styles.dandelionCore}></div>
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className={styles.seed}>
                        <div className={styles.seedCore}></div>
                        <div className={styles.seedParachute}></div>
                      </div>
                    ))}
                  </div>
                  {[...Array(6)].map((_, i) => (
                    <div key={`flying-${i}`} className={styles.flyingSeed}>
                      <div className={styles.seedCore}></div>
                      <div className={styles.seedParachute}></div>
                    </div>
                  ))}
                </div>

                <div className={styles.sunflower}>
                  <div className={styles.sunflowerStem}></div>
                  <div className={styles.sunflowerHead}>
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={styles.sunflowerPetal}></div>
                    ))}
                    <div className={styles.sunflowerCenter}></div>
                  </div>
                </div>

                <div className={styles.mapleLeaf}>
                  <div className={styles.mapleTreeTrunk} />
                  <div className={styles.mapleTreeBranch} />
                  <div className={styles.mapleTreeBranch} />
                  <div className={styles.mapleTreeBranch} />
                  <div className={styles.mapleTreeBranch} />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.fallingLeaf}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 30}%`,
                        '--x-end': `${-50 + Math.random() * 100}px`,
                        '--y-end': `${100 + Math.random() * 50}px`,
                        '--fall-delay': `${i * 0.5}s`
                      } as React.CSSProperties}
                    />
                  ))}
                </div>

                <div className={styles.snowflake}>
                  <div className={styles.mountainScene}>
                    <div className={styles.mountain}></div>
                    <div className={styles.mountain}></div>
                    <div className={styles.mountain}></div>
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className={styles.snow}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          '--x-end': `${Math.random() * 60 - 30}px`,
                          '--y-end': `${Math.random() * 60 + 30}px`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        } as React.CSSProperties}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.headerOverlay} style={{
                background: `linear-gradient(
                  135deg,
                  rgba(0, 0, 0, 0.2) 0%,
                  rgba(0, 0, 0, 0.1) 50%,
                  rgba(0, 0, 0, 0.05) 100%
                )`,
                mixBlendMode: 'multiply'
              }} />
              <div className={styles.headerContent}>
                <div className={styles.heroStats}>
                  <div className={styles.statBadge} style={{
                    background: 'var(--state-primary-alpha-10)',
                    color: 'var(--state-text-on-hero)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}>
                    <span className={styles.statNumber}>{publicHolidays.length}</span>
                    <span className={styles.statLabel}>Feiertage</span>
                  </div>
                  <div className={styles.statDivider} style={{ 
                    background: 'var(--state-primary-alpha-20)'
                  }} />
                  <div className={styles.statBadge} style={{
                    background: 'var(--state-primary-alpha-10)',
                    color: 'var(--state-text-on-hero)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}>
                    <span className={styles.statNumber}>{regionalHolidays.length}</span>
                    <span className={styles.statLabel}>Regionale Feiertage</span>
                  </div>
                  <div className={styles.statDivider} style={{ 
                    background: 'var(--state-primary-alpha-20)'
                  }} />
                  <div className={styles.statBadge} style={{
                    background: 'var(--state-primary-alpha-10)',
                    color: 'var(--state-text-on-hero)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}>
                    <span className={styles.statNumber}>{totalSchoolHolidayDays}</span>
                    <span className={styles.statLabel}>Ferientage</span>
                  </div>
                </div>
                <h1 className={styles.heroTitle} style={{ 
                  color: 'var(--state-text-on-hero)',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                }}>
                  Feiertage und Schulferien in {fullName} 2025
                </h1>
                <p className={styles.heroSubtitle} style={{ 
                  color: 'var(--state-text-on-hero)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                }}>
                  Maximieren Sie Ihren Urlaub in {fullName} mit unserem intelligenten Urlaubsplaner.
                  Nutzen Sie {publicHolidays.length + regionalHolidays.length} Feiertage für optimale Brückentage.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/planner" className={styles.primaryButton} style={{
                    background: 'var(--state-primary-alpha-20)',
                    color: 'var(--state-text-on-hero)',
                    borderColor: 'var(--state-primary-alpha-10)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    '--hover-color': 'var(--state-hover-overlay)'
                  } as React.CSSProperties}>
                    Urlaubsplaner starten
                    <span className={styles.buttonIcon}>→</span>
                  </Link>
                  <ScrollButton className={styles.secondaryButton} />
                </div>
              </div>
            </div>
          </header>

          <section id="overview" className={styles.holidayOverview} style={{ 
            marginTop: '1rem',
            background: 'var(--state-background-subtle)'
          }}>
            <HolidayList
              publicHolidays={publicHolidays}
              regionalHolidays={regionalHolidays}
              schoolHolidays={filteredSchoolHolidays}
              totalSchoolHolidayDays={totalSchoolHolidayDays}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
            />

            <div className={styles.plannerPromo} style={{
              background: `linear-gradient(135deg, ${colorScheme.primary.main}, ${colorScheme.secondary.main})`,
              borderRadius: '1.5rem',
              padding: '3rem 2rem',
              color: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              isolation: 'isolate',
              margin: '2rem 0'
            }}>
              <div className={styles.promoContent}>
                <div className={styles.promoStats} style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1.5rem',
                  marginBottom: '2.5rem'
                }}>
                  <div className={styles.promoStat} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '1rem',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'default',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    minWidth: '160px'
                  }}>
                    <FontAwesomeIcon icon={faCalendarDays} style={{ fontSize: '2rem', color: '#ffffff' }} />
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>4x</div>
                      <div style={{ fontSize: '0.95rem', opacity: '0.95', fontWeight: '500' }}>mehr freie Tage</div>
                    </div>
                  </div>
                  <div className={styles.promoStat} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '1rem',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'default',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    minWidth: '160px'
                  }}>
                    <FontAwesomeIcon icon={faUsers} style={{ fontSize: '2rem', color: '#ffffff' }} />
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>5 Min</div>
                      <div style={{ fontSize: '0.95rem', opacity: '0.95', fontWeight: '500' }}>schnelle Planung</div>
                    </div>
                  </div>
                  <div className={styles.promoStat} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '1rem',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'default',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    minWidth: '160px'
                  }}>
                    <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '2rem', color: '#ffffff' }} />
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>100%</div>
                      <div style={{ fontSize: '0.95rem', opacity: '0.95', fontWeight: '500' }}>kostenlos</div>
                    </div>
                  </div>
                </div>
                <div className={styles.promoText} style={{ textAlign: 'center', color: '#ffffff', maxWidth: '800px', margin: '0 auto' }}>
                  <h2 style={{ 
                    fontSize: '2rem', 
                    fontWeight: '700',
                    marginBottom: '1.25rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    color: '#ffffff',
                    lineHeight: '1.3'
                  }}>
                    Clever Urlaub planen in {fullName}
                  </h2>
                  <p style={{ 
                    fontSize: '1.15rem',
                    opacity: '0.95',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem',
                    lineHeight: '1.6',
                    fontWeight: '500'
                  }}>
                    Nutzen Sie unseren intelligenten Urlaubsplaner, um das Beste aus Ihren Urlaubstagen herauszuholen.
                    Finden Sie die optimalen Brückentage und verlängern Sie Ihren Urlaub effizient.
                  </p>
                  <Link href="/planner" className={styles.promoCTA} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '1rem 2rem',
                    borderRadius: '0.75rem',
                    fontSize: '1.15rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
                    }
                  } as React.CSSProperties}>
                    Jetzt Urlaub clever planen
                    <FontAwesomeIcon icon={faArrowRight} style={{ 
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      transition: 'transform 0.3s ease'
                    }} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {keyFacts && (
            <section id="about" className={styles.stateOverviewSection} style={{
              background: `linear-gradient(135deg, ${colorScheme.primary.main}, ${colorScheme.secondary.main})`,
              padding: '4rem 2rem',
              borderRadius: '1.5rem',
              margin: '3rem auto',
              maxWidth: '1200px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: '700',
                marginBottom: '2.5rem',
                textAlign: 'center',
                color: '#ffffff',
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '0 1rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>Über {fullName}</h2>
              <div className={styles.microInfoBar} style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '2rem',
                borderRadius: '1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'stretch',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                margin: '0 auto 3rem',
                maxWidth: '1000px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}>
                <div className={styles.microInfoItem} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.75rem',
                  background: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  minWidth: '220px',
                  border: '1px solid var(--state-border-lighter)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}>
                  <FontAwesomeIcon icon={faBuilding} className={styles.microInfoIcon} style={{
                    color: 'var(--state-primary-color)',
                    fontSize: '1.5rem',
                    opacity: '0.9'
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={styles.microInfoLabel} style={{
                      fontSize: '0.9rem',
                      color: 'var(--state-text-muted)',
                      marginBottom: '0.35rem',
                      fontWeight: '500'
                    }}>Hauptstadt</span>
                    <span className={styles.microInfoValue} style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'var(--state-text-primary)'
                    }}>{keyFacts.capital}</span>
                  </div>
                </div>
                <div className={styles.microInfoItem} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.75rem',
                  background: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  minWidth: '220px',
                  border: '1px solid var(--state-border-lighter)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}>
                  <FontAwesomeIcon icon={faUsers} className={styles.microInfoIcon} style={{
                    color: 'var(--state-primary-color)',
                    fontSize: '1.5rem',
                    opacity: '0.9'
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={styles.microInfoLabel} style={{
                      fontSize: '0.9rem',
                      color: 'var(--state-text-muted)',
                      marginBottom: '0.35rem',
                      fontWeight: '500'
                    }}>Einwohner</span>
                    <span className={styles.microInfoValue} style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'var(--state-text-primary)'
                    }}>{keyFacts.population}</span>
                  </div>
                </div>
                <div className={styles.microInfoItem} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.75rem',
                  background: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  minWidth: '220px',
                  border: '1px solid var(--state-border-lighter)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}>
                  <FontAwesomeIcon icon={faRulerCombined} className={styles.microInfoIcon} style={{
                    color: 'var(--state-primary-color)',
                    fontSize: '1.5rem',
                    opacity: '0.9'
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className={styles.microInfoLabel} style={{
                      fontSize: '0.9rem',
                      color: 'var(--state-text-muted)',
                      marginBottom: '0.35rem',
                      fontWeight: '500'
                    }}>Fläche</span>
                    <span className={styles.microInfoValue} style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'var(--state-text-primary)'
                    }}>{keyFacts.area}</span>
                  </div>
                </div>
                <div className={styles.microInfoItem} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem 1.75rem',
                  background: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                  flex: '1 1 auto',
                  maxWidth: '100%',
                  border: '1px solid var(--state-border-lighter)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}>
                  <FontAwesomeIcon icon={faIndustry} className={styles.microInfoIcon} style={{
                    color: 'var(--state-primary-color)',
                    fontSize: '1.5rem',
                    opacity: '0.9',
                    marginTop: '0.2rem'
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span className={styles.microInfoLabel} style={{
                      fontSize: '0.9rem',
                      color: 'var(--state-text-muted)',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}>Wirtschaftsstärken</span>
                    <div className={styles.microInfoTags} style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                    {keyFacts.economicStrength.map((strength, index) => (
                        <span key={index} className={styles.microInfoTag} style={{
                          fontSize: '0.9rem',
                          padding: '0.35rem 1rem',
                          borderRadius: '2rem',
                          background: 'var(--state-gradient-subtle)',
                          color: 'var(--state-text-primary)',
                          fontWeight: '500',
                          border: '1px solid var(--state-border-light)',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                        }}>{strength}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                maxWidth: '900px',
                margin: '0 auto',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                border: '1px solid var(--state-border-lighter)'
              }}>
                <p className={styles.stateDescription} style={{
                  fontSize: '1.15rem',
                  lineHeight: '1.7',
                  color: 'var(--state-text-primary)',
                  margin: '0',
                  textAlign: 'center',
                  fontWeight: '400'
                }}>{description}</p>
              </div>
            </section>
          )}

          {culturalHighlights && culturalHighlights.length > 0 && (
            <CulturalHighlights 
              highlights={culturalHighlights}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
              tertiaryColor={colorScheme.accent.main ? 'var(--state-tertiary-color)' : undefined}
            />
          )}

          {seasonalTraditions && seasonalTraditions.length > 0 && (
            <SeasonalSection 
              traditions={seasonalTraditions}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
              tertiaryColor={colorScheme.accent.main ? 'var(--state-tertiary-color)' : undefined}
            />
          )}

          {regionalSpecialties && regionalSpecialties.length > 0 && (
            <RegionalSpecialties 
              specialties={regionalSpecialties}
            />
          )}

          {vacationDestinations && vacationDestinations.length > 0 && (
            <VacationDestinations 
              destinations={vacationDestinations}
              primaryColor="var(--state-primary-color)"
              secondaryColor="var(--state-secondary-color)"
              tertiaryColor={colorScheme.accent.main ? 'var(--state-tertiary-color)' : undefined}
            />
          )}

          <section className={styles.ctaSection} style={{
            background: 'var(--state-gradient-intense)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle} style={{ color: 'var(--state-text-on-primary)' }}>
                Bereit für die Urlaubsplanung?
              </h2>
              <p className={styles.ctaDescription} style={{ color: 'var(--state-text-on-primary-muted)' }}>
                Optimiere deinen Urlaub mit unseren intelligenten Brückentage-Empfehlungen.
              </p>
              <Link href="/planner" className={styles.ctaButton} style={{
                background: 'white',
                color: 'var(--state-primary-color)'
              }}>
                Jetzt Urlaub planen <FontAwesomeIcon icon={faArrowRight} className={styles.ctaIcon} style={{ color: 'var(--state-primary-color)' }} />
              </Link>
            </div>
          </section>

          <footer className={styles.footer} style={{
            background: 'var(--state-background-accent)',
            borderColor: 'var(--state-border-light)'
          }}>
            <p>© {new Date().getFullYear()} Holiday Planner. Alle Rechte vorbehalten.</p>
            <nav aria-label="Footer Navigation">
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
              <Link href="/kontakt">Kontakt</Link>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
} 