/*
  # Step 2: Services Section zur KFZ Checkliste
  
  1. Änderungen
    - Fügt Services Section nach Hero Section ein
    - Screenshot: /Bildschirmfoto 2025-11-15 um 09.34.56.png
    - Änderbare Elemente:
      * Section-Titel
      * Section-Untertitel
      * 6 Service-Karten (Name, Beschreibung, Preis, Icon)
    
  2. Service-Karten im Screenshot
    - Keramikversiegelung (ab 599€)
    - Premium Innenreinigung (ab 199€)
    - Politur & Lackaufbereitung (ab 299€)
    - Lederaufbereitung (ab 149€)
    - Motorwäsche (ab 89€)
    - Scheibentönung (ab 249€)
*/

-- Aktualisiere template_data mit beiden Sections
UPDATE checklist_templates
SET template_data = jsonb_set(
  template_data,
  '{sections}',
  jsonb_build_array(
    -- Section 1: Hero (behalten)
    template_data->'sections'->0,
    -- Section 2: Services (NEU)
    jsonb_build_object(
      'id', 'services_section',
      'title', 'Service-Übersicht',
      'section_name', 'services',
      'description', 'Ihre angebotenen Leistungen - wählen Sie aus oder erstellen Sie eigene',
      'preview_screenshot', '/Bildschirmfoto 2025-11-15 um 09.34.56.png',
      'fields', jsonb_build_array(
        jsonb_build_object(
          'id', 'services_section_title',
          'label', 'Section-Überschrift',
          'type', 'text',
          'required', false,
          'maxLength', 50,
          'placeholder', 'Unsere Leistungen',
          'preview_target', 'services_title',
          'help_text', 'Die Hauptüberschrift der Services-Section'
        ),
        jsonb_build_object(
          'id', 'services_section_subtitle',
          'label', 'Section-Untertitel',
          'type', 'text',
          'required', false,
          'maxLength', 100,
          'placeholder', 'Professionelle Fahrzeugaufbereitung für Show-Car Finish',
          'preview_target', 'services_subtitle',
          'help_text', 'Der erklärende Text unter der Überschrift'
        ),
        jsonb_build_object(
          'id', 'services_list',
          'label', 'Ihre Services (wählen Sie 3-6 aus)',
          'type', 'service_selector',
          'required', true,
          'min', 3,
          'max', 6,
          'preview_target', 'service_cards',
          'help_text', 'Wählen Sie die Services die Sie anbieten oder erstellen Sie eigene',
          'options', jsonb_build_array(
            jsonb_build_object(
              'value', 'ceramic',
              'label', 'Keramikversiegelung',
              'icon', 'shield',
              'default_description', 'Langanhaltender Schutz mit 5 Jahren Garantie',
              'default_price', 'ab 599€'
            ),
            jsonb_build_object(
              'value', 'interior',
              'label', 'Premium Innenreinigung',
              'icon', 'sparkles',
              'default_description', 'Tiefenreinigung aller Oberflächen',
              'default_price', 'ab 199€'
            ),
            jsonb_build_object(
              'value', 'polish',
              'label', 'Politur & Lackaufbereitung',
              'icon', 'droplet',
              'default_description', 'Entfernung von Kratzern und Hologrammen',
              'default_price', 'ab 299€'
            ),
            jsonb_build_object(
              'value', 'leather',
              'label', 'Lederaufbereitung',
              'icon', 'car',
              'default_description', 'Pflege und Schutz für Ledersitze',
              'default_price', 'ab 149€'
            ),
            jsonb_build_object(
              'value', 'engine',
              'label', 'Motorwäsche',
              'icon', 'wrench',
              'default_description', 'Schonende Reinigung des Motorraums',
              'default_price', 'ab 89€'
            ),
            jsonb_build_object(
              'value', 'tinting',
              'label', 'Scheibentönung',
              'icon', 'sun',
              'default_description', 'Professionelle Folierung der Scheiben',
              'default_price', 'ab 249€'
            ),
            jsonb_build_object(
              'value', 'ppf',
              'label', 'Paint Protection Film',
              'icon', 'shield',
              'default_description', 'Steinschlagschutzfolie für Lack',
              'default_price', 'ab 899€'
            ),
            jsonb_build_object(
              'value', 'detailing',
              'label', 'Premium Detailing',
              'icon', 'sparkles',
              'default_description', 'Komplettaufbereitung innen & außen',
              'default_price', 'ab 499€'
            )
          )
        ),
        jsonb_build_object(
          'id', 'custom_services',
          'label', 'Eigene Services hinzufügen (optional)',
          'type', 'repeater',
          'required', false,
          'max', 3,
          'preview_target', 'custom_service_cards',
          'help_text', 'Fügen Sie bis zu 3 eigene Services hinzu',
          'subfields', jsonb_build_array(
            jsonb_build_object(
              'id', 'service_name',
              'label', 'Service-Name',
              'type', 'text',
              'required', true,
              'maxLength', 40
            ),
            jsonb_build_object(
              'id', 'service_description',
              'label', 'Beschreibung',
              'type', 'textarea',
              'required', true,
              'maxLength', 80,
              'rows', 2
            ),
            jsonb_build_object(
              'id', 'service_price',
              'label', 'Preis',
              'type', 'text',
              'required', true,
              'maxLength', 20,
              'placeholder', 'ab 199€'
            ),
            jsonb_build_object(
              'id', 'service_icon',
              'label', 'Icon wählen',
              'type', 'icon_picker',
              'required', true,
              'default', 'star'
            )
          )
        )
      )
    )
  )
)
WHERE demo_name = 'webflix-one-kfz';