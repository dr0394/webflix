import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Star, Eye, ShoppingCart, Filter, Search, Car, TreePine, User, Sparkles, Wrench, Building, Shield, Heart, Check, TrendingUp, Users, Clock, Award, ChevronRight, X, MessageCircle, Bot, Calendar, Mail, RefreshCw, Zap, Gift, Phone, Flame, ChevronUp, ChevronDown, BarChart3, Instagram } from 'lucide-react';
import Footer from '../Footer';
import Header from '../Header';
import AvailabilityBanner from '../AvailabilityBanner';
import WaitlistModal from '../WaitlistModal';
import { trackViewItem, trackViewItemList } from '../../lib/analytics';

interface Design {
  id: string;
  name: string;
  description: string;
  industry: string;
  industryName: string;
  demoUrl: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  price: number;
  features: string[];
  tags: string[];
  popular?: boolean;
  new?: boolean;
}


const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<Design | null>(null);
  const [expandedPackage, setExpandedPackage] = useState<string | null>('kundenmagnet');
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [webflixOneIndustries, setWebflixOneIndustries] = useState<any[]>([]);
  const [showWebflixOneIndustryModal, setShowWebflixOneIndustryModal] = useState(false);
  const [selectedWebflixIndustry, setSelectedWebflixIndustry] = useState<any>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [formData, setFormData] = useState({ industryName: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadWebflixOneIndustries();
  }, []);

  const loadWebflixOneIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from('webflix_one_industries')
        .select('*')
        .eq('is_active', true)
        .order('display_name');

      if (error) throw error;
      if (data) {
        setWebflixOneIndustries(data);
      }
    } catch (error) {
      console.error('Error loading Webflix One industries:', error);
    }
  };

  const industries = [
    { id: 'all', name: 'Alle Branchen', icon: Filter, count: 18 },
    { id: 'webflix-one-auto', name: 'Webflix One Autoindustrie', icon: Car, count: 5 },
    { id: 'webflix-one-handwerk', name: 'Webflix One Handwerk', icon: Wrench, count: 11 },
    { id: 'handwerk', name: 'Handwerk', icon: Wrench, count: 2 }
  ];

  const designs: Design[] = useMemo(() => [
    {
      id: 'autoaufbereitung',
      name: 'Autoaufbereitung',
      description: 'Premium Website für Autoaufbereitungs-Services mit Vorher/Nachher-Vergleichen',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/autoaufbereitung',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      rating: 5.0,
      reviews: 12,
      price: 29.90,
      features: ['Vorher/Nachher Slider', 'Service-Pakete', 'Fahrzeug-Auswahl', 'Online-Buchung'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: true,
      new: true
    },
    {
      id: 'lackiererei',
      name: 'Lackiererei',
      description: 'Professionelle Website für Lackierereien mit Portfolio-Galerie',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/lackiererei',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      rating: 5.0,
      reviews: 8,
      price: 29.90,
      features: ['Portfolio-Galerie', 'Farbkonfigurator', 'Referenzprojekte', 'Kontaktformular'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: true,
      new: true
    },
    {
      id: 'smart-repair',
      name: 'Smart Repair',
      description: 'Moderne Website für Smart Repair Services mit schneller Schadenserfassung',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/smart-repair',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      rating: 5.0,
      reviews: 6,
      price: 29.90,
      features: ['Schadenserfassung', 'Schnellanfrage', 'Service-Übersicht', 'Standort-Finder'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'autowerkstatt',
      name: 'KFZ Werkstatt',
      description: 'Vollständige Website-Lösung für KFZ-Werkstätten mit Terminbuchung',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/autowerkstatt',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      rating: 5.0,
      reviews: 10,
      price: 29.90,
      features: ['Online-Terminbuchung', 'Service-Pakete', 'Team-Vorstellung', 'Kundenrezensionen'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: true,
      new: true
    },
    {
      id: 'kfz-gutachter',
      name: 'KFZ Gutachter',
      description: 'Professionelle Website für KFZ-Gutachter mit Leistungsübersicht',
      industry: 'webflix-one-auto',
      industryName: 'Webflix One Autoindustrie',
      demoUrl: 'https://auto-demo-webflix.bolt.host/kfz-gutachter',
      thumbnail: 'https://i.imgur.com/MjiMjY7.jpeg',
      rating: 5.0,
      reviews: 5,
      price: 29.90,
      features: ['Leistungsübersicht', 'Gutachten-Arten', 'Kontaktaufnahme', 'Referenzen'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'dachdecker',
      name: 'Dachdecker',
      description: 'Professionelle Website für Dachdecker mit Portfolio und Referenzen',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/dachdecker',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 8,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'elektriker',
      name: 'Elektriker',
      description: 'Moderne Website für Elektrikerbetriebe mit Service-Übersicht',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/elektriker',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 10,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'fliesenleger',
      name: 'Fliesenleger',
      description: 'Premium Website für Fliesenleger mit Projektgalerie',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/fliesenleger',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 7,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'gartenbau',
      name: 'Garten & Landschaftsbau',
      description: 'Professionelle Website für Gartenbau mit Referenzprojekten',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/gartenbau',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 12,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'gebaeudereinigung',
      name: 'Gebäudereinigung',
      description: 'Moderne Website für Gebäudereinigung mit Service-Paketen',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/gebaeudereinigung',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 9,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'klempner',
      name: 'Klempner & Spengler',
      description: 'Professionelle Website für Klempner mit Leistungsübersicht',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/klempner',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 6,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'maler',
      name: 'Maler & Lackierer',
      description: 'Premium Website für Malerbetriebe mit Farbkonfigurator',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/maler',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 11,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'maurer',
      name: 'Maurer & Betonbauer',
      description: 'Professionelle Website für Maurerbetriebe mit Projektgalerie',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/maurer',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 8,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'metallbauer',
      name: 'Metallbauer',
      description: 'Moderne Website für Metallbauer mit Referenzprojekten',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/metallbauer',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 7,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'sanitaer',
      name: 'Sanitär & Heizung',
      description: 'Professionelle Website für Sanitärbetriebe mit Service-Paketen',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/sanitaer',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 10,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'schreiner',
      name: 'Schreiner & Tischler',
      description: 'Premium Website für Schreinereien mit Portfolio',
      industry: 'webflix-one-handwerk',
      industryName: 'Webflix One Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/schreiner',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 9,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    },
    {
      id: 'handwerk-profi-1',
      name: 'Handwerk Profi',
      description: 'Solides, zuverlässiges Design für Handwerksbetriebe',
      industry: 'handwerk',
      industryName: 'Handwerk',
      demoUrl: '/demo/handwerk',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 4.7,
      reviews: 89,
      price: 29.90,
      features: ['Leistungen', 'Referenzen', 'Über uns', 'Kontaktformular'],
      tags: ['Zuverlässig', 'Professionell', 'Handwerk']
    },
    {
      id: 'webflix-one-handwerker',
      name: 'Webflix One Handwerker',
      description: 'Cinematic Design mit Hollywood-Effekten und Premium-Animationen für Handwerksbetriebe',
      industry: 'handwerk',
      industryName: 'Handwerk',
      demoUrl: 'https://handwerker-demo-webflix.bolt.host/',
      thumbnail: 'https://i.imgur.com/W8bkBWj.png',
      rating: 5.0,
      reviews: 12,
      price: 29.90,
      features: ['Cinematic Effects', 'Services Showcase', 'Premium Animationen', 'Portfolio Galerie'],
      tags: ['Premium', 'Cinematic', 'Webflix One'],
      popular: false,
      new: true
    }
  ], [webflixOneIndustries]);

  const filteredDesigns = designs
    .filter(design => selectedIndustry === 'all' || design.industry === selectedIndustry)
    .filter(design =>
      searchQuery === '' ||
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.industryName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.new ? 1 : -1;
      return b.popular ? 1 : -1;
    });

  const selectedIndustryData = industries.find(i => i.id === selectedIndustry);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('industry_requests')
        .insert([
          {
            industry_name: formData.industryName,
            email: formData.email,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setSubmitSuccess(true);

      setTimeout(() => {
        if ((window as any).Calendly) {
          (window as any).Calendly.initPopupWidget({
            url: 'https://calendly.com/webflix'
          });

          // Track Calendly popup opened via GTM Data Layer
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              event: 'calendly_popup_opened',
              eventData: {
                industry: formData.industryName,
                email: formData.email,
                source: 'industry_request_form'
              }
            }, '*');
          } else {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
              event: 'calendly_popup_opened',
              industry: formData.industryName,
              email: formData.email,
              source: 'industry_request_form'
            });
          }
        }
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Fehler beim Senden der Anfrage. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const calendlyScript = document.createElement('script');
    calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);

    // Listen for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        const eventName = e.data.event;

        // Push to GTM Data Layer in top-level frame
        const pushToDataLayer = (eventData: any) => {
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              event: eventData.event,
              eventData: eventData
            }, '*');
          } else {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push(eventData);
          }
        };

        // Track different Calendly events
        if (eventName === 'calendly.event_scheduled') {
          pushToDataLayer({
            event: 'calendly_appointment_scheduled',
            calendly_event: e.data.payload,
            source: 'industry_request_flow'
          });
        } else if (eventName === 'calendly.profile_page_viewed') {
          pushToDataLayer({
            event: 'calendly_profile_viewed',
            calendly_event: e.data.payload,
            source: 'industry_request_flow'
          });
        } else if (eventName === 'calendly.date_and_time_selected') {
          pushToDataLayer({
            event: 'calendly_time_selected',
            calendly_event: e.data.payload,
            source: 'industry_request_flow'
          });
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
      if (document.body.contains(calendlyScript)) {
        document.body.removeChild(calendlyScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header showNavigation={true} showShowroomLink={true} />
      <AvailabilityBanner />

      <div className="hidden sticky top-0 z-50 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/')}>
                <img
                  src="https://i.imgur.com/2SbjgE7.png"
                  alt="Webflix"
                  className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => {
                  const element = document.getElementById('designs-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-black transition-colors text-sm font-light underline"
              >
                Zum Showroom
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('warum-webflix');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-black transition-colors text-sm font-light"
              >
                Warum Webflix
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('packages-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-black transition-colors text-sm font-light"
              >
                Add Ons
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('pricing');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-black transition-colors text-sm font-light"
              >
                Preise
              </button>
              
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">847 Kunden vertrauen uns</span>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">5.0 Google Bewertung</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="text-gray-600 hover:text-black transition-colors text-sm font-light underline"
              >
                Jetzt Support kontaktieren
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-black via-gray-900/50 to-black">
        {/* Webflix CI Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[800px] h-[800px] bg-orange-400/20 rounded-full blur-[150px]" style={{ top: '10%', left: '5%', animation: 'pulse 8s ease-in-out infinite' }}></div>
          <div className="absolute w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[120px]" style={{ top: '40%', right: '10%', animation: 'pulse 10s ease-in-out infinite', animationDelay: '2s' }}></div>
          <div className="absolute w-[700px] h-[700px] bg-green-300/15 rounded-full blur-[140px]" style={{ bottom: '15%', left: '20%', animation: 'pulse 12s ease-in-out infinite', animationDelay: '4s' }}></div>
          <div className="absolute w-[500px] h-[500px] bg-orange-300/15 rounded-full blur-[100px]" style={{ top: '60%', right: '30%', animation: 'pulse 9s ease-in-out infinite', animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.imgur.com/2SbjgE7.png"
              alt="Webflix Logo"
              className="h-16 md:h-20 w-auto"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'All Round Gothic', sans-serif" }}>
            <span className="bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 bg-clip-text text-transparent">
              WEBFLIX
            </span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">Entdecke innovative Websites</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Jedes Design wurde mit Liebe zum Detail entwickelt – für maximale Wirkung bei Ihren Kunden.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm mb-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-white/70">Für jede Branche</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-white/70">Alle Inhalte anpassbar</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-white/70">In 48h online</span>
            </div>
          </div>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-pink-400/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all cursor-pointer">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm">Klicke um Video abzuspielen</p>
                </div>
              </div>
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Demo Showroom Heading */}
          <div className="text-left mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 bg-clip-text text-transparent">
              DEMO SHOWROOM
            </h2>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3 sm:gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Suche nach Branche oder Design..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 transition-all"
                />
              </div>
              <button
                onClick={() => setShowRequestModal(true)}
                className="flex items-center gap-2 sm:gap-3 bg-white hover:bg-gray-50 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all group w-full sm:w-auto shadow-lg border border-gray-200"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-black font-bold text-xs sm:text-sm">Deine Branche nicht dabei?</p>
                  <p className="text-pink-400 text-xs font-semibold">Jetzt anfragen</p>
                </div>
              </button>
            </div>
          </div>

          </div>

          <div className="relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '10%', animationDuration: '4s' }}></div>
              <div className="absolute w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" style={{ top: '50%', right: '10%', animationDuration: '5s', animationDelay: '1s' }}></div>
              <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ bottom: '10%', left: '30%', animationDuration: '6s', animationDelay: '2s' }}></div>
            </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:sticky lg:top-24">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                Branchen
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  const isSelected = selectedIndustry === industry.id;
                  return (
                    <button
                      key={industry.id}
                      data-industry={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`w-full p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-gray-300 to-gray-200 text-black'
                          : 'bg-white/5 hover:bg-white/10 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="font-medium text-xs sm:text-sm truncate">{industry.name}</span>
                      </div>
                      <span className={`text-xs sm:text-sm flex-shrink-0 ${isSelected ? 'text-black/70' : 'text-white/50'}`}>
                        {industry.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                <h4 className="text-xs sm:text-sm font-semibold text-white/80 mb-2 sm:mb-3">Sortieren nach</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    { id: 'popular', label: 'Beliebteste' },
                    { id: 'rating', label: 'Beste Bewertung' },
                    { id: 'newest', label: 'Neueste' }
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setSortBy(id as any)}
                      className={`w-full p-2 rounded-lg transition-all text-left text-sm ${
                        sortBy === id
                          ? 'bg-white/10 text-white font-semibold'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="bg-gradient-to-r from-gray-300 to-gray-200 border border-gray-400 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-800" />
                    <span className="text-sm font-bold text-gray-800">Schnelllieferung</span>
                  </div>
                  <p className="text-xs text-gray-700">Alle Designs in 48 Stunden online</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div id="designs-section" className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedIndustry === 'all' ? 'Alle Demos' : selectedIndustryData?.name}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  {filteredDesigns.length} {filteredDesigns.length === 1 ? 'Design' : 'Designs'} gefunden
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className="group relative"
                >
                  <div className="relative">

                    <div className="relative group-hover:scale-[1.02] group-hover:-translate-y-2 transition-all duration-500">
                      {/* Floating particles effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -top-10 -right-10 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -bottom-10 -left-10 group-hover:scale-150 transition-transform duration-700"></div>
                      </div>

                        <div
                          className="relative aspect-[16/10] mb-4 sm:mb-6 cursor-pointer pt-6 sm:pt-8"
                          onClick={() => {
                            // Track view_item event when clicking "Demo ansehen"
                            trackViewItem({
                              item_id: design.id,
                              item_name: design.name,
                              price: design.price,
                              item_category: design.industry,
                              item_category2: design.industryName,
                              item_brand: 'Webflix',
                              item_list_id: 'zum_mitnehmen_showcase',
                              item_list_name: 'Zum Mitnehmen - Demo Showcase'
                            });

                            if (design.id === 'webflix-one') {
                              setShowWebflixOneIndustryModal(true);
                            } else {
                              setSelectedDemo(design);
                              setDemoModalOpen(true);
                            }
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full">
                              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 via-orange-400/5 to-pink-400/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                              <div className="relative group-hover:shadow-pink-500/10 group-hover:shadow-2xl transition-all duration-300">
                                  <div className="relative aspect-video overflow-hidden rounded-lg">
                                    <img
                                      src={design.thumbnail}
                                      alt={design.name}
                                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 rounded-lg shadow-2xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 sm:p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                      </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative text-center space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 group-hover:rotate-12 transition-transform" />
                            <span className="text-white font-bold text-xs sm:text-sm">{design.rating}</span>
                            <span className="text-white/50 text-xs sm:text-sm group-hover:text-white/70 transition-colors">({design.reviews})</span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-orange-300 group-hover:bg-clip-text transition-all duration-300">{design.name}</h3>
                          <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/70 transition-colors">{design.description}</p>

                          <div className="py-2 sm:py-3">
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <span className="text-white/50 line-through text-xs sm:text-sm group-hover:text-white/30 transition-colors">Ab 49,99€</span>
                              <span className="text-pink-400 font-semibold text-xs sm:text-sm">(Neu)</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 sm:gap-3">
                              <div className="flex items-baseline gap-1 sm:gap-2">
                                <span className="text-white font-bold text-lg sm:text-xl">Ab {design.price.toFixed(2)}€</span>
                                <span className="text-white/50 text-xs sm:text-sm">/Monat</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                              <button className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white transition-colors">FLEX</button>
                              <button className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white transition-colors">12</button>
                              <button className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs text-white transition-colors">24</button>
                              <span className="text-white/40 text-xs">Monate</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                // Track view_item event when clicking "Demo ansehen" button
                                trackViewItem({
                                  item_id: design.id,
                                  item_name: design.name,
                                  price: design.price,
                                  item_category: design.industry,
                                  item_category2: design.industryName,
                                  item_brand: 'Webflix',
                                  item_list_id: 'zum_mitnehmen_showcase',
                                  item_list_name: 'Zum Mitnehmen - Demo Showcase'
                                });

                                if (design.id === 'webflix-one') {
                                  setShowWebflixOneIndustryModal(true);
                                } else {
                                  setSelectedDemo(design);
                                  setDemoModalOpen(true);
                                }
                              }}
                              className="w-full py-3 bg-gradient-to-r from-gray-300 to-gray-200 hover:from-pink-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] duration-300 group/btn"
                            >
                              <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                              <span>Demo ansehen</span>
                              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex items-center justify-center gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button className="text-xs text-white/50 hover:text-pink-400 transition-colors flex items-center gap-1">
                                <span>Details</span>
                              </button>
                              <span className="text-white/20">•</span>
                              <button className="text-xs text-white/50 hover:text-pink-400 transition-colors flex items-center gap-1">
                                <span>Vergleichen</span>
                              </button>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDesigns.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-white/30" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Keine Designs gefunden</h3>
                <p className="text-white/60">Versuche einen anderen Suchbegriff oder Filter</p>
              </div>
            )}
          </div>
          </div>
          </div>

          {/* New Industry Launches Section */}
          <div className="mt-32 mb-32">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Wir launchen täglich neue Branchen.
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
                Deine Branche ist noch nicht dabei? Kein Problem. Fordere sie an und wir entwickeln dein Template mit Priorität.
                Personalisierte Website ab nur <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 bg-clip-text font-bold">29,90€</span>.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/70 text-lg">
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-pink-400" />
                  Schnelle Umsetzung
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-pink-400" />
                  Premium Qualität
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-pink-400" />
                  Sofort einsetzbar
                </span>
              </div>

              <button
                onClick={() => setShowRequestModal(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 text-white px-12 py-6 rounded-full font-bold text-xl hover:opacity-90 transition-all shadow-2xl hover:scale-105"
              >
                <Sparkles className="w-6 h-6" />
                Jetzt Branche anfragen
              </button>
            </div>
          </div>

          {/* Warum Webflix Section */}
          <div id="warum-webflix" className="mt-32 mb-32">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Warum du deine Website am besten bei Webflix kaufst.
            </h2>
          </div>

          <div className="w-full overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {/* Rechtssicherheit */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white rounded-3xl p-8 hover:bg-gray-50 transition-all group flex flex-col snap-center shadow-lg">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">WEBFLIX RECHTSSICHERHEIT</h3>
                  <p className="text-pink-400 font-semibold mb-3">100 % rechtssicher – ohne Anwalt.</p>
                  <p className="text-gray-700 leading-relaxed">
                    Deine Website ist automatisch DSGVO-konform, abmahnsicher und anwaltlich geprüft – komplett ohne Zusatzkosten.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://i.imgur.com/YKl1mtI.png"
                    alt="Rechtssicherheit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Konkurrenz-Schutz */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white rounded-3xl p-8 hover:bg-gray-50 transition-all group flex flex-col snap-center shadow-lg">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">WEBFLIX KONKURRENZ-SCHUTZ</h3>
                  <p className="text-pink-400 font-semibold mb-3">Immer einen Schritt voraus.</p>
                  <p className="text-gray-700 leading-relaxed">
                    Wir überwachen deine Konkurrenz und halten deine Website technisch, optisch und strategisch immer vorne.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Konkurrenz-Schutz"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Trade-In */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white rounded-3xl p-8 hover:bg-gray-50 transition-all group flex flex-col snap-center shadow-lg">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">WEBFLIX TRADE-IN</h3>
                  <p className="text-pink-400 font-semibold mb-3">Tausche dein Design – so oft du willst.</p>
                  <p className="text-gray-700 leading-relaxed">
                    Für nur 99 € erhältst du ein komplett neues Design deiner Wahl, alle Inhalte bleiben erhalten.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Trade-In"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Wechselbonus */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white rounded-3xl p-8 hover:bg-gray-50 transition-all group flex flex-col snap-center shadow-lg">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">WEBFLIX WECHSELBONUS</h3>
                  <p className="text-pink-400 font-semibold mb-3">Wechseln lohnt sich – spare bis zu 1.890 €.</p>
                  <p className="text-gray-700 leading-relaxed">
                    Wir übernehmen deine Inhalte, ziehen deine Domain um und schenken dir exklusive Vorteile beim Anbieterwechsel.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Wechselbonus"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* 48-Stunden-Garantie */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white rounded-3xl p-8 hover:bg-gray-50 transition-all group flex flex-col snap-center shadow-lg">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-black mb-2">WEBFLIX 48-STUNDEN-GARANTIE</h3>
                  <p className="text-pink-400 font-semibold mb-3">In 48 Stunden online – garantiert.</p>
                  <p className="text-gray-700 leading-relaxed">
                    Deine Website ist in zwei Tagen live. Schnell. Sicher. Startklar.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/4458411/pexels-photo-4458411.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="48-Stunden-Garantie"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Zufriedenheitsgarantie */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all group flex flex-col snap-center">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">WEBFLIX ZUFRIEDENHEITS-GARANTIE</h3>
                  <p className="text-pink-400 font-semibold mb-3">100 % zufrieden – oder Geld zurück.</p>
                  <p className="text-white/70 leading-relaxed">
                    Teste 7 Tage ohne Risiko. Nicht überzeugt? Du erhältst dein Geld sofort zurück.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Zufriedenheitsgarantie"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Branchen-Specials */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all group flex flex-col snap-center">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">WEBFLIX BRANCHEN-SPECIALS</h3>
                  <p className="text-pink-400 font-semibold mb-3">Individuelle Extras für deine Branche.</p>
                  <p className="text-white/70 leading-relaxed">
                    Von Online-Reservierungen bis E-Commerce – du bekommst Tools, die perfekt zu deinem Business passen.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Branchen-Specials"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Wechsel-Hotline */}
              <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[380px] bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all group flex flex-col snap-center">
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">WEBFLIX WECHSEL-HOTLINE</h3>
                  <p className="text-pink-400 font-semibold mb-3">Anrufen. Wechseln. Sparen.</p>
                  <p className="text-white/70 leading-relaxed">
                    Ein kurzer Anruf genügt – wir übernehmen deine alte Website, berechnen deine Boni und starten sofort mit dem Umzug.
                  </p>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Wechsel-Hotline"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <p className="text-white/40 text-sm">← Scrolle für mehr Vorteile →</p>
            </div>
          </div>
          </div>

          {/* Add-Ons Packages Section */}
          <div id="packages-section" className="mt-32">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Passt perfekt.</h2>
            <p className="text-white/60 text-lg">Wähle das passende Paket für deine Bedürfnisse</p>
          </div>

          <div className="max-w-7xl mx-auto bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left Sidebar - Package Selection & Details */}
              <div className="lg:col-span-2 border-r border-white/[0.08] flex flex-col">
                <div className="divide-y divide-white/[0.06]">
                  {/* Kundenmagnet */}
                  <div className={`transition-all duration-300 ${
                    expandedPackage === 'kundenmagnet' ? 'bg-white/[0.08]' : ''
                  }`}>
                    <button
                      onClick={() => setExpandedPackage('kundenmagnet')}
                      className="w-full p-8 text-left hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">Webflix und Kundenmagnet</h3>
                          <p className="text-white/50 text-sm">Mehr Anfragen & Leads</p>
                        </div>
                        {expandedPackage === 'kundenmagnet' ? (
                          <ChevronUp className="w-5 h-5 text-white/40" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                    </button>
                    {expandedPackage === 'kundenmagnet' && (
                      <div className="px-8 pb-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="text-white/40 text-sm line-through">13,97€/Monat</div>
                          <div className="text-2xl font-semibold text-white">9,99€<span className="text-sm font-normal text-white/50">/Monat</span></div>
                        </div>
                        <p className="text-white/60 leading-relaxed">
                          Du willst mehr Kundenanfragen? Das Kundenmagnet-Paket macht deine Website zur Anfragen-Maschine. WhatsApp-Anbindung für 1-Klick-Kontakt bringt +40% mehr Anfragen. Pop-ups für Aktionen sammeln E-Mails und Leads. Und mit Besucher-Auswertung siehst du genau, woher deine Kunden kommen.
                        </p>
                        <div>
                          <h4 className="text-white/80 font-medium mb-3 text-xs uppercase tracking-wider">Enthält:</h4>
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>WhatsApp Anbindung (+40% Anfragen) - 4,99€/Monat</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Pop-up für Aktionen - 3,99€/Monat</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Besucher-Auswertung - 4,99€/Monat</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* TerminProfi */}
                  <div className={`transition-all duration-300 ${
                    expandedPackage === 'terminprofi' ? 'bg-white/[0.08]' : ''
                  }`}>
                    <button
                      onClick={() => setExpandedPackage('terminprofi')}
                      className="w-full p-8 text-left hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">Webflix und TerminProfi</h3>
                          <p className="text-white/50 text-sm">Automatisierte Buchung</p>
                        </div>
                        {expandedPackage === 'terminprofi' ? (
                          <ChevronUp className="w-5 h-5 text-white/40" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                    </button>
                    {expandedPackage === 'terminprofi' && (
                      <div className="px-8 pb-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="text-white/40 text-sm line-through">58,98€ + 9,98€/Monat</div>
                          <div className="text-2xl font-semibold text-white">49€ + 7,99€<span className="text-sm font-normal text-white/50">/Monat</span></div>
                        </div>
                        <p className="text-white/60 leading-relaxed">
                          Deine Kunden sollen direkt Termine buchen? TerminProfi macht Schluss mit Telefonterror. Buchungssystem mit Kalender und Kunden-Dashboard reduziert Admin-Zeit um 60%. Google Maps mit Route zeigt Kunden den Weg. Und automatische WhatsApp-Bestätigungen sorgen für weniger No-Shows.
                        </p>
                        <div>
                          <h4 className="text-white/80 font-medium mb-3 text-xs uppercase tracking-wider">Enthält:</h4>
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Buchungssystem (-60% Admin-Zeit) - 49€ einmalig</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Google Maps mit Route - 4,99€/Monat</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>WhatsApp Anbindung - 4,99€/Monat</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 24/7-Service */}
                  <div className={`transition-all duration-300 ${
                    expandedPackage === '247service' ? 'bg-white/[0.08]' : ''
                  }`}>
                    <button
                      onClick={() => setExpandedPackage('247service')}
                      className="w-full p-8 text-left hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">Webflix und 24/7-Service</h3>
                          <p className="text-white/50 text-sm">Rund um die Uhr</p>
                        </div>
                        {expandedPackage === '247service' ? (
                          <ChevronUp className="w-5 h-5 text-white/40" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                    </button>
                    {expandedPackage === '247service' && (
                      <div className="px-8 pb-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="text-white/40 text-sm line-through">19,97€/Monat</div>
                          <div className="text-2xl font-semibold text-white">14,99€<span className="text-sm font-normal text-white/50">/Monat</span></div>
                        </div>
                        <p className="text-white/60 leading-relaxed">
                          Du willst auch nachts Kunden gewinnen? Der 24/7-Service arbeitet für dich, während du schläfst. KI Chatbot beantwortet Fragen automatisch rund um die Uhr. WhatsApp-Anbindung für direkten Kontakt. Und Besucher-Auswertung zeigt dir, wann deine Kunden am aktivsten sind.
                        </p>
                        <div>
                          <h4 className="text-white/80 font-medium mb-3 text-xs uppercase tracking-wider">Enthält:</h4>
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>KI Chatbot (24/7 Support) - 9,99€/Monat</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>WhatsApp Anbindung - 4,99€/Monat</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Besucher-Auswertung - 4,99€/Monat</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sichtbarkeits-Boost */}
                  <div className={`transition-all duration-300 ${
                    expandedPackage === 'sichtbarkeit' ? 'bg-white/[0.08]' : ''
                  }`}>
                    <button
                      onClick={() => setExpandedPackage('sichtbarkeit')}
                      className="w-full p-8 text-left hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">Webflix und Sichtbarkeits-Boost</h3>
                          <p className="text-white/50 text-sm">Google Rankings</p>
                        </div>
                        {expandedPackage === 'sichtbarkeit' ? (
                          <ChevronUp className="w-5 h-5 text-white/40" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                    </button>
                    {expandedPackage === 'sichtbarkeit' && (
                      <div className="px-8 pb-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="text-white/40 text-sm line-through">68,98€ + 19,98€/Monat</div>
                          <div className="text-2xl font-semibold text-white">49€ + 17,99€<span className="text-sm font-normal text-white/50">/Monat</span></div>
                        </div>
                        <p className="text-white/60 leading-relaxed">
                          Du willst bei Google gefunden werden? Der Sichtbarkeits-Boost macht dich sichtbar. Google Indexierung SEO bringt +120% mehr Traffic und Top-Rankings. Blog-System für regelmäßigen Content (9,90€ pro Artikel). Und Instagram Feed zeigt deine neuesten Posts direkt auf der Website.
                        </p>
                        <div>
                          <h4 className="text-white/80 font-medium mb-3 text-xs uppercase tracking-wider">Enthält:</h4>
                          <div className="space-y-2">
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Google Indexierung SEO (+120% Traffic) - 14,99€/Monat</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Blog-System - 49€ einmalig</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/60 text-sm">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2 flex-shrink-0"></div>
                              <span>Instagram Feed - 4,99€/Monat</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Image Area */}
              <div className="lg:col-span-3 flex items-center justify-center p-12">
                {expandedPackage === 'kundenmagnet' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Kundenmagnet"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                )}

                {expandedPackage === 'terminprofi' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="TerminProfi"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                )}

                {expandedPackage === '247service' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="24/7-Service"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                )}

                {expandedPackage === 'sichtbarkeit' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Sichtbarkeits-Boost"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>

          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="mt-16 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <TrendingUp className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Nicht das Richtige dabei?</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-6">
            Wir fügen ständig neue Designs hinzu. Oder lass uns ein individuelles Design für dein Business erstellen.
          </p>
          <button
            onClick={() => navigate('/custom')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-xl transition-all inline-flex items-center gap-2"
          >
            <span>Individuelles Design anfragen</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          </div>
        </div>
      </div>

      {demoModalOpen && selectedDemo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-7xl h-[92vh] sm:h-[90vh] bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent z-10 p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1 truncate">{selectedDemo.name}</h3>
                  <p className="text-white/60 text-xs sm:text-sm truncate">{selectedDemo.industryName}</p>
                </div>
                <button
                  onClick={() => {
                    setDemoModalOpen(false);
                    setSelectedDemo(null);
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center transition-all group flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            <iframe
              src={`${selectedDemo.demoUrl}?preview=true`}
              className="w-full h-full"
              title={selectedDemo.name}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent z-10 p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm sm:text-base">{selectedDemo.rating}</span>
                    <span className="text-white/60 text-xs sm:text-sm">({selectedDemo.reviews})</span>
                  </div>
                  <div className="text-white">
                    <span className="text-white/50 line-through text-xs sm:text-sm mr-1.5 sm:mr-2">49,99€</span>
                    <span className="text-xl sm:text-2xl font-bold text-pink-400">{selectedDemo.price.toFixed(2)}€</span>
                    <span className="text-white/50 text-xs sm:text-sm">/Monat</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setDemoModalOpen(false);
                      navigate('/shop', {
                        state: {
                          scrollToCategory: selectedDemo.industry
                        }
                      });
                      setTimeout(() => {
                        const categoryBtn = document.querySelector(`[data-industry="${selectedDemo.industry}"]`);
                        if (categoryBtn) {
                          (categoryBtn as HTMLElement).click();
                          categoryBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }, 100);
                    }}
                    className="flex-1 sm:flex-none px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white font-bold rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Mehr Designs</span>
                    <span className="sm:hidden">Mehr</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => {
                      // Track add_to_cart event
                      const pushToDataLayer = (eventData: any) => {
                        if (window.parent && window.parent !== window) {
                          window.parent.postMessage({
                            event: eventData.event,
                            eventData: eventData
                          }, '*');
                        } else {
                          (window as any).dataLayer = (window as any).dataLayer || [];
                          (window as any).dataLayer.push(eventData);
                        }
                      };

                      pushToDataLayer({
                        event: 'add_to_cart',
                        ecommerce: {
                          currency: 'EUR',
                          value: selectedDemo.price,
                          items: [{
                            item_id: selectedDemo.id,
                            item_name: selectedDemo.name,
                            item_category: selectedDemo.industry,
                            item_category2: selectedDemo.industryName,
                            price: selectedDemo.price,
                            quantity: 1
                          }]
                        }
                      });

                      setDemoModalOpen(false);
                      navigate('/configurator', {
                        state: {
                          selectedIndustry: selectedDemo.id,
                          preselectedDesign: selectedDemo.id,
                          basePrice: selectedDemo.price
                        }
                      });
                    }}
                    className="flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-pink-500/30 text-xs sm:text-sm"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Jetzt bestellen</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transparente Preise Section */}
      <section id="pricing" className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111111] to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,130,0,0.08)_0%,_transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-pink-400/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm">Faire Preise, volle Transparenz</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-white">Transparente </span>
              <span className="bg-gradient-to-r from-orange-500 via-pink-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
                Preise
              </span>
            </h2>
            <p className="text-base md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
              Wähle die Laufzeit, die am besten zu dir passt. Keine versteckten Kosten, keine Überraschungen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12">
            {/* FLEX - 3 Monate */}
            <div className="group relative bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 hover:shadow-xl hover:shadow-white/5 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
                    <Zap className="w-3 h-3 text-white/60" />
                    <span className="text-white/60 font-semibold text-xs">Aktion</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">3 Monate</h3>
                  <p className="text-white/50 text-xs md:text-sm">Vertragslaufzeit</p>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white/40" />
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">79,90€</span>
                  <span className="text-white/50 text-sm">/Monat</span>
                </div>
                <p className="text-white/40 text-xs">Flexibel Kündbar</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>Premium Website-Design</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>48h Go-Live Garantie</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>Priority Support</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>Hosting & Domain inklusive</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/zum-mitnehmen')}
                className="w-full py-3 md:py-4 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-semibold rounded-xl transition-all group-hover:scale-105"
              >
                Jetzt zum Shop
              </button>
            </div>

            {/* 12 Monate - Beliebt */}
            <div className="group relative bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-pink-400/20 backdrop-blur-sm border-2 border-orange-500/50 rounded-3xl p-6 md:p-8 lg:scale-105 shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300">
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-orange-500 to-pink-400 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm shadow-lg flex items-center gap-2">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-white" />
                  <span>BELIEBTESTE WAHL</span>
                </div>
              </div>

              <div className="flex items-start justify-between mb-4 mt-6 md:mt-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1 mb-3">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span className="text-orange-400 font-semibold text-xs">Aktion</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">12 Monate</h3>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-400 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">34,90€</span>
                  <span className="text-white/50 text-sm">/Monat</span>
                </div>
                <p className="text-orange-400/70 text-xs font-medium">Gesamt: 418,80€</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-orange-400" />
                  </div>
                  <span>Alle Features aus 3 Monate</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-orange-400" />
                  </div>
                  <span>Priorität-Support</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-orange-400" />
                  </div>
                  <span>Erweiterte Anpassungen</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-orange-400" />
                  </div>
                  <span>SEO-Optimierung inklusive</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/configurator')}
                className="w-full py-3 md:py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl group-hover:scale-105"
              >
                Jetzt starten
              </button>
            </div>

            {/* 24 Monate */}
            <div className="group relative bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 hover:shadow-xl hover:shadow-white/5 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
                    <Gift className="w-3 h-3 text-white/60" />
                    <span className="text-white/70 font-semibold text-xs">Aktion</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">24 Monate</h3>
                  <p className="text-white/40 text-xs">Best Value</p>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white/40" />
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">29,90€</span>
                  <span className="text-white/50 text-sm">/Monat</span>
                </div>
                <p className="text-white/40 text-xs">Gesamt: 717,60€</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>Alle Features aus 12 Monate</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>VIP-Support</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>Erweiterte Anpassungen</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>Marketing-Beratung inklusive</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/configurator')}
                className="w-full py-3 md:py-4 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-semibold rounded-xl transition-all group-hover:scale-105"
              >
                Jetzt starten
              </button>
            </div>
          </div>

          {/* Zusätzliche Info Section */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-400/20 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm md:text-base">Keine Setup-Gebühren</p>
                    <p className="text-white/50 text-xs">Sofort loslegen</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-400/20 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm md:text-base">Jederzeit wechseln</p>
                    <p className="text-white/50 text-xs">Flexibel upgraden</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-400/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm md:text-base">Persönlicher Support</p>
                    <p className="text-white/50 text-xs">Immer für dich da</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {waitlistModalOpen && (
        <WaitlistModal
          isOpen={waitlistModalOpen}
          onClose={() => setWaitlistModalOpen(false)}
        />
      )}

      {/* Industry Request Modal */}
      {showRequestModal && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowRequestModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 md:p-10 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">Branche anfragen</h3>
                <p className="text-gray-600">Erhalte deine personalisierte Website ab <span className="text-pink-400 font-bold">29,90€</span></p>
              </div>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-black mb-3">Anfrage gesendet!</h4>
                <p className="text-gray-600 mb-6">Calendly öffnet sich gleich für die Terminbuchung...</p>
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    setSubmitSuccess(false);
                    setFormData({ industryName: '', email: '' });
                  }}
                  className="text-gray-600 hover:text-black underline font-semibold"
                >
                  Schließen
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div>
                  <label className="block text-black font-bold mb-3">Branche *</label>
                  <input
                    type="text"
                    required
                    value={formData.industryName}
                    onChange={(e) => setFormData({ ...formData, industryName: e.target.value })}
                    placeholder="z.B. Friseur, Immobilien, Fitness..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-black font-bold mb-3">E-Mail Adresse *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="deine@email.de"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-black placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5">
                  <p className="text-gray-700 text-sm mb-3">
                    <span className="font-bold text-black">Nächster Schritt:</span> Nach dem Absenden kannst du direkt einen Termin in unserem Kalender buchen.
                  </p>
                  <div className="flex items-center gap-2 text-pink-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-bold">Calendly-Integration für Terminbuchung</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 text-white py-5 rounded-full font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  Mit dem Absenden stimmst du unseren Datenschutzbestimmungen zu.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Webflix One Industry Selection Modal */}
      {showWebflixOneIndustryModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl border border-white/10 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-gradient-to-b from-[#1a1a1a] to-transparent p-8 pb-4 z-10 border-b border-white/5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Für welche Branche brauchst du Webflix One?</h2>
                  <p className="text-gray-400">Wähle deine Branche und sieh dir die Demo mit passenden Inhalten an</p>
                </div>
                <button
                  onClick={() => setShowWebflixOneIndustryModal(false)}
                  className="text-gray-400 hover:text-white text-3xl transition-colors p-2 hover:bg-white/5 rounded-full flex-shrink-0"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {webflixOneIndustries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => {
                      setSelectedWebflixIndustry(industry);
                      setShowWebflixOneIndustryModal(false);
                      const webflixOneDesign = designs.find(d => d.id === 'webflix-one');
                      if (webflixOneDesign) {
                        setSelectedDemo({
                          ...webflixOneDesign,
                          demoUrl: `/webflix-one/${industry.slug}?preview=true`,
                          name: `Webflix One - ${industry.display_name}`
                        });
                        setDemoModalOpen(true);
                      }
                    }}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105"
                  >
                    <div className="mb-4">
                      <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-800 to-gray-900">
                        <img
                          src={industry.hero_image || 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg'}
                          alt={industry.display_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {industry.display_name}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {industry.hero_subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-orange-400 text-sm font-medium">
                      Demo ansehen
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

              {webflixOneIndustries.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Keine Branchen verfügbar. Branchen werden geladen...</p>
                </div>
              )}

              <div className="mt-8 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl p-6 border border-orange-500/20">
                <h4 className="text-lg font-semibold text-white mb-2">Deine Branche nicht dabei?</h4>
                <p className="text-gray-400 mb-4 text-sm">
                  Webflix One passt sich jeder Branche an. Kontaktiere uns für eine individuelle Demo-Erstellung.
                </p>
                <a
                  href="/custom/form"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all text-sm"
                  onClick={() => setShowWebflixOneIndustryModal(false)}
                >
                  Jetzt anfragen
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
