/*
  # Fix is_admin() function search_path

  The is_admin() function has search_path="" which prevents auth.jwt() from being
  accessible. We need to set the search_path to include the auth schema.
*/

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' IN ('admin@webflix.de', 'dev@webflix.de')
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
END;
$$;
