import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-stone-100/95 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl sm:text-2xl font-light tracking-widest text-stone-800 hover:text-amber-700 transition-colors"
            >
              CAFÉ PODEST
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-800 hover:text-amber-700 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('links')}
                className="text-sm font-light tracking-wide text-stone-800 hover:text-amber-700 transition-colors"
              >
                ÜBERSICHT
              </button>
              <button
                onClick={() => scrollToSection('welcome')}
                className="text-sm font-light tracking-wide text-stone-800 hover:text-amber-700 transition-colors"
              >
                WILLKOMMEN
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm font-light tracking-wide text-stone-800 hover:text-amber-700 transition-colors"
              >
                ÜBER UNS
              </button>
            </nav>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 bg-stone-100 border-b border-stone-300 shadow-xl">
            <nav className="flex flex-col p-6 space-y-4">
              <button
                onClick={() => scrollToSection('links')}
                className="text-left text-lg font-light tracking-wide text-stone-800 hover:text-amber-700 transition-colors py-2"
              >
                ÜBERSICHT
              </button>
              <button
                onClick={() => scrollToSection('welcome')}
                className="text-left text-lg font-light tracking-wide text-stone-800 hover:text-amber-700 transition-colors py-2"
              >
                WILLKOMMEN
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-lg font-light tracking-wide text-stone-800 hover:text-amber-700 transition-colors py-2"
              >
                ÜBER UNS
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
