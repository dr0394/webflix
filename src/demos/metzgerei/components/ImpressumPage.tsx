import React from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ImpressumPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#2D5F3F] text-white py-4">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/demo/metzgerei')}
            className="flex items-center gap-2 text-white hover:text-[#8BC34A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zur Startseite</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl font-bold text-[#2D5F3F] mb-12 text-center">
            Impressum
          </h1>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Angaben gemäß §5 TMG
            </h2>

            <div className="space-y-8">
              {/* Company Info */}
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <img
                    src="https://zwickels.de/wp-content/uploads/2021/02/cropped-image0-1.png"
                    alt="Zwickels Logo"
                    className="h-20 w-auto"
                  />
                </div>

                <div className="text-lg space-y-2">
                  <p className="font-bold text-2xl text-[#2D5F3F]">Zwickels e.K.</p>
                  <p className="font-semibold text-xl text-gray-800">Inhaber: Markus Zweverink</p>
                </div>

                <div className="space-y-1 text-gray-700 pt-4">
                  <p className="font-medium">Kreiersiepen 3</p>
                  <p className="font-medium">42555 Velbert</p>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Kontakt</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Telefon</p>
                      <a href="tel:+491609508982​9" className="text-lg font-semibold text-[#2D5F3F] hover:text-[#3E7C57] transition-colors">
                        +49 160 950 898 29
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">E-Mail</p>
                      <a href="mailto:hallo@zwickels.de" className="text-lg font-semibold text-[#2D5F3F] hover:text-[#3E7C57] transition-colors">
                        hallo@zwickels.de
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Info */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Registereintrag</h3>
                <div className="space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-700">
                    <Building className="w-5 h-5 text-[#2D5F3F]" />
                    <span className="font-medium">Registergericht:</span>
                    <span>Amtsgericht München</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-700">
                    <Building className="w-5 h-5 text-[#2D5F3F]" />
                    <span className="font-medium">Registernummer:</span>
                    <span>HRA 11111</span>
                  </div>
                </div>
              </div>

              {/* Store Address */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Unser Store</h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[#2D5F3F] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-[#2D5F3F] mb-2">Besuchen Sie uns:</p>
                      <p className="text-gray-700 font-medium">Nevigeser Str. 291</p>
                      <p className="text-gray-700 font-medium">42553 Velbert</p>
                      <a
                        href="https://maps.google.com/?q=Nevigeser+Str.+291+42553+Velbert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-[#2D5F3F] hover:text-[#3E7C57] font-semibold transition-colors"
                      >
                        Route planen →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Haftungsausschluss</h3>

                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Haftung für Inhalte</h4>
                    <p className="text-sm leading-relaxed">
                      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                      Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                      nach den allgemeinen Gesetzen verantwortlich.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Haftung für Links</h4>
                    <p className="text-sm leading-relaxed">
                      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
                      Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                      Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                      Seiten verantwortlich.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Urheberrecht</h4>
                    <p className="text-sm leading-relaxed">
                      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                      dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                      der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                      Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/demo/metzgerei')}
              className="bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] hover:from-[#3E7C57] hover:to-[#2D5F3F] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zur Startseite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
