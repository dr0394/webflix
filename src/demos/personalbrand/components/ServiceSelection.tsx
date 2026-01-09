import React from 'react';
import { User, BookOpen, Video, Zap, Camera, Mic, Sparkles, TrendingUp } from 'lucide-react';

interface ServiceSelectionProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
  onServiceClick?: (service: any) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ selectedService, onServiceSelect, onServiceClick }) => {
  const services = [
    {
      id: 'coaching',
      name: 'COACHING',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: User,
      description: 'Life & Business Coach',
      features: ['Über mich Sektion', 'Service-Übersicht', 'Terminbuchung'],
      details: {
        title: 'Coach Website', 
        subtitle: 'Professionelle Präsenz für Coaches',
        features: [
          'Professionelle Über-mich Sektion',
          'Service- und Paket-Übersicht',
          'Online Terminbuchung',
          'Testimonials und Erfolgsgeschichten'
        ],
        services: [
          { name: 'Coach Landingpage' },
          { name: 'Service-Portfolio' },
          { name: 'Terminbuchung' }
        ],
        tips: [
          'Authentische Über-mich Story entwickeln',
          'Klare Service-Pakete definieren',
          'Testimonials sammeln und präsentieren'
        ],
        specialties: 'Coaches brauchen Vertrauen - wir schaffen eine authentische Online-Präsenz, die Ihre Expertise unterstreicht.'
      }
    },
    {
      id: 'foodblogger',
      name: 'FOOD BLOGGER',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: BookOpen,
      description: 'Kulinarische Inhalte',
      features: ['Rezept-Sammlung', 'Instagram Feed', 'Newsletter'],
      details: {
        title: 'Food Blogger Website',
        subtitle: 'Appetitliche Online-Präsenz',
        features: [
          'Rezept-Datenbank mit Suchfunktion',
          'Instagram Feed Integration',
          'Newsletter-Anmeldung',
          'Food-Fotografie Galerie'
        ],
        services: [
          { name: 'Food Blog' },
          { name: 'Rezept-Portal' },
          { name: 'Social Integration' }
        ],
        tips: [
          'Hochwertige Food-Fotografie verwenden',
          'Rezepte kategorisieren und durchsuchbar machen',
          'Regelmäßig neue Inhalte veröffentlichen'
        ],
        specialties: 'Food Blogger leben von visuellen Inhalten - wir setzen Ihre Rezepte appetitlich in Szene.'
      }
    },
    {
      id: 'contentcreator',
      name: 'CONTENT CREATOR',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Video,
      description: 'Social Media Influencer',
      features: ['Content Portfolio', 'Media Kit', 'Brand Partnerships'],
      details: {
        title: 'Content Creator Hub',
        subtitle: 'Zentrale Anlaufstelle für Ihre Marke',
        features: [
          'Content Portfolio Showcase',
          'Professionelles Media Kit',
          'Brand Partnership Bereich',
          'Social Media Integration'
        ],
        services: [
          { name: 'Creator Portfolio' },
          { name: 'Media Kit' },
          { name: 'Brand Hub' }
        ],
        tips: [
          'Beste Content-Pieces prominent zeigen',
          'Statistiken und Reichweite transparent darstellen',
          'Professionelles Media Kit bereitstellen'
        ],
        specialties: 'Content Creator brauchen eine zentrale Anlaufstelle - wir schaffen Ihren digitalen Hub.'
      }
    },
    {
      id: 'fitnesstrainer',
      name: 'FITNESS TRAINER',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Zap,
      description: 'Personal Training',
      features: ['Workout-Pläne', 'Erfolgsgeschichten', 'Online-Kurse'],
      details: {
        title: 'Fitness Trainer Website',
        subtitle: 'Motivierende Online-Präsenz',
        features: [
          'Workout-Pläne und Programme',
          'Vorher/Nachher Erfolgsgeschichten',
          'Online-Kurs Integration',
          'Ernährungstipps und Guides'
        ],
        services: [
          { name: 'Trainer Portfolio' },
          { name: 'Online-Kurse' },
          { name: 'Fitness-Programme' }
        ],
        tips: [
          'Transformation-Stories prominent zeigen',
          'Verschiedene Fitness-Level ansprechen',
          'Ernährung und Training kombinieren'
        ],
        specialties: 'Fitness Trainer inspirieren durch Ergebnisse - wir setzen Ihre Erfolge motivierend in Szene.'
      }
    },
    {
      id: 'kuenstler',
      name: 'KÜNSTLER',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Camera,
      description: 'Portfolio & Galerie',
      features: ['Portfolio Galerie', 'Ausstellungen', 'Shop Integration'],
      details: {
        title: 'Künstler Portfolio',
        subtitle: 'Kreative Werke professionell präsentiert',
        features: [
          'Hochauflösende Portfolio-Galerie',
          'Ausstellungs- und Event-Kalender',
          'Online-Shop Integration',
          'Künstler-Biografie und Statement'
        ],
        services: [
          { name: 'Portfolio Website' },
          { name: 'Online-Galerie' },
          { name: 'Kunst-Shop' }
        ],
        tips: [
          'Hochwertige Werkfotografie verwenden',
          'Künstlerische Vision klar kommunizieren',
          'Verschiedene Werkserien organisieren'
        ],
        specialties: 'Kunst braucht die richtige Präsentation - wir schaffen den perfekten digitalen Ausstellungsraum.'
      }
    },
    {
      id: 'podcaster',
      name: 'PODCASTER',
      image: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Mic,
      description: 'Audio Content Hub',
      features: ['Episode-Archiv', 'Gäste-Booking', 'Sponsoren-Bereich'],
      details: {
        title: 'Podcast Website',
        subtitle: 'Zentrale Anlaufstelle für Ihren Podcast',
        features: [
          'Episode-Archiv mit Player',
          'Gäste-Booking System',
          'Sponsoren und Partner Bereich',
          'Podcast-Statistiken Dashboard'
        ],
        services: [
          { name: 'Podcast Hub' },
          { name: 'Episode-Portal' },
          { name: 'Booking-System' }
        ],
        tips: [
          'Episoden kategorisieren und durchsuchbar machen',
          'Gäste-Profile und Interviews hervorheben',
          'Sponsoren-Möglichkeiten klar darstellen'
        ],
        specialties: 'Podcaster brauchen eine zentrale Plattform - wir schaffen Ihren Audio-Content-Hub.'
      }
    },
    {
      id: 'berater',
      name: 'BERATER',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TrendingUp,
      description: 'Business Consulting',
      features: ['Expertise-Bereiche', 'Case Studies', 'Kontakt-Formular'],
      details: {
        title: 'Berater Website',
        subtitle: 'Professionelle Beratungsdienstleistungen',
        features: [
          'Expertise-Bereiche übersichtlich',
          'Case Studies und Erfolgsgeschichten',
          'Professionelles Kontakt-System',
          'Beratungspaket-Übersicht'
        ],
        services: [
          { name: 'Berater-Portfolio' },
          { name: 'Case Studies' },
          { name: 'Consulting-Hub' }
        ],
        tips: [
          'Expertise klar und verständlich kommunizieren',
          'Erfolgreiche Projekte als Case Studies zeigen',
          'Beratungsprozess transparent darstellen'
        ],
        specialties: 'Berater verkaufen Expertise - wir machen Ihr Wissen und Ihre Erfolge sichtbar.'
      }
    },
    {
      id: 'lifestyle',
      name: 'LIFESTYLE',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Sparkles,
      description: 'Lifestyle & Fashion',
      features: ['Lifestyle-Content', 'Fashion-Tipps', 'Brand-Kooperationen'],
      details: {
        title: 'Lifestyle Website',
        subtitle: 'Authentischer Lifestyle-Content',
        features: [
          'Lifestyle-Blog mit Kategorien',
          'Fashion und Beauty Tipps',
          'Brand-Kooperationen Showcase',
          'Personal Story und Inspiration'
        ],
        services: [
          { name: 'Lifestyle-Blog' },
          { name: 'Fashion-Portal' },
          { name: 'Brand-Hub' }
        ],
        tips: [
          'Authentische Personal Story erzählen',
          'Lifestyle-Content kategorisieren',
          'Brand-Kooperationen professionell präsentieren'
        ],
        specialties: 'Lifestyle-Influencer leben von Authentizität - wir schaffen eine persönliche und ansprechende Präsenz.'
      }
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {services.map((service, index) => {
          const isSelected = selectedService === service.id;
          const IconComponent = service.icon;
          
          return (
            <div
              key={service.id}
              onClick={() => {
                onServiceSelect(service.id);
                if (onServiceClick) {
                  onServiceClick(service);
                }
              }}
              className={`relative flex-shrink-0 w-48 h-64 md:w-56 md:h-72 cursor-pointer group transition-all duration-500 hover:scale-105 ${
                isSelected ? 'scale-105 z-10' : ''
              }`}
              style={{
                transform: `skewX(-8deg) ${isSelected ? 'scale(1.05)' : ''}`,
                transformOrigin: 'center'
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-t from-purple-900/90 via-purple-800/60 to-transparent' 
                    : 'bg-gradient-to-t from-purple-900/80 via-purple-800/40 to-purple-600/20 group-hover:from-purple-900/90'
                }`}>
                  {/* Shimmer Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-shimmer opacity-30"></div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div 
                className="relative h-full flex flex-col justify-between p-6 text-white z-10"
                style={{ transform: 'skewX(8deg)' }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? 'bg-purple-400/30 shadow-lg animate-glow border border-purple-400' 
                      : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-shimmer rounded-full"></div>
                    )}
                    <IconComponent className={`w-6 h-6 relative z-10 ${
                      isSelected ? 'text-purple-300' : 'text-white'
                    }`} />
                  </div>
                </div>

                {/* Service Name */}
                <div className="text-center">
                  <h3 className={`font-poppins font-bold text-lg mb-2 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white drop-shadow-lg text-xl' 
                      : 'text-white/90 group-hover:text-white'
                  }`}>
                    {service.name}
                  </h3>
                  <p className={`font-montserrat text-sm transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/90 drop-shadow-md' 
                      : 'text-white/70 group-hover:text-white/80'
                  }`}>
                    {service.description}
                  </p>
                </div>
                
                {/* Features */}
                <div className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center text-xs text-white/60 group-hover:text-white/70 transition-colors duration-300 font-poppins">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-purple-400/30 shadow-lg flex items-center justify-center animate-glow border border-purple-400">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-shimmer rounded-full"></div>
                      <svg className="w-5 h-5 text-purple-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                  isSelected 
                    ? 'shadow-xl shadow-purple-400/20' 
                    : 'group-hover:shadow-lg shadow-purple-400/10'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          {services.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-slate-300 opacity-50"
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ServiceSelection;