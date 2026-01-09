import React from 'react';
import { ShoppingCart, Phone, Store, Truck, Clock, CreditCard } from 'lucide-react';

const BestellService: React.FC = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Online bestellen',
      description: 'Wählen Sie bequem von zu Hause aus unsere Produkte aus'
    },
    {
      icon: CreditCard,
      title: 'Bezahlen',
      description: 'Sicher per PayPal, Kreditkarte oder bei Abholung'
    },
    {
      icon: Clock,
      title: 'Abholen',
      description: 'Holen Sie Ihre Bestellung zur gewünschten Zeit ab'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50" id="kontakt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
            <ShoppingCart className="w-5 h-5 text-[#2D5F3F]" />
            <span className="text-[#2D5F3F] font-semibold">So einfach geht's</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#2D5F3F]">Online bestellen</span> oder anrufen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ihr Komfort ist uns wichtig – bestellen Sie wie es Ihnen am besten passt
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2D5F3F] to-[#1a3a28] rounded-full flex items-center justify-center shadow-xl">
                  <step.icon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#8BC34A] rounded-full flex items-center justify-center font-bold text-[#2D5F3F] shadow-lg">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Online Shop */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2D5F3F] to-[#1a3a28] rounded-xl flex items-center justify-center mb-6">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Online-Shop</h3>
            <p className="text-gray-600 mb-6">
              Bestellen Sie rund um die Uhr in unserem Online-Shop. Bezahlung bei Abholung oder vorab online.
            </p>
            <button className="w-full bg-gradient-to-r from-[#2D5F3F] to-[#1a3a28] hover:from-[#3E7C57] hover:to-[#2D5F3F] text-white py-3 rounded-lg font-bold transition-all">
              Zum Shop
            </button>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center mb-6">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Telefonisch</h3>
            <p className="text-gray-600 mb-6">
              Rufen Sie uns an und bestellen Sie telefonisch. Wir beraten Sie gerne persönlich.
            </p>
            <a
              href="tel:+49123456789"
              className="block w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white py-3 rounded-lg font-bold transition-all text-center"
            >
              0123 / 456 789
            </a>
          </div>

          {/* Store Visit */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vor Ort</h3>
            <p className="text-gray-600 mb-6" id="demo-contact-address">
              Besuchen Sie uns in unserer Filiale und lassen Sie sich direkt vor Ort beraten.
            </p>
            <button className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] hover:from-[#7CB342] hover:to-[#689F38] text-white py-3 rounded-lg font-bold transition-all">
              Route planen
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lieferservice verfügbar!</h3>
              <p className="text-gray-700">
                Ab einem Bestellwert von 50€ liefern wir Ihre Bestellung kostenlos innerhalb von Musterstadt.
                Lieferung jeden Mittwoch und Freitag zwischen 14:00 und 18:00 Uhr.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestellService;
