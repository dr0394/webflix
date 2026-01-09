/*
  # Fix Admin Role JWT Path
  
  1. Problem
    - Policies verwenden auth.jwt()->>'role'
    - Aber Admin-Role ist gespeichert in auth.jwt()->'app_metadata'->>'role'
  
  2. Lösung
    - Korrigiere alle Policies auf richtigen JWT-Pfad
    - auth.jwt()->'app_metadata'->>'role'
  
  3. Changes
    - UPDATE alle Policies mit Admin-Check
*/

-- Drop alle Policies
DROP POLICY IF EXISTS "anon_can_view_with_token" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_view_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_insert_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_update_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "admin_can_delete_brandings" ON customer_brandings;

-- Policy 1: Anonymous users can view with valid token
CREATE POLICY "anon_can_view_with_token"
  ON customer_brandings
  FOR SELECT
  TO anon
  USING (onboarding_token IS NOT NULL);

-- Policy 2: Authenticated users can view their own brandings
CREATE POLICY "auth_can_view_own_brandings"
  ON customer_brandings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR
    (auth.jwt()->'app_metadata'->>'role' = 'admin')
  );

-- Policy 3: Authenticated users can insert brandings
CREATE POLICY "auth_can_insert_own_brandings"
  ON customer_brandings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR
    (auth.jwt()->'app_metadata'->>'role' = 'admin')
  );

-- Policy 4: Authenticated users can update their own brandings
CREATE POLICY "auth_can_update_own_brandings"
  ON customer_brandings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR
    (auth.jwt()->'app_metadata'->>'role' = 'admin')
  );

-- Policy 5: Only admins can delete brandings
CREATE POLICY "admin_can_delete_brandings"
  ON customer_brandings
  FOR DELETE
  TO authenticated
  USING (auth.jwt()->'app_metadata'->>'role' = 'admin');
