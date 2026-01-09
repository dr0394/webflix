# Step-basiertes Checklist-System

## Übersicht

Das neue step-basierte Checklist-System strukturiert die Kunden-Checkliste in einzelne Steps, wobei jeder Step einer Website-Section entspricht. Der Kunde sieht rechts eine Live-Vorschau der Section und füllt links die passenden Formularfelder aus.

## Vorteile

1. **Bessere Übersicht**: Kunde sieht genau, welche Section er gerade bearbeitet
2. **Klare Zuordnung**: Jedes Feld ist einer Website-Section zugeordnet
3. **Live-Preview**: Rechts wird die Demo-Website mit Highlight-Overlay angezeigt
4. **Schrittweise Führung**: Kunde wird Step für Step durch die Checkliste geführt
5. **Änderungsbeschränkung**: Änderungen sind auf die Section beschränkt

## Struktur

### Template-Struktur in der Datenbank

```json
{
  "demo_name": "autoaufbereitung",
  "steps": [
    {
      "id": "hero_section",
      "title": "Hero Section",
      "section_name": "hero",
      "description": "Hauptüberschrift und Einstiegsbild Ihrer Website",
      "preview_component": "HeroSection",
      "fields": [
        {
          "id": "hero_title",
          "label": "Hauptüberschrift",
          "type": "text",
          "required": true,
          "maxLength": 80,
          "placeholder": "Professionelle Fahrzeugaufbereitung",
          "preview_target": "hero_title"
        }
      ]
    }
  ]
}
```

### Step-Eigenschaften

- **id**: Eindeutiger Identifier für den Step
- **title**: Angezeigter Titel des Steps
- **section_name**: Name der Website-Section (für Mapping)
- **description**: Beschreibung was in diesem Step konfiguriert wird
- **preview_component**: React-Komponente die in der Preview angezeigt wird
- **fields**: Array von Formularfeldern für diesen Step

### Field-Eigenschaften

Jedes Field hat zusätzlich zum normalen Schema:
- **preview_target**: ID der Highlight-Zone, die beim Fokus hervorgehoben wird

## Steps für Autoaufbereitung Demo

1. **Hero Section**
   - Hauptüberschrift
   - Unterüberschrift
   - Hero-Bild (optional)
   - CTA Button-Text

2. **Fahrzeugtypen**
   - Checkbox-Auswahl der unterstützten Fahrzeugtypen (3-6)
   - Zeigt Vehicle Cards Section

3. **Vorher/Nachher Bilder**
   - Upload von Vorher/Nachher Bildpaaren
   - 3-8 Bildpaare möglich
   - Zeigt Before/After Slider Section

4. **Arbeitsbeispiele Galerie**
   - Upload von 5-15 Galeriebildern
   - Galerie-Überschrift anpassbar
   - Zeigt Gallery Section

5. **Reinigungspakete & Services**
   - Service-Pakete definieren (min 3, max 6)
   - Paket-Name, Beschreibung, Preis, Features
   - Option Preise anzeigen/verbergen
   - Zeigt Services Section

6. **Kontaktdaten & Standort**
   - Firmenname
   - Vollständige Adresse
   - Telefon, E-Mail
   - Öffnungszeiten
   - WhatsApp (optional)
   - Zeigt Map/Contact Section

7. **Logo & Farben**
   - Logo-Upload
   - Haupt- und Sekundärfarbe
   - Zeigt Header/Branding

## Komponenten

### StepBasedChecklistForm.tsx

Hauptkomponente für die step-basierte Checkliste:
- Verwaltet Current Step State
- Rendert Formularfelder für aktuellen Step
- Zeigt Progress Bar
- Navigation zwischen Steps (Zurück/Weiter)
- Entwurf speichern Funktion
- Submit bei letztem Step

### HighlightOverlay.tsx

Zeigt die Demo-Website mit Highlight-Overlays:
- Iframe mit Demo-URL
- Highlight-Box über aktiven Feldern
- Tooltip mit Feld-Label
- Beschreibungstext unten
- Reagiert auf activeField Prop

### demoHighlightMappings.ts

Mapping zwischen Field IDs und Highlight-Zonen:
- Definiert Position und Größe der Highlight-Zonen
- Gruppiert nach sectionId
- Unterstützt alle Demos

## Usage

```tsx
import StepBasedChecklistForm from './StepBasedChecklistForm';

<StepBasedChecklistForm
  orderId={orderId}
  customerId={customerId}
  demoName="autoaufbereitung"
  onComplete={() => console.log('Completed!')}
/>
```

## Migration von altem System

Das alte section-basierte System (`ChecklistForm.tsx`) bleibt vorhanden für Backwards Compatibility. Das neue System verwendet:

1. **Template-Struktur**: `steps` statt `sections` im template_data
2. **Step-Navigation**: Linear durch Steps statt freie Section-Wahl
3. **Preview-Integration**: Immer sichtbare Preview rechts
4. **Field-Mapping**: Jedes Field hat preview_target für Highlights

## Erweiterung für andere Demos

Um das step-basierte System für andere Demos zu nutzen:

1. **Template erstellen**: SQL Migration mit steps-Struktur
2. **Highlight-Mapping**: Zonen in `demoHighlightMappings.ts` definieren
3. **Demo-Komponente**: Muss preview-Mode unterstützen
4. **Field IDs**: Müssen zu preview_target Mappings passen

## Best Practices

1. **Step-Anzahl**: Optimal sind 5-8 Steps pro Demo
2. **Field-Anzahl**: Max 3-6 Felder pro Step für gute UX
3. **Required Fields**: Nur wirklich notwendige Felder als required markieren
4. **Referenzbilder**: Pro Step optional Referenzbilder erlauben
5. **Image Limits**: Global max 20 Bilder über alle Steps
6. **Preview-Sync**: activeField sollte immer zum aktuellen Step passen

## Technische Details

### State Management
- `currentStep`: Index des aktuellen Steps (0-basiert)
- `formData`: Object mit allen ausgefüllten Feldern
- `referenceImages`: Object mit Referenzbildern pro Step
- `activeField`: ID des aktuell fokussierten Feldes

### Validierung
- Pro-Step Validierung beim "Weiter" Button
- Vollständige Validierung beim Submit
- Fehlermeldungen unter jeweiligem Feld

### Speicherung
- **Draft**: Speichert in order_checklists als pending
- **Submit**: Speichert in order_checklists als in_review
- **Branding**: Automatische Sync zu customer_brandings Tabelle

### Preview
- Iframe mit Demo-URL + ?preview=true Parameter
- Scaled zu 75% für bessere Übersicht
- Sticky positioning für immer sichtbare Preview
- Highlight-Overlay mit activeField synchronisiert
