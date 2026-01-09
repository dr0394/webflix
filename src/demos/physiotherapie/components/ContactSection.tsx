import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="kontakt" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Kontakt
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Wir sind für Sie da
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Besuchen Sie uns in unserer modernen Praxis im Herzen der Stadt
            oder kontaktieren Sie uns telefonisch.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-3 rounded-xl">
                  <MapPin className="text-teal-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Adresse</h3>
                  <p className="text-gray-600">
                    Gesundheitsstraße 123<br />
                    12345 Musterstadt<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Telefon</h3>
                  <p className="text-gray-600">
                    <a href="tel:+4912345678" className="hover:text-teal-600 transition-colors">
                      +49 123 456 78
                    </a><br />
                    <span className="text-sm text-gray-500">Mo-Fr: 8:00-18:00 Uhr</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-100 p-3 rounded-xl">
                  <Mail className="text-cyan-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">E-Mail</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@physio-praxis.de" className="hover:text-teal-600 transition-colors">
                      info@physio-praxis.de
                    </a><br />
                    <span className="text-sm text-gray-500">Antwort binnen 24h</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-3 rounded-xl">
                  <Clock className="text-teal-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Öffnungszeiten</h3>
                  <div className="text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Montag - Freitag:</span>
                      <span className="font-medium">8:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samstag:</span>
                      <span className="font-medium">9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sonntag:</span>
                      <span className="font-medium">Geschlossen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-96 lg:h-full rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409788294243!2d13.404953999999999!3d52.520006999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort"
            />
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Haben Sie noch Fragen?
          </h3>
          <p className="text-lg sm:text-xl mb-6 text-teal-50">
            Unser Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns
            für ein unverbindliches Beratungsgespräch!
          </p>
          <a
            href="#termin"
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300"
          >
            Jetzt Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
