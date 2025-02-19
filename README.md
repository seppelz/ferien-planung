# 🏖 Holiday Planner

Ein modernes Tool zur Urlaubsplanung und Brückentag-Analyse.

## 📚 Documentation & Project Management

### Project Documentation
- `README.md` - Overview and main documentation
- `handover.md` - Current state, recent changes, and development context
- `.github/CONTRIBUTING.md` - Contribution guidelines and project management workflows
- `.github/ISSUE_TEMPLATE/` - Standardized templates for issues and features

### AI Collaboration
- 🤖 **Automated Assistance**
  - Code analysis and suggestions
  - Documentation maintenance
  - Issue management
  - Quality assurance
- 🔄 **Workflow Integration**
  - Automated project board updates
  - Smart dependency analysis
  - Proactive issue identification
  - Real-time documentation updates
- 🛡️ **Quality Standards**
  - Complete file reading before edits
  - Dependency preservation
  - Test maintenance
  - Mobile-first approach

### Project Management
- GitHub Project Board: [Holiday Planner Board](https://github.com/users/seppelz/projects/3)
- Access options:
  1. Direct URL: https://github.com/users/seppelz/projects/3
  2. Via repository: `gh browse -R seppelz/holiday` then click "Projects" tab
- Milestones: See CONTRIBUTING.md for current milestone structure
- Issue Management: Follow templates in .github/ISSUE_TEMPLATE/

#### Project Board Management via CLI
To read the project board using GitHub CLI and GraphQL:

# Create a query file
echo 'query{user(login:"seppelz"){projectV2(number:3){items(first:100){nodes{fieldValues(first:10){nodes{...on ProjectV2ItemFieldSingleSelectValue{name}}}content{...on Issue{number title state}}}}}}' > query.graphql

# Execute the query
gh api graphql -F query=@query.graphql

This will return all issues with their current status (Todo/Done) and state (OPEN/CLOSED).

For detailed information about project management, contribution guidelines, and development workflows, please refer to [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## Features

### Implementiert ✅
- 🗓 Intelligente Berechnung von Brückentagen
  - Berücksichtigung von Wochenenden und Feiertagen
  - Optimale Verbindung von Feiertagen
  - Präzise Effizienzberechnung (z.B. "1d = 5d")
  + Korrekte Berechnung für 2024-2026
  + 365-Tage-Vorschau für bessere Planung
  + Chronologische Sortierung der Empfehlungen
  + Vollständige Zeiträume in Empfehlungen
  + Schulferien als reine Information (nicht als freie Tage)
- 🌍 Unterstützung für alle Bundesländer
  - Bundesweite Feiertage
  - Länderspezifische Feiertage
  + Schulferien als optionale Information
  + Öffentliche Feiertage für 2024-2026
- 🎨 Modernes UI-Design
  - Responsive Layout für Desktop und Mobile
  - State-spezifische Themes
  - Glassmorphism Effekte
  - Kompakte Menüleiste mit erweiterbarer Ansicht
  + Vereinfachte Urlaubstage-Anzeige
  + Verbesserte Tooltip-Darstellung
  + Optimierte Empfehlungsliste mit automatischer Aktualisierung
  + Übersichtlichere Sidebar-Struktur
- 🤝 Erweiterte Dual-State Unterstützung
  - Auswahl zweier Bundesländer
  - Kombinierte Kalenderansicht
  - Separate Urlaubsplanung pro Person
  - Urlaubstage-Tracking pro Person
  + Gemeinsame Urlaubstage-Hervorhebung
  + Verbesserte Empfehlungen pro Person
- ⌨️ Umfangreiche Tastatursteuerung
  - Schnelle Navigation (Pfeiltasten, Tab)
  - Urlaubsplanung (n für Person 1, m für Person 2)
  - Direkte Urlaubsverwaltung (1-8 für schnelles Löschen)
  - Hilfemenü mit ? Taste
- 📅 Intelligente Urlaubsplanung
  - Direkte Kalenderauswahl für Urlaubstage
  - Automatische Zusammenführung überlappender Urlaube
  - Verhinderung von Doppelbuchungen
  - Smarte Benachrichtigungen für Benutzerinteraktionen
- 💾 Lokale Datenspeicherung
  - Persistente Speicherung aller Einstellungen
  - Automatisches Laden beim Start
  - Sortierte Urlaubsanzeige nach Datum

### In Entwicklung 🚧
- 📱 Aktuelle Prioritäten
  1. ✅ Person 2 Testing abgeschlossen
     ✅ Brückentag-Berechnung für beide Personen
     ✅ Urlaubsüberlappungen
     ✅ Gemeinsame Urlaubstage
  2. ✅ UX-Verbesserungen
     ✅ Besseres Feedback während der Auswahl
     ✅ Tooltips und Hilfestellungen
     ✅ Korrekte Zeitraumdarstellung
  3. Nächste Schritte
     - Mobile Optimierung
     - Export-Funktionalität
     - Erweiterte Statistiken

- 📱 Mobile Optimierung
  - Separate Komponenten für Mobile/Desktop
  - Verbesserte Touch-Interaktion
  - Angepasstes Layout für kleine Bildschirme
- 🧮 Erweiterte Analysefunktionen
  - Effizienzkalkulation für kombinierte Staaten
  - Hervorhebung optimaler Kombinationen
- 📊 Statistiken und Auswertungen
  - Urlaubsübersicht pro Person
  - Vergleich zwischen Personen
  - Jahresauswertung

### Technische Verbesserungen ✅
- ✅ Personenbasiertes Datenmodell
- ✅ Optimierte Kalenderdarstellung
- ✅ Modernes, responsives Design
- ✅ Effizientes State-Management
- ✅ TypeScript-Integration
- ✅ Komponenten-Struktur für Desktop/Mobile
- ✅ Erweiterte Test-Abdeckung
- ✅ Direkte Kalenderintegration für Urlaubsauswahl
- ✅ Intelligentes Benachrichtigungssystem
- ✅ Automatische Urlaubsorganisation

## Tastaturkürzel
- `?` - Zeigt/Versteckt die Tastaturkürzel-Übersicht
- `n` - Neuen Urlaub für Person 1 planen
- `m` - Neuen Urlaub für Person 2 planen (aktiviert Person 2 automatisch)
- `1-4` - Urlaub 1-4 von Person 1 löschen
- `5-8` - Urlaub 1-4 von Person 2 löschen
- `p` - Person 2 ein-/ausblenden
- `←/→` - Vorheriger/Nächster Tag
- `↑/↓` - Vorherige/Nächste Woche
- `Enter` - Tag auswählen
- `Esc` - Aktuelle Aktion abbrechen

## Zwei-Personen Funktionalität
- 🤝 Separate Urlaubsplanung
  - Unabhängige Bundesland-Auswahl
  - Getrennte Urlaubskontingente
  - Individuelle Brückentag-Berechnung
- 📊 Gemeinsame Übersicht
  - Hervorhebung überlappender Urlaube
  - Kombinierte Kalenderansicht
  - Effiziente Urlaubsplanung für beide
- ⚡ Schnelle Bedienung
  - Tastaturkürzel für beide Personen
  - Einfaches Umschalten (p-Taste)
  - Automatische Person 2 Aktivierung bei Bedarf

## Tech Stack
- ⚛️ React 18 mit TypeScript
- 🎨 TailwindCSS für Styling
- 📦 Zustand für State Management
- 🏃 Vite als Build Tool
- 🧪 Jest für Testing
- Grundregel für die Zusammenarbeit: Du liest Dateien immer erst komplett und führst dann Optimierungen und Erweiterungen durch, damit wir keinen existierenden Code zerstören.Dies ist wichtig. Und bei Codeabschnitten immer informationen wie // ... rest of existing code.. hinzuf��gen oder voranstellen, damit kein Code verloren geht.

## Roadmap
1. Q1 2024 ✅
   - [x] Grundlegende Kalenderfunktionalität
   - [x] Bundesland-spezifische Feiertage
   - [x] Brückentag-Berechnung
   - [x] Zwei-Personen-Support
   - [x] Direkte Kalenderauswahl
   - [x] Tastatursteuerung
   - [x] Intelligente Urlaubsverwaltung
   - [x] Verbesserte Brückentag-Berechnung
   - [x] Person 2 Testing
   - [x] Öffentliche Feiertage 2024-2026
   - [x] Korrekte Effizienzberechnung
   - [x] Schulferien-Integration

2. Q2 2024 🚧
   - [x] PWA-Unterstützung
   - [ ] Mobile Optimierung
     - [x] Separate Komponenten
     - [x] Modernes Design
     - [ ] Touch-Interaktion Testing
     - [ ] Performance Optimierung

3. Post-Release Features ⏳
   - [ ] Team-Kalender Feature
   - [ ] Internationalisierung

## Installation & Entwicklung

### Setup
```bash
git clone https://github.com/seppelz/holiday.git
cd holiday
npm install
npm run dev
```

### Projektstruktur
```
src/
├── components/
│   ├── Desktop/       # Desktop-spezifische Komponenten
│   ├── Mobile/        # Mobile-spezifische Komponenten
│   └── Shared/        # Gemeinsam genutzte Komponenten
├── contexts/          # React Contexts
├── hooks/             # Custom Hooks
├── layouts/           # Layout Komponenten
├── pages/             # Seiten-Komponenten
├── services/          # API Services
├── types/            # TypeScript Typen
└── utils/            # Hilfsfunktionen
```

### Entwicklungsrichtlinien
- 🌿 GitHub Flow für Branching
- 📝 Conventional Commits
- 📋 GitHub Projects für Projektmanagement: $ gh issue list
- 🔄 GitHub Actions für CI/CD
- 📱 Mobile-First Design Prinzipien

## Browser-Unterstützung
- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)

## Lizenz
MIT
