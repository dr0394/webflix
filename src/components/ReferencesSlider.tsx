const row1 = [
  { image: '/1.png', title: 'Gartenpflege Theisen', category: 'Gartenpflege' },
  { image: '/2.png', title: 'Facility Excellence', category: 'Gebäudereinigung' },
  { image: '/3.png', title: 'Elbwacht Security', category: 'Sicherheitsdienst' },
  { image: '/4.png', title: 'Team Sauber', category: 'Umzug & Logistik' },
  { image: '/5.png', title: 'KBVest', category: 'Gesundheitswesen' },
  { image: '/6.png', title: 'Kunde 6', category: 'Webflix' },
  { image: '/7.png', title: 'Kunde 7', category: 'Webflix' },
  { image: '/8.png', title: 'Kunde 8', category: 'Webflix' },
  { image: '/9.png', title: 'Kunde 9', category: 'Webflix' },
];

const row2 = [
  { image: '/10.png', title: 'Kunde 10', category: 'Webflix' },
  { image: '/11.png', title: 'Kunde 11', category: 'Webflix' },
  { image: '/12.png', title: 'Kunde 12', category: 'Webflix' },
  { image: '/13.png', title: 'Kunde 13', category: 'Webflix' },
  { image: '/14.png', title: 'Kunde 14', category: 'Webflix' },
  { image: '/15.png', title: 'Kunde 15', category: 'Webflix' },
  { image: '/16.png', title: 'Bozz Bau', category: 'Bauunternehmen' },
  { image: '/17.png', title: 'DJ Toby K.', category: 'Entertainment' },
];

function MarqueeRow({ items, direction }: { items: typeof row1; direction: 'left' | 'right' }) {
  const doubled = [...items, ...items];
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="relative overflow-hidden">
      <div className={`flex gap-4 ${animClass}`} style={{ width: 'max-content' }}>
        {doubled.map((ref, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] sm:w-[340px] group/card">
            <div className="relative rounded-xl overflow-hidden border border-white/10 hover:border-pink-400/40 transition-all duration-500 bg-gray-900/50">
              <div className="absolute top-0 left-0 right-0 h-7 bg-gray-800/90 flex items-center px-3 gap-1.5 z-10">
                <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-[9px] text-gray-500 truncate">
                  {ref.title.toLowerCase().replace(/\s+/g, '-')}.webflix.de
                </span>
              </div>
              <div className="pt-7 aspect-[16/10] overflow-hidden">
                <img
                  src={ref.image}
                  alt={ref.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ReferencesSlider = () => {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 mb-12 sm:mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 border border-pink-200 rounded-full mb-6">
            <span className="text-sm font-semibold text-pink-600 tracking-wider uppercase">Ergebnis Gallery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
            ECHTE WEBSITES VON{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                ECHTEN KUNDEN
              </span>
            </span>
          </h2>

          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Kein Baukasten, keine Agentur – einfach bestellt, von uns gebaut. Jede dieser Websites wurde
            von WEBFLIX innerhalb von 72 Stunden fertiggestellt. Professionell, individuell und sofort einsatzbereit.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm">
          Bereits <span className="text-pink-600 font-bold">50+</span> Websites erfolgreich umgesetzt
        </p>
      </div>
    </section>
  );
};

export default ReferencesSlider;
