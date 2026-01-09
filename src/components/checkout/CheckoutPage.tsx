import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, CreditCard, User, Mail, Phone, MapPin, Building, FileText, Shield, Clock, Star, ChevronRight, Package, Zap, Calendar, Euro } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import WaitlistModal from '../WaitlistModal';
import { trackAddPaymentInfo } from '../../lib/analytics';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  oneTimePrice?: number;
  enabled: boolean;
}

interface CheckoutData {
  templateId: string;
  templateName: string;
  templateCategory?: string;
  templateTier?: string;
  templatePrice: number;
  addOns: AddOn[];
  duration: number; // in months
}

interface CustomerData {
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
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    zipCode: '',
    website: '',
    industry: '',
    notes: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [spotsAvailable, setSpotsAvailable] = useState(true);
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(true);

  useEffect(() => {
    // Get checkout data from navigation state or localStorage
    const data = location.state?.checkoutData || JSON.parse(localStorage.getItem('webflix-checkout') || 'null');
    if (data) {
      setCheckoutData(data);
      checkAvailability();

      // Track begin_checkout event
      const items = [{
        item_id: data.templateId || 'webflix-template',
        item_name: data.templateName || 'Webflix Website',
        price: data.templatePrice || 29.90,
        item_category: data.templateCategory || 'website',
        quantity: 1
      }];

      // Add enabled add-ons as items
      if (data.addOns && Array.isArray(data.addOns)) {
        data.addOns.filter((addon: AddOn) => addon.enabled).forEach((addon: AddOn) => {
          items.push({
            item_id: addon.id,
            item_name: addon.name,
            price: addon.price,
            item_category: 'addon',
            quantity: 1
          });
        });
      }

    } else {
      // Redirect back if no checkout data
      navigate('/');
    }
  }, [location, navigate]);

  async function checkAvailability() {
    try {
      const { data, error } = await supabase.rpc('can_purchase_website');

      if (error) throw error;

      setSpotsAvailable(data);
      setCheckingAvailability(false);

      if (!data) {
        setWaitlistModalOpen(true);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setCheckingAvailability(false);
    }
  }

  const calculateTotal = () => {
    if (!checkoutData) return 0;
    const basePrice = checkoutData.templatePrice || 29.90;
    const addOnTotal = checkoutData.addOns.filter(addon => addon.enabled).reduce((sum, addon) => sum + addon.price, 0);
    return basePrice + addOnTotal;
  };

  const calculateOneTimeFees = () => {
    if (!checkoutData) return 0;
    return checkoutData.addOns.filter(addon => addon.enabled && addon.oneTimePrice).reduce((sum, addon) => sum + (addon.oneTimePrice || 0), 0);
  };

  const calculateTotalContract = () => {
    if (!checkoutData) return 0;
    const monthly = calculateTotal();
    const oneTime = calculateOneTimeFees();
    if (checkoutData.duration === 0) return monthly + oneTime;
    return monthly * checkoutData.duration + oneTime;
  };

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    const updatedData = { ...customerData, [field]: value };
    setCustomerData(updatedData);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!(customerData.firstName && customerData.lastName && customerData.email && customerData.phone);
    }
    if (step === 2) {
      return !!(customerData.company && customerData.address && customerData.city && customerData.zipCode && customerData.industry);
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    const orderNumber = `WF-${Date.now()}`;

    try {
      console.log('[Checkout] Starting order submission...');
      console.log('[Checkout] Order number:', orderNumber);
      console.log('[Checkout] Customer data:', customerData);
      console.log('[Checkout] Checkout data:', checkoutData);

      // Save order to Supabase first
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );

      const orderData = {
        order_number: orderNumber,
        status: 'pending_payment',
        customer_data: customerData,
        template_data: {
          id: checkoutData?.templateId,
          name: checkoutData?.templateName,
          category: checkoutData?.templateCategory,
          demo_name: checkoutData?.templateId,
          price: checkoutData?.templatePrice,
          tier: checkoutData?.templateTier || 'premium'
        },
        addons: checkoutData?.addOns.filter(addon => addon.enabled) || [],
        duration: checkoutData?.duration || 12,
        pricing: {
          monthly: calculateTotal(),
          oneTimeFees: calculateOneTimeFees(),
          total: calculateTotal() + calculateOneTimeFees(),
          monthlyTotal: calculateTotal(),
          totalFirstPayment: calculateTotal() + calculateOneTimeFees()
        }
      };

      console.log('[Checkout] Saving order to database...', orderData);

      const { data: savedOrder, error: saveError } = await supabase
        .from('webflix_orders')
        .insert([orderData])
        .select()
        .single();

      if (saveError) {
        console.error('[Checkout] Failed to save order:', saveError);
        throw new Error(`Failed to save order: ${saveError.message}`);
      }

      console.log('[Checkout] Order saved successfully:', savedOrder);

      // Create Stripe Checkout Session
      const monthlyTotal = calculateTotal();
      const oneTimeFees = calculateOneTimeFees();
      const hasRecurring = monthlyTotal > 0;

      // Build checkout items
      const items = [];

      // Add recurring subscription item
      if (hasRecurring) {
        items.push({
          name: `${checkoutData?.templateName} Website - ${checkoutData?.duration === 0 ? 'FLEX (Monatlich kündbar)' : checkoutData?.duration + ' Monate Mindestlaufzeit'}`,
          price: monthlyTotal,
          quantity: 1,
          type: 'recurring' as const,
          metadata: {
            contract_duration: String(checkoutData?.duration || 12),
            contract_type: checkoutData?.duration === 0 ? 'flex' : 'fixed',
            template_name: checkoutData?.templateName || 'Webflix Website'
          }
        });
      }

      // Add one-time items
      if (oneTimeFees > 0) {
        const oneTimeAddOns = checkoutData?.addOns.filter(a => a.enabled && a.oneTimePrice && a.oneTimePrice > 0) || [];
        for (const addon of oneTimeAddOns) {
          items.push({
            name: addon.name,
            price: addon.oneTimePrice || 0,
            quantity: 1,
            type: 'one_time' as const
          });
        }
      }

      console.log('[Checkout] Creating Stripe checkout session...');
      console.log('[Checkout] Items:', items);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          items,
          customerEmail: customerData.email,
          orderNumber: orderNumber,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
          cancelUrl: `${window.location.origin}/checkout/cancel`
        })
      });

      console.log('[Checkout] Stripe response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Checkout] Stripe error response:', errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || 'Failed to create checkout session');
        } catch (e) {
          throw new Error(`Failed to create checkout session: ${errorText}`);
        }
      }

      const responseData = await response.json();
      console.log('[Checkout] Stripe response data:', responseData);
      const { url } = responseData;

      if (!url) {
        console.error('[Checkout] No URL in response:', responseData);
        throw new Error('Keine Stripe Checkout URL erhalten');
      }

      console.log('[Checkout] Received Stripe URL:', url);

      // Track add_payment_info event
      const analyticsItems = [{
        item_id: checkoutData.templateId,
        item_name: checkoutData.templateName,
        price: checkoutData.templatePrice,
        item_category: 'Website Template',
        item_category2: checkoutData.templateCategory,
        quantity: 1
      }];

      checkoutData.addOns?.filter(addon => addon.enabled).forEach(addon => {
        analyticsItems.push({
          item_id: addon.id,
          item_name: addon.name,
          price: addon.oneTimePrice || addon.price,
          item_category: 'Power-Up',
          quantity: 1
        });
      });

      trackAddPaymentInfo({
        items: analyticsItems,
        value: calculateTotal(),
        payment_type: 'stripe'
      });

      // Redirect to Stripe Checkout
      console.log('[Checkout] Redirecting to Stripe:', url);
      console.log('[Checkout] URL type:', typeof url);
      console.log('[Checkout] URL starts with https:', url.startsWith('https://'));

      // Force redirect with timeout fallback
      setTimeout(() => {
        console.log('[Checkout] Fallback redirect triggered');
        window.location.href = url;
      }, 100);

      window.location.href = url;

    } catch (error) {
      console.error('[Checkout] Error processing order:', error);
      console.error('[Checkout] Error stack:', error instanceof Error ? error.stack : 'No stack');
      setIsSubmitting(false);

      let errorMessage = 'Es gab einen Fehler bei der Zahlungsverarbeitung. Bitte versuchen Sie es erneut.';
      if (error instanceof Error) {
        errorMessage = `Fehler: ${error.message}`;
        console.error('[Checkout] Error message:', error.message);
        console.error('[Checkout] Error name:', error.name);
      }

      alert(errorMessage);
    }
  };
    

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Keine Checkout-Daten gefunden</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-400 text-black font-semibold text-sm sm:text-base rounded-lg"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center p-4 sm:p-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Bestellung erfolgreich!</h1>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
            Vielen Dank für Ihre Bestellung. Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
          </p>
          
          {/* Checklist CTA */}
          <div className="bg-[#333333] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              Ihre nächsten Schritte
            </h3>
            <div className="text-left space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                <span className="text-sm sm:text-base">Laden Sie Ihre persönliche Checkliste herunter</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                <span className="text-sm sm:text-base">Stellen Sie uns die benötigten Inhalte zur Verfügung</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                <span className="text-sm sm:text-base">Ihre Website geht innerhalb von 48h live</span>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6">
              <button
                onClick={() => navigate('/checklist')}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-400 text-black font-semibold text-sm sm:text-base rounded-lg hover:from-orange-600 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                Zur Checkliste
              </button>
            </div>
          </div>

          <div className="bg-[#333333] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Was passiert als nächstes?</h3>
            <div className="space-y-2 sm:space-y-3 text-left">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                <span className="text-sm sm:text-base">Sie erhalten eine E-Mail mit dem Zahlungslink</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                <span className="text-sm sm:text-base">Nach der Zahlung erhalten Sie die Checkliste per E-Mail</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                <span className="text-sm sm:text-base">Sie stellen uns Ihre Inhalte bereit und die Website geht live</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-400 text-black font-semibold text-sm sm:text-base rounded-lg"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  const enabledAddOns = checkoutData.addOns.filter(addon => addon.enabled);
  const monthlyTotal = calculateTotal();
  const oneTimeFees = calculateOneTimeFees();
  const totalFirstPayment = monthlyTotal + oneTimeFees;

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Zurück</span>
          </button>
          <img
            src="https://i.imgur.com/2SbjgE7.png"
            alt="Webflix"
            className="h-6 sm:h-8 w-auto"
          />
          <div className="w-12 sm:w-20"></div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto pb-2">
            {[
              { step: 1, title: 'Persönliche Daten' },
              { step: 2, title: 'Unternehmensdaten' },
              { step: 3, title: 'Bestellung abschließen' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-shrink-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                  currentStep >= item.step
                    ? 'bg-gradient-to-r from-orange-500 to-pink-400 text-black'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {currentStep > item.step ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : item.step}
                </div>
                <span className={`ml-1.5 sm:ml-2 text-xs sm:text-sm whitespace-nowrap ${currentStep >= item.step ? 'text-white' : 'text-gray-400'}`}>
                  <span className="hidden sm:inline">{item.title}</span>
                  <span className="sm:hidden">{item.title.split(' ')[0]}</span>
                </span>
                {index < 2 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${
                    currentStep > item.step ? 'bg-orange-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="bg-[#333333] rounded-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Persönliche Daten</h2>
                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Vorname *</label>
                      <input
                        type="text"
                        value={customerData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Max"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Nachname *</label>
                      <input
                        type="text"
                        value={customerData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Mustermann"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">E-Mail *</label>
                      <input
                        type="email"
                        value={customerData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="max@mustermann.de"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Telefon *</label>
                      <input
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="+49 123 456 7890"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-[#333333] rounded-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Unternehmensdaten</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Firmenname *</label>
                      <input
                        type="text"
                        value={customerData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Mustermann GmbH"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Adresse *</label>
                        <input
                          type="text"
                          value={customerData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Musterstraße 123"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">PLZ *</label>
                        <input
                          type="text"
                          value={customerData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Stadt *</label>
                      <input
                        type="text"
                        value={customerData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Musterstadt"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Branche *</label>
                      <select
                        value={customerData.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Branche auswählen</option>
                        <option value="autoaufbereitung">Autoaufbereitung</option>
                        <option value="gartenlandschaftsbau">Gartenlandschaftsbau</option>
                        <option value="gebaudereinigung">Gebäudereinigung</option>
                        <option value="malerbetrieb">Malerbetrieb</option>
                        <option value="beauty-friseur">Beauty & Friseur</option>
                        <option value="handwerk">Handwerk</option>
                        <option value="wellness">Wellness & Spa</option>
                        <option value="coaching">Coaching</option>
                        <option value="food-blog">Food Blog</option>
                        <option value="andere">Andere</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Aktuelle Website (optional)</label>
                      <input
                        type="url"
                        value={customerData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="https://ihre-website.de"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Besondere Wünsche (optional)</label>
                      <textarea
                        value={customerData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/60 border border-white/30 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Besondere Wünsche oder Anmerkungen..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-[#333333] rounded-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Bestellung abschließen</h2>

                  {/* Customer Summary */}
                  <div className="bg-black/40 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Ihre Daten</h3>
                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p><span className="text-gray-400">Name:</span> {customerData.firstName} {customerData.lastName}</p>
                        <p><span className="text-gray-400">E-Mail:</span> {customerData.email}</p>
                        <p><span className="text-gray-400">Telefon:</span> {customerData.phone}</p>
                      </div>
                      <div>
                        <p><span className="text-gray-400">Firma:</span> {customerData.company}</p>
                        <p><span className="text-gray-400">Adresse:</span> {customerData.address}, {customerData.zipCode} {customerData.city}</p>
                        <p><span className="text-gray-400">Branche:</span> {customerData.industry}</p>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-pink-400/10 border border-orange-500/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs sm:text-sm">
                        <p className="font-medium mb-2">Wichtige Informationen:</p>
                        <ul className="space-y-1 text-gray-300">
                          <li>• Nach Vertragsabschluss erhalten Sie eine Checkliste mit benötigten Inhalten</li>
                          <li>• 48h-Go-Live-Garantie nach vollständiger Bereitstellung Ihrer Inhalte</li>
                          <li>• Monatlich kündbar nach Ablauf der Mindestlaufzeit</li>
                          <li>• Alle Preise verstehen sich zzgl. gesetzlicher MwSt.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className="w-full px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold text-base sm:text-lg rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Bestellung wird verarbeitet...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>Kostenpflichtig bestellen</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 3 && (
                <div className="flex justify-between mt-4 sm:mt-6 gap-3">
                  <button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="px-4 sm:px-6 py-2 sm:py-3 border border-white/30 text-white text-sm sm:text-base rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Zurück
                  </button>
                  <button
                    onClick={() => {
                      const nextStep = currentStep + 1;
                      setCurrentStep(nextStep);

                      // Track checkout progress
                      if (nextStep === 2 && checkoutData) {
                        // User completed personal info, moving to company info
                        const items = [{
                          item_id: checkoutData.templateId || 'webflix-template',
                          item_name: checkoutData.templateName || 'Webflix Website',
                          price: checkoutData.templatePrice || 29.90,
                          item_category: checkoutData.templateCategory || 'website',
                          quantity: 1
                        }];

                        checkoutData.addOns?.filter(addon => addon.enabled).forEach(addon => {
                          items.push({
                            item_id: addon.id,
                            item_name: addon.name,
                            price: addon.price,
                            item_category: 'addon',
                            quantity: 1
                          });
                        });

                        const totalValue = calculateTotal();
                      } else if (nextStep === 3 && checkoutData) {
                        // User completed company info, moving to review
                        const items = [{
                          item_id: checkoutData.templateId || 'webflix-template',
                          item_name: checkoutData.templateName || 'Webflix Website',
                          price: checkoutData.templatePrice || 29.90,
                          item_category: checkoutData.templateCategory || 'website',
                          quantity: 1
                        }];

                        checkoutData.addOns?.filter(addon => addon.enabled).forEach(addon => {
                          items.push({
                            item_id: addon.id,
                            item_name: addon.name,
                            price: addon.price,
                            item_category: 'addon',
                            quantity: 1
                          });
                        });
                      }
                    }}
                    disabled={!validateStep(currentStep)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-400 text-black font-semibold text-sm sm:text-base rounded-lg hover:from-orange-600 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>Weiter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#333333] rounded-lg p-6 sticky top-8 space-y-6">
                <h3 className="text-xl font-bold mb-4">Bestellübersicht</h3>

                {/* Template - Hauptprodukt */}
                <div className="border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-pink-400 text-black text-xs font-bold rounded">NEU</span>
                        <span className="text-xs text-gray-400">Webflix 1</span>
                      </div>
                      <h4 className="font-bold text-base">{checkoutData.templateName}</h4>
                      <p className="text-xs text-gray-400 mt-1">Ab 29,90 €/Monat bei 0 € Einrichtungsgebühr</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm bg-orange-500/10 px-3 py-2 rounded-lg border border-orange-500/20">
                      <span className="text-gray-300 font-medium">Monatlicher Preis:</span>
                      <span className="font-bold text-orange-500">{checkoutData.templatePrice.toFixed(2)}€</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Flexible Laufzeit: {checkoutData.duration === 0 ? 'Monatlich' : checkoutData.duration === 12 ? '12 Monate' : '24 Monate'}</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Add-ons / Power-Ups */}
                {enabledAddOns.filter(addon => addon.price > 0).length > 0 && (
                  <div className="border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-4">
                    <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                      Monatliche Power-Ups
                    </h4>
                    <div className="space-y-2">
                      {enabledAddOns.filter(addon => addon.price > 0).map((addon) => (
                        <div key={addon.id} className="text-sm">
                          <div className="flex justify-between items-start">
                            <span className="text-gray-300 flex-1">{addon.name}</span>
                            <span className="text-orange-500 font-medium whitespace-nowrap">+{addon.price.toFixed(2)}€/mtl</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
                      <div className="flex justify-between text-xs sm:text-sm font-semibold">
                        <span className="text-gray-300">Monatlich Gesamt:</span>
                        <span className="text-orange-500">+{enabledAddOns.filter(addon => addon.price > 0).reduce((sum, addon) => sum + addon.price, 0).toFixed(2)}€/Monat</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* One-time Add-ons */}
                {enabledAddOns.filter(addon => addon.oneTimePrice && addon.oneTimePrice > 0).length > 0 && (
                  <div className="border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-4">
                    <h4 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                      Einmalige Power-Ups
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2">
                      {enabledAddOns.filter(addon => addon.oneTimePrice && addon.oneTimePrice > 0).map((addon) => (
                        <div key={addon.id} className="text-xs sm:text-sm">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-gray-300 flex-1">{addon.name}</span>
                            <span className="text-orange-500 font-medium whitespace-nowrap">{addon.oneTimePrice.toFixed(2)}€ einmalig</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
                      <div className="flex justify-between text-xs sm:text-sm font-semibold">
                        <span className="text-gray-300">Einmalige Kosten Gesamt:</span>
                        <span className="text-orange-500">{calculateOneTimeFees().toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Duration */}
                <div className="border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">
                      Laufzeit: {checkoutData.duration === 0 ? 'Monatlich kündbar' : `${checkoutData.duration} Monate`}
                    </span>
                  </div>
                  {checkoutData.duration === 24 && (
                    <div className="text-xs sm:text-sm text-green-400">
                      <span>AKTIONSRABATT: 20€ gespart pro Monat</span>
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    {calculateOneTimeFees() > 0 && (
                      <div className="flex justify-between text-gray-400">
                        <span>Einmalige Kosten:</span>
                        <span>{calculateOneTimeFees().toFixed(2)}€</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-400">
                      <span>Monatlich:</span>
                      <span>{calculateTotal().toFixed(2)}€</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-2 sm:pt-3 flex justify-between text-base sm:text-lg font-bold">
                    <span>Monatliche Zahlung:</span>
                    <span className="text-orange-500">{calculateTotal().toFixed(2)}€</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Alle Preise zzgl. 19% MwSt.
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span>48h-Go-Live-Garantie</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span>DSGVO-konform</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                      <span>5 Stunden Änderungen/Jahr inklusive</span>
                    </div>
                  </div>
                </div>

                {/* Help CTA */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="bg-gradient-to-r from-orange-500/10 to-pink-400/10 border border-orange-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">Brauchst du Hilfe beim Bestellvorgang?</h4>
                    <p className="text-xs text-gray-300 mb-3">Unser Expertenteam steht dir zur Verfügung</p>
                    <a
                      href="https://wa.me/4915730487805?text=Hallo%2C%20ich%20brauche%20Hilfe%20beim%20Bestellvorgang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Jetzt Webflix Experte kontaktieren</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {waitlistModalOpen && (
        <WaitlistModal
          isOpen={waitlistModalOpen}
          onClose={() => {
            setWaitlistModalOpen(false);
            navigate('/');
          }}
          interestedTemplate={checkoutData?.templateName}
        />
      )}
    </div>
  );
};

export default CheckoutPage;