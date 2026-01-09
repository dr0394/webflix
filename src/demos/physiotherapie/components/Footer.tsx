import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-teal-400 mb-4">PhysioVital</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Ihre Praxis für professionelle Physiotherapie im Herzen der Stadt.
              Gesundheit und Wohlbefinden sind unsere Mission.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-teal-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-teal-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-teal-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Start
                </a>
              </li>
              <li>
                <a href="#leistungen" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Leistungen
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#kontakt" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Leistungen</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Krankengymnastik</li>
              <li className="text-gray-400">Manuelle Therapie</li>
              <li className="text-gray-400">Elektrotherapie</li>
              <li className="text-gray-400">Lymphdrainage</li>
              <li className="text-gray-400">Sportphysiotherapie</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Gesundheitsstraße 123</li>
              <li>12345 Musterstadt</li>
              <li className="pt-2">
                <a href="tel:+4912345678" className="hover:text-teal-400 transition-colors">
                  Tel: +49 123 456 78
                </a>
              </li>
              <li>
                <a href="mailto:info@physio-praxis.de" className="hover:text-teal-400 transition-colors">
                  info@physio-praxis.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2025 PhysioVital. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              Impressum
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              Datenschutz
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
