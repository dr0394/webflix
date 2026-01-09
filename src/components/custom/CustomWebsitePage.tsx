import React, { useEffect } from 'react';
import { Check, Sparkles, Palette, Zap, Users, Code, ArrowRight, Star } from 'lucide-react';
import Header from '../Header';
import { trackPageView } from '../../lib/analytics';

export default function CustomWebsitePage() {
  useEffect(() => {
    trackPageView({
      page_title: 'Custom Website - Individuelle Entwicklung',
      page_location: window.location.href,
      page_path: '/custom'
    });
  }, []);
  const features = [
    {
      icon: Palette,
      title: 'Komplett individuelles Design',
      description: 'Deine Marke, dein Design – 100% auf deine Bedürfnisse zugeschnitten'
    },
    {
      icon: Code,
      title: 'Maßgeschneiderte Funktionen',
      description: 'Von Buchungssystemen bis E-Commerce – wir setzen um, was du brauchst'
    },
    {
      icon: Users,
      title: 'Persönlicher Ansprechpartner',
      description: 'Ein fester Entwickler begleitet dein Projekt von Anfang bis Ende'
    },
    {
      icon: Zap,
      title: 'Schnelle Umsetzung',
      description: 'Professionelle Website in 2-4 Wochen – ohne Kompromisse bei der Qualität'
    },
    {
      icon: Sparkles,
      title: 'Premium-Qualität',
      description: 'Hochwertige Programmierung, optimiert für Performance und SEO'
    },
    {
      icon: Star,
      title: 'Unbegrenzte Revisionen',
      description: 'Wir arbeiten so lange, bis du 100% zufrieden bist'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Deine Vision',
      description: 'Erzähle uns von deinem Projekt, deiner Marke und deinen Zielen'
    },
    {
      step: '02',
      title: 'Konzept & Design',
      description: 'Wir erstellen ein individuelles Design-Konzept basierend auf deinen Wünschen'
    },
    {
      step: '03',
      title: 'Entwicklung',
      description: 'Professionelle Programmierung mit modernster Technologie'
    },
    {
      step: '04',
      title: 'Feedback & Anpassung',
      description: 'Dein Feedback ist Gold wert – wir optimieren bis alles perfekt ist'
    },
    {
      step: '05',
      title: 'Launch & Support',
      description: 'Wir gehen live und unterstützen dich auch danach weiter'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black">
      <Header showNavigation={true} />

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-400/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLjktMiAyLTJoMnYtMmgtMmMtMi4yIDAtNCAxLjgtNCA0djJoLTJ2Mmgydjh6Ci8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-emerald-400/30 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Premium Custom Development</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Deine Website,</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-300 bg-clip-text text-transparent">
              100% individuell gestaltet
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Keine Templates, keine Kompromisse – nur deine einzigartige Vision,
            professionell umgesetzt von echten Entwicklern.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/custom/form'}
              className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-emerald-400/50 text-lg flex items-center justify-center gap-2 group"
            >
              <span>Jetzt Projekt starten</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/shop#pricing"
              className="px-10 py-5 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold rounded-xl transition-all text-lg"
            >
              Pakete ansehen
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Custom Projekte' },
              { number: '100%', label: 'Zufriedenheit' },
              { number: '2-4', label: 'Wochen Umsetzung' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Warum</span>{' '}
              <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                Custom Development?
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Templates haben Grenzen. Deine Marke nicht. Mit einer individuell entwickelten Website
              hebst du dich von der Konkurrenz ab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-400/50 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-black to-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Unser</span>{' '}
              <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                Prozess
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Von der ersten Idee bis zum erfolgreichen Launch – transparent und professionell
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 via-emerald-300 to-green-300 opacity-20 hidden lg:block"></div>

            <div className="space-y-12">
              {process.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 lg:text-right" style={{ textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-400/50">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-400/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Bereit für deine</span>{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              individuelle Website?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Erzähle uns von deinem Projekt. Wir melden uns innerhalb von 24 Stunden mit einem individuellen Angebot.
          </p>

          <button
            onClick={() => window.location.href = '/custom/form'}
            className="px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-emerald-400/50 text-xl flex items-center justify-center gap-3 mx-auto group"
          >
            <span>Projekt jetzt starten</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-white/60 text-sm mt-6">
            Kostenlose Erstberatung • Unverbindliches Angebot • 100% Zufriedenheitsgarantie
          </p>
        </div>
      </section>
    </div>
  );
}
