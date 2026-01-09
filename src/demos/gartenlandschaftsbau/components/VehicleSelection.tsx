import React from 'react';
import { TreePine, Flower, Scissors, Droplets, Home, Building, Truck, Sun } from 'lucide-react';

interface ServiceSelectionProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
  onServiceClick?: (service: any) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ selectedService, onServiceSelect, onServiceClick }) => {
  const services = [
    {
      id: 'gartenplanung',
      name: 'GARTENPLANUNG',
      image: 'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TreePine,
      description: 'Professionelle Planung',
      features: ['3D-Visualisierung', 'Beratung', 'Kostenvoranschlag'],
      details: {
        title: 'Gartenplanung & Design', 
        subtitle: 'Ihr Traumgarten wird Realität',
        features: [
          'Individuelle 3D-Gartenplanung',
          'Professionelle Beratung vor Ort',
          'Detaillierte Kostenvoranschläge',
          'Nachhaltige Pflanzenauswahl'
        ],
        services: [
          { name: 'Gartenberatung' },
          { name: '3D-Visualisierung' },
          { name: 'Pflanzplanung' }
        ],
        tips: [
          'Planen Sie Ihren Garten saisonübergreifend',
          'Berücksichtigen Sie Lichtverhältnisse und Bodenbeschaffenheit',
          'Wählen Sie pflegeleichte, standortgerechte Pflanzen'
        ],
        specialties: 'Wir erstellen individuelle Gartenpläne, die Ihre Wünsche mit den örtlichen Gegebenheiten optimal verbinden.'
      }
    },
    {
      id: 'rasenpflege',
      name: 'RASENPFLEGE',
      image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Scissors,
      description: 'Perfekter Rasen',
      features: ['Mähen', 'Düngen', 'Vertikutieren'],
      details: {
        title: 'Professionelle Rasenpflege',
        subtitle: 'Für einen perfekten grünen Teppich',
        features: [
          'Regelmäßiges Mähen nach Saison',
          'Professionelle Düngung',
          'Vertikutieren und Belüften',
          'Unkrautbekämpfung'
        ],
        services: [
          { name: 'Rasenmähen' },
          { name: 'Rasendüngung' },
          { name: 'Rasen-Komplett' }
        ],
        tips: [
          'Mähen Sie nie mehr als 1/3 der Halmlänge',
          'Düngen Sie am besten im Frühjahr und Herbst',
          'Vertikutieren Sie bei Bedarf im Frühjahr oder Herbst'
        ],
        specialties: 'Ein gesunder Rasen braucht regelmäßige Pflege - wir sorgen für das perfekte Grün in Ihrem Garten.'
      }
    },
    {
      id: 'heckenschnitt',
      name: 'HECKENSCHNITT',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Scissors,
      description: 'Formschnitt & Pflege',
      features: ['Formschnitt', 'Rückschnitt', 'Pflege'],
      details: {
        title: 'Heckenschnitt & Formgehölze',
        subtitle: 'Präzise Schnitte für perfekte Formen',
        features: [
          'Professioneller Formschnitt',
          'Erhaltungsschnitt für gesundes Wachstum',
          'Rückschnitt bei Bedarf',
          'Entsorgung des Schnittguts'
        ],
        services: [
          { name: 'Heckenschnitt Standard' },
          { name: 'Formschnitt Spezial' },
          { name: 'Hecken-Komplett' }
        ],
        tips: [
          'Schneiden Sie Hecken am besten zweimal jährlich',
          'Beachten Sie die Brutzeiten der Vögel (März-September)',
          'Formschnitte bei bedecktem Himmel durchführen'
        ],
        specialties: 'Präzise Schnitte erfordern Erfahrung und das richtige Werkzeug - wir bringen beides mit.'
      }
    },
    {
      id: 'baumpflege',
      name: 'BAUMPFLEGE',
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TreePine,
      description: 'Baumschnitt & Pflege',
      features: ['Baumschnitt', 'Kronenpflege', 'Gesundheitscheck'],
      details: {
        title: 'Professionelle Baumpflege',
        subtitle: 'Für gesunde und sichere Bäume',
        features: [
          'Fachgerechter Baumschnitt',
          'Kronenpflege und -auslichtung',
          'Totholzentfernung',
          'Baumgesundheits-Check'
        ],
        services: [
          { name: 'Baumschnitt' },
          { name: 'Kronenpflege' },
          { name: 'Baum-Komplett' }
        ],
        tips: [
          'Obstbäume im Winter schneiden',
          'Laubbäume am besten im Spätherbst oder Winter',
          'Regelmäßige Kontrolle auf Schädlinge und Krankheiten'
        ],
        specialties: 'Bäume sind langfristige Investitionen - professionelle Pflege erhält ihre Gesundheit und Sicherheit.'
      }
    },
    {
      id: 'terrassenbau',
      name: 'TERRASSENBAU',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Home,
      description: 'Terrassen & Wege',
      features: ['Planung', 'Pflasterung', 'Holzterrassen'],
      details: {
        title: 'Terrassenbau & Pflasterarbeiten',
        subtitle: 'Ihr Outdoor-Wohnzimmer',
        features: [
          'Individuelle Terrassenplanung',
          'Verschiedene Materialien verfügbar',
          'Professioneller Unterbau',
          'Drainage und Entwässerung'
        ],
        services: [
          { name: 'Holzterrasse' },
          { name: 'Steinterrasse' },
          { name: 'Terrassen-Komplett' }
        ],
        tips: [
          'Planen Sie ausreichend Gefälle für Wasserabfluss',
          'Wählen Sie witterungsbeständige Materialien',
          'Denken Sie an Beleuchtung und Stromanschlüsse'
        ],
        specialties: 'Eine gut gebaute Terrasse erweitert Ihren Wohnraum ins Freie - wir schaffen dauerhafte Lösungen.'
      }
    },
    {
      id: 'bewaesserung',
      name: 'BEWÄSSERUNG',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Droplets,
      description: 'Automatische Systeme',
      features: ['Planung', 'Installation', 'Wartung'],
      details: {
        title: 'Bewässerungssysteme',
        subtitle: 'Automatisch zum perfekten Garten',
        features: [
          'Individuelle Systemplanung',
          'Automatische Steuerung',
          'Wassersparende Technologie',
          'Regelmäßige Wartung'
        ],
        services: [
          { name: 'Bewässerungsplanung' },
          { name: 'System-Installation' },
          { name: 'Bewässerungs-Komplett' }
        ],
        tips: [
          'Bewässern Sie am besten morgens oder abends',
          'Verschiedene Pflanzen haben unterschiedliche Wasserbedürfnisse',
          'Regelmäßige Wartung verlängert die Lebensdauer'
        ],
        specialties: 'Moderne Bewässerungstechnik spart Zeit und Wasser - wir installieren effiziente Systeme.'
      }
    },
    {
      id: 'pflanzung',
      name: 'PFLANZUNG',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Flower,
      description: 'Bäume & Sträucher',
      features: ['Auswahl', 'Pflanzung', 'Anwachsgarantie'],
      details: {
        title: 'Professionelle Pflanzungen',
        subtitle: 'Die richtigen Pflanzen am richtigen Ort',
        features: [
          'Standortgerechte Pflanzenauswahl',
          'Fachgerechte Pflanzung',
          'Anwachsgarantie',
          'Pflegeberatung'
        ],
        services: [
          { name: 'Baumpflanzung' },
          { name: 'Strauchpflanzung' },
          { name: 'Pflanz-Komplett' }
        ],
        tips: [
          'Beste Pflanzzeit ist Herbst oder Frühjahr',
          'Wählen Sie standortgerechte Pflanzen',
          'Ausreichend wässern in der Anwachsphase'
        ],
        specialties: 'Die richtige Pflanze am richtigen Standort - das ist der Schlüssel für einen erfolgreichen Garten.'
      }
    },
    {
      id: 'winterdienst',
      name: 'WINTERDIENST',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Sun,
      description: 'Räumen & Streuen',
      features: ['Schneeräumung', 'Streudienst', '24h-Service'],
      details: {
        title: 'Professioneller Winterdienst',
        subtitle: 'Sicher durch den Winter',
        features: [
          '24h Bereitschaftsdienst',
          'Schneeräumung und Streudienst',
          'Umweltfreundliche Streumittel',
          'Zuverlässige Betreuung'
        ],
        services: [
          { name: 'Schneeräumung' },
          { name: 'Streudienst' },
          { name: 'Winter-Komplett' }
        ],
        tips: [
          'Frühzeitig Winterdienst-Vertrag abschließen',
          'Umweltfreundliche Streumittel verwenden',
          'Regelmäßige Kontrolle der Verkehrssicherheit'
        ],
        specialties: 'Zuverlässiger Winterdienst sorgt für sichere Wege - wir sind auch bei Schnee und Eis für Sie da.'
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
                    ? 'bg-gradient-to-t from-green-900/90 via-green-800/60 to-transparent' 
                    : 'bg-gradient-to-t from-green-900/80 via-green-800/40 to-green-600/20 group-hover:from-green-900/90'
                }`}>
                  {/* Shimmer Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-shimmer opacity-30"></div>
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
                      ? 'bg-green-400/30 shadow-lg animate-glow border border-green-400' 
                      : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-shimmer rounded-full"></div>
                    )}
                    <IconComponent className={`w-6 h-6 relative z-10 ${
                      isSelected ? 'text-green-300' : 'text-white'
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
                      <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-green-400/30 shadow-lg flex items-center justify-center animate-glow border border-green-400">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-shimmer rounded-full"></div>
                      <svg className="w-5 h-5 text-green-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                  isSelected 
                    ? 'shadow-xl shadow-green-400/20' 
                    : 'group-hover:shadow-lg shadow-green-400/10'
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
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.5); }
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