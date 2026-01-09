import React, { useState } from 'react';
import { Menu, X, Phone, Zap } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-2">
            <Zap size={16} className="animate-pulse" />
            <span className="font-semibold">24/7 Notdienst verfügbar</span>
          </div>
          <a href="tel:+491234567890" className="flex items-center gap-2 hover:text-amber-100 transition-colors font-bold">
            <Phone size={16} />
            <span>+49 123 456 7890</span>
          </a>
        </div>
      </div>

      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                ElektroProfi
              </div>
              <div className="text-xs text-gray-500">Ihr Meisterbetrieb</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Start
            </a>
            <a href="#leistungen" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Leistungen
            </a>
            <a href="#projekte" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Projekte
            </a>
            <a href="#kontakt" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Kontakt
            </a>
            <a
              href="#angebot"
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 font-semibold"
            >
              Angebot anfordern
            </a>
          </nav>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a
                href="#home"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start
              </a>
              <a
                href="#leistungen"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leistungen
              </a>
              <a
                href="#projekte"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projekte
              </a>
              <a
                href="#kontakt"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </a>
              <a
                href="#angebot"
                className="block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2.5 rounded-full text-center font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Angebot anfordern
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
