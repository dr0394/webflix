/*
  # Create Stripe Webhook Subscription Functions

  1. Functions
    - `update_subscription_status` - Updates subscription from Stripe webhooks
    - Creates or updates customer_subscriptions based on Stripe data
  
  2. Security
    - Functions are SECURITY DEFINER to allow webhook access
    - Returns customer data for email notifications
*/

-- Function to update or create subscription from Stripe webhook
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
AS $$
DECLARE
  v_subscription customer_subscriptions%ROWTYPE;
  v_customer customers%ROWTYPE;
BEGIN
  -- Try to find existing subscription
  SELECT * INTO v_subscription
  FROM customer_subscriptions
  WHERE stripe_subscription_id = p_stripe_subscription_id;

  IF FOUND THEN
    -- Update existing subscription
    UPDATE customer_subscriptions
    SET
      status = p_status,
      end_date = CASE
        WHEN p_cancel_at_period_end THEN p_current_period_end
        WHEN p_canceled_at IS NOT NULL THEN p_canceled_at
        ELSE end_date
      END,
      cancellation_date = CASE
        WHEN p_canceled_at IS NOT NULL THEN p_canceled_at
        ELSE cancellation_date
      END,
      updated_at = now()
    WHERE stripe_subscription_id = p_stripe_subscription_id
    RETURNING * INTO v_subscription;

    -- Get customer data
    SELECT * INTO v_customer
    FROM customers
    WHERE id = v_subscription.customer_id;

    RETURN jsonb_build_object(
      'success', true,
      'subscription_status', p_status,
      'is_active', p_is_active,
      'customer_email', v_customer.email,
      'customer_name', v_customer.first_name || ' ' || v_customer.last_name
    );
  ELSE
    -- Subscription not found - this might be the first webhook event
    -- We'll just return success and let the checkout success handler create it
    RETURN jsonb_build_object(
      'success', true,
      'subscription_status', p_status,
      'is_active', p_is_active,
      'message', 'Subscription will be created by checkout handler'
    );
  END IF;
END;
$$;