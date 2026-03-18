/*
  # Create Component Library System tables

  1. Tables
    - demo_components (linked to existing demo_templates)
  
  2. Security
    - RLS with public read, admin write
*/

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
  ON demo_components FOR SELECT TO public USING (true);

CREATE POLICY "Only admins can modify demo components"
  ON demo_components FOR ALL TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE INDEX IF NOT EXISTS idx_demo_components_template ON demo_components(template_id);
CREATE INDEX IF NOT EXISTS idx_demo_components_type ON demo_components(component_type);
CREATE INDEX IF NOT EXISTS idx_demo_components_tags ON demo_components USING gin(tags);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'demo_templates' AND column_name = 'display_name') THEN
    ALTER TABLE demo_templates ADD COLUMN display_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'demo_templates' AND column_name = 'description') THEN
    ALTER TABLE demo_templates ADD COLUMN description text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'demo_templates' AND column_name = 'preview_image') THEN
    ALTER TABLE demo_templates ADD COLUMN preview_image text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'demo_templates' AND column_name = 'demo_url') THEN
    ALTER TABLE demo_templates ADD COLUMN demo_url text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'demo_templates' AND column_name = 'base_path') THEN
    ALTER TABLE demo_templates ADD COLUMN base_path text;
  END IF;
END $$;
