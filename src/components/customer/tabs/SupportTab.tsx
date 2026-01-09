import React, { useState, useEffect } from 'react';
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface SupportTicket {
  id: string;
  ticket_number: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface SupportTabProps {
  customerId: string;
}

export default function SupportTab({ customerId }: SupportTabProps) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'support',
    priority: 'medium',
    description: ''
  });

  useEffect(() => {
    loadTickets();
  }, [customerId]);

  const loadTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_support_tickets')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const ticketNumber = `TKT-${Date.now()}`;

      const { error } = await supabase
        .from('customer_support_tickets')
        .insert([{
          customer_id: customerId,
          ticket_number: ticketNumber,
          ...newTicket
        }]);

      if (error) throw error;

      const { data: customerData } = await supabase
        .from('customers')
        .select('first_name, last_name, email')
        .eq('id', customerId)
        .single();

      if (customerData) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-support-ticket`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ticketNumber,
              customerName: `${customerData.first_name} ${customerData.last_name}`,
              customerEmail: customerData.email,
              subject: newTicket.subject,
              category: newTicket.category,
              priority: newTicket.priority,
              description: newTicket.description,
            }),
          });
        }
      }

      setNewTicket({
        subject: '',
        category: 'support',
        priority: 'medium',
        description: ''
      });
      setShowNewTicketForm(false);
      await loadTickets();

      alert('Ticket erfolgreich erstellt! Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Fehler beim Erstellen des Tickets');
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'open':
        return { label: 'Offen', icon: Clock, color: 'text-blue-400' };
      case 'in_progress':
        return { label: 'In Bearbeitung', icon: AlertCircle, color: 'text-yellow-400' };
      case 'waiting_customer':
        return { label: 'Wartet auf Antwort', icon: MessageSquare, color: 'text-orange-400' };
      case 'resolved':
        return { label: 'Gelöst', icon: CheckCircle, color: 'text-green-400' };
      case 'closed':
        return { label: 'Geschlossen', icon: CheckCircle, color: 'text-gray-400' };
      default:
        return { label: status, icon: Clock, color: 'text-gray-400' };
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      support: 'Support',
      change_request: 'Änderungswunsch',
      billing: 'Abrechnung',
      technical: 'Technisch',
      other: 'Sonstiges'
    };
    return categories[category] || category;
  };

  const getPriorityLabel = (priority: string) => {
    const priorities: Record<string, string> = {
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      urgent: 'Dringend'
    };
    return priorities[priority] || priority;
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
        <p className="text-gray-400">Lade Support-Tickets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Support-Tickets</h2>
        <button
          onClick={() => setShowNewTicketForm(!showNewTicketForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Neues Ticket</span>
        </button>
      </div>

      {showNewTicketForm && (
        <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
          <h3 className="text-xl font-semibold mb-4">Neues Support-Ticket erstellen</h3>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Betreff</label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                required
                className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Kurze Beschreibung des Problems"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kategorie</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="support">Support</option>
                  <option value="change_request">Änderungswunsch</option>
                  <option value="billing">Abrechnung</option>
                  <option value="technical">Technisch</option>
                  <option value="other">Sonstiges</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priorität</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="low">Niedrig</option>
                  <option value="medium">Mittel</option>
                  <option value="high">Hoch</option>
                  <option value="urgent">Dringend</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Beschreibung</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Bitte beschreiben Sie Ihr Anliegen so detailliert wie möglich..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowNewTicketForm(false)}
                className="px-6 py-3 border border-white/30 rounded hover:bg-white/10 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all duration-200"
              >
                Ticket erstellen
              </button>
            </div>
          </form>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Keine Support-Tickets</h3>
          <p className="text-gray-400">Sie haben noch keine Support-Tickets erstellt.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const statusInfo = getStatusInfo(ticket.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={ticket.id}
                className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6 hover:border-white/20 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                      <span className="text-sm text-gray-400">#{ticket.ticket_number}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{getCategoryLabel(ticket.category)}</span>
                      <span>·</span>
                      <span>Priorität: {getPriorityLabel(ticket.priority)}</span>
                      <span>·</span>
                      <span>{formatDate(ticket.created_at)}</span>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 ${statusInfo.color}`}>
                    <StatusIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{statusInfo.label}</span>
                  </div>
                </div>

                <p className="text-gray-300 line-clamp-2">{ticket.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
