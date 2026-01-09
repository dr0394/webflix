import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Zap, Shield, Globe, Smartphone, FileText, Search, Clock, TrendingUp, Lock, ChevronDown, Calendar, Phone, Mail, MessageCircle, Award, Target, Sparkles, Code, Menu, X } from 'lucide-react';
import { trackPageView } from '../../lib/analytics';

const Offer499Page = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    trackPageView({
      page_title: 'Website ab 499€ - 7 Tage Online',
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }, []);

  const benefits = [
    {
      icon: <Search className="w-8 h-8" />,
      text: 'SEO OPTIMIERT',
      description: 'Deine Website wird von Google gefunden'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      text: 'DOMAIN INKL',
      description: 'Deine perfekte Domain - 1 Jahr kostenlos'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      text: 'GOOGLE INDEXIERUNG',
      description: 'Sofort in Suchmaschinen sichtbar'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      text: 'SMARTPHONE 100% ANGEPASST',
      description: 'Perfekt auf allen Geräten'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      text: 'ANFRAGEFORMULAR',
      description: 'Kontaktformular direkt integriert'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src="https://i.imgur.com/4Hp6B6u.png"
                alt="Webflix"
                className="h-10 sm:h-12 w-auto"
              />
            </Link>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-400 hover:text-white transition">Features</a>
              <a href="#prozess" className="text-gray-400 hover:text-white transition">Prozess</a>
              <a href="#garantie" className="text-gray-400 hover:text-white transition">Garantie</a>
              <button
                onClick={() => navigate('/custom/buchung')}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
              >
                Jetzt starten
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-400 hover:text-white transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#prozess"
                className="block text-gray-400 hover:text-white transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Prozess
              </a>
              <a
                href="#garantie"
                className="block text-gray-400 hover:text-white transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Garantie
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/custom/buchung');
                }}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-lg text-white font-semibold transition-all"
              >
                Jetzt starten
              </button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-32 px-4 sm:px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/10 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-medium text-sm">Webflix 499</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-[1.1] px-4">
              Deine Website für{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 blur-xl opacity-50"></span>
                <span className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  499€
                </span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-4 sm:mb-6 font-light px-4">
              In 7 Tagen online.
            </p>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              Professionelle Website-Entwicklung zum fairen Festpreis.<br className="hidden sm:block" />
              Kein Template, kein Baukasten – echte Handarbeit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
            <button
              onClick={() => navigate('/custom/buchung')}
              className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-lg text-white font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              Jetzt Projekt starten
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 rounded-lg text-white font-medium text-base sm:text-lg transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 text-center"
            >
              Mehr erfahren
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-xs sm:text-sm text-gray-400 px-4">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Keine versteckten Kosten</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>100% Zufriedenheitsgarantie</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>SEO & Mobile optimiert</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </div>
      </section>

      <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 md:mb-20">
            Was du für 499€ bekommst.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all h-full">
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                    <Check className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <div className="text-orange-400">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">{benefit.text}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all h-full">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                  <Check className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                  <div className="text-blue-400">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">DSGVO KONFORM</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-400">Rechtssicher und abmahnsicher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-12 sm:mb-16 md:mb-20 gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl">
              Warum DIY-Baukästen dein Business bremsen.
            </h2>
            <div className="hidden lg:flex items-center space-x-2 text-gray-400 flex-shrink-0">
              <TrendingUp className="w-6 h-6" />
              <span className="text-base lg:text-lg font-semibold">VERLORENE KUNDEN</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="group relative bg-gradient-to-br from-gray-900/50 to-black p-8 rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-yellow-500" />
                  </div>
                  <span className="text-xs font-bold text-yellow-500 px-3 py-1 bg-yellow-500/10 rounded-full">ZEITFRESSER</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Wochen oder Monate mit Drag-and-Drop-Editoren kämpfen, während deine Konkurrenz schon online Kunden gewinnt.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Zeit ist Geld - und DIY-Lösungen kosten dich beides.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-900/50 to-black p-8 rounded-2xl border border-orange-500/30 hover:border-orange-500/60 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-orange-500" />
                  </div>
                  <span className="text-xs font-bold text-orange-500 px-3 py-1 bg-orange-500/10 rounded-full">UNPROFESSIONELL</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Template-Websites sehen aus wie Tausende andere. Kunden merken das und klicken weg.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Der erste Eindruck entscheidet - und Baukasten-Websites wirken billig.
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
                  <span className="text-xs font-bold text-red-500 px-3 py-1 bg-red-500/10 rounded-full">VERSTECKTE KOSTEN</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  "Kostenlos" bis du Premium-Features, bessere Templates und Support brauchst. Dann wird's teuer.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Am Ende zahlst du mehr als 499€ - für weniger Qualität.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prozess" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 md:mb-20">
            So einfach kommst du zu deiner Website.
          </h2>

          <div className="space-y-8 sm:space-y-12">
            {[
              {
                day: 'Tag 1',
                title: 'KICKOFF-GESPRÄCH',
                subtitle: 'Wir verstehen dein Business',
                items: [
                  'Kostenloses Beratungsgespräch (15-30 Min)',
                  'Deine Wünsche und Ziele besprechen',
                  'Design-Vorschläge zeigen',
                  'Sofort starten'
                ]
              },
              {
                day: 'Tag 2-3',
                title: 'DESIGN & CONTENT',
                subtitle: 'Wir erstellen deine Website',
                items: [
                  'Professionelles Design nach deinen Vorgaben',
                  'Texte und Bilder einpflegen',
                  'SEO-Optimierung',
                  'Mobile-Optimierung'
                ]
              },
              {
                day: 'Tag 4-5',
                title: 'FEEDBACK & ANPASSUNGEN',
                subtitle: 'Du gibst Feedback',
                items: [
                  'Du bekommst Zugang zur Preview',
                  'Änderungswünsche werden umgesetzt',
                  'Bis du 100% zufrieden bist',
                  'Unbegrenzte Anpassungen'
                ]
              },
              {
                day: 'Tag 6-7',
                title: 'LAUNCH & LIVE',
                subtitle: 'Deine Website geht online',
                items: [
                  'Domain wird eingerichtet',
                  'Website geht live',
                  'Google-Indexierung',
                  'Du bekommst eine Einführung'
                ]
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  {index !== 3 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-orange-500/50 to-transparent mt-4"></div>
                  )}
                </div>

                <div className="flex-1 pb-8 sm:pb-12">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold">{step.title}</h3>
                    <span className="text-xs sm:text-sm text-gray-500 font-semibold">{step.day}</span>
                  </div>
                  <p className="text-orange-400 mb-3 sm:mb-4 text-base sm:text-lg">{step.subtitle}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, idx) => (
                      <li key={idx} className="flex items-start sm:items-center space-x-3 text-sm sm:text-base text-gray-400">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
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

      <section id="garantie" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12">
            Unsere 100% Zufriedenheitsgarantie.
          </h2>

          <div className="bg-gradient-to-br from-green-900/30 to-black p-6 sm:p-8 md:p-12 rounded-3xl border-2 border-green-500 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 px-4">
              Nicht zufrieden? Du zahlst <span className="text-green-400">0€</span>
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center mb-6 sm:mb-8 leading-relaxed px-4">
              Wir arbeiten so lange an deiner Website, bis du zu 100% zufrieden bist.
              Solltest du am Ende nicht happy sein - was noch nie vorgekommen ist - zahlst du keinen Cent.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-black/40 rounded-2xl p-4 sm:p-6 text-center">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-300 font-semibold">100+ zufriedene Kunden</p>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 sm:p-6 text-center">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-300 font-semibold">98% Zufriedenheitsrate</p>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 sm:p-6 text-center">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-300 font-semibold">5.0 Sterne Bewertung</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/custom/buchung')}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg text-white font-bold text-lg sm:text-xl transition-all transform hover:scale-105 shadow-lg shadow-green-500/25"
              >
                Jetzt starten - Risikofrei
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12">
            Häufig gestellte Fragen.
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {[
              { q: 'Was kostet die Website nach den ersten 499€?', a: 'Die 499€ sind eine Einmalzahlung. Für Hosting und Domain fallen ca. 10-15€ monatlich an. Keine versteckten Kosten.' },
              { q: 'Kann ich meine Website selbst bearbeiten?', a: 'Ja! Du bekommst ein einfaches CMS, mit dem du Texte und Bilder selbst ändern kannst. Oder wir machen das für dich.' },
              { q: 'Was passiert wenn ich nicht zufrieden bin?', a: 'Dann arbeitest wir kostenlos weiter, bis du zufrieden bist. Solltest du am Ende nicht happy sein, zahlst du nichts.' },
              { q: 'Wie viele Seiten bekomme ich?', a: 'Ein professioneller Onepager mit allen wichtigen Infos zu deinem Business, plus Basis-Impressum und Datenschutz-Seite. Mehr Seiten gegen Aufpreis möglich.' },
              { q: 'Ist SEO wirklich inklusive?', a: 'Ja! Basis-SEO (Meta-Tags, strukturierte Daten, Ladezeit-Optimierung) ist inklusive. Für umfangreiches SEO gibt es Zusatzpakete.' },
              { q: 'Was braucht ihr von mir?', a: 'Logo, Texte und Bilder. Falls du das nicht hast, helfen wir dir dabei - gegen kleinen Aufpreis.' }
            ].map((faq, idx) => (
              <details key={idx} className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all group">
                <summary className="text-base sm:text-lg md:text-xl font-bold cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="flex-1">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
            Bereit für deine Website?
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 sm:mb-8">
            In 7 Tagen online. Oder kostenlos.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Buche jetzt ein kostenloses Beratungsgespräch und lass uns über dein Projekt sprechen.
            Keine Verpflichtung, kein Risiko - einfach nur ein ehrliches Gespräch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 px-4">
            <button
              onClick={() => navigate('/custom/buchung')}
              className="w-full sm:w-auto group px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-lg text-white font-bold text-lg sm:text-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg shadow-orange-500/25"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Jetzt Projekt starten</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 mb-8 sm:mb-12 px-4">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              <span>100% kostenlose Erstberatung</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              <span>Angebot in 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              <span>Start in 48h möglich</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-400 px-4">
            <a href="tel:+491234567890" className="flex items-center space-x-2 hover:text-white transition">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>+49 (0) 123 456 789</span>
            </a>
            <a href="mailto:kontakt@webflix.de" className="flex items-center space-x-2 hover:text-white transition">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>kontakt@webflix.de</span>
            </a>
            <button className="flex items-center space-x-2 hover:text-white transition">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Live-Chat Mo-Fr 9-18h</span>
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="flex flex-col items-center md:items-start">
              <Link to="/" className="mb-3 sm:mb-4">
                <img
                  src="https://i.imgur.com/4Hp6B6u.png"
                  alt="Webflix"
                  className="h-12 sm:h-16 w-auto"
                />
              </Link>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md text-center md:text-left">
                Professionelle Website-Entwicklung zum fairen Festpreis.
                Kein Template, kein Baukasten – echte Handarbeit.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 text-center md:text-left">
              <div>
                <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Unternehmen</h4>
                <div className="space-y-1 sm:space-y-2">
                  <Link to="/about" className="block text-gray-400 hover:text-white transition text-xs sm:text-sm">Über uns</Link>
                  <Link to="/contact" className="block text-gray-400 hover:text-white transition text-xs sm:text-sm">Kontakt</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Rechtliches</h4>
                <div className="space-y-1 sm:space-y-2">
                  <Link to="/impressum" className="block text-gray-400 hover:text-white transition text-xs sm:text-sm">Impressum</Link>
                  <Link to="/datenschutz" className="block text-gray-400 hover:text-white transition text-xs sm:text-sm">Datenschutz</Link>
                  <Link to="/agb" className="block text-gray-400 hover:text-white transition text-xs sm:text-sm">AGB</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/10 text-center text-gray-500 text-xs sm:text-sm">
            <p>&copy; 2025 Webflix. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Offer499Page;
