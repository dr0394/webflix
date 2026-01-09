import React, { useState, useEffect } from 'react';
import { Edit2, Save, Eye, List, CheckCircle2, Download, HelpCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import InlineEditor from './InlineEditor';
import TutorialOverlay from './TutorialOverlay';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface EditableDemoProps {
  demoType: string;
  demoComponent: React.ComponentType<{ customData?: Record<string, any> }>;
  editableFields: Array<{
    id: string;
    elementId: string;
    label: string;
    type: 'text' | 'textarea' | 'image' | 'url';
    section: string;
    defaultValue: string;
  }>;
}

const EditableDemo: React.FC<EditableDemoProps> = ({
  demoType,
  demoComponent: DemoComponent,
  editableFields
}) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [showCustomerForm, setShowCustomerForm] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const initialData: Record<string, any> = {};
    editableFields.forEach(field => {
      initialData[field.id] = field.defaultValue;
    });
    setFormData(initialData);
  }, [editableFields]);

  useEffect(() => {
    if (isEditMode) {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const editableElement = target.closest('[data-editable]');

        if (editableElement) {
          e.preventDefault();
          e.stopPropagation();

          const fieldId = editableElement.getAttribute('data-editable');
          if (fieldId) {
            setEditingField(fieldId);
            const rect = editableElement.getBoundingClientRect();
            setEditorPosition({
              x: rect.right + 20,
              y: rect.top
            });
          }
        }
      };

      document.addEventListener('click', handleClick, true);
      return () => document.removeEventListener('click', handleClick, true);
    }
  }, [isEditMode]);

  const handleFieldSave = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    const element = document.querySelector(`[data-editable="${fieldId}"]`);
    if (element) {
      element.textContent = value;
    }
  };

  const handleSaveAll = async () => {
    if (!customerInfo.name || !customerInfo.email) {
      alert('Bitte Name und E-Mail angeben.');
      return;
    }

    setIsSaving(true);
    try {
      const { data: configRecord, error: configError } = await supabase
        .from('website_configurations')
        .insert({
          customer_email: customerInfo.email,
          customer_name: customerInfo.name,
          demo_type: demoType,
          status: 'submitted'
        })
        .select()
        .maybeSingle();

      if (configError || !configRecord) {
        alert('Fehler beim Speichern.');
        setIsSaving(false);
        return;
      }

      const sections = editableFields.reduce((acc, field) => {
        if (!acc[field.section]) {
          acc[field.section] = {};
        }
        acc[field.section][field.id] = formData[field.id] || field.defaultValue;
        return acc;
      }, {} as Record<string, any>);

      const sectionPromises = Object.entries(sections).map(([sectionName, sectionData], index) =>
        supabase.from('section_contents').insert({
          config_id: configRecord.id,
          section_type: sectionName,
          section_data: sectionData,
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

  const getFieldProgress = () => {
    const filled = editableFields.filter(field => {
      const value = formData[field.id];
      return value && value.trim().length > 0;
    }).length;
    return Math.round((filled / editableFields.length) * 100);
  };

  const currentField = editableFields.find(f => f.id === editingField);

  return (
    <div className="relative">
      {/* Customer Info Modal */}
      {showCustomerForm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Willkommen!</h2>
            <p className="text-gray-600 mb-6">Bitte geben Sie Ihre Kontaktdaten ein, bevor Sie starten.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[orange-500] focus:outline-none text-gray-900"
                  placeholder="Max Mustermann"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">E-Mail *</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[orange-500] focus:outline-none text-gray-900"
                  placeholder="max@beispiel.de"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Firma (optional)</label>
                <input
                  type="text"
                  value={customerInfo.company}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[orange-500] focus:outline-none text-gray-900"
                  placeholder="Musterfirma GmbH"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon (optional)</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[orange-500] focus:outline-none text-gray-900"
                  placeholder="+49 123 456789"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (customerInfo.name && customerInfo.email) {
                  setShowCustomerForm(false);
                  setShowTutorial(true);
                }
              }}
              disabled={!customerInfo.name || !customerInfo.email}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter zum Editor
            </button>
          </div>
        </div>
      )}

      {/* Top Control Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-gray-900 to-black border-b-2 border-[orange-500] shadow-2xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Edit2 className="w-6 h-6 text-[orange-500]" />
              <div>
                <h1 className="text-white font-bold text-lg">Website Editor</h1>
                <p className="text-gray-400 text-sm">Klicken Sie auf Texte zum Bearbeiten</p>
              </div>
            </div>

            {/* Progress */}
            <div className="ml-8 flex items-center gap-3">
              <div className="w-48 h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[orange-500] to-[pink-400] transition-all duration-300"
                  style={{ width: `${getFieldProgress()}%` }}
                />
              </div>
              <span className="text-white font-bold text-sm">{getFieldProgress()}%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTutorial(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              title="Tutorial erneut anzeigen"
            >
              <HelpCircle className="w-4 h-4" />
              Hilfe
            </button>

            <button
              onClick={() => setShowChecklist(!showChecklist)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              Checkliste
            </button>

            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              {isEditMode ? <Eye className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditMode ? 'Vorschau' : 'Bearbeiten'}
            </button>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Speichert...' : 'Website speichern'}
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Sidebar */}
      {showChecklist && (
        <div className="fixed right-0 top-20 bottom-0 w-96 bg-white shadow-2xl z-40 border-l-2 border-[orange-500] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Checkliste</h2>
            <p className="text-sm text-gray-600 mb-6">
              Bearbeitete Felder: {editableFields.filter(f => formData[f.id]?.trim()).length} / {editableFields.length}
            </p>

            <div className="space-y-4">
              {editableFields.map((field) => {
                const isFilled = formData[field.id]?.trim().length > 0;
                return (
                  <div
                    key={field.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isFilled
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          isFilled ? 'text-green-600' : 'text-gray-300'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900">{field.label}</h3>
                        <p className="text-xs text-gray-500 mt-1">{field.section}</p>
                        {formData[field.id] && (
                          <p className="text-sm text-gray-700 mt-2 truncate">
                            {formData[field.id]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Inline Editor */}
      {editingField && currentField && (
        <InlineEditor
          elementId={currentField.elementId}
          currentValue={formData[editingField] || currentField.defaultValue}
          fieldType={currentField.type}
          label={currentField.label}
          onSave={(value) => handleFieldSave(editingField, value)}
          onClose={() => setEditingField(null)}
          position={editorPosition}
        />
      )}

      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay
          onComplete={() => setShowTutorial(false)}
          onSkip={() => setShowTutorial(false)}
        />
      )}

      {/* Demo Content with Edit Indicators */}
      <div className="pt-20">
        <style>{`
          [data-editable] {
            ${isEditMode ? `
              cursor: pointer;
              position: relative;
              transition: all 0.2s;
            ` : ''}
          }
          [data-editable]:hover {
            ${isEditMode ? `
              outline: 2px dashed orange-500;
              outline-offset: 4px;
              background-color: rgba(203, 170, 110, 0.1);
            ` : ''}
          }
          [data-editable]::before {
            ${isEditMode ? `
              content: '✎';
              position: absolute;
              top: -8px;
              right: -8px;
              background: orange-500;
              color: black;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              opacity: 0;
              transition: opacity 0.2s;
              z-index: 10;
            ` : ''}
          }
          [data-editable]:hover::before {
            ${isEditMode ? 'opacity: 1;' : ''}
          }
        `}</style>

        <DemoComponent customData={formData} />
      </div>
    </div>
  );
};

export default EditableDemo;
