import React from 'react';
import { DollarSign, Calendar, Euro, Shield, FileCheck, MapPin } from 'lucide-react';

const highlights = [
  { icon: DollarSign, text: "Transparente Preise" },
  { icon: Calendar, text: "FLEX/12/24 Monate" },
  { icon: Euro, text: "Nur 29,90 € mtl." },
  { icon: Shield, text: "Kündbar nach Laufzeit" },
  { icon: FileCheck, text: "Geprüft und rechtssicher" }
];

const HighlightSection = () => {
  return (
    <section id="pricing" className="py-8 sm:py-12 px-4 border-y border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2 sm:space-x-3 text-gray-300">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500/20 to-pink-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <highlight.icon size={14} className="text-pink-400 sm:w-4 sm:h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium">{highlight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;