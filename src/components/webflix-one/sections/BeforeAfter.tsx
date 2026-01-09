import React, { useState } from 'react';
import { BeforeAfterProps } from '../types';

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ title, subtitle, images }) => {
  const [sliderPositions, setSliderPositions] = useState<number[]>(
    images.map(() => 50)
  );

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPositions(prev => {
      const newPositions = [...prev];
      newPositions[index] = percent;
      return newPositions;
    });
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-center">{image.title}</h3>

              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize shadow-xl"
                onMouseMove={(e) => handleMouseMove(index, e)}
              >
                <img
                  src={image.after}
                  alt={`${image.title} - Nach`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPositions[index]}% 0 0)` }}
                >
                  <img
                    src={image.before}
                    alt={`${image.title} - Vorher`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                  style={{ left: `${sliderPositions[index]}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-gray-400 rounded" />
                      <div className="w-1 h-4 bg-gray-400 rounded" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  Vorher
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  Nachher
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
