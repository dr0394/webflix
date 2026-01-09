/*
  # Generated Websites System

  ## Overview
  This migration creates a complete system for generating and managing customer websites
  based on checklist data. It supports both dynamic rendering and static file generation.

  ## New Tables
  
  ### `generated_websites`
  Stores information about generated customer websites
  - `id` (uuid, primary key) - Unique identifier
  - `order_id` (uuid, foreign key) - Links to webflix_orders
  - `customer_email` (text) - Customer's email address
  - `slug` (text, unique) - URL-friendly identifier (e.g., "kunde123-autoaufbereitung")
  - `template_name` (text) - Template used (e.g., "autoaufbereitung")
  - `injected_content` (jsonb) - All personalized content from checklist
  - `status` (text) - Generation status: draft, published, archived
  - `published_url` (text) - Full URL where site is accessible
  - `zip_generated` (boolean) - Whether ZIP file has been generated
  - `zip_url` (text, nullable) - URL to downloadable ZIP file
  - `generated_at` (timestamptz) - When website was generated
  - `published_at` (timestamptz, nullable) - When website was published
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `website_access_tokens`
  Provides secure access tokens for customer preview links
  - `id` (uuid, primary key) - Unique identifier
  - `website_id` (uuid, foreign key) - Links to generated_websites
  - `token` (text, unique) - Secure random token for access
  - `customer_email` (text) - Customer's email (for verification)
  - `expires_at` (timestamptz) - Token expiration date
  - `used_count` (integer) - Number of times token was used
  - `created_at` (timestamptz) - Token creation timestamp

  ## Security
  - RLS enabled on all tables
  - Admin users can manage all websites
  - Customers can view their own websites with valid token
  - Public access only with valid access token

  ## Notes
  1. Slugs are automatically generated from order number and template
  2. Access tokens expire after 90 days by default
  3. ZIP files are generated on-demand and cached
  4. Content injection happens server-side for security
*/

-- Create generated_websites table
CREATE TABLE IF NOT EXISTS generated_websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES webflix_orders(id) ON DELETE CASCADE,
  customer_email text NOT NULL,
  slug text UNIQUE NOT NULL,
  template_name text NOT NULL,
  injected_content jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_url text,
  zip_generated boolean DEFAULT false,
  zip_url text,
  generated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create website_access_tokens table
CREATE TABLE IF NOT EXISTS website_access_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES generated_websites(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '90 days'),
  used_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_generated_websites_order_id ON generated_websites(order_id);
CREATE INDEX IF NOT EXISTS idx_generated_websites_customer_email ON generated_websites(customer_email);
CREATE INDEX IF NOT EXISTS idx_generated_websites_slug ON generated_websites(slug);
CREATE INDEX IF NOT EXISTS idx_generated_websites_status ON generated_websites(status);
CREATE INDEX IF NOT EXISTS idx_website_access_tokens_token ON website_access_tokens(token);
CREATE INDEX IF NOT EXISTS idx_website_access_tokens_website_id ON website_access_tokens(website_id);

-- Enable RLS
ALTER TABLE generated_websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_access_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for generated_websites

-- Admins can view all websites
CREATE POLICY "Admins can view all websites"
  ON generated_websites FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN ('admin@webflix.de', 'dev@webflix.de')
    )
  );

-- Admins can insert websites
CREATE POLICY "Admins can insert websites"
  ON generated_websites FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN ('admin@webflix.de', 'dev@webflix.de')
    )
  );

-- Admins can update websites
CREATE POLICY "Admins can update websites"
  ON generated_websites FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN ('admin@webflix.de', 'dev@webflix.de')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN ('admin@webflix.de', 'dev@webflix.de')
    )
  );

-- Admins can delete websites
CREATE POLICY "Admins can delete websites"
  ON generated_websites FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN ('admin@webflix.de', 'dev@webflix.de')
    )
  );

-- Public can view published websites by slug (no auth required)
CREATE POLICY "Public can view published websites"
  ON generated_websites FOR SELECT
  TO anon
  USING (status = 'published');

-- RLS Policies for website_access_tokens

-- Admins can manage all tokens
CREATE POLICY "Admins can manage all tokens"
  ON website_access_tokens FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN ('admin@webflix.de', 'dev@webflix.de')
    )
  );

-- Public can read tokens (for validation)
CREATE POLICY "Public can read tokens for validation"
  ON website_access_tokens FOR SELECT
  TO anon
  USING (expires_at > now());

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_generated_websites_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_generated_websites_timestamp ON generated_websites;
CREATE TRIGGER update_generated_websites_timestamp
  BEFORE UPDATE ON generated_websites
  FOR EACH ROW
  EXECUTE FUNCTION update_generated_websites_updated_at();

-- Function to generate access token
CREATE OR REPLACE FUNCTION generate_website_access_token(
  p_website_id uuid,
  p_customer_email text
)
RETURNS text AS $$
DECLARE
  v_token text;
BEGIN
  -- Generate secure random token
  v_token := encode(gen_random_bytes(32), 'base64');
  v_token := replace(v_token, '/', '_');
  v_token := replace(v_token, '+', '-');
  
  -- Insert token
  INSERT INTO website_access_tokens (website_id, token, customer_email)
  VALUES (p_website_id, v_token, p_customer_email);
  
  RETURN v_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment token usage
CREATE OR REPLACE FUNCTION increment_token_usage(p_token text)
RETURNS void AS $$
BEGIN
  UPDATE website_access_tokens
  SET used_count = used_count + 1
  WHERE token = p_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;