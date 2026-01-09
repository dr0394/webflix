import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Shield, Clock, Phone, Mail, MapPin, Car, Sparkles, Users, Award, Zap, Droplets, Brush, Wrench, Truck, Bike, Building, Leaf, Droplet, Scissors, TreePine, Sun, Flower, FileText, MessageSquare, ThumbsUp, Heart, ChevronRight, Home, Calculator, Camera, TrendingUp, Gift, Timer, Euro, Percent, Play, ChevronDown, SprayCan as Spray, Gauge, Smile, MessageCircle, Settings, Eye } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import BeforeAfterSection from './components/BeforeAfterSection';
import Gallery from './components/Gallery';
import TrustSection from './components/TrustSection';
import MapSection from './components/MapSection';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import VehicleSelection from './components/VehicleSelection';
import CheckoutFlow from '../../components/checkout/CheckoutFlow';
import DemoFrame from '../../components/webflix/DemoFrame';

interface LandingProps {
  customData?: Record<string, any>;
}

const Landing: React.FC<LandingProps> = ({ customData = {} }) => {
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    vehicleType: 'PKW',
    services: [] as string[],
    frequency: 'einmalig'
  });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedVehicleType, setSelectedVehicleType] = useState('kleinwagen');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const primaryColor = '#94A3B8'; // Silver-gray
  const cityName = 'deiner Stadt';

  // Check if in preview mode
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  // WhatsApp URL (falls noch verwendet)
  const whatsappUrl = 'https://wa.me/491234567890?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20professionelle%20Autoaufbereitung.';

  const handleCTAClick = (e?: React.MouseEvent) => {
    if (isPreviewMode) {
      if (e) e.preventDefault();
      return;
    }
    if (!isPreviewMode) {
      window.location.href = '/configurator';
    }
  };


  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  const getContent = (key: string, defaultValue: string) => {
    return customData[key] || defaultValue;
  };

  // Theme configurations
  const themeConfig = {
    modern: {
      primaryColor: 'red',
      gradientFrom: 'from-red-600',
      gradientTo: 'to-red-700',
      bgGradient: 'from-black via-gray-900 to-black',
      accentColor: 'red-400',
      buttonBg: 'bg-red-600 hover:bg-red-700',
      borderColor: 'border-red-600/30'
    },
    premium: {
      primaryColor: 'amber',
      gradientFrom: 'from-amber-600',
      gradientTo: 'to-yellow-600',
      bgGradient: 'from-black via-amber-900/20 to-black',
      accentColor: 'amber-400',
      buttonBg: 'bg-amber-600 hover:bg-amber-700',
      borderColor: 'border-amber-600/30'
    },
    sporty: {
      primaryColor: 'blue',
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-blue-700',
      bgGradient: 'from-black via-blue-900/20 to-black',
      accentColor: 'blue-400',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      borderColor: 'border-blue-600/30'
    }
  };

  const currentTheme = themeConfig[selectedTheme as keyof typeof themeConfig];

  // Check if specific add-ons are enabled
  const isBeforeAfterEnabled = true;
  const isVehicleSelectionEnabled = true;
  const isGoogleReviewsEnabled = true;
  const isWhatsAppEnabled = true;
  const isAIChatbotEnabled = false;
  const isGalleryEnabled = true;
  const isTrustSectionEnabled = true;
  const isMapEnabled = true;

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price by vehicle type
    switch(calculatorData.vehicleType) {
      case 'PKW': basePrice = 80; break;
      case 'SUV': basePrice = 100; break;
      case 'Transporter': basePrice = 120; break;
      case 'Sportwagen': basePrice = 150; break;
      default: basePrice = 80;
    }
    
    // Add service costs
    calculatorData.services.forEach(service => {
      switch(service) {
        case 'Innenraumreinigung': basePrice += 40; break;
        case 'Polieren': basePrice += 60; break;
        case 'Motorwäsche': basePrice += 30; break;
        case 'Lederpflege': basePrice += 50; break;
        case 'Versiegelung': basePrice += 80; break;
        default: basePrice += 20;
      }
    });
    
    // Frequency discount
    const frequencyMultiplier = calculatorData.frequency === 'monatlich' ? 0.8 : 
                               calculatorData.frequency === 'quartalsweise' ? 0.9 : 1;
    return Math.round(basePrice * frequencyMultiplier);
  };

  const testimonials = [
    {
      name: "Thomas Müller",
      position: "Autobesitzer",
      company: "München",
      text: "Mein Auto sieht aus wie neu! Die Innenraumreinigung war besonders beeindruckend - alle Flecken sind verschwunden.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5,
      savings: "Wie neu aussehend"
    },
    {
      name: "Laura Schmidt",
      position: "Familienmutter",
      company: "Berlin",
      text: "Nach einem Jahr mit zwei Kindern war mein Auto in keinem guten Zustand. Der Autoreiniger hat wahre Wunder vollbracht!",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5,
      savings: "Perfekte Reinigung"
    },
    {
      name: "Michael Weber",
      position: "Geschäftsmann",
      company: "Hamburg",
      text: "Professionelle Autoreinigung für meinen Firmenwagen. Pünktlich, zuverlässig und das Ergebnis überzeugt.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5,
      savings: "Top Service"
    }
  ];

  // Verkaufspsychologie Sections
  const psychologySections = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      icon: Eye,
      psychologyTitle: 'Erste Impression & Aufmerksamkeit (AIDA: Attention)',
      psychologyExplanation: 'Die Hero Section hat 3 Sekunden, um den Besucher zu fesseln. Große, emotionale Überschriften mit kraftvollen Worten wie "höchstem Niveau" erzeugen sofort Status und Qualität. Der visuelle Hintergrund mit glänzendem Auto triggert den Wunsch nach diesem Ergebnis.',
      salesPrinciple: 'Primacy-Effekt: Der erste Eindruck prägt die gesamte Wahrnehmung der Seite. Ein Premium-Auftritt rechtfertigt höhere Preise.',
      impact: 'Besucher verweilen länger auf der Seite, nehmen die Marke als hochwertig wahr und sind bereit, mehr zu investieren.'
    },
    {
      id: 'trust-badges',
      name: 'Trust Badges',
      icon: Shield,
      psychologyTitle: 'Sozialer Beweis & Sicherheit',
      psychologyExplanation: 'Icons mit Zahlen (z.B. "500+ Zufriedene Kunden", "5/5 Sterne") bieten unmittelbar sozialen Beweis. Menschen vertrauen dem, was andere bereits gewählt haben - ein evolutionäres Sicherheitsprinzip.',
      salesPrinciple: 'Social Proof Principle: Wenn viele Menschen etwas tun, muss es richtig sein. Quantifizierbare Erfolge (Zahlen!) schaffen Glaubwürdigkeit.',
      impact: 'Reduziert Kaufängste und Skepsis. Besucher denken: "Wenn 500 andere zufrieden sind, werde ich es auch sein."'
    },
    {
      id: 'vehicle-selection',
      name: 'Fahrzeug-Konfigurator',
      icon: Car,
      psychologyTitle: 'Interaktivität & Personalisierung (AIDA: Interest)',
      psychologyExplanation: 'Ein interaktiver Konfigurator gibt dem Kunden Kontrolle und lässt ihn aktiv werden. Je mehr Zeit jemand investiert (Fahrzeug wählen, Optionen konfigurieren), desto höher die Commitment-Rate.',
      salesPrinciple: 'Endowment-Effekt: Wenn Nutzer ihr Fahrzeug auswählen, entsteht mentaler Besitz. IKEA-Effekt: Selbst konfigurierte Lösungen werden höher wertgeschätzt.',
      impact: 'Höhere Conversion Rate durch aktive Beteiligung. Der Kunde hat bereits "seine" Lösung im Kopf und will sie haben.'
    },
    {
      id: 'before-after',
      name: 'Vorher/Nachher',
      icon: Camera,
      psychologyTitle: 'Visuelle Transformation (AIDA: Desire)',
      psychologyExplanation: 'Menschen kaufen keine Produkte - sie kaufen Transformationen. Ein dreckiges Auto vs. glänzendes Auto zeigt visuell den Wert. Der Slider macht die Transformation interaktiv und einprägsam.',
      salesPrinciple: 'Show, don\'t tell: Bilder sind 60.000x schneller verarbeitet als Text. Emotionale Bilder triggern das limbische System (Kaufentscheidungen).',
      impact: 'Wunsch nach Transformation wird geweckt. Kunden können sich selbst in der "Nachher"-Situation vorstellen.'
    },
    {
      id: 'services',
      name: 'Service Übersicht',
      icon: Sparkles,
      psychologyTitle: 'Optionen & Wertsteigerung',
      psychologyExplanation: 'Mehrere Service-Optionen geben dem Kunden das Gefühl der Wahl. Die mittlere Option wird oft gewählt (Goldilocks-Effekt). Premium-Optionen machen Standard-Optionen günstiger erscheinen.',
      salesPrinciple: 'Decoy-Effekt & Anchoring: Eine teure Option lässt mittlere Preise vernünftig wirken. Kunden fühlen sich smart, wenn sie "das Beste Preis-Leistungs-Verhältnis" wählen.',
      impact: 'Höherer durchschnittlicher Warenkorbwert. Kunden rechtfertigen höhere Ausgaben durch "besseres Paket".'
    },
    {
      id: 'gallery',
      name: 'Projekt-Galerie',
      icon: Award,
      psychologyTitle: 'Portfolio & Kompetenz-Beweis',
      psychologyExplanation: 'Eine Galerie mit verschiedenen Fahrzeugen zeigt Erfahrung und Expertise. Hohe Bildqualität signalisiert Professionalität. Vielfalt zeigt: "Wir können jedes Fahrzeug."',
      salesPrinciple: 'Authority Principle: Expertise wird durch Arbeitsergebnisse bewiesen. Hochwertige Präsentation = Hochwertige Arbeit.',
      impact: 'Kunden fühlen sich in guten Händen. Reduziert Risiko-Wahrnehmung bei der Buchung.'
    },
    {
      id: 'contact',
      name: 'Kontakt & Standort',
      icon: MapPin,
      psychologyTitle: 'Erreichbarkeit & Lokales Vertrauen',
      psychologyExplanation: 'Karte und lokale Adresse schaffen Realität und Nähe. "Nähe" triggert Vertrauen - ein lokales Geschäft kann nicht einfach verschwinden wie ein Online-Fake.',
      salesPrinciple: 'Proximity Principle: Menschen vertrauen lokalen Anbietern mehr. Physische Präsenz signalisiert Stabilität.',
      impact: 'Höheres Vertrauen besonders für hochwertige Dienstleistungen. Lokale Kunden buchen eher.'
    }
  ];

  return (
    <DemoFrame
      demoName="Autoaufbereitung Premium Demo"
      sections={psychologySections}
    >
      <div className={`min-h-screen bg-black text-white relative overflow-hidden ${isPreviewMode ? 'preview-mode' : ''}`}>
        {/* Preview Mode CSS */}
        {isPreviewMode && (
          <style>{`
            /* Disable all CTA buttons and links in preview mode */
            .preview-mode a[href="/configurator"],
            .preview-mode a[href*="whatsapp"],
            .preview-mode a[href*="wa.me"],
            .preview-mode a[href*="google.com/maps"],
            .preview-mode a[href*="google.de/maps"],
            .preview-mode a[target="_blank"]:not([class*="gallery"]):not([class*="image"]),
            .preview-mode button[id*="cta"],
            .preview-mode button[id*="demo-cta"],
            .preview-mode button:not([class*="close"]):not([class*="slider"]):not([class*="prev"]):not([class*="next"]):not([aria-label*="close"]):not([aria-label*="Close"]) {
              pointer-events: none !important;
              opacity: 0.6 !important;
              cursor: not-allowed !important;
            }

            /* Keep gallery and slider buttons interactive */
            .preview-mode [class*="gallery"] *,
            .preview-mode [class*="slider"] *,
            .preview-mode [class*="before-after"] *,
            .preview-mode button[class*="close"],
            .preview-mode button[class*="prev"],
            .preview-mode button[class*="next"],
            .preview-mode button[aria-label*="close"],
            .preview-mode button[aria-label*="Close"] {
              pointer-events: auto !important;
              opacity: 1 !important;
              cursor: pointer !important;
            }
          `}</style>
        )}
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          {/* Animated Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px',
                   animation: 'grid-move 20s linear infinite'
                 }}>
            </div>
          </div>
          {/* Glowing Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <Header customData={customData} isPreviewMode={isPreviewMode} />

        <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero-section" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ 
                backgroundImage: `url('https://i.imgur.com/wzHdML8.jpeg')`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2
                           bg-${currentTheme.primaryColor}-600/10 backdrop-blur-md px-6 py-3 rounded-full
                           border ${currentTheme.borderColor}
                           mt-6 sm:mt-10 md:mt-14 lg:mt-20 xl:mt-24
                           mb-6 md:mb-8"
              >
                <div className={`w-2 h-2 rounded-full animate-pulse bg-${currentTheme.accentColor}`} />
                <span className="text-white font-medium font-poppins">Autoaufbereiter #1</span>
              </motion.div>

              <motion.h1
                id="demo-h1"
                data-editable="hero_h1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                lang="de"
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight font-poppins break-words"
                style={{ hyphens: 'auto', textWrap: 'balance' }}
              >
                {getContent('hero_h1', 'Fahrzeugaufbereitung auf höchstem Niveau')}
              </motion.h1>

              <motion.p
                id="demo-h2"
                data-editable="hero_h2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-poppins max-w-3xl mx-auto"
              >
                {getContent('hero_h2', 'Bringen Sie mit unserer professionellen Autoreinigung & Fahrzeugaufbereitung ihr Fahrzeug wieder zum glänzen.')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <button
                  id="demo-cta-button"
                  onClick={(e) => handleCTAClick(e)}
                  className="group relative inline-flex items-center px-8 py-4 border border-[#CBAA6E] text-[#CBAA6E] hover:bg-[#CBAA6E] hover:text-black rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  <span data-editable="hero_cta" className="relative z-10">{getContent('hero_cta', 'Jetzt Fahrzeugaufbereitung anfragen')}</span>
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-4"
              >
                {[
                  { icon: Percent, text: getContent('badge_1', 'Sehr gute Preis Leistung'), highlight: false, id: 'demo-badge-1', dataId: 'badge_1' },
                  { icon: Clock, text: getContent('badge_2', 'Flexible Termine'), highlight: true, id: 'demo-badge-2', dataId: 'badge_2' },
                  { icon: Star, text: getContent('badge_3', '5/5 Sterne'), highlight: false, id: 'demo-badge-3', dataId: 'badge_3' }
                ].filter(item => item.text).map((item, index) => (
                  <div key={index} id={item.id} className={`flex items-center gap-2 backdrop-blur-sm rounded-lg p-3 border transition-all hover:scale-105 ${
                    item.highlight
                      ? `bg-${currentTheme.accentColor}/20 border border-${currentTheme.accentColor}/30`
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.highlight ? 'text-slate-300' : 'text-gray-300'}`} />
                    <span data-editable={item.dataId} className={`text-sm font-medium font-poppins ${item.highlight ? `text-${currentTheme.primaryColor}-300` : 'text-gray-300'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Live Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 bg-${currentTheme.accentColor} rounded-full animate-pulse`}></div>
                  <span className="text-sm font-poppins">Privat und Gewerblich</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-poppins">Ø Schnelle Antwortzeit</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-poppins">100% Kundenzufriedenheit</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        {isGoogleReviewsEnabled && (
          <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Google Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-700">Google</span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Rating Text */}
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-xl font-bold text-gray-900">5,0</span>
                <span className="text-sm">basierend auf</span>
                <span className="font-semibold text-primary">12 Bewertungen</span>
                <span className={`font-semibold text-${currentTheme.primaryColor}-600`}>12 Bewertungen</span>
              </div>

              {/* Trust Badge */}
              <div className={`hidden md:flex items-center gap-2 bg-${currentTheme.primaryColor}-50 px-4 py-2 rounded-full border border-${currentTheme.primaryColor}-200`}>
                <div className={`w-2 h-2 bg-${currentTheme.primaryColor}-500 rounded-full animate-pulse`}></div>
                <span className={`text-sm font-medium text-${currentTheme.primaryColor}-700`}>Verifizierte Bewertungen</span>
              </div>
            </div>

            {/* Mobile Trust Badge */}
            <div className="md:hidden flex justify-center mt-4">
              <div className={`flex items-center gap-2 bg-${currentTheme.primaryColor}-50 px-4 py-2 rounded-full border border-${currentTheme.primaryColor}-200`}>
                <div className={`w-2 h-2 bg-${currentTheme.primaryColor}-500 rounded-full animate-pulse`}></div>
                <span className={`text-sm font-medium text-${currentTheme.primaryColor}-700`}>Verifizierte Bewertungen</span>
              </div>
            </div>
          </div>
          </section>
        )}

        {/* Vehicle Selection Section */}
        {isVehicleSelectionEnabled && (
          <section className="py-24 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-metallic shadow-silver-lg animate-glow flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                    <Car className="w-6 h-6 text-slate-700 relative z-10" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent font-poppins">
                    Für jeden Fahrzeugtyp
                  </h2>
                </div>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto font-montserrat">
                  Professionelle Autoreinigung für alle Fahrzeugklassen – vom Kleinwagen bis zum Luxusfahrzeug
                </p>
              </motion.div>
            </div>

            {/* Vehicle Selection Component */}
            <VehicleSelection 
              selectedVehicle={selectedVehicleType}
              onVehicleSelect={setSelectedVehicleType}
              onVehicleClick={(vehicle) => {
                setSelectedVehicle(vehicle);
                setShowVehicleModal(true);
              }}
            />

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
                    Bereit für die professionelle Fahrzeugpflege?
                  </h3>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto font-montserrat">
                    Lassen Sie uns auch Ihr Fahrzeug in neuem Glanz erstrahlen
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => isPreviewMode && e.preventDefault()}
                    className="group relative inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <span className="relative z-10 mr-3">Jetzt Fahrzeugaufbereitung anfragen</span>
                    <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          </section>
        )}

        {/* Trust Section */}
        <div id="trust-section">
          {isTrustSectionEnabled && <TrustSection customData={customData} />}
        </div>

        {/* Before/After Section */}
        <div id="before-after">
          {isBeforeAfterEnabled && <BeforeAfterSection customData={customData} />}
        </div>

        {/* Gallery Section */}
        <div id="gallery">
          {isGalleryEnabled && <Gallery isPreviewMode={isPreviewMode} />}
        </div>

        {/* Car Cleaning Services Section */}
        <div id="services">
        <section className={`py-24 bg-gradient-to-b from-gray-900 to-black relative`}>
          <div className={`absolute inset-0 bg-gradient-to-r from-${currentTheme.primaryColor}-500/5 to-red-500/5`}></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-${currentTheme.primaryColor}-500/10 text-${currentTheme.primaryColor}-400 border border-${currentTheme.primaryColor}-500/30 font-poppins`}>
                  Unsere Reinigungsarten
                </span>
                <h2 id="demo-services-title" data-editable="services_title" className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
                  {getContent('services_title', 'Welche Autoreinigung brauchst du?')}
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
                  Wähle aus unserem professionellen Reinigungsangebot - von der schnellen Außenwäsche bis zur kompletten Fahrzeugaufbereitung
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 'demo-service-1',
                  titleId: 'demo-service-1-title',
                  descId: 'demo-service-1-desc',
                  title: getContent('service_1_title', 'Innenraumreinigung'),
                  description: getContent('service_1_desc', 'Gründliche Reinigung aller Innenraumflächen, Sitze, Teppiche und Polster. Entfernung von Flecken, Gerüchen und Staub für ein frisches Fahrgefühl.'),
                  beforeImage: 'https://i.imgur.com/dD6kNQU.jpeg',
                  icon: Sparkles,
                  features: ['Sitze- & Polstereinigung','Fleckentfernung','Tierhaarentfernung','Schimmelentferung','Reingung der Lüftung','Reinigung der Kanäle','Ozonbehandlung','Geruchsentfernung'],
                  duration: '1-2 Stunden',
                },
                {
                  id: 'demo-service-2',
                  titleId: 'demo-service-2-title',
                  descId: 'demo-service-2-desc',
                  title: getContent('service_2_title', 'Außenwäsche'),
                  description: getContent('service_2_desc', 'Professionelle Reinigung der Karosserie, Felgen und Reifen mit speziellen Pflegeprodukten für strahlenden Glanz und Schutz.'),
                  beforeImage: 'https://i.imgur.com/OhK54T4.jpeg',
                  icon: Car,
                  features: ['Karosserie waschen', 'Felgen & Reifen reinigen', 'Scheiben putzen', 'Türrahmen säubern', 'Scheinwerferpolitur'],
                  duration: '30-60 Min',
                },
                {
                  title: 'Polieren & Versiegeln',
                  description: 'Professionelles Polieren und Versiegeln des Lacks für langanhaltenden Schutz, brillanten Glanz und Werterhalt des Fahrzeugs.',
                  beforeImage: 'https://www.optimalack.de/mediafile/xautoaufbereitung-du-sseldorf.png.pagespeed.ic.Oq6fDhg43t.jpg',
                  icon: Brush,
                  features: ['Lack polieren', 'Scheinwerferpolitur','Schutzversiegelung','Keramikversiegelung', 'Kratzer entfernen', 'UV-Schutz auftragen'],
                  duration: '2-4 Stunden',
                },
                {
                  title: 'Motorwäsche',
                  description: 'Schonende Reinigung des Motorraums für bessere Kühlung, einfachere Wartung und ein gepflegtes Erscheinungsbild unter der Haube.',
                  beforeImage: 'https://i.imgur.com/MFzxNsw.jpeg',
                  icon: Spray,
                  features: ['Motorraum entfetten', 'Schläuche reinigen', 'Abdeckungen säubern', 'Schutz auftragen'],
                  duration: '45-90 Min',
                },
                {
                  title: 'Lederpflege',
                  description: 'Spezielle Pflege für Ledersitze und -ausstattung. Reinigung, Konditionierung und Schutz für langanhaltende Geschmeidigkeit.',
                  beforeImage: 'https://i.imgur.com/qRJwTrU.jpeg',
                  icon: Home,
                  features: ['Leder reinigen', 'Pflegemittel auftragen', 'UV-Schutz'],
                  duration: '1-2 Stunden',
                },
                {
                  title: 'Komplettreinigung',
                  description: 'Rundum-Service mit Innen- und Außenreinigung, Polieren und allen wichtigen Pflegemaßnahmen für ein perfektes Ergebnis.',
                  beforeImage: 'https://i.imgur.com/tQFVWiv.jpeg',
                  icon: Star,
                  features: ['Innen + Außen', 'Polieren inklusive', 'Felgenpflege', 'Komplettservice'],
                  duration: '3-5 Stunden',
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  id={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group bg-${currentTheme.primaryColor}-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-${currentTheme.primaryColor}-700/50 hover:border-${currentTheme.primaryColor}-500/50 transition-all hover:scale-105`}
                  style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                >
                  {/* Before Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.beforeImage} 
                      alt={`${service.title} - Vorher`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      {service.duration}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <service.icon className="w-5 h-5" />
                        <span className="font-semibold font-poppins">{service.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 id={service.titleId} data-editable={service.titleId?.replace('demo-', '')} className="text-xl font-bold mb-3 text-white font-poppins">{service.title}</h3>
                    <p id={service.descId} data-editable={service.descId?.replace('demo-', '')} className="text-gray-300 mb-4 text-sm leading-relaxed font-poppins">{service.description}</p>
                    
                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 font-poppins">Was ist enthalten:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-400 font-poppins">
                            <div className={`w-1.5 h-1.5 bg-${currentTheme.accentColor} rounded-full mr-2 flex-shrink-0`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-gray-700">
                      <button
                        onClick={handleCTAClick}
                        className={`w-full ${currentTheme.buttonBg} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all font-poppins`}
                      >
                        Jetzt anfragen
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <div className={`bg-gradient-to-r from-${currentTheme.primaryColor}-500/10 to-blue-500/10 rounded-2xl p-8 border border-${currentTheme.primaryColor}-500/20`}>
                <h3 className="text-2xl font-bold mb-4 text-white font-poppins">Nicht sicher welche Reinigung du brauchst?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-poppins">
                  Unsere Experten beraten dich kostenlos und finden die perfekte Reinigungslösung für dein Fahrzeug.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={(e) => handleCTAClick(e)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#CBAA6E] to-[#F3E4A8] hover:from-[#C6A667] hover:to-[#CBAA6E] text-black rounded-lg font-semibold transition-all font-poppins"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Jetzt Fahrzeugaufbereitung anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>

        {/* Map Section */}
        <div id="contact">
          {isMapEnabled && <MapSection customData={customData} isPreviewMode={isPreviewMode} />}
        </div>
        
        {/* Vehicle Details Modal */}
        {showVehicleModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-glow rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-glow rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                      <selectedVehicle.icon className="w-8 h-8 text-slate-700 relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white font-poppins">{selectedVehicle.details.title}</h2>
                      <p className="text-slate-300 font-montserrat">{selectedVehicle.details.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowVehicleModal(false)}
                    className="text-slate-400 hover:text-white text-3xl transition-colors p-2 hover:bg-slate-800/50 rounded-full"
                  >
                    ×
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Vehicle Image */}
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-silver-lg">
                      <img 
                        src={selectedVehicle.image} 
                        alt={selectedVehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold font-poppins">{selectedVehicle.name}</h3>
                        <p className="text-slate-200 font-montserrat">{selectedVehicle.description}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-white mb-4 font-poppins flex items-center gap-2">
                        <Star className="w-5 h-5 text-red-400" />
                        Besonderheiten
                      </h3>
                      <ul className="space-y-3">
                        {selectedVehicle.details.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-3 text-slate-300 font-montserrat">
                            <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialty Info */}
                    <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl p-6 border border-red-500/20">
                      <h3 className="text-lg font-bold text-red-400 mb-3 font-poppins flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Unser Spezialwissen
                      </h3>
                      <p className="text-slate-300 font-montserrat leading-relaxed">
                        {selectedVehicle.details.specialties}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Services & Prices */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-white mb-4 font-poppins flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-red-400" />
                        Unsere Leistungen
                      </h3>
                      <div className="space-y-4">
                        {selectedVehicle.details.services.map((service: any, index: number) => (
                          <div key={index} className="flex items-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                              <h4 className="font-semibold text-white font-poppins">{service.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-white mb-4 font-poppins flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-yellow-400" />
                        Profi-Tipps
                      </h3>
                      <ul className="space-y-3">
                        {selectedVehicle.details.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-slate-300 font-montserrat">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl p-6 text-center border border-red-500/30">
                      <h4 className="text-xl font-bold text-white mb-2 font-poppins">Interesse geweckt?</h4>
                      <p className="text-white/80 text-sm mb-4 font-poppins">
                        Lassen Sie uns Ihr {selectedVehicle.name.toLowerCase()} professionell pflegen
                      </p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (isPreviewMode) {
                            e.preventDefault();
                          } else {
                            setShowVehicleModal(false);
                          }
                        }}
                        className="group relative inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden font-poppins"
                      >
                        <Car className="w-5 h-5 mr-2 relative z-10" />
                        <span className="relative z-10">Jetzt anfragen</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Chatbot */}
      {isAIChatbotEnabled && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className={`${currentTheme.buttonBg} text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110`}>
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="absolute bottom-16 left-0 bg-white text-gray-800 p-3 rounded-lg shadow-lg max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium">Hallo! Ich bin Ihr KI-Assistent. Wie kann ich Ihnen helfen?</p>
          </div>
        </div>
      )}


      <Footer customData={customData} isPreviewMode={isPreviewMode} />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Checkout Flow */}
      </div>
    </DemoFrame>
  );
};

export default Landing;