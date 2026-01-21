import { Sparkles, Award, GitBranch, Headphones, Lightbulb, Palette, Code } from 'lucide-react';

export default function WebflixCustomSection() {
  const features = [
    {
      icon: Award,
      title: 'Enterprise-Design',
      description: 'Außergewöhnliche Websites mit preisgekrönten Design'
    },
    {
      icon: GitBranch,
      title: 'Business-Systeme',
      description: 'Funnels, CRM, E-Commerce, Buchungssysteme – alles nahtlos integriert in deinem System'
    },
    {
      icon: Headphones,
      title: 'Persönliche Betreuung',
      description: 'Ein dir zugewiesener Webflix Custom Experte setzt Alles um und Unterstützt dich'
    }
  ];

  const phases = [
    {
      number: '1',
      icon: Lightbulb,
      title: 'STRATEGIE',
      duration: '1 Woche',
      description: 'Gemeinsam analysieren wir dein Business und entwickeln eine Website-Strategie mit überzeugendem Copywriting – perfekt abgestimmt auf deine Ziele.'
    },
    {
      number: '2',
      icon: Palette,
      title: 'DESIGN',
      duration: '1-2 Wochen',
      description: 'Basierend auf der Strategie gestalten wir ein Design, das deine Zielgruppe fesselt und überzeugt.'
    },
    {
      number: '3',
      icon: Code,
      title: 'ENTWICKLUNG',
      duration: '1-3 Wochen',
      description: 'Professionelle Programmierung für optimale Performance, Geschwindigkeit und Benutzerfreundlichkeit.'
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#1a1a1a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-white/60" />
            <span className="text-sm font-bold text-white/80">Webflix Custom</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Brauchen Sie mehr als eine{' '}
            <span className="block sm:inline mt-2 sm:mt-0">
              <span className="text-white">
                Webflix Website?
              </span>
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Dein All In One System für Maximale Effizienz!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:border-white/40 transition-all duration-300 hover:scale-105"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded-xl p-3">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Stufen Webflix Prozess */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
              3 Stufen Webflix Prozess
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Unser Prozess folgt einem klaren System.<br />
              Von der Strategie über das Design bis zur Entwicklung – jeder Schritt zielt auf maximalen Business-Erfolg ab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 hover:border-white/40 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded-xl p-3">
                        <phase.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>

                    <div className="text-6xl sm:text-7xl font-black text-white/10">
                      {phase.number}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-xs font-bold text-white/60 group-hover:text-orange-400 tracking-wider transition-colors duration-300">
                      PHASE {phase.number}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {phase.title}
                  </h3>

                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 transition-all duration-300"></div>
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
                    <div className="w-8 h-0.5 bg-white/20 group-hover:bg-gradient-to-r group-hover:from-orange-400/50 group-hover:to-transparent transition-all duration-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="group relative bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 group-hover:bg-gradient-to-br group-hover:from-orange-400/20 to-transparent rounded-full blur-3xl transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 group-hover:bg-gradient-to-tr group-hover:from-pink-400/20 to-transparent rounded-full blur-3xl transition-all duration-500"></div>

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
                  onClick={() => window.location.href = '/custom'}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 border-2 border-white/30 hover:border-transparent rounded-xl font-bold text-white text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 whitespace-nowrap"
                >
                  Mehr erfahren
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/60">
            Perfekt für E-Commerce, Portale, SaaS-Anwendungen und komplexe Websites
          </p>
        </div>
      </div>
    </section>
  );
}
