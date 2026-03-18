/*
  # Fix mutable search_path on helper functions

  update_industry_requests_updated_at and update_demo_code_library_updated_at
  lack a fixed search_path, making them vulnerable to search_path injection.
*/

CREATE OR REPLACE FUNCTION update_industry_requests_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION update_demo_code_library_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
