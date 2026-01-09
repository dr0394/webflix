-- Test-Daten für Garten & Landschaftsbau Branche im Webflix One System

-- Zunächst alle bestehenden Einträge löschen (optional)
-- DELETE FROM webflix_one_industries WHERE slug = 'gartenlandschaftsbau';

-- Garten & Landschaftsbau Branche einfügen
INSERT INTO webflix_one_industries (
  slug,
  display_name,
  icon,
  hero_title,
  hero_subtitle,
  hero_cta_text,
  hero_image,
  primary_color,
  header_logo_text,
  meta_description,
  google_rating,
  google_review_count,
  services,
  gallery_images,
  trust_stats,
  google_reviews,
  before_after_images,
  vehicle_types,
  map_location,
  contact_info,
  is_active
) VALUES (
  'gartenlandschaftsbau',
  'Garten & Landschaftsbau',
  'TreePine',
  'Ihr Traumgarten wird Realität',
  'Professioneller Garten- und Landschaftsbau von der Planung bis zur Umsetzung',
  'Jetzt Beratungstermin vereinbaren',
  'https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=1920',
  '#22c55e',
  'GartenPro',
  'Professioneller Garten- und Landschaftsbau für Ihren Traumgarten. Planung, Gestaltung und Pflege aus einer Hand.',
  5.0,
  18,
  '[
    {
      "title": "Gartenplanung & Design",
      "description": "Individuelle Gartenplanung nach Ihren Wünschen mit 3D-Visualisierung",
      "image": "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
      "features": [
        "Professionelle 3D-Planung",
        "Individuelle Beratung",
        "Pflanzenauswahl",
        "Stilberatung"
      ]
    },
    {
      "title": "Terrassen & Wege",
      "description": "Hochwertige Pflasterarbeiten und Terrassenbau mit Premium-Materialien",
      "image": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "features": [
        "Naturstein & Pflaster",
        "Holzterrassen",
        "Drainage-Systeme",
        "Beleuchtung"
      ]
    },
    {
      "title": "Rasenpflege & Mähen",
      "description": "Regelmäßige professionelle Rasenpflege für einen perfekten Rasen",
      "image": "https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=800",
      "features": [
        "Rasenmähen",
        "Vertikutieren",
        "Düngen",
        "Unkrautbekämpfung"
      ]
    },
    {
      "title": "Baumpflege & Schnitt",
      "description": "Fachgerechter Baumschnitt und professionelle Baumpflege",
      "image": "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=800",
      "features": [
        "Obstbaumschnitt",
        "Formschnitt",
        "Fällung",
        "Wurzelentfernung"
      ]
    },
    {
      "title": "Gartenpflege",
      "description": "Umfassende Gartenpflege für das ganze Jahr",
      "image": "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg?auto=compress&cs=tinysrgb&w=800",
      "features": [
        "Heckenschnitt",
        "Beetpflege",
        "Unkrautentfernung",
        "Laubbeseitigung"
      ]
    },
    {
      "title": "Bewässerungssysteme",
      "description": "Moderne automatische Bewässerungssysteme für Ihren Garten",
      "image": "https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=800",
      "features": [
        "Automatische Bewässerung",
        "Tropfbewässerung",
        "Smart-Home Integration",
        "Regensensoren"
      ]
    }
  ]'::jsonb,
  '[
    {
      "id": 1,
      "image": "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
      "title": "Moderne Gartengestaltung",
      "category": "Neuanlage"
    },
    {
      "id": 2,
      "image": "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=800",
      "title": "Terrassenbau mit Naturstein",
      "category": "Terrasse"
    },
    {
      "id": 3,
      "image": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "title": "Pflegearbeiten",
      "category": "Pflege"
    },
    {
      "id": 4,
      "image": "https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=800",
      "title": "Perfekter Rasen",
      "category": "Rasenpflege"
    },
    {
      "id": 5,
      "image": "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=800",
      "title": "Baumschnitt",
      "category": "Baumpflege"
    },
    {
      "id": 6,
      "image": "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg?auto=compress&cs=tinysrgb&w=800",
      "title": "Heckenschnitt",
      "category": "Pflege"
    },
    {
      "id": 7,
      "image": "https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=800",
      "title": "Bewässerungssystem",
      "category": "Installation"
    },
    {
      "id": 8,
      "image": "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
      "title": "Gartenplanung",
      "category": "Design"
    }
  ]'::jsonb,
  '[
    {"text": "Über 15 Jahre Erfahrung", "icon": "Award"},
    {"text": "Zertifizierte Gärtnermeister", "icon": "CheckCircle"},
    {"text": "Kostenlose Beratung", "icon": "Heart"},
    {"text": "Faire Festpreise", "icon": "Euro"}
  ]'::jsonb,
  '[
    {
      "id": 1,
      "name": "Familie Müller",
      "rating": 5,
      "text": "Unser Garten ist jetzt ein echtes Paradies! Von der Planung bis zur Umsetzung war alles perfekt. Das Team war super freundlich und professionell.",
      "date": "vor 2 Wochen"
    },
    {
      "id": 2,
      "name": "Thomas Weber",
      "rating": 5,
      "text": "Die Terrasse ist wunderschön geworden. Hochwertige Materialien, saubere Arbeit und pünktliche Fertigstellung. Absolut empfehlenswert!",
      "date": "vor 1 Monat"
    },
    {
      "id": 3,
      "name": "Sarah Schmidt",
      "rating": 5,
      "text": "Professionelle Gartenpflege seit 2 Jahren. Mein Rasen war noch nie so grün und gepflegt. Toller Service!",
      "date": "vor 3 Wochen"
    }
  ]'::jsonb,
  '[
    {
      "title": "Gartenanlage komplett",
      "before": "https://images.pexels.com/photos/2541310/pexels-photo-2541310.jpeg?auto=compress&cs=tinysrgb&w=800",
      "after": "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
      "description": "Von der Wiese zum Traumgarten"
    },
    {
      "title": "Terrassengestaltung",
      "before": "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800",
      "after": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "description": "Moderne Naturstein-Terrasse"
    },
    {
      "title": "Rasensanierung",
      "before": "https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&w=800",
      "after": "https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=800",
      "description": "Perfekter englischer Rasen"
    }
  ]'::jsonb,
  '[
    {
      "type": "Kleingarten",
      "name": "Kleingarten (bis 200m²)",
      "description": "Ideal für kleine Gärten und Reihenhäuser",
      "image": "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400",
      "features": ["Planung", "Pflanzarbeiten", "Rasenpflege"]
    },
    {
      "type": "Mittelgarten",
      "name": "Mittelgroßer Garten (200-500m²)",
      "description": "Perfekt für Einfamilienhäuser",
      "image": "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=400",
      "features": ["Komplettgestaltung", "Terrasse", "Wege", "Pflanzungen"]
    },
    {
      "type": "Großgarten",
      "name": "Großer Garten (ab 500m²)",
      "description": "Für anspruchsvolle Projekte",
      "image": "https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400",
      "features": ["Landschaftsplanung", "Pool-Integration", "Automatische Bewässerung"]
    }
  ]'::jsonb,
  '{
    "lat": 48.137154,
    "lng": 11.576124,
    "address": "Musterstraße 123",
    "city": "München",
    "zip": "80331"
  }'::jsonb,
  '{
    "phone": "+49 89 12345678",
    "email": "info@gartenpro.de",
    "hours": "Mo-Fr: 8:00-18:00 Uhr"
  }'::jsonb,
  true
) ON CONFLICT (slug)
DO UPDATE SET
  display_name = EXCLUDED.display_name,
  icon = EXCLUDED.icon,
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  hero_cta_text = EXCLUDED.hero_cta_text,
  hero_image = EXCLUDED.hero_image,
  primary_color = EXCLUDED.primary_color,
  header_logo_text = EXCLUDED.header_logo_text,
  meta_description = EXCLUDED.meta_description,
  google_rating = EXCLUDED.google_rating,
  google_review_count = EXCLUDED.google_review_count,
  services = EXCLUDED.services,
  gallery_images = EXCLUDED.gallery_images,
  trust_stats = EXCLUDED.trust_stats,
  google_reviews = EXCLUDED.google_reviews,
  before_after_images = EXCLUDED.before_after_images,
  vehicle_types = EXCLUDED.vehicle_types,
  map_location = EXCLUDED.map_location,
  contact_info = EXCLUDED.contact_info,
  updated_at = now();
