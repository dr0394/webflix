import React from 'react';
import { Phone, Shield, Award, Clock, Sparkles, Droplets, CreditCard, MessageCircle, Settings, Percent, Star } from 'lucide-react';
import { HeroProps } from '../types';
import { BoldHeroDiagonal, ElegantHeroNature } from './HeroVariants';
import { ElegantHeroNaturePastel } from './GartenVariants';
import { LuxuryHeroFullscreen } from './LuxuryGardenVariants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  award: Award,
  clock: Clock,
  sparkles: Sparkles,
  droplets: Droplets,
  creditcard: CreditCard,
  messagecircle: MessageCircle,
  phone: Phone,
  settings: Settings,
  percent: Percent,
  star: Star
};

export const Hero: React.FC<HeroProps & { designVariant?: string }> = (props) => {
  const {
    headline,
    subheadline,
    highlightedText,
    ctaText,
    ctaLink,
    backgroundImage,
    badge,
    trustPoints,
    secondaryCtaText,
    secondaryCtaLink,
    designVariant = 'default'
  } = props;

  // Route to design variant
  if (designVariant === 'luxury-hero-fullscreen') {
    return <LuxuryHeroFullscreen {...props} />;
  }
  if (designVariant === 'bold-hero-diagonal') {
    return <BoldHeroDiagonal {...props} />;
  }
  if (designVariant === 'elegant-hero-nature') {
    return <ElegantHeroNaturePastel {...props} />;
  }

  // Default design
  const displayHeadline = headline;
  const displaySubheadline = subheadline;

  // Split headline into parts if highlightedText is provided
  const renderHeadline = () => {
    if (!displayHeadline) return null;

    if (highlightedText && displayHeadline.includes(highlightedText)) {
      const parts = displayHeadline.split(highlightedText);
      return (
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tight">
          {parts[0]}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 animate-gradient">
            {highlightedText}
          </span>
          {parts[1]}
        </h1>
      );
    }

    return (
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tight">
        {displayHeadline}
      </h1>
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: 'var(--spacing-section, 6rem)',
      }}
    >
      {/* Dark Gradient Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      )}

      <div
        className="relative z-10 py-20"
        style={{
          maxWidth: 'var(--spacing-container, 1280px)',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-white text-sm font-medium">{badge}</span>
            </div>
          )}

          {/* Headline */}
          <h1
            className="font-black text-white mb-6 leading-[1.1] tracking-tight"
            style={{
              fontSize: 'var(--text-5xl, 3rem)',
              fontFamily: 'var(--font-heading, var(--font-family, inherit))',
              fontWeight: 'var(--font-extrabold, 800)'
            }}
          >
            {displayHeadline}
          </h1>

          {/* Subheadline */}
          {displaySubheadline && (
            <p
              className="text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
              style={{
                fontSize: 'var(--text-xl, 1.25rem)',
                fontFamily: 'var(--font-body, inherit)',
                fontWeight: 'var(--font-normal, 400)'
              }}
            >
              {displaySubheadline}
            </p>
          )}

          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <a
              href={ctaLink}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 font-bold text-lg transition-all"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: 'var(--radius-xl, 1rem)',
                boxShadow: 'var(--shadow-lg)',
                transitionDuration: 'var(--animation-duration, 300ms)',
                transitionTimingFunction: 'var(--animation-easing, ease-in-out)'
              }}
            >
              <Settings className="w-6 h-6" />
              <span>{ctaText}</span>
            </a>
          </div>

          {/* Trust Points - 3 Cards */}
          {trustPoints && trustPoints.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
              {trustPoints.map((point, idx) => {
                const Icon = iconMap[point.icon?.toLowerCase()] || Shield;
                const isHighlighted = idx === 1; // Middle card highlighted
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-center gap-3 backdrop-blur-md rounded-2xl px-6 py-5 border transition-all ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-red-900/40 to-red-800/30 border-red-500/50'
                        : 'bg-white/5 border-white/20 hover:border-white/30'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    <span className="text-white text-sm font-medium">{point.text}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Live Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Privat und Gewerblich</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Ø Schnelle Antwortzeit</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Kundenzufriedenheit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};
