/*
  # WebFlix Orders System

  ## Neue Tabellen
  
  ### `webflix_orders`
  - `id` (uuid, primary key)
  - `order_number` (text, unique) - Bestellnummer (z.B. WF-1234567890)
  - `status` (text) - Status (pending_payment, paid, processing, completed, cancelled)
  - `customer_data` (jsonb) - Kundendaten (Name, Email, Telefon, Adresse, etc.)
  - `template_data` (jsonb) - Template-Informationen (ID, Name, Preis)
  - `addons` (jsonb) - Add-ons Array
  - `duration` (integer) - Vertragslaufzeit in Monaten (0 = monatlich kündbar)
  - `pricing` (jsonb) - Preisinformationen (monatlich, einmalig, gesamt)
  - `stripe_session_id` (text) - Stripe Checkout Session ID
  - `stripe_subscription_id` (text) - Stripe Subscription ID (falls recurring)
  - `paid_at` (timestamptz) - Zahlungszeitpunkt
  - `created_at` (timestamptz) - Erstellungszeitpunkt
  - `updated_at` (timestamptz) - Letzte Aktualisierung

  ## Sicherheit
  - RLS aktiviert
  - Öffentlicher Schreibzugriff für neue Bestellungen (INSERT)
  - Lesezugriff nur für authentifizierte Benutzer
*/

-- WebFlix Orders Tabelle
CREATE TABLE IF NOT EXISTS webflix_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending_payment',
  customer_data jsonb NOT NULL,
  template_data jsonb NOT NULL,
  addons jsonb DEFAULT '[]'::jsonb,
  duration integer NOT NULL DEFAULT 12,
  pricing jsonb NOT NULL,
  stripe_session_id text,
  stripe_subscription_id text,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_webflix_orders_order_number ON webflix_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_webflix_orders_status ON webflix_orders(status);
CREATE INDEX IF NOT EXISTS idx_webflix_orders_created_at ON webflix_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_webflix_orders_stripe_session ON webflix_orders(stripe_session_id);

-- RLS aktivieren
ALTER TABLE webflix_orders ENABLE ROW LEVEL SECURITY;

-- Policies: Jeder kann Bestellungen erstellen
CREATE POLICY "Anyone can create orders"
  ON webflix_orders FOR INSERT
  TO public
  WITH CHECK (true);

-- Policies: Authentifizierte Benutzer können alle Bestellungen lesen
CREATE POLICY "Authenticated users can view all orders"
  ON webflix_orders FOR SELECT
  TO authenticated
  USING (true);

-- Policies: Authentifizierte Benutzer können Bestellungen aktualisieren
CREATE POLICY "Authenticated users can update orders"
  ON webflix_orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_webflix_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_webflix_orders_updated_at ON webflix_orders;
CREATE TRIGGER update_webflix_orders_updated_at
  BEFORE UPDATE ON webflix_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_webflix_orders_updated_at();
