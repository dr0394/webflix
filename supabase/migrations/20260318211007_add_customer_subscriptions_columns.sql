/*
  # Add missing columns to customer_subscriptions
  
  1. New Columns
    - contract_type (flex/fixed)
    - stripe_customer_id
  
  2. Functions
    - can_cancel_subscription
    - update_subscription_status
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_subscriptions' AND column_name = 'contract_type'
  ) THEN
    ALTER TABLE customer_subscriptions ADD COLUMN contract_type text DEFAULT 'fixed';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_subscriptions' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE customer_subscriptions ADD COLUMN stripe_customer_id text;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION can_cancel_subscription(p_subscription_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_subscription customer_subscriptions%ROWTYPE;
  v_months_active numeric;
BEGIN
  SELECT * INTO v_subscription FROM customer_subscriptions WHERE id = p_subscription_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('can_cancel', false, 'reason', 'Abonnement nicht gefunden');
  END IF;
  IF v_subscription.contract_type = 'flex' OR v_subscription.contract_duration = 0 THEN
    RETURN jsonb_build_object('can_cancel', true, 'reason', 'Monatlich kündbar');
  END IF;
  v_months_active := EXTRACT(EPOCH FROM (now() - v_subscription.start_date)) / (60 * 60 * 24 * 30);
  IF v_months_active >= v_subscription.contract_duration THEN
    RETURN jsonb_build_object('can_cancel', true, 'reason', 'Mindestvertragslaufzeit erreicht');
  ELSE
    RETURN jsonb_build_object(
      'can_cancel', false,
      'reason', format('Mindestvertragslaufzeit noch nicht erreicht. Noch %s Monate verbleibend.', CEIL(v_subscription.contract_duration - v_months_active)),
      'months_remaining', CEIL(v_subscription.contract_duration - v_months_active)
    );
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION update_subscription_status(
  p_stripe_subscription_id text,
  p_status text,
  p_is_active boolean,
  p_current_period_end timestamptz DEFAULT NULL,
  p_canceled_at timestamptz DEFAULT NULL,
  p_cancel_at_period_end boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_subscription customer_subscriptions%ROWTYPE;
  v_customer customers%ROWTYPE;
BEGIN
  SELECT * INTO v_subscription FROM customer_subscriptions WHERE stripe_subscription_id = p_stripe_subscription_id;
  IF FOUND THEN
    UPDATE customer_subscriptions
    SET status = p_status,
        end_date = CASE WHEN p_cancel_at_period_end THEN p_current_period_end WHEN p_canceled_at IS NOT NULL THEN p_canceled_at ELSE end_date END,
        cancellation_date = CASE WHEN p_canceled_at IS NOT NULL THEN p_canceled_at ELSE cancellation_date END,
        updated_at = now()
    WHERE stripe_subscription_id = p_stripe_subscription_id
    RETURNING * INTO v_subscription;
    SELECT * INTO v_customer FROM customers WHERE id = v_subscription.customer_id;
    RETURN jsonb_build_object('success', true, 'subscription_status', p_status, 'is_active', p_is_active, 'customer_email', v_customer.email, 'customer_name', v_customer.first_name || ' ' || v_customer.last_name);
  ELSE
    RETURN jsonb_build_object('success', true, 'subscription_status', p_status, 'is_active', p_is_active, 'message', 'Subscription will be created by checkout handler');
  END IF;
END;
$$;

ALTER TABLE customer_subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Customers can view own subscriptions" ON customer_subscriptions;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON customer_subscriptions;

CREATE POLICY "Customers can view own subscriptions"
  ON customer_subscriptions FOR SELECT TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Service role can manage subscriptions"
  ON customer_subscriptions FOR ALL TO service_role
  USING (true) WITH CHECK (true);
