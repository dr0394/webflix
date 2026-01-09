import React from 'react';
import { Phone, Mail, MapPin, Clock, Leaf, Sprout, TreePine, Flower } from 'lucide-react';
import { HeroProps } from '../types';

// ELEGANT HERO - Gartenlandschaftsbau mit Pastell-Grün
export const ElegantHeroNaturePastel: React.FC<HeroProps> = ({
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
        background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(1.2)'
          }}
        />
      </div>

      <div className="relative z-10 px-6 py-20" style={{ maxWidth: 'var(--spacing-container)', margin: '0 auto', width: '100%' }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {badge && (
              <div
                className="inline-flex items-center gap-2 px-6 py-2 mb-6"
                style={{
                  background: 'white',
                  border: '2px solid #86EFAC',
                  borderRadius: 'var(--radius-full)',
                  color: '#166534',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-semibold)',
                  boxShadow: '0 4px 12px rgba(134, 239, 172, 0.3)'
                }}
              >
                <Leaf className="w-4 h-4" style={{ color: '#4ADE80' }} />
                {badge}
              </div>
            )}

            <h1
              className="mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 'var(--font-bold)',
                lineHeight: '1.1',
                letterSpacing: '-0.01em',
                color: '#166534'
              }}
            >
              {headline}
            </h1>

            <p
              className="mb-10"
              style={{
                fontSize: 'var(--text-lg)',
                fontFamily: 'var(--font-body)',
                lineHeight: '1.8',
                maxWidth: '550px',
                color: '#15803D'
              }}
            >
              {subheadline}
            </p>

            <a
              href={ctaLink}
              className="inline-flex items-center gap-3 px-10 py-4 text-white font-semibold transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                borderRadius: 'var(--radius-xl)',
                fontSize: 'var(--text-lg)',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 15px 35px rgba(74, 222, 128, 0.4)'
              }}
            >
              <Phone className="w-5 h-5" />
              {ctaText}
            </a>

            {trustPoints && trustPoints.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-12">
                {trustPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="p-2"
                      style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0 2px 8px rgba(134, 239, 172, 0.2)'
                      }}
                    >
                      <Sprout className="w-5 h-5" style={{ color: '#4ADE80' }} />
                    </div>
                    <span
                      style={{
                        color: '#166534',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-medium)'
                      }}
                    >
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative hidden md:block">
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 'var(--radius-2xl)',
                boxShadow: '0 25px 50px rgba(134, 239, 172, 0.3)'
              }}
            >
              <img
                src={backgroundImage}
                alt="Gartenlandschaftsbau"
                className="w-full h-auto"
                style={{ borderRadius: 'var(--radius-2xl)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(22, 101, 52, 0.1) 100%)',
                  borderRadius: 'var(--radius-2xl)'
                }}
              />
            </div>

            <div
              className="absolute -bottom-6 -right-6 px-8 py-6"
              style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 20px 40px rgba(134, 239, 172, 0.3)',
                border: '2px solid #BBF7D0'
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="p-4"
                  style={{
                    background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <TreePine className="w-8 h-8" style={{ color: '#22C55E' }} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 'var(--font-bold)',
                      color: '#166534',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    500+
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: '#15803D',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    Projekte realisiert
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C300,60 600,90 900,60 C1050,45 1150,30 1200,20 L1200,120 L0,120 Z"
            fill="white"
            opacity="0.5"
          />
          <path
            d="M0,20 C300,80 600,100 900,80 C1050,65 1150,50 1200,40 L1200,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

// ELEGANT SERVICES - Gartenlandschaftsbau mit Pastell-Grün
interface Service {
  name: string;
  description: string;
  features?: string[];
  price?: string;
  duration?: string;
  popular?: boolean;
  icon?: string;
}

interface ServicesProps {
  title: string;
  subtitle?: string;
  services: Service[];
}

export const ElegantServicesNature: React.FC<ServicesProps> = ({ title, subtitle, services }) => {
  const icons = [Sprout, TreePine, Flower, Leaf];

  return (
    <section
      style={{
        backgroundColor: 'white',
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)'
      }}
    >
      <div style={{ maxWidth: 'var(--spacing-container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div
              className="p-4"
              style={{
                background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                borderRadius: 'var(--radius-full)',
                border: '2px solid #BBF7D0'
              }}
            >
              <Leaf className="w-8 h-8" style={{ color: '#4ADE80' }} />
            </div>
          </div>

          <h2
            className="mb-4"
            style={{
              fontSize: 'var(--text-4xl)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-bold)',
              color: '#166534'
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: 'var(--text-lg)',
                fontFamily: 'var(--font-body)',
                color: '#15803D',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="group relative text-center transition-all hover:-translate-y-2"
                style={{
                  background: service.popular
                    ? 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)'
                    : 'white',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '2.5rem 2rem',
                  border: service.popular ? '3px solid #86EFAC' : '2px solid #E5E7EB',
                  boxShadow: service.popular
                    ? '0 20px 40px rgba(134, 239, 172, 0.3)'
                    : '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transitionDuration: 'var(--animation-duration)'
                }}
              >
                {service.popular && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1"
                    style={{
                      background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                      color: 'white',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-bold)',
                      boxShadow: '0 4px 12px rgba(74, 222, 128, 0.4)'
                    }}
                  >
                    BELIEBT
                  </div>
                )}

                <div
                  className="inline-flex items-center justify-center mb-6"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 8px 20px rgba(134, 239, 172, 0.3)'
                  }}
                >
                  <Icon className="w-10 h-10" style={{ color: '#22C55E' }} />
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontSize: 'var(--text-xl)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 'var(--font-semibold)',
                    color: '#166534'
                  }}
                >
                  {service.name}
                </h3>

                <p
                  className="mb-6"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                    color: '#15803D',
                    lineHeight: '1.7'
                  }}
                >
                  {service.description}
                </p>

                {service.features && (
                  <ul className="space-y-2 text-left">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#4ADE80',
                            borderRadius: '50%',
                            marginTop: '8px',
                            flexShrink: 0
                          }}
                        />
                        <span
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: '#166534',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div
                  className="mt-6 pt-6"
                  style={{
                    borderTop: '2px solid #BBF7D0'
                  }}
                >
                  <button
                    className="w-full py-3 transition-all hover:scale-105"
                    style={{
                      background: service.popular
                        ? 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)'
                        : 'white',
                      color: service.popular ? 'white' : '#166534',
                      border: service.popular ? 'none' : '2px solid #86EFAC',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-semibold)',
                      fontFamily: 'var(--font-body)',
                      boxShadow: service.popular
                        ? '0 8px 20px rgba(74, 222, 128, 0.3)'
                        : 'none'
                    }}
                  >
                    Mehr erfahren
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
