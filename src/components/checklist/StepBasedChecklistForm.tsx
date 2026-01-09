import React, { useState, useEffect } from 'react';
import { CheckCircle, Upload, X, AlertCircle, Save, Send, Image as ImageIcon, Loader, ArrowLeft, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageUploadField from './ImageUploadField';

interface StepBasedChecklistFormProps {
  orderId: string;
  customerId: string;
  demoName: string;
  onComplete?: () => void;
}

export default function StepBasedChecklistForm({
  orderId,
  customerId,
  demoName,
  onComplete
}: StepBasedChecklistFormProps) {
  const [template, setTemplate] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [referenceImages, setReferenceImages] = useState<Record<string, string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [imgurUploading, setImgurUploading] = useState<Record<string, boolean>>({});
  const [totalImagesUploaded, setTotalImagesUploaded] = useState(0);
  const MAX_IMAGES = 20;
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string[]>>({});
  const [loadingSuggestions, setLoadingSuggestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadTemplate();
    loadExistingChecklist();
  }, [demoName, orderId]);

  const loadTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('checklist_templates')
        .select('template_data')
        .eq('demo_name', demoName)
        .maybeSingle();

      if (error) throw error;
      setTemplate(data?.template_data);
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExistingChecklist = async () => {
    try {
      const { data, error } = await supabase
        .from('order_checklists')
        .select('checklist_data')
        .eq('order_id', orderId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setFormData(data.checklist_data);
        countTotalImages(data.checklist_data);
      }

      const { data: brandingData } = await supabase
        .from('customer_brandings')
        .select('reference_images')
        .eq('order_id', orderId)
        .maybeSingle();

      if (brandingData?.reference_images) {
        setReferenceImages(brandingData.reference_images);
      }
    } catch (error) {
      console.error('Error loading checklist:', error);
    }
  };

  const countTotalImages = (data: Record<string, any>) => {
    let count = 0;
    Object.values(data).forEach(value => {
      if (typeof value === 'string' && value.startsWith('http')) {
        count++;
      } else if (Array.isArray(value)) {
        count += value.filter(v => typeof v === 'string' && v.startsWith('http')).length;
      }
    });

    Object.values(referenceImages).forEach(images => {
      count += images.length;
    });

    setTotalImagesUploaded(count);
  };

  useEffect(() => {
    countTotalImages(formData);
  }, [formData, referenceImages]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const generateAISuggestions = async (fieldId: string, field: any) => {
    setLoadingSuggestions(prev => ({ ...prev, [fieldId]: true }));

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-text-suggestions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fieldId,
            fieldLabel: field.label,
            fieldType: field.type,
            demoName,
            contextData: formData,
            maxLength: field.maxLength,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        console.error('Error from API:', result.error);

        if (result.error?.includes('quota') || result.error?.includes('insufficient_quota')) {
          alert('KI-Vorschläge sind vorübergehend nicht verfügbar. Bitte füllen Sie das Feld manuell aus.');
        } else {
          alert('Fehler beim Generieren der Vorschläge. Bitte versuchen Sie es erneut.');
        }
        return;
      }

      if (result.suggestions && result.suggestions.length > 0) {
        setAiSuggestions(prev => ({ ...prev, [fieldId]: result.suggestions }));
      } else {
        alert('Keine Vorschläge generiert. Bitte füllen Sie das Feld manuell aus.');
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      alert('Fehler beim Generieren der Vorschläge. Bitte versuchen Sie es erneut.');
    } finally {
      setLoadingSuggestions(prev => ({ ...prev, [fieldId]: false }));
    }
  };

  const applySuggestion = (fieldId: string, suggestion: string) => {
    handleInputChange(fieldId, suggestion);
    setAiSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[fieldId];
      return newSuggestions;
    });
  };

  const handleCheckboxChange = (fieldId: string, value: string, checked: boolean) => {
    const current = formData[fieldId] || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v: string) => v !== value);
    handleInputChange(fieldId, updated);
  };

  const handleImgurUpload = async (fieldId: string, file: File) => {
    if (totalImagesUploaded >= MAX_IMAGES) {
      alert(`Sie haben bereits ${MAX_IMAGES} Bilder hochgeladen. Das ist das Maximum.`);
      return null;
    }

    setImgurUploading(prev => ({ ...prev, [fieldId]: true }));

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': 'Client-ID 546c25a59c58ad7'
        },
        body: uploadFormData
      });

      const result = await response.json();

      if (result.success && result.data && result.data.link) {
        const imageUrl = result.data.link;
        const currentValue = formData[fieldId];

        if (Array.isArray(currentValue)) {
          handleInputChange(fieldId, [...currentValue, imageUrl]);
        } else if (currentValue) {
          handleInputChange(fieldId, [currentValue, imageUrl]);
        } else {
          handleInputChange(fieldId, imageUrl);
        }

        return imageUrl;
      } else {
        const errorMsg = result.data?.error || 'Upload fehlgeschlagen';
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error('Error uploading to Imgur:', error);
      const errorMessage = error.message || 'Unbekannter Fehler';
      alert(`Fehler beim Hochladen: ${errorMessage}\n\nBitte versuchen Sie es erneut oder wählen Sie ein kleineres Bild (<10MB).`);
      return null;
    } finally {
      setImgurUploading(prev => ({ ...prev, [fieldId]: false }));
    }
  };

  const validateStep = (stepIndex: number) => {
    const step = template.steps[stepIndex];
    const newErrors: Record<string, string> = {};

    step.fields.forEach((field: any) => {
      if (field.required) {
        const value = formData[field.id];

        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.id] = `${field.label} ist ein Pflichtfeld`;
        }

        if (field.type === 'checkbox' && field.min) {
          if (!value || value.length < field.min) {
            newErrors[field.id] = `Bitte wählen Sie mindestens ${field.min} Option(en)`;
          }
        }

        if (field.type === 'checkbox' && field.max) {
          if (value && value.length > field.max) {
            newErrors[field.id] = `Maximal ${field.max} Option(en) erlaubt`;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < template.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from('order_checklists')
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('order_checklists')
          .update({ checklist_data: formData })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('order_checklists')
          .insert([{
            order_id: orderId,
            customer_id: customerId,
            demo_name: demoName,
            checklist_data: formData,
            status: 'pending'
          }]);
      }

      const fullAddress = [
        formData.address_street,
        formData.address_zip,
        formData.address_city
      ].filter(Boolean).join(', ');

      const draftBrandingData: any = {
        company_name: formData.company_name || '',
        logo_url: formData.logo || '',
        primary_color: formData.primary_color || '#FF6B35',
        secondary_color: formData.secondary_color || '#1A1A1A',
        accent_color: formData.accent_color || '#F59E0B',
        hero_title: formData.hero_title || '',
        hero_subtitle: formData.hero_subtitle || '',
        cta_text: formData.cta_text || 'Jetzt Anfragen',
        contact_email: formData.email || '',
        contact_phone: formData.phone || '',
        contact_address: fullAddress || '',
        industry_specific_data: { ...formData }
      };

      const { data: existingBranding } = await supabase
        .from('customer_brandings')
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();

      if (existingBranding) {
        await supabase
          .from('customer_brandings')
          .update(draftBrandingData)
          .eq('id', existingBranding.id);
      }

      alert('Entwurf gespeichert!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    for (let i = 0; i < template.steps.length; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        alert(`Bitte füllen Sie alle Pflichtfelder in "${template.steps[i].title}" aus`);
        return;
      }
    }

    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from('order_checklists')
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('order_checklists')
          .update({
            checklist_data: formData,
            status: 'in_review',
            completed_at: new Date().toISOString()
          })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('order_checklists')
          .insert([{
            order_id: orderId,
            customer_id: customerId,
            demo_name: demoName,
            checklist_data: formData,
            status: 'in_review',
            completed_at: new Date().toISOString()
          }]);
      }

      const fullAddress = [
        formData.address_street,
        formData.address_zip,
        formData.address_city
      ].filter(Boolean).join(', ');

      const brandingData: any = {
        company_name: formData.company_name || '',
        logo_url: formData.company_logo || formData.logo || '',
        primary_color: formData.primary_color || '#FF6B35',
        secondary_color: formData.secondary_color || '#1A1A1A',
        accent_color: formData.accent_color || '#F59E0B',

        // Hero Section
        hero_title: formData.hero_tagline || formData.hero_title || '',
        hero_subtitle: formData.hero_subtitle || '',
        hero_badge: formData.hero_badge || '',
        hero_background_image: formData.hero_background_image || formData.hero_image || '',

        // Services Section
        services_section_title: formData.services_section_title || '',
        services_section_subtitle: formData.services_section_subtitle || '',
        services_list: formData.services_list || [],

        // Contact
        cta_text: formData.cta_text || 'Jetzt Anfragen',
        contact_email: formData.company_email || formData.email || '',
        contact_phone: formData.company_phone || formData.phone || '',
        contact_address: fullAddress || formData.company_address || '',

        // Meta
        demo_name: demoName,
        industry_specific_data: { ...formData },
        reference_images: referenceImages,
        status: 'content_submitted',
        completed_at: new Date().toISOString()
      };

      const { data: existingBranding } = await supabase
        .from('customer_brandings')
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();

      if (existingBranding) {
        await supabase
          .from('customer_brandings')
          .update(brandingData)
          .eq('id', existingBranding.id);
      } else {
        await supabase
          .from('customer_brandings')
          .insert([{
            ...brandingData,
            order_id: orderId
          }]);
      }

      await supabase
        .from('webflix_orders')
        .update({
          checklist_completed: true,
          checklist_completed_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error submitting checklist:', error);
      alert('Fehler beim Absenden');
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (field: any) => {
    const value = formData[field.id];
    const error = errors[field.id];

    if (field.condition) {
      const conditionMet = formData[field.condition.field] === field.condition.value;
      if (!conditionMet) return null;
    }

    return (
      <div
        key={field.id}
        className="space-y-2"
      >
        <label className="block text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-400 ml-1">*</span>}
        </label>

        {field.description && (
          <p className="text-xs text-gray-400">{field.description}</p>
        )}

        {field.type === 'text' && (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={value || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                maxLength={field.maxLength}
                placeholder={field.placeholder}
                className="flex-1 px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {field.ai_suggestions && (
                <button
                  type="button"
                  onClick={() => generateAISuggestions(field.id, field)}
                  disabled={loadingSuggestions[field.id]}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded flex items-center space-x-2 transition-all disabled:opacity-50"
                  title="KI-Vorschläge generieren"
                >
                  {loadingSuggestions[field.id] ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">KI</span>
                </button>
              )}
            </div>
            {aiSuggestions[field.id] && aiSuggestions[field.id].length > 0 && (
              <div className="space-y-2 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-purple-300 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>KI-Vorschläge:</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setAiSuggestions(prev => {
                      const newSuggestions = { ...prev };
                      delete newSuggestions[field.id];
                      return newSuggestions;
                    })}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {aiSuggestions[field.id].map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applySuggestion(field.id, suggestion)}
                    className="w-full text-left px-3 py-2 bg-black/40 hover:bg-black/60 border border-purple-500/30 hover:border-purple-500 rounded text-sm text-white transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {field.type === 'email' && (
          <input
            type="email"
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        )}

        {field.type === 'tel' && (
          <input
            type="tel"
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        )}

        {field.type === 'color' && (
          <div className="flex space-x-3">
            <input
              type="color"
              value={value || field.placeholder || '#FF6B35'}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className="w-16 h-12 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="flex-1 px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}

        {field.type === 'number' && (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        )}

        {field.type === 'textarea' && (
          <div className="space-y-2">
            <div className="relative">
              <textarea
                value={value || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                maxLength={field.maxLength}
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {field.ai_suggestions && (
                <button
                  type="button"
                  onClick={() => generateAISuggestions(field.id, field)}
                  disabled={loadingSuggestions[field.id]}
                  className="absolute top-2 right-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded flex items-center space-x-2 transition-all disabled:opacity-50"
                  title="KI-Vorschläge generieren"
                >
                  {loadingSuggestions[field.id] ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline text-sm">KI</span>
                </button>
              )}
            </div>
            {aiSuggestions[field.id] && aiSuggestions[field.id].length > 0 && (
              <div className="space-y-2 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-purple-300 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>KI-Vorschläge:</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setAiSuggestions(prev => {
                      const newSuggestions = { ...prev };
                      delete newSuggestions[field.id];
                      return newSuggestions;
                    })}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {aiSuggestions[field.id].map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applySuggestion(field.id, suggestion)}
                    className="w-full text-left px-3 py-2 bg-black/40 hover:bg-black/60 border border-purple-500/30 hover:border-purple-500 rounded text-sm text-white transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {field.type === 'radio' && (
          <div className="space-y-2">
            {field.options?.map((option: any) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {field.type === 'checkbox' && (
          <div className="space-y-2">
            {field.options?.map((option: any) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => handleCheckboxChange(field.id, option.value, e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
            {field.min && (
              <p className="text-xs text-gray-400">Mindestens {field.min} auswählen</p>
            )}
            {field.max && (
              <p className="text-xs text-gray-400">Maximal {field.max} auswählen</p>
            )}
          </div>
        )}

        {field.type === 'image' && (
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-400">Bilder hochgeladen:</span>
                <span className="text-lg font-bold text-white">{totalImagesUploaded} / {MAX_IMAGES}</span>
              </div>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${(totalImagesUploaded / MAX_IMAGES) * 100}%` }}
                />
              </div>
              {totalImagesUploaded >= MAX_IMAGES && (
                <p className="text-xs text-red-400 mt-2">Sie haben das Maximum von {MAX_IMAGES} Bildern erreicht</p>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <label className={`flex-1 ${totalImagesUploaded >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className={`px-4 py-3 text-white font-semibold rounded text-center transition-all flex items-center justify-center space-x-2 ${
                  totalImagesUploaded >= MAX_IMAGES
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                }`}>
                  {imgurUploading[field.id] ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Hochladen...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      <span>Bild hochladen</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple={field.multiple}
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      Array.from(files).forEach(file => {
                        handleImgurUpload(field.id, file);
                      });
                    }
                  }}
                  disabled={imgurUploading[field.id] || totalImagesUploaded >= MAX_IMAGES}
                />
              </label>
            </div>

            {value && (
              <div className="space-y-2">
                {Array.isArray(value) ? (
                  value.map((url: string, index: number) => (
                    <div key={index} className="bg-black/40 border border-green-500/30 rounded p-3">
                      <div className="flex items-start space-x-3">
                        <img
                          src={url}
                          alt="Uploaded"
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">Bild-URL:</p>
                          <input
                            type="text"
                            value={url}
                            readOnly
                            className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded text-xs text-white font-mono"
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const newValue = value.filter((_: string, i: number) => i !== index);
                            handleInputChange(field.id, newValue.length > 0 ? newValue : '');
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-black/40 border border-green-500/30 rounded p-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={value}
                        alt="Uploaded"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Bild-URL:</p>
                        <input
                          type="text"
                          value={value}
                          readOnly
                          className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded text-xs text-white font-mono"
                          onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                      </div>
                      <button
                        onClick={() => handleInputChange(field.id, '')}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {field.maxLength && (value || '').length > 0 && (
          <p className="text-xs text-gray-400">
            {(value || '').length}/{field.maxLength} Zeichen
          </p>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!template || !template.steps) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p className="text-red-400">Template nicht gefunden</p>
      </div>
    );
  }

  const currentStepData = template.steps[currentStep];
  const progress = ((currentStep + 1) / template.steps.length) * 100;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} von {template.steps.length}
              </span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-pink-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {currentStepData.description && (
              <p className="text-gray-400 text-sm">{currentStepData.description}</p>
            )}
          </div>

          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6 space-y-6">
            {currentStepData.fields.map((field: any) => renderField(field))}

            <div className="pt-6 mt-6 border-t border-white/10">
              <ImageUploadField
                label={`Referenzbilder für ${currentStepData.title}`}
                description="Laden Sie optionale Beispielbilder hoch, um zu zeigen, wie diese Section aussehen soll."
                sectionId={currentStepData.id}
                images={referenceImages[currentStepData.id] || []}
                onChange={(sectionId, images) => {
                  setReferenceImages(prev => ({
                    ...prev,
                    [sectionId]: images
                  }));
                }}
                maxImages={5}
                totalImagesUploaded={totalImagesUploaded}
                maxTotalImages={MAX_IMAGES}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-white/30 rounded hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück</span>
            </button>

            <button
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="px-6 py-3 border border-orange-500/30 text-orange-400 rounded hover:bg-orange-500/10 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Entwurf speichern</span>
            </button>

            {currentStep < template.steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded transition-all flex items-center space-x-2"
              >
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-black font-bold rounded transition-all flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Absenden</span>
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:block sticky top-4 h-fit">
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <h3 className="text-sm font-medium text-gray-400">Section Vorschau</h3>
            </div>

            {currentStepData.preview_screenshot ? (
              <div className="relative bg-black/40 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={currentStepData.preview_screenshot}
                  alt={`Preview ${currentStepData.title}`}
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <div className="bg-black/40 rounded-lg p-8 text-center border border-white/10">
                <p className="text-gray-400 text-sm">
                  Für diesen Step ist noch kein Vorschau-Bild verfügbar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
