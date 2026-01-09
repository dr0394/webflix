import React, { useState, useEffect } from 'react';
import { Globe, Clock, CheckCircle, AlertCircle, ExternalLink, Calendar } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Website {
  id: string;
  website_url: string | null;
  status: string;
  template_name: string;
  go_live_date: string | null;
  content_received_at: string | null;
  notes: string | null;
  created_at: string;
}

interface WebsitesTabProps {
  customerId: string;
}

export default function WebsitesTab({ customerId }: WebsitesTabProps) {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWebsites();
  }, [customerId]);

  const loadWebsites = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_websites')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebsites(data || []);
    } catch (error) {
      console.error('Error loading websites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'in_development':
        return {
          label: 'In Entwicklung',
          icon: Clock,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30'
        };
      case 'waiting_content':
        return {
          label: 'Wartet auf Inhalte',
          icon: AlertCircle,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30'
        };
      case 'live':
        return {
          label: 'Live',
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30'
        };
      case 'maintenance':
        return {
          label: 'Wartung',
          icon: AlertCircle,
          color: 'text-orange-400',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/30'
        };
      default:
        return {
          label: status,
          icon: Clock,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30'
        };
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Noch nicht festgelegt';
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Lade Websites...</p>
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-8 text-center">
        <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Noch keine Websites</h3>
        <p className="text-gray-400 mb-6">Sie haben noch keine Websites in Ihrem Account.</p>
        <a
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all duration-200"
        >
          <span>Jetzt Website bestellen</span>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Meine Websites</h2>
        <span className="text-sm text-gray-400">{websites.length} {websites.length === 1 ? 'Website' : 'Websites'}</span>
      </div>

      <div className="space-y-4">
        {websites.map((website) => {
          const statusInfo = getStatusInfo(website.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div
              key={website.id}
              className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{website.template_name}</h3>
                  {website.website_url && (
                    <a
                      href={website.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <span>{website.website_url}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor}`}>
                  <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                  <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Bestellt am:</span>
                  <span>{formatDate(website.created_at)}</span>
                </div>
                {website.go_live_date && (
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400">Live seit:</span>
                    <span>{formatDate(website.go_live_date)}</span>
                  </div>
                )}
              </div>

              {website.notes && (
                <div className="bg-black/40 rounded p-3 text-sm">
                  <p className="text-gray-300">{website.notes}</p>
                </div>
              )}

              {website.status === 'waiting_content' && (
                <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <p className="text-yellow-400 text-sm">
                    Wir warten auf Ihre Inhalte. Bitte senden Sie die benötigten Materialien gemäß der Checkliste.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
