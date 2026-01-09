/*
  # Website Configurations Schema
  
  Creates tables for storing customer website configurations and content.
  
  1. New Tables
    - `website_configurations`
      - `id` (uuid, primary key) - Unique configuration ID
      - `customer_email` (text) - Customer email address
      - `customer_name` (text) - Customer name
      - `demo_type` (text) - Type of demo (autoaufbereitung, gartenlandschaftsbau, etc.)
      - `google_drive_link` (text, nullable) - Link to customer's Google Drive folder
      - `status` (text) - Status (draft, submitted, in_progress, completed)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `section_contents`
      - `id` (uuid, primary key) - Unique section ID
      - `config_id` (uuid, foreign key) - Reference to website_configurations
      - `section_type` (text) - Type of section (hero, features, trust, etc.)
      - `section_data` (jsonb) - Section content data
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own configurations
    - Add policy for service role to access all data
  
  3. Indexes
    - Index on customer_email for faster lookups
    - Index on config_id for section_contents joins
    - Index on status for filtering
*/

-- Create website_configurations table
CREATE TABLE IF NOT EXISTS website_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  demo_type text NOT NULL,
  google_drive_link text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create section_contents table
CREATE TABLE IF NOT EXISTS section_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id uuid NOT NULL REFERENCES website_configurations(id) ON DELETE CASCADE,
  section_type text NOT NULL,
  section_data jsonb NOT NULL DEFAULT '{}',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_contents ENABLE ROW LEVEL SECURITY;

-- Policies for website_configurations
CREATE POLICY "Users can view own configurations"
  ON website_configurations FOR SELECT
  TO authenticated
  USING (customer_email = auth.jwt()->>'email');

CREATE POLICY "Users can insert own configurations"
  ON website_configurations FOR INSERT
  TO authenticated
  WITH CHECK (customer_email = auth.jwt()->>'email');

CREATE POLICY "Users can update own configurations"
  ON website_configurations FOR UPDATE
  TO authenticated
  USING (customer_email = auth.jwt()->>'email')
  WITH CHECK (customer_email = auth.jwt()->>'email');

CREATE POLICY "Service role can access all configurations"
  ON website_configurations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for section_contents
CREATE POLICY "Users can view own section contents"
  ON section_contents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM website_configurations
      WHERE website_configurations.id = section_contents.config_id
      AND website_configurations.customer_email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Users can insert own section contents"
  ON section_contents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM website_configurations
      WHERE website_configurations.id = section_contents.config_id
      AND website_configurations.customer_email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Users can update own section contents"
  ON section_contents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM website_configurations
      WHERE website_configurations.id = section_contents.config_id
      AND website_configurations.customer_email = auth.jwt()->>'email'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM website_configurations
      WHERE website_configurations.id = section_contents.config_id
      AND website_configurations.customer_email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Service role can access all section contents"
  ON section_contents FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_website_configurations_email 
  ON website_configurations(customer_email);

CREATE INDEX IF NOT EXISTS idx_website_configurations_status 
  ON website_configurations(status);

CREATE INDEX IF NOT EXISTS idx_section_contents_config_id 
  ON section_contents(config_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_website_configurations_updated_at ON website_configurations;
CREATE TRIGGER update_website_configurations_updated_at
  BEFORE UPDATE ON website_configurations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_section_contents_updated_at ON section_contents;
CREATE TRIGGER update_section_contents_updated_at
  BEFORE UPDATE ON section_contents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();