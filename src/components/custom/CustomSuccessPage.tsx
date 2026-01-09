import React, { useEffect } from 'react';
import { CheckCircle, Calendar, Mail, ArrowRight, Sparkles, Phone } from 'lucide-react';
import Header from '../Header';
import { trackPageView, trackGenerateLead } from '../../lib/analytics';

export default function CustomSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Track page view
    trackPageView({
      page_title: 'Custom Website - Termin gebucht',
      page_location: window.location.href,
      page_path: '/custom/success'
    });

    // Track lead conversion (user successfully booked consultation)
    trackGenerateLead({
      currency: 'EUR',
      value: 0,
      lead_source: 'Custom Website',
      lead_type: 'Beratungsgespräch gebucht'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black">
      <Header showNavigation={true} />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                Termin erfolgreich gebucht!
              </span>
            </h1>

            <p className="text-xl text-white/80">
              Wir freuen uns auf das Gespräch mit dir
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-400/10 border border-green-500/30 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h2 className="text-xl font-bold text-white mb-2">Was passiert jetzt?</h2>
                <p className="text-white/70 leading-relaxed">
                  Du hast eine Bestätigungs-E-Mail mit allen Details zu deinem Termin erhalten.
                  Unser Team bereitet sich auf das Gespräch vor und freut sich darauf, dein Projekt kennenzulernen.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Bestätigungs-E-Mail</h3>
                <p className="text-white/60 text-sm">
                  Prüfe dein Postfach für alle Termin-Details und den Meeting-Link
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Kalender-Einladung</h3>
                <p className="text-white/60 text-sm">
                  Füge den Termin zu deinem Kalender hinzu, damit du ihn nicht verpasst
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Video-Call</h3>
                <p className="text-white/60 text-sm">
                  Zum vereinbarten Zeitpunkt sprechen wir über dein Projekt
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-8">
            <h3 className="text-white font-bold mb-4 text-center">So bereitest du dich optimal vor:</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Überlege dir deine wichtigsten Ziele für die Website</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Sammle Beispiele von Websites, die dir gefallen (falls vorhanden)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Notiere dir Fragen, die du uns stellen möchtest</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Denke über dein Budget und Timeline nach</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-white/70 text-center">
              Du hast noch Fragen vorab oder möchtest etwas ändern?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@webflix.de"
                className="px-8 py-4 bg-white/5 border-2 border-white/10 hover:border-green-500/50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                <span>info@webflix.de</span>
              </a>
              <a
                href="tel:+491234567890"
                className="px-8 py-4 bg-white/5 border-2 border-white/10 hover:border-green-500/50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>+49 123 456 7890</span>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 mb-6 text-center">
              In der Zwischenzeit kannst du gerne unsere anderen Angebote entdecken
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Zur Startseite</span>
              </button>
              <button
                onClick={() => window.location.href = '/configurator'}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
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
