/**
 * Demo Code Extractor
 *
 * Liest Code aus bestehenden Demo-Komponenten und bereitet ihn für Copy-Paste vor
 */

export interface DemoFile {
  filename: string;
  path: string;
  code: string;
  componentName: string;
}

export interface DemoStructure {
  demoName: string;
  mainFile: DemoFile;
  components: DemoFile[];
  allFiles: DemoFile[];
}

export class DemoCodeExtractor {
  private demoName: string;

  constructor(demoName: string) {
    this.demoName = demoName;
  }

  public generateCopyPasteInstructions(): string {
    const structure = this.getDemoStructure();

    return `
===============================================================================
                    CODE COPY-PASTE ANLEITUNG
===============================================================================

Demo: ${this.demoName}
Anzahl Dateien: ${structure.allFiles.length}

WICHTIG: Diese Anleitung zeigt dir EXAKT welche Dateien du aus dem
bestehenden Projekt kopieren musst.

===============================================================================
                         SCHRITT 1: ORDNER ERSTELLEN
===============================================================================

Erstelle in deinem NEUEN Bolt Projekt diese Ordnerstruktur:

src/demos/${this.demoName}/
└── components/

===============================================================================
                    SCHRITT 2: DATEIEN KOPIEREN
===============================================================================

Kopiere folgende Dateien aus dem BESTEHENDEN Projekt:

${structure.allFiles.map((file, index) => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATEI ${index + 1}: ${file.componentName}

QUELLE (Bestehendes Projekt):
${file.path}

ZIEL (Neues Projekt):
${file.path}

ANWEISUNGEN:
1. Öffne im BESTEHENDEN Projekt: ${file.path}
2. Kopiere den KOMPLETTEN Dateiinhalt (Strg+A, Strg+C)
3. Erstelle im NEUEN Projekt: ${file.path}
4. Füge den Code ein (Strg+V)
5. Speichern

STATUS: [ ] Kopiert

`).join('\n')}

===============================================================================
                    SCHRITT 3: APP.TSX ANPASSEN
===============================================================================

Öffne im neuen Projekt: src/App.tsx

Ersetze den Inhalt mit:

\`\`\`typescript
import React from 'react';
import Landing from './demos/${this.demoName}/Landing';

function App() {
  return <Landing />;
}

export default App;
\`\`\`

STATUS: [ ] App.tsx angepasst

===============================================================================
                         FORTSCHRITT TRACKING
===============================================================================

Hauptdatei:
[ ] ${structure.mainFile.filename}

Komponenten:
${structure.components.map(c => `[ ] ${c.filename}`).join('\n')}

[ ] App.tsx angepasst
[ ] Projekt läuft ohne Fehler
[ ] Alle Sektionen sichtbar

FERTIG! ✓

===============================================================================
    `.trim();
  }

  private getDemoStructure(): DemoStructure {
    const basePath = `src/demos/${this.demoName}`;
    const components = this.getComponentList();

    const mainFile: DemoFile = {
      filename: 'Landing.tsx',
      path: `${basePath}/Landing.tsx`,
      code: '',
      componentName: 'Landing'
    };

    const componentFiles: DemoFile[] = components.map(comp => ({
      filename: `${comp}.tsx`,
      path: `${basePath}/components/${comp}.tsx`,
      code: '',
      componentName: comp
    }));

    return {
      demoName: this.demoName,
      mainFile,
      components: componentFiles,
      allFiles: [mainFile, ...componentFiles]
    };
  }

  private getComponentList(): string[] {
    const componentMap: Record<string, string[]> = {
      'autoaufbereitung': [
        'Header',
        'Footer',
        'BeforeAfterSection',
        'BeforeAfterSlider',
        'CleaningConfigurator',
        'Gallery',
        'MapSection',
        'TrustSection',
        'VehicleSelection'
      ],
      'elektriker': [
        'Header',
        'Footer',
        'ContactSection',
        'EmergencyBanner',
        'HeroSection',
        'ProjectsGallery',
        'ServicesGrid',
        'WhyChooseUs'
      ],
      'metzgerei': [
        'Header',
        'Footer',
        'BestellService',
        'CheckoutPage',
        'HeroSection',
        'ImpressumPage',
        'KontaktSection',
        'OrderConfirmationPage',
        'ProductCategories',
        'QualitySection',
        'ShopPage',
        'WeeklySpecials'
      ],
      'physiotherapie': [
        'Header',
        'Footer',
        'BookingSection',
        'ContactSection',
        'HeroSection',
        'ServicesSection',
        'TeamSection',
        'TrustSection'
      ],
      'gartenlandschaftsbau': [
        'Header',
        'Footer',
        'BeforeAfterSlider',
        'Gallery',
        'MapSection',
        'TrustSection',
        'VehicleSelection'
      ],
      'metallbau': [
        'Header',
        'Footer',
        'Gallery',
        'MapSection',
        'ServiceSelection',
        'TrustSection'
      ],
      'security': [
        'Header',
        'Footer',
        'Gallery',
        'MapSection',
        'ServiceSelection',
        'TrustSection'
      ],
      'personalbrand': [
        'Header',
        'Footer',
        'Gallery',
        'MapSection',
        'ServiceSelection',
        'TrustSection'
      ],
      'gebaeudereinigung': [
        'Header',
        'Footer'
      ],
      'bauunternehmen': [
        'Header',
        'Footer'
      ],
      'beauty': [
        'Header',
        'Footer'
      ],
      'handwerk': [
        'Header',
        'Footer'
      ]
    };

    return componentMap[this.demoName] || [
      'Header',
      'Footer',
      'Hero',
      'Services',
      'Gallery',
      'Contact',
      'TrustSection',
      'MapSection'
    ];
  }

  public generateQuickReference(): string {
    const structure = this.getDemoStructure();

    return `
# QUICK REFERENCE: ${this.demoName}

## Dateien (${structure.allFiles.length} insgesamt)

### Hauptdatei
- ${structure.mainFile.path}

### Komponenten (${structure.components.length})
${structure.components.map(c => `- ${c.path}`).join('\n')}

## Copy-Paste Reihenfolge

1. Erstelle Ordnerstruktur
2. Kopiere Landing.tsx
3. Kopiere alle Komponenten
4. Passe App.tsx an
5. Testen

Zeit: ~15 Minuten
    `.trim();
  }
}

export function generateCodeCopyGuide(demoName: string): string {
  const extractor = new DemoCodeExtractor(demoName);
  return extractor.generateCopyPasteInstructions();
}

export function getQuickReference(demoName: string): string {
  const extractor = new DemoCodeExtractor(demoName);
  return extractor.generateQuickReference();
}
