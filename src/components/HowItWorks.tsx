import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#111111] to-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Wie funktioniert Webflix zum Mitnehmen?
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-4">
            "Webflix funktioniert wie ein Shop nur für Websites"
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-base sm:text-lg text-white/80 text-center leading-relaxed">
            Du gehst in unseren digitalen Showroom, siehst perfekt gestaltete Website-Designs,
            testest sie live und sagst "Das ist es!" 48 Stunden später läuft deine Premium-Website.
          </p>
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 sm:px-12 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded-lg text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-orange-500/50">
            Jetzt Showroom besuchen
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
