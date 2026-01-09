-- Komplette Testbestellung für Kunden-Checkliste
-- Führe dieses Script in Supabase SQL Editor aus

-- 1. Test-Customer in auth.users erstellen (falls noch nicht vorhanden)
-- WICHTIG: Supabase auth.users benötigt einen echten User
-- Daher erstellen wir einen in der customers Tabelle mit bekannter ID

-- Test Customer ID (verwenden wir eine feste UUID)
DO $$
DECLARE
  test_customer_id uuid := '11111111-1111-1111-1111-111111111111';
  test_order_id uuid := '22222222-2222-2222-2222-222222222222';
BEGIN
  -- 2. Customer erstellen
  INSERT INTO customers (id, email, password_hash, first_name, last_name, created_at)
  VALUES (
    test_customer_id,
    'testkunde@webflix.de',
    '$2a$10$dummyhashfurtesting',
    'Max',
    'Mustermann',
    now()
  ) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name;

  -- 3. Test-Bestellung erstellen
  INSERT INTO webflix_orders (
    id,
    customer_id,
    customer_email,
    demo_name,
    payment_status,
    stripe_session_id,
    stripe_payment_intent,
    amount,
    checklist_completed,
    checklist_completed_at,
    created_at
  )
  VALUES (
    test_order_id,
    test_customer_id,
    'testkunde@webflix.de',
    'autoaufbereitung',
    'paid',
    'test_session_123',
    'test_pi_456',
    4900, -- 49€
    false, -- Checkliste noch NICHT ausgefüllt
    null,
    now()
  ) ON CONFLICT (id) DO UPDATE SET
    payment_status = EXCLUDED.payment_status,
    checklist_completed = false,
    checklist_completed_at = null;

  -- 4. Leere Checkliste erstellen (wird vom Kunden ausgefüllt)
  INSERT INTO order_checklists (
    id,
    order_id,
    customer_id,
    demo_name,
    status,
    checklist_data,
    created_at
  )
  VALUES (
    '33333333-3333-3333-3333-333333333333',
    test_order_id,
    test_customer_id,
    'autoaufbereitung',
    'pending',
    '{}'::jsonb,
    now()
  ) ON CONFLICT (id) DO UPDATE SET
    status = 'pending',
    checklist_data = '{}'::jsonb;

END $$;

-- Erfolgreiche Ausführung bestätigen
SELECT
  '✅ Test-Bestellung erfolgreich erstellt!' as message,
  '📧 Email: testkunde@webflix.de' as customer_email,
  '🆔 Order ID: 22222222-2222-2222-2222-222222222222' as order_id,
  '🔗 Checkliste URL: /customer/checklist?order=22222222-2222-2222-2222-222222222222' as checklist_url;

-- Zeige die erstellte Bestellung
SELECT
  wo.id as order_id,
  wo.demo_name,
  wo.customer_email,
  wo.payment_status,
  wo.checklist_completed,
  wo.created_at,
  oc.status as checklist_status,
  oc.id as checklist_id
FROM webflix_orders wo
LEFT JOIN order_checklists oc ON oc.order_id = wo.id
WHERE wo.id = '22222222-2222-2222-2222-222222222222';

-- WICHTIGER HINWEIS für den Test:
-- Da wir keinen echten auth.users Eintrag haben, musst du:
-- OPTION 1: Dich mit einem echten Account registrieren und dann die customer_id oben ersetzen
-- OPTION 2: Temporär die Auth-Prüfung in ChecklistPage.tsx deaktivieren
-- OPTION 3: Den Auth-User im Supabase Dashboard manuell erstellen
