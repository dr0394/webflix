import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const BottomCTA = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent to-black/50">
      <div className="container mx-auto text-center max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto mb-3 sm:mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse"
            className="flex-1 px-4 py-2.5 sm:py-3 bg-black/60 border border-white/30 rounded text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm"
          />
          <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-pink-500/25 hover:shadow-xl text-sm sm:text-base">
            <span>Loslegen</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-400 px-4">
          Sie liefern Ihre Inhalte – wir liefern Ihre Website. In 48 Stunden live.
        </p>
      </div>
    </section>
  );
};

export default BottomCTA;