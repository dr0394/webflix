/*
 * AUTOAUFBEREITUNG LANDING PAGE - V3 ARCHITECTURE
 *
 * REPLACEMENT GUIDE FOR PRODUCTION:
 * ================================
 *
 * 1. IMAGES TO REPLACE:
 *    - /hero-detailing.jpg - Hero background image (1920x1080 recommended)
 *    - /public/before-1a.jpg & /public/before-1b.jpg - Before/After pair 1
 *    - /public/before-2a.jpg & /public/before-2b.jpg - Before/After pair 2
 *    - /public/before-3a.jpg & /public/before-3b.jpg - Before/After pair 3
 *    - /public/gallery-1.jpg through /public/gallery-12.jpg - Gallery images
 *
 * 2. CONTACT INFORMATION:
 *    - Business Name: Search for "AutoPflege Premium" and replace
 *    - Phone: Search for "+49 123 456 789" and replace
 *    - Email: Search for "kontakt@autopflege-premium.de" and replace
 *    - Address: Search for "Musterstraße 123, 12345 Musterstadt" and replace
 *    - Instagram: Update the JSON-LD sameAs URL
 *
 * 3. LINKS TO UPDATE:
 *    - WhatsApp booking link (search for "wa.me")
 *    - Google Maps embed URL
 *    - Social media links in footer
 *
 * 4. API ENDPOINT:
 *    - Replace the mock /api/booking handler with your real backend endpoint
 *    - Update the booking form submission logic in handleBookingSubmit()
 *
 * 5. JSON-LD STRUCTURED DATA:
 *    - Update all business details in the <Head> section's JSON-LD
 *    - Add your real coordinates for geo data
 *    - Update opening hours to match your business
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Star, Shield, Clock, CheckCircle,
  ArrowRight, Sparkles, Car, Award, MessageCircle, Menu, X
} from 'lucide-react';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  service: string;
  message: string;
}

const AutoaufbereitungLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'pkw',
    service: 'komplett',
    message: ''
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'before-after', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Booking Request:', {
      timestamp: new Date().toISOString(),
      formData: bookingForm
    });

    const response = { ok: true };

    if (response.ok) {
      alert('Vielen Dank! Wir melden uns in Kürze bei Ihnen.');
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        vehicleType: 'pkw',
        service: 'komplett',
        message: ''
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.title = 'AutoPflege Premium - Professionelle Fahrzeugaufbereitung | Ihr Auto wie neu';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professionelle Autoaufbereitung und Fahrzeugpflege in Musterstadt. Innenreinigung, Außenreinigung, Polieren und Versiegelung. Jetzt Termin vereinbaren!');
    }

    const localBusinessScript = document.createElement('script');
    localBusinessScript.type = 'application/ld+json';
    localBusinessScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "AutoPflege Premium",
      "image": "/hero-detailing.jpg",
      "description": "Professionelle Fahrzeugaufbereitung und Autopflege",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Musterstraße 123",
        "addressLocality": "Musterstadt",
        "postalCode": "12345",
        "addressCountry": "DE"
      },
      "telephone": "+49-123-456-789",
      "email": "kontakt@autopflege-premium.de",
      "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-14:00",
      "priceRange": "€€",
      "sameAs": [
        "https://www.instagram.com/autopflegepremium"
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.1657",
        "longitude": "10.4515"
      }
    });

    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AutoPflege Premium",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });

    document.head.appendChild(localBusinessScript);
    document.head.appendChild(websiteScript);

    return () => {
      document.head.removeChild(localBusinessScript);
      document.head.removeChild(websiteScript);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header/Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <div className="text-2xl font-bold text-gray-900">
                AutoPflege Premium
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'services', label: 'Leistungen' },
                  { id: 'before-after', label: 'Referenzen' },
                  { id: 'gallery', label: 'Galerie' },
                  { id: 'contact', label: 'Kontakt' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-sky-600'
                        : 'text-gray-600 hover:text-sky-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="tel:+49123456789"
                  className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all"
                >
                  Jetzt anrufen
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden py-4 border-t">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'services', label: 'Leistungen' },
                  { id: 'before-after', label: 'Referenzen' },
                  { id: 'gallery', label: 'Galerie' },
                  { id: 'contact', label: 'Kontakt' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/hero-detailing.jpg)',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-sky-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-sky-400/30 mb-6">
                  <Award className="w-4 h-4 text-sky-400" />
                  <span className="text-sky-100 text-sm font-medium">Über 500 zufriedene Kunden</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Ihr Auto verdient<br />
                  <span className="text-sky-400">Perfektion</span>
                </h1>

                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Professionelle Fahrzeugaufbereitung, die Ihrem Auto seinen ursprünglichen Glanz zurückgibt.
                  Vom Kleinwagen bis zum Luxusfahrzeug – wir behandeln jedes Auto mit höchster Sorgfalt.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all inline-flex items-center justify-center gap-2 shadow-xl"
                  >
                    <Phone className="w-5 h-5" />
                    Jetzt Termin buchen
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                  >
                    Leistungen ansehen
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-12">
                  {[
                    { icon: Shield, text: 'Versichert' },
                    { icon: Award, text: '5-Sterne Service' },
                    { icon: Clock, text: 'Schnelle Termine' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <item.icon className="w-5 h-5 text-sky-400" />
                      <span className="text-white text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Unsere Leistungen
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Perfekte Pflege für jedes Fahrzeug
                </h2>
                <p className="text-xl text-gray-600">
                  Von der Basisreinigung bis zur Premium-Aufbereitung – wir haben das passende Paket für Sie
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'Innenraumreinigung',
                  description: 'Tiefenreinigung aller Innenraumflächen, Sitze, Teppiche und Polster',
                  features: ['Sitzreinigung', 'Fleckentfernung', 'Geruchsbeseitigung', 'Staubsaugen']
                },
                {
                  icon: Car,
                  title: 'Außenreinigung',
                  description: 'Professionelle Handwäsche mit Premium-Produkten für strahlenden Glanz',
                  features: ['Handwäsche', 'Felgenreinigung', 'Reifenpflege', 'Scheiben polieren']
                },
                {
                  icon: Shield,
                  title: 'Polieren & Versiegeln',
                  description: 'Lackpolitur und Versiegelung für langanhaltenden Schutz',
                  features: ['Lackpolitur', 'Kratzerentfernung', 'Versiegelung', 'UV-Schutz']
                },
                {
                  icon: Star,
                  title: 'Motorwäsche',
                  description: 'Schonende Reinigung des Motorraums für optimale Funktion',
                  features: ['Entfettung', 'Schonende Reinigung', 'Pflege', 'Kontrolle']
                },
                {
                  icon: Award,
                  title: 'Lederpflege',
                  description: 'Spezielle Behandlung für Lederausstattung',
                  features: ['Lederreinigung', 'Konditionierung', 'Schutz', 'Auffrischung']
                },
                {
                  icon: Sparkles,
                  title: 'Komplett-Paket',
                  description: 'Rundum-Service für perfekte Fahrzeugaufbereitung',
                  features: ['Innen + Außen', 'Polieren', 'Versiegeln', 'Lederpflege']
                }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-sky-200 group"
                >
                  <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                    <service.icon className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-sky-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full mt-6 bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    Jetzt buchen
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section id="before-after" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Vorher/Nachher
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Sehen Sie den Unterschied
                </h2>
                <p className="text-xl text-gray-600">
                  Überzeugen Sie sich selbst von unserer Arbeit
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { before: '/public/before-1a.jpg', after: '/public/before-1b.jpg', title: 'Innenraum' },
                { before: '/public/before-2a.jpg', after: '/public/before-2b.jpg', title: 'Lack' },
                { before: '/public/before-3a.jpg', after: '/public/before-3b.jpg', title: 'Felgen' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-square">
                        <img
                          src={item.before}
                          alt="Vorher"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          VORHER
                        </div>
                      </div>
                      <div className="relative aspect-square">
                        <img
                          src={item.after}
                          alt="Nachher"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          NACHHER
                        </div>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Unsere Arbeit
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Galerie unserer Projekte
                </h2>
                <p className="text-xl text-gray-600">
                  Jedes Auto ist ein Unikat – sehen Sie unsere Ergebnisse
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }, (_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                >
                  <img
                    src={`/public/gallery-${idx + 1}.jpg`}
                    alt={`Projekt ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">Projekt {idx + 1}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Booking Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Kontakt
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Jetzt Termin vereinbaren
                  </h2>
                  <p className="text-xl text-gray-600">
                    Wir freuen uns auf Ihre Anfrage
                  </p>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Booking Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                        placeholder="Ihr Name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                          placeholder="ihre@email.de"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                          placeholder="+49 123 456 789"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Fahrzeugtyp
                        </label>
                        <select
                          value={bookingForm.vehicleType}
                          onChange={(e) => setBookingForm({ ...bookingForm, vehicleType: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                        >
                          <option value="pkw">PKW</option>
                          <option value="suv">SUV</option>
                          <option value="transporter">Transporter</option>
                          <option value="sportwagen">Sportwagen</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Gewünschte Leistung
                        </label>
                        <select
                          value={bookingForm.service}
                          onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors"
                        >
                          <option value="innen">Innenreinigung</option>
                          <option value="aussen">Außenreinigung</option>
                          <option value="polieren">Polieren & Versiegeln</option>
                          <option value="komplett">Komplett-Paket</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nachricht (optional)
                      </label>
                      <textarea
                        rows={4}
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-500 focus:outline-none transition-colors resize-none"
                        placeholder="Haben Sie besondere Wünsche oder Fragen?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Phone className="w-5 h-5" />
                      Anfrage absenden
                    </button>
                  </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 border-2 border-sky-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformationen</h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Telefon</p>
                          <a href="tel:+49123456789" className="text-sky-600 hover:text-sky-700 font-medium">
                            +49 123 456 789
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">E-Mail</p>
                          <a href="mailto:kontakt@autopflege-premium.de" className="text-sky-600 hover:text-sky-700 font-medium">
                            kontakt@autopflege-premium.de
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Adresse</p>
                          <p className="text-gray-600">
                            Musterstraße 123<br />
                            12345 Musterstadt
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">Öffnungszeiten</p>
                          <p className="text-gray-600">
                            Mo-Fr: 08:00 - 18:00 Uhr<br />
                            Sa: 09:00 - 14:00 Uhr<br />
                            So: Geschlossen
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                    <p className="text-gray-500">Google Maps Integration hier</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">AutoPflege Premium</h3>
                <p className="text-gray-400">
                  Ihre Experten für professionelle Fahrzeugaufbereitung
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {['Home', 'Leistungen', 'Referenzen', 'Galerie', 'Kontakt'].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSection(item.toLowerCase().replace(/ü/g, 'u'))}
                      className="block text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Folgen Sie uns</h4>
                <a
                  href="https://www.instagram.com/autopflegepremium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2025 AutoPflege Premium. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AutoaufbereitungLanding;
