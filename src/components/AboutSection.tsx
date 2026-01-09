import { Users, Target, Lightbulb, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#111111] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gray-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Über uns
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Wir sind...
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl sm:text-9xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-pink-400 text-transparent bg-clip-text">
                  2020
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 flex-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 border border-gray-500/30 flex items-center justify-center">
                  <Target className="w-7 h-7 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Unsere Mission</h3>
                  <p className="text-white/70 leading-relaxed">
                    Wir glauben, dass jedes Unternehmen eine professionelle Online-Präsenz verdient. Deshalb haben wir Webflix entwickelt - eine Plattform, die hochwertige Webseiten schnell, einfach und bezahlbar macht.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 flex-1">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 border border-gray-500/30 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Unsere Vision</h3>
                  <p className="text-white/70 leading-relaxed">
                    Wir wollen die erste Anlaufstelle für kleine und mittlere Unternehmen werden, die eine moderne, professionelle Webseite benötigen - ohne lange Wartezeiten und ohne versteckte Kosten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Unsere Werte</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Diese Prinzipien leiten uns jeden Tag bei unserer Arbeit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-gray-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 border border-gray-500/30 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Qualität</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Wir setzen höchste Standards und liefern nur Webseiten, auf die wir stolz sind
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-gray-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 border border-gray-500/30 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Kundenfokus</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Ihre Zufriedenheit steht an erster Stelle. Wir hören zu und setzen um
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-gray-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 border border-gray-500/30 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Innovation</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Wir nutzen modernste Technologien, um die besten Ergebnisse zu erzielen
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-gray-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-400/20 border border-gray-500/30 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Transparenz</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Klare Preise, klare Prozesse - keine versteckten Kosten oder Überraschungen
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
