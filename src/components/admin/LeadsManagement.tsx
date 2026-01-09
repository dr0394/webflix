import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Mail, Users, TrendingUp, Download, Trash2, Plus, Send, Eye, BarChart3, Filter, Search, CheckCircle, XCircle, Clock, AlertCircle, Check } from 'lucide-react';

interface Lead {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  industry: string | null;
  phone: string | null;
  city: string | null;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: string | null;
  tags: string[] | null;
  created_at: string;
}

const LeadsManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState('galabau-intro');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/import-leads`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Laden der Leads');
      }

      setLeads(result.leads || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(line => line.trim());

      if (lines.length < 2) {
        throw new Error('CSV-Datei ist leer oder hat keine Daten');
      }

      const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
      console.log('CSV Headers:', headers);

      const leadsToInsert = [];

      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const lead: any = {};

        headers.forEach((header, index) => {
          const value = values[index]?.trim().replace(/^"|"$/g, '');

          if (!value) return;

          if (header === 'email' || header === 'e-mail' || header === 'e_mail') {
            lead.email = value;
          } else if (header === 'first_name' || header === 'vorname' || header === 'firstname') {
            lead.first_name = value;
          } else if (header === 'last_name' || header === 'nachname' || header === 'lastname') {
            lead.last_name = value;
          } else if (header === 'company' || header === 'firma' || header === 'unternehmen') {
            lead.company = value;
          } else if (header === 'industry' || header === 'branche') {
            lead.industry = value;
          } else if (header === 'phone' || header === 'telefon' || header === 'tel') {
            lead.phone = value;
          } else if (header === 'city' || header === 'stadt' || header === 'ort') {
            lead.city = value;
          }
        });

        if (lead.email && lead.email.includes('@')) {
          lead.source = 'csv_import';
          lead.status = 'active';
          leadsToInsert.push(lead);
        } else {
          console.warn('Zeile übersprungen (keine gültige Email):', values);
        }
      }

      if (leadsToInsert.length === 0) {
        throw new Error('Keine gültigen Email-Adressen in der CSV gefunden');
      }

      console.log('Leads zum Importieren:', leadsToInsert);

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/import-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ leads: leadsToInsert }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Importieren');
      }

      alert(`${result.count} Leads erfolgreich importiert!`);
      loadLeads();
    } catch (error: any) {
      console.error('Error uploading CSV:', error);
      alert(`Fehler beim Importieren der CSV-Datei: ${error.message}`);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const toggleAllLeads = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const sendEmails = async () => {
    if (selectedLeads.length === 0) {
      alert('Bitte wähle mindestens einen Kontakt aus');
      return;
    }

    if (!confirm(`Möchtest du ${selectedLeads.length} Email(s) versenden?`)) return;

    setSendingEmail(true);

    try {
      const selectedLeadData = leads.filter(lead => selectedLeads.includes(lead.id));

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-bulk-emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          leads: selectedLeadData,
          templateName: emailTemplate
        })
      });

      if (!response.ok) throw new Error('Failed to send emails');

      const result = await response.json();
      alert(`${result.sent} Email(s) erfolgreich versendet!`);
      setShowEmailModal(false);
      setSelectedLeads([]);
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Fehler beim Versenden der Emails');
    } finally {
      setSendingEmail(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = filterIndustry === 'all' || lead.industry === filterIndustry;

    return matchesSearch && matchesIndustry;
  });

  const stats = {
    totalLeads: leads.length,
    activeLeads: leads.filter(l => l.status === 'active').length,
    selectedLeads: selectedLeads.length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads Management</h1>
          <p className="text-gray-600">Verwalte deine Kontakte und versende Emails</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Gesamt Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aktive Leads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeLeads}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ausgewählt</p>
                <p className="text-2xl font-bold text-gray-900">{stats.selectedLeads}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Leads ({leads.length})</h2>
              </div>
              {selectedLeads.length > 0 && (
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Email senden ({selectedLeads.length})
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* Leads Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suche nach Email, Name oder Firma..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Alle Branchen</option>
                <option value="galabau">Garten- & Landschaftsbau</option>
                <option value="maler">Maler & Lackierer</option>
                <option value="elektriker">Elektriker</option>
                <option value="dachdecker">Dachdecker</option>
                <option value="autoaufbereitung">Autoaufbereitung</option>
              </select>
              <label className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer transition-colors">
                <Upload className="w-5 h-5" />
                <span>{uploading ? 'Wird hochgeladen...' : 'CSV hochladen'}</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-12">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                        onChange={toggleAllLeads}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Firma</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Branche</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Erstellt</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead.id)}
                          onChange={() => toggleLeadSelection(lead.id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3 px-4 text-sm">{lead.email}</td>
                      <td className="py-3 px-4 text-sm">
                        {lead.first_name || lead.last_name
                          ? `${lead.first_name || ''} ${lead.last_name || ''}`.trim()
                          : '-'}
                      </td>
                      <td className="py-3 px-4 text-sm">{lead.company || '-'}</td>
                      <td className="py-3 px-4 text-sm">{lead.industry || '-'}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            lead.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : lead.status === 'unsubscribed'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {lead.status === 'active' && <CheckCircle className="w-3 h-3" />}
                          {lead.status === 'unsubscribed' && <XCircle className="w-3 h-3" />}
                          {lead.status === 'bounced' && <AlertCircle className="w-3 h-3" />}
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(lead.created_at).toLocaleDateString('de-DE')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Keine Leads gefunden
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Send Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Email versenden</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                <strong>{selectedLeads.length}</strong> Kontakte ausgewählt
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email-Template
                </label>
                <select
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="galabau-intro">Garten- & Landschaftsbau - Webflix One Intro</option>
                  <option value="maler-intro">Maler & Lackierer - Webflix One Intro</option>
                  <option value="handwerk-allgemein">Handwerk Allgemein - Webflix One Intro</option>
                </select>
              </div>

              {emailTemplate === 'galabau-intro' && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">Betreff:</p>
                  <p className="text-gray-700">Webflix One - Die Website, die Kunden anzieht</p>

                  <p className="font-semibold text-gray-900 mt-4">Vorschau:</p>
                  <p className="text-gray-700">
                    Moderne Website für Garten- & Landschaftsbau. Individuelles Design. SEO-optimiert.
                    Ab 89€/Monat. Keine Einrichtungsgebühr.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                disabled={sendingEmail}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                Abbrechen
              </button>
              <button
                onClick={sendEmails}
                disabled={sendingEmail}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {sendingEmail ? 'Wird gesendet...' : `Email(s) versenden (${selectedLeads.length})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManagement;
