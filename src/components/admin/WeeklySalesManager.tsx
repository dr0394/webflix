import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Users, Mail, RefreshCw, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendWaitlistAvailableEmail } from '../../lib/brevo';

interface WeeklyStatus {
  week_start_date: string;
  max_weekly_sales: number;
  current_sales_count: number;
  available_spots: number;
  is_active: boolean;
  spots_available: boolean;
}

interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  interested_template: string | null;
  notified: boolean;
  subscribed_at: string;
}

export default function WeeklySalesManager() {
  const [weeklyStatus, setWeeklyStatus] = useState<WeeklyStatus | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [newMaxSales, setNewMaxSales] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const { data: statusData, error: statusError } = await supabase.rpc('get_current_week_sales_status');

      if (statusError) throw statusError;

      setWeeklyStatus(statusData);
      setNewMaxSales(statusData.max_weekly_sales);
      setIsActive(statusData.is_active);

      const { data: waitlistData, error: waitlistError } = await supabase
        .from('sales_waitlist')
        .select('*')
        .eq('notified', false)
        .order('subscribed_at', { ascending: true });

      if (waitlistError) throw waitlistError;

      setWaitlist(waitlistData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage({ type: 'error', text: 'Fehler beim Laden der Daten' });
    } finally {
      setLoading(false);
    }
  }

  async function updateWeeklyConfig() {
    try {
      setSaving(true);
      setMessage(null);

      const currentMonday = new Date();
      currentMonday.setDate(currentMonday.getDate() - currentMonday.getDay() + 1);
      const mondayString = currentMonday.toISOString().split('T')[0];

      const { error } = await supabase
        .from('weekly_sales_config')
        .upsert({
          week_start_date: mondayString,
          max_weekly_sales: newMaxSales,
          is_active: isActive,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'week_start_date'
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Konfiguration erfolgreich gespeichert' });
      await loadData();
    } catch (error) {
      console.error('Error updating config:', error);
      setMessage({ type: 'error', text: 'Fehler beim Speichern' });
    } finally {
      setSaving(false);
    }
  }

  async function notifyWaitlist() {
    if (waitlist.length === 0) {
      setMessage({ type: 'error', text: 'Keine Personen auf der Warteliste' });
      return;
    }

    if (!confirm(`Möchten Sie ${waitlist.length} Person(en) von der Warteliste benachrichtigen?`)) {
      return;
    }

    try {
      setNotifying(true);
      setMessage(null);

      for (const entry of waitlist) {
        await sendWaitlistAvailableEmail(entry.email, entry.name);

        await supabase
          .from('sales_waitlist')
          .update({
            notified: true,
            notified_at: new Date().toISOString()
          })
          .eq('id', entry.id);
      }

      setMessage({ type: 'success', text: `${waitlist.length} Benachrichtigungen erfolgreich versendet` });
      await loadData();
    } catch (error) {
      console.error('Error notifying waitlist:', error);
      setMessage({ type: 'error', text: 'Fehler beim Versenden der Benachrichtigungen' });
    } finally {
      setNotifying(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!weeklyStatus) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">Fehler beim Laden der Daten</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Wöchentliche Verkaufslimits</h2>
        <button
          onClick={loadData}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Aktualisieren
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Woche vom</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(weeklyStatus.week_start_date).toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verkäufe diese Woche</p>
              <p className="text-lg font-bold text-gray-900">
                {weeklyStatus.current_sales_count} / {weeklyStatus.max_weekly_sales}
              </p>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
            <div
              className="h-full bg-orange-500 rounded-full transition-all"
              style={{
                width: `${(weeklyStatus.current_sales_count / weeklyStatus.max_weekly_sales) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Freie Plätze</p>
              <p className="text-lg font-bold text-gray-900">{weeklyStatus.available_spots}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Konfiguration anpassen</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximale Verkäufe pro Woche
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={newMaxSales}
              onChange={(e) => setNewMaxSales(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={isActive ? 'active' : 'inactive'}
              onChange={(e) => setIsActive(e.target.value === 'active')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv (Limits deaktiviert)</option>
            </select>
          </div>
        </div>

        <button
          onClick={updateWeeklyConfig}
          disabled={saving}
          className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Speichert...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Speichern
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Warteliste</h3>
            <p className="text-sm text-gray-600">{waitlist.length} Person(en) warten auf freie Plätze</p>
          </div>
          {waitlist.length > 0 && (
            <button
              onClick={notifyWaitlist}
              disabled={notifying}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              {notifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Benachrichtigt...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Alle benachrichtigen
                </>
              )}
            </button>
          )}
        </div>

        {waitlist.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Keine Personen auf der Warteliste</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-Mail</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {waitlist.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{entry.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{entry.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {entry.interested_template || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(entry.subscribed_at).toLocaleDateString('de-DE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
