/*
  # Webflix One Industries System

  1. New Table
    - webflix_one_industries with all industry-specific content

  2. Security
    - RLS with public read for active, admin write
*/

CREATE TABLE IF NOT EXISTS webflix_one_industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  display_name text NOT NULL,
  icon text DEFAULT 'Briefcase',
  hero_title text NOT NULL,
  hero_subtitle text NOT NULL,
  hero_cta_text text DEFAULT 'Jetzt Termin buchen',
  hero_image text,
  primary_color text DEFAULT '#3b82f6',
  services jsonb DEFAULT '[]'::jsonb,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  trust_stats jsonb DEFAULT '[]'::jsonb,
  vehicle_types jsonb DEFAULT '[]'::jsonb,
  map_location jsonb DEFAULT '{}'::jsonb,
  contact_info jsonb DEFAULT '{}'::jsonb,
  before_after_images jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  google_reviews jsonb DEFAULT '[]'::jsonb,
  header_logo_text text DEFAULT 'Ihr Unternehmen',
  meta_description text,
  google_rating numeric(2,1) DEFAULT 5.0,
  google_review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE webflix_one_industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active industries"
  ON webflix_one_industries FOR SELECT TO public
  USING (is_active = true);

CREATE POLICY "Only admins can insert industries"
  ON webflix_one_industries FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Only admins can update industries"
  ON webflix_one_industries FOR UPDATE TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Only admins can delete industries"
  ON webflix_one_industries FOR DELETE TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

DROP TRIGGER IF EXISTS update_webflix_one_industries_updated_at ON webflix_one_industries;
CREATE TRIGGER update_webflix_one_industries_updated_at
  BEFORE UPDATE ON webflix_one_industries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
