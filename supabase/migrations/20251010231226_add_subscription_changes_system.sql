/*
  # Änderungs-Credits System

  ## Änderungen an bestehenden Tabellen

  ### `customer_subscriptions`
  - `included_changes` (integer) - Inkludierte Änderungen pro Monat basierend auf Vertragslaufzeit
  - `used_changes` (integer) - Bereits genutzte Änderungen
  - `purchased_changes` (integer) - Zusätzlich gekaufte Änderungen
  - `available_changes` (integer) - Verfügbare Änderungen (berechnet)

  ## Neue Tabellen

  ### `subscription_change_purchases`
  - `id` (uuid, primary key)
  - `customer_id` (uuid, foreign key)
  - `subscription_id` (uuid, foreign key)
  - `amount` (integer) - Anzahl gekaufter Änderungen
  - `price_per_change` (numeric) - Preis pro Änderung (14,99€)
  - `total_price` (numeric) - Gesamtpreis
  - `stripe_payment_intent_id` (text) - Stripe Payment Intent ID
  - `status` (text) - pending, completed, failed
  - `created_at` (timestamptz)

  ### `subscription_change_log`
  - `id` (uuid, primary key)
  - `subscription_id` (uuid, foreign key)
  - `website_id` (uuid, foreign key)
  - `change_type` (text) - text_change, image_change, layout_change, feature_request
  - `description` (text)
  - `created_at` (timestamptz)

  ## Änderungs-Kontingente
  - Monatlich kündbar (0 Monate): 0 inkludierte Änderungen
  - 12 Monate Laufzeit: 4 inkludierte Änderungen pro Monat
  - 24 Monate Laufzeit: 6 inkludierte Änderungen pro Monat

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Kunden können nur ihre eigenen Daten sehen
*/

-- Füge Spalten zu customer_subscriptions hinzu
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_subscriptions' AND column_name = 'included_changes'
  ) THEN
    ALTER TABLE customer_subscriptions ADD COLUMN included_changes integer NOT NULL DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_subscriptions' AND column_name = 'used_changes'
  ) THEN
    ALTER TABLE customer_subscriptions ADD COLUMN used_changes integer NOT NULL DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_subscriptions' AND column_name = 'purchased_changes'
  ) THEN
    ALTER TABLE customer_subscriptions ADD COLUMN purchased_changes integer NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Aktualisiere included_changes basierend auf contract_duration
UPDATE customer_subscriptions
SET included_changes = CASE
  WHEN contract_duration = 0 THEN 0
  WHEN contract_duration = 12 THEN 4
  WHEN contract_duration = 24 THEN 6
  ELSE 0
END
WHERE included_changes = 0;

-- Erstelle subscription_change_purchases Tabelle
CREATE TABLE IF NOT EXISTS subscription_change_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  subscription_id uuid REFERENCES customer_subscriptions(id) ON DELETE CASCADE NOT NULL,
  amount integer NOT NULL,
  price_per_change numeric NOT NULL DEFAULT 14.99,
  total_price numeric NOT NULL,
  stripe_payment_intent_id text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_change_purchases_customer_id ON subscription_change_purchases(customer_id);
CREATE INDEX IF NOT EXISTS idx_change_purchases_subscription_id ON subscription_change_purchases(subscription_id);
CREATE INDEX IF NOT EXISTS idx_change_purchases_status ON subscription_change_purchases(status);

-- Erstelle subscription_change_log Tabelle
CREATE TABLE IF NOT EXISTS subscription_change_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES customer_subscriptions(id) ON DELETE CASCADE NOT NULL,
  website_id uuid REFERENCES customer_websites(id) ON DELETE CASCADE,
  change_type text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_change_log_subscription_id ON subscription_change_log(subscription_id);
CREATE INDEX IF NOT EXISTS idx_change_log_website_id ON subscription_change_log(website_id);
CREATE INDEX IF NOT EXISTS idx_change_log_created_at ON subscription_change_log(created_at DESC);

-- RLS aktivieren
ALTER TABLE subscription_change_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_change_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies für subscription_change_purchases
CREATE POLICY "Customers can view own change purchases"
  ON subscription_change_purchases FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create change purchases"
  ON subscription_change_purchases FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

-- RLS Policies für subscription_change_log
CREATE POLICY "Customers can view own change logs"
  ON subscription_change_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customer_subscriptions
      WHERE customer_subscriptions.id = subscription_change_log.subscription_id
      AND customer_subscriptions.customer_id = auth.uid()
    )
  );

-- Funktion zum Berechnen verfügbarer Änderungen
CREATE OR REPLACE FUNCTION get_available_changes(sub_id uuid)
RETURNS integer AS $$
DECLARE
  included integer;
  used integer;
  purchased integer;
BEGIN
  SELECT 
    included_changes,
    used_changes,
    purchased_changes
  INTO included, used, purchased
  FROM customer_subscriptions
  WHERE id = sub_id;
  
  RETURN (included + purchased - used);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Funktion zum Verwenden einer Änderung
CREATE OR REPLACE FUNCTION use_change(
  sub_id uuid,
  web_id uuid,
  change_type_param text,
  description_param text
)
RETURNS boolean AS $$
DECLARE
  available integer;
BEGIN
  -- Prüfe verfügbare Änderungen
  available := get_available_changes(sub_id);
  
  IF available <= 0 THEN
    RAISE EXCEPTION 'Keine Änderungen verfügbar';
  END IF;
  
  -- Erhöhe used_changes
  UPDATE customer_subscriptions
  SET used_changes = used_changes + 1
  WHERE id = sub_id;
  
  -- Erstelle Log-Eintrag
  INSERT INTO subscription_change_log (
    subscription_id,
    website_id,
    change_type,
    description
  ) VALUES (
    sub_id,
    web_id,
    change_type_param,
    description_param
  );
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
