import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, AlertTriangle, CheckCircle, XCircle, ExternalLink, Package } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Subscription {
  id: string;
  plan_name: string;
  monthly_price: number;
  status: string;
  contract_duration: number;
  start_date: string;
  end_date: string | null;
  cancellation_date: string | null;
  cancellation_reason: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  template_data: any;
  pricing: any;
  duration: number;
  paid_at: string | null;
  created_at: string;
}

interface SubscriptionsTabProps {
  customerId: string;
}

export default function SubscriptionsTab({ customerId }: SubscriptionsTabProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    loadData();
  }, [customerId]);

  const loadData = async () => {
    try {
      const [subsResult, ordersResult] = await Promise.all([
        supabase
          .from('customer_subscriptions')
          .select('*')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false }),
        supabase
          .from('webflix_orders')
          .select('*')
          .eq('customer_data->>email', (await supabase.from('customers').select('email').eq('id', customerId).single()).data?.email)
          .order('created_at', { ascending: false })
      ]);

      if (subsResult.error) throw subsResult.error;
      if (ordersResult.error) throw ordersResult.error;

      setSubscriptions(subsResult.data || []);
      setOrders(ordersResult.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    setCancellingId(subscriptionId);
    setShowCancelModal(true);
  };

  const handleManageSubscription = async (stripeCustomerId: string | null) => {
    if (!stripeCustomerId) {
      alert('Keine Stripe-Kundennummer gefunden. Bitte kontaktieren Sie den Support.');
      return;
    }

    setRedirecting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Nicht angemeldet');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-stripe-portal-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: stripeCustomerId,
          returnUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen der Stripe-Portal-Sitzung');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error redirecting to Stripe:', error);
      alert('Fehler beim Öffnen des Abrechnungsportals. Bitte kontaktieren Sie den Support.');
      setRedirecting(false);
    }
  };

  const confirmCancellation = async () => {
    if (!cancellingId) return;

    try {
      const { error } = await supabase
        .from('customer_subscriptions')
        .update({
          status: 'cancelled',
          cancellation_date: new Date().toISOString(),
          cancellation_reason: cancelReason
        })
        .eq('id', cancellingId);

      if (error) throw error;

      await loadData();
      setShowCancelModal(false);
      setCancelReason('');
      setCancellingId(null);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Fehler beim Kündigen des Abonnements. Bitte kontaktieren Sie den Support.');
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Aktiv',
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30'
        };
      case 'cancelled':
        return {
          label: 'Gekündigt',
          icon: XCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30'
        };
      case 'past_due':
        return {
          label: 'Zahlung überfällig',
          icon: AlertTriangle,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30'
        };
      default:
        return {
          label: status,
          icon: AlertTriangle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30'
        };
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Unbegrenzt';
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Lade Abonnements...</p>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
        <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Keine Abonnements</h3>
        <p className="text-gray-400">Sie haben aktuell keine aktiven Abonnements.</p>
      </div>
    );
  }

  const getOrderStatusInfo = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return { label: 'Bezahlt', color: 'text-green-400', bg: 'bg-green-500/10' };
      case 'processing':
        return { label: 'In Bearbeitung', color: 'text-blue-400', bg: 'bg-blue-500/10' };
      case 'pending_payment':
        return { label: 'Ausstehend', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
      case 'cancelled':
        return { label: 'Storniert', color: 'text-red-400', bg: 'bg-red-500/10' };
      default:
        return { label: status, color: 'text-gray-400', bg: 'bg-gray-500/10' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Abonnements & Bestellungen</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg border border-orange-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Aktive Abonnements</p>
              <p className="text-3xl font-bold">{subscriptions.filter(s => s.status === 'active').length}</p>
            </div>
            <CreditCard className="w-12 h-12 text-orange-400 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Bestellungen</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </div>
            <Package className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </div>
      </div>

      {subscriptions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Meine Abonnements</h3>
          <div className="space-y-4">
            {subscriptions.map((subscription) => {
              const statusInfo = getStatusInfo(subscription.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={subscription.id}
                  className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold">{subscription.plan_name}</h3>
                        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor}`}>
                          <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-orange-400 mb-2">
                        {formatPrice(subscription.monthly_price)}
                        <span className="text-sm text-gray-400 font-normal">/Monat</span>
                      </p>
                      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1">
                        <span className="text-sm text-blue-400 font-medium">
                          {subscription.contract_duration === 0
                            ? 'Monatlich kündbar'
                            : `${subscription.contract_duration} Monate Laufzeit`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Startdatum:</span>
                      <span className="font-medium">{formatDate(subscription.start_date)}</span>
                    </div>
                    {subscription.end_date && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Enddatum:</span>
                        <span className="font-medium">{formatDate(subscription.end_date)}</span>
                      </div>
                    )}
                  </div>

                  {subscription.cancellation_date && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-4">
                      <p className="text-red-400 text-sm">
                        <strong>Gekündigt am {formatDate(subscription.cancellation_date)}</strong>
                        {subscription.end_date && ` - Endet am ${formatDate(subscription.end_date)}`}
                      </p>
                      {subscription.cancellation_reason && (
                        <p className="text-gray-400 text-sm mt-2">Grund: {subscription.cancellation_reason}</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    {subscription.stripe_customer_id && (
                      <button
                        onClick={() => handleManageSubscription(subscription.stripe_customer_id)}
                        disabled={redirecting}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg hover:from-orange-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-pink-500/50"
                      >
                        <ExternalLink className="w-5 h-5" />
                        {redirecting ? 'Weiterleitung...' : 'Abonnement verwalten'}
                      </button>
                    )}
                    {subscription.status === 'active' && !subscription.cancellation_date && (
                      <button
                        onClick={() => handleCancelSubscription(subscription.id)}
                        className="px-6 py-3 border-2 border-red-500/50 text-red-400 font-semibold rounded-lg hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
                      >
                        Kündigen
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Meine Bestellungen</h3>
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = getOrderStatusInfo(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{order.template_data?.name || 'Website'}</h3>
                      <p className="text-sm text-gray-400">Bestellnummer: {order.order_number}</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full ${statusInfo.bg}`}>
                      <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Bestellt am:</span>
                      <p className="font-medium">{formatDate(order.created_at)}</p>
                    </div>
                    {order.paid_at && (
                      <div>
                        <span className="text-gray-400">Bezahlt am:</span>
                        <p className="font-medium">{formatDate(order.paid_at)}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Gesamtpreis:</span>
                      <p className="font-medium text-orange-400">{formatPrice(order.pricing?.total || 0)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {subscriptions.length === 0 && orders.length === 0 && (
        <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Keine Abonnements oder Bestellungen</h3>
          <p className="text-gray-400">Sie haben noch keine Abonnements oder Bestellungen.</p>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Abonnement kündigen</h3>
            <p className="text-gray-400 mb-4">
              Sind Sie sicher, dass Sie dieses Abonnement kündigen möchten? Sie können bis zum Ende des Vertragszeitraums weiterhin auf Ihre Website zugreifen.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Kündigungsgrund (optional)</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Warum möchten Sie kündigen?"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                  setCancellingId(null);
                }}
                className="flex-1 px-4 py-2 border border-white/30 rounded hover:bg-white/10 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={confirmCancellation}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition-colors"
              >
                Kündigung bestätigen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
