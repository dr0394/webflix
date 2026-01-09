/*
  # Create Demo Code Library System

  1. New Tables
    - `demo_code_library`
      - `id` (uuid, primary key)
      - `demo_name` (text) - Name of the demo template (e.g., 'autoaufbereitung')
      - `file_name` (text) - Name of the file (e.g., 'LandingV3.tsx', 'Header.tsx')
      - `file_path` (text) - Relative path (e.g., 'src/demos/autoaufbereitung/LandingV3.tsx')
      - `file_type` (text) - Type: 'main' or 'component'
      - `file_content` (text) - Complete file content
      - `file_size` (integer) - Size in bytes
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Indexes
    - Fast lookup by demo_name
    - Unique constraint on demo_name + file_path

  3. Security
    - Enable RLS
    - Public read access (for Edge Functions)
    - Admin-only write access
*/

-- Create demo_code_library table
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

-- Create indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_demo_code_library_demo_name
  ON demo_code_library(demo_name);

CREATE INDEX IF NOT EXISTS idx_demo_code_library_file_type
  ON demo_code_library(demo_name, file_type);

-- Enable RLS
ALTER TABLE demo_code_library ENABLE ROW LEVEL SECURITY;

-- Public read access (needed for Edge Functions)
CREATE POLICY "Demo code is publicly readable"
  ON demo_code_library
  FOR SELECT
  TO public
  USING (true);

-- Admin-only write access
CREATE POLICY "Admins can insert demo code"
  ON demo_code_library
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt()->>'role')::text = 'admin'
  );

CREATE POLICY "Admins can update demo code"
  ON demo_code_library
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->>'role')::text = 'admin'
  )
  WITH CHECK (
    (auth.jwt()->>'role')::text = 'admin'
  );

CREATE POLICY "Admins can delete demo code"
  ON demo_code_library
  FOR DELETE
  TO authenticated
  USING (
    (auth.jwt()->>'role')::text = 'admin'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_demo_code_library_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_demo_code_library_updated_at
  BEFORE UPDATE ON demo_code_library
  FOR EACH ROW
  EXECUTE FUNCTION update_demo_code_library_updated_at();
