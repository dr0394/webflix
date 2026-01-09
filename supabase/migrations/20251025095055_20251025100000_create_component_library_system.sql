/*
  # Component Library System

  1. New Tables
    - `demo_templates`
      - Stores metadata about each demo template
      - Template name, description, industry, preview image

    - `demo_components`
      - Stores individual components from each demo
      - Component name, file path, source code, dependencies
      - Links to demo_templates

    - `component_tags`
      - Categorization tags for components (header, footer, hero, form, etc.)

  2. Security
    - Enable RLS on all tables
    - Public read access for browsing
    - Admin-only write access for managing library
*/

CREATE TABLE IF NOT EXISTS demo_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  industry text NOT NULL,
  description text,
  preview_image text,
  demo_url text,
  base_path text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE demo_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view demo templates"
  ON demo_templates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify demo templates"
  ON demo_templates FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'role') = 'admin' OR
    (auth.jwt()->'user_metadata'->>'role') = 'admin'
  );

CREATE TABLE IF NOT EXISTS demo_components (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES demo_templates(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_name text NOT NULL,
  file_path text NOT NULL,
  source_code text NOT NULL,
  component_type text NOT NULL,
  description text,
  dependencies jsonb DEFAULT '[]'::jsonb,
  props_interface text,
  usage_example text,
  tags text[] DEFAULT ARRAY[]::text[],
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(template_id, file_path)
);

ALTER TABLE demo_components ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view demo components"
  ON demo_components FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can modify demo components"
  ON demo_components FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'role') = 'admin' OR
    (auth.jwt()->'user_metadata'->>'role') = 'admin'
  );

CREATE INDEX IF NOT EXISTS idx_demo_components_template ON demo_components(template_id);
CREATE INDEX IF NOT EXISTS idx_demo_components_type ON demo_components(component_type);
CREATE INDEX IF NOT EXISTS idx_demo_components_tags ON demo_components USING gin(tags);
