-- ============================================
-- TESTKAUF FÜR CHECKLISTE - KOMPLETT-ANLEITUNG
-- ============================================
-- Führe dieses Script in Supabase SQL Editor aus

-- SCHRITT 1: Auth-User erstellen
-- Kopiere diese Daten - du brauchst sie zum Login!
-- Email: testkunde@webflix.de
-- Passwort: TestPasswort123!

-- Erstelle den Auth-User mit einem festen Passwort
-- WICHTIG: Führe dies zuerst in einem separaten Query aus!

-- Option A: User mit Supabase Auth erstellen (EMPFOHLEN)
-- Gehe zu: Supabase Dashboard > Authentication > Users > Add User
-- Email: testkunde@webflix.de
-- Password: TestPasswort123!
-- Auto Confirm User: JA (aktivieren!)

-- Dann kopiere die generierte User ID und setze sie unten ein bei "DEINE_USER_ID_HIER"

-- ============================================
-- SCHRITT 2: Bestellung und Checkliste erstellen
-- ============================================

DO $$
DECLARE
  test_customer_id uuid := 'DEINE_USER_ID_HIER'; -- HIER DIE USER ID EINFÜGEN!
  test_order_id uuid := gen_random_uuid(); -- Neue Order ID
  v_order_id_text text;
BEGIN
  -- Speichere Order ID für Ausgabe
  v_order_id_text := test_order_id::text;

  -- Test-Bestellung erstellen
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
    'autoaufbereitung', -- Kannst du ändern: beauty, handwerk, security, etc.
    'paid',
    'test_session_' || test_order_id::text,
    'test_pi_' || test_order_id::text,
    4900, -- 49€
    false,
    null,
    now()
  );

  -- Leere Checkliste erstellen
  INSERT INTO order_checklists (
    order_id,
    customer_id,
    demo_name,
    status,
    checklist_data,
    created_at
  )
  VALUES (
    test_order_id,
    test_customer_id,
    'autoaufbereitung',
    'pending',
    '{}'::jsonb,
    now()
  );

  -- Ausgabe der wichtigen Informationen
  RAISE NOTICE '============================================';
  RAISE NOTICE '✅ TEST-KAUF ERFOLGREICH ERSTELLT!';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Order ID: %', test_order_id;
  RAISE NOTICE 'Checkliste URL: /customer/checklist?order=%', test_order_id;
  RAISE NOTICE '';
  RAISE NOTICE '🔐 Login-Daten:';
  RAISE NOTICE 'Email: testkunde@webflix.de';
  RAISE NOTICE 'Passwort: TestPasswort123!';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Nächste Schritte:';
  RAISE NOTICE '1. Gehe zu: http://localhost:5173/customer/login';
  RAISE NOTICE '2. Logge dich ein mit obigen Zugangsdaten';
  RAISE NOTICE '3. Du wirst automatisch weitergeleitet';
  RAISE NOTICE '============================================';

END $$;

-- Zeige alle Bestellungen für diesen Test-User
SELECT
  wo.id as order_id,
  wo.demo_name,
  wo.customer_email,
  wo.payment_status,
  wo.amount / 100.0 as price_euro,
  wo.checklist_completed,
  wo.created_at,
  oc.status as checklist_status,
  '/customer/checklist?order=' || wo.id::text as checklist_url
FROM webflix_orders wo
LEFT JOIN order_checklists oc ON oc.order_id = wo.id
WHERE wo.customer_email = 'testkunde@webflix.de'
ORDER BY wo.created_at DESC;
