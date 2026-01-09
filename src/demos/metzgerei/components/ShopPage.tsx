import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, ArrowLeft, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  image_url: string;
  available: boolean;
  featured: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'Alle Produkte', icon: '🛒' },
    { id: 'fleisch', name: 'Frisches Fleisch', icon: '🥩' },
    { id: 'wurst', name: 'Wurst & Schinken', icon: '🌭' },
    { id: 'partyservice', name: 'Partyservice', icon: '🎉' },
    { id: 'geschenk', name: 'Geschenkkörbe', icon: '🎁' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('zwickels_products')
        .select('*')
        .eq('available', true)
        .order('featured', { ascending: false })
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.unit === 'kg' ? 0.5 : 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.unit === 'kg' ? 0.5 : 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const proceedToCheckout = () => {
    localStorage.setItem('zwickels_cart', JSON.stringify(cart));
    navigate('/demo/metzgerei/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2D5F3F] text-white py-4 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/demo/metzgerei')}
              className="flex items-center gap-2 hover:text-[#8BC34A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück</span>
            </button>

            <div className="flex items-center gap-3">
              <img
                src="https://zwickels.de/wp-content/uploads/2021/02/cropped-image0-1.png"
                alt="Zwickels Logo"
                className="h-12 w-auto"
              />
            </div>

            <button
              onClick={() => document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative bg-[#8BC34A] hover:bg-[#7CB342] px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Warenkorb</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Online <span className="text-[#2D5F3F]">Bestellung</span>
          </h1>
          <p className="text-xl text-gray-600">
            Bestellen Sie bequem online und holen Sie Ihre Produkte zu Ihrem Wunschtermin ab
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Produkte durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D5F3F] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5F3F]"></div>
            <p className="mt-4 text-gray-600">Produkte werden geladen...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map(product => {
              const cartItem = cart.find(item => item.id === product.id);
              const inCart = !!cartItem;

              return (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.featured && (
                      <div className="absolute top-2 right-2 bg-[#2D5F3F] text-white px-3 py-1 rounded-full text-sm font-bold">
                        Bestseller
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-[#2D5F3F]">
                          {product.price.toFixed(2)}€
                        </div>
                        <div className="text-sm text-gray-600">pro {product.unit}</div>
                      </div>
                    </div>

                    {/* Add to Cart / Quantity Controls */}
                    {inCart ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(product.id, product.unit === 'kg' ? -0.5 : -1)}
                          className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <div className="flex-1 text-center">
                          <div className="font-bold text-lg">{cartItem!.quantity} {product.unit}</div>
                        </div>
                        <button
                          onClick={() => updateQuantity(product.id, product.unit === 'kg' ? 0.5 : 1)}
                          className="w-10 h-10 bg-[#2D5F3F] hover:bg-[#3E7C57] text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-[#8BC34A] hover:bg-[#7CB342] text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        In den Warenkorb
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cart Section */}
        {cart.length > 0 && (
          <div id="cart-section" className="sticky bottom-0 bg-white rounded-t-2xl shadow-2xl border-t-4 border-[#8BC34A] p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                Ihr Warenkorb ({getTotalItems()} Artikel)
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.unit} × {item.price.toFixed(2)}€ = {(item.quantity * item.price).toFixed(2)}€
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      Entfernen
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  Gesamt: <span className="text-[#2D5F3F]">{getTotalAmount().toFixed(2)}€</span>
                </div>
                <button
                  onClick={proceedToCheckout}
                  className="bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] hover:from-[#3E7C57] hover:to-[#2D5F3F] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Zur Kasse
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
