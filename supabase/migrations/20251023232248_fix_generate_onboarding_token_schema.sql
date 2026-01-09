/*
  # Fix generate_onboarding_token Function Schema Reference

  ## Problem
  The function `generate_onboarding_token()` calls `gen_random_bytes()` but pgcrypto
  is installed in the `extensions` schema, not the default search path. This causes
  the function to fail with "function gen_random_bytes(integer) does not exist".

  ## Solution
  Update the function to explicitly reference `extensions.gen_random_bytes()` or
  set the search_path to include the extensions schema.

  ## Changes
  - Drop and recreate generate_onboarding_token() with proper schema reference
*/

-- Drop existing function
DROP FUNCTION IF EXISTS generate_onboarding_token();

-- Recreate with proper schema reference
CREATE OR REPLACE FUNCTION generate_onboarding_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  token text;
BEGIN
  -- Use extensions.gen_random_bytes explicitly for clarity
  token := encode(extensions.gen_random_bytes(32), 'hex');
  RETURN token;
END;
$$;
