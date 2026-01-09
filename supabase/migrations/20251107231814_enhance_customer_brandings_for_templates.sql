/*
  # Enhance Customer Brandings for Template Requirements

  1. Purpose
    - Macht customer_brandings kompatibel mit allen Demo-Templates
    - Fügt alle Felder hinzu, die Templates zum Ersetzen von Platzhaltern brauchen
    - Strukturiert Daten optimal für Code-Injection

  2. New Columns
    - address_street, address_city, address_zip (getrennt statt 1 Feld)
    - hero_image_url (Hero Background)
    - services (JSONB Array mit Diensten)
    - before_after_images (JSONB Array mit Before/After Paaren)
    - gallery_images (JSONB Array mit Gallery URLs)
    - opening_hours (JSONB Object mit Öffnungszeiten)
    - social_media (JSONB Object mit Instagram, Facebook, WhatsApp)
    - google_maps_url (Google Maps Embed URL)
    - coordinates (JSONB mit lat/lng)

  3. Migration Strategy
    - Behält contact_address für Rückwärtskompatibilität
    - Neue Felder haben sinnvolle Defaults
    - Bestehende Daten bleiben unverändert
*/

-- Adresse aufteilen (zusätzlich zu contact_address)
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS address_street text,
ADD COLUMN IF NOT EXISTS address_city text,
ADD COLUMN IF NOT EXISTS address_zip text;

-- Hero Section
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS hero_image_url text;

-- Services als strukturiertes Array
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS services jsonb DEFAULT '[]'::jsonb;

-- Before/After Images
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS before_after_images jsonb DEFAULT '[]'::jsonb;

-- Gallery Images
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS gallery_images jsonb DEFAULT '[]'::jsonb;

-- Öffnungszeiten
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS opening_hours jsonb DEFAULT '{
  "monday": {"open": "08:00", "close": "18:00", "closed": false},
  "tuesday": {"open": "08:00", "close": "18:00", "closed": false},
  "wednesday": {"open": "08:00", "close": "18:00", "closed": false},
  "thursday": {"open": "08:00", "close": "18:00", "closed": false},
  "friday": {"open": "08:00", "close": "18:00", "closed": false},
  "saturday": {"open": "09:00", "close": "14:00", "closed": false},
  "sunday": {"open": "00:00", "close": "00:00", "closed": true}
}'::jsonb;

-- Social Media
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS social_media jsonb DEFAULT '{
  "instagram": "",
  "facebook": "",
  "whatsapp": "",
  "linkedin": "",
  "twitter": ""
}'::jsonb;

-- Google Maps
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS google_maps_url text,
ADD COLUMN IF NOT EXISTS coordinates jsonb DEFAULT '{"lat": 0, "lng": 0}'::jsonb;

-- Weitere wichtige Felder
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS tagline text,
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS usp_items jsonb DEFAULT '[]'::jsonb;

-- Indexes für schnelle Queries
CREATE INDEX IF NOT EXISTS idx_customer_brandings_services 
ON customer_brandings USING gin (services);

CREATE INDEX IF NOT EXISTS idx_customer_brandings_social_media 
ON customer_brandings USING gin (social_media);

CREATE INDEX IF NOT EXISTS idx_customer_brandings_opening_hours 
ON customer_brandings USING gin (opening_hours);

-- Kommentare für Dokumentation
COMMENT ON COLUMN customer_brandings.address_street IS 'Street address (e.g., "Musterstraße 123")';
COMMENT ON COLUMN customer_brandings.address_city IS 'City name (e.g., "Berlin")';
COMMENT ON COLUMN customer_brandings.address_zip IS 'Postal code (e.g., "10115")';
COMMENT ON COLUMN customer_brandings.hero_image_url IS 'Hero section background image URL';
COMMENT ON COLUMN customer_brandings.services IS 'Array of services: [{"name": "Service 1", "price": "99€", "description": "..."}]';
COMMENT ON COLUMN customer_brandings.before_after_images IS 'Array of before/after pairs: [{"before": "url1", "after": "url2", "title": "..."}]';
COMMENT ON COLUMN customer_brandings.gallery_images IS 'Array of gallery image URLs: ["url1", "url2", ...]';
COMMENT ON COLUMN customer_brandings.opening_hours IS 'Opening hours per day: {"monday": {"open": "08:00", "close": "18:00", "closed": false}}';
COMMENT ON COLUMN customer_brandings.social_media IS 'Social media profiles: {"instagram": "url", "facebook": "url", "whatsapp": "number"}';
COMMENT ON COLUMN customer_brandings.google_maps_url IS 'Google Maps embed URL for location section';
COMMENT ON COLUMN customer_brandings.coordinates IS 'GPS coordinates: {"lat": 52.520008, "lng": 13.404954}';
COMMENT ON COLUMN customer_brandings.tagline IS 'Short catchy tagline/slogan';
COMMENT ON COLUMN customer_brandings.short_description IS 'Brief description (2-3 sentences)';
COMMENT ON COLUMN customer_brandings.usp_items IS 'Unique selling points: [{"icon": "shield", "title": "...", "text": "..."}]';
