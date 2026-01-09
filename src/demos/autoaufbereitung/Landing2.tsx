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
  const [selectedTheme, setSelectedTheme] = useState('clean');
  const primaryColor = '#0284c7'; // Sky blue
  const cityName = 'deiner Stadt';

  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

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

  const currentTheme = {
    primaryColor: 'sky',
    gradientFrom: 'from-sky-600',
    gradientTo: 'to-blue-600',
    bgGradient: 'from-white via-sky-50 to-white',
    accentColor: 'sky-500',
    buttonBg: 'bg-sky-600 hover:bg-sky-700',
    borderColor: 'border-sky-200'
  };

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

    switch(calculatorData.vehicleType) {
      case 'PKW': basePrice = 80; break;
      case 'SUV': basePrice = 100; break;
      case 'Transporter': basePrice = 120; break;
      case 'Sportwagen': basePrice = 150; break;
      default: basePrice = 80;
    }

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
      demoName="Autoaufbereitung Clean Demo"
      sections={psychologySections}
    >
      <div className={`min-h-screen bg-white text-gray-900 relative overflow-hidden ${isPreviewMode ? 'preview-mode' : ''}`}>
        {isPreviewMode && (
          <style>{`
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

        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
          </div>
        </div>

        <Header customData={customData} isPreviewMode={isPreviewMode} />

        <div className="relative z-10">
        <section id="hero-section" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://i.imgur.com/wzHdML8.jpeg')`,
                filter: 'brightness(1.2) contrast(0.8)'
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
                           bg-sky-100 px-6 py-3 rounded-full
                           border border-sky-200
                           mt-6 sm:mt-10 md:mt-14 lg:mt-20 xl:mt-24
                           mb-6 md:mb-8"
              >
                <div className="w-2 h-2 rounded-full animate-pulse bg-sky-500" />
                <span className="text-sky-900 font-semibold text-sm">Ihr zuverlässiger Partner</span>
              </motion.div>

              <motion.h1
                id="demo-h1"
                data-editable="hero_h1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                lang="de"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
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
                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
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
                  className="group relative inline-flex items-center px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  <span data-editable="hero_cta" className="relative z-10">{getContent('hero_cta', 'Jetzt Fahrzeugaufbereitung anfragen')}</span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 mb-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Privat und Gewerblich</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Ø Schnelle Antwortzeit</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">100% Kundenzufriedenheit</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {[
                  { icon: Percent, text: getContent('badge_1', 'Sehr gute Preis Leistung'), id: 'demo-badge-1', dataId: 'badge_1' },
                  { icon: Clock, text: getContent('badge_2', 'Flexible Termine'), id: 'demo-badge-2', dataId: 'badge_2' },
                  { icon: Star, text: getContent('badge_3', '5/5 Sterne'), id: 'demo-badge-3', dataId: 'badge_3' }
                ].filter(item => item.text).map((item, index) => (
                  <div key={index} id={item.id} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border-2 border-sky-200 shadow-lg hover:shadow-xl hover:border-sky-400 transition-all min-w-[150px]">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3">
                      <item.icon className="w-6 h-6 text-sky-600" />
                    </div>
                    <span data-editable={item.dataId} className="text-sm font-bold text-gray-900">
                      {item.text}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {isGoogleReviewsEnabled && (
          <section className="py-16 bg-gradient-to-br from-sky-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">Was unsere Kunden sagen</h3>
              <p className="text-sky-100">Vertrauen Sie auf hunderte zufriedene Kunden</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { stars: 5, text: "Absolut perfekt! Mein Auto sieht aus wie neu.", author: "Thomas M." },
                { stars: 5, text: "Sehr professionell und pünktlich. Gerne wieder!", author: "Laura S." },
                { stars: 5, text: "Beste Autoreinigung die ich je hatte!", author: "Michael W." }
              ].map((review, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white mb-4 italic">"{review.text}"</p>
                  <p className="text-sky-200 font-semibold">- {review.author}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                </svg>
                <span className="font-semibold">5,0 Sterne auf Google</span>
                <span className="text-sky-200">• 12 Bewertungen</span>
              </div>
            </div>
          </div>
          </section>
        )}

        {isVehicleSelectionEnabled && (
          <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-sky-100 px-4 py-2 rounded-full mb-6">
                  <Car className="w-5 h-5 text-sky-600" />
                  <span className="text-sm font-semibold text-sky-900">Alle Fahrzeugtypen</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Wir pflegen jedes Fahrzeug mit Perfektion
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Vom kompakten Kleinwagen bis zum luxuriösen SUV – unsere Experten kennen die spezifischen Anforderungen jedes Fahrzeugtyps und behandeln Ihr Auto mit höchster Sorgfalt.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: CheckCircle, text: 'Erfahrene Spezialisten' },
                    { icon: Shield, text: 'Versicherte Pflege' },
                    { icon: Award, text: 'Premium Produkte' },
                    { icon: Clock, text: 'Schneller Service' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-sky-600" />
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                  <VehicleSelection
                    selectedVehicle={selectedVehicleType}
                    onVehicleSelect={setSelectedVehicleType}
                    onVehicleClick={(vehicle) => {
                      setSelectedVehicle(vehicle);
                      setShowVehicleModal(true);
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Bereit für die professionelle Fahrzeugpflege?
              </h3>
              <p className="text-sky-100 mb-6 max-w-2xl mx-auto text-lg">
                Lassen Sie uns auch Ihr Fahrzeug in neuem Glanz erstrahlen
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => isPreviewMode && e.preventDefault()}
                className="group relative inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-sky-600 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10 mr-3">Jetzt Fahrzeugaufbereitung anfragen</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
          </section>
        )}

        <div id="trust-section">
          {isTrustSectionEnabled && <TrustSection customData={customData} />}
        </div>

        <div id="before-after">
          {isBeforeAfterEnabled && <BeforeAfterSection customData={customData} />}
        </div>

        <div id="gallery">
          {isGalleryEnabled && <Gallery isPreviewMode={isPreviewMode} />}
        </div>

        <div id="services">
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-sky-100 text-sky-700 border border-sky-200">
                  Unsere Reinigungsarten
                </span>
                <h2 id="demo-services-title" data-editable="services_title" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {getContent('services_title', 'Welche Autoreinigung brauchst du?')}
                </h2>
                <p className="text-xl text-gray-600">
                  Wähle aus unserem professionellen Reinigungsangebot - von der schnellen Außenwäsche bis zur kompletten Fahrzeugaufbereitung
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
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
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-white to-sky-50 rounded-3xl overflow-hidden border-2 border-sky-200 hover:border-sky-400 hover:shadow-2xl transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <img
                        src={service.beforeImage}
                        alt={`${service.title} - Vorher`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/30 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <service.icon className="w-6 h-6 text-sky-600" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {service.duration}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <h3 id={service.titleId} data-editable={service.titleId?.replace('demo-', '')} className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                        <p id={service.descId} data-editable={service.descId?.replace('demo-', '')} className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-sky-600" />
                            Leistungen:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {service.features.slice(0, 4).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-2 flex-shrink-0"></div>
                                {feature}
                              </div>
                            ))}
                          </div>
                          {service.features.length > 4 && (
                            <p className="text-xs text-gray-500 mt-2">+ {service.features.length - 4} weitere</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={handleCTAClick}
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        Jetzt anfragen
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 border border-sky-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Nicht sicher welche Reinigung du brauchst?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Unsere Experten beraten dich kostenlos und finden die perfekte Reinigungslösung für dein Fahrzeug.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={(e) => handleCTAClick(e)}
                    className="inline-flex items-center px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-all"
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

        <div id="contact">
          {isMapEnabled && <MapSection customData={customData} isPreviewMode={isPreviewMode} />}
        </div>

        {showVehicleModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <div className="relative z-10 p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-sky-100 shadow-lg flex items-center justify-center border border-sky-200">
                      <selectedVehicle.icon className="w-8 h-8 text-sky-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedVehicle.details.title}</h2>
                      <p className="text-gray-600">{selectedVehicle.details.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowVehicleModal(false)}
                    className="text-gray-400 hover:text-gray-900 text-3xl transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    ×
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{selectedVehicle.name}</h3>
                        <p className="text-gray-200">{selectedVehicle.description}</p>
                      </div>
                    </div>

                    <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-sky-600" />
                        Besonderheiten
                      </h3>
                      <ul className="space-y-3">
                        {selectedVehicle.details.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-3 text-gray-700">
                            <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
                      <h3 className="text-lg font-bold text-sky-700 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Unser Spezialwissen
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedVehicle.details.specialties}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-sky-600" />
                        Unsere Leistungen
                      </h3>
                      <div className="space-y-4">
                        {selectedVehicle.details.services.map((service: any, index: number) => (
                          <div key={index} className="flex items-center p-4 bg-white rounded-xl border border-gray-200">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                              <h4 className="font-semibold text-gray-900">{service.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-yellow-500" />
                        Profi-Tipps
                      </h3>
                      <ul className="space-y-3">
                        {selectedVehicle.details.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl p-6 text-center border border-sky-200">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Interesse geweckt?</h4>
                      <p className="text-gray-700 text-sm mb-4">
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
                        className="group relative inline-flex items-center px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
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

      {isAIChatbotEnabled && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className="bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="absolute bottom-16 left-0 bg-white text-gray-800 p-3 rounded-lg shadow-lg max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium">Hallo! Ich bin Ihr KI-Assistent. Wie kann ich Ihnen helfen?</p>
          </div>
        </div>
      )}

      <Footer customData={customData} isPreviewMode={isPreviewMode} />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      </div>
    </DemoFrame>
  );
};

export default Landing;
