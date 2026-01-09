-- Test-Daten für Branding System
-- Führe dieses Script in Supabase SQL Editor aus

-- 1. Test-Customer erstellen
INSERT INTO customers (id, email, password_hash, first_name, last_name, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test-branding@webflix.de',
  'dummy_hash_not_real',
  'Test',
  'Branding User',
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name;

-- 2. Test-Order für Autoaufbereitung
INSERT INTO webflix_orders (
  id,
  customer_id,
  customer_email,
  demo_name,
  payment_status,
  checklist_completed,
  checklist_completed_at,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'test-branding@webflix.de',
  'autoaufbereitung',
  'paid',
  true,
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  payment_status = EXCLUDED.payment_status,
  checklist_completed = EXCLUDED.checklist_completed;

-- 3. Ausgefüllte Test-Checkliste
INSERT INTO order_checklists (
  id,
  order_id,
  customer_id,
  demo_name,
  status,
  completed_at,
  checklist_data,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'autoaufbereitung',
  'approved',
  now(),
  '{
    "basic_info": {
      "company_name": "AutoGlanz München",
      "location": "München",
      "zip_code": "80331",
      "phone": "+49 89 12345678",
      "email": "info@autoglanz-muenchen.de",
      "website_url": "https://old-website.de",
      "color_scheme": "premium_gold"
    },
    "services": {
      "main_services": [
        "innenraumreinigung",
        "aussenwasche",
        "polieren_versiegeln",
        "keramikversiegelung"
      ],
      "vehicle_types": [
        "pkw_kleinwagen",
        "suv_van",
        "luxusfahrzeuge"
      ]
    },
    "content": {
      "hero_title": "Premium Autopflege München",
      "hero_subtitle": "Ihr Fahrzeug verdient das Beste - Professionelle Aufbereitung seit 2010",
      "trust_badge_1": "500+ zufriedene Kunden",
      "trust_badge_2": "Termine innerhalb 48h",
      "trust_badge_3": "Faire Festpreise",
      "about_text": "Seit über 10 Jahren sind wir Ihr Partner für professionelle Fahrzeugaufbereitung in München. Unser Team aus erfahrenen Spezialisten garantiert höchste Qualität und setzt auf umweltfreundliche Produkte."
    },
    "contact": {
      "address_street": "Musterstraße 42",
      "address_city": "München",
      "address_zip": "80331",
      "opening_hours": "Mo-Fr: 8:00 - 18:00 Uhr\nSa: 9:00 - 14:00 Uhr\nSonntag: Geschlossen",
      "whatsapp": "+49 89 12345678",
      "instagram": "https://instagram.com/autoglanz.muenchen",
      "facebook": "https://facebook.com/autoglanzmuenchen"
    },
    "features": {
      "enabled_features": [
        "before_after_slider",
        "whatsapp_chat",
        "google_reviews",
        "gallery",
        "vehicle_selector"
      ]
    },
    "pricing": {
      "show_prices": "yes",
      "price_innenraum": "89",
      "price_aussen": "59",
      "price_komplett": "149"
    },
    "media": {
      "logo": null,
      "team_photo": null,
      "before_after_images": [],
      "work_examples": []
    }
  }'::jsonb,
  now()
) ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  completed_at = EXCLUDED.completed_at,
  checklist_data = EXCLUDED.checklist_data;

-- 4. Zweite Test-Checkliste (andere Demo)
INSERT INTO webflix_orders (
  id,
  customer_id,
  customer_email,
  demo_name,
  payment_status,
  checklist_completed,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000001',
  'test-branding@webflix.de',
  'physiotherapie',
  'paid',
  true,
  now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO order_checklists (
  id,
  order_id,
  customer_id,
  demo_name,
  status,
  completed_at,
  checklist_data,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000001',
  'physiotherapie',
  'pending',
  null,
  '{
    "basic_info": {
      "company_name": "Physiotherapie Schmidt",
      "location": "Berlin",
      "phone": "+49 30 98765432",
      "email": "info@physio-schmidt.de"
    },
    "content": {
      "hero_title": "Physiotherapie Berlin Mitte",
      "hero_subtitle": "Bewegung ist Leben - Ihre Gesundheit liegt uns am Herzen"
    }
  }'::jsonb,
  now()
) ON CONFLICT (id) DO NOTHING;

-- Erfolgreiche Ausführung bestätigen
SELECT
  'Test-Daten erfolgreich eingefügt!' as message,
  (SELECT count(*) FROM order_checklists WHERE status = 'approved') as approved_checklists,
  (SELECT count(*) FROM order_checklists WHERE status = 'pending') as pending_checklists;

-- Zeige die Test-Daten
SELECT
  oc.id,
  oc.demo_name,
  oc.status,
  wo.customer_email,
  oc.completed_at,
  jsonb_pretty(oc.checklist_data -> 'basic_info') as basic_info_preview
FROM order_checklists oc
JOIN webflix_orders wo ON wo.id = oc.order_id
ORDER BY oc.created_at DESC
LIMIT 5;
