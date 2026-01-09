import React from 'react';
import { Building, Home, Shield, Settings, Wrench, Cog, Hammer, Zap } from 'lucide-react';

interface ServiceSelectionProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
  onServiceClick?: (service: any) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ selectedService, onServiceSelect, onServiceClick }) => {
  const services = [
    {
      id: 'stahlbau',
      name: 'STAHLBAU',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Building,
      description: 'Stahlkonstruktionen',
      features: ['Hallenbau', 'Überdachungen', 'Stahlträger'],
      details: {
        title: 'Stahlbau & Konstruktionen', 
        subtitle: 'Robuste Lösungen für Industrie und Gewerbe',
        features: [
          'Individuelle Stahlkonstruktionen',
          'Hallenbau und Überdachungen',
          'Statische Berechnungen',
          'TÜV-geprüfte Ausführung'
        ],
        services: [
          { name: 'Hallenkonstruktion' },
          { name: 'Überdachungen' },
          { name: 'Stahlträger-Montage' }
        ],
        tips: [
          'Frühzeitige Planung spart Kosten',
          'Statische Berechnungen sind Pflicht',
          'Korrosionsschutz verlängert Lebensdauer'
        ],
        specialties: 'Stahlkonstruktionen erfordern präzise Planung und Ausführung - wir bringen die nötige Erfahrung mit.'
      }
    },
    {
      id: 'treppen',
      name: 'TREPPEN',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Home,
      description: 'Treppen & Geländer',
      features: ['Innen & Außen', 'Edelstahl', 'Maßanfertigung'],
      details: {
        title: 'Treppen & Geländer',
        subtitle: 'Maßgeschneiderte Lösungen für jeden Bereich',
        features: [
          'Treppen für Innen- und Außenbereiche',
          'Geländer aus Stahl und Edelstahl',
          'Individuelle Designs',
          'Sichere Montage'
        ],
        services: [
          { name: 'Innentreppen' },
          { name: 'Außentreppen' },
          { name: 'Geländer-Systeme' }
        ],
        tips: [
          'Bauvorschriften beachten',
          'Rutschfeste Oberflächen wählen',
          'Regelmäßige Wartung wichtig'
        ],
        specialties: 'Treppen sind sicherheitsrelevant - wir fertigen nach höchsten Standards und Normen.'
      }
    },
    {
      id: 'tore',
      name: 'TORE & ZÄUNE',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Shield,
      description: 'Sicherheitstechnik',
      features: ['Automatische Antriebe', 'Sicherheitstechnik', 'Wartung'],
      details: {
        title: 'Tore & Zäune',
        subtitle: 'Sicherheit und Komfort vereint',
        features: [
          'Automatische Toranlagen',
          'Sicherheitszäune',
          'Zutrittskontrolle',
          'Wartung und Service'
        ],
        services: [
          { name: 'Automatische Tore' },
          { name: 'Sicherheitszäune' },
          { name: 'Wartungsservice' }
        ],
        tips: [
          'Regelmäßige Wartung verlängert Lebensdauer',
          'Sicherheitstechnik nach Norm',
          'Automatik spart Zeit und Komfort'
        ],
        specialties: 'Sicherheitstechnik muss zuverlässig funktionieren - wir setzen auf bewährte Systeme.'
      }
    },
    {
      id: 'balkone',
      name: 'BALKONE',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Home,
      description: 'Balkone & Terrassen',
      features: ['Edelstahl-Geländer', 'Wetterschutz', 'Montage'],
      details: {
        title: 'Balkone & Terrassen',
        subtitle: 'Erweitern Sie Ihren Wohnraum',
        features: [
          'Balkonkonstruktionen',
          'Terrassenüberdachungen',
          'Edelstahl-Geländer',
          'Wetterschutz-Systeme'
        ],
        services: [
          { name: 'Balkonbau' },
          { name: 'Terrassenkonstruktion' },
          { name: 'Überdachungen' }
        ],
        tips: [
          'Drainage-System einplanen',
          'Wetterschutz für Langlebigkeit',
          'Statik prüfen lassen'
        ],
        specialties: 'Balkone müssen Wind und Wetter trotzen - wir verwenden nur hochwertige, korrosionsbeständige Materialien.'
      }
    },
    {
      id: 'reparaturen',
      name: 'REPARATUREN',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Wrench,
      description: 'Wartung & Reparatur',
      features: ['Schweißarbeiten', 'Rostschutz', 'Notdienst'],
      details: {
        title: 'Reparaturen & Wartung',
        subtitle: 'Schnelle Hilfe bei Metallbau-Problemen',
        features: [
          'Schweißreparaturen vor Ort',
          'Rostschutz-Behandlung',
          'Wartungsservice',
          'Notdienst verfügbar'
        ],
        services: [
          { name: 'Schweißreparaturen' },
          { name: 'Rostschutz' },
          { name: 'Wartungsservice' }
        ],
        tips: [
          'Regelmäßige Inspektion verhindert größere Schäden',
          'Rostschutz alle 3-5 Jahre erneuern',
          'Bei Problemen schnell handeln'
        ],
        specialties: 'Metallkonstruktionen brauchen regelmäßige Pflege - wir sorgen für lange Lebensdauer.'
      }
    },
    {
      id: 'sonderanfertigungen',
      name: 'SONDERANFERTIGUNGEN',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Settings,
      description: 'Individuelle Lösungen',
      features: ['CAD-Planung', 'Prototyping', 'Einzelstücke'],
      details: {
        title: 'Sonderanfertigungen',
        subtitle: 'Ihre Ideen in Metall umgesetzt',
        features: [
          'CAD-Konstruktion',
          'Prototyping',
          'Einzelanfertigungen',
          'Designberatung'
        ],
        services: [
          { name: 'CAD-Planung' },
          { name: 'Prototyp-Fertigung' },
          { name: 'Serienfertigung' }
        ],
        tips: [
          'Detaillierte Planung ist der Schlüssel',
          'Material-Auswahl beeinflusst Kosten',
          'Prototyp spart spätere Änderungen'
        ],
        specialties: 'Jede Idee ist umsetzbar - wir finden für jede Anforderung die passende Lösung.'
      }
    },
    {
      id: 'industriebau',
      name: 'INDUSTRIEBAU',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Cog,
      description: 'Industrieanlagen',
      features: ['Anlagenbau', 'Rohrleitungen', 'Wartung'],
      details: {
        title: 'Industriebau',
        subtitle: 'Komplexe Anlagen professionell umgesetzt',
        features: [
          'Industrieanlagen-Bau',
          'Rohrleitungssysteme',
          'Fördertechnik',
          'Wartung und Service'
        ],
        services: [
          { name: 'Anlagenbau' },
          { name: 'Rohrleitungen' },
          { name: 'Industrieservice' }
        ],
        tips: [
          'Sicherheitsvorschriften strikt einhalten',
          'Wartungsintervalle planen',
          'Dokumentation für Abnahmen'
        ],
        specialties: 'Industrieanlagen erfordern höchste Präzision und Sicherheit - wir arbeiten nach allen relevanten Normen.'
      }
    },
    {
      id: 'fassadenbau',
      name: 'FASSADENBAU',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Building,
      description: 'Fassaden & Verkleidungen',
      features: ['Metallverkleidung', 'Fassadensanierung', 'Wärmedämmung'],
      details: {
        title: 'Fassadenbau',
        subtitle: 'Moderne Fassaden aus Metall',
        features: [
          'Metallverkleidungen',
          'Fassadensanierung',
          'Wärmedämmung',
          'Designfassaden'
        ],
        services: [
          { name: 'Fassadenverkleidung' },
          { name: 'Sanierung' },
          { name: 'Designfassaden' }
        ],
        tips: [
          'Wärmedämmung mitplanen',
          'Wartungsfreundliche Materialien wählen',
          'Optik und Funktion kombinieren'
        ],
        specialties: 'Fassaden prägen das Erscheinungsbild - wir schaffen funktionale und ästhetische Lösungen.'
      }
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {services.map((service, index) => {
          const isSelected = selectedService === service.id;
          const IconComponent = service.icon;
          
          return (
            <div
              key={service.id}
              onClick={() => {
                onServiceSelect(service.id);
                if (onServiceClick) {
                  onServiceClick(service);
                }
              }}
              className={`relative flex-shrink-0 w-48 h-64 md:w-56 md:h-72 cursor-pointer group transition-all duration-500 hover:scale-105 ${
                isSelected ? 'scale-105 z-10' : ''
              }`}
              style={{
                transform: `skewX(-8deg) ${isSelected ? 'scale(1.05)' : ''}`,
                transformOrigin: 'center'
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent' 
                    : 'bg-gradient-to-t from-gray-900/80 via-gray-800/40 to-gray-600/20 group-hover:from-gray-900/90'
                }`}>
                  {/* Shimmer Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent animate-shimmer opacity-30"></div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div 
                className="relative h-full flex flex-col justify-between p-6 text-white z-10"
                style={{ transform: 'skewX(8deg)' }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gray-400/30 shadow-lg animate-glow border border-gray-400' 
                      : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent animate-shimmer rounded-full"></div>
                    )}
                    <IconComponent className={`w-6 h-6 relative z-10 ${
                      isSelected ? 'text-gray-300' : 'text-white'
                    }`} />
                  </div>
                </div>

                {/* Service Name */}
                <div className="text-center">
                  <h3 className={`font-poppins font-bold text-lg mb-2 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white drop-shadow-lg text-xl' 
                      : 'text-white/90 group-hover:text-white'
                  }`}>
                    {service.name}
                  </h3>
                  <p className={`font-montserrat text-sm transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/90 drop-shadow-md' 
                      : 'text-white/70 group-hover:text-white/80'
                  }`}>
                    {service.description}
                  </p>
                </div>
                
                {/* Features */}
                <div className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center text-xs text-white/60 group-hover:text-white/70 transition-colors duration-300 font-poppins">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-gray-400/30 shadow-lg flex items-center justify-center animate-glow border border-gray-400">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent animate-shimmer rounded-full"></div>
                      <svg className="w-5 h-5 text-gray-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                  isSelected 
                    ? 'shadow-xl shadow-gray-400/20' 
                    : 'group-hover:shadow-lg shadow-gray-400/10'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          {services.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-slate-300 opacity-50"
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(156, 163, 175, 0.3); }
          50% { box-shadow: 0 0 30px rgba(156, 163, 175, 0.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ServiceSelection;