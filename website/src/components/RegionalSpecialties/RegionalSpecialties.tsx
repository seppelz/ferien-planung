import React from 'react';
import styles from './RegionalSpecialties.module.css';
import { RegionalCategory } from '../../types/state';

export interface RegionalSpecialtiesProps {
  specialties: RegionalCategory[];
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

export const RegionalSpecialties: React.FC<RegionalSpecialtiesProps> = ({
  specialties,
  primaryColor,
  secondaryColor,
  tertiaryColor
}) => {
  return (
    <section className={styles.regionalSpecialties}>
      <h2 style={{ color: primaryColor }}>Regional Specialties</h2>
      <div className={styles.specialtiesGrid}>
        {specialties.map((category, index) => (
          <div
            key={index}
            className={styles.categoryCard}
            style={{
              borderColor: index % 2 === 0 ? primaryColor : secondaryColor,
              backgroundColor: `${index % 2 === 0 ? primaryColor : secondaryColor}10`
            }}
          >
            <h3 style={{ color: tertiaryColor || primaryColor }}>{category.name}</h3>
            <p>{category.description}</p>
            {category.items && (
              <ul className={styles.itemsList}>
                {category.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} style={{ color: secondaryColor }}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}; 