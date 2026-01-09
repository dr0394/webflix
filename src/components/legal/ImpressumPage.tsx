import React from 'react';
import { ArrowLeft, Building2, Mail, MapPin, Phone, FileText, Scale, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ImpressumPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black text-white">
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zur Startseite</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-pink-400/20 border border-pink-400/30 rounded-full px-6 py-2 mb-6">
            <FileText className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400 font-semibold">Rechtliches</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Impressum</h1>
          <p className="text-white/60 text-lg">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">Angaben gemäß § 5 TMG</h2>
            </div>

            <div className="space-y-4 text-white/80 leading-relaxed">
              <div>
                <h3 className="font-semibold text-white mb-2">Betreiber und Verantwortlicher:</h3>
                <p>Marcel Waschnewski</p>
                <p>Florastr. 88</p>
                <p>42553 Velbert</p>
                <p>Deutschland</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">Kontakt</h2>
            </div>

            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pink-400" />
                <a href="mailto:support@webflix.info" className="hover:text-pink-400 transition-colors">
                  support@webflix.info
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">Umsatzsteuer-ID</h2>
            </div>

            <div className="text-white/80 leading-relaxed">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              </p>
              <p className="mt-2 text-white/60 italic">
                [Ihre USt-IdNr. hier einfügen, falls vorhanden]
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            </div>

            <div className="text-white/80 leading-relaxed">
              <p>Marcel Waschnewski</p>
              <p>Florastr. 88</p>
              <p>42553 Velbert</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">EU-Streitschlichtung</h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <p className="mt-4">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <div className="text-white/80 leading-relaxed">
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Haftung für Inhalte</h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Haftung für Links</h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                Links umgehend entfernen.
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Urheberrecht</h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
                Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
                auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-pink-400/30 rounded-2xl p-8 text-center">
            <p className="text-white/60 text-sm">
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
            </p>
            <p className="text-white/40 text-xs mt-4">
              Quelle: Erstellt mit Unterstützung eines Impressum-Generators
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => navigate('/datenschutz')}
              className="px-6 py-3 border-2 border-white/20 hover:border-pink-400/50 text-white font-semibold rounded-xl transition-all"
            >
              Datenschutzerklärung
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg"
            >
              Kontakt aufnehmen
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm mb-6">
            <a href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </a>
            <a href="/agb" className="hover:text-white transition-colors">
              AGB
            </a>
          </div>
          <div className="text-center text-white/60">
            <p>© 2025 Webflix. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImpressumPage;
