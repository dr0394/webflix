import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  ogImage = 'https://webflix.info/logowebflix499.png',
  canonical
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://webflix.info';
  const fullUrl = canonical || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: fullUrl },
      { property: 'og:image', content: ogImage },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ];

    if (keywords) {
      metaTags.push({ name: 'keywords', content: keywords });
    }

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const attributeValue = name || property;

      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue || '');
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

  }, [title, description, keywords, ogImage, fullUrl]);
};

export const PAGE_SEO = {
  home: {
    title: 'Webflix Webdesign | Professionelle Website für 499 € – SEO & Google-Indexierung',
    description: 'Professionelle Website vom Experten: Webdesign zum Festpreis von 499 €. Individuell erstellt, modern, mobiloptimiert & inkl. Google-Indexierung. Jetzt Website erstellen lassen mit Webflix.',
    keywords: 'webdesign, website erstellen lassen, professionelle website, website 499 euro, google indexierung, seo optimierung, webdesign festpreis, mobiloptimiert, website experte, webflix'
  },
  shop: {
    title: 'Website kaufen - Fertige Designs ab 29,90€ | Webflix Shop',
    description: 'Jetzt Website kaufen! Über 15 fertige Designs für jede Branche. Günstige Websites ab 29,90€/Monat - professionell, modern und sofort einsatzbereit.',
    keywords: 'website kaufen, fertige website, website design kaufen, günstige website, branchenspezifische website'
  },
  showroom: {
    title: 'Demo Showroom - Website Designs ansehen | Webflix',
    description: 'Entdecke unsere fertigen Website-Designs! Interaktive Demos für Autoaufbereitung, Handwerk, Beauty & mehr. Jetzt ansehen und Website kaufen.',
    keywords: 'website demo, website beispiele, website vorlagen, fertige websites, branchenspezifische websites'
  },
  configurator: {
    title: 'Website Konfigurator - Deine Website zusammenstellen | Webflix',
    description: 'Stelle deine perfekte Website zusammen! Website-Konfigurator mit Preis-Kalkulator. Wähle Design, Features und Add-ons - ab 29,90€/Monat.',
    keywords: 'website konfigurator, website zusammenstellen, website calculator, website preise'
  },
  about: {
    title: 'Über Webflix - Günstige Websites für KMU | Unsere Mission',
    description: 'Webflix macht professionelle Websites erschwinglich. Erfahre mehr über unsere Mission, günstige Websites für kleine und mittlere Unternehmen anzubieten.',
    keywords: 'über webflix, website anbieter, günstige websites, kmu websites'
  },
  contact: {
    title: 'Kontakt - Website kaufen Beratung | Webflix Support',
    description: 'Fragen zu unseren Websites? Kontaktiere das Webflix Team für persönliche Beratung. Website kaufen leicht gemacht - wir helfen dir!',
    keywords: 'webflix kontakt, website beratung, support, hilfe'
  },
  custom: {
    title: 'Professionelle Website für 499 € – Express-Umsetzung in 2 Tagen | Webflix',
    description: 'Website erstellen lassen zum Festpreis: 499 € einmalig. 2 Tage Express-Umsetzung, mobiloptimiert, SEO & Google-Indexierung inklusive. Jetzt anfragen!',
    keywords: 'website 499 euro, website erstellen lassen, express website, webdesign festpreis, professionelle website, seo optimierung'
  },
  offer499: {
    title: '499 € Website Angebot – Professionelles Webdesign | Webflix',
    description: 'Einmalige Setup-Kosten: 499 €. Professionelle Website in 2 Tagen. Inkl. Mobiloptimierung, SEO & Google-Indexierung. Aktion gültig bis 31.03.2026.',
    keywords: 'website 499 euro, webdesign angebot, website aktion, express website, günstige website professionell'
  },
  addons: {
    title: 'Website Add-Ons - Erweitere deine Website | Webflix',
    description: 'Erweitere deine Website mit professionellen Add-Ons: Buchungssystem, KI-Chatbot, WhatsApp-Integration, SEO-Boost und mehr. Ab 4,99€/Monat.',
    keywords: 'website addons, website erweiterungen, buchungssystem, ki chatbot, seo optimierung'
  },
  checkout: {
    title: 'Checkout - Website jetzt kaufen | Webflix',
    description: 'Sichere Bestellung deiner neuen Website. In 48h online - garantiert! Jetzt kaufen und durchstarten.',
    keywords: 'website kaufen checkout, website bestellen, sichere zahlung'
  },
  demoAutoaufbereitung: {
    title: 'Autoaufbereitung Website kaufen - Demo | Ab 29,90€',
    description: 'Professionelle Autoaufbereitung Website kaufen. Mit Vorher-Nachher-Slider, Online-Buchung & mehr. Perfekt für Detailing-Profis. Demo ansehen!',
    keywords: 'autoaufbereitung website, detailing website, autopflege website kaufen'
  },
  demoGartenlandschaftsbau: {
    title: 'Gartenbau Website kaufen - Demo | Landschaftsbau Website',
    description: 'Gartenbau Website kaufen - professionell und günstig. Mit Portfolio, Projekt-Galerie und Anfrageformular. Perfekt für Landschaftsbauer. Demo ansehen!',
    keywords: 'gartenbau website, landschaftsbau website, gärtner website kaufen'
  },
  demoBeauty: {
    title: 'Beauty Salon Website kaufen - Demo | Kosmetik Website',
    description: 'Beauty Salon Website kaufen - elegant und professionell. Mit Online-Buchung, Preisliste und Galerie. Perfekt für Kosmetikstudios. Demo ansehen!',
    keywords: 'beauty website, kosmetikstudio website, friseursalon website kaufen'
  },
  demoHandwerk: {
    title: 'Handwerker Website kaufen - Demo | Handwerksbetrieb Website',
    description: 'Handwerker Website kaufen - professionell und vertrauenswürdig. Mit Referenzen, Leistungen und Kontakt. Perfekt für Handwerksbetriebe. Demo ansehen!',
    keywords: 'handwerker website, handwerksbetrieb website, handwerk website kaufen'
  },
  impressum: {
    title: 'Impressum | Webflix - Website kaufen',
    description: 'Impressum und rechtliche Angaben von Webflix. Professionelle Websites kaufen ab 29,90€/Monat.',
    keywords: 'impressum, rechtliche angaben'
  },
  datenschutz: {
    title: 'Datenschutzerklärung | Webflix - Website kaufen',
    description: 'Datenschutzerklärung von Webflix. Erfahre wie wir deine Daten schützen. DSGVO-konform und transparent.',
    keywords: 'datenschutz, dsgvo, datenschutzerklärung'
  },
  agb: {
    title: 'AGB | Webflix - Allgemeine Geschäftsbedingungen',
    description: 'Allgemeine Geschäftsbedingungen von Webflix. Transparente Bedingungen für den Website-Kauf. Lies mehr!',
    keywords: 'agb, geschäftsbedingungen, vertragsbedingungen'
  }
};
