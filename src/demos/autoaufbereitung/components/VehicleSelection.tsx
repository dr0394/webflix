import React from 'react';
import { Car, Truck, Bike, Zap } from 'lucide-react';

interface VehicleSelectionProps {
  selectedVehicle: string;
  onVehicleSelect: (vehicle: string) => void;
  onVehicleClick?: (vehicle: any) => void;
}

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ selectedVehicle, onVehicleSelect, onVehicleClick }) => {
  const vehicles = [
    {
      id: 'kleinwagen',
      name: 'KLEINWAGEN',
      image: 'https://i.imgur.com/aWePZ1a.png',
      icon: Car,
      description: 'Kompakt & Effizient',
      features: ['Außenwäsche', 'Innenreinigung', 'Schnell & günstig'],
      details: {
        title: 'Kleinwagen Pflege', 
        subtitle: 'Kompakt, aber verdient die beste Pflege',
        features: [
          'Schnelle 45-60 Min Reinigung',
          'Perfekt für Stadtfahrer',
          'Günstige Komplettlösung',
          'Ideal für regelmäßige Pflege'
        ],
        services: [
          { name: 'Außenwäsche' },
          { name: 'Innenraumreinigung' },
          { name: 'Komplett-Paket' }
        ],
        tips: [
          'Regelmäßige Pflege alle 4-6 Wochen empfohlen',
          'Besonders wichtig: Salzreste im Winter entfernen',
          'Kleine Kratzer lassen sich oft günstig polieren'
        ],
        specialties: 'Kleinwagen haben oft empfindlichere Lacke - wir verwenden schonende Produkte für optimalen Schutz.'
      }
    },
    {
      id: 'mittelklasse',
      name: 'MITTELKLASSE',
      image: 'https://i.imgur.com/1fOLBcp.png',
      icon: Car,
      description: 'Komfort & Stil',
      features: ['Premium-Reinigung', 'Polieren', 'Detailing'],
      details: {
        title: 'Mittelklasse Pflege',
        subtitle: 'Der perfekte Mix aus Komfort und Eleganz',
        features: [
          'Umfassende 60-90 Min Behandlung',
          'Hochwertige Materialien',
          'Detaillierte Innenraumpflege',
          'Professionelle Lackaufbereitung'
        ],
        services: [
          { name: 'Premium Außenwäsche' },
          { name: 'Innenraum Deluxe' },
          { name: 'Komplett Premium' }
        ],
        tips: [
          'Ledersitze benötigen spezielle Pflege alle 3 Monate',
          'Klimaanlagen-Reinigung für frische Luft',
          'Felgen regelmäßig versiegeln gegen Bremsstaub'
        ],
        specialties: 'Mittelklasse-Fahrzeuge haben oft verschiedene Materialien - wir behandeln jeden Bereich individuell.'
      }
    },
    {
      id: 'suv',
      name: 'SUV',
      image: 'https://i.imgur.com/BH1Xocu.png',
      icon: Truck,
      description: 'Robust & Geräumig',
      features: ['Unterbodenwäsche', 'Felgenreinigung', 'Motorwäsche'],
      details: {
        title: 'SUV Pflege',
        subtitle: 'Große Fahrzeuge, große Sauberkeit',
        features: [
          'Intensive 90-120 Min Reinigung',
          'Unterbodenwäsche inklusive',
          'Großer Innenraum komplett',
          'Spezielle Geländereifen-Pflege'
        ],
        services: [
          { name: 'SUV Außenwäsche' },
          { name: 'Innenraum XXL' },
          { name: 'SUV Komplett' }
        ],
        tips: [
          'Unterboden nach Offroad-Fahrten reinigen lassen',
          'Große Fensterflächen brauchen spezielle Behandlung',
          'Kofferraum oft stark beansprucht - regelmäßig pflegen'
        ],
        specialties: 'SUVs sammeln mehr Schmutz - unsere Hochdruckreinigung entfernt auch hartnäckigsten Dreck.'
      }
    },
    {
      id: 'transporter',
      name: 'TRANSPORTER/VAN',
      image: 'https://i.imgur.com/JAMhbmW.png',
      icon: Truck,
      description: 'Nutzfahrzeug',
      features: ['Großflächenreinigung', 'Laderaum', 'Gewerblich'],
      details: {
        title: 'Transporter Pflege',
        subtitle: 'Professionell für Profis',
        features: [
          'Gewerbliche Reinigung 120-150 Min',
          'Laderaum-Spezialreinigung',
          'Firmenlogo-Schutz',
          'Schnelle Abwicklung'
        ],
        services: [
          { name: 'Transporter Basis' },
          { name: 'Laderaum-Reinigung' },
          { name: 'Gewerbe Komplett' }
        ],
        tips: [
          'Regelmäßige Pflege erhält den Wiederverkaufswert',
          'Saubere Fahrzeuge = professioneller Eindruck',
          'Steuerlich absetzbar als Betriebsausgabe'
        ],
        specialties: 'Gewerbliche Fahrzeuge brauchen robuste Reinigung - wir kennen die Anforderungen.'
      }
    },
    {
      id: 'luxus',
      name: 'LUXUSFAHRZEUG',
      image: 'https://i.imgur.com/71vqTmW.png',
      icon: Zap,
      description: 'Premium & Exklusiv',
      features: ['Handwäsche', 'Lederpflege', 'Versiegelung'],
      details: {
        title: 'Luxusfahrzeug Pflege',
        subtitle: 'Exklusiv wie Ihr Fahrzeug',
        features: [
          'VIP-Behandlung 150-180 Min',
          'Handwäsche mit Premium-Produkten',
          'Leder & Alcantara Spezialpflege',
          'Keramikversiegelung verfügbar'
        ],
        services: [
          { name: 'Luxury Handwash' },
          { name: 'Premium Interior' },
          { name: 'VIP Komplett' }
        ],
        tips: [
          'Nur pH-neutrale Premium-Produkte verwenden',
          'Leder monatlich konditionieren',
          'Keramikversiegelung alle 6 Monate erneuern'
        ],
        specialties: 'Luxusfahrzeuge verdienen Luxuspflege - wir behandeln jeden Wagen wie unseren eigenen.'
      }
    },
    {
      id: 'motorrad',
      name: 'MOTORRAD',
      image: 'https://i.imgur.com/uq00GTY.png',
      icon: Bike,
      description: 'Zweirad',
      features: ['Spezialreinigung', 'Kettenpflege', 'Chrompolieren'],
      details: {
        title: 'Motorrad Pflege',
        subtitle: 'Für echte Biker',
        features: [
          'Spezielle Motorrad-Reinigung 60-90 Min',
          'Ketten- und Antriebspflege',
          'Chrom-Politur inklusive',
          'Wintereinlagerung-Vorbereitung'
        ],
        services: [
          { name: 'Motorrad Basis' },
          { name: 'Chrom-Politur' },
          { name: 'Komplett + Kette' }
        ],
        tips: [
          'Nach jeder längeren Tour reinigen',
          'Kette regelmäßig fetten nach Reinigung',
          'Chrom vor Korrosion schützen'
        ],
        specialties: 'Motorräder brauchen besondere Vorsicht - wir kennen jeden Winkel und jedes empfindliche Teil.'
      }
    },
    {
      id: 'oldtimer',
      name: 'OLDTIMER',
      image: 'https://i.imgur.com/JsbJHdY.png',
      icon: Car,
      description: 'Klassiker & Vintage',
      features: ['Innenreinigung', 'Außenreinigung', 'Lackpflege', 'Polsterreinigung'],
      details: {
        title: 'Oldtimer Pflege',
        subtitle: 'Klassiker verdienen klassische Pflege',
        features: [
          'Schonende Handwäsche 120-180 Min',
          'Originalteile-schonende Behandlung',
          'Spezial-Polituren für alten Lack',
          'Chrom- und Messing-Restauration'
        ],
        services: [
          { name: 'Oldtimer Handwash' },
          { name: 'Chrom-Restauration' },
          { name: 'Klassiker Komplett' }
        ],
        tips: [
          'Nur pH-neutrale Produkte für alten Lack',
          'Gummi-Dichtungen regelmäßig pflegen',
          'Niemals Hochdruck auf empfindliche Teile'
        ],
        specialties: 'Oldtimer sind Schätze - wir behandeln sie mit der Ehrfurcht, die sie verdienen.'
      }
    },
    {
      id: 'campingwagen',
      name: 'CAMPINGWAGEN',
      image: 'https://i.imgur.com/PpEwDZc.png',
      icon: Truck,
      description: 'Wohnmobil & Caravan',
      features: ['Spezialreinigung', 'Innenreinigungen', 'Außenreinigung'],
      details: {
        title: 'Campingwagen Pflege',
        subtitle: 'Bereit für das nächste Abenteuer',
        features: [
          'Großflächenreinigung 180-240 Min',
          'Dach- und Seitenwand-Spezialbehandlung',
          'Innenraum wie zu Hause',
          'Markisen-Reinigung möglich'
        ],
        services: [
          { name: 'Außenreinigung XXL' },
          { name: 'Innenraum Camping' },
          { name: 'Camping Komplett' }
        ],
        tips: [
          'Vor und nach der Saison gründlich reinigen',
          'Dach regelmäßig auf Dichtigkeit prüfen',
          'Markisen trocken einfahren nach Reinigung'
        ],
        specialties: 'Wohnmobile sind wie ein zweites Zuhause - wir sorgen dafür, dass Sie sich wohlfühlen.'
      }
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {vehicles.map((vehicle, index) => {
          const isSelected = selectedVehicle === vehicle.id;
          const IconComponent = vehicle.icon;
          
          return (
            <div
              key={vehicle.id}
              onClick={() => {
                onVehicleSelect(vehicle.id);
                if (onVehicleClick) {
                  onVehicleClick(vehicle);
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
                className="absolute inset-0 bg-cover bg-center rounded-2xl overflow-hidden shadow-silver-lg"
                style={{ backgroundImage: `url(${vehicle.image})` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-t from-slate-900/90 via-slate-800/60 to-transparent' 
                    : 'bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-slate-600/20 group-hover:from-slate-900/90'
                }`}>
                  {/* Shimmer Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-30"></div>
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
                      ? 'bg-gradient-metallic shadow-silver-lg animate-glow' 
                      : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer rounded-full"></div>
                    )}
                    <IconComponent className={`w-6 h-6 relative z-10 ${
                      isSelected ? 'text-slate-700' : 'text-white'
                    }`} />
                  </div>
                </div>

                {/* Vehicle Name */}
                <div className="text-center">
                  <h3 className={`font-poppins font-bold text-lg mb-2 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white drop-shadow-lg text-xl' 
                      : 'text-white/90 group-hover:text-white'
                  }`}>
                    {vehicle.name}
                  </h3>
                  <p className={`font-montserrat text-sm transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/90 drop-shadow-md' 
                      : 'text-white/70 group-hover:text-white/80'
                  }`}>
                    {vehicle.description}
                  </p>
                </div>
                
                {/* Features */}
                <div className="space-y-1">
                  {vehicle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center text-xs text-white/60 group-hover:text-white/70 transition-colors duration-300 font-poppins">
                      <div className="w-1 h-1 bg-red-400 rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center animate-glow">
                      <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer rounded-full"></div>
                      <svg className="w-5 h-5 text-slate-700 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                  isSelected 
                    ? 'shadow-silver-xl' 
                    : 'group-hover:shadow-silver-lg'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          {vehicles.map((_, index) => (
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
      `}</style>
    </div>
  );
};

export default VehicleSelection;