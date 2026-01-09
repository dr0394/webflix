import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';

interface Service {
  name: string;
  description: string;
  price?: string;
  image?: string;
  features?: string[];
}

interface ServicesSliderProps {
  title: string;
  subtitle?: string;
  services: Service[];
}

export const ServicesSlider: React.FC<ServicesSliderProps> = ({ title, subtitle, services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Unsere Leistungen
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-sky-200 hover:shadow-xl transition-all max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-0">
                      {service.image && (
                        <div className="relative h-64 md:h-auto">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                      )}

                      <div className={`p-8 ${!service.image ? 'md:col-span-2' : ''}`}>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                          {service.description}
                        </p>

                        {service.features && service.features.length > 0 && (
                          <ul className="space-y-3 mb-6">
                            {service.features.map((feature, fidx) => (
                              <li key={fidx} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="flex items-center justify-between">
                          {service.price && (
                            <div className="text-3xl font-bold text-sky-600">
                              {service.price}
                            </div>
                          )}
                          <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2">
                            Jetzt buchen
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {services.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-gray-900 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-gray-900 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {services.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-sky-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Service Cards Grid (Mobile Fallback) */}
        <div className="mt-12 grid md:hidden grid-cols-1 gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                index === currentIndex
                  ? 'border-sky-500 bg-sky-50'
                  : 'border-gray-200 hover:border-sky-300'
              }`}
            >
              <h4 className="font-bold text-gray-900">{service.name}</h4>
              {service.price && (
                <p className="text-sm text-sky-600 font-semibold">{service.price}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
