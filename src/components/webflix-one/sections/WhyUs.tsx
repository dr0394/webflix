import React from 'react';
import { Shield, Award, Clock, Heart, Star, Users } from 'lucide-react';
import { LuxuryProblemDark } from './LuxuryGardenVariants';

interface WhyUsPoint {
  icon: string;
  title: string;
  description: string;
}

interface WhyUsProps {
  title: string;
  subtitle?: string;
  points: WhyUsPoint[];
  designVariant?: string;
  reasons?: any[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  award: Award,
  clock: Clock,
  heart: Heart,
  star: Star,
  users: Users
};

export const WhyUs: React.FC<WhyUsProps> = ({ title, subtitle, points, designVariant = 'default', reasons }) => {
  // Route to design variants
  if (designVariant === 'luxury-problem-dark' && reasons) {
    return <LuxuryProblemDark title={title} subtitle={subtitle} reasons={reasons} />;
  }
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Warum wir?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = iconMap[point.icon] || Star;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-sky-200 group"
              >
                <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                  <Icon className="w-7 h-7 text-sky-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
