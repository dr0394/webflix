/*
  # Webflix One - Dynamic Template System

  1. New Tables
    - `webflix_one_industries`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier (e.g., 'elektriker', 'maler')
      - `display_name` (text) - Display name (e.g., 'Elektriker', 'Maler')
      - `icon` (text) - Lucide icon name
      - `hero_title` (text)
      - `hero_subtitle` (text)
      - `hero_cta_text` (text)
      - `hero_image` (text) - Image URL
      - `primary_color` (text) - Brand color
      - `services` (jsonb) - Array of services
      - `gallery_images` (jsonb) - Array of gallery images
      - `trust_stats` (jsonb) - Trust section stats
      - `vehicle_types` (jsonb) - Service/product categories
      - `map_location` (jsonb) - Location data
      - `contact_info` (jsonb) - Phone, email, etc.
      - `before_after_images` (jsonb) - Before/after comparisons
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `webflix_one_industries` table
    - Public read access for active industries
    - Admin-only write access

  3. Notes
    - This table stores all industry-specific content
    - One template, many industry configurations
    - Based on Autoaufbereitung demo structure
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE webflix_one_industries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active industries"
  ON webflix_one_industries
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Only admins can insert industries"
  ON webflix_one_industries
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Only admins can update industries"
  ON webflix_one_industries
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin')
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Only admins can delete industries"
  ON webflix_one_industries
  FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_webflix_one_industries_updated_at
  BEFORE UPDATE ON webflix_one_industries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();