# Dynamic Sections System - Guide

## Übersicht

Das Dynamic Sections System ermöglicht es, vollständige One-Pager Websites datenbank-basiert zu erstellen und zu verwalten. Alle Komponenten aus den Demo-Seiten (z.B. `/demos/autoaufbereitung`) wurden in wiederverwendbare Section-Komponenten umgewandelt.

## Architektur

### 1. Datenbank-Schema

```
industries (Branchen)
  ├─ pages (Seiten)
      └─ sections (Sections mit Props)
```

- **industries**: Speichert Branchen mit Theme, SEO und Aktivierungsstatus
- **pages**: Seiten pro Branche (meist nur "home")
- **sections**: Einzelne Abschnitte mit `key` (Komponenten-Name) und `props` (JSON Daten)

### 2. Neue Section-Komponenten

Folgende Komponenten aus `/demos/autoaufbereitung` wurden zu wiederverwendbaren Sections:

#### VehicleSelector
**Datei**: `src/components/webflix-one/sections/VehicleSelector.tsx`

Horizontaler Slider zur Fahrzeugauswahl mit Bildern und Features.

**Props**:
```typescript
{
  title?: string;
  subtitle?: string;
  vehicles: Array<{
    id: string;
    name: string;
    image: string;
    icon: string; // "Car", "Truck", "Bike", "Zap"
    description: string;
    features: string[];
  }>;
}
```

#### BeforeAfterComparison
**Datei**: `src/components/webflix-one/sections/BeforeAfterComparison.tsx`

Zeigt Vorher/Nachher-Bilder entweder als interaktiven Slider oder als Grid.

**Props**:
```typescript
{
  title?: string;
  subtitle?: string;
  badge?: string;
  showSlider?: boolean; // true = interaktiver Slider, false = Grid
  images: Array<{
    before: string;
    after: string;
    title: string;
  }>;
}
```

#### GalleryShowcase
**Datei**: `src/components/webflix-one/sections/GalleryShowcase.tsx`

Responsive Galerie mit Lightbox und optionalem CTA.

**Props**:
```typescript
{
  title?: string;
  subtitle?: string;
  badge?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  images: Array<{
    id: number;
    image: string;
    title: string;
    category: string;
  }>;
}
```

#### TrustBadges
**Datei**: `src/components/webflix-one/sections/TrustBadges.tsx`

Trust-Elemente mit Google Reviews Slider.

**Props**:
```typescript
{
  title?: string;
  subtitle?: string;
  description?: string;
  showReviews?: boolean;
  googleRating?: number;
  googleReviewCount?: number;
  googleReviewLink?: string;
  trustPoints: Array<{
    text: string;
    icon: string; // "CheckCircle", "Star", "Clock", "Heart", "Sparkles"
  }>;
  reviews?: Array<{
    id: number;
    name: string;
    rating: number;
    text: string;
    date: string;
  }>;
}
```

#### LocationMap
**Datei**: `src/components/webflix-one/sections/LocationMap.tsx`

Standortkarte mit Kontaktinformationen.

**Props**:
```typescript
{
  title?: string;
  subtitle?: string;
  businessName?: string;
  address: string;
  phone: string;
  email: string;
  openingHours?: string;
  mapUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}
```

## Verwendung

### 1. Datenbank befüllen

Das SQL-Script `seed-autoaufbereitung-dynamic.sql` enthält ein vollständiges Beispiel:

```bash
# Im Supabase SQL Editor:
# 1. Öffne den SQL Editor in deinem Supabase Dashboard
# 2. Kopiere den kompletten Inhalt von seed-autoaufbereitung-dynamic.sql
# 3. Führe das Script aus
```

### 2. Seite aufrufen

Nach dem Einfügen der Daten ist die Seite unter folgender URL verfügbar:

```
/dynamic/autoaufbereitung-dynamic
```

Die Route `/dynamic/:industrySlug` nutzt das `DynamicPage.tsx` Component, das automatisch:
1. Industry-Daten lädt (Theme, SEO) aus `industries` Tabelle
2. Page-Daten lädt aus `pages` Tabelle
3. Alle Sections lädt (sortiert nach `order` Feld)
4. Theme auf die Seite anwendet
5. Alle Sections dynamisch aus der Registry rendert

### 3. Neue Section hinzufügen

**Schritt 1**: Komponente erstellen in `src/components/webflix-one/sections/`

```tsx
export interface MyNewSectionProps {
  title: string;
  // ... weitere Props
}

export const MyNewSection: React.FC<MyNewSectionProps> = ({ title }) => {
  return (
    <section className="py-24">
      <h2>{title}</h2>
    </section>
  );
};
```

**Schritt 2**: In Registry registrieren (`SectionRegistry.tsx`)

```tsx
import { MyNewSection } from './sections/MyNewSection';

export const SectionRegistry: Record<string, SectionComponent> = {
  // ... existing sections
  MyNewSection,
};
```

**Schritt 3**: Types hinzufügen (`types.ts`)

```typescript
export interface MyNewSectionProps {
  title: string;
}

export type SectionProps =
  | HeroProps
  | MyNewSectionProps
  | // ... other props
```

**Schritt 4**: In Datenbank einfügen

```sql
INSERT INTO sections (page_id, key, props, visible, "order")
VALUES (
  'page-uuid-hier',
  'MyNewSection',
  '{"title": "Mein Titel"}'::jsonb,
  true,
  5
);
```

## Best Practices

1. **Props immer als JSONB**: Alle Section-Props werden als JSONB in der DB gespeichert
2. **Reihenfolge mit `order`**: Nutze das `order` Feld um die Sections zu sortieren
3. **Visibility Toggle**: `visible: false` versteckt eine Section ohne sie zu löschen
4. **Theme Consistency**: Nutze die Industry-Theme-Farben in deinen Komponenten
5. **Responsive Design**: Alle Sections sollten mobile-first sein
6. **Type Safety**: Definiere immer TypeScript Interfaces für deine Props

## Vorteile

- **Wiederverwendbarkeit**: Sections können über mehrere Industries hinweg genutzt werden
- **Flexibilität**: Einfaches Hinzufügen, Entfernen oder Umordnen von Sections
- **Content Management**: Non-Developer können Inhalte über die Datenbank anpassen
- **Konsistenz**: Zentrale Component Library sorgt für einheitliches Design
- **Versionierung**: Alle Änderungen sind über DB-Migrations nachvollziehbar

## Nächste Schritte

1. Admin-Panel zum visuellen Bearbeiten von Sections
2. Drag & Drop Reordering im Frontend
3. Section Templates für häufige Layouts
4. Live Preview beim Bearbeiten
5. A/B Testing für verschiedene Section-Varianten
