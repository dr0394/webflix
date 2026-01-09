# Schnelles Demo-Branding System

## Problem gelöst ✅

Das neue System löst das Hauptproblem: **Wie können wir Checklisten-Antworten schnellstmöglich und präzise in die Demo-Components übertragen?**

## Lösung: 3-Schritt System

### 1. Präzise Checklisten (bereits vorhanden)
Jede Demo hat eine exakt zugeschnittene Checkliste in `checklist_templates`.

### 2. Component-zu-Feld-Mapping (NEU)
Datei: `src/lib/checklistToComponentMapper.ts`

Definiert für jede Demo **exakt**:
- Welcher Component welche Felder benötigt
- Wo im Code (Zeile, Search-Pattern)
- Was genau ersetzt werden muss
- Klare Anweisungen

### 3. Branding Tool (NEU)
Route: `/admin/branding`
Component: `src/components/admin/ChecklistBrandingTool.tsx`

Zeigt dem Admin:
```
📁 Landing.tsx - Hero Section
   ├─ hero_title
   │  ├─ Suchen: "Fahrzeugaufbereitung"
   │  ├─ Ersetzen: "Premium Autopflege München" [COPY]
   │
   ├─ hero_subtitle
   │  ├─ Suchen: "Professionelle Autoreinigung"
   │  ├─ Ersetzen: "Ihr Auto in Bestform" [COPY]
```

## Workflow für Admin

### Schritt 1: Tool öffnen
```
http://localhost:5173/admin/branding
```

### Schritt 2: Checkliste wählen
Das Tool lädt automatisch alle **genehmigten** Checklisten (Status: approved).

### Schritt 3: Component-Ansicht nutzen
Für jeden Component siehst du:
- **Welches Feld** (z.B. `hero_title`)
- **Wo im Code** (z.B. Landing.tsx Zeile 155)
- **Was suchen** (alter Text)
- **Was ersetzen** (Kunden-Antwort)
- **Copy-Button** für jeden Wert

### Schritt 4: Schnelles Ersetzen
1. Öffne die entsprechende Datei
2. Suche den alten Text (Cmd/Ctrl + F)
3. Klicke Copy-Button im Tool
4. Ersetze mit dem kopierten Wert
5. Nächstes Feld

## Beispiel: Autoaufbereitung branden

```typescript
// Kunde hat ausgefüllt:
{
  basic_info: {
    company_name: "AutoGlanz München",
    phone: "+49 89 12345678"
  },
  content: {
    hero_title: "Premium Autopflege",
    hero_subtitle: "Ihr Fahrzeug verdient das Beste"
  }
}

// Tool zeigt dir:
📁 src/demos/autoaufbereitung/Landing.tsx
   ├─ hero_title: "Premium Autopflege" [COPY]
   └─ hero_subtitle: "Ihr Fahrzeug verdient das Beste" [COPY]

📁 src/demos/autoaufbereitung/components/Header.tsx
   ├─ company_name: "AutoGlanz München" [COPY]
   └─ phone: "+49 89 12345678" [COPY]

// Du machst:
1. Öffne Landing.tsx
2. Suche "Fahrzeugaufbereitung" → Ersetze mit "Premium Autopflege"
3. Suche "Professionelle Autoreinigung" → Ersetze mit "Ihr Fahrzeug verdient das Beste"
4. Öffne Header.tsx
5. Suche "GlanzWerk" → Ersetze mit "AutoGlanz München"
6. Suche "+49 123 456789" → Ersetze mit "+49 89 12345678"
```

## Zeitersparnis

### Vorher:
- ⏱️ 2-3 Stunden pro Demo
- ❌ Vergessene Felder häufig
- ❌ Inkonsistente Texte
- ❌ Mehrfaches Hin-und-Her mit Checkliste

### Nachher:
- ⏱️ 15-30 Minuten pro Demo
- ✅ Alle Felder erfasst
- ✅ Exakte Übernahme
- ✅ Strukturiert und nachvollziehbar

## Neue Demo hinzufügen

### 1. Checklisten-Template erstellen
In Migration (z.B. `create_checklists.sql`):

```sql
INSERT INTO checklist_templates (demo_name, template_data) VALUES (
  'neue_demo',
  '{
    "sections": [
      {
        "id": "basic_info",
        "title": "Basis-Informationen",
        "fields": [
          {"id": "company_name", "label": "Firmenname", "type": "text", "required": true}
        ]
      }
    ]
  }'::jsonb
);
```

### 2. Component-Mapping erstellen
In `src/lib/checklistToComponentMapper.ts`:

```typescript
export const demoComponentMaps: DemoComponentMap = {
  // ... bestehende Demos

  neue_demo: {
    components: [
      {
        componentPath: 'src/demos/neue_demo/Landing.tsx',
        sectionName: 'Hero Section',
        checklistFields: [
          {
            fieldId: 'hero_title',
            fieldPath: 'content.hero_title',
            codeLocation: {
              searchPattern: 'Original Hero Text',
              replacePattern: 'REPLACE_HERO_TITLE'
            },
            instructions: 'Hero-Überschrift ersetzen (Zeile ~150)'
          }
        ]
      }
    ],
    quickReplaceGuide: {
      title: 'Neue Demo Branding Guide',
      steps: [
        {
          file: 'src/demos/neue_demo/Landing.tsx',
          changes: [
            {
              fieldId: 'hero_title',
              find: 'Original Hero Text',
              replaceWith: '{checklist.content.hero_title}',
              example: '"Original" → "Kunde Text"'
            }
          ]
        }
      ]
    }
  }
};
```

### 3. Demo-Components vorbereiten
- Eindeutige, leicht findbare Texte verwenden
- Keine doppelten Texte in verschiedenen Sections
- Kommentare für komplexe Bereiche

```typescript
// ✅ Gut
<h1>Ihre Physiotherapie-Praxis in München</h1>

// ❌ Schlecht
<h1>Willkommen</h1>  // Zu generisch, könnte mehrfach vorkommen
```

## Features des Tools

### ✅ Aktuell implementiert
- [x] Checklisten laden
- [x] Component-basierte Ansicht
- [x] Copy-to-Clipboard für jeden Wert
- [x] Markdown-Export
- [x] Code Replacements Liste
- [x] Strukturierte Anweisungen

### 🔄 Geplante Erweiterungen
- [ ] Direkter Code-Editor im Tool
- [ ] Automatisches Finden der Dateien
- [ ] Diff-Ansicht (Vorher/Nachher)
- [ ] Bulk-Replace-Funktion
- [ ] Integration mit Code-Generation
- [ ] Live-Preview der Änderungen

## Best Practices

### Checklisten-Felder
```typescript
// ✅ Gut
hero_title, trust_badge_1, company_name, opening_hours

// ❌ Schlecht
text1, field_a, content, data
```

### Search Patterns
```typescript
// ✅ Gut - Eindeutig
searchPattern: 'Fahrzeugaufbereitung auf höchstem Niveau'

// ❌ Schlecht - Kommt oft vor
searchPattern: 'Willkommen'
```

### Instructions
```typescript
// ✅ Gut - Klar und hilfreich
instructions: 'Hero-Überschrift in Landing.tsx Zeile 155 (max. 60 Zeichen)'

// ❌ Schlecht - Zu vage
instructions: 'Text ändern'
```

## Nächste Schritte

1. **Autoaufbereitung fertig mappen** ✅
2. **Weitere Demos mappen**:
   - [ ] Physiotherapie
   - [ ] Elektriker
   - [ ] Metzgerei
   - [ ] Gartenlandschaftsbau
   - [ ] Etc.

3. **Testen** mit echten Checklisten
4. **Automatisierung** erweitern
5. **Code-Generation** integrieren

## Support

Für Fragen zum System:
- **Dokumentation**: `/BRANDING_SYSTEM.md`
- **Code**: `/src/lib/checklistToComponentMapper.ts`
- **Tool**: `/admin/branding`
