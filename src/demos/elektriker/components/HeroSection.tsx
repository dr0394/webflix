import React from 'react';
import { Zap, Shield, Clock, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="text-amber-400" size={18} />
              <span className="text-sm font-semibold text-amber-400">Meisterbetrieb seit 1995</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Elektro-Installationen</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                vom Meister
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Von der Planung bis zur Umsetzung – Ihr zuverlässiger Partner für alle
              Elektroarbeiten. Privatkunden, Gewerbe und Industrie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#angebot"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 font-semibold text-center text-lg"
              >
                Kostenloses Angebot
              </a>
              <a
                href="tel:+491234567890"
                className="border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-full hover:bg-amber-500/10 transition-all duration-300 font-semibold text-center text-lg flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                Jetzt anrufen
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <Clock className="text-amber-400" size={24} />
                </div>
                <div>
                  <div className="font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Notdienst</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <Award className="text-amber-400" size={24} />
                </div>
                <div>
                  <div className="font-bold text-white">Meister</div>
                  <div className="text-xs text-gray-400">Qualität</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <Shield className="text-amber-400" size={24} />
                </div>
                <div>
                  <div className="font-bold text-white">5 Jahre</div>
                  <div className="text-xs text-gray-400">Garantie</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl transform rotate-3 opacity-20"></div>
            <img
              src="https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Elektriker bei der Arbeit"
              className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-2xl shadow-2xl">
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/90 font-medium text-lg">Projekte erfolgreich</div>
              <div className="text-white/90 font-medium text-lg">abgeschlossen</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
