/*
  # Add Reference Images to Customer Brandings
  
  1. Purpose
    - Ermöglicht Kunden, Beispielbilder/Screenshots hochzuladen
    - Diese Bilder zeigen, wie bestimmte Sections aussehen sollen
    - Admin kann diese als visuelle Referenz beim Website-Erstellen nutzen
  
  2. Changes
    - ADD COLUMN `reference_images` JSONB zu customer_brandings
    - Struktur: { "section_name": ["url1", "url2"], ... }
    - Beispiel: { "hero": ["https://i.imgur.com/abc.jpg"], "services": ["https://i.imgur.com/def.jpg", "https://i.imgur.com/ghi.jpg"] }
  
  3. Security
    - Keine RLS-Änderungen nötig (bestehende Policies gelten)
*/

-- Add reference_images column to customer_brandings
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS reference_images JSONB DEFAULT '{}'::jsonb;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_customer_brandings_reference_images 
ON customer_brandings USING gin (reference_images);

-- Add comment for documentation
COMMENT ON COLUMN customer_brandings.reference_images IS 
'Reference images uploaded by customer to show how sections should look. Structure: {"section_name": ["url1", "url2"]}';
