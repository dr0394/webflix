import React, { useState } from 'react';
import { Lightbulb, Palette, Server, Brain, TreeDeciduous, ShieldCheck, Plus } from 'lucide-react';
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

  return (
    <>
      <section id="designs-section" className="py-12 sm:py-16 px-4 bg-[#F3F3F5]">
        <div className="container mx-auto max-w-7xl">
          {/* Badge and Heading Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400/10 to-pink-400/10 border border-orange-400/20 rounded-full mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Webflix zum Mitnehmen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3">
              Ihre Premium Website zum Mitnehmen
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              ist in 48 Stunden online – einfach bestellen und loslegen
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
            <h3 className="text-left text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Lerne WEBFLIX kennen.
            </h3>
            <a
              href="/zum-mitnehmen"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 whitespace-nowrap"
            >
              Direkt zum Showroom
            </a>
          </div>
          <div className="relative overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedFeature(feature)}
                  className="relative w-[280px] sm:w-[320px] h-[480px] sm:h-[520px] rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0 border border-white/20 hover:border-white/40 transition-all duration-300"
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

          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/60 transition-colors"
                aria-label={`Slide ${index + 1}`}
              />
            ))}
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