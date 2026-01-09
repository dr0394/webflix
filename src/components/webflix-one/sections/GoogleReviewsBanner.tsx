import React from 'react';
import { Star } from 'lucide-react';

interface GoogleReviewsBannerProps {
  rating?: number;
  reviewCount?: number;
  reviews?: Array<{
    author: string;
    text: string;
    rating: number;
  }>;
}

export const GoogleReviewsBanner: React.FC<GoogleReviewsBannerProps> = ({
  rating = 5.0,
  reviewCount = 150,
  reviews = []
}) => {
  return (
    <section className="py-12 bg-gradient-to-r from-sky-50 to-blue-50 border-y border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">{rating}</span>
              </div>
              <p className="text-sm text-gray-600">
                Basierend auf {reviewCount} Google Bewertungen
              </p>
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="flex gap-4 overflow-x-auto md:overflow-visible">
              {reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-md min-w-[280px] md:min-w-0">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    "{review.text}"
                  </p>
                  <p className="text-xs font-semibold text-gray-900">
                    {review.author}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
