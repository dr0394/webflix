import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Wrench, Eye, Layers, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export const WebflixOneDemo: React.FC = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [formData, setFormData] = useState({ industryName: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const industries = [
    {
      slug: 'autoaufbereitung',
      name: 'KFZ & Detailing',
      description: 'Professionelle Website für Autoaufbereitung mit Preisen und Kundenbewertungen',
      color: 'from-red-500 to-orange-500',
      sections: ['Hero', 'Leistungen', 'Preise', 'Bewertungen', 'Kontakt']
    },
    {
      slug: 'handwerk',
      name: 'Handwerk & Dienstleistungen',
      description: 'Professionelle Website für Handwerksbetriebe mit Portfolio und Referenzen',
      color: 'from-blue-500 to-cyan-500',
      sections: ['Hero', 'Services', 'Portfolio', 'FAQ', 'Kontakt']
    }
  ];

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('industry_requests')
        .insert([
          {
            industry_name: formData.industryName,
            email: formData.email,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Fehler beim Senden der Anfrage. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      const calendlyScript = document.createElement('script');
      calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
      calendlyScript.async = true;
      document.body.appendChild(calendlyScript);

      const timer = setTimeout(() => {
        if ((window as any).Calendly) {
          (window as any).Calendly.initPopupWidget({
            url: 'https://calendly.com/webflix'
          });
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
        document.body.removeChild(calendlyScript);
      };
    }
  }, [submitSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-white mb-6">
            <Layers className="w-5 h-5" />
            <span className="font-semibold">Webflix One Framework</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Webflix zum Mitnehmen
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Fertige Branchen-Websites ab 29,90€. Sofort einsetzbar mit deinem Branding.
            Täglich neue Branchen verfügbar!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowRequestModal(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all hover:scale-105 shadow-2xl animate-pulse"
            >
              <Sparkles className="w-6 h-6" />
              Deine Branche ist noch nicht dabei?
            </button>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Verfügbare Branchen</h2>
            <p className="text-white/70 text-lg">Wähle deine Branche und personalisiere sie mit deinem Branding</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/dynamic/${industry.slug}`}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-20 group-hover:opacity-30 transition-opacity`} />

              <div className="relative p-8">
                {industry.highlight && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    Special
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-white/70 mb-6">{industry.description}</p>

                <div className="space-y-2">
                  <div className="text-sm text-white/60 font-semibold mb-2">Sections:</div>
                  <div className="flex flex-wrap gap-2">
                    {industry.sections.map((section) => (
                      <span
                        key={section}
                        className="text-xs bg-white/20 text-white px-3 py-1 rounded-full"
                      >
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-white font-semibold">
                  View Demo
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-200 px-6 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Täglich neue Branchen</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Wir launchen jeden Tag neue Branchen-Templates
            </h2>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Deine Branche ist noch nicht dabei? Kein Problem! Wir entwickeln kontinuierlich neue
              Templates für verschiedene Branchen. Fordere deine Wunschbranche an und erhalte
              Zugang zu deiner personalisierten Website ab nur <span className="font-bold text-yellow-400">29,90€</span>.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-lg font-bold text-white mb-2">Schnelle Umsetzung</h3>
                <p className="text-white/70 text-sm">Deine Branche wird priorisiert entwickelt</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="text-lg font-bold text-white mb-2">Premium Qualität</h3>
                <p className="text-white/70 text-sm">Conversion-optimiertes Design</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-bold text-white mb-2">Sofort einsetzbar</h3>
                <p className="text-white/70 text-sm">Mit deinem Branding personalisiert</p>
              </div>
            </div>

            <button
              onClick={() => setShowRequestModal(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all hover:scale-105 shadow-2xl"
            >
              <Sparkles className="w-6 h-6" />
              Jetzt Branche anfragen
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Section Registry</h3>
            <p className="text-white/70">
              10 pre-built sections including Hero, Features, BeforeAfter, Pricing, and more.
              Easily extensible for custom sections.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dynamic Theming</h3>
            <p className="text-white/70">
              Per-industry branding with custom colors, fonts, and styling.
              Theme tokens applied via CSS variables.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Admin Panel</h3>
            <p className="text-white/70">
              Toggle visibility, reorder sections, and edit content with JSON props.
              Drag & drop interface included.
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Tech Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-4xl mb-2">⚛️</div>
              <div className="text-white font-semibold">React + TS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <div className="text-white font-semibold">Tailwind CSS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🗄️</div>
              <div className="text-white font-semibold">Supabase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-white font-semibold">Vite</div>
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {showRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Branche anfragen</h3>
                  <p className="text-white/70">Erhalte deine personalisierte Website ab 29,90€</p>
                </div>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Anfrage gesendet!</h4>
                  <p className="text-white/70 mb-6">Calendly öffnet sich gleich für die Terminbuchung...</p>
                  <button
                    onClick={() => {
                      setShowRequestModal(false);
                      setSubmitSuccess(false);
                      setFormData({ industryName: '', email: '' });
                    }}
                    className="text-white/70 hover:text-white underline"
                  >
                    Schließen
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Branche *</label>
                    <input
                      type="text"
                      required
                      value={formData.industryName}
                      onChange={(e) => setFormData({ ...formData, industryName: e.target.value })}
                      placeholder="z.B. Friseur, Immobilien, Fitness..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">E-Mail Adresse *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="deine@email.de"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-white/80 text-sm mb-3">
                      <span className="font-semibold">Nächster Schritt:</span> Nach dem Absenden kannst du direkt einen Termin in unserem Kalender buchen.
                    </p>
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-semibold">Calendly-Integration für Terminbuchung</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}
                  </button>

                  <p className="text-white/50 text-xs text-center">
                    Mit dem Absenden stimmst du unseren Datenschutzbestimmungen zu.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
