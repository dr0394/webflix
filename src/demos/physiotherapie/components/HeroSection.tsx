import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-teal-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Ihre Gesundheit ist unsere Mission
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professionelle{' '}
              <span className="text-teal-600">Physiotherapie</span> in Ihrer Nähe
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Individuelle Behandlungen für Ihre optimale Genesung. Modernste Therapiemethoden
              kombiniert mit persönlicher Betreuung durch unser erfahrenes Team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#termin"
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 font-semibold text-center text-lg"
              >
                Jetzt Termin vereinbaren
              </a>
              <a
                href="#leistungen"
                className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full hover:bg-teal-50 transition-all duration-300 font-semibold text-center text-lg"
              >
                Unsere Leistungen
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Calendar className="text-teal-600" size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Flexibel</div>
                  <div className="text-sm text-gray-600">Termine auch abends</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Award className="text-teal-600" size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Erfahren</div>
                  <div className="text-sm text-gray-600">15+ Jahre Expertise</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md">
                <div className="bg-teal-100 p-3 rounded-full">
                  <MapPin className="text-teal-600" size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Zentral</div>
                  <div className="text-sm text-gray-600">Mitten in der Stadt</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-400 rounded-3xl transform rotate-3"></div>
            <img
              src="https://images.pexels.com/photos/5473181/pexels-photo-5473181.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Physiotherapie"
              className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl">
              <div className="text-4xl font-bold text-teal-600 mb-1">500+</div>
              <div className="text-gray-600 font-medium">Zufriedene Patienten</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
