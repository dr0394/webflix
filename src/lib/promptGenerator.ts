/**
 * Prompt Generator für Website-Erstellung
 *
 * Konvertiert Checklisten-Daten in strukturierte Prompts für die
 * automatische Code-Generierung von React-Komponenten
 */

interface ChecklistData {
  [key: string]: any;
}

interface PromptSection {
  title: string;
  content: string;
}

interface GeneratedPrompt {
  systemPrompt: string;
  componentPrompts: {
    Header: string;
    Hero: string;
    Services: string;
    Gallery: string;
    Contact: string;
    Footer: string;
  };
  pagePrompt: string;
  fullPrompt: string;
}

export class PromptGenerator {
  private checklistData: ChecklistData;
  private templateName: string;
  private demoName: string;

  constructor(checklistData: ChecklistData, templateName: string) {
    this.checklistData = checklistData;
    this.templateName = templateName;
    this.demoName = this.extractDemoName(templateName);
  }

  private extractDemoName(templateName: string): string {
    const demoMap: Record<string, string> = {
      'autoaufbereitung': 'Autoaufbereitung',
      'elektriker': 'Elektriker',
      'gartenlandschaftsbau': 'Garten- und Landschaftsbau',
      'gebaeudereinigung': 'Gebäudereinigung',
      'handwerk': 'Handwerk',
      'metallbau': 'Metallbau',
      'bauunternehmen': 'Bauunternehmen',
      'physiotherapie': 'Physiotherapie',
      'beauty': 'Beauty & Wellness',
      'security': 'Sicherheitsdienst',
      'metzgerei': 'Metzgerei',
      'personalbrand': 'Personal Brand'
    };

    return demoMap[templateName] || templateName;
  }

  public generateFullPrompt(): GeneratedPrompt {
    const systemPrompt = this.generateSystemPrompt();
    const componentPrompts = this.generateComponentPrompts();
    const pagePrompt = this.generatePagePrompt();
    const fullPrompt = this.assembleFullPrompt(systemPrompt, componentPrompts, pagePrompt);

    return {
      systemPrompt,
      componentPrompts,
      pagePrompt,
      fullPrompt
    };
  }

  private generateSystemPrompt(): string {
    return `Du bist ein Experten-Web-Entwickler, der auf die Erstellung professioneller Landing Pages spezialisiert ist.

AUFGABE: Erstelle eine vollständige, produktionsreife Landing Page für einen ${this.demoName}-Betrieb basierend auf den folgenden Kundendaten.

TECHNISCHE ANFORDERUNGEN:
- React + TypeScript
- Tailwind CSS für Styling
- Lucide React für Icons
- Framer Motion für Animationen
- Responsive Design (Mobile-First)
- Moderne UI/UX Best Practices
- Sauberer, wartbarer Code
- Komponenten-basierte Architektur

DESIGN-RICHTLINIEN:
- Professionell und modern
- Passende Farbpalette für die Branche
- Klare visuelle Hierarchie
- Starke Call-to-Actions
- Trust-Elemente (Bewertungen, Zertifikate, etc.)
- Optimiert für Conversion

WICHTIG:
- Verwende EXAKT die bereitgestellten Kundendaten
- Erstelle realistische, professionelle Inhalte
- Alle Texte in deutscher Sprache
- Keine Platzhalter oder Lorem Ipsum
- Fertig für Produktion`;
  }

  private generateComponentPrompts(): GeneratedPrompt['componentPrompts'] {
    return {
      Header: this.generateHeaderPrompt(),
      Hero: this.generateHeroPrompt(),
      Services: this.generateServicesPrompt(),
      Gallery: this.generateGalleryPrompt(),
      Contact: this.generateContactPrompt(),
      Footer: this.generateFooterPrompt()
    };
  }

  private generateHeaderPrompt(): string {
    const companyName = this.checklistData.companyName || this.checklistData.businessName || 'Firmenname';
    const phone = this.checklistData.phone || this.checklistData.phoneNumber;
    const email = this.checklistData.email || this.checklistData.contactEmail;
    const logo = this.checklistData.logo || this.checklistData.logoUrl;

    return `HEADER KOMPONENTE:

Erstelle eine professionelle Header-Komponente mit:

KUNDENDATEN:
- Firmenname: ${companyName}
${phone ? `- Telefon: ${phone}` : ''}
${email ? `- E-Mail: ${email}` : ''}
${logo ? `- Logo URL: ${logo}` : '- Verwende ein passendes Icon als Logo-Ersatz'}

ANFORDERUNGEN:
- Sticky Navigation beim Scrollen
- Mobile Hamburger Menu
- Logo links, Navigation mittig/rechts
- CTA-Button prominent (z.B. "Jetzt anfragen")
- Smooth Scroll zu Sektionen
- Hover-Effekte auf Links
- Responsive für alle Geräte

CODE-STRUKTUR:
\`\`\`typescript
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Header() {
  // Implementierung hier
}
\`\`\``;
  }

  private generateHeroPrompt(): string {
    const companyName = this.checklistData.companyName || this.checklistData.businessName || 'Ihr Unternehmen';
    const tagline = this.checklistData.tagline || this.checklistData.slogan;
    const description = this.checklistData.description || this.checklistData.aboutUs;
    const heroImage = this.checklistData.heroImage;
    const services = this.checklistData.services || [];

    return `HERO SECTION:

Erstelle eine beeindruckende Hero-Sektion mit:

KUNDENDATEN:
- Firmenname: ${companyName}
${tagline ? `- Slogan: ${tagline}` : '- Erstelle einen passenden Slogan'}
${description ? `- Beschreibung: ${description}` : '- Erstelle eine kurze, überzeugende Beschreibung (2-3 Sätze)'}
${heroImage ? `- Hero Bild: ${heroImage}` : '- Verwende einen passenden Farbverlauf als Hintergrund'}
${services.length > 0 ? `- Hauptleistungen: ${services.slice(0, 3).join(', ')}` : ''}

ANFORDERUNGEN:
- Großer, aufmerksamkeitsstarker Headline
- Unterstützender Subtext
- 2 CTA-Buttons (Primär: "Jetzt Termin vereinbaren", Sekundär: "Mehr erfahren")
- Optional: Kurze Liste der Hauptleistungen mit Icons
- Trust-Elemente (z.B. "Über 500 zufriedene Kunden", "5 Sterne Bewertung")
- Moderne Animationen beim Laden
- Full-Height oder Near-Full-Height
- Responsive Layout

DESIGN:
- Verwende passende Farben für ${this.demoName}
- Starke Typografie
- Klare visuelle Hierarchie
- Moderne Gradients oder Patterns

CODE-STRUKTUR:
\`\`\`typescript
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Award } from 'lucide-react';

export default function Hero() {
  // Implementierung hier
}
\`\`\``;
  }

  private generateServicesPrompt(): string {
    const services = this.checklistData.services || [];
    const vehicleTypes = this.checklistData.vehicleTypes || [];
    const serviceCategories = this.checklistData.serviceCategories || [];

    let servicesInfo = '';
    if (services.length > 0) {
      servicesInfo = services.map((s: any, i: number) => {
        if (typeof s === 'string') {
          return `${i + 1}. ${s}`;
        } else {
          return `${i + 1}. ${s.name}${s.description ? ` - ${s.description}` : ''}${s.price ? ` (${s.price})` : ''}`;
        }
      }).join('\n');
    }

    return `SERVICES/LEISTUNGEN SEKTION:

Erstelle eine ansprechende Leistungs-Sektion mit:

KUNDENDATEN:
${servicesInfo ? `LEISTUNGEN:\n${servicesInfo}` : 'Erstelle 6-8 typische Leistungen für ${this.demoName}'}
${vehicleTypes.length > 0 ? `\nFAHRZEUGTYPEN: ${vehicleTypes.join(', ')}` : ''}
${serviceCategories.length > 0 ? `\nKATEGORIEN: ${serviceCategories.join(', ')}` : ''}

ANFORDERUNGEN:
- Grid Layout (3 Spalten Desktop, 1-2 Spalten Mobile)
- Jede Leistung als Card mit:
  * Passendes Icon
  * Name der Leistung
  * Kurze Beschreibung (2-3 Zeilen)
  * Optionaler Preis oder "Auf Anfrage"
- Hover-Effekte auf Cards
- Animationen beim Scrollen
- CTA unter den Services ("Alle Leistungen anzeigen" oder "Jetzt buchen")

DESIGN:
- Sauberes Card-Design
- Konsistente Abstände
- Passende Icons für jede Leistung
- Moderne Farbakzente

CODE-STRUKTUR:
\`\`\`typescript
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Zap, Shield, Clock, Award } from 'lucide-react';

export default function Services() {
  const services = [
    // Service-Daten hier
  ];

  return (
    // Implementierung hier
  );
}
\`\`\``;
  }

  private generateGalleryPrompt(): string {
    const galleryImages = this.checklistData.galleryImages || [];
    const portfolioImages = this.checklistData.portfolioImages || [];
    const beforeAfterImages = this.checklistData.beforeAfterImages || [];

    return `GALLERY/PORTFOLIO SEKTION:

Erstelle eine beeindruckende Galerie-Sektion mit:

KUNDENDATEN:
${galleryImages.length > 0 ? `- Galerie Bilder: ${galleryImages.length} Bilder bereitgestellt` : ''}
${portfolioImages.length > 0 ? `- Portfolio Bilder: ${portfolioImages.length} Bilder bereitgestellt` : ''}
${beforeAfterImages.length > 0 ? `- Vorher/Nachher: ${beforeAfterImages.length} Vergleiche` : ''}

ANFORDERUNGEN:
- Masonry oder Grid Layout
${beforeAfterImages.length > 0 ? '- Vorher/Nachher Slider für Vergleichsbilder' : ''}
- Lightbox für Vollbildansicht
- Kategorien/Filter (optional)
- Lazy Loading für Performance
- Responsive Layout
- Hover-Effekte

${galleryImages.length === 0 ? `FALLBACK:
- Verwende Platzhalter mit passenden Farben
- Zeige Text wie "Bilder folgen in Kürze"
- Oder überspringe diese Sektion` : ''}

CODE-STRUKTUR:
\`\`\`typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  // Implementierung hier
}
\`\`\``;
  }

  private generateContactPrompt(): string {
    const companyName = this.checklistData.companyName || this.checklistData.businessName;
    const phone = this.checklistData.phone || this.checklistData.phoneNumber;
    const email = this.checklistData.email || this.checklistData.contactEmail;
    const address = this.checklistData.address || this.checklistData.street;
    const city = this.checklistData.city;
    const zip = this.checklistData.postalCode || this.checklistData.zip;
    const openingHours = this.checklistData.openingHours;
    const facebook = this.checklistData.facebook || this.checklistData.facebookUrl;
    const instagram = this.checklistData.instagram || this.checklistData.instagramUrl;
    const linkedin = this.checklistData.linkedin || this.checklistData.linkedinUrl;

    return `KONTAKT SEKTION:

Erstelle eine umfassende Kontakt-Sektion mit:

KUNDENDATEN:
- Firmenname: ${companyName}
${phone ? `- Telefon: ${phone}` : ''}
${email ? `- E-Mail: ${email}` : ''}
${address ? `- Adresse: ${address}` : ''}
${city && zip ? `- Ort: ${zip} ${city}` : ''}
${openingHours ? `- Öffnungszeiten: ${openingHours}` : ''}

SOCIAL MEDIA:
${facebook ? `- Facebook: ${facebook}` : ''}
${instagram ? `- Instagram: ${instagram}` : ''}
${linkedin ? `- LinkedIn: ${linkedin}` : ''}

ANFORDERUNGEN:
- Zwei-Spalten-Layout (Desktop):
  * Links: Kontaktformular
  * Rechts: Kontaktinformationen & Karte
- Kontaktformular mit:
  * Name (Pflichtfeld)
  * E-Mail (Pflichtfeld)
  * Telefon (Optional)
  * Nachricht (Pflichtfeld)
  * Submit Button
  * Validierung
- Kontaktinfo-Cards mit Icons
- Google Maps Integration oder Karten-Placeholder
- Social Media Icons
- CTA: "Rückruf vereinbaren"

CODE-STRUKTUR:
\`\`\`typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Implementierung hier
}
\`\`\``;
  }

  private generateFooterPrompt(): string {
    const companyName = this.checklistData.companyName || this.checklistData.businessName;
    const phone = this.checklistData.phone || this.checklistData.phoneNumber;
    const email = this.checklistData.email || this.checklistData.contactEmail;
    const facebook = this.checklistData.facebook || this.checklistData.facebookUrl;
    const instagram = this.checklistData.instagram || this.checklistData.instagramUrl;

    return `FOOTER KOMPONENTE:

Erstelle einen professionellen Footer mit:

KUNDENDATEN:
- Firmenname: ${companyName}
${phone ? `- Telefon: ${phone}` : ''}
${email ? `- E-Mail: ${email}` : ''}

SOCIAL MEDIA:
${facebook ? `- Facebook: ${facebook}` : ''}
${instagram ? `- Instagram: ${instagram}` : ''}

ANFORDERUNGEN:
- Drei-Spalten-Layout (Desktop):
  * Spalte 1: Firmeninfo & Logo
  * Spalte 2: Quick Links (Startseite, Leistungen, Über uns, Kontakt)
  * Spalte 3: Kontakt & Social Media
- Copyright-Zeile am unteren Rand
- Rechtliche Links (Impressum, Datenschutz)
- Newsletter-Anmeldung (optional)
- Responsive für Mobile (einspaltig)

CODE-STRUKTUR:
\`\`\`typescript
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Implementierung hier
}
\`\`\``;
  }

  private generatePagePrompt(): string {
    const companyName = this.checklistData.companyName || this.checklistData.businessName || 'Firma';

    return `HAUPT-PAGE KOMPONENTE:

Erstelle die Haupt-Landing-Page, die alle Komponenten zusammenfügt:

ANFORDERUNGEN:
- Importiere alle erstellten Komponenten
- Strukturiere die Page in logischer Reihenfolge:
  1. Header (sticky)
  2. Hero
  3. Services
  4. Gallery (wenn Bilder vorhanden)
  5. Contact
  6. Footer
- Smooth Scroll-Verhalten
- SEO-optimiert (title, meta tags)
- Performance-optimiert

SEITENTITEL: "${companyName} - ${this.demoName}"
META DESCRIPTION: "Professionelle ${this.demoName} Dienstleistungen von ${companyName}. Jetzt Termin vereinbaren!"

CODE-STRUKTUR:
\`\`\`typescript
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Landing() {
  React.useEffect(() => {
    document.title = "${companyName} - ${this.demoName}";
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Komponenten hier */}
    </div>
  );
}
\`\`\``;
  }

  private assembleFullPrompt(
    systemPrompt: string,
    componentPrompts: GeneratedPrompt['componentPrompts'],
    pagePrompt: string
  ): string {
    const sections = [
      '='.repeat(80),
      'WEBSITE-GENERIERUNG: VOLLSTÄNDIGER PROMPT',
      '='.repeat(80),
      '',
      systemPrompt,
      '',
      '='.repeat(80),
      'KOMPONENTEN-ANFORDERUNGEN',
      '='.repeat(80),
      '',
      '## 1. HEADER',
      '-'.repeat(80),
      componentPrompts.Header,
      '',
      '## 2. HERO SECTION',
      '-'.repeat(80),
      componentPrompts.Hero,
      '',
      '## 3. SERVICES SECTION',
      '-'.repeat(80),
      componentPrompts.Services,
      '',
      '## 4. GALLERY SECTION',
      '-'.repeat(80),
      componentPrompts.Gallery,
      '',
      '## 5. CONTACT SECTION',
      '-'.repeat(80),
      componentPrompts.Contact,
      '',
      '## 6. FOOTER',
      '-'.repeat(80),
      componentPrompts.Footer,
      '',
      '='.repeat(80),
      'HAUPT-PAGE',
      '='.repeat(80),
      '',
      pagePrompt,
      '',
      '='.repeat(80),
      'ABSCHLUSS-ANFORDERUNGEN',
      '='.repeat(80),
      '',
      'QUALITÄTSSICHERUNG:',
      '- Alle Komponenten müssen eigenständig funktionieren',
      '- Keine TypeScript-Fehler',
      '- Responsive auf allen Geräten getestet',
      '- Alle Kundendaten korrekt eingefügt',
      '- Performance-optimiert',
      '- Produktionsreif',
      '',
      'DELIVERABLES:',
      '1. Header.tsx',
      '2. Hero.tsx',
      '3. Services.tsx',
      '4. Gallery.tsx',
      '5. Contact.tsx',
      '6. Footer.tsx',
      '7. Landing.tsx (Haupt-Page)',
      '',
      'Erstelle jetzt den vollständigen, produktionsreifen Code für alle Komponenten!',
      '='.repeat(80)
    ];

    return sections.join('\n');
  }

  public exportPromptToFile(): string {
    const prompt = this.generateFullPrompt();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `prompt_${this.templateName}_${timestamp}.txt`;

    return prompt.fullPrompt;
  }

  public getPromptSummary(): string {
    const companyName = this.checklistData.companyName || this.checklistData.businessName || 'Unbekannt';
    const services = this.checklistData.services || [];
    const hasImages = (this.checklistData.galleryImages || []).length > 0;

    return `
Prompt generiert für:
- Firma: ${companyName}
- Branche: ${this.demoName}
- Leistungen: ${services.length} erfasst
- Bilder: ${hasImages ? 'Ja' : 'Nein'}
- Template: ${this.templateName}
    `.trim();
  }
}

export function generatePromptFromChecklist(checklistData: any, templateName: string): GeneratedPrompt {
  const generator = new PromptGenerator(checklistData.checklist_data || checklistData, templateName);
  return generator.generateFullPrompt();
}

export function getPromptSummary(checklistData: any, templateName: string): string {
  const generator = new PromptGenerator(checklistData.checklist_data || checklistData, templateName);
  return generator.getPromptSummary();
}
