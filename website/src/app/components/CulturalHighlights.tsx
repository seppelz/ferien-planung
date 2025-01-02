'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLandmark,
  faMonument,
  faBuilding,
  faUniversity,
  faChurch,
  faMasksTheater,
  faMusic,
  faCamera,
  faPalette,
  faCity
} from '@fortawesome/free-solid-svg-icons';

interface CulturalHighlightsProps {
  highlights: string[];
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

const getHighlightIcon = (highlight: string) => {
  const text = highlight.toLowerCase();
  if (text.includes('museum') || text.includes('galerie')) return faUniversity;
  if (text.includes('kirche') || text.includes('dom')) return faChurch;
  if (text.includes('theater') || text.includes('oper')) return faMasksTheater;
  if (text.includes('musik') || text.includes('philharmonie')) return faMusic;
  if (text.includes('schloss') || text.includes('burg')) return faMonument;
  if (text.includes('rathaus') || text.includes('gebäude')) return faBuilding;
  if (text.includes('unesco') || text.includes('weltkulturerbe')) return faCamera;
  if (text.includes('kunst') || text.includes('art')) return faPalette;
  if (text.includes('stadt') || text.includes('platz')) return faCity;
  return faLandmark;
};

const CulturalHighlights: React.FC<CulturalHighlightsProps> = ({
  highlights,
  primaryColor,
  secondaryColor,
  tertiaryColor
}) => {
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
        height: '200px',
        background: `linear-gradient(180deg, ${tertiaryColor || 'var(--state-background-subtle)'} 0%, transparent 100%)`,
        opacity: 0.1,
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
        }}>Kulturelle Highlights</h2>
        
        <p style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          maxWidth: 'var(--content-width-text)',
          margin: '0 auto 4rem',
          color: '#666666',
          lineHeight: '1.6'
        }}>
          Entdecken Sie die vielfältige Kulturlandschaft und einzigartige Traditionen der Region
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch'
        }}>
          {highlights.map((highlight, index) => {
            const icon = getHighlightIcon(highlight);
            return (
              <div key={index} className="highlight-card" style={{
                background: 'white',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                height: '100%',
                transition: 'var(--transition-medium)',
                border: `1px solid ${tertiaryColor || 'var(--state-border-light)'}`,
                borderRadius: '1rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '1rem',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: primaryColor || 'var(--state-primary-color)',
                  transition: 'var(--transition-medium)',
                  boxShadow: 'var(--shadow-sm)',
                  transform: 'rotate(-5deg)'
                }}>
                  <FontAwesomeIcon 
                    icon={icon}
                    style={{
                      transform: 'scale(1)',
                      transition: 'var(--transition-medium)'
                    }}
                  />
                </div>
                
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333333',
                  margin: 0,
                  transition: 'var(--transition-medium)',
                  lineHeight: '1.4'
                }}>{highlight}</h3>

                <style jsx>{`
                  .highlight-card {
                    transition: var(--transition-medium);
                  }
                  .highlight-card:hover {
                    transform: translateY(-4px) rotate(1deg);
                    box-shadow: var(--shadow-lg);
                  }
                  .highlight-card:hover div {
                    transform: rotate(5deg);
                  }
                  .highlight-card:hover div > svg {
                    transform: scale(1.1);
                    color: ${secondaryColor || 'var(--state-secondary-color)'};
                  }
                  .highlight-card:hover h3 {
                    color: ${primaryColor || 'var(--state-primary-color)'};
                  }
                `}</style>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CulturalHighlights; 