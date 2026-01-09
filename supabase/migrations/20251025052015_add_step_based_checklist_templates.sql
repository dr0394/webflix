/*
  # Step-basiertes Checklist-System
  
  1. Änderungen an checklist_templates
    - Füge `steps` Array hinzu für strukturierte Steps
    - Jeder Step entspricht einer Website-Section
    - Jeder Step enthält:
      - `section_name` für die Section-Zuordnung
      - `preview_component` für die Highlight-Zone
      - `fields` für die Formularfelder
      
  2. Struktur
    - Steps ersetzen die bisherigen Sections
    - Jeder Step hat eine klare 1:1 Zuordnung zu einer Website-Section
    - Preview wird rechts angezeigt mit Highlights
    
  3. Beispiel Steps für Autoaufbereitung:
    - Step 1: Hero Section (Titel, Untertitel, Foto)
    - Step 2: Vehicle Cards (Fahrzeugtypen ändern)
    - Step 3: Before/After Bilder
    - Step 4: Galerie Fotos
    - Step 5: Reinigungspakete
    - Step 6: Maps & Kontaktdaten
    - Step 7: Logo Upload
*/

-- Update Autoaufbereitung Template mit Step-basierter Struktur
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
        {
          "id": "hero_title",
          "label": "Hauptüberschrift",
          "type": "text",
          "required": true,
          "maxLength": 80,
          "placeholder": "Professionelle Fahrzeugaufbereitung",
          "preview_target": "hero_title"
        },
        {
          "id": "hero_subtitle",
          "label": "Unterüberschrift",
          "type": "text",
          "required": true,
          "maxLength": 150,
          "placeholder": "Für strahlenden Glanz und Werterhalt Ihres Fahrzeugs",
          "preview_target": "hero_subtitle"
        },
        {
          "id": "hero_image",
          "label": "Hero-Bild",
          "type": "image",
          "required": false,
          "description": "Optional: Eigenes Hero-Bild hochladen (sonst verwenden wir Stock-Fotos)",
          "preview_target": "hero_background"
        },
        {
          "id": "cta_text",
          "label": "Button-Text",
          "type": "text",
          "required": false,
          "maxLength": 30,
          "placeholder": "Jetzt Termin buchen",
          "preview_target": "hero_cta"
        }
      ]
    },
    {
      "id": "vehicle_types",
      "title": "Fahrzeugtypen",
      "section_name": "vehicle_cards",
      "description": "Welche Fahrzeugtypen bereiten Sie auf?",
      "preview_component": "VehicleSelection",
      "fields": [
        {
          "id": "vehicle_types",
          "label": "Wählen Sie Ihre Fahrzeugtypen (3-6)",
          "type": "checkbox",
          "required": true,
          "min": 3,
          "max": 6,
          "options": [
            {"value": "pkw", "label": "PKW/Kleinwagen"},
            {"value": "suv", "label": "SUV/Geländewagen"},
            {"value": "transporter", "label": "Transporter/Van"},
            {"value": "luxus", "label": "Luxusfahrzeuge"},
            {"value": "oldtimer", "label": "Oldtimer/Klassiker"},
            {"value": "motorrad", "label": "Motorräder"},
            {"value": "wohnmobil", "label": "Wohnmobile/Camper"}
          ],
          "preview_target": "vehicle_cards"
        }
      ]
    },
    {
      "id": "before_after",
      "title": "Vorher/Nachher Bilder",
      "section_name": "before_after_section",
      "description": "Zeigen Sie beeindruckende Transformationen",
      "preview_component": "BeforeAfterSection",
      "fields": [
        {
          "id": "before_after_images",
          "label": "Vorher/Nachher Bildpaare (3-8 Paare)",
          "type": "image",
          "required": false,
          "multiple": true,
          "max": 16,
          "description": "Laden Sie Bildpaare hoch. Bitte benennen Sie die Dateien: vorher-1.jpg, nachher-1.jpg, etc.",
          "preview_target": "before_after_slider"
        }
      ]
    },
    {
      "id": "gallery",
      "title": "Arbeitsbeispiele Galerie",
      "section_name": "gallery_section",
      "description": "Galerie mit Ihren besten Arbeitsbeispielen",
      "preview_component": "Gallery",
      "fields": [
        {
          "id": "gallery_images",
          "label": "Galerie-Bilder (5-15 Bilder)",
          "type": "image",
          "required": false,
          "multiple": true,
          "max": 15,
          "description": "Hochwertige Fotos Ihrer Arbeit in Aktion",
          "preview_target": "gallery_grid"
        },
        {
          "id": "gallery_title",
          "label": "Galerie-Überschrift",
          "type": "text",
          "required": false,
          "maxLength": 60,
          "placeholder": "Unsere Arbeitsbeispiele",
          "preview_target": "gallery_title"
        }
      ]
    },
    {
      "id": "services",
      "title": "Reinigungspakete & Services",
      "section_name": "services_section",
      "description": "Ihre Dienstleistungen und Pakete",
      "preview_component": "CleaningConfigurator",
      "fields": [
        {
          "id": "service_packages",
          "label": "Service-Pakete",
          "type": "repeater",
          "required": true,
          "min": 3,
          "max": 6,
          "fields": [
            {"id": "package_name", "label": "Paket-Name", "type": "text", "maxLength": 40},
            {"id": "package_description", "label": "Beschreibung", "type": "textarea", "maxLength": 200},
            {"id": "package_price", "label": "Preis (ab)", "type": "number"},
            {"id": "package_features", "label": "Leistungen (eine pro Zeile)", "type": "textarea"}
          ],
          "preview_target": "service_cards"
        },
        {
          "id": "show_prices",
          "label": "Preise anzeigen?",
          "type": "radio",
          "required": true,
          "options": [
            {"value": "yes", "label": "Ja, Preise anzeigen"},
            {"value": "no", "label": "Nein, auf Anfrage"}
          ],
          "preview_target": "price_visibility"
        }
      ]
    },
    {
      "id": "contact",
      "title": "Kontaktdaten & Standort",
      "section_name": "contact_section",
      "description": "Ihre Kontaktinformationen und Standort",
      "preview_component": "MapSection",
      "fields": [
        {
          "id": "company_name",
          "label": "Firmenname",
          "type": "text",
          "required": true,
          "maxLength": 100,
          "preview_target": "company_name"
        },
        {
          "id": "address_street",
          "label": "Straße & Hausnummer",
          "type": "text",
          "required": true,
          "preview_target": "address"
        },
        {
          "id": "address_city",
          "label": "Stadt",
          "type": "text",
          "required": true,
          "preview_target": "city"
        },
        {
          "id": "address_zip",
          "label": "PLZ",
          "type": "text",
          "required": true,
          "preview_target": "zip"
        },
        {
          "id": "phone",
          "label": "Telefonnummer",
          "type": "tel",
          "required": true,
          "preview_target": "phone"
        },
        {
          "id": "email",
          "label": "E-Mail",
          "type": "email",
          "required": true,
          "preview_target": "email"
        },
        {
          "id": "opening_hours",
          "label": "Öffnungszeiten",
          "type": "textarea",
          "required": true,
          "placeholder": "Mo-Fr: 8:00-18:00\\nSa: 9:00-14:00",
          "preview_target": "hours"
        },
        {
          "id": "whatsapp",
          "label": "WhatsApp Nummer",
          "type": "tel",
          "required": false,
          "preview_target": "whatsapp"
        },
        {
          "id": "desired_domain",
          "label": "Wunschdomain",
          "type": "text",
          "required": false,
          "placeholder": "meine-firma.de",
          "description": "Optional: Ihre bevorzugte Domain (wir prüfen die Verfügbarkeit)"
        }
      ]
    },
    {
      "id": "branding",
      "title": "Logo & Farben",
      "section_name": "branding",
      "description": "Ihr Logo und Corporate Identity",
      "preview_component": "Header",
      "fields": [
        {
          "id": "logo",
          "label": "Firmenlogo",
          "type": "image",
          "required": false,
          "description": "PNG oder SVG mit transparentem Hintergrund",
          "preview_target": "logo"
        },
        {
          "id": "primary_color",
          "label": "Hauptfarbe (Hex)",
          "type": "color",
          "required": false,
          "placeholder": "#FF6B35",
          "preview_target": "primary_color"
        },
        {
          "id": "secondary_color",
          "label": "Sekundärfarbe (Hex)",
          "type": "color",
          "required": false,
          "placeholder": "#1A1A1A",
          "preview_target": "secondary_color"
        }
      ]
    }
  ]
}'::jsonb
WHERE demo_name = 'autoaufbereitung';
