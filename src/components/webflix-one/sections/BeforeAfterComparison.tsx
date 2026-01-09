import React, { useState, useRef, useEffect } from 'react';

export interface BeforeAfterImage {
  before: string;
  after: string;
  title: string;
}

export interface BeforeAfterComparisonProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  images: BeforeAfterImage[];
  showSlider?: boolean;
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  title = "Vorher / Nachher",
  subtitle = "Sehen Sie den Unterschied",
  badge = "Unsere Ergebnisse",
  images,
  showSlider = false
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  if (showSlider && images.length > 0) {
    const activeImage = images[activeImageIndex];

    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            {badge && (
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {badge}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600">
                {subtitle}
              </p>
            )}
          </div>

          {/* Slider Component */}
          <div className="max-w-4xl mx-auto mb-8">
            <div
              ref={containerRef}
              className="relative w-full h-96 overflow-hidden rounded-2xl cursor-col-resize select-none shadow-2xl"
              onMouseMove={handleMouseMove}
            >
              {/* After Image (Background) */}
              <div className="absolute inset-0">
                <img
                  src={activeImage.after}
                  alt="Nach der Reinigung"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Nachher
                </div>
              </div>

              {/* Before Image (Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={activeImage.before}
                  alt="Vor der Reinigung"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Vorher
                </div>
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* Slider Handle */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-col-resize"
                  onMouseDown={() => setIsDragging(true)}
                >
                  <div className="flex space-x-0.5">
                    <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
                    <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                Ziehen Sie den Regler, um den Unterschied zu sehen
              </div>
            </div>

            {/* Title */}
            {activeImage.title && (
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-gray-900">{activeImage.title}</h3>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex justify-center gap-4 flex-wrap">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden transition-all ${
                    activeImageIndex === index
                      ? 'ring-4 ring-blue-500 scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.after}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Standard Grid View
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {badge && (
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {images.map((item, idx) => (
            <div key={idx} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative aspect-square">
                    <img
                      src={item.before}
                      alt="Vorher"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      VORHER
                    </div>
                  </div>
                  <div className="relative aspect-square">
                    <img
                      src={item.after}
                      alt="Nachher"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NACHHER
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
