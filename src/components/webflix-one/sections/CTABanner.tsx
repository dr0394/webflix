import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryText?: string;
  ctaText?: string;
  ctaLink?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  phone?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  designVariant?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  subtitle,
  description,
  primaryText,
  ctaText,
  ctaLink,
  primaryLink,
  secondaryText,
  secondaryLink,
  phone,
  backgroundImage,
  backgroundColor,
  designVariant
}) => {
  const displayCtaText = ctaText || primaryText;
  const displayCtaLink = ctaLink || primaryLink;

  if (designVariant === 'luxury-cta-cinematic') {
    return (
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundColor: backgroundColor || 'var(--color-primary, #2E4633)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
            Bereit für Ihr Projekt?
          </div>

          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {displayCtaText && displayCtaLink && (
              <a
                href={displayCtaLink}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-gray-900 font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                <Phone className="w-6 h-6" />
                {displayCtaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {secondaryText && phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-white font-medium text-lg hover:text-white/80 transition-colors"
              >
                {secondaryText}: <span className="font-bold">{phone}</span>
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-sky-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-gray-100 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {description || subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {displayCtaText && displayCtaLink && (
              <a
                href={displayCtaLink}
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {displayCtaText}
              </a>
            )}

            {secondaryText && secondaryLink && (
              <a
                href={secondaryLink}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                {secondaryText}
                <ArrowRight className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
