/*
  # Demo Builder System

  1. New Tables
    - `demo_templates`
      - `id` (uuid, primary key)
      - `industry` (text) - Industry type (autoaufbereitung, elektriker, etc.)
      - `variant` (text) - Design variant (professional, premium, sport, etc.)
      - `name` (text) - Template display name
      - `config` (jsonb) - Full template configuration
      - `generated_code` (text) - Generated React component code
      - `preview_url` (text, optional) - URL to live preview
      - `created_by` (uuid, optional) - User who created it
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `is_public` (boolean) - Whether template is publicly accessible

  2. Security
    - Enable RLS on `demo_templates` table
    - Add policy for authenticated users to create their own templates
    - Add policy for authenticated users to read their own templates
    - Add policy for everyone to read public templates
    - Add policy for authenticated users to update their own templates
    - Add policy for authenticated users to delete their own templates
*/

CREATE TABLE IF NOT EXISTS demo_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry text NOT NULL,
  variant text NOT NULL DEFAULT 'professional',
  name text NOT NULL,
  config jsonb NOT NULL DEFAULT '{}',
  generated_code text,
  preview_url text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_public boolean DEFAULT false
);

ALTER TABLE demo_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own demo templates"
  ON demo_templates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can read their own demo templates"
  ON demo_templates FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Everyone can read public demo templates"
  ON demo_templates FOR SELECT
  TO public
  USING (is_public = true);

CREATE POLICY "Users can update their own demo templates"
  ON demo_templates FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own demo templates"
  ON demo_templates FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE INDEX IF NOT EXISTS idx_demo_templates_industry ON demo_templates(industry);
CREATE INDEX IF NOT EXISTS idx_demo_templates_created_by ON demo_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_demo_templates_is_public ON demo_templates(is_public);
CREATE INDEX IF NOT EXISTS idx_demo_templates_created_at ON demo_templates(created_at DESC);
