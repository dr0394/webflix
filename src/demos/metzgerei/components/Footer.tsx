import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[#1a3a28] to-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://zwickels.de/wp-content/uploads/2021/02/cropped-image0-1.png"
                alt="Metzgerei Zwickels Logo"
                className="h-16 w-auto mb-4"
                id="footer_company_name"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed" id="footer_description">
              Ihre traditionelle Metzgerei für erstklassiges Fleisch und Wurst.
              Regional, frisch und mit Leidenschaft handgefertigt.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#2D5F3F] rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#2D5F3F] rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#8BC34A]">Kontakt</h4>
            <div className="space-y-4">
              <a href="tel:+49123456789" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 mt-1 text-[#8BC34A] group-hover:text-[#7CB342] transition-colors" />
                <span id="footer_phone">0123 / 456 789</span>
              </a>
              <a href="mailto:info@metzgerei-zwickels.de" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <Mail className="w-5 h-5 mt-1 text-[#8BC34A] group-hover:text-[#7CB342] transition-colors" />
                <span id="footer_email">info@metzgerei-zwickels.de</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 text-[#8BC34A] flex-shrink-0" />
                <span id="footer_address">
                  Hauptstraße 42<br />
                  87654 Musterstadt
                </span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#8BC34A]">Öffnungszeiten</h4>
            <div className="space-y-3 text-gray-400" id="footer_hours">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span>Montag - Freitag</span>
                <span className="font-semibold text-white">7:00 - 18:30</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span>Samstag</span>
                <span className="font-semibold text-white">7:00 - 13:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sonntag</span>
                <span className="font-semibold text-[#8BC34A]">Geschlossen</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#8BC34A]">Schnellzugriff</h4>
            <ul className="space-y-3">
              <li>
                <a href="/demo/metzgerei/impressum" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8BC34A] rounded-full"></span>
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8BC34A] rounded-full"></span>
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8BC34A] rounded-full"></span>
                  AGB
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8BC34A] rounded-full"></span>
                  Karriere
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p id="footer_copyright">© 2025 Metzgerei Zwickels. Alle Rechte vorbehalten.</p>
            <p>Entwickelt mit ❤️ von Webflix</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
