import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Was kostet die Website genau?",
    answer: "347€ einmalige Setup-Gebuehr fuer deine Website. Technischer Support, Updates und Wartung ab 7,90€/Monat. Die Website gehoert dir."
  },
  {
    question: "Was ist alles im Preis enthalten?",
    answer: "Premium Website-Design, SSL-Zertifikat, Mobile-Optimierung, SEO-Grundlagen, Kontaktformular und WhatsApp-Integration. Technischer Support, Updates und Wartung gibt es ab 7,90€/Monat."
  },
  {
    question: "Wie funktioniert der kostenlose Entwurf?",
    answer: "Du schreibst uns per WhatsApp deine Branche und grundlegende Wünsche. Innerhalb von 24 Stunden erhältst du einen personalisierten Website-Entwurf. Nur wenn er dir gefällt, zahlst du die 347€."
  },
  {
    question: "Wann geht meine Website online?",
    answer: "Nach Zahlungseingang und Freigabe des Entwurfs ist deine Website in 3-5 Werktagen live. Du erhältst alle Zugangsdaten und kannst sofort starten."
  },
  {
    question: "Kann ich Änderungen vornehmen?",
    answer: "Ja! Änderungswünsche werden von unserem Team innerhalb von 48 Stunden umgesetzt. Zusätzlich hast du die Möglichkeit, einen eigenen KI-Assistenten zu nutzen, der rund um die Uhr für dich verfügbar ist. Damit kannst du Texte, Bilder und Inhalte deiner Website jederzeit eigenständig anpassen – ganz ohne technische Kenntnisse. Du erhältst außerdem regelmäßige Reports über die Performance deiner Seite."
  },
  {
    question: "Was passiert nach dem ersten Jahr?",
    answer: "Technischer Support, Updates und Wartung sind ab 7,90€/Monat verfuegbar. Die Website gehoert dir - du kannst sie jederzeit zu einem anderen Anbieter umziehen."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappNumber = "4915146692387";
  const whatsappMessage = encodeURIComponent("Hallo! Ich möchte meinen kostenlosen Website-Entwurf für 347€ erhalten.");

  return (
    <>
    <section className="py-12 sm:py-16 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-gray-400 text-lg">
            Alles was du über das 347€ Paket wissen musst
          </p>
        </div>

        <div className="space-y-3 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 rounded-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-base sm:text-lg font-bold text-white pr-2">{faq.question}</span>
                <div className="ml-2 sm:ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus size={20} className="text-orange-500 sm:w-6 sm:h-6" />
                  ) : (
                    <Plus size={20} className="text-orange-500 sm:w-6 sm:h-6" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>

      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Noch Fragen?
            </h3>
            <p className="text-gray-500 mb-6">
              Schreib uns einfach per WhatsApp und wir helfen dir weiter
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-red-500 transition-all duration-300 text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Jetzt per WhatsApp fragen
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;