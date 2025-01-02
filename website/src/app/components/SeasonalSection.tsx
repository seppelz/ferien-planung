'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faSun, 
  faSnowflake, 
  faLeaf,
  faUmbrella
} from '@fortawesome/free-solid-svg-icons';

type Season = 'Frühling' | 'Frühjahr' | 'Sommer' | 'Herbst' | 'Winter';

interface Tradition {
  season: Season;
  description: string;
  events?: string[];
}

interface SeasonalSectionProps {
  traditions: Tradition[];
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

type SeasonStyle = {
  icon: IconDefinition;
  color: string;
  gradient: string;
  background: string;
};

const seasonColors: Record<Season, SeasonStyle> = {
  'Frühling': {
    icon: faSun,
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
    background: 'rgba(76, 175, 80, 0.05)'
  },
  'Frühjahr': {
    icon: faSun,
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
    background: 'rgba(76, 175, 80, 0.05)'
  },
  'Sommer': {
    icon: faUmbrella,
    color: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800, #FFC107)',
    background: 'rgba(255, 152, 0, 0.05)'
  },
  'Herbst': {
    icon: faLeaf,
    color: '#795548',
    gradient: 'linear-gradient(135deg, #795548, #A1887F)',
    background: 'rgba(121, 85, 72, 0.05)'
  },
  'Winter': {
    icon: faSnowflake,
    color: '#2196F3',
    gradient: 'linear-gradient(135deg, #2196F3, #03A9F4)',
    background: 'rgba(33, 150, 243, 0.05)'
  }
};

// Helper function to normalize season name for display
const normalizeSeasonName = (season: string): Season => {
  if (season === 'Frühling' || season === 'Frühjahr') {
    return 'Frühling';
  }
  return season as Season;
};

// Helper function to get season style with fallback
const getSeasonStyle = (season: string): SeasonStyle => {
  const normalizedSeason = normalizeSeasonName(season);
  return seasonColors[normalizedSeason] || seasonColors['Frühling'];
};

const SeasonalSection: React.FC<SeasonalSectionProps> = ({
  traditions,
  primaryColor,
  secondaryColor,
  tertiaryColor
}) => {
  // Sort traditions by season order
  const seasonOrder: Season[] = ['Frühling', 'Sommer', 'Herbst', 'Winter'];
  const sortedTraditions = [...traditions].sort((a, b) => 
    seasonOrder.indexOf(a.season) - seasonOrder.indexOf(b.season)
  );

  const sectionBackground = `linear-gradient(180deg, ${primaryColor || 'var(--state-primary-color)'}10 0%, ${secondaryColor || 'var(--state-secondary-color)'}05 100%)`;

  return (
    <section className="page-section page-section--full" style={{
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
        background: sectionBackground,
        opacity: 0.15,
        pointerEvents: 'none'
      }} />

      <div className="page-section--main" style={{ position: 'relative', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          textAlign: 'center',
          color: '#333333',
          padding: '0 1rem'
        }}>Saisonale Traditionen</h2>
        
        <p style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          maxWidth: 'var(--content-width-text)',
          margin: '0 auto 4rem',
          color: '#666666',
          lineHeight: '1.6'
        }}>
          Erleben Sie die einzigartigen Bräuche und Traditionen zu jeder Jahreszeit
        </p>

        <div className="seasons-grid">
          {sortedTraditions.map((tradition, index) => {
            const seasonStyle = getSeasonStyle(tradition.season);
            if (!seasonStyle) {
              console.warn(`Season style not found for: ${tradition.season}`);
              return null;
            }
            
            return (
              <div key={index} className={`content-card season-${normalizeSeasonName(tradition.season)}`} style={{
                background: 'white',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.5rem',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${tertiaryColor || 'var(--state-border-light)'}`,
                borderRadius: '1rem'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontSize: '0.85rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '1rem',
                  background: seasonStyle.background,
                  color: seasonStyle.color,
                  fontWeight: '500',
                  border: `1px solid ${seasonStyle.color}20`
                }}>
                  {tradition.season}
                </div>
                
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: seasonStyle.color,
                  transition: 'var(--transition-medium)',
                  boxShadow: `0 4px 12px ${seasonStyle.color}20`,
                  border: `2px solid ${seasonStyle.color}30`
                }}>
                  <FontAwesomeIcon 
                    icon={seasonStyle.icon}
                    style={{
                      transform: 'scale(1)',
                      transition: 'var(--transition-medium)'
                    }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '1rem',
                    color: '#666666',
                    lineHeight: '1.6',
                    marginBottom: tradition.events?.length ? '1rem' : 0
                  }}>{tradition.description}</p>
                  
                  {tradition.events && tradition.events.length > 0 && (
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      {tradition.events.map((event, eventIndex) => (
                        <li key={eventIndex} style={{
                          fontSize: '0.95rem',
                          color: '#444444',
                          padding: '0.5rem',
                          background: seasonStyle.background,
                          borderRadius: '0.5rem',
                          fontWeight: '500'
                        }}>
                          {event}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          .seasons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            align-items: stretch;
          }
          
          @media (max-width: 1024px) {
            .seasons-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 640px) {
            .seasons-grid {
              grid-template-columns: 1fr;
            }
          }

          .content-card {
            transition: var(--transition-medium);
          }

          .content-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
          }

          .season-frühling:hover div > svg {
            transform: scale(1.1) rotate(-8deg);
            filter: drop-shadow(0 0 8px ${seasonColors['Frühling'].color}40);
          }

          .season-sommer:hover div > svg {
            transform: scale(1.1) rotate(-8deg);
            filter: drop-shadow(0 0 8px ${seasonColors['Sommer'].color}40);
          }

          .season-herbst:hover div > svg {
            transform: scale(1.1) rotate(-8deg);
            filter: drop-shadow(0 0 8px ${seasonColors['Herbst'].color}40);
          }

          .season-winter:hover div > svg {
            transform: scale(1.1) rotate(-8deg);
            filter: drop-shadow(0 0 8px ${seasonColors['Winter'].color}40);
          }

          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          .content-card:hover div:nth-child(2) {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </section>
  );
};

export default SeasonalSection; 