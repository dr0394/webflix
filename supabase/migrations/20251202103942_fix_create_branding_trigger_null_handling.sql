/*
  # Fix create_branding_on_order trigger function

  This migration fixes the NULL handling in the create_branding_on_order trigger
  to prevent the "operator does not exist: text ->> unknown" error.

  ## Changes
  - Add proper NULL handling for customer_data fields
  - Use COALESCE and NULLIF for safer string concatenation
*/

-- Drop and recreate the function with better NULL handling
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
  -- Generate secure token
  token := generate_onboarding_token();
  
  -- Extract demo_name from order template_data
  extracted_demo_name := NEW.template_data->>'demo_name';
  
  -- Safely extract customer data
  customer_email := NEW.customer_data->>'email';
  customer_phone := NEW.customer_data->>'phone';
  customer_company := NEW.customer_data->>'company';
  customer_first_name := NEW.customer_data->>'firstName';
  customer_last_name := NEW.customer_data->>'lastName';
  
  -- Compute company name with proper NULL handling
  IF customer_company IS NOT NULL AND customer_company != '' THEN
    computed_company_name := customer_company;
  ELSIF customer_first_name IS NOT NULL OR customer_last_name IS NOT NULL THEN
    computed_company_name := TRIM(CONCAT(COALESCE(customer_first_name, ''), ' ', COALESCE(customer_last_name, '')));
  ELSE
    computed_company_name := 'Unbekannt';
  END IF;
  
  -- Create branding record with demo_name
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
  
  -- Log the creation
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
