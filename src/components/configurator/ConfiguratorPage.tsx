import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Star, MessageCircle, BarChart2, BarChart3, Shield, Zap, Calendar, Car, Camera, MapPin, TreePine, User, ChevronRight, Euro, Bot, Search, Globe, Instagram, FileText, Calculator, Heart, Building, Brush, Sparkles, Wrench, ShoppingCart, Package, Clock, Rocket, ChevronDown, Tag, Percent, TrendingUp, Award, Zap as Lightning, Users, Eye, Layout, Gauge, PenTool, Plus, Minus, HelpCircle, Droplets, Settings, FileCheck, Palette, Circle, Hammer, Paintbrush, Leaf, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import AddonQuizModal from '../addons/AddonQuizModal';
import { addonQuestions } from '../addons/addonQuestions';
import AvailabilityBanner from '../AvailabilityBanner';
import WaitlistModal from '../WaitlistModal';
import { trackAddToCart, trackRemoveFromCart, trackViewCart, trackBeginCheckout } from '../../lib/analytics';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<any>;
  enabled: boolean;
  popular?: boolean;
  savings?: string;
}

interface Industry {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  demoUrl: string;
  color: string;
  gradient: string;
  rating: number;
  reviews: number;
  designName: string;
  designTier: 'essential' | 'premium' | 'luxury';
  parentId?: string;
  isCategory?: boolean;
  subIndustries?: Industry[];
}

const ConfiguratorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [duration, setDuration] = useState(12);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [customBasePrice, setCustomBasePrice] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState<string | null>(null);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);

  const industries: Industry[] = [
    {
      id: 'kfz',
      name: 'KFZ',
      description: 'Automobilbranche',
      icon: Car,
      demoUrl: '',
      color: 'text-[#F3F3F5]',
      gradient: 'from-[#F3F3F5] to-[#E8E8EA]',
      rating: 4.9,
      reviews: 450,
      designName: 'KFZ',
      designTier: 'premium',
      isCategory: true,
      subIndustries: [
        { id: 'autoaufbereitung', name: 'Autoaufbereitung', description: 'Professionelle Fahrzeugaufbereitung & Detailing', icon: Sparkles, demoUrl: '/demo/autoaufbereitung', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 127, designName: 'Premium Detailing', designTier: 'premium', parentId: 'kfz' },
        { id: 'autowaschanlage', name: 'Autowaschanlage', description: 'Moderne SB-Waschanlage mit Premium Service', icon: Droplets, demoUrl: '/demo/autoaufbereitung', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.8, reviews: 89, designName: 'Premium Wash', designTier: 'premium', parentId: 'kfz' },
        { id: 'autowerkstatt', name: 'Autowerkstatt', description: 'Meisterbetrieb für alle Marken und Modelle', icon: Settings, demoUrl: '/demo/autoaufbereitung', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 234, designName: 'Premium Werkstatt', designTier: 'premium', parentId: 'kfz' },
        { id: 'kfz-gutachter', name: 'KFZ-Gutachter', description: 'Unabhängige Sachverständige & Gutachten', icon: FileCheck, demoUrl: '/demo/autoaufbereitung', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 5.0, reviews: 178, designName: 'Premium Gutachter', designTier: 'premium', parentId: 'kfz' },
        { id: 'lackiererei', name: 'Lackiererei', description: 'Meisterbetrieb für Lackierung und Karosserie', icon: Palette, demoUrl: '/demo/autoaufbereitung', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 156, designName: 'Premium Lackierung', designTier: 'premium', parentId: 'kfz' },
        { id: 'smart-repair', name: 'Smart Repair', description: 'Spot-Reparatur für Lack, Delle & Steinschlag', icon: Wrench, demoUrl: '/demo/autoaufbereitung', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 187, designName: 'Premium Smart Repair', designTier: 'premium', parentId: 'kfz' }
      ]
    },
    { id: 'personalbrand', name: 'Personal Brand', description: 'Coach & Influencer', icon: User, demoUrl: '/demo/personalbrand', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 156, designName: 'Premium Personal', designTier: 'premium' },
    { id: 'beauty', name: 'Beauty & Friseur', description: 'Beauty & Wellness', icon: Sparkles, demoUrl: '/demo/beauty', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 5.0, reviews: 203, designName: 'Premium Beauty', designTier: 'premium' },
    {
      id: 'handwerk',
      name: 'Handwerk',
      description: 'Handwerksleistungen',
      icon: Wrench,
      demoUrl: '',
      color: 'text-[#F3F3F5]',
      gradient: 'from-[#F3F3F5] to-[#E8E8EA]',
      rating: 4.8,
      reviews: 520,
      designName: 'Handwerk',
      designTier: 'premium',
      isCategory: true,
      subIndustries: [
        { id: 'dachdecker', name: 'Dachdecker', description: 'Professionelle Dachdeckerarbeiten', icon: Home, demoUrl: 'https://handwerker-demo-webflix.bolt.host/dachdecker', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 5.0, reviews: 48, designName: 'Premium Dachdecker', designTier: 'premium', parentId: 'handwerk' },
        { id: 'elektriker', name: 'Elektriker', description: 'Moderne Elektroinstallationen', icon: Zap, demoUrl: 'https://handwerker-demo-webflix.bolt.host/elektriker', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 56, designName: 'Premium Elektriker', designTier: 'premium', parentId: 'handwerk' },
        { id: 'fliesenleger', name: 'Fliesenleger', description: 'Fachgerechte Fliesenverlegung', icon: Circle, demoUrl: 'https://handwerker-demo-webflix.bolt.host/fliesenleger', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.8, reviews: 42, designName: 'Premium Fliesenleger', designTier: 'premium', parentId: 'handwerk' },
        { id: 'gartenbau', name: 'Garten & Landschaftsbau', description: 'Professionelle Gartengestaltung', icon: Leaf, demoUrl: 'https://handwerker-demo-webflix.bolt.host/gartenbau', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 67, designName: 'Premium Gartenbau', designTier: 'premium', parentId: 'handwerk' },
        { id: 'gebaeudereinigung', name: 'Gebäudereinigung', description: 'Professionelle Reinigungsservice', icon: Sparkles, demoUrl: 'https://handwerker-demo-webflix.bolt.host/gebaeudereinigung', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.7, reviews: 52, designName: 'Premium Reinigung', designTier: 'premium', parentId: 'handwerk' },
        { id: 'klempner', name: 'Klempner & Spengler', description: 'Klempnerarbeiten & Blechverarbeitung', icon: Wrench, demoUrl: 'https://handwerker-demo-webflix.bolt.host/klempner', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.8, reviews: 39, designName: 'Premium Klempner', designTier: 'premium', parentId: 'handwerk' },
        { id: 'maler', name: 'Maler & Lackierer', description: 'Malerarbeiten & Lackierung', icon: Paintbrush, demoUrl: 'https://handwerker-demo-webflix.bolt.host/maler', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 61, designName: 'Premium Maler', designTier: 'premium', parentId: 'handwerk' },
        { id: 'maurer', name: 'Maurer & Betonbauer', description: 'Maurerarbeiten & Betonbau', icon: Building, demoUrl: 'https://handwerker-demo-webflix.bolt.host/maurer', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.8, reviews: 44, designName: 'Premium Maurer', designTier: 'premium', parentId: 'handwerk' },
        { id: 'metallbauer', name: 'Metallbauer', description: 'Metallbau & Stahlkonstruktionen', icon: Building, demoUrl: 'https://handwerker-demo-webflix.bolt.host/metallbauer', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.7, reviews: 38, designName: 'Premium Metallbau', designTier: 'premium', parentId: 'handwerk' },
        { id: 'sanitaer', name: 'Sanitär & Heizung', description: 'Sanitär & Heizungsinstallationen', icon: Droplets, demoUrl: 'https://handwerker-demo-webflix.bolt.host/sanitaer', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 58, designName: 'Premium Sanitär', designTier: 'premium', parentId: 'handwerk' },
        { id: 'schreiner', name: 'Schreiner & Tischler', description: 'Maßgefertigte Möbel & Holzarbeiten', icon: Hammer, demoUrl: 'https://handwerker-demo-webflix.bolt.host/schreiner', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 5.0, reviews: 55, designName: 'Premium Schreiner', designTier: 'premium', parentId: 'handwerk' }
      ]
    },
    { id: 'security', name: 'Sicherheitsdienst', description: 'Sicherheitstechnik', icon: Shield, demoUrl: '/demo/security', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.9, reviews: 134, designName: 'Premium Security', designTier: 'premium' },
    { id: 'bauunternehmen', name: 'Bauunternehmen', description: 'Bau & Sanierung', icon: Building, demoUrl: '/demo/bauunternehmen', color: 'text-[#F3F3F5]', gradient: 'from-[#F3F3F5] to-[#E8E8EA]', rating: 4.7, reviews: 98, designName: 'Premium Bau', designTier: 'premium' }
  ];

  useEffect(() => {
    // Check if we have shop data passed from the shop page
    const shopData = location.state as { selectedIndustry?: string; basePrice?: number; preselectedDesign?: string };
    if (shopData?.selectedIndustry) {
      setSelectedIndustry(shopData.selectedIndustry);

      // Check if the selected industry is a sub-industry and set the parent category
      const parentCategory = industries.find(cat =>
        cat.subIndustries?.some(sub => sub.id === shopData.selectedIndustry)
      );
      if (parentCategory) {
        setSelectedCategory(parentCategory.id);
      }
    }
    if (shopData?.basePrice !== undefined) {
      setCustomBasePrice(shopData.basePrice);
    }
  }, [location]);

  useEffect(() => {
    const defaultAddOns: AddOn[] = [
      { id: 'whatsapp', name: 'WhatsApp Anbindung', description: '1-Klick Kontakt über WhatsApp', price: 4.99, icon: MessageCircle, enabled: false, popular: true, savings: '+40% Anfragen' },
      { id: 'booking', name: 'Buchungssystem', description: 'Termin-Buchungen inkl. Kalender & Kunden-Dashboard', price: 19.99, oneTimePrice: 49, icon: Calendar, enabled: false, popular: true, savings: '-60% Admin-Zeit', priceNote: '49€ einmalig' },
      { id: 'instagram', name: 'Instagram Feed', description: 'Live Instagram-Integration', price: 4.99, icon: Instagram, enabled: false },
      { id: 'popup', name: 'Pop-up für Aktionen', description: 'Newsletter, Aktionen & Angebote', price: 3.99, icon: Sparkles, enabled: false },
      { id: 'google-maps', name: 'Google Maps mit Route', description: 'Interaktive Karte mit Routenplanung', price: 4.99, icon: MapPin, enabled: false },
      { id: 'analytics', name: 'Besucher-Auswertung', description: 'Monatliche Besucher-Statistiken', price: 4.99, icon: BarChart2, enabled: false },
      { id: 'seo', name: 'Google Indexierung SEO', description: 'Top Google Rankings & Sichtbarkeit', price: 14.99, icon: Search, enabled: false, savings: '+120% Traffic' },
      { id: 'chatbot', name: 'KI Chatbot', description: 'Automatische Kundenbetreuung 24/7', price: 9.99, icon: Bot, enabled: false, popular: true, savings: '24/7 Support' },
      { id: 'custom-section', name: 'Individuelle Section', description: 'z.B. Preisrechner, Team-Slider, Portfolio', price: 0, oneTimePrice: 29, icon: Layout, enabled: false, priceNote: '29€ einmalig' },
      { id: 'multilang', name: 'Mehrsprachigkeit', description: 'Pro zusätzlicher Sprache', price: 4.99, icon: Globe, enabled: false, priceNote: 'pro Sprache' },
      { id: 'blog', name: 'Blog-System', description: 'Professioneller Blog (9,90€ pro Artikel)', price: 0, oneTimePrice: 49, icon: FileText, enabled: false, priceNote: '49€ einmalig + 9,90€/Artikel' },
      { id: 'meta-tracking', name: 'Meta Tracking', description: 'Facebook/Instagram Pixel Integration', price: 0, oneTimePrice: 99, icon: BarChart3, enabled: false, priceNote: '99€ einmalig' },
      { id: 'google-tracking', name: 'Google Tracking', description: 'Google Analytics & Tag Manager', price: 0, oneTimePrice: 99, icon: Gauge, enabled: false, priceNote: '99€ einmalig' },
      { id: 'copywriting', name: 'Copywriting', description: 'Speziell für dein Unternehmen erstellte Texte', price: 0, oneTimePrice: 199, icon: PenTool, enabled: false, popular: true, priceNote: '199€ einmalig' },
      { id: 'express', name: 'Go Fast – Online in 48h', description: 'Express-Lieferung (Normalpreis 48€)', price: 0, oneTimePrice: 0, icon: Zap, enabled: false, popular: true, savings: 'AKTION: 0€', priceNote: 'AKTION: 0€' }
    ];
    setAddOns(defaultAddOns);
  }, []);

  const toggleAddOn = (id: string) => {
    setAddOns(prev => {
      const updatedAddOns = prev.map(addon => {
        if (addon.id === id) {
          const newState = { ...addon, enabled: !addon.enabled };

          const itemPrice = addon.oneTimePrice || addon.price;

          if (newState.enabled) {
            trackAddToCart({
              item_id: addon.id,
              item_name: addon.name,
              price: itemPrice,
              item_category: 'Power-Up',
              item_category2: selectedIndustry || 'general',
              item_brand: 'Webflix',
              quantity: 1,
              item_type: 'addon'
            });
          } else {
            trackRemoveFromCart({
              item_id: addon.id,
              item_name: addon.name,
              price: itemPrice,
              item_category: 'Power-Up',
              item_category2: selectedIndustry || 'general',
              quantity: 1
            });
          }

          return newState;
        }
        return addon;
      });

      return updatedAddOns;
    });

    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 600);
  };

  const getBasePrice = () => {
    // Use custom base price if provided (e.g., from shop)
    if (customBasePrice !== null) return customBasePrice;

    // All durations cost 29.90€/month
    return 29.90;
  };

  const basePrice = getBasePrice();
  const addOnsTotal = addOns.filter(a => a.enabled).reduce((sum, a) => sum + a.price, 0);
  const oneTimeTotal = addOns.filter(a => a.enabled && a.oneTimePrice).reduce((sum, a) => sum + (a.oneTimePrice || 0), 0);
  const monthlyPrice = basePrice + addOnsTotal;

  const totalFirstMonth = monthlyPrice + oneTimeTotal;
  const totalContract = duration === 0 ? monthlyPrice + oneTimeTotal : monthlyPrice * duration + oneTimeTotal;

  const selectedIndustryData = industries.find(i => i.id === selectedIndustry) ||
    industries.flatMap(i => i.subIndustries || []).find(sub => sub.id === selectedIndustry);
  const displayedIndustries = showAllIndustries ? industries : industries.slice(0, 6);

  const handleIndustryClick = (industry: Industry) => {
    if (industry.isCategory && industry.subIndustries && industry.subIndustries.length > 0) {
      setSelectedCategory(industry.id);
      setSelectedIndustry('');
    } else {
      setSelectedIndustry(industry.id);
      setSelectedCategory('');
    }
  };

  const handleSubIndustryClick = (subIndustry: Industry) => {
    setSelectedIndustry(subIndustry.id);
  };

  const getCurrentIndustries = () => {
    if (selectedCategory) {
      const category = industries.find(i => i.id === selectedCategory);
      return category?.subIndustries || [];
    }
    return displayedIndustries;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black text-white">
      <AvailabilityBanner />
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-2 sm:py-3 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="flex items-center justify-center gap-2 sm:gap-3 relative z-10 px-3">
          <Lightning className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse flex-shrink-0" />
          <span className="text-white font-bold text-xs sm:text-sm md:text-base">🔥AKTION: Nur bis 31.12. – Spare über 240€!</span>
          <Lightning className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse flex-shrink-0" />
        </div>
      </div>

      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Zurück</span>
            </button>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 text-white/60">
                <Users className="w-4 h-4" />
                <span className="text-sm">847 Kunden vertrauen uns</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#F3F3F5]/20 to-[#E8E8EA]/20 border border-[#F3F3F5]/30 rounded-full px-2 sm:px-4 py-1.5 sm:py-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F3F3F5] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[#F3F3F5] font-semibold whitespace-nowrap">48h Lieferung</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 lg:py-12">

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 hover:border-[#F3F3F5]/30 transition-all">
              <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-black" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white">1. Wähle dein Design</h2>
                    <p className="text-white/60 text-xs sm:text-sm hidden sm:block">Alle Demos professionell & conversion-optimiert</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 bg-white/5 rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 flex-shrink-0">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs sm:text-sm font-bold text-white">4.8</span>
                </div>
              </div>

              {selectedCategory && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedIndustry('');
                  }}
                  className="mb-3 sm:mb-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Zurück zur Branchenauswahl</span>
                </button>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
                {getCurrentIndustries().map((industry) => {
                  const Icon = industry.icon;
                  const isSelected = selectedIndustry === industry.id;
                  const isCategory = industry.isCategory && industry.subIndustries && industry.subIndustries.length > 0;
                  return (
                    <button
                      key={industry.id}
                      onClick={() => isCategory ? handleIndustryClick(industry) : handleSubIndustryClick(industry)}
                      className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl lg:rounded-2xl transition-all text-left relative group ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] text-black shadow-lg shadow-pink-400/25 scale-105'
                          : 'bg-white/5 border border-white/10 hover:border-[#F3F3F5]/50 hover:scale-102 text-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 lg:-top-2 lg:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
                        </div>
                      )}
                      {isCategory && !isSelected && (
                        <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 lg:-top-2 lg:-right-2">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                        </div>
                      )}
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mb-1.5 sm:mb-2 lg:mb-3 ${isSelected ? 'text-black' : industry.color}`} />
                      <div className="font-bold text-xs sm:text-sm mb-0.5 leading-tight">{industry.name}</div>
                      <div className={`text-[10px] sm:text-xs mb-1 sm:mb-1.5 line-clamp-1 leading-tight ${isSelected ? 'text-black/70' : 'text-white/60'}`}>
                        {industry.description}
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${isSelected ? 'text-black fill-black' : 'text-yellow-400 fill-yellow-400'}`} />
                        <span className={`text-[10px] sm:text-xs font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>
                          {industry.rating}
                        </span>
                        <span className={`text-[10px] sm:text-xs ${isSelected ? 'text-black/60' : 'text-white/50'}`}>
                          ({industry.reviews})
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!selectedCategory && !showAllIndustries && industries.length > 6 && (
                <button
                  onClick={() => setShowAllIndustries(true)}
                  className="w-full py-2 sm:py-2.5 lg:py-3 border-2 border-white/10 hover:border-[#F3F3F5]/50 rounded-lg sm:rounded-xl text-white/70 hover:text-white transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base"
                >
                  <span>Alle {industries.length} Demos anzeigen</span>
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}

              {selectedIndustryData && (
                <div className="mt-3 sm:mt-4 lg:mt-6 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-[#F3F3F5]/10 to-[#E8E8EA]/10 border border-[#F3F3F5]/30 rounded-lg sm:rounded-xl lg:rounded-2xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base mb-1">Live-Vorschau verfügbar</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Interaktive Demo</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-yellow-400" />
                          <span>{selectedIndustryData.rating} ({selectedIndustryData.reviews} Bewertungen)</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={selectedIndustryData.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#F3F3F5] to-[#E8E8EA] hover:from-orange-600 hover:to-pink-500 text-black font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Demo ansehen</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-[#F3F3F5]/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] rounded-xl flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">2. Power-Ups hinzufügen</h2>
                    <p className="text-white/60 text-sm">Mach deine Website noch erfolgreicher</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#F3F3F5]">{addOns.filter(a => a.enabled).length}</div>
                  <div className="text-xs text-white/60">ausgewählt</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addOns.map((addon) => {
                  const Icon = addon.icon;
                  const hasQuiz = addonQuestions[addon.id as keyof typeof addonQuestions];
                  return (
                    <div key={addon.id} className="relative">
                      <button
                        onClick={() => toggleAddOn(addon.id)}
                        className={`w-full p-5 rounded-2xl transition-all text-left relative group ${
                          addon.enabled
                            ? 'bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] text-black shadow-lg scale-105'
                            : 'bg-white/5 border border-white/10 hover:border-[#F3F3F5]/50 hover:scale-102 text-white'
                        }`}
                      >
                        {addon.popular && !addon.enabled && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#F3F3F5] to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            BESTSELLER
                          </div>
                        )}
                        <div className="flex items-start justify-between mb-3">
                          <Icon className={`w-6 h-6 ${addon.enabled ? 'text-black' : 'text-[#F3F3F5]'}`} />
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            addon.enabled ? 'bg-black/20 border-black scale-110' : 'border-white/20'
                          }`}>
                            {addon.enabled && <Check className="w-4 h-4 text-black" />}
                          </div>
                        </div>
                        <div className="font-bold mb-1">{addon.name}</div>
                        <div className={`text-sm mb-3 ${addon.enabled ? 'text-black/70' : 'text-white/60'}`}>
                          {addon.description}
                        </div>
                        {addon.savings && (
                          <div className={`text-xs font-bold mb-2 ${addon.enabled ? 'text-black/80' : 'text-green-400'}`}>
                            {addon.savings}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          {addon.oneTimePrice && addon.oneTimePrice > 0 ? (
                            <>
                              <span className="text-lg font-bold">+{addon.oneTimePrice.toFixed(2)}€</span>
                              <span className="text-xs opacity-70">einmalig</span>
                            </>
                          ) : addon.price > 0 ? (
                            <>
                              <span className="text-lg font-bold">+{addon.price.toFixed(2)}€</span>
                              <span className="text-xs opacity-70">/Monat</span>
                            </>
                          ) : (
                            <span className="text-sm opacity-70">{addon.priceNote || 'Kostenlos'}</span>
                          )}
                        </div>
                      </button>
                      {hasQuiz && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowQuiz(addon.id);
                          }}
                          className="w-full mt-2 px-3 py-2 text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-[#F3F3F5]/30"
                        >
                          <HelpCircle className="w-3 h-3" />
                          Brauche ich das Add-on?
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-[#F3F3F5]/30 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">So funktionieren die Add-Ons</h3>
                    <p className="text-white/60 text-sm">Kurze Video-Erklärung zu allen Funktionen</p>
                  </div>
                </div>
                <div className="aspect-video bg-black/50 rounded-xl border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm">Video wird geladen...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-[#F3F3F5]/30 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">3. Spare mit längerer Laufzeit</h2>
                  <p className="text-white/60 text-sm">Je länger, desto günstiger – bis zu 25% Rabatt</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { months: 0, price: 79.90, badge: 'Flexibel', label: 'Monatlich kündbar' },
                  { months: 12, price: 29.90, badge: 'Standard', label: '12 Monate' },
                  { months: 24, price: 24.90, normalPrice: 44.90, badge: 'AKTION', highlight: true, label: '24 Monate' }
                ].map(({ months, price, normalPrice, badge, highlight, label }) => {
                  const isSelected = duration === months;
                  const savings = normalPrice ? (normalPrice - price) * months : 0;
                  return (
                    <button
                      key={months}
                      onClick={() => setDuration(months)}
                      className={`p-6 rounded-2xl transition-all relative ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#F3F3F5] to-[#E8E8EA] text-white shadow-2xl scale-105'
                          : highlight
                          ? 'bg-gradient-to-br from-white/10 to-white/5 border-2 border-[#F3F3F5]/50 text-white scale-102'
                          : 'bg-white/5 border-2 border-white/10 hover:border-[#F3F3F5]/50 text-white'
                      }`}
                    >
                      {normalPrice && (
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${
                          isSelected ? 'bg-[#E8E8EA]' : 'bg-[#F3F3F5]'
                        } text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-lg`}>
                          {badge} - Spare {savings.toFixed(0)}€
                        </div>
                      )}
                      {!normalPrice && !isSelected && highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F3F3F5] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                          {badge}
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">{label}</div>
                        <div className={`text-3xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-white'}`}>
                          {price.toFixed(2)}€
                        </div>
                        <div className={`text-sm ${isSelected ? 'text-white/70' : 'text-white/60'}`}>/Monat</div>
                        {normalPrice && (
                          <div className={`text-xs mt-2 line-through ${isSelected ? 'text-white/50' : 'text-white/50'}`}>
                            statt {normalPrice.toFixed(2)}€
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Lieferumfang Section */}
              <div className="mt-8 bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
                <h2 className="text-3xl font-bold text-black mb-8">Lieferumfang</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Side - Deine Ausgewählte Website */}
                  <div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                      <h3 className="text-xl font-bold text-black mb-4">Deine Ausgewählte Website</h3>
                      <p className="text-gray-600 text-sm">
                        Das gewählte Premium-Design wird vollständig für dein Unternehmen angepasst und optimiert.
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Included Features */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">Wartung</h4>
                        <p className="text-sm text-gray-600">Regelmäßige Updates und technische Wartung</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">Live Schaltung</h4>
                        <p className="text-sm text-gray-600">Professionelle Veröffentlichung deiner Website</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">Support</h4>
                        <p className="text-sm text-gray-600">Persönlicher Support bei Fragen und Problemen</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">Domain Übertragung/Sicherung</h4>
                        <p className="text-sm text-gray-600">Sichere Übertragung und Verwaltung deiner Domain</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">+ Ausgewählte Add-ons</h4>
                        <p className="text-sm text-gray-600">Alle von dir gewählten Power-Ups inklusive</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webflix Trade Section */}
              <div className="mt-8 bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
                <h3 className="text-3xl font-semibold text-black mb-4">
                  Webflix Trade In.{' '}
                  <span className="text-[#F3F3F5]">Wechsel deinen Anbieter und erhalte eine neue Website.</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  {/* Option 1 - Mit Website */}
                  <button className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-[#F3F3F5] transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-black group-hover:text-[#F3F3F5] transition-colors">
                        Smartphone auswählen
                      </h4>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#F3F3F5] transition-colors">
                        <ChevronRight className="w-5 h-5 text-[#F3F3F5] group-hover:text-[#F3F3F5]" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ich habe eine Website und möchte die Inhalte übertragen auf mein neues Webflix Design.
                    </p>
                  </button>

                  {/* Option 2 - Ohne Website */}
                  <button className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-[#F3F3F5] transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-black group-hover:text-[#F3F3F5] transition-colors">
                        Kein Eintausch
                      </h4>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#F3F3F5] transition-colors">
                        <ChevronRight className="w-5 h-5 text-[#F3F3F5] group-hover:text-[#F3F3F5]" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ich habe keine Website und möchte meine Webflix Website wie ich sie gesehen habe.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-[#F3F3F5]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transition-all ${
              cartAnimation ? 'scale-105' : ''
            }`}>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Warenkorb</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#F3F3F5] to-[#E8E8EA] rounded-full px-2.5 sm:px-3 py-1">
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                  <span className="text-black font-bold text-sm">{addOns.filter(a => a.enabled).length + 1}</span>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/10">
                {/* Gewähltes Design */}
                <div className="bg-gradient-to-br from-[#F3F3F5]/20 to-[#E8E8EA]/20 border-2 border-[#F3F3F5]/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#F3F3F5] to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">Gewähltes Design</div>
                      <div className="text-white font-bold text-base">{selectedIndustryData?.designName || 'Premium Website'}</div>
                      <div className="text-xs text-white/50">{selectedIndustryData?.name}</div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg px-3 py-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm font-medium">Premium Template</span>
                      <span className="text-[#F3F3F5] font-bold text-lg">{basePrice.toFixed(2)}€/Monat</span>
                    </div>
                  </div>
                </div>

                {/* Laufzeit */}
                <div className={`rounded-xl p-4 ${
                  duration === 24
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30'
                    : 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20'
                }`}>
                  {duration === 24 && (
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-bold text-sm">AKTIONSRABATT</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 font-semibold">
                      {duration === 0 ? 'Monatlich kündbar' : `${duration} Monate Laufzeit`}
                    </span>
                    <div className="text-right">
                      {duration === 24 && (
                        <div className="text-white/50 line-through text-sm">{normalBasePrice.toFixed(2)}€</div>
                      )}
                      <div className="text-white font-bold text-xl">{basePrice.toFixed(2)}€</div>
                    </div>
                  </div>
                  {duration === 24 && (
                    <div className="text-center mt-2 text-green-400 font-bold text-sm">
                      Du sparst {(normalBasePrice - basePrice).toFixed(2)}€/Monat!
                    </div>
                  )}
                </div>

                {addOns.filter(a => a.enabled && a.price > 0).length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-white/50 font-semibold uppercase tracking-wider px-3">Monatliche Power-Ups</div>
                    {addOns.filter(a => a.enabled && a.price > 0).map(addon => (
                      <div key={addon.id} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-white/90 text-sm">{addon.name}</span>
                          </div>
                          <div className="text-white font-semibold">+{addon.price.toFixed(2)}€/mtl</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {addOns.filter(a => a.enabled && a.oneTimePrice && a.oneTimePrice > 0).length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-white/50 font-semibold uppercase tracking-wider px-3">Einmalige Power-Ups</div>
                    {addOns.filter(a => a.enabled && a.oneTimePrice && a.oneTimePrice > 0).map(addon => (
                      <div key={addon.id} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-white/90 text-sm">{addon.name}</span>
                          </div>
                          <div className="text-white font-semibold">+{addon.oneTimePrice.toFixed(2)}€ einmalig</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {addOns.filter(a => a.enabled && a.price === 0 && !a.oneTimePrice && a.priceNote).length > 0 && (
                  <div className="space-y-2">
                    {addOns.filter(a => a.enabled && a.price === 0 && !a.oneTimePrice && a.priceNote).map(addon => (
                      <div key={addon.id} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-white/90 text-sm">{addon.name}</span>
                          </div>
                          <div className="text-xs text-white/70">{addon.priceNote}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-white/80">Monatlich</span>
                  <span className="text-3xl font-bold text-white">{monthlyPrice.toFixed(2)}€</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const checkoutData = {
                    templateId: selectedIndustry,
                    templateName: selectedIndustryData?.designName || 'Premium Website',
                    templateCategory: selectedIndustryData?.name || 'Website',
                    templateTier: selectedIndustryData?.designTier || 'premium',
                    templatePrice: basePrice,
                    addOns: addOns.map(addon => ({
                      id: addon.id,
                      name: addon.name,
                      description: addon.description,
                      price: addon.price,
                      oneTimePrice: addon.oneTimePrice,
                      enabled: addon.enabled
                    })),
                    duration: duration
                  };

                  const items = [{
                    item_id: selectedIndustry || 'template',
                    item_name: selectedIndustryData?.designName || 'Premium Website',
                    price: basePrice,
                    item_category: 'Website Template',
                    item_category2: selectedIndustryData?.name || 'Website',
                    quantity: 1
                  }];

                  addOns.filter(a => a.enabled).forEach(addon => {
                    items.push({
                      item_id: addon.id,
                      item_name: addon.name,
                      price: addon.oneTimePrice || addon.price,
                      item_category: 'Power-Up',
                      item_category2: selectedIndustry || 'general',
                      quantity: 1
                    });
                  });

                  trackBeginCheckout({
                    items,
                    value: monthlyPrice,
                    coupon: undefined
                  });

                  localStorage.setItem('webflix-checkout', JSON.stringify(checkoutData));
                  navigate('/checkout', { state: { checkoutData } });
                }}
                className="w-full py-5 bg-gradient-to-r from-[#F3F3F5] to-[#E8E8EA] hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-xl transition-all shadow-2xl hover:shadow-pink-400/50 text-lg flex items-center justify-center gap-2 group mb-4 hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Jetzt bestellen</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>In 48 Stunden online</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Alle Inhalte werden angepasst</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Keine Setup-Gebühr</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>14 Tage Geld-zurück</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
                  <Shield className="w-4 h-4" />
                  <span>SSL-verschlüsselt & DSGVO-konform</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-br from-[#F3F3F5]/10 to-[#E8E8EA]/10 border border-[#F3F3F5]/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-[#E8E8EA] border-2 border-black" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs text-white/60 mt-1">847 zufriedene Kunden</div>
                </div>
              </div>
              <p className="text-sm text-white/70 italic">
                "In nur 2 Tagen war meine Website online. Professionell und unkompliziert!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 bg-black/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-3">
            {[
              {
                question: "Was ist Webflix?",
                answer: "Webflix ist Ihre All-in-One Website-Marketing-Lösung im Abo – Agentur-Qualität ohne hohe Einmalkosten."
              },
              {
                question: "Wie viel kostet Webflix?",
                answer: "Je nach Laufzeit 82 €/45 €/35 € mtl. Add-ons optional. 5 h Änderungen/Jahr inklusive."
              },
              {
                question: "Was bedeutet 48h-Go-Live?",
                answer: "Nach Eingang aller Unterlagen aus der Checkliste publizieren wir Ihre Website innerhalb von 48 Stunden."
              },
              {
                question: "Wie kann ich kündigen?",
                answer: "Nach Ende der gewählten Laufzeit monatlich mit 1-Monats-Frist kündbar."
              },
              {
                question: "Welche Add-ons gibt es?",
                answer: "Vorher/Nachher-Slider, Google-Bewertungen, Terminbuchung, CRM light, SEO-Starter, KI-Chatbot, E-Mail-Marketing, Analytics light, DSGVO-Paket."
              },
              {
                question: "Gehören mir Domain & Inhalte?",
                answer: "Ihre Inhalte gehören Ihnen. Bei Domain-Fragen bieten wir faire Optionen (Umzug oder Verwaltung durch uns)."
              }
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && addonQuestions[showQuiz as keyof typeof addonQuestions] && (
        <AddonQuizModal
          addonName={addOns.find(a => a.id === showQuiz)?.name || ''}
          questions={addonQuestions[showQuiz as keyof typeof addonQuestions]}
          onClose={() => setShowQuiz(null)}
        />
      )}

      {/* Footer */}
      <Footer />

      {waitlistModalOpen && (
        <WaitlistModal
          isOpen={waitlistModalOpen}
          onClose={() => setWaitlistModalOpen(false)}
        />
      )}
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-xl overflow-hidden border border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5 text-[#F3F3F5]" />
          ) : (
            <Plus className="w-5 h-5 text-[#F3F3F5]" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ConfiguratorPage;
