# Calendly Tracking Integration

## Übersicht

Das Calendly-Tracking wurde implementiert, um Buchungen über Calendly-iFrames in Google Analytics zu erfassen. Da man im Calendly-iFrame selbst kein GTM einbauen kann, nutzen wir die postMessage-API von Calendly.

## Implementierung

### 1. Analytics Funktion (`src/lib/analytics.ts`)

Zwei neue Funktionen wurden hinzugefügt:

#### `trackCalendlyBooking()`
Pusht ein `calendly_booking` Event in den dataLayer mit folgenden Parametern:
- `calendly_event_name`: Name des gebuchten Events
- `calendly_event_type`: Typ des Events
- `calendly_start_time`: Startzeit
- `calendly_end_time`: Endzeit
- `calendly_invitee_email`: E-Mail des Buchenden
- `calendly_invitee_name`: Name des Buchenden
- `calendly_invitee_uri`: URI des Invitees
- `calendly_event_uri`: URI des Events

Zusätzlich wird automatisch ein `generate_lead` Event mit folgenden Werten getriggert:
- `lead_source: 'Calendly'`
- `lead_type: 'Booking'`

#### `initCalendlyTracking()`
Initialisiert den postMessage-Listener, der auf Nachrichten von Calendly horcht.

**Unterstützte Calendly Events:**
- ✅ `calendly.event_scheduled` → Triggert `calendly_booking` + `generate_lead`
- ✅ `calendly.profile_page_viewed` → Triggert `calendly_profile_viewed`
- ✅ `calendly.date_and_time_selected` → Triggert `calendly_datetime_selected`
- ✅ `calendly.event_type_viewed` → Triggert `calendly_event_type_viewed`

### 2. App Integration (`src/App.tsx`)

Die `CalendlyTrackingInitializer` Komponente wurde hinzugefügt und startet den Listener beim App-Start.

```tsx
<Router>
  <ScrollToTop />
  <PreviewModeHandler />
  <CalendlyTrackingInitializer />
  <Routes>
    ...
  </Routes>
</Router>
```

## Verwendung im GTM

### Trigger einrichten

1. **Trigger für Calendly Buchung:**
   - Typ: Benutzerdefiniertes Ereignis
   - Ereignisname: `calendly_booking`

2. **Trigger für Lead-Conversion:**
   - Typ: Benutzerdefiniertes Ereignis
   - Ereignisname: `generate_lead`
   - Bedingung: `lead_source` = `Calendly`

### Variablen für Calendly-Daten

Erstelle folgende DataLayer-Variablen in GTM:

| Variable Name | DataLayer-Variablenname |
|--------------|------------------------|
| Calendly Event Name | calendly_event_name |
| Calendly Event Type | calendly_event_type |
| Calendly Start Time | calendly_start_time |
| Calendly End Time | calendly_end_time |
| Calendly Invitee Email | calendly_invitee_email |
| Calendly Invitee Name | calendly_invitee_name |

### GA4 Event Tag erstellen

**Tag-Typ:** Google Analytics: GA4-Ereignis

**Konfigurationstag:** Deine GA4-Konfiguration

**Ereignisname:** calendly_booking

**Ereignisparameter:**
- `event_name`: {{Calendly Event Name}}
- `event_type`: {{Calendly Event Type}}
- `start_time`: {{Calendly Start Time}}
- `end_time`: {{Calendly End Time}}
- `invitee_email`: {{Calendly Invitee Email}}
- `invitee_name`: {{Calendly Invitee Name}}

**Trigger:** Calendly Booking Event

## Testing

### 1. Console-Logs prüfen

Wenn ein Calendly-Event eintrifft, solltest du folgende Logs sehen:

```
[Calendly] Tracking initialized
[Calendly] Event scheduled: {event: "calendly.event_scheduled", payload: {...}}
[GA4 Analytics] calendly_booking {...}
[GA4 Analytics] generate_lead {...}
```

### 2. GTM Preview Mode

1. Aktiviere GTM Preview Mode
2. Öffne eine Seite mit Calendly-iFrame
3. Führe eine Test-Buchung durch
4. Prüfe in GTM Preview:
   - Event `calendly_booking` erscheint
   - Event `generate_lead` erscheint
   - Alle DataLayer-Variablen sind korrekt gefüllt

### 3. GA4 DebugView

1. Öffne GA4 → Configure → DebugView
2. Führe eine Test-Buchung durch
3. Prüfe, dass die Events ankommen

## Calendly-iFrame Integration

Stelle sicher, dass deine Calendly-iFrames korrekt eingebunden sind:

```html
<iframe
  src="https://calendly.com/dein-link"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>
```

Oder mit Calendly Widget:

```html
<div
  class="calendly-inline-widget"
  data-url="https://calendly.com/dein-link"
  style="min-width:320px;height:630px;">
</div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
```

## Conversion-Tracking in Google Ads

Wenn du das `generate_lead` Event für Google Ads nutzen möchtest:

1. Gehe zu Google Ads → Tools → Conversions
2. Erstelle eine neue Conversion-Aktion
3. Quelle: Website
4. Kategorie: Lead
5. Conversion-Name: "Calendly Booking"
6. Wert: Optional (aktuell 0)
7. Zählmethode: "Einmal pro Klick"

Verknüpfe diese Conversion dann mit dem `generate_lead` Event in GTM.

## Troubleshooting

### Events werden nicht getriggert

**Problem:** Keine Events im dataLayer

**Lösung:**
1. Prüfe Console auf `[Calendly] Tracking initialized`
2. Prüfe, ob der iFrame von `https://calendly.com` kommt
3. Überprüfe, ob postMessage-Events ankommen:
   ```js
   window.addEventListener('message', (e) => console.log('Message:', e.origin, e.data));
   ```

### Falsche Daten im dataLayer

**Problem:** Daten sind `undefined` oder `null`

**Ursache:** Calendly-Payload-Struktur hat sich geändert

**Lösung:** Prüfe die Console-Logs und passe die Payload-Pfade in `analytics.ts` an.

### Events nicht in GA4

**Problem:** Events in GTM Preview, aber nicht in GA4

**Lösung:**
1. Prüfe GA4-Konfiguration in GTM
2. Verifiziere Measurement-ID
3. Warte 24-48h auf Datenverarbeitung (oder nutze DebugView für Echtzeit)

## Weitere Informationen

- [Calendly Events Documentation](https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options)
- [GA4 Event Measurement](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GTM DataLayer](https://developers.google.com/tag-platform/tag-manager/datalayer)
