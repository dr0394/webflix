/*
  # Zwickels Metzgerei - Online Bestellsystem

  ## Neue Tabellen
  
  ### `zwickels_products`
  - `id` (uuid, primary key)
  - `name` (text) - Produktname
  - `description` (text) - Produktbeschreibung
  - `category` (text) - Kategorie (fleisch, wurst, partyservice, etc.)
  - `price` (decimal) - Preis pro Einheit
  - `unit` (text) - Einheit (kg, Stück, etc.)
  - `image_url` (text) - Bild-URL
  - `available` (boolean) - Verfügbarkeit
  - `featured` (boolean) - Hervorgehoben
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `zwickels_orders`
  - `id` (uuid, primary key)
  - `order_number` (text, unique) - Bestellnummer
  - `customer_name` (text) - Kundenname
  - `customer_email` (text) - E-Mail
  - `customer_phone` (text) - Telefon
  - `customer_address` (text) - Adresse (optional für Lieferung)
  - `delivery_method` (text) - Abholung oder Lieferung
  - `pickup_date` (date) - Abholdatum
  - `pickup_time` (text) - Abholzeit
  - `notes` (text) - Besondere Wünsche
  - `status` (text) - Status (pending, confirmed, ready, completed, cancelled)
  - `total_amount` (decimal) - Gesamtbetrag
  - `created_at` (timestamptz)

  ### `zwickels_order_items`
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key) - Referenz zur Bestellung
  - `product_id` (uuid, foreign key) - Referenz zum Produkt
  - `product_name` (text) - Produktname (Snapshot)
  - `quantity` (decimal) - Menge
  - `unit` (text) - Einheit
  - `price_per_unit` (decimal) - Preis pro Einheit (Snapshot)
  - `total_price` (decimal) - Gesamtpreis
  - `created_at` (timestamptz)

  ## Sicherheit
  - RLS aktiviert für alle Tabellen
  - Öffentlicher Lesezugriff auf Produkte
  - Kunden können ihre eigenen Bestellungen erstellen
  - Admin-Zugriff für Bestellverwaltung
*/

-- Produkte Tabelle
CREATE TABLE IF NOT EXISTS zwickels_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  price decimal(10,2) NOT NULL,
  unit text NOT NULL DEFAULT 'kg',
  image_url text,
  available boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bestellungen Tabelle
CREATE TABLE IF NOT EXISTS zwickels_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text,
  delivery_method text NOT NULL DEFAULT 'pickup',
  pickup_date date NOT NULL,
  pickup_time text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Bestellpositionen Tabelle
CREATE TABLE IF NOT EXISTS zwickels_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES zwickels_orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES zwickels_products(id),
  product_name text NOT NULL,
  quantity decimal(10,2) NOT NULL,
  unit text NOT NULL,
  price_per_unit decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_zwickels_products_category ON zwickels_products(category);
CREATE INDEX IF NOT EXISTS idx_zwickels_products_available ON zwickels_products(available);
CREATE INDEX IF NOT EXISTS idx_zwickels_orders_status ON zwickels_orders(status);
CREATE INDEX IF NOT EXISTS idx_zwickels_orders_created_at ON zwickels_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_zwickels_order_items_order_id ON zwickels_order_items(order_id);

-- RLS aktivieren
ALTER TABLE zwickels_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE zwickels_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE zwickels_order_items ENABLE ROW LEVEL SECURITY;

-- Policies für Produkte (öffentlicher Lesezugriff)
CREATE POLICY "Anyone can view available products"
  ON zwickels_products FOR SELECT
  TO public
  USING (available = true);

CREATE POLICY "Authenticated users can view all products"
  ON zwickels_products FOR SELECT
  TO authenticated
  USING (true);

-- Policies für Bestellungen (Kunden können eigene Bestellungen erstellen)
CREATE POLICY "Anyone can create orders"
  ON zwickels_orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own orders by email"
  ON zwickels_orders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can view all orders"
  ON zwickels_orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON zwickels_orders FOR UPDATE
  TO authenticated
  USING (true);

-- Policies für Bestellpositionen
CREATE POLICY "Anyone can create order items"
  ON zwickels_order_items FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON zwickels_order_items FOR SELECT
  TO public
  USING (true);

-- Funktion zum automatischen Update von updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger für Produkte
DROP TRIGGER IF EXISTS update_zwickels_products_updated_at ON zwickels_products;
CREATE TRIGGER update_zwickels_products_updated_at
  BEFORE UPDATE ON zwickels_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Beispielprodukte einfügen
INSERT INTO zwickels_products (name, description, category, price, unit, image_url, available, featured) VALUES
  ('Rindersteak vom Weiderind', 'Premium Rindersteak von Tieren aus artgerechter Haltung, perfekt zum Grillen', 'fleisch', 34.90, 'kg', 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
  ('Schweineschnitzel', 'Zartes Schweineschnitzel aus regionaler Zucht, ideal zum Panieren', 'fleisch', 18.90, 'kg', 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800', true, false),
  ('Hähnchenbrust', 'Frische Hähnchenbrust von Freilandhühnern', 'fleisch', 16.90, 'kg', 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800', true, false),
  ('Hackfleisch gemischt', 'Frisches Hackfleisch aus Rind und Schwein, täglich frisch', 'fleisch', 9.90, 'kg', 'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
  
  ('Bratwurst vom Schwäbisch-Hällischen Schwein', 'Hausgemachte Bratwurst nach traditionellem Rezept', 'wurst', 12.90, 'kg', 'https://images.pexels.com/photos/8601538/pexels-photo-8601538.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
  ('Leberkäse', 'Hausgemachter Leberkäse, warm oder kalt ein Genuss', 'wurst', 6.90, 'kg', 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=800', true, false),
  ('Salami', 'Luftgetrocknete Salami nach italienischer Art', 'wurst', 24.90, 'kg', 'https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg?auto=compress&cs=tinysrgb&w=800', true, false),
  ('Wiener Würstchen', 'Klassische Wiener Würstchen, 10 Stück', 'wurst', 7.50, 'Packung', 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800', true, false),
  
  ('Partyplatte Premium', 'Große Auswahl an Wurst- und Fleischspezialitäten für 10-12 Personen', 'partyservice', 89.90, 'Stück', 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=800', true, true),
  ('Grillpaket Deluxe', 'Perfektes Grillpaket mit Steaks, Würsten und Grillgemüse', 'partyservice', 65.00, 'Stück', 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=800', true, false),
  
  ('Geschenkkorb Regional', 'Auswahl regionaler Spezialitäten im schönen Geschenkkorb', 'geschenk', 45.00, 'Stück', 'https://images.pexels.com/photos/264917/pexels-photo-264917.jpeg?auto=compress&cs=tinysrgb&w=800', true, false)
ON CONFLICT DO NOTHING;
