import React from 'react';
import { Zap, Shield, Star, Heart, Award, TrendingUp } from 'lucide-react';
import { FeaturesProps } from '../types';
import { LuxuryTimelineElegant } from './LuxuryGardenVariants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  shield: Shield,
  star: Star,
  heart: Heart,
  award: Award,
  trending: TrendingUp
};

export const Features: React.FC<FeaturesProps & { designVariant?: string }> = ({ title, subtitle, features, designVariant = 'default' }) => {
  // Route to design variants
  if (designVariant === 'luxury-timeline-elegant') {
    return <LuxuryTimelineElegant title={title} subtitle={subtitle} features={features} />;
  }
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Star;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
