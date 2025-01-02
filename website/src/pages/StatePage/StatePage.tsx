import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStateColorScheme } from '../../utils/stateColorSchemes';
import { GermanState } from '../../types/GermanState';
import styles from './StatePage.module.css';
import { StatePageHoliday } from './types';

const StatePage: React.FC = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [selectedHoliday, setSelectedHoliday] = useState<StatePageHoliday | null>(null);

  useEffect(() => {
    if (stateId) {
      const colorScheme = getStateColorScheme(stateId as GermanState);
      
      // Inject primary colors
      document.documentElement.style.setProperty('--state-color-primary-main', colorScheme.primary.main);
      document.documentElement.style.setProperty('--state-color-primary-light', colorScheme.primary.light);
      document.documentElement.style.setProperty('--state-color-primary-dark', colorScheme.primary.dark);

      // Inject secondary colors
      document.documentElement.style.setProperty('--state-color-secondary-main', colorScheme.secondary.main);
      document.documentElement.style.setProperty('--state-color-secondary-light', colorScheme.secondary.light);
      document.documentElement.style.setProperty('--state-color-secondary-dark', colorScheme.secondary.dark);

      // Inject accent colors
      document.documentElement.style.setProperty('--state-color-accent-main', colorScheme.accent.main);
      document.documentElement.style.setProperty('--state-color-accent-light', colorScheme.accent.light);
      document.documentElement.style.setProperty('--state-color-accent-dark', colorScheme.accent.dark);

      // Inject background colors
      document.documentElement.style.setProperty('--state-color-bg-default', colorScheme.background.default);
      document.documentElement.style.setProperty('--state-color-bg-paper', colorScheme.background.paper);
      document.documentElement.style.setProperty('--state-color-bg-subtle', colorScheme.background.subtle);

      // Inject text colors
      document.documentElement.style.setProperty('--state-color-text-primary', colorScheme.text.primary);
      document.documentElement.style.setProperty('--state-color-text-secondary', colorScheme.text.secondary);
      document.documentElement.style.setProperty('--state-color-text-light', colorScheme.text.light);
      document.documentElement.style.setProperty('--state-color-text-dark', colorScheme.text.dark);

      // Inject gradient classes
      document.documentElement.style.setProperty('--state-gradient-primary', colorScheme.gradients.primary);
      document.documentElement.style.setProperty('--state-gradient-secondary', colorScheme.gradients.secondary);
      document.documentElement.style.setProperty('--state-gradient-accent', colorScheme.gradients.accent);

      // Inject button colors
      document.documentElement.style.setProperty('--state-color-button-primary-bg', colorScheme.button.primary.background);
      document.documentElement.style.setProperty('--state-color-button-primary-hover', colorScheme.button.primary.hover);
      document.documentElement.style.setProperty('--state-color-button-primary-text', colorScheme.button.primary.text);

      document.documentElement.style.setProperty('--state-color-button-secondary-bg', colorScheme.button.secondary.background);
      document.documentElement.style.setProperty('--state-color-button-secondary-hover', colorScheme.button.secondary.hover);
      document.documentElement.style.setProperty('--state-color-button-secondary-text', colorScheme.button.secondary.text);

      document.documentElement.style.setProperty('--state-color-button-accent-bg', colorScheme.button.accent.background);
      document.documentElement.style.setProperty('--state-color-button-accent-hover', colorScheme.button.accent.hover);
      document.documentElement.style.setProperty('--state-color-button-accent-text', colorScheme.button.accent.text);

      // Inject border colors
      document.documentElement.style.setProperty('--state-color-border-light', colorScheme.border.light);
      document.documentElement.style.setProperty('--state-color-border-medium', colorScheme.border.medium);
      document.documentElement.style.setProperty('--state-color-border-dark', colorScheme.border.dark);

      // Inject shadows
      document.documentElement.style.setProperty('--state-shadow-small', colorScheme.shadow.small);
      document.documentElement.style.setProperty('--state-shadow-medium', colorScheme.shadow.medium);
      document.documentElement.style.setProperty('--state-shadow-large', colorScheme.shadow.large);

      // Set up intersection observer for animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.visible);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        }
      );

      sectionsRef.current.forEach((section: HTMLElement) => {
        if (section) observer.observe(section);
      });

      // Clean up function
      return () => {
        sectionsRef.current.forEach((section: HTMLElement) => {
          if (section) observer.unobserve(section);
        });
        
        // Reset all custom properties
        const customProperties = [
          '--state-color-primary-main',
          '--state-color-primary-light',
          '--state-color-primary-dark',
          '--state-color-secondary-main',
          '--state-color-secondary-light',
          '--state-color-secondary-dark',
          '--state-color-accent-main',
          '--state-color-accent-light',
          '--state-color-accent-dark',
          '--state-color-bg-default',
          '--state-color-bg-paper',
          '--state-color-bg-subtle',
          '--state-color-text-primary',
          '--state-color-text-secondary',
          '--state-color-text-light',
          '--state-color-text-dark',
          '--state-gradient-primary',
          '--state-gradient-secondary',
          '--state-gradient-accent',
          '--state-color-button-primary-bg',
          '--state-color-button-primary-hover',
          '--state-color-button-primary-text',
          '--state-color-button-secondary-bg',
          '--state-color-button-secondary-hover',
          '--state-color-button-secondary-text',
          '--state-color-button-accent-bg',
          '--state-color-button-accent-hover',
          '--state-color-button-accent-text',
          '--state-color-border-light',
          '--state-color-border-medium',
          '--state-color-border-dark',
          '--state-shadow-small',
          '--state-shadow-medium',
          '--state-shadow-large'
        ];

        customProperties.forEach(prop => {
          document.documentElement.style.removeProperty(prop);
        });
      };
    }
  }, [stateId]);

  return (
    <div className={styles.statePage}>
      {/* Your existing JSX */}
    </div>
  );
};

export default StatePage; 