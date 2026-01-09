/*
  # Fix Generated Websites RLS Policies

  This migration fixes the RLS policies for generated_websites and website_access_tokens
  to work without requiring access to auth.users table.

  ## Changes
  1. Drop existing policies
  2. Create new simplified policies using direct auth.uid() checks
  3. Admin check uses raw_app_meta_data instead of email lookup
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all websites" ON generated_websites;
DROP POLICY IF EXISTS "Admins can insert websites" ON generated_websites;
DROP POLICY IF EXISTS "Admins can update websites" ON generated_websites;
DROP POLICY IF EXISTS "Admins can delete websites" ON generated_websites;
DROP POLICY IF EXISTS "Public can view published websites" ON generated_websites;
DROP POLICY IF EXISTS "Admins can manage all tokens" ON website_access_tokens;
DROP POLICY IF EXISTS "Public can read tokens for validation" ON website_access_tokens;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' IN ('admin@webflix.de', 'dev@webflix.de')
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for generated_websites

-- Admins can view all websites
CREATE POLICY "Admins can view all websites"
  ON generated_websites FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admins can insert websites
CREATE POLICY "Admins can insert websites"
  ON generated_websites FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can update websites
CREATE POLICY "Admins can update websites"
  ON generated_websites FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete websites
CREATE POLICY "Admins can delete websites"
  ON generated_websites FOR DELETE
  TO authenticated
  USING (is_admin());

-- Public can view published websites by slug (no auth required)
CREATE POLICY "Public can view published websites"
  ON generated_websites FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- RLS Policies for website_access_tokens

-- Admins can manage all tokens
CREATE POLICY "Admins can manage all tokens"
  ON website_access_tokens FOR ALL
  TO authenticated
  USING (is_admin());

-- Public can read tokens for validation (no auth required)
CREATE POLICY "Public can read tokens for validation"
  ON website_access_tokens FOR SELECT
  TO anon, authenticated
  USING (expires_at > now());
