/*
  # Update Checklist Templates with step-based structure

  1. Update autoaufbereitung template with steps
  2. Insert webflix-one-kfz template with sections
*/

UPDATE checklist_templates 
SET template_data = '{
  "demo_name": "autoaufbereitung",
  "steps": [
    {
      "id": "hero_section",
      "title": "Hero Section",
      "section_name": "hero",
      "description": "Hauptüberschrift und Einstiegsbild Ihrer Website",
      "preview_component": "HeroSection",
      "fields": [
        {"id": "hero_title", "label": "Hauptüberschrift", "type": "text", "required": true, "maxLength": 80, "placeholder": "Professionelle Fahrzeugaufbereitung", "preview_target": "hero_title", "ai_suggestions": true},
        {"id": "hero_subtitle", "label": "Unterüberschrift", "type": "text", "required": true, "maxLength": 150, "placeholder": "Für strahlenden Glanz und Werterhalt Ihres Fahrzeugs", "preview_target": "hero_subtitle", "ai_suggestions": true},
        {"id": "hero_image", "label": "Hero-Bild", "type": "image", "required": false, "description": "Optional: Eigenes Hero-Bild hochladen", "preview_target": "hero_background"},
        {"id": "cta_text", "label": "Button-Text", "type": "text", "required": false, "maxLength": 30, "placeholder": "Jetzt Termin buchen", "preview_target": "hero_cta", "ai_suggestions": true}
      ]
    },
    {
      "id": "vehicle_types",
      "title": "Fahrzeugtypen",
      "section_name": "vehicle_cards",
      "description": "Welche Fahrzeugtypen bereiten Sie auf?",
      "preview_component": "VehicleSelection",
      "fields": [
        {"id": "vehicle_types", "label": "Wählen Sie Ihre Fahrzeugtypen (3-6)", "type": "checkbox", "required": true, "min": 3, "max": 6, "options": [{"value": "pkw", "label": "PKW/Kleinwagen"}, {"value": "suv", "label": "SUV/Geländewagen"}, {"value": "transporter", "label": "Transporter/Van"}, {"value": "luxus", "label": "Luxusfahrzeuge"}, {"value": "oldtimer", "label": "Oldtimer/Klassiker"}, {"value": "motorrad", "label": "Motorräder"}, {"value": "wohnmobil", "label": "Wohnmobile/Camper"}], "preview_target": "vehicle_cards"}
      ]
    },
    {
      "id": "before_after",
      "title": "Vorher/Nachher Bilder",
      "section_name": "before_after_section",
      "description": "Zeigen Sie beeindruckende Transformationen",
      "preview_component": "BeforeAfterSection",
      "fields": [
        {"id": "before_after_images", "label": "Vorher/Nachher Bildpaare (3-8 Paare)", "type": "image", "required": false, "multiple": true, "max": 16, "description": "Laden Sie Bildpaare hoch.", "preview_target": "before_after_slider"}
      ]
    },
    {
      "id": "gallery",
      "title": "Arbeitsbeispiele Galerie",
      "section_name": "gallery_section",
      "description": "Galerie mit Ihren besten Arbeitsbeispielen",
      "preview_component": "Gallery",
      "fields": [
        {"id": "gallery_images", "label": "Galerie-Bilder (5-15 Bilder)", "type": "image", "required": false, "multiple": true, "max": 15, "description": "Hochwertige Fotos Ihrer Arbeit", "preview_target": "gallery_grid"},
        {"id": "gallery_title", "label": "Galerie-Überschrift", "type": "text", "required": false, "maxLength": 60, "placeholder": "Unsere Arbeitsbeispiele", "preview_target": "gallery_title"}
      ]
    },
    {
      "id": "contact",
      "title": "Kontaktdaten & Standort",
      "section_name": "contact_section",
      "description": "Ihre Kontaktinformationen und Standort",
      "preview_component": "MapSection",
      "fields": [
        {"id": "company_name", "label": "Firmenname", "type": "text", "required": true, "maxLength": 100, "preview_target": "company_name"},
        {"id": "address_street", "label": "Straße & Hausnummer", "type": "text", "required": true, "preview_target": "address"},
        {"id": "address_city", "label": "Stadt", "type": "text", "required": true, "preview_target": "city"},
        {"id": "address_zip", "label": "PLZ", "type": "text", "required": true, "preview_target": "zip"},
        {"id": "phone", "label": "Telefonnummer", "type": "tel", "required": true, "preview_target": "phone"},
        {"id": "email", "label": "E-Mail", "type": "email", "required": true, "preview_target": "email"},
        {"id": "opening_hours", "label": "Öffnungszeiten", "type": "textarea", "required": true, "placeholder": "Mo-Fr: 8:00-18:00\nSa: 9:00-14:00", "preview_target": "hours", "ai_suggestions": true},
        {"id": "whatsapp", "label": "WhatsApp Nummer", "type": "tel", "required": false, "preview_target": "whatsapp"},
        {"id": "desired_domain", "label": "Wunschdomain", "type": "text", "required": false, "placeholder": "meine-firma.de"}
      ]
    },
    {
      "id": "branding",
      "title": "Logo & Farben",
      "section_name": "branding",
      "description": "Ihr Logo und Corporate Identity",
      "preview_component": "Header",
      "fields": [
        {"id": "logo", "label": "Firmenlogo", "type": "image", "required": false, "description": "PNG oder SVG mit transparentem Hintergrund", "preview_target": "logo"},
        {"id": "primary_color", "label": "Hauptfarbe (Hex)", "type": "color", "required": false, "placeholder": "#FF6B35", "preview_target": "primary_color"},
        {"id": "secondary_color", "label": "Sekundärfarbe (Hex)", "type": "color", "required": false, "placeholder": "#1A1A1A", "preview_target": "secondary_color"}
      ]
    }
  ]
}'::jsonb
WHERE demo_name = 'autoaufbereitung';

INSERT INTO checklist_templates (demo_name, template_data)
VALUES (
  'webflix-one-kfz',
  '{
    "demo_name": "webflix-one-kfz",
    "demo_url": "https://auto-demo-webflix.bolt.host",
    "steps": [
      {
        "id": "hero_section",
        "title": "Hero Section",
        "section_name": "hero",
        "description": "Der erste Eindruck Ihrer Website - Logo, Headline und Hero-Bild",
        "preview_screenshot": "/screenshot-2025-11-15_um_09.25.13.png",
        "fields": [
          {"id": "company_logo", "label": "Logo hochladen", "type": "image", "required": false, "description": "Ihr Firmenlogo (oben links)", "preview_target": "logo"},
          {"id": "hero_badge", "label": "Badge / Highlight-Text", "type": "text", "required": false, "maxLength": 80, "placeholder": "Professionelle Fahrzeugaufbereitung für Show-Car Finish", "preview_target": "hero_badge"},
          {"id": "hero_tagline", "label": "Hauptüberschrift / Tagline", "type": "text", "required": true, "maxLength": 60, "placeholder": "Dein Auto. Perfektioniert.", "preview_target": "hero_tagline", "ai_suggestion": true},
          {"id": "hero_subtitle", "label": "Untertitel / Beschreibung", "type": "textarea", "required": false, "maxLength": 180, "placeholder": "Professionelle Autoaufbereitung mit modernster Technologie.", "preview_target": "hero_subtitle", "rows": 3},
          {"id": "hero_background_image", "label": "Hero-Hintergrundbild", "type": "image", "required": false, "description": "Optional: Eigenes Hero-Bild (ideal: 1920x1080px)", "preview_target": "hero_background"}
        ]
      },
      {
        "id": "services_section",
        "title": "Service-Übersicht",
        "section_name": "services",
        "description": "Ihre angebotenen Leistungen",
        "fields": [
          {"id": "services_section_title", "label": "Section-Überschrift", "type": "text", "required": false, "maxLength": 50, "placeholder": "Unsere Leistungen", "preview_target": "services_title"},
          {"id": "services_section_subtitle", "label": "Section-Untertitel", "type": "text", "required": false, "maxLength": 100, "placeholder": "Professionelle Fahrzeugaufbereitung für Show-Car Finish", "preview_target": "services_subtitle"},
          {"id": "service_types", "label": "Wählen Sie Ihre Services (3-6)", "type": "checkbox", "required": true, "min": 3, "max": 6, "options": [{"value": "exterior", "label": "Außenaufbereitung"}, {"value": "interior", "label": "Innenraumaufbereitung"}, {"value": "ceramic", "label": "Keramikversiegelung"}, {"value": "polish", "label": "Lackpolitur"}, {"value": "ppf", "label": "Paint Protection Film"}, {"value": "detailing", "label": "Premium Detailing"}, {"value": "washing", "label": "Handwäsche Premium"}], "preview_target": "service_cards"}
        ]
      },
      {
        "id": "vehicle_selector",
        "title": "Fahrzeugtypen",
        "section_name": "vehicle_selector",
        "description": "Welche Fahrzeugtypen bieten Sie an?",
        "fields": [
          {"id": "vehicle_types", "label": "Wählen Sie Ihre Fahrzeugtypen", "type": "checkbox", "required": true, "min": 3, "max": 6, "options": [{"value": "limousine", "label": "Limousine"}, {"value": "suv", "label": "SUV"}, {"value": "sportwagen", "label": "Sportwagen"}, {"value": "kombi", "label": "Kombi"}, {"value": "van", "label": "Van / Transporter"}, {"value": "cabrio", "label": "Cabrio"}, {"value": "oldtimer", "label": "Oldtimer / Klassiker"}], "preview_target": "vehicle_cards"}
        ]
      },
      {
        "id": "before_after",
        "title": "Vorher/Nachher Galerie",
        "section_name": "before_after",
        "description": "Zeigen Sie die Transformation Ihrer Arbeit",
        "fields": [
          {"id": "before_after_images", "label": "Vorher/Nachher Bildpaare (3-6 Paare)", "type": "image_pair", "required": true, "min": 3, "max": 6, "preview_target": "before_after_slider"}
        ]
      },
      {
        "id": "portfolio_gallery",
        "title": "Portfolio Galerie",
        "section_name": "gallery",
        "description": "Ihre besten Arbeiten in einer Galerie",
        "fields": [
          {"id": "gallery_images", "label": "Galerie-Bilder (6-12 Bilder)", "type": "image_gallery", "required": true, "min": 6, "max": 12, "preview_target": "gallery_grid"}
        ]
      },
      {
        "id": "reviews_section",
        "title": "Kundenbewertungen",
        "section_name": "reviews",
        "description": "Google Reviews Integration",
        "fields": [
          {"id": "google_reviews_enabled", "label": "Google Reviews anzeigen", "type": "toggle", "required": false, "default": true, "preview_target": "reviews_section"},
          {"id": "google_place_id", "label": "Google Place ID", "type": "text", "required": false, "placeholder": "ChIJN1t_tDeuEmsRUsoyG83frY4"}
        ]
      },
      {
        "id": "contact_location",
        "title": "Kontakt & Standort",
        "section_name": "contact",
        "description": "Ihre Kontaktdaten und Google Maps",
        "fields": [
          {"id": "contact_phone", "label": "Telefonnummer", "type": "tel", "required": true, "placeholder": "+49 123 456789", "preview_target": "contact_phone"},
          {"id": "contact_email", "label": "E-Mail", "type": "email", "required": true, "placeholder": "info@ihre-firma.de", "preview_target": "contact_email"},
          {"id": "address_street", "label": "Straße & Hausnummer", "type": "text", "required": true, "placeholder": "Musterstraße 123", "preview_target": "address_street"},
          {"id": "address_zip", "label": "PLZ", "type": "text", "required": true, "placeholder": "12345", "preview_target": "address_zip"},
          {"id": "address_city", "label": "Stadt", "type": "text", "required": true, "placeholder": "Berlin", "preview_target": "address_city"},
          {"id": "google_maps_enabled", "label": "Google Maps anzeigen", "type": "toggle", "required": false, "default": true, "preview_target": "maps_section"}
        ]
      },
      {
        "id": "branding_colors",
        "title": "Logo & Branding",
        "section_name": "branding",
        "description": "Farben für Ihre Website",
        "fields": [
          {"id": "primary_color", "label": "Hauptfarbe", "type": "color", "required": true, "default": "#3b82f6", "preview_target": "primary_elements"},
          {"id": "secondary_color", "label": "Akzentfarbe", "type": "color", "required": false, "default": "#8b5cf6", "preview_target": "accent_elements"}
        ]
      }
    ]
  }'::jsonb
)
ON CONFLICT (demo_name) 
DO UPDATE SET 
  template_data = EXCLUDED.template_data,
  updated_at = NOW();
