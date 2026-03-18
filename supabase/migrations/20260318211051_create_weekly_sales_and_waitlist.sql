/*
  # Weekly Sales Limits and Waitlist System

  1. New Tables
    - weekly_sales_config
    - sales_waitlist

  2. Functions
    - get_current_week_sales_status
    - can_purchase_website
    - increment_weekly_sales_counter

  3. Security
    - RLS on both tables
*/

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

CREATE POLICY "Anyone can view current week sales config"
  ON weekly_sales_config FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage sales config"
  ON weekly_sales_config FOR ALL TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

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

CREATE POLICY "Anyone can join waitlist"
  ON sales_waitlist FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can view waitlist"
  ON sales_waitlist FOR SELECT TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE POLICY "Admins can update waitlist"
  ON sales_waitlist FOR UPDATE TO authenticated
  USING ((auth.jwt()->'app_metadata'->>'role') = 'admin')
  WITH CHECK ((auth.jwt()->'app_metadata'->>'role') = 'admin');

CREATE OR REPLACE FUNCTION get_current_week_sales_status()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_monday date;
  result json;
BEGIN
  current_monday := date_trunc('week', CURRENT_DATE)::date;
  INSERT INTO weekly_sales_config (week_start_date, max_weekly_sales, current_sales_count, is_active)
  VALUES (current_monday, 30, 0, true)
  ON CONFLICT (week_start_date) DO NOTHING;
  SELECT json_build_object(
    'week_start_date', week_start_date,
    'max_weekly_sales', max_weekly_sales,
    'current_sales_count', current_sales_count,
    'available_spots', max_weekly_sales - current_sales_count,
    'is_active', is_active,
    'spots_available', (max_weekly_sales - current_sales_count) > 0 AND is_active
  ) INTO result FROM weekly_sales_config WHERE week_start_date = current_monday;
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION can_purchase_website()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_monday date;
  sales_status record;
BEGIN
  current_monday := date_trunc('week', CURRENT_DATE)::date;
  SELECT max_weekly_sales, current_sales_count, is_active INTO sales_status
  FROM weekly_sales_config WHERE week_start_date = current_monday;
  IF NOT FOUND THEN
    INSERT INTO weekly_sales_config (week_start_date, max_weekly_sales, current_sales_count, is_active)
    VALUES (current_monday, 30, 0, true);
    RETURN true;
  END IF;
  RETURN sales_status.is_active AND sales_status.current_sales_count < sales_status.max_weekly_sales;
END;
$$;

CREATE OR REPLACE FUNCTION increment_weekly_sales_counter()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_monday date;
BEGIN
  current_monday := date_trunc('week', CURRENT_DATE)::date;
  INSERT INTO weekly_sales_config (week_start_date, max_weekly_sales, current_sales_count, is_active)
  VALUES (current_monday, 30, 0, true)
  ON CONFLICT (week_start_date) DO NOTHING;
  UPDATE weekly_sales_config SET current_sales_count = current_sales_count + 1, updated_at = now()
  WHERE week_start_date = current_monday;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_weekly_sales_config_week_start ON weekly_sales_config(week_start_date);
CREATE INDEX IF NOT EXISTS idx_sales_waitlist_notified ON sales_waitlist(notified) WHERE notified = false;
CREATE INDEX IF NOT EXISTS idx_sales_waitlist_email ON sales_waitlist(email);
