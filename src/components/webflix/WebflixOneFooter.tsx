import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
}

interface MapLocation {
  address: string;
  city: string;
  zip: string;
}

interface WebflixOneFooterProps {
  companyName: string;
  displayName: string;
  primaryColor: string;
  contact: ContactInfo;
  location: MapLocation;
}

const WebflixOneFooter: React.FC<WebflixOneFooterProps> = ({
  companyName,
  displayName,
  primaryColor = '#3b82f6',
  contact,
  location
}) => {
  // Provide defaults if data is missing
  const safeContact = contact || { phone: '', email: '', hours: '' };
  const safeLocation = location || { address: '', city: '', zip: '' };

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t" style={{ borderColor: `${primaryColor}30` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-poppins" style={{ color: primaryColor }}>
              {companyName}
            </h3>
            <p className="text-slate-400 mb-4 font-montserrat">
              Ihr Partner für professionelle {displayName} Services
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50`, borderWidth: '1px' }}
                onClick={(e) => e.preventDefault()}
              >
                <Facebook className="w-5 h-5" style={{ color: primaryColor }} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50`, borderWidth: '1px' }}
                onClick={(e) => e.preventDefault()}
              >
                <Instagram className="w-5 h-5" style={{ color: primaryColor }} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50`, borderWidth: '1px' }}
                onClick={(e) => e.preventDefault()}
              >
                <Linkedin className="w-5 h-5" style={{ color: primaryColor }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-poppins">Quick Links</h4>
            <ul className="space-y-2 font-montserrat">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Über uns
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Leistungen
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Referenzen
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-poppins">Services</h4>
            <ul className="space-y-2 font-montserrat">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Beratung
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Planung
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Ausführung
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                  Wartung
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 font-poppins">Kontakt</h4>
            <ul className="space-y-3 font-montserrat">
              {safeLocation.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="text-slate-400 text-sm">
                    {safeLocation.address}<br />
                    {safeLocation.zip} {safeLocation.city}
                  </span>
                </li>
              )}
              {safeContact.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 flex-shrink-0" style={{ color: primaryColor }} />
                  <a
                    href={`tel:${safeContact.phone.replace(/\s/g, '')}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {safeContact.phone}
                  </a>
                </li>
              )}
              {safeContact.email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 flex-shrink-0" style={{ color: primaryColor }} />
                  <a
                    href={`mailto:${safeContact.email}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {safeContact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: `${primaryColor}30` }}>
          <p className="text-slate-400 text-sm font-montserrat">
            © {new Date().getFullYear()} {companyName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm font-montserrat">
            <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              Impressum
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              Datenschutz
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebflixOneFooter;
