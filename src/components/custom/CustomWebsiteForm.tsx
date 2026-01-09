import React, { useEffect } from 'react';
import { Calendar, Sparkles, CheckCircle } from 'lucide-react';
import Header from '../Header';
import { trackPageView, trackFormSubmit } from '../../lib/analytics';

export default function CustomWebsiteForm() {
  useEffect(() => {
    // Track page view
    trackPageView({
      page_title: 'Custom Website - Beratungsgespräch buchen',
      page_location: window.location.href,
      page_path: '/custom/form'
    });

    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        if (e.data.event === 'calendly.event_scheduled') {
          // Track form submission when user books a meeting
          trackFormSubmit({
            form_name: 'Custom Website Beratungsgespräch',
            form_type: 'Calendly Booking',
            form_destination: '/custom/thank-you'
          });
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black">
      <Header showNavigation={true} />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-emerald-400/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Kostenloses Beratungsgespräch</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Lass uns über dein</span>
            <br />
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              Projekt sprechen
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Buche jetzt ein kostenloses 30-minütiges Beratungsgespräch und lass uns gemeinsam
            deine individuelle Website planen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Kostenlos & unverbindlich</h3>
              <p className="text-white/60 text-sm">Keine versteckten Kosten</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">30 Minuten</h3>
              <p className="text-white/60 text-sm">Ausführliche Beratung</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">Individuelles Angebot</h3>
              <p className="text-white/60 text-sm">Maßgeschneidert für dich</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div
              className="calendly-inline-widget rounded-xl overflow-hidden"
              data-url={`https://calendly.com/mdd_beratungsgespraech/kostenfrei?hide_gdpr_banner=1&redirect_url=${window.location.origin}/custom/success`}
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm">
              Nach der Buchung wirst du automatisch zu einer Bestätigungsseite weitergeleitet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
