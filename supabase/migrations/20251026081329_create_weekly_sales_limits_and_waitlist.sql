/*
  # Weekly Sales Limits & Waitlist System

  1. New Tables
    - `weekly_sales_config`
      - `id` (uuid, primary key)
      - `week_start_date` (date) - Monday of the week
      - `max_weekly_sales` (integer) - Maximum allowed sales for this week
      - `current_sales_count` (integer) - Current number of sales this week
      - `is_active` (boolean) - Whether limits are currently active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `sales_waitlist`
      - `id` (uuid, primary key)
      - `email` (text) - Customer email
      - `name` (text) - Customer name
      - `phone` (text, optional) - Customer phone
      - `interested_template` (text, optional) - Which template they wanted
      - `notified` (boolean) - Whether they've been notified when spots open
      - `subscribed_at` (timestamptz) - When they joined waitlist
      - `notified_at` (timestamptz, optional) - When they were notified
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow public read access to weekly_sales_config for displaying banner
    - Only admins can modify weekly_sales_config
    - Allow public insert to sales_waitlist
    - Only admins can read/update sales_waitlist

  3. Functions
    - Function to get current week's sales status
    - Function to increment sales counter
    - Function to check if sales are available
*/

-- Create weekly_sales_config table
CREATE TABLE IF NOT EXISTS weekly_sales_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start_date date NOT NULL UNIQUE,
  max_weekly_sales integer NOT NULL DEFAULT 30,
  current_sales_count integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE weekly_sales_config ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the current week's config (for banner display)
CREATE POLICY "Anyone can view current week sales config"
  ON weekly_sales_config
  FOR SELECT
  TO public
  USING (true);

-- Only admins can insert/update config
CREATE POLICY "Admins can manage sales config"
  ON weekly_sales_config
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->'user_metadata'->>'role' = 'admin')
  )
  WITH CHECK (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->'user_metadata'->>'role' = 'admin')
  );

-- Create sales_waitlist table
CREATE TABLE IF NOT EXISTS sales_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  phone text,
  interested_template text,
  notified boolean NOT NULL DEFAULT false,
  subscribed_at timestamptz DEFAULT now(),
  notified_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sales_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to join the waitlist
CREATE POLICY "Anyone can join waitlist"
  ON sales_waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can view and update waitlist
CREATE POLICY "Admins can view waitlist"
  ON sales_waitlist
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->'user_metadata'->>'role' = 'admin')
  );

CREATE POLICY "Admins can update waitlist"
  ON sales_waitlist
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->'user_metadata'->>'role' = 'admin')
  )
  WITH CHECK (
    (auth.jwt()->>'role' = 'admin')
    OR
    (auth.jwt()->'user_metadata'->>'role' = 'admin')
  );

-- Function to get current week's sales status
CREATE OR REPLACE FUNCTION get_current_week_sales_status()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_monday date;
  result json;
BEGIN
  -- Get the Monday of current week
  current_monday := date_trunc('week', CURRENT_DATE)::date;
  
  -- Get or create this week's config
  INSERT INTO weekly_sales_config (week_start_date, max_weekly_sales, current_sales_count, is_active)
  VALUES (current_monday, 30, 0, true)
  ON CONFLICT (week_start_date) DO NOTHING;
  
  -- Return the config as JSON
  SELECT json_build_object(
    'week_start_date', week_start_date,
    'max_weekly_sales', max_weekly_sales,
    'current_sales_count', current_sales_count,
    'available_spots', max_weekly_sales - current_sales_count,
    'is_active', is_active,
    'spots_available', (max_weekly_sales - current_sales_count) > 0 AND is_active
  )
  INTO result
  FROM weekly_sales_config
  WHERE week_start_date = current_monday;
  
  RETURN result;
END;
$$;

-- Function to check if purchase is allowed
CREATE OR REPLACE FUNCTION can_purchase_website()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_monday date;
  sales_status record;
BEGIN
  current_monday := date_trunc('week', CURRENT_DATE)::date;
  
  SELECT max_weekly_sales, current_sales_count, is_active
  INTO sales_status
  FROM weekly_sales_config
  WHERE week_start_date = current_monday;
  
  -- If no config exists, create one and allow purchase
  IF NOT FOUND THEN
    INSERT INTO weekly_sales_config (week_start_date, max_weekly_sales, current_sales_count, is_active)
    VALUES (current_monday, 30, 0, true);
    RETURN true;
  END IF;
  
  -- Check if spots are available
  RETURN sales_status.is_active 
    AND sales_status.current_sales_count < sales_status.max_weekly_sales;
END;
$$;

-- Function to increment sales counter
CREATE OR REPLACE FUNCTION increment_weekly_sales_counter()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_monday date;
BEGIN
  current_monday := date_trunc('week', CURRENT_DATE)::date;
  
  -- Create config if it doesn't exist
  INSERT INTO weekly_sales_config (week_start_date, max_weekly_sales, current_sales_count, is_active)
  VALUES (current_monday, 30, 0, true)
  ON CONFLICT (week_start_date) DO NOTHING;
  
  -- Increment the counter
  UPDATE weekly_sales_config
  SET 
    current_sales_count = current_sales_count + 1,
    updated_at = now()
  WHERE week_start_date = current_monday;
END;
$$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_weekly_sales_config_week_start 
  ON weekly_sales_config(week_start_date);

CREATE INDEX IF NOT EXISTS idx_sales_waitlist_notified 
  ON sales_waitlist(notified) 
  WHERE notified = false;

CREATE INDEX IF NOT EXISTS idx_sales_waitlist_email 
  ON sales_waitlist(email);
