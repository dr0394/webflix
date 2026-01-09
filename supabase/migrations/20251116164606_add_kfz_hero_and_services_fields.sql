/*
  # Füge neue Felder für KFZ-Template hinzu
  
  1. Neue Felder
    - hero_badge: Badge-Text über der Hauptüberschrift
    - hero_background_image: Optional Hero-Hintergrundbild URL
    - services_section_title: Services Section Überschrift
    - services_section_subtitle: Services Section Untertitel
    - services_list: Array der ausgewählten Services
    
  2. Änderungen
    - Alle Felder sind optional (NULL erlaubt)
*/

-- Hero Section neue Felder
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS hero_badge TEXT,
ADD COLUMN IF NOT EXISTS hero_background_image TEXT;

-- Services Section neue Felder  
ALTER TABLE customer_brandings
ADD COLUMN IF NOT EXISTS services_section_title TEXT,
ADD COLUMN IF NOT EXISTS services_section_subtitle TEXT,
ADD COLUMN IF NOT EXISTS services_list JSONB DEFAULT '[]'::jsonb;

-- Kommentar für Dokumentation
COMMENT ON COLUMN customer_brandings.hero_badge IS 'Badge/Highlight-Text über der Hero-Hauptüberschrift';
COMMENT ON COLUMN customer_brandings.hero_background_image IS 'Optional: Eigenes Hero-Hintergrundbild URL';
COMMENT ON COLUMN customer_brandings.services_section_title IS 'Überschrift der Services-Section';
COMMENT ON COLUMN customer_brandings.services_section_subtitle IS 'Untertitel der Services-Section';
COMMENT ON COLUMN customer_brandings.services_list IS 'Array der ausgewählten Services (z.B. ["ceramic", "interior"])';
