import React from 'react';
import { Car, Phone, Mail, MapPin, Clock, Star, Award, Shield, Heart, Settings } from 'lucide-react';

interface FooterProps {
  customData?: Record<string, any>;
  isPreviewMode?: boolean;
}

const Footer: React.FC<FooterProps> = ({ customData = {}, isPreviewMode = false }) => {
  const getContent = (key: string, defaultValue: string) => {
    return customData[key] || defaultValue;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPreviewMode) {
      e.preventDefault();
    }
  };
  return (
    <footer className="bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-glow rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div data-editable="footer_company_name" className="text-3xl font-bold text-white mb-4 font-poppins">
                {getContent('footer_company_name', 'AutoPflege Profi')}
              </div>
              <p data-editable="footer_tagline" className="text-primary text-sm font-medium font-poppins">{getContent('footer_tagline', 'Professionelle Fahrzeugpflege')}</p>
            </div>
            <p data-editable="footer_description" className="text-accent mb-6 leading-relaxed max-w-md font-poppins">
              {getContent('footer_description', 'AutoPflege Profi - Ihr professioneller Partner für Autoreinigung und Fahrzeugaufbereitung. Wir bringen Ihr Fahrzeug zum Strahlen mit höchster Qualität und Leidenschaft.')}
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, text: 'Profi-Service' },
                { icon: Shield, text: 'Versichert' },
                { icon: Star, text: '5.0/5 Sterne' },
                { icon: Heart, text: '12 Rezensionen' }
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-accent/20">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-accent font-poppins">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-brand-white">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">Telefon</p>
                  <a data-editable="footer_phone" href={`tel:${getContent('footer_phone', '+49 123 456 7890').replace(/\s/g, '')}`} className="text-brand-white font-medium hover:text-primary transition-colors font-poppins">
                    {getContent('footer_phone', '+49 123 456 7890')}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">E-Mail</p>
                  <a data-editable="footer_email" href={`mailto:${getContent('footer_email', 'info@autopflege-profi.de')}`} className="text-brand-white font-medium hover:text-primary transition-colors font-poppins">
                    {getContent('footer_email', 'info@autopflege-profi.de')}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">Adresse</p>
                  <p data-editable="footer_address" className="text-brand-white font-medium font-poppins whitespace-pre-line">
                    {getContent('footer_address', 'Musterstraße 123\n12345 Musterstadt')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">Öffnungszeiten</p>
                  <p data-editable="footer_hours" className="text-brand-white font-medium font-poppins whitespace-pre-line">
                    {getContent('footer_hours', 'Mo-Fr: 9:00 - 18:00 Uhr\nSa: 10:00 - 14:00 Uhr')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services & Links */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-brand-white">Leistungen</h3>
            <ul className="space-y-3">
              {[
                'Außenwäsche',
                'Innenraumreinigung',
                'Polieren & Versiegeln',
                'Motorwäsche',
                'Lederpflege',
                'Detailing'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-accent hover:text-primary transition-colors flex items-center gap-2 group font-poppins">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-accent/30 mb-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p data-editable="footer_copyright" className="text-accent text-sm font-poppins">
              {getContent('footer_copyright', '© 2025 AutoPflege Profi. Alle Rechte vorbehalten.')}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors text-sm">
                <a href="/impressum" className="text-accent hover:text-primary transition-colors text-sm font-poppins">
                  Impressum
                </a>
              </a>
              <a href="/datenschutz" className="text-accent hover:text-primary transition-colors text-sm font-poppins">
                Datenschutz
              </a>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <p className="text-accent text-sm hidden md:block font-poppins">Bereit für Ihre Autoreinigung?</p>
            <a
              href="/configurator"
              onClick={handleClick}
              className="group relative bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden font-poppins"
            >
              <span className="relative z-10">
                <Settings className="w-5 h-5 inline mr-2" />
                Jetzt Fahrzeugaufbereitung anfragen
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-primary"></div>
    </footer>
  );
};

export default Footer;