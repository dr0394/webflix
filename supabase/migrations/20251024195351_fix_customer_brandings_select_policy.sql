/*
  # Fix Customer Brandings SELECT Policy
  
  1. Problem
    - Die aktuelle SELECT Policy prüft nur `contact_email = auth.email`
    - Beim ersten Laden ist contact_email aber NULL
    - Der Kunde kann seine Branding-Daten nicht sehen
  
  2. Lösung
    - Erlaube SELECT wenn der Kunde der Owner der Order ist
    - Verknüpfung über order_id → webflix_orders.customer_data->>'email' = auth.email
  
  3. Security
    - Bleibt sicher: Kunde kann nur SEINE Orders sehen
    - Verwendet order_id als Verknüpfung und customer_data.email
*/

-- Drop alte Policy
DROP POLICY IF EXISTS "Customers can view own branding via email" ON customer_brandings;

-- Neue Policy: Kunden können Brandings ihrer Orders sehen
CREATE POLICY "Customers can view own branding via email"
  ON customer_brandings
  FOR SELECT
  TO authenticated
  USING (
    -- Der Kunde ist der Owner der verknüpften Order
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );
