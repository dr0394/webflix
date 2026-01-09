# Highlight Overlay System - Clean Section-Based

## Übersicht

Das Highlight Overlay System zeigt Kunden beim Ausfüllen der Checkliste **visuell und präzise**, wo ihre Eingaben auf der Demo-Website erscheinen.

## ✅ Wie es funktioniert

### 1. **Checklist Template basiert**
- Jede Demo hat ein Checklist-Template in der Datenbank
- Template definiert Sections: `basic_info`, `services`, `content`, `contact`, etc.
- Jede Section hat Fields: `company_name`, `hero_title`, `phone`, etc.

### 2. **1:1 Mapping**
- Jedes Checklist-Field ist **exakt** mit einem Highlight-Bereich verknüpft
- Field ID (z.B. `hero_title`) → Zone mit gleicher ID
- Position in Demo ist **präzise definiert** (%, top/left/width/height)

### 3. **Section-IDs für Kontext**
- Jede Zone hat `sectionId` (z.B. `hero-section`, `services`, `contact`)
- Ermöglicht Section-basierte Highlights
- Kunde kann sehen: "Alle Hero-Felder"

## 📁 Dateistruktur

```
src/
├── lib/
│   └── demoHighlightMappings.ts    # Alle Mappings
├── components/
│   └── checklist/
│       ├── ChecklistForm.tsx       # 2-Spalten Layout
│       └── HighlightOverlay.tsx    # Overlay Component
```

## 🎯 Mapping-Struktur

```typescript
{
  autoaufbereitung: {
    demoUrl: '/demo/autoaufbereitung',
    zones: [
      {
        id: 'company_name',              // MUSS mit Field-ID übereinstimmen!
        label: 'Firmenname',             // Anzeige-Name
        sectionId: 'hero-section',       // Zu welcher Section gehört es?
        top: '2%',                       // Position von oben
        left: '3%',                      // Position von links
        width: '15%',                    // Breite der Box
        height: '4%',                    // Höhe der Box
        description: 'Ihr Firmenname erscheint im Header-Logo-Bereich'
      }
    ]
  }
}
```

## 📊 Field-ID → Zone Matching

**Checklist Template:**
```json
{
  "fields": [
    {"id": "company_name", "label": "Firmenname"},
    {"id": "hero_title", "label": "Hero-Überschrift"},
    {"id": "phone", "label": "Telefonnummer"}
  ]
}
```

**Highlight Mapping:**
```typescript
zones: [
  { id: 'company_name', top: '2%', left: '3%' },
  { id: 'hero_title', top: '22%', left: '10%' },
  { id: 'phone', top: '2%', left: '85%' }
]
```

## 🎨 Sections

| Section ID | Fields | Demo-Bereich |
|-----------|--------|-------------|
| `hero-section` | company_name, hero_title, hero_subtitle, badges | Hero (0-55%) |
| `services` | main_services | Services (65-90%) |
| `contact` | email, address, hours | Footer (95-100%) |

## 🔧 Neue Demo hinzufügen

1. **Checklist Fields sammeln**
2. **Demo im Browser inspizieren**
3. **Positionen messen (DevTools)**
4. **Mapping erstellen**

## 🎯 Vorhandene Demos

✅ 13 Demos konfiguriert (autoaufbereitung, bauunternehmen, beauty, elektriker, gartenlandschaftsbau, gastro, gebaeudereinigung, handwerk, metallbau, metzgerei, personalbrand, physiotherapie, security)
