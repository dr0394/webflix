import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, Clock, AlertCircle, FileText, Search, Image as ImageIcon, Settings, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import WebsiteGenerator from './WebsiteGenerator';
import WeeklySalesManager from './WeeklySalesManager';

interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  template_name: string;
  pricing_tier: string;
  contract_duration: number;
  monthly_price: number;
  total_price: number;
  status: string;
  checklist_completed: boolean;
  checklist_completed_at: string | null;
  created_at: string;
  customer_data?: any;
  template_data?: any;
}

interface CustomerBranding {
  id: string;
  order_id: string;
  company_name: string | null;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  cta_text: string;
  about_text: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  domain_preference: string | null;
  industry_specific_data: any;
  status: string;
  completed_at: string | null;
  onboarding_token?: string;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [customerBranding, setCustomerBranding] = useState<CustomerBranding | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'sales'>('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSendingInvoice, setIsSendingInvoice] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('webflix_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedOrders = (data || []).map((order: any) => ({
        id: order.id,
        order_number: order.order_number,
        customer_email: order.customer_data?.email || '',
        customer_name: order.customer_data?.name || '',
        template_name: order.template_data?.demo_name || order.template_data?.name || '',
        pricing_tier: order.template_data?.tier || '',
        contract_duration: order.duration || 0,
        monthly_price: order.pricing?.monthly || 0,
        total_price: order.pricing?.total || 0,
        status: order.status,
        checklist_completed: order.checklist_completed || false,
        checklist_completed_at: order.checklist_completed_at,
        created_at: order.created_at,
        customer_data: order.customer_data,
        template_data: order.template_data
      }));

      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendInvoiceEmail = async (orderNumber: string) => {
    if (!confirm('Möchten Sie die Rechnungs-E-Mail wirklich an diesen Kunden senden?')) {
      return;
    }

    setIsSendingInvoice(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invoice-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ orderNumber }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Senden der E-Mail');
      }

      alert('✅ Rechnungs-E-Mail wurde erfolgreich versendet!');
    } catch (error) {
      console.error('Error sending invoice email:', error);
      alert(`❌ Fehler beim Senden der E-Mail: ${error.message}`);
    } finally {
      setIsSendingInvoice(false);
    }
  };

  const loadChecklist = async (orderId: string, demoName: string) => {
    try {
      const { data: checklistData } = await supabase
        .from('order_checklists')
        .select('*')
        .eq('order_id', orderId)
        .maybeSingle();

      const { data: brandingData, error: brandingError } = await supabase
        .from('customer_brandings')
        .select('*')
        .eq('order_id', orderId)
        .maybeSingle();

      if (brandingError) {
        console.error('Error loading branding:', brandingError);
      }

      if (brandingData) {
        if (checklistData?.checklist_data && Object.keys(checklistData.checklist_data).length > 0) {
          brandingData.industry_specific_data = checklistData.checklist_data;
        }
      }

      setCustomerBranding(brandingData);
    } catch (error) {
      console.error('Error loading checklist:', error);
    }
  };

  const handleOrderClick = async (order: Order) => {
    setSelectedOrder(order);
    await loadChecklist(order.id, order.template_name);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const renderBrandingData = () => {
    if (!customerBranding) return null;

    return (
      <div className="bg-black/40 rounded-lg p-6 border border-white/10 mb-6">
        <h3 className="text-xl font-semibold mb-4">Branding & Kontaktdaten</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {customerBranding.company_name && (
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Firmenname</label>
              <p className="text-white">{customerBranding.company_name}</p>
            </div>
          )}
          {customerBranding.logo_url && (
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Logo</label>
              <div className="bg-black/40 border border-green-500/30 rounded p-3">
                <img src={customerBranding.logo_url} alt="Logo" className="w-20 h-20 object-contain rounded mb-2" />
                <a
                  href={customerBranding.logo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 break-all font-mono"
                >
                  {customerBranding.logo_url}
                </a>
              </div>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1">Farben</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-white/20" style={{ backgroundColor: customerBranding.primary_color }}></div>
                <span className="text-xs text-gray-400">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-white/20" style={{ backgroundColor: customerBranding.secondary_color }}></div>
                <span className="text-xs text-gray-400">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-white/20" style={{ backgroundColor: customerBranding.accent_color }}></div>
                <span className="text-xs text-gray-400">Accent</span>
              </div>
            </div>
          </div>
          {customerBranding.contact_email && (
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">E-Mail</label>
              <a href={`mailto:${customerBranding.contact_email}`} className="text-blue-400 hover:text-blue-300">
                {customerBranding.contact_email}
              </a>
            </div>
          )}
          {customerBranding.contact_phone && (
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Telefon</label>
              <a href={`tel:${customerBranding.contact_phone}`} className="text-blue-400 hover:text-blue-300">
                {customerBranding.contact_phone}
              </a>
            </div>
          )}
          {customerBranding.contact_address && (
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Adresse</label>
              <p className="text-white whitespace-pre-line">{customerBranding.contact_address}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderValue = (value: any, key: string): React.ReactNode => {
    if (!value) return <p className="text-gray-500 text-sm">Keine Angabe</p>;

    if (typeof value === 'string') {
      if (value.startsWith('http')) {
        if (value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return (
            <div className="bg-black/40 border border-green-500/30 rounded p-3 inline-block">
              <img src={value} alt={key} className="w-24 h-24 object-cover rounded mb-2" />
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 break-all font-mono block"
              >
                {value}
              </a>
            </div>
          );
        }
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 break-all"
          >
            {value}
          </a>
        );
      }
      return <p className="text-white whitespace-pre-line">{value}</p>;
    }

    if (Array.isArray(value)) {
      return (
        <div className="space-y-2">
          {value.map((item, idx) => (
            <div key={idx}>
              {typeof item === 'object' && item !== null ? (
                <div className="bg-black/40 border border-white/10 rounded p-3 mb-2">
                  {Object.entries(item).map(([subKey, subValue]) => (
                    <div key={subKey} className="mb-2 last:mb-0">
                      <span className="text-xs text-gray-400 font-medium">{subKey}: </span>
                      <span className="text-sm text-white">{String(subValue)}</span>
                    </div>
                  ))}
                </div>
              ) : typeof item === 'string' && item.startsWith('http') && item.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <div className="bg-black/40 border border-green-500/30 rounded p-3 mb-2 inline-block">
                  <img src={item} alt={`${key} ${idx + 1}`} className="w-24 h-24 object-cover rounded mb-2" />
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 break-all font-mono block"
                  >
                    {item}
                  </a>
                </div>
              ) : (
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30 inline-block mr-2 mb-2">
                  {String(item)}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="bg-black/40 border border-white/10 rounded p-4 space-y-3">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="border-b border-white/5 pb-2 last:border-0">
              <label className="text-xs font-medium text-gray-400 block mb-1 capitalize">
                {subKey.replace(/_/g, ' ')}
              </label>
              <div className="ml-2">{renderValue(subValue, subKey)}</div>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-white">{String(value)}</p>;
  };

  const renderCustomBranding = () => {
    if (!customerBranding) {
      return null;
    }

    const hasBasicInfo = customerBranding.company_name || customerBranding.logo_url ||
                         customerBranding.contact_email || customerBranding.contact_phone;

    if (!hasBasicInfo) {
      return null;
    }

    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-bold text-blue-400 mb-4">🎨 Custom Branding</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Firmendaten</h4>
              {customerBranding.company_name && (
                <div className="mb-3">
                  <label className="text-xs text-gray-500">Firmenname</label>
                  <p className="text-white font-semibold">{customerBranding.company_name}</p>
                </div>
              )}
              {customerBranding.contact_email && (
                <div className="mb-3">
                  <label className="text-xs text-gray-500">E-Mail</label>
                  <p className="text-white">{customerBranding.contact_email}</p>
                </div>
              )}
              {customerBranding.contact_phone && (
                <div className="mb-3">
                  <label className="text-xs text-gray-500">Telefon</label>
                  <p className="text-white">{customerBranding.contact_phone}</p>
                </div>
              )}
              {customerBranding.contact_address && (
                <div className="mb-3">
                  <label className="text-xs text-gray-500">Adresse</label>
                  <p className="text-white">{customerBranding.contact_address}</p>
                </div>
              )}
              {customerBranding.domain_preference && (
                <div>
                  <label className="text-xs text-gray-500">Wunschdomain</label>
                  <p className="text-white">{customerBranding.domain_preference}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {customerBranding.logo_url && (
              <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Logo</h4>
                <div className="bg-white/5 rounded-lg p-4 inline-block">
                  <img
                    src={customerBranding.logo_url}
                    alt="Logo"
                    className="max-w-[200px] max-h-[100px] object-contain"
                  />
                </div>
              </div>
            )}

            <div className="bg-black/40 rounded-lg p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Farben</h4>
              <div className="space-y-2">
                {customerBranding.primary_color && (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-white/20"
                      style={{ backgroundColor: customerBranding.primary_color }}
                    />
                    <div>
                      <label className="text-xs text-gray-500 block">Primärfarbe</label>
                      <p className="text-white font-mono text-sm">{customerBranding.primary_color}</p>
                    </div>
                  </div>
                )}
                {customerBranding.secondary_color && (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-white/20"
                      style={{ backgroundColor: customerBranding.secondary_color }}
                    />
                    <div>
                      <label className="text-xs text-gray-500 block">Sekundärfarbe</label>
                      <p className="text-white font-mono text-sm">{customerBranding.secondary_color}</p>
                    </div>
                  </div>
                )}
                {customerBranding.accent_color && (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-white/20"
                      style={{ backgroundColor: customerBranding.accent_color }}
                    />
                    <div>
                      <label className="text-xs text-gray-500 block">Akzentfarbe</label>
                      <p className="text-white font-mono text-sm">{customerBranding.accent_color}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {(customerBranding.hero_title || customerBranding.hero_subtitle || customerBranding.about_text) && (
          <div className="mt-4 bg-black/40 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-gray-400 mb-3">Texte & Inhalte</h4>
            {customerBranding.hero_title && (
              <div className="mb-3">
                <label className="text-xs text-gray-500">Hero Titel</label>
                <p className="text-white font-semibold">{customerBranding.hero_title}</p>
              </div>
            )}
            {customerBranding.hero_subtitle && (
              <div className="mb-3">
                <label className="text-xs text-gray-500">Hero Untertitel</label>
                <p className="text-white">{customerBranding.hero_subtitle}</p>
              </div>
            )}
            {customerBranding.cta_text && (
              <div className="mb-3">
                <label className="text-xs text-gray-500">CTA Button Text</label>
                <p className="text-white">{customerBranding.cta_text}</p>
              </div>
            )}
            {customerBranding.about_text && (
              <div>
                <label className="text-xs text-gray-500">Über uns Text</label>
                <p className="text-white whitespace-pre-line">{customerBranding.about_text}</p>
              </div>
            )}
          </div>
        )}

        {customerBranding.reference_images && Object.keys(customerBranding.reference_images).length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <h4 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              Referenzbilder vom Kunden
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Der Kunde hat diese Bilder hochgeladen, um zu zeigen, wie bestimmte Sections aussehen sollen.
            </p>

            <div className="space-y-6">
              {Object.entries(customerBranding.reference_images).map(([sectionId, images]: [string, any]) => {
                if (!images || images.length === 0) return null;

                return (
                  <div key={sectionId} className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <h5 className="text-sm font-semibold text-purple-300 mb-3 capitalize">
                      {sectionId.replace(/_/g, ' ')}
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {images.map((url: string, index: number) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative block"
                        >
                          <img
                            src={url}
                            alt={`${sectionId} Referenz ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-white/20 group-hover:border-purple-500/50 transition-all"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 rounded-lg transition-all flex items-center justify-center">
                            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                              Vollbild öffnen
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                            #{index + 1}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderChecklistData = () => {
    if (!customerBranding || !customerBranding.industry_specific_data || Object.keys(customerBranding.industry_specific_data).length === 0) {
      return (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Keine Checkliste verfügbar</p>
          <p className="text-gray-500 text-sm mt-2">Der Kunde hat die Checkliste noch nicht ausgefüllt</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {Object.entries(customerBranding.industry_specific_data).map(([key, value]) => (
          <div key={key} className="bg-black/40 rounded-lg p-4 border border-white/10">
            <h4 className="text-lg font-semibold mb-3 capitalize text-orange-400">
              {key.replace(/_/g, ' ')}
            </h4>
            {renderValue(value, key)}
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Lade Bestellungen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Verwalte Bestellungen, Verkaufslimits und Warteliste</p>
            </div>
            <a
              href="/admin/library"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold flex items-center gap-2 transition-all"
            >
              <Package className="w-5 h-5" />
              Component Library
            </a>
          </div>

          <div className="flex gap-4 border-b border-white/10">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-semibold flex items-center gap-2 transition-all relative ${
                activeTab === 'orders'
                  ? 'text-orange-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Package className="w-5 h-5" />
              Bestellungen
              {activeTab === 'orders' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-3 font-semibold flex items-center gap-2 transition-all relative ${
                activeTab === 'sales'
                  ? 'text-orange-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              Verkaufslimits
              {activeTab === 'sales' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400" />
              )}
            </button>
          </div>
        </div>

        {activeTab === 'sales' ? (
          <WeeklySalesManager />
        ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Suche nach Bestellung, E-Mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-300">Bestellungen ({filteredOrders.length})</h3>
                </div>
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredOrders.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedOrder?.id === order.id
                          ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500/50'
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm mb-1">{order.order_number}</p>
                          <p className="text-xs text-gray-400 mb-1">{order.customer_name}</p>
                          <p className="text-xs text-gray-500">{order.customer_email}</p>
                        </div>
                        {order.checklist_completed && (
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{order.template_name}</span>
                        <span className={`px-2 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(order.created_at).toLocaleDateString('de-DE')}</span>
                        <span className="font-semibold text-orange-400">{order.monthly_price}€/Monat</span>
                      </div>
                      {order.contract_duration && (
                        <div className="mt-1 text-xs text-gray-500">
                          Laufzeit: {order.contract_duration} Monate
                        </div>
                      )}
                    </button>
                  ))}
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">Keine Bestellungen gefunden</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedOrder ? (
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedOrder.order_number}</h2>
                    <p className="text-gray-400">Bestelldetails</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusBadge(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="text-sm font-medium">{selectedOrder.status}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Kundeninformationen</h3>
                      <button
                        onClick={() => sendInvoiceEmail(selectedOrder.order_number)}
                        disabled={isSendingInvoice}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg text-sm font-medium transition-all disabled:cursor-not-allowed"
                        title="Rechnungs-E-Mail an Kunden senden"
                      >
                        <Mail className="w-4 h-4" />
                        {isSendingInvoice ? 'Sende...' : 'Rechnung'}
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Name:</span>
                        <span className="ml-2 text-white">{selectedOrder.customer_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">E-Mail:</span>
                        <a href={`mailto:${selectedOrder.customer_email}`} className="ml-2 text-blue-400 hover:text-blue-300">
                          {selectedOrder.customer_email}
                        </a>
                      </div>
                      <div>
                        <span className="text-gray-400">Bestellt am:</span>
                        <span className="ml-2 text-white">
                          {new Date(selectedOrder.created_at).toLocaleDateString('de-DE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                    <h3 className="text-lg font-semibold mb-3">Bestelltes Produkt</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Template:</span>
                        <span className="ml-2 text-white">{selectedOrder.template_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Tier:</span>
                        <span className="ml-2 text-orange-400 font-semibold">{selectedOrder.pricing_tier}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Vertragslaufzeit:</span>
                        <span className="ml-2 text-white">{selectedOrder.contract_duration} Monate</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Monatlicher Preis:</span>
                        <span className="ml-2 text-white font-semibold">{selectedOrder.monthly_price}€</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Gesamtpreis:</span>
                        <span className="ml-2 text-white font-semibold">{selectedOrder.total_price}€</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  {selectedOrder.checklist_completed ? (
                    <div className="space-y-4">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <h3 className="text-lg font-semibold text-green-400">Checkliste ausgefüllt</h3>
                        </div>
                        {selectedOrder.checklist_completed_at && (
                          <p className="text-sm text-gray-400">
                            Ausgefüllt am: {new Date(selectedOrder.checklist_completed_at).toLocaleDateString('de-DE', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>

                      {renderBrandingData()}

                      {renderCustomBranding()}

                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-blue-400 mb-2">🚀 Website Generator</h3>
                          <p className="text-gray-400 text-sm">
                            Generiere fertigen Code mit allen Kundendaten für das neue Bolt-Projekt
                          </p>
                        </div>
                        {customerBranding ? (
                          <WebsiteGenerator
                            order={selectedOrder}
                            checklist={{
                              id: customerBranding.id,
                              order_id: selectedOrder.id,
                              demo_name: selectedOrder.template_name,
                              checklist_data: customerBranding
                            }}
                            onGenerated={() => loadChecklist(selectedOrder.id, selectedOrder.template_name)}
                          />
                        ) : (
                          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                            <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                            <p className="text-yellow-400 font-semibold">Branding-Daten werden geladen...</p>
                            <p className="text-sm text-gray-400 mt-1">
                              Falls keine Daten erscheinen, hat der Kunde die neue Branding-Checkliste noch nicht ausgefüllt.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-orange-400">Vollständige Checklist-Daten</h3>
                          {customerBranding && (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                              ✓ Ausgefüllt
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                          Alle vom Kunden ausgefüllten Informationen aus der Checklist
                        </p>
                        <div className="max-h-[600px] overflow-y-auto bg-black/40 rounded-lg p-4 border border-white/10">
                          {renderChecklistData()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center">
                      <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                      <p className="text-yellow-400 font-semibold mb-1">Checkliste ausstehend</p>
                      <p className="text-sm text-gray-400">Der Kunde hat die Checkliste noch nicht ausgefüllt</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Keine Bestellung ausgewählt</h3>
                <p className="text-gray-400">Wählen Sie eine Bestellung aus der Liste aus</p>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
