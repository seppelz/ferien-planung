# Ferien-Planung Project Handover

## Project Overview

This project consists of two main parts:
1. Main Website (`ferien-planung.de`)
2. Holiday Planning App (`app.ferien-planung.de`)

## Project Structure

```
ferien-planung/
├── src/
│   ├── components/         # Shared React components
│   ├── config/            # Configuration and state data
│   │   └── states/        # Individual German state configurations
│   ├── data/             # Holiday data and utilities
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Page layouts
│   ├── pages/            # Page components
│   │   ├── LandingPage/  # Main website landing page
│   │   └── StatePage/    # Individual state pages
│   ├── services/         # Business logic services
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
```

## Key Features

### Main Website (`ferien-planung.de`)
- Landing page with state overview
- Individual state pages with:
  - Holiday information
  - Cultural highlights
  - Regional specialties
  - Vacation destinations
  - Seasonal traditions

### Holiday Planning App (`app.ferien-planung.de`)
- Interactive calendar
- Bridge day calculations
- Vacation planning tools
- Holiday efficiency analysis
- Multi-state comparison

## Deployment Plan

### Vercel Setup
1. Create two separate Vercel projects:
   - Main website: `ferien-planung`
   - App: `app-ferien-planung`

2. Configure domains:
   - Main website: `ferien-planung.de`
   - App: `app.ferien-planung.de`

3. Environment setup:
   ```
   NEXT_PUBLIC_APP_URL=https://app.ferien-planung.de
   NEXT_PUBLIC_WEBSITE_URL=https://ferien-planung.de
   ```

### Build Configuration
- The project uses TypeScript and React
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 18.x

### Deployment Process
1. Push changes to the main branch
2. Vercel automatically triggers deployment
3. Build process runs type checks and tests
4. If successful, changes are deployed to production

## Type System

The project uses TypeScript with several key types:

### Holiday Types
```typescript
type Holiday = SingleDayHoliday | MultiDayHoliday | BridgeDay;

interface BaseHoliday {
  type: 'public' | 'school' | 'bridge';
  details?: {
    description: string;
    traditions?: string[];
    culturalSignificance?: string;
    locations?: string[];
  };
}
```

### State Information
```typescript
interface StateInfo {
  fullName: string;
  shortName: string;
  capital: string;
  description: string;
  culturalHighlights: string[];
  holidays: Holiday[];
  schoolHolidays: Holiday[];
  // ... additional state information
}
```

## Current Status

1. Main Features:
   - ✅ Holiday calculations
   - ✅ State information
   - ✅ Bridge day analysis
   - ✅ Calendar integration

2. In Progress:
   - 🔄 Type system cleanup
   - 🔄 Test removal
   - 🔄 Build optimizations

3. Next Steps:
   - Set up Vercel projects
   - Configure domains
   - Deploy initial versions
   - Monitor performance

## Important Notes

1. **Type System**: Currently cleaning up type definitions to ensure consistency between holiday types and state information.

2. **Test Removal**: Removing test files and dependencies to optimize production build.

3. **Build Process**: Addressing TypeScript errors before deployment:
   - Holiday type definitions
   - State information interfaces
   - Date handling consistency

4. **Performance**: The app uses:
   - Date-fns for date calculations
   - React memo for component optimization
   - TypeScript for type safety







