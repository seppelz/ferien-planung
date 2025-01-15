'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMasksTheater,
  faLandmark,
  faChurch,
  faCity,
  faMonument,
  faCrown,
  faGem,
  faUniversity
} from '@fortawesome/free-solid-svg-icons';

interface RegionalItem {
  title: string;
  description: string;
  icon: string;
}

interface RegionalCategory {
  title: string;
  icon: string;
  items: RegionalItem[];
}

interface RegionalSpecialtiesProps {
  specialties: RegionalCategory[];
}

const getCategoryIcon = (iconName: string) => {
  const text = iconName.toLowerCase();
  if (text.includes('fest') || text.includes('fasnet') || text.includes('karneval')) return faMasksTheater;
  if (text.includes('unesco') || text.includes('welterbe')) return faLandmark;
  if (text.includes('kirche') || text.includes('kloster')) return faChurch;
  if (text.includes('stadt') || text.includes('altstadt')) return faCity;
  if (text.includes('schloss') || text.includes('burg')) return faMonument;
  if (text.includes('kultur') || text.includes('tradition')) return faCrown;
  if (text.includes('museum') || text.includes('galerie')) return faUniversity;
  return faGem;
};

const RegionalSpecialties: React.FC<RegionalSpecialtiesProps> = ({
  specialties
}) => {
  return (
    <section className="page-section page-section--full" style={{
      background: 'linear-gradient(135deg, var(--state-primary-color), var(--state-secondary-color))',
      padding: 'var(--section-spacing-large) var(--section-spacing-small)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div className="page-section--main" style={{ position: 'relative', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          textAlign: 'center',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>Traditionen & Kulturelles Erbe</h2>
        
        <p style={{
          fontSize: '1.2rem',
          textAlign: 'center',
          maxWidth: 'var(--content-width-text)',
          margin: '0 auto 4rem',
          color: 'rgba(255, 255, 255, 0.9)',
          lineHeight: '1.6'
        }}>
          Entdecken Sie die reiche Geschichte, lebendigen Traditionen und das kulturelle Erbe der Region
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {specialties.map((category, index) => (
            <div key={index} className="content-card" style={{
              background: 'rgba(255, 255, 255, 0.98)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.5rem',
              height: '100%',
              transition: 'var(--transition-medium)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--state-primary-color), var(--state-secondary-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: '#ffffff',
                transition: 'var(--transition-medium)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                <FontAwesomeIcon 
                  icon={getCategoryIcon(category.icon)}
                  style={{
                    transform: 'scale(1)',
                    transition: 'var(--transition-medium)'
                  }}
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#333333',
                  marginBottom: '1rem',
                  transition: 'var(--transition-medium)'
                }}>{category.title}</h3>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} style={{
                      fontSize: '0.95rem',
                      color: '#666666',
                      padding: '0.75rem',
                      background: 'rgba(var(--state-primary-color-rgb), 0.03)',
                      borderRadius: '0.75rem',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      border: '1px solid rgba(var(--state-primary-color-rgb), 0.08)',
                      transition: 'var(--transition-medium)',
                      textAlign: 'left'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.25rem'
                      }}>
                        <FontAwesomeIcon 
                          icon={getCategoryIcon(item.icon)}
                          style={{
                            fontSize: '1rem',
                            color: 'var(--state-primary-color)',
                            opacity: 0.8
                          }}
                        />
                        <strong style={{ color: '#333333' }}>
                          {item.title}
                        </strong>
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        color: '#666666'
                      }}>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <style jsx>{`
                .content-card {
                  transition: var(--transition-medium);
                }
                .content-card:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                }
                .content-card:hover div > svg {
                  transform: scale(1.1) rotate(8deg);
                  color: #ffffff;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionalSpecialties; 