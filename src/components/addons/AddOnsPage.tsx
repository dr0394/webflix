import React, { useState } from 'react';
import { ArrowLeft, Play, Eye, Star, MessageCircle, BarChart3, Shield, Zap, Mail, Calendar, Users, Lock, MessageSquare, Camera, MapPin, AlertTriangle, Info, Bot, Heart, Phone, CreditCard, Search, Globe, Instagram, FileText, Calculator, ChevronRight, X, Check, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddonQuizModal from './AddonQuizModal';
import { addonQuestions } from './addonQuestions';

interface AddOn {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number | { months12: number; months24: number; months36: number };
  icon: React.ComponentType<any>;
  liveEffect: string;
  requirements: string;
  category: 'essential' | 'premium' | 'advanced';
  demoComponent?: React.ComponentType<any>;
  benefits: string[];
  useCases: string[];
  screenshots?: string[];
}

const AddOnsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAddOn, setSelectedAddOn] = useState<AddOn | null>(null);
  const [showDemo, setShowDemo] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState<string | null>(null);
  const [duration, setDuration] = useState(12);

  // Demo Components
  const WhatsAppDemo = () => (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-green-500 text-white p-4 text-center">
          <h3 className="font-bold">Ihre Website</h3>
        </div>
        <div className="p-6">
          <h4 className="font-bold mb-4">Kontakt aufnehmen</h4>
          <p className="text-gray-600 mb-4">Haben Sie Fragen? Kontaktieren Sie uns!</p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <MessageCircle className="w-5 h-5" />
            WhatsApp schreiben
          </button>
        </div>
      </div>
    </div>
  );

  const GoogleReviewsDemo = () => (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-bold text-lg">Google</span>
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="text-2xl font-bold">5.0 <span className="text-sm text-gray-600">(24 Bewertungen)</span></p>
        </div>
        <div className="space-y-4">
          {[
            { name: "Thomas M.", text: "Hervorragender Service! Sehr professionell.", rating: 5 },
            { name: "Sarah K.", text: "Bin sehr zufrieden mit dem Ergebnis.", rating: 5 }
          ].map((review, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map(j => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm text-gray-700 mb-2">"{review.text}"</p>
              <p className="text-xs text-gray-500 font-semibold">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ChatbotDemo = () => (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[orange-500] to-[pink-400] text-black p-4">
            <h3 className="font-bold flex items-center gap-2">
              <Bot className="w-5 h-5" />
              KI-Assistent
            </h3>
          </div>
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm">👋 Hallo! Wie kann ich Ihnen helfen?</p>
            </div>
            <div className="bg-[orange-500]/20 p-3 rounded-lg ml-8">
              <p className="text-sm">Welche Services bieten Sie an?</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm">Gerne! Wir bieten professionelle Autoreinigung, Innenraumaufbereitung und Polierservice. Welcher Service interessiert Sie?</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder="Nachricht eingeben..." />
              <button className="bg-[orange-500] text-black px-4 py-2 rounded-lg">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BeforeAfterDemo = () => (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-48">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-semibold">Vorher</span>
            </div>
            <div className="bg-gradient-to-r from-[orange-500] to-[pink-400] flex items-center justify-center">
              <span className="text-black font-semibold">Nachher</span>
            </div>
          </div>
          <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg transform -translate-x-0.5"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-1 h-4 bg-gray-400"></div>
          </div>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm text-gray-600">Ziehen Sie den Regler für den Vergleich</p>
        </div>
      </div>
    </div>
  );

  const TerminbuchungDemo = () => (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[orange-500] to-[pink-400] text-black p-4">
          <h3 className="font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Termin buchen
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
              <div key={day} className="text-center text-xs font-semibold p-2">{day}</div>
            ))}
            {Array.from({length: 35}, (_, i) => (
              <button key={i} className={`p-2 text-xs rounded ${
                i === 15 ? 'bg-[orange-500] text-black' : 
                i > 10 && i < 25 ? 'hover:bg-gray-100' : 'text-gray-300'
              }`}>
                {i > 10 && i < 25 ? i - 10 : ''}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <button className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg text-sm">09:00 - Verfügbar</button>
            <button className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg text-sm">14:00 - Verfügbar</button>
            <button className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg text-sm">16:00 - Belegt</button>
          </div>
        </div>
      </div>
    </div>
  );

  const addOns: AddOn[] = [
    // Essential Add-ons
    {
      id: 'whatsapp-click-to-chat',
      name: 'WhatsApp Click-to-Chat',
      description: '1-Klick-Kontakt über WhatsApp',
      longDescription: 'Ermöglichen Sie Ihren Kunden direkten Kontakt über WhatsApp mit nur einem Klick. Erhöht die Kontaktrate um durchschnittlich 40%.',
      price: 4.90,
      icon: MessageCircle,
      liveEffect: 'Fixer Button „WhatsApp schreiben"',
      requirements: 'WhatsApp-Nummer, Begrüßungstext',
      category: 'essential',
      demoComponent: WhatsAppDemo,
      benefits: ['Höhere Kontaktrate', 'Direkter Kundenkontakt', 'Mobile-optimiert', 'Sofortige Antworten'],
      useCases: ['Kundenservice', 'Terminvereinbarung', 'Schnelle Anfragen', 'Support'],
      screenshots: ['https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'google-reviews-live',
      name: 'Google-Bewertungen (Live-Feed)',
      description: 'Echte Reviews – mehr Vertrauen',
      longDescription: 'Zeigen Sie automatisch Ihre neuesten Google-Bewertungen auf der Website. Baut Vertrauen auf und erhöht Conversions um bis zu 25%.',
      price: 4.90,
      icon: Star,
      liveEffect: 'Bewertungs-Karussell mit Sternen/Quotes',
      requirements: 'Link zum Google-Profil, 3–5 Zitate optional',
      category: 'essential',
      demoComponent: GoogleReviewsDemo,
      benefits: ['Mehr Vertrauen', 'Automatische Updates', 'Social Proof', 'Höhere Conversions'],
      useCases: ['Vertrauensaufbau', 'Kundenbewertungen', 'Social Proof', 'Reputation'],
      screenshots: ['https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'contact-forms',
      name: 'Professionelle Kontaktformulare',
      description: 'Strukturierte Anfragen mit Validierung',
      longDescription: 'Optimierte Kontaktformulare mit intelligenter Validierung und Spam-Schutz. Erhöht die Qualität der Anfragen erheblich.',
      price: 1.99,
      icon: Mail,
      liveEffect: 'Optimierte Kontaktformulare mit Validierung',
      requirements: 'E-Mail-Adresse für Anfragen',
      category: 'essential',
      benefits: ['Bessere Lead-Qualität', 'Spam-Schutz', 'Mobile-optimiert', 'Automatische Weiterleitung'],
      useCases: ['Kundenanfragen', 'Terminvereinbarung', 'Angebote', 'Support'],
      screenshots: ['https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    
    // Premium Add-ons
    {
      id: 'ai-chatbot-leadbot',
      name: 'KI-Chatbot „LeadBot"',
      description: 'Beantwortet Fragen 24/7 und sammelt Leads',
      longDescription: 'Intelligenter Chatbot, der häufige Fragen automatisch beantwortet und qualifizierte Leads sammelt. Arbeitet 24/7 und erhöht die Lead-Generierung um 60%.',
      price: 15.00,
      icon: Bot,
      liveEffect: 'Chat-Bubble unten rechts, Demo-Flow mit 5 FAQs',
      requirements: '10 häufige Fragen/Antworten, Übergabe-E-Mail/Tel',
      category: 'premium',
      demoComponent: ChatbotDemo,
      benefits: ['24/7 Verfügbarkeit', 'Lead-Qualifizierung', 'Automatische Antworten', 'Kostenersparnis'],
      useCases: ['Kundenservice', 'Lead-Generierung', 'FAQ-Beantwortung', 'Vorselektion'],
      screenshots: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'sorglos-paket',
      name: 'Sorglos-Paket (unbegrenzte Änderungen)',
      description: 'Unlimitierte Text- & Bildänderungen – stressfrei',
      longDescription: 'Unbegrenzte Änderungen an Texten und Bildern ohne zusätzliche Kosten. Perfekt für Unternehmen, die flexibel bleiben möchten.',
      price: { months12: 14.90, months24: 12.90, months36: 10.90 },
      icon: Heart,
      liveEffect: 'Badge „Sorglos aktiv" im Dashboard',
      requirements: 'Nix weiter',
      category: 'premium',
      benefits: ['Unbegrenzte Änderungen', 'Keine Extra-Kosten', 'Schnelle Umsetzung', 'Flexibilität'],
      useCases: ['Häufige Updates', 'Saisonale Anpassungen', 'Aktuelle Angebote', 'Content-Updates'],
      screenshots: ['https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'online-booking',
      name: 'Terminbuchung',
      description: 'Online Termine buchen – weniger Telefon',
      longDescription: 'Professionelles Online-Buchungssystem mit Kalender-Integration. Reduziert Telefonanrufe um 70% und verbessert die Kundenerfahrung.',
      price: 6.90,
      icon: Calendar,
      liveEffect: '„Termin vereinbaren"-Button/Section',
      requirements: 'Tool/Link (z. B. Calendly), Leistungen/Dauer',
      category: 'premium',
      demoComponent: TerminbuchungDemo,
      benefits: ['Weniger Telefonate', 'Automatische Bestätigung', '24/7 Buchung', 'Kalender-Sync'],
      useCases: ['Dienstleistungen', 'Beratungstermine', 'Behandlungen', 'Besichtigungen'],
      screenshots: ['https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'crm-light',
      name: 'CRM light',
      description: 'Anfragen im Blick: neu → Angebot → gewonnen',
      longDescription: 'Einfaches Kundenmanagement-System zur Verfolgung von Anfragen und Projekten. Behält den Überblick über alle Leads und deren Status.',
      price: 9.90,
      icon: Users,
      liveEffect: 'Leads-Tabelle im Dashboard',
      requirements: 'Statusnamen, Benachrichtigungs-E-Mail',
      category: 'premium',
      benefits: ['Lead-Tracking', 'Status-Übersicht', 'Automatische Erinnerungen', 'Umsatz-Tracking'],
      useCases: ['Lead-Management', 'Projekt-Tracking', 'Kundenbetreuung', 'Sales-Pipeline'],
      screenshots: ['https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'before-after-slider',
      name: 'Vorher/Nachher-Slider',
      description: 'Zeig deine Qualität auf einen Blick',
      longDescription: 'Interaktiver Slider für beeindruckende Vorher/Nachher-Vergleiche. Perfekt für Dienstleister, die ihre Arbeit visuell präsentieren möchten.',
      price: 4.90,
      icon: Camera,
      liveEffect: 'Slider-Block nach „Leistungen"',
      requirements: 'Gepaarte Bilder + kurze Texte',
      category: 'premium',
      demoComponent: BeforeAfterDemo,
      benefits: ['Visueller Impact', 'Qualitäts-Beweis', 'Interaktiv', 'Conversion-Boost'],
      useCases: ['Renovierung', 'Reinigung', 'Beauty', 'Reparaturen'],
      screenshots: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    
    // Advanced Add-ons
    {
      id: 'case-studies',
      name: 'Case-Studies / Projekte',
      description: 'Erfolgsgeschichten mit Bildern & Zahlen',
      longDescription: 'Professionelle Darstellung Ihrer besten Projekte mit Bildern, Beschreibungen und Ergebnissen. Baut Vertrauen auf und zeigt Expertise.',
      price: 4.90,
      icon: FileText,
      liveEffect: 'Projekt-Karten (Bild, Kurztext, Ergebnis)',
      requirements: '2–3 Projekte (Titel, Bilder, Ergebnis)',
      category: 'advanced',
      benefits: ['Expertise zeigen', 'Vertrauen aufbauen', 'Referenzen', 'Erfolge dokumentieren'],
      useCases: ['Portfolio', 'Referenzen', 'Erfolgsgeschichten', 'Projektdokumentation'],
      screenshots: ['https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'email-marketing',
      name: 'E-Mail-Marketing Starter',
      description: 'Newsletter sammeln & versenden (Basis)',
      longDescription: 'Einfaches Newsletter-System zum Sammeln von E-Mail-Adressen und Versenden von Marketing-E-Mails. Ideal für den Einstieg ins E-Mail-Marketing.',
      price: 9.90,
      icon: Mail,
      liveEffect: 'Newsletter-Form + DSGVO-Hinweis',
      requirements: 'Absendername/E-Mail (Domain), Liste (optional)',
      category: 'advanced',
      benefits: ['Lead-Sammlung', 'Direktmarketing', 'Kundenbindung', 'Automatisierung'],
      useCases: ['Newsletter', 'Angebote', 'Updates', 'Kundenbindung'],
      screenshots: ['https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'seo-starter',
      name: 'SEO-Starter',
      description: 'Keywords & Metas für bessere Sichtbarkeit',
      longDescription: 'Professionelle SEO-Optimierung mit Keyword-Recherche und Meta-Tags. Verbessert die Sichtbarkeit in Suchmaschinen erheblich.',
      price: 14.90,
      icon: Search,
      liveEffect: '„SEO-optimiert"-Badge, Metas hinterlegt',
      requirements: 'Top-5 Keywords, 3 Wettbewerber-Links, Städte',
      category: 'advanced',
      benefits: ['Bessere Rankings', 'Mehr Traffic', 'Lokale Sichtbarkeit', 'Wettbewerbsvorteil'],
      useCases: ['Suchmaschinenoptimierung', 'Lokales Marketing', 'Traffic-Steigerung', 'Konkurrenzfähigkeit'],
      screenshots: ['https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'analytics-light',
      name: 'Analytics light + Conversions',
      description: 'Besucher, Top-Seiten & Leads verstehen',
      longDescription: 'Einfaches Analytics-Dashboard mit den wichtigsten Kennzahlen. Verstehen Sie Ihre Besucher und optimieren Sie Ihre Website kontinuierlich.',
      price: 4.90,
      icon: BarChart3,
      liveEffect: 'Analytics-Widget im Dashboard',
      requirements: 'Was zählt als Conversion (Formular/Call/WA)?',
      category: 'advanced',
      benefits: ['Datenbasierte Entscheidungen', 'Performance-Tracking', 'Conversion-Optimierung', 'ROI-Messung'],
      useCases: ['Website-Optimierung', 'Marketing-Analyse', 'Performance-Tracking', 'Erfolgs-Messung'],
      screenshots: ['https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'inquiry-wizard',
      name: 'Anfrage-Wizard (Multi-Step)',
      description: 'Mehr qualifizierte Leads mit einem smarten Formular',
      longDescription: 'Mehrstufiges Anfrageformular, das Kunden durch einen intelligenten Prozess führt. Erhöht die Lead-Qualität und Conversion-Rate.',
      price: 6.90,
      icon: Zap,
      liveEffect: 'Multi-Step-Form statt Standard-Form',
      requirements: '5–7 Fragen, Pflichtfelder, Erfolgs-Message',
      category: 'advanced',
      benefits: ['Höhere Lead-Qualität', 'Bessere Conversion', 'Strukturierte Anfragen', 'Weniger Spam'],
      useCases: ['Komplexe Dienstleistungen', 'Beratung', 'Maßanfertigungen', 'Projektanfragen'],
      screenshots: ['https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'price-calculator',
      name: 'Preisrechner light (Online-Tool)',
      description: 'Kalkulator: Kunde sieht „ab-Preis", du bekommst den Lead',
      longDescription: 'Interaktiver Preisrechner, der Kunden eine Preisschätzung gibt und gleichzeitig Kontaktdaten sammelt. Perfekt für Dienstleister mit variablen Preisen.',
      price: 9.90,
      icon: Calculator,
      liveEffect: 'Rechner-Section mit Ergebnis + Anfrage',
      requirements: 'Parameter/Regeln, Mindestpreise',
      category: 'advanced',
      benefits: ['Lead-Generierung', 'Preistransparenz', 'Qualifizierung', 'Automatisierung'],
      useCases: ['Variable Preise', 'Komplexe Kalkulationen', 'Dienstleistungen', 'Maßanfertigungen'],
      screenshots: ['https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'dsgvo-plus',
      name: 'DSGVO-Plus',
      description: 'Impressum, Datenschutz & Cookie-Banner ready',
      longDescription: 'Komplette DSGVO-Compliance mit Impressum, Datenschutzerklärung und Cookie-Banner. Rechtssicher und aktuell.',
      price: 6.90,
      icon: Shield,
      liveEffect: 'Cookie-Banner + Rechtsseiten verlinkt',
      requirements: 'Firmendaten, USt-ID, Kontakt Datenschutz',
      category: 'advanced',
      benefits: ['Rechtssicherheit', 'DSGVO-Compliance', 'Professionell', 'Aktuell'],
      useCases: ['Rechtssicherheit', 'Compliance', 'Vertrauen', 'Professionalität'],
      screenshots: ['https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'instagram-feed',
      name: 'Instagram-Feed',
      description: 'Automatisch frische Bilder von Insta',
      longDescription: 'Automatische Integration Ihres Instagram-Feeds auf der Website. Hält die Website immer aktuell mit Ihren neuesten Posts.',
      price: 4.90,
      icon: Instagram,
      liveEffect: 'Grid/Slider mit neuesten Posts',
      requirements: 'Profil/Token, Hashtag (optional)',
      category: 'advanced',
      benefits: ['Automatische Updates', 'Frischer Content', 'Social Proof', 'Cross-Platform'],
      useCases: ['Social Media Marketing', 'Content-Updates', 'Lifestyle-Brands', 'Visual Content'],
      screenshots: ['https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800']
    },
    {
      id: 'multilingual',
      name: 'Mehrsprachigkeit (DE/EN)',
      description: 'Deutsch & Englisch – per Sprachschalter',
      longDescription: 'Vollständige Übersetzung der Website ins Englische mit eleganter Sprachauswahl. Erweitert Ihre Zielgruppe international.',
      price: 9.90,
      icon: Globe,
      liveEffect: 'Language-Toggle in der Navbar',
      requirements: 'EN-Texte (oder Übersetzung buchen)',
      category: 'advanced',
      benefits: ['Internationale Reichweite', 'Mehr Kunden', 'Professionell', 'SEO-Boost'],
      useCases: ['Internationale Kunden', 'Tourismus', 'Export', 'Mehrsprachige Zielgruppe'],
      screenshots: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800']
    }
  ];

  const getAddOnPrice = (addon: AddOn): number => {
    if (typeof addon.price === 'number') {
      return addon.price;
    }
    switch (duration) {
      case 24: return addon.price.months24;
      case 36: return addon.price.months36;
      default: return addon.price.months12;
    }
  };

  const filteredAddOns = selectedCategory === 'all' 
    ? addOns 
    : addOns.filter(addon => addon.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'essential': return Zap;
      case 'premium': return Star;
      case 'advanced': return Settings;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential': return 'text-green-600 bg-green-50 border-green-200';
      case 'premium': return 'text-[orange-500] bg-[orange-500]/10 border-[orange-500]/30';
      case 'advanced': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück</span>
            </button>
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/2SbjgE7.png" 
                alt="Webflix" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Add-ons Showcase</span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-[orange-500] to-[pink-400] rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            <Settings className="w-10 h-10 text-black relative z-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Webflix <span className="bg-gradient-to-r from-[orange-500] to-[pink-400] bg-clip-text text-transparent">Add-ons</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Erweitern Sie Ihre Website mit professionellen Add-ons. Jedes Add-on wurde speziell entwickelt, 
            um Ihre Conversion-Rate zu steigern und Ihren Kunden ein besseres Erlebnis zu bieten.
          </p>

          {/* Duration Selection */}
          <div className="max-w-md mx-auto mb-8">
            <h3 className="text-lg font-semibold mb-4">Preise für Laufzeit:</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { months: 12, label: '12 Monate', discount: 0 },
                { months: 24, label: '24 Monate', discount: 15 },
                { months: 36, label: '36 Monate', discount: 25 }
              ].map((option) => (
                <button
                  key={option.months}
                  onClick={() => setDuration(option.months)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    duration === option.months
                      ? 'bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-semibold shadow-lg'
                      : 'bg-[#333333] text-gray-300 hover:bg-[#404040]'
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                  {option.discount > 0 && (
                    <div className="text-xs">-{option.discount}%</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'all', label: 'Alle Add-ons', icon: FileText },
            { id: 'essential', label: 'Basis-Features', icon: Zap },
            { id: 'premium', label: 'Premium-Features', icon: Star },
            { id: 'advanced', label: 'Erweiterte Features', icon: Settings }
          ].map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[orange-500] to-[pink-400] text-black shadow-lg'
                    : 'bg-[#333333] text-gray-300 hover:bg-[#404040]'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Add-ons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredAddOns.map((addon) => (
            <div
              key={addon.id}
              className="bg-[#333333] rounded-2xl overflow-hidden border border-white/10 hover:border-[orange-500]/50 transition-all duration-300 hover:scale-105 group"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[orange-500]/10 to-[pink-400]/10 p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[orange-500] to-[pink-400] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    <addon.icon className="w-6 h-6 text-black relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{addon.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(addon.category)}`}>
                      {addon.category === 'essential' ? 'Basis' : addon.category === 'premium' ? 'Premium' : 'Erweitert'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300">{addon.description}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-400 mb-4 leading-relaxed">{addon.longDescription}</p>
                
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Vorteile:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {addon.benefits.slice(0, 4).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[orange-500] rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-[orange-500]/10 to-[pink-400]/10 rounded-xl p-4 mb-4 border border-[orange-500]/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Preis:</span>
                    <span className="font-bold text-xl bg-gradient-to-r from-[orange-500] to-[pink-400] bg-clip-text text-transparent">
                      {getAddOnPrice(addon).toFixed(2)}€/Monat
                    </span>
                  </div>
                  {typeof addon.price !== 'number' && (
                    <div className="text-xs text-gray-400 mt-1">
                      Gestaffelt: {addon.price.months12}€ (12M) / {addon.price.months24}€ (24M) / {addon.price.months36}€ (36M)
                    </div>
                  )}
                </div>

                {/* Quiz Button */}
                {addonQuestions[addon.id as keyof typeof addonQuestions] && (
                  <button
                    onClick={() => setShowQuiz(addon.id)}
                    className="w-full mb-3 px-3 py-2 text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-orange-500/30"
                  >
                    <HelpCircle className="w-3 h-3" />
                    Brauche ich das Add-on?
                  </button>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedAddOn(addon)}
                    className="flex-1 bg-gradient-to-r from-[orange-500] to-[pink-400] hover:from-[orange-600] hover:to-[orange-500] text-black py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    Details
                  </button>
                  {addon.demoComponent && (
                    <button
                      onClick={() => setShowDemo(addon.id)}
                      className="px-4 py-3 border-2 border-[orange-500] text-[orange-500] hover:bg-[orange-500] hover:text-black rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[orange-500]/10 to-[pink-400]/10 border border-[orange-500]/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Bereit für Ihre Premium-Website?</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Wählen Sie Ihre Add-ons und starten Sie mit Ihrer professionellen Website
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-[orange-500] to-[pink-400] hover:from-[orange-600] hover:to-[orange-500] text-black py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              <span>Jetzt Website kaufen</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add-on Details Modal */}
      {selectedAddOn && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#333333] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-[orange-500]/30">
            <button
              onClick={() => setSelectedAddOn(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[orange-500] to-[pink-400] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  <selectedAddOn.icon className="w-8 h-8 text-black relative z-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedAddOn.name}</h2>
                  <p className="text-gray-300">{selectedAddOn.description}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Beschreibung</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedAddOn.longDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Live-Effekt</h3>
                    <div className="bg-gradient-to-r from-[orange-500]/10 to-[pink-400]/10 rounded-xl p-4 border border-[orange-500]/20">
                      <p className="text-gray-300">{selectedAddOn.liveEffect}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Was wir brauchen</h3>
                    <div className="bg-[#222222] rounded-xl p-4">
                      <p className="text-gray-300">{selectedAddOn.requirements}</p>
                    </div>
                  </div>

                  {/* Screenshots */}
                  {selectedAddOn.screenshots && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Screenshots</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedAddOn.screenshots.map((screenshot, index) => (
                          <img
                            key={index}
                            src={screenshot}
                            alt={`${selectedAddOn.name} Screenshot ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-white/10"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Vorteile</h3>
                    <div className="space-y-3">
                      {selectedAddOn.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[orange-500] to-[pink-400] flex items-center justify-center">
                            <Check className="w-4 h-4 text-black" />
                          </div>
                          <span className="text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Anwendungsfälle</h3>
                    <div className="space-y-2">
                      {selectedAddOn.useCases.map((useCase, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[orange-500] rounded-full"></div>
                          <span className="text-gray-300">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-[orange-500]/10 to-[pink-400]/10 rounded-xl p-6 border border-[orange-500]/20">
                    <h3 className="text-xl font-bold text-white mb-4">Preise</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Aktuell ({duration} Monate):</span>
                        <span className="font-bold text-2xl bg-gradient-to-r from-[orange-500] to-[pink-400] bg-clip-text text-transparent">
                          {getAddOnPrice(selectedAddOn).toFixed(2)}€/Monat
                        </span>
                      </div>
                      {typeof selectedAddOn.price !== 'number' && (
                        <div className="text-sm text-gray-400 space-y-1">
                          <div className="flex justify-between">
                            <span>12 Monate:</span>
                            <span>{selectedAddOn.price.months12}€/Monat</span>
                          </div>
                          <div className="flex justify-between">
                            <span>24 Monate:</span>
                            <span>{selectedAddOn.price.months24}€/Monat</span>
                          </div>
                          <div className="flex justify-between">
                            <span>36 Monate:</span>
                            <span>{selectedAddOn.price.months36}€/Monat</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Demo Button */}
                  {selectedAddOn.demoComponent && (
                    <button
                      onClick={() => setShowDemo(selectedAddOn.id)}
                      className="w-full bg-gradient-to-r from-[orange-500] to-[pink-400] hover:from-[orange-600] hover:to-[orange-500] text-black py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Live-Demo ansehen
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#333333] rounded-2xl max-w-2xl w-full relative border border-[orange-500]/30">
            <button
              onClick={() => setShowDemo(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {addOns.find(a => a.id === showDemo)?.name} Demo
                </h2>
                <p className="text-gray-300">So sieht das Add-on auf Ihrer Website aus:</p>
              </div>
              
              {/* Demo Component */}
              <div className="mb-6">
                {(() => {
                  const addon = addOns.find(a => a.id === showDemo);
                  if (addon?.demoComponent) {
                    const DemoComponent = addon.demoComponent;
                    return <DemoComponent />;
                  }
                  return <div className="bg-gray-100 p-8 rounded-xl text-center text-gray-600">Demo wird geladen...</div>;
                })()}
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setShowDemo(null);
                    navigate('/');
                  }}
                  className="bg-gradient-to-r from-[orange-500] to-[pink-400] hover:from-[orange-600] hover:to-[orange-500] text-black py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Jetzt Website mit diesem Add-on bestellen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && addonQuestions[showQuiz as keyof typeof addonQuestions] && (
        <AddonQuizModal
          addonName={addOns.find(a => a.id === showQuiz)?.name || ''}
          questions={addonQuestions[showQuiz as keyof typeof addonQuestions]}
          onClose={() => setShowQuiz(null)}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AddOnsPage;