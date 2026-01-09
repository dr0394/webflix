/*
  # Fix Customer Brandings Update Policy
  
  1. Problem
    - Die aktuelle UPDATE Policy prüft `contact_email = auth.email`
    - Beim ersten Absenden der Checklist ist contact_email aber NULL
    - Der Kunde kann die Branding-Daten nicht speichern
  
  2. Lösung
    - Erlaube UPDATE wenn der Kunde der Owner der Order ist
    - Verknüpfung über order_id → webflix_orders.customer_data->>'email' = auth.email
  
  3. Security
    - Bleibt sicher: Kunde kann nur SEINE Orders updaten
    - Verwendet order_id als Verknüpfung und customer_data.email
*/

-- Drop alte Policy
DROP POLICY IF EXISTS "Customers can update own branding" ON customer_brandings;

-- Neue Policy: Kunden können Brandings ihrer Orders updaten
CREATE POLICY "Customers can update own branding"
  ON customer_brandings
  FOR UPDATE
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
