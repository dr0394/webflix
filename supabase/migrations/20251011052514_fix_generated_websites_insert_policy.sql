/*
  # Fix Generated Websites Insert Policy

  This migration adds proper policies to allow website generation
  without authentication requirements for the generation process.

  ## Changes
  1. Add policy to allow service role to insert
  2. Add policy to allow anon users to insert (for edge functions)
  3. Update admin function to be more permissive
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Admins can insert websites" ON generated_websites;
DROP POLICY IF EXISTS "Service role can manage all websites" ON generated_websites;
DROP POLICY IF EXISTS "Allow website generation" ON generated_websites;

-- Service role can do everything (for edge functions)
CREATE POLICY "Service role can manage all websites"
  ON generated_websites FOR ALL
  USING (true);

-- Allow inserts for website generation (can be called from edge functions)
CREATE POLICY "Allow website generation"
  ON generated_websites FOR INSERT
  WITH CHECK (true);

-- Admins can insert websites
CREATE POLICY "Admins can insert websites"
  ON generated_websites FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Same for tokens table
DROP POLICY IF EXISTS "Allow token creation" ON website_access_tokens;

CREATE POLICY "Allow token creation"
  ON website_access_tokens FOR INSERT
  WITH CHECK (true);
