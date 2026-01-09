import React from 'react';
import { Activity, Heart, Zap, Users, Waves, Dumbbell } from 'lucide-react';

const services = [
  {
    icon: Activity,
    title: 'Krankengymnastik',
    description: 'Gezielte Übungen zur Wiederherstellung und Verbesserung Ihrer Beweglichkeit.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Heart,
    title: 'Manuelle Therapie',
    description: 'Sanfte Mobilisation von Gelenken und Behandlung von Funktionsstörungen.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Elektrotherapie',
    description: 'Schmerzlinderung und Heilungsförderung durch gezielte Stromimpulse.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Users,
    title: 'Lymphdrainage',
    description: 'Entstauungstherapie zur Aktivierung des Lymphsystems.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Waves,
    title: 'Massagen',
    description: 'Klassische und therapeutische Massagen zur Lockerung und Entspannung.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Dumbbell,
    title: 'Sportphysiotherapie',
    description: 'Spezialisierte Behandlung für Sportverletzungen und Leistungsoptimierung.',
    color: 'from-cyan-500 to-cyan-600',
  },
];

const ServicesSection = () => {
  return (
    <section id="leistungen" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Unsere Leistungen
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ganzheitliche Behandlungskonzepte
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Von der klassischen Physiotherapie bis zur Sportrehabilitation – wir bieten Ihnen
            das komplette Spektrum moderner Therapiemethoden.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={32} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <button className="text-teal-600 font-semibold hover:text-teal-700 transition-colors flex items-center gap-2 group-hover:gap-3">
                  Mehr erfahren
                  <span className="transition-all duration-300">→</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Alle Kassen und Privatpatienten
          </h3>
          <p className="text-lg sm:text-xl mb-6 text-teal-50">
            Wir sind zugelassene Therapeuten für alle gesetzlichen und privaten Krankenkassen.
            Auch Selbstzahler sind herzlich willkommen.
          </p>
          <a
            href="#kontakt"
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300"
          >
            Jetzt informieren
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
