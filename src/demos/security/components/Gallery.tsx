import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Moderne Alarmanlage',
      category: 'Alarmanlagen'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: '4K Überwachungskamera',
      category: 'Videoüberwachung'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/277593/pexels-photo-277593.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Fingerprint-Scanner',
      category: 'Zutrittskontrolle'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Brandmeldeanlage',
      category: 'Brandschutz'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Smart Home Security',
      category: 'Smart Home'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Hausnotruf-System',
      category: 'Notrufsysteme'
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Perimeter-Überwachung',
      category: 'Perimeterschutz'
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Objektschutz',
      category: 'Gebäudesicherheit'
    },
    {
      id: 9,
      image: 'https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Überwachungszentrale',
      category: 'Monitoring'
    },
    {
      id: 10,
      image: 'https://images.pexels.com/photos/277593/pexels-photo-277593.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Sicherheitsschleuse',
      category: 'Zugang'
    },
    {
      id: 11,
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
      type: 'image',
      title: 'Sicherheitstechnik',
      category: 'Installation'
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <section className="py-24 bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
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
              <div className="w-12 h-12 rounded-full bg-red-400/30 shadow-lg animate-glow flex items-center justify-center relative overflow-hidden border border-red-400">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-shimmer"></div>
                <Eye className="w-6 h-6 text-red-300 relative z-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-red-200 to-red-300 bg-clip-text text-transparent font-poppins">
                Unsere Sicherheitsprojekte
              </h2>
            </div>
            <p className="text-xl text-red-100 max-w-3xl mx-auto font-montserrat">
              So sicher war Ihr Eigentum noch nie – überzeugen Sie sich selbst!
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl bg-red-800/50 backdrop-blur-sm border border-red-700/50 hover:border-red-500/50 transition-all duration-500 hover:scale-105 cursor-pointer ${
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

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none group-hover:shadow-lg shadow-red-400/20"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-red-800/50 backdrop-blur-xl rounded-3xl p-8 border border-red-700/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent animate-shimmer"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
                Lust auf die gleiche Sicherheit? Jetzt Sicherheitslösung buchen.
              </h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto font-montserrat">
                Lassen Sie uns auch Ihr Eigentum professionell absichern
              </p> 
              <a
                href="/configurator"
                className="group relative inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10 mr-3">Website kaufen</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
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
              src={galleryImages[selectedImage].image}
              alt={galleryImages[selectedImage].title}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
            
            {/* Image Info */}
            {(galleryImages[selectedImage].title || galleryImages[selectedImage].category) && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
                {galleryImages[selectedImage].category && (
                  <span className="inline-block px-3 py-1 bg-red-400/30 text-red-300 text-sm font-medium rounded-full border border-red-400 mb-2">
                    {galleryImages[selectedImage].category}
                  </span>
                )}
                {galleryImages[selectedImage].title && (
                  <h3 className="text-lg font-semibold">
                    {galleryImages[selectedImage].title}
                  </h3>
                )}
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;