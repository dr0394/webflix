import React from 'react';
import { motion } from 'framer-motion';
import {
  Leaf, TreePine, Droplet, Sprout, Phone, Mail, MapPin,
  MessageCircle, Layout, Wrench, Heart, Star, Users, CheckCircle,
  XCircle, Clock, ChevronDown
} from 'lucide-react';

// LUXURY HERO - Cinematic Garden
export const LuxuryHeroGarden: React.FC<any> = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
  badge,
  trustPoints
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.7)'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2E4633]/40 to-[#2E4633]/80" />

      <div className="relative z-10 container mx-auto px-6 py-20 text-center text-white">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8"
          >
            <Leaf className="w-4 h-4 text-[#A8C686]" />
            <span className="text-sm font-medium">{badge}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90"
        >
          {subheadline}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          href={ctaLink}
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#A8C686] hover:bg-[#8FB571] text-[#2E4633] font-semibold rounded-2xl transition-all hover:scale-105 shadow-2xl"
        >
          <Phone className="w-5 h-5" />
          {ctaText}
        </motion.a>

        {trustPoints && trustPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {trustPoints.map((point: any, idx: number) => {
              const Icon = point.icon === 'leaf' ? Leaf : point.icon === 'sprout' ? Sprout : TreePine;
              return (
                <div key={idx} className="flex items-center gap-3 text-white/90">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    <Icon className="w-6 h-6 text-[#A8C686]" />
                  </div>
                  <span className="text-lg font-medium">{point.text}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </div>
    </section>
  );
};

// LUXURY GALLERY - Masonry
export const LuxuryGalleryMasonry: React.FC<any> = ({ title, subtitle, badge, images }) => {
  return (
    <section className="py-24 bg-[#F8F6EC]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          {badge && (
            <div className="inline-block px-6 py-2 bg-[#2E4633] text-white rounded-full text-sm font-semibold mb-4">
              {badge}
            </div>
          )}
          <h2 className="text-5xl font-serif font-bold text-[#2E4633] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.slice(0, 12).map((img: any, idx: number) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              style={{
                gridRow: idx % 5 === 0 ? 'span 2' : 'span 1'
              }}
            >
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E4633]/80 via-[#2E4633]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-lg mb-1">{img.title}</h3>
                  <p className="text-sm text-white/80">{img.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// LUXURY PILLS - Service Cards
export const LuxuryPillsNature: React.FC<any> = ({ title, subtitle, services }) => {
  const iconMap: any = {
    tree: TreePine,
    droplet: Droplet,
    layers: Layout,
    leaf: Leaf
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-[#2E4633] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service: any, idx: number) => {
            const Icon = iconMap[service.icon] || TreePine;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-3xl transition-all hover:-translate-y-2 ${
                  service.popular
                    ? 'bg-gradient-to-br from-[#A8C686] to-[#8FB571] text-white shadow-2xl'
                    : 'bg-[#F8F6EC] text-[#2E4633]'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2E4633] text-white text-xs font-bold rounded-full">
                    BELIEBT
                  </div>
                )}

                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-2xl ${
                    service.popular ? 'bg-white/20' : 'bg-[#A8C686]/20'
                  }`}>
                    <Icon className={`w-8 h-8 ${service.popular ? 'text-white' : 'text-[#2E4633]'}`} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                <p className={`mb-6 ${service.popular ? 'text-white/90' : 'text-[#6B7280]'}`}>
                  {service.description}
                </p>

                {service.features && (
                  <ul className="space-y-2">
                    {service.features.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          service.popular ? 'text-white' : 'text-[#A8C686]'
                        }`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// LUXURY PROBLEM - Dark Section
export const LuxuryProblemDark: React.FC<any> = ({ title, subtitle, reasons }) => {
  return (
    <section className="py-24 bg-[#2E4633] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #A8C686 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all"
            >
              <div className="inline-flex p-3 bg-red-500/20 rounded-xl mb-4">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{reason.title}</h3>
              <p className="text-white/70 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#A8C686] hover:bg-[#8FB571] text-[#2E4633] font-semibold rounded-2xl transition-all hover:scale-105"
          >
            Jetzt Fachberatung sichern
          </a>
        </div>
      </div>
    </section>
  );
};

// LUXURY TIMELINE - Process Steps
export const LuxuryTimelineElegant: React.FC<any> = ({ title, subtitle, features }) => {
  const iconMap: any = {
    'message-circle': MessageCircle,
    layout: Layout,
    tool: Wrench,
    heart: Heart
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#F8F6EC] to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold text-[#2E4633] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {features.map((feature: any, idx: number) => {
            const Icon = iconMap[feature.icon] || MessageCircle;
            const isLast = idx === features.length - 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative flex gap-8 pb-12"
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A8C686] text-white rounded-2xl shadow-lg z-10">
                    <Icon className="w-8 h-8" />
                  </div>
                  {!isLast && (
                    <div className="w-1 flex-1 bg-gradient-to-b from-[#A8C686] to-[#A8C686]/20 mt-4" />
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#F8F6EC] hover:border-[#A8C686] transition-all">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-6xl font-serif text-[#A8C686]/20">{idx + 1}</span>
                      <h3 className="text-2xl font-bold text-[#2E4633]">{feature.title}</h3>
                    </div>
                    <p className="text-[#6B7280] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// LUXURY TRUST - Radial Stats
export const LuxuryTrustRadial: React.FC<any> = ({ title, badges }) => {
  const iconMap: any = {
    star: Star,
    users: Users,
    'check-circle': CheckCircle
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-serif font-bold text-[#2E4633] text-center mb-16" style={{ fontFamily: 'Playfair Display, serif' }}>
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {badges.map((badge: any, idx: number) => {
            const Icon = iconMap[badge.icon] || Star;
            const percentage = typeof badge.value === 'string' && badge.value.includes('%')
              ? parseInt(badge.value)
              : 90;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#F8F6EC"
                      strokeWidth="16"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#A8C686"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                      whileInView={{
                        strokeDashoffset: 2 * Math.PI * 88 * (1 - percentage / 100)
                      }}
                      transition={{ duration: 1.5, delay: idx * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className="w-8 h-8 text-[#A8C686] mb-2" />
                    <span className="text-4xl font-bold text-[#2E4633]">{badge.value}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2E4633] mb-2">{badge.label}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Export all variants with aliases
export { LuxuryHeroGarden as LuxuryHeroFullscreen };
export { LuxuryPillsNature as LuxuryCardsGold };
