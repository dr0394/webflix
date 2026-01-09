import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, X, Check, Star, MessageCircle, BarChart3, Shield, Zap, Mail, Calendar, Users, Car, MessageSquare, Camera, MapPin, TreePine, User, ChevronRight, Package, Euro } from 'lucide-react';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<any>;
  enabled: boolean;
}

interface CheckoutFlowProps {
  templateId: string;
  templateName: string;
  templateType: 'autoaufbereitung' | 'gartenlandschaftsbau' | 'personalbrand' | 'default';
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ templateId, templateName, templateType }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState(12);
  const [addOns, setAddOns] = useState<AddOn[]>([]);

  // Initialize add-ons based on template type
  React.useEffect(() => {
    let defaultAddOns: AddOn[] = [];
    
    if (templateType === 'autoaufbereitung') {
      defaultAddOns = [
        { id: 'before-after-slider', name: 'Vorher/Nachher Slider', description: 'Interaktive Vorher/Nachher Vergleiche', price: 4.99, icon: Star, enabled: true },
        { id: 'vehicle-selection', name: 'Fahrzeug-Auswahl', description: 'Interaktive Fahrzeugtyp Selektion', price: 3.99, icon: Car, enabled: true },
        { id: 'google-reviews', name: 'Google Bewertungen', description: 'Automatische Google Bewertungen Integration', price: 1.99, icon: Star, enabled: true },
        { id: 'whatsapp-integration', name: 'WhatsApp Integration', description: 'WhatsApp Chat Buttons und Verknüpfung', price: 2.99, icon: MessageCircle, enabled: true },
        { id: 'ai-chatbot', name: 'KI Chat-Bot', description: 'Intelligenter Kundenservice Bot', price: 12.99, icon: MessageSquare, enabled: false },
        { id: 'gallery-lightbox', name: 'Galerie & Lightbox', description: 'Professionelle Bildergalerie', price: 3.99, icon: Camera, enabled: true },
        { id: 'trust-section', name: 'Vertrauen & Bewertungen', description: 'Kundenbewertungen und Vertrauenssiegel', price: 2.99, icon: Shield, enabled: true },
        { id: 'map-integration', name: 'Karten Integration', description: 'Google Maps mit Standort', price: 1.99, icon: MapPin, enabled: true }
      ];
    } else if (templateType === 'gartenlandschaftsbau') {
      defaultAddOns = [
        { id: 'service-selection', name: 'Service-Auswahl', description: 'Interaktive Gartenservice Selektion', price: 3.99, icon: TreePine, enabled: true },
        { id: 'google-reviews', name: 'Google Bewertungen', description: 'Automatische Google Bewertungen Integration', price: 1.99, icon: Star, enabled: true },
        { id: 'whatsapp-integration', name: 'WhatsApp Integration', description: 'WhatsApp Chat Buttons und Verknüpfung', price: 2.99, icon: MessageCircle, enabled: true },
        { id: 'ai-chatbot', name: 'KI Chat-Bot', description: 'Intelligenter Kundenservice Bot', price: 12.99, icon: MessageSquare, enabled: false },
        { id: 'gallery-lightbox', name: 'Galerie & Lightbox', description: 'Professionelle Bildergalerie', price: 3.99, icon: Camera, enabled: true },
        { id: 'trust-section', name: 'Vertrauen & Bewertungen', description: 'Kundenbewertungen und Vertrauenssiegel', price: 2.99, icon: Shield, enabled: true },
        { id: 'map-integration', name: 'Karten Integration', description: 'Google Maps mit Standort', price: 1.99, icon: MapPin, enabled: true },
        { id: 'analytics', name: 'Analytics Dashboard', description: 'Besucherstatistiken und Insights', price: 4.99, icon: BarChart3, enabled: false }
      ];
    } else if (templateType === 'personalbrand') {
      defaultAddOns = [
        { id: 'service-selection', name: 'Service-Auswahl', description: 'Interaktive Personal Brand Service Selektion', price: 3.99, icon: User, enabled: true },
        { id: 'google-reviews', name: 'Google Bewertungen', description: 'Automatische Google Bewertungen Integration', price: 1.99, icon: Star, enabled: true },
        { id: 'whatsapp-integration', name: 'WhatsApp Integration', description: 'WhatsApp Chat Buttons und Verknüpfung', price: 2.99, icon: MessageCircle, enabled: true },
        { id: 'ai-chatbot', name: 'KI Chat-Bot', description: 'Intelligenter Kundenservice Bot', price: 12.99, icon: MessageSquare, enabled: false },
        { id: 'gallery-lightbox', name: 'Galerie & Lightbox', description: 'Professionelle Bildergalerie', price: 3.99, icon: Camera, enabled: true },
        { id: 'trust-section', name: 'Vertrauen & Bewertungen', description: 'Kundenbewertungen und Vertrauenssiegel', price: 2.99, icon: Shield, enabled: true },
        { id: 'map-integration', name: 'Karten Integration', description: 'Google Maps mit Standort', price: 1.99, icon: MapPin, enabled: true },
        { id: 'analytics', name: 'Analytics Dashboard', description: 'Besucherstatistiken und Insights', price: 4.99, icon: BarChart3, enabled: false }
      ];
    } else {
      // Default add-ons for other templates
      defaultAddOns = [
        { id: 'google-reviews', name: 'Google Bewertungen', description: 'Automatische Google Bewertungen Integration', price: 1.99, icon: Star, enabled: true },
        { id: 'whatsapp-integration', name: 'WhatsApp Integration', description: 'WhatsApp Chat Buttons und Verknüpfung', price: 2.99, icon: MessageCircle, enabled: true },
        { id: 'ai-chatbot', name: 'KI Chat-Bot', description: 'Intelligenter Kundenservice Bot', price: 12.99, icon: MessageSquare, enabled: false },
        { id: 'gallery-lightbox', name: 'Galerie & Lightbox', description: 'Professionelle Bildergalerie', price: 3.99, icon: Camera, enabled: true },
        { id: 'trust-section', name: 'Vertrauen & Bewertungen', description: 'Kundenbewertungen und Vertrauenssiegel', price: 2.99, icon: Shield, enabled: true },
        { id: 'map-integration', name: 'Karten Integration', description: 'Google Maps mit Standort', price: 1.99, icon: MapPin, enabled: true },
        { id: 'analytics', name: 'Analytics Dashboard', description: 'Besucherstatistiken und Insights', price: 4.99, icon: BarChart3, enabled: false }
      ];
    }
    
    setAddOns(defaultAddOns);
  }, [templateType]);

  const toggleAddOn = (id: string) => {
    setAddOns(prev => prev.map(addon => 
      addon.id === id ? { ...addon, enabled: !addon.enabled } : addon
    ));
  };

  const calculatePricing = () => {
    const basePrice = 19.90;
    const addOnTotal = addOns.filter(addon => addon.enabled).reduce((sum, addon) => sum + addon.price, 0);
    const monthlyTotal = basePrice + addOnTotal;
    
    // Apply duration discounts
    let discount = 0;
    if (duration === 24) discount = 0.15; // 15% discount
    if (duration === 36) discount = 0.25; // 25% discount
    
    const discountedMonthly = monthlyTotal * (1 - discount);
    
    return {
      basePrice,
      addOnTotal,
      monthlyTotal: discountedMonthly,
      discount: discount * 100,
      savings: (monthlyTotal - discountedMonthly) * duration
    };
  };

  const proceedToCheckout = () => {
    const checkoutData = {
      templateId,
      templateName,
      templatePrice: calculatePricing().basePrice,
      addOns,
      duration
    };
    
    // Save to localStorage for persistence
    localStorage.setItem('webflix-checkout', JSON.stringify(checkoutData));
    
    // Navigate to checkout page
    navigate('/checkout', { state: { checkoutData } });
  };

  const pricing = calculatePricing();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
          isOpen ? 'right-96' : 'right-4'
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="bg-gradient-to-r from-[orange-500] to-[pink-400] hover:from-[orange-600] hover:to-[orange-500] text-black p-3 rounded-l-lg shadow-lg flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Konfigurator</span>
        </div>
      </button>

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[orange-500] to-[pink-400] text-black p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Website Konfigurator</h3>
              <p className="text-black/70 text-sm">{templateName}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-black hover:bg-black/10 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Duration Selection */}
          <div className="p-4 border-b bg-gray-50">
            <h4 className="font-semibold mb-3">Laufzeit wählen</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { months: 12, label: '12 Monate', discount: 0 },
                { months: 24, label: '24 Monate', discount: 15 },
                { months: 36, label: '36 Monate', discount: 25 }
              ].map((option) => (
                <button
                  key={option.months}
                  onClick={() => setDuration(option.months)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    duration === option.months
                      ? 'bg-[orange-500] text-black'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                  {option.discount > 0 && (
                    <div className="text-xs">-{option.discount}%</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Basis Website:</span>
                <span className="font-medium">{pricing.basePrice.toFixed(2)}€/Monat</span>
              </div>
              {pricing.addOnTotal > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Add-ons:</span>
                  <span className="font-medium text-[orange-500]">+{pricing.addOnTotal.toFixed(2)}€/Monat</span>
                </div>
              )}
              {pricing.discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Laufzeit-Rabatt ({pricing.discount}%):</span>
                  <span>-{((pricing.basePrice + pricing.addOnTotal) * (pricing.discount / 100)).toFixed(2)}€/Monat</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-bold text-lg">Monatlich:</span>
                <span className="font-bold text-xl text-[orange-500]">{pricing.monthlyTotal.toFixed(2)}€</span>
              </div>
              {pricing.savings > 0 && (
                <div className="text-xs text-green-600 text-center">
                  Sie sparen {pricing.savings.toFixed(2)}€ über die gesamte Laufzeit!
                </div>
              )}
            </div>
          </div>

          {/* Add-ons List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="font-semibold mb-4">Add-ons anpassen</h4>
            <div className="space-y-3">
              {addOns.map((addon) => (
                <div
                  key={addon.id}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    addon.enabled 
                      ? 'border-[orange-500] bg-[orange-500]/5' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  onClick={() => toggleAddOn(addon.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      addon.enabled 
                        ? 'border-[orange-500] bg-[orange-500]' 
                        : 'border-gray-300'
                    }`}>
                      {addon.enabled && <Check className="w-3 h-3 text-white" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <addon.icon className={`w-4 h-4 ${addon.enabled ? 'text-[orange-500]' : 'text-gray-400'}`} />
                        <h4 className={`font-medium ${addon.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                          {addon.name}
                        </h4>
                      </div>
                      <p className={`text-sm mb-2 ${addon.enabled ? 'text-gray-600' : 'text-gray-400'}`}>
                        {addon.description}
                      </p>
                      <div className={`text-sm font-medium ${addon.enabled ? 'text-[orange-500]' : 'text-gray-400'}`}>
                        +{addon.price.toFixed(2)}€/Monat
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="p-4 border-t bg-gray-50">
            <button 
              onClick={proceedToCheckout}
              className="w-full bg-gradient-to-r from-[orange-500] to-[pink-400] hover:from-[orange-600] hover:to-[orange-500] text-black py-3 px-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              Zur Kasse ({pricing.monthlyTotal.toFixed(2)}€/Monat)
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Monatlich kündbar nach Mindestlaufzeit von {duration} Monaten
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default CheckoutFlow;