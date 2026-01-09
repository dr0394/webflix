import React from 'react';
import { Phone, Mail, Clock, ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#2D5F3F] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+49123456789" className="flex items-center gap-2 hover:text-[#8BC34A] transition-colors">
                <Phone className="w-4 h-4" />
                <span>0123 / 456 789</span>
              </a>
              <a href="mailto:info@metzgerei-zwickels.de" className="flex items-center gap-2 hover:text-[#8BC34A] transition-colors hidden sm:flex">
                <Mail className="w-4 h-4" />
                <span>info@metzgerei-zwickels.de</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Mo-Fr: 7:00-18:30 | Sa: 7:00-13:00</span>
              <span className="sm:hidden">Mo-Fr: 7-18:30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="https://zwickels.de/wp-content/uploads/2021/02/cropped-image0-1.png"
                alt="Metzgerei Zwickels Logo"
                className="h-16 w-auto"
                id="header_logo"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors" id="header_nav_1">
                Startseite
              </a>
              <a href="#produkte" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors" id="header_nav_2">
                Produkte
              </a>
              <a href="#angebote" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors" id="header_nav_3">
                Wochenangebote
              </a>
              <a href="#ueber-uns" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors" id="header_nav_4">
                Über uns
              </a>
              <a href="#kontakt" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors" id="header_nav_5">
                Kontakt
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => window.location.href = '/demo/metzgerei/shop'}
                className="flex items-center gap-2 bg-[#8BC34A] hover:bg-[#7CB342] text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                id="header_cta"
              >
                <ShoppingCart className="w-5 h-5" />
                Online bestellen
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#2D5F3F] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors py-2">
                Startseite
              </a>
              <a href="#produkte" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors py-2">
                Produkte
              </a>
              <a href="#angebote" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors py-2">
                Wochenangebote
              </a>
              <a href="#ueber-uns" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors py-2">
                Über uns
              </a>
              <a href="#kontakt" className="text-gray-700 hover:text-[#2D5F3F] font-medium transition-colors py-2">
                Kontakt
              </a>
              <button
                onClick={() => window.location.href = '/demo/metzgerei/shop'}
                className="flex items-center justify-center gap-2 bg-[#8BC34A] hover:bg-[#7CB342] text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Online bestellen
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
