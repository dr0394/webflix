import React, { useState } from 'react';
import { Lightbulb, Palette, Server, Brain, TreeDeciduous, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import FeatureModal from './FeatureModal';
import { featureDetails } from '../data/featureDetails';

const features = [
  {
    icon: Lightbulb,
    headline: "Innovation",
    subheadline: "Premium Website Designs.\nGemacht, um zu überzeugen.",
    image: "https://i.imgur.com/MjiMjY7.jpeg",
    borderColor: "border-green-500/30 hover:border-green-400/60",
    detailKey: "innovation"
  },
  {
    icon: Palette,
    headline: "Die neuesten Designs",
    subheadline: "Fokus auf perfekte\nBranche-Anpassung",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    borderColor: "border-pink-500/30 hover:border-pink-400/60",
    detailKey: "designs"
  },
  {
    icon: Server,
    headline: "Server Hosting & Domain",
    subheadline: "Die schnellsten\nLadezeiten.",
    image: "https://i.imgur.com/8VGvWCu.jpeg",
    borderColor: "border-orange-500/30 hover:border-orange-400/60",
    detailKey: "hosting"
  },
  {
    icon: Brain,
    headline: "Webflix und Artificial Intelligence",
    subheadline: "Keine Magie.\nSondern System.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop",
    borderColor: "border-green-500/30 hover:border-green-400/60",
    detailKey: "ai"
  },
  {
    icon: TreeDeciduous,
    headline: "Umwelt",
    subheadline: "Für jede Website\nwird ein Baum gepflanzt.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=600&fit=crop",
    borderColor: "border-pink-500/30 hover:border-pink-400/60",
    detailKey: "environment"
  },
  {
    icon: ShieldCheck,
    headline: "Backup-Systeme",
    subheadline: "Sicherheit.\nan einem Ort",
    image: "https://i.imgur.com/nGf5GIo.png",
    borderColor: "border-orange-500/30 hover:border-orange-400/60",
    detailKey: "backup"
  }
];

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  const whatsappNumber = "4915146692387";
  const whatsappMessage = encodeURIComponent("Hallo! Ich möchte meinen kostenlosen Website-Entwurf für 347€ erhalten.");

  return (
    <>
      <section id="designs-section" className="py-12 sm:py-16 px-4 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          {/* Badge and Heading Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/10 to-emerald-400/10 border border-green-400/20 rounded-full mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Webflix zum Mitnehmen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Ihre Premium Webflix Website
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              ist in 48 Stunden online – einfach bestellen und loslegen
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
            <h3 className="text-left text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Lerne WEBFLIX kennen.
            </h3>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-300 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Für 347€ starten
            </a>
          </div>
          <div className="relative overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedFeature(feature)}
                  className="relative w-[280px] sm:w-[320px] h-[480px] sm:h-[520px] rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0 border border-white/20 hover:border-green-400/60 transition-all duration-300"
                >
                  <img
                    src={feature.image}
                    alt={feature.headline}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/90"></div>

                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div>
                      <span className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4 block">
                        {feature.headline}
                      </span>
                      <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight whitespace-pre-line">
                        {feature.subheadline}
                      </h3>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeature(feature);
                        }}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 group-hover:scale-110"
                        aria-label="Mehr erfahren"
                      >
                        <Plus className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6 mb-12">
            {features.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/60 transition-colors"
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Price Section */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
            <div className="mb-6">
              <div className="text-5xl sm:text-6xl font-black text-white mb-2">347€</div>
              <div className="text-xl text-green-400 font-medium">Einmalzahlung - Keine Abo-Falle</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Premium Website-Design</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Hosting & Domain inklusive</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">SSL-Zertifikat & Sicherheit</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Mobile optimiert</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">SEO-optimiert</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Kontaktformular</span>
              </div>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Entwurf per WhatsApp erhalten
            </a>
          </div>
        </div>
      </section>

      {selectedFeature && (
        <FeatureModal
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
          category={selectedFeature.headline}
          title={selectedFeature.subheadline.replace('\n', ' ')}
          icon={selectedFeature.icon}
          details={featureDetails[selectedFeature.detailKey]}
        />
      )}
    </>
  );
};

export default FeaturesSection;