import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Check } from 'lucide-react';

export default function BookingPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/custom" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück</span>
            </Link>
            <Link to="/" className="text-2xl font-bold">
              <span className="text-white">Webflix</span>
              <span className="text-orange-500"> Custom</span>
            </Link>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mb-6">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Kostenloses Strategiegespräch
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Lass uns gemeinsam deine Vision besprechen. In 30 Minuten analysieren wir deine Anforderungen und entwickeln eine maßgeschneiderte Lösung für dein Business.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 sticky top-24">
                <h3 className="text-2xl font-bold mb-6">Was dich erwartet:</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Business-Analyse</p>
                      <p className="text-sm text-gray-400">Gemeinsam verstehen wir deine Ziele und Herausforderungen</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Technische Machbarkeit</p>
                      <p className="text-sm text-gray-400">Wir klären, welche Lösungen für dein Projekt optimal sind</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Kosten & Timeline</p>
                      <p className="text-sm text-gray-400">Du erhältst ein transparentes Angebot mit klaren Lieferzeiten</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Nächste Schritte</p>
                      <p className="text-sm text-gray-400">Klarer Fahrplan für die Umsetzung deines Projekts</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-xl p-4">
                  <p className="text-sm font-medium mb-2">💡 Unverbindlich & Kostenlos</p>
                  <p className="text-xs text-gray-400">
                    Keine versteckten Kosten. Nur ein ehrliches Gespräch über dein Projekt und wie wir dir helfen können.
                  </p>
                </div>
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/mdd_beratungsgespraech/kostenfrei?hide_gdpr_banner=1&primary_color=f97316"
                  style={{ minWidth: '320px', height: '700px' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8">Vertrauen von über 500+ Unternehmen</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/10">
                  <p className="text-4xl font-bold text-orange-500 mb-2">500+</p>
                  <p className="text-gray-400">Custom-Projekte erfolgreich umgesetzt</p>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/10">
                  <p className="text-4xl font-bold text-orange-500 mb-2">98%</p>
                  <p className="text-gray-400">Kundenzufriedenheit</p>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-white/10">
                  <p className="text-4xl font-bold text-orange-500 mb-2">4.9/5</p>
                  <p className="text-gray-400">Durchschnittsbewertung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
