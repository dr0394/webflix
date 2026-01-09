import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const MapSection: React.FC = () => {
  const businessAddress = "Musterstraße 123, 12345 Musterstadt";
  const googleMapsUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyASzqnCrYBWXhFtdlXXBg_KCLxQTa1I5Y4&q=Musterstraße+123+12345+Musterstadt&maptype=roadmap";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessAddress)}`;
  
  return (
    <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-400/30 shadow-lg animate-glow flex items-center justify-center relative overflow-hidden border border-purple-400">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-shimmer"></div>
            <MapPin className="w-8 h-8 text-purple-300 relative z-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
            Besuchen Sie uns
          </h2>
          <p className="text-xl text-purple-100 font-poppins">
            BrandBuilder
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[600px]">
          {/* Map */}
          <div className="lg:col-span-2 lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden border border-white/50 relative h-96 md:h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-10 animate-shimmer"></div>
              <div className="relative z-10 h-full">
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                  title="BrandBuilder Standort"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 lg:overflow-y-auto lg:h-[600px] lg:pr-2">
            {/* Address Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-10 animate-shimmer"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">Adresse</h3>
                </div>
                <p className="text-slate-700 font-poppins mb-4">
                  Musterstraße 123<br />
                  12345 Musterstadt
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-poppins"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Route planen
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-10 animate-shimmer"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">Kontakt</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-slate-600 text-sm font-poppins">Telefon</p>
                    <a href="tel:01234567890" className="text-slate-900 font-semibold hover:text-purple-600 transition-colors font-poppins">
                      0123 456 7890
                    </a>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-poppins">E-Mail</p>
                    <a href="mailto:info@brandbuilder.de" className="text-slate-900 font-semibold hover:text-purple-600 transition-colors font-poppins break-all">
                      info@brandbuilder.de
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-10 animate-shimmer"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-poppins">Öffnungszeiten</h3>
                </div>
                <div className="space-y-2 text-slate-700 font-poppins">
                  <div className="flex justify-between">
                    <span>Mo - Fr:</span>
                    <span className="font-semibold">9:00 - 18:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag:</span>
                    <span className="font-semibold">10:00 - 14:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sonntag:</span>
                    <span className="font-semibold text-red-600">Geschlossen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white text-center">
              <h4 className="text-lg font-bold mb-2 font-poppins">Termin vereinbaren</h4>
              <p className="text-purple-100 text-sm mb-4 font-poppins">
                Rufen Sie uns an oder kommen Sie vorbei
              </p>
              <a
                href="/configurator"
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors font-poppins"
              >
                Website kaufen
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default MapSection;