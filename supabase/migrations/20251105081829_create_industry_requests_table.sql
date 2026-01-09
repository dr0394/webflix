/*
  # Create Industry Requests Table

  1. New Tables
    - `industry_requests`
      - `id` (uuid, primary key)
      - `industry_name` (text) - Name der angeforderten Branche
      - `email` (text) - E-Mail des Interessenten
      - `status` (text) - Status der Anfrage (pending, in_progress, completed)
      - `notes` (text) - Interne Notizen (optional)
      - `created_at` (timestamptz) - Zeitstempel der Anfrage
      - `updated_at` (timestamptz) - Zeitstempel der letzten Änderung

  2. Security
    - Enable RLS on `industry_requests` table
    - Public can insert requests (für Formulareinreichungen)
    - Only authenticated admins can read all requests
    - Only authenticated admins can update requests

  3. Indexes
    - Index on email for faster lookups
    - Index on status for filtering
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS industry_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_name text NOT NULL,
  email text NOT NULL,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE industry_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for form submissions)
CREATE POLICY "Anyone can insert industry requests"
  ON industry_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view all requests
CREATE POLICY "Admins can view all industry requests"
  ON industry_requests
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt()->>'role')::text = 'admin'
  );

-- Only admins can update requests
CREATE POLICY "Admins can update industry requests"
  ON industry_requests
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->>'role')::text = 'admin'
  )
  WITH CHECK (
    (auth.jwt()->>'role')::text = 'admin'
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_industry_requests_email ON industry_requests(email);
CREATE INDEX IF NOT EXISTS idx_industry_requests_status ON industry_requests(status);
CREATE INDEX IF NOT EXISTS idx_industry_requests_created_at ON industry_requests(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_industry_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_industry_requests_updated_at
  BEFORE UPDATE ON industry_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_industry_requests_updated_at();
