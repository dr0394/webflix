import { Check, X } from 'lucide-react';

export default function ComparisonSection() {
  const comparisonData = [
    {
      criterion: 'Wartezeit',
      baukasten: 'Mehrere Wochen',
      agency: '3–6 Monate',
      webflix: '48 Stunden',
      custom: '4-8 Wochen',
      webflixHighlight: true
    },
    {
      criterion: 'Kosten einmalig',
      baukasten: 'Individuell ',
      agency: 'Ab 5.000 €',
      webflix: '499 €',
      custom: 'Ab 999 €',
      webflixHighlight: true
    },
    {
      criterion: 'Kosten mtl.',
      baukasten: 'Ab 19,90 €',
      agency: 'Ab 89,90 €',
      webflix: 'Ab 9,90 €',
      custom: 'Ab 49,90 €',
      webflixHighlight: true
    },
    {
      criterion: 'Ergebnis',
      baukasten: 'DIY-Qualität',
      agency: 'Unklares Ergebnis',
      webflix: 'Siehst, was du kriegst',
      custom: 'Maßgeschneidert',
      webflixHighlight: true
    },
    {
      criterion: 'Wartung',
      baukasten: 'Selbst verantwortlich',
      agency: 'Zusätzliche Kosten',
      webflix: 'Alles inklusive',
      custom: 'Service-Paket',
      webflixHighlight: true
    },
    {
      criterion: 'Anpassungen',
      baukasten: 'Template-Grenzen',
      agency: 'Komplizierte Absprachen',
      webflix: 'Einfacher Online-Prozess',
      custom: 'Persönlicher Ansprechpartner',
      webflixHighlight: true
    },
    {
      criterion: 'Design',
      baukasten: 'Limitierte Templates',
      agency: 'Standard-Templates',
      webflix: 'Premium-Designs',
      custom: 'Enterprise',
      webflixHighlight: true
    },
    {
      criterion: 'Funktionen',
      baukasten: 'Basis-Features',
      agency: 'Basis-Features',
      webflix: 'Add-ons verfügbar',
      custom: 'Unbegrenzt',
      webflixHighlight: true
    },
    {
      criterion: 'Support',
      baukasten: 'Community-Forum',
      agency: 'Oft begrenzt',
      webflix: 'Lebenslang inklusive',
      custom: 'Premium-Support',
      webflixHighlight: true
    }
  ];

  return (
    <section id="packages-section" className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#111111] via-[#0a0a0a] to-[#111111] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-pink-400 bg-clip-text text-transparent">
              Webflix vs.
            </span>{' '}
            <span className="text-white">der Rest</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Warum Webflix die smartere Wahl ist
          </p>
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-6 bg-white/5 border-b border-white/10">
              <div className="font-bold text-white/90 text-lg">Anbieter</div>
              <div className="font-bold text-white/60 text-lg text-center">Website-Baukästen</div>
              <div className="font-bold text-white/60 text-lg text-center">Agenturen</div>
              <div className="font-bold text-lg text-center">
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Webflix
                </span>
              </div>
              <div className="font-bold text-lg text-center">
                <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                  Webflix Custom
                </span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 p-6 hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="font-bold text-white/90">{row.criterion}</div>
                  <div className="text-white/60 text-center">{row.baukasten}</div>
                  <div className="text-white/60 text-center">{row.agency}</div>
                  <div className="text-center">
                    <span className="font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                      {row.webflix}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                      {row.custom}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-br from-green-500/10 via-pink-500/5 to-pink-500/10 border-t border-white/10">
              <div></div>
              <div className="flex justify-center">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <div className="flex justify-center">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => window.location.href = 'https://www.webflix.info/custom'}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-lg font-bold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105"
                >
                  Jetzt starten
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => window.location.href = '/custom'}
                  className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 rounded-lg font-bold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-gray-500/50 hover:scale-105"
                >
                  Custom anfragen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Cards - Mobile & Tablet - Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4 min-w-max">
              {/* Baukasten Card */}
              <div className="w-72 flex-shrink-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                <div className="bg-white/5 p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white/60 text-center">Website-Baukästen</h3>
                </div>
                <div className="p-4 space-y-3">
                  {comparisonData.map((row, index) => (
                    <div key={index} className="border-b border-white/5 pb-2">
                      <div className="text-white/50 text-xs font-medium mb-1">{row.criterion}</div>
                      <div className="text-white/60 text-sm">{row.baukasten}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agency Card */}
              <div className="w-72 flex-shrink-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                <div className="bg-white/5 p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white/60 text-center">Agenturen</h3>
                </div>
                <div className="p-4 space-y-3">
                  {comparisonData.map((row, index) => (
                    <div key={index} className="border-b border-white/5 pb-2">
                      <div className="text-white/50 text-xs font-medium mb-1">{row.criterion}</div>
                      <div className="text-white/60 text-sm">{row.agency}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webflix Card - Highlighted */}
              <div className="w-72 flex-shrink-0 bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-orange-500/20 backdrop-blur-xl border-2 border-pink-400/50 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-orange-500/30 to-pink-500/30 p-4 border-b border-pink-400/30">
                  <h3 className="text-xl font-black text-center">
                    <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                      Webflix
                    </span>
                  </h3>
                  <div className="flex justify-center mt-2">
                    <span className="px-3 py-1 bg-pink-500/30 rounded-full text-xs font-bold text-pink-300 border border-pink-400/30">
                      EMPFOHLEN
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {comparisonData.map((row, index) => (
                    <div key={index} className="border-b border-pink-400/10 pb-2">
                      <div className="text-white/50 text-xs font-medium mb-1">{row.criterion}</div>
                      <div className="font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent text-sm">
                        {row.webflix}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => window.location.href = 'https://www.webflix.info/custom'}
                    className="w-full mt-3 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-lg font-bold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
                  >
                    Jetzt starten
                  </button>
                </div>
              </div>

              {/* Webflix Custom Card */}
              <div className="w-72 flex-shrink-0 bg-gradient-to-br from-gray-500/20 via-gray-400/10 to-gray-500/20 backdrop-blur-xl border-2 border-gray-400/50 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-gray-500/30 to-gray-400/30 p-4 border-b border-gray-400/30">
                  <h3 className="text-xl font-black text-center">
                    <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                      Webflix Custom
                    </span>
                  </h3>
                  <div className="flex justify-center mt-2">
                    <span className="px-3 py-1 bg-gray-500/30 rounded-full text-xs font-bold text-gray-300 border border-gray-400/30">
                      PREMIUM
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {comparisonData.map((row, index) => (
                    <div key={index} className="border-b border-gray-400/10 pb-2">
                      <div className="text-white/50 text-xs font-medium mb-1">{row.criterion}</div>
                      <div className="font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent text-sm">
                        {row.custom}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => window.location.href = '/custom'}
                    className="w-full mt-3 px-4 py-2.5 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 rounded-lg font-bold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-gray-500/50"
                  >
                    Custom anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-4">
            <p className="text-white/50 text-sm">
              ← Swipe für mehr →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
