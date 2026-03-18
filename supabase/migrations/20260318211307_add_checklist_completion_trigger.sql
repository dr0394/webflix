/*
  # Checklist Completion Trigger

  1. Function trigger_website_generation
  2. Trigger on customer_brandings update
*/

CREATE OR REPLACE FUNCTION trigger_website_generation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE customer_brandings
    SET generation_status = 'queued',
        generation_started_at = now()
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_checklist_completed ON customer_brandings;
CREATE TRIGGER on_checklist_completed
  AFTER UPDATE ON customer_brandings
  FOR EACH ROW
  EXECUTE FUNCTION trigger_website_generation();
