/*
  # Fix pgcrypto Extension

  ## Problem
  The function `generate_onboarding_token()` uses `gen_random_bytes()` which requires
  the pgcrypto extension. This extension was not enabled, causing the checkout to fail.

  ## Solution
  Enable the pgcrypto extension to provide cryptographic functions.

  ## Changes
  - Enable pgcrypto extension
  - Verify generate_onboarding_token() function works correctly
*/

-- Enable pgcrypto extension for gen_random_bytes()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Verify the generate_onboarding_token function exists and works
-- If it doesn't exist, recreate it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'generate_onboarding_token'
  ) THEN
    CREATE FUNCTION generate_onboarding_token()
    RETURNS text
    LANGUAGE plpgsql
    AS $func$
    DECLARE
      token text;
    BEGIN
      token := encode(gen_random_bytes(32), 'hex');
      RETURN token;
    END;
    $func$;
  END IF;
END $$;
