# Figma Branchen-Templates zu Webflix Demo - Workflow

## 🎯 Übersicht

Dieser Guide zeigt dir, wie du Figma Branchen-Templates als dynamische Demo für Webflix One nutzen kannst.

---

## 📋 Schritt-für-Schritt Anleitung

### **Phase 1: Vorbereitung des Figma Templates**

#### 1.1 Figma Template Struktur analysieren

**Was du brauchst:**
- Figma Design File (z.B. "Restaurant Template", "Fitness Template")
- Zugriff auf Figma (kostenlos)

**Wichtige Bereiche identifizieren:**
```
✅ Header/Navigation
✅ Hero Section
✅ Features/Services Section
✅ About/Über uns
✅ Gallery/Portfolio
✅ Testimonials/Bewertungen
✅ Contact/Kontakt
✅ Footer
```

#### 1.2 Design-Informationen extrahieren

Für jede Section notierst du:

**Farben:**
- Primary Color (Hauptfarbe)
- Secondary Color
- Background Colors
- Text Colors
- Accent Colors

**Typografie:**
- Heading Font
- Body Font
- Font Sizes
- Font Weights

**Layout:**
- Section Reihenfolge
- Layout-Typ (Grid, Slider, Cards, etc.)
- Spacing/Abstände
- Border Radius

**Bilder:**
- Hero Background
- Gallery Images
- Icons/Logos

---

### **Phase 2: Branche in Webflix anlegen**

#### 2.1 Neue Branche in der Datenbank erstellen

```sql
-- Beispiel: Restaurant/Gastro Branche
INSERT INTO industries (slug, name, description, design_style, theme)
VALUES (
  'restaurant',
  'Restaurant & Gastronomie',
  'Moderne Website-Templates für Restaurants, Cafés und Gastronomie',
  'elegant',
  '{
    "colors": {
      "primary": "#DC2626",
      "secondary": "#FFFFFF",
      "accent": "#F59E0B",
      "text": "#1F2937",
      "textLight": "#6B7280",
      "background": "#FFFFFF",
      "surface": "#F9FAFB",
      "border": "#E5E7EB"
    },
    "typography": {
      "fontFamily": {
        "heading": "Playfair Display, serif",
        "body": "Inter, sans-serif"
      }
    }
  }'::jsonb
);

-- Page erstellen
INSERT INTO pages (industry_id, slug, title, description)
SELECT
  id,
  'home',
  'Restaurant Demo',
  'Elegante Restaurant Website'
FROM industries
WHERE slug = 'restaurant';
```

#### 2.2 Sections aus Figma Template hinzufügen

```sql
-- Beispiel: Restaurant Sections
WITH page_data AS (
  SELECT p.id FROM pages p
  JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'restaurant' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, design_variant, visible, "order")
VALUES
  -- Navigation
  (
    (SELECT id FROM page_data),
    'Navigation',
    '{
      "logo": "Ristorante Bella Vista",
      "links": [
        {"label": "Home", "href": "#hero"},
        {"label": "Speisekarte", "href": "#menu"},
        {"label": "Über uns", "href": "#about"},
        {"label": "Reservierung", "href": "#contact"}
      ],
      "ctaText": "Tisch reservieren",
      "ctaLink": "#contact"
    }'::jsonb,
    'elegant-nav-restaurant',
    true,
    0
  ),

  -- Hero
  (
    (SELECT id FROM page_data),
    'Hero',
    '{
      "headline": "Italienische Küche mit Herz",
      "subheadline": "Genießen Sie authentische italienische Spezialitäten in gemütlichem Ambiente",
      "ctaText": "Speisekarte ansehen",
      "ctaLink": "#menu",
      "backgroundImage": "https://images.pexels.com/photos/[ID]/pexels-photo.jpeg",
      "badge": "Seit 1998"
    }'::jsonb,
    'elegant-hero-restaurant',
    true,
    1
  ),

  -- Services (Menü-Kategorien)
  (
    (SELECT id FROM page_data),
    'Services',
    '{
      "title": "Unsere Speisekarte",
      "subtitle": "Von traditionell bis modern",
      "services": [
        {
          "name": "Vorspeisen",
          "description": "Antipasti, Bruschetta, Carpaccio",
          "icon": "sparkles"
        },
        {
          "name": "Pasta & Risotto",
          "description": "Hausgemachte Pasta mit frischen Zutaten",
          "icon": "star",
          "popular": true
        },
        {
          "name": "Hauptgerichte",
          "description": "Fisch, Fleisch und vegetarische Optionen",
          "icon": "award"
        },
        {
          "name": "Desserts",
          "description": "Tiramisu, Panna Cotta, Gelato",
          "icon": "heart"
        }
      ]
    }'::jsonb,
    'elegant-menu-cards',
    true,
    2
  );
```

---

### **Phase 3: Design-Varianten erstellen**

#### 3.1 Neue Design-Variante Component erstellen

Erstelle eine Datei: `src/components/webflix-one/sections/RestaurantVariants.tsx`

```typescript
import React from 'react';
import { Utensils, Wine, Award, Star } from 'lucide-react';
import { HeroProps, ServicesProps } from '../types';

// Restaurant Hero
export const ElegantHeroRestaurant: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
  badge
}) => {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Aus Figma übertragenes Design */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {badge && (
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            {badge}
          </div>
        )}

        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">
          {headline}
        </h1>

        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          {subheadline}
        </p>

        <a
          href={ctaLink}
          className="inline-block px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

// Restaurant Menu Cards
export const ElegantMenuCards: React.FC<ServicesProps> = ({
  title,
  subtitle,
  services
}) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-center mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-gray-600 text-center mb-16">
            {subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Design aus Figma */}
              <div className="text-red-600 mb-4">
                <Utensils className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">
                {service.name}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

#### 3.2 Design-Varianten registrieren

In `Hero.tsx` und `Services.tsx`:

```typescript
import { ElegantHeroRestaurant } from './RestaurantVariants';

// In Hero Component
if (designVariant === 'elegant-hero-restaurant') {
  return <ElegantHeroRestaurant {...props} />;
}
```

---

### **Phase 4: Bilder und Assets**

#### 4.1 Bilder von Figma extrahieren

**Option A: Aus Figma exportieren**
1. In Figma: Bild auswählen
2. Rechtsklick → "Copy as PNG" oder Export
3. Zu Pexels/Unsplash hochladen oder lokal speichern

**Option B: Stock-Photos nutzen**
1. Suche passende Bilder auf:
   - [Pexels.com](https://pexels.com)
   - [Unsplash.com](https://unsplash.com)
   - [Pixabay.com](https://pixabay.com)

2. Optimale Suchbegriffe für Restaurant:
   - "restaurant interior"
   - "fine dining"
   - "italian food"
   - "chef cooking"

#### 4.2 Bild-URLs in Props einfügen

```sql
UPDATE sections
SET props = jsonb_set(
  props,
  '{backgroundImage}',
  '"https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"'
)
WHERE key = 'Hero' AND page_id IN (
  SELECT p.id FROM pages p
  JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'restaurant'
);
```

---

### **Phase 5: Figma Design 1:1 umsetzen**

#### 5.1 CSS aus Figma übertragen

**Figma → CSS Mapping:**

| Figma Property | CSS Property | Beispiel |
|----------------|--------------|----------|
| Fill Color | `background` | `#DC2626` |
| Stroke | `border` | `2px solid #E5E7EB` |
| Corner Radius | `border-radius` | `12px` |
| Auto Layout Gap | `gap` | `24px` |
| Padding | `padding` | `32px` |
| Font | `font-family` | `'Playfair Display'` |
| Font Size | `font-size` | `48px` |
| Font Weight | `font-weight` | `700` |
| Effects (Shadow) | `box-shadow` | `0 20px 40px rgba(0,0,0,0.1)` |

#### 5.2 Figma Plugin nutzen (Optional)

**Empfohlene Plugins:**
- **"Figma to Code"** - Generiert HTML/CSS
- **"Anima"** - Exportiert React Components
- **"Locofy"** - Figma zu React/Vue/HTML

---

## 🎨 Best Practices

### ✅ Do's

1. **Farben konsistent halten**
   - Alle Farben aus Figma ins Theme übertragen
   - CSS Custom Properties nutzen

2. **Typografie genau übernehmen**
   - Google Fonts einbinden wenn nötig
   - Font-Weights beachten

3. **Spacing-System verwenden**
   - 8px Grid System (8, 16, 24, 32, 48, 64)
   - Konsistente Abstände

4. **Responsive Design**
   - Mobile-first Approach
   - Breakpoints: 640px, 768px, 1024px, 1280px

5. **Performance**
   - Bilder optimieren (WebP, max 1920px Breite)
   - Lazy Loading für Bilder unter dem Fold

### ❌ Don'ts

1. **Nicht hardcoded**
   - Keine festen Texte in Components
   - Alles über Props steuerbar

2. **Keine Inline Styles** (außer dynamische Farben)
   - Tailwind CSS nutzen
   - Nur Theme-Farben als Inline

3. **Keine Copyright-Verletzungen**
   - Nur lizenzfreie Bilder
   - Keine Marken-Logos ohne Erlaubnis

---

## 🔄 Workflow Zusammenfassung

```
1. Figma Template öffnen
   ↓
2. Design analysieren
   - Farben notieren
   - Fonts notieren
   - Layout-Struktur
   ↓
3. Branche in DB anlegen
   - INSERT industries
   - INSERT pages
   ↓
4. Sections definieren
   - INSERT sections mit Props
   ↓
5. Design-Varianten erstellen
   - Neue .tsx Datei
   - Components implementieren
   ↓
6. In SectionRegistry registrieren
   ↓
7. Bilder einbinden
   - Pexels/Unsplash URLs
   ↓
8. Testing
   - /demo/[branche] aufrufen
   - Responsive testen
   ↓
9. Build & Deploy
   - npm run build
   ✅ Fertig!
```

---

## 📦 Beispiel: Komplette Branche

Siehe Dateien:
- `seed-autoaufbereitung-demo.sql` - Beispiel für komplette Branche
- `src/components/webflix-one/sections/HeroVariants.tsx` - Design-Varianten
- `src/components/webflix-one/sections/ServicesVariants.tsx` - Service-Designs

---

## 🚀 Quick Start Templates

### Template 1: Restaurant/Gastro
```bash
# SQL ausführen
psql -d your_database < seeds/restaurant-demo.sql

# Design-Komponente erstellen
# src/components/webflix-one/sections/RestaurantVariants.tsx

# Registrieren in Hero.tsx und Services.tsx
```

### Template 2: Fitness/Gym
```bash
# SQL ausführen
psql -d your_database < seeds/fitness-demo.sql

# Design-Komponente erstellen
# src/components/webflix-one/sections/FitnessVariants.tsx
```

### Template 3: Fashion/E-Commerce
```bash
# SQL ausführen
psql -d your_database < seeds/fashion-demo.sql

# Design-Komponente erstellen
# src/components/webflix-one/sections/FashionVariants.tsx
```

---

## 🎯 Nächste Schritte

1. **Figma Community durchsuchen**
   - [figma.com/community](https://figma.com/community)
   - Filter: "Website Template"
   - Kostenlos: "Free" auswählen

2. **Template auswählen**
   - Branche: Restaurant, Fitness, Fashion, etc.
   - Duplicate to your Files

3. **Workflow starten**
   - Diesem Guide folgen
   - Schritt für Schritt umsetzen

4. **Demo testen**
   - `/demo/[deine-branche]` aufrufen
   - Anpassungen vornehmen

---

## 💡 Tipps & Tricks

### Schneller arbeiten mit:

1. **Figma Inspect Mode** (Rechte Sidebar)
   - Zeigt CSS Properties
   - Copy CSS Code direkt

2. **Browser DevTools**
   - Figma.com im Browser öffnen
   - Inspect Element
   - CSS kopieren

3. **AI Tools nutzen**
   - Screenshot → ChatGPT/Claude
   - "Generate React Component for this design"

4. **Wiederverwendbare Components**
   - Einmal bauen
   - Mit Props anpassen
   - In mehreren Branchen nutzen

---

## 📞 Support

Bei Fragen:
- Check `QUICK_REFERENCE.md`
- Siehe `DYNAMIC_SECTIONS_GUIDE.md`
- SQL Examples in `seed-*.sql` Dateien

---

**Happy Building! 🚀**
