# Kunden-Checkliste - Kompletter Test-Guide

## 🎯 Was ist die Kunden-Checkliste?

Nach dem Kauf einer Demo erhält der Kunde eine **individuelle Checkliste**, die er ausfüllen muss. Diese Checkliste sammelt alle Informationen, die wir für das Branding der Website brauchen.

## 📍 Die Checkliste-URL

```
/customer/checklist?order=ORDER_ID
```

**Beispiel:**
```
http://localhost:5173/customer/checklist?order=22222222-2222-2222-2222-222222222222
```

## 🧪 Test durchführen - EINFACHSTE METHODE

### Schritt 1: SQL-Script ausführen

Öffne Supabase SQL Editor und führe `test-customer-checklist.sql` aus.

Das Script erstellt:
- ✅ Test-Customer: `testkunde@webflix.de`
- ✅ Test-Order mit ID: `22222222-2222-2222-2222-222222222222`
- ✅ Leere Checkliste für Demo: `autoaufbereitung`

### Schritt 2: Auth temporär deaktivieren

Öffne `src/components/checklist/ChecklistPage.tsx` und kommentiere Zeilen 27-32 aus:

```typescript
// TEMPORÄR für Test auskommentieren:
/*
if (!user) {
  navigate('/customer/login');
  return;
}
*/
```

### Schritt 3: Checkliste öffnen

```
http://localhost:5173/customer/checklist?order=22222222-2222-2222-2222-222222222222
```

**Das war's! Die Checkliste sollte jetzt laden.** 🎉

## 📋 Was der Kunde sieht

### Header
```
┌─────────────────────────────────────────────────┐
│ 📦 Ihre Bestellung: Autoaufbereitung Website    │
│ ✅ Bezahlt | 📅 Bestellt am: 21.10.2025         │
│                                                  │
│ Fortschritt: [====------] 40%                   │
│ Sektion 2 von 7                                 │
└─────────────────────────────────────────────────┘
```

### Die 7 Sektionen

#### 📝 Sektion 1: Basis-Informationen
```
┌─────────────────────────────────────────┐
│ Firmenname *                            │
│ [________________________]              │
│                                         │
│ Hauptstandort (Stadt) *                 │
│ [________________________]              │
│                                         │
│ PLZ *                                   │
│ [________________________]              │
│                                         │
│ Telefonnummer *                         │
│ [________________________]              │
│                                         │
│ E-Mail *                                │
│ [________________________]              │
│                                         │
│ Bestehende Website (optional)           │
│ [________________________]              │
│                                         │
│ Bevorzugte Farbpalette *                │
│ ( ) Modern (Rot/Schwarz)                │
│ ( ) Premium (Gold/Schwarz)              │
│ ( ) Sportlich (Blau/Schwarz)           │
│ ( ) Elegant (Silber/Grau)              │
│ ( ) Frisch (Grün/Weiß)                 │
└─────────────────────────────────────────┘
```

#### 🔧 Sektion 2: Service-Auswahl
```
Hauptservices (min. 3, max. 6) *
[ ] Innenraumreinigung
[ ] Außenwäsche
[ ] Polieren & Versiegeln
[ ] Motorwäsche
[ ] Lederpflege
[ ] Komplettreinigung
[ ] Keramikversiegelung
[ ] Ozonbehandlung

Fahrzeugtypen (min. 3) *
[ ] PKW/Kleinwagen
[ ] SUV/Van
[ ] Transporter
[ ] Luxusfahrzeuge
[ ] Oldtimer
[ ] Motorräder
[ ] Wohnmobile
```

#### ✍️ Sektion 3: Text-Inhalte
```
Hero-Überschrift *                [0/60 Zeichen]
[_________________________________________]
Beispiel: "Fahrzeugaufbereitung auf höchstem Niveau"

Hero-Unterzeile *                [0/120 Zeichen]
[_________________________________________]
Beispiel: "Professionelle Autoreinigung für..."

Trust-Badge 1 *                  [0/25 Zeichen]
[_________________________________________]
Beispiel: "5/5 Sterne"

Trust-Badge 2 *                  [0/25 Zeichen]
[_________________________________________]
Beispiel: "Flexible Termine"

Trust-Badge 3 *                  [0/25 Zeichen]
[_________________________________________]
Beispiel: "Faire Preise"

Über uns Text *                  [0/300 Zeichen]
[_________________________________________]
[_________________________________________]
[_________________________________________]
Kurze Firmenbeschreibung...
```

#### 📍 Sektion 4: Kontakt & Standort
```
Straße & Hausnummer *
[_________________________________________]

Stadt *                          PLZ *
[___________________]  [____________]

Öffnungszeiten *
[_________________________________________]
[_________________________________________]
Beispiel: "Mo-Fr: 8:00 - 18:00 Uhr\nSa: 9:00 - 14:00 Uhr"

WhatsApp Nummer (optional)
[_________________________________________]

Instagram Link (optional)
[_________________________________________]

Facebook Link (optional)
[_________________________________________]
```

#### ⚙️ Sektion 5: Features & Add-ons
```
Aktivierte Features:
[ ] Before/After Slider anzeigen
[ ] Preisrechner einbinden
[ ] WhatsApp Chat-Button
[ ] Google Bewertungen anzeigen
[ ] Galerie mit Arbeitsbeispielen
[ ] Fahrzeugtyp-Auswahl interaktiv
```

#### 💰 Sektion 6: Preise (Optional)
```
Preise auf Website anzeigen? *
( ) Ja, Preise anzeigen
( ) Nein, Preis auf Anfrage

[Wenn "Ja" ausgewählt:]

Preis Innenraumreinigung (ab) €
[_________________________________________]

Preis Außenwäsche (ab) €
[_________________________________________]

Preis Komplettreinigung (ab) €
[_________________________________________]
```

#### 📸 Sektion 7: Bilder & Medien
```
Optional: Laden Sie eigene Bilder hoch.
Bei fehlenden Bildern verwenden wir professionelle Stock-Fotos.

┌─────────────────────────────────────────┐
│ Firmenlogo (max. 5MB)                   │
│ ┌─────────────────────┐                 │
│ │  📤 Datei wählen    │                 │
│ │  oder hierher ziehen│                 │
│ └─────────────────────┘                 │
│                                         │
│ Team-Foto (max. 5MB)                    │
│ ┌─────────────────────┐                 │
│ │  📤 Datei wählen    │                 │
│ └─────────────────────┘                 │
│                                         │
│ Vorher/Nachher Bilder (max. 5)          │
│ ┌─────────────────────┐                 │
│ │  📤 Dateien wählen  │                 │
│ └─────────────────────┘                 │
│                                         │
│ Hochgeladene Bilder:                    │
│ ┌──────┐ ┌──────┐                       │
│ │ 🖼️   │ │ 🖼️   │                       │
│ │  ❌  │ │  ❌  │                       │
│ └──────┘ └──────┘                       │
│                                         │
│ 📊 18/20 Bilder insgesamt hochgeladen   │
└─────────────────────────────────────────┘
```

### Navigation
```
┌─────────────────────────────────────────┐
│                                         │
│  [< Zurück]  [💾 Speichern]  [Weiter >]│
│                                         │
│  Zuletzt gespeichert: 14:32 Uhr        │
└─────────────────────────────────────────┘
```

Letzte Sektion:
```
┌─────────────────────────────────────────┐
│                                         │
│  [< Zurück]  [💾 Speichern]  [✅ Absenden]│
│                                         │
└─────────────────────────────────────────┘
```

## ✅ Nach dem Absenden

Erfolgs-Screen:
```
┌─────────────────────────────────────────┐
│                                         │
│              ✅                         │
│                                         │
│   Checkliste erfolgreich übermittelt!  │
│                                         │
│   Vielen Dank! Wir haben Ihre Angaben  │
│   erhalten und beginnen nun mit der    │
│   Erstellung Ihrer Website.            │
│                                         │
│   Sie erhalten eine E-Mail, sobald     │
│   Ihre Website fertig ist.             │
│                                         │
│   Geschätzte Bearbeitungszeit:         │
│   3-5 Werktage                         │
│                                         │
│   [Zum Dashboard →]                    │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Interaktive Features

### ✅ Live-Validierung
```
Firmenname *
[Auto Glan________________________] ✅

E-Mail *
[test@invalid________________________] ❌ Ungültige E-Mail
```

### 📊 Zeichenzähler
```
Hero-Überschrift *                [45/60 ✅]
[Premium Autopflege München_______]

Hero-Überschrift *                [65/60 ❌]
[Premium Autopflege München ist die beste...]
                                  ⚠️ Zu lang!
```

### 📤 Bild-Upload mit Vorschau
```
Team-Foto hochgeladen:
┌──────────────────┐
│                  │
│   🖼️ Vorschau   │
│                  │
│  team-photo.jpg  │
│      1.2 MB      │
│                  │
│      [❌ Löschen]│
└──────────────────┘

Wird hochgeladen...
█████████░░░░░░░░░ 45%
```

### 💾 Auto-Save
```
Automatisch gespeichert um 14:32 Uhr ✅
```

## 🔄 Workflow nach Absenden

1. **Kunde sendet Checkliste ab**
   - Status: `pending` → `in_review`
   - E-Mail an Admin
   - Bestätigungs-E-Mail an Kunde

2. **Admin prüft Checkliste**
   - Öffnet `/admin/orders`
   - Sieht alle Bestellungen
   - Klickt auf "Checkliste ansehen"

3. **Admin genehmigt**
   - Status: `in_review` → `approved`
   - Jetzt sichtbar in `/admin/branding`

4. **Admin branded die Demo**
   - Nutzt Branding Tool
   - 15-30 Minuten Arbeit
   - Website ist fertig!

5. **Kunde erhält fertige Website**
   - E-Mail mit Link zur fertigen Website
   - Zugang zum Customer Dashboard
   - Kann Änderungen anfordern

## 🐛 Troubleshooting

### Problem: "Keine Bestellung gefunden"

**Lösung:**
```sql
-- Prüfe ob Order existiert:
SELECT * FROM webflix_orders
WHERE id = '22222222-2222-2222-2222-222222222222';

-- Falls leer, führe test-customer-checklist.sql nochmal aus
```

### Problem: "Checkliste lädt nicht"

**Lösung:**
```sql
-- Prüfe ob Template existiert:
SELECT * FROM checklist_templates
WHERE demo_name = 'autoaufbereitung';

-- Falls leer, führe die Migration nochmal aus
```

### Problem: "Auth-Fehler"

**Lösung:**
Deaktiviere temporär die Auth-Prüfung in `ChecklistPage.tsx` (siehe Schritt 2 oben).

### Problem: "Bilder hochladen funktioniert nicht"

**Lösung:**
Imgur API ist limitiert. Entweder:
- Warte 1 Stunde
- Nutze einen anderen Imgur Client-ID
- Für Produktion: Eigenen Imgur Account erstellen

## 🎯 Test-Szenarien

### ✅ Test 1: Validierung
1. Lasse Pflichtfelder leer
2. Klicke "Weiter"
3. **Erwartung:** Rote Fehlermeldungen erscheinen

### ✅ Test 2: Speichern & Fortsetzen
1. Fülle erste Sektion aus
2. Klicke "Speichern"
3. Schließe Browser
4. Öffne URL erneut
5. **Erwartung:** Daten sind noch da

### ✅ Test 3: Bild-Upload
1. Lade ein Bild hoch
2. **Erwartung:** Vorschau erscheint
3. Klicke "Löschen"
4. **Erwartung:** Bild verschwindet

### ✅ Test 4: Komplettes Ausfüllen
1. Fülle alle Sektionen aus
2. Klicke "Absenden"
3. **Erwartung:** Erfolgs-Screen

### ✅ Test 5: Admin-Ansicht
1. Nach Absenden gehe zu `/admin/branding`
2. **Erwartung:** Checkliste ist NICHT sichtbar (Status: pending)
3. Setze Status auf `approved` in DB
4. Reload `/admin/branding`
5. **Erwartung:** Checkliste ist jetzt sichtbar!

## 🔗 Verbindung zum Branding System

```
Kunde füllt Checkliste aus
         ↓
Status: pending → in_review
         ↓
Admin prüft & genehmigt
         ↓
Status: approved
         ↓
Checkliste erscheint in /admin/branding
         ↓
Admin nutzt Branding Tool
         ↓
15-30 Minuten Arbeit
         ↓
Website fertig! 🎉
```

## 🚀 Production-URL

Nachdem du deployest:
```
https://deine-domain.de/customer/checklist?order=ORDER_ID
```

Diese URL wird automatisch per E-Mail an den Kunden gesendet nach dem Kauf.

---

**Von Kauf zu ausgefüllter Checkliste zu fertiger Website - alles automatisiert!** ⚡
