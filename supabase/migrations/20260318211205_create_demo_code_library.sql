/*
  # Demo Code Library

  1. New Table
    - demo_code_library for storing template source code

  2. Security
    - Public read, admin write
*/

CREATE TABLE IF NOT EXISTS demo_code_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  demo_name text NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL CHECK (file_type IN ('main', 'component')),
  file_content text NOT NULL,
  file_size integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(demo_name, file_path)
);

CREATE INDEX IF NOT EXISTS idx_demo_code_library_demo_name ON demo_code_library(demo_name);
CREATE INDEX IF NOT EXISTS idx_demo_code_library_file_type ON demo_code_library(demo_name, file_type);

ALTER TABLE demo_code_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Demo code is publicly readable"
  ON demo_code_library FOR SELECT TO public USING (true);

CREATE POLICY "Admins can insert demo code"
  ON demo_code_library FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update demo code"
  ON demo_code_library FOR UPDATE TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can delete demo code"
  ON demo_code_library FOR DELETE TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE OR REPLACE FUNCTION update_demo_code_library_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_demo_code_library_updated_at ON demo_code_library;
CREATE TRIGGER update_demo_code_library_updated_at
  BEFORE UPDATE ON demo_code_library FOR EACH ROW
  EXECUTE FUNCTION update_demo_code_library_updated_at();
