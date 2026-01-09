/*
  # Webflix One KFZ Checklist Template
  
  1. Neues Template
    - Erstellt ein neues Checklist-Template für "Webflix One KFZ"
    - Basiert auf der Demo: https://auto-demo-webflix.bolt.host
    - Verwendet die gleiche Step-basierte Struktur wie bisher
    
  2. Struktur
    - demo_name: "webflix-one-kfz"
    - Steps für alle Sections der Webflix One Demo
    - Highlight-Mappings für Live-Preview
    
  3. Steps
    - Hero Section mit cinematic Effekten
    - Service-Auswahl (Fahrzeugtypen)
    - Before/After Galerie
    - Projekt-Galerie
    - Google Maps & Kontakt
    - Logo & Branding
*/

-- Erstelle Webflix One KFZ Template
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
        "description": "Cinematic Hero-Bereich mit Hauptüberschrift und Premium-Animationen",
        "preview_component": "HeroSection",
        "fields": [
          {
            "id": "company_name",
            "label": "Firmenname",
            "type": "text",
            "required": true,
            "maxLength": 50,
            "placeholder": "Detailing Lab",
            "preview_target": "company_name",
            "ai_suggestion": true
          },
          {
            "id": "hero_tagline",
            "label": "Tagline / Slogan",
            "type": "text",
            "required": true,
            "maxLength": 100,
            "placeholder": "Showcar-Finish. Jedes Mal.",
            "preview_target": "hero_tagline",
            "ai_suggestion": true
          },
          {
            "id": "hero_description",
            "label": "Kurzbeschreibung",
            "type": "textarea",
            "required": false,
            "maxLength": 200,
            "placeholder": "Professionelle Fahrzeugaufbereitung mit Premium-Service",
            "preview_target": "hero_description"
          },
          {
            "id": "hero_image",
            "label": "Hero-Hintergrundbild",
            "type": "image",
            "required": false,
            "description": "Optional: Eigenes Hero-Bild hochladen (ideal: 1920x1080px)",
            "preview_target": "hero_background"
          }
        ]
      },
      {
        "id": "services_section",
        "title": "Service-Übersicht",
        "section_name": "services",
        "description": "Ihre angebotenen Services und Fahrzeugtypen",
        "preview_component": "ServicesSection",
        "fields": [
          {
            "id": "services_title",
            "label": "Section-Überschrift",
            "type": "text",
            "required": false,
            "maxLength": 60,
            "placeholder": "Unsere Services",
            "preview_target": "services_title"
          },
          {
            "id": "service_types",
            "label": "Wählen Sie Ihre Services (3-6)",
            "type": "checkbox",
            "required": true,
            "min": 3,
            "max": 6,
            "options": [
              {"value": "exterior", "label": "Außenaufbereitung"},
              {"value": "interior", "label": "Innenraumaufbereitung"},
              {"value": "ceramic", "label": "Keramikversiegelung"},
              {"value": "polish", "label": "Lackpolitur"},
              {"value": "ppf", "label": "Paint Protection Film"},
              {"value": "detailing", "label": "Premium Detailing"},
              {"value": "washing", "label": "Handwäsche Premium"}
            ],
            "preview_target": "service_cards"
          }
        ]
      },
      {
        "id": "vehicle_selector",
        "title": "Fahrzeugtypen",
        "section_name": "vehicle_selector",
        "description": "Welche Fahrzeugtypen bieten Sie an?",
        "preview_component": "VehicleSelector",
        "fields": [
          {
            "id": "vehicle_types",
            "label": "Wählen Sie Ihre Fahrzeugtypen",
            "type": "checkbox",
            "required": true,
            "min": 3,
            "max": 6,
            "options": [
              {"value": "limousine", "label": "Limousine"},
              {"value": "suv", "label": "SUV"},
              {"value": "sportwagen", "label": "Sportwagen"},
              {"value": "cabrio", "label": "Cabriolet"},
              {"value": "kombi", "label": "Kombi"},
              {"value": "van", "label": "Van/Transporter"},
              {"value": "oldtimer", "label": "Oldtimer"}
            ],
            "preview_target": "vehicle_cards"
          }
        ]
      },
      {
        "id": "before_after",
        "title": "Before/After Galerie",
        "section_name": "before_after",
        "description": "Zeigen Sie Ihre Arbeit mit eindrucksvollen Vorher-Nachher-Bildern",
        "preview_component": "BeforeAfterSection",
        "fields": [
          {
            "id": "before_after_title",
            "label": "Section-Überschrift",
            "type": "text",
            "required": false,
            "maxLength": 60,
            "placeholder": "Vorher / Nachher",
            "preview_target": "before_after_title"
          },
          {
            "id": "before_after_images",
            "label": "Before/After Bildpaare",
            "type": "image_pairs",
            "required": false,
            "min": 3,
            "max": 6,
            "description": "Laden Sie 3-6 Bildpaare hoch (Vorher und Nachher). Falls nicht vorhanden, verwenden wir Stock-Fotos.",
            "preview_target": "before_after_slider"
          }
        ]
      },
      {
        "id": "portfolio_gallery",
        "title": "Portfolio Galerie",
        "section_name": "gallery",
        "description": "Ihre besten Projekt-Fotos in einer eleganten Galerie",
        "preview_component": "GallerySection",
        "fields": [
          {
            "id": "gallery_title",
            "label": "Galerie-Überschrift",
            "type": "text",
            "required": false,
            "maxLength": 60,
            "placeholder": "Unsere Arbeiten",
            "preview_target": "gallery_title"
          },
          {
            "id": "gallery_images",
            "label": "Galerie-Bilder",
            "type": "multiple_images",
            "required": false,
            "min": 6,
            "max": 12,
            "description": "Laden Sie 6-12 Ihrer besten Projekt-Fotos hoch. Falls nicht vorhanden, verwenden wir hochwertige Stock-Fotos.",
            "preview_target": "gallery_grid"
          }
        ]
      },
      {
        "id": "testimonials",
        "title": "Kundenbewertungen",
        "section_name": "testimonials",
        "description": "Zeigen Sie Google-Bewertungen und Kundenmeinungen",
        "preview_component": "TestimonialsSection",
        "fields": [
          {
            "id": "google_reviews_enabled",
            "label": "Google-Bewertungen anzeigen",
            "type": "toggle",
            "required": false,
            "default": true,
            "preview_target": "google_reviews"
          },
          {
            "id": "google_place_id",
            "label": "Google Place ID",
            "type": "text",
            "required": false,
            "placeholder": "ChIJN1t_tDeuEmsRUsoyG83frY4",
            "description": "Optional: Ihre Google Place ID für Live-Bewertungen",
            "preview_target": "google_place_id"
          }
        ]
      },
      {
        "id": "contact_section",
        "title": "Kontakt & Standort",
        "section_name": "contact",
        "description": "Kontaktdaten und Google Maps Integration",
        "preview_component": "ContactSection",
        "fields": [
          {
            "id": "contact_title",
            "label": "Section-Überschrift",
            "type": "text",
            "required": false,
            "maxLength": 60,
            "placeholder": "Kontakt",
            "preview_target": "contact_title"
          },
          {
            "id": "company_address",
            "label": "Adresse",
            "type": "textarea",
            "required": true,
            "maxLength": 200,
            "placeholder": "Musterstraße 123\\n12345 Musterstadt",
            "preview_target": "contact_address"
          },
          {
            "id": "company_phone",
            "label": "Telefonnummer",
            "type": "tel",
            "required": true,
            "placeholder": "+49 123 456789",
            "preview_target": "contact_phone"
          },
          {
            "id": "company_email",
            "label": "E-Mail",
            "type": "email",
            "required": true,
            "placeholder": "info@beispiel.de",
            "preview_target": "contact_email"
          },
          {
            "id": "opening_hours",
            "label": "Öffnungszeiten",
            "type": "textarea",
            "required": false,
            "maxLength": 300,
            "placeholder": "Mo-Fr: 9:00 - 18:00 Uhr\\nSa: 10:00 - 14:00 Uhr",
            "preview_target": "opening_hours"
          },
          {
            "id": "google_maps_enabled",
            "label": "Google Maps anzeigen",
            "type": "toggle",
            "required": false,
            "default": true,
            "preview_target": "maps_section"
          },
          {
            "id": "maps_address",
            "label": "Adresse für Google Maps",
            "type": "text",
            "required": false,
            "placeholder": "Musterstraße 123, 12345 Musterstadt",
            "description": "Wird für die Karten-Suche verwendet",
            "preview_target": "maps_query"
          }
        ]
      },
      {
        "id": "branding",
        "title": "Logo & Branding",
        "section_name": "branding",
        "description": "Ihr Logo und Farbschema",
        "preview_component": "BrandingSection",
        "fields": [
          {
            "id": "company_logo",
            "label": "Firmen-Logo",
            "type": "image",
            "required": false,
            "description": "Optional: Laden Sie Ihr Logo hoch (PNG mit transparentem Hintergrund empfohlen)",
            "preview_target": "header_logo"
          },
          {
            "id": "primary_color",
            "label": "Primärfarbe",
            "type": "color",
            "required": false,
            "default": "#f97316",
            "description": "Hauptfarbe Ihrer Website (Standard: Orange)",
            "preview_target": "theme_primary"
          },
          {
            "id": "secondary_color",
            "label": "Sekundärfarbe",
            "type": "color",
            "required": false,
            "default": "#ec4899",
            "description": "Akzentfarbe für Gradienten (Standard: Pink)",
            "preview_target": "theme_secondary"
          }
        ]
      }
    ]
  }'
)
ON CONFLICT (demo_name) 
DO UPDATE SET 
  template_data = EXCLUDED.template_data,
  updated_at = NOW();