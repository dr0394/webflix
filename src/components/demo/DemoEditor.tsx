import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Upload, Link as LinkIcon, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface SectionField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'url';
  placeholder?: string;
  value: string;
  required?: boolean;
  maxLength?: number;
}

interface Section {
  id: string;
  name: string;
  icon: string;
  fields: SectionField[];
  expanded: boolean;
}

interface DemoEditorProps {
  demoType: string;
  onSave: (data: any) => void;
  onClose: () => void;
}

const DemoEditor: React.FC<DemoEditorProps> = ({ demoType, onSave, onClose }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  useEffect(() => {
    // Initialize sections based on demo type
    setSections(getDefaultSections(demoType));
  }, [demoType]);

  const getDefaultSections = (type: string): Section[] => {
    const commonSections: Section[] = [
      {
        id: 'hero',
        name: 'Hero-Section',
        icon: '🎯',
        expanded: true,
        fields: [
          {
            id: 'hero_h1',
            label: 'Hauptüberschrift (H1)',
            type: 'text',
            placeholder: 'z.B. Autoaufbereitung auf höchstem Niveau',
            value: '',
            required: true,
            maxLength: 80
          },
          {
            id: 'hero_h2',
            label: 'Unterüberschrift (H2)',
            type: 'textarea',
            placeholder: 'z.B. Vertrauen Sie auf unsere professionelle Autoaufbereitung im Raum Velbert',
            value: '',
            required: true,
            maxLength: 200
          },
          {
            id: 'hero_cta_text',
            label: 'Call-to-Action Button Text',
            type: 'text',
            placeholder: 'z.B. Jetzt Termin buchen',
            value: '',
            required: true,
            maxLength: 30
          },
          {
            id: 'hero_cta_link',
            label: 'Call-to-Action Link',
            type: 'url',
            placeholder: 'z.B. https://wa.me/491234567890',
            value: '',
            required: false
          }
        ]
      },
      {
        id: 'badges',
        name: 'Badges & Trust-Elemente',
        icon: '✨',
        expanded: false,
        fields: [
          {
            id: 'badge_1_text',
            label: 'Badge 1 Text',
            type: 'text',
            placeholder: 'z.B. 500+ zufriedene Kunden',
            value: '',
            required: false,
            maxLength: 50
          },
          {
            id: 'badge_2_text',
            label: 'Badge 2 Text',
            type: 'text',
            placeholder: 'z.B. 15 Jahre Erfahrung',
            value: '',
            required: false,
            maxLength: 50
          },
          {
            id: 'badge_3_text',
            label: 'Badge 3 Text',
            type: 'text',
            placeholder: 'z.B. 100% Zufriedenheitsgarantie',
            value: '',
            required: false,
            maxLength: 50
          }
        ]
      },
      {
        id: 'about',
        name: 'Über Uns',
        icon: '👥',
        expanded: false,
        fields: [
          {
            id: 'about_title',
            label: 'Titel',
            type: 'text',
            placeholder: 'z.B. Über unser Unternehmen',
            value: '',
            required: true,
            maxLength: 80
          },
          {
            id: 'about_text',
            label: 'Text',
            type: 'textarea',
            placeholder: 'Beschreiben Sie Ihr Unternehmen, Ihre Geschichte und Ihre Werte...',
            value: '',
            required: true,
            maxLength: 800
          }
        ]
      },
      {
        id: 'services',
        name: 'Leistungen',
        icon: '⚡',
        expanded: false,
        fields: [
          {
            id: 'services_title',
            label: 'Titel',
            type: 'text',
            placeholder: 'z.B. Unsere Leistungen',
            value: '',
            required: true,
            maxLength: 80
          },
          {
            id: 'service_1_name',
            label: 'Leistung 1 Name',
            type: 'text',
            placeholder: 'z.B. Innenreinigung',
            value: '',
            required: true,
            maxLength: 50
          },
          {
            id: 'service_1_desc',
            label: 'Leistung 1 Beschreibung',
            type: 'textarea',
            placeholder: 'Kurze Beschreibung der Leistung...',
            value: '',
            required: true,
            maxLength: 200
          },
          {
            id: 'service_2_name',
            label: 'Leistung 2 Name',
            type: 'text',
            placeholder: 'z.B. Außenreinigung',
            value: '',
            required: false,
            maxLength: 50
          },
          {
            id: 'service_2_desc',
            label: 'Leistung 2 Beschreibung',
            type: 'textarea',
            placeholder: 'Kurze Beschreibung der Leistung...',
            value: '',
            required: false,
            maxLength: 200
          },
          {
            id: 'service_3_name',
            label: 'Leistung 3 Name',
            type: 'text',
            placeholder: 'z.B. Lackversiegelung',
            value: '',
            required: false,
            maxLength: 50
          },
          {
            id: 'service_3_desc',
            label: 'Leistung 3 Beschreibung',
            type: 'textarea',
            placeholder: 'Kurze Beschreibung der Leistung...',
            value: '',
            required: false,
            maxLength: 200
          }
        ]
      },
      {
        id: 'contact',
        name: 'Kontakt',
        icon: '📞',
        expanded: false,
        fields: [
          {
            id: 'contact_title',
            label: 'Titel',
            type: 'text',
            placeholder: 'z.B. Kontaktieren Sie uns',
            value: '',
            required: true,
            maxLength: 80
          },
          {
            id: 'contact_address',
            label: 'Adresse',
            type: 'textarea',
            placeholder: 'Musterstraße 123\n12345 Musterstadt',
            value: '',
            required: true,
            maxLength: 200
          },
          {
            id: 'contact_phone',
            label: 'Telefon',
            type: 'text',
            placeholder: '+49 123 456 7890',
            value: '',
            required: true,
            maxLength: 30
          },
          {
            id: 'contact_email',
            label: 'E-Mail',
            type: 'text',
            placeholder: 'info@beispiel.de',
            value: '',
            required: true,
            maxLength: 100
          },
          {
            id: 'contact_hours',
            label: 'Öffnungszeiten',
            type: 'textarea',
            placeholder: 'Mo-Fr: 9:00 - 18:00\nSa: 10:00 - 14:00\nSo: Geschlossen',
            value: '',
            required: false,
            maxLength: 300
          }
        ]
      }
    ];

    return commonSections;
  };

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  const updateField = (sectionId: string, fieldId: string, value: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.map(field =>
              field.id === fieldId ? { ...field, value } : field
            )
          }
        : section
    ));
  };

  const handleSave = () => {
    // Validate required fields
    const allFields: SectionField[] = sections.flatMap(s => s.fields);
    const missingRequired = allFields.filter(f => f.required && !f.value.trim());

    if (missingRequired.length > 0) {
      alert(`Bitte füllen Sie alle Pflichtfelder aus:\n${missingRequired.map(f => `- ${f.label}`).join('\n')}`);
      return;
    }

    if (!customerInfo.name || !customerInfo.email) {
      alert('Bitte geben Sie mindestens Ihren Namen und E-Mail-Adresse ein.');
      return;
    }

    // Prepare data
    const configData = {
      customerInfo,
      googleDriveLink,
      sections: sections.map(section => ({
        id: section.id,
        name: section.name,
        data: section.fields.reduce((acc, field) => ({
          ...acc,
          [field.id]: field.value
        }), {})
      })),
      timestamp: new Date().toISOString()
    };

    onSave(configData);
    setSavedSuccessfully(true);
    setTimeout(() => setSavedSuccessfully(false), 3000);
  };

  const calculateProgress = () => {
    const allFields = sections.flatMap(s => s.fields);
    const requiredFields = allFields.filter(f => f.required);
    const filledRequired = requiredFields.filter(f => f.value.trim()).length;
    return Math.round((filledRequired / requiredFields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Sidebar Form */}
      <div className="w-full md:w-[500px] bg-black border-r border-white/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[orange-500]/10 to-[pink-400]/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Website-Inhalte anpassen</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Progress */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Fortschritt</span>
              <span className="text-sm font-semibold text-[orange-500]">{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[orange-500] to-[pink-400] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Füllen Sie die Felder aus und wir erstellen Ihre Website in 48 Stunden
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">📋 Ihre Kontaktdaten</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Name * <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="Ihr vollständiger Name"
                  className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  E-Mail * <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  placeholder="ihre@email.de"
                  className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Firma</label>
                <input
                  type="text"
                  value={customerInfo.company}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                  placeholder="Firmenname"
                  className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Telefon</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="+49 123 456 7890"
                  className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Google Drive Link */}
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[orange-500]" />
              Bilder & Videos hochladen
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Laden Sie Ihre Bilder und Videos in einen Google Drive Ordner hoch und teilen Sie den Link hier
            </p>
            <input
              type="url"
              value={googleDriveLink}
              onChange={(e) => setGoogleDriveLink(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none"
            />
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm text-[orange-500] hover:text-[pink-400] transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              Google Drive öffnen
            </a>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.id} className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{section.name}</h3>
                </div>
                {section.expanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {section.expanded && (
                <div className="p-4 pt-0 space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.id}>
                      <label className="text-sm text-gray-400 mb-1 block">
                        {field.label} {field.required && <span className="text-red-400">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={field.value}
                          onChange={(e) => updateField(section.id, field.id, e.target.value)}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                          rows={4}
                          className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={field.value}
                          onChange={(e) => updateField(section.id, field.id, e.target.value)}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                          className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[orange-500] focus:outline-none"
                        />
                      )}
                      {field.maxLength && (
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {field.value.length}/{field.maxLength}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-black">
          {savedSuccessfully && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <span className="text-sm">Erfolgreich gespeichert!</span>
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-semibold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Speichern & Absenden
            </button>
          </div>
        </div>
      </div>

      {/* Preview Overlay */}
      <div className="hidden md:flex flex-1 bg-black/80 backdrop-blur-sm items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Eye className="w-16 h-16 text-[orange-500] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Live-Vorschau</h3>
          <p className="text-gray-400 mb-6">
            Ihre Website wird basierend auf den eingegebenen Daten erstellt. Nach dem Speichern erhalten Sie eine Vorschau.
          </p>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4">
            <AlertCircle className="w-8 h-8 text-[orange-500] mx-auto mb-2" />
            <p className="text-sm text-gray-300">
              Sobald Sie alle Pflichtfelder ausgefüllt haben, können Sie die Daten absenden.
              Wir erstellen Ihre Website dann innerhalb von 48 Stunden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoEditor;
