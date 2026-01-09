/*
  # Webflix One Dynamic Framework Schema

  ## Overview
  Creates a flexible, data-driven one-pager system where sections are stored in the database
  and rendered dynamically based on industry configuration.

  ## Tables Created

  ### 1. `industries`
  Stores industry configurations with branding/theme information
  - `id` (uuid, PK) - Industry identifier
  - `slug` (text, unique) - URL-friendly identifier (e.g., 'galabau', 'autoaufbereitung')
  - `name` (text) - Display name
  - `theme` (jsonb) - Brand colors, fonts, and styling tokens
  - `seo` (jsonb) - Meta tags, title, description, og:image
  - `is_active` (boolean) - Whether industry is live
  - `created_at`, `updated_at` (timestamptz)

  ### 2. `pages`
  Stores page configurations for each industry
  - `id` (uuid, PK) - Page identifier
  - `industry_id` (uuid, FK -> industries) - Parent industry
  - `slug` (text) - Page slug (usually 'home')
  - `layout` (jsonb) - Array of sections with ordering
  - `created_at`, `updated_at` (timestamptz)

  ### 3. `sections`
  Stores individual section configurations
  - `id` (uuid, PK) - Section identifier
  - `page_id` (uuid, FK -> pages) - Parent page
  - `key` (text) - Section type (Hero, Features, BeforeAfter, etc.)
  - `props` (jsonb) - Component props data
  - `visible` (boolean) - Whether section is rendered
  - `order` (integer) - Display order
  - `created_at`, `updated_at` (timestamptz)

  ## Security
  - Public read access for active industries and their pages/sections
  - Admin-only write access (requires service role or admin claim)
  - RLS policies for data isolation

  ## Indexes
  - Fast lookups by slug
  - Efficient ordering queries
*/

-- Create industries table
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id uuid NOT NULL REFERENCES industries(id) ON DELETE CASCADE,
  slug text NOT NULL DEFAULT 'home',
  layout jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(industry_id, slug)
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  key text NOT NULL,
  props jsonb NOT NULL DEFAULT '{}'::jsonb,
  visible boolean DEFAULT true,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_industries_active ON industries(is_active);
CREATE INDEX IF NOT EXISTS idx_pages_industry ON pages(industry_id);
CREATE INDEX IF NOT EXISTS idx_sections_page ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(page_id, "order");

-- Enable RLS
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for industries
CREATE POLICY "Industries are publicly readable"
  ON industries
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage industries"
  ON industries
  FOR ALL
  TO authenticated
  USING (
    COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin'
  )
  WITH CHECK (
    COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin'
  );

-- RLS Policies for pages
CREATE POLICY "Pages are publicly readable for active industries"
  ON pages
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM industries
      WHERE industries.id = pages.industry_id
      AND industries.is_active = true
    )
  );

CREATE POLICY "Admins can manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (
    COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin'
  )
  WITH CHECK (
    COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin'
  );

-- RLS Policies for sections
CREATE POLICY "Sections are publicly readable for active industries"
  ON sections
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pages
      JOIN industries ON industries.id = pages.industry_id
      WHERE pages.id = sections.page_id
      AND industries.is_active = true
    )
  );

CREATE POLICY "Admins can manage sections"
  ON sections
  FOR ALL
  TO authenticated
  USING (
    COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin'
  )
  WITH CHECK (
    COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), '') = 'admin'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_industries_updated_at ON industries;
CREATE TRIGGER update_industries_updated_at
  BEFORE UPDATE ON industries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
CREATE TRIGGER update_sections_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
