/*
  # Add RLS Policies for customer_subscriptions

  1. Security
    - Enable RLS on customer_subscriptions table
    - Allow customers to view their own subscriptions
    - Allow authenticated users to read their subscription data
  
  2. Policies
    - Customers can view their own subscriptions
    - Service role can manage all subscriptions (for webhooks)
*/

-- Enable RLS if not already enabled
ALTER TABLE customer_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Customers can view own subscriptions" ON customer_subscriptions;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON customer_subscriptions;

-- Policy: Customers can view their own subscriptions
CREATE POLICY "Customers can view own subscriptions"
  ON customer_subscriptions
  FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

-- Policy: Allow service role to insert/update (for webhooks and checkout)
CREATE POLICY "Service role can manage subscriptions"
  ON customer_subscriptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);