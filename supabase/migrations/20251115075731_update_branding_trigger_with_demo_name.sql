/*
  # Update Branding Trigger to Copy demo_name
  
  1. Änderungen
    - Erweitert create_branding_on_order() Funktion
    - Kopiert demo_name automatisch von webflix_orders zu customer_brandings
    - Ermöglicht Template-spezifische Checklisten
    
  2. Wichtig
    - demo_name ist der Schlüssel zur Zuordnung:
      - checklist_templates verwendet demo_name
      - demoHighlightMappings verwendet demo_name
      - customer_brandings braucht demo_name für korrekte Darstellung
*/

-- Update die Funktion um demo_name zu kopieren
CREATE OR REPLACE FUNCTION create_branding_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token text;
  extracted_demo_name text;
BEGIN
  -- Generate secure token
  token := generate_onboarding_token();
  
  -- Extract demo_name from order template_data
  extracted_demo_name := NEW.template_data->>'demo_name';

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
    NEW.customer_data->>'email',
    NEW.customer_data->>'phone',
    COALESCE(NEW.customer_data->>'company', NEW.customer_data->>'firstName' || ' ' || NEW.customer_data->>'lastName')
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

-- Kommentar
COMMENT ON FUNCTION create_branding_on_order() IS 'Automatically creates customer_brandings record when order is placed, including demo_name for template mapping';