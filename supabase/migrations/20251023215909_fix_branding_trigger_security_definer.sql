/*
  # Fix Branding Trigger with SECURITY DEFINER

  ## Problem
  The trigger function `create_branding_on_order()` runs in the context of the user 
  inserting the order (anonymous user during checkout). This causes RLS violations 
  when trying to insert into `customer_brandings`.

  ## Solution
  Recreate the trigger function with `SECURITY DEFINER` so it runs with the 
  privileges of the function owner (postgres/admin) instead of the calling user.

  ## Changes
  - Drop and recreate `create_branding_on_order()` with SECURITY DEFINER
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS create_branding_on_order_trigger ON webflix_orders;
DROP FUNCTION IF EXISTS create_branding_on_order();

-- Recreate function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION create_branding_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  token text;
  new_branding_id uuid;
BEGIN
  token := generate_onboarding_token();

  INSERT INTO customer_brandings (
    order_id,
    onboarding_token,
    status
  ) VALUES (
    NEW.id,
    token,
    'onboarding_pending'
  )
  RETURNING id INTO new_branding_id;

  INSERT INTO deployment_logs (
    branding_id,
    action,
    status,
    details
  ) VALUES (
    new_branding_id,
    'branding_initiated',
    'success',
    jsonb_build_object('order_id', NEW.id)
  );

  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER create_branding_on_order_trigger
  AFTER INSERT ON webflix_orders
  FOR EACH ROW
  EXECUTE FUNCTION create_branding_on_order();

-- Also update the log_branding_status_change function to use SECURITY DEFINER
DROP TRIGGER IF EXISTS log_branding_status_change_trigger ON customer_brandings;
DROP FUNCTION IF EXISTS log_branding_status_change();

CREATE OR REPLACE FUNCTION log_branding_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO deployment_logs (
      branding_id,
      action,
      status,
      details
    ) VALUES (
      NEW.id,
      CASE NEW.status
        WHEN 'content_submitted' THEN 'onboarding_completed'
        WHEN 'auto_generated' THEN 'auto_generated'
        WHEN 'customer_editing' THEN 'preview_created'
        WHEN 'ready_for_review' THEN 'submitted_for_review'
        WHEN 'approved' THEN 'approved'
        WHEN 'deployed' THEN 'deployed'
        ELSE 'status_changed'
      END,
      'success',
      jsonb_build_object(
        'old_status', OLD.status,
        'new_status', NEW.status
      )
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER log_branding_status_change_trigger
  AFTER UPDATE ON customer_brandings
  FOR EACH ROW
  EXECUTE FUNCTION log_branding_status_change();
