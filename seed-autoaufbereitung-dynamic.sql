-- Demo Data für Autoaufbereitung mit dynamischen Sections
-- Dieses Script füllt die industries, pages und sections Tabellen mit Daten
--
-- VERWENDUNG:
-- 1. Öffne den Supabase SQL Editor in deinem Dashboard
-- 2. Kopiere dieses komplette Script
-- 3. Führe es aus
--
-- Nach dem Ausführen ist die Seite verfügbar unter:
-- /dynamic/autoaufbereitung

-- 1. Industry erstellen/updaten
INSERT INTO industries (slug, name, theme, seo, is_active)
VALUES (
  'autoaufbereitung',
  'AutoPflege Premium',
  '{
    "brand": "#0EA5E9",
    "text": "#1F2937",
    "accent": "#DC2626",
    "background": "#FFFFFF",
    "font": "Inter"
  }'::jsonb,
  '{
    "title": "AutoPflege Premium - Professionelle Fahrzeugaufbereitung",
    "description": "Professionelle Autoaufbereitung und Fahrzeugpflege. Innenreinigung, Außenreinigung, Polieren und Versiegelung.",
    "image": "/hero-detailing.jpg"
  }'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  theme = EXCLUDED.theme,
  seo = EXCLUDED.seo,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- 2. Page erstellen
WITH industry_data AS (
  SELECT id FROM industries WHERE slug = 'autoaufbereitung'
)
INSERT INTO pages (industry_id, slug, layout)
SELECT
  id,
  'home',
  '[]'::jsonb
FROM industry_data
ON CONFLICT (industry_id, slug) DO UPDATE SET
  layout = EXCLUDED.layout,
  updated_at = now();

-- 3. Sections erstellen
WITH page_data AS (
  SELECT p.id as page_id
  FROM pages p
  JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
-- Lösche alte Sections
DELETE FROM sections WHERE page_id = (SELECT page_id FROM page_data);

-- Navigation
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'Navigation',
  '{
    "businessName": "AutoPflege Premium",
    "links": [
      {"label": "Home", "href": "#hero"},
      {"label": "Fahrzeuge", "href": "#vehicles"},
      {"label": "Vorher/Nachher", "href": "#before-after"},
      {"label": "Galerie", "href": "#gallery"},
      {"label": "Kontakt", "href": "#contact"}
    ],
    "ctaText": "Jetzt anrufen",
    "ctaLink": "tel:+49123456789"
  }'::jsonb,
  true,
  0
FROM page_data;

-- Hero Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'Hero',
  '{
    "headline": "Ihr Auto verdient Perfektion",
    "subheadline": "Professionelle Fahrzeugaufbereitung, die Ihrem Auto seinen ursprünglichen Glanz zurückgibt. Vom Kleinwagen bis zum Luxusfahrzeug – wir behandeln jedes Auto mit höchster Sorgfalt.",
    "highlightedText": "Perfektion",
    "ctaText": "Jetzt Termin buchen",
    "ctaLink": "#contact",
    "secondaryCtaText": "Leistungen ansehen",
    "secondaryCtaLink": "#services",
    "backgroundImage": "/hero-detailing.jpg",
    "badge": "Über 500 zufriedene Kunden",
    "trustPoints": [
      {"icon": "Shield", "text": "Versichert"},
      {"icon": "Award", "text": "5-Sterne Service"},
      {"icon": "Clock", "text": "Schnelle Termine"}
    ]
  }'::jsonb,
  true,
  1
FROM page_data;

-- Vehicle Selector Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'VehicleSelector',
  '{
    "title": "Wählen Sie Ihren Fahrzeugtyp",
    "subtitle": "Perfekte Pflege für jedes Fahrzeug",
    "vehicles": [
      {
        "id": "kleinwagen",
        "name": "KLEINWAGEN",
        "image": "https://i.imgur.com/aWePZ1a.png",
        "icon": "Car",
        "description": "Kompakt & Effizient",
        "features": ["Außenwäsche", "Innenreinigung", "Schnell & günstig"]
      },
      {
        "id": "mittelklasse",
        "name": "MITTELKLASSE",
        "image": "https://i.imgur.com/1fOLBcp.png",
        "icon": "Car",
        "description": "Komfort & Stil",
        "features": ["Premium-Reinigung", "Polieren", "Detailing"]
      },
      {
        "id": "suv",
        "name": "SUV",
        "image": "https://i.imgur.com/BH1Xocu.png",
        "icon": "Truck",
        "description": "Robust & Geräumig",
        "features": ["Unterbodenwäsche", "Felgenreinigung", "Motorwäsche"]
      },
      {
        "id": "transporter",
        "name": "TRANSPORTER/VAN",
        "image": "https://i.imgur.com/JAMhbmW.png",
        "icon": "Truck",
        "description": "Nutzfahrzeug",
        "features": ["Großflächenreinigung", "Laderaum", "Gewerblich"]
      },
      {
        "id": "luxus",
        "name": "LUXUSFAHRZEUG",
        "image": "https://i.imgur.com/71vqTmW.png",
        "icon": "Zap",
        "description": "Premium & Exklusiv",
        "features": ["Handwäsche", "Lederpflege", "Versiegelung"]
      }
    ]
  }'::jsonb,
  true,
  2
FROM page_data;

-- Services Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'Services',
  '{
    "title": "Perfekte Pflege für jedes Fahrzeug",
    "subtitle": "Von der Basisreinigung bis zur Premium-Aufbereitung",
    "services": [
      {
        "name": "Innenraumreinigung",
        "description": "Tiefenreinigung aller Innenraumflächen, Sitze, Teppiche und Polster",
        "features": ["Sitzreinigung", "Fleckentfernung", "Geruchsbeseitigung", "Staubsaugen"]
      },
      {
        "name": "Außenreinigung",
        "description": "Professionelle Handwäsche mit Premium-Produkten für strahlenden Glanz",
        "features": ["Handwäsche", "Felgenreinigung", "Reifenpflege", "Scheiben polieren"]
      },
      {
        "name": "Polieren & Versiegeln",
        "description": "Lackpolitur und Versiegelung für langanhaltenden Schutz",
        "features": ["Lackpolitur", "Kratzerentfernung", "Versiegelung", "UV-Schutz"]
      },
      {
        "name": "Motorwäsche",
        "description": "Schonende Reinigung des Motorraums für optimale Funktion",
        "features": ["Entfettung", "Schonende Reinigung", "Pflege", "Kontrolle"]
      },
      {
        "name": "Lederpflege",
        "description": "Spezielle Behandlung für Lederausstattung",
        "features": ["Lederreinigung", "Konditionierung", "Schutz", "Auffrischung"]
      },
      {
        "name": "Komplett-Paket",
        "description": "Rundum-Service für perfekte Fahrzeugaufbereitung",
        "features": ["Innen + Außen", "Polieren", "Versiegeln", "Lederpflege"]
      }
    ]
  }'::jsonb,
  true,
  3
FROM page_data;

-- Before/After Comparison Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'BeforeAfterComparison',
  '{
    "title": "Sehen Sie den Unterschied",
    "subtitle": "Überzeugen Sie sich selbst von unserer Arbeit",
    "badge": "Vorher/Nachher",
    "showSlider": true,
    "images": [
      {
        "before": "/public/before-1a.jpg",
        "after": "/public/before-1b.jpg",
        "title": "Innenraum Komplettaufbereitung"
      },
      {
        "before": "/public/before-2a.jpg",
        "after": "/public/before-2b.jpg",
        "title": "Lackaufbereitung & Politur"
      },
      {
        "before": "/public/before-3a.jpg",
        "after": "/public/before-3b.jpg",
        "title": "Felgenreinigung Premium"
      }
    ]
  }'::jsonb,
  true,
  4
FROM page_data;

-- Gallery Showcase Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'GalleryShowcase',
  '{
    "title": "Galerie unserer Projekte",
    "subtitle": "Jedes Auto ist ein Unikat – sehen Sie unsere Ergebnisse",
    "badge": "Unsere Arbeit",
    "showCTA": true,
    "ctaText": "Jetzt Fahrzeugaufbereitung anfragen",
    "ctaLink": "/configurator",
    "images": [
      {"id": 1, "image": "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Luxus Fahrzeugpflege", "category": "Außenreinigung"},
      {"id": 2, "image": "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Luxus Sportwagen", "category": "Premium Detailing"},
      {"id": 3, "image": "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Ferrari Sportwagen", "category": "Luxus Reinigung"},
      {"id": 4, "image": "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Lamborghini Detailing", "category": "Innenraumreinigung"},
      {"id": 5, "image": "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Porsche 911", "category": "Supercar Pflege"},
      {"id": 6, "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "McLaren Supersportwagen", "category": "Premium Wäsche"},
      {"id": 7, "image": "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Audi R8 Spyder", "category": "Exclusive Detailing"},
      {"id": 8, "image": "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "BMW M Series", "category": "Cabrio Pflege"},
      {"id": 9, "image": "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Mercedes AMG GT", "category": "Performance Detailing"},
      {"id": 10, "image": "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Bentley Continental", "category": "Luxus Aufbereitung"},
      {"id": 11, "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800", "title": "Maserati GranTurismo", "category": "Luxus Aufbereitung"}
    ]
  }'::jsonb,
  true,
  5
FROM page_data;

-- Trust Badges Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'TrustBadges',
  '{
    "title": "Warum Kunden uns wählen",
    "subtitle": "Premium Qualität garantiert",
    "description": "Bei uns steht Ihre Zufriedenheit an erster Stelle. Erleben Sie den Unterschied professioneller Fahrzeugpflege.",
    "showReviews": true,
    "googleRating": 5.0,
    "googleReviewCount": 12,
    "googleReviewLink": "",
    "trustPoints": [
      {"text": "Professionelle Fahrzeugaufbereitung", "icon": "CheckCircle"},
      {"text": "Modernste Reinigungstechnik", "icon": "Sparkles"},
      {"text": "Faire & transparente Preise", "icon": "Heart"},
      {"text": "Schnelle Terminvergabe", "icon": "Clock"}
    ],
    "reviews": [
      {
        "id": 1,
        "name": "Bilal",
        "rating": 5,
        "text": "Mehr als zufrieden mit dem Ergebnis. Schnell, qualitativ hochwertig und preislich für die Qualität absolut fair. Das Auto ist wie neu.",
        "date": "vor 1 Woche"
      },
      {
        "id": 2,
        "name": "Chantal W.",
        "rating": 5,
        "text": "Top Service und absolut empfehlenswert! Mein Auto sieht nach der Aufbereitung aus wie neu – innen und außen perfekt gereinigt.",
        "date": "vor 2 Wochen"
      },
      {
        "id": 3,
        "name": "Sudem C.",
        "rating": 5,
        "text": "Hervorragende Reinigung, super freundlich und absolut zuverlässig. Mein Auto glänzt wie neu klare Empfehlung!",
        "date": "vor 3 Wochen"
      }
    ]
  }'::jsonb,
  true,
  6
FROM page_data;

-- Location Map Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'LocationMap',
  '{
    "title": "Besuchen Sie uns",
    "subtitle": "AutoPflege Premium",
    "businessName": "AutoPflege Premium",
    "address": "Musterstraße 123\n12345 Musterstadt",
    "phone": "+49 123 456 789",
    "email": "kontakt@autopflege-premium.de",
    "openingHours": "Mo-Fr: 08:00 - 18:00 Uhr\nSa: 09:00 - 14:00 Uhr\nSo: Geschlossen",
    "mapUrl": "https://www.google.com/maps/embed/v1/place?key=AIzaSyASzqnCrYBWXhFtdlXXBg_KCLxQTa1I5Y4&q=Musterstraße+123+12345+Musterstadt&maptype=roadmap",
    "ctaText": "Termin vereinbaren",
    "ctaLink": "/configurator"
  }'::jsonb,
  true,
  7
FROM page_data;

-- Footer Section
WITH page_data AS (
  SELECT p.id as page_id FROM pages p JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home'
)
INSERT INTO sections (page_id, key, props, visible, "order")
SELECT
  page_id,
  'Footer',
  '{
    "businessName": "AutoPflege Premium",
    "description": "Ihre Experten für professionelle Fahrzeugaufbereitung",
    "links": [
      {"label": "Home", "href": "#hero"},
      {"label": "Leistungen", "href": "#services"},
      {"label": "Referenzen", "href": "#before-after"},
      {"label": "Galerie", "href": "#gallery"},
      {"label": "Kontakt", "href": "#contact"}
    ],
    "socialLinks": [
      {"platform": "Instagram", "url": "https://www.instagram.com/autopflegepremium"}
    ],
    "copyright": "2025 AutoPflege Premium. Alle Rechte vorbehalten."
  }'::jsonb,
  true,
  8
FROM page_data;
