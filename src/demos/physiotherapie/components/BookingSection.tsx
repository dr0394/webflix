import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Vielen Dank für Ihre Terminanfrage! Wir melden uns schnellstmöglich bei Ihnen.');
  };

  return (
    <section id="termin" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Termin vereinbaren
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Buchen Sie Ihren Wunschtermin
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Füllen Sie einfach das Formular aus und wir melden uns schnellstmöglich
              bei Ihnen zur Terminbestätigung.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <User size={18} className="text-teal-600" />
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Mail size={18} className="text-teal-600" />
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                      placeholder="ihre@email.de"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Phone size={18} className="text-teal-600" />
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                      placeholder="+49 123 456789"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Calendar size={18} className="text-teal-600" />
                      Wunschdatum *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Clock size={18} className="text-teal-600" />
                      Uhrzeit *
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="08:00">08:00 Uhr</option>
                      <option value="09:00">09:00 Uhr</option>
                      <option value="10:00">10:00 Uhr</option>
                      <option value="11:00">11:00 Uhr</option>
                      <option value="14:00">14:00 Uhr</option>
                      <option value="15:00">15:00 Uhr</option>
                      <option value="16:00">16:00 Uhr</option>
                      <option value="17:00">17:00 Uhr</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <MessageSquare size={18} className="text-teal-600" />
                    Behandlungswunsch
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="krankengymnastik">Krankengymnastik</option>
                    <option value="manuelle-therapie">Manuelle Therapie</option>
                    <option value="elektrotherapie">Elektrotherapie</option>
                    <option value="lymphdrainage">Lymphdrainage</option>
                    <option value="massage">Massage</option>
                    <option value="sportphysio">Sportphysiotherapie</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    Nachricht (optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none resize-none"
                    placeholder="Haben Sie besondere Anliegen oder Fragen?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                >
                  Termin anfragen
                </button>
              </div>
            </form>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-6">Schnelle Terminvergabe</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Flexible Zeiten</h4>
                      <p className="text-teal-50">
                        Auch Abendtermine und Samstags möglich
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Kurzfristig</h4>
                      <p className="text-teal-50">
                        Oft schon am nächsten Tag Termine verfügbar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Phone className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Telefonisch</h4>
                      <p className="text-teal-50">
                        Rufen Sie uns an: +49 123 456 78
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl border border-teal-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hausbesuche möglich
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Sie sind nicht mobil oder haben Schwierigkeiten, unsere Praxis zu erreichen?
                  Wir kommen auch gerne zu Ihnen nach Hause!
                </p>
                <a
                  href="#kontakt"
                  className="inline-block text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                >
                  Mehr zu Hausbesuchen →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
