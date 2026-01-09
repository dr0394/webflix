import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface ChecklistOverviewProps {
  customerId: string;
}

interface Order {
  id: string;
  order_number: string;
  template_name: string;
  checklist_completed: boolean;
  created_at: string;
}

export default function ChecklistOverview({ customerId }: ChecklistOverviewProps) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [customerId]);

  const loadOrders = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      const userEmail = user.user?.email;

      if (!userEmail) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('webflix_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const filteredOrders = (data || [])
        .filter((order: any) => order.customer_data?.email === userEmail)
        .map((order: any) => ({
          id: order.id,
          order_number: order.order_number,
          template_name: order.template_data?.name || '',
          checklist_completed: order.checklist_completed || false,
          created_at: order.created_at
        }));

      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pendingOrders = orders.filter(o => !o.checklist_completed);
  const completedOrders = orders.filter(o => o.checklist_completed);

  if (isLoading) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-1/3" />
          <div className="h-3 bg-gray-700 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {pendingOrders.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500/20 to-pink-400/20 border border-orange-500/30 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-400">Checkliste ausstehend</h3>
                <p className="text-sm text-gray-300">
                  {pendingOrders.length} Bestellung{pendingOrders.length > 1 ? 'en' : ''} warten auf Ihre Angaben
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                className="bg-black/40 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{order.order_number}</p>
                  <p className="text-sm text-gray-400">{order.template_name}</p>
                </div>
                <button
                  onClick={() => navigate(`/customer/checklist?order=${order.id}`)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Checkliste ausfüllen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded p-4">
            <p className="text-sm text-gray-300">
              <strong>Wichtig:</strong> Bitte füllen Sie die Checkliste aus, damit wir mit der Erstellung Ihrer Website beginnen können. Die Bearbeitung dauert nur 10-15 Minuten.
            </p>
          </div>
        </div>
      )}

      {completedOrders.length > 0 && (
        <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="text-lg font-semibold">Abgeschlossene Checklisten</h3>
              <p className="text-sm text-gray-400">
                {completedOrders.length} Checkliste{completedOrders.length > 1 ? 'n' : ''} ausgefüllt
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {completedOrders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-black/40 rounded"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">{order.order_number}</span>
                </div>
                <span className="text-xs text-gray-500">{order.template_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
