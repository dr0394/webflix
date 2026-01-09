import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich bei Ihnen.');
  };

  return (
    <section id="kontakt" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Kontakt
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Lassen Sie uns sprechen
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Haben Sie Fragen oder benötigen Sie ein Angebot? Kontaktieren Sie uns
            und wir beraten Sie gerne persönlich.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Adresse</h3>
                  <p className="text-gray-600">
                    Elektrostraße 42<br />
                    12345 Musterstadt<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Telefon</h3>
                  <p className="text-gray-600">
                    <a href="tel:+491234567890" className="hover:text-amber-600 transition-colors font-medium">
                      +49 123 456 7890
                    </a><br />
                    <span className="text-sm">24/7 Notdienst verfügbar</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">E-Mail</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@elektroprofi.de" className="hover:text-amber-600 transition-colors">
                      info@elektroprofi.de
                    </a><br />
                    <span className="text-sm">Antwort binnen 24 Stunden</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Öffnungszeiten</h3>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Montag - Freitag:</span>
                      <span className="font-medium">7:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samstag:</span>
                      <span className="font-medium">Nach Vereinbarung</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Notdienst:</span>
                      <span className="font-medium text-red-600">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Angebot anfragen</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                      placeholder="ihre@email.de"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                      placeholder="+49 123 456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Gewünschte Leistung
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="installation">Elektroinstallation</option>
                    <option value="beleuchtung">Beleuchtung</option>
                    <option value="smart-home">Smart Home</option>
                    <option value="photovoltaik">Photovoltaik</option>
                    <option value="reparatur">Reparatur/Wartung</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Ihre Nachricht *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none resize-none"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Anfrage senden</span>
                  <Send size={20} />
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Mit dem Absenden akzeptieren Sie unsere Datenschutzbestimmungen
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
