import React from 'react';
import { Award, Shield, Clock, ThumbsUp, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Meisterbetrieb',
    description: 'Qualifizierte Elektromeister mit jahrzehntelanger Erfahrung',
  },
  {
    icon: Shield,
    title: '5 Jahre Garantie',
    description: 'Umfassende Garantie auf alle Arbeiten und Materialien',
  },
  {
    icon: Clock,
    title: '24/7 Notdienst',
    description: 'Rund um die Uhr erreichbar bei Elektro-Notfällen',
  },
  {
    icon: ThumbsUp,
    title: 'Faire Preise',
    description: 'Transparente Kostenvoranschläge ohne versteckte Kosten',
  },
  {
    icon: Users,
    title: 'Erfahrenes Team',
    description: 'Hochqualifizierte Fachkräfte mit Weiterbildungen',
  },
  {
    icon: Zap,
    title: 'Schnelle Umsetzung',
    description: 'Termingerechte Ausführung aller Aufträge',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Warum ElektroProfi?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ihr verlässlicher Partner
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Seit über 25 Jahren stehen wir für höchste Qualität, Zuverlässigkeit
            und Kundenzufriedenheit im Elektrohandwerk.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl flex-shrink-0">
                  <Icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl text-white text-center">
            <div className="text-5xl font-bold text-amber-400 mb-2">1000+</div>
            <div className="text-gray-300">Abgeschlossene Projekte</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl text-white text-center">
            <div className="text-5xl font-bold text-amber-400 mb-2">98%</div>
            <div className="text-gray-300">Kundenzufriedenheit</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl text-white text-center">
            <div className="text-5xl font-bold text-amber-400 mb-2">25+</div>
            <div className="text-gray-300">Jahre Erfahrung</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
