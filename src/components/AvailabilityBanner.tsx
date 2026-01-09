import { useEffect, useState } from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WeeklySalesStatus {
  week_start_date: string;
  max_weekly_sales: number;
  current_sales_count: number;
  available_spots: number;
  is_active: boolean;
  spots_available: boolean;
}

export default function AvailabilityBanner() {
  const [status, setStatus] = useState<WeeklySalesStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSalesStatus();

    const interval = setInterval(() => {
      loadSalesStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadSalesStatus() {
    try {
      const { data, error } = await supabase.rpc('get_current_week_sales_status');

      if (error) throw error;

      setStatus(data);
    } catch (error) {
      console.error('Error loading sales status:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !status) return null;

  const percentageLeft = (status.available_spots / status.max_weekly_sales) * 100;
  const isLowAvailability = percentageLeft <= 30;
  const isVeryLowAvailability = percentageLeft <= 10;

  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ${
        isVeryLowAvailability
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
          : isLowAvailability
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
            : 'bg-gradient-to-r from-slate-800 to-slate-900'
      }`}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
              {isVeryLowAvailability ? (
                <AlertCircle className="w-5 h-5 text-white" />
              ) : (
                <TrendingUp className="w-5 h-5 text-white" />
              )}
            </div>

            <div className="text-white">
              <div className="font-bold text-lg leading-tight">
                {status.spots_available ? (
                  <>
                    Noch <span className="text-2xl font-extrabold mx-1">{status.available_spots}</span>
                    {status.available_spots === 1 ? 'freier Platz' : 'freie Plätze'}
                  </>
                ) : (
                  'Ausverkauft für diese Woche'
                )}
              </div>
              <div className="text-white/90 text-sm">
                {status.spots_available ? (
                  isVeryLowAvailability ? 'Nur noch wenige Plätze verfügbar!' : 'Limitierte Plätze - Sichere dir jetzt deinen Platz'
                ) : (
                  'Trage dich in die Warteliste ein - Wir informieren dich, sobald wieder Plätze frei sind'
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isVeryLowAvailability && status.spots_available && (
              <div className="animate-pulse">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white text-emerald-600">
                  Nur noch {status.available_spots} {status.available_spots === 1 ? 'Platz' : 'Plätze'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
