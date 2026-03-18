import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles, Clock, Shield } from 'lucide-react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [availableSlots, setAvailableSlots] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const whatsappNumber = "4915146692387";
  const whatsappMessage = encodeURIComponent("Hallo! Ich möchte meinen kostenlosen Website-Entwurf für 349€ erhalten.");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">

        {/* Limited Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6 animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-sm font-bold text-red-400">Nur noch {availableSlots} Plätze diese Woche verfügbar</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-black mb-6 leading-tight">
          <span className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Deine Website für
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            349€
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          Erst den Entwurf sehen. Dann bezahlen.
        </p>
        <p className="text-lg sm:text-xl text-gray-400 mb-12">
          Kein Risiko. Keine Vorauszahlung. Alles per WhatsApp.
        </p>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-sm text-white font-medium">Kein Risiko</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
            <Clock className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-sm text-white font-medium">In 24h Entwurf</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-sm text-white font-medium">Erst sehen</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
            <Sparkles className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-sm text-white font-medium">Dann zahlen</span>
          </div>
        </div>

        {/* Main CTA */}
        <div className="max-w-2xl mx-auto">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 hover:from-green-400 hover:to-emerald-400 transition-all duration-300 transform group-hover:scale-[1.02]">
              <div className="flex items-center justify-center gap-4 mb-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div className="text-left">
                  <div className="text-white text-2xl sm:text-3xl font-black">
                    Kostenlosen Entwurf erhalten
                  </div>
                  <div className="text-green-100 text-sm font-medium">
                    Direkt per WhatsApp starten
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-green-50 text-sm font-medium opacity-90">
                  Antwort in wenigen Minuten
                </div>
              </div>
            </div>
          </a>

          {/* Countdown Timer */}
          <div className="mt-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="text-gray-300 text-sm mb-2">Angebot endet in:</div>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">Stunden</div>
              </div>
              <div className="text-3xl font-black text-white">:</div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">Minuten</div>
              </div>
              <div className="text-3xl font-black text-white">:</div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs text-gray-400">Sekunden</div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-black text-green-400">1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp-Nachricht</h3>
            <p className="text-gray-400">Schreibe uns deine Branche und grundlegende Wünsche</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-black text-green-400">2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Entwurf in 24h</h3>
            <p className="text-gray-400">Erhalte deinen persönlichen Website-Entwurf per WhatsApp</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-black text-green-400">3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Zahlen & Online</h3>
            <p className="text-gray-400">Nur bei Gefallen 349€ zahlen und Website geht live</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 flex items-center justify-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="text-3xl font-black text-green-400">847+</div>
            <div className="text-sm text-gray-400">Zufriedene Kunden</div>
          </div>
          <div className="w-px h-12 bg-white/10"></div>
          <div className="text-center">
            <div className="text-3xl font-black text-green-400">4.9/5</div>
            <div className="text-sm text-gray-400">Bewertung</div>
          </div>
          <div className="w-px h-12 bg-white/10"></div>
          <div className="text-center">
            <div className="text-3xl font-black text-green-400">24h</div>
            <div className="text-sm text-gray-400">Entwurf-Zeit</div>
          </div>
        </div>

      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

    </section>
  );
};

export default Hero;