# Demo Branding System

## Übersicht

Dieses System ermöglicht schnelles und präzises Branding von Demo-Websites durch direkte Verknüpfung von Checklisten-Feldern mit Code-Komponenten.

## Wie es funktioniert

### 1. Kunde füllt Checkliste aus
Nach dem Kauf erhält der Kunde eine E-Mail mit Link zur Checkliste. Die Checkliste ist **exakt auf die gekaufte Demo** zugeschnitten.

### 2. Admin nutzt Branding Tool
Das neue `ChecklistBrandingTool` zeigt:
- **Component-für-Component Ansicht**: Jede Sektion der Website mit den zugehörigen Feldern
- **Direkte Code-Locations**: Wo genau im Code was geändert werden muss
- **Copy-Paste Ready**: Ein Klick kopiert den Wert zur Verwendung

### 3. Schnelles Branding
Der Admin sieht genau:
```
📁 Component: Hero Section
   ├─ Field: hero_title
   │  ├─ Suchen: "Fahrzeugaufbereitung"
   │  ├─ Ersetzen: "Premium Autopflege München"
   │  └─ Location: Landing.tsx Zeile 155
   │
   ├─ Field: hero_subtitle
   │  ├─ Suchen: "Professionelle Autoreinigung"
   │  ├─ Ersetzen: "Ihr Auto verdient das Beste"
   │  └─ Location: Landing.tsx Zeile 170
```

## Struktur

### Component Mapping (`checklistToComponentMapper.ts`)

Definiert für jede Demo:
- Welche Components existieren
- Welche Checklisten-Felder zu welchen Components gehören
- Exakte Such- und Ersetzungsmuster
- Klare Anweisungen für jeden Wert

### Branding Tool (`ChecklistBrandingTool.tsx`)

Admin-Interface das:
- Fertige Checklisten lädt
- Component-basierte Ansicht generiert
- Copy-Paste Funktionen bietet
- Markdown-Export ermöglicht

## Workflow

### Für neue Demos

1. **Checklisten-Template erstellen** (in Migration):
```sql
INSERT INTO checklist_templates (demo_name, template_data) VALUES (
  'demo_name',
  '{
    "sections": [
      {
        "id": "basic_info",
        "title": "Basis-Informationen",
        "fields": [...]
      }
    ]
  }'
);
```

2. **Component Mapping hinzufügen** (in `checklistToComponentMapper.ts`):
```typescript
export const demoComponentMaps: DemoComponentMap = {
  demo_name: {
    components: [
      {
        componentPath: 'src/demos/demo_name/Landing.tsx',
        sectionName: 'Hero Section',
        checklistFields: [
          {
            fieldId: 'hero_title',
            fieldPath: 'content.hero_title',
            codeLocation: {
              searchPattern: 'Original Text',
              replacePattern: 'REPLACE_HERO_TITLE'
            },
            instructions: 'Ersetze die Hero-Überschrift'
          }
        ]
      }
    ]
  }
};
```

3. **Demo-Components vorbereiten**:
   - Klare, leicht findbare Texte verwenden
   - Konsistente Struktur über alle Demos
   - Kommentare für komplexe Sections

## Best Practices

### Checklisten-Felder benennen

✅ **Gut**: `hero_title`, `trust_badge_1`, `company_name`
❌ **Schlecht**: `text1`, `field_a`, `content`

### Search Patterns

✅ **Gut**: Eindeutige, spezifische Texte
```typescript
searchPattern: 'Fahrzeugaufbereitung auf höchstem Niveau'
```

❌ **Schlecht**: Generische, mehrfach vorkommende Texte
```typescript
searchPattern: 'Willkommen'  // Könnte mehrmals vorkommen
```

### Instructions

✅ **Gut**: Klar und spezifisch
```typescript
instructions: 'Hero-Überschrift ersetzen (Zeile 155, max. 60 Zeichen)'
```

❌ **Schlecht**: Vage
```typescript
instructions: 'Text ändern'
```

## Erweiterungen

### Service-Arrays dynamisch generieren

Für Services, die der Kunde auswählt:

```typescript
{
  fieldId: 'main_services',
  fieldPath: 'services.main_services',
  codeLocation: {
    searchPattern: 'const services = [',
    replacePattern: 'REPLACE_SERVICES_ARRAY'
  },
  instructions: 'Generiere Service-Array aus ausgewählten Services',
  generator: (values: string[]) => {
    return values.map(v => ({
      title: serviceLabels[v],
      description: serviceDescriptions[v],
      icon: serviceIcons[v]
    }));
  }
}
```

### Conditional Replacements

Für bedingte Inhalte:

```typescript
{
  fieldId: 'whatsapp',
  fieldPath: 'contact.whatsapp',
  codeLocation: {
    searchPattern: 'WHATSAPP_BUTTON',
    replacePattern: 'CONDITIONAL_WHATSAPP'
  },
  instructions: 'WhatsApp Button nur anzeigen wenn Nummer vorhanden',
  condition: (value: string) => !!value
}
```

## Migration Path

### Phase 1: Autoaufbereitung (✅ Fertig)
- Component Mapping erstellt
- Branding Tool implementiert
- Template verfeinert

### Phase 2: Weitere Demos
- Physiotherapie
- Elektriker
- Metzgerei
- Etc.

Für jede Demo:
1. Template-Struktur analysieren
2. Components identifizieren
3. Mapping erstellen
4. Testen

## Testing

### Checklist für jede Demo:

- [ ] Alle Felder im Mapping vorhanden
- [ ] Search Patterns eindeutig
- [ ] Instructions klar
- [ ] Test-Branding durchgeführt
- [ ] Copy-Paste funktioniert
- [ ] Markdown-Export korrekt

## Automatisierung (Future)

Ziel: Vollautomatisches Branding

```typescript
async function autoBrand(checklistId: string) {
  const checklist = await loadChecklist(checklistId);
  const replacements = generateCodeReplacements(
    checklist.demo_name,
    checklist.checklist_data
  );

  // Read demo files
  // Apply replacements
  // Generate new branded version
  // Deploy to customer subdomain
}
```

## Vorteile des Systems

1. **Schnelligkeit**: Von Stunden auf Minuten
2. **Genauigkeit**: Keine vergessenen Felder
3. **Skalierbarkeit**: Einfach neue Demos hinzufügen
4. **Dokumentation**: Alles ist klar dokumentiert
5. **Wiederverwendbarkeit**: Mappings sind wiederverwendbar
