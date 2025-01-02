import React from 'react';
import styles from './CulturalHighlights.module.css';

export interface CulturalHighlightsProps {
  highlights: string[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

export const CulturalHighlights: React.FC<CulturalHighlightsProps> = ({
  highlights,
  primaryColor,
  secondaryColor,
  tertiaryColor
}) => {
  return (
    <section className={styles.culturalHighlights}>
      <h2 style={{ color: primaryColor }}>Cultural Highlights</h2>
      <div className={styles.highlightsList}>
        {highlights.map((highlight, index) => (
          <div 
            key={index}
            className={styles.highlight}
            style={{
              borderColor: index % 2 === 0 ? primaryColor : secondaryColor,
              backgroundColor: `${index % 2 === 0 ? primaryColor : secondaryColor}10`
            }}
          >
            <p>{highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}; 