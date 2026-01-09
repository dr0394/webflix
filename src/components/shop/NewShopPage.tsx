import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Search, SlidersHorizontal, CreditCard, RefreshCw, Zap, Settings, Eye, X, Star, ShoppingCart } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { trackViewItemList, trackViewItem, trackAddToCart } from '../../lib/analytics';

interface Product {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  industryName: string;
  demoUrl: string;
  thumbnail: string;
  basePrice: number;
  color: string;
}

const NewShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [webflixOneIndustries, setWebflixOneIndustries] = useState<any[]>([]);
  const [showWebflixOneModal, setShowWebflixOneModal] = useState(false);
  const [selectedWebflixIndustry, setSelectedWebflixIndustry] = useState<any>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<Product | null>(null);

  const industries = [
    { id: 'all', name: 'Alle', count: 19 },
    { id: 'webflix-one-auto', name: 'Webflix One Autoindustrie', count: 5 },
    { id: 'webflix-one-handwerk', name: 'Webflix One Handwerk', count: 11 },
    { id: 'handwerk', name: 'Handwerk', count: 2 },
    { id: 'webflix-one', name: 'Webflix One Universal', count: 1 }
  ];

  useEffect(() => {
    loadWebflixOneIndustries();
  }, []);

  const loadWebflixOneIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from('webflix_one_industries')
        .select('*')
        .eq('is_active', true)
        .in('slug', ['autoaufbereitung', 'handwerk'])
        .order('display_name');

      if (error) throw error;
      if (data) {
        setWebflixOneIndustries(data);
      }
    } catch (error) {
      console.error('Error loading Webflix One industries:', error);
    }
  };

  const webflixOneProduct: Product = {
    id: 'webflix-one',
    name: 'Webflix One',
    tagline: 'Ein Template für alle Branchen - Dynamisch anpassbar',
    industry: 'webflix-one',
    industryName: 'Webflix One',
    demoUrl: webflixOneIndustries.length > 0 ? `/webflix-one/${webflixOneIndustries[0].slug}?preview=true` : '#',
    thumbnail: 'https://i.imgur.com/8kWrLwT.jpeg',
    basePrice: 29.90,
    color: 'from-blue-500/20 to-cyan-500/20'
  };

  const products: Product[] = [
    {
      id: 'autoaufbereitung',
      name: 'Autoaufbereitung',
      tagline: 'Premium Website für Autoaufbereitungs-Services',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/autoaufbereitung',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      basePrice: 29.90,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'lackiererei',
      name: 'Lackiererei',
      tagline: 'Professionelle Website für Lackierereien',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/lackiererei',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      basePrice: 29.90,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'smart-repair',
      name: 'Smart Repair',
      tagline: 'Moderne Website für Smart Repair Services',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/smart-repair',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      basePrice: 29.90,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'autowerkstatt',
      name: 'KFZ Werkstatt',
      tagline: 'Vollständige Website-Lösung für KFZ-Werkstätten',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/autowerkstatt',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      basePrice: 29.90,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'kfz-gutachter',
      name: 'KFZ Gutachter',
      tagline: 'Professionelle Website für KFZ-Gutachter',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/kfz-gutachter',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      basePrice: 29.90,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'dachdecker',
      name: 'Dachdecker',
      tagline: 'Professionelle Website für Dachdecker',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/dachdecker',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'elektriker',
      name: 'Elektriker',
      tagline: 'Moderne Website für Elektrikerbetriebe',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/elektriker',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'fliesenleger',
      name: 'Fliesenleger',
      tagline: 'Premium Website für Fliesenleger',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/fliesenleger',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'gartenbau',
      name: 'Garten & Landschaftsbau',
      tagline: 'Professionelle Website für Gartenbau',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/gartenbau',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'gebaeudereinigung',
      name: 'Gebäudereinigung',
      tagline: 'Moderne Website für Gebäudereinigung',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/gebaeudereinigung',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'klempner',
      name: 'Klempner & Spengler',
      tagline: 'Professionelle Website für Klempner',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/klempner',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'maler',
      name: 'Maler & Lackierer',
      tagline: 'Premium Website für Malerbetriebe',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/maler',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'maurer',
      name: 'Maurer & Betonbauer',
      tagline: 'Professionelle Website für Maurerbetriebe',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/maurer',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'metallbauer',
      name: 'Metallbauer',
      tagline: 'Moderne Website für Metallbauer',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/metallbauer',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'sanitaer',
      name: 'Sanitär & Heizung',
      tagline: 'Professionelle Website für Sanitärbetriebe',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/sanitaer',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'schreiner',
      name: 'Schreiner & Tischler',
      tagline: 'Premium Website für Schreinereien',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/schreiner',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'handwerk-pro-1',
      name: 'HandwerkPro',
      tagline: 'Professionell für Handwerksbetriebe',
      industry: 'handwerk',
      industryName: 'Handwerk',
      demoUrl: '/demo/handwerk',
      thumbnail: 'https://i.imgur.com/8kWrLwT.jpeg',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'handwerk-webflix-one',
      name: 'Webflix One Handwerker',
      tagline: 'Cinematic Design für Handwerksbetriebe',
      industry: 'handwerk',
      industryName: 'Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      basePrice: 29.90,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    webflixOneProduct
  ];

  const filteredProducts = products.filter(product => {
    const matchesIndustry = selectedIndustry === 'all' || product.industry === selectedIndustry;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.industryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a.basePrice - b.basePrice;
  });

  useEffect(() => {
    if (products.length > 0) {
      trackViewItemList({
        item_list_id: 'shop_products',
        item_list_name: 'Shop - Alle Produkte',
        items: products.map((product, index) => ({
          item_id: product.id,
          item_name: product.name,
          price: product.basePrice,
          item_category: product.industry,
          item_category2: product.industryName,
          item_brand: 'Webflix',
          index
        }))
      });
    }
  }, []);

  const handleViewDemo = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();

    trackViewItem({
      item_id: product.id,
      item_name: product.name,
      price: product.basePrice,
      item_category: product.industry,
      item_category2: product.industryName,
      item_brand: 'Webflix',
      item_list_id: 'shop_products',
      item_list_name: 'Shop - Alle Produkte'
    });

    if (product.id === 'webflix-one') {
      setShowWebflixOneModal(true);
      return;
    }

    // Open demo in modal instead of new tab
    setSelectedDemo(product);
    setDemoModalOpen(true);
  };

  const handleConfigureProduct = (product: Product) => {
    trackAddToCart({
      item_id: product.id,
      item_name: product.name,
      price: product.basePrice,
      item_category: product.industry,
      item_category2: product.industryName,
      item_brand: 'Webflix',
      quantity: 1,
      item_type: 'product'
    });

    if (product.id === 'webflix-one') {
      setShowWebflixOneModal(true);
      return;
    }
    navigate('/configurator', {
      state: {
        selectedIndustry: product.id,
        preselectedDesign: product.id,
        basePrice: product.basePrice
      }
    });
  };

  const handleWebflixIndustrySelect = (industry: any) => {
    setSelectedWebflixIndustry(industry);

    // Track view_item event when viewing Webflix One demo
    trackViewItem({
      item_id: `webflix-one-${industry.slug}`,
      item_name: `Webflix One - ${industry.display_name}`,
      price: 29.90,
      item_category: 'webflix-one',
      item_category2: industry.display_name,
      item_brand: 'Webflix',
      item_list_id: 'webflix_one_industries',
      item_list_name: 'Webflix One - Branchenauswahl'
    });

    window.open(`/webflix-one/${industry.slug}?preview=true`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#111111]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Startseite
            </button>
            <div className="flex items-center">
              <img
                src="https://i.imgur.com/2SbjgE7.png"
                alt="Webflix"
                className="h-8 w-auto"
              />
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-3 sm:mb-4 tracking-tight">
            Website Shop
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light max-w-3xl">
            Wähle deine perfekte Website. Anpassen. Loslegen.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Suche nach Websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
                className="px-3 sm:px-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm appearance-none pr-8 sm:pr-10 cursor-pointer"
              >
                <option value="name" className="bg-[#111111]">Nach Name</option>
                <option value="price" className="bg-[#111111]">Nach Preis</option>
              </select>
            </div>
          </div>

          {/* Industry Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedIndustry === industry.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {industry.name}
              </button>
            ))}
            <span className="text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2 w-full sm:w-auto mt-2 sm:mt-0">
              Deine Branche ist nicht dabei?{' '}
              <a
                href="/custom/form"
                className="text-orange-400 hover:text-orange-300 underline transition-colors"
              >
                Jetzt anfragen
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-500 text-base sm:text-lg">Keine Websites gefunden.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative">
                    {/* Product Image with advanced effects */}
                    <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 transition-all duration-500">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay`}></div>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>

                      {/* Details Badge - always visible */}
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                        <p className="text-xs font-medium text-white">{product.industryName}</p>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2 sm:space-y-3 px-1 sm:px-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1.5 sm:mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 transition-all duration-300">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors mb-3 sm:mb-4">
                          Innovatives Design für ultimative Performance und Benutzerfreundlichkeit.
                        </p>
                      </div>

                      {/* Price Section */}
                      <div className="border-t border-white/5 pt-2.5 sm:pt-3">
                        <div className="flex items-baseline justify-between mb-1.5 sm:mb-2">
                          <p className="text-xs text-gray-500">Ab</p>
                          <div className="flex items-baseline gap-0.5 sm:gap-1">
                            <p className="text-2xl sm:text-3xl font-semibold text-white">
                              €{product.basePrice.toFixed(2)}
                            </p>
                            <span className="text-xs sm:text-sm text-gray-500">/mtl.</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-2.5 sm:mb-3">
                          mit flexibler Vertragslaufzeit auf FLEX/12/24 Monate
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleViewDemo(product, e)}
                            className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Demo</span>
                          </button>
                          <button
                            onClick={() => handleConfigureProduct(product)}
                            className="flex-[2] py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm font-medium"
                          >
                            Jetzt kaufen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#111111] to-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4 tracking-tight">
              Wir helfen gerne.{' '}
              <span className="text-gray-500">Wann und wie du möchtest.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Erhalte sofort Unterstützung bei deinem Einkauf
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - Webflix Spezialist */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Webflix Spezialist</h3>
                <p className="text-gray-400 leading-relaxed">
                  Hol dir Beratung durch unsere Experten. Online oder per Telefon.
                </p>
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex items-center gap-2 text-orange-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm font-medium">Mehr erfahren</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2 - Branchenangebot */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Branchenangebot</h3>
                <p className="text-gray-400 leading-relaxed">
                  Deine Website ist nicht dabei? Dann kontaktiere uns per Mail oder Telefon.
                </p>
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex items-center gap-2 text-orange-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm font-medium">Kontaktieren</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3 - Persönliche Begleitung */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Persönliche Begleitung</h3>
                <p className="text-gray-400 leading-relaxed">
                  Unser Experte begleitet dich persönlich durch den Einkaufsvorgang im Shop.
                </p>
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex items-center gap-2 text-orange-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm font-medium">Support erhalten</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Webflix Store Difference Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-black mb-4 tracking-tight">
              Der Webflix Store macht den Unterschied.{' '}
              <span className="text-gray-500">Noch mehr Gründe, bei uns zu shoppen.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Bezahle flexibel */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-6">
                  <CreditCard className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  Bezahle monatlich oder{' '}
                  <span className="text-green-600">im Voraus und spare noch mehr.</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Du entscheidest.
                </p>
              </div>
            </div>

            {/* Card 2 - Wechsel zu uns */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6">
                  <RefreshCw className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  Wechsel von deinem Anbieter zu uns und wir{' '}
                  <span className="text-blue-600">übernehmen auf Wunsch all deine Inhalte.</span>
                </h3>
              </div>
            </div>

            {/* Card 3 - 48h Online & Anpassbar */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  <span className="text-orange-600">Innerhalb von 48h online</span> nachdem wir alle Infos haben.
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Du kannst deine Webflix Website deinen Bedürfnissen anpassen.
                </p>
              </div>
            </div>
          </div>

          {/* Webflix Trade Section */}
          <div className="mt-16 bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
            <h3 className="text-3xl font-semibold text-black mb-4">
              Webflix Trade In.{' '}
              <span className="text-gray-500">Wechsel deinen Anbieter und erhalte eine neue Website.</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {/* Option 1 - Mit Website */}
              <button className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-orange-500 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-black group-hover:text-orange-600 transition-colors">
                    Smartphone auswählen
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Ich habe eine Website und möchte die Inhalte übertragen auf mein neues Webflix Design.
                </p>
              </button>

              {/* Option 2 - Ohne Website */}
              <button className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-orange-500 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-black group-hover:text-orange-600 transition-colors">
                    Kein Eintausch
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Ich habe keine Website und möchte meine Webflix Website wie ich sie gesehen habe.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="border-t border-white/5 py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight">
            Bereit loszulegen?
          </h2>
          <p className="text-lg text-gray-400 mb-8 font-light">
            Wähle deine Website und passe sie an deine Bedürfnisse an.
          </p>
          <button
            onClick={() => navigate('/custom')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:scale-105"
          >
            Individuelle Anfrage
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
            <p>© 2025 Webflix. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-8">
              <a href="/datenschutz" className="hover:text-gray-300 transition-colors">
                Datenschutz
              </a>
              <a href="/impressum" className="hover:text-gray-300 transition-colors">
                Impressum
              </a>
              <a href="/agb" className="hover:text-gray-300 transition-colors">
                AGB
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Webflix One Modal - Industry Selection */}
      {showWebflixOneModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl sm:rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-gradient-to-b from-[#1a1a1a] to-transparent p-4 sm:p-6 lg:p-8 pb-3 sm:pb-4 z-10">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0 pr-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">Webflix One</h2>
                  <p className="text-gray-400 text-sm sm:text-base">Ein Template für alle Branchen - Wähle deine Branche</p>
                </div>
                <button
                  onClick={() => setShowWebflixOneModal(false)}
                  className="text-gray-400 hover:text-white text-2xl sm:text-3xl transition-colors p-1.5 sm:p-2 hover:bg-white/5 rounded-full flex-shrink-0"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {webflixOneIndustries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => handleWebflixIndustrySelect(industry)}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left transition-all duration-300 hover:scale-105"
                  >
                    <div className="mb-3 sm:mb-4">
                      <div className="w-full h-24 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
                        <img
                          src={industry.hero_image || 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg'}
                          alt={industry.display_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1.5 sm:mb-2 group-hover:text-orange-400 transition-colors">
                        {industry.display_name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                        {industry.hero_subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-orange-400 text-xs sm:text-sm font-medium">
                      Demo ansehen
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

              {webflixOneIndustries.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Keine Branchen verfügbar.</p>
                </div>
              )}

              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-500/20">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">Deine Branche nicht dabei?</h4>
                <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">
                  Webflix One passt sich deiner Branche an. Kontaktiere uns für eine individuelle Demo.
                </p>
                <a
                  href="/custom/form"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all text-xs sm:text-sm"
                >
                  Jetzt anfragen
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {demoModalOpen && selectedDemo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-7xl h-[92vh] sm:h-[90vh] bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent z-10 p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1 truncate">{selectedDemo.name}</h3>
                  <p className="text-white/60 text-xs sm:text-sm truncate">{selectedDemo.industryName}</p>
                </div>
                <button
                  onClick={() => {
                    setDemoModalOpen(false);
                    setSelectedDemo(null);
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center transition-all group flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <iframe
              src={`${selectedDemo.demoUrl}?preview=true`}
              className="w-full h-full"
              title={selectedDemo.name}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent z-10 p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="text-white">
                    <span className="text-white/50 line-through text-xs sm:text-sm mr-1.5 sm:mr-2">49,99€</span>
                    <span className="text-xl sm:text-2xl font-bold text-pink-400">{selectedDemo.basePrice.toFixed(2)}€</span>
                    <span className="text-white/50 text-xs sm:text-sm">/Monat</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setDemoModalOpen(false);
                      setTimeout(() => {
                        const section = document.querySelector('#products');
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}
                    className="flex-1 sm:flex-none px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white font-bold rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Mehr Designs</span>
                    <span className="sm:hidden">Mehr</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => {
                      trackAddToCart({
                        item_id: selectedDemo.id,
                        item_name: selectedDemo.name,
                        price: selectedDemo.basePrice,
                        item_category: selectedDemo.industry,
                        item_category2: selectedDemo.industryName,
                        item_brand: 'Webflix',
                        quantity: 1,
                        item_type: 'product'
                      });

                      setDemoModalOpen(false);
                      navigate('/configurator', {
                        state: {
                          selectedIndustry: selectedDemo.id,
                          preselectedDesign: selectedDemo.id,
                          basePrice: selectedDemo.basePrice
                        }
                      });
                    }}
                    className="flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-pink-500/30 font-bold text-xs sm:text-sm"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Jetzt kaufen</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewShopPage;
