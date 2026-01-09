import React, { useState, useEffect } from 'react';
import { Edit, Plus, ShoppingCart, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface Subscription {
  id: string;
  plan_name: string;
  contract_duration: number;
  included_changes: number;
  used_changes: number;
  purchased_changes: number;
  status: string;
}

interface ChangeLog {
  id: string;
  change_type: string;
  description: string;
  created_at: string;
}

interface ChangesTabProps {
  customerId: string;
}

export default function ChangesTab({ customerId }: ChangesTabProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    loadData();
  }, [customerId]);

  const loadData = async () => {
    try {
      const { data: subsData, error: subsError } = await supabase
        .from('customer_subscriptions')
        .select('*')
        .eq('customer_id', customerId)
        .eq('status', 'active');

      if (subsError) throw subsError;
      setSubscriptions(subsData || []);

      const subscriptionIds = subsData?.map(s => s.id) || [];
      if (subscriptionIds.length > 0) {
        const { data: logsData, error: logsError } = await supabase
          .from('subscription_change_log')
          .select('*')
          .in('subscription_id', subscriptionIds)
          .order('created_at', { ascending: false })
          .limit(10);

        if (logsError) throw logsError;
        setChangeLogs(logsData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableChanges = (sub: Subscription) => {
    return sub.included_changes + sub.purchased_changes - sub.used_changes;
  };

  const handlePurchaseChanges = async (subscriptionId: string) => {
    setIsPurchasing(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            type: 'changes',
            subscriptionId,
            amount: purchaseAmount,
            pricePerChange: 14.99
          })
        }
      );

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error purchasing changes:', error);
      alert('Fehler beim Kauf. Bitte versuchen Sie es erneut.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const getChangeTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      text_change: 'Textänderung',
      image_change: 'Bildänderung',
      layout_change: 'Layout-Änderung',
      feature_request: 'Feature-Anfrage'
    };
    return types[type] || type;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Lade Änderungen...</p>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
        <Edit className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Keine aktiven Abonnements</h3>
        <p className="text-gray-400">Sie benötigen ein aktives Abonnement um Änderungen zu verwalten.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Website-Änderungen</h2>
        <p className="text-gray-400">Verwalten Sie Ihre inkludierten und zusätzlichen Änderungen</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions.map((subscription) => {
          const available = getAvailableChanges(subscription);
          const isLowOnChanges = available <= 1;

          return (
            <div
              key={subscription.id}
              className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6"
            >
              <h3 className="text-lg font-semibold mb-4">{subscription.plan_name}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Inkludiert:</span>
                  <span className="font-semibold">{subscription.included_changes}/Monat</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Verwendet:</span>
                  <span className="font-semibold">{subscription.used_changes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Gekauft:</span>
                  <span className="font-semibold">{subscription.purchased_changes}</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Verfügbar:</span>
                    <span className={`text-2xl font-bold ${isLowOnChanges ? 'text-yellow-400' : 'text-green-400'}`}>
                      {available}
                    </span>
                  </div>
                </div>
              </div>

              {isLowOnChanges && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 mb-4">
                  <p className="text-yellow-400 text-xs">
                    Sie haben nur noch {available} Änderung{available !== 1 ? 'en' : ''} verfügbar
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedSubscription(subscription.id);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Änderungen kaufen</span>
              </button>
            </div>
          );
        })}
      </div>

      {selectedSubscription && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Änderungen kaufen</h3>

            <div className="bg-gradient-to-r from-orange-500/20 to-pink-400/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300 mb-2">Preis pro Änderung:</p>
              <p className="text-3xl font-bold text-orange-400">14,99€</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Anzahl der Änderungen</label>
              <input
                type="number"
                min="1"
                max="50"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="bg-black/40 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Anzahl:</span>
                <span className="font-semibold">{purchaseAmount}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Preis pro Änderung:</span>
                <span className="font-semibold">14,99€</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Gesamtpreis:</span>
                  <span className="text-2xl font-bold text-orange-400">
                    {(purchaseAmount * 14.99).toFixed(2)}€
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedSubscription(null)}
                className="flex-1 px-4 py-3 border border-white/30 rounded hover:bg-white/10 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handlePurchaseChanges(selectedSubscription)}
                disabled={isPurchasing}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all disabled:opacity-50"
              >
                {isPurchasing ? 'Wird verarbeitet...' : 'Jetzt kaufen'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
        <h3 className="text-xl font-semibold mb-4">Änderungs-Historie</h3>

        {changeLogs.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Noch keine Änderungen verwendet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {changeLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 p-3 bg-black/40 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{getChangeTypeLabel(log.change_type)}</span>
                    <span className="text-xs text-gray-400">{formatDate(log.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-400">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          <span>Informationen zu Änderungen</span>
        </h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Monatlich kündbar: 0 inkludierte Änderungen pro Monat</li>
          <li>• 12 Monate Laufzeit: 4 inkludierte Änderungen pro Monat</li>
          <li>• 24 Monate Laufzeit: 6 inkludierte Änderungen pro Monat</li>
          <li>• Zusätzliche Änderungen: 14,99€ pro Änderung</li>
          <li>• Gekaufte Änderungen verfallen nicht und können jederzeit verwendet werden</li>
        </ul>
      </div>
    </div>
  );
}
