import { MessageCircle } from 'lucide-react';

export default function ConsultationBanner() {
  return (
    <section className="relative py-8 sm:py-10 md:py-12 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#111111] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="group relative bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 hover:from-green-500/20 hover:via-emerald-500/10 hover:to-pink-500/20 backdrop-blur-xl border-2 border-white/20 hover:border-green-400/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 group-hover:from-green-400/20 to-transparent rounded-full blur-3xl transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 group-hover:from-pink-400/20 to-transparent rounded-full blur-3xl transition-all duration-500"></div>

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-8 py-6 sm:py-8 text-center">
            {/* Heading */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Bereit für Deine professionelle Website aber du benötigst{' '}
              <span className="text-white/60 group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:via-emerald-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                Unterstützung
              </span>{' '}
              oder hast offene Fragen?
            </h3>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/80 mb-6 font-medium">
              Vereinbare jetzt ein{' '}
              <span className="font-bold text-white">kostenfreies Beratungsgespräch</span>
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.href = '/custom/form'}
                className="relative px-6 py-3 bg-white/10 hover:bg-gradient-to-r hover:from-green-500 hover:via-emerald-500 hover:to-pink-500 border-2 border-white/30 hover:border-transparent rounded-lg font-bold text-white text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-105 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Beratungsgespräch vereinbaren
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/70">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-green-400 rounded-full transition-colors duration-500"></div>
                <span>100% kostenfrei</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-green-400 rounded-full transition-colors duration-500"></div>
                <span>Unverbindlich</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-white/40 group-hover:bg-green-400 rounded-full transition-colors duration-500"></div>
                <span>Individuelle Beratung</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
