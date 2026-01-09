import React from 'react';
import { Shield, Eye, Lock, AlertTriangle, Wifi, Phone, Camera, Users } from 'lucide-react';

interface ServiceSelectionProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
  onServiceClick?: (service: any) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ selectedService, onServiceSelect, onServiceClick }) => {
  const services = [
    {
      id: 'alarmanlagen',
      name: 'ALARMANLAGEN',
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Shield,
      description: 'Einbruchschutz',
      features: ['Bewegungsmelder', 'Tür-/Fenstersensoren', '24h Überwachung'],
      details: {
        title: 'Alarmanlagen & Einbruchschutz', 
        subtitle: 'Zuverlässiger Schutz vor Einbrechern',
        features: [
          'Moderne Bewegungsmelder mit Haustier-Immunität',
          'Tür- und Fenstersensoren',
          'Zentrale Steuerung mit App-Anbindung',
          '24h Überwachung durch Sicherheitsdienst'
        ],
        services: [
          { name: 'Basis-Alarmanlage' },
          { name: 'Premium-System' },
          { name: 'Smart-Alarmanlage' }
        ],
        tips: [
          'Regelmäßige Wartung alle 6 Monate',
          'Sensoren an allen kritischen Punkten',
          'Backup-Stromversorgung einplanen'
        ],
        specialties: 'Alarmanlagen müssen zuverlässig funktionieren - wir setzen nur auf VdS-zertifizierte Komponenten.'
      }
    },
    {
      id: 'videoueberwachung',
      name: 'VIDEOÜBERWACHUNG',
      image: 'https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Eye,
      description: 'Kamerasysteme',
      features: ['4K Kameras', 'Nachtsicht', 'Fernzugriff'],
      details: {
        title: 'Videoüberwachung & Kamerasysteme',
        subtitle: 'Lückenlose Überwachung in HD-Qualität',
        features: [
          '4K Ultra-HD Kameras für gestochen scharfe Bilder',
          'Infrarot-Nachtsicht bis 30m Reichweite',
          'Fernzugriff per App von überall',
          'Intelligente Bewegungserkennung'
        ],
        services: [
          { name: 'IP-Kamerasystem' },
          { name: 'Analog-HD System' },
          { name: 'Hybrid-Lösung' }
        ],
        tips: [
          'Datenschutz-Bestimmungen beachten',
          'Ausreichend Speicherplatz einplanen',
          'Wetterfeste Kameras für Außenbereich'
        ],
        specialties: 'Videoüberwachung erfordert Expertise in Technik und Recht - wir beraten Sie umfassend.'
      }
    },
    {
      id: 'zutrittskontrolle',
      name: 'ZUTRITTSKONTROLLE',
      image: 'https://images.pexels.com/photos/277593/pexels-photo-277593.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Lock,
      description: 'Zugangssysteme',
      features: ['Chipkarten', 'Fingerprint', 'Zeitsteuerung'],
      details: {
        title: 'Zutrittskontrolle & Zugangssysteme',
        subtitle: 'Kontrollierter Zugang für maximale Sicherheit',
        features: [
          'Chipkarten-System mit Verschlüsselung',
          'Biometrische Fingerprint-Scanner',
          'Gesichtserkennung mit KI-Technologie',
          'Zeitgesteuerte Zugangsberechtigungen'
        ],
        services: [
          { name: 'Chipkarten-System' },
          { name: 'Biometrie-Lösung' },
          { name: 'Multi-Faktor-System' }
        ],
        tips: [
          'Backup-Zugang für Notfälle einrichten',
          'Regelmäßige Updates der Software',
          'Benutzerrechte regelmäßig überprüfen'
        ],
        specialties: 'Zutrittskontrolle ist mehr als nur Technik - wir entwickeln durchdachte Sicherheitskonzepte.'
      }
    },
    {
      id: 'brandmeldeanlagen',
      name: 'BRANDMELDEANLAGEN',
      image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: AlertTriangle,
      description: 'Brandschutz',
      features: ['Rauchmelder', 'Wärmemelder', 'Feuerwehr-Aufschaltung'],
      details: {
        title: 'Brandmeldeanlagen & Brandschutz',
        subtitle: 'Früherkennung rettet Leben und Eigentum',
        features: [
          'Optische und ionisierende Rauchmelder',
          'Wärmemelder für kritische Bereiche',
          'Handfeuermelder an Fluchtwegen',
          'Direkte Aufschaltung zur Feuerwehr'
        ],
        services: [
          { name: 'Brandmeldeanlage' },
          { name: 'Sprinkleranlage' },
          { name: 'Komplett-Brandschutz' }
        ],
        tips: [
          'Regelmäßige Wartung nach DIN 14675',
          'Mitarbeiter in Bedienung schulen',
          'Fluchtwege freihalten'
        ],
        specialties: 'Brandschutz ist lebenswichtig - wir arbeiten nach höchsten Sicherheitsstandards und Normen.'
      }
    },
    {
      id: 'smarthome',
      name: 'SMART HOME',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Wifi,
      description: 'Intelligente Sicherheit',
      features: ['App-Steuerung', 'Automatisierung', 'Integration'],
      details: {
        title: 'Smart Home Security',
        subtitle: 'Intelligente Sicherheit für moderne Häuser',
        features: [
          'Zentrale App-Steuerung aller Systeme',
          'Automatische Szenarien und Zeitpläne',
          'Integration in bestehende Smart Home Systeme',
          'Sprachsteuerung über Alexa/Google'
        ],
        services: [
          { name: 'Smart Security Hub' },
          { name: 'Sensor-Netzwerk' },
          { name: 'Komplett-Integration' }
        ],
        tips: [
          'Sichere WLAN-Verbindung verwenden',
          'Regelmäßige Software-Updates',
          'Backup-Steuerung für Notfälle'
        ],
        specialties: 'Smart Home Security verbindet Komfort mit Sicherheit - wir sorgen für nahtlose Integration.'
      }
    },
    {
      id: 'notrufsysteme',
      name: 'NOTRUFSYSTEME',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Phone,
      description: 'Hausnotruf',
      features: ['24h Bereitschaft', 'Mobile Geräte', 'Angehörigen-Info'],
      details: {
        title: 'Notrufsysteme & Hausnotruf',
        subtitle: 'Schnelle Hilfe auf Knopfdruck',
        features: [
          'Hausnotruf mit 24h Bereitschaftsdienst',
          'Mobile Notrufgeräte für unterwegs',
          'Automatische Angehörigen-Benachrichtigung',
          'Persönliche Betreuung und Beratung'
        ],
        services: [
          { name: 'Hausnotruf-System' },
          { name: 'Mobile Notruflösung' },
          { name: 'Senioren-Komplett' }
        ],
        tips: [
          'Notrufgerät immer griffbereit halten',
          'Regelmäßige Funktionstests durchführen',
          'Angehörige über System informieren'
        ],
        specialties: 'Notrufsysteme geben Sicherheit und Unabhängigkeit - wir sorgen für zuverlässige Betreuung.'
      }
    },
    {
      id: 'perimeterschutz',
      name: 'PERIMETERSCHUTZ',
      image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Shield,
      description: 'Außenbereich-Sicherung',
      features: ['Zaunüberwachung', 'Lichtschranken', 'Bewegungsmelder'],
      details: {
        title: 'Perimeterschutz & Außensicherung',
        subtitle: 'Schutz bereits am Grundstücksrand',
        features: [
          'Zaunüberwachung mit Vibrationssensoren',
          'Infrarot-Lichtschranken',
          'Außen-Bewegungsmelder mit Tiererkennung',
          'Beleuchtungssteuerung bei Alarm'
        ],
        services: [
          { name: 'Zaun-Überwachung' },
          { name: 'Lichtschranken-System' },
          { name: 'Perimeter-Komplett' }
        ],
        tips: [
          'Sichtlinien für Sensoren freihalten',
          'Wetterfeste Komponenten verwenden',
          'Fehlalarme durch Tiere minimieren'
        ],
        specialties: 'Perimeterschutz erkennt Eindringlinge bereits vor dem Gebäude - die erste Verteidigungslinie.'
      }
    },
    {
      id: 'gebaeudesicherheit',
      name: 'GEBÄUDESICHERHEIT',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Users,
      description: 'Objektschutz',
      features: ['Sicherheitsdienst', 'Pförtnerdienst', 'Patrouillen'],
      details: {
        title: 'Gebäudesicherheit & Objektschutz',
        subtitle: 'Umfassender Schutz für Ihr Objekt',
        features: [
          'Professioneller Sicherheitsdienst',
          'Pförtner- und Empfangsdienste',
          'Regelmäßige Sicherheitspatrouillen',
          'Schlüsselverwaltung und Zugangskontrollen'
        ],
        services: [
          { name: 'Objektschutz' },
          { name: 'Pförtnerdienst' },
          { name: 'Sicherheits-Komplett' }
        ],
        tips: [
          'Sicherheitskonzept individuell anpassen',
          'Mitarbeiter regelmäßig schulen',
          'Notfallpläne erstellen und üben'
        ],
        specialties: 'Gebäudesicherheit erfordert erfahrenes Personal - unsere Mitarbeiter sind speziell geschult.'
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
                    ? 'bg-gradient-to-t from-red-900/90 via-red-800/60 to-transparent' 
                    : 'bg-gradient-to-t from-red-900/80 via-red-800/40 to-red-600/20 group-hover:from-red-900/90'
                }`}>
                  {/* Shimmer Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-shimmer opacity-30"></div>
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
                      ? 'bg-red-400/30 shadow-lg animate-glow border border-red-400' 
                      : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-shimmer rounded-full"></div>
                    )}
                    <IconComponent className={`w-6 h-6 relative z-10 ${
                      isSelected ? 'text-red-300' : 'text-white'
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
                      <div className="w-1 h-1 bg-red-400 rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-red-400/30 shadow-lg flex items-center justify-center animate-glow border border-red-400">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-shimmer rounded-full"></div>
                      <svg className="w-5 h-5 text-red-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                  isSelected 
                    ? 'shadow-xl shadow-red-400/20' 
                    : 'group-hover:shadow-lg shadow-red-400/10'
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
    </div>
  );
};

export default ServiceSelection;