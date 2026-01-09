import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Clock, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface TrustSectionProps {
  customData?: Record<string, any>;
}

const TrustSection: React.FC<TrustSectionProps> = ({ customData = {} }) => {
  const getContent = (key: string, defaultValue: string) => {
    return customData[key] || defaultValue;
  };
  const [currentReview, setCurrentReview] = useState(0);

  const trustPoints = [
    { text: getContent('trust_point_1', 'Professionelle Fahrzeugaufbereitung'), icon: CheckCircle, id: 'trust_point_1' },
    { text: getContent('trust_point_2', 'Modernste Reinigungstechnik'), icon: Sparkles, id: 'trust_point_2' },
    { text: getContent('trust_point_3', 'Faire & transparente Preise'), icon: Heart, id: 'trust_point_3' },
    { text: getContent('trust_point_4', 'Schnelle Terminvergabe'), icon: Clock, id: 'trust_point_4' }
  ].filter(point => point.text);

  const reviews = [
    {
      id: 1,
      name: "Bilal",
      rating: 5,
      text: "Mehr als zufrieden mit dem Ergebnis. Schnell, qualitativ hochwertig und preislich für die Qualität absolut fair. Das Auto ist wie neu. Das der Support über WhatsApp gegeben ist, macht das ganze noch bequemer und \"moderner\". Kompetenter und zuverlässiger Inhaber.",
      date: "vor 1 Woche"
    },
    {
      id: 2,
      name: "Chantal W.",
      rating: 5,
      text: "🏆💪🏼Top Service und absolut empfehlenswert! Mein Auto sieht nach der Aufbereitung aus wie neu – innen und außen perfekt gereinigt und mit viel Liebe zum Detail gearbeitet. Sehr freundlicher Service, schnelle Terminvergabe und ein faires Preis-Leistungs-Verhältnis. Ich komme definitiv wieder und kann die Aufbereitung jedem nur ans Herz legen!👍🏼",
      date: "vor 2 Wochen"
    },
    {
      id: 3,
      name: "Sudem C.",
      rating: 5,
      text: "Hervorragende Reinigung, super freundlich und absolut zuverlässig. Mein Auto glänzt wie neu klare Empfehlung! Gerne Wieder.",
      date: "vor 3 Wochen"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 bg-slate-100 text-slate-700 border border-slate-200 font-montserrat">
                Warum Kunden uns wählen
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white-800 font-poppins leading-tight mb-6">
                Premium Qualität garantiert
              </h3>
              <p className="text-lg text-white-600 font-medium mb-8 font-montserrat leading-relaxed">
                Bei uns steht Ihre Zufriedenheit an erster Stelle. Erleben Sie den Unterschied professioneller Fahrzeugpflege.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <span data-editable={point.id} className="text-lg text-slate-800 font-semibold font-montserrat">
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Google Reviews */}
          <div className="space-y-6">
            {/* Google Reviews Header */}
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-700">G</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800 font-poppins">Google</span>
                  <span className="text-slate-600 font-medium font-montserrat">Bewertungen</span>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-slate-800 font-poppins">5.0</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-slate-600 font-medium font-montserrat">(12)</span>
                </div>
              </div>

              {/* Reviews Slider */}
              <div className="relative bg-white rounded-xl p-6 border border-slate-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  
                  <div className="flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentReview(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentReview ? 'bg-slate-600' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                <div className="min-h-[200px] flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed mb-4 font-montserrat">
                      "{reviews[currentReview].text}"
                    </p>
                    
                    <div className="text-center">
                      <p className="font-semibold text-slate-800 font-poppins">
                        {reviews[currentReview].name}
                      </p>
                      <p className="text-xs text-slate-500 font-montserrat">
                        {reviews[currentReview].date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a 
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-colors"
              >
                <span>Bewerten Sie uns auf Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;