# 🏖 Holiday Planner

Ein modernes Tool zur Urlaubsplanung und Brückentag-Analyse.

## Features

### Implementiert ✅
- 🗓 Intelligente Berechnung von Brückentagen
  - Berücksichtigung von Wochenenden
  - Optimale Verbindung von Feiertagen
  - Effizienzberechnung (Urlaubstage vs. freie Tage)
- 🌍 Unterstützung für alle Bundesländer
  - Bundesweite Feiertage
  - Länderspezifische Feiertage
  - Schulferien-Integration
- 🎨 Modernes UI-Design
  - Responsive Layout für Desktop und Mobile
  - State-spezifische Themes
  - Glassmorphism Effekte
  - Kompakte Menüleiste mit erweiterbarer Ansicht
- 🤝 Erweiterte Dual-State Unterstützung
  - Auswahl zweier Bundesländer
  - Kombinierte Kalenderansicht
  - Separate Urlaubsplanung pro Person
  - Urlaubstage-Tracking pro Person
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
  1. Optimierung der Urlaubsauswahl
     - Verbesserte farbliche Kennzeichnung der Auswahl
     - Hover-Effekte für Datumsbereich
     - Klarere visuelle Unterscheidung zwischen Start- und Enddatum
  2. UX-Verbesserungen
     - Besseres Feedback während der Auswahl
     - Tooltips und Hilfestellungen
     - Optimierte Mobile-Ansicht

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
- `m` - Neuen Urlaub für Person 2 planen
- `1-4` - Urlaub 1-4 von Person 1 löschen (4 löscht den letzten bei mehr als 4)
- `5-8` - Urlaub 1-4 von Person 2 löschen (8 löscht den letzten bei mehr als 4)
- `p` - Person 2 ein-/ausblenden
- `←/→` - Vorheriger/Nächster Tag
- `↑/↓` - Vorherige/Nächste Woche
- `Enter` - Tag auswählen

## Tech Stack
- ⚛️ React 18 mit TypeScript
- 🎨 TailwindCSS für Styling
- 📦 Zustand für State Management
- 🏃 Vite als Build Tool
- 🧪 Jest für Testing

## Roadmap
1. Q1 2024
   - [x] Grundlegende Kalenderfunktionalität
   - [x] Bundesland-spezifische Feiertage
   - [x] Brückentag-Berechnung
   - [x] Zwei-Personen-Support
   - [x] Direkte Kalenderauswahl
   - [x] Tastatursteuerung
   - [x] Intelligente Urlaubsverwaltung

2. Q2 2024
   - [ ] Optimierte Urlaubsauswahl
   - [ ] Erweiterte Personenfunktionen
   - [ ] Mobile Optimierung
   - [ ] PWA-Unterstützung

3. Q3 2024
   - [ ] Export-Funktionalität (PDF, iCal)
   - [ ] Erweiterte Statistiken
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
- 📋 GitHub Projects für Projektmanagement
- 🔄 GitHub Actions für CI/CD
- 📱 Mobile-First Design Prinzipien

## Browser-Unterstützung
- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)

## Lizenz
MIT
