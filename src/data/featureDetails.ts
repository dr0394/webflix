export interface FeatureDetail {
  title: string;
  description: string;
  image?: string;
}

export const featureDetails: Record<string, FeatureDetail[]> = {
  innovation: [
    {
      title: "Deine Website in jeder Hosentasche.",
      description: "78% deiner Kunden nutzen das Smartphone für die erste Recherche. Webflix Mobile-First-Designs laden 3x schneller als herkömmliche Websites und konvertieren auf allen Bildschirmgrößen optimal. Touch-Gesten, Swipe-Navigation und Thumb-friendly Buttons sorgen für intuitive Bedienung.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=600&fit=crop"
    },
    {
      title: "Performance, die begeistert.",
      description: "Progressive Web App Technologie macht deine Website zur nativen App-Alternative. Offline-Funktionalität, Push-Notifications und Home-Screen-Installation ohne App Store. Deine Kunden erreichen dich auch bei schlechter Internetverbindung.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop"
    },
    {
      title: "Ein Design, alle Geräte.",
      description: "Responsive Breakpoints passen sich automatisch an Smartphone, Tablet, Laptop und Desktop an. Adaptive Images laden nur die benötigte Auflösung. Das Ergebnis: Perfekte Darstellung und optimale Ladezeiten auf jedem Gerät."
    }
  ],
  designs: [
    {
      title: "Jede Branche tickt anders.",
      description: "Handwerker brauchen Vertrauen, Berater verkaufen Expertise, Online-Shops leben von Impulskäufen. Was bei Restaurants funktioniert, scheitert bei Anwaltskanzleien. Unsere Webflix Website-Experten erkennen diese Unterschiede und bauen für jede Branche die passende Struktur – von der Farbpsychologie bis zur Nutzerführung.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
    },
    {
      title: "Google liebt Webflix-Websites – und das bringt dir mehr Sichtbarkeit.",
      description: "Sauberer HTML5-Code, strukturierte Daten und optimierte Meta-Tags sorgen für Top-Rankings bei Suchmaschinen. Gleichzeitig laden die Seiten blitzschnell und reagieren sofort – das verbessert das Nutzererlebnis und erfüllt automatisch Googles Anforderungen. Das Ergebnis: Du bist vorn – und deine Konkurrenz sieht nur noch deine Rücklichter.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
    }
  ],
  hosting: [
    {
      title: "Global Edge Network – Gemacht, um überall schnell zu sein.",
      description: "Deine Website, überall auf der Welt blitzschnell. Während andere noch auf einen Server setzen, nutzt Webflix ein globales Edge-Netzwerk mit 200+ Standorten weltweit. Supabase Edge Functions sorgen dafür, dass deine Website vom nächstgelegenen Server ausgeliefert wird – egal ob dein Kunde in München oder Miami sitzt.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=600&fit=crop"
    },
    {
      title: "Zukunftssichere Architektur.",
      description: "HTTP/3, Brotli-Compression und moderne Web-Standards sind Standard, nicht Option. Progressive Web App Features sorgen für App-ähnliche Performance. Deine Website lädt schneller als die meisten nativen Apps.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop"
    },
    {
      title: "Skalierung ohne Grenzen.",
      description: "Auto-Scaling basierend auf Load, automatische Backup-Strategien und Point-in-Time Recovery. Von 10 bis 10 Millionen Nutzern – die Performance bleibt konstant."
    }
  ],
  ai: [
    {
      title: "Intelligente Content-Erstellung",
      description: "Einfach intelligent. Webflix nutzt KI für Content-Optimierung und automatische Text-Generierung – wie unser GPT-basiertes Copywriting-System, das branchenspezifische Texte erstellt und für SEO-Performance optimiert wurde. Content und Code werden zusammen optimiert – wie die automatische Meta-Description-Generierung, Alt-Text-Erstellung und Keyword-Integration.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"
    },
    {
      title: "Performance-Intelligence",
      description: "Reagiert in Echtzeit. Traffic-Spike erkannt? Auto-Scaling aktiviert. Langsame Database-Query? Automatisch optimiert. Bot-Angriff? Sofort geblockt. Die KI arbeitet schneller als menschliche Administratoren und verhindert Ausfälle bevor sie passieren.",
      image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&h=600&fit=crop"
    }
  ],
  environment: [
    {
      title: "Webflix ist für sofort messbaren Impact und permanente CO2-Entfernung bekannt",
      description: "Wie unser 1:1 Impact System in Kooperation mit UNO-zertifizierten Projekten, das für jeden Website-Kauf einen Baum pflanzt und CO2 permanent aus der Atmosphäre entfernt.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop"
    },
    {
      title: "Der Impact.",
      description: "Einzelne Bäume pflanzen reicht nicht. Für jede Website katalysieren wir systemischen Wandel durch integrierte Umwelt- und Sozialprojekte. Unsere Formel lautet: Aufforstung + Bildung + Mikrofinanzierung = nachhaltiger Wohlstand und Arbeitsplätze.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop"
    },
    {
      title: "Das digitale Legacy-Projekt.",
      description: "Ihre Digitalisierung schafft echten Impact: Sie finanzieren durch den Kauf einer Webflix Website Aufforstung, fördern faire Chancen und ermöglichen CO₂-Neutralität – für eine nachhaltige Zukunft. Ihre Website wird so zu Ihrem digitalen Vermächtnis für eine bessere Welt."
    }
  ],
  backup: [
    {
      title: "Sicherheit auf Bank-Niveau.",
      description: "SSL-Verschlüsselung ist Standard, Zero-Trust-Architecture ist Premium. Multi-Layer-Firewall, DDoS-Schutz und Malware-Scanning rund um die Uhr. Deine Website ist sicherer als 99,9% aller Online-Shops.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop"
    },
    {
      title: "DSGVO-Compliance ohne Kopfschmerzen.",
      description: "Automatisches Cookie-Consent-Management, Privacy-by-Design-Prinzipien und Datenminimierung. Rechtssichere Datenschutzerklärungen, Impressum-Generator und EU-Server-Hosting. Abmahnungen gehören der Vergangenheit an.",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=600&fit=crop"
    },
    {
      title: "Backup-Strategien für den Ernstfall.",
      description: "Täglich automatische Backups mit 30-Tage-Aufbewahrung. Ein-Klick-Wiederherstellung bei Problemen. Geo-redundante Speicherung in deutschen Rechenzentren. Deine Daten sind sicherer als in jedem Tresor."
    }
  ]
};
