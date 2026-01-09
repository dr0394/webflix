import React from 'react';
import { X, LucideIcon } from 'lucide-react';

interface FeatureDetail {
  title: string;
  description: string;
  image?: string;
}

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  title: string;
  icon: LucideIcon;
  details: FeatureDetail[];
}

export default function FeatureModal({ isOpen, onClose, category, title, icon: Icon, details }: FeatureModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full sm:my-8 max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-black/10 px-4 sm:px-6 md:px-8 py-4 rounded-t-3xl z-10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider truncate">{category}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Schließen"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12 overflow-y-auto flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 leading-tight">
            {title}
          </h2>

          <div className="space-y-12 sm:space-y-16">
            {details.map((detail, index) => (
              <div key={index} className="rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 p-6 sm:p-8 border border-gray-200">
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {detail.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    {detail.description}
                  </p>
                </div>
                {detail.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={detail.image}
                      alt={detail.title}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <button
              onClick={() => window.location.href = '/shop'}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              Zum Showroom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
