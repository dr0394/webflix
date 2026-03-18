/*
  # Optimize RLS Policy Auth Function Calls

  Wraps auth.uid() calls in (SELECT ...) to prevent re-evaluation per row.
  This ensures the auth function is called once per query instead of once per row,
  significantly improving performance at scale.

  1. Policies updated:
    - demo_templates: "Authenticated can read own or public templates"
    - customer_brandings: "Admins or owners can view brandings"
    - customer_brandings: "Admins or owners can update brandings"
    - branding_images: "Users or admins can view branding images"
    - branding_images: "Users or admins can insert branding images"
    - content_edits: "Users or admins can view edits"
    - deployment_logs: "Admins or owners can view deployment logs"

  2. Pattern applied:
    - auth.uid() replaced with (select auth.uid())
    - Subqueries against auth.users now use (select auth.uid()) for the WHERE clause
*/

-- demo_templates
DROP POLICY IF EXISTS "Authenticated can read own or public templates" ON demo_templates;
CREATE POLICY "Authenticated can read own or public templates"
  ON demo_templates FOR SELECT
  TO authenticated
  USING (is_public = true OR (select auth.uid()) = created_by);

-- customer_brandings SELECT
DROP POLICY IF EXISTS "Admins or owners can view brandings" ON customer_brandings;
CREATE POLICY "Admins or owners can view brandings"
  ON customer_brandings FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR contact_email = (SELECT email FROM auth.users WHERE id = (select auth.uid()))::text
  );

-- customer_brandings UPDATE
DROP POLICY IF EXISTS "Admins or owners can update brandings" ON customer_brandings;
CREATE POLICY "Admins or owners can update brandings"
  ON customer_brandings FOR UPDATE
  TO authenticated
  USING (
    is_admin()
    OR contact_email = (SELECT email FROM auth.users WHERE id = (select auth.uid()))::text
  )
  WITH CHECK (
    is_admin()
    OR contact_email = (SELECT email FROM auth.users WHERE id = (select auth.uid()))::text
  );

-- branding_images SELECT
DROP POLICY IF EXISTS "Users or admins can view branding images" ON branding_images;
CREATE POLICY "Users or admins can view branding images"
  ON branding_images FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = (select auth.uid()))::text
    )
  );

-- branding_images INSERT
DROP POLICY IF EXISTS "Users or admins can insert branding images" ON branding_images;
CREATE POLICY "Users or admins can insert branding images"
  ON branding_images FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = (select auth.uid()))::text
    )
  );

-- content_edits SELECT
DROP POLICY IF EXISTS "Users or admins can view edits" ON content_edits;
CREATE POLICY "Users or admins can view edits"
  ON content_edits FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = (select auth.uid()))::text
    )
  );

-- deployment_logs SELECT
DROP POLICY IF EXISTS "Admins or owners can view deployment logs" ON deployment_logs;
CREATE POLICY "Admins or owners can view deployment logs"
  ON deployment_logs FOR SELECT
  TO authenticated
  USING (
    is_admin()
    OR branding_id IN (
      SELECT cb.id FROM customer_brandings cb
      WHERE cb.contact_email = (SELECT email FROM auth.users WHERE id = (select auth.uid()))::text
    )
  );
