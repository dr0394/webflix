import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Lock, TrendingUp, Target, Rocket, Shield, Code, Users, Award, Clock, Sparkles, ChevronDown, Phone, Mail, MessageCircle, Calendar, Layers } from 'lucide-react';

export default function WebflixCustomPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-white">Webflix</span>
              <span className="text-orange-500"> Custom</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#pakete" className="text-gray-400 hover:text-white transition">Custom</a>
              <a href="#portfolio" className="text-gray-400 hover:text-white transition">Portfolio</a>
              <a href="#prozess" className="text-gray-400 hover:text-white transition">Prozess</a>
              <a href="#kontakt" className="text-gray-400 hover:text-white transition">Kontakt</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-black to-black"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Webflix Custom.
          </h1>
          <p className="text-3xl md:text-4xl text-gray-300 mb-8 font-light">
            Gemacht, um zu dominieren.
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Keine Templates. Keine Kompromisse. Nur deine einzigartige Vision,
            professionell umgesetzt als digitale Business-Maschine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/custom/buchung"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full text-white font-semibold transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Projekt starten - Kostenlose Beratung</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#portfolio"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold transition-all backdrop-blur-sm border border-white/20"
            >
              Portfolio ansehen
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>500+ Custom-Projekte erfolgreich umgesetzt</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>100% Zufriedenheitsgarantie</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>2-4 Wochen Umsetzung</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-600" />
        </div>
      </section>

      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-20">
            <h2 className="text-5xl md:text-6xl font-bold">
              Warum Standard-Lösungen dein Wachstum bremsen.
            </h2>
            <div className="hidden lg:flex items-center space-x-2 text-gray-400">
              <TrendingUp className="w-6 h-6" />
              <span className="text-lg font-semibold">VERLORENE UMSÄTZE</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-black p-8 rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-yellow-500" />
                  </div>
                  <span className="text-xs font-bold text-yellow-500 px-3 py-1 bg-yellow-500/10 rounded-full">INEFFIZIENTE PROZESSE</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Deine Website konvertiert nicht optimal. Kunden springen ab, weil die User Journey nicht stimmt.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Jeden Tag verlierst du potenzielle Kunden an Konkurrenten mit besseren Websites.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-900/50 to-black p-8 rounded-2xl border border-orange-500/30 hover:border-orange-500/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-orange-500" />
                  </div>
                  <span className="text-xs font-bold text-orange-500 px-3 py-1 bg-orange-500/10 rounded-full">ZEIT = GELD</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Manuelle Abläufe kosten Zeit und Geld. Keine Automatisierung, keine Integration mit deinen Business-Systemen.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Dein Team verschwendet Stunden mit Aufgaben, die automatisch laufen könnten.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-900/50 to-black p-8 rounded-2xl border border-red-500/30 hover:border-red-500/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Lock className="w-7 h-7 text-red-500" />
                  </div>
                  <span className="text-xs font-bold text-red-500 px-3 py-1 bg-red-500/10 rounded-full">WACHSTUMS-BLOCKADEN</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Dein Business wächst, aber deine digitale Infrastruktur hält nicht mit.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Neue Märkte? Neue Produkte? Neue Zielgruppen? Deine aktuelle Website kann das nicht abbilden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-24 leading-tight">
            Custom. Für Unternehmen, die führen wollen.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                  <Sparkles className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Einfach einzigartig.</h3>
                <p className="text-gray-400 leading-relaxed">
                  Webflix Custom ist für maßgeschneiderte Digitallösungen und Business-Transformation bekannt – wie unser Individual Design System, das eine handgefertigte digitale Identität für dein Unternehmen entwickelt. Oder unsere Custom Development Platform, die flexibelste Website-Lösung aller Zeiten.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all h-full">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
                  <Shield className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Lang leben deine Systeme.</h3>
                <p className="text-gray-400 leading-relaxed">
                  Webflix Custom-Websites sind durch zukunftssichere Architektur geschützt – und das ist nachhaltiger als jedes Template. Unsere neuesten Development-Systeme haben sogar Adaptive Scaling mit automatischer Anpassung an dein Wachstum. Custom Basic, Pro und Enterprise sind auch mit Performance-Garantie ausgestattet – für zusätzliche Sicherheit.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all h-full">
                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-all">
                  <Layers className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Einfach zu erweitern.</h3>
                <p className="text-gray-400 leading-relaxed">
                  Wir entwickeln deine Custom-Website und alle zukünftigen Features zusammen, damit alles nahtlos funktioniert. Du willst neue Features? Die Integration läuft automatisch. Und durch modulare Architektur wächst deine Website mit deinem Business mit – jahrelang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pakete" className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-8">
            Custom. Für jede Ambition die richtige Lösung.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">WEBFLIX CUSTOM</h3>
                <h4 className="text-2xl font-bold text-green-500">BASIC</h4>
              </div>
              <p className="text-gray-400 mb-6">Für Startups & kleine Unternehmen</p>
              <p className="text-5xl font-bold mb-8">Ab 499€</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>1 individuelle Landingpage</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Responsive Design</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Kontaktformular</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>3 Monate Support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-500">1-2 Wochen Lieferzeit</span>
                </li>
              </ul>

              <Link
                to="/custom/buchung"
                className="block w-full py-4 bg-white/10 hover:bg-white/20 rounded-full text-center font-semibold transition-all"
              >
                Projekt starten
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-black p-8 rounded-3xl border-2 border-orange-500 relative transform scale-105 hover:scale-110 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-sm font-bold">
                ⭐ BELIEBT
              </div>

              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">WEBFLIX CUSTOM</h3>
                <h4 className="text-2xl font-bold text-orange-500">PRO</h4>
              </div>
              <p className="text-gray-400 mb-6">Für etablierte Unternehmen</p>
              <p className="text-5xl font-bold mb-8">Ab 1.999€</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>5-7 Seiten</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Dashboard & Login</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>User Management</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Content Management</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>6 Monate Support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-500">3-4 Wochen Lieferzeit</span>
                </li>
              </ul>

              <Link
                to="/custom/buchung"
                className="block w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full text-center font-semibold transition-all"
              >
                Projekt starten
              </Link>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 hover:border-red-500/50 transition-all">
              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">WEBFLIX CUSTOM</h3>
                <h4 className="text-2xl font-bold text-red-500">ENTERPRISE</h4>
              </div>
              <p className="text-gray-400 mb-6">Für Marktführer & komplexe Systeme</p>
              <p className="text-5xl font-bold mb-8">Ab 4.999€</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Unbegrenzte Seiten</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Komplette CRM-Integration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Multi-Platform</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>12 Monate Support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-500">6-8 Wochen Lieferzeit</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Unbegrenzte Seiten</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Multi-Platform</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>24 Monate Dedicated Support</span>
                </li>
              </ul>

              <Link
                to="/custom/buchung"
                className="block w-full py-4 bg-white/10 hover:bg-white/20 rounded-full text-center font-semibold transition-all"
              >
                Projekt starten
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
            Technologie. Unsichtbar mächtig.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed mb-16 text-center max-w-4xl mx-auto">
            <span className="text-white font-semibold">Einfach fortschrittlich.</span> Webflix Custom nutzt Enterprise-Grade Technologien für maximale Performance und Skalierbarkeit – wie unser Headless Architecture System, das 10x schnellere Ladezeiten und unbegrenzte Flexibilität ermöglicht.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-black p-8 rounded-3xl border border-blue-500/20">
              <Rocket className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">PERFORMANCE ENGINE</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Next.js/React für Enterprise-Speed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Global CDN mit 99.99% Uptime</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>Progressive Web App Architecture</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-black p-8 rounded-3xl border border-purple-500/20">
              <Sparkles className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">AI-POWERED DEVELOPMENT</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">•</span>
                  <span>Automatische Code-Optimierung</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">•</span>
                  <span>Predictive Performance Scaling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">•</span>
                  <span>Smart User Experience Anpassung</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-black p-8 rounded-3xl border border-green-500/20">
              <Shield className="w-12 h-12 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">ENTERPRISE SECURITY</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">•</span>
                  <span>DSGVO-konforme Architektur</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">•</span>
                  <span>End-to-End Verschlüsselung</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">•</span>
                  <span>Penetration-tested Security</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-black p-8 rounded-3xl border border-orange-500/20">
              <Code className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">CUSTOM INTEGRATIONS</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500">•</span>
                  <span>API-First Development</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500">•</span>
                  <span>Nahtlose CRM/ERP Anbindung</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500">•</span>
                  <span>Maßgeschneiderte Business Logic</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="prozess" className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">
            Dein Weg zum Custom-Meisterwerk.
          </h2>

          <div className="space-y-12">
            {[
              {
                phase: '1',
                title: 'DISCOVERY & STRATEGIE',
                week: 'Woche 1',
                subtitle: 'Wir verstehen dein Business und deine Vision',
                items: [
                  'Ausführliches Strategiegespräch',
                  'Zielgruppen- & Wettbewerbsanalyse',
                  'Technical Requirements Workshop',
                  'Custom Feature-Definition'
                ]
              },
              {
                phase: '2',
                title: 'KONZEPT & WIREFRAMING',
                week: 'Woche 2',
                subtitle: 'Wir entwickeln die perfekte User Journey',
                items: [
                  'Information Architecture',
                  'User Experience Design',
                  'Interactive Wireframes',
                  'Feedback & Iteration'
                ]
              },
              {
                phase: '3',
                title: 'DESIGN & BRANDING',
                week: 'Woche 3-4',
                subtitle: 'Wir erschaffen deine einzigartige Identität',
                items: [
                  'Custom Design System',
                  'Brand-Integration',
                  'Responsive Design',
                  'Design-Approval'
                ]
              },
              {
                phase: '4',
                title: 'DEVELOPMENT & INTEGRATION',
                week: 'Woche 5-8',
                subtitle: 'Wir bauen deine digitale Maschine',
                items: [
                  'Custom Development',
                  'System-Integrationen',
                  'Performance-Optimierung',
                  'Quality Assurance'
                ]
              },
              {
                phase: '5',
                title: 'LAUNCH & OPTIMIERUNG',
                week: 'Woche 9+',
                subtitle: 'Wir launchen und optimieren kontinuierlich',
                items: [
                  'Soft Launch & Testing',
                  'Go-Live & Monitoring',
                  'Performance-Tracking',
                  'Ongoing Optimization'
                ]
              }
            ].map((step) => (
              <div key={step.phase} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {step.phase}
                  </div>
                  {step.phase !== '5' && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-orange-500/50 to-transparent mt-4"></div>
                  )}
                </div>

                <div className="flex-1 pb-12">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <span className="text-sm text-gray-500">{step.week}</span>
                  </div>
                  <p className="text-orange-500 mb-4 text-lg">{step.subtitle}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-gray-400">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">
            Erfolgsgeschichten. Von der Vision zur Realität.
          </h2>

          <div className="space-y-12">
            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-white/10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">E-COMMERCE TRANSFORMATION</h3>
                  <p className="text-xl text-gray-400">KUNDE: StyleMax Fashion</p>
                </div>
                <Award className="w-12 h-12 text-yellow-500" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">HERAUSFORDERUNG</p>
                  <p className="text-gray-300">Veralteter Online-Shop, schlechte Conversion</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">LÖSUNG</p>
                  <p className="text-gray-300">Custom E-Commerce mit AI-Produktempfehlungen</p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
                <p className="text-sm text-gray-400 mb-4">ERGEBNIS</p>
                <div className="flex flex-wrap gap-6 text-2xl font-bold">
                  <div>
                    <span className="text-green-500">+340%</span>
                    <span className="text-gray-400 text-base ml-2">Umsatz</span>
                  </div>
                  <div>
                    <span className="text-green-500">+180%</span>
                    <span className="text-gray-400 text-base ml-2">Conversion Rate</span>
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-orange-500 pl-6 mb-6 italic text-gray-300">
                "Die beste Investition für unser Business. ROI von 800% im ersten Jahr nach dem Launch."
                <footer className="text-sm text-gray-500 mt-2">— Sarah Mueller, CEO StyleMax</footer>
              </blockquote>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition">
                  Vollständige Case Study
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full font-semibold transition">
                  Live Website ansehen
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-white/10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">SAAS-PLATTFORM ENTWICKLUNG</h3>
                  <p className="text-xl text-gray-400">KUNDE: TechStart Solutions</p>
                </div>
                <Rocket className="w-12 h-12 text-blue-500" />
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">HERAUSFORDERUNG</p>
                  <p className="text-gray-300">Komplexe SaaS-Anwendung für B2B-Kunden</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">LÖSUNG</p>
                  <p className="text-gray-300">Custom Web-App mit Dashboard & API-Integration</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
                <p className="text-sm text-gray-400 mb-4">ERGEBNIS</p>
                <div className="flex flex-wrap gap-6 text-2xl font-bold">
                  <div>
                    <span className="text-blue-500">2,4M€</span>
                    <span className="text-gray-400 text-base ml-2">Funding</span>
                  </div>
                  <div>
                    <span className="text-blue-500">500+</span>
                    <span className="text-gray-400 text-base ml-2">Enterprise-Kunden</span>
                  </div>
                </div>
              </div>

              <blockquote className="border-l-4 border-orange-500 pl-6 mb-6 italic text-gray-300">
                "Webflix Custom hat unsere Vision perfekt umgesetzt. Ohne sie hätten wir das Funding nie bekommen."
                <footer className="text-sm text-gray-500 mt-2">— Michael Schmidt, CTO TechStart</footer>
              </blockquote>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition">
                  Vollständige Case Study
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full font-semibold transition">
                  Live Platform ansehen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">
            Warum die Besten Webflix Custom wählen.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: 'BUSINESS-FIRST APPROACH', desc: 'Wir entwickeln nicht nur Websites, sondern digitale Business-Systeme, die messbare Ergebnisse liefern.' },
              { icon: Zap, title: 'ENTERPRISE-GRADE TECHNOLOGIE', desc: 'Modernste Tech-Stacks, die auch bei 100.000+ Besuchern performant bleiben und mit deinem Business mitwachsen.' },
              { icon: Shield, title: 'DSGVO & SECURITY BY DESIGN', desc: '100% DSGVO-konform, penetration-tested und mit Enterprise-Security-Standards entwickelt. Deine Daten sind sicher.' },
              { icon: Rocket, title: 'PERFORMANCE-GARANTIE', desc: 'Wir garantieren PageSpeed 95+, Core Web Vitals im grünen Bereich und 99.99% Uptime. Oder du bekommst dein Geld zurück.' },
              { icon: Users, title: 'DEDICATED DEVELOPMENT TEAM', desc: 'Ein festes Team aus Senior-Entwicklern, Designern und Projektmanagern arbeitet exklusiv an deinem Projekt.' },
              { icon: TrendingUp, title: 'LIFETIME EVOLUTION', desc: 'Deine Website wächst mit deinem Business. Neue Features, Skalierung und Updates – alles aus einer Hand, ein Leben lang.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all">
                <item.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
            Investition. Transparent und fair.
          </h2>

          <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-white/10">
            <h3 className="text-3xl font-bold mb-8">Was kostet ein Webflix Custom Projekt?</h3>
            <p className="text-gray-400 mb-8">Die Kosten hängen von der Komplexität deines Projekts ab:</p>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-xl font-bold mb-2 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-3"></span>
                  EINFACHE CUSTOM-WEBSITES (5-10 Seiten)
                </h4>
                <p className="text-gray-400 mb-2">Corporate Websites, Portfolios, Landingpages</p>
                <p className="text-2xl font-bold text-green-500">Investition: 2.990€ - 4.990€</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="text-xl font-bold mb-2 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></span>
                  MITTLERE CUSTOM-PROJEKTE (10-25 Seiten)
                </h4>
                <p className="text-gray-400 mb-2">E-Commerce, Buchungssysteme, Member-Bereiche</p>
                <p className="text-2xl font-bold text-yellow-500">Investition: 7.990€ - 12.990€</p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h4 className="text-xl font-bold mb-2 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-3"></span>
                  KOMPLEXE CUSTOM-LÖSUNGEN (25+ Seiten)
                </h4>
                <p className="text-gray-400 mb-2">SaaS-Plattformen, Portale, Multi-Site-Systeme</p>
                <p className="text-2xl font-bold text-red-500">Investition: 19.990€ - 49.990€</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-3 text-gray-400">
              <p className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>INKLUSIVE: Design, Development, Testing, Launch, Support</span>
              </p>
              <p className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>KEINE VERSTECKTEN KOSTEN: Alles transparent und vorab</span>
              </p>
              <p className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>FLEXIBLE ZAHLUNG: 50% Start, 50% bei Abnahme</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
            Vertrauen. Von Kunden bestätigt.
          </h2>

          <div className="text-center mb-16">
            <div className="flex justify-center gap-16 mb-8">
              <div>
                <p className="text-6xl font-bold text-orange-500 mb-2">500+</p>
                <p className="text-gray-400">Custom-Projekte erfolgreich</p>
              </div>
              <div>
                <p className="text-6xl font-bold text-orange-500 mb-2">98%</p>
                <p className="text-gray-400">Kundenzufriedenheit in 5 Jahren</p>
              </div>
              <div>
                <p className="text-6xl font-bold text-orange-500 mb-2">4.9/5</p>
                <p className="text-gray-400">Durchschnittsbewertung</p>
              </div>
            </div>
          </div>

          <h3 className="text-4xl font-bold text-center mb-12">Häufig gestellte Fragen.</h3>

          <div className="space-y-4">
            {[
              { q: 'Wie lange dauert ein Custom-Projekt?', a: 'Standard: 6-8 Wochen | Komplex: 8-12 Wochen | Enterprise: 12-16 Wochen' },
              { q: 'Was kostet eine Custom Website?', a: 'Je nach Komplexität: 2.990€ - 49.990€ (siehe Preistransparenz)' },
              { q: 'Welche Technologien nutzen Sie?', a: 'Next.js, React, Node.js, moderne Cloud-Infrastruktur' },
              { q: 'Kann ich meine Website selbst bearbeiten?', a: 'Ja, mit intuitivem CMS oder wir übernehmen das für Sie' },
              { q: 'Bieten Sie auch Wartung und Support?', a: 'Ja, 6-24 Monate Support inklusive, danach optional' },
              { q: 'Wie läuft die Zusammenarbeit ab?', a: 'Fester Ansprechpartner, wöchentliche Updates, transparenter Prozess' }
            ].map((faq, idx) => (
              <details key={idx} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all group">
                <summary className="text-xl font-bold cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-6 h-6 text-orange-500 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-6">
            Bereit für dein Custom-Meisterwerk?
          </h2>
          <p className="text-3xl text-gray-300 mb-8">
            Deine Vision. Unsere Expertise. Dein Erfolg.
          </p>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Lass uns gemeinsam etwas Außergewöhnliches schaffen. In einem kostenlosen Strategiegespräch analysieren wir deine Anforderungen und entwickeln eine maßgeschneiderte Lösung für dein Business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/custom/buchung"
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full text-white font-bold text-lg transition-all transform hover:scale-105 flex items-center space-x-3"
            >
              <Calendar className="w-6 h-6" />
              <span>Kostenloses Strategiegespräch buchen</span>
            </Link>
            <a
              href="#portfolio"
              className="px-10 py-5 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold text-lg transition-all backdrop-blur-sm border border-white/20"
            >
              Portfolio ansehen
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-400 mb-12">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>100% kostenlose Erstberatung</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Unverbindliches Angebot in 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>100% Zufriedenheitsgarantie</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-400">
            <a href="tel:+491234567890" className="flex items-center space-x-2 hover:text-white transition">
              <Phone className="w-5 h-5" />
              <span>+49 (0) 123 456 789</span>
            </a>
            <a href="mailto:custom@webflix.de" className="flex items-center space-x-2 hover:text-white transition">
              <Mail className="w-5 h-5" />
              <span>custom@webflix.de</span>
            </a>
            <button className="flex items-center space-x-2 hover:text-white transition">
              <MessageCircle className="w-5 h-5" />
              <span>Live-Chat Mo-Fr 9-18h</span>
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; 2025 Webflix Custom. Alle Rechte vorbehalten.</p>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <Link to="/impressum" className="hover:text-white transition">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white transition">Datenschutz</Link>
            <Link to="/agb" className="hover:text-white transition">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
