import React, { useState, useEffect } from 'react';
import { Package, User, Clock, CheckCircle, AlertCircle, Eye, Download, Filter, Search, Calendar, Euro, Phone, Mail, MapPin, Building, FileText, ExternalLink, Copy, Check } from 'lucide-react';

interface Order {
  id: string;
  timestamp: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    city: string;
    zipCode: string;
    website?: string;
    industry: string;
    notes?: string;
  };
  template: {
    id: string;
    name: string;
    price: number;
  };
  addOns: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  duration: number;
  pricing: {
    monthlyTotal: number;
    setupFee: number;
    totalFirstPayment: number;
  };
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

const DeveloperDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('webflix-orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('webflix-orders', JSON.stringify(updatedOrders));
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = searchTerm === '' || 
      order.customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'in-progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Wartend';
      case 'in-progress': return 'In Bearbeitung';
      case 'completed': return 'Abgeschlossen';
      case 'cancelled': return 'Storniert';
      default: return status;
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const generateProjectBrief = (order: Order) => {
    const brief = `
WEBFLIX PROJEKT-BRIEF
=====================

Bestell-ID: ${order.id}
Datum: ${new Date(order.timestamp).toLocaleDateString('de-DE')}

KUNDE:
------
Name: ${order.customer.firstName} ${order.customer.lastName}
Firma: ${order.customer.company}
E-Mail: ${order.customer.email}
Telefon: ${order.customer.phone}
Adresse: ${order.customer.address}, ${order.customer.zipCode} ${order.customer.city}
Branche: ${order.customer.industry}
${order.customer.website ? `Aktuelle Website: ${order.customer.website}` : ''}

TEMPLATE & ADD-ONS:
------------------
Template: ${order.template.name}
${order.addOns.length > 0 ? `Add-ons:\n${order.addOns.map(addon => `- ${addon.name}`).join('\n')}` : 'Keine Add-ons'}

PREISE:
-------
Monatlich: ${order.pricing.monthlyTotal.toFixed(2)}€
Einrichtung: ${order.pricing.setupFee.toFixed(2)}€
Laufzeit: ${order.duration} Monate

${order.customer.notes ? `BESONDERE WÜNSCHE:\n------------------\n${order.customer.notes}` : ''}

CHECKLISTE FÜR KUNDEN:
---------------------
□ Logo (PNG/SVG, transparent)
□ Firmenfarben (Hex-Codes)
□ Texte für alle Seiten
□ Hochauflösende Bilder (min. 1920px breit)
□ Kontaktdaten & Öffnungszeiten
□ Google My Business Zugang (falls vorhanden)
□ Social Media Links
${order.addOns.some(addon => addon.id === 'google-reviews') ? '□ Google Bewertungen freischalten' : ''}
${order.addOns.some(addon => addon.id === 'whatsapp-integration') ? '□ WhatsApp Business Nummer' : ''}
${order.addOns.some(addon => addon.id === 'before-after-slider') ? '□ Vorher/Nachher Bilder (je 5-10 Stück)' : ''}
`;
    
    const blob = new Blob([brief], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Webflix-Brief-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/2SbjgE7.png" 
                alt="Webflix" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Developer Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                {orders.length} Bestellungen insgesamt
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            {/* Filters & Search */}
            <div className="bg-[#333333] rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Suche nach Firma, Name oder Bestell-ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-black/60 border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[orange-500]"
                    />
                  </div>
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-[orange-500]"
                >
                  <option value="all">Alle Status</option>
                  <option value="pending">Wartend</option>
                  <option value="in-progress">In Bearbeitung</option>
                  <option value="completed">Abgeschlossen</option>
                  <option value="cancelled">Storniert</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-[#333333] rounded-lg p-8 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Keine Bestellungen gefunden</h3>
                  <p className="text-gray-400">
                    {searchTerm || filter !== 'all' 
                      ? 'Versuchen Sie andere Suchkriterien oder Filter.'
                      : 'Sobald Kunden Bestellungen aufgeben, erscheinen sie hier.'
                    }
                  </p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-[#333333] rounded-lg p-4 cursor-pointer transition-all hover:bg-[#404040] border-l-4 ${
                      selectedOrder?.id === order.id ? 'border-[orange-500]' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[orange-500] to-[pink-400] rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-sm">
                            {order.customer.firstName[0]}{order.customer.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{order.customer.company}</h3>
                          <p className="text-sm text-gray-400">{order.customer.firstName} {order.customer.lastName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(order.timestamp).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Template:</span>
                        <p className="font-medium">{order.template.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Add-ons:</span>
                        <p className="font-medium">{order.addOns.length} aktiviert</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Monatlich:</span>
                        <p className="font-medium text-[orange-500]">{order.pricing.monthlyTotal.toFixed(2)}€</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-[#333333] rounded-lg p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Bestelldetails</h3>
                  <button
                    onClick={() => generateProjectBrief(selectedOrder)}
                    className="px-3 py-2 bg-[orange-500] text-black rounded-lg text-sm font-medium hover:bg-[orange-600] transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Brief
                  </button>
                </div>

                {/* Order ID & Status */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Bestell-ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{selectedOrder.id}</span>
                      <button
                        onClick={() => copyToClipboard(selectedOrder.id, 'orderId')}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedField === 'orderId' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Status:</span>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)} bg-transparent`}
                    >
                      <option value="pending">Wartend</option>
                      <option value="in-progress">In Bearbeitung</option>
                      <option value="completed">Abgeschlossen</option>
                      <option value="cancelled">Storniert</option>
                    </select>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[orange-500]" />
                    Kunde
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span>{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Firma:</span>
                      <span>{selectedOrder.customer.company}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">E-Mail:</span>
                      <div className="flex items-center gap-2">
                        <a href={`mailto:${selectedOrder.customer.email}`} className="text-[orange-500] hover:underline">
                          {selectedOrder.customer.email}
                        </a>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.customer.email, 'email')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedField === 'email' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Telefon:</span>
                      <div className="flex items-center gap-2">
                        <a href={`tel:${selectedOrder.customer.phone}`} className="text-[orange-500] hover:underline">
                          {selectedOrder.customer.phone}
                        </a>
                        <button
                          onClick={() => copyToClipboard(selectedOrder.customer.phone, 'phone')}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {copiedField === 'phone' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-gray-400">Adresse:</span>
                      <div className="text-right">
                        <p>{selectedOrder.customer.address}</p>
                        <p>{selectedOrder.customer.zipCode} {selectedOrder.customer.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Branche:</span>
                      <span className="capitalize">{selectedOrder.customer.industry}</span>
                    </div>
                    {selectedOrder.customer.website && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Website:</span>
                        <a 
                          href={selectedOrder.customer.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[orange-500] hover:underline flex items-center gap-1"
                        >
                          <span>Besuchen</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Template & Add-ons */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[orange-500]" />
                    Template & Add-ons
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-black/40 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{selectedOrder.template.name}</span>
                        <span className="text-[orange-500]">{selectedOrder.template.price.toFixed(2)}€/Monat</span>
                      </div>
                    </div>
                    {selectedOrder.addOns.map((addon) => (
                      <div key={addon.id} className="bg-black/40 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{addon.name}</span>
                          <span className="text-sm text-[orange-500]">+{addon.price.toFixed(2)}€/Monat</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Euro className="w-4 h-4 text-[orange-500]" />
                    Preise
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monatlich:</span>
                      <span>{selectedOrder.pricing.monthlyTotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Einrichtung:</span>
                      <span>{selectedOrder.pricing.setupFee.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Laufzeit:</span>
                      <span>{selectedOrder.duration} Monate</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                      <span>Erste Zahlung:</span>
                      <span className="text-[orange-500]">{selectedOrder.pricing.totalFirstPayment.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.customer.notes && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[orange-500]" />
                      Besondere Wünsche
                    </h4>
                    <div className="bg-black/40 rounded-lg p-3">
                      <p className="text-sm text-gray-300">{selectedOrder.customer.notes}</p>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => generateProjectBrief(selectedOrder)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-semibold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Projekt-Brief herunterladen
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`mailto:${selectedOrder.customer.email}?subject=Ihre Webflix Bestellung ${selectedOrder.id}&body=Hallo ${selectedOrder.customer.firstName},\n\nvielen Dank für Ihre Bestellung bei Webflix...`}
                      className="px-3 py-2 border border-[orange-500] text-[orange-500] rounded-lg text-sm font-medium hover:bg-[orange-500] hover:text-black transition-all flex items-center justify-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      E-Mail
                    </a>
                    <a
                      href={`tel:${selectedOrder.customer.phone}`}
                      className="px-3 py-2 border border-[orange-500] text-[orange-500] rounded-lg text-sm font-medium hover:bg-[orange-500] hover:text-black transition-all flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      Anrufen
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#333333] rounded-lg p-8 text-center">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Bestellung auswählen</h3>
                <p className="text-gray-400">
                  Wählen Sie eine Bestellung aus der Liste, um Details anzuzeigen.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {[
            { 
              label: 'Wartende Bestellungen', 
              value: orders.filter(o => o.status === 'pending').length,
              color: 'text-yellow-400',
              icon: Clock
            },
            { 
              label: 'In Bearbeitung', 
              value: orders.filter(o => o.status === 'in-progress').length,
              color: 'text-blue-400',
              icon: AlertCircle
            },
            { 
              label: 'Abgeschlossen', 
              value: orders.filter(o => o.status === 'completed').length,
              color: 'text-green-400',
              icon: CheckCircle
            },
            { 
              label: 'Monatlicher Umsatz', 
              value: `${orders.reduce((sum, order) => sum + order.pricing.monthlyTotal, 0).toFixed(0)}€`,
              color: 'text-[orange-500]',
              icon: Euro
            }
          ].map((stat, index) => (
            <div key={index} className="bg-[#333333] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;