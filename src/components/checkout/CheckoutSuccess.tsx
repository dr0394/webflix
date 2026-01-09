import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, FileText, Clock, Mail, Loader2, LogIn } from 'lucide-react';
import { trackPurchase } from '../../lib/analytics';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [customerLoginInfo, setCustomerLoginInfo] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    const processOrder = async () => {
      const sessionId = searchParams.get('session_id');
      const orderNumber = searchParams.get('order');
      const testMode = searchParams.get('test') === 'true';

      // Test mode: Fire purchase event with dummy data
      if (testMode && !sessionId && !orderNumber) {
        console.log('[CheckoutSuccess] TEST MODE: Firing test purchase event');

        const testItems = [{
          item_id: 'test-template',
          item_name: 'Test Website Template',
          price: 29.90,
          item_category: 'Website Template',
          item_category2: 'Autoaufbereitung',
          quantity: 1
        }];

        // Push user data to dataLayer before purchase event
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "user_data",
            email: "test@example.com",
            phone: ""
          });
        }

        trackPurchase({
          transaction_id: `TEST-${Date.now()}`,
          value: 29.90,
          tax: 0,
          shipping: 0,
          currency: 'EUR',
          items: testItems
        });

        console.log('[GA4] Test purchase event fired!');
        setIsProcessing(false);
        return;
      }

      if (!sessionId || !orderNumber) {
        setIsProcessing(false);
        return;
      }

      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );

        // First, fetch the order to get all data
        const { data: existingOrder, error: fetchError } = await supabase
          .from('webflix_orders')
          .select('*')
          .eq('order_number', orderNumber)
          .maybeSingle();

        console.log('[CheckoutSuccess] Fetched order:', existingOrder);
        console.log('[CheckoutSuccess] Fetch error:', fetchError);

        if (fetchError) {
          console.error('Failed to fetch order:', fetchError);
        }

        // Update order status
        const { data: updatedOrder, error: updateError } = await supabase
          .from('webflix_orders')
          .update({
            status: 'paid',
            stripe_session_id: sessionId,
            paid_at: new Date().toISOString()
          })
          .eq('order_number', orderNumber)
          .select()
          .maybeSingle();

        console.log('[CheckoutSuccess] Updated order:', updatedOrder);
        console.log('[CheckoutSuccess] Update error:', updateError);

        if (updateError) {
          console.error('Failed to update order:', updateError);
        }

        // Use either updatedOrder or existingOrder for analytics
        const orderForAnalytics = updatedOrder || existingOrder;

        if (orderForAnalytics) {
          const orderData = {
            id: orderForAnalytics.order_number,
            timestamp: orderForAnalytics.created_at,
            customer: orderForAnalytics.customer_data,
            template: orderForAnalytics.template_data,
            addOns: orderForAnalytics.addons,
            duration: orderForAnalytics.duration,
            pricing: orderForAnalytics.pricing,
            status: orderForAnalytics.status,
            stripeSessionId: sessionId,
            paidAt: orderForAnalytics.paid_at
          };

          localStorage.setItem('webflix-latest-order', JSON.stringify(orderData));

          // Track purchase event for GA4
          const items = [{
            item_id: orderForAnalytics.template_data?.id || orderForAnalytics.template_data?.demo_name || 'webflix-template',
            item_name: orderForAnalytics.template_data?.name || 'Webflix Website',
            price: orderForAnalytics.template_data?.price || orderForAnalytics.pricing?.basePrice || 29.90,
            item_category: 'Website Template',
            item_category2: orderForAnalytics.template_data?.category || 'website',
            quantity: 1
          }];

          // Add addons as items
          if (orderForAnalytics.addons && Array.isArray(orderForAnalytics.addons)) {
            orderForAnalytics.addons.forEach((addon: any) => {
              if (addon.enabled) {
                items.push({
                  item_id: addon.id,
                  item_name: addon.name,
                  price: addon.oneTimePrice || addon.price || 0,
                  item_category: 'Power-Up',
                  item_category2: 'Add-on',
                  quantity: 1
                });
              }
            });
          }

          // Calculate total value
          const totalValue = orderForAnalytics.pricing?.total ||
                           orderForAnalytics.pricing?.totalFirstPayment ||
                           orderForAnalytics.pricing?.monthlyTotal ||
                           29.90;

          // Push user data to dataLayer before purchase event
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "user_data",
              email: orderForAnalytics.customer_data?.email || "",
              phone: orderForAnalytics.customer_data?.phone || ""
            });
          }

          // Track purchase event
          console.log('[GA4] Tracking purchase event:', {
            transaction_id: orderForAnalytics.order_number,
            value: totalValue,
            items
          });

          trackPurchase({
            transaction_id: orderForAnalytics.order_number,
            value: totalValue,
            tax: 0,
            shipping: 0,
            currency: 'EUR',
            items
          });
        } else {
          console.error('[CheckoutSuccess] No order data available for tracking!');
          console.error('[CheckoutSuccess] Order Number:', orderNumber);
          console.error('[CheckoutSuccess] Session ID:', sessionId);
        }

        try {
          const processResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-payment-success`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
              orderNumber: orderNumber,
              sessionId: sessionId
            })
          });

          if (!processResponse.ok) {
            const errorData = await processResponse.text();
            console.error('Payment processing failed:', errorData);
            throw new Error(`Payment processing failed: ${errorData}`);
          }

          const result = await processResponse.json();
          console.log('Payment processed successfully:', result);

          if (result.loginPassword) {
            setCustomerLoginInfo({
              email: result.loginEmail,
              password: result.loginPassword
            });
          }
        } catch (processError) {
          console.error('Payment processing failed:', processError);
        }

        localStorage.removeItem('webflix-checkout');
      } catch (error) {
        console.error('Error processing order:', error);
      }

      setIsProcessing(false);
    };

    processOrder();
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-[#E2E5E9] text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Bestellung wird verarbeitet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E2E5E9] text-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://i.imgur.com/2SbjgE7.png"
            alt="Webflix"
            className="h-12 mx-auto"
          />
        </div>

        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
          Zahlung erfolgreich!
        </h1>

        <p className="text-lg text-gray-600 mb-8 text-center">
          Vielen Dank für Ihre Bestellung. Ihre Website wird jetzt vorbereitet.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-900">
            <FileText className="w-6 h-6 text-orange-500" />
            Ihre nächsten Schritte
          </h2>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-500/10 to-pink-400/10 border border-orange-500/30 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Loggen Sie sich im Kundenbereich ein</h3>
                <p className="text-sm text-gray-600">
                  Nutzen Sie die unten stehenden Zugangsdaten (auch in der Willkommens-E-Mail), um sich im Kundenportal anzumelden
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Füllen Sie die Checkliste aus</h3>
                <p className="text-sm text-gray-600">
                  Stellen Sie uns alle benötigten Inhalte über die Checkliste bereit
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Wir erstellen Ihre Website</h3>
                <p className="text-sm text-gray-600">
                  Wir starten mit der Erstellung Ihrer Website und informieren Sie, sobald die Website online ist
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.open('/customer/login', '_blank')}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Zum Kundenportal
          </button>
        </div>

        {customerLoginInfo && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2 text-gray-900">
              <Check className="w-5 h-5 text-green-500" />
              Ihre Zugangsdaten zum Kundenportal
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-3 font-medium">Ihre Zugangsdaten:</p>
              <p className="font-mono text-sm mb-2 text-gray-800"><span className="text-gray-600 font-sans">E-Mail:</span> {customerLoginInfo.email}</p>
              <p className="font-mono text-sm mb-3 text-gray-800"><span className="text-gray-600 font-sans">Passwort:</span> {customerLoginInfo.password}</p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
                <p className="text-xs text-orange-800 font-medium">
                  Bitte notieren Sie sich diese Zugangsdaten. Sie erhalten diese auch per E-Mail.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800 font-medium">
                  Hinweis: Bitte überprüfen Sie auch Ihren Spam-Ordner, falls Sie keine E-Mail erhalten haben. Die E-Mails könnten dort gelandet sein.
                </p>
              </div>
            </div>
            <button
              onClick={() => window.open('/customer/login', '_blank')}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Zum Kundenportal  
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2 text-gray-900">
            <Mail className="w-5 h-5 text-orange-500" />
            Bestätigungs-E-Mail
          </h3>
          <p className="text-gray-600 text-sm text-center">
            Sie haben eine Bestätigungs-E-Mail mit allen Details zu Ihrer Bestellung erhalten.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-yellow-800 font-medium text-center">
              Wichtig: Bitte überprüfen Sie auch Ihren Spam-Ordner, falls Sie keine E-Mail erhalten haben!
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mb-6">
          <Clock className="w-4 h-4 text-green-500" />
          <span>48h-Go-Live-Garantie nach Bereitstellung aller Inhalte</span>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-lg text-gray-700 hover:text-gray-900 transition-all"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
