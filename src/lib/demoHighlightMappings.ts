export interface HighlightZone {
  id: string;
  label: string;
  sectionId: string;
  top: string;
  left: string;
  width: string;
  height: string;
  description: string;
}

interface DemoMapping {
  demoUrl: string;
  zones: HighlightZone[];
}

export const demoHighlightMappings: Record<string, DemoMapping> = {
  autoaufbereitung: {
    demoUrl: '/demo/autoaufbereitung',
    zones: [
      {
        id: 'hero_title',
        label: 'Hauptüberschrift',
        sectionId: 'hero_section',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Die Hauptüberschrift, die Besucher als Erstes sehen'
      },
      {
        id: 'hero_subtitle',
        label: 'Unterüberschrift',
        sectionId: 'hero_section',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibungstext unter der Hauptüberschrift'
      },
      {
        id: 'hero_image',
        label: 'Hero-Bild',
        sectionId: 'hero_section',
        top: '15%',
        left: '5%',
        width: '90%',
        height: '60%',
        description: 'Das große Hintergrundbild im Hero-Bereich'
      },
      {
        id: 'cta_text',
        label: 'Button-Text',
        sectionId: 'hero_section',
        top: '50%',
        left: '38%',
        width: '24%',
        height: '6%',
        description: 'Text des Call-to-Action Buttons'
      },
      {
        id: 'vehicle_types',
        label: 'Fahrzeugtypen',
        sectionId: 'vehicle_types',
        top: '70%',
        left: '5%',
        width: '90%',
        height: '25%',
        description: 'Ihre ausgewählten Fahrzeugtypen'
      },
      {
        id: 'before_after_images',
        label: 'Vorher/Nachher Bilder',
        sectionId: 'before_after',
        top: '120%',
        left: '5%',
        width: '90%',
        height: '40%',
        description: 'Vorher/Nachher Vergleichs-Slider'
      },
      {
        id: 'gallery_images',
        label: 'Galerie-Bilder',
        sectionId: 'gallery',
        top: '170%',
        left: '5%',
        width: '90%',
        height: '35%',
        description: 'Ihre Arbeitsbeispiele in einer Galerie'
      },
      {
        id: 'gallery_title',
        label: 'Galerie-Überschrift',
        sectionId: 'gallery',
        top: '165%',
        left: '10%',
        width: '80%',
        height: '4%',
        description: 'Überschrift für die Galerie-Sektion'
      },
      {
        id: 'service_packages',
        label: 'Service-Pakete',
        sectionId: 'services',
        top: '215%',
        left: '5%',
        width: '90%',
        height: '30%',
        description: 'Ihre Reinigungspakete und Services'
      },
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'contact',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Firmenname im Header'
      },
      {
        id: 'phone',
        label: 'Telefonnummer',
        sectionId: 'contact',
        top: '2%',
        left: '85%',
        width: '12%',
        height: '4%',
        description: 'Telefonnummer im Header'
      },
      {
        id: 'email',
        label: 'E-Mail',
        sectionId: 'contact',
        top: '96%',
        left: '10%',
        width: '20%',
        height: '2%',
        description: 'Ihre E-Mail-Adresse im Footer'
      },
      {
        id: 'address_street',
        label: 'Straße & Hausnummer',
        sectionId: 'contact',
        top: '96%',
        left: '35%',
        width: '15%',
        height: '2%',
        description: 'Straße und Hausnummer'
      },
      {
        id: 'address_city',
        label: 'Stadt',
        sectionId: 'contact',
        top: '96%',
        left: '51%',
        width: '10%',
        height: '2%',
        description: 'Stadt'
      },
      {
        id: 'address_zip',
        label: 'PLZ',
        sectionId: 'contact',
        top: '96%',
        left: '62%',
        width: '8%',
        height: '2%',
        description: 'Postleitzahl'
      },
      {
        id: 'opening_hours',
        label: 'Öffnungszeiten',
        sectionId: 'contact',
        top: '96%',
        left: '71%',
        width: '20%',
        height: '2%',
        description: 'Ihre Öffnungszeiten'
      },
      {
        id: 'whatsapp',
        label: 'WhatsApp Nummer',
        sectionId: 'contact',
        top: '2%',
        left: '75%',
        width: '8%',
        height: '4%',
        description: 'WhatsApp Kontakt-Button'
      },
      {
        id: 'desired_domain',
        label: 'Wunschdomain',
        sectionId: 'contact',
        top: '94%',
        left: '10%',
        width: '25%',
        height: '1.5%',
        description: 'Ihre bevorzugte Domain wird hier angezeigt'
      },
      {
        id: 'logo',
        label: 'Firmenlogo',
        sectionId: 'branding',
        top: '2%',
        left: '3%',
        width: '12%',
        height: '4%',
        description: 'Ihr Logo im Header'
      },
      {
        id: 'primary_color',
        label: 'Hauptfarbe',
        sectionId: 'branding',
        top: '50%',
        left: '38%',
        width: '24%',
        height: '6%',
        description: 'Ihre Hauptfarbe wird für Buttons verwendet'
      },
      {
        id: 'secondary_color',
        label: 'Sekundärfarbe',
        sectionId: 'branding',
        top: '96%',
        left: '0%',
        width: '100%',
        height: '4%',
        description: 'Ihre Sekundärfarbe wird im Footer verwendet'
      }
    ]
  },
  bauunternehmen: {
    demoUrl: '/demo/bauunternehmen',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Bauunternehmen-Name im Header'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift Ihrer Bauunternehmen-Website'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Bau-Dienstleistungen'
      },
      {
        id: 'phone',
        label: 'Telefonnummer',
        sectionId: 'header',
        top: '2%',
        left: '85%',
        width: '12%',
        height: '4%',
        description: 'Kontakt-Telefon im Header'
      },
      {
        id: 'email',
        label: 'E-Mail',
        sectionId: 'footer',
        top: '96%',
        left: '10%',
        width: '20%',
        height: '2%',
        description: 'E-Mail im Footer'
      }
    ]
  },
  beauty: {
    demoUrl: '/demo/beauty',
    zones: [
      {
        id: 'company_name',
        label: 'Salonname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Beauty-Salon Name im Header'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihren Beauty-Service'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Beauty-Behandlungen'
      }
    ]
  },
  elektriker: {
    demoUrl: '/demo/elektriker',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Elektriker-Betrieb Name'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihren Elektriker-Service'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer elektrischen Dienstleistungen'
      },
      {
        id: 'phone',
        label: 'Notruf-Telefon',
        sectionId: 'emergency-banner',
        top: '8%',
        left: '70%',
        width: '25%',
        height: '4%',
        description: '24/7 Notdienst-Telefonnummer im Banner'
      }
    ]
  },
  gartenlandschaftsbau: {
    demoUrl: '/demo/gartenlandschaftsbau',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Gartenbau-Betrieb Name'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihren Gartenbau-Service'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Gartenbau-Dienstleistungen'
      }
    ]
  },
  gastro: {
    demoUrl: '/demo/gastro',
    zones: [
      {
        id: 'company_name',
        label: 'Restaurant Name',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Restaurant-Name im Header'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihr Restaurant'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Küche und Philosophie'
      },
      {
        id: 'email',
        label: 'E-Mail (Reservierung)',
        sectionId: 'footer',
        top: '96%',
        left: '10%',
        width: '20%',
        height: '2%',
        description: 'E-Mail für Tischreservierungen'
      },
      {
        id: 'phone',
        label: 'Telefon (Reservierung)',
        sectionId: 'footer',
        top: '96%',
        left: '35%',
        width: '20%',
        height: '2%',
        description: 'Telefon für Reservierungen'
      },
      {
        id: 'address_street',
        label: 'Adresse',
        sectionId: 'footer',
        top: '96%',
        left: '60%',
        width: '25%',
        height: '2%',
        description: 'Ihre Restaurant-Adresse'
      }
    ]
  },
  gebaeudereinigung: {
    demoUrl: '/demo/gebaeudereinigung',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Reinigungsdienst-Name'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihren Reinigungsservice'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Reinigungsdienstleistungen'
      }
    ]
  },
  handwerk: {
    demoUrl: '/demo/handwerk',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Handwerksbetrieb-Name'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihren Handwerksbetrieb'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer handwerklichen Dienstleistungen'
      }
    ]
  },
  metallbau: {
    demoUrl: '/demo/metallbau',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Metallbau-Firmenname'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihren Metallbau-Betrieb'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Metallbau-Dienstleistungen'
      }
    ]
  },
  metzgerei: {
    demoUrl: '/demo/metzgerei',
    zones: [
      {
        id: 'company_name',
        label: 'Metzgerei Name',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Metzgerei-Name im Header'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihre Metzgerei'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Fleisch- und Wurstspezialitäten'
      },
      {
        id: 'phone',
        label: 'Bestelltelefon',
        sectionId: 'header',
        top: '2%',
        left: '85%',
        width: '12%',
        height: '4%',
        description: 'Telefon für Bestellungen'
      }
    ]
  },
  personalbrand: {
    demoUrl: '/demo/personalbrand',
    zones: [
      {
        id: 'company_name',
        label: 'Ihr Name',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr persönlicher Name oder Brand'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihre Personal Brand'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Ihr Pitch oder Ihre Expertise'
      }
    ]
  },
  physiotherapie: {
    demoUrl: '/demo/physiotherapie',
    zones: [
      {
        id: 'company_name',
        label: 'Praxis Name',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Praxisname im Header'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihre Physiotherapie-Praxis'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Behandlungsmethoden'
      },
      {
        id: 'phone',
        label: 'Termin-Telefon',
        sectionId: 'header',
        top: '2%',
        left: '85%',
        width: '12%',
        height: '4%',
        description: 'Telefon für Terminvereinbarungen'
      }
    ]
  },
  security: {
    demoUrl: '/demo/security',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'header',
        top: '2%',
        left: '3%',
        width: '15%',
        height: '4%',
        description: 'Ihr Sicherheitsdienst-Name'
      },
      {
        id: 'hero_title',
        label: 'Hero Überschrift',
        sectionId: 'hero',
        top: '22%',
        left: '10%',
        width: '80%',
        height: '12%',
        description: 'Hauptüberschrift für Ihren Sicherheitsdienst'
      },
      {
        id: 'hero_subtitle',
        label: 'Hero Unterzeile',
        sectionId: 'hero',
        top: '35%',
        left: '12%',
        width: '76%',
        height: '7%',
        description: 'Beschreibung Ihrer Sicherheitsdienstleistungen'
      }
    ]
  },
  'webflix-one-kfz': {
    demoUrl: 'https://auto-demo-webflix.bolt.host',
    zones: [
      {
        id: 'company_name',
        label: 'Firmenname',
        sectionId: 'hero_section',
        top: '3%',
        left: '5%',
        width: '20%',
        height: '5%',
        description: 'Ihr Firmenname im Header'
      },
      {
        id: 'hero_tagline',
        label: 'Tagline/Slogan',
        sectionId: 'hero_section',
        top: '25%',
        left: '10%',
        width: '80%',
        height: '10%',
        description: 'Ihr einprägsamer Slogan'
      },
      {
        id: 'hero_description',
        label: 'Hero Beschreibung',
        sectionId: 'hero_section',
        top: '38%',
        left: '15%',
        width: '70%',
        height: '6%',
        description: 'Kurzbeschreibung Ihres Services'
      },
      {
        id: 'hero_image',
        label: 'Hero-Bild',
        sectionId: 'hero_section',
        top: '10%',
        left: '0%',
        width: '100%',
        height: '50%',
        description: 'Das große Hintergrundbild mit Cinematic-Effekt'
      },
      {
        id: 'service_types',
        label: 'Service-Karten',
        sectionId: 'services_section',
        top: '65%',
        left: '5%',
        width: '90%',
        height: '25%',
        description: 'Ihre ausgewählten Services'
      },
      {
        id: 'services_title',
        label: 'Service-Überschrift',
        sectionId: 'services_section',
        top: '60%',
        left: '10%',
        width: '80%',
        height: '4%',
        description: 'Überschrift der Service-Section'
      },
      {
        id: 'vehicle_types',
        label: 'Fahrzeugtypen',
        sectionId: 'vehicle_selector',
        top: '95%',
        left: '5%',
        width: '90%',
        height: '20%',
        description: 'Ihre angebotenen Fahrzeugtypen'
      },
      {
        id: 'before_after_title',
        label: 'Before/After Titel',
        sectionId: 'before_after',
        top: '120%',
        left: '10%',
        width: '80%',
        height: '4%',
        description: 'Überschrift für Vorher/Nachher-Section'
      },
      {
        id: 'before_after_images',
        label: 'Before/After Bilder',
        sectionId: 'before_after',
        top: '125%',
        left: '5%',
        width: '90%',
        height: '35%',
        description: 'Ihre Vorher/Nachher Vergleichsbilder'
      },
      {
        id: 'gallery_title',
        label: 'Galerie-Titel',
        sectionId: 'portfolio_gallery',
        top: '165%',
        left: '10%',
        width: '80%',
        height: '4%',
        description: 'Überschrift der Portfolio-Galerie'
      },
      {
        id: 'gallery_images',
        label: 'Galerie-Bilder',
        sectionId: 'portfolio_gallery',
        top: '170%',
        left: '5%',
        width: '90%',
        height: '40%',
        description: 'Ihre Portfolio-Fotos in einer Grid-Galerie'
      },
      {
        id: 'google_reviews_enabled',
        label: 'Google Bewertungen',
        sectionId: 'testimonials',
        top: '215%',
        left: '10%',
        width: '80%',
        height: '15%',
        description: 'Google Bewertungen Banner'
      },
      {
        id: 'contact_title',
        label: 'Kontakt-Titel',
        sectionId: 'contact_section',
        top: '235%',
        left: '10%',
        width: '80%',
        height: '4%',
        description: 'Überschrift der Kontakt-Section'
      },
      {
        id: 'company_address',
        label: 'Adresse',
        sectionId: 'contact_section',
        top: '240%',
        left: '15%',
        width: '30%',
        height: '8%',
        description: 'Ihre Firmenadresse'
      },
      {
        id: 'company_phone',
        label: 'Telefon',
        sectionId: 'contact_section',
        top: '240%',
        left: '50%',
        width: '20%',
        height: '4%',
        description: 'Ihre Telefonnummer'
      },
      {
        id: 'company_email',
        label: 'E-Mail',
        sectionId: 'contact_section',
        top: '245%',
        left: '50%',
        width: '20%',
        height: '4%',
        description: 'Ihre E-Mail-Adresse'
      },
      {
        id: 'opening_hours',
        label: 'Öffnungszeiten',
        sectionId: 'contact_section',
        top: '250%',
        left: '15%',
        width: '30%',
        height: '8%',
        description: 'Ihre Geschäftszeiten'
      },
      {
        id: 'maps_address',
        label: 'Google Maps',
        sectionId: 'contact_section',
        top: '260%',
        left: '5%',
        width: '90%',
        height: '25%',
        description: 'Interaktive Google Maps Karte'
      },
      {
        id: 'company_logo',
        label: 'Logo',
        sectionId: 'branding',
        top: '3%',
        left: '5%',
        width: '12%',
        height: '5%',
        description: 'Ihr Firmenlogo im Header'
      },
      {
        id: 'primary_color',
        label: 'Primärfarbe',
        sectionId: 'branding',
        top: '45%',
        left: '40%',
        width: '20%',
        height: '5%',
        description: 'Hauptfarbe für Buttons und Akzente'
      },
      {
        id: 'secondary_color',
        label: 'Sekundärfarbe',
        sectionId: 'branding',
        top: '290%',
        left: '0%',
        width: '100%',
        height: '10%',
        description: 'Akzentfarbe für Gradienten im Footer'
      }
    ]
  }
};

export function getHighlightMapping(demoName: string): DemoMapping | null {
  return demoHighlightMappings[demoName] || null;
}

export function getHighlightZoneByFieldId(demoName: string, fieldId: string): HighlightZone | null {
  const mapping = getHighlightMapping(demoName);
  if (!mapping) return null;
  return mapping.zones.find(zone => zone.id === fieldId) || null;
}

export function getSectionZones(demoName: string, sectionId: string): HighlightZone[] {
  const mapping = getHighlightMapping(demoName);
  if (!mapping) return [];
  return mapping.zones.filter(zone => zone.sectionId === sectionId);
}
