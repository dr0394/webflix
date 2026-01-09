import React, { useState } from 'react';
import { ArrowLeft, FileText, Building2, User, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AGBPage = () => {
  const navigate = useNavigate();
  const [activeVersion, setActiveVersion] = useState<'consumer' | 'business'>('consumer');
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter(i => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const consumerSections = [
    {
      title: '§ 1 Geltungsbereich',
      content: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Erstellung und Bereitstellung von Websites, die zwischen Marcel Waschnewski (nachfolgend "Anbieter") und Verbrauchern (nachfolgend "Kunde") geschlossen werden.

Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.`
    },
    {
      title: '§ 2 Vertragsgegenstand',
      content: `Der Anbieter erstellt und liefert Websites nach Kundenwunsch. Das Angebot umfasst:

• Webflix-Standardpakete (Starter, Professional, Premium)
• Custom-Websites nach individueller Anforderung
• Website-Konfigurationen über den Online-Konfigurator
• Zusatzleistungen und Add-ons

Die genaue Leistungsbeschreibung ergibt sich aus der jeweiligen Produktbeschreibung auf der Website oder dem individuellen Angebot.`
    },
    {
      title: '§ 3 Vertragsschluss',
      content: `Die Präsentation der Produkte auf der Website stellt kein rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Bestellung.

Durch Anklicken des Buttons "Jetzt kaufen", "Bestellen" oder vergleichbarer Buttons gibt der Kunde ein verbindliches Angebot zum Abschluss eines Kaufvertrages ab.

Der Vertragsschluss erfolgt durch die Bestätigung der Bestellung per E-Mail (Auftragsbestätigung). Mit dieser Auftragsbestätigung kommt der Vertrag zustande.`
    },
    {
      title: '§ 4 Preise und Zahlungsbedingungen',
      content: `Alle Preise sind Endpreise und verstehen sich inklusive der gesetzlichen Mehrwertsteuer.

Zahlungsarten:
• Kreditkarte (Visa, Mastercard)
• PayPal
• Überweisung (Vorkasse)
• Stripe-Payment

Bei Zahlart Vorkasse wird die Bankverbindung mit der Auftragsbestätigung mitgeteilt. Die Zahlung ist innerhalb von 7 Tagen fällig.

Bei Custom-Projekten kann eine Anzahlung von 50% vereinbart werden. Der Restbetrag wird nach Fertigstellung fällig.`
    },
    {
      title: '§ 5 Lieferung und Leistungserbringung',
      content: `Die Lieferfristen sind in der jeweiligen Produktbeschreibung angegeben:

• Webflix Starter: 7 Werktage
• Webflix Professional: 14 Werktage
• Webflix Premium: 21 Werktage
• Custom-Projekte: Nach individueller Vereinbarung

Die Lieferung erfolgt digital per Download-Link oder durch Bereitstellung auf einem Server.

Die Website wird als ZIP-Paket oder als gehostete Lösung übergeben, je nach gewähltem Paket.`
    },
    {
      title: '§ 6 Mitwirkungspflichten des Kunden',
      content: `Der Kunde ist verpflichtet:

• Vollständige und korrekte Informationen für die Website-Erstellung bereitzustellen
• Texte, Bilder und andere Inhalte rechtzeitig zu liefern
• Notwendige Zugangsdaten zu übermitteln
• Feedback innerhalb von 7 Tagen zu geben
• Die Checkliste vollständig auszufüllen

Bei Verzögerungen durch den Kunden verlängern sich die Lieferfristen entsprechend.`
    },
    {
      title: '§ 7 Widerrufsrecht',
      content: `Verbraucher haben ein gesetzliches Widerrufsrecht.

WIDERRUFSBELEHRUNG:

Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.

Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.

Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Marcel Waschnewski, Florastr. 88, 42553 Velbert, E-Mail: support@webflix.info) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.

Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.

FOLGEN DES WIDERRUFS:

Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.

VORZEITIGES ERLÖSCHEN DES WIDERRUFSRECHTS:

Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen, wenn der Unternehmer die Dienstleistung vollständig erbracht hat und mit der Ausführung der Dienstleistung erst begonnen hat, nachdem der Verbraucher dazu seine ausdrückliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung durch den Unternehmer verliert.`
    },
    {
      title: '§ 8 Gewährleistung',
      content: `Es gelten die gesetzlichen Gewährleistungsrechte.

Bei Mängeln hat der Kunde Anspruch auf:
1. Nacherfüllung (Nachbesserung oder Neulieferung)
2. Bei Fehlschlagen der Nacherfüllung: Minderung oder Rücktritt

Gewährleistungsausschluss für:
• Vom Kunden bereitgestellte Inhalte
• Mängel durch unsachgemäße Nutzung
• Nachträgliche Änderungen durch den Kunden oder Dritte

Die Gewährleistungsfrist beträgt 24 Monate ab Lieferung.`
    },
    {
      title: '§ 9 Änderungswünsche',
      content: `Im Paket enthaltene Änderungen:
• Webflix Starter: 2 Änderungsrunden
• Webflix Professional: 4 Änderungsrunden
• Webflix Premium: Unbegrenzte Änderungen im ersten Monat

Weitere Änderungswünsche können kostenpflichtig beauftragt werden:
• Kleine Änderungen: 29€ pro Änderung
• Mittlere Änderungen: 79€ pro Änderung
• Große Änderungen: Nach Aufwand

Änderungswünsche müssen schriftlich per E-Mail erfolgen.`
    },
    {
      title: '§ 10 Urheberrechte und Nutzungsrechte',
      content: `Der Anbieter räumt dem Kunden nach vollständiger Bezahlung ein einfaches, nicht-exklusives Nutzungsrecht an der erstellten Website ein.

Der Kunde erhält das Recht:
• Die Website kommerziell zu nutzen
• Die Website auf eigenen Servern zu hosten
• Kleinere inhaltliche Änderungen vorzunehmen

Nicht gestattet ist:
• Die Weitergabe oder der Verkauf des Website-Codes
• Die Verwendung als Template für weitere Projekte
• Das Entfernen von Copyright-Vermerken im Quellcode

Vom Kunden bereitgestellte Inhalte müssen frei von Rechten Dritter sein.`
    },
    {
      title: '§ 11 Haftung',
      content: `Der Anbieter haftet unbeschränkt:
• Bei Vorsatz und grober Fahrlässigkeit
• Bei Verletzung von Leben, Körper oder Gesundheit
• Nach den Vorschriften des Produkthaftungsgesetzes

Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). Die Haftung ist dabei auf den vertragstypischen, vorhersehbaren Schaden begrenzt.

Im Übrigen ist die Haftung ausgeschlossen.`
    },
    {
      title: '§ 12 Datenschutz',
      content: `Die Verarbeitung personenbezogener Daten erfolgt nach den Bestimmungen der DSGVO.

Detaillierte Informationen finden Sie in unserer Datenschutzerklärung unter www.webflix.info/datenschutz

Der Kunde versichert, dass alle von ihm bereitgestellten Inhalte datenschutzkonform sind.`
    },
    {
      title: '§ 13 Streitbeilegung',
      content: `Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/

Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`
    },
    {
      title: '§ 14 Schlussbestimmungen',
      content: `Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.

Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.

Änderungen dieser AGB werden dem Kunden per E-Mail mitgeteilt. Sie gelten als genehmigt, wenn der Kunde nicht innerhalb von 6 Wochen widerspricht.`
    }
  ];

  const businessSections = [
    {
      title: '§ 1 Geltungsbereich',
      content: `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Erstellung und Bereitstellung von Websites und digitalen Dienstleistungen, die zwischen Marcel Waschnewski (nachfolgend "Auftragnehmer") und Unternehmern (nachfolgend "Auftraggeber") geschlossen werden.

Unternehmer ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.

Entgegenstehende oder abweichende AGB des Auftraggebers werden nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.`
    },
    {
      title: '§ 2 Leistungsumfang',
      content: `Der Auftragnehmer erbringt folgende Leistungen:

1. Website-Erstellung nach Spezifikation
   • Webflix-Pakete (Starter, Professional, Premium)
   • Custom-Entwicklungen nach Lastenheft
   • Responsive Design für alle Endgeräte

2. Hosting-Services (optional)
   • Bereitstellung von Webspace
   • Domain-Verwaltung
   • SSL-Zertifikate

3. Wartung und Support (optional)
   • Technischer Support
   • Updates und Sicherheitspatches
   • Backup-Services

4. Zusatzleistungen
   • SEO-Optimierung
   • Content-Management-System-Integration
   • E-Commerce-Funktionen
   • Custom-Features nach Vereinbarung

Der genaue Leistungsumfang ergibt sich aus dem individuellen Angebot bzw. der Leistungsbeschreibung.`
    },
    {
      title: '§ 3 Vertragsschluss und Angebote',
      content: `Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern nicht ausdrücklich als verbindlich gekennzeichnet.

Der Vertrag kommt zustande durch:
• Annahme eines schriftlichen Angebots durch den Auftraggeber
• Schriftliche Auftragsbestätigung durch den Auftragnehmer
• Tatsächliche Leistungserbringung mit Billigung des Auftraggebers

Bei Online-Bestellungen über die Website gilt:
Die Darstellung der Produkte stellt kein bindendes Angebot dar. Durch Absenden der Bestellung gibt der Auftraggeber ein verbindliches Angebot ab. Der Vertrag kommt durch Auftragsbestätigung per E-Mail zustande.

Änderungen und Ergänzungen des Vertrages bedürfen der Schriftform.`
    },
    {
      title: '§ 4 Vergütung und Zahlungsbedingungen',
      content: `Die Vergütung richtet sich nach der Preisliste bzw. dem individuellen Angebot. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer.

Zahlungsmodalitäten:

• Standardprojekte: Zahlung vor Leistungserbringung oder bei Lieferung
• Custom-Projekte über 2.500€:
  - 50% Anzahlung bei Auftragserteilung
  - 50% bei Fertigstellung/Abnahme
• Wartungsverträge: Monatliche/jährliche Vorauszahlung

Zahlungsfrist: 14 Tage netto ab Rechnungsdatum

Bei Zahlungsverzug:
• Verzugszinsen: 9 Prozentpunkte über Basiszinssatz p.a.
• Pauschale für Mahnkosten: 40€
• Recht zur Einstellung der Arbeiten
• Recht zur außerordentlichen Kündigung

Aufrechnung nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen.`
    },
    {
      title: '§ 5 Leistungserbringung und Fristen',
      content: `Lieferfristen nach Paket:
• Webflix Starter: 7 Werktage
• Webflix Professional: 14 Werktage
• Webflix Premium: 21 Werktage
• Custom-Projekte: Nach Vereinbarung im Projektplan

Lieferfristen beginnen:
• Nach vollständiger Bereitstellung aller erforderlichen Unterlagen durch den Auftraggeber
• Nach Eingang der vereinbarten Anzahlung
• Nach Klärung aller technischen und inhaltlichen Fragen

Leistungshindernisse:
Bei höherer Gewalt, Streik, Aussperrung oder anderen unvorhersehbaren Ereignissen verlängern sich die Fristen angemessen.

Die Leistung gilt als erbracht mit:
• Bereitstellung des Download-Links für Website-Dateien
• Aktivierung der gehosteten Website
• Übergabe der Website gemäß Vereinbarung`
    },
    {
      title: '§ 6 Mitwirkungspflichten des Auftraggebers',
      content: `Der Auftraggeber verpflichtet sich zur aktiven Mitarbeit:

1. Bereitstellung von Inhalten:
   • Texte in finaler Form
   • Bilder in ausreichender Qualität (mind. 1920px Breite)
   • Logos im Vektorformat
   • Videos, falls erforderlich
   • Zugangsdaten zu bestehenden Systemen

2. Rechtzeitiges Feedback:
   • Rückmeldung zu Entwürfen innerhalb von 7 Werktagen
   • Konkrete Änderungswünsche schriftlich per E-Mail
   • Finale Abnahme innerhalb von 14 Tagen

3. Technische Voraussetzungen:
   • Bereitstellung von Domain-Zugängen
   • Hosting-Zugangsdaten (falls erforderlich)
   • API-Keys für Drittanbieter-Services

4. Rechtliche Absicherung:
   • Bestätigung der Nutzungsrechte an bereitgestellten Materialien
   • Prüfung und Freigabe rechtlicher Inhalte (Impressum, Datenschutz)

Bei Verzögerungen durch den Auftraggeber:
• Verlängerung der Lieferfristen entsprechend der Verzögerung
• Bei Verzögerung über 4 Wochen: Recht zur Rechnungsstellung für erbrachte Teilleistungen
• Bei Verzögerung über 8 Wochen: Außerordentliches Kündigungsrecht`
    },
    {
      title: '§ 7 Abnahme',
      content: `Die Abnahme erfolgt in folgenden Schritten:

1. Präsentation der Website auf Testumgebung
2. Prüfung durch den Auftraggeber (7 Werktage)
3. Meldung von Mängeln oder Abnahme

Die Abnahme gilt als erklärt, wenn:
• Der Auftraggeber die Abnahme schriftlich erklärt
• Der Auftraggeber die Website produktiv nutzt
• Der Auftraggeber nicht innerhalb von 14 Tagen nach Bereitstellung Mängel rügt

Kleinere Mängel berechtigen nicht zur Verweigerung der Abnahme.

Nach Abnahme hat der Auftraggeber die vereinbarte Restzahlung zu leisten.`
    },
    {
      title: '§ 8 Änderungen und Zusatzleistungen',
      content: `Im Paket enthaltene Änderungsrunden:
• Starter: 2 Änderungsrunden
• Professional: 4 Änderungsrunden
• Premium: Unbegrenzt im ersten Monat

Darüber hinausgehende Änderungen:
• Werden nach Aufwand abgerechnet
• Stundensatz: 95€ netto
• Schriftliche Beauftragung erforderlich
• Mindestabrechnung: 0,5 Stunden

Wesentliche Änderungen des Leistungsumfangs:
• Erfordern schriftliche Vertragsänderung
• Anpassung von Vergütung und Fristen
• Separate Kalkulation als Zusatzauftrag

Change-Request-Prozess:
1. Schriftliche Beschreibung der gewünschten Änderung
2. Aufwandsschätzung durch Auftragnehmer
3. Freigabe durch Auftraggeber
4. Umsetzung nach Freigabe`
    },
    {
      title: '§ 9 Gewährleistung',
      content: `Gewährleistungsfrist: 12 Monate ab Abnahme

Mängelansprüche:
Der Auftragnehmer gewährleistet, dass die Website:
• Den vereinbarten Spezifikationen entspricht
• Frei von Rechts- und Sachmängeln ist
• In gängigen Browsern funktionsfähig ist

Bei Mängeln:
1. Recht auf Nacherfüllung (zweimalig)
2. Bei Fehlschlagen: Minderung oder Rücktritt möglich

Ausschluss der Gewährleistung:
• Inhalte des Auftraggebers
• Änderungen durch Auftraggeber oder Dritte
• Unsachgemäße Nutzung
• Höhere Gewalt
• Nicht vertragsgemäße Verwendung

Mängelrüge:
Mängel sind unverzüglich schriftlich zu rügen mit genauer Beschreibung.

Verjährung:
Gewährleistungsansprüche verjähren 12 Monate nach Abnahme.`
    },
    {
      title: '§ 10 Haftung',
      content: `Unbeschränkte Haftung:
• Vorsatz und grobe Fahrlässigkeit
• Verletzung von Leben, Körper, Gesundheit
• Arglistiges Verschweigen von Mängeln
• Übernahme von Garantien
• Produkthaftungsgesetz

Beschränkte Haftung:
Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur:
• Bei Verletzung wesentlicher Vertragspflichten
• Beschränkt auf vertragstypischen, vorhersehbaren Schaden
• Maximale Haftungssumme: Auftragswert

Ausschluss der Haftung:
• Datenverlust (soweit durch Backup vermeidbar)
• Indirekte Schäden, Folgeschäden, entgangener Gewinn
• Schäden durch Inhalte des Auftraggebers
• Schäden durch mangelhafte Mitwirkung

Die Haftungsbeschränkungen gelten auch für persönliche Haftung von Mitarbeitern und Erfüllungsgehilfen.`
    },
    {
      title: '§ 11 Urheberrechte und Nutzungsrechte',
      content: `Alle Rechte an der erstellten Website verbleiben beim Auftragnehmer bis zur vollständigen Bezahlung.

Nach vollständiger Bezahlung:
Der Auftraggeber erhält ein nicht-exklusives, zeitlich und räumlich unbeschränktes Nutzungsrecht für:
• Kommerzielle Nutzung der Website
• Hosting auf eigenen oder fremden Servern
• Anpassung von Inhalten

Nicht übertragen werden:
• Weiterverkauf des Website-Codes
• Nutzung als Template für weitere Projekte
• Verwendung einzelner Komponenten in anderen Projekten
• Sublizenzierung an Dritte

Quellenangaben:
Copyright-Vermerke im Quellcode dürfen nicht entfernt werden.

Rechte an verwendeten Komponenten:
• Open-Source-Komponenten: Gemäß jeweiliger Lizenz
• Stock-Fotos: Gemäß Lizenzbestimmungen
• Custom-Grafiken: Vollständige Rechteübertragung

Rechte an Inhalten des Auftraggebers:
Der Auftraggeber versichert, dass er alle erforderlichen Rechte an bereitgestellten Inhalten besitzt und stellt den Auftragnehmer von Ansprüchen Dritter frei.`
    },
    {
      title: '§ 12 Vertraulichkeit und Datenschutz',
      content: `Beide Parteien verpflichten sich:
• Vertrauliche Informationen geheim zu halten
• Nur für Vertragszwecke zu verwenden
• Nicht an Dritte weiterzugeben
• Nach Vertragsende zurückzugeben oder zu löschen

Vertrauliche Informationen:
• Geschäftsgeheimnisse
• Technische Dokumentationen
• Kundendaten
• Zugangsdaten

Ausnahmen:
• Gesetzliche Offenlegungspflichten
• Bereits öffentlich bekannte Informationen
• Von Dritten rechtmäßig erlangte Informationen

Datenschutz:
Die Verarbeitung personenbezogener Daten erfolgt gemäß DSGVO. Bei Auftragsverarbeitung wird ein separater Vertrag geschlossen (AVV).

Dauer der Vertraulichkeit:
Die Vertraulichkeitspflicht besteht über die Vertragslaufzeit hinaus für 3 Jahre.`
    },
    {
      title: '§ 13 Kündigung',
      content: `Ordentliche Kündigung:
• Nicht möglich bei Werkverträgen (Erstellung einer Website)
• Bei Wartungsverträgen: 3 Monate zum Vertragsende

Außerordentliche Kündigung:
Beide Parteien können aus wichtigem Grund fristlos kündigen.

Wichtige Gründe des Auftragnehmers:
• Zahlungsverzug über 4 Wochen trotz Mahnung
• Schwerwiegende Verletzung von Mitwirkungspflichten
• Insolvenz des Auftraggebers
• Unmöglichkeit der Leistungserbringung durch Auftraggeber

Wichtige Gründe des Auftraggebers:
• Unmöglichkeit der Leistungserbringung durch Auftragnehmer
• Schwerwiegende Mängel ohne Aussicht auf Nachbesserung

Folgen der Kündigung:
• Vergütung für erbrachte Teilleistungen
• Herausgabe aller Arbeitsergebnisse
• Keine Nutzungsrechte ohne vollständige Bezahlung

Kündigungsform:
Kündigungen bedürfen der Schriftform (E-Mail ausreichend).`
    },
    {
      title: '§ 14 Abtretung und Aufrechnung',
      content: `Abtretungsverbot:
Der Auftraggeber darf Rechte und Pflichten aus diesem Vertrag nicht ohne schriftliche Zustimmung des Auftragnehmers an Dritte abtreten.

Aufrechnungsverbot:
Aufrechnung ist nur zulässig mit:
• Unbestrittenen Forderungen
• Rechtskräftig festgestellten Forderungen
• Gegenforderungen aus demselben Vertragsverhältnis`
    },
    {
      title: '§ 15 Salvatorische Klausel',
      content: `Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, wird die Wirksamkeit der übrigen Bestimmungen dadurch nicht berührt.

An die Stelle der unwirksamen Bestimmung tritt eine Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.

Das Gleiche gilt für eventuelle Regelungslücken.`
    },
    {
      title: '§ 16 Gerichtsstand und anwendbares Recht',
      content: `Es gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.

Gerichtsstand:
Für alle Streitigkeiten aus diesem Vertrag ist bei Kaufleuten, juristischen Personen des öffentlichen Rechts oder öffentlich-rechtlichen Sondervermögen der Sitz des Auftragnehmers ausschließlicher Gerichtsstand.

Der Auftragnehmer ist berechtigt, auch am allgemeinen Gerichtsstand des Auftraggebers zu klagen.`
    }
  ];

  const currentSections = activeVersion === 'consumer' ? consumerSections : businessSections;

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
            <span className="text-pink-400 font-semibold">AGB</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Bitte wählen Sie die für Sie zutreffende Version
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button
              onClick={() => setActiveVersion('consumer')}
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all ${
                activeVersion === 'consumer'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-400 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:border-pink-400/30'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Für Verbraucher</span>
            </button>
            <button
              onClick={() => setActiveVersion('business')}
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all ${
                activeVersion === 'business'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-400 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:border-pink-400/30'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Für Unternehmer</span>
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
            <div className="text-sm text-white/70">
              <p className="mb-2">
                <strong className="text-white">Stand:</strong> {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                Diese AGB gelten für alle Verträge zwischen Marcel Waschnewski (Webflix) und {activeVersion === 'consumer' ? 'Verbrauchern' : 'Unternehmern'}.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {currentSections.map((section, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-bold text-left">{section.title}</h3>
                {expandedSections.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-pink-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-pink-400 flex-shrink-0" />
                )}
              </button>
              {expandedSections.includes(index) && (
                <div className="px-6 pb-6">
                  <div className="text-white/80 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-pink-400/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">Kontakt bei Fragen</h3>
          <p className="text-white/80 mb-4">
            Bei Fragen zu unseren AGB oder zu Ihrem Vertrag können Sie uns jederzeit kontaktieren:
          </p>
          <div className="space-y-2 text-white/70">
            <p>
              <strong className="text-white">Marcel Waschnewski</strong>
            </p>
            <p>Florastr. 88, 42553 Velbert</p>
            <p>
              E-Mail: <a href="mailto:support@webflix.info" className="text-pink-400 hover:text-pink-300">support@webflix.info</a>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={() => navigate('/impressum')}
            className="px-6 py-3 border-2 border-white/20 hover:border-pink-400/50 text-white font-semibold rounded-xl transition-all"
          >
            Impressum
          </button>
          <button
            onClick={() => navigate('/datenschutz')}
            className="px-6 py-3 border-2 border-white/20 hover:border-pink-400/50 text-white font-semibold rounded-xl transition-all"
          >
            Datenschutz
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            Kontakt
          </button>
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

export default AGBPage;
