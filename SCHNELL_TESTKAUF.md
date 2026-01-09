# 🚀 Schnell-Anleitung: Testkauf für Checkliste

## Option 1: Mit Supabase Dashboard (EMPFOHLEN - 2 Minuten)

### Schritt 1: User erstellen
1. Öffne Supabase Dashboard
2. Gehe zu: **Authentication** > **Users**
3. Klicke: **Add User** (rechts oben, grüner Button)
4. Trage ein:
   - **Email**: `testkunde@webflix.de`
   - **Password**: `TestPasswort123!`
   - **✅ Auto Confirm User**: AKTIVIEREN!
5. Klicke: **Create User**
6. **Kopiere die User ID** (z.B. `abc123-def456-...`)

### Schritt 2: SQL-Script ausführen
1. Öffne: **SQL Editor** in Supabase
2. Füge dieses Script ein:

```sql
-- Setze hier deine User ID ein!
DO $$
DECLARE
  my_user_id uuid := 'HIER_DEINE_USER_ID'; -- z.B. 'abc123-def456-...'
  new_order_id uuid := gen_random_uuid();
BEGIN
  -- Bestellung erstellen
  INSERT INTO webflix_orders (
    id,
    customer_id,
    customer_email,
    demo_name,
    payment_status,
    amount,
    checklist_completed
  )
  VALUES (
    new_order_id,
    my_user_id,
    'testkunde@webflix.de',
    'autoaufbereitung',
    'paid',
    4900,
    false
  );

  -- Checkliste erstellen
  INSERT INTO order_checklists (
    order_id,
    customer_id,
    demo_name,
    status,
    checklist_data
  )
  VALUES (
    new_order_id,
    my_user_id,
    'autoaufbereitung',
    'pending',
    '{}'::jsonb
  );

  RAISE NOTICE '✅ Testkauf erstellt!';
  RAISE NOTICE 'Order ID: %', new_order_id;
  RAISE NOTICE 'URL: /customer/checklist?order=%', new_order_id;
END $$;

-- Zeige die Order ID
SELECT
  id as order_id,
  '/customer/checklist?order=' || id::text as url
FROM webflix_orders
WHERE customer_email = 'testkunde@webflix.de'
ORDER BY created_at DESC
LIMIT 1;
```

3. Klicke: **Run**
4. **Kopiere die Order-ID** aus dem Ergebnis

### Schritt 3: Einloggen und Checkliste öffnen
1. Gehe zu: `http://localhost:5173/customer/login`
2. Login:
   - Email: `testkunde@webflix.de`
   - Passwort: `TestPasswort123!`
3. Nach Login öffne: `http://localhost:5173/customer/checklist?order=DEINE_ORDER_ID`

**FERTIG!** 🎉

---

## Option 2: Komplett per SQL (mit Auth.Admin - Fortgeschritten)

Wenn du Admin-Rechte hast, kannst du alles auf einmal erstellen:

```sql
-- Alles in einem!
DO $$
DECLARE
  v_user_id uuid;
  v_order_id uuid := gen_random_uuid();
  v_error_message text;
BEGIN
  -- Versuche User zu erstellen
  BEGIN
    -- User erstellen mit Supabase Auth Admin
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role
    )
    VALUES (
      gen_random_uuid(),
      'testkunde@webflix.de',
      crypt('TestPasswort123!', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      false,
      'authenticated'
    )
    RETURNING id INTO v_user_id;

    RAISE NOTICE '✅ User erstellt: %', v_user_id;

  EXCEPTION
    WHEN unique_violation THEN
      -- User existiert bereits, hole ID
      SELECT id INTO v_user_id
      FROM auth.users
      WHERE email = 'testkunde@webflix.de';

      RAISE NOTICE 'ℹ️ User existiert bereits: %', v_user_id;
  END;

  -- Bestellung erstellen
  INSERT INTO webflix_orders (
    id,
    customer_id,
    customer_email,
    demo_name,
    payment_status,
    amount,
    checklist_completed
  )
  VALUES (
    v_order_id,
    v_user_id,
    'testkunde@webflix.de',
    'autoaufbereitung',
    'paid',
    4900,
    false
  );

  -- Checkliste erstellen
  INSERT INTO order_checklists (
    order_id,
    customer_id,
    demo_name,
    status,
    checklist_data
  )
  VALUES (
    v_order_id,
    v_user_id,
    'autoaufbereitung',
    'pending',
    '{}'::jsonb
  );

  RAISE NOTICE '';
  RAISE NOTICE '============================================';
  RAISE NOTICE '✅ TESTKAUF ERFOLGREICH!';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Email: testkunde@webflix.de';
  RAISE NOTICE 'Passwort: TestPasswort123!';
  RAISE NOTICE 'Order ID: %', v_order_id;
  RAISE NOTICE 'URL: /customer/checklist?order=%', v_order_id;
  RAISE NOTICE '============================================';

EXCEPTION
  WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_error_message = MESSAGE_TEXT;
    RAISE NOTICE '❌ Fehler: %', v_error_message;
    RAISE NOTICE 'Nutze stattdessen Option 1 (Dashboard)';
END $$;

-- Zeige Ergebnis
SELECT
  wo.id as order_id,
  wo.customer_email,
  wo.demo_name,
  wo.payment_status,
  '/customer/checklist?order=' || wo.id::text as checklist_url
FROM webflix_orders wo
WHERE wo.customer_email = 'testkunde@webflix.de'
ORDER BY wo.created_at DESC
LIMIT 1;
```

---

## 🔍 Troubleshooting

### Problem: "User nicht gefunden" beim Login

**Lösung:**
```sql
-- Prüfe ob User existiert
SELECT id, email, email_confirmed_at
FROM auth.users
WHERE email = 'testkunde@webflix.de';
```

Falls leer → User über Dashboard erstellen (Option 1)

### Problem: "Bestellung nicht gefunden"

**Lösung:**
```sql
-- Prüfe alle Orders
SELECT * FROM webflix_orders
WHERE customer_email = 'testkunde@webflix.de';
```

Falls leer → Script nochmal ausführen

### Problem: "Zugriff verweigert"

**Lösung:**
Prüfe ob `customer_id` in Order mit der Auth `user.id` übereinstimmt:

```sql
SELECT
  wo.customer_id as order_customer_id,
  au.id as auth_user_id,
  wo.customer_id = au.id as ids_match
FROM webflix_orders wo
JOIN auth.users au ON au.email = wo.customer_email
WHERE wo.customer_email = 'testkunde@webflix.de';
```

Falls `ids_match = false`, dann:
```sql
UPDATE webflix_orders
SET customer_id = (SELECT id FROM auth.users WHERE email = 'testkunde@webflix.de')
WHERE customer_email = 'testkunde@webflix.de';
```

---

## 🎯 Schnell-Check: Ist alles richtig?

```sql
-- Vollständige Übersicht
SELECT
  'Auth User' as typ,
  au.id,
  au.email,
  au.email_confirmed_at::text as confirmed,
  NULL as order_id,
  NULL as checklist_url
FROM auth.users au
WHERE au.email = 'testkunde@webflix.de'

UNION ALL

SELECT
  'Order' as typ,
  wo.customer_id as id,
  wo.customer_email as email,
  wo.payment_status as confirmed,
  wo.id::text as order_id,
  '/customer/checklist?order=' || wo.id::text as checklist_url
FROM webflix_orders wo
WHERE wo.customer_email = 'testkunde@webflix.de'

UNION ALL

SELECT
  'Checklist' as typ,
  oc.customer_id as id,
  NULL as email,
  oc.status as confirmed,
  oc.order_id::text as order_id,
  NULL as checklist_url
FROM order_checklists oc
JOIN webflix_orders wo ON wo.id = oc.order_id
WHERE wo.customer_email = 'testkunde@webflix.de';
```

**Erwartetes Ergebnis:** 3 Zeilen (Auth User, Order, Checklist)

---

## 📱 Login-Daten (zum Kopieren)

```
Email: testkunde@webflix.de
Passwort: TestPasswort123!
```

## 🔗 URLs

### Lokale Development:
- Login: `http://localhost:5173/customer/login`
- Dashboard: `http://localhost:5173/customer/dashboard`
- Checkliste: `http://localhost:5173/customer/checklist?order=DEINE_ORDER_ID`

### Production:
- Login: `https://webflix.info/customer/login`
- Dashboard: `https://webflix.info/customer/dashboard`
- Checkliste: `https://webflix.info/customer/checklist?order=DEINE_ORDER_ID`

---

**Von Testkauf zu ausgefüllter Checkliste in unter 3 Minuten!** ⚡
