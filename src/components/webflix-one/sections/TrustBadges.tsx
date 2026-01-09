import React, { useState } from 'react';
import { CheckCircle, Star, Clock, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { LuxuryTrustRadial } from './LuxuryGardenVariants';

export interface TrustPoint {
  text: string;
  icon: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface TrustBadge {
  icon: string;
  value: string;
  label: string;
}

export interface TrustBadgesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  trustPoints?: TrustPoint[];
  badges?: TrustBadge[];
  reviews?: Review[];
  showReviews?: boolean;
  googleRating?: number;
  googleReviewCount?: number;
  googleReviewLink?: string;
  designVariant?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'CheckCircle': CheckCircle,
  'Star': Star,
  'Clock': Clock,
  'Heart': Heart,
  'Sparkles': Sparkles
};

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  title = "Warum Kunden uns wählen",
  subtitle = "Premium Qualität garantiert",
  description = "Bei uns steht Ihre Zufriedenheit an erster Stelle. Erleben Sie den Unterschied professioneller Fahrzeugpflege.",
  trustPoints,
  badges,
  reviews = [],
  showReviews = true,
  googleRating = 5.0,
  googleReviewCount = 12,
  googleReviewLink = "",
  designVariant = 'default'
}) => {
  // Route to design variants
  if (designVariant === 'luxury-trust-radial' && badges) {
    return <LuxuryTrustRadial title={title} badges={badges} />;
  }

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800/20 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gray-100 text-gray-700 border border-gray-200">
                {title}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {subtitle}
              </h3>
              <p className="text-lg text-gray-300 font-medium mb-8 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {trustPoints.map((point, index) => {
                const IconComponent = iconMap[point.icon] || CheckCircle;
                return (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-lg text-white font-semibold">
                      {point.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Google Reviews */}
          {showReviews && reviews.length > 0 && (
            <div className="space-y-6">
              {/* Google Reviews Header */}
              <div className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-2xl flex items-center justify-center">
                      <span className="text-xl font-bold text-white">G</span>
                    </div>
                    <span className="text-2xl font-bold text-white">Google</span>
                    <span className="text-gray-300 font-medium">Bewertungen</span>
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-4xl font-bold text-white">{googleRating.toFixed(1)}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-300 font-medium">({googleReviewCount})</span>
                  </div>
                </div>

                {/* Reviews Slider */}
                <div className="relative bg-gray-900/50 rounded-xl p-6 border border-gray-700 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevReview}
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>

                    <div className="flex gap-2">
                      {reviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentReview(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentReview ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextReview}
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="min-h-[200px] flex items-center">
                    <div className="w-full">
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        "{reviews[currentReview].text}"
                      </p>

                      <div className="text-center">
                        <p className="font-semibold text-white">
                          {reviews[currentReview].name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {reviews[currentReview].date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {googleReviewLink && (
                  <a
                    href={googleReviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    <span>Bewerten Sie uns auf Google</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
