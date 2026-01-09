import React from 'react';
import { ShoppingCart, Phone, Check, Heart, Star, Award } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-8">
            <Award className="w-5 h-5 text-[#2D5F3F]" />
            <span className="text-[#2D5F3F] font-semibold text-sm">Seit 1952 in Velbert</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight" id="demo-h1">
            Fleisch von<br />
            <span className="text-[#2D5F3F]">glücklichen Tieren</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto" id="demo-h2">
            Regional. Artgerecht. Transparent.<br />
            <span className="text-gray-500 text-lg mt-2 block">
              Wir vermarkten Fleisch von persönlich ausgesuchten Tieren aus artgerechter Haltung
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => window.location.href = '/demo/metzgerei/shop'}
              className="bg-[#2D5F3F] hover:bg-[#3E7C57] text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              id="demo-cta-button"
            >
              <ShoppingCart className="w-6 h-6" />
              Jetzt online bestellen
            </button>
            <button
              onClick={() => document.getElementById('kontakt-map')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-50 text-[#2D5F3F] border-2 border-[#2D5F3F] px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center gap-2"
            >
              <Phone className="w-6 h-6" />
              Kontakt
            </button>
          </div>

          {/* Google Review Badge */}
          <div className="mb-16 flex justify-center">
            <a
              href="https://www.google.com/maps/place/Nevigeser+Str.+291,+42553+Velbert"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:scale-105"
            >
              {/* Google Logo */}
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-bold text-gray-900">Google</span>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-300"></div>

              {/* Rating */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">61 Bewertungen</p>
              </div>
            </a>
          </div>

          {/* Clean Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100" id="demo-badge-1">
              <div className="w-12 h-12 rounded-full bg-[#2D5F3F] flex items-center justify-center mx-auto mb-3">
                <Check className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">100% Regional</h3>
              <p className="text-sm text-gray-600">Aus der Umgebung</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100" id="demo-badge-2">
              <div className="w-12 h-12 rounded-full bg-[#2D5F3F] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Artgerecht</h3>
              <p className="text-sm text-gray-600">Tierwohlgerecht</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100" id="demo-badge-3">
              <div className="w-12 h-12 rounded-full bg-[#2D5F3F] flex items-center justify-center mx-auto mb-3">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Premium</h3>
              <p className="text-sm text-gray-600">Höchste Qualität</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#2D5F3F] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-[#8BC34A] rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
