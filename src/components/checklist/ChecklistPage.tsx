import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import StepBasedChecklistForm from './StepBasedChecklistForm';

export default function ChecklistPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const orderId = searchParams.get('order');

  useEffect(() => {
    if (orderId) {
      loadOrderData();
    } else {
      setIsLoading(false);
    }
  }, [orderId]);

  const loadOrderData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/customer/login');
        return;
      }

      const { data: orderData, error: orderError } = await supabase
        .from('webflix_orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      const customerData = {
        id: user.id,
        email: user.email
      };
      setCustomer(customerData);

      if (orderData.checklist_completed) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error loading order:', error);
      alert('Bestellung nicht gefunden');
      navigate('/customer/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Lade Checkliste...</p>
        </div>
      </div>
    );
  }

  if (!orderId || !order) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Keine Bestellung gefunden</h1>
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg"
          >
            Zum Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Checkliste erfolgreich übermittelt!</h1>
          <p className="text-gray-400 mb-6">
            Vielen Dank! Wir haben Ihre Checkliste erhalten und werden uns umgehend um die Erstellung Ihrer Website kümmern.
          </p>
          <div className="bg-gradient-to-r from-orange-500/20 to-pink-400/20 border border-orange-500/30 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Wie geht es weiter?</h3>
            <ul className="text-sm text-gray-300 space-y-2 text-left">
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Unser Team prüft Ihre Angaben innerhalb von 24 Stunden</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Bei Rückfragen melden wir uns per E-Mail bei Ihnen</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Die Erstellung Ihrer Website dauert 3-5 Werktage</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Sie erhalten eine Benachrichtigung sobald Ihre Website online ist</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zum Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Dashboard</span>
          </button>
          <h1 className="text-4xl font-bold mb-2">Website-Checkliste</h1>
          <p className="text-gray-400">
            Bestellung: {order.order_number} - {order.template_data?.name || 'Website'}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-2 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span>Wichtige Informationen</span>
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Füllen Sie alle Pflichtfelder aus</li>
            <li>• Sie können jederzeit einen Entwurf speichern und später fortfahren</li>
            <li>• Bei Bildupload: Max. 5 MB pro Datei, unterstützte Formate: JPG, PNG, WebP</li>
            <li>• Ihre Angaben werden verschlüsselt übertragen und gespeichert</li>
          </ul>
        </div>

        <StepBasedChecklistForm
          orderId={order.id}
          customerId={customer.id}
          demoName={order.template_data?.demo_name || order.template_data?.name || 'autoaufbereitung'}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
