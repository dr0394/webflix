import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const references = [
  {
    image: '/screenshot-2025-11-15_um_09.25.13.png',
    title: 'Krankenbeförderung',
    category: 'Gesundheitswesen',
    link: '/demo/autoaufbereitung',
  },
  {
    image: '/screenshot-2025-10-18_um_18.29.34.png',
    title: 'Sicherheitsdienst Hamburg',
    category: 'Security',
    link: '/demo/security',
  },
  {
    image: '/screenshot-2025-11-05_um_20.28.51.png',
    title: 'Umzug & Logistik',
    category: 'Dienstleistung',
    link: '/demo/handwerk',
  },
  {
    image: '/screenshot-2025-11-17_um_00.35.50.png',
    title: 'Event & Party Service',
    category: 'Veranstaltung',
    link: '/demo/gastro',
  },
  {
    image: '/screenshot-2025-10-18_um_18.29.39.png',
    title: 'Maschinenbau Solutions',
    category: 'Industrie',
    link: '/demo/metallbau',
  },
  {
    image: '/screenshot-2025-11-15_um_09.33.26.png',
    title: 'KFZ Gutachter NRW',
    category: 'Automobile',
    link: '/demo/autoaufbereitung-v3',
  },
  {
    image: '/screenshot-2025-11-15_um_09.34.40.png',
    title: 'Gebäudereinigung Plus',
    category: 'Reinigung',
    link: '/demo/gebaeudereinigung',
  },
  {
    image: '/bildschirmfoto_2026-01-21_um_11.42.30.png',
    title: 'Garten & Landschaftsbau',
    category: 'Handwerk',
    link: '/demo/gartenlandschaftsbau',
  },
];

const ReferencesSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = 380;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, references.length - 1));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 380;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/10 border border-green-400/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-green-400 tracking-wider uppercase">Ergebnis Gallery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            ECHTE WEBSITES VON{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ECHTEN KUNDEN
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-lg -z-0"></span>
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Kein Baukasten, keine Agentur – einfach bestellt, von uns gebaut. Jede dieser Websites wurde
            von WEBFLIX innerhalb von 72 Stunden fertiggestellt. Professionell, individuell und sofort einsatzbereit.
          </p>
        </div>

        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {references.map((ref, index) => (
              <a
                key={index}
                href={ref.link}
                className="flex-shrink-0 w-[340px] sm:w-[360px] group/card snap-start cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden border border-white/10 hover:border-green-400/40 transition-all duration-500 bg-gray-900/50">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800/90 flex items-center px-3 gap-1.5 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-[10px] text-gray-500 truncate">{ref.title.toLowerCase().replace(/\s+/g, '-')}.webflix.de</span>
                  </div>

                  <div className="pt-8 aspect-[4/3] overflow-hidden">
                    <img
                      src={ref.image}
                      alt={ref.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo ansehen</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-sm group-hover/card:text-green-400 transition-colors">
                      {ref.title}
                    </h3>
                    <span className="text-[11px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                      {ref.category}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-8">
          {references.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!scrollRef.current) return;
                scrollRef.current.scrollTo({ left: index * 380, behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-green-400 w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Bereits <span className="text-green-400 font-bold">50+</span> Websites erfolgreich umgesetzt
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReferencesSlider;
