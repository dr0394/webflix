/*
  # Fix JWT email operator syntax

  This migration fixes the SQL operator error "operator does not exist: text ->> unknown"
  by correcting the auth.jwt() ->> 'email' syntax in RLS policies.

  ## Changes
  - Drop and recreate customer_brandings RLS policies with correct JSONB operator syntax
  - Change from `auth.jwt() ->> 'email'::text` to `auth.jwt() ->> 'email'`
*/

-- Drop existing policies
DROP POLICY IF EXISTS "auth_can_view_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_insert_own_brandings" ON customer_brandings;
DROP POLICY IF EXISTS "auth_can_update_own_brandings" ON customer_brandings;

-- Recreate policies with correct syntax
CREATE POLICY "auth_can_view_own_brandings"
ON customer_brandings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM webflix_orders
    WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
  )
  OR (auth.jwt()->'app_metadata'->>'role') = 'admin'
);

CREATE POLICY "auth_can_insert_own_brandings"
ON customer_brandings
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM webflix_orders
    WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
  )
  OR (auth.jwt()->'app_metadata'->>'role') = 'admin'
);

CREATE POLICY "auth_can_update_own_brandings"
ON customer_brandings
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM webflix_orders
    WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
  )
  OR (auth.jwt()->'app_metadata'->>'role') = 'admin'
);
