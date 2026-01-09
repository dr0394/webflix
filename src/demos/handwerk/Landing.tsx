import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Shield, Clock, Phone, Mail, MapPin, Wrench, Users, Award, Zap, Camera, Brush, Building, Leaf, FileText, MessageSquare, ThumbsUp, Heart, ChevronRight, Home, Calculator, TrendingUp, Gift, Timer, Euro, Percent, Play, ChevronDown, Gauge, Smile, MessageCircle, Hammer, HardDrive as Screwdriver, HardHat, Settings } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CheckoutFlow from '../../components/checkout/CheckoutFlow';

const Landing = () => {
  const [selectedTheme, setSelectedTheme] = useState('modern');

  // Check if in preview mode
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  const handleCTAClick = (e?: React.MouseEvent) => {
    if (isPreviewMode) {
      if (e) e.preventDefault();
      return;
    }
    window.location.href = '/configurator';
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  // Theme configurations
  const themeConfig = {
    modern: {
      primaryColor: 'orange',
      gradientFrom: 'from-orange-400',
      gradientTo: 'to-orange-600',
      bgGradient: 'from-black via-orange-900/20 to-black',
      accentColor: 'orange-400',
      buttonBg: 'bg-orange-600 hover:bg-orange-700',
      borderColor: 'border-orange-600/30'
    },
    classic: {
      primaryColor: 'amber',
      gradientFrom: 'from-amber-400',
      gradientTo: 'to-orange-600',
      bgGradient: 'from-black via-amber-900/20 to-black',
      accentColor: 'amber-400',
      buttonBg: 'bg-amber-600 hover:bg-amber-700',
      borderColor: 'border-amber-600/30'
    },
    industrial: {
      primaryColor: 'yellow',
      gradientFrom: 'from-yellow-400',
      gradientTo: 'to-orange-600',
      bgGradient: 'from-black via-yellow-900/20 to-black',
      accentColor: 'yellow-400',
      buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
      borderColor: 'border-yellow-600/30'
    }
  };

  const currentTheme = themeConfig[selectedTheme as keyof typeof themeConfig];

  // Check if specific add-ons are enabled
  const isServiceSelectionEnabled = true;
  const isGoogleReviewsEnabled = true;
  const isWhatsAppEnabled = true;
  const isAIChatbotEnabled = false;
  const isGalleryEnabled = true;
  const isTrustSectionEnabled = true;
  const isMapEnabled = true;
  const isEmergencyEnabled = true;

  return (
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
        <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.bgGradient}`}></div>
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px',
                 animation: 'grid-move 20s linear infinite'
               }}>
          </div>
        </div>
        {/* Glowing Orbs */}
        <div className={`absolute top-20 left-10 w-96 h-96 bg-${currentTheme.primaryColor}-500/10 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 bg-${currentTheme.primaryColor}-500/10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-${currentTheme.primaryColor}-600/10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Header />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex items-center gap-2
                           bg-${currentTheme.primaryColor}-600/10 backdrop-blur-md px-6 py-3 rounded-full
                           border ${currentTheme.borderColor}
                           mt-6 sm:mt-10 md:mt-14 lg:mt-20 xl:mt-24
                           mb-6 md:mb-8`}
              >
                <div className={`w-2 h-2 rounded-full animate-pulse bg-${currentTheme.accentColor}`} />
                <span className="text-white font-medium font-poppins">Handwerk #1</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                lang="de"
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight font-poppins break-words"
                style={{ hyphens: 'auto', textWrap: 'balance' }}
              >
                Handwerk{' '}
                <span
                  className={`block md:inline bg-gradient-to-r ${currentTheme.gradientFrom} via-yellow-500 ${currentTheme.gradientTo} bg-clip-text text-transparent animate-pulse`}
                  style={{ textShadow: `0 0 30px rgba(251, 146, 60, 0.6)` }}
                >
                  auf höchstem Niveau
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-poppins max-w-3xl mx-auto"
              >
                Vertrauen Sie auf unser professionelles Handwerk für alle Reparaturen, Renovierungen und Installationen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <button
                  onClick={() => window.location.href = '/configurator'}
                  className="group relative inline-flex items-center px-8 py-4 border border-[#CBAA6E] text-[#CBAA6E] hover:bg-[#CBAA6E] hover:text-black rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  <span className="relative z-10">Website konfigurieren</span>
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
                  { icon: Percent, text: 'Sehr gute Preis Leistung', highlight: false },
                  { icon: Clock, text: 'Schnelle Termine', highlight: true },
                  { icon: Star, text: '5/5 Sterne', highlight: false },
                  { icon: HardHat, text: 'Meisterbetrieb', highlight: true },
                  { icon: Shield, text: 'Vollversichert', highlight: true }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center gap-2 backdrop-blur-sm rounded-lg p-3 border transition-all hover:scale-105 ${
                    item.highlight 
                      ? `bg-${currentTheme.accentColor}/20 border border-${currentTheme.accentColor}/30` 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.highlight ? 'text-orange-300' : 'text-gray-300'}`} />
                    <span className={`text-sm font-medium font-poppins ${item.highlight ? `text-${currentTheme.primaryColor}-300` : 'text-gray-300'}`}>
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
                  <span className="text-sm font-poppins">Privat & Gewerblich</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-poppins">24h Notdienst</span>
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
                  <span className="font-semibold text-orange-600">32 Bewertungen</span>
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

        {/* Handwerk Services Section */}
        <section className={`py-24 bg-gradient-to-b from-${currentTheme.primaryColor}-900 to-black relative`}>
          <div className={`absolute inset-0 bg-gradient-to-r from-${currentTheme.primaryColor}-500/5 to-yellow-500/5`}></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-${currentTheme.primaryColor}-500/10 text-${currentTheme.primaryColor}-400 border border-${currentTheme.primaryColor}-500/30 font-poppins`}>
                  Unsere Handwerksleistungen
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
                  Welche Handwerksarbeit benötigen Sie?
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
                  Wählen Sie aus unserem professionellen Handwerksservice - von Elektrik bis Sanitär
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Elektroinstallation',
                  description: 'Professionelle Elektroarbeiten für Ihr Zuhause oder Büro. Sicherheit und Qualität stehen bei uns an erster Stelle.',
                  beforeImage: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Zap,
                  features: ['Neuinstallation','Reparaturen','Sicherheitsprüfung','Smart Home','Beleuchtung'],  
                  duration: 'Nach Aufwand',
                },
                {
                  title: 'Sanitärarbeiten',
                  description: 'Komplette Sanitärinstallation und Reparaturen. Von der Rohrreparatur bis zur Badezimmer-Renovierung.',
                  beforeImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Wrench,
                  features: ['Rohrreparatur', 'Badinstallation', 'Heizungsanschluss', 'Wasserschäden', 'Wartung'],
                  duration: 'Nach Aufwand',
                },
                {
                  title: 'Heizung & Klima',
                  description: 'Heizungsinstallation, Wartung und Klimaanlagen. Für optimales Raumklima das ganze Jahr über.',
                  beforeImage: 'https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Home,
                  features: ['Heizungsinstallation', 'Wartung','Klimaanlagen', 'Energieberatung', 'Notdienst'],
                  duration: 'Nach Aufwand',
                },
                {
                  title: 'Renovierung',
                  description: 'Komplette Renovierungsarbeiten für Wohnungen und Häuser. Von der Planung bis zur Fertigstellung.',
                  beforeImage: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Hammer,
                  features: ['Komplettplanung', 'Malerarbeiten', 'Bodenverlegung', 'Trockenbau', 'Koordination'],
                  duration: '1-4 Wochen',
                },
                {
                  title: 'Reparaturen',
                  description: 'Schnelle und zuverlässige Reparaturen aller Art. Wir lösen Ihre Probleme schnell und professionell.',
                  beforeImage: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Screwdriver,
                  features: ['Schnelle Hilfe', 'Alle Gewerke', 'Faire Preise', 'Garantie', 'Soforttermine'],
                  duration: '1-4 Stunden',
                },
                {
                  title: 'Notdienst',
                  description: '24h Notdienst für dringende Reparaturen. Wasserschäden, Stromausfall oder andere Notfälle - wir sind da.',
                  beforeImage: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
                  icon: Zap,
                  features: ['24h erreichbar', 'Schnelle Anfahrt', 'Sofortmaßnahmen', 'Alle Gewerke', 'Versicherungsabwicklung'],
                  duration: 'Sofort',
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group bg-${currentTheme.primaryColor}-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-${currentTheme.primaryColor}-700/50 hover:border-${currentTheme.primaryColor}-500/50 transition-all hover:scale-105`}
                  style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.beforeImage} 
                      alt={`${service.title}`}
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
                    <h3 className="text-xl font-bold mb-3 text-white font-poppins">{service.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed font-poppins">{service.description}</p>
                    
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
              <div className={`bg-gradient-to-r from-${currentTheme.primaryColor}-500/10 to-yellow-500/10 rounded-2xl p-8 border border-${currentTheme.primaryColor}-500/20`}>
                <h3 className="text-2xl font-bold mb-4 text-white font-poppins">Nicht sicher welche Handwerksarbeit Sie brauchen?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-poppins">
                  Unsere Handwerks-Experten beraten Sie kostenlos und finden die perfekte Lösung für Ihr Projekt.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.href = '/configurator'}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#CBAA6E] to-[#F3E4A8] hover:from-[#C6A667] hover:to-[#CBAA6E] text-black rounded-lg font-semibold transition-all font-poppins"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Website konfigurieren
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* AI Chatbot */}
      {isAIChatbotEnabled && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className={`${currentTheme.buttonBg} text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110`}>
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="absolute bottom-16 left-0 bg-white text-gray-800 p-3 rounded-lg shadow-lg max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium">Hallo! Ich bin Ihr Handwerks-KI-Assistent. Wie kann ich Ihnen helfen?</p>
          </div>
        </div>
      )}

      <Footer />

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
  );
};

export default Landing;