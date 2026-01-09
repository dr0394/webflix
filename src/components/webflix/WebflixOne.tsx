import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Shield, Clock, Phone, Mail, MapPin, Car, Sparkles, Users, Award, Zap, Settings, Eye, Camera, ThumbsUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Header from '../../demos/autoaufbereitung/components/Header';
import DemoFrame from './DemoFrame';
import WebflixOneTrustSection from './WebflixOneTrustSection';
import WebflixOneGallery from './WebflixOneGallery';
import WebflixOneBeforeAfter from './WebflixOneBeforeAfter';
import WebflixOneCategorySelection from './WebflixOneCategorySelection';
import WebflixOneMapSection from './WebflixOneMapSection';
import WebflixOneFooter from './WebflixOneFooter';
import { supabase } from '../../lib/supabase';

interface WebflixOneProps {
  industrySlug: string;
}

interface IndustryData {
  id: string;
  slug: string;
  display_name: string;
  icon: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_image: string;
  primary_color: string;
  services: any[];
  gallery_images: any[];
  trust_stats: any[];
  vehicle_types: any[];
  map_location: any;
  contact_info: any;
  before_after_images: any[];
  google_reviews: any[];
  google_rating: number;
  google_review_count: number;
  header_logo_text: string;
}

const WebflixOne: React.FC<WebflixOneProps> = ({ industrySlug }) => {
  const [industryData, setIndustryData] = useState<IndustryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVehicleType, setSelectedVehicleType] = useState('kleinwagen');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  useEffect(() => {
    loadIndustryData();
  }, [industrySlug]);

  const loadIndustryData = async () => {
    try {
      const { data, error } = await supabase
        .from('webflix_one_industries')
        .select('*')
        .eq('slug', industrySlug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIndustryData(data);
      }
    } catch (error) {
      console.error('Error loading industry data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCTAClick = (e?: React.MouseEvent) => {
    if (isPreviewMode) {
      if (e) e.preventDefault();
      return;
    }
    if (!isPreviewMode) {
      window.location.href = '/configurator';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Lädt...</div>
      </div>
    );
  }

  if (!industryData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Branche nicht gefunden</div>
      </div>
    );
  }

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Briefcase;
    return Icon;
  };

  const IconComponent = getIconComponent(industryData.icon);

  const customData = {
    hero_h1: industryData.hero_title,
    hero_h2: industryData.hero_subtitle,
    hero_cta: industryData.hero_cta_text,
    header_logo: industryData.header_logo_text || industryData.display_name,
  };

  // Verkaufspsychologie Sections
  const psychologySections = [
    {
      id: 'hero-section',
      name: 'Hero Section',
      icon: Eye,
      psychologyTitle: 'Erste Impression & Aufmerksamkeit (AIDA: Attention)',
      psychologyExplanation: 'Die Hero Section hat 3 Sekunden, um den Besucher zu fesseln. Große, emotionale Überschriften erzeugen sofort Status und Qualität.',
      salesPrinciple: 'Primacy-Effekt: Der erste Eindruck prägt die gesamte Wahrnehmung der Seite.',
      impact: 'Besucher verweilen länger auf der Seite, nehmen die Marke als hochwertig wahr.'
    },
    {
      id: 'trust-badges',
      name: 'Trust Badges',
      icon: Shield,
      psychologyTitle: 'Sozialer Beweis & Sicherheit',
      psychologyExplanation: 'Trust Badges bieten unmittelbar sozialen Beweis. Menschen vertrauen dem, was andere bereits gewählt haben.',
      salesPrinciple: 'Social Proof Principle: Wenn viele Menschen etwas tun, muss es richtig sein.',
      impact: 'Reduziert Kaufängste und Skepsis bei Besuchern.'
    },
    {
      id: 'vehicle-selection',
      name: 'Kategorie-Auswahl',
      icon: Car,
      psychologyTitle: 'Interaktivität & Personalisierung (AIDA: Interest)',
      psychologyExplanation: 'Interaktive Elemente geben Kontrolle und lassen Besucher aktiv werden.',
      salesPrinciple: 'Endowment-Effekt: Wenn Nutzer wählen, entsteht mentaler Besitz.',
      impact: 'Höhere Conversion Rate durch aktive Beteiligung.'
    },
    {
      id: 'before-after',
      name: 'Vorher/Nachher',
      icon: Camera,
      psychologyTitle: 'Visuelle Transformation (AIDA: Desire)',
      psychologyExplanation: 'Menschen kaufen Transformationen. Vorher/Nachher zeigt visuell den Wert.',
      salesPrinciple: 'Show, don\'t tell: Bilder werden 60.000x schneller verarbeitet als Text.',
      impact: 'Wunsch nach Transformation wird geweckt.'
    },
    {
      id: 'services',
      name: 'Service Übersicht',
      icon: Sparkles,
      psychologyTitle: 'Optionen & Wertsteigerung',
      psychologyExplanation: 'Mehrere Optionen geben das Gefühl der Wahl.',
      salesPrinciple: 'Decoy-Effekt: Premium-Optionen machen Standard günstiger.',
      impact: 'Höherer durchschnittlicher Warenkorbwert.'
    },
    {
      id: 'gallery',
      name: 'Projekt-Galerie',
      icon: Award,
      psychologyTitle: 'Portfolio & Kompetenz-Beweis',
      psychologyExplanation: 'Eine Galerie zeigt Erfahrung und Expertise.',
      salesPrinciple: 'Authority Principle: Expertise wird durch Ergebnisse bewiesen.',
      impact: 'Kunden fühlen sich in guten Händen.'
    },
    {
      id: 'contact',
      name: 'Kontakt & Standort',
      icon: MapPin,
      psychologyTitle: 'Erreichbarkeit & Lokales Vertrauen',
      psychologyExplanation: 'Karte und lokale Adresse schaffen Realität und Nähe.',
      salesPrinciple: 'Proximity Principle: Menschen vertrauen lokalen Anbietern mehr.',
      impact: 'Höheres Vertrauen für hochwertige Dienstleistungen.'
    }
  ];

  return (
    <DemoFrame
      demoName={`Webflix One - ${industryData.display_name}`}
      sections={psychologySections}
    >
      <div className={`min-h-screen bg-black text-white relative overflow-hidden ${isPreviewMode ? 'preview-mode' : ''}`}>
        {isPreviewMode && (
          <style>{`
            .preview-mode a[href="/configurator"],
            .preview-mode a[href*="whatsapp"],
            .preview-mode a[href*="wa.me"],
            .preview-mode a[target="_blank"]:not([class*="gallery"]),
            .preview-mode button[id*="cta"],
            .preview-mode button[id*="demo-cta"] {
              pointer-events: none !important;
              opacity: 0.6 !important;
              cursor: not-allowed !important;
            }
          `}</style>
        )}

        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          {/* Animated Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px',
                   animation: 'grid-move 20s linear infinite'
                 }}>
            </div>
          </div>
          {/* Glowing Orbs with dynamic color based on primary_color */}
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${industryData.primary_color}10` }}></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${industryData.primary_color}15`, animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: `${industryData.primary_color}08`, animationDelay: '4s' }}></div>
        </div>

        <Header customData={customData} isPreviewMode={isPreviewMode} />

        <div className="relative z-10">
          <section id="hero-section" className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
              {industryData.hero_image && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{ backgroundImage: `url('${industryData.hero_image}')` }}
                />
              )}
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 backdrop-blur-md px-6 py-3 rounded-full border mt-20 mb-6"
                  style={{
                    backgroundColor: `${industryData.primary_color}10`,
                    borderColor: `${industryData.primary_color}30`
                  }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: industryData.primary_color }} />
                  <span className="text-white font-medium">{industryData.display_name} #1</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
                >
                  {industryData.hero_title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
                >
                  {industryData.hero_subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                  <button
                    id="demo-cta-button"
                    onClick={(e) => handleCTAClick(e)}
                    className="group relative inline-flex items-center px-8 py-4 border rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                    style={{
                      borderColor: industryData.primary_color,
                      color: industryData.primary_color
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = industryData.primary_color;
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = industryData.primary_color;
                    }}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    <span className="relative z-10">{industryData.hero_cta_text}</span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {industryData.trust_stats.slice(0, 3).map((stat: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 backdrop-blur-sm rounded-lg p-3 border bg-white/5 border-white/10 transition-all hover:scale-105">
                      <Star className="w-5 h-5 text-gray-300" />
                      <span className="text-sm font-medium text-gray-300">{stat.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Google Reviews Section */}
          <section className="py-8 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Google Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-700">Google</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Rating Text */}
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-xl font-bold text-gray-900">{industryData.google_rating?.toFixed(1) || '5,0'}</span>
                  <span className="text-sm">basierend auf</span>
                  <span className="font-semibold" style={{ color: industryData.primary_color }}>{industryData.google_review_count || 0} Bewertungen</span>
                </div>

                {/* Trust Badge */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border" style={{
                  backgroundColor: `${industryData.primary_color}15`,
                  borderColor: `${industryData.primary_color}30`
                }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: industryData.primary_color }}></div>
                  <span className="text-sm font-medium" style={{ color: industryData.primary_color }}>Verifizierte Bewertungen</span>
                </div>
              </div>

              {/* Mobile Trust Badge */}
              <div className="md:hidden flex justify-center mt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{
                  backgroundColor: `${industryData.primary_color}15`,
                  borderColor: `${industryData.primary_color}30`
                }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: industryData.primary_color }}></div>
                  <span className="text-sm font-medium" style={{ color: industryData.primary_color }}>Verifizierte Bewertungen</span>
                </div>
              </div>
            </div>
          </section>

          {/* Category Selection */}
          {industryData.vehicle_types && industryData.vehicle_types.length > 0 && (
            <WebflixOneCategorySelection
              categories={industryData.vehicle_types}
              primaryColor={industryData.primary_color}
              sectionTitle="Unsere Kategorien"
              sectionSubtitle="Wählen Sie die passende Kategorie für Ihr Projekt"
            />
          )}

          {/* Trust Section with Reviews */}
          {(industryData.trust_stats?.length > 0 || industryData.google_reviews?.length > 0) && (
            <WebflixOneTrustSection
              trustPoints={industryData.trust_stats || []}
              reviews={industryData.google_reviews || []}
              googleRating={industryData.google_rating || 5.0}
              googleReviewCount={industryData.google_review_count || 0}
              primaryColor={industryData.primary_color}
            />
          )}

          {/* Before/After Section */}
          {industryData.before_after_images && industryData.before_after_images.length > 0 && (
            <WebflixOneBeforeAfter
              examples={industryData.before_after_images}
              primaryColor={industryData.primary_color}
            />
          )}

          {/* Gallery Section */}
          {industryData.gallery_images && industryData.gallery_images.length > 0 && (
            <WebflixOneGallery
              images={industryData.gallery_images}
              primaryColor={industryData.primary_color}
              ctaText={industryData.hero_cta_text}
              isPreviewMode={isPreviewMode}
              onCtaClick={handleCTAClick}
            />
          )}

          <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Unsere Leistungen
                  </h2>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industryData.services.map((service: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group backdrop-blur-sm rounded-xl overflow-hidden border transition-all hover:scale-105"
                    style={{
                      backgroundColor: `${industryData.primary_color}15`,
                      borderColor: `${industryData.primary_color}30`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${industryData.primary_color}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${industryData.primary_color}30`;
                    }}
                  >
                    {service.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{service.description}</p>

                      {service.features && service.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Was ist enthalten:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature: string, featureIndex: number) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: industryData.primary_color }}></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-700">
                        <button
                          onClick={handleCTAClick}
                          className="w-full text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                          style={{ backgroundColor: industryData.primary_color }}
                          onMouseEnter={(e) => {
                            const rgb = industryData.primary_color.match(/\w\w/g)?.map(x => parseInt(x, 16));
                            if (rgb) {
                              e.currentTarget.style.backgroundColor = `rgb(${rgb[0] * 0.8}, ${rgb[1] * 0.8}, ${rgb[2] * 0.8})`;
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = industryData.primary_color;
                          }}
                        >
                          Jetzt anfragen
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Map & Contact Section */}
          {industryData.map_location && industryData.contact_info && (
            <WebflixOneMapSection
              location={industryData.map_location}
              contact={industryData.contact_info}
              primaryColor={industryData.primary_color}
              companyName={industryData.header_logo_text}
            />
          )}
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Footer */}
      <WebflixOneFooter
        companyName={industryData.header_logo_text || 'Unser Unternehmen'}
        displayName={industryData.display_name || 'Dienstleistungen'}
        primaryColor={industryData.primary_color}
        contact={industryData.contact_info}
        location={industryData.map_location}
      />
    </DemoFrame>
  );
};

export default WebflixOne;
