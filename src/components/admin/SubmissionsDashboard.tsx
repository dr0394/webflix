import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Eye, Download, Filter, Search, Calendar, Mail, Phone, Building, FileText, ExternalLink, Copy, Check, Clock, User, AlertCircle, CheckCircle2, RefreshCw, ArrowLeft } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Submission {
  id: string;
  customer_name: string;
  customer_email: string;
  demo_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface SectionContent {
  id: string;
  config_id: string;
  section_type: string;
  section_data: Record<string, any>;
  order_index: number;
  created_at: string;
}

const SubmissionsDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [sectionContents, setSectionContents] = useState<SectionContent[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Default values for comparison
  const defaultValues: Record<string, string> = {
    header_logo: 'Dein Logo',
    header_nav_1: 'Home',
    header_nav_2: 'Konfigurator',
    header_nav_3: 'Kontakt',
    header_cta: 'Website kaufen',
    hero_h1: 'Fahrzeugaufbereitung auf höchstem Niveau',
    hero_h2: 'Bringen Sie mit unserer professionellen Autoreinigung & Fahrzeugaufbereitung ihr Fahrzeug wieder zum glänzen.',
    hero_cta: 'Jetzt Termin buchen',
    badge_1: 'Sehr gute Preis Leistung',
    badge_2: 'Flexible Termine',
    badge_3: '5/5 Sterne',
    services_title: 'Welche Autoreinigung brauchst du?',
    service_1_title: 'Innenraumreinigung',
    service_2_title: 'Außenwäsche',
    contact_address: 'Musterstraße 123\n12345 Musterstadt',
    contact_phone: '0123 456 7890',
    contact_email: 'info@autopflege-profi.de',
    footer_company_name: 'AutoPflege Profi',
    footer_tagline: 'Professionelle Fahrzeugpflege',
    footer_phone: '+49 123 456 7890',
    footer_email: 'info@autopflege-profi.de',
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_configurations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissionDetails = async (submission: Submission) => {
    setSelectedSubmission(submission);
    try {
      const { data, error } = await supabase
        .from('section_contents')
        .select('*')
        .eq('config_id', submission.id)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setSectionContents(data || []);
    } catch (error) {
      console.error('Error loading submission details:', error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('website_configurations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      await loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportToJSON = () => {
    if (!selectedSubmission) return;

    const exportData = {
      customer: {
        name: selectedSubmission.customer_name,
        email: selectedSubmission.customer_email,
      },
      demo_type: selectedSubmission.demo_type,
      status: selectedSubmission.status,
      created_at: selectedSubmission.created_at,
      sections: sectionContents.reduce((acc, section) => {
        acc[section.section_type] = section.section_data;
        return acc;
      }, {} as Record<string, any>)
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submission-${selectedSubmission.id}.json`;
    a.click();
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getAllChanges = () => {
    const allData: Record<string, any> = {};
    sectionContents.forEach(section => {
      Object.assign(allData, section.section_data);
    });
    return allData;
  };

  const getChangedFields = () => {
    const allData = getAllChanges();
    const changes: Array<{ key: string; oldValue: string; newValue: string }> = [];

    Object.keys(allData).forEach(key => {
      const newValue = allData[key];
      const oldValue = defaultValues[key];
      if (oldValue && newValue !== oldValue) {
        changes.push({ key, oldValue, newValue });
      }
    });

    return changes;
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter;
    const matchesSearch =
      submission.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.demo_type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <RefreshCw className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted': return 'Eingereicht';
      case 'in_progress': return 'In Bearbeitung';
      case 'completed': return 'Fertig';
      case 'cancelled': return 'Abgebrochen';
      default: return status;
    }
  };

  if (selectedSubmission) {
    const allData = getAllChanges();
    const changes = getChangedFields();

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedSubmission(null)}
              className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zur Übersicht
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {selectedSubmission.customer_name}
                </h1>
                <p className="text-gray-400">{selectedSubmission.customer_email}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    showComparison
                      ? 'bg-[orange-500] text-black'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {showComparison ? 'Alle Felder' : 'Nur Änderungen'}
                </button>
                <button
                  onClick={exportToJSON}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  JSON Export
                </button>
                <a
                  href={`/website/${selectedSubmission.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website ansehen
                </a>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[orange-500]" />
                <h3 className="font-semibold text-white">Erstellt</h3>
              </div>
              <p className="text-gray-300">{new Date(selectedSubmission.created_at).toLocaleDateString('de-DE')}</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-[orange-500]" />
                <h3 className="font-semibold text-white">Demo-Typ</h3>
              </div>
              <p className="text-gray-300 capitalize">{selectedSubmission.demo_type}</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(selectedSubmission.status)}
                <h3 className="font-semibold text-white">Status</h3>
              </div>
              <select
                value={selectedSubmission.status}
                onChange={(e) => updateStatus(selectedSubmission.id, e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              >
                <option value="submitted">Eingereicht</option>
                <option value="in_progress">In Bearbeitung</option>
                <option value="completed">Fertig</option>
                <option value="cancelled">Abgebrochen</option>
              </select>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[orange-500]" />
                <h3 className="font-semibold text-white">Änderungen</h3>
              </div>
              <p className="text-2xl font-bold text-[orange-500]">{changes.length}</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {showComparison ? `Änderungen (${changes.length})` : 'Alle Felder'}
              </h2>
            </div>

            <div className="divide-y divide-gray-700">
              {showComparison ? (
                changes.length > 0 ? (
                  changes.map((change, index) => (
                    <div key={index} className="p-6 hover:bg-gray-750 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-white mb-1 capitalize">
                            {change.key.replace(/_/g, ' ')}
                          </h3>
                          <p className="text-sm text-gray-400">Feld ID: {change.key}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(change.newValue, change.key)}
                          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          {copiedField === change.key ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-2 font-semibold">VORHER (Standard)</p>
                          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                            <p className="text-gray-400 text-sm whitespace-pre-wrap">{change.oldValue}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-[orange-500] mb-2 font-semibold">NACHHER (Kunde)</p>
                          <div className="bg-[orange-500]/10 rounded-lg p-4 border-2 border-[orange-500]">
                            <p className="text-white text-sm whitespace-pre-wrap font-semibold">{change.newValue}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Keine Änderungen vorgenommen</p>
                  </div>
                )
              ) : (
                sectionContents.map((section) => (
                  <div key={section.id} className="p-6">
                    <h3 className="text-xl font-bold text-[orange-500] mb-4 capitalize">
                      {section.section_type}
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(section.section_data).map(([key, value]) => (
                        <div key={key} className="flex items-start justify-between p-3 bg-gray-900 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-1 capitalize">
                              {key.replace(/_/g, ' ')}
                            </p>
                            <p className="text-white whitespace-pre-wrap">{value as string}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(value as string, `${section.id}-${key}`)}
                            className="ml-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {copiedField === `${section.id}-${key}` ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Website Submissions</h1>
          <p className="text-gray-400">Alle Kunden-Eingaben und Änderungen im Überblick</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold text-white">Gesamt</h3>
            </div>
            <p className="text-3xl font-bold text-white">{submissions.length}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-yellow-400" />
              <h3 className="font-semibold text-white">Eingereicht</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {submissions.filter(s => s.status === 'submitted').length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold text-white">In Bearbeitung</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {submissions.filter(s => s.status === 'in_progress').length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <h3 className="font-semibold text-white">Fertig</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {submissions.filter(s => s.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Suche nach Name, E-Mail oder Demo-Typ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-[orange-500] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {['all', 'submitted', 'in_progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    filter === status
                      ? 'bg-[orange-500] text-black'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {status === 'all' ? 'Alle' : getStatusLabel(status)}
                </button>
              ))}
            </div>

            <button
              onClick={loadSubmissions}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Aktualisieren
            </button>
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-[orange-500] animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Lädt Submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Keine Submissions gefunden</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[orange-500] transition-all cursor-pointer"
                onClick={() => loadSubmissionDetails(submission)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-[orange-500]" />
                      <h3 className="text-xl font-bold text-white">{submission.customer_name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(submission.status)}`}>
                        {getStatusLabel(submission.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{submission.customer_email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm capitalize">{submission.demo_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(submission.created_at).toLocaleDateString('de-DE')}</span>
                      </div>
                    </div>
                  </div>

                  <button className="p-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsDashboard;
