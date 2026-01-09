import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AlertCircle } from 'lucide-react';

import AutoaufbereitungLanding from '../../demos/autoaufbereitung/Landing';
import BauunternehmenLanding from '../../demos/bauunternehmen/Landing';
import BeautyLanding from '../../demos/beauty/Landing';
import ElektrikerLanding from '../../demos/elektriker/Landing';
import GartenlandschaftsbauLanding from '../../demos/gartenlandschaftsbau/Landing';
import GebaeudereinigungLanding from '../../demos/gebaeudereinigung/Landing';
import HandwerkLanding from '../../demos/handwerk/Landing';
import MetallbauLanding from '../../demos/metallbau/Landing';
import MetzgereiLanding from '../../demos/metzgerei/Landing';
import PersonalbrandLanding from '../../demos/personalbrand/Landing';
import PhysiotherapieLanding from '../../demos/physiotherapie/Landing';
import SecurityLanding from '../../demos/security/Landing';

interface GeneratedWebsite {
  id: string;
  slug: string;
  template_name: string;
  injected_content: any;
  status: string;
  customer_email: string;
}

const templateComponents: Record<string, React.ComponentType<any>> = {
  autoaufbereitung: AutoaufbereitungLanding,
  bauunternehmen: BauunternehmenLanding,
  beauty: BeautyLanding,
  elektriker: ElektrikerLanding,
  gartenlandschaftsbau: GartenlandschaftsbauLanding,
  gebaeudereinigung: GebaeudereinigungLanding,
  handwerk: HandwerkLanding,
  metallbau: MetallbauLanding,
  metzgerei: MetzgereiLanding,
  personalbrand: PersonalbrandLanding,
  physiotherapie: PhysiotherapieLanding,
  security: SecurityLanding,
};

export default function GeneratedWebsitePage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [website, setWebsite] = useState<GeneratedWebsite | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWebsite();
  }, [slug, token]);

  const loadWebsite = async () => {
    try {
      if (!slug) {
        setError('Keine Website-ID angegeben');
        setIsLoading(false);
        return;
      }

      const { data: websiteData, error: websiteError } = await supabase
        .from('generated_websites')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (websiteError) throw websiteError;

      if (!websiteData) {
        setError('Website nicht gefunden');
        setIsLoading(false);
        return;
      }

      if (websiteData.status !== 'published') {
        if (token) {
          const { data: tokenData, error: tokenError } = await supabase
            .from('website_access_tokens')
            .select('*')
            .eq('token', token)
            .eq('website_id', websiteData.id)
            .maybeSingle();

          if (tokenError || !tokenData || new Date(tokenData.expires_at) < new Date()) {
            setError('Ungültiger oder abgelaufener Zugangslink');
            setIsLoading(false);
            return;
          }

          await supabase.rpc('increment_token_usage', { p_token: token });
        } else {
          setError('Diese Website ist noch nicht veröffentlicht');
          setIsLoading(false);
          return;
        }
      }

      setWebsite(websiteData);
    } catch (err) {
      console.error('Error loading website:', err);
      setError('Fehler beim Laden der Website');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Website wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Fehler</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all"
          >
            Zur Startseite
          </a>
        </div>
      </div>
    );
  }

  const TemplateComponent = templateComponents[website.template_name];

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Template nicht gefunden</h1>
          <p className="text-gray-300">Das Template "{website.template_name}" existiert nicht.</p>
        </div>
      </div>
    );
  }

  return <TemplateComponent customContent={website.injected_content} />;
}
