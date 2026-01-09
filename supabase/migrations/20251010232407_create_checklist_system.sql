/*
  # Checklisten-System für Bestellungen

  ## Neue Tabellen

  ### `checklist_templates`
  - `id` (uuid, primary key)
  - `demo_name` (text) - Name der Demo (z.B. 'autoaufbereitung', 'physiotherapie')
  - `template_data` (jsonb) - Template-Definition mit Feldern und Validierung
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `order_checklists`
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key zu webflix_orders)
  - `customer_id` (uuid, foreign key zu customers)
  - `demo_name` (text)
  - `checklist_data` (jsonb) - Ausgefüllte Checkliste vom Kunden
  - `status` (text) - pending, in_review, approved, completed
  - `admin_notes` (text) - Notizen vom Admin
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `order_files`
  - `id` (uuid, primary key)
  - `order_checklist_id` (uuid, foreign key)
  - `file_name` (text)
  - `file_url` (text)
  - `file_type` (text) - logo, before_after, team, other
  - `file_size` (integer)
  - `uploaded_at` (timestamptz)

  ## Erweiterte Tabellen

  ### `webflix_orders`
  - `checklist_completed` (boolean) - Ob Checkliste ausgefüllt wurde
  - `checklist_completed_at` (timestamptz)

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Admins können alle Checklisten sehen
  - Kunden können nur ihre eigenen Checklisten sehen und bearbeiten
*/

-- Erstelle checklist_templates Tabelle
CREATE TABLE IF NOT EXISTS checklist_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  demo_name text UNIQUE NOT NULL,
  template_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_checklist_templates_demo_name ON checklist_templates(demo_name);

-- Erstelle order_checklists Tabelle
CREATE TABLE IF NOT EXISTS order_checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES webflix_orders(id) ON DELETE CASCADE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  demo_name text NOT NULL,
  checklist_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_checklists_order_id ON order_checklists(order_id);
CREATE INDEX IF NOT EXISTS idx_order_checklists_customer_id ON order_checklists(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_checklists_status ON order_checklists(status);
CREATE INDEX IF NOT EXISTS idx_order_checklists_demo_name ON order_checklists(demo_name);

-- Erstelle order_files Tabelle
CREATE TABLE IF NOT EXISTS order_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_checklist_id uuid REFERENCES order_checklists(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size integer,
  uploaded_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_files_checklist_id ON order_files(order_checklist_id);
CREATE INDEX IF NOT EXISTS idx_order_files_file_type ON order_files(file_type);

-- Erweitere webflix_orders Tabelle
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webflix_orders' AND column_name = 'checklist_completed'
  ) THEN
    ALTER TABLE webflix_orders ADD COLUMN checklist_completed boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webflix_orders' AND column_name = 'checklist_completed_at'
  ) THEN
    ALTER TABLE webflix_orders ADD COLUMN checklist_completed_at timestamptz;
  END IF;
END $$;

-- RLS aktivieren
ALTER TABLE checklist_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies für checklist_templates
CREATE POLICY "Anyone can view checklist templates"
  ON checklist_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only service role can modify templates"
  ON checklist_templates FOR ALL
  USING (false);

-- RLS Policies für order_checklists
CREATE POLICY "Customers can view own checklists"
  ON order_checklists FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create own checklists"
  ON order_checklists FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Customers can update own checklists"
  ON order_checklists FOR UPDATE
  TO authenticated
  USING (customer_id = auth.uid())
  WITH CHECK (customer_id = auth.uid());

-- RLS Policies für order_files
CREATE POLICY "Customers can view own files"
  ON order_files FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM order_checklists
      WHERE order_checklists.id = order_files.order_checklist_id
      AND order_checklists.customer_id = auth.uid()
    )
  );

CREATE POLICY "Customers can upload own files"
  ON order_files FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM order_checklists
      WHERE order_checklists.id = order_files.order_checklist_id
      AND order_checklists.customer_id = auth.uid()
    )
  );

-- Funktion zum Aktualisieren des updated_at Timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger für updated_at
DROP TRIGGER IF EXISTS update_checklist_templates_updated_at ON checklist_templates;
CREATE TRIGGER update_checklist_templates_updated_at
  BEFORE UPDATE ON checklist_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_order_checklists_updated_at ON order_checklists;
CREATE TRIGGER update_order_checklists_updated_at
  BEFORE UPDATE ON order_checklists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert Autoaufbereitung Template
INSERT INTO checklist_templates (demo_name, template_data) VALUES (
  'autoaufbereitung',
  '{
    "sections": [
      {
        "id": "basic_info",
        "title": "Basis-Informationen",
        "fields": [
          {"id": "company_name", "label": "Firmenname", "type": "text", "required": true, "maxLength": 100},
          {"id": "location", "label": "Hauptstandort (Stadt)", "type": "text", "required": true, "maxLength": 100},
          {"id": "zip_code", "label": "PLZ", "type": "text", "required": true, "maxLength": 10},
          {"id": "phone", "label": "Telefonnummer", "type": "tel", "required": true},
          {"id": "email", "label": "E-Mail", "type": "email", "required": true},
          {"id": "website_url", "label": "Bestehende Website (falls vorhanden)", "type": "url", "required": false},
          {
            "id": "color_scheme",
            "label": "Bevorzugte Farbpalette",
            "type": "select",
            "required": true,
            "options": [
              {"value": "modern_red", "label": "Modern (Rot/Schwarz)"},
              {"value": "premium_gold", "label": "Premium (Gold/Schwarz)"},
              {"value": "sporty_blue", "label": "Sportlich (Blau/Schwarz)"},
              {"value": "elegant_silver", "label": "Elegant (Silber/Grau)"},
              {"value": "fresh_green", "label": "Frisch (Grün/Weiß)"}
            ]
          }
        ]
      },
      {
        "id": "services",
        "title": "Service-Auswahl",
        "description": "Wählen Sie mindestens 3 Hauptservices aus",
        "fields": [
          {
            "id": "main_services",
            "label": "Hauptservices (min. 3, max. 6)",
            "type": "checkbox",
            "required": true,
            "min": 3,
            "max": 6,
            "options": [
              {"value": "innenraumreinigung", "label": "Innenraumreinigung"},
              {"value": "aussenwasche", "label": "Außenwäsche"},
              {"value": "polieren_versiegeln", "label": "Polieren & Versiegeln"},
              {"value": "motorwasche", "label": "Motorwäsche"},
              {"value": "lederpflege", "label": "Lederpflege"},
              {"value": "komplettreinigung", "label": "Komplettreinigung"},
              {"value": "keramikversiegelung", "label": "Keramikversiegelung"},
              {"value": "ozonbehandlung", "label": "Ozonbehandlung"}
            ]
          },
          {
            "id": "vehicle_types",
            "label": "Fahrzeugtypen (min. 3)",
            "type": "checkbox",
            "required": true,
            "min": 3,
            "options": [
              {"value": "pkw_kleinwagen", "label": "PKW/Kleinwagen"},
              {"value": "suv_van", "label": "SUV/Van"},
              {"value": "transporter", "label": "Transporter"},
              {"value": "luxusfahrzeuge", "label": "Luxusfahrzeuge"},
              {"value": "oldtimer", "label": "Oldtimer"},
              {"value": "motorrader", "label": "Motorräder"},
              {"value": "wohnmobile", "label": "Wohnmobile"}
            ]
          }
        ]
      },
      {
        "id": "content",
        "title": "Text-Inhalte",
        "fields": [
          {"id": "hero_title", "label": "Hero-Überschrift", "type": "text", "required": true, "maxLength": 60, "placeholder": "Fahrzeugaufbereitung auf höchstem Niveau"},
          {"id": "hero_subtitle", "label": "Hero-Unterzeile", "type": "text", "required": true, "maxLength": 120, "placeholder": "Professionelle Autoreinigung für strahlenden Glanz"},
          {"id": "trust_badge_1", "label": "Trust-Badge 1", "type": "text", "required": true, "maxLength": 25, "placeholder": "5/5 Sterne"},
          {"id": "trust_badge_2", "label": "Trust-Badge 2", "type": "text", "required": true, "maxLength": 25, "placeholder": "Flexible Termine"},
          {"id": "trust_badge_3", "label": "Trust-Badge 3", "type": "text", "required": true, "maxLength": 25, "placeholder": "Faire Preise"},
          {"id": "about_text", "label": "Über uns Text", "type": "textarea", "required": true, "maxLength": 300, "placeholder": "Kurze Firmenbeschreibung..."}
        ]
      },
      {
        "id": "contact",
        "title": "Kontakt & Standort",
        "fields": [
          {"id": "address_street", "label": "Straße & Hausnummer", "type": "text", "required": true},
          {"id": "address_city", "label": "Stadt", "type": "text", "required": true},
          {"id": "address_zip", "label": "PLZ", "type": "text", "required": true},
          {"id": "opening_hours", "label": "Öffnungszeiten", "type": "textarea", "required": true, "placeholder": "Mo-Fr: 8:00 - 18:00 Uhr\\nSa: 9:00 - 14:00 Uhr"},
          {"id": "whatsapp", "label": "WhatsApp Nummer (optional)", "type": "tel", "required": false},
          {"id": "instagram", "label": "Instagram Link (optional)", "type": "url", "required": false},
          {"id": "facebook", "label": "Facebook Link (optional)", "type": "url", "required": false}
        ]
      },
      {
        "id": "features",
        "title": "Features & Add-ons",
        "fields": [
          {
            "id": "enabled_features",
            "label": "Aktivierte Features",
            "type": "checkbox",
            "required": false,
            "options": [
              {"value": "before_after_slider", "label": "Before/After Slider anzeigen"},
              {"value": "price_calculator", "label": "Preisrechner einbinden"},
              {"value": "whatsapp_chat", "label": "WhatsApp Chat-Button"},
              {"value": "google_reviews", "label": "Google Bewertungen anzeigen"},
              {"value": "gallery", "label": "Galerie mit Arbeitsbeispielen"},
              {"value": "vehicle_selector", "label": "Fahrzeugtyp-Auswahl interaktiv"}
            ]
          }
        ]
      },
      {
        "id": "pricing",
        "title": "Preise (Optional)",
        "fields": [
          {
            "id": "show_prices",
            "label": "Preise auf Website anzeigen?",
            "type": "radio",
            "required": true,
            "options": [
              {"value": "yes", "label": "Ja, Preise anzeigen"},
              {"value": "no", "label": "Nein, Preis auf Anfrage"}
            ]
          },
          {"id": "price_innenraum", "label": "Preis Innenraumreinigung (ab)", "type": "number", "required": false, "condition": {"field": "show_prices", "value": "yes"}},
          {"id": "price_aussen", "label": "Preis Außenwäsche (ab)", "type": "number", "required": false, "condition": {"field": "show_prices", "value": "yes"}},
          {"id": "price_komplett", "label": "Preis Komplettreinigung (ab)", "type": "number", "required": false, "condition": {"field": "show_prices", "value": "yes"}}
        ]
      },
      {
        "id": "media",
        "title": "Bilder & Medien",
        "description": "Optional: Laden Sie eigene Bilder hoch. Bei fehlenden Bildern verwenden wir professionelle Stock-Fotos.",
        "fields": [
          {"id": "logo", "label": "Firmenlogo", "type": "file", "accept": "image/*", "required": false, "maxSize": 5242880},
          {"id": "team_photo", "label": "Team-Foto", "type": "file", "accept": "image/*", "required": false, "maxSize": 5242880},
          {"id": "before_after_images", "label": "Vorher/Nachher Bilder (max. 5)", "type": "file", "accept": "image/*", "required": false, "multiple": true, "max": 5, "maxSize": 5242880},
          {"id": "work_examples", "label": "Weitere Arbeitsbeispiele (max. 3)", "type": "file", "accept": "image/*", "required": false, "multiple": true, "max": 3, "maxSize": 5242880}
        ]
      }
    ]
  }'::jsonb
) ON CONFLICT (demo_name) DO UPDATE SET template_data = EXCLUDED.template_data;
