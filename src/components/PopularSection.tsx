import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Car, TreePine, User, Building, Brush, Sparkles, Wrench, Heart, Shield, Filter, Activity, Zap, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
}

const categories: Category[] = [
  { id: 'beliebteste', name: 'Beliebteste', description: 'Meist gewählte Templates' },
  { id: 'business', name: 'Business & Unternehmen', description: 'Professionelle Unternehmens-Websites' },
  { id: 'dienstleistungen', name: 'Dienstleistungen', description: 'Service-orientierte Websites' },
  { id: 'gastro', name: 'Gastro & Events', description: 'Restaurants und Veranstaltungen' },
  { id: 'gesundheit', name: 'Gesundheit & Beratung', description: 'Medizin und Beratungsdienstleistungen' },
  { id: 'kreativ', name: 'Kreativ & Portfolio', description: 'Künstler und kreative Berufe' },
  { id: 'persoenlich', name: 'Persönlich & Non-Profit', description: 'Personal Brands und gemeinnützige Organisationen' }
];

const templates = [
  {
    id: 1,
    title: "Autoaufbereitung Premium",
    description: "Vorher/Nachher Slider, Fahrzeug-Auswahl, WhatsApp Integration",
    tags: ["Template", "Interactive", "WhatsApp"],
    icon: Car,
    image: 'https://i.imgur.com/MjiMjY7.jpeg',
    route: '/demo/autoaufbereitung',
    category: 'dienstleistungen'
  },
  {
    id: 2,
    title: "Gartenlandschaftsbau Pro",
    description: "Service-Auswahl, Galerie, Karten Integration",
    tags: ["Template", "Services", "Maps"],
    icon: TreePine,
    image: 'https://i.imgur.com/0mHEmf3.jpeg',
    route: '/demo/gartenlandschaftsbau',
    category: 'dienstleistungen'
  },
  {
    id: 3,
    title: "Personal Brand Premium",
    description: "Coach, Food Blogger, Content Creator Websites",
    tags: ["Template", "Personal", "Branding"],
    icon: User,
    image: 'https://i.imgur.com/7IJKzc4.jpeg',
    route: '/demo/personalbrand',
    category: 'persoenlich'
  },
  {
    id: 4,
    title: "Gebäudereinigung Pro",
    description: "Vorher/Nachher, Terminbuchung, Bewertungen",
    tags: ["Template", "SEO-Ready", "Responsive"],
    icon: Building,
    image: 'https://i.imgur.com/dWlxNBn.jpeg',
    route: '/demo/gebaeudereinigung',
    category: 'dienstleistungen'
  },
  {
    id: 5,
    title: "Malerbetrieb Meister",
    description: "Farbwelten, Projekt-Cases",
    tags: ["Portfolio", "Gallery", "Projects"],
    icon: Brush,
    image: 'https://i.imgur.com/W8bkBWj.png',
    route: '/demo/handwerk',
    category: 'dienstleistungen'
  },
  {
    id: 6,
    title: "Beauty & Friseur",
    description: "Termin-Engine, Instagram-Feed",
    tags: ["Booking", "Social", "Instagram"],
    icon: Sparkles,
    image: 'https://i.imgur.com/0HOBrtx.png',
    route: '/demo/beauty',
    category: 'gesundheit'
  },
  {
    id: 7,
    title: "Handwerker Pro",
    description: "Leistungen, Referenzen, Kontakt-System",
    tags: ["Handwerk", "Portfolio", "Contact"],
    icon: Wrench,
    image: 'https://i.imgur.com/EOcPcH9.jpeg',
    route: '/demo/handwerk',
    category: 'dienstleistungen'
  },
  {
    id: 8,
    title: "Metallbau Profi",
    description: "Treppen, Geländer, Stahlkonstruktionen",
    tags: ["Metallbau", "Stahlbau", "Maßanfertigung"],
    icon: Building,
    image: 'https://i.imgur.com/ZTkwh4i.jpeg',
    route: '/demo/metallbau',
    category: 'dienstleistungen'
  },
  {
    id: 9,
    title: "Security Profi",
    description: "Alarmanlagen, Videoüberwachung, Zutrittskontrolle",
    tags: ["Sicherheit", "Überwachung", "Schutz"],
    icon: Shield,
    image: 'https://i.imgur.com/MjiMjY7.jpeg',
    route: '/demo/security',
    category: 'business'
  },
  {
    id: 10,
    title: "Wellness & Spa",
    description: "Behandlungen, Online-Buchung, Gutscheine",
    tags: ["Wellness", "Booking", "Vouchers"],
    icon: Heart,
    image: 'https://i.imgur.com/0mHEmf3.jpeg',
    category: 'gesundheit'
  },
  {
    id: 11,
    title: "Physiotherapie Praxis",
    description: "Terminbuchung, Team-Vorstellung, Leistungsübersicht",
    tags: ["Template", "Booking", "Healthcare"],
    icon: Activity,
    image: 'https://i.imgur.com/7IJKzc4.jpeg',
    route: '/demo/physiotherapie',
    category: 'gesundheit'
  },
  {
    id: 12,
    title: "Elektriker Meisterbetrieb",
    description: "Notdienst-Banner, Projekt-Galerie, Angebotsformular",
    tags: ["Template", "Emergency", "Services"],
    icon: Zap,
    image: 'https://i.imgur.com/dWlxNBn.jpeg',
    route: '/demo/elektriker',
    category: 'dienstleistungen'
  }
];

const PopularSection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState('beliebteste');

  const handleTemplateClick = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template?.route) {
      navigate(template.route);
    }
  };

  const filteredTemplates = selectedCategory === 'beliebteste' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-400 text-white text-xs font-semibold rounded-full">
              WEBFLIX TEMPLATES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Website-Kauf {' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-400 bg-clip-text text-transparent">
              war noch nie so einfach
            </span>
          </h2>
          Vergiss komplizierte Briefings und endlose Abstimmungen. Suche dir einfach eines unserer Premium-Designs aus, füge deine Inhalte hinzu und freue dich in 48 Stunden über deine neue Website - so einfach wie Online-Shopping
        </div>

        
        {/* Category Filter */}
        <div className="mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-400 text-white shadow-lg'
                    : 'bg-[#333333] text-gray-300 hover:bg-[#404040] border border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {filteredTemplates.map((template) => {
              const IconComponent = template.icon;
              const hasDemo = template.route;
              
              return (
                <div
                  key={template.id}
                  className={`group relative flex-shrink-0 w-72 sm:w-80 h-56 sm:h-64 cursor-pointer transition-all duration-500 hover:scale-105 ${
                    hasDemo ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={() => hasDemo && handleTemplateClick(template.id)}
                  style={{
                    transform: 'skewX(-4deg)',
                    transformOrigin: 'center'
                  }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
                    style={{ backgroundImage: template.image ? `url(${template.image})` : 'none' }}
                  >
                    {/* Dark Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 group-hover:from-black/95 transition-all duration-500">
                      {/* Shimmer Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="relative h-full flex flex-col justify-between p-4 sm:p-6 text-white z-10"
                    style={{ transform: 'skewX(4deg)' }}
                  >
                    {/* Icon & ID */}
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-400 flex items-center justify-center shadow-lg">
                        {IconComponent ? (
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        ) : (
                          <span className="text-black font-bold text-base sm:text-lg">{template.id}</span>
                        )}
                      </div>
                      {hasDemo && (
                        <div className="bg-green-500/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-green-400">
                          <span className="text-green-300 text-[10px] sm:text-xs font-medium">VERFÜGBAR</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                        <h3 className="font-montserrat font-bold text-lg sm:text-xl text-white group-hover:text-pink-300 transition-colors duration-300">
                          {template.title}
                        </h3>
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-orange-500/20 to-pink-400/20 text-pink-300 text-[10px] sm:text-xs rounded-full border border-pink-400/30 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-2 sm:mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white text-xs sm:text-sm rounded-lg font-semibold transition-all duration-200 flex items-center justify-center mx-auto">
                        {hasDemo ? (
                          <>
                            <span>Jetzt konfigurieren</span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                          </>
                        ) : (
                          'Bald verfügbar'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex space-x-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="w-2 h-2 rounded-full bg-pink-400 opacity-30"
              ></div>
            ))}
          </div>
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
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default PopularSection;