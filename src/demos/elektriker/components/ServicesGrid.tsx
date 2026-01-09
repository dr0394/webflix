import React from 'react';
import { Lightbulb, Plug, Shield, Camera, Sun, Network, Wrench, Home } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'Beleuchtung',
    description: 'Planung und Installation moderner Beleuchtungskonzepte für Wohn- und Geschäftsräume.',
    features: ['LED-Technik', 'Smart Home', 'Lichtdesign'],
  },
  {
    icon: Plug,
    title: 'Elektroinstallation',
    description: 'Komplette Elektroinstallationen für Neu- und Altbauten nach neuesten Standards.',
    features: ['Neuinstallation', 'Sanierung', 'Erweiterung'],
  },
  {
    icon: Shield,
    title: 'E-Check & Prüfung',
    description: 'Gesetzlich vorgeschriebene Prüfungen und Sicherheitschecks Ihrer Elektroanlagen.',
    features: ['E-Check', 'VDE-Prüfung', 'Protokoll'],
  },
  {
    icon: Camera,
    title: 'Sicherheitstechnik',
    description: 'Installation von Alarmanlagen, Videosystemen und Zutrittskontrolle.',
    features: ['Alarmanlagen', 'Videoüberwachung', 'Zugang'],
  },
  {
    icon: Sun,
    title: 'Photovoltaik',
    description: 'Beratung, Planung und Installation von Solaranlagen inkl. Speicherlösungen.',
    features: ['Solartechnik', 'Speicher', 'Wartung'],
  },
  {
    icon: Network,
    title: 'Netzwerktechnik',
    description: 'Strukturierte Verkabelung und Einrichtung von Netzwerken für Privat und Gewerbe.',
    features: ['LAN/WLAN', 'Glasfaser', 'Server'],
  },
  {
    icon: Wrench,
    title: 'Reparatur & Wartung',
    description: 'Schnelle Störungsbeseitigung und regelmäßige Wartung Ihrer Elektroanlagen.',
    features: ['Fehlersuche', 'Reparatur', 'Wartung'],
  },
  {
    icon: Home,
    title: 'Smart Home',
    description: 'Intelligente Haussteuerung für mehr Komfort, Sicherheit und Energieeffizienz.',
    features: ['KNX', 'Loxone', 'Integration'],
  },
];

const ServicesGrid = () => {
  return (
    <section id="leistungen" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Unsere Leistungen
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Alles aus einer Hand
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Von klassischen Elektroinstallationen bis zu modernsten Smart-Home-Lösungen –
            wir sind Ihr kompetenter Partner für alle Elektroarbeiten.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-white" size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Brauchen Sie eine individuelle Lösung?
            </h3>
            <p className="text-lg sm:text-xl mb-6 text-gray-300 max-w-2xl mx-auto">
              Wir beraten Sie gerne persönlich und erstellen Ihnen ein maßgeschneidertes
              Angebot für Ihr Projekt – kostenlos und unverbindlich.
            </p>
            <a
              href="#angebot"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
            >
              Jetzt Angebot anfragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
