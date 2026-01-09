# Branding System Testen

## Option 1: Mit Test-Daten (Schnellstart)

### Schritt 1: Test-Checkliste in DB einfügen

Öffne Supabase SQL Editor und führe aus:

```sql
-- 1. Test-Customer erstellen (falls noch nicht vorhanden)
INSERT INTO customers (id, email, password_hash, first_name, last_name)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  'dummy_hash',
  'Test',
  'Kunde'
) ON CONFLICT (id) DO NOTHING;

-- 2. Test-Order erstellen
INSERT INTO webflix_orders (
  id,
  customer_id,
  customer_email,
  demo_name,
  payment_status,
  checklist_completed
)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  'autoaufbereitung',
  'paid',
  true
) ON CONFLICT (id) DO NOTHING;

-- 3. Test-Checkliste mit ausgefüllten Daten erstellen
INSERT INTO order_checklists (
  id,
  order_id,
  customer_id,
  demo_name,
  status,
  completed_at,
  checklist_data
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
      "color_scheme": "premium_gold"
    },
    "content": {
      "hero_title": "Premium Autopflege München",
      "hero_subtitle": "Ihr Fahrzeug verdient das Beste - Professionelle Aufbereitung seit 2010",
      "trust_badge_1": "500+ zufriedene Kunden",
      "trust_badge_2": "Termine innerhalb 48h",
      "trust_badge_3": "Faire Festpreise",
      "about_text": "Seit über 10 Jahren sind wir Ihr Partner für professionelle Fahrzeugaufbereitung in München. Unser Team aus erfahrenen Spezialisten garantiert höchste Qualität."
    },
    "services": {
      "main_services": ["innenraumreinigung", "aussenwasche", "polieren_versiegeln", "keramikversiegelung"],
      "vehicle_types": ["pkw_kleinwagen", "suv_van", "luxusfahrzeuge"]
    },
    "contact": {
      "address_street": "Musterstraße 42",
      "address_city": "München",
      "address_zip": "80331",
      "opening_hours": "Mo-Fr: 8:00 - 18:00 Uhr\nSa: 9:00 - 14:00 Uhr",
      "whatsapp": "+49 89 12345678",
      "instagram": "https://instagram.com/autoglanz.muenchen"
    },
    "features": {
      "enabled_features": ["before_after_slider", "whatsapp_chat", "google_reviews", "gallery"]
    },
    "pricing": {
      "show_prices": "yes",
      "price_innenraum": "89",
      "price_aussen": "59",
      "price_komplett": "149"
    }
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;
```

### Schritt 2: Branding Tool öffnen

```bash
# Im Browser öffnen:
http://localhost:5173/admin/branding
```

### Schritt 3: Test-Checkliste auswählen

Du siehst jetzt:
- Demo: `autoaufbereitung`
- Kunde: `test@example.com`
- Status: `approved`

Klicke darauf!

### Schritt 4: Component-Mapping ansehen

Du siehst jetzt alle Components mit ihren Feldern:

```
📁 Landing.tsx - Hero Section
   ├─ hero_title: "Premium Autopflege München" [COPY]
   ├─ hero_subtitle: "Ihr Fahrzeug verdient das Beste..." [COPY]
   ├─ trust_badge_1: "500+ zufriedene Kunden" [COPY]
   ├─ trust_badge_2: "Termine innerhalb 48h" [COPY]
   └─ trust_badge_3: "Faire Festpreise" [COPY]

📁 Header.tsx - Navigation
   ├─ company_name: "AutoGlanz München" [COPY]
   └─ phone: "+49 89 12345678" [COPY]

📁 Footer.tsx - Footer
   ├─ company_name: "AutoGlanz München" [COPY]
   ├─ address_street: "Musterstraße 42" [COPY]
   ├─ address_city: "München" [COPY]
   ├─ address_zip: "80331" [COPY]
   ├─ email: "info@autoglanz-muenchen.de" [COPY]
   ├─ phone: "+49 89 12345678" [COPY]
   └─ opening_hours: "Mo-Fr: 8:00 - 18:00..." [COPY]
```

### Schritt 5: Werte kopieren und testen

1. Klicke auf einen [COPY] Button
2. Der Wert ist jetzt in deiner Zwischenablage
3. Du siehst auch genau WO im Code das ersetzt werden muss

## Option 2: Echten Workflow testen

### Schritt 1: Als Kunde registrieren

```bash
http://localhost:5173/customer/login
```

- Registriere dich mit echter Email
- Merke dir die Credentials

### Schritt 2: Order erstellen

```sql
-- In Supabase SQL Editor:
INSERT INTO webflix_orders (
  customer_id,
  customer_email,
  demo_name,
  payment_status
)
VALUES (
  'DEINE_CUSTOMER_ID',  -- Aus auth.users Tabelle
  'deine@email.com',
  'autoaufbereitung',
  'paid'
)
RETURNING id;
```

### Schritt 3: Checkliste ausfüllen

```bash
http://localhost:5173/customer/checklist
```

Fülle alle Felder aus!

### Schritt 4: Checkliste als Admin genehmigen

```sql
-- Status auf approved setzen
UPDATE order_checklists
SET
  status = 'approved',
  completed_at = now()
WHERE customer_id = 'DEINE_CUSTOMER_ID';
```

### Schritt 5: Branding Tool nutzen

```bash
http://localhost:5173/admin/branding
```

Deine ausgefüllte Checkliste erscheint jetzt!

## Was du testen solltest

### ✅ Funktionalität
- [ ] Tool lädt Checklisten
- [ ] Checkliste auswählen funktioniert
- [ ] Component-Ansicht wird angezeigt
- [ ] Copy-Buttons funktionieren
- [ ] Werte sind korrekt aus Checkliste
- [ ] Markdown-Download funktioniert

### ✅ Mapping
- [ ] Alle Felder haben korrekte Werte
- [ ] Search Patterns sind eindeutig
- [ ] Instructions sind klar
- [ ] File Paths stimmen

### ✅ Workflow
- [ ] Kannst du schnell Werte kopieren?
- [ ] Sind die Anweisungen verständlich?
- [ ] Fehlt etwas?
- [ ] Ist die Reihenfolge logisch?

## Debugging

### Problem: Keine Checklisten sichtbar

```sql
-- Prüfe ob Checklisten existieren:
SELECT * FROM order_checklists;

-- Prüfe Status:
SELECT id, demo_name, status, completed_at
FROM order_checklists;

-- Nur approved Checklisten werden angezeigt!
UPDATE order_checklists
SET status = 'approved'
WHERE status = 'pending';
```

### Problem: Mapping wird nicht angezeigt

```javascript
// In Browser Console:
import { demoComponentMaps } from './src/lib/checklistToComponentMapper.ts';
console.log(demoComponentMaps.autoaufbereitung);
```

### Problem: Werte sind leer

```sql
-- Prüfe checklist_data:
SELECT checklist_data
FROM order_checklists
WHERE demo_name = 'autoaufbereitung';

-- Sollte JSON mit sections zurückgeben
```

## Quick Test Commands

### Terminal 1: Dev Server starten
```bash
npm run dev
```

### Terminal 2: Supabase prüfen
```bash
# Test-Daten einfügen (siehe oben)
# Dann prüfen:
npx supabase db dump --data-only
```

### Browser:
```
1. http://localhost:5173/admin/branding
2. DevTools öffnen (F12)
3. Console Tab öffnen
4. Auf Fehler achten
```

## Erwartetes Ergebnis

Wenn alles funktioniert siehst du:

1. **Liste der Checklisten** mit:
   - Demo-Name
   - Kunden-Email
   - Datum

2. **Nach Auswahl**: Component-basierte Ansicht mit:
   - Klaren Sections
   - Allen Feldern
   - Such- und Ersetzungsmustern
   - Copy-Buttons

3. **Funktionierend**:
   - Copy-to-Clipboard
   - Markdown-Export
   - Zurück-Button

## Nächste Schritte nach Test

Wenn Test erfolgreich:

1. **Mehr Demos mappen**:
   - Physiotherapie
   - Elektriker
   - Metzgerei
   - Etc.

2. **Mapping verfeinern**:
   - Mehr Components hinzufügen
   - Präzisere Instructions
   - Edge Cases abdecken

3. **Automatisierung**:
   - Automatisches Ersetzen
   - Code-Generation
   - Live-Preview

## Support

Bei Problemen:
1. Browser Console checken
2. Supabase Logs checken
3. `BRANDING_SYSTEM.md` lesen
4. Test-SQL nochmal ausführen
