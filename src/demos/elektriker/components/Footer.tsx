import React from 'react';
import { Facebook, Instagram, Linkedin, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold">ElektroProfi</h3>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Ihr zuverlässiger Meisterbetrieb für alle Elektroarbeiten.
              Qualität und Service seit 1995.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-amber-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-amber-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-amber-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Start
                </a>
              </li>
              <li>
                <a href="#leistungen" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Leistungen
                </a>
              </li>
              <li>
                <a href="#projekte" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Projekte
                </a>
              </li>
              <li>
                <a href="#kontakt" className="text-gray-400 hover:text-amber-400 transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Leistungen</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Elektroinstallation</li>
              <li>Beleuchtung</li>
              <li>Smart Home</li>
              <li>Photovoltaik</li>
              <li>Sicherheitstechnik</li>
              <li>E-Check & Prüfung</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Elektrostraße 42</li>
              <li>12345 Musterstadt</li>
              <li className="pt-2">
                <a href="tel:+491234567890" className="hover:text-amber-400 transition-colors font-medium">
                  Tel: +49 123 456 7890
                </a>
              </li>
              <li>
                <a href="mailto:info@elektroprofi.de" className="hover:text-amber-400 transition-colors">
                  info@elektroprofi.de
                </a>
              </li>
              <li className="pt-2">
                <span className="text-red-400 font-semibold">24/7 Notdienst</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2025 ElektroProfi Meisterbetrieb. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Impressum
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Datenschutz
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                AGB
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-block bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-lg">
            <p className="text-amber-400 text-sm font-medium">
              Zertifizierter Meisterbetrieb | Mitglied der Elektro-Innung
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
