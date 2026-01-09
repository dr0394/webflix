import React, { useState } from 'react';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LuxuryGalleryMasonry } from './LuxuryGardenVariants';

export interface GalleryImage {
  id: number;
  image: string;
  title: string;
  category: string;
}

export interface GalleryShowcaseProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  images: GalleryImage[];
  ctaText?: string;
  ctaLink?: string;
  showCTA?: boolean;
  designVariant?: string;
}

export const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({
  title = "Unsere Galerie",
  subtitle = "Überzeugen Sie sich selbst von unserer Arbeit",
  badge = "Portfolio",
  images,
  ctaText = "Jetzt anfragen",
  ctaLink = "/contact",
  showCTA = true,
  designVariant = 'default'
}) => {
  // Route to design variants
  if (designVariant === 'luxury-gallery-masonry') {
    return <LuxuryGalleryMasonry title={title} subtitle={subtitle} badge={badge} images={images} />;
  }

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800/20 to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {badge && (
            <span className="inline-block bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-400/30">
              {badge}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300">
              {subtitle}
            </p>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {images.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 hover:scale-105 cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 'aspect-[4/3]'
              }`}
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">{item.title}</p>
                  {item.category && (
                    <span className="text-xs text-gray-300">{item.category}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {showCTA && (
          <div className="text-center">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 relative overflow-hidden">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Lust auf den gleichen Wow-Effekt?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Lassen Sie uns auch Ihr Fahrzeug in neuem Glanz erstrahlen
              </p>
              <a
                href={ctaLink}
                className="group relative inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 mr-3">{ctaText}</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].image}
              alt={images[selectedImage].title}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
              {images[selectedImage].category && (
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full mb-2">
                  {images[selectedImage].category}
                </span>
              )}
              {images[selectedImage].title && (
                <h3 className="text-lg font-semibold">
                  {images[selectedImage].title}
                </h3>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
