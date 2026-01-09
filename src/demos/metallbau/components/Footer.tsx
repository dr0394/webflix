import React from 'react';
import { Building, Phone, Mail, MapPin, Clock, Star, Award, Shield, Heart, Settings } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gray-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-3xl font-bold text-white mb-4 font-poppins">
                MetallProfi
              </div>
              <p className="text-gray-300 text-sm font-medium font-poppins">Professioneller Metallbau & Stahlkonstruktionen</p>
            </div>
            <p className="text-gray-100 mb-6 leading-relaxed max-w-md font-poppins">
              MetallProfi - Ihr zuverlässiger Partner für alle Metallbau-Arbeiten.
              Wir fertigen mit höchster Präzision und jahrelanger Erfahrung.
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, text: 'Meisterbetrieb' },
                { icon: Shield, text: 'TÜV-geprüft' },
                { icon: Star, text: '5.0/5 Sterne' },
                { icon: Heart, text: '22 Rezensionen' }
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-gray-400/20">
                  <badge.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-100 font-poppins">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-white">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="bg-gray-400/20 p-2 rounded-lg group-hover:bg-gray-400/30 transition-colors">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-poppins">Telefon</p>
                  <a href="tel:01234567890" className="text-white font-medium hover:text-gray-300 transition-colors font-poppins">
                    +49 123 456 7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-gray-400/20 p-2 rounded-lg group-hover:bg-gray-400/30 transition-colors">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-poppins">E-Mail</p>
                  <a href="mailto:info@metallprofi.de" className="text-white font-medium hover:text-gray-300 transition-colors font-poppins">
                    info@metallprofi.de
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-gray-400/20 p-2 rounded-lg group-hover:bg-gray-400/30 transition-colors">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-poppins">Adresse</p>
                  <p className="text-white font-medium font-poppins">
                    Musterstraße 123<br />
                    12345 Musterstadt
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-gray-400/20 p-2 rounded-lg group-hover:bg-gray-400/30 transition-colors">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-poppins">Öffnungszeiten</p>
                  <p className="text-white font-medium font-poppins">
                    Mo-Fr: 7:00 - 17:00 Uhr<br />
                    Sa: 8:00 - 14:00 Uhr
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services & Links */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-white">Leistungen</h3>
            <ul className="space-y-3">
              {[
                'Treppen & Geländer',
                'Tore & Zäune',
                'Stahlkonstruktionen',
                'Balkone & Terrassen',
                'Reparaturen',
                'Sonderanfertigungen'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-200 hover:text-gray-300 transition-colors flex items-center gap-2 group font-poppins">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:scale-125 transition-transform"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-400/30 mb-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-gray-200 text-sm font-poppins">
              &copy; 2025 MetallProfi. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <a href="/impressum" className="text-gray-200 hover:text-gray-300 transition-colors text-sm font-poppins">
                Impressum
              </a>
              <a href="/datenschutz" className="text-gray-200 hover:text-gray-300 transition-colors text-sm font-poppins">
                Datenschutz
              </a>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <p className="text-gray-200 text-sm hidden md:block font-poppins">Bereit für Ihr Metallbau-Projekt?</p>
            <a
              href="/configurator"
              className="group relative bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden font-poppins"
            >
              <span className="relative z-10">
                <Settings className="w-5 h-5 inline mr-2" />
                Website kaufen
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-gray-400 to-slate-600"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;