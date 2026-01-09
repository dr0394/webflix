import React from 'react';
import { Sparkles, Car, Shield, Star, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { ServicesProps } from '../types';
import { BoldGridIcons, ElegantCardsRounded } from './ServicesVariants';
import { ElegantServicesNature } from './GartenVariants';
import { LuxuryCardsGold } from './LuxuryGardenVariants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  car: Car,
  shield: Shield,
  star: Star,
  award: Award
};

export const Services: React.FC<ServicesProps & { designVariant?: string }> = (props) => {
  const { title, subtitle, services, designVariant = 'default' } = props;

  // Route to design variants
  if (designVariant === 'luxury-cards-gold') {
    return <LuxuryCardsGold title={title} subtitle={subtitle} services={services} />;
  }
  if (designVariant === 'bold-grid-icons') {
    return <BoldGridIcons title={title} subtitle={subtitle} services={services} />;
  }
  if (designVariant === 'elegant-cards-rounded') {
    return <ElegantServicesNature title={title} subtitle={subtitle} services={services} />;
  }

  // Default design
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.name.toLowerCase().includes('innen') ? 'sparkles' :
                                          service.name.toLowerCase().includes('außen') || service.name.toLowerCase().includes('aussen') ? 'car' :
                                          service.name.toLowerCase().includes('polieren') || service.name.toLowerCase().includes('versiegeln') ? 'shield' :
                                          service.name.toLowerCase().includes('motor') ? 'star' :
                                          service.name.toLowerCase().includes('leder') ? 'award' :
                                          'sparkles'] || Sparkles;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-sky-200 group"
              >
                {service.image && (
                  <div className="mb-6 -mx-8 -mt-8 h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                  <IconComponent className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {service.price && (
                  <div className="text-2xl font-bold text-sky-600 mb-4">{service.price}</div>
                )}

                <button className="w-full bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                  Jetzt buchen
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
