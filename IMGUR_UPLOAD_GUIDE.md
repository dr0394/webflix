# Imgur Upload System - Anleitung

## Übersicht

Das Checklisten-System unterstützt jetzt direkten Imgur-Upload für Bilder. Kunden können Bilder hochladen und die URLs werden automatisch gespeichert.

## Wie es funktioniert

### 1. Neuer Feld-Typ: `image`

In Checklist-Templates kannst du jetzt den Typ `image` verwenden:

```json
{
  "id": "logo",
  "type": "image",
  "label": "Logo",
  "required": true,
  "placeholder": "Laden Sie Ihr Logo hoch"
}
```

### 2. Upload-Prozess

1. **Kunde klickt auf "Bild hochladen (Imgur)"**
2. **Datei-Dialog öffnet sich**
3. **Kunde wählt Bild aus**
4. **Bild wird zu Imgur hochgeladen**
5. **URL wird automatisch in der Checkliste gespeichert**
6. **Vorschau wird angezeigt mit der vollständigen URL**

### 3. Gespeicherte Daten

Die Imgur-URL wird direkt im `checklist_data` JSONB-Feld gespeichert:

```json
{
  "logo": "https://i.imgur.com/abc123.png",
  "teamPhoto": "https://i.imgur.com/xyz456.jpg"
}
```

### 4. Mehrere Bilder

Das System unterstützt auch mehrere Bilder pro Feld:

```json
{
  "galleryImages": [
    "https://i.imgur.com/img1.jpg",
    "https://i.imgur.com/img2.jpg",
    "https://i.imgur.com/img3.jpg"
  ]
}
```

## Beispiel-Template mit Bild-Upload

```json
{
  "sections": [
    {
      "title": "Branding & Design",
      "description": "Laden Sie Ihre Branding-Materialien hoch",
      "fields": [
        {
          "id": "logo",
          "type": "image",
          "label": "Firmen-Logo",
          "required": true
        },
        {
          "id": "heroImage",
          "type": "image",
          "label": "Haupt-Hero-Bild",
          "required": true
        },
        {
          "id": "galleryImages",
          "type": "image",
          "label": "Galerie-Bilder",
          "required": false
        }
      ]
    },
    {
      "title": "Team",
      "fields": [
        {
          "id": "teamPhotos",
          "type": "image",
          "label": "Team-Fotos",
          "required": false
        }
      ]
    }
  ]
}
```

## Admin-Ansicht

Wenn ein Admin die Checkliste ansieht, sieht er:

1. **Vorschau-Bild** - Thumbnail des hochgeladenen Bildes
2. **Vollständige URL** - Klickbar zum Kopieren
3. **Verwendbar in Deployment** - URL kann direkt in Website-Code eingefügt werden

## Vorteile

✅ **Keine Server-Kosten** - Imgur hostet die Bilder kostenlos
✅ **Schneller Upload** - Direkt zu Imgur, kein Server-Upload nötig
✅ **Permanente URLs** - Bilder bleiben verfügbar
✅ **Vorschau** - Kunde sieht sofort das hochgeladene Bild
✅ **Copy-Paste** - URL kann direkt kopiert werden
✅ **Deployment-Ready** - URLs sind sofort verwendbar

## Integration in Deployment Package

Die Imgur-URLs werden automatisch in das Deployment Package aufgenommen:

```markdown
Suchen & Ersetzen:

1. Logo
   - Suche: `/assets/logo.png`
   - Ersetze: `https://i.imgur.com/abc123.png`

2. Hero Image
   - Suche: `/assets/hero.jpg`
   - Ersetze: `https://i.imgur.com/xyz456.jpg`
```

## SQL-Abfrage für Bild-URLs

```sql
-- Alle Bild-URLs eines Kunden abrufen
SELECT
  order_id,
  checklist_data->>'logo' as logo_url,
  checklist_data->>'heroImage' as hero_url,
  checklist_data->'galleryImages' as gallery_urls
FROM order_checklists
WHERE customer_id = 'xxx';
```

## Verwendung im Code

```typescript
// Checklisten-Daten abrufen
const { data: checklist } = await supabase
  .from('order_checklists')
  .select('checklist_data')
  .eq('order_id', orderId)
  .single();

// Bild-URLs extrahieren
const logoUrl = checklist.checklist_data.logo;
const heroUrl = checklist.checklist_data.heroImage;
const galleryUrls = checklist.checklist_data.galleryImages;

// In Website-Code verwenden
<img src={logoUrl} alt="Logo" />
<img src={heroUrl} alt="Hero" />
{galleryUrls?.map(url => <img key={url} src={url} />)}
```

## API-Details

- **Imgur API Endpoint**: `https://api.imgur.com/3/image`
- **Client ID**: `4e382097c8f1e65` (öffentlicher Client)
- **Upload-Methode**: POST mit FormData
- **Akzeptierte Formate**: JPG, PNG, GIF, WebP
- **Max. Dateigröße**: 10MB
- **Rate Limit**: 50 Uploads/Stunde (öffentlicher Client)

## Fehlerbehebung

### Upload schlägt fehl
- Prüfe Internetverbindung
- Stelle sicher, dass Bild < 10MB
- Stelle sicher, dass Format unterstützt wird (JPG, PNG)

### URL funktioniert nicht
- Prüfe ob URL korrekt kopiert wurde
- Imgur-URLs sind permanent, sollten immer funktionieren

### Bild wird nicht angezeigt
- Prüfe CORS-Einstellungen
- Imgur erlaubt Hotlinking, Bilder sollten überall funktionieren
