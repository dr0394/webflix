import React, { useState, useEffect } from 'react';
import { CheckCircle, Upload, X, AlertCircle, Save, Send, Image as ImageIcon, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ImageUploadField from './ImageUploadField';
import HighlightOverlay from './HighlightOverlay';
import { getHighlightMapping } from '../../lib/demoHighlightMappings';

interface ChecklistFormProps {
  orderId: string;
  customerId: string;
  demoName: string;
  onComplete?: () => void;
}

export default function ChecklistForm({ orderId, customerId, demoName, onComplete }: ChecklistFormProps) {
  const [template, setTemplate] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [referenceImages, setReferenceImages] = useState<Record<string, string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [imgurUploading, setImgurUploading] = useState<Record<string, boolean>>({});
  const [totalImagesUploaded, setTotalImagesUploaded] = useState(0);
  const MAX_IMAGES = 20;
  const [activeField, setActiveField] = useState<string | undefined>();
  const [showHighlight, setShowHighlight] = useState(true);
  const demoMapping = getHighlightMapping(demoName);

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
        .single();

      if (error) throw error;
      setTemplate(data.template_data);
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
      console.log('Imgur response:', result);

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

  const handleFileUpload = async (fieldId: string, files: FileList) => {
    const fileArray = Array.from(files);
    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
      const fileName = `${customerId}/${orderId}/${fieldId}/${Date.now()}_${file.name}`;

      try {
        setUploadProgress(prev => ({ ...prev, [fieldId]: 0 }));

        const { data, error } = await supabase.storage
          .from('checklist-files')
          .upload(fileName, file);

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('checklist-files')
          .getPublicUrl(fileName);

        uploadedUrls.push(urlData.publicUrl);
        setUploadProgress(prev => ({ ...prev, [fieldId]: 100 }));
      } catch (error) {
        console.error('Error uploading file:', error);
        alert(`Fehler beim Hochladen von ${file.name}`);
      }
    }

    handleInputChange(fieldId, uploadedUrls);
    setTimeout(() => {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fieldId];
        return newProgress;
      });
    }, 1000);
  };

  const validateSection = (sectionIndex: number) => {
    const section = template.sections[sectionIndex];
    const newErrors: Record<string, string> = {};

    section.fields.forEach((field: any) => {
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

      if (field.condition) {
        const conditionMet = formData[field.condition.field] === field.condition.value;
        if (conditionMet && field.required && !formData[field.id]) {
          newErrors[field.id] = `${field.label} ist erforderlich`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      if (currentSection < template.sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
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

      console.log('💾 ========== DRAFT SAVE START ==========');
      console.log('💾 Form Data:', JSON.stringify(formData, null, 2));

      const draftFullAddress = [
        formData.address,
        formData.postalCode,
        formData.city
      ].filter(Boolean).join(', ');

      const draftBrandingData: any = {
        company_name: formData.companyName || formData.company_name || formData.firmenname || '',
        logo_url: formData.logo || formData.logo_url || '',
        primary_color: formData.primary_color || formData.hauptfarbe || '#1E40AF',
        secondary_color: formData.secondary_color || formData.sekundaerfarbe || '#64748B',
        accent_color: formData.accent_color || formData.akzentfarbe || '#F59E0B',
        hero_title: formData.tagline || formData.hero_title || formData.hauptueberschrift || '',
        hero_subtitle: formData.hero_subtitle || formData.unterueberschrift || '',
        cta_text: formData.cta_text || formData.button_text || 'Jetzt Anfragen',
        about_text: formData.aboutText || formData.about_text || formData.ueber_uns || '',
        contact_email: formData.email || formData.contact_email || '',
        contact_phone: formData.phone || formData.contact_phone || formData.telefon || '',
        contact_address: draftFullAddress || formData.contact_address || formData.adresse || '',
        domain_preference: formData.domain_preference || formData.wunschdomain || '',
        industry_specific_data: { ...formData }
      };

      console.log('💾 Draft Branding Data:', JSON.stringify(draftBrandingData, null, 2));

      const { data: existingBranding } = await supabase
        .from('customer_brandings')
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();

      if (existingBranding) {
        console.log('💾 Updating draft for branding:', existingBranding.id);
        const { data: updateData, error: updateError } = await supabase
          .from('customer_brandings')
          .update(draftBrandingData)
          .eq('id', existingBranding.id)
          .select();

        if (updateError) {
          console.error('💾 ❌ ERROR:', updateError);
          throw updateError;
        }
        console.log('💾 ✅ SUCCESS:', updateData);
      } else {
        console.log('💾 No existing branding found, draft not saved to brandings');
      }

      console.log('💾 ========== DRAFT SAVE END ==========');
      alert('Entwurf gespeichert!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    for (let i = 0; i < template.sections.length; i++) {
      if (!validateSection(i)) {
        setCurrentSection(i);
        alert(`Bitte füllen Sie alle Pflichtfelder in Abschnitt "${template.sections[i].title}" aus`);
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

      console.log('🔥 ========== CHECKLIST SUBMIT START ==========');
      console.log('🔥 Form Data Keys:', Object.keys(formData));
      console.log('🔥 Form Data:', JSON.stringify(formData, null, 2));
      console.log('🔥 Order ID:', orderId);
      console.log('🔥 Customer ID:', customerId);
      console.log('🔥 Demo Name:', demoName);

      const { data: { user } } = await supabase.auth.getUser();
      console.log('🔥 Authenticated User:', user?.email, user?.id);

      if (!user) {
        alert('Fehler: Sie sind nicht angemeldet! Bitte melden Sie sich an.');
        throw new Error('User not authenticated');
      }

      const fullAddress = [
        formData.address,
        formData.postalCode,
        formData.city
      ].filter(Boolean).join(', ');

      console.log('🔥 Full Address:', fullAddress);

      const brandingData: any = {
        company_name: formData.companyName || formData.company_name || formData.firmenname || '',
        logo_url: formData.logo || formData.logo_url || '',
        primary_color: formData.primary_color || formData.hauptfarbe || '#1E40AF',
        secondary_color: formData.secondary_color || formData.sekundaerfarbe || '#64748B',
        accent_color: formData.accent_color || formData.akzentfarbe || '#F59E0B',
        hero_title: formData.tagline || formData.hero_title || formData.hauptueberschrift || '',
        hero_subtitle: formData.hero_subtitle || formData.unterueberschrift || '',
        cta_text: formData.cta_text || formData.button_text || 'Jetzt Anfragen',
        about_text: formData.aboutText || formData.about_text || formData.ueber_uns || '',
        contact_email: formData.email || formData.contact_email || '',
        contact_phone: formData.phone || formData.contact_phone || formData.telefon || '',
        contact_address: fullAddress || formData.contact_address || formData.adresse || '',
        domain_preference: formData.domain_preference || formData.wunschdomain || '',
        industry_specific_data: { ...formData },
        reference_images: referenceImages,
        status: 'content_submitted',
        completed_at: new Date().toISOString()
      };

      console.log('🔥 Branding Data to save:');
      console.log('  - company_name:', brandingData.company_name);
      console.log('  - logo_url:', brandingData.logo_url);
      console.log('  - contact_email:', brandingData.contact_email);
      console.log('  - contact_phone:', brandingData.contact_phone);
      console.log('  - contact_address:', brandingData.contact_address);
      console.log('  - industry_specific_data keys:', Object.keys(brandingData.industry_specific_data));
      console.log('  - industry_specific_data:', JSON.stringify(brandingData.industry_specific_data, null, 2));

      const { data: existingBranding } = await supabase
        .from('customer_brandings')
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();

      if (existingBranding) {
        console.log('🔥 UPDATING existing branding:', existingBranding.id);
        const { error: updateError } = await supabase
          .from('customer_brandings')
          .update(brandingData)
          .eq('id', existingBranding.id);

        if (updateError) {
          console.error('🔥 ❌ ERROR updating branding:', updateError);
          throw updateError;
        }
        console.log('🔥 ✅ UPDATE SUCCESS');
      } else {
        console.log('🔥 INSERTING new branding entry');
        const { error: insertError } = await supabase
          .from('customer_brandings')
          .insert([{
            ...brandingData,
            order_id: orderId
          }]);

        if (insertError) {
          console.error('🔥 ❌ ERROR inserting branding:', insertError);
          throw insertError;
        }
        console.log('🔥 ✅ INSERT SUCCESS');
      }

      console.log('🔥 Verifying saved data...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('customer_brandings')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (verifyError) {
        console.error('🔥 ❌ ERROR verifying:', verifyError);
      } else {
        console.log('🔥 ✅ VERIFIED DATA:');
        console.log('  - ID:', verifyData.id);
        console.log('  - company_name:', verifyData.company_name);
        console.log('  - logo_url:', verifyData.logo_url);
        console.log('  - contact_email:', verifyData.contact_email);
        console.log('  - industry_specific_data keys:', Object.keys(verifyData.industry_specific_data || {}));
        console.log('  - industry_specific_data:', JSON.stringify(verifyData.industry_specific_data, null, 2));
      }
      console.log('🔥 ========== CHECKLIST SUBMIT END ==========');

      await supabase
        .from('webflix_orders')
        .update({
          checklist_completed: true,
          checklist_completed_at: new Date().toISOString()
        })
        .eq('id', orderId);

      console.log('✅ Checklist submission complete!');
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
        onFocus={() => setActiveField(field.id)}
        onMouseEnter={() => setActiveField(field.id)}
      >
        <label className="block text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-400 ml-1">*</span>}
        </label>

        {field.type === 'text' && (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
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

        {field.type === 'url' && (
          <input
            type="url"
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
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
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        )}

        {field.type === 'select' && (
          <select
            value={value || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Bitte wählen...</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
                      <span>Bild hochladen (Imgur)</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImgurUpload(field.id, file);
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

            <p className="text-xs text-gray-400">
              Bilder werden zu Imgur hochgeladen und die URL wird automatisch gespeichert
            </p>
          </div>
        )}

        {field.type === 'file' && (
          <div>
            <input
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              onChange={(e) => e.target.files && handleFileUpload(field.id, e.target.files)}
              className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {uploadProgress[field.id] !== undefined && (
              <div className="mt-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress[field.id]}%` }}
                  />
                </div>
              </div>
            )}
            {value && (
              <div className="mt-2 text-sm text-green-400">
                {Array.isArray(value) ? `${value.length} Datei(en) hochgeladen` : 'Datei hochgeladen'}
              </div>
            )}
          </div>
        )}

        {field.maxLength && (
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

  if (!template) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p className="text-red-400">Template nicht gefunden</p>
      </div>
    );
  }

  const currentSectionData = template.sections[currentSection];
  const progress = ((currentSection + 1) / template.sections.length) * 100;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Form */}
        <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{currentSectionData.title}</h2>
          <span className="text-sm text-gray-400">
            Schritt {currentSection + 1} von {template.sections.length}
          </span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-pink-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {currentSectionData.description && (
          <p className="text-gray-400 text-sm">{currentSectionData.description}</p>
        )}
      </div>

      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6 space-y-6">
        {currentSectionData.fields.map((field: any) => renderField(field))}

        <div className="pt-6 mt-6 border-t border-white/10">
          <ImageUploadField
            label={`Referenzbilder für ${currentSectionData.title}`}
            description="Laden Sie optionale Beispielbilder hoch, um zu zeigen, wie diese Section aussehen soll."
            sectionId={currentSectionData.id || `section_${currentSection}`}
            images={referenceImages[currentSectionData.id || `section_${currentSection}`] || []}
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
          disabled={currentSection === 0}
          className="px-6 py-3 border border-white/30 rounded hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Zurück
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={isSaving}
          className="px-6 py-3 border border-orange-500/30 text-orange-400 rounded hover:bg-orange-500/10 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Entwurf speichern</span>
        </button>

        {currentSection < template.sections.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded transition-all"
          >
            Weiter
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-black font-bold rounded transition-all flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Checkliste absenden</span>
          </button>
        )}
      </div>
        </div>

        {/* Right Column: Demo Preview */}
        {demoMapping && (
          <div className="hidden lg:block">
            <HighlightOverlay
              demoUrl={demoMapping.demoUrl}
              activeField={activeField}
              highlightZones={demoMapping.zones}
              isVisible={showHighlight}
            />
          </div>
        )}
      </div>
    </div>
  );
}
