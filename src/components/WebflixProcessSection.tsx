import { Lightbulb, Palette, Code } from 'lucide-react';

export default function WebflixProcessSection() {
  const phases = [
    {
      number: '1',
      icon: Lightbulb,
      title: 'STRATEGIE',
      duration: '3-4 Wochen',
      description: 'Gemeinsam analysieren wir dein Business und entwickeln eine Website-Strategie mit überzeugendem Copywriting – perfekt abgestimmt auf deine Ziele.'
    },
    {
      number: '2',
      icon: Palette,
      title: 'DESIGN',
      duration: '4-6 Wochen',
      description: 'Basierend auf der Strategie gestalten wir ein Design, das deine Zielgruppe fesselt und überzeugt.'
    },
    {
      number: '3',
      icon: Code,
      title: 'ENTWICKLUNG',
      duration: '3-4 Wochen',
      description: 'Professionelle Programmierung für optimale Performance, Geschwindigkeit und Benutzerfreundlichkeit.'
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-[#111111] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            3 Stufen Webflix Prozess
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Unser Prozess folgt einem klaren System.<br />
            Von der Strategie über das Design bis zur Entwicklung – jeder Schritt zielt auf maximalen Business-Erfolg ab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded-xl p-3">
                      <phase.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>

                  <div className="text-6xl sm:text-7xl font-black text-white/10">
                    {phase.number}
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-bold text-orange-400 tracking-wider">
                    PHASE {phase.number}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {phase.title}
                </h3>

                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400"></div>
                  <span className="text-sm text-white/60 font-medium">
                    {phase.duration}
                  </span>
                </div>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-auto">
                  {phase.description}
                </p>
              </div>

              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400/50 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-purple-500/20 backdrop-blur-xl border-2 border-pink-400/30 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Bereit für Ihre individuelle Website?
                </h3>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  Vereinbaren sie ein kostenfreies Beratungsgespräch und wir entwickeln ein passendes System für ihre Ziele.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto lg:flex-shrink-0">
                <button
                  onClick={() => window.location.href = '/custom/form'}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 whitespace-nowrap"
                >
                  ✨ Projekt anfragen
                </button>
                <button
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/30 hover:border-white/50 rounded-xl font-bold text-white text-base sm:text-lg transition-all duration-300 whitespace-nowrap"
                >
                  Mehr erfahren
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
