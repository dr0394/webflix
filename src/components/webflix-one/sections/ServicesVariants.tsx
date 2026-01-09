import React from 'react';
import { Check, Star, Sparkles, Zap } from 'lucide-react';

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

// LUXURY CARDS - Autoaufbereitung
export const LuxuryCardsGold: React.FC<ServicesProps> = ({ title, subtitle, services }) => {
  return (
    <section
      className="relative py-24"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)'
      }}
    >
      <div style={{ maxWidth: 'var(--spacing-container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="text-center mb-16">
          <h2
            className="mb-4"
            style={{
              fontSize: 'var(--text-4xl)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-text)'
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: 'var(--text-lg)',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-textLight)'
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden transition-all hover:-translate-y-2"
              style={{
                background: service.popular
                  ? 'linear-gradient(135deg, rgba(198, 147, 32, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)'
                  : 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                boxShadow: service.popular ? 'var(--shadow-xl)' : 'var(--shadow-md)',
                border: service.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                transitionDuration: 'var(--animation-duration)'
              }}
            >
              {service.popular && (
                <div
                  className="absolute top-4 right-4 px-3 py-1"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-bold)'
                  }}
                >
                  BELIEBT
                </div>
              )}

              <div
                className="w-12 h-12 flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <Star className="w-6 h-6 text-white" />
              </div>

              <h3
                className="mb-2"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--color-text)'
                }}
              >
                {service.name}
              </h3>

              {service.price && (
                <div
                  className="mb-4"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {service.price}
                  {service.duration && (
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-textLight)',
                        fontWeight: 'var(--font-normal)',
                        marginLeft: '0.5rem'
                      }}
                    >
                      • {service.duration}
                    </span>
                  )}
                </div>
              )}

              <p
                className="mb-6"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-textLight)',
                  lineHeight: '1.6'
                }}
              >
                {service.description}
              </p>

              {service.features && (
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text)',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// BOLD GRID - Elektriker
export const BoldGridIcons: React.FC<ServicesProps> = ({ title, subtitle, services }) => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-secondary)',
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)'
      }}
    >
      <div style={{ maxWidth: 'var(--spacing-container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="text-center mb-16">
          <h2
            className="mb-4 text-white"
            style={{
              fontSize: 'var(--text-4xl)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-extrabold)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-gray-300"
              style={{
                fontSize: 'var(--text-lg)',
                fontFamily: 'var(--font-body)'
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden transition-transform hover:scale-105"
              style={{
                backgroundColor: service.popular ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)',
                border: service.popular ? 'none' : '2px solid rgba(234, 179, 8, 0.2)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                transitionDuration: 'var(--animation-duration)'
              }}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-xs font-bold">
                  TOP
                </div>
              )}

              <Zap
                className="mb-4"
                style={{
                  width: '3rem',
                  height: '3rem',
                  color: service.popular ? 'var(--color-secondary)' : 'var(--color-primary)'
                }}
              />

              <h3
                className="mb-3"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-bold)',
                  color: service.popular ? 'var(--color-secondary)' : 'white'
                }}
              >
                {service.name}
              </h3>

              <p
                className="mb-4"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: service.popular ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6',
                  fontFamily: 'var(--font-body)'
                }}
              >
                {service.description}
              </p>

              {service.features && (
                <ul className="space-y-2">
                  {service.features.slice(0, 4).map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-2"
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: service.popular ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.6)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      <div
                        style={{
                          width: '4px',
                          height: '4px',
                          backgroundColor: service.popular ? 'var(--color-secondary)' : 'var(--color-primary)',
                          borderRadius: '50%'
                        }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ELEGANT ROUNDED - Gartenlandschaftsbau
export const ElegantCardsRounded: React.FC<ServicesProps> = ({ title, subtitle, services }) => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface)',
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)'
      }}
    >
      <div style={{ maxWidth: 'var(--spacing-container)', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="text-center mb-16">
          <h2
            className="mb-4"
            style={{
              fontSize: 'var(--text-4xl)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-text)'
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: 'var(--text-lg)',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-textLight)'
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="text-center transition-all hover:-translate-y-1"
              style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-2xl)',
                padding: '2.5rem 2rem',
                boxShadow: 'var(--shadow-md)',
                border: service.popular ? '2px solid var(--color-primary)' : 'none',
                transitionDuration: 'var(--animation-duration)'
              }}
            >
              <div
                className="inline-flex items-center justify-center mb-6"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h3
                className="mb-3"
                style={{
                  fontSize: 'var(--text-xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--color-text)'
                }}
              >
                {service.name}
              </h3>

              <p
                className="mb-6"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-textLight)',
                  lineHeight: '1.7'
                }}
              >
                {service.description}
              </p>

              {service.features && (
                <ul className="space-y-2 text-left">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: 'var(--color-primary)',
                          borderRadius: '50%'
                        }}
                      />
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-text)',
                          fontFamily: 'var(--font-body)'
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
