import React from 'react';
import { Star, ThumbsUp, Shield, Clock } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="text-teal-600" size={32} />
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-sm sm:text-base text-gray-600">Google Bewertung</div>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="text-blue-600" size={32} />
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-sm sm:text-base text-gray-600">Zufriedene Patienten</div>
          </div>

          <div className="text-center">
            <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-cyan-600" size={32} />
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">15+</div>
            <div className="text-sm sm:text-base text-gray-600">Jahre Erfahrung</div>
          </div>

          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="text-teal-600" size={32} />
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">24h</div>
            <div className="text-sm sm:text-base text-gray-600">Rückruf-Service</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
