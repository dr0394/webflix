import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, Upload, X, Save, Eye, Sparkles } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface FormField {
  id: string;
  elementId: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'image';
  placeholder: string;
  value: string;
  required: boolean;
  maxLength?: number;
  helpText?: string;
}

interface TutorialSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: FormField[];
}

interface InteractiveTutorialProps {
  demoType: string;
  demoName: string;
  onClose: () => void;
  onDataChange?: (data: Record<string, any>) => void;
}

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  demoType,
  demoName,
  onClose,
  onDataChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [sections, setSections] = useState<TutorialSection[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSections(getDefaultSections(demoType));
  }, [demoType]);

  useEffect(() => {
    if (currentStep > 0 && currentStep <= sections.length) {
      const section = sections[currentStep - 1];
      if (section && section.fields[currentFieldIndex]) {
        const field = section.fields[currentFieldIndex];
        highlightElement(field.elementId);
      }
    }
  }, [currentStep, currentFieldIndex, sections]);

  useEffect(() => {
    if (onDataChange && sections.length > 0) {
      const allData: Record<string, any> = {};
      sections.forEach(section => {
        section.fields.forEach(field => {
          allData[field.id] = field.value;
        });
      });
      onDataChange(allData);
    }
  }, [sections, onDataChange]);

  const getDefaultSections = (type: string): TutorialSection[] => {
    return [
      {
        id: 'hero',
        title: 'Hero-Section',
        description: 'Der erste Eindruck Ihrer Website',
        icon: '🎯',
        fields: [
          {
            id: 'hero_h1',
            elementId: 'demo-h1',
            label: 'Hauptüberschrift (H1)',
            type: 'text',
            placeholder: 'z.B. Autoaufbereitung auf höchstem Niveau',
            value: '',
            required: true,
            maxLength: 80,
            helpText: 'Die große Überschrift, die Besucher als erstes sehen'
          },
          {
            id: 'hero_h2',
            elementId: 'demo-h2',
            label: 'Unterüberschrift (H2)',
            type: 'textarea',
            placeholder: 'z.B. Vertrauen Sie auf unsere professionelle Autoaufbereitung',
            value: '',
            required: true,
            maxLength: 200,
            helpText: 'Zusätzliche Beschreibung unter der Hauptüberschrift'
          },
          {
            id: 'hero_cta',
            elementId: 'demo-cta-button',
            label: 'Button Text',
            type: 'text',
            placeholder: 'z.B. Jetzt Termin buchen',
            value: '',
            required: true,
            maxLength: 30,
            helpText: 'Text auf dem Haupt-Button'
          },
          {
            id: 'hero_image',
            elementId: 'demo-hero-image',
            label: 'Hero-Bild',
            type: 'image',
            placeholder: 'Wird später über Google Drive hochgeladen',
            value: '',
            required: false,
            helpText: 'Das große Hintergrundbild im Hero-Bereich'
          }
        ]
      },
      {
        id: 'badges',
        title: 'Trust-Badges',
        description: 'Vertrauenselemente und Highlights',
        icon: '✨',
        fields: [
          {
            id: 'badge_1',
            elementId: 'demo-badge-1',
            label: 'Badge 1 - Text',
            type: 'text',
            placeholder: 'z.B. 500+ zufriedene Kunden',
            value: '',
            required: false,
            maxLength: 50,
            helpText: 'Erstes Vertrauenselement unter dem Hero'
          },
          {
            id: 'badge_2',
            elementId: 'demo-badge-2',
            label: 'Badge 2 - Text',
            type: 'text',
            placeholder: 'z.B. 15 Jahre Erfahrung',
            value: '',
            required: false,
            maxLength: 50,
            helpText: 'Zweites Vertrauenselement'
          },
          {
            id: 'badge_3',
            elementId: 'demo-badge-3',
            label: 'Badge 3 - Text',
            type: 'text',
            placeholder: 'z.B. 100% Zufriedenheitsgarantie',
            value: '',
            required: false,
            maxLength: 50,
            helpText: 'Drittes Vertrauenselement'
          }
        ]
      },
      {
        id: 'about',
        title: 'Über Uns',
        description: 'Ihre Firmengeschichte und Werte',
        icon: '👥',
        fields: [
          {
            id: 'about_title',
            elementId: 'demo-about-title',
            label: 'Überschrift',
            type: 'text',
            placeholder: 'z.B. Über uns',
            value: '',
            required: true,
            maxLength: 80,
            helpText: 'Titel der Über-Uns Section'
          },
          {
            id: 'about_subtitle',
            elementId: 'demo-about-subtitle',
            label: 'Untertitel',
            type: 'text',
            placeholder: 'z.B. Ihre Experten für professionelle Autoaufbereitung',
            value: '',
            required: false,
            maxLength: 120,
            helpText: 'Kurzer Untertitel'
          },
          {
            id: 'about_text',
            elementId: 'demo-about-text',
            label: 'Beschreibung',
            type: 'textarea',
            placeholder: 'Beschreiben Sie Ihr Unternehmen, Ihre Geschichte und Ihre Werte...',
            value: '',
            required: true,
            maxLength: 800,
            helpText: 'Ausführliche Beschreibung Ihres Unternehmens'
          }
        ]
      },
      {
        id: 'services',
        title: 'Leistungen',
        description: 'Ihre Dienstleistungen und Angebote',
        icon: '⚡',
        fields: [
          {
            id: 'services_title',
            elementId: 'demo-services-title',
            label: 'Section Überschrift',
            type: 'text',
            placeholder: 'z.B. Unsere Leistungen',
            value: '',
            required: true,
            maxLength: 80,
            helpText: 'Hauptüberschrift der Leistungs-Section'
          },
          {
            id: 'service_1_title',
            elementId: 'demo-service-1-title',
            label: 'Leistung 1 - Name',
            type: 'text',
            placeholder: 'z.B. Innenreinigung',
            value: '',
            required: true,
            maxLength: 50,
            helpText: 'Name Ihrer ersten Hauptleistung'
          },
          {
            id: 'service_1_desc',
            elementId: 'demo-service-1-desc',
            label: 'Leistung 1 - Beschreibung',
            type: 'textarea',
            placeholder: 'Professionelle Innenreinigung mit hochwertigen Produkten...',
            value: '',
            required: true,
            maxLength: 200,
            helpText: 'Beschreibung der ersten Leistung'
          },
          {
            id: 'service_2_title',
            elementId: 'demo-service-2-title',
            label: 'Leistung 2 - Name',
            type: 'text',
            placeholder: 'z.B. Außenreinigung',
            value: '',
            required: true,
            maxLength: 50,
            helpText: 'Name Ihrer zweiten Hauptleistung'
          },
          {
            id: 'service_2_desc',
            elementId: 'demo-service-2-desc',
            label: 'Leistung 2 - Beschreibung',
            type: 'textarea',
            placeholder: 'Gründliche Außenreinigung für perfekten Glanz...',
            value: '',
            required: true,
            maxLength: 200,
            helpText: 'Beschreibung der zweiten Leistung'
          },
          {
            id: 'service_3_title',
            elementId: 'demo-service-3-title',
            label: 'Leistung 3 - Name',
            type: 'text',
            placeholder: 'z.B. Lackversiegelung',
            value: '',
            required: false,
            maxLength: 50,
            helpText: 'Name Ihrer dritten Leistung (optional)'
          },
          {
            id: 'service_3_desc',
            elementId: 'demo-service-3-desc',
            label: 'Leistung 3 - Beschreibung',
            type: 'textarea',
            placeholder: 'Langanhaltender Schutz durch Keramikversiegelung...',
            value: '',
            required: false,
            maxLength: 200,
            helpText: 'Beschreibung der dritten Leistung (optional)'
          }
        ]
      },
      {
        id: 'gallery',
        title: 'Galerie',
        description: 'Bilder Ihrer Arbeit',
        icon: '📸',
        fields: [
          {
            id: 'gallery_title',
            elementId: 'demo-gallery-title',
            label: 'Galerie Überschrift',
            type: 'text',
            placeholder: 'z.B. Unsere Arbeit',
            value: '',
            required: false,
            maxLength: 80,
            helpText: 'Überschrift für die Galerie-Section'
          },
          {
            id: 'gallery_subtitle',
            elementId: 'demo-gallery-subtitle',
            label: 'Galerie Untertitel',
            type: 'text',
            placeholder: 'z.B. Sehen Sie selbst die Qualität unserer Arbeit',
            value: '',
            required: false,
            maxLength: 120,
            helpText: 'Beschreibender Untertitel'
          },
          {
            id: 'gallery_images',
            elementId: 'demo-gallery-images',
            label: 'Galerie-Bilder',
            type: 'image',
            placeholder: 'Laden Sie 8-12 Bilder über Google Drive hoch',
            value: '',
            required: false,
            helpText: '8-12 hochauflösende Bilder Ihrer Arbeit'
          }
        ]
      },
      {
        id: 'contact',
        title: 'Kontaktdaten',
        description: 'Wie Kunden Sie erreichen können',
        icon: '📞',
        fields: [
          {
            id: 'contact_title',
            elementId: 'demo-contact-title',
            label: 'Section Überschrift',
            type: 'text',
            placeholder: 'z.B. Kontakt',
            value: '',
            required: false,
            maxLength: 80,
            helpText: 'Überschrift der Kontakt-Section'
          },
          {
            id: 'contact_address',
            elementId: 'demo-contact-address',
            label: 'Geschäftsadresse',
            type: 'textarea',
            placeholder: 'Musterstraße 123\n12345 Musterstadt',
            value: '',
            required: true,
            maxLength: 200,
            helpText: 'Ihre vollständige Geschäftsadresse'
          },
          {
            id: 'contact_phone',
            elementId: 'demo-contact-phone',
            label: 'Telefonnummer',
            type: 'text',
            placeholder: '+49 123 456 7890',
            value: '',
            required: true,
            maxLength: 30,
            helpText: 'Ihre Haupttelefonnummer'
          },
          {
            id: 'contact_email',
            elementId: 'demo-contact-email',
            label: 'E-Mail',
            type: 'text',
            placeholder: 'info@beispiel.de',
            value: '',
            required: true,
            maxLength: 100,
            helpText: 'Ihre Haupt-E-Mail-Adresse'
          },
          {
            id: 'contact_hours',
            elementId: 'demo-contact-hours',
            label: 'Öffnungszeiten',
            type: 'textarea',
            placeholder: 'Mo-Fr: 9:00 - 18:00\nSa: 10:00 - 14:00\nSo: Geschlossen',
            value: '',
            required: false,
            maxLength: 300,
            helpText: 'Ihre Öffnungszeiten'
          },
          {
            id: 'contact_whatsapp',
            elementId: 'demo-contact-whatsapp',
            label: 'WhatsApp Nummer',
            type: 'text',
            placeholder: '+49 175 1234567',
            value: '',
            required: false,
            maxLength: 30,
            helpText: 'WhatsApp Business Nummer (optional)'
          }
        ]
      },
      {
        id: 'social',
        title: 'Social Media',
        description: 'Ihre Social Media Präsenz',
        icon: '🌐',
        fields: [
          {
            id: 'social_facebook',
            elementId: 'demo-social-facebook',
            label: 'Facebook Link',
            type: 'url',
            placeholder: 'https://facebook.com/ihrprofil',
            value: '',
            required: false,
            helpText: 'Link zu Ihrer Facebook-Seite'
          },
          {
            id: 'social_instagram',
            elementId: 'demo-social-instagram',
            label: 'Instagram Link',
            type: 'url',
            placeholder: 'https://instagram.com/ihrprofil',
            value: '',
            required: false,
            helpText: 'Link zu Ihrem Instagram-Profil'
          },
          {
            id: 'social_linkedin',
            elementId: 'demo-social-linkedin',
            label: 'LinkedIn Link',
            type: 'url',
            placeholder: 'https://linkedin.com/company/ihrprofil',
            value: '',
            required: false,
            helpText: 'Link zu Ihrem LinkedIn-Profil'
          }
        ]
      }
    ];
  };

  const highlightElement = (elementId: string) => {
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
    });

    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add('tutorial-highlight');
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const updateField = (value: string) => {
    if (currentStep > 0 && currentStep <= sections.length) {
      const newSections = [...sections];
      newSections[currentStep - 1].fields[currentFieldIndex].value = value;
      setSections(newSections);
    }
  };

  const handleNext = () => {
    const section = sections[currentStep - 1];
    if (currentFieldIndex < section.fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    } else if (currentStep < sections.length) {
      setCurrentStep(currentStep + 1);
      setCurrentFieldIndex(0);
    } else {
      setCurrentStep(sections.length + 1);
    }
  };

  const handleBack = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      const prevSection = sections[currentStep - 2];
      setCurrentFieldIndex(prevSection.fields.length - 1);
    } else if (currentStep === 1) {
      setCurrentStep(0);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return customerInfo.name && customerInfo.email;
    }
    if (currentStep > 0 && currentStep <= sections.length) {
      const section = sections[currentStep - 1];
      const field = section.fields[currentFieldIndex];
      return !field.required || field.value.trim();
    }
    return true;
  };

  const handleFinish = async () => {
    setIsSaving(true);
    try {
      const { data: configRecord, error: configError } = await supabase
        .from('website_configurations')
        .insert({
          customer_email: customerInfo.email,
          customer_name: customerInfo.name,
          demo_type: demoType,
          google_drive_link: googleDriveLink,
          status: 'submitted'
        })
        .select()
        .maybeSingle();

      if (configError || !configRecord) {
        alert('Fehler beim Speichern.');
        setIsSaving(false);
        return;
      }

      const sectionPromises = sections.map((section, index) =>
        supabase.from('section_contents').insert({
          config_id: configRecord.id,
          section_type: section.id,
          section_data: section.fields.reduce((acc, field) => ({
            ...acc,
            [field.id]: field.value
          }), {}),
          order_index: index
        })
      );

      await Promise.all(sectionPromises);

      window.location.href = `/website/${configRecord.id}`;
    } catch (error) {
      alert('Ein Fehler ist aufgetreten.');
      setIsSaving(false);
    }
  };

  const getTotalFields = () => {
    return sections.reduce((sum, section) => sum + section.fields.length, 0);
  };

  const getCurrentFieldNumber = () => {
    if (currentStep === 0) return 0;
    let count = 0;
    for (let i = 0; i < currentStep - 1; i++) {
      count += sections[i].fields.length;
    }
    return count + currentFieldIndex + 1;
  };

  const progress = currentStep === 0 ? 0 : (getCurrentFieldNumber() / getTotalFields()) * 100;

  if (currentStep === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 text-white">
            <button onClick={onClose} className="float-right p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[orange-500] to-[pink-400] rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Willkommen!</h2>
              <p className="text-gray-300 text-lg">Wir erstellen gemeinsam Ihre {demoName}</p>
            </div>
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Ihr Name <span className="text-red-400">*</span></label>
                <input type="text" value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} placeholder="Max Mustermann" className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">E-Mail <span className="text-red-400">*</span></label>
                <input type="email" value={customerInfo.email} onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })} placeholder="max@beispiel.de" className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Firma</label>
                <input type="text" value={customerInfo.company} onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })} placeholder="Meine Firma GmbH" className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Telefon</label>
                <input type="tel" value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} placeholder="+49 123 456 7890" className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none" />
              </div>
            </div>
            <button onClick={() => setCurrentStep(1)} disabled={!canProceed()} className="w-full px-6 py-4 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold text-lg rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              Jetzt starten <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === sections.length + 1) {
    if (isComplete) {
      return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 text-white text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Perfekt!</h2>
              <p className="text-xl text-gray-300 mb-8">Ihre Daten wurden erfolgreich übermittelt</p>
              <button onClick={onClose} className="px-8 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-semibold rounded-lg">
                Fertig
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[orange-500] to-[pink-400] rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Fast geschafft!</h2>
              <p className="text-gray-300">Laden Sie Ihre Bilder hoch</p>
            </div>
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">Google Drive Link</label>
              <input type="url" value={googleDriveLink} onChange={(e) => setGoogleDriveLink(e.target.value)} placeholder="https://drive.google.com/..." className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none" />
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setCurrentStep(sections.length); const lastSection = sections[sections.length - 1]; setCurrentFieldIndex(lastSection.fields.length - 1); }} className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" /> Zurück
              </button>
              <button onClick={handleFinish} disabled={isSaving} className="flex-1 px-6 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold rounded-lg flex items-center justify-center gap-2">
                {isSaving ? 'Speichern...' : <><Save className="w-5 h-5" /> Absenden</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const section = sections[currentStep - 1];
  const field = section.fields[currentFieldIndex];

  return (
    <>
      <style>
        {`
          .tutorial-highlight {
            position: relative;
            z-index: 50 !important;
            outline: 4px solid rgba(203, 170, 110, 0.9) !important;
            outline-offset: 8px;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8),
                        0 0 60px 15px rgba(203, 170, 110, 0.7) !important;
            animation: pulse-outline 2s ease-in-out infinite;
          }
          @keyframes pulse-outline {
            0%, 100% {
              outline-color: rgba(203, 170, 110, 0.9);
            }
            50% {
              outline-color: rgba(243, 228, 168, 1);
            }
          }
        `}
      </style>

      <div className="fixed left-0 top-0 bottom-0 w-full md:w-[450px] bg-black border-r border-white/10 z-50 overflow-y-auto">
        <div className="sticky top-0 bg-black z-10 border-b border-white/10">
          <div className="bg-[orange-500]/20 h-2">
            <div className="bg-gradient-to-r from-[orange-500] to-[pink-400] h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Feld {getCurrentFieldNumber()} von {getTotalFields()}</span>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white"><span className="text-2xl mr-2">{section.icon}</span>{section.title}</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-[#1a1a1a] border border-[orange-500]/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-[orange-500] mt-1" />
              <p className="text-sm text-gray-300">Das markierte Element zeigt, wo dieser Inhalt erscheint</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">{field.label} {field.required && <span className="text-red-400">*</span>}</label>
            {field.helpText && <p className="text-xs text-gray-500 mb-3">{field.helpText}</p>}
            {field.type === 'textarea' ? (
              <textarea value={field.value} onChange={(e) => updateField(e.target.value)} placeholder={field.placeholder} maxLength={field.maxLength} rows={5} className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none resize-none" />
            ) : (
              <input type={field.type} value={field.value} onChange={(e) => updateField(e.target.value)} placeholder={field.placeholder} maxLength={field.maxLength} className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none" />
            )}
            {field.maxLength && <p className="text-xs text-gray-500 mt-2 text-right">{field.value.length}/{field.maxLength}</p>}
          </div>

          <div className="flex gap-3">
            <button onClick={handleBack} className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" /> Zurück
            </button>
            <button onClick={handleNext} disabled={!canProceed()} className="flex-1 px-6 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold rounded-lg disabled:opacity-50 flex items-center justify-center gap-2">
              Weiter <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="md:ml-[450px]"></div>
    </>
  );
};

export default InteractiveTutorial;
