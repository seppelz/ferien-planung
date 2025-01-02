import React from 'react';
import styles from './SeasonalSection.module.css';

export interface SeasonalSectionProps {
  traditions: {
    season: 'Frühling' | 'Sommer' | 'Herbst' | 'Winter';
    description: string;
    events?: string[];
  }[];
  traditionInfo?: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

export const SeasonalSection: React.FC<SeasonalSectionProps> = ({
  traditions,
  traditionInfo,
  primaryColor,
  secondaryColor,
  tertiaryColor
}) => {
  return (
    <section className={styles.seasonalSection}>
      <h2 style={{ color: primaryColor }}>Seasonal Traditions</h2>
      {traditionInfo && (
        <p className={styles.traditionInfo} style={{ color: secondaryColor }}>
          {traditionInfo}
        </p>
      )}
      <div className={styles.traditionsGrid}>
        {traditions.map((tradition, index) => (
          <div
            key={index}
            className={styles.traditionCard}
            style={{
              borderColor: index % 2 === 0 ? primaryColor : secondaryColor,
              backgroundColor: `${index % 2 === 0 ? primaryColor : secondaryColor}10`
            }}
          >
            <h3 style={{ color: tertiaryColor || primaryColor }}>{tradition.season}</h3>
            <p>{tradition.description}</p>
            {tradition.events && (
              <ul className={styles.eventsList}>
                {tradition.events.map((event, eventIndex) => (
                  <li key={eventIndex} style={{ color: secondaryColor }}>{event}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}; 