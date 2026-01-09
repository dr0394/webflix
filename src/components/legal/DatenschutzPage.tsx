import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database, Cookie, UserCheck, Mail, FileText, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DatenschutzPage = () => {
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
            <Shield className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400 font-semibold">Datenschutz</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Datenschutzerklärung</h1>
          <p className="text-white/60 text-lg">
            Ihre Privatsphäre ist uns wichtig
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">1. Datenschutz auf einen Blick</h2>
            </div>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
                  Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Datenerfassung auf dieser Website</h3>
                <p className="mb-3">
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                </p>
                <p className="mb-3">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
                </p>
                <p className="mb-3">
                  <strong>Wie erfassen wir Ihre Daten?</strong>
                </p>
                <p className="mb-3">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um
                  Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p>
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                  IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
                  Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Wofür nutzen wir Ihre Daten?</h3>
                <p>
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website
                  Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für
                  Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                  Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
                  können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                  bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                  Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">2. Hosting</h2>
            </div>

            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v.a. um IP-Adressen,
                Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und
                sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <p>
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
                bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
                effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            </div>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
                  dieser Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Hinweis zur verantwortlichen Stelle</h3>
                <p className="mb-3">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p>Marcel Waschnewski</p>
                  <p>Florastr. 88</p>
                  <p>42553 Velbert</p>
                  <p className="mt-3">
                    E-Mail: <a href="mailto:support@webflix.info" className="text-pink-400 hover:text-pink-300">support@webflix.info</a>
                  </p>
                </div>
                <p className="mt-3">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
                  über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Speicherdauer</h3>
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
                  Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
                  berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
                  werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung
                  Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
                  letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p>
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
                  bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
                  Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                <p className="mb-3">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                  Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
                  oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger
                  verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">4. Datenerfassung auf dieser Website</h2>
            </div>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
                  inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
                  von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="mt-3">
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
                  mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
                  erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an
                  der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                  Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Anfrage per E-Mail, Telefon oder Telefax</h3>
                <p>
                  Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus
                  hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei
                  uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-400/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">5. Analyse-Tools und Werbung</h2>
            </div>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Meta Pixel (ehemals Facebook Pixel)</h3>
                <p className="mb-3">
                  Diese Website nutzt zur Konversionsmessung das Besucheraktions-Pixel von Meta (Facebook). Anbieter dieses
                  Dienstes ist die Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland.
                </p>
                <p className="mb-3">
                  So kann das Verhalten der Seitenbesucher nachverfolgt werden, nachdem diese durch Klick auf eine
                  Facebook-Werbeanzeige auf die Website des Anbieters weitergeleitet wurden. Dadurch können die Wirksamkeit
                  der Facebook-Werbeanzeigen für statistische und Marktforschungszwecke ausgewertet werden und zukünftige
                  Werbemaßnahmen optimiert werden.
                </p>
                <p className="mb-3">
                  Die erhobenen Daten sind für uns als Betreiber dieser Website anonym, wir können keine Rückschlüsse auf
                  die Identität der Nutzer ziehen. Die Daten werden aber von Facebook gespeichert und verarbeitet, sodass
                  eine Verbindung zum jeweiligen Nutzerprofil möglich ist und Facebook die Daten für eigene Werbezwecke,
                  entsprechend der Facebook-Datenverwendungsrichtlinie verwenden kann.
                </p>
                <p className="mb-3">
                  Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
                  berechtigtes Interesse an effektiven Werbemaßnahmen unter Einschluss der sozialen Medien. Sofern eine
                  entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von
                  Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold mb-2">Datenübermittlung in die USA:</p>
                  <p>
                    Meta ist unter dem EU-US Data Privacy Framework zertifiziert. Details:
                    <a href="https://www.dataprivacyframework.gov/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 ml-1">
                      https://www.dataprivacyframework.gov/
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">Google Ads und Google Conversion-Tracking</h3>
                <p className="mb-3">
                  Diese Website verwendet Google Ads. Google Ads ist ein Online-Werbeprogramm der Google Ireland Limited,
                  Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="mb-3">
                  Im Rahmen von Google Ads nutzen wir das Conversion-Tracking. Wenn Sie auf eine von Google geschaltete
                  Anzeige klicken, wird ein Cookie für das Conversion-Tracking gesetzt. Bei Cookies handelt es sich um
                  kleine Textdateien, die der Internet-Browser auf dem Computer des Nutzers ablegt.
                </p>
                <p className="mb-3">
                  Die durch das Cookie erzeugten Informationen über die Benutzung dieser Website werden in der Regel an
                  einen Server von Google in den USA übertragen und dort gespeichert.
                </p>
                <p className="mb-3">
                  Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO
                  und § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold mb-2">Datenübermittlung in die USA:</p>
                  <p>
                    Google ist unter dem EU-US Data Privacy Framework zertifiziert. Details:
                    <a href="https://www.dataprivacyframework.gov/" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 ml-1">
                      https://www.dataprivacyframework.gov/
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg mb-3">TikTok Pixel</h3>
                <p className="mb-3">
                  Wir verwenden auf unserer Website das TikTok Pixel. Anbieter ist die TikTok Technology Limited,
                  10 Earlsfort Terrace, Dublin, D02 T380, Irland.
                </p>
                <p className="mb-3">
                  TikTok kann über das Pixel das Verhalten der Besucher, die über eine TikTok-Anzeige auf diese Website
                  gelangt sind, nachverfolgen. Dadurch können die Werbeanzeigen von TikTok analysiert und für statistische
                  und Marktforschungszwecke ausgewertet werden.
                </p>
                <p className="mb-3">
                  Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
                  berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sein Webangebot und seine Werbung zu
                  optimieren. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
                  ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="font-semibold mb-2">Datenübermittlung in die USA:</p>
                  <p>
                    TikTok kann Daten auch in die USA übertragen. Die Datenübermittlung in die USA wird auf die
                    Standardvertragsklauseln der EU-Kommission gestützt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">6. Cookies</h2>
            </div>

            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf
                Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell
                ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="font-semibold mb-2">Cookie-Einstellungen verwalten:</p>
                <p>
                  Sie können Ihre Cookie-Einstellungen jederzeit über unsere Website anpassen oder Cookies in Ihren
                  Browser-Einstellungen blockieren.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-2xl font-bold">7. Ihre Rechte</h2>
            </div>

            <div className="text-white/80 leading-relaxed space-y-4">
              <p>Sie haben folgende Rechte:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Recht auf Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)</li>
                <li>Recht auf Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
                <p className="font-semibold mb-2">Kontakt für Datenschutzanfragen:</p>
                <p>
                  E-Mail: <a href="mailto:support@webflix.info" className="text-pink-400 hover:text-pink-300">support@webflix.info</a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-pink-400/30 rounded-2xl p-8 text-center">
            <p className="text-white/60 text-sm">
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-white/40 text-xs mt-4">
              Diese Datenschutzerklärung wurde mit Sorgfalt erstellt und berücksichtigt die DSGVO-Anforderungen.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => navigate('/impressum')}
              className="px-6 py-3 border-2 border-white/20 hover:border-pink-400/50 text-white font-semibold rounded-xl transition-all"
            >
              Impressum
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

export default DatenschutzPage;
