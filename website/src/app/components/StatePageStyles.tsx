'use client';

import React from 'react';

interface StatePageStylesProps {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor?: string;
}

const StatePageStyles: React.FC<StatePageStylesProps> = ({
  primaryColor,
  secondaryColor,
  tertiaryColor
}) => {
  return (
    <style jsx global>{`
      :root {
        /* Base Colors */
        --state-primary-color: ${primaryColor};
        --state-secondary-color: ${secondaryColor};
        --state-tertiary-color: ${tertiaryColor || secondaryColor};
        
        /* Text Colors */
        --state-text-primary: #1a1a1a;
        --state-text-secondary: #4a4a4a;
        --state-text-muted: #666666;
        --state-text-on-primary: #ffffff;
        --state-text-on-hero: #ffffff;
        
        /* Background Colors */
        --state-background-light: #ffffff;
        --state-background-subtle: #f8f9fa;
        --state-background-accent: #f0f2f5;
        
        /* Border Colors */
        --state-border-light: rgba(0, 0, 0, 0.1);
        --state-border-lighter: rgba(0, 0, 0, 0.05);
        
        /* Gradient Backgrounds */
        --state-gradient-hero: linear-gradient(135deg, 
          color-mix(in srgb, var(--state-primary-color) 90%, var(--landing-primary)),
          color-mix(in srgb, var(--state-secondary-color) 90%, var(--landing-secondary))
        );
        
        --state-gradient-intense: linear-gradient(135deg,
          var(--state-primary-color),
          var(--state-secondary-color)
        );
        
        --state-gradient-subtle: linear-gradient(135deg, 
          color-mix(in srgb, var(--state-primary-color) 10%, white),
          color-mix(in srgb, var(--state-secondary-color) 10%, white)
        );

        /* Section Gradients */
        --section-primary-gradient: linear-gradient(135deg,
          color-mix(in srgb, var(--landing-primary) 85%, var(--state-primary-color)),
          color-mix(in srgb, var(--landing-secondary) 85%, var(--state-secondary-color))
        );

        --section-secondary-gradient: linear-gradient(135deg,
          color-mix(in srgb, var(--landing-primary) 95%, var(--state-primary-color)),
          color-mix(in srgb, var(--landing-secondary) 95%, var(--state-secondary-color))
        );

        /* Spacing System */
        --section-spacing-large: 6rem;
        --section-spacing-medium: 4rem;
        --section-spacing-small: 2rem;

        /* Content Widths */
        --content-width-full: 1400px;
        --content-width-main: 1200px;
        --content-width-text: 800px;
        
        /* Alpha Colors */
        --state-primary-alpha-10: ${primaryColor}1A;
        --state-primary-alpha-20: ${primaryColor}33;
        --state-hover-overlay: rgba(255, 255, 255, 0.1);
        
        /* Shadows */
        --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
        --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
        
        /* Card Styles */
        --card-background: white;
        --card-border: 1px solid var(--state-border-lighter);
        --card-radius: 1rem;
        --card-shadow: var(--shadow-md);
        
        /* Transitions */
        --transition-fast: 0.2s ease;
        --transition-medium: 0.3s ease;
        --transition-slow: 0.5s ease;
      }

      /* Section Styles */
      .page-section {
        margin: var(--section-spacing-large) auto;
        padding: 0 var(--section-spacing-small);
      }

      .page-section--full {
        max-width: var(--content-width-full);
      }

      .page-section--main {
        max-width: var(--content-width-main);
      }

      .page-section--text {
        max-width: var(--content-width-text);
      }

      /* Card Styles */
      .content-card {
        background: var(--card-background);
        border: var(--card-border);
        border-radius: var(--card-radius);
        box-shadow: var(--card-shadow);
        transition: transform var(--transition-fast), box-shadow var(--transition-fast);
      }

      .content-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      /* Text Styles */
      .text-gradient {
        background: var(--state-gradient-intense);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `}</style>
  );
};

export default StatePageStyles; 