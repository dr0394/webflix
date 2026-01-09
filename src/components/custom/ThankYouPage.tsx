import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Mail, Phone, Calendar, Sparkles } from 'lucide-react';
import { trackPageView, trackGenerateLead } from '../../lib/analytics';

export default function ThankYouPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Track page view
    trackPageView({
      page_title: 'Danke - Projekt erfolgreich eingereicht',
      page_location: window.location.href,
      page_path: '/custom/thank-you'
    });

    // Track lead conversion (user reached thank you page)
    trackGenerateLead({
      currency: 'EUR',
      value: 0,
      lead_source: 'Custom Website',
      lead_type: 'Projekt eingereicht'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[orange-500] to-[pink-400] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[orange-500] via-[pink-400] to-[orange-500] bg-clip-text text-transparent">
                Vielen Dank!
              </span>
            </h1>
            <p className="text-xl text-white/80">
              Deine Projektanfrage wurde erfolgreich übermittelt
            </p>
          </div>

          <div className="bg-gradient-to-br from-[orange-500]/10 to-[pink-400]/10 border border-[orange-500]/30 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[pink-400] flex-shrink-0 mt-1" />
              <div className="text-left">
                <h2 className="text-xl font-bold text-white mb-2">Was passiert jetzt?</h2>
                <p className="text-white/70 leading-relaxed">
                  Unser Team prüft deine Anfrage und erstellt ein individuelles Angebot für dein Projekt.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 bg-[orange-500]/20 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-[pink-400]" />
                </div>
                <h3 className="text-white font-bold mb-2">Innerhalb von 24h</h3>
                <p className="text-white/60 text-sm">
                  Du erhältst eine Eingangsbestätigung per E-Mail
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 bg-[orange-500]/20 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-[pink-400]" />
                </div>
                <h3 className="text-white font-bold mb-2">Innerhalb von 48h</h3>
                <p className="text-white/60 text-sm">
                  Wir melden uns telefonisch für ein kurzes Kennenlerngespräch
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 bg-[orange-500]/20 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5 text-[pink-400]" />
                </div>
                <h3 className="text-white font-bold mb-2">Innerhalb von 3-5 Tagen</h3>
                <p className="text-white/60 text-sm">
                  Du erhältst dein individuelles Angebot mit Projektplan
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white/70">
              Du hast noch Fragen oder möchtest direkt mit uns sprechen?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@webflix.de"
                className="px-8 py-4 bg-white/5 border-2 border-white/10 hover:border-[orange-500]/50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                <span>info@webflix.de</span>
              </a>
              <a
                href="tel:+491234567890"
                className="px-8 py-4 bg-white/5 border-2 border-white/10 hover:border-[orange-500]/50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>+49 123 456 7890</span>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 mb-6">
              In der Zwischenzeit kannst du gerne unsere anderen Angebote entdecken
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 border-2 border-[orange-500] text-[orange-500] hover:bg-[orange-500] hover:text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Zur Startseite</span>
              </button>
              <button
                onClick={() => window.location.href = '/configurator'}
                className="px-8 py-4 bg-gradient-to-r from-[orange-500] to-[pink-400] hover:from-[orange-600] hover:to-[orange-500] text-black font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Sofort-Website kaufen</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-white/40 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben</span>
          </div>
        </div>
      </div>
    </div>
  );
}
