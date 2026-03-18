/*
  # Webflix One Dynamic Framework

  1. New Tables
    - industries (dynamic page system)
    - pages
    - sections

  2. Design system enum and columns
  3. Security with RLS
*/

DO $$ BEGIN
  CREATE TYPE design_style AS ENUM ('minimal', 'modern', 'elegant', 'bold', 'playful', 'professional', 'luxury');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  theme jsonb NOT NULL DEFAULT '{
    "brand": "#3B82F6",
    "text": "#1F2937",
    "accent": "#10B981",
    "background": "#FFFFFF",
    "font": "Inter"
  }'::jsonb,
  seo jsonb NOT NULL DEFAULT '{
    "title": "Home",
    "description": "Welcome to our website",
    "image": ""
  }'::jsonb,
  is_active boolean DEFAULT true,
  design_style design_style DEFAULT 'modern',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id uuid NOT NULL REFERENCES industries(id) ON DELETE CASCADE,
  slug text NOT NULL DEFAULT 'home',
  layout jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(industry_id, slug)
);

CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  key text NOT NULL,
  props jsonb NOT NULL DEFAULT '{}'::jsonb,
  visible boolean DEFAULT true,
  "order" integer NOT NULL DEFAULT 0,
  style_overrides jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_industries_active ON industries(is_active);
CREATE INDEX IF NOT EXISTS idx_pages_industry ON pages(industry_id);
CREATE INDEX IF NOT EXISTS idx_sections_page ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(page_id, "order");

ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Industries are publicly readable"
  ON industries FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage industries"
  ON industries FOR ALL TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Pages are publicly readable for active industries"
  ON pages FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM industries WHERE industries.id = pages.industry_id AND industries.is_active = true));

CREATE POLICY "Admins can manage pages"
  ON pages FOR ALL TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Sections are publicly readable for active industries"
  ON sections FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM pages JOIN industries ON industries.id = pages.industry_id
    WHERE pages.id = sections.page_id AND industries.is_active = true
  ));

CREATE POLICY "Admins can manage sections"
  ON sections FOR ALL TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

DROP TRIGGER IF EXISTS update_industries_updated_at ON industries;
CREATE TRIGGER update_industries_updated_at
  BEFORE UPDATE ON industries FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
CREATE TRIGGER update_sections_updated_at
  BEFORE UPDATE ON sections FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
