/*
  # Add contract_type to customer_subscriptions

  1. Changes
    - Add `contract_type` column to track if subscription is 'flex' or 'fixed'
    - Add `stripe_customer_id` to enable Stripe Portal access
    - Add helper function to check if subscription can be cancelled
  
  2. Security
    - No RLS changes needed (existing policies remain)
*/

-- Add contract_type column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_subscriptions' AND column_name = 'contract_type'
  ) THEN
    ALTER TABLE customer_subscriptions ADD COLUMN contract_type text DEFAULT 'fixed';
  END IF;
END $$;

-- Add stripe_customer_id column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_subscriptions' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE customer_subscriptions ADD COLUMN stripe_customer_id text;
  END IF;
END $$;

-- Create function to check if subscription can be cancelled
CREATE OR REPLACE FUNCTION can_cancel_subscription(
  p_subscription_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_subscription customer_subscriptions%ROWTYPE;
  v_months_active numeric;
  v_can_cancel boolean;
  v_reason text;
BEGIN
  -- Get subscription
  SELECT * INTO v_subscription
  FROM customer_subscriptions
  WHERE id = p_subscription_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'can_cancel', false,
      'reason', 'Abonnement nicht gefunden'
    );
  END IF;

  -- FLEX contracts can always cancel
  IF v_subscription.contract_type = 'flex' OR v_subscription.contract_duration = 0 THEN
    RETURN jsonb_build_object(
      'can_cancel', true,
      'reason', 'Monatlich kündbar'
    );
  END IF;

  -- Calculate months active
  v_months_active := EXTRACT(EPOCH FROM (now() - v_subscription.start_date)) / (60 * 60 * 24 * 30);

  -- Check if minimum contract duration is reached
  IF v_months_active >= v_subscription.contract_duration THEN
    RETURN jsonb_build_object(
      'can_cancel', true,
      'reason', 'Mindestvertragslaufzeit erreicht'
    );
  ELSE
    RETURN jsonb_build_object(
      'can_cancel', false,
      'reason', format(
        'Mindestvertragslaufzeit noch nicht erreicht. Noch %s Monate verbleibend.',
        CEIL(v_subscription.contract_duration - v_months_active)
      ),
      'months_remaining', CEIL(v_subscription.contract_duration - v_months_active)
    );
  END IF;
END;
$$;