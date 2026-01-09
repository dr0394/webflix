import React, { useState } from 'react';
import { ArrowLeft, FileText, ChevronDown, ChevronUp, Shield, Users, Lock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NutzungsbedingungenPage = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<number[]>([0, 1]);

  const toggleSection = (index: number) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter(i => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  const sections = [
    {
      title: '1. Geltungsbereich und Vertragspartner',
      icon: Shield,
      content: `Diese Nutzungsbedingungen regeln die Nutzung der Website www.webflix.info sowie aller damit verbundenen Dienstleistungen.

**Anbieter und Vertragspartner:**
Marcel Waschnewski
Florastr. 88
42553 Velbert
Deutschland
E-Mail: support@webflix.info

**Geltungsbereich:**
Diese Nutzungsbedingungen gelten für:
• Die Nutzung der Webflix-Website
• Alle Online-Services und Tools (Konfigurator, Demo-Bereiche)
• Die Nutzung bereitgestellter Websites nach Erwerb
• Den Zugang zum Kundenportal
• Die Nutzung von generierten Website-Codes

**Ergänzende Regelungen:**
Zusätzlich zu diesen Nutzungsbedingungen gelten:
• Die Allgemeinen Geschäftsbedingungen (AGB)
• Die Datenschutzerklärung
• Spezifische Produktbeschreibungen
• Individuelle Vereinbarungen im Einzelfall`
    },
    {
      title: '2. Registrierung und Nutzerkonto',
      icon: Users,
      content: `**Registrierungspflicht:**
Für die Nutzung bestimmter Services ist eine Registrierung erforderlich:
• Bestellung von Websites
• Zugang zum Kundenportal
• Verwaltung von Projekten
• Nutzung von Premium-Features

**Registrierungsprozess:**
1. Angabe korrekter und vollständiger Daten
2. Bestätigung der E-Mail-Adresse
3. Festlegung eines sicheren Passworts
4. Akzeptanz dieser Nutzungsbedingungen

**Anforderungen an Nutzerkonten:**
• Mindestens 8 Zeichen langes Passwort
• Kombination aus Buchstaben, Zahlen und Sonderzeichen empfohlen
• Eine Person pro Konto (keine geteilten Accounts)
• Bei Geschäftskonten: Berechtigung zur Vertretung des Unternehmens

**Pflichten des Nutzers:**
• Geheimhaltung der Zugangsdaten
• Unverzügliche Mitteilung bei Verdacht auf Missbrauch
• Regelmäßige Überprüfung der Kontoinformationen
• Aktualisierung persönlicher Daten
• Keine Weitergabe des Accounts an Dritte

**Sperrung und Löschung:**
Wir behalten uns vor, Nutzerkonten zu sperren oder zu löschen bei:
• Verstoß gegen diese Nutzungsbedingungen
• Bereitstellung falscher Daten
• Verdacht auf missbräuchliche Nutzung
• Inaktivität über 24 Monate
• Zahlungsausfall

**Löschung durch den Nutzer:**
Der Nutzer kann sein Konto jederzeit löschen durch:
• Selbstständige Löschung im Kundenportal
• E-Mail an support@webflix.info
• Nach Löschung bleiben gesetzliche Aufbewahrungspflichten unberührt`
    },
    {
      title: '3. Nutzung der Webflix-Website und Services',
      icon: FileText,
      content: `**Erlaubte Nutzung:**
Die Webflix-Website und ihre Services dürfen genutzt werden für:
• Information über unsere Dienstleistungen
• Bestellung von Website-Paketen
• Nutzung des Online-Konfigurators
• Ansicht von Demo-Websites
• Kontaktaufnahme mit dem Support
• Verwaltung bestellter Projekte
• Download gekaufter Websites

**Verbotene Aktivitäten:**
Folgende Handlungen sind ausdrücklich untersagt:

**Technische Manipulation:**
• Umgehung technischer Schutzmaßnahmen
• Reverse Engineering der Website-Technologie
• Automatisierte Datenextraktion (Scraping)
• DDoS-Angriffe oder ähnliche Störungen
• Einschleusen von Schadcode oder Malware
• Ausnutzung von Sicherheitslücken

**Missbrauch der Services:**
• Erstellung illegaler Inhalte
• Nutzung für betrügerische Zwecke
• Verletzung von Rechten Dritter
• Spam oder unerwünschte Massenkommunikation
• Verbreitung von Viren oder Schadsoftware
• Manipulation von Bewertungen oder Kommentaren

**Kommerzielle Beschränkungen:**
• Weiterverkauf von Website-Templates
• Anbieten als eigene Dienstleistung ohne Lizenz
• Kopieren und Verbreiten unserer Designs
• Nutzung für konkurrierende Services

**Folgen bei Verstößen:**
• Sofortige Sperrung des Accounts
• Löschung bereitgestellter Inhalte
• Keine Rückerstattung gezahlter Beträge
• Geltendmachung von Schadensersatzansprüchen
• Strafrechtliche Verfolgung bei schweren Verstößen`
    },
    {
      title: '4. Nutzungsrechte an erworbenen Websites',
      icon: CheckCircle2,
      content: `**Umfang der Nutzungsrechte:**
Nach vollständiger Bezahlung erhält der Kunde folgende Rechte:

**Erlaubt:**
• Kommerzielle Nutzung der erworbenen Website
• Hosting auf eigenen oder Drittanbieter-Servern
• Anpassung von Inhalten (Texte, Bilder, Farben)
• Kleinere Code-Anpassungen für eigene Zwecke
• Einbindung eigener Funktionen und Plugins
• Backup und Archivierung
• Übertragung auf einen Nachfolger bei Unternehmensverkauf

**Nicht erlaubt:**
• Weiterverkauf des Website-Codes als Template
• Lizenzierung an Dritte
• Nutzung als Basis für weitere kommerzielle Templates
• Entfernen von Copyright-Vermerken im Quellcode
• Reverse Engineering für Wettbewerbszwecke
• Behauptung eigener Urheberschaft am Design/Code
• Kopieren des Designs für andere Projekte

**Beschränkungen pro Lizenz:**
• Eine Lizenz = Eine Website
• Bei mehreren Projekten: Separate Lizenzen erforderlich
• Keine Nutzung für Agentur-Weiterverkauf ohne Partnerprogramm

**Open-Source-Komponenten:**
Die Website kann Open-Source-Komponenten enthalten:
• Diese unterliegen ihren jeweiligen Lizenzen
• Vollständige Lizenzinformationen in der Dokumentation
• Einhaltung der jeweiligen Lizenzbedingungen erforderlich

**Markenrechte:**
• "Webflix" ist eine geschützte Marke
• Nutzung des Namens nur mit ausdrücklicher Genehmigung
• Kein Anspruch auf den Markennamen bei Website-Verkauf

**Urheberrechtsvermerk:**
Im Quellcode der Website ist ein Copyright-Vermerk enthalten:
• Dieser darf nicht entfernt werden
• Ausnahme: Gegen Aufpreis (White-Label-Option)
• Unauffällige Platzierung im Footer oder Code-Kommentar`
    },
    {
      title: '5. Bereitgestellte Inhalte durch Nutzer',
      icon: Lock,
      content: `**Verantwortung für eigene Inhalte:**
Der Nutzer ist vollumfänglich verantwortlich für:
• Von ihm bereitgestellte Texte
• Hochgeladene Bilder und Grafiken
• Videos und Multimedia-Inhalte
• Logo und Branding-Materialien
• Kontaktinformationen
• Produktbeschreibungen

**Rechtliche Zusicherungen:**
Der Nutzer versichert, dass alle bereitgestellten Inhalte:
• Frei von Rechten Dritter sind
• Keine Urheberrechte verletzen
• Keine Markenrechte verletzen
• Keine Persönlichkeitsrechte verletzen
• Nicht gegen geltendes Recht verstoßen
• Nicht beleidigend, diskriminierend oder obszön sind

**Lizenzeinräumung an Webflix:**
Für die Erstellung der Website räumt der Nutzer uns ein:
• Nicht-exklusives Nutzungsrecht für Projektzwecke
• Recht zur Speicherung und Verarbeitung
• Recht zur Veröffentlichung im Rahmen der Website
• Recht zur Nutzung in Demo-Bereichen (nach Rücksprache)
• Recht zur Verwendung als Referenz (nach Zustimmung)

**Verbotene Inhalte:**
Folgende Inhalte sind ausdrücklich untersagt:
• Illegale Inhalte jeglicher Art
• Gewaltverherrlichung oder Extremismus
• Pornografische oder sexuell explizite Inhalte
• Hassrede oder diskriminierende Äußerungen
• Urheberrechtlich geschützte Werke ohne Lizenz
• Persönliche Daten Dritter ohne Einwilligung
• Spam oder irreführende Informationen
• Malware oder schädliche Software

**Prüfpflicht:**
• Wir prüfen Inhalte nicht vor Veröffentlichung
• Keine aktive Überwachungspflicht unsererseits
• Bei Hinweisen auf Verstöße: Unverzügliche Prüfung
• Recht zur Entfernung rechtswidriger Inhalte

**Freistellung:**
Der Nutzer stellt uns frei von:
• Ansprüchen Dritter wegen Rechtsverletzungen
• Kosten der Rechtsverteidigung
• Schadensersatzforderungen
• Behördlichen Sanktionen

**Haftung für Nutzerinhalte:**
• Keine Haftung für vom Nutzer bereitgestellte Inhalte
• Nutzer haftet allein für seine Inhalte
• Bei schweren Verstößen: Löschung und Accountsperrung`
    },
    {
      title: '6. Verfügbarkeit und technische Anforderungen',
      icon: AlertTriangle,
      content: `**Verfügbarkeit der Services:**
Wir bemühen uns um hohe Verfügbarkeit, garantieren jedoch keine:
• 100%ige Erreichbarkeit der Website
• Ununterbrochene Verfügbarkeit aller Services
• Fehlerfreie Funktion zu jeder Zeit

**Geplante Wartungsarbeiten:**
• Ankündigung mindestens 48 Stunden im Voraus
• Durchführung außerhalb der Hauptnutzungszeiten
• Dauer typischerweise unter 4 Stunden
• Information per E-Mail oder Website-Banner

**Ungeplante Ausfälle:**
Bei technischen Problemen:
• Schnellstmögliche Behebung
• Information über Status-Updates
• Keine Haftung für entgangenen Gewinn
• Keine Entschädigung bei kurzen Ausfällen

**Technische Anforderungen für Nutzer:**
Für optimale Nutzung erforderlich:
• Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
• Aktuelle Browser-Version (max. 2 Versionen alt)
• JavaScript aktiviert
• Cookies für Website-Funktionalität aktiviert
• Stabile Internetverbindung (mind. 2 Mbit/s)
• Bildschirmauflösung mind. 1024x768 Pixel

**Anforderungen für erworbene Websites:**
Die gelieferten Websites benötigen:
• Webserver mit PHP 7.4+ (falls dynamische Elemente)
• HTML5- und CSS3-fähiger Browser
• Optional: Node.js für Build-Prozesse
• Ausreichend Speicherplatz (mind. 50 MB)
• SSL-Zertifikat für HTTPS empfohlen

**Browser-Kompatibilität:**
Unsere Websites werden getestet in:
• Google Chrome (aktuelle Version)
• Mozilla Firefox (aktuelle Version)
• Safari (aktuelle Version)
• Microsoft Edge (aktuelle Version)
• Mobile Browser (iOS Safari, Chrome Mobile)

**Nicht unterstützt:**
• Internet Explorer (alle Versionen)
• Veraltete Browser-Versionen
• Browser mit deaktivierten Sicherheitsfeatures

**Performance-Erwartungen:**
• Ladezeit der Website: unter 3 Sekunden
• Optimiert für 3G/4G/5G mobile Verbindungen
• Responsive Design für alle Bildschirmgrößen
• Optimierte Bilder und Assets

**Änderungen der technischen Anforderungen:**
• Anpassung an neue Web-Standards
• Information bei wesentlichen Änderungen
• Aktualisierung dieser Bedingungen
• Übergangsfristen bei Breaking Changes`
    },
    {
      title: '7. Preise, Zahlung und Abonnements',
      icon: FileText,
      content: `**Preisgestaltung:**
• Alle Preise auf der Website sind Endpreise inkl. MwSt.
• Preise können sich jederzeit ändern
• Für laufende Verträge gilt der bei Abschluss gültige Preis
• Sonderangebote nur für begrenzte Zeit gültig

**Zahlungsmethoden:**
Akzeptierte Zahlungsarten:
• Kreditkarte (Visa, Mastercard, American Express)
• PayPal
• SEPA-Überweisung (Vorkasse)
• Stripe-Checkout
• Bei größeren Projekten: Rechnung nach Vereinbarung

**Zahlungsbedingungen:**
• Einmalige Käufe: Zahlung vor/bei Lieferung
• Custom-Projekte: 50% Anzahlung, 50% bei Fertigstellung
• Wartungsverträge: Monatliche oder jährliche Vorauszahlung
• Zahlungsfrist bei Rechnung: 14 Tage netto

**Abonnement-Services:**
Für wiederkehrende Leistungen gelten:

**Laufzeit:**
• Monatliche Abos: Automatische Verlängerung um 1 Monat
• Jährliche Abos: Automatische Verlängerung um 12 Monate
• Mindestlaufzeit je nach gewähltem Paket

**Kündigung von Abos:**
• Monatlich: Kündigung bis 3 Tage vor Verlängerung
• Jährlich: Kündigung bis 30 Tage vor Verlängerung
• Kündigungsform: E-Mail oder über Kundenportal
• Keine Rückerstattung für laufende Periode

**Preisanpassungen bei Abos:**
• Bei laufenden Abos: 30 Tage Ankündigungsfrist
• Sonderkündigungsrecht bei Preiserhöhung über 5%
• Information per E-Mail
• Neue Preise gelten ab nächster Verlängerung

**Zahlungsverzug:**
Bei nicht fristgerechter Zahlung:
• Mahnung per E-Mail
• Verzugszinsen: 5% über Basiszinssatz (Verbraucher)
• Verzugszinsen: 9% über Basiszinssatz (Unternehmer)
• Mahnpauschale: 5€ (erste Mahnung), 10€ (zweite Mahnung)
• Sperrung des Accounts nach 14 Tagen Verzug
• Einschaltung eines Inkassodienstleisters

**Rückerstattungen:**
• Verbraucher: Gemäß Widerrufsrecht (14 Tage)
• Nach Beginn der Leistungserbringung: Anteilige Erstattung
• Bei Mängeln: Erstattung nach Gewährleistungsrecht
• Freiwillige Kulanz-Erstattungen im Einzelfall
• Bearbeitungszeit: 14 Tage nach Genehmigung

**Gutscheine und Rabatte:**
• Nur ein Gutschein pro Bestellung
• Nicht kombinierbar mit anderen Aktionen (wenn nicht anders angegeben)
• Keine Barauszahlung möglich
• Gültigkeitsdauer auf Gutschein vermerkt
• Nicht übertragbar`
    },
    {
      title: '8. Support und Kommunikation',
      icon: Users,
      content: `**Support-Kanäle:**
Wir bieten Unterstützung über:
• E-Mail: support@webflix.info
• Kontaktformular auf der Website
• Kundenportal (für registrierte Nutzer)
• FAQ-Bereich und Dokumentation

**Support-Umfang:**
Kostenloser Support umfasst:
• Technische Hilfe bei der Nutzung erworbener Websites
• Fragen zur Bestellung und Lieferung
• Probleme mit dem Kundenportal
• Allgemeine Fragen zu unseren Services

**Nicht im kostenlosen Support enthalten:**
• Custom-Programmierung
• Inhaltliche Beratung für die Website
• Design-Änderungen über vereinbarten Umfang hinaus
• Installation und Konfiguration von Drittanbieter-Tools
• Training in Web-Technologien
• Fehlerbehebung bei vom Kunden verursachten Problemen

**Antwortzeiten:**
• Standardanfragen: 48 Stunden (Werktage)
• Technische Probleme: 24 Stunden (Werktage)
• Kritische Ausfälle: 4 Stunden (auch Wochenende)
• Premium-Kunden: Priorisierte Bearbeitung

**Support-Zeiten:**
• Montag bis Freitag: 9:00 - 18:00 Uhr
• Samstag: 10:00 - 16:00 Uhr
• Sonntag und Feiertage: Nur kritische Notfälle
• Antwort außerhalb dieser Zeiten am nächsten Werktag

**Kommunikationsrichtlinien:**
Wir erwarten von Nutzern:
• Höflichen und respektvollen Umgangston
• Klare Beschreibung des Problems/Anliegens
• Bereitstellung relevanter Informationen
• Geduld bei der Problemlösung

**Unzulässiges Verhalten:**
Wir behalten uns vor, Support zu verweigern bei:
• Beleidigungen oder Bedrohungen
• Spam oder wiederholten identischen Anfragen
• Unrealistischen oder überzogenen Forderungen
• Missbrauch des Support-Systems

**Premium-Support (optional):**
Für erweiterten Support buchbar:
• 24/7 Erreichbarkeit
• Garantierte Antwortzeit: 2 Stunden
• Persönlicher Ansprechpartner
• Telefonischer Support
• Proaktives Monitoring
• Monatliche Beratungsstunden inklusive

**Community und Ressourcen:**
Zusätzliche Hilfsquellen:
• Ausführliche Online-Dokumentation
• Video-Tutorials
• Code-Beispiele und Templates
• FAQ mit häufigen Fragen
• Best-Practice-Guides`
    },
    {
      title: '9. Datenschutz und Sicherheit',
      icon: Lock,
      content: `**Datenschutzgrundsätze:**
Wir verpflichten uns zu:
• Einhaltung der DSGVO
• Transparente Datenverarbeitung
• Minimale Datenerhebung
• Sichere Datenspeicherung
• Keine Weitergabe ohne Zustimmung

**Erhobene Daten:**
Wir verarbeiten:
• Account-Daten (Name, E-Mail, Passwort)
• Bestellinformationen
• Zahlungsdaten (über sichere Payment-Provider)
• Technische Daten (IP-Adresse, Browser, Gerät)
• Nutzungsverhalten auf der Website
• Support-Kommunikation

**Zweck der Datenverarbeitung:**
Ihre Daten werden verwendet für:
• Vertragserfüllung
• Bereitstellung unserer Services
• Rechnungsstellung
• Kundenkommunikation
• Verbesserung unserer Dienstleistungen
• Rechtliche Verpflichtungen

**Datenspeicherung:**
• Dauer: Solange für Vertragszweck erforderlich
• Gesetzliche Aufbewahrungsfristen: Bis zu 10 Jahre
• Nach Löschung: Nur anonymisierte Statistikdaten
• Backup-Aufbewahrung: 30 Tage

**Sicherheitsmaßnahmen:**
Wir setzen ein:
• SSL/TLS-Verschlüsselung
• Sichere Passwort-Hashing (bcrypt)
• Regelmäßige Sicherheits-Updates
• Firewall und DDoS-Schutz
• Zugriffskontrollen
• Regelmäßige Backups
• Monitoring und Intrusion Detection

**Ihre Rechte:**
Sie haben das Recht auf:
• Auskunft über gespeicherte Daten (Art. 15 DSGVO)
• Berichtigung falscher Daten (Art. 16 DSGVO)
• Löschung Ihrer Daten (Art. 17 DSGVO)
• Einschränkung der Verarbeitung (Art. 18 DSGVO)
• Datenübertragbarkeit (Art. 20 DSGVO)
• Widerspruch gegen Verarbeitung (Art. 21 DSGVO)
• Beschwerde bei Aufsichtsbehörde

**Ausübung Ihrer Rechte:**
Kontaktieren Sie uns unter:
• E-Mail: support@webflix.info
• Antwort innerhalb von 30 Tagen
• Identitätsprüfung zum Schutz Ihrer Daten

**Cookies und Tracking:**
• Essentielle Cookies: Immer aktiv
• Analyse-Cookies: Mit Ihrer Einwilligung
• Marketing-Cookies: Mit Ihrer Einwilligung
• Cookie-Einstellungen jederzeit änderbar

**Drittanbieter-Services:**
Wir nutzen Services von:
• Stripe (Zahlungsabwicklung)
• Supabase (Datenbank)
• Meta, Google, TikTok (Marketing-Pixel)
• Brevo (E-Mail-Versand)
Diese haben eigene Datenschutzrichtlinien.

**Detaillierte Informationen:**
Vollständige Datenschutzerklärung unter:
www.webflix.info/datenschutz`
    },
    {
      title: '10. Haftung und Gewährleistung',
      icon: AlertTriangle,
      content: `**Umfang der Leistungen:**
Unsere Haftung bezieht sich auf:
• Erstellung der Website gemäß Spezifikation
• Funktionstüchtigkeit bei Auslieferung
• Einhaltung zugesicherter Eigenschaften
• Ordnungsgemäße Bereitstellung der Services

**Gewährleistung:**
Für erworbene Websites gelten:
• Verbraucher: 24 Monate Gewährleistung
• Unternehmer: 12 Monate Gewährleistung
• Beginn: Ab Lieferung/Abnahme
• Umfang: Nach gesetzlichen Vorschriften

**Haftungsbeschränkungen:**
Unsere Haftung ist begrenzt auf:

**Unbeschränkte Haftung für:**
• Vorsatz und grobe Fahrlässigkeit
• Verletzung von Leben, Körper, Gesundheit
• Arglistiges Verschweigen von Mängeln
• Übernahme von Garantien
• Nach Produkthaftungsgesetz
• Verletzung wesentlicher Vertragspflichten

**Beschränkte Haftung:**
Bei leichter Fahrlässigkeit:
• Nur bei Verletzung wesentlicher Pflichten
• Begrenzt auf vertragstypischen Schaden
• Maximalbetrag: Auftragswert
• Keine Haftung für indirekte Schäden

**Ausschluss der Haftung für:**
• Vom Nutzer bereitgestellte Inhalte
• Änderungen durch Nutzer oder Dritte
• Unsachgemäße Verwendung
• Force Majeure (höhere Gewalt)
• Probleme bei Drittanbieter-Services
• Datenverlust bei fehlendem Backup
• Entgangener Gewinn
• Folgeschäden und mittelbare Schäden

**Haftung für Links:**
• Keine Verantwortung für externe Links
• Keine Kontrolle über verlinkte Inhalte
• Distanzierung von rechtswidrigen Inhalten
• Entfernung bei Kenntniserlangung

**Haftung für Nutzerverhalten:**
• Nutzer haftet für eigene Inhalte
• Nutzer haftet für Account-Missbrauch
• Freistellung von Ansprüchen Dritter
• Übernahme von Rechtsverteidigungskosten

**Verjährung:**
• Gewährleistungsansprüche: Nach gesetzlichen Fristen
• Schadensersatzansprüche: 3 Jahre ab Kenntnis
• Bei Vorsatz: 30 Jahre

**Beweislast:**
• Bei Verbrauchern: 6 Monate Beweislastumkehr
• Bei Unternehmern: Sofortige Beweislast beim Kunden
• Nach Abnahme: Beweislast beim Kunden

**Mängelanzeige:**
• Unverzügliche Rüge bei Entdeckung
• Schriftliche Beschreibung des Mangels
• Screenshots oder Videos als Nachweis
• Möglichkeit zur Nachbesserung gewähren`
    },
    {
      title: '11. Änderungen der Nutzungsbedingungen',
      icon: FileText,
      content: `**Recht zur Änderung:**
Wir behalten uns vor, diese Nutzungsbedingungen zu ändern:
• Bei rechtlichen Änderungen
• Bei Änderung unserer Services
• Bei Anpassung an Marktbedingungen
• Zur Klarstellung oder Verbesserung

**Änderungsverfahren:**

**Ankündigung:**
• Benachrichtigung per E-Mail
• Hinweis beim Login ins Kundenportal
• Veröffentlichung auf der Website
• Mindestens 30 Tage vor Inkrafttreten

**Zustimmung:**
• Fortsetzung der Nutzung gilt als Zustimmung
• Ausdrückliche Zustimmung kann erforderlich sein
• Widerspruchsrecht innerhalb von 30 Tagen

**Widerspruchsrecht:**
Bei Widerspruch gegen Änderungen:
• Kündigung zum Zeitpunkt des Inkrafttretens möglich
• Keine Verlängerung laufender Verträge
• Bereits bezahlte Leistungen bleiben gültig
• Rückerstattung anteiliger Gebühren bei Abos

**Bestandsschutz:**
• Laufende Verträge: Alte Bedingungen bis Vertragsende
• Neue Bestellungen: Neue Bedingungen ab Inkrafttreten
• Optionale Übernahme neuer Konditionen

**Versionshistorie:**
• Archivierung alter Versionen
• Verfügbar auf Anfrage
• Dokumentation aller Änderungen
• Gültige Version immer auf Website ersichtlich

**Wesentliche Änderungen:**
Bei grundlegenden Änderungen:
• Ausdrückliche Zustimmung erforderlich
• Sonderkündigungsrecht
• Detaillierte Erläuterung der Änderungen
• Vergleichsdarstellung alt/neu

**Sprachfassungen:**
• Deutsche Fassung ist maßgeblich
• Übersetzungen nur zur Information
• Bei Widersprüchen: Deutsche Version gilt`
    },
    {
      title: '12. Kündigung und Vertragsbeendigung',
      icon: XCircle,
      content: `**Kündigungsmöglichkeiten:**

**Durch den Nutzer:**
• Jederzeit möglich bei kostenlosen Services
• Bei Abos: Unter Einhaltung der Kündigungsfrist
• Bei Werkverträgen: Nur aus wichtigem Grund
• Löschung des Accounts führt zur Beendigung

**Durch Webflix:**
• Bei Verstoß gegen Nutzungsbedingungen
• Bei Zahlungsverzug
• Bei Missbrauch der Services
• Bei Inaktivität (nach Ankündigung)
• Aus wichtigem Grund (fristlos)

**Kündigungsfristen:**
• Monatliche Abos: 3 Tage vor Verlängerung
• Jährliche Abos: 30 Tage vor Verlängerung
• Wartungsverträge: 3 Monate zum Vertragsende
• Einzelprojekte: Keine ordentliche Kündigung

**Kündigungsform:**
Kündigung muss erfolgen:
• Schriftlich (E-Mail ausreichend)
• An: support@webflix.info
• Mit eindeutiger Identifikation
• Bestätigung innerhalb von 3 Werktagen

**Wichtiger Grund zur fristlosen Kündigung:**

**Durch Webflix:**
• Schwerwiegende Vertragsverletzung
• Illegale Nutzung der Services
• Rufschädigung von Webflix
• Zahlungsverzug über 4 Wochen
• Insolvenz des Kunden

**Durch den Nutzer:**
• Wesentliche Leistungsstörung ohne Abhilfe
• Unmöglichkeit der Leistungserbringung
• Schwerwiegende Mängel ohne Nachbesserung

**Folgen der Beendigung:**

**Sofort:**
• Sperrung des Zugangs zum Kundenportal
• Einstellung laufender Services
• Keine neuen Bestellungen möglich

**Innerhalb von 30 Tagen:**
• Download aller Projektdaten ermöglichen
• Bereitstellung finaler Rechnungen
• Abwicklung offener Zahlungen

**Nach 30 Tagen:**
• Löschung personenbezogener Daten (außer gesetzliche Aufbewahrung)
• Entfernung aller Nutzerinhalte
• Keine Wiederherstellung möglich

**Rückerstattungen bei Kündigung:**
• Werkverträge: Nur bei Mängeln
• Abos: Keine Erstattung laufender Periode
• Bei Kündigung durch Webflix aus wichtigem Grund: Keine Erstattung
• Bei Kündigung durch Nutzer wegen Mängel: Anteilige Erstattung

**Nutzungsrechte nach Beendigung:**
• Erworbene Websites: Nutzungsrecht bleibt bestehen
• Zugang zu Updates: Endet mit Kündigung
• Support: Endet mit Kündigung
• Dokumentation: Weiterhin verfügbar

**Wiederaufnahme:**
• Neue Registrierung jederzeit möglich
• Keine automatische Datenwiederherstellung
• Keine Übernahme alter Konditionen
• Prüfung bei vorherigem Verstoß`
    },
    {
      title: '13. Streitbeilegung und Gerichtsstand',
      icon: Shield,
      content: `**Anwendbares Recht:**
Für diese Nutzungsbedingungen gilt:
• Recht der Bundesrepublik Deutschland
• Ausschluss des UN-Kaufrechts
• Bei Verbrauchern: Zusätzlich zwingende Verbraucherschutzvorschriften

**Außergerichtliche Streitbeilegung:**

**Für Verbraucher:**
Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
https://ec.europa.eu/consumers/odr/

**Verbraucherschlichtung:**
Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

**Freiwillige Mediation:**
Bei Streitigkeiten sind wir bereit:
• Zunächst außergerichtliche Einigung zu versuchen
• Über einen neutralen Mediator zu verhandeln
• Kosten werden geteilt

**Gerichtsstand:**

**Für Verbraucher:**
• Wahlrecht des Verbrauchers
• Entweder am Wohnsitz des Verbrauchers
• Oder am Sitz des Anbieters (Velbert)

**Für Unternehmer:**
• Ausschließlicher Gerichtsstand: Velbert
• Bei juristischen Personen des öffentlichen Rechts
• Bei öffentlich-rechtlichen Sondervermögen
• Bei Personen ohne allgemeinen Gerichtsstand in Deutschland

**Internationale Aspekte:**
• Bei Kunden außerhalb Deutschlands: Deutsches Recht
• Zwingende Verbraucherschutzvorschriften des Wohnsitzlandes bleiben unberührt
• Gerichtsstand nach EU-Verordnungen

**Schiedsvereinbarung:**
• Keine generelle Schiedsklausel
• Im Einzelfall verhandelbar
• Schriftliche Vereinbarung erforderlich

**Kosten bei Rechtsstreit:**
• Jede Partei trägt eigene Anwaltskosten
• Gerichtskosten nach gesetzlichen Regelungen
• Bei unbegründeten Ansprüchen: Schadensersatz möglich

**Verjährungsfristen:**
• Gewährleistung: Nach gesetzlichen Fristen
• Schadensersatz: 3 Jahre ab Kenntnis
• Vertragsansprüche: 3 Jahre ab Fälligkeit

**Salvatorische Klausel:**
• Unwirksamkeit einzelner Bestimmungen berührt Rest nicht
• Ersatz durch rechtlich zulässige Regelung
• Regelungslücken werden geschlossen`
    },
    {
      title: '14. Sonstige Bestimmungen',
      icon: FileText,
      content: `**Übertragung von Rechten:**
• Nutzer darf Rechte nicht ohne Zustimmung übertragen
• Ausnahme: Bei Unternehmensverkauf mit allen Assets
• Webflix darf Rechte und Pflichten übertragen
• Information des Nutzers bei wesentlichen Änderungen

**Abtretungsverbot:**
• Keine Abtretung von Forderungen gegen Webflix
• Ausnahme: Mit schriftlicher Zustimmung
• Abtretung an Factoring-Unternehmen bleibt zulässig

**Aufrechnungsverbot:**
• Aufrechnung nur mit unbestrittenen Forderungen
• Oder rechtskräftig festgestellten Forderungen
• Zurückbehaltungsrecht nur bei Gegenforderungen aus demselben Vertrag

**Schriftformerfordernis:**
• Änderungen bedürfen der Schriftform
• E-Mail ist ausreichend
• Mündliche Nebenabreden sind unwirksam
• Ausnahme: Ausdrücklich schriftlich vereinbart

**Vertragssprache:**
• Deutsch ist Vertragssprache
• Übersetzungen dienen nur der Information
• Bei Widersprüchen gilt deutsche Fassung

**Vollständigkeit:**
Diese Nutzungsbedingungen zusammen mit:
• AGB
• Datenschutzerklärung
• Individuellen Vereinbarungen
stellen die vollständige Vereinbarung dar.

**Vorrang von Vereinbarungen:**
1. Individuelle schriftliche Vereinbarungen
2. Produktspezifische Bedingungen
3. Diese Nutzungsbedingungen
4. AGB
5. Gesetzliche Regelungen

**Kontaktinformationen:**
Bei Fragen zu diesen Nutzungsbedingungen:
• E-Mail: support@webflix.info
• Postadresse: Florastr. 88, 42553 Velbert
• Antwort innerhalb von 3 Werktagen

**Hinweis auf Verbraucherrechte:**
Verbraucher haben zusätzliche Rechte:
• Widerrufsrecht bei Fernabsatzverträgen
• Gewährleistung nach BGB
• Schutz vor unwirksamen Klauseln
• Informationspflichten des Unternehmers

**Besondere Hinweise:**
• Minderjährige benötigen Zustimmung der Erziehungsberechtigten
• Geschäftsfähigkeit wird vorausgesetzt
• Falschangaben können zur Kündigung führen

**Archivierung:**
• Vertragstexte werden nicht gespeichert
• Nutzer sollte Bestätigungs-E-Mails aufbewahren
• Zugang zu aktuellen Bedingungen jederzeit auf Website

**Gültigkeit:**
Diese Nutzungsbedingungen gelten ab:
${new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}

Vorherige Versionen sind damit außer Kraft gesetzt.`
    }
  ];

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
            <span className="text-pink-400 font-semibold">Nutzungsbedingungen</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Nutzungsbedingungen
          </h1>
          <p className="text-white/60 text-lg">
            Ausführliche Regelungen für die Nutzung von Webflix-Services
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-pink-400/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
            <div className="text-sm text-white/80">
              <p className="mb-3">
                <strong className="text-white text-base">Wichtige Information:</strong>
              </p>
              <p className="mb-2">
                Diese Nutzungsbedingungen regeln die Verwendung der Webflix-Website und aller damit verbundenen Dienstleistungen.
              </p>
              <p>
                <strong>Stand:</strong> {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-left flex-1">{section.title}</h3>
                  {expandedSections.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  )}
                </button>
                {expandedSections.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="text-white/80 leading-relaxed whitespace-pre-line prose prose-invert max-w-none">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <Users className="w-6 h-6 text-pink-400" />
            Fragen zu den Nutzungsbedingungen?
          </h3>
          <p className="text-white/80 mb-4">
            Bei Unklarheiten oder Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns gerne:
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

        <div className="mt-8 bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-pink-400/30 rounded-2xl p-6">
          <h4 className="font-bold mb-3 text-white">Weitere rechtliche Dokumente:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/agb')}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/30 rounded-xl transition-all text-sm font-semibold"
            >
              AGB
            </button>
            <button
              onClick={() => navigate('/datenschutz')}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/30 rounded-xl transition-all text-sm font-semibold"
            >
              Datenschutz
            </button>
            <button
              onClick={() => navigate('/impressum')}
              className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/30 rounded-xl transition-all text-sm font-semibold"
            >
              Impressum
            </button>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            Kontakt aufnehmen
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
            <a href="/nutzungsbedingungen" className="hover:text-white transition-colors">
              Nutzungsbedingungen
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

export default NutzungsbedingungenPage;
