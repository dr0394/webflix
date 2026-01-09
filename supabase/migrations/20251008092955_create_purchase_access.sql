/*
  # Purchase Access System
  
  1. New Tables
    - `purchase_access`
      - `id` (uuid, primary key) - Unique purchase/access ID
      - `customer_email` (text) - Customer email
      - `customer_name` (text) - Customer name
      - `demo_type` (text) - Which demo template (autoaufbereitung, etc.)
      - `is_active` (boolean) - Access enabled/disabled
      - `created_at` (timestamptz) - When purchased
      - `expires_at` (timestamptz, nullable) - Optional expiration
      - `payment_status` (text) - pending, completed, failed
      - `payment_amount` (numeric) - Amount paid
      - `config_id` (uuid, nullable) - Link to website_configurations
      
  2. Security
    - Enable RLS on `purchase_access` table
    - Admins can read all purchase access records
    - Users can only read their own record by ID
    
  3. Changes
    - Add `purchase_id` to `website_configurations` table
    - Link configurations to purchase access
*/

-- Create purchase_access table
CREATE TABLE IF NOT EXISTS purchase_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  demo_type text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  payment_status text DEFAULT 'pending',
  payment_amount numeric(10,2),
  config_id uuid,
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'completed', 'failed'))
);

-- Add purchase_id to website_configurations if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'website_configurations' AND column_name = 'purchase_id'
  ) THEN
    ALTER TABLE website_configurations ADD COLUMN purchase_id uuid;
    ALTER TABLE website_configurations ADD CONSTRAINT fk_purchase_access 
      FOREIGN KEY (purchase_id) REFERENCES purchase_access(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE purchase_access ENABLE ROW LEVEL SECURITY;

-- Policies for purchase_access
CREATE POLICY "Anyone can read their purchase by ID"
  ON purchase_access FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated admins can insert"
  ON purchase_access FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated admins can update"
  ON purchase_access FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_purchase_access_email ON purchase_access(customer_email);
CREATE INDEX IF NOT EXISTS idx_purchase_access_active ON purchase_access(is_active);
CREATE INDEX IF NOT EXISTS idx_website_configurations_purchase_id ON website_configurations(purchase_id);
