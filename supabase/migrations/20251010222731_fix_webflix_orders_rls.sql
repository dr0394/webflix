/*
  # Fix WebFlix Orders RLS Policy

  ## Änderungen
  - Entfernt alte INSERT Policy
  - Erstellt neue INSERT Policy die wirklich öffentlichen Zugriff erlaubt (anon role)
  - Erlaubt auch SELECT für anon role (für Success-Page)
*/

-- Alte Policies entfernen falls vorhanden
DROP POLICY IF EXISTS "Anyone can create orders" ON webflix_orders;
DROP POLICY IF EXISTS "Authenticated users can view all orders" ON webflix_orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON webflix_orders;

-- Neue Policy: Jeder (auch anon) kann Bestellungen erstellen
CREATE POLICY "Public can create orders"
  ON webflix_orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Neue Policy: Jeder (auch anon) kann Bestellungen lesen
CREATE POLICY "Public can view orders"
  ON webflix_orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Neue Policy: Nur authentifizierte Benutzer können Bestellungen aktualisieren
CREATE POLICY "Authenticated can update orders"
  ON webflix_orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
