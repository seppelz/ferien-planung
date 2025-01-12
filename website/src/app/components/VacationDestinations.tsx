'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot,
  faPersonHiking,
  faMonument,
  faMountain,
  faCity,
  faTree,
  faWater,
  faLandmark
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from '@/app/styles/StatePage.module.css';

interface VacationDestination {
  name: string;
  description: string;
  attractions: string[];
  activities: string[];
}

interface VacationDestinationsProps {
  destinations: VacationDestination[];
  primaryColor: string;
  secondaryColor: string;
}

const getDestinationIcon = (destinationName: string): IconDefinition => {
  const name = destinationName.toLowerCase();
  if (name.includes('schloss') || name.includes('burg')) return faMonument;
  if (name.includes('berg') || name.includes('alpen')) return faMountain;
  if (name.includes('stadt') || name.includes('city')) return faCity;
  if (name.includes('wald')) return faTree;
  if (name.includes('see') || name.includes('meer')) return faWater;
  return faLandmark;
};

export default function VacationDestinations({ destinations, primaryColor, secondaryColor }: VacationDestinationsProps) {
  return (
    <section id="destinations" className={styles.vacationSection} style={{
      background: 'white',
      padding: 'var(--section-spacing-large) var(--section-spacing-small)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: `linear-gradient(135deg, ${primaryColor || 'var(--state-primary-color)'}, ${secondaryColor || 'var(--state-secondary-color)'})`,
        opacity: 0.15,
        pointerEvents: 'none'
      }} />

      <div className="page-section--main" style={{ position: 'relative', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#333333',
          padding: '0 1rem'
        }}>Beliebte Reiseziele</h2>
        
        <div className={styles.vacationGrid}>
          {destinations.map((destination, index) => (
            <div key={index} className={styles.vacationCard} style={{
              background: 'white',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-medium)',
              transition: 'var(--transition-normal)',
              border: '1px solid rgba(var(--state-primary-main-rgb), 0.1)'
            }}>
              <div className={styles.destinationHeader} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                background: `linear-gradient(135deg, ${primaryColor || 'var(--state-primary-color)'}, ${secondaryColor || 'var(--state-secondary-color)'})`,
                color: 'white'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  color: 'white',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <FontAwesomeIcon 
                    icon={getDestinationIcon(destination.name)}
                    style={{
                      transform: 'scale(1)',
                      transition: 'var(--transition-normal)'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'white',
                  margin: 0
                }}>{destination.name}</h3>
              </div>
              <div className={styles.destinationContent} style={{ padding: '1.5rem' }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#666666',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>{destination.description}</p>
                <div className={styles.destinationDetails} style={{ display: 'grid', gap: '1.5rem' }}>
                  {destination.attractions && destination.attractions.length > 0 && (
                    <div className={styles.attractionsSection}>
                      <div className={styles.sectionHeader} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                        padding: '0.75rem 1rem',
                        background: `linear-gradient(135deg, ${primaryColor || 'var(--state-primary-color)'}, ${secondaryColor || 'var(--state-secondary-color)'})`,
                        borderRadius: '0.5rem',
                        color: 'white'
                      }}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: 'white',
                          margin: 0
                        }}>Sehenswürdigkeiten</h4>
                      </div>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        {destination.attractions.map((attraction, i) => (
                          <li key={i} style={{
                            fontSize: '0.95rem',
                            color: '#666666',
                            padding: '0.75rem 1rem',
                            background: `color-mix(in srgb, ${primaryColor || 'var(--state-primary-color)'} 5%, white 95%)`,
                            borderRadius: '0.5rem',
                            border: `1px solid ${primaryColor || 'var(--state-primary-color)'}15`,
                            transition: 'var(--transition-normal)'
                          }}>{attraction}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {destination.activities && destination.activities.length > 0 && (
                    <div className={styles.activitiesSection}>
                      <div className={styles.sectionHeader} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                        padding: '0.75rem 1rem',
                        background: `linear-gradient(135deg, ${primaryColor || 'var(--state-primary-color)'}, ${secondaryColor || 'var(--state-secondary-color)'})`,
                        borderRadius: '0.5rem',
                        color: 'white'
                      }}>
                        <FontAwesomeIcon icon={faPersonHiking} />
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: 'white',
                          margin: 0
                        }}>Aktivitäten</h4>
                      </div>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        {destination.activities.map((activity, i) => (
                          <li key={i} style={{
                            fontSize: '0.95rem',
                            color: '#666666',
                            padding: '0.75rem 1rem',
                            background: `color-mix(in srgb, ${primaryColor || 'var(--state-primary-color)'} 5%, white 95%)`,
                            borderRadius: '0.5rem',
                            border: `1px solid ${primaryColor || 'var(--state-primary-color)'}15`,
                            transition: 'var(--transition-normal)'
                          }}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .vacationCard:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-large);
        }
        .vacationCard:hover .destinationIcon {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
} 