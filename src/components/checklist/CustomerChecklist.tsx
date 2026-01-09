import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, CheckCircle, AlertCircle, FileText, Image, Palette, Globe, Phone, Mail, MapPin, Star, MessageCircle, Camera, Building, TreePine, User, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  required: boolean;
  examples?: string[];
  tips?: string[];
}

interface BrancheChecklist {
  [key: string]: ChecklistItem[];
}

const CustomerChecklist: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState<any>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Get order data from navigation state or localStorage
    const data = location.state?.orderData || JSON.parse(localStorage.getItem('webflix-latest-order') || 'null');
    if (data) {
      setOrderData(data);
    } else {
      // Redirect back if no order data
      navigate('/');
    }
  }, [location, navigate]);

  const branchenChecklisten: BrancheChecklist = {
    autoaufbereitung: [
      {
        id: 'logo',
        title: 'Logo (PNG/SVG, transparent)',
        description: 'Ihr Firmenlogo in hoher Auflösung mit transparentem Hintergrund',
        icon: Image,
        required: true,
        examples: ['PNG mit transparentem Hintergrund', 'SVG-Datei (vektorbasiert)', 'Mindestens 500x500px'],
        tips: ['Falls kein Logo vorhanden: Wir können ein einfaches Logo erstellen', 'Vermeiden Sie JPG-Dateien (haben keinen transparenten Hintergrund)']
      },
      {
        id: 'colors',
        title: 'Firmenfarben (Hex-Codes)',
        description: 'Die Hauptfarben Ihrer Marke als Hex-Codes',
        icon: Palette,
        required: true,
        examples: ['Primärfarbe: #FF0000', 'Sekundärfarbe: #0066CC', 'Akzentfarbe: #FFD700'],
        tips: ['Falls unbekannt: Wir können Farben aus Ihrem Logo extrahieren', 'Maximal 3-4 Hauptfarben verwenden']
      },
      {
        id: 'texts',
        title: 'Texte für alle Seiten',
        description: 'Alle Texte für Ihre Website (Startseite, Über uns, Leistungen, etc.)',
        icon: FileText,
        required: true,
        examples: ['Firmen-Beschreibung', 'Leistungsübersicht', 'Über uns Text', 'Kontakt-Informationen'],
        tips: ['Wir helfen bei der Textoptimierung', 'SEO-optimierte Texte für bessere Auffindbarkeit']
      },
      {
        id: 'images',
        title: 'Hochauflösende Bilder (min. 1920px breit)',
        description: 'Professionelle Fotos Ihrer Arbeit und Ihres Unternehmens',
        icon: Camera,
        required: true,
        examples: ['Arbeitsplatz/Werkstatt Fotos', 'Team-Bilder', 'Fahrzeuge in Bearbeitung', 'Firmengebäude'],
        tips: ['Mindestens 5-10 hochwertige Bilder', 'Gute Beleuchtung und Bildqualität wichtig']
      },
      {
        id: 'contact',
        title: 'Kontaktdaten & Öffnungszeiten',
        description: 'Vollständige Kontaktinformationen und Geschäftszeiten',
        icon: Phone,
        required: true,
        examples: ['Telefonnummer', 'E-Mail-Adresse', 'Geschäftsadresse', 'Öffnungszeiten Mo-So'],
        tips: ['Alle Kontaktdaten aktuell halten', 'Notfall-Kontakt für Eilfälle angeben']
      },
      {
        id: 'google-business',
        title: 'Google My Business Zugang (falls vorhanden)',
        description: 'Zugang zu Ihrem Google My Business Profil für Integration',
        icon: Globe,
        required: false,
        examples: ['Google My Business E-Mail', 'Berechtigung für Verwaltung', 'Bestehende Bewertungen'],
        tips: ['Falls nicht vorhanden: Wir helfen beim Erstellen', 'Wichtig für lokale SEO']
      },
      {
        id: 'social-media',
        title: 'Social Media Links',
        description: 'Links zu Ihren Social Media Profilen',
        icon: MessageCircle,
        required: false,
        examples: ['Facebook Seite', 'Instagram Profil', 'YouTube Kanal', 'LinkedIn Profil'],
        tips: ['Nur aktive Profile angeben', 'Profile sollten professionell gestaltet sein']
      },
      {
        id: 'google-reviews',
        title: 'Google Bewertungen freischalten',
        description: 'Berechtigung zur Anzeige Ihrer Google Bewertungen',
        icon: Star,
        required: false,
        examples: ['Google My Business Zugang', 'Bewertungen-Widget Berechtigung'],
        tips: ['Erhöht Vertrauen bei Neukunden', 'Regelmäßig um Bewertungen bitten']
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp Business Nummer',
        description: 'Ihre WhatsApp Business Telefonnummer für Kundenanfragen',
        icon: MessageCircle,
        required: false,
        examples: ['+49 123 456 7890', 'WhatsApp Business Account'],
        tips: ['WhatsApp Business App verwenden', 'Automatische Antworten einrichten']
      },
      {
        id: 'before-after',
        title: 'Vorher/Nachher Bilder (je 5-10 Stück)',
        description: 'Beeindruckende Vorher/Nachher Vergleiche Ihrer Arbeit',
        icon: Camera,
        required: false,
        examples: ['Fahrzeug vor Reinigung', 'Fahrzeug nach Reinigung', 'Gleicher Winkel/Beleuchtung'],
        tips: ['Gleiche Perspektive für Vorher/Nachher', 'Gute Beleuchtung für dramatischen Effekt']
      }
    ],
    gartenlandschaftsbau: [
      {
        id: 'logo',
        title: 'Logo (PNG/SVG, transparent)',
        description: 'Ihr Firmenlogo in hoher Auflösung mit transparentem Hintergrund',
        icon: Image,
        required: true,
        examples: ['PNG mit transparentem Hintergrund', 'SVG-Datei (vektorbasiert)', 'Mindestens 500x500px'],
        tips: ['Falls kein Logo vorhanden: Wir können ein einfaches Logo erstellen']
      },
      {
        id: 'colors',
        title: 'Firmenfarben (Hex-Codes)',
        description: 'Die Hauptfarben Ihrer Marke als Hex-Codes',
        icon: Palette,
        required: true,
        examples: ['Primärfarbe: #228B22', 'Sekundärfarbe: #8FBC8F', 'Akzentfarbe: #FFD700'],
        tips: ['Grüntöne passen gut zu Gartenbau', 'Natürliche Farben verwenden']
      },
      {
        id: 'texts',
        title: 'Texte für alle Seiten',
        description: 'Alle Texte für Ihre Website',
        icon: FileText,
        required: true,
        examples: ['Firmen-Geschichte', 'Leistungsübersicht', 'Gartenphilosophie', 'Referenzen'],
        tips: ['Emotionale Verbindung zur Natur schaffen']
      },
      {
        id: 'images',
        title: 'Hochauflösende Bilder (min. 1920px breit)',
        description: 'Professionelle Fotos Ihrer Gartenprojekte',
        icon: Camera,
        required: true,
        examples: ['Vorher/Nachher Gartenprojekte', 'Team bei der Arbeit', 'Verschiedene Jahreszeiten', 'Detailaufnahmen'],
        tips: ['Verschiedene Jahreszeiten zeigen', 'Detailaufnahmen von Pflanzen und Materialien']
      },
      {
        id: 'contact',
        title: 'Kontaktdaten & Öffnungszeiten',
        description: 'Vollständige Kontaktinformationen',
        icon: Phone,
        required: true,
        examples: ['Geschäftszeiten', 'Notfall-Kontakt', 'Saisonale Öffnungszeiten'],
        tips: ['Saisonale Unterschiede berücksichtigen']
      },
      {
        id: 'services',
        title: 'Detaillierte Leistungsübersicht',
        description: 'Alle Gartendienstleistungen mit Beschreibungen',
        icon: TreePine,
        required: true,
        examples: ['Gartenplanung', 'Rasenpflege', 'Heckenschnitt', 'Baumpflege', 'Terrassenbau'],
        tips: ['Saisonale Services hervorheben', 'Preisrahmen angeben falls gewünscht']
      },
      {
        id: 'project-gallery',
        title: 'Projekt-Galerie (10-20 Bilder)',
        description: 'Ihre besten Gartenprojekte in hoher Auflösung',
        icon: Camera,
        required: false,
        examples: ['Komplette Gartenumgestaltungen', 'Terrassenprojekte', 'Pflanzungen', 'Wasserspiele'],
        tips: ['Verschiedene Projekttypen zeigen', 'Vorher/Nachher besonders wirkungsvoll']
      }
    ],
    personalbrand: [
      {
        id: 'logo',
        title: 'Logo/Personal Brand Mark (PNG/SVG)',
        description: 'Ihr persönliches Logo oder Brand-Zeichen',
        icon: Image,
        required: true,
        examples: ['Personal Logo', 'Initialen-Design', 'Brand-Symbol'],
        tips: ['Kann auch ein stilisiertes Foto sein', 'Sollte Ihre Persönlichkeit widerspiegeln']
      },
      {
        id: 'colors',
        title: 'Brand-Farben (Hex-Codes)',
        description: 'Ihre persönlichen Brand-Farben',
        icon: Palette,
        required: true,
        examples: ['Hauptfarbe: #9333EA', 'Akzentfarbe: #EC4899', 'Neutrale Farbe: #6B7280'],
        tips: ['Farben sollten Ihre Persönlichkeit ausdrücken', '2-3 Hauptfarben reichen']
      },
      {
        id: 'bio',
        title: 'Persönliche Bio & Story',
        description: 'Ihre persönliche Geschichte und Mission',
        icon: User,
        required: true,
        examples: ['Über mich Text', 'Werdegang', 'Mission & Vision', 'Persönliche Werte'],
        tips: ['Authentisch und persönlich schreiben', 'Erfolge und Erfahrungen hervorheben']
      },
      {
        id: 'professional-photos',
        title: 'Professionelle Fotos von Ihnen',
        description: 'Hochwertige Portraits und Arbeitsfotos',
        icon: Camera,
        required: true,
        examples: ['Professionelle Headshots', 'Arbeitsplatz-Fotos', 'Lifestyle-Bilder', 'Behind-the-scenes'],
        tips: ['Verschiedene Stimmungen/Settings', 'Authentisch aber professionell']
      },
      {
        id: 'services',
        title: 'Service-/Angebots-Beschreibungen',
        description: 'Detaillierte Beschreibung Ihrer Dienstleistungen',
        icon: FileText,
        required: true,
        examples: ['Coaching-Pakete', 'Beratungsleistungen', 'Online-Kurse', 'Workshops'],
        tips: ['Nutzen für Kunden klar kommunizieren', 'Preise optional angeben']
      },
      {
        id: 'testimonials',
        title: 'Kundenstimmen & Testimonials',
        description: 'Positive Rückmeldungen Ihrer Kunden',
        icon: Star,
        required: false,
        examples: ['Schriftliche Testimonials', 'Video-Testimonials', 'Erfolgsgeschichten', 'Vorher/Nachher Transformationen'],
        tips: ['Mit Foto und vollem Namen wenn möglich', 'Konkrete Ergebnisse erwähnen']
      },
      {
        id: 'content-samples',
        title: 'Content-Beispiele',
        description: 'Beispiele Ihrer besten Arbeit/Inhalte',
        icon: FileText,
        required: false,
        examples: ['Blog-Artikel', 'Social Media Posts', 'Video-Content', 'Podcast-Episoden'],
        tips: ['Ihre besten Inhalte auswählen', 'Verschiedene Content-Formate zeigen']
      }
    ],
    default: [
      {
        id: 'logo',
        title: 'Logo (PNG/SVG, transparent)',
        description: 'Ihr Firmenlogo in hoher Auflösung',
        icon: Image,
        required: true,
        examples: ['PNG mit transparentem Hintergrund', 'SVG-Datei', 'Mindestens 500x500px'],
        tips: ['Professionelles Logo erhöht Vertrauen']
      },
      {
        id: 'colors',
        title: 'Firmenfarben (Hex-Codes)',
        description: 'Ihre Corporate Identity Farben',
        icon: Palette,
        required: true,
        examples: ['Primärfarbe: #0066CC', 'Sekundärfarbe: #FF6600', 'Neutrale Farbe: #333333'],
        tips: ['Konsistente Farbverwendung wichtig']
      },
      {
        id: 'texts',
        title: 'Texte für alle Seiten',
        description: 'Alle Inhalte für Ihre Website',
        icon: FileText,
        required: true,
        examples: ['Startseite-Text', 'Über uns', 'Leistungen', 'Kontakt'],
        tips: ['SEO-optimierte Texte für bessere Auffindbarkeit']
      },
      {
        id: 'images',
        title: 'Hochauflösende Bilder (min. 1920px breit)',
        description: 'Professionelle Fotos für Ihre Website',
        icon: Camera,
        required: true,
        examples: ['Firmenfotos', 'Produktbilder', 'Team-Fotos', 'Arbeitsplatz'],
        tips: ['Gute Bildqualität ist entscheidend für professionellen Eindruck']
      },
      {
        id: 'contact',
        title: 'Kontaktdaten & Öffnungszeiten',
        description: 'Alle Kontaktinformationen',
        icon: Phone,
        required: true,
        examples: ['Telefon', 'E-Mail', 'Adresse', 'Öffnungszeiten'],
        tips: ['Alle Daten aktuell halten']
      }
    ]
  };

  const getChecklistForIndustry = (industry: string): ChecklistItem[] => {
    // Map industry to checklist
    const industryMap: { [key: string]: string } = {
      'autoaufbereitung': 'autoaufbereitung',
      'gartenlandschaftsbau': 'gartenlandschaftsbau',
      'coaching': 'personalbrand',
      'food-blog': 'personalbrand',
      'andere': 'default'
    };

    const checklistKey = industryMap[industry] || 'default';
    let baseChecklist = [...branchenChecklisten[checklistKey]];

    // Add conditional items based on add-ons
    if (orderData?.addOns) {
      orderData.addOns.forEach((addon: any) => {
        if (addon.id === 'google-reviews' && addon.enabled) {
          baseChecklist.push({
            id: 'google-reviews-access',
            title: 'Google Bewertungen freischalten',
            description: 'Berechtigung zur Anzeige Ihrer Google Bewertungen',
            icon: Star,
            required: false,
            examples: ['Google My Business Zugang', 'Bewertungen-Widget Berechtigung'],
            tips: ['Erhöht Vertrauen bei Neukunden']
          });
        }
        
        if (addon.id === 'whatsapp-integration' && addon.enabled) {
          baseChecklist.push({
            id: 'whatsapp-business',
            title: 'WhatsApp Business Nummer',
            description: 'Ihre WhatsApp Business Telefonnummer',
            icon: MessageCircle,
            required: false,
            examples: ['+49 123 456 7890', 'WhatsApp Business Account'],
            tips: ['WhatsApp Business App verwenden']
          });
        }

        if (addon.id === 'before-after-slider' && addon.enabled) {
          baseChecklist.push({
            id: 'before-after-images',
            title: 'Vorher/Nachher Bilder (je 5-10 Stück)',
            description: 'Beeindruckende Vorher/Nachher Vergleiche',
            icon: Camera,
            required: false,
            examples: ['Gleicher Winkel/Beleuchtung', 'Dramatische Unterschiede', 'Hochauflösend'],
            tips: ['Gleiche Perspektive für Vorher/Nachher wichtig']
          });
        }
      });
    }

    return baseChecklist;
  };

  const toggleItem = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadChecklist = () => {
    if (!orderData) return;

    const checklist = getChecklistForIndustry(orderData.customer.industry);
    const requiredItems = checklist.filter(item => item.required);
    const optionalItems = checklist.filter(item => !item.required);

    const checklistText = `
WEBFLIX KUNDEN-CHECKLISTE
=========================

Bestell-ID: ${orderData.id}
Kunde: ${orderData.customer.firstName} ${orderData.customer.lastName}
Firma: ${orderData.customer.company}
Template: ${orderData.template.name}
Datum: ${new Date(orderData.timestamp).toLocaleDateString('de-DE')}

WICHTIG: 48h-GO-LIVE-GARANTIE
=============================
Sobald Sie uns alle PFLICHT-Inhalte (✓ markiert) zur Verfügung gestellt haben,
geht Ihre Website innerhalb von 48 Stunden live!

PFLICHT-INHALTE (für Go-Live erforderlich):
==========================================
${requiredItems.map(item => `
□ ${item.title}
  ${item.description}
  ${item.examples ? `Beispiele: ${item.examples.join(', ')}` : ''}
  ${item.tips ? `Tipp: ${item.tips.join(' | ')}` : ''}
`).join('')}

OPTIONALE INHALTE (können nachgereicht werden):
==============================================
${optionalItems.map(item => `
□ ${item.title}
  ${item.description}
  ${item.examples ? `Beispiele: ${item.examples.join(', ')}` : ''}
  ${item.tips ? `Tipp: ${item.tips.join(' | ')}` : ''}
`).join('')}

ÜBERTRAGUNG DER INHALTE:
=======================
Senden Sie uns Ihre Inhalte per:
• E-Mail: support@webflix.de
• WeTransfer: Für große Dateien
• Google Drive/Dropbox: Geteilter Ordner

WICHTIGE HINWEISE:
=================
• Alle Bilder mindestens 1920px breit für beste Qualität
• Texte können in Word, PDF oder einfacher E-Mail gesendet werden
• Bei Fragen stehen wir Ihnen jederzeit zur Verfügung
• Nach Go-Live: 5 Stunden Änderungen pro Jahr inklusive

KONTAKT BEI FRAGEN:
==================
E-Mail: support@webflix.de
Telefon: 0800 0004766
WhatsApp: +49 175 1194624

Vielen Dank für Ihr Vertrauen in Webflix!
Ihr Webflix-Team
`;

    const blob = new Blob([checklistText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Webflix-Checkliste-${orderData.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Keine Bestelldaten gefunden</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-semibold rounded-lg"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  const checklist = getChecklistForIndustry(orderData.customer.industry);
  const requiredItems = checklist.filter(item => item.required);
  const optionalItems = checklist.filter(item => !item.required);
  const completedRequired = requiredItems.filter(item => checkedItems.has(item.id)).length;
  const totalRequired = requiredItems.length;
  const progressPercentage = (completedRequired / totalRequired) * 100;

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück</span>
            </button>
            <img 
              src="https://i.imgur.com/2SbjgE7.png" 
              alt="Webflix" 
              className="h-8 w-auto"
            />
            <button
              onClick={downloadChecklist}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-semibold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Checkliste herunterladen</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-[orange-500] to-[pink-400] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Ihre Webflix Checkliste</h1>
            <p className="text-gray-300 mb-6">
              Stellen Sie uns diese Inhalte zur Verfügung, damit wir Ihre Website innerhalb von 48 Stunden live schalten können.
            </p>
            
            {/* Order Info */}
            <div className="bg-[#333333] rounded-lg p-4 mb-6">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Bestell-ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{orderData.id}</span>
                    <button
                      onClick={() => copyToClipboard(orderData.id, 'orderId')}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedField === 'orderId' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Template:</span>
                  <p className="font-medium">{orderData.template.name}</p>
                </div>
                <div>
                  <span className="text-gray-400">Branche:</span>
                  <p className="font-medium capitalize">{orderData.customer.industry}</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-[#333333] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Fortschritt Pflicht-Inhalte:</span>
                <span className="text-sm font-medium">{completedRequired}/{totalRequired} abgehakt</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[orange-500] to-[pink-400] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {progressPercentage === 100 && (
                <div className="mt-2 text-green-400 text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Bereit für 48h-Go-Live!
                </div>
              )}
            </div>
          </div>

          {/* Required Items */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold">Pflicht-Inhalte (für Go-Live erforderlich)</h2>
            </div>
            
            <div className="space-y-4">
              {requiredItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-[#333333] rounded-lg p-6 border-l-4 transition-all ${
                    checkedItems.has(item.id) 
                      ? 'border-green-500 bg-green-500/5' 
                      : 'border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-all ${
                        checkedItems.has(item.id)
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {checkedItems.has(item.id) && <Check className="w-4 h-4 text-white" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <item.icon className="w-5 h-5 text-[orange-500]" />
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                          PFLICHT
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{item.description}</p>
                      
                      {item.examples && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Beispiele:</h4>
                          <ul className="text-sm text-gray-400 space-y-1">
                            {item.examples.map((example, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-[orange-500] rounded-full"></div>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {item.tips && (
                        <div className="bg-black/40 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-[orange-500] mb-2">💡 Profi-Tipps:</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {item.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Items */}
          {optionalItems.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-[orange-500]" />
                <h2 className="text-2xl font-bold">Optionale Inhalte (können nachgereicht werden)</h2>
              </div>
              
              <div className="space-y-4">
                {optionalItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-[#333333] rounded-lg p-6 border-l-4 transition-all ${
                      checkedItems.has(item.id) 
                        ? 'border-[orange-500] bg-[orange-500]/5' 
                        : 'border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-all ${
                          checkedItems.has(item.id)
                            ? 'border-[orange-500] bg-[orange-500]'
                            : 'border-gray-400 hover:border-gray-300'
                        }`}
                      >
                        {checkedItems.has(item.id) && <Check className="w-4 h-4 text-black" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon className="w-5 h-5 text-[orange-500]" />
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <span className="px-2 py-1 bg-[orange-500]/20 text-[orange-500] text-xs rounded-full border border-[orange-500]/30">
                            OPTIONAL
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{item.description}</p>
                        
                        {item.examples && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Beispiele:</h4>
                            <ul className="text-sm text-gray-400 space-y-1">
                              {item.examples.map((example, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-[orange-500] rounded-full"></div>
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {item.tips && (
                          <div className="bg-black/40 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-[orange-500] mb-2">💡 Profi-Tipps:</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                              {item.tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Upload Info */}
          <div className="bg-gradient-to-r from-[orange-500]/10 to-[pink-400]/10 border border-[orange-500]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[orange-500]" />
              So senden Sie uns Ihre Inhalte
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">📧 E-Mail (für Texte & kleine Dateien):</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[orange-500]">support@webflix.de</span>
                  <button
                    onClick={() => copyToClipboard('support@webflix.de', 'email')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-gray-400">Betreff: Webflix Inhalte - {orderData.id}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">📁 Große Dateien (Bilder, Videos):</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• WeTransfer.com (bis 2GB kostenlos)</li>
                  <li>• Google Drive (geteilter Ordner)</li>
                  <li>• Dropbox (geteilter Link)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-400">48h-Go-Live-Garantie</span>
              </div>
              <p className="text-sm text-gray-300">
                Sobald wir alle Pflicht-Inhalte erhalten haben, geht Ihre Website innerhalb von 48 Stunden live!
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadChecklist}
              className="px-8 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-semibold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Checkliste als PDF herunterladen
            </button>
            
            <a
              href="mailto:support@webflix.de?subject=Webflix Inhalte - {orderData.id}&body=Hallo Webflix Team,%0D%0A%0D%0AIch sende Ihnen hiermit die Inhalte für meine Website:%0D%0A%0D%0ABestellnummer: {orderData.id}%0D%0AFirma: {orderData.customer.company}%0D%0A%0D%0AViele Grüße%0D%0A{orderData.customer.firstName} {orderData.customer.lastName}"
              className="px-8 py-3 border border-[orange-500] text-[orange-500] hover:bg-[orange-500] hover:text-black rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              E-Mail an Support senden
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChecklist;