export interface ComponentMapping {
  componentPath: string;
  sectionName: string;
  checklistFields: {
    fieldId: string;
    fieldPath: string;
    codeLocation: {
      lineNumber?: number;
      searchPattern: string;
      replacePattern: string;
    };
    instructions: string;
  }[];
}

export interface DemoComponentMap {
  [demoName: string]: {
    components: ComponentMapping[];
    quickReplaceGuide: {
      title: string;
      steps: Array<{
        file: string;
        changes: Array<{
          fieldId: string;
          find: string;
          replaceWith: string;
          example: string;
        }>;
      }>;
    };
  };
}

export const demoComponentMaps: DemoComponentMap = {
  autoaufbereitung: {
    components: [
      {
        componentPath: 'src/demos/autoaufbereitung/Landing.tsx',
        sectionName: 'Hero Section',
        checklistFields: [
          {
            fieldId: 'hero_title',
            fieldPath: 'content.hero_title',
            codeLocation: {
              searchPattern: 'Fahrzeugaufbereitung',
              replacePattern: 'REPLACE_HERO_TITLE',
            },
            instructions: 'Ersetze die Hero-Überschrift (Zeile ~155)',
          },
          {
            fieldId: 'hero_subtitle',
            fieldPath: 'content.hero_subtitle',
            codeLocation: {
              searchPattern: 'Professionelle Autoreinigung',
              replacePattern: 'REPLACE_HERO_SUBTITLE',
            },
            instructions: 'Ersetze die Hero-Unterzeile (Zeile ~170)',
          },
          {
            fieldId: 'trust_badge_1',
            fieldPath: 'content.trust_badge_1',
            codeLocation: {
              searchPattern: '5/5 Sterne',
              replacePattern: 'REPLACE_TRUST_BADGE_1',
            },
            instructions: 'Trust Badge 1 (Zeile ~200)',
          },
          {
            fieldId: 'trust_badge_2',
            fieldPath: 'content.trust_badge_2',
            codeLocation: {
              searchPattern: 'Flexible Termine',
              replacePattern: 'REPLACE_TRUST_BADGE_2',
            },
            instructions: 'Trust Badge 2 (Zeile ~201)',
          },
          {
            fieldId: 'trust_badge_3',
            fieldPath: 'content.trust_badge_3',
            codeLocation: {
              searchPattern: 'Faire Preise',
              replacePattern: 'REPLACE_TRUST_BADGE_3',
            },
            instructions: 'Trust Badge 3 (Zeile ~202)',
          },
        ],
      },
      {
        componentPath: 'src/demos/autoaufbereitung/Landing.tsx',
        sectionName: 'Services Section',
        checklistFields: [
          {
            fieldId: 'main_services',
            fieldPath: 'services.main_services',
            codeLocation: {
              searchPattern: 'services = [',
              replacePattern: 'REPLACE_SERVICES_ARRAY',
            },
            instructions:
              'Ersetze das Services-Array basierend auf ausgewählten Services aus Checkliste',
          },
        ],
      },
      {
        componentPath: 'src/demos/autoaufbereitung/components/Header.tsx',
        sectionName: 'Header/Navigation',
        checklistFields: [
          {
            fieldId: 'company_name',
            fieldPath: 'basic_info.company_name',
            codeLocation: {
              searchPattern: 'GlanzWerk',
              replacePattern: 'REPLACE_COMPANY_NAME',
            },
            instructions: 'Firmenname in Header (Zeile ~20)',
          },
          {
            fieldId: 'phone',
            fieldPath: 'basic_info.phone',
            codeLocation: {
              searchPattern: '+49 123 456789',
              replacePattern: 'REPLACE_PHONE',
            },
            instructions: 'Telefonnummer in Header',
          },
        ],
      },
      {
        componentPath: 'src/demos/autoaufbereitung/components/Footer.tsx',
        sectionName: 'Footer',
        checklistFields: [
          {
            fieldId: 'company_name',
            fieldPath: 'basic_info.company_name',
            codeLocation: {
              searchPattern: 'GlanzWerk',
              replacePattern: 'REPLACE_COMPANY_NAME',
            },
            instructions: 'Firmenname im Footer',
          },
          {
            fieldId: 'address_street',
            fieldPath: 'contact.address_street',
            codeLocation: {
              searchPattern: 'Musterstraße 123',
              replacePattern: 'REPLACE_ADDRESS_STREET',
            },
            instructions: 'Straße & Hausnummer',
          },
          {
            fieldId: 'address_zip',
            fieldPath: 'contact.address_zip',
            codeLocation: {
              searchPattern: '12345',
              replacePattern: 'REPLACE_ZIP',
            },
            instructions: 'PLZ',
          },
          {
            fieldId: 'address_city',
            fieldPath: 'contact.address_city',
            codeLocation: {
              searchPattern: 'Musterstadt',
              replacePattern: 'REPLACE_CITY',
            },
            instructions: 'Stadt',
          },
          {
            fieldId: 'email',
            fieldPath: 'basic_info.email',
            codeLocation: {
              searchPattern: 'info@glanzwerk.de',
              replacePattern: 'REPLACE_EMAIL',
            },
            instructions: 'E-Mail',
          },
          {
            fieldId: 'phone',
            fieldPath: 'basic_info.phone',
            codeLocation: {
              searchPattern: '+49 123 456789',
              replacePattern: 'REPLACE_PHONE',
            },
            instructions: 'Telefon',
          },
          {
            fieldId: 'opening_hours',
            fieldPath: 'contact.opening_hours',
            codeLocation: {
              searchPattern: 'Mo-Fr: 8:00 - 18:00',
              replacePattern: 'REPLACE_OPENING_HOURS',
            },
            instructions: 'Öffnungszeiten',
          },
        ],
      },
      {
        componentPath: 'src/demos/autoaufbereitung/components/MapSection.tsx',
        sectionName: 'Karte/Standort',
        checklistFields: [
          {
            fieldId: 'address_full',
            fieldPath: 'contact.*',
            codeLocation: {
              searchPattern: 'q=',
              replacePattern: 'REPLACE_GOOGLE_MAPS_ADDRESS',
            },
            instructions:
              'Google Maps Adresse - Format: "Straße+Hausnummer,+PLZ+Stadt"',
          },
        ],
      },
    ],
    quickReplaceGuide: {
      title: 'Autoaufbereitung Branding Guide',
      steps: [
        {
          file: 'src/demos/autoaufbereitung/Landing.tsx',
          changes: [
            {
              fieldId: 'hero_title',
              find: 'Fahrzeugaufbereitung',
              replaceWith: '{checklist.content.hero_title}',
              example: '"Fahrzeugaufbereitung" → "Premium Autopflege"',
            },
            {
              fieldId: 'hero_subtitle',
              find: 'Professionelle Autoreinigung für strahlenden Glanz',
              replaceWith: '{checklist.content.hero_subtitle}',
              example:
                '"Professionelle Autoreinigung..." → "Ihr Auto in Bestform"',
            },
            {
              fieldId: 'trust_badge_1',
              find: '5/5 Sterne',
              replaceWith: '{checklist.content.trust_badge_1}',
              example: '"5/5 Sterne" → "Über 500 zufriedene Kunden"',
            },
          ],
        },
        {
          file: 'src/demos/autoaufbereitung/components/Header.tsx',
          changes: [
            {
              fieldId: 'company_name',
              find: 'GlanzWerk',
              replaceWith: '{checklist.basic_info.company_name}',
              example: '"GlanzWerk" → "AutoPerfekt München"',
            },
            {
              fieldId: 'phone',
              find: '+49 123 456789',
              replaceWith: '{checklist.basic_info.phone}',
              example: '"+49 123 456789" → "+49 89 12345678"',
            },
          ],
        },
        {
          file: 'src/demos/autoaufbereitung/components/Footer.tsx',
          changes: [
            {
              fieldId: 'company_name',
              find: 'GlanzWerk',
              replaceWith: '{checklist.basic_info.company_name}',
              example: '"GlanzWerk" → "AutoPerfekt München"',
            },
            {
              fieldId: 'address_street',
              find: 'Musterstraße 123',
              replaceWith: '{checklist.contact.address_street}',
              example: '"Musterstraße 123" → "Hauptstraße 45"',
            },
            {
              fieldId: 'address_city',
              find: 'Musterstadt',
              replaceWith:
                '{checklist.contact.address_zip} {checklist.contact.address_city}',
              example: '"12345 Musterstadt" → "80331 München"',
            },
            {
              fieldId: 'email',
              find: 'info@glanzwerk.de',
              replaceWith: '{checklist.basic_info.email}',
              example: '"info@glanzwerk.de" → "kontakt@autoperfekt.de"',
            },
            {
              fieldId: 'opening_hours',
              find: 'Mo-Fr: 8:00 - 18:00 Uhr\\nSa: 9:00 - 14:00 Uhr',
              replaceWith: '{checklist.contact.opening_hours}',
              example: 'Mo-Fr: 8:00 - 18:00 → Mo-Fr: 7:00 - 19:00',
            },
          ],
        },
      ],
    },
  },
};

export function generateBrandingInstructions(
  demoName: string,
  checklistData: any
): string {
  const demoMap = demoComponentMaps[demoName];
  if (!demoMap) {
    return `Keine Mapping-Daten für Demo "${demoName}" gefunden.`;
  }

  let instructions = `# Branding Anweisungen: ${demoName}\n\n`;
  instructions += `## Checklisten-Daten\n\`\`\`json\n${JSON.stringify(checklistData, null, 2)}\n\`\`\`\n\n`;

  instructions += `## Änderungen pro Datei\n\n`;

  demoMap.quickReplaceGuide.steps.forEach((step) => {
    instructions += `### 📁 ${step.file}\n\n`;
    step.changes.forEach((change) => {
      const value = getNestedValue(checklistData, change.fieldId);
      instructions += `**${change.fieldId}:**\n`;
      instructions += `- Suchen: \`"${change.find}"\`\n`;
      instructions += `- Ersetzen mit: \`"${value || 'NICHT AUSGEFÜLLT'}"\`\n`;
      instructions += `- Beispiel: ${change.example}\n\n`;
    });
  });

  return instructions;
}

function getNestedValue(obj: any, fieldId: string): any {
  for (const section in obj) {
    if (obj[section] && typeof obj[section] === 'object') {
      if (obj[section][fieldId] !== undefined) {
        return obj[section][fieldId];
      }
    }
  }
  return null;
}

export function generateCodeReplacements(
  demoName: string,
  checklistData: any
): Array<{ file: string; find: string; replace: string }> {
  const demoMap = demoComponentMaps[demoName];
  if (!demoMap) return [];

  const replacements: Array<{ file: string; find: string; replace: string }> =
    [];

  demoMap.quickReplaceGuide.steps.forEach((step) => {
    step.changes.forEach((change) => {
      const value = getNestedValue(checklistData, change.fieldId);
      if (value) {
        replacements.push({
          file: step.file,
          find: change.find,
          replace: value,
        });
      }
    });
  });

  return replacements;
}
