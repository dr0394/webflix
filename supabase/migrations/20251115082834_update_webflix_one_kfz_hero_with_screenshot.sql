/*
  # Update Webflix One KFZ Hero Section mit Screenshot
  
  1. Änderungen
    - Aktualisiert Hero Section mit allen 5 änderbaren Elementen
    - Fügt Screenshot-Preview hinzu (/Bildschirmfoto 2025-11-15 um 09.25.13.png)
    - Fügt Visual Annotations hinzu
    
  2. Hero Section Felder
    - Logo (Upload)
    - Badge Text (z.B. "Professionelle Fahrzeugaufbereitung")
    - Tagline (z.B. "Dein Auto. Perfektioniert.")
    - Untertitel (Beschreibung)
    - Hero Hintergrundbild (Upload)
*/

-- Update existing template
UPDATE checklist_templates
SET template_data = jsonb_set(
  template_data,
  '{sections}',
  '[
    {
      "id": "hero_section",
      "title": "Hero Section",
      "section_name": "hero",
      "description": "Der erste Eindruck Ihrer Website - Logo, Headline und Hero-Bild",
      "preview_component": "HeroSection",
      "preview_screenshot": "/Bildschirmfoto 2025-11-15 um 09.25.13.png",
      "annotations": [
        {
          "id": "logo_annotation",
          "label": "Logo",
          "position": { "top": "2%", "left": "16%" },
          "field_id": "company_logo"
        },
        {
          "id": "badge_annotation",
          "label": "Badge / Slogan",
          "position": { "top": "28%", "left": "50%" },
          "field_id": "hero_badge"
        },
        {
          "id": "tagline_annotation",
          "label": "Hauptüberschrift",
          "position": { "top": "42%", "left": "50%" },
          "field_id": "hero_tagline"
        },
        {
          "id": "subtitle_annotation",
          "label": "Untertitel",
          "position": { "top": "52%", "left": "50%" },
          "field_id": "hero_subtitle"
        },
        {
          "id": "background_annotation",
          "label": "Hintergrundbild",
          "position": { "top": "50%", "left": "50%" },
          "field_id": "hero_background_image"
        }
      ],
      "fields": [
        {
          "id": "company_logo",
          "label": "Logo hochladen",
          "type": "image",
          "required": false,
          "description": "Ihr Firmenlogo (optimal: PNG mit transparentem Hintergrund, max. 500px breit)",
          "preview_target": "logo",
          "accept": "image/png,image/svg+xml,image/jpeg"
        },
        {
          "id": "hero_badge",
          "label": "Badge / Highlight-Text",
          "type": "text",
          "required": false,
          "maxLength": 80,
          "placeholder": "Professionelle Fahrzeugaufbereitung für Show-Car Finish",
          "preview_target": "hero_badge",
          "ai_suggestion": true,
          "help_text": "Kurzer prägnanter Text über dem Haupttitel (z.B. Ihr USP oder Spezialgebiet)"
        },
        {
          "id": "hero_tagline",
          "label": "Hauptüberschrift / Tagline",
          "type": "text",
          "required": true,
          "maxLength": 60,
          "placeholder": "Dein Auto. Perfektioniert.",
          "preview_target": "hero_tagline",
          "ai_suggestion": true,
          "help_text": "Die große Headline - kurz, kraftvoll, einprägsam"
        },
        {
          "id": "hero_subtitle",
          "label": "Untertitel / Beschreibung",
          "type": "textarea",
          "required": false,
          "maxLength": 180,
          "placeholder": "Professionelle Autoaufbereitung mit modernster Technologie. Von Keramikversiegelung bis Innenraumreinigung – wir holen das Maximum aus deinem Fahrzeug.",
          "preview_target": "hero_subtitle",
          "rows": 3
        },
        {
          "id": "hero_background_image",
          "label": "Hero-Hintergrundbild",
          "type": "image",
          "required": false,
          "description": "Optional: Eigenes Hero-Bild hochladen (ideal: 1920x1080px, Fokus auf Fahrzeug)",
          "preview_target": "hero_background",
          "accept": "image/jpeg,image/png,image/webp"
        }
      ]
    },
    {
      "id": "services_section",
      "title": "Service-Übersicht",
      "section_name": "services",
      "description": "Ihre angebotenen Services",
      "preview_component": "ServicesSection",
      "fields": [
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
            {"value": "kombi", "label": "Kombi"},
            {"value": "van", "label": "Van / Transporter"},
            {"value": "cabrio", "label": "Cabrio"},
            {"value": "oldtimer", "label": "Oldtimer / Klassiker"}
          ],
          "preview_target": "vehicle_cards"
        }
      ]
    },
    {
      "id": "before_after",
      "title": "Vorher/Nachher Galerie",
      "section_name": "before_after",
      "description": "Zeigen Sie die Transformation Ihrer Arbeit",
      "preview_component": "BeforeAfterComparison",
      "fields": [
        {
          "id": "before_after_images",
          "label": "Vorher/Nachher Bildpaare (3-6 Paare)",
          "type": "image_pair",
          "required": true,
          "min": 3,
          "max": 6,
          "description": "Laden Sie Bildpaare hoch um die Transformation zu zeigen",
          "preview_target": "before_after_slider"
        }
      ]
    },
    {
      "id": "portfolio_gallery",
      "title": "Portfolio Galerie",
      "section_name": "gallery",
      "description": "Ihre besten Arbeiten in einer Galerie",
      "preview_component": "GalleryShowcase",
      "fields": [
        {
          "id": "gallery_images",
          "label": "Galerie-Bilder (6-12 Bilder)",
          "type": "image_gallery",
          "required": true,
          "min": 6,
          "max": 12,
          "description": "Hochwertige Fotos Ihrer abgeschlossenen Projekte",
          "preview_target": "gallery_grid"
        }
      ]
    },
    {
      "id": "reviews_section",
      "title": "Kundenbewertungen",
      "section_name": "reviews",
      "description": "Google Reviews Integration",
      "preview_component": "GoogleReviewsBanner",
      "fields": [
        {
          "id": "google_reviews_enabled",
          "label": "Google Reviews anzeigen",
          "type": "toggle",
          "required": false,
          "default": true,
          "preview_target": "reviews_section"
        },
        {
          "id": "google_place_id",
          "label": "Google Place ID",
          "type": "text",
          "required": false,
          "placeholder": "ChIJN1t_tDeuEmsRUsoyG83frY4",
          "help_text": "Optional: Für Live-Reviews von Google"
        }
      ]
    },
    {
      "id": "contact_location",
      "title": "Kontakt & Standort",
      "section_name": "contact",
      "description": "Ihre Kontaktdaten und Google Maps",
      "preview_component": "ContactSection",
      "fields": [
        {
          "id": "contact_phone",
          "label": "Telefonnummer",
          "type": "tel",
          "required": true,
          "placeholder": "+49 123 456789",
          "preview_target": "contact_phone"
        },
        {
          "id": "contact_email",
          "label": "E-Mail",
          "type": "email",
          "required": true,
          "placeholder": "info@ihre-firma.de",
          "preview_target": "contact_email"
        },
        {
          "id": "address_street",
          "label": "Straße & Hausnummer",
          "type": "text",
          "required": true,
          "placeholder": "Musterstraße 123",
          "preview_target": "address_street"
        },
        {
          "id": "address_zip",
          "label": "PLZ",
          "type": "text",
          "required": true,
          "placeholder": "12345",
          "preview_target": "address_zip"
        },
        {
          "id": "address_city",
          "label": "Stadt",
          "type": "text",
          "required": true,
          "placeholder": "Berlin",
          "preview_target": "address_city"
        },
        {
          "id": "google_maps_enabled",
          "label": "Google Maps anzeigen",
          "type": "toggle",
          "required": false,
          "default": true,
          "preview_target": "maps_section"
        }
      ]
    },
    {
      "id": "branding_colors",
      "title": "Logo & Branding",
      "section_name": "branding",
      "description": "Farben für Ihre Website",
      "preview_component": "BrandingPreview",
      "fields": [
        {
          "id": "primary_color",
          "label": "Hauptfarbe",
          "type": "color",
          "required": true,
          "default": "#3b82f6",
          "preview_target": "primary_elements"
        },
        {
          "id": "secondary_color",
          "label": "Akzentfarbe",
          "type": "color",
          "required": false,
          "default": "#8b5cf6",
          "preview_target": "accent_elements"
        }
      ]
    }
  ]'::jsonb
)
WHERE demo_name = 'webflix-one-kfz';

-- Falls noch nicht existiert, erstelle es
INSERT INTO checklist_templates (demo_name, template_data)
SELECT 'webflix-one-kfz', '{}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM checklist_templates WHERE demo_name = 'webflix-one-kfz'
);

-- Update wieder ausführen um sicherzustellen
UPDATE checklist_templates
SET template_data = jsonb_set(
  COALESCE(template_data, '{}'::jsonb),
  '{sections}',
  '[
    {
      "id": "hero_section",
      "title": "Hero Section",
      "section_name": "hero",
      "description": "Der erste Eindruck Ihrer Website - Logo, Headline und Hero-Bild",
      "preview_screenshot": "/Bildschirmfoto 2025-11-15 um 09.25.13.png",
      "fields": [
        {
          "id": "company_logo",
          "label": "Logo hochladen",
          "type": "image",
          "required": false,
          "description": "Ihr Firmenlogo (oben links im Screenshot)",
          "preview_target": "logo"
        },
        {
          "id": "hero_badge",
          "label": "Badge / Highlight-Text",
          "type": "text",
          "required": false,
          "maxLength": 80,
          "placeholder": "Professionelle Fahrzeugaufbereitung für Show-Car Finish",
          "preview_target": "hero_badge",
          "help_text": "Der blaue Badge-Text über der Hauptüberschrift"
        },
        {
          "id": "hero_tagline",
          "label": "Hauptüberschrift / Tagline",
          "type": "text",
          "required": true,
          "maxLength": 60,
          "placeholder": "Dein Auto. Perfektioniert.",
          "preview_target": "hero_tagline",
          "help_text": "Die große weiße Headline in der Mitte"
        },
        {
          "id": "hero_subtitle",
          "label": "Untertitel / Beschreibung",
          "type": "textarea",
          "required": false,
          "maxLength": 180,
          "placeholder": "Professionelle Autoaufbereitung mit modernster Technologie...",
          "preview_target": "hero_subtitle",
          "rows": 3,
          "help_text": "Der Text unter der Hauptüberschrift"
        },
        {
          "id": "hero_background_image",
          "label": "Hero-Hintergrundbild",
          "type": "image",
          "required": false,
          "description": "Optional: Eigenes Hero-Bild hochladen (z.B. Ihr bestes Fahrzeug)",
          "preview_target": "hero_background"
        }
      ]
    }
  ]'::jsonb
)
WHERE demo_name = 'webflix-one-kfz';