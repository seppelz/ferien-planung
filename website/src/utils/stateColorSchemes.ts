import { GermanState } from '../types/GermanState';

interface StateColorScheme {
  primary: {
    main: string;
    light: string;
    dark: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
  };
  accent: {
    main: string;
    light: string;
    dark: string;
  };
  background: {
    default: string;
    paper: string;
    subtle: string;
  };
  text: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
  };
  gradients: {
    primary: string;    // Tailwind gradient classes
    secondary: string;
    accent: string;
  };
  button: {
    primary: {
      background: string;
      hover: string;
      text: string;
    };
    secondary: {
      background: string;
      hover: string;
      text: string;
    };
    accent: {
      background: string;
      hover: string;
      text: string;
    };
  };
  border: {
    light: string;
    medium: string;
    dark: string;
  };
  shadow: {
    small: string;
    medium: string;
    large: string;
  };
}

// Berlin Color Scheme Example
// Based on Berlin's flag colors (red and white) with complementary accents
const berlinScheme: StateColorScheme = {
  primary: {
    main: '#E4003A',     // Berlin Red
    light: '#FF1A54',    // Lighter red
    dark: '#B30026',     // Darker red
  },
  secondary: {
    main: '#F5F5F5',     // Off-white
    light: '#FFFFFF',    // Pure white
    dark: '#E0E0E0',     // Light gray
  },
  accent: {
    main: '#004B93',     // Prussian Blue (historical accent)
    light: '#0066CC',    // Lighter blue
    dark: '#003366',     // Darker blue
  },
  background: {
    default: '#FFFFFF',
    paper: '#F8F9FA',
    subtle: '#F0F2F5',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    light: '#FFFFFF',
    dark: '#000000',
  },
  gradients: {
    primary: 'from-[#E4003A] to-[#FF1A54]',
    secondary: 'from-[#F5F5F5] to-[#E0E0E0]',
    accent: 'from-[#004B93] to-[#0066CC]',
  },
  button: {
    primary: {
      background: '#E4003A',
      hover: '#B30026',
      text: '#FFFFFF',
    },
    secondary: {
      background: '#F5F5F5',
      hover: '#E0E0E0',
      text: '#1A1A1A',
    },
    accent: {
      background: '#004B93',
      hover: '#003366',
      text: '#FFFFFF',
    },
  },
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
  },
  shadow: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
};

// Initialize color schemes for all states
const stateColorSchemes: Partial<Record<GermanState, StateColorScheme>> = {
  [GermanState.BE]: berlinScheme,
  [GermanState.BW]: {
    primary: {
      main: '#FFD700',     // Strong yellow
      light: '#FFE44D',    // Bright yellow
      dark: '#CC9900',     // Dark yellow
    },
    secondary: {
      main: '#FFA500',     // Strong amber
      light: '#FFB733',    // Bright amber
      dark: '#CC8400',     // Dark amber
    },
    accent: {
      main: '#FF8C00',     // Strong dark amber
      light: '#FFA333',    // Bright dark amber
      dark: '#CC7000',     // Dark amber
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#FFD700] to-[#FFA500]',
      secondary: 'from-[#FFA500] to-[#FFD700]',
      accent: 'from-[#FF8C00] to-[#FFD700]',
    },
    button: {
      primary: {
        background: '#FFD700',
        hover: '#CC9900',
        text: '#000000',
      },
      secondary: berlinScheme.button.secondary,
      accent: {
        background: '#FF8C00',
        hover: '#CC7000',
        text: '#000000',
      },
    },
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.BY]: {
    primary: {
      main: '#0066CC',     // Strong blue
      light: '#3385D6',    // Bright blue
      dark: '#004C99',     // Dark blue
    },
    secondary: {
      main: '#00994C',     // Strong green
      light: '#00B359',    // Bright green
      dark: '#007339',     // Dark green
    },
    accent: {
      main: '#008040',     // Strong green
      light: '#00A653',    // Bright green
      dark: '#006633',     // Dark green
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#0066CC] to-[#00994C]',
      secondary: 'from-[#00994C] to-[#0066CC]',
      accent: 'from-[#008040] to-[#0066CC]',
    },
    button: {
      primary: {
        background: '#0066CC',
        hover: '#004C99',
        text: '#FFFFFF',
      },
      secondary: berlinScheme.button.secondary,
      accent: {
        background: '#008040',
        hover: '#006633',
        text: '#FFFFFF',
      },
    },
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.BB]: {
    primary: {
      main: '#CC0000',     // Strong red
      light: '#D63333',    // Bright red
      dark: '#990000',     // Dark red
    },
    secondary: {
      main: '#FF6600',     // Strong orange
      light: '#FF8533',    // Bright orange
      dark: '#CC5200',     // Dark orange
    },
    accent: {
      main: '#FF4D00',     // Strong orange-red
      light: '#FF704D',    // Bright orange-red
      dark: '#CC3D00',     // Dark orange-red
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#CC0000] to-[#FF6600]',
      secondary: 'from-[#FF6600] to-[#CC0000]',
      accent: 'from-[#FF4D00] to-[#CC0000]',
    },
    button: {
      primary: {
        background: '#CC0000',
        hover: '#990000',
        text: '#FFFFFF',
      },
      secondary: berlinScheme.button.secondary,
      accent: {
        background: '#FF4D00',
        hover: '#CC3D00',
        text: '#FFFFFF',
      },
    },
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.HB]: {
    primary: {
      main: '#0099CC',     // Strong sky blue
      light: '#33ADD6',    // Bright sky blue
      dark: '#007399',     // Dark sky blue
    },
    secondary: {
      main: '#CC0000',     // Strong red
      light: '#D63333',    // Bright red
      dark: '#990000',     // Dark red
    },
    accent: {
      main: '#0088CC',     // Strong blue
      light: '#339DCC',    // Bright blue
      dark: '#006699',     // Dark blue
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#0099CC] to-[#CC0000]',
      secondary: 'from-[#CC0000] to-[#0099CC]',
      accent: 'from-[#0088CC] to-[#CC0000]',
    },
    button: {
      primary: {
        background: '#0099CC',
        hover: '#007399',
        text: '#FFFFFF',
      },
      secondary: berlinScheme.button.secondary,
      accent: {
        background: '#0088CC',
        hover: '#006699',
        text: '#FFFFFF',
      },
    },
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.HH]: {
    primary: {
      main: '#CC0000',     // Hamburg Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    secondary: {
      main: '#FFFFFF',     // Hamburg White
      light: '#FFFFFF',    // Pure white
      dark: '#E0E0E0',     // Light gray
    },
    accent: {
      main: '#B30000',     // Dark red
      light: '#CC3333',    // Lighter red
      dark: '#800000',     // Darker red
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#CC0000] to-[#E0E0E0]',
      secondary: 'from-[#E0E0E0] to-[#CC0000]',
      accent: 'from-[#B30000] to-[#CC0000]',
    },
    button: {
      primary: {
        background: '#CC0000',
        hover: '#990000',
        text: '#FFFFFF',
      },
      secondary: berlinScheme.button.secondary,
      accent: {
        background: '#B30000',
        hover: '#800000',
        text: '#FFFFFF',
      },
    },
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.HE]: {
    primary: {
      main: '#CC0000',     // Hessen Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    secondary: {
      main: '#FFFFFF',     // White
      light: '#FFFFFF',    // Pure white
      dark: '#E0E0E0',     // Light gray
    },
    accent: {
      main: '#B30000',     // Dark red
      light: '#CC3333',    // Lighter red
      dark: '#800000',     // Darker red
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#CC0000] to-[#E0E0E0]',
      secondary: 'from-[#E0E0E0] to-[#CC0000]',
      accent: 'from-[#B30000] to-[#CC0000]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.MV]: {
    primary: {
      main: '#003399',     // MV Blue
      light: '#0044CC',    // Lighter blue
      dark: '#002266',     // Darker blue
    },
    secondary: {
      main: '#CC0000',     // MV Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    accent: {
      main: '#FFD700',     // Gold
      light: '#FFE44D',    // Lighter gold
      dark: '#CC9900',     // Darker gold
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#003399] to-[#CC0000]',
      secondary: 'from-[#CC0000] to-[#003399]',
      accent: 'from-[#FFD700] to-[#003399]',
    },
    button: {
      primary: {
        background: '#003399',
        hover: '#002266',
        text: '#FFFFFF',
      },
      secondary: berlinScheme.button.secondary,
      accent: {
        background: '#CC0000',
        hover: '#990000',
        text: '#FFFFFF',
      },
    },
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.NI]: {
    primary: {
      main: '#000000',     // Lower Saxony Black
      light: '#333333',    // Lighter black
      dark: '#000000',     // Pure black
    },
    secondary: {
      main: '#CC0000',     // Lower Saxony Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    accent: {
      main: '#FFD700',     // Gold
      light: '#FFE44D',    // Lighter gold
      dark: '#CC9900',     // Darker gold
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#000000] to-[#CC0000]',
      secondary: 'from-[#CC0000] to-[#000000]',
      accent: 'from-[#FFD700] to-[#000000]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.NW]: {
    primary: {
      main: '#009933',     // NRW Green
      light: '#00B33E',    // Lighter green
      dark: '#006622',     // Darker green
    },
    secondary: {
      main: '#CC0000',     // NRW Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    accent: {
      main: '#FFFFFF',     // White
      light: '#FFFFFF',    // Pure white
      dark: '#E0E0E0',     // Light gray
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#009933] to-[#CC0000]',
      secondary: 'from-[#CC0000] to-[#009933]',
      accent: 'from-[#FFFFFF] to-[#009933]',
    },
    button: {
      primary: {
        background: '#009933',
        hover: '#006622',
        text: '#FFFFFF',
      },
      secondary: berlinScheme.button.secondary,
      accent: {
        background: '#CC0000',
        hover: '#990000',
        text: '#FFFFFF',
      },
    },
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.RP]: {
    primary: {
      main: '#CC0000',     // RP Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    secondary: {
      main: '#FFD700',     // Gold
      light: '#FFE44D',    // Lighter gold
      dark: '#CC9900',     // Darker gold
    },
    accent: {
      main: '#000000',     // Black
      light: '#333333',    // Lighter black
      dark: '#000000',     // Pure black
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#CC0000] to-[#FFD700]',
      secondary: 'from-[#FFD700] to-[#CC0000]',
      accent: 'from-[#000000] to-[#CC0000]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.SL]: {
    primary: {
      main: '#000000',     // Saarland Black
      light: '#333333',    // Lighter black
      dark: '#000000',     // Pure black
    },
    secondary: {
      main: '#CC0000',     // Saarland Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    accent: {
      main: '#FFFFFF',     // Saarland White
      light: '#FFFFFF',    // Pure white
      dark: '#E0E0E0',     // Light gray
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#000000] to-[#CC0000]',
      secondary: 'from-[#CC0000] to-[#000000]',
      accent: 'from-[#FFFFFF] to-[#000000]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.SN]: {
    primary: {
      main: '#007A3D',     // Saxony Green
      light: '#009949',    // Lighter green
      dark: '#005C2E',     // Darker green
    },
    secondary: {
      main: '#FFFFFF',     // White
      light: '#FFFFFF',    // Pure white
      dark: '#E0E0E0',     // Light gray
    },
    accent: {
      main: '#000000',     // Black
      light: '#333333',    // Lighter black
      dark: '#000000',     // Pure black
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#007A3D] to-[#FFFFFF]',
      secondary: 'from-[#FFFFFF] to-[#007A3D]',
      accent: 'from-[#000000] to-[#007A3D]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.ST]: {
    primary: {
      main: '#000000',     // Saxony-Anhalt Black
      light: '#333333',    // Lighter black
      dark: '#000000',     // Pure black
    },
    secondary: {
      main: '#FFD700',     // Gold
      light: '#FFE44D',    // Lighter gold
      dark: '#CC9900',     // Darker gold
    },
    accent: {
      main: '#009933',     // Green
      light: '#00B33E',    // Lighter green
      dark: '#006622',     // Darker green
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#000000] to-[#FFD700]',
      secondary: 'from-[#FFD700] to-[#000000]',
      accent: 'from-[#009933] to-[#000000]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.SH]: {
    primary: {
      main: '#003399',     // Schleswig-Holstein Blue
      light: '#0044CC',    // Lighter blue
      dark: '#002266',     // Darker blue
    },
    secondary: {
      main: '#CC0000',     // Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    accent: {
      main: '#FFD700',     // Gold
      light: '#FFE44D',    // Lighter gold
      dark: '#CC9900',     // Darker gold
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#003399] to-[#CC0000]',
      secondary: 'from-[#CC0000] to-[#003399]',
      accent: 'from-[#FFD700] to-[#003399]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
  [GermanState.TH]: {
    primary: {
      main: '#CC0000',     // Thuringia Red
      light: '#D63333',    // Lighter red
      dark: '#990000',     // Darker red
    },
    secondary: {
      main: '#FFFFFF',     // White
      light: '#FFFFFF',    // Pure white
      dark: '#E0E0E0',     // Light gray
    },
    accent: {
      main: '#FFD700',     // Gold
      light: '#FFE44D',    // Lighter gold
      dark: '#CC9900',     // Darker gold
    },
    background: berlinScheme.background,
    text: berlinScheme.text,
    gradients: {
      primary: 'from-[#CC0000] to-[#FFFFFF]',
      secondary: 'from-[#FFFFFF] to-[#CC0000]',
      accent: 'from-[#FFD700] to-[#CC0000]',
    },
    button: berlinScheme.button,
    border: berlinScheme.border,
    shadow: berlinScheme.shadow,
  },
};

// Export functions
export const getStateColorScheme = (stateId: GermanState): StateColorScheme => {
  return stateColorSchemes[stateId] || berlinScheme;
};

export const getStateColor = (
  stateId: GermanState,
  category: keyof StateColorScheme,
  subCategory: string
): string => {
  const scheme = getStateColorScheme(stateId);
  const categoryValue = scheme[category];
  if (typeof categoryValue === 'object' && categoryValue !== null) {
    return (categoryValue as Record<string, string>)[subCategory] || '';
  }
  return '';
};

export const getStateGradient = (
  stateId: GermanState,
  type: 'primary' | 'secondary' | 'accent' = 'primary'
): string => {
  const scheme = getStateColorScheme(stateId);
  return scheme.gradients[type];
}; 