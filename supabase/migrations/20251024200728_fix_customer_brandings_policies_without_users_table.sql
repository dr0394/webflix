/*
  # Fix Customer Brandings Policies - Remove auth.users dependency
  
  1. Problem
    - Die Policies greifen auf auth.users zu → Permission Denied (42501)
    - auth.users ist nicht direkt zugänglich in RLS Policies
  
  2. Lösung
    - Verwende auth.jwt() statt Subquery auf auth.users
    - auth.jwt() gibt die User-Email direkt zurück
  
  3. Security
    - Bleibt vollständig sicher
    - Verwendet JWT Token des authentifizierten Users
*/

-- Drop alte Policies
DROP POLICY IF EXISTS "Customers can view own branding via email" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can update own branding" ON customer_brandings;

-- Neue SELECT Policy: Kunden können Brandings ihrer Orders sehen
CREATE POLICY "Customers can view own branding via email"
  ON customer_brandings
  FOR SELECT
  TO authenticated
  USING (
    -- Der Kunde ist der Owner der verknüpften Order
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
  );

-- Neue UPDATE Policy: Kunden können Brandings ihrer Orders updaten
CREATE POLICY "Customers can update own branding"
  ON customer_brandings
  FOR UPDATE
  TO authenticated
  USING (
    -- Der Kunde ist der Owner der verknüpften Order
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
  );
