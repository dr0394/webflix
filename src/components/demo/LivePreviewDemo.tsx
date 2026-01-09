import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Star, CheckCircle } from 'lucide-react';

interface LivePreviewDemoProps {
  formData: Record<string, any>;
  demoType: string;
}

const LivePreviewDemo: React.FC<LivePreviewDemoProps> = ({ formData, demoType }) => {
  const [data, setData] = useState(formData);

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const getFieldValue = (fieldId: string, defaultValue: string = '') => {
    return data[fieldId] || defaultValue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section id="hero-section" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-gray-900/80 to-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              id="demo-h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {getFieldValue('hero_h1', 'Ihre professionelle Dienstleistung')}
            </motion.h1>

            <motion.p
              id="demo-h2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              {getFieldValue('hero_h2', 'Ihr Partner für erstklassige Qualität und Service')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <button
                id="demo-cta-button"
                className="px-8 py-4 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold text-lg rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all"
              >
                {getFieldValue('hero_cta', 'Jetzt anfragen')}
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
            >
              {getFieldValue('badge_1') && (
                <div id="demo-badge-1" className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <CheckCircle className="w-5 h-5 text-[orange-500]" />
                  <span className="text-sm font-medium">{getFieldValue('badge_1')}</span>
                </div>
              )}
              {getFieldValue('badge_2') && (
                <div id="demo-badge-2" className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <CheckCircle className="w-5 h-5 text-[orange-500]" />
                  <span className="text-sm font-medium">{getFieldValue('badge_2')}</span>
                </div>
              )}
              {getFieldValue('badge_3') && (
                <div id="demo-badge-3" className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <CheckCircle className="w-5 h-5 text-[orange-500]" />
                  <span className="text-sm font-medium">{getFieldValue('badge_3')}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {getFieldValue('about_text') && (
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {getFieldValue('about_title') && (
                <h2 id="demo-about-title" className="text-4xl md:text-5xl font-bold mb-4">
                  {getFieldValue('about_title')}
                </h2>
              )}
              {getFieldValue('about_subtitle') && (
                <p id="demo-about-subtitle" className="text-xl text-[orange-500] mb-8">
                  {getFieldValue('about_subtitle')}
                </p>
              )}
              <p id="demo-about-text" className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                {getFieldValue('about_text')}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section id="services-section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="demo-services-title" className="text-4xl md:text-5xl font-bold mb-6">
              {getFieldValue('services_title', 'Unsere Leistungen')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {getFieldValue('service_1_title') && (
              <div id="demo-service-1" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[orange-500] transition-all">
                <Star className="w-12 h-12 text-[orange-500] mb-4" />
                <h3 id="demo-service-1-title" className="text-2xl font-bold mb-3">
                  {getFieldValue('service_1_title')}
                </h3>
                <p id="demo-service-1-desc" className="text-gray-300">
                  {getFieldValue('service_1_desc')}
                </p>
              </div>
            )}

            {getFieldValue('service_2_title') && (
              <div id="demo-service-2" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[orange-500] transition-all">
                <Star className="w-12 h-12 text-[orange-500] mb-4" />
                <h3 id="demo-service-2-title" className="text-2xl font-bold mb-3">
                  {getFieldValue('service_2_title')}
                </h3>
                <p id="demo-service-2-desc" className="text-gray-300">
                  {getFieldValue('service_2_desc')}
                </p>
              </div>
            )}

            {getFieldValue('service_3_title') && (
              <div id="demo-service-3" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[orange-500] transition-all">
                <Star className="w-12 h-12 text-[orange-500] mb-4" />
                <h3 id="demo-service-3-title" className="text-2xl font-bold mb-3">
                  {getFieldValue('service_3_title')}
                </h3>
                <p id="demo-service-3-desc" className="text-gray-300">
                  {getFieldValue('service_3_desc')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {getFieldValue('gallery_title') && (
        <section id="gallery-section" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="demo-gallery-title" className="text-4xl md:text-5xl font-bold mb-4">
                {getFieldValue('gallery_title')}
              </h2>
              {getFieldValue('gallery_subtitle') && (
                <p id="demo-gallery-subtitle" className="text-xl text-gray-300">
                  {getFieldValue('gallery_subtitle')}
                </p>
              )}
            </div>
            <div id="demo-gallery-images" className="text-center text-gray-400">
              <p>Galerie-Bilder werden nach Upload angezeigt</p>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact-section" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {getFieldValue('contact_title') && (
              <h2 id="demo-contact-title" className="text-4xl md:text-5xl font-bold mb-12 text-center">
                {getFieldValue('contact_title', 'Kontakt')}
              </h2>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {getFieldValue('contact_address') && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[orange-500] mt-1" />
                    <div>
                      <h3 className="font-bold mb-2">Adresse</h3>
                      <p id="demo-contact-address" className="text-gray-300 whitespace-pre-line">
                        {getFieldValue('contact_address')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="space-y-4">
                  {getFieldValue('contact_phone') && (
                    <div className="flex items-center gap-4">
                      <Phone className="w-6 h-6 text-[orange-500]" />
                      <div>
                        <h3 className="font-bold mb-1">Telefon</h3>
                        <a id="demo-contact-phone" href={`tel:${getFieldValue('contact_phone')}`} className="text-gray-300 hover:text-[orange-500]">
                          {getFieldValue('contact_phone')}
                        </a>
                      </div>
                    </div>
                  )}

                  {getFieldValue('contact_email') && (
                    <div className="flex items-center gap-4">
                      <Mail className="w-6 h-6 text-[orange-500]" />
                      <div>
                        <h3 className="font-bold mb-1">E-Mail</h3>
                        <a id="demo-contact-email" href={`mailto:${getFieldValue('contact_email')}`} className="text-gray-300 hover:text-[orange-500]">
                          {getFieldValue('contact_email')}
                        </a>
                      </div>
                    </div>
                  )}

                  {getFieldValue('contact_hours') && (
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-[orange-500] mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Öffnungszeiten</h3>
                        <p id="demo-contact-hours" className="text-gray-300 whitespace-pre-line">
                          {getFieldValue('contact_hours')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      {(getFieldValue('social_facebook') || getFieldValue('social_instagram') || getFieldValue('social_linkedin')) && (
        <section className="py-12 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-6">
              {getFieldValue('social_facebook') && (
                <a id="demo-social-facebook" href={getFieldValue('social_facebook')} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[orange-500] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {getFieldValue('social_instagram') && (
                <a id="demo-social-instagram" href={getFieldValue('social_instagram')} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[orange-500] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {getFieldValue('social_linkedin') && (
                <a id="demo-social-linkedin" href={getFieldValue('social_linkedin')} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[orange-500] transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 {getFieldValue('hero_h1', 'Ihr Unternehmen')}. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
};

export default LivePreviewDemo;
