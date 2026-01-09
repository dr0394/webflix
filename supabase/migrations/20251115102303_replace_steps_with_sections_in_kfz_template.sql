/*
  # Ersetze alte steps mit neuen sections (mit Screenshots)
  
  1. Änderungen
    - Kopiert sections zu steps (da Frontend steps erwartet)
    - Behält die neuen Felder mit Screenshots bei
    - Entfernt die alten steps ohne Screenshots
*/

UPDATE checklist_templates
SET template_data = jsonb_set(
  template_data,
  '{steps}',
  template_data->'sections'
)
WHERE demo_name = 'webflix-one-kfz' AND template_data ? 'sections';