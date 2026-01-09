/*
  # Restaurant/Gastro Demo - Figma Template Import

  Dieses Seed erstellt eine komplette Restaurant Demo basierend auf einem Figma Template.

  ## Setup
  1. Branche: Restaurant & Gastronomie
  2. Design Style: elegant
  3. Theme: Rot/Weiß mit eleganten Fonts
  4. Sections: 10 (Navigation → Footer)

  ## Verwendung
  ```sql
  -- In Supabase SQL Editor oder via psql:
  \i seed-restaurant-demo.sql
  ```
*/

-- Cleanup (falls bereits vorhanden)
DELETE FROM sections WHERE page_id IN (
  SELECT p.id FROM pages p
  JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'restaurant'
);
DELETE FROM pages WHERE industry_id IN (
  SELECT id FROM industries WHERE slug = 'restaurant'
);
DELETE FROM industries WHERE slug = 'restaurant';

-- 1. Branche erstellen
INSERT INTO industries (slug, name, description, design_style, theme)
VALUES (
  'restaurant',
  'Restaurant & Gastronomie',
  'Elegante Website-Templates für Restaurants, Cafés und Gastronomie-Betriebe',
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
      "border": "#E5E7EB",
      "success": "#10B981",
      "error": "#EF4444"
    },
    "typography": {
      "fontFamily": {
        "heading": "Playfair Display, serif",
        "body": "Inter, sans-serif"
      },
      "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      },
      "fontWeight": {
        "normal": "400",
        "medium": "500",
        "semibold": "600",
        "bold": "700",
        "extrabold": "800"
      }
    },
    "spacing": {
      "section": "5rem",
      "container": "1280px",
      "gap": "1.5rem"
    },
    "borderRadius": {
      "sm": "0.25rem",
      "md": "0.5rem",
      "lg": "0.75rem",
      "xl": "1rem",
      "2xl": "1.5rem",
      "full": "9999px"
    },
    "shadows": {
      "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
    },
    "animation": {
      "duration": "300ms",
      "easing": "ease-in-out"
    }
  }'::jsonb
);

-- 2. Page erstellen
INSERT INTO pages (industry_id, slug, title, description)
SELECT
  id,
  'home',
  'Ristorante Bella Vista',
  'Authentische italienische Küche im Herzen von München'
FROM industries
WHERE slug = 'restaurant';

-- 3. Sections erstellen
WITH page_data AS (
  SELECT p.id FROM pages p
  JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'restaurant' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, design_variant, visible, "order")
VALUES
  -- 0. Navigation
  (
    (SELECT id FROM page_data),
    'Navigation',
    '{
      "logo": "Bella Vista",
      "links": [
        {"label": "Home", "href": "#hero"},
        {"label": "Speisekarte", "href": "#menu"},
        {"label": "Über uns", "href": "#about"},
        {"label": "Galerie", "href": "#gallery"},
        {"label": "Kontakt", "href": "#contact"}
      ],
      "ctaText": "Tisch reservieren",
      "ctaLink": "#contact",
      "phone": "+49 89 234 567 89"
    }'::jsonb,
    'elegant-nav-restaurant',
    true,
    0
  ),

  -- 1. Hero
  (
    (SELECT id FROM page_data),
    'Hero',
    '{
      "headline": "Italienische Küche mit Herz",
      "subheadline": "Genießen Sie authentische italienische Spezialitäten in gemütlichem Ambiente. Seit 1998 verwöhnen wir unsere Gäste mit hausgemachter Pasta und mediterranen Köstlichkeiten.",
      "ctaText": "Speisekarte ansehen",
      "ctaLink": "#menu",
      "secondaryCtaText": "Jetzt reservieren",
      "secondaryCtaLink": "#contact",
      "backgroundImage": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "badge": "Seit 1998",
      "trustPoints": [
        {"icon": "award", "text": "Ausgezeichnet"},
        {"icon": "star", "text": "4.9/5 Sterne"},
        {"icon": "users", "text": "Familiär"}
      ]
    }'::jsonb,
    'elegant-hero-restaurant',
    true,
    1
  ),

  -- 2. Trust Badges
  (
    (SELECT id FROM page_data),
    'TrustBadges',
    '{
      "title": "Warum unsere Gäste uns lieben",
      "badges": [
        {
          "icon": "award",
          "value": "25+",
          "label": "Jahre Erfahrung"
        },
        {
          "icon": "users",
          "value": "50.000+",
          "label": "Zufriedene Gäste"
        },
        {
          "icon": "star",
          "value": "4.9/5",
          "label": "Google Bewertung"
        },
        {
          "icon": "heart",
          "value": "100%",
          "label": "Hausgemacht"
        }
      ]
    }'::jsonb,
    'elegant-trust-restaurant',
    true,
    2
  ),

  -- 3. Services (Menü-Kategorien)
  (
    (SELECT id FROM page_data),
    'Services',
    '{
      "title": "Unsere Speisekarte",
      "subtitle": "Von traditionell bis modern - bei uns finden Sie für jeden Geschmack das Richtige",
      "services": [
        {
          "name": "Antipasti",
          "description": "Klassische italienische Vorspeisen mit frischen Zutaten",
          "icon": "sparkles",
          "features": [
            "Bruschetta al Pomodoro",
            "Carpaccio di Manzo",
            "Vitello Tonnato",
            "Burrata mit Tomaten"
          ],
          "price": "ab 8,90€"
        },
        {
          "name": "Pasta & Risotto",
          "description": "Hausgemachte Pasta und cremige Risotto-Variationen",
          "icon": "star",
          "features": [
            "Spaghetti Carbonara",
            "Tagliatelle al Tartufo",
            "Lasagne della Casa",
            "Risotto ai Funghi"
          ],
          "price": "ab 14,90€",
          "popular": true
        },
        {
          "name": "Hauptgerichte",
          "description": "Feine Fleisch- und Fischgerichte nach original italienischen Rezepten",
          "icon": "award",
          "features": [
            "Saltimbocca alla Romana",
            "Ossobuco alla Milanese",
            "Branzino al Forno",
            "Bistecca alla Fiorentina"
          ],
          "price": "ab 22,90€"
        },
        {
          "name": "Dolci",
          "description": "Hausgemachte Desserts und italienische Kaffeespezialitäten",
          "icon": "heart",
          "features": [
            "Tiramisù Classico",
            "Panna Cotta",
            "Gelato artigianale",
            "Cannoli Siciliani"
          ],
          "price": "ab 6,90€"
        }
      ]
    }'::jsonb,
    'elegant-menu-cards',
    true,
    3
  ),

  -- 4. WhyUs / Über uns
  (
    (SELECT id FROM page_data),
    'WhyUs',
    '{
      "title": "Was uns auszeichnet",
      "subtitle": "Tradition trifft Moderne",
      "reasons": [
        {
          "icon": "heart",
          "title": "Familientradition",
          "description": "Seit 1998 führen wir unser Restaurant mit Leidenschaft und übertragen traditionelle Rezepte von Generation zu Generation."
        },
        {
          "icon": "sparkles",
          "title": "Frische Zutaten",
          "description": "Wir verwenden nur beste Zutaten aus Italien und von regionalen Bauern. Täglich frisch zubereitet."
        },
        {
          "icon": "users",
          "title": "Erfahrenes Team",
          "description": "Unser Koch hat über 20 Jahre Erfahrung in der italienischen Küche und wurde in Rom ausgebildet."
        },
        {
          "icon": "award",
          "title": "Ausgezeichnet",
          "description": "Mehrfach ausgezeichnet vom Gault&Millau und mit dem Certificato di Qualità Italiana."
        },
        {
          "icon": "home",
          "title": "Gemütliches Ambiente",
          "description": "Unser Restaurant bietet eine warme, familiäre Atmosphäre - perfekt für jeden Anlass."
        },
        {
          "icon": "wine",
          "title": "Erlesene Weine",
          "description": "Über 100 italienische Weine aus allen Regionen - vom Chianti bis zum Barolo."
        }
      ]
    }'::jsonb,
    'elegant-why-restaurant',
    true,
    4
  ),

  -- 5. CTA Banner
  (
    (SELECT id FROM page_data),
    'CTABanner',
    '{
      "title": "Reservieren Sie jetzt Ihren Tisch",
      "subtitle": "Erleben Sie einen unvergesslichen Abend in unserem Restaurant",
      "ctaText": "Jetzt reservieren",
      "ctaLink": "#contact",
      "secondaryText": "Oder rufen Sie uns an",
      "phone": "+49 89 234 567 89",
      "badge": "Täglich geöffnet",
      "backgroundColor": "#DC2626",
      "textColor": "#FFFFFF"
    }'::jsonb,
    'elegant-cta-restaurant',
    true,
    5
  ),

  -- 6. Gallery
  (
    (SELECT id FROM page_data),
    'GalleryShowcase',
    '{
      "title": "Impressionen",
      "subtitle": "Ein Blick in unser Restaurant",
      "badge": "Galerie",
      "showCTA": false,
      "images": [
        {
          "id": 1,
          "image": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
          "title": "Unser Gastraum",
          "category": "Ambiente"
        },
        {
          "id": 2,
          "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
          "title": "Pasta Fresca",
          "category": "Speisen"
        },
        {
          "id": 3,
          "image": "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
          "title": "Antipasti",
          "category": "Speisen"
        },
        {
          "id": 4,
          "image": "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800",
          "title": "Unsere Küche",
          "category": "Behind the Scenes"
        },
        {
          "id": 5,
          "image": "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800",
          "title": "Pizza Napoletana",
          "category": "Speisen"
        },
        {
          "id": 6,
          "image": "https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=800",
          "title": "Weinauswahl",
          "category": "Getränke"
        }
      ]
    }'::jsonb,
    'elegant-gallery-restaurant',
    true,
    6
  ),

  -- 7. Testimonials
  (
    (SELECT id FROM page_data),
    'Testimonials',
    '{
      "title": "Was unsere Gäste sagen",
      "subtitle": "Echte Bewertungen von echten Gästen",
      "testimonials": [
        {
          "name": "Maria Schmidt",
          "role": "Stammgast seit 2005",
          "content": "Das beste italienische Restaurant in München! Die Atmosphäre ist herzlich und das Essen fantastisch. Besonders die hausgemachte Pasta ist ein Traum.",
          "rating": 5,
          "image": "https://ui-avatars.com/api/?name=Maria+Schmidt&background=DC2626&color=fff"
        },
        {
          "name": "Thomas Wagner",
          "role": "Google Bewertung",
          "content": "Authentische italienische Küche! Der Chef kommt persönlich an den Tisch und empfiehlt Gerichte. Man fühlt sich wie in Italien.",
          "rating": 5,
          "image": "https://ui-avatars.com/api/?name=Thomas+Wagner&background=DC2626&color=fff"
        },
        {
          "name": "Anna Bauer",
          "role": "Hochzeitsgast",
          "content": "Wir haben unsere Hochzeitsfeier hier ausgerichtet und es war perfekt! Das Team hat uns einen unvergesslichen Abend bereitet.",
          "rating": 5,
          "image": "https://ui-avatars.com/api/?name=Anna+Bauer&background=DC2626&color=fff"
        },
        {
          "name": "Marco Rossi",
          "role": "Italiener aus Rom",
          "content": "Als Italiener kann ich bestätigen: Das ist echte italienische Küche! Die Qualität und der Geschmack erinnern mich an zu Hause.",
          "rating": 5,
          "image": "https://ui-avatars.com/api/?name=Marco+Rossi&background=DC2626&color=fff"
        }
      ]
    }'::jsonb,
    'elegant-testimonials-restaurant',
    true,
    7
  ),

  -- 8. Contact
  (
    (SELECT id FROM page_data),
    'Contact',
    '{
      "title": "Tisch reservieren",
      "subtitle": "Wir freuen uns auf Ihren Besuch",
      "phone": "+49 89 234 567 89",
      "email": "info@bellavista-muenchen.de",
      "address": "Maximilianstraße 45, 80539 München",
      "showForm": true,
      "openingHours": [
        {"day": "Montag - Donnerstag", "hours": "17:00 - 23:00 Uhr"},
        {"day": "Freitag - Samstag", "hours": "17:00 - 00:00 Uhr"},
        {"day": "Sonntag", "hours": "12:00 - 22:00 Uhr"}
      ]
    }'::jsonb,
    'elegant-contact-restaurant',
    true,
    8
  ),

  -- 9. LocationMap
  (
    (SELECT id FROM page_data),
    'LocationMap',
    '{
      "title": "So finden Sie uns",
      "address": "Maximilianstraße 45, 80539 München",
      "coordinates": { "lat": 48.1351, "lng": 11.5820 },
      "description": "Direkt am Maximiliansplatz im Herzen von München",
      "parking": "Tiefgarage am Platz verfügbar",
      "publicTransport": "U4/U5: Lehel (5 Min.), Tram 19: Nationalmuseum (3 Min.)"
    }'::jsonb,
    'elegant-map-restaurant',
    true,
    9
  ),

  -- 10. Footer
  (
    (SELECT id FROM page_data),
    'Footer',
    '{
      "companyName": "Ristorante Bella Vista",
      "tagline": "Italienische Küche mit Herz seit 1998",
      "address": "Maximilianstraße 45, 80539 München",
      "phone": "+49 89 234 567 89",
      "email": "info@bellavista-muenchen.de",
      "socialLinks": [
        {"platform": "facebook", "url": "https://facebook.com/bellavista"},
        {"platform": "instagram", "url": "https://instagram.com/bellavista"},
        {"platform": "tripadvisor", "url": "#"}
      ],
      "quickLinks": [
        {"label": "Speisekarte", "href": "#menu"},
        {"label": "Über uns", "href": "#about"},
        {"label": "Galerie", "href": "#gallery"},
        {"label": "Reservierung", "href": "#contact"}
      ],
      "legalLinks": [
        {"label": "Impressum", "href": "/impressum"},
        {"label": "Datenschutz", "href": "/datenschutz"},
        {"label": "AGB", "href": "/agb"}
      ]
    }'::jsonb,
    'elegant-footer-restaurant',
    true,
    10
  );

-- Fertig!
SELECT
  'Restaurant Demo erstellt! ✅' as status,
  'Aufruf unter: /demo/restaurant' as url,
  COUNT(*) as sections_count
FROM sections s
JOIN pages p ON p.id = s.page_id
JOIN industries i ON i.id = p.industry_id
WHERE i.slug = 'restaurant';
