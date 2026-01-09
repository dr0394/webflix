/*
  # Customer Portal System

  ## Neue Tabellen

  ### `customers`
  - `id` (uuid, primary key) - Eindeutige Kunden-ID
  - `customer_number` (text, unique) - Kundennummer (z.B. CUS-1234567890)
  - `email` (text, unique) - E-Mail-Adresse (Login)
  - `password_hash` (text) - Gehashtes Passwort
  - `first_name` (text) - Vorname
  - `last_name` (text) - Nachname
  - `phone` (text) - Telefonnummer
  - `company` (text) - Firma (optional)
  - `address` (jsonb) - Adresse (Straße, PLZ, Stadt, Land)
  - `created_at` (timestamptz) - Registrierungsdatum
  - `last_login_at` (timestamptz) - Letzter Login

  ### `customer_websites`
  - `id` (uuid, primary key)
  - `customer_id` (uuid, foreign key) - Referenz zu customers
  - `order_id` (uuid, foreign key) - Referenz zu webflix_orders
  - `website_url` (text) - URL der Website
  - `status` (text) - in_development, waiting_content, live, maintenance, cancelled
  - `template_name` (text) - Name des Templates
  - `go_live_date` (timestamptz) - Go-Live Datum
  - `content_received_at` (timestamptz) - Wann Inhalte empfangen wurden
  - `notes` (text) - Notizen zum Projekt
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `customer_subscriptions`
  - `id` (uuid, primary key)
  - `customer_id` (uuid, foreign key)
  - `website_id` (uuid, foreign key)
  - `stripe_subscription_id` (text, unique)
  - `status` (text) - active, cancelled, past_due, paused
  - `plan_name` (text) - Name des Tarifs
  - `monthly_price` (numeric) - Monatlicher Preis
  - `contract_duration` (integer) - Vertragslaufzeit in Monaten
  - `start_date` (timestamptz) - Startdatum
  - `end_date` (timestamptz) - Enddatum (NULL = läuft weiter)
  - `cancellation_date` (timestamptz) - Kündigungsdatum
  - `cancellation_reason` (text) - Kündigungsgrund
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `customer_support_tickets`
  - `id` (uuid, primary key)
  - `customer_id` (uuid, foreign key)
  - `website_id` (uuid, foreign key, optional)
  - `ticket_number` (text, unique) - Ticketnummer (z.B. TKT-1234567890)
  - `subject` (text) - Betreff
  - `category` (text) - support, change_request, billing, technical, other
  - `priority` (text) - low, medium, high, urgent
  - `status` (text) - open, in_progress, waiting_customer, resolved, closed
  - `description` (text) - Beschreibung
  - `admin_notes` (text) - Interne Notizen (nur für Admins)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `resolved_at` (timestamptz)

  ### `support_ticket_messages`
  - `id` (uuid, primary key)
  - `ticket_id` (uuid, foreign key)
  - `author_type` (text) - customer, admin
  - `author_id` (uuid) - Kunde oder Admin ID
  - `message` (text) - Nachrichtentext
  - `attachments` (jsonb) - Array von Anhängen
  - `created_at` (timestamptz)

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Kunden können nur ihre eigenen Daten sehen und bearbeiten
  - Support-Tickets können von Kunden und Admins gesehen werden
*/

-- Customers Tabelle
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_number text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  company text,
  address jsonb,
  created_at timestamptz DEFAULT now(),
  last_login_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_customer_number ON customers(customer_number);

-- Customer Websites Tabelle
CREATE TABLE IF NOT EXISTS customer_websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  order_id uuid REFERENCES webflix_orders(id) ON DELETE SET NULL,
  website_url text,
  status text NOT NULL DEFAULT 'in_development',
  template_name text NOT NULL,
  go_live_date timestamptz,
  content_received_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_websites_customer_id ON customer_websites(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_websites_status ON customer_websites(status);

-- Customer Subscriptions Tabelle
CREATE TABLE IF NOT EXISTS customer_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  website_id uuid REFERENCES customer_websites(id) ON DELETE SET NULL,
  stripe_subscription_id text UNIQUE,
  status text NOT NULL DEFAULT 'active',
  plan_name text NOT NULL,
  monthly_price numeric NOT NULL,
  contract_duration integer NOT NULL DEFAULT 12,
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz,
  cancellation_date timestamptz,
  cancellation_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_customer_id ON customer_subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_status ON customer_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_customer_subscriptions_stripe_id ON customer_subscriptions(stripe_subscription_id);

-- Support Tickets Tabelle
CREATE TABLE IF NOT EXISTS customer_support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  website_id uuid REFERENCES customer_websites(id) ON DELETE SET NULL,
  ticket_number text UNIQUE NOT NULL,
  subject text NOT NULL,
  category text NOT NULL DEFAULT 'support',
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  description text NOT NULL,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_customer_id ON customer_support_tickets(customer_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON customer_support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_ticket_number ON customer_support_tickets(ticket_number);

-- Support Ticket Messages Tabelle
CREATE TABLE IF NOT EXISTS support_ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES customer_support_tickets(id) ON DELETE CASCADE NOT NULL,
  author_type text NOT NULL,
  author_id uuid NOT NULL,
  message text NOT NULL,
  attachments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket_id ON support_ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_created_at ON support_ticket_messages(created_at DESC);

-- RLS aktivieren
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies für customers
CREATE POLICY "Customers can view own data"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Customers can update own data"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- RLS Policies für customer_websites
CREATE POLICY "Customers can view own websites"
  ON customer_websites FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

-- RLS Policies für customer_subscriptions
CREATE POLICY "Customers can view own subscriptions"
  ON customer_subscriptions FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can update own subscriptions"
  ON customer_subscriptions FOR UPDATE
  TO authenticated
  USING (customer_id = auth.uid())
  WITH CHECK (customer_id = auth.uid());

-- RLS Policies für customer_support_tickets
CREATE POLICY "Customers can view own tickets"
  ON customer_support_tickets FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create tickets"
  ON customer_support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Customers can update own tickets"
  ON customer_support_tickets FOR UPDATE
  TO authenticated
  USING (customer_id = auth.uid())
  WITH CHECK (customer_id = auth.uid());

-- RLS Policies für support_ticket_messages
CREATE POLICY "Users can view messages of their tickets"
  ON support_ticket_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customer_support_tickets
      WHERE customer_support_tickets.id = support_ticket_messages.ticket_id
      AND customer_support_tickets.customer_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages for their tickets"
  ON support_ticket_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM customer_support_tickets
      WHERE customer_support_tickets.id = support_ticket_messages.ticket_id
      AND customer_support_tickets.customer_id = auth.uid()
    )
  );

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_customer_tables_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_customer_websites_updated_at ON customer_websites;
CREATE TRIGGER update_customer_websites_updated_at
  BEFORE UPDATE ON customer_websites
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_tables_updated_at();

DROP TRIGGER IF EXISTS update_customer_subscriptions_updated_at ON customer_subscriptions;
CREATE TRIGGER update_customer_subscriptions_updated_at
  BEFORE UPDATE ON customer_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_tables_updated_at();

DROP TRIGGER IF EXISTS update_customer_support_tickets_updated_at ON customer_support_tickets;
CREATE TRIGGER update_customer_support_tickets_updated_at
  BEFORE UPDATE ON customer_support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_customer_tables_updated_at();
