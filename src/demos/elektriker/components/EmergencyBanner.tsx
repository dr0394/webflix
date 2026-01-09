import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';

const EmergencyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full animate-pulse">
              <AlertCircle size={32} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">Elektro-Notfall?</h3>
              <p className="text-red-100 text-sm sm:text-base">
                Unser Notdienst ist 24/7 für Sie erreichbar – schnell und zuverlässig!
              </p>
            </div>
          </div>

          <a
            href="tel:+491234567890"
            className="bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
          >
            <Phone size={20} />
            <span>+49 123 456 7890</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
