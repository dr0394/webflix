-- Webflix One Seed Data
-- Creates 3 sample industries with complete page sections
-- Only "gaLaBau" includes the BeforeAfter section

-- Clean existing data (optional - comment out if you want to keep existing data)
DELETE FROM sections;
DELETE FROM pages;
DELETE FROM industries;

-- Industry 1: Auto Detailing (autoaufbereitung)
INSERT INTO industries (id, slug, name, theme, seo, is_active)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'autoaufbereitung',
  'Auto Detailing',
  '{
    "brand": "#DC2626",
    "text": "#1F2937",
    "accent": "#F59E0B",
    "background": "#FFFFFF",
    "font": "Inter"
  }',
  '{
    "title": "Premium Auto Detailing - Professionelle Fahrzeugaufbereitung",
    "description": "Professionelle Fahrzeugaufbereitung für ein perfektes Finish. Wir bringen Ihr Auto zum Glänzen!",
    "image": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1200"
  }',
  true
);

-- Create page for Auto Detailing
INSERT INTO pages (id, industry_id, slug)
VALUES (
  '11111111-2222-3333-4444-555555555555',
  '11111111-1111-1111-1111-111111111111',
  'home'
);

-- Sections for Auto Detailing
INSERT INTO sections (page_id, key, props, visible, "order") VALUES
('11111111-2222-3333-4444-555555555555', 'Hero', '{
  "title": "Premium Auto Detailing",
  "subtitle": "Professionelle Fahrzeugaufbereitung für ein perfektes Finish",
  "ctaText": "Termin vereinbaren",
  "ctaLink": "#contact",
  "backgroundImage": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1920"
}', true, 0),

('11111111-2222-3333-4444-555555555555', 'Features', '{
  "title": "Unsere Leistungen",
  "subtitle": "Alles für den perfekten Glanz",
  "features": [
    {
      "icon": "star",
      "title": "Außenreinigung",
      "description": "Professionelle Handwäsche mit Premium-Produkten"
    },
    {
      "icon": "shield",
      "title": "Innenreinigung",
      "description": "Tiefenreinigung aller Oberflächen und Polster"
    },
    {
      "icon": "zap",
      "title": "Lackpflege",
      "description": "Politur und Versiegelung für langanhaltenden Schutz"
    },
    {
      "icon": "award",
      "title": "Keramikversiegelung",
      "description": "Höchster Schutz für Lack und Oberflächen"
    },
    {
      "icon": "heart",
      "title": "Polsterreinigung",
      "description": "Schonende Reinigung von Sitzen und Teppichen"
    },
    {
      "icon": "trending",
      "title": "Motorwäsche",
      "description": "Professionelle Reinigung des Motorraums"
    }
  ]
}', true, 1),

('11111111-2222-3333-4444-555555555555', 'Pricing', '{
  "title": "Unsere Pakete",
  "subtitle": "Transparente Preise für jeden Bedarf",
  "tiers": [
    {
      "name": "Basic",
      "price": "49€",
      "features": [
        "Außenwäsche",
        "Felgenreinigung",
        "Scheiben innen/außen",
        "Staubsaugen innen"
      ],
      "ctaText": "Jetzt buchen",
      "ctaLink": "#contact"
    },
    {
      "name": "Premium",
      "price": "149€",
      "highlighted": true,
      "features": [
        "Alles aus Basic",
        "Innenraumreinigung",
        "Lackpolitur",
        "Kunststoffpflege",
        "Motorraumreinigung"
      ],
      "ctaText": "Jetzt buchen",
      "ctaLink": "#contact"
    },
    {
      "name": "Deluxe",
      "price": "299€",
      "features": [
        "Alles aus Premium",
        "Keramikversiegelung",
        "Polsterreinigung",
        "Lederaufbereitung",
        "2 Jahre Garantie"
      ],
      "ctaText": "Jetzt buchen",
      "ctaLink": "#contact"
    }
  ]
}', true, 2),

('11111111-2222-3333-4444-555555555555', 'Testimonials', '{
  "title": "Das sagen unsere Kunden",
  "testimonials": [
    {
      "name": "Michael Schmidt",
      "role": "BMW X5 Besitzer",
      "content": "Absolut professionelle Arbeit! Mein Auto sieht aus wie neu. Die Keramikversiegelung ist jeden Cent wert.",
      "rating": 5
    },
    {
      "name": "Sarah Weber",
      "role": "Mercedes C-Klasse",
      "content": "Sehr freundlich und kompetent. Terminvereinbarung war unkompliziert und das Ergebnis übertrifft alle Erwartungen.",
      "rating": 5
    },
    {
      "name": "Thomas Müller",
      "role": "Audi A6",
      "content": "Endlich ein Detailer, der sein Handwerk versteht. Die Lackaufbereitung ist perfekt geworden!",
      "rating": 5
    }
  ]
}', true, 3),

('11111111-2222-3333-4444-555555555555', 'Contact', '{
  "title": "Kontakt",
  "subtitle": "Vereinbaren Sie noch heute einen Termin",
  "email": "info@auto-detailing.de",
  "phone": "+49 123 456789",
  "address": "Musterstraße 123, 12345 Musterstadt"
}', true, 4);


-- Industry 2: Garten- und Landschaftsbau (with BeforeAfter)
INSERT INTO industries (id, slug, name, theme, seo, is_active)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'galabau',
  'Garten- und Landschaftsbau',
  '{
    "brand": "#10B981",
    "text": "#1F2937",
    "accent": "#F59E0B",
    "background": "#FFFFFF",
    "font": "Inter"
  }',
  '{
    "title": "Garten- und Landschaftsbau - Ihr Traumgarten",
    "description": "Professionelle Gartengestaltung vom Entwurf bis zur Umsetzung. Wir schaffen grüne Oasen.",
    "image": "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200"
  }',
  true
);

-- Create page for GaLaBau
INSERT INTO pages (id, industry_id, slug)
VALUES (
  '22222222-3333-4444-5555-666666666666',
  '22222222-2222-2222-2222-222222222222',
  'home'
);

-- Sections for GaLaBau (including BeforeAfter)
INSERT INTO sections (page_id, key, props, visible, "order") VALUES
('22222222-3333-4444-5555-666666666666', 'Hero', '{
  "title": "Ihr Traumgarten wird Realität",
  "subtitle": "Professionelle Gartengestaltung vom Entwurf bis zur Pflege",
  "ctaText": "Kostenloses Angebot",
  "ctaLink": "#contact",
  "backgroundImage": "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920"
}', true, 0),

('22222222-3333-4444-5555-666666666666', 'Services', '{
  "title": "Unsere Leistungen",
  "subtitle": "Von der Planung bis zur Pflege",
  "services": [
    {
      "name": "Gartenplanung",
      "description": "Individuelle Planung und 3D-Visualisierung Ihres Traumgartens",
      "price": "ab 500€",
      "image": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800"
    },
    {
      "name": "Terrassen & Wege",
      "description": "Pflasterarbeiten und Terrassenbau mit hochwertigen Materialien",
      "price": "ab 80€/m²",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
    },
    {
      "name": "Bepflanzung",
      "description": "Professionelle Bepflanzung mit standortgerechten Pflanzen",
      "price": "ab 300€",
      "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800"
    }
  ]
}', true, 1),

('22222222-3333-4444-5555-666666666666', 'BeforeAfter', '{
  "title": "Unsere Referenzen",
  "subtitle": "Sehen Sie selbst, wie wir Gärten verwandeln",
  "images": [
    {
      "before": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
      "after": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "title": "Moderne Terrassengestaltung"
    },
    {
      "before": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "after": "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800",
      "title": "Komplette Gartenumgestaltung"
    }
  ]
}', true, 2),

('22222222-3333-4444-5555-666666666666', 'FAQ', '{
  "title": "Häufig gestellte Fragen",
  "items": [
    {
      "question": "Wie lange dauert ein Gartenprojekt?",
      "answer": "Die Dauer hängt vom Umfang ab. Kleinere Projekte dauern 1-2 Wochen, größere Umgestaltungen können 4-8 Wochen in Anspruch nehmen."
    },
    {
      "question": "Bieten Sie auch Pflege-Services an?",
      "answer": "Ja, wir bieten regelmäßige Gartenpflege an, von wöchentlich bis monatlich, je nach Ihren Bedürfnissen."
    },
    {
      "question": "Welche Zahlungsmöglichkeiten gibt es?",
      "answer": "Wir akzeptieren Überweisung, Barzahlung und bieten bei größeren Projekten auch Ratenzahlung an."
    },
    {
      "question": "Gibt es eine Garantie?",
      "answer": "Ja, wir geben 2 Jahre Garantie auf alle Pflaster- und Bauarbeiten sowie 1 Jahr Anwuchsgarantie auf Pflanzen."
    }
  ]
}', true, 3),

('22222222-3333-4444-5555-666666666666', 'Contact', '{
  "title": "Kontaktieren Sie uns",
  "subtitle": "Wir beraten Sie gerne kostenlos vor Ort",
  "email": "info@galabau-muster.de",
  "phone": "+49 123 789456",
  "address": "Gartenweg 45, 12345 Musterstadt"
}', true, 4);


-- Industry 3: Restaurants (gastro)
INSERT INTO industries (id, slug, name, theme, seo, is_active)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'restaurant',
  'Restaurant',
  '{
    "brand": "#DC2626",
    "text": "#1F2937",
    "accent": "#FBBF24",
    "background": "#FFFFFF",
    "font": "Inter"
  }',
  '{
    "title": "Restaurant Bella Vista - Italienische Küche",
    "description": "Genießen Sie authentische italienische Küche in gemütlicher Atmosphäre. Reservieren Sie jetzt!",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
  }',
  true
);

-- Create page for Restaurant
INSERT INTO pages (id, industry_id, slug)
VALUES (
  '33333333-4444-5555-6666-777777777777',
  '33333333-3333-3333-3333-333333333333',
  'home'
);

-- Sections for Restaurant
INSERT INTO sections (page_id, key, props, visible, "order") VALUES
('33333333-4444-5555-6666-777777777777', 'Hero', '{
  "title": "Bella Vista",
  "subtitle": "Authentische italienische Küche mit Herz und Leidenschaft",
  "ctaText": "Jetzt reservieren",
  "ctaLink": "#contact",
  "backgroundImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920"
}', true, 0),

('33333333-4444-5555-6666-777777777777', 'Features', '{
  "title": "Warum Bella Vista?",
  "features": [
    {
      "icon": "star",
      "title": "Frische Zutaten",
      "description": "Täglich frische Zutaten aus Italien und der Region"
    },
    {
      "icon": "heart",
      "title": "Hausgemachte Pasta",
      "description": "Alle Pasta-Gerichte werden täglich frisch von Hand gemacht"
    },
    {
      "icon": "award",
      "title": "Authentische Rezepte",
      "description": "Original italienische Rezepte aus der Familie unseres Küchenchefs"
    },
    {
      "icon": "shield",
      "title": "Gemütliche Atmosphäre",
      "description": "Entspannte, familienfreundliche Umgebung"
    }
  ]
}', true, 1),

('33333333-4444-5555-6666-777777777777', 'PortfolioGrid', '{
  "title": "Unsere Spezialitäten",
  "subtitle": "Ein Vorgeschmack auf unsere Küche",
  "items": [
    {
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
      "title": "Pasta Carbonara",
      "category": "Pasta"
    },
    {
      "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
      "title": "Pizza Margherita",
      "category": "Pizza"
    },
    {
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      "title": "Tiramisu",
      "category": "Desserts"
    },
    {
      "image": "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800",
      "title": "Antipasti",
      "category": "Vorspeisen"
    },
    {
      "image": "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800",
      "title": "Risotto",
      "category": "Hauptgerichte"
    },
    {
      "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
      "title": "Panna Cotta",
      "category": "Desserts"
    }
  ]
}', true, 2),

('33333333-4444-5555-6666-777777777777', 'CTA', '{
  "title": "Besuchen Sie uns heute!",
  "description": "Reservieren Sie jetzt Ihren Tisch und erleben Sie echte italienische Gastfreundschaft",
  "primaryText": "Tisch reservieren",
  "primaryLink": "#contact",
  "secondaryText": "Speisekarte ansehen",
  "secondaryLink": "#menu",
  "backgroundImage": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920"
}', true, 3),

('33333333-4444-5555-6666-777777777777', 'Testimonials', '{
  "title": "Gästebewertungen",
  "testimonials": [
    {
      "name": "Anna Rossi",
      "role": "Stammgast",
      "content": "Das beste italienische Restaurant in der Stadt! Die Pasta ist wie bei meiner Nonna in Italien.",
      "rating": 5
    },
    {
      "name": "Marco Bianchi",
      "role": "Besucher",
      "content": "Hervorragende Qualität und super freundliches Personal. Wir kommen definitiv wieder!",
      "rating": 5
    },
    {
      "name": "Lisa Wagner",
      "role": "Food Bloggerin",
      "content": "Authentisch, lecker und gemütlich. Ein echter Geheimtipp für alle Pasta-Liebhaber!",
      "rating": 5
    }
  ]
}', true, 4),

('33333333-4444-5555-6666-777777777777', 'Contact', '{
  "title": "Reservierung & Kontakt",
  "subtitle": "Wir freuen uns auf Ihren Besuch!",
  "email": "info@bellavista-restaurant.de",
  "phone": "+49 123 654321",
  "address": "Pizzaplatz 7, 12345 Musterstadt",
  "mapUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409290863267!2d13.404953999999999!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburg%20Gate!5e0!3m2!1sen!2sde!4v1234567890"
}', true, 5);

-- Verify the data
SELECT
  i.name as industry,
  i.slug,
  p.slug as page_slug,
  COUNT(s.id) as section_count
FROM industries i
LEFT JOIN pages p ON p.industry_id = i.id
LEFT JOIN sections s ON s.page_id = p.id
GROUP BY i.id, i.name, i.slug, p.slug
ORDER BY i.name;
