import React from 'react';
import { Phone, Shield, Award, Clock, Sparkles, Star, Zap } from 'lucide-react';
import { HeroProps } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  award: Award,
  clock: Clock,
  sparkles: Sparkles,
  phone: Phone,
  star: Star,
  zap: Zap
};

// LUXURY HERO - Autoaufbereitung
export const LuxuryHeroFullscreen: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
  badge,
  trustPoints
}) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

      <div className="relative z-10 text-center px-6" style={{ maxWidth: 'var(--spacing-container)' }}>
        {badge && (
          <div
            className="inline-block px-8 py-3 mb-8 backdrop-blur-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(198, 147, 32, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
              border: '2px solid rgba(198, 147, 32, 0.4)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-semibold)',
              fontSize: 'var(--text-sm)'
            }}
          >
            {badge}
          </div>
        )}

        <h1
          className="text-white mb-8 leading-tight"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'var(--font-bold)',
            letterSpacing: '-0.02em'
          }}
        >
          {headline}
        </h1>

        <p
          className="text-gray-300 mb-12 max-w-3xl mx-auto"
          style={{
            fontSize: 'var(--text-xl)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.8'
          }}
        >
          {subheadline}
        </p>

        <a
          href={ctaLink}
          className="inline-block px-12 py-5 text-white font-bold transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 40px rgba(198, 147, 32, 0.4)',
            fontSize: 'var(--text-lg)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          {ctaText}
        </a>

        {trustPoints && trustPoints.length > 0 && (
          <div className="flex justify-center gap-8 mt-16 flex-wrap">
            {trustPoints.map((point, idx) => {
              const Icon = iconMap[point.icon?.toLowerCase()] || Shield;
              return (
                <div key={idx} className="flex items-center gap-3 text-white/90">
                  <div
                    className="p-3"
                    style={{
                      background: 'rgba(198, 147, 32, 0.2)',
                      borderRadius: 'var(--radius-lg)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <span style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-body)' }}>
                    {point.text}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

// BOLD HERO - Elektriker
export const BoldHeroDiagonal: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
  badge,
  trustPoints
}) => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 transform -skew-y-3 origin-top-right"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-transparent transform -skew-y-3 origin-top-right" />

      <div className="relative z-10 min-h-screen flex items-center px-6" style={{ maxWidth: 'var(--spacing-container)', margin: '0 auto' }}>
        <div className="max-w-3xl">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-6 py-3 mb-6"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-extrabold)',
                fontSize: 'var(--text-sm)',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              <Zap className="w-4 h-4" />
              {badge}
            </div>
          )}

          <h1
            className="text-white mb-6 leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-extrabold)',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em'
            }}
          >
            {headline}
          </h1>

          <p
            className="text-gray-200 mb-10"
            style={{
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.7',
              maxWidth: '600px'
            }}
          >
            {subheadline}
          </p>

          <a
            href={ctaLink}
            className="inline-flex items-center gap-3 px-10 py-5 text-black font-extrabold transition-transform hover:scale-105"
            style={{
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-heading)',
              boxShadow: '0 10px 30px rgba(234, 179, 8, 0.5)',
              border: '3px solid var(--color-primary)'
            }}
          >
            <Phone className="w-6 h-6" />
            {ctaText}
          </a>

          {trustPoints && trustPoints.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-12">
              {trustPoints.map((point, idx) => {
                const Icon = iconMap[point.icon?.toLowerCase()] || Shield;
                return (
                  <div
                    key={idx}
                    className="px-4 py-3 backdrop-blur-md"
                    style={{
                      background: 'rgba(234, 179, 8, 0.15)',
                      border: '2px solid rgba(234, 179, 8, 0.3)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <Icon className="w-6 h-6 mb-2" style={{ color: 'var(--color-primary)' }} />
                    <p className="text-white text-sm font-bold">{point.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ELEGANT HERO - Gartenlandschaftsbau
export const ElegantHeroNature: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
  badge,
  trustPoints
}) => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
        }}
      />

      <div className="relative z-10 px-6 py-20" style={{ maxWidth: 'var(--spacing-container)', margin: '0 auto', width: '100%' }}>
        <div className="max-w-2xl">
          {badge && (
            <div
              className="inline-block px-6 py-2 mb-6"
              style={{
                background: 'rgba(5, 150, 105, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                borderRadius: 'var(--radius-full)',
                color: 'white',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-body)'
              }}
            >
              {badge}
            </div>
          )}

          <h1
            className="text-white mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-bold)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em'
            }}
          >
            {headline}
          </h1>

          <p
            className="text-gray-100 mb-10"
            style={{
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.8',
              maxWidth: '550px'
            }}
          >
            {subheadline}
          </p>

          <a
            href={ctaLink}
            className="inline-block px-10 py-4 text-white font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-xl)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 15px 35px rgba(5, 150, 105, 0.3)'
            }}
          >
            {ctaText}
          </a>

          {trustPoints && trustPoints.length > 0 && (
            <div className="flex gap-6 mt-12">
              {trustPoints.map((point, idx) => {
                const Icon = iconMap[point.icon?.toLowerCase()] || Shield;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="p-2"
                      style={{
                        background: 'rgba(5, 150, 105, 0.2)',
                        borderRadius: 'var(--radius-lg)',
                        backdropFilter: 'blur(5px)'
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-sm">{point.text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
