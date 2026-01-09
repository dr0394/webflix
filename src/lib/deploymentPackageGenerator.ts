/**
 * Deployment Package Generator
 *
 * Erstellt fertige Copy-Paste Pakete aus bestehenden Demos
 * mit angepassten Inhalten aus der Checkliste
 */

import { generatePromptFromChecklist } from './promptGenerator';

interface DeploymentPackage {
  demoName: string;
  files: Array<{
    path: string;
    filename: string;
    content: string;
    instructions: string;
  }>;
  setupInstructions: string;
  replacements: Array<{
    search: string;
    replace: string;
    description: string;
  }>;
}

export class DeploymentPackageGenerator {
  private checklistData: any;
  private templateName: string;
  private demoFiles: Map<string, string> = new Map();

  constructor(checklistData: any, templateName: string) {
    this.checklistData = checklistData.checklist_data || checklistData;
    this.templateName = templateName;
  }

  public generatePackage(): DeploymentPackage {
    const replacements = this.generateReplacements();
    const setupInstructions = this.generateSetupInstructions();
    const files = this.generateFileList();

    return {
      demoName: this.templateName,
      files,
      setupInstructions,
      replacements
    };
  }

  private generateReplacements(): Array<{ search: string; replace: string; description: string }> {
    const replacements = [];

    const companyName = this.checklistData.companyName || this.checklistData.businessName;
    if (companyName) {
      replacements.push({
        search: 'Premium Autoaufbereitung',
        replace: companyName,
        description: 'Firmenname'
      });
      replacements.push({
        search: 'premium-autoaufbereitung',
        replace: companyName.toLowerCase().replace(/\s+/g, '-'),
        description: 'Firmenname (URL-Format)'
      });
    }

    const tagline = this.checklistData.tagline || this.checklistData.slogan;
    if (tagline) {
      replacements.push({
        search: 'Perfektion bis ins kleinste Detail',
        replace: tagline,
        description: 'Slogan/Tagline'
      });
    }

    const phone = this.checklistData.phone || this.checklistData.phoneNumber;
    if (phone) {
      replacements.push({
        search: '+49 123 456789',
        replace: phone,
        description: 'Telefonnummer'
      });
      replacements.push({
        search: '0123 456789',
        replace: phone,
        description: 'Telefonnummer (Alternative)'
      });
    }

    const email = this.checklistData.email || this.checklistData.contactEmail;
    if (email) {
      replacements.push({
        search: 'info@autoaufbereitung.de',
        replace: email,
        description: 'E-Mail Adresse'
      });
    }

    const address = this.checklistData.address || this.checklistData.street;
    if (address) {
      replacements.push({
        search: 'Musterstraße 123',
        replace: address,
        description: 'Straße'
      });
    }

    const city = this.checklistData.city;
    const zip = this.checklistData.postalCode || this.checklistData.zip;
    if (city && zip) {
      replacements.push({
        search: '12345 Musterstadt',
        replace: `${zip} ${city}`,
        description: 'PLZ und Stadt'
      });
    }

    const openingHours = this.checklistData.openingHours;
    if (openingHours) {
      replacements.push({
        search: 'Mo-Fr: 08:00 - 18:00 Uhr',
        replace: openingHours,
        description: 'Öffnungszeiten'
      });
    }

    const logo = this.checklistData.logo;
    if (logo) {
      replacements.push({
        search: '/assets/logo.png',
        replace: logo,
        description: '🖼️ Logo (Imgur URL)'
      });
    }

    const heroImage = this.checklistData.heroImage;
    if (heroImage) {
      replacements.push({
        search: '/assets/hero.jpg',
        replace: heroImage,
        description: '🖼️ Hero-Bild (Imgur URL)'
      });
    }

    const teamPhoto = this.checklistData.teamPhoto;
    if (teamPhoto) {
      replacements.push({
        search: '/assets/team.jpg',
        replace: teamPhoto,
        description: '🖼️ Team-Foto (Imgur URL)'
      });
    }

    const galleryImages = this.checklistData.galleryImages;
    if (galleryImages && Array.isArray(galleryImages)) {
      galleryImages.forEach((url: string, index: number) => {
        replacements.push({
          search: `/assets/gallery-${index + 1}.jpg`,
          replace: url,
          description: `🖼️ Galerie-Bild ${index + 1} (Imgur URL)`
        });
      });
    }

    return replacements;
  }

  private generateSetupInstructions(): string {
    const companyName = this.checklistData.companyName || this.checklistData.businessName || 'Ihre Firma';

    return `
# DEPLOYMENT ANLEITUNG: ${companyName}
Template: ${this.templateName}

## 1. NEUES BOLT PROJEKT ERSTELLEN

1. Gehe zu bolt.new
2. Erstelle ein neues React + TypeScript + Vite Projekt
3. Warte bis das Projekt geladen ist

## 2. ORDNERSTRUKTUR ERSTELLEN

Erstelle folgende Ordnerstruktur in dem neuen Projekt:

\`\`\`
src/demos/${this.templateName}/
├── Landing.tsx
└── components/
    └── (siehe Dateiliste unten)
\`\`\`

## 3. DATEIEN KOPIEREN

Kopiere JEDE Datei aus dem Package in das neue Projekt:

${this.generateFileList().map((file, index) => `
${index + 1}. **${file.filename}**
   - Pfad: \`${file.path}\`
   - Aktion: ${file.instructions}
`).join('\n')}

## 4. GLOBALE SUCHEN & ERSETZEN

Führe folgende Suchen & Ersetzen IM GESAMTEN PROJEKT durch:

${this.generateReplacements().map((r, index) => `
${index + 1}. **${r.description}**
   - Suche: \`${r.search}\`
   - Ersetze: \`${r.replace}\`
`).join('\n')}

## 5. APP.TSX ANPASSEN

Öffne \`src/App.tsx\` und ersetze den Inhalt mit:

\`\`\`typescript
import React from 'react';
import Landing from './demos/${this.templateName}/Landing';

function App() {
  return <Landing />;
}

export default App;
\`\`\`

## 6. DEPENDENCIES PRÜFEN

Stelle sicher, dass folgende Packages installiert sind:
- lucide-react
- framer-motion
- react-router-dom (falls benötigt)

## 7. TESTEN

1. Starte das Projekt (wird automatisch gestartet)
2. Prüfe alle Sektionen
3. Teste Mobile Ansicht
4. Prüfe alle Links und Buttons

## 8. FINALE ANPASSUNGEN

- Ersetze Platzhalter-Bilder mit echten Bildern
- Passe Farben an (falls gewünscht)
- Füge fehlende Services hinzu
- Prüfe SEO-Meta-Tags

## GESCHÄTZTE ZEIT: 15-20 Minuten
    `.trim();
  }

  private generateFileList(): Array<{ path: string; filename: string; content: string; instructions: string }> {
    const files = [];
    const basePath = `src/demos/${this.templateName}`;

    files.push({
      path: `${basePath}/Landing.tsx`,
      filename: 'Landing.tsx',
      content: '// Code wird aus bestehendem Demo kopiert',
      instructions: 'Kopiere den kompletten Code aus der bestehenden Landing.tsx'
    });

    const components = this.getComponentList();
    components.forEach(comp => {
      files.push({
        path: `${basePath}/components/${comp}.tsx`,
        filename: `${comp}.tsx`,
        content: '// Code wird aus bestehendem Demo kopiert',
        instructions: `Kopiere den kompletten Code aus der bestehenden ${comp}.tsx`
      });
    });

    return files;
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
      ]
    };

    return componentMap[this.templateName] || [
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

  public generateCopyPasteGuide(): string {
    const package_ = this.generatePackage();

    return `
===============================================================================
                    COPY-PASTE DEPLOYMENT PACKAGE
===============================================================================

Demo: ${package_.demoName}
Firma: ${this.checklistData.companyName || this.checklistData.businessName || 'Unbekannt'}
Datum: ${new Date().toLocaleDateString('de-DE')}

===============================================================================
                         SETUP ANLEITUNG
===============================================================================

${package_.setupInstructions}

===============================================================================
                      SUCHEN & ERSETZEN LISTE
===============================================================================

Kopiere diese Liste und führe jede Ersetzung durch:

${package_.replacements.map((r, i) => `
[${i + 1}] ${r.description}
    SUCHE:   ${r.search}
    ERSETZE: ${r.replace}
    ────────────────────────────────────────
`).join('\n')}

===============================================================================
                         DATEILISTE
===============================================================================

${package_.files.map((f, i) => `
Datei ${i + 1}: ${f.filename}
Pfad: ${f.path}
Aktion: ${f.instructions}
`).join('\n')}

===============================================================================
                         CHECKLISTE
===============================================================================

Phase 1: Vorbereitung
□ Neues Bolt Projekt erstellt
□ Ordnerstruktur angelegt (src/demos/${this.templateName}/)
□ Alle Komponenten-Dateien erstellt

Phase 2: Code kopieren
${package_.files.map((f, i) => `□ ${f.filename} kopiert`).join('\n')}

Phase 3: Anpassungen
${package_.replacements.map((r, i) => `□ ${r.description} ersetzt`).join('\n')}
□ App.tsx angepasst
□ Dependencies installiert

Phase 4: Testing
□ Seite lädt ohne Fehler
□ Alle Sektionen sichtbar
□ Mobile Ansicht funktioniert
□ Kontaktdaten korrekt
□ Links funktionieren

Phase 5: Finalisierung
□ Bilder hochgeladen
□ Farben angepasst
□ SEO Meta-Tags gesetzt
□ Finale Abnahme

===============================================================================
                    FERTIG! Zeit für Go-Live!
===============================================================================
    `.trim();
  }

  public exportToFile(): string {
    return this.generateCopyPasteGuide();
  }
}

export function generateDeploymentPackage(checklistData: any, templateName: string): string {
  const generator = new DeploymentPackageGenerator(checklistData, templateName);
  return generator.exportToFile();
}

export function getQuickStartGuide(checklistData: any, templateName: string): string {
  const generator = new DeploymentPackageGenerator(checklistData, templateName);
  return generator.generateCopyPasteGuide();
}
