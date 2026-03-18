/*
  # Industry Requests Table

  1. New Table
    - industry_requests for tracking requested industries

  2. Security
    - Public insert, admin read/update
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

ALTER TABLE industry_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert industry requests"
  ON industry_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all industry requests"
  ON industry_requests FOR SELECT TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update industry requests"
  ON industry_requests FOR UPDATE TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE INDEX IF NOT EXISTS idx_industry_requests_email ON industry_requests(email);
CREATE INDEX IF NOT EXISTS idx_industry_requests_status ON industry_requests(status);
CREATE INDEX IF NOT EXISTS idx_industry_requests_created_at ON industry_requests(created_at DESC);

CREATE OR REPLACE FUNCTION update_industry_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_industry_requests_updated_at
  BEFORE UPDATE ON industry_requests FOR EACH ROW
  EXECUTE FUNCTION update_industry_requests_updated_at();
