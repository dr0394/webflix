import React from 'react';
import { Star, TrendingDown, Clock } from 'lucide-react';

const WeeklySpecials: React.FC = () => {
  const specials = [
    {
      name: 'Bratwurst vom Schwäbisch-Hällischen Schwein',
      originalPrice: 15.90,
      specialPrice: 12.90,
      unit: 'kg',
      discount: 19,
      validUntil: 'Sa, 11. Oktober',
      image: 'https://images.pexels.com/photos/8601538/pexels-photo-8601538.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Bestseller'
    },
    {
      name: 'Rindersteak vom Weiderind',
      originalPrice: 39.90,
      specialPrice: 34.90,
      unit: 'kg',
      discount: 13,
      validUntil: 'Sa, 11. Oktober',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Premium'
    },
    {
      name: 'Hausgemachter Leberkäse',
      originalPrice: 8.90,
      specialPrice: 6.90,
      unit: 'kg',
      discount: 22,
      validUntil: 'Sa, 11. Oktober',
      image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Aktion'
    },
    {
      name: 'Hackfleisch gemischt',
      originalPrice: 12.90,
      specialPrice: 9.90,
      unit: 'kg',
      discount: 23,
      validUntil: 'Sa, 11. Oktober',
      image: 'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Frisch'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50" id="angebote">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#8BC34A] px-4 py-2 rounded-full mb-6">
            <TrendingDown className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Diese Woche</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unsere <span className="text-[#2D5F3F]">Wochenangebote</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jede Woche frische Angebote – Qualität zum Spitzenpreis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specials.map((special, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={special.image}
                  alt={special.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#2D5F3F] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {special.tag}
                  </span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 right-4">
                  <div className="w-16 h-16 bg-[#8BC34A] rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#2D5F3F]">-{special.discount}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 min-h-[56px]">
                  {special.name}
                </h3>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-end gap-3 mb-2">
                    <div className="text-3xl font-bold text-[#2D5F3F]">
                      {special.specialPrice.toFixed(2)}€
                    </div>
                    <div className="text-sm text-gray-500 line-through mb-1">
                      {special.originalPrice.toFixed(2)}€
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">pro {special.unit}</div>
                </div>

                {/* Valid Until */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 pb-4 border-b">
                  <Clock className="w-4 h-4 text-[#2D5F3F]" />
                  <span>Gültig bis {special.validUntil}</span>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-[#2D5F3F] to-[#1a3a28] hover:from-[#3E7C57] hover:to-[#2D5F3F] text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  Jetzt bestellen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] rounded-2xl p-8 text-white text-center">
          <p className="text-lg font-semibold">
            💡 Tipp: Bestellen Sie bis Donnerstag 18 Uhr online und holen Sie Ihre Bestellung am Samstag ab –
            <span className="text-[#8BC34A]"> portofrei ab 30€!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeeklySpecials;
