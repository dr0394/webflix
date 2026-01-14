import React from 'react';
import { ArrowRight, MousePointer, Settings, CreditCard, Rocket } from 'lucide-react';

const ModelExplanation = () => {
  const steps = [
    {
      number: 1,
      icon: MousePointer,
      title: "Design wählen",
      description: "Wählen Sie aus unseren professionellen Templates das perfekte Design für Ihre Branche aus.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      number: 2,
      icon: Settings,
      title: "Add-ons hinzufügen",
      description: "Erweitern sie bei bedarf ihre Website mit unseren Features",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      number: 3,
      icon: CreditCard,
      title: "Bestellen & bezahlen",
      description: "Geben Sie Ihre Daten ein, wählen Sie die Laufzeit und schließen Sie die Bestellung ab.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      number: 4,
      icon: Rocket,
      title: " Innerhalb von 48 Stunden Online",
      description: "Nachdem sie unsere Checkliste vollständig ausgefüllt haben, ist ihre Website innerhalb von 48 Stunden Live.",
      color: "from-orange-500 to-pink-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-pink-400/30"
    }
  ];

  return (
    <section id="warum-webflix" className="py-12 sm:py-16 px-4 bg-[#F3F3F5]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold mb-3 sm:mb-4 text-black">
            So einfach bekommen Sie Ihre Website
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            In nur 4 einfachen Schritten zu Ihrer professionellen Website
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative group ${step.bgColor} ${step.borderColor} border rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300`}
            >
              {/* Step Number */}
              <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg`}>
                  {step.number}
                </div>
              </div>

              {/* Icon */}
              <div className="mb-3 sm:mb-4 pt-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3 font-montserrat">
                  {step.title}
                </h3>
                <p className="text-gray-800 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow to next step (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-black/10 backdrop-blur-sm border border-black/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              )}

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${step.color} blur-xl -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-400/10 border border-pink-400/30 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Bereit für Ihre Professionelle Website zum Mitnehmen?</h3>
            <p className="text-gray-800 mb-4 sm:mb-6 text-sm sm:text-base">
              Vergessen Sie monatelange Wartezeiten und teure Webdesigner
            </p>
            <button
              onClick={() => window.location.href = 'https://www.webflix.info/custom'}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
            >
              <span>Jetzt mehr erfahren</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelExplanation;