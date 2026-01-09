/*
  # Webflix One - Autoaufbereitung Demo Seed

  Erstellt eine vollständige, hochwertige Demo-Website für Autoaufbereitung
  mit allen Sections aus der Datenbank.

  URL: /demo/autoaufbereitung
*/

-- 1. Industry erstellen
INSERT INTO industries (slug, name, theme, seo, is_active)
VALUES (
  'autoaufbereitung',
  'Autoaufbereitung Premium',
  '{
    "brand": "#0EA5E9",
    "text": "#111827",
    "accent": "#0284C7",
    "background": "#FFFFFF",
    "font": "Inter"
  }'::jsonb,
  '{
    "title": "Premium Autoaufbereitung - Ihr Fahrzeug wie neu",
    "description": "Professionelle Autoaufbereitung mit höchsten Qualitätsstandards. Innenreinigung, Außenpflege, Polieren & mehr.",
    "image": "https://i.imgur.com/wzHdML8.jpeg"
  }'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  theme = EXCLUDED.theme,
  seo = EXCLUDED.seo,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- 2. Page erstellen
INSERT INTO pages (industry_id, slug)
SELECT id, 'home'
FROM industries
WHERE slug = 'autoaufbereitung'
ON CONFLICT (industry_id, slug) DO NOTHING;

-- 3. Sections erstellen
DO $$
DECLARE
  v_page_id uuid;
BEGIN
  -- Get page ID
  SELECT p.id INTO v_page_id
  FROM pages p
  JOIN industries i ON i.id = p.industry_id
  WHERE i.slug = 'autoaufbereitung' AND p.slug = 'home';

  -- Delete existing sections
  DELETE FROM sections WHERE page_id = v_page_id;

  -- Navigation
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'Navigation',
    '{
      "businessName": "AutoGlanz Pro",
      "phone": "+49 176 12345678",
      "ctaText": "Jetzt anfragen",
      "ctaLink": "/configurator",
      "googleRating": 5.0,
      "navigationItems": [
        {"label": "Home", "link": "#hero"},
        {"label": "Leistungen", "link": "#services"},
        {"label": "Referenzen", "link": "#before-after"},
        {"label": "Galerie", "link": "#gallery"},
        {"label": "Kontakt", "link": "#contact"}
      ]
    }'::jsonb,
    true,
    1
  );

  -- Hero
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'Hero',
    '{
      "badge": "Autoaufbereiter #1",
      "headline": "Fahrzeugaufbereitung auf höchstem Niveau",
      "subheadline": "Bringen Sie mit unserer professionellen Autoreinigung & Fahrzeugaufbereitung Ihr Fahrzeug wieder zum Glänzen.",
      "ctaText": "Jetzt Termin vereinbaren",
      "ctaLink": "/configurator",
      "backgroundImage": "https://i.imgur.com/wzHdML8.jpeg",
      "trustBadges": [
        {"icon": "percent", "text": "Sehr gute Preis-Leistung"},
        {"icon": "clock", "text": "Flexible Termine", "highlight": true},
        {"icon": "star", "text": "5/5 Sterne"}
      ],
      "liveStats": [
        {"icon": "users", "text": "Privat und Gewerblich"},
        {"icon": "clock", "text": "Schnelle Antwortzeit"},
        {"icon": "thumbsup", "text": "100% Kundenzufriedenheit"}
      ]
    }'::jsonb,
    true,
    2
  );

  -- Google Reviews Banner
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'GoogleReviewsBanner',
    '{
      "rating": 5.0,
      "reviewCount": 127,
      "verified": true
    }'::jsonb,
    true,
    3
  );

  -- Services
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'Services',
    '{
      "title": "Welche Autoreinigung brauchst du?",
      "subtitle": "Wähle aus unserem professionellen Reinigungsangebot - von der schnellen Außenwäsche bis zur kompletten Fahrzeugaufbereitung",
      "services": [
        {
          "name": "Innenraumreinigung",
          "description": "Gründliche Reinigung aller Innenraumflächen, Sitze, Teppiche und Polster. Entfernung von Flecken, Gerüchen und Staub für ein frisches Fahrgefühl.",
          "image": "https://i.imgur.com/dD6kNQU.jpeg",
          "icon": "sparkles",
          "features": [
            "Sitze- & Polstereinigung",
            "Fleckentfernung",
            "Tierhaarentfernung",
            "Schimmelentfernung",
            "Reinigung der Lüftung",
            "Ozonbehandlung",
            "Geruchsentfernung"
          ],
          "duration": "1-2 Stunden",
          "price": "ab 89€"
        },
        {
          "name": "Außenwäsche",
          "description": "Professionelle Reinigung der Karosserie, Felgen und Reifen mit speziellen Pflegeprodukten für strahlenden Glanz und Schutz.",
          "image": "https://i.imgur.com/OhK54T4.jpeg",
          "icon": "car",
          "features": [
            "Karosserie waschen",
            "Felgen & Reifen reinigen",
            "Scheiben putzen",
            "Türrahmen säubern",
            "Scheinwerferpolitur"
          ],
          "duration": "30-60 Min",
          "price": "ab 49€"
        },
        {
          "name": "Polieren & Versiegeln",
          "description": "Professionelles Polieren und Versiegeln des Lacks für langanhaltenden Schutz, brillanten Glanz und Werterhalt des Fahrzeugs.",
          "image": "https://www.optimalack.de/mediafile/xautoaufbereitung-du-sseldorf.png.pagespeed.ic.Oq6fDhg43t.jpg",
          "icon": "shield",
          "features": [
            "Lack polieren",
            "Scheinwerferpolitur",
            "Schutzversiegelung",
            "Keramikversiegelung",
            "Kratzer entfernen",
            "UV-Schutz auftragen"
          ],
          "duration": "2-4 Stunden",
          "price": "ab 199€"
        },
        {
          "name": "Motorwäsche",
          "description": "Schonende Reinigung des Motorraums für bessere Kühlung, einfachere Wartung und ein gepflegtes Erscheinungsbild unter der Haube.",
          "image": "https://i.imgur.com/MFzxNsw.jpeg",
          "icon": "award",
          "features": [
            "Motorraum entfetten",
            "Schläuche reinigen",
            "Abdeckungen säubern",
            "Schutz auftragen"
          ],
          "duration": "45-90 Min",
          "price": "ab 69€"
        },
        {
          "name": "Lederpflege",
          "description": "Spezielle Pflege für Ledersitze und -ausstattung. Reinigung, Konditionierung und Schutz für langanhaltende Geschmeidigkeit.",
          "image": "https://i.imgur.com/qRJwTrU.jpeg",
          "icon": "star",
          "features": [
            "Leder reinigen",
            "Pflegemittel auftragen",
            "UV-Schutz"
          ],
          "duration": "1-2 Stunden",
          "price": "ab 79€"
        },
        {
          "name": "Komplettreinigung",
          "description": "Rundum-Service mit Innen- und Außenreinigung, Polieren und allen wichtigen Pflegemaßnahmen für ein perfektes Ergebnis.",
          "image": "https://i.imgur.com/tQFVWiv.jpeg",
          "icon": "sparkles",
          "features": [
            "Innen + Außen",
            "Polieren inklusive",
            "Felgenpflege",
            "Komplettservice"
          ],
          "duration": "3-5 Stunden",
          "price": "ab 299€"
        }
      ]
    }'::jsonb,
    true,
    4
  );

  -- WhyUs
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'WhyUs',
    '{
      "title": "Warum AutoGlanz Pro?",
      "subtitle": "Ihre Vorteile auf einen Blick",
      "points": [
        {
          "icon": "shield",
          "title": "Professionelle Qualität",
          "description": "Zertifizierte Fachkräfte mit jahrelanger Erfahrung und modernster Ausrüstung für beste Ergebnisse."
        },
        {
          "icon": "clock",
          "title": "Flexible Termine",
          "description": "Wir passen uns Ihrem Zeitplan an. Auch Abend- und Wochenendtermine möglich."
        },
        {
          "icon": "heart",
          "title": "Umweltfreundlich",
          "description": "Wir verwenden ausschließlich biologisch abbaubare Reinigungsprodukte für Mensch und Umwelt."
        },
        {
          "icon": "star",
          "title": "Top bewertet",
          "description": "Über 500 zufriedene Kunden mit 5-Sterne-Bewertungen sprechen für unsere Qualität."
        },
        {
          "icon": "award",
          "title": "Faire Preise",
          "description": "Transparente Preisgestaltung ohne versteckte Kosten. Beste Qualität zum fairen Preis."
        },
        {
          "icon": "users",
          "title": "Persönlich",
          "description": "Wir nehmen uns Zeit für Sie und Ihr Fahrzeug. Individuelle Beratung inklusive."
        }
      ]
    }'::jsonb,
    true,
    5
  );

  -- Before/After
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'BeforeAfter',
    '{
      "title": "Vorher-Nachher Galerie",
      "subtitle": "Sehen Sie selbst die beeindruckenden Ergebnisse unserer Arbeit",
      "images": [
        {
          "before": "https://i.imgur.com/dD6kNQU.jpeg",
          "after": "https://i.imgur.com/OhK54T4.jpeg",
          "title": "Innenraumaufbereitung BMW",
          "description": "Komplette Innenraumreinigung mit Polsterreinigung"
        },
        {
          "before": "/before-2a.jpg",
          "after": "/before-2b.jpg",
          "title": "Außenaufbereitung Mercedes",
          "description": "Politur und Keramikversiegelung"
        },
        {
          "before": "/before-3a.jpg",
          "after": "/before-3b.jpg",
          "title": "Lederpflege Audi",
          "description": "Professionelle Lederpflege und -aufbereitung"
        }
      ]
    }'::jsonb,
    true,
    6
  );

  -- Portfolio/Gallery
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'PortfolioGrid',
    '{
      "title": "Unsere Referenzen",
      "subtitle": "Eine Auswahl unserer erfolgreich durchgeführten Projekte",
      "images": [
        {"url": "/gallery-1.jpg", "title": "BMW 5er Komplettreinigung"},
        {"url": "/gallery-2.jpg", "title": "Mercedes AMG Politur"},
        {"url": "/gallery-3.jpg", "title": "Audi A6 Innenraum"},
        {"url": "/gallery-4.jpg", "title": "Porsche 911 Keramikversiegelung"},
        {"url": "/gallery-5.jpg", "title": "VW Golf GTI Detail"},
        {"url": "/gallery-6.jpg", "title": "Tesla Model S Aufbereitung"},
        {"url": "/gallery-7.jpg", "title": "Range Rover Lederpflege"},
        {"url": "/gallery-8.jpg", "title": "BMW X5 Motorwäsche"}
      ]
    }'::jsonb,
    true,
    7
  );

  -- Testimonials
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'Testimonials',
    '{
      "title": "Das sagen unsere Kunden",
      "subtitle": "Echte Bewertungen von echten Kunden",
      "testimonials": [
        {
          "name": "Thomas Müller",
          "role": "BMW 3er Besitzer",
          "content": "Mein Auto sieht aus wie neu! Die Innenraumreinigung war besonders beeindruckend - alle Flecken sind verschwunden.",
          "image": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
          "rating": 5
        },
        {
          "name": "Laura Schmidt",
          "role": "Mercedes A-Klasse",
          "content": "Nach einem Jahr mit zwei Kindern war mein Auto in keinem guten Zustand. Das Team hat wahre Wunder vollbracht!",
          "image": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
          "rating": 5
        },
        {
          "name": "Michael Weber",
          "role": "Audi A4 Firmenwagen",
          "content": "Professionelle Autoreinigung für meinen Firmenwagen. Pünktlich, zuverlässig und das Ergebnis überzeugt.",
          "image": "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
          "rating": 5
        }
      ]
    }'::jsonb,
    true,
    8
  );

  -- CTA Banner
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'CTABanner',
    '{
      "title": "Bereit für Ihr Fahrzeug-Upgrade?",
      "description": "Vereinbaren Sie jetzt einen Termin und erleben Sie, wie Ihr Auto wieder wie neu aussieht.",
      "primaryText": "Jetzt anfragen",
      "primaryLink": "/configurator"
    }'::jsonb,
    true,
    9
  );

  -- Contact/Map
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'Contact',
    '{
      "title": "Kontakt & Standort",
      "subtitle": "Besuchen Sie uns oder kontaktieren Sie uns für einen Termin",
      "address": "Musterstraße 123, 12345 Berlin",
      "phone": "+49 176 12345678",
      "email": "info@autoglanz-pro.de",
      "hours": "Mo-Fr: 8:00-18:00 Uhr, Sa: 9:00-14:00 Uhr",
      "mapUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4092296464937!2d13.404953999999999!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e5c3d6f5c7%3A0x4269c2e2b5b5c5c5!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1234567890"
    }'::jsonb,
    true,
    10
  );

  -- Footer
  INSERT INTO sections (page_id, key, props, visible, "order")
  VALUES (
    v_page_id,
    'Footer',
    '{
      "businessName": "AutoGlanz Pro",
      "tagline": "Premium Autoaufbereitung seit 2015",
      "address": "Musterstraße 123, 12345 Berlin",
      "phone": "+49 176 12345678",
      "email": "info@autoglanz-pro.de",
      "socialLinks": [
        {"platform": "facebook", "url": "https://facebook.com"},
        {"platform": "instagram", "url": "https://instagram.com"}
      ],
      "links": [
        {"label": "Impressum", "url": "/impressum"},
        {"label": "Datenschutz", "url": "/datenschutz"},
        {"label": "AGB", "url": "/agb"}
      ]
    }'::jsonb,
    true,
    11
  );

END $$;
