import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CTAProps } from '../types';

export const CTA: React.FC<CTAProps> = ({
  title,
  description,
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
  backgroundImage
}) => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h2>
        <p className="text-xl text-white/90 mb-8 leading-relaxed">{description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryLink}
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            {primaryText}
            <ArrowRight className="w-5 h-5" />
          </a>

          {secondaryText && secondaryLink && (
            <a
              href={secondaryLink}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              {secondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
