import React, { useState, useEffect } from 'react';
import { Check, Play, Star, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 2, minutes: 42, seconds: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const whatsappNumber = "4915146692387";
  const whatsappMessage = encodeURIComponent("Hallo! Ich interessiere mich für eine Website für 347€.");

  return (
    <section className="relative bg-[#0d0d0d] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-block px-5 py-2 border border-amber-500/40 rounded-sm mb-6 sm:mb-8">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-amber-400/90 uppercase">
                Warum tausende zahlen wenn es auch einfacher geht
              </span>
            </div>

            <h1 className="font-black leading-[0.95] mb-6 sm:mb-8 tracking-tight">
              <span className="block text-white text-[2.2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] uppercase">
                Deine professionelle
              </span>
              <span className="block text-white text-[2.2rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] uppercase">
                Website in 48 Stunden!
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-200 uppercase tracking-wider max-w-4xl mx-auto mb-4 sm:mb-5 leading-relaxed">
              Der Service, der dir zeigt: Du brauchst keine Agentur, keine Erfahrung und keinen Technikstress. Wir bauen deine Website - fertig in 48h.
            </p>

            <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto mb-3">
              Die meisten Menschen haben <strong className="text-white">KEINE AHNUNG</strong>, wie teuer und kompliziert Website-Agenturen arbeiten.
            </p>

            <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto">
              Mit WEBFLIX bekommst du deine professionelle Website zum Festpreis - und wie <strong className="text-white">500+ Kunden</strong> es
              bereits geschafft haben, waehrend andere noch auf ihre Agentur warten.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div>
              <div className="relative rounded-lg overflow-hidden bg-gray-900 border border-white/10 aspect-video group cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="WEBFLIX Ergebnis"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-4.242-4.242a9 9 0 0012.728 0" />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center gap-3">
                  <span className="text-amber-400 font-bold text-sm tracking-wider">WEBFLIX</span>
                  <span className="text-white/40">|</span>
                  <span className="text-gray-300 text-sm">So funktioniert's</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mt-5 flex-wrap">
                <div className="bg-[#1a1a2e] border border-white/10 rounded-md px-3 py-2 flex flex-col items-center">
                  <span className="text-[9px] text-gray-400 leading-tight">Kundenmeinungen</span>
                  <span className="text-[9px] text-gray-400 leading-tight">der letzten 12 Monate</span>
                  <span className="text-white font-black text-xs mt-1">TOP</span>
                  <span className="text-white font-black text-xs">DIENSTLEISTER</span>
                  <span className="text-amber-400 font-bold text-xs">2026</span>
                  <span className="text-[8px] text-gray-500 mt-0.5">Mehr Infos &gt;</span>
                  <span className="text-[8px] text-gray-500">ProvenExpert</span>
                </div>

                <div className="bg-[#1a1a2e] border border-white/10 rounded-md px-3 py-2 flex flex-col items-center">
                  <span className="text-[9px] text-gray-400 leading-tight">Kundenmeinungen</span>
                  <span className="text-[9px] text-gray-400 leading-tight">der letzten 12 Monate</span>
                  <span className="text-white font-black text-xs mt-1">TOP</span>
                  <span className="text-amber-400 font-black text-xs">EMPFEHLUNG</span>
                  <span className="text-amber-400 font-bold text-xs">2026</span>
                  <span className="text-[8px] text-gray-500 mt-0.5">Mehr Infos &gt;</span>
                  <span className="text-[8px] text-gray-500">ProvenExpert</span>
                </div>

                <div className="flex flex-col items-start">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-white font-bold text-base mt-1">Sehr Gut</span>
                  <span className="text-gray-400 text-sm">ProvenExpert</span>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-lg p-6 sm:p-8">
              <p className="text-xs sm:text-sm font-bold tracking-[0.15em] text-amber-400/80 uppercase mb-3">
                Launch-Angebot gilt nur jetzt!
              </p>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl sm:text-6xl font-black text-white">347€</span>
                <span className="text-lg sm:text-xl text-red-500 line-through font-bold">3.637 Euro</span>
              </div>

              <div className="bg-[#1a1a1a] border border-white/10 rounded-md px-4 py-3 mb-5">
                <p className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
                  <ArrowRight className="w-3 h-3 inline mr-1" />
                  Du sparst 3.290€ mit Code: WFXDEAL
                </p>
              </div>

              <div className="inline-block border border-white/20 px-3 py-1.5 mb-6">
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Deine Vorteile im Ueberblick</span>
              </div>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">Professionelle Website in 48 Stunden (Wert 1.997 €)</p>
                    <p className="text-sm text-gray-400 mt-1">Von "Ich habe keine Website" zu "Meine Website ist online" - in 48 Stunden.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">Unbegrenzte Aenderungen & Lifetime-Support</p>
                    <p className="text-sm text-gray-400 mt-1">Aenderungswuensche werden sofort umgesetzt. Support per WhatsApp - ein Leben lang.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">Bonus 1: SEO & Google Optimierung</p>
                    <p className="text-sm text-gray-400 mt-1">Deine Website wird bei Google gefunden. Komplett optimiert fuer maximale Sichtbarkeit.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">Bonus 2: Technischer Support ab 7,90 Euro/Monat</p>
                    <p className="text-sm text-gray-400 mt-1">Laufender Support, Updates und Wartung - alles ab 7,90 Euro im Monat.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs sm:text-sm font-bold text-white text-center uppercase tracking-wider mb-4">
                  Gesamtwert: weit ueber 3.637 Euro
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-center rounded-md py-4 sm:py-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <span className="block text-base sm:text-lg font-black uppercase tracking-wider">
                    Ja, ich will meine Website
                  </span>
                  <span className="block text-sm text-white/80 mt-0.5">(Fuer nur 347 €)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/5">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white italic">500+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-tight">umgesetzte Websites,<br />ohne Agentur-Abhaengigkeit</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white italic">48h</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-tight">Express-Lieferung,<br />garantiert fertig</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white italic">Mio €</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-tight">gesparte Agenturkosten<br />in der Community</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white italic">5 Jahre</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-tight">Erfahrung in Website-,<br />Funnel- & Systemaufbau</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
