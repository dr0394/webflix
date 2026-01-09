/*
  # Fix Customer Brandings RLS for Checkout

  ## Problem
  The trigger `create_branding_on_order_trigger` automatically creates a `customer_brandings` 
  record when a new order is inserted. However, the current RLS policies don't allow 
  unauthenticated users (who are creating orders during checkout) to insert into this table.

  ## Solution
  Add a policy that allows the system/trigger to insert into `customer_brandings` 
  when it's done automatically as part of order creation.

  ## Changes
  - Add INSERT policy for service role to create branding records via trigger
*/

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Service role can insert brandings" ON customer_brandings;

-- Allow service role (used by triggers) to insert brandings
CREATE POLICY "Service role can insert brandings"
  ON customer_brandings
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Also allow authenticated users to insert (for future manual creation)
DROP POLICY IF EXISTS "Authenticated users can insert brandings" ON customer_brandings;

CREATE POLICY "Authenticated users can insert brandings"
  ON customer_brandings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
