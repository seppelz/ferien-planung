# Project Handover

## Project Structure

The `ferien-planung` repository contains **TWO separate applications** in one monorepo:

```
C:\Work\ferien-planung\
│
├── website/                    → Next.js Website (SEO Landing Page)
│   ├── src/app/page.tsx       → Main landing page (visible on Vercel root)
│   ├── src/app/states/        → State-specific SEO pages (e.g., /states/berlin)
│   ├── src/app/app/           → Redirect to React planner
│   ├── src/components/        → Website components (Navigation, Footer, etc.)
│   └── package.json           → Separate dependencies for Next.js
│
├── src/                       → React Calendar App (PWA)
│   ├── App.tsx                → Calendar application (basename="/app")
│   ├── pages/                 → App pages (HomePage, StatePage, etc.)
│   └── components/            → Calendar components
│
├── vercel.json                → Vercel config pointing to website folder
└── package.json               → React app dependencies
```

### How Vercel Deploys This

Vercel configuration (`vercel.json`):
```json
{
  "buildCommand": "cd website && npm install --force && npm run build",
  "outputDirectory": "website/out"
}
```

**Deployment Routes:**
- `/` → Next.js landing page from `website/` folder
- `/states/berlin`, `/states/bayern`, etc. → Next.js state pages (SEO optimized)
- `/app` → React calendar application (the actual vacation planner tool)

### Why Two Applications?

**Website (`/website/`)** - Next.js for SEO:
- Server-side rendering
- SEO-optimized landing pages
- State-specific pages with rich metadata
- Blog-style content

**App (`/src/`)** - React PWA for functionality:
- Interactive calendar
- Offline capability
- Fast client-side interactions
- Vacation planning tools

## Recent Progress

1. Implemented PWA support with:
   - Service worker for offline functionality
   - Web manifest configuration
   - Install prompt and update notifications
   - Offline fallback page
2. Mobile optimization improvements:
   - Compact state selector and vacation counter
   - Modern select design
   - Efficiency score calculation fixes
   - Export functionality in mobile view
3. Fixed efficiency calculation discrepancy
4. Updated desktop sidebars to match mobile style
5. Simplified project scope:
   - Removed unnecessary features
   - Focused on core functionality
   - Streamlined roadmap

## Current State

1. Mobile optimization is nearly complete with:
   - Touch interactions
   - Responsive layout
   - Mobile-specific components
   - Modern UI design
2. PWA functionality is implemented and tested:
   - Offline support
   - Install capability
   - Update handling
3. Core features are stable:
   - Vacation planning
   - Bridge day calculations
   - Export functionality
   - Two-person support

## Next Steps

1. Complete remaining mobile optimization tasks:
   - Final touch interaction testing
   - Cross-device verification
   - Performance optimization
2. Prepare for deployment:
   - Final testing
   - Documentation updates
   - Build optimization
3. Post-deployment features (future consideration):
   - Team calendar feature
   - Internationalization
   - Extended analytics

## Known Issues

1. Some mobile touch interactions need cross-device testing
2. Build size optimization might be needed
3. Service worker update handling in development mode

## Dependencies

- Vite for build and PWA support
- React 18 with TypeScript
- TailwindCSS for styling
- Service worker for offline functionality
- IndexedDB/localStorage for data persistence

## Notes

- All critical functionality is working
- PWA implementation is complete
- Mobile optimization is nearly finished
- Project scope has been streamlined for initial release