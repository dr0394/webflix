import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Settings, Smartphone, Shield, Check, Package, Zap, Star, TrendingUp, ArrowRight, Car, TreePine, User, Building, Brush, Sparkles, Wrench, Heart, Activity, Plus, Minus, Menu, X, Mail, Phone, MapPin, Users } from 'lucide-react';
import Footer from '../Footer';
import Header from '../Header';
import AvailabilityBanner from '../AvailabilityBanner';
import WaitlistModal from '../WaitlistModal';

const templates = [
  {
    id: 1,
    title: "Autoaufbereitung Premium",
    description: "Vorher/Nachher Slider, Fahrzeug-Auswahl, WhatsApp Integration",
    tags: ["Template", "Interactive", "WhatsApp"],
    icon: Car,
    image: 'https://i.imgur.com/MjiMjY7.jpeg',
    route: '/demo/autoaufbereitung',
    category: 'dienstleistungen'
  },
  {
    id: 2,
    title: "Gartenlandschaftsbau Pro",
    description: "Service-Auswahl, Galerie, Karten Integration",
    tags: ["Template", "Services", "Maps"],
    icon: TreePine,
    image: 'https://i.imgur.com/0mHEmf3.jpeg',
    route: '/demo/gartenlandschaftsbau',
    category: 'dienstleistungen'
  },
  {
    id: 3,
    title: "Personal Brand Premium",
    description: "Coach, Food Blogger, Content Creator Websites",
    tags: ["Template", "Personal", "Branding"],
    icon: User,
    image: 'https://i.imgur.com/7IJKzc4.jpeg',
    route: '/demo/personalbrand',
    category: 'persoenlich'
  },
  {
    id: 4,
    title: "Gebäudereinigung Pro",
    description: "Vorher/Nachher, Terminbuchung, Bewertungen",
    tags: ["Template", "SEO-Ready", "Responsive"],
    icon: Building,
    image: 'https://i.imgur.com/dWlxNBn.jpeg',
    route: '/demo/gebaeudereinigung',
    category: 'dienstleistungen'
  },
  {
    id: 5,
    title: "Malerbetrieb Meister",
    description: "Farbwelten, Projekt-Cases",
    tags: ["Portfolio", "Gallery", "Projects"],
    icon: Brush,
    image: 'https://i.imgur.com/W8bkBWj.png',
    route: '/demo/handwerk',
    category: 'dienstleistungen'
  },
  {
    id: 6,
    title: "Beauty & Friseur",
    description: "Termin-Engine, Instagram-Feed",
    tags: ["Booking", "Social", "Instagram"],
    icon: Sparkles,
    image: 'https://i.imgur.com/0HOBrtx.png',
    route: '/demo/beauty',
    category: 'gesundheit'
  },
  {
    id: 7,
    title: "Physiotherapie Praxis",
    description: "Terminbuchung, Team-Vorstellung, Leistungsübersicht",
    tags: ["Template", "Booking", "Healthcare"],
    icon: Activity,
    image: 'https://i.imgur.com/EOcPcH9.jpeg',
    route: '/demo/physiotherapie',
    category: 'gesundheit'
  },
  {
    id: 8,
    title: "Handwerker Pro",
    description: "Leistungen, Referenzen, Kontakt-System",
    tags: ["Handwerk", "Portfolio", "Contact"],
    icon: Wrench,
    image: 'https://i.imgur.com/ZTkwh4i.jpeg',
    route: '/demo/handwerk',
    category: 'dienstleistungen'
  }
];

const features = [
  {
    icon: Clock,
    title: "In 48 Stunden live",
    description: "Sobald Ihre Checkliste komplett ist, geht Ihre Website binnen 48 Stunden online – professionell umgesetzt."
  },
  {
    icon: Settings,
    title: "Konfigurator & Add-ons",
    description: "Wählen Sie Laufzeit & Add-ons (z. B. Vorher/Nachher, Terminbuchung, CRM light). Preis aktualisiert sich live."
  },
  {
    icon: Smartphone,
    title: "Auf allen Geräten",
    description: "Pixelperfekt auf Smartphone, Tablet, Laptop & Desktop – schnell, barrierearm, SEO-ready."
  },
  {
    icon: Shield,
    title: "Sorglos-Paket",
    description: "5 h Änderungen/Jahr inklusive. Auf Wunsch unbegrenzt mit der Sorglos-Flat (gestaffelt je Laufzeit)."
  }
];

const pricingPlans = [
  {
    name: "Flex (monatlich kündbar)",
    monthlyPrice: "79,90€",
    totalPrice: "79,90€",
    savings: null,
    popular: false,
    features: [
      "Premium Website-Design",
      "48h Go-Live Garantie",
      "5h Änderungen/Jahr inklusive",
      "Alle Basis-Features",
      "Hosting & Domain inklusive"
    ]
  },
  {
    name: "12 Monate",
    monthlyPrice: "29,90€",
    totalPrice: "358,80€",
    savings: "63% Ersparnis",
    popular: true,
    features: [
      "Alle Features aus Flex",
      "Längere Laufzeit = Besserer Preis",
      "Priorität-Support",
      "Erweiterte Anpassungen",
      "SEO-Optimierung inklusive"
    ]
  },
  {
    name: "24 Monate",
    monthlyPrice: "24,90€",
    totalPrice: "597,60€",
    savings: "69% Ersparnis",
    popular: false,
    features: [
      "Alle Features aus 12 Monate",
      "Best Value Angebot",
      "VIP-Support",
      "Unbegrenzte Anpassungen Option",
      "Marketing-Beratung inklusive"
    ]
  }
];

const faqs = [
  {
    question: "Was ist Webflix?",
    answer: "Webflix ist Ihre All-in-One Website-Marketing-Lösung im Abo – Agentur-Qualität ohne hohe Einmalkosten."
  },
  {
    question: "Wie viel kostet Webflix?",
    answer: "Je nach Laufzeit 79,90 €/29,90 €/24,90 € mtl. Add-ons optional. 5 h Änderungen/Jahr inklusive."
  },
  {
    question: "Was bedeutet 48h-Go-Live?",
    answer: "Nach Eingang aller Unterlagen aus der Checkliste publizieren wir Ihre Website innerhalb von 48 Stunden."
  },
  {
    question: "Wie kann ich kündigen?",
    answer: "Nach Ende der gewählten Laufzeit monatlich mit 1-Monats-Frist kündbar."
  },
  {
    question: "Welche Add-ons gibt es?",
    answer: "Vorher/Nachher-Slider, Google-Bewertungen, Terminbuchung, CRM light, SEO-Starter, KI-Chatbot, E-Mail-Marketing, Analytics light, DSGVO-Paket."
  },
  {
    question: "Gehören mir Domain & Inhalte?",
    answer: "Ihre Inhalte gehören Ihnen. Bei Domain-Fragen bieten wir faire Optionen (Umzug oder Verwaltung durch uns)."
  }
];

export default function WebflixLandingPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Header showNavigation={true} />
      <AvailabilityBanner />

      {/* Navigation */}
      <nav className="hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-black">
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Webflix
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Startseite
              </button>
              <button
                onClick={() => scrollToSection('showroom')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Website-Showroom
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Preise
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Über uns
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Kontakt
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
              >
                Kostenlose Beratung
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Startseite
              </button>
              <button
                onClick={() => scrollToSection('showroom')}
                className="block w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Website-Showroom
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Preise
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Über uns
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Kontakt
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white transition-all duration-300 shadow-lg"
              >
                Kostenlose Beratung
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          >
            <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#111111]"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-400/30 rounded-full mb-6">
            <Package className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-300">Websites zum Mitnehmen</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
              Webflix
            </span>
            <br />
            <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
              Deine Website in 48 Stunden
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
            Premium-Designs zum fairen Preis. Wähle dein Template, konfiguriere es nach deinen Wünschen und gehe innerhalb von 48 Stunden online.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.location.href = '/shop'}
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:scale-105 flex items-center gap-2"
            >
              Templates ansehen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 hover:border-white/50 rounded-xl font-bold text-white text-lg transition-all duration-300"
            >
              Preise ansehen
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-400" />
              <span className="text-white/80">48h Go-Live</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-400" />
              <span className="text-white/80">Ab 29,90€/Monat</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-orange-400" />
              <span className="text-white/80">Premium-Designs</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent"></div>
      </section>


      {/* Templates Section */}
      <section id="showroom" className="py-12 sm:py-16 px-4 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#111111]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-400/30 mb-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Webflix Templates</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Website-Kauf <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">war noch nie so einfach</span>
            </h2>

            <p className="text-lg text-white/70 max-w-4xl">
              Vergiss komplizierte Briefings und endlose Abstimmungen. Suche dir einfach eines unserer Premium-Designs aus, füge deine Inhalte hinzu und freue dich in 48 Stunden über deine neue Website - so einfach wie Online-Shopping
            </p>
          </div>

          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium whitespace-nowrap">
              Beliebteste
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium whitespace-nowrap border border-white/20 transition-all">
              Business & Unternehmen
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium whitespace-nowrap border border-white/20 transition-all">
              Dienstleistungen
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium whitespace-nowrap border border-white/20 transition-all">
              Gastro & Events
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium whitespace-nowrap border border-white/20 transition-all">
              Gesundheit & Beratung
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium whitespace-nowrap border border-white/20 transition-all">
              Kreativ & Portfolio
            </button>
            <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium whitespace-nowrap border border-white/20 transition-all">
              Personal Brand
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.slice(0, 3).map((template) => {
              const IconComponent = template.icon;

              return (
                <div
                  key={template.id}
                  className="group cursor-pointer bg-gradient-to-br from-white/5 via-white/5 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-orange-400/30 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500/20 px-3 py-1.5 rounded-full border border-green-400">
                        <span className="text-green-300 text-xs font-bold">VERFÜGBAR</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-black text-xl mb-2 text-white group-hover:text-orange-400 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-orange-500/10 text-orange-300 text-xs rounded-full border border-orange-400/30 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate(template.route)}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-orange-400/50 rounded-lg text-white font-medium text-sm transition-all duration-300"
                    >
                      Live Demo ansehen
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => window.location.href = '/shop'}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
            >
              Alle Templates ansehen
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 px-4 bg-[#111111]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              So einfach <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">funktioniert's</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              In nur 4 einfachen Schritten zu deiner professionellen Website
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: 1,
                icon: Package,
                title: "Design wählen",
                description: "Wähle aus unseren professionellen Templates das perfekte Design für deine Branche aus.",
                color: "from-orange-500 to-pink-500"
              },
              {
                number: 2,
                icon: Settings,
                title: "Add-ons konfigurieren",
                description: "Erweitere deine Website mit WhatsApp-Integration, Google-Bewertungen und weiteren Features.",
                color: "from-pink-500 to-orange-600"
              },
              {
                number: 3,
                icon: Check,
                title: "Bestellen & bezahlen",
                description: "Gib deine Daten ein, wähle die Laufzeit und schließe die Bestellung ab.",
                color: "from-orange-600 to-pink-600"
              },
              {
                number: 4,
                icon: Zap,
                title: "48h live gehen",
                description: "Nach Erhalt deiner Inhalte geht deine professionelle Website innerhalb von 48 Stunden online.",
                color: "from-pink-600 to-orange-500"
              }
            ].map((step, index) => (
              <div
                key={step.number}
                className="relative group bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-orange-400/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
              >
                <div className="absolute -top-4 left-6">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {step.number}
                  </div>
                </div>

                <div className="mb-4 pt-2">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                )}

                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${step.color} blur-xl -z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#111111]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Webflix
              </span>{' '}
              vs. der Rest
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Warum Webflix die smartere Wahl für deine Website ist
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 gap-4 p-6 bg-white/5 border-b border-white/10">
                <div className="font-bold text-white/90 text-lg">Kriterium</div>
                <div className="font-bold text-white/60 text-lg text-center">Herkömmliche Agentur</div>
                <div className="font-bold text-lg text-center">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Webflix
                  </span>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {[
                  { criterion: 'Wartezeit', agency: '3–6 Monate', webflix: '48 Stunden' },
                  { criterion: 'Kosten', agency: '5.000 €+ einmalig', webflix: '29,90 €/Monat' },
                  { criterion: 'Ergebnis', agency: 'Unklares Ergebnis', webflix: 'Siehst, was du kriegst' },
                  { criterion: 'Wartung', agency: 'Zusätzliche Kosten', webflix: 'Alles inklusive' },
                  { criterion: 'Anpassungen', agency: 'Komplizierte Absprachen', webflix: 'Einfacher Online-Prozess' },
                  { criterion: 'Design', agency: 'Standard-Templates', webflix: 'Premium-Designs' },
                  { criterion: 'Funktionen', agency: 'Basis-Features', webflix: 'Add-ons verfügbar' },
                  { criterion: 'Support', agency: 'Oft begrenzt', webflix: 'Lebenslang inklusive' }
                ].map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 p-6 hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="font-bold text-white/90">{row.criterion}</div>
                    <div className="text-white/60 text-center">{row.agency}</div>
                    <div className="text-center">
                      <span className="font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                        {row.webflix}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-br from-orange-500/10 to-pink-500/10 border-t border-white/10">
                <div></div>
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xl">✕</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => window.location.href = '/shop'}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-lg font-bold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
                  >
                    Jetzt starten
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-4 pb-4 min-w-max">
                {/* Agency Card */}
                <div className="w-72 flex-shrink-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                  <div className="bg-white/5 p-4 border-b border-white/10">
                    <h3 className="text-lg font-bold text-white/60 text-center">Herkömmliche Agentur</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Wartezeit', value: '3–6 Monate' },
                      { label: 'Kosten', value: '5.000 €+ einmalig' },
                      { label: 'Ergebnis', value: 'Unklares Ergebnis' },
                      { label: 'Wartung', value: 'Zusätzliche Kosten' },
                      { label: 'Anpassungen', value: 'Komplizierte Absprachen' },
                      { label: 'Design', value: 'Standard-Templates' },
                      { label: 'Funktionen', value: 'Basis-Features' },
                      { label: 'Support', value: 'Oft begrenzt' }
                    ].map((row, index) => (
                      <div key={index} className="border-b border-white/5 pb-2">
                        <div className="text-white/50 text-xs font-medium mb-1">{row.label}</div>
                        <div className="text-white/60 text-sm">{row.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Webflix Card */}
                <div className="w-72 flex-shrink-0 bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-orange-500/20 backdrop-blur-xl border-2 border-orange-400/50 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-gradient-to-r from-orange-500/30 to-pink-500/30 p-4 border-b border-orange-400/30">
                    <h3 className="text-xl font-black text-center">
                      <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                        Webflix
                      </span>
                    </h3>
                    <div className="flex justify-center mt-2">
                      <span className="px-3 py-1 bg-orange-500/30 rounded-full text-xs font-bold text-orange-300 border border-orange-400/30">
                        EMPFOHLEN
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Wartezeit', value: '48 Stunden' },
                      { label: 'Kosten', value: '29,90 €/Monat' },
                      { label: 'Ergebnis', value: 'Siehst, was du kriegst' },
                      { label: 'Wartung', value: 'Alles inklusive' },
                      { label: 'Anpassungen', value: 'Einfacher Online-Prozess' },
                      { label: 'Design', value: 'Premium-Designs' },
                      { label: 'Funktionen', value: 'Add-ons verfügbar' },
                      { label: 'Support', value: 'Lebenslang inklusive' }
                    ].map((row, index) => (
                      <div key={index} className="border-b border-orange-400/10 pb-2">
                        <div className="text-white/50 text-xs font-medium mb-1">{row.label}</div>
                        <div className="font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent text-sm">
                          {row.value}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => window.location.href = '/shop'}
                      className="w-full mt-3 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-lg font-bold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                    >
                      Jetzt starten
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-white/50 text-sm">← Swipe für mehr →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Projects Section */}
      <section className="py-16 sm:py-24 px-4 bg-[#111111]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Erfolgreiche <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Webflix</span> Projekte
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Entdecke, wie andere Unternehmen mit Webflix erfolgreich wurden
            </p>
          </div>

          {/* Featured Project */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-[400px] lg:h-[500px] overflow-hidden group">
                  <img
                    src="https://i.imgur.com/RYlS9yi.png"
                    alt="DZ Autopflege"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl bg-orange-500/30 text-orange-300 border border-orange-400/30">
                      Autoaufbereitung
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <a
                      href="https://dzautopflege.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400"
                    >
                      Website ansehen <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-8">
                    DZ Autopflege
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-red-500/20 text-red-400">
                        <Star className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Problem</h4>
                        <p className="text-white/70 leading-relaxed">
                          Keine professionelle Online-Präsenz, Kunden mussten telefonisch anfragen, keine Möglichkeit Preise online zu kalkulieren
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500/20 text-yellow-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Ziel</h4>
                        <p className="text-white/70 leading-relaxed">
                          Moderne Website mit Online-Konfigurator für sofortige Preisberechnung und Terminbuchung
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500/20 text-orange-400">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Lösung</h4>
                        <p className="text-white/70 leading-relaxed">
                          Webflix-Design mit interaktivem Fahrzeug-Konfigurator, Vorher-Nachher-Galerie und direkter WhatsApp-Integration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Slider */}
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 text-center">
              Weitere erfolgreiche Kunden
            </h3>
          </div>

          <div className="relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#111111] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#111111] to-transparent z-10"></div>

            <div className="flex animate-scroll">
              {[...Array(2)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  {[
                    'https://cdn.prod.website-files.com/6685978ca68674910cce55d7/6731f71e47d75de47101645a_Jad-Helou_Logo_Schutzraum_wei%C3%9F_RGB-p-500.png',
                    'https://aesthetic-home.de/wp-content/uploads/2019/10/logo_color_wide-1.png',
                    'https://cdn.prod.website-files.com/64da9115ad6b28ffcb813aa6/667bd1f40dd575e2dfcf5656_NIKO%20Netzwerk%20Inspirations%20Kongress_LOGO_negativ_web-p-500.png',
                    'https://lh3.googleusercontent.com/p/AF1QipObwGAC9MNVxS5hiF1TKlHz7FwjAi6xw9G6ug7B=s1360-w1360-h1020-rw',
                    'https://shop.rotundkehlchen.de/cdn/shop/files/Rot_u_Kehlchen_Logo_Version_2_rot-2048x989_1_360x.png?v=1731680919',
                    'https://i.imgur.com/TaHBycH.png',
                    'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/679e01f8613e21e83306ce5c_Logo_weiss-p-800.png',
                    'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/6798c531dffdf43d357dfa02_Kein%20Titel%20(768%20x%20215%20px)%20(768%20x%20300%20px)%20(83%20x%2040%20px)%20(1).png'
                  ].map((logo, index) => (
                    <div key={`${setIndex}-${index}`} className="flex-shrink-0 mx-4 sm:mx-6 group">
                      <div className="relative w-48 h-32 sm:w-56 sm:h-36 rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105 flex items-center justify-center p-6">
                        <img
                          src={logo}
                          alt={`Logo ${index + 1}`}
                          className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => window.location.href = '/shop'}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
            >
              Deine Webflix Website starten
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#111111]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Transparente <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Preise</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Wähle die Laufzeit, die am besten zu dir passt. Keine versteckten Kosten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-orange-500/20 border-2 border-orange-400/50 shadow-2xl'
                    : 'bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center">
                    <span className="text-white text-sm font-bold flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 fill-white" />
                      BELIEBTESTE WAHL
                    </span>
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  {plan.savings && (
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-orange-500/30 rounded-full text-xs font-bold text-orange-300 border border-orange-400/30">
                        {plan.savings}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-5xl font-black text-white">{plan.monthlyPrice}</span>
                      <span className="text-white/70 text-lg mb-2">/Monat</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      Gesamt: {plan.totalPrice}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => window.location.href = '/shop'}
                    className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 shadow-lg hover:shadow-orange-500/50'
                        : 'bg-white/10 hover:bg-white/20 border border-white/30'
                    }`}
                  >
                    Jetzt starten
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 bg-[#111111]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Häufig gestellte <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Fragen</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden hover:border-orange-400/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFaqIndex === index ? (
                      <Minus className="w-5 h-5 text-orange-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-orange-400" />
                    )}
                  </div>
                </button>

                {openFaqIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 bg-[#111111]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Über <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Webflix</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Wir revolutionieren die Art, wie kleine und mittlere Unternehmen ihre Online-Präsenz aufbauen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Unsere Mission
              </h3>
              <p className="text-white/70 text-lg leading-relaxed mb-4">
                Webflix wurde gegründet, um professionelle Websites für jeden zugänglich zu machen. Wir glauben, dass jedes Unternehmen eine erstklassige Online-Präsenz verdient – ohne monatelange Wartezeiten und ohne teure Agenturen.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Mit unserer einzigartigen Kombination aus vorgefertigten Premium-Templates und individuellen Anpassungsmöglichkeiten bieten wir die perfekte Balance zwischen Geschwindigkeit und Individualität.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-orange-400/20 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">500+ zufriedene Kunden</h4>
                    <p className="text-white/70">Vertrauen bereits auf unsere Lösung</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">48 Stunden Go-Live</h4>
                    <p className="text-white/70">Schneller als jede Agentur</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Premium Qualität</h4>
                    <p className="text-white/70">Professionelle Entwickler & Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: 'Schnelligkeit',
                description: 'Deine Website in 48 Stunden online – garantiert'
              },
              {
                icon: Shield,
                title: 'Sicherheit',
                description: 'Hosting, Updates und Backups – alles inklusive'
              },
              {
                icon: TrendingUp,
                title: 'Performance',
                description: 'Optimiert für Geschwindigkeit und SEO'
              },
              {
                icon: Heart,
                title: 'Support',
                description: 'Lebenslanger Support bei allen Fragen'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-6 hover:border-orange-400/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#111111]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Kontakt <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">aufnehmen</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Lass uns gemeinsam deine perfekte Website erstellen. Wir melden uns innerhalb von 24 Stunden.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Sprich mit uns</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">E-Mail</div>
                      <a href="mailto:info@webflix.de" className="text-white hover:text-orange-400 transition-colors">
                        info@webflix.de
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Telefon</div>
                      <a href="tel:+491234567890" className="text-white hover:text-orange-400 transition-colors">
                        +49 123 456 7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Standort</div>
                      <div className="text-white">
                        München, Deutschland
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-orange-400/20 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-white mb-4">Kostenlose Erstberatung</h4>
                <p className="text-white/70 mb-6">
                  Buche jetzt ein kostenloses 30-minütiges Beratungsgespräch und lass uns gemeinsam die perfekte Lösung für dein Unternehmen finden.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                >
                  Beratungstermin buchen
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Nachricht senden</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="Dein Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="deine@email.de"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Telefon (optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="+49 123 456 7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Nachricht
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    placeholder="Erzähl uns von deinem Projekt..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                >
                  Nachricht absenden
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {waitlistModalOpen && (
        <WaitlistModal
          isOpen={waitlistModalOpen}
          onClose={() => setWaitlistModalOpen(false)}
        />
      )}

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
