import React from 'react';
import { TreePine, Star, Settings } from 'lucide-react';

interface HeaderProps {
  minimal?: boolean;
  darkBackground?: boolean;
}

const Header: React.FC<HeaderProps> = ({ minimal = false, darkBackground = false }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white font-poppins">
              Dein Logo
            </div>
          </a>
          
          {!minimal && (
            <nav className="hidden lg:flex items-center space-x-8">
              <a 
                href="/" 
                className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group drop-shadow-md"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="/configurator"
                className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group drop-shadow-md"
              >
                Konfigurator
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#contact" 
                className="text-white/90 hover:text-white transition-all duration-300 font-medium relative group drop-shadow-md"
              >
                Kontakt
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Google Rating */}
              <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                {/* Google G Logo with colors */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-white font-medium text-sm">Google</span>
                </div>
                
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Rating */}
                <span className="text-white font-bold text-lg">5,0</span>
              </div>
              
              <a
                href="/configurator"
                className="bg-green-600 hover:bg-green-700 border border-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Website kaufen
              </a>
            </nav>
          )}
          
          {/* Mobile Menu Button */}
          {!minimal && (
            <button className="lg:hidden p-2 rounded-lg transition-colors backdrop-blur-md border hover:bg-white/20 border-white/30 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          
          {minimal && (
            <a
              href="/configurator"
              className="bg-green-600 hover:bg-green-700 border border-green-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm shadow-lg"
            >
              <Settings className="w-4 h-4 inline mr-1" />
              Konfigurator
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;