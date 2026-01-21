import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Was ist Webflix?",
    answer: "Webflix ist Ihre All-in-One Website-Marketing-Lösung ohne hohe Einmalkosten. Wir sind ein auf Websites und Plattformen spezialisiertes Unternehmen, das individuelle Lösungen für Ihr Business entwickelt."
  },
  {
    question: "Wie viel kostet Webflix?",
    answer: "Webflix Websites starten bei 499€ einmalig plus monatlicher Abo-Gebühr je nach gewählter Laufzeit (29,90€, 19,90€ und 9,90€ mtl.). Add-ons sind optional verfügbar. Eine Änderung pro Jahr ist inklusive."
  },
  {
    question: "Was bedeutet 48h-Go-Live?",
    answer: "Nach Eingang aller erforderlichen Informationen aus der Checkliste entwickeln und publizieren wir Ihre maßgeschneiderte Website im Normalfall innerhalb von 7 Tagen oder per Express innerhalb von 72 Stunden – keine Templates, sondern eine individuelle Lösung für Ihr Business."
  },
  {
    question: "Wie kann ich kündigen?",
    answer: "Die Kündigungsfrist ist flexibel und hängt von Ihrem gewählten Vertragsmodell ab. Nach Ende der Mindestlaufzeit können Sie je nach Vertrag monatlich kündigen."
  },
  {
    question: "Welche Add-ons gibt es?",
    answer: "Vorher/Nachher-Slider, Google-Bewertungen, Terminbuchung, CRM light, SEO-Starter, KI-Chatbot, E-Mail-Marketing, Analytics light, DSGVO-Paket und weitere individuelle Erweiterungen nach Ihren Anforderungen."
  },
  {
    question: "Gehören mir Domain & Inhalte?",
    answer: "Ihre Inhalte und Daten gehören vollständig Ihnen. Bei Domain-Fragen bieten wir faire Optionen – entweder Umzug Ihrer bestehenden Domain oder professionelle Verwaltung durch uns."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-montserrat font-bold mb-6 sm:mb-8">
          Häufig gestellte Fragen
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#333333] hover:bg-[#404040] transition-colors duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-base sm:text-lg font-medium pr-2">{faq.question}</span>
                <div className="ml-2 sm:ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus size={20} className="text-white sm:w-6 sm:h-6" />
                  ) : (
                    <Plus size={20} className="text-white sm:w-6 sm:h-6" />
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
  );
};

export default FAQ;