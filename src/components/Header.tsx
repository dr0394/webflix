import React, { useState, useEffect } from 'react';
import { Star, Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showNavigation?: boolean;
  showShowroomLink?: boolean;
}

const Header = ({ showNavigation = false, showShowroomLink = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 2, minutes: 42, seconds: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (showNavigation) {
    return (
      <div className="sticky top-0 z-50">
        <div className="bg-[#0d0d0d] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {[
                  { value: pad(timeLeft.days), label: 'TAGE' },
                  { value: pad(timeLeft.hours), label: 'STUNDEN' },
                  { value: pad(timeLeft.minutes), label: 'MINUTEN' },
                  { value: pad(timeLeft.seconds), label: 'SEKUNDEN' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 border border-white/20 rounded flex items-center justify-center">
                      <span className="text-white font-black text-sm sm:text-base">{item.value}</span>
                    </div>
                    <span className="text-[7px] sm:text-[8px] text-gray-500 mt-0.5 tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="hidden sm:flex items-center">
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 border border-white/20 rounded-full">
                  <span className="text-white text-xs sm:text-sm font-medium">Nur 349€ statt 3.637 €</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => navigate('/blog')}
                  className="hidden sm:block text-white text-xs sm:text-sm font-medium hover:text-gray-300 transition-colors"
                >
                  BLOG
                </button>
                <a
                  href={`https://wa.me/4915146692387?text=${encodeURIComponent("Hallo! Ich möchte meine Website für 349€ bestellen.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-black tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                >
                  JETZT SICHERN <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 sm:gap-6">
                <button onClick={() => navigate('/')}>
                  <img
                    src="/logowebflix499.png"
                    alt="Webflix"
                    className="h-10 sm:h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-6">
                {showShowroomLink && (
                  <button
                    onClick={() => navigate('/zum-mitnehmen')}
                    className="text-gray-600 hover:text-black transition-colors text-sm font-light underline"
                  >
                    Zum Showroom
                  </button>
                )}
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-black transition-colors text-sm font-light"
                >
                  Startseite
                </button>
                <a
                  href="https://www.webflix.info/custom"
                  className="text-gray-600 hover:text-black transition-colors text-sm font-light"
                >
                  Express Websites
                </a>
                <button
                  onClick={() => navigate('/custom')}
                  className="text-gray-600 hover:text-black transition-colors text-sm font-light"
                >
                  Custom
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="text-gray-600 hover:text-black transition-colors text-sm font-light"
                >
                  Über uns
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-gray-600 hover:text-black transition-colors text-sm font-light"
                >
                  Kontakt
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden md:flex items-center gap-2 sm:gap-3 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-4 sm:w-5 h-4 sm:h-5">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-400 fill-yellow-400" />
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-400 fill-yellow-400" />
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-400 fill-yellow-400" />
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-400 fill-yellow-400" />
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-yellow-400 fill-yellow-400" />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-600 font-medium">5.0 Google Bewertung</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className="hidden lg:block text-gray-600 hover:text-black transition-colors text-sm font-light underline"
                >
                  Jetzt Support kontaktieren
                </button>

                <button
                  className="lg:hidden text-gray-600"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden bg-gray-100 border-t border-gray-300">
              <div className="px-6 py-4 space-y-3">
                {showShowroomLink && (
                  <button
                    onClick={() => {
                      navigate('/zum-mitnehmen');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-black transition-colors text-sm font-light py-2"
                  >
                    Zum Showroom
                  </button>
                )}
                <button
                  onClick={() => {
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-black transition-colors text-sm font-light py-2"
                >
                  Startseite
                </button>
                <a
                  href="https://www.webflix.info/custom"
                  className="block w-full text-left text-gray-600 hover:text-black transition-colors text-sm font-light py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Express Websites
                </a>
                <button
                  onClick={() => {
                    navigate('/custom');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-black transition-colors text-sm font-light py-2"
                >
                  Custom
                </button>
                <button
                  onClick={() => {
                    navigate('/about');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-black transition-colors text-sm font-light py-2"
                >
                  Über uns
                </button>
                <button
                  onClick={() => {
                    navigate('/contact');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-black transition-colors text-sm font-light py-2"
                >
                  Kontakt
                </button>
                <button
                  onClick={() => {
                    navigate('/contact');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-black transition-colors text-sm font-light py-2"
                >
                  Jetzt Support kontaktieren
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white text-center relative border-t border-gray-200 py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 relative z-10 flex-wrap px-4">
            <span className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">
              Einmalige Setup-Kosten: <span className="text-pink-500">499 €</span>
            </span>
            <span className="text-gray-700 text-xs sm:text-sm md:text-base">
              · 72 Stunden Express · mit Zufriedenheitsgarantie oder du zahlst 0€
            </span>
            <button
              onClick={() => navigate('/custom')}
              className="text-pink-500 font-light hover:text-pink-600 transition-colors text-xs sm:text-sm md:text-base underline"
            >
              jetzt anfragen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/logowebflix499.png"
            alt="Webflix"
            className="h-14 sm:h-16 md:h-20 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/"
            className="text-sm font-medium hover:text-gray-300 transition-colors"
          >
            Startseite
          </a>
          <a
            href="https://www.webflix.info/custom"
            className="text-sm font-medium hover:text-gray-300 transition-colors"
          >
            Express Websites
          </a>
          <a
            href="/custom"
            className="text-sm font-medium hover:text-gray-300 transition-colors"
          >
            Custom
          </a>
          <a
            href="/about"
            className="text-sm font-medium hover:text-gray-300 transition-colors"
          >
            Über uns
          </a>
          <a
            href="/contact"
            className="text-sm font-medium hover:text-gray-300 transition-colors"
          >
            Kontakt
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
          >
            Kostenlose Beratung buchen
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="/"
              className="block text-sm font-medium hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Startseite
            </a>
            <a
              href="https://www.webflix.info/custom"
              className="block text-sm font-medium hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Express Websites
            </a>
            <a
              href="/custom"
              className="block text-sm font-medium hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Custom
            </a>
            <a
              href="/about"
              className="block text-sm font-medium hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Über uns
            </a>
            <a
              href="/contact"
              className="block text-sm font-medium hover:text-gray-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </a>
            <a
              href="#contact"
              className="block px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-400 text-white font-semibold rounded-lg text-center mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kostenlose Beratung buchen
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
