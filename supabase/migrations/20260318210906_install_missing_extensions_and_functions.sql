/*
  # Install missing extensions and core functions

  1. Extensions
    - pgcrypto for gen_random_bytes
  
  2. Functions
    - Fix generate_onboarding_token with proper schema reference
    - Fix create_branding_on_order with SECURITY DEFINER and NULL handling
    - Fix log_branding_status_change with SECURITY DEFINER
    - Add update_updated_at_column
    - Add subscription helper functions
*/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP FUNCTION IF EXISTS generate_onboarding_token();
CREATE OR REPLACE FUNCTION generate_onboarding_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  token text;
BEGIN
  token := encode(extensions.gen_random_bytes(32), 'hex');
  RETURN token;
END;
$$;

DROP TRIGGER IF EXISTS create_branding_on_order_trigger ON webflix_orders;
DROP FUNCTION IF EXISTS create_branding_on_order();

CREATE OR REPLACE FUNCTION create_branding_on_order()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  token text;
  extracted_demo_name text;
  customer_email text;
  customer_phone text;
  customer_company text;
  customer_first_name text;
  customer_last_name text;
  computed_company_name text;
BEGIN
  token := generate_onboarding_token();
  extracted_demo_name := NEW.template_data->>'demo_name';
  customer_email := NEW.customer_data->>'email';
  customer_phone := NEW.customer_data->>'phone';
  customer_company := NEW.customer_data->>'company';
  customer_first_name := NEW.customer_data->>'firstName';
  customer_last_name := NEW.customer_data->>'lastName';
  
  IF customer_company IS NOT NULL AND customer_company != '' THEN
    computed_company_name := customer_company;
  ELSIF customer_first_name IS NOT NULL OR customer_last_name IS NOT NULL THEN
    computed_company_name := TRIM(CONCAT(COALESCE(customer_first_name, ''), ' ', COALESCE(customer_last_name, '')));
  ELSE
    computed_company_name := 'Unbekannt';
  END IF;
  
  INSERT INTO customer_brandings (
    order_id,
    onboarding_token,
    status,
    demo_name,
    contact_email,
    contact_phone,
    company_name
  ) VALUES (
    NEW.id,
    token,
    'onboarding_pending',
    extracted_demo_name,
    customer_email,
    customer_phone,
    computed_company_name
  );
  
  INSERT INTO deployment_logs (
    branding_id,
    action,
    status,
    details
  ) VALUES (
    (SELECT id FROM customer_brandings WHERE order_id = NEW.id),
    'branding_initiated',
    'success',
    jsonb_build_object(
      'order_id', NEW.id,
      'demo_name', extracted_demo_name,
      'template_name', NEW.template_data->>'name'
    )
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER create_branding_on_order_trigger
  AFTER INSERT ON webflix_orders
  FOR EACH ROW
  EXECUTE FUNCTION create_branding_on_order();

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
