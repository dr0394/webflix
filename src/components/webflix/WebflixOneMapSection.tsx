import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface MapLocation {
  lat: number;
  lng: number;
  address: string;
  city: string;
  zip: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
}

interface WebflixOneMapSectionProps {
  location: MapLocation;
  contact: ContactInfo;
  primaryColor: string;
  companyName: string;
}

const WebflixOneMapSection: React.FC<WebflixOneMapSectionProps> = ({
  location,
  contact,
  primaryColor = '#3b82f6',
  companyName = 'Unser Unternehmen'
}) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.${Math.floor(Math.random() * 1000)}!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sde!2sde!4v1234567890`;

  return (
    <section className="py-24 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: `${primaryColor}15` }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent font-poppins">
            Besuchen Sie uns
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-montserrat">
            Wir sind für Sie da - vor Ort und persönlich
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div
              className="backdrop-blur-xl rounded-3xl p-8 border"
              style={{
                backgroundColor: `${primaryColor}10`,
                borderColor: `${primaryColor}30`
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-poppins">
                Kontaktinformationen
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50`, borderWidth: '2px' }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 font-poppins">Adresse</h4>
                    <p className="text-slate-300 font-montserrat">
                      {location.address}<br />
                      {location.zip} {location.city}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50`, borderWidth: '2px' }}
                  >
                    <Phone className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 font-poppins">Telefon</h4>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="text-slate-300 hover:text-white transition-colors font-montserrat"
                      style={{ textDecoration: 'none' }}
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50`, borderWidth: '2px' }}
                  >
                    <Mail className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 font-poppins">E-Mail</h4>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-slate-300 hover:text-white transition-colors font-montserrat"
                      style={{ textDecoration: 'none' }}
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50`, borderWidth: '2px' }}
                  >
                    <Clock className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 font-poppins">Öffnungszeiten</h4>
                    <p className="text-slate-300 font-montserrat">
                      {contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-poppins"
              style={{
                backgroundColor: primaryColor,
                color: 'white'
              }}
            >
              Termin vereinbaren
            </button>
          </div>

          {/* Map */}
          <div
            className="backdrop-blur-xl rounded-3xl overflow-hidden border h-[600px]"
            style={{
              backgroundColor: `${primaryColor}10`,
              borderColor: `${primaryColor}30`
            }}
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Karte zu ${companyName}`}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebflixOneMapSection;
