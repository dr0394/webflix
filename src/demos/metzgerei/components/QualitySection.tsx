import React from 'react';
import { Award, Heart, Leaf, Shield, CheckCircle, Truck } from 'lucide-react';

const QualitySection: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Meisterbetrieb',
      description: 'Zertifizierter Fleischermeister mit über 40 Jahren Erfahrung'
    },
    {
      icon: Leaf,
      title: '100% Regional',
      description: 'Alle Tiere stammen aus Höfen im Umkreis von maximal 50km'
    },
    {
      icon: Heart,
      title: 'Artgerecht',
      description: 'Wir arbeiten nur mit Betrieben, die artgerechte Tierhaltung garantieren'
    },
    {
      icon: Shield,
      title: 'Geprüfte Qualität',
      description: 'Strenge Kontrollen und höchste Hygienestandards sind selbstverständlich'
    },
    {
      icon: CheckCircle,
      title: 'Handarbeit',
      description: 'Jedes Produkt wird mit Liebe und Sorgfalt von Hand hergestellt'
    },
    {
      icon: Truck,
      title: 'Frische Garantie',
      description: 'Tägliche Lieferung und Verarbeitung für maximale Frische'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-5 h-5 text-green-700" />
            <span className="text-green-700 font-semibold">Unsere Qualitätsversprechen</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Warum <span className="text-[#2D5F3F]">Zwickels?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Qualität ist keine Frage des Preises, sondern der Leidenschaft und des Handwerks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-[#8BC34A]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#2D5F3F] to-[#1a3a28] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="bg-gradient-to-r from-[#2D5F3F] via-[#3E7C57] to-[#2D5F3F] rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#8BC34A]">70+</div>
              <div className="text-green-100">Jahre Tradition</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#8BC34A]">15+</div>
              <div className="text-green-100">Regionale Bauernhöfe</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#8BC34A]">50+</div>
              <div className="text-green-100">Hausgemachte Produkte</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-[#8BC34A]">5.0★</div>
              <div className="text-green-100">Durchschnittsbewertung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
