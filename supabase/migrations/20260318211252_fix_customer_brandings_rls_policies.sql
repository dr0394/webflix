/*
  # Fix Customer Brandings RLS Policies

  1. Rebuild all policies using auth.jwt() instead of auth.users subqueries
  2. Correct admin JWT path to app_metadata
  3. Policies for anon, authenticated, and admin access
*/

DROP POLICY IF EXISTS "Admins have full access to brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Anonymous can view via valid token" ON customer_brandings;
DROP POLICY IF EXISTS "Authenticated users can insert brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can view own branding via email" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can update own branding" ON customer_brandings;
DROP POLICY IF EXISTS "Service role can insert brandings" ON customer_brandings;
DROP POLICY IF EXISTS "anon_can_view_with_token" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_view_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_insert_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_update_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "admin_can_delete_brandings" ON customer_brandings;

CREATE POLICY "anon_can_view_with_token"
  ON customer_brandings FOR SELECT TO anon
  USING (onboarding_token IS NOT NULL);

CREATE POLICY "auth_can_view_own_brandings"
  ON customer_brandings FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "auth_can_insert_own_brandings"
  ON customer_brandings FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "auth_can_update_own_brandings"
  ON customer_brandings FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR (auth.jwt()->'app_metadata'->>'role') = 'admin'
  );

CREATE POLICY "admin_can_delete_brandings"
  ON customer_brandings FOR DELETE TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

ALTER TABLE customer_brandings ENABLE ROW LEVEL SECURITY;
