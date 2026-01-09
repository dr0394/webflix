import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AutoaufbereitungDemo from '../../demos/autoaufbereitung/Landing';
import GartenlandschaftsbauDemo from '../../demos/gartenlandschaftsbau/Landing';
import MetallbauDemo from '../../demos/metallbau/Landing';
import SecurityDemo from '../../demos/security/Landing';

const GeneratedWebsite: React.FC = () => {
  const { websiteId } = useParams<{ websiteId: string }>();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoType, setDemoType] = useState('autoaufbereitung');

  useEffect(() => {
    const loadWebsite = async () => {
      if (!websiteId) {
        setError('Keine Website-ID angegeben');
        setLoading(false);
        return;
      }

      try {
        const { data: config, error: configError } = await supabase
          .from('website_configurations')
          .select('*')
          .eq('id', websiteId)
          .maybeSingle();

        if (configError || !config) {
          setError('Website nicht gefunden');
          setLoading(false);
          return;
        }

        setDemoType(config.demo_type);

        const { data: sections, error: sectionsError } = await supabase
          .from('section_contents')
          .select('*')
          .eq('config_id', websiteId)
          .order('order_index');

        if (sectionsError) {
          setError('Fehler beim Laden der Inhalte');
          setLoading(false);
          return;
        }

        const allData: Record<string, any> = {};
        sections?.forEach(section => {
          if (section.section_data) {
            Object.assign(allData, section.section_data);
          }
        });

        setFormData(allData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading website:', err);
        setError('Ein Fehler ist aufgetreten');
        setLoading(false);
      }
    };

    loadWebsite();
  }, [websiteId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[pink-400] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Website wird geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Website nicht gefunden</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const renderDemo = () => {
    switch (demoType) {
      case 'autoaufbereitung':
        return <AutoaufbereitungDemo customData={formData} />;
      case 'gartenlandschaftsbau':
        return <GartenlandschaftsbauDemo customData={formData} />;
      case 'metallbau':
        return <MetallbauDemo customData={formData} />;
      case 'security':
        return <SecurityDemo customData={formData} />;
      default:
        return <AutoaufbereitungDemo customData={formData} />;
    }
  };

  return renderDemo();
};

export default GeneratedWebsite;
