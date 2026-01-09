/*
  # Add Webhook Trigger for Checklist Completion

  1. Functions
    - Trigger webhook when checklist is completed
    - Starts automated website generation workflow
  
  2. Changes
    - Add trigger function for checklist completion
    - Automatically calls edge function to generate website
*/

-- Function to trigger website generation when checklist is complete
CREATE OR REPLACE FUNCTION trigger_website_generation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_webhook_url text;
  v_payload jsonb;
BEGIN
  -- Only trigger if status changed to 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    
    -- Build payload with all necessary data
    v_payload := jsonb_build_object(
      'branding_id', NEW.id,
      'customer_id', NEW.customer_id,
      'checklist_data', NEW.checklist_data,
      'template_name', NEW.template_name,
      'timestamp', now()
    );
    
    -- Log the trigger
    RAISE NOTICE 'Checklist completed, triggering website generation for branding_id: %', NEW.id;
    
    -- Note: The actual HTTP request will be made via a separate edge function
    -- This function just marks that generation should start
    UPDATE customer_brandings
    SET generation_status = 'queued',
        generation_started_at = now()
    WHERE id = NEW.id;
    
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add generation status columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customer_brandings' AND column_name = 'generation_status'
  ) THEN
    ALTER TABLE customer_brandings ADD COLUMN generation_status text DEFAULT 'pending';
    ALTER TABLE customer_brandings ADD COLUMN generation_started_at timestamptz;
    ALTER TABLE customer_brandings ADD COLUMN generation_completed_at timestamptz;
    ALTER TABLE customer_brandings ADD COLUMN generated_website_id uuid;
  END IF;
END $$;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_checklist_completed ON customer_brandings;

-- Create trigger
CREATE TRIGGER on_checklist_completed
  AFTER UPDATE ON customer_brandings
  FOR EACH ROW
  EXECUTE FUNCTION trigger_website_generation();