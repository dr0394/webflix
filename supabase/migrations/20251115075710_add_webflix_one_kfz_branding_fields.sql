/*
  # Webflix One KFZ Branding Fields
  
  1. Änderungen
    - Fügt fehlende Felder für Webflix One KFZ Template hinzu
    - Stellt sicher, dass alle Checklist-Felder in customer_brandings verfügbar sind
    
  2. Neue Felder
    - tagline: Für den Hero-Slogan
    - vehicle_types: Array der angebotenen Fahrzeugtypen
    - service_types: Array der angebotenen Services
    
  3. Hinweis
    - Alle anderen Felder (hero_image_url, gallery_images, before_after_images, etc.) 
      existieren bereits in der Tabelle
*/

-- Prüfe ob tagline schon existiert (aus früherer Migration)
DO $$
BEGIN
  -- vehicle_types als JSONB hinzufügen falls nicht vorhanden
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer_brandings' AND column_name = 'vehicle_types'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN vehicle_types jsonb DEFAULT '[]';
  END IF;

  -- service_types als JSONB hinzufügen falls nicht vorhanden
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer_brandings' AND column_name = 'service_types'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN service_types jsonb DEFAULT '[]';
  END IF;

  -- google_place_id für Google Reviews
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer_brandings' AND column_name = 'google_place_id'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN google_place_id text;
  END IF;

  -- google_reviews_enabled Toggle
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer_brandings' AND column_name = 'google_reviews_enabled'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN google_reviews_enabled boolean DEFAULT true;
  END IF;

  -- google_maps_enabled Toggle
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer_brandings' AND column_name = 'google_maps_enabled'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN google_maps_enabled boolean DEFAULT true;
  END IF;

  -- maps_address für Google Maps Query
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer_brandings' AND column_name = 'maps_address'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN maps_address text;
  END IF;

  -- demo_name für Template-Zuordnung (wichtig!)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customer_brandings' AND column_name = 'demo_name'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN demo_name text;
  END IF;
END $$;

-- Indexe für Performance
CREATE INDEX IF NOT EXISTS idx_customer_brandings_demo_name 
  ON customer_brandings(demo_name);

CREATE INDEX IF NOT EXISTS idx_customer_brandings_order_id 
  ON customer_brandings(order_id);

-- Kommentar
COMMENT ON COLUMN customer_brandings.demo_name IS 'Template identifier (e.g., autoaufbereitung, webflix-one-kfz) - copied from order';
COMMENT ON COLUMN customer_brandings.vehicle_types IS 'Array of selected vehicle types for automotive businesses';
COMMENT ON COLUMN customer_brandings.service_types IS 'Array of selected service types';
COMMENT ON COLUMN customer_brandings.google_place_id IS 'Google Place ID for live review integration';