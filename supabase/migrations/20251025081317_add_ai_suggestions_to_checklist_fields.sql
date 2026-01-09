/*
  # AI-Vorschläge zur Checkliste hinzufügen
  
  Aktiviert KI-generierte Textvorschläge für relevante Textfelder in der Checkliste.
  Kunden können mit einem Klick professionelle, auf ihr Business zugeschnittene Texte generieren.
*/

UPDATE checklist_templates 
SET template_data = jsonb_set(
  template_data,
  '{steps}',
  (
    SELECT jsonb_agg(
      jsonb_set(
        step,
        '{fields}',
        (
          SELECT jsonb_agg(
            CASE 
              WHEN field->>'id' IN ('business_name', 'hero_headline', 'hero_subheadline', 'about_text', 'cta_text') THEN
                field || '{"ai_suggestions": true}'::jsonb
              WHEN field->>'type' = 'textarea' AND field->>'id' NOT LIKE '%address%' THEN
                field || '{"ai_suggestions": true}'::jsonb
              ELSE
                field
            END
          )
          FROM jsonb_array_elements(step->'fields') AS field
        )
      )
    )
    FROM jsonb_array_elements(template_data->'steps') AS step
  )
)
WHERE demo_name = 'autoaufbereitung';
