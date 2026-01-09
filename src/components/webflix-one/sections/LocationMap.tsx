import React from 'react';
import { MapPin, Phone, Clock, Navigation, Mail } from 'lucide-react';

export interface LocationMapProps {
  title?: string;
  subtitle?: string;
  businessName?: string;
  address: string;
  phone: string;
  email: string;
  openingHours?: string;
  mapUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  title = "Besuchen Sie uns",
  subtitle = "Wir freuen uns auf Sie",
  businessName = "Unser Standort",
  address,
  phone,
  email,
  openingHours,
  mapUrl,
  ctaText = "Termin vereinbaren",
  ctaLink = "/contact"
}) => {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800/20 to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-300">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[600px]">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-700 h-96 md:h-[500px] lg:h-[600px]">
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                  title={`${businessName} Standort`}
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Karte nicht verfügbar</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:overflow-y-auto lg:h-[600px] lg:pr-2">
            {/* Address Card */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Adresse</h3>
              </div>
              <p className="text-gray-300 mb-4 whitespace-pre-line">
                {address}
              </p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Route planen
              </a>
            </div>

            {/* Contact Card */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Kontakt</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Telefon</p>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-white font-semibold hover:text-blue-400 transition-colors"
                  >
                    {phone}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">E-Mail</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-white font-semibold hover:text-blue-400 transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            {openingHours && (
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Öffnungszeiten</h3>
                </div>
                <p className="text-gray-300 whitespace-pre-line">
                  {openingHours}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center">
              <h4 className="text-lg font-bold mb-2">{ctaText}</h4>
              <p className="text-blue-100 text-sm mb-4">
                Rufen Sie uns an oder kommen Sie vorbei
              </p>
              <a
                href={ctaLink}
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
