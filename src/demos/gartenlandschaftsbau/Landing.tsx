import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Star, Check, ChevronRight,
  Leaf, Droplets, Sun, Hammer, Shield, Award, Users, Trees,
  ArrowRight, X, Menu, ChevronDown, ChevronUp, MessageCircle,
  Image as ImageIcon, Sparkles, TrendingUp
} from 'lucide-react';

const GartenLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);
  const [currentBeforeAfter, setCurrentBeforeAfter] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  const [bookingData, setBookingData] = useState({
    projectType: '',
    area: '',
    condition: '',
    zip: '',
    address: '',
    timeframe: '',
    flexibility: '',
    budget: '',
    addons: [] as string[],
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: '',
    dsgvo: false
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const services = [
    {
      icon: Trees,
      title: 'Garten- & Außenanlagen',
      description: 'Neubau kompletter Gärten, Wege, Beete',
      color: '#13A066'
    },
    {
      icon: Hammer,
      title: 'Pflasterarbeiten & Einfahrten',
      description: 'Beton/Naturstein, Randsteine, Entwässerung',
      color: '#FFB800'
    },
    {
      icon: Sun,
      title: 'Terrassenbau',
      description: 'Holz, WPC/Komposit, Naturstein, Beleuchtung',
      color: '#13A066'
    },
    {
      icon: Shield,
      title: 'Natursteinarbeiten & Mauern',
      description: 'Trockenmauer, Gabionen, Stützwände',
      color: '#FFB800'
    },
    {
      icon: Leaf,
      title: 'Zäune & Sichtschutz',
      description: 'Holz, Metall, Gabionen, Tore',
      color: '#13A066'
    },
    {
      icon: Sparkles,
      title: 'Rollrasen & Bepflanzung',
      description: 'Bodenvorbereitung, Rasensysteme, Stauden',
      color: '#FFB800'
    },
    {
      icon: Droplets,
      title: 'Bewässerung & Drainage',
      description: 'Automatiksysteme, Rigolen, Drainagen',
      color: '#13A066'
    },
    {
      icon: TrendingUp,
      title: 'Bagger- & Erdarbeiten',
      description: 'Aushub, Planum, Entsorgung',
      color: '#FFB800'
    }
  ];

  const beforeAfterImages = [
    { before: 'https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=800', after: 'https://images.pexels.com/photos/1464148/pexels-photo-1464148.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Gartenumbau Velbert' },
    { before: 'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=800', after: 'https://images.pexels.com/photos/1105750/pexels-photo-1105750.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Terrasse & Pflasterung' },
    { before: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=800', after: 'https://images.pexels.com/photos/1693655/pexels-photo-1693655.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Komplette Außenanlage' }
  ];

  const processSteps = [
    { title: 'Vor-Ort-Termin & Beratung', description: 'Persönliche Besichtigung und ausführliche Bedarfsanalyse' },
    { title: 'Entwurf & Angebot', description: 'Detaillierte Planung mit transparenter Kostenaufstellung' },
    { title: 'Vorbereitung & Erdarbeiten', description: 'Professioneller Aushub und Bodenvorbereitung' },
    { title: 'Ausführung', description: 'Präzise Umsetzung: Pflaster, Terrasse, Bepflanzung' },
    { title: 'Übergabe & Pflegehinweise', description: 'Finale Abnahme mit umfassender Pflegeanleitung' }
  ];

  const packages = [
    {
      name: 'Smart Start',
      price: 'ab 1.490 €',
      size: 'S',
      features: ['Kleinflächen, Wege, Beete', 'Saubere Kanten', 'Basisbepflanzung', 'Materialberatung'],
      color: '#13A066',
      popular: false
    },
    {
      name: 'Family Garden',
      price: 'ab 6.900 €',
      size: 'M',
      features: ['Terrasse + Pflasteranteil', 'Rasen', 'Bepflanzung', 'Beleuchtung optional', 'Entwässerung'],
      color: '#FFB800',
      popular: true
    },
    {
      name: 'Signature Garten',
      price: 'ab 19.900 €',
      size: 'L',
      features: ['Komplette Außenanlage', 'Naturstein-Highlights', 'Premium Beleuchtung', 'Automatische Bewässerung', '3D-Planung inkl.'],
      color: '#13A066',
      popular: false
    }
  ];

  const addons = [
    'Ambientebeleuchtung',
    'Automatische Bewässerung',
    'Naturstein-Upgrade',
    'Sichtschutz Premium',
    'Rollrasen',
    'Planungs-3D-Visualisierung',
    'Carport/Einfahrt'
  ];

  const galleryCategories = ['Alle', 'Terrassen', 'Einfahrten', 'Naturstein', 'Bepflanzung', 'Licht & Wasser'];

  const galleryImages = [
    { url: 'https://images.pexels.com/photos/1464148/pexels-photo-1464148.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Terrassen' },
    { url: 'https://images.pexels.com/photos/1105750/pexels-photo-1105750.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Terrassen' },
    { url: 'https://images.pexels.com/photos/1693655/pexels-photo-1693655.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Einfahrten' },
    { url: 'https://images.pexels.com/photos/1796806/pexels-photo-1796806.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Bepflanzung' },
    { url: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Naturstein' },
    { url: 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Licht & Wasser' },
    { url: 'https://images.pexels.com/photos/1267293/pexels-photo-1267293.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Bepflanzung' },
    { url: 'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Terrassen' },
    { url: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Naturstein' },
    { url: 'https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Licht & Wasser' },
    { url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Einfahrten' },
    { url: 'https://images.pexels.com/photos/2698360/pexels-photo-2698360.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Bepflanzung' }
  ];

  const reviews = [
    { name: 'Michael Schmidt', rating: 5, text: 'Professionelle Arbeit von A bis Z. Unser Garten ist ein Traum geworden!', date: 'vor 2 Wochen' },
    { name: 'Sandra Weber', rating: 5, text: 'Tolle Beratung, faire Preise und pünktliche Ausführung. Sehr empfehlenswert!', date: 'vor 1 Monat' },
    { name: 'Thomas Müller', rating: 5, text: 'Die Terrasse sieht fantastisch aus. Super Team, sehr zuverlässig!', date: 'vor 3 Wochen' }
  ];

  const faqs = [
    { q: 'Planen Sie auch die Gestaltung?', a: 'Ja, inkl. Entwurf/3D auf Wunsch.' },
    { q: 'Arbeiten Sie mit Naturstein?', a: 'Ja, Granit, Basalt, Sandstein u. a.' },
    { q: 'Wann können Sie beginnen?', a: 'Abhängig von Projekt & Saison; wir nennen frühestmögliche Termine.' },
    { q: 'Bieten Sie Pflege an?', a: 'Ja, Pflegepakete & Saisonservice.' },
    { q: 'Benötige ich Genehmigungen?', a: 'Falls erforderlich, unterstützen wir bei der Abstimmung.' }
  ];

  const filteredGallery = selectedCategory === 'Alle'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#111111]/95 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-[#13A066]" />
            <span className="text-xl font-bold">GreenWorks</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {['Leistungen', 'Vorher/Nachher', 'Pakete', 'Galerie', 'Bewertungen', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace('/', '-'))}
                className="text-sm text-gray-300 hover:text-[#13A066] transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/490000000000"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-[#13A066] text-[#13A066] hover:bg-[#13A066]/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <button
              onClick={() => setShowBookingWizard(true)}
              className="px-4 py-2 rounded-xl bg-[#13A066] hover:bg-[#0E8B58] transition-all font-medium text-sm"
            >
              Ortstermin anfragen
            </button>
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#171717] border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {['Leistungen', 'Vorher/Nachher', 'Pakete', 'Galerie', 'Bewertungen', 'Termin', 'FAQ'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace('/', '-'))}
                    className="block w-full text-left py-2 text-gray-300 hover:text-[#13A066] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1464148/pexels-photo-1464148.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Außenanlagen, die<br />
              <span className="text-[#13A066]">Wert schaffen.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Planung, Neubau und Pflege von hochwertigen Gärten, Terrassen & Einfahrten – präzise und termintreu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => setShowBookingWizard(true)}
                className="px-8 py-4 rounded-2xl bg-[#13A066] hover:bg-[#0E8B58] transition-all font-bold text-lg flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Ortstermin anfragen
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="https://wa.me/490000000000"
                className="px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-[#FFB800] hover:bg-white/5 transition-all font-bold text-lg backdrop-blur-sm"
              >
                WhatsApp Beratung
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {['Meisterbetrieb', 'Eigener Maschinenpark', 'Regional & zuverlässig'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  <Check className="w-4 h-4 text-[#FFB800]" />
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-[#13A066]" />
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { icon: Star, text: 'Top-Bewertungen ★★★★★' },
              { icon: Award, text: '15+ Jahre Erfahrung' },
              { icon: Users, text: 'Fester Ansprechpartner' },
              { icon: Shield, text: 'Planung & Ausführung' },
              { icon: Check, text: 'Transparente Angebote' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-[#13A066]" />
                <p className="text-sm text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="leistungen" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Unsere Leistungen</h2>
            <p className="text-xl text-gray-400">Alles aus einer Hand – von der Planung bis zur Pflege</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer hover:transform hover:scale-105"
                style={{ borderColor: `${service.color}30` }}
              >
                <service.icon className="w-12 h-12 mb-4" style={{ color: service.color }} />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <button
                  onClick={() => setShowBookingWizard(true)}
                  className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: service.color }}
                >
                  Anfragen <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section id="vorher-nachher" className="py-24 bg-[#111111]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Sehen statt glauben</h2>
            <p className="text-xl text-gray-400">Wische über das Bild</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
              <img
                src={beforeAfterImages[currentBeforeAfter].before}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${beforeAfterSlider}%)` }}
              >
                <img
                  src={beforeAfterImages[currentBeforeAfter].after}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={beforeAfterSlider}
                onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              />
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 pointer-events-none"
                style={{ left: `${beforeAfterSlider}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-[#0A0A0A]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              {beforeAfterImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentBeforeAfter(i);
                    setBeforeAfterSlider(50);
                  }}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    currentBeforeAfter === i
                      ? 'bg-[#13A066] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {img.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">So läuft's ab</h2>
            <p className="text-xl text-gray-400">Von der ersten Idee bis zum fertigen Garten</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#13A066] flex items-center justify-center font-bold text-lg shadow-lg">
                    {i + 1}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-[#13A066] to-transparent mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pakete" className="py-24 bg-[#111111]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pakete & Preise</h2>
            <p className="text-xl text-gray-400">Transparente Angebote für jedes Budget</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-2xl border-2 backdrop-blur-sm transition-all hover:transform hover:scale-105 ${
                  pkg.popular
                    ? 'bg-[#FFB800]/10 border-[#FFB800]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-[#FFB800] text-[#0A0A0A] font-bold text-sm">
                    Beliebt
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: `${pkg.color}20`, color: pkg.color }}>
                    Paket {pkg.size}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold mb-4" style={{ color: pkg.color }}>{pkg.price}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#13A066] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowBookingWizard(true)}
                  className="w-full py-3 rounded-xl font-bold transition-all"
                  style={{
                    backgroundColor: pkg.color,
                    color: '#FFFFFF'
                  }}
                >
                  Paket anfragen
                </button>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-center">Zusätzliche Optionen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {addons.map((addon) => (
                <div key={addon} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <Check className="w-5 h-5 text-[#FFB800]" />
                  <span>{addon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galerie" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Unsere Referenzen</h2>
            <p className="text-xl text-gray-400 mb-8">Lassen Sie sich inspirieren</p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#13A066] text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                onClick={() => {
                  setLightboxImage(i);
                  setLightboxOpen(true);
                }}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
              >
                <img
                  src={img.url}
                  alt={img.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="bewertungen" className="py-24 bg-[#111111]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Das sagen unsere Kunden</h2>
            <p className="text-xl text-gray-400">★★★★★ Durchschnittlich 5 Sterne bei Google</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://g.page/r/XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <Star className="w-5 h-5 text-[#FFB800]" />
              <span className="font-medium">Eigene Bewertung schreiben</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Häufige Fragen</h2>
            <p className="text-xl text-gray-400">Alles, was Sie wissen müssen</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-[#13A066]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-400">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#111111] border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-8 h-8 text-[#13A066]" />
                <span className="text-xl font-bold">GreenWorks</span>
              </div>
              <p className="text-gray-400 text-sm">
                Ihr Partner für professionelle Garten- & Landschaftsbau Services
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Leistungen', 'Pakete', 'Galerie', 'Bewertungen'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-400 hover:text-[#13A066] transition-colors text-sm"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Kontakt</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#13A066]" />
                  <span>+49 0000 000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#13A066]" />
                  <span>kontakt@greenworks.de</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#13A066] mt-0.5" />
                  <span>Musterweg 12<br />42549 Velbert</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#13A066] mt-0.5" />
                  <span>Mo–Fr 8–18 Uhr<br />Sa 9–14 Uhr</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <div className="space-y-2">
                {['Impressum', 'Datenschutz', 'AGB'].map((link) => (
                  <button
                    key={link}
                    className="block text-gray-400 hover:text-[#13A066] transition-colors text-sm"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GreenWorks Garten- & Landschaftsbau. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <a
          href="tel:+490000000000"
          className="w-14 h-14 rounded-full bg-[#13A066] hover:bg-[#0E8B58] flex items-center justify-center shadow-2xl transition-all hover:scale-110"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
        <a
          href="https://wa.me/490000000000"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] flex items-center justify-center shadow-2xl transition-all hover:scale-110"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Booking Wizard Modal */}
      <AnimatePresence>
        {showBookingWizard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowBookingWizard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Ortstermin anfragen</h3>
                <button
                  onClick={() => setShowBookingWizard(false)}
                  className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center py-12">
                <Leaf className="w-16 h-16 text-[#13A066] mx-auto mb-4" />
                <p className="text-gray-400 mb-6">
                  Kontaktieren Sie uns für Ihren persönlichen Ortstermin:
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+490000000000"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#13A066] hover:bg-[#0E8B58] transition-all font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    +49 0000 000000
                  </a>
                  <a
                    href="https://wa.me/490000000000"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] transition-all font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Beratung
                  </a>
                  <a
                    href="mailto:kontakt@greenworks.de"
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-medium"
                  >
                    <Mail className="w-5 h-5" />
                    kontakt@greenworks.de
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={filteredGallery[lightboxImage]?.url}
              alt="Gallery"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {lightboxImage > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(lightboxImage - 1);
                }}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
            )}

            {lightboxImage < filteredGallery.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(lightboxImage + 1);
                }}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GartenLandingPage;
