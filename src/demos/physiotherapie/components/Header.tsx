import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+4912345678" className="flex items-center gap-2 hover:text-teal-100 transition-colors">
              <Phone size={14} />
              <span>+49 123 456 78</span>
            </a>
            <a href="mailto:info@physio-praxis.de" className="flex items-center gap-2 hover:text-teal-100 transition-colors">
              <Mail size={14} />
              <span className="hidden sm:inline">info@physio-praxis.de</span>
            </a>
          </div>
          <div className="text-xs sm:text-sm">
            Mo-Fr: 8:00-18:00 Uhr | Sa: 9:00-13:00 Uhr
          </div>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl sm:text-3xl font-bold text-teal-600">
              PhysioVital
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Start
            </a>
            <a href="#leistungen" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Leistungen
            </a>
            <a href="#team" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Team
            </a>
            <a href="#kontakt" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Kontakt
            </a>
            <a
              href="#termin"
              className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 font-semibold"
            >
              Termin buchen
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
                className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start
              </a>
              <a
                href="#leistungen"
                className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leistungen
              </a>
              <a
                href="#team"
                className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </a>
              <a
                href="#kontakt"
                className="block text-gray-700 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </a>
              <a
                href="#termin"
                className="block bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2.5 rounded-full text-center font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Termin buchen
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
