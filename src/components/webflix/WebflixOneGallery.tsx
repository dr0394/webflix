import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id?: number;
  image: string;
  title?: string;
  category?: string;
}

interface WebflixOneGalleryProps {
  images: GalleryImage[];
  primaryColor: string;
  ctaText?: string;
  isPreviewMode?: boolean;
  onCtaClick?: () => void;
}

const WebflixOneGallery: React.FC<WebflixOneGalleryProps> = ({
  images = [],
  primaryColor = '#3b82f6',
  ctaText = 'Jetzt anfragen',
  isPreviewMode = false,
  onCtaClick
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPreviewMode) {
      e.preventDefault();
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: `${primaryColor}15` }}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl animate-float" style={{ backgroundColor: `${primaryColor}15`, animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse-slow" style={{ backgroundColor: `${primaryColor}10` }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full shadow-silver-lg animate-glow flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${primaryColor}20` }}>
                <Eye className="w-6 h-6 relative z-10" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent font-poppins">
                Unsere Projekte
              </h2>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-montserrat">
              Überzeugen Sie sich selbst von unserer Arbeit
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {images.map((item, index) => (
            <div
              key={item.id || index}
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 'aspect-[4/3]'
              }`}
              style={{
                backgroundColor: `${primaryColor}10`,
                borderColor: `${primaryColor}30`
              }}
              onClick={() => openLightbox(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${primaryColor}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${primaryColor}30`;
              }}
            >
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title || `Projekt ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div
            className="backdrop-blur-xl rounded-3xl p-8 border relative overflow-hidden"
            style={{
              backgroundColor: `${primaryColor}10`,
              borderColor: `${primaryColor}30`
            }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
                Bereit für Ihr Projekt?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto font-montserrat">
                Kontaktieren Sie uns noch heute
              </p>
              <button
                onClick={onCtaClick}
                className="group relative inline-flex items-center px-8 py-4 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="relative z-10 mr-3">{ctaText}</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].image}
              alt={images[selectedImage].title || `Projekt ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />

            {(images[selectedImage].title || images[selectedImage].category) && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
                {images[selectedImage].category && (
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full shadow-silver mb-2" style={{ backgroundColor: `${primaryColor}80`, color: 'white' }}>
                    {images[selectedImage].category}
                  </span>
                )}
                {images[selectedImage].title && (
                  <h3 className="text-lg font-semibold">
                    {images[selectedImage].title}
                  </h3>
                )}
              </div>
            )}

            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WebflixOneGallery;
