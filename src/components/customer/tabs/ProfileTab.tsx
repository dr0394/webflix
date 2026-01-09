import React, { useState } from 'react';
import { User, Mail, Phone, Building, MapPin, Save } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface CustomerData {
  id: string;
  customer_number: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  company?: string;
  address?: {
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
  };
}

interface ProfileTabProps {
  customerData: CustomerData;
  onUpdate: () => void;
}

export default function ProfileTab({ customerData, onUpdate }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: customerData.first_name,
    last_name: customerData.last_name,
    phone: customerData.phone || '',
    company: customerData.company || '',
    address: {
      street: customerData.address?.street || '',
      zip: customerData.address?.zip || '',
      city: customerData.address?.city || '',
      country: customerData.address?.country || 'Deutschland'
    }
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('customers')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          company: formData.company,
          address: formData.address
        })
        .eq('id', customerData.id);

      if (error) throw error;

      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Fehler beim Speichern der Änderungen');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mein Profil</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-white/30 rounded hover:bg-white/10 transition-colors"
          >
            Bearbeiten
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  first_name: customerData.first_name,
                  last_name: customerData.last_name,
                  phone: customerData.phone || '',
                  company: customerData.company || '',
                  address: {
                    street: customerData.address?.street || '',
                    zip: customerData.address?.zip || '',
                    city: customerData.address?.city || '',
                    country: customerData.address?.country || 'Deutschland'
                  }
                });
              }}
              className="px-4 py-2 border border-white/30 rounded hover:bg-white/10 transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Speichern...' : 'Speichern'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
        <div className="space-y-6">
          <div className="pb-6 border-b border-white/10">
            <h3 className="text-lg font-semibold mb-4">Kundennummer</h3>
            <p className="text-2xl font-mono text-orange-400">{customerData.customer_number}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Persönliche Daten</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vorname</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ) : (
                  <p className="text-gray-300">{customerData.first_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nachname</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ) : (
                  <p className="text-gray-300">{customerData.last_name}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Kontaktdaten</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">E-Mail-Adresse</label>
                <p className="text-gray-300">{customerData.email}</p>
                <p className="text-xs text-gray-500 mt-1">E-Mail kann nicht geändert werden</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Telefon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+49 123 456789"
                  />
                ) : (
                  <p className="text-gray-300">{customerData.phone || 'Nicht angegeben'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Firma (optional)</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Firmenname"
                  />
                ) : (
                  <p className="text-gray-300">{customerData.company || 'Nicht angegeben'}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Adresse</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Straße und Hausnummer</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Musterstraße 123"
                  />
                ) : (
                  <p className="text-gray-300">{customerData.address?.street || 'Nicht angegeben'}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">PLZ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address.zip}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, zip: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="12345"
                    />
                  ) : (
                    <p className="text-gray-300">{customerData.address?.zip || 'Nicht angegeben'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Stadt</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Musterstadt"
                    />
                  ) : (
                    <p className="text-gray-300">{customerData.address?.city || 'Nicht angegeben'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Land</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ) : (
                  <p className="text-gray-300">{customerData.address?.country || 'Deutschland'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
