import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const KontaktSection: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="kontakt-map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
            <MapPin className="w-5 h-5 text-[#2D5F3F]" />
            <span className="text-[#2D5F3F] font-semibold">Kontakt & Anfahrt</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wie Du an Dein <span className="text-[#2D5F3F]">Fleisch kommst</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            … ist mindestens genauso einfach
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-[#2D5F3F] mb-6">Besuche uns in unserem Store</h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">Adresse</p>
                    <p className="text-gray-700 font-medium">Nevigeser Str. 291</p>
                    <p className="text-gray-700 font-medium">42553 Velbert</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">Mobil</p>
                    <a href="tel:+491609508982​9" className="text-gray-700 font-medium hover:text-[#2D5F3F] transition-colors">
                      0160 950 898 29
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-1">Email</p>
                    <a href="mailto:hallo@zwickels.de" className="text-[#2D5F3F] font-medium hover:text-[#3E7C57] transition-colors text-lg">
                      hallo@zwickels.de
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Order */}
            <div className="bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Bestellungen & Lieferservice</h3>
              <p className="text-green-100 mb-6 text-lg">
                Telefonisch, über WhatsApp oder per E-Mail
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+491609508982​9"
                  className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  <span>Jetzt anrufen</span>
                </a>

                <a
                  href="https://wa.me/491609508982​9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>WhatsApp schreiben</span>
                </a>

                <a
                  href="mailto:hallo@zwickels.de"
                  className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3"
                >
                  <Mail className="w-6 h-6" />
                  <span>E-Mail senden</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Google Map */}
          <div className="lg:sticky lg:top-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.9234567890123!2d7.0521234567890!3d51.3398765432109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e1234567890a%3A0x1234567890abcdef!2sNevigeser%20Str.%20291%2C%2042553%20Velbert!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Zwickels Standort"
                className="w-full"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://maps.google.com/?q=Nevigeser+Str.+291+42553+Velbert"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] hover:from-[#3E7C57] hover:to-[#2D5F3F] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <MapPin className="w-5 h-5" />
                Route in Google Maps öffnen
              </a>
            </div>
          </div>
        </div>

        {/* Opening Hours Banner */}
        <div className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[#8BC34A] rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Öffnungszeiten</h3>
              <div className="grid md:grid-cols-2 gap-6 text-lg">
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                    <span className="text-gray-700 font-medium">Montag - Freitag</span>
                    <span className="font-bold text-[#2D5F3F]">7:00 - 18:30</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                    <span className="text-gray-700 font-medium">Samstag</span>
                    <span className="font-bold text-[#2D5F3F]">7:00 - 13:00</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-700 font-medium">Sonntag</span>
                    <span className="font-bold text-red-600">Geschlossen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KontaktSection;
