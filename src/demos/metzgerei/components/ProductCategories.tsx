import React from 'react';
import { Beef, Fish, ChefHat, Cookie, Gift } from 'lucide-react';

const ProductCategories: React.FC = () => {
  const categories = [
    {
      icon: Beef,
      title: 'Frisches Fleisch',
      description: 'Rind, Schwein, Geflügel – alles aus regionaler Haltung',
      color: 'from-[#2D5F3F] to-[#1a3a28]',
      image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: ChefHat,
      title: 'Wurst & Schinken',
      description: 'Über 50 hausgemachte Spezialitäten nach Familienrezepten',
      color: 'from-[#3E7C57] to-[#2D5F3F]',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Cookie,
      title: 'Partyservice',
      description: 'Platten, Buffets und Catering für Ihre Feierlichkeiten',
      color: 'from-[#8BC34A] to-[#7CB342]',
      image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Gift,
      title: 'Geschenkkörbe',
      description: 'Individuelle Geschenkkörbe mit regionalen Köstlichkeiten',
      color: 'from-[#2D5F3F] to-[#1a3a28]',
      image: 'https://images.pexels.com/photos/264917/pexels-photo-264917.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section className="py-20 bg-white" id="produkte">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
            <Beef className="w-5 h-5 text-[#2D5F3F]" />
            <span className="text-[#2D5F3F] font-semibold">Unser Sortiment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" id="demo-services-title">
            Qualität, die man <span className="text-[#2D5F3F]">schmeckt</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von traditionellen Wurstspezialitäten bis zu frischem Fleisch –
            bei uns finden Sie alles für Ihren Genuss
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
              </div>

              {/* Content */}
              <div className="relative p-8 h-80 flex flex-col justify-end text-white">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-white/90 leading-relaxed">{category.description}</p>
                </div>

                <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white hover:text-[#2D5F3F] border border-white/30 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-white">
                  Mehr erfahren
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
