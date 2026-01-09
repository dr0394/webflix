import { useState } from 'react';
import { X, Mail, User, Phone, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendWaitlistConfirmationEmail } from '../lib/brevo';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  interestedTemplate?: string;
}

export default function WaitlistModal({ isOpen, onClose, interestedTemplate }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase.from('sales_waitlist').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          interested_template: interestedTemplate || null,
        },
      ]);

      if (submitError) throw submitError;

      await sendWaitlistConfirmationEmail(formData.email, formData.name);

      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 3000);
    } catch (err: any) {
      console.error('Error joining waitlist:', err);
      setError(err.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    if (!isSubmitting) {
      onClose();
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
        setError('');
      }, 300);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Perfekt!</h3>
            <p className="text-gray-600">
              Du stehst jetzt auf der Warteliste. Wir informieren dich per E-Mail, sobald wieder Plätze verfügbar sind.
            </p>
          </div>
        ) : (
          <>
            <div className="relative p-6 pb-4 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-t-2xl">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">Ausverkauft für diese Woche</h2>
                <p className="text-white/90 text-sm">
                  Keine Sorge! Trag dich in unsere Warteliste ein und wir informieren dich, sobald wieder Plätze frei
                  sind. Das geht in der Regel ziemlich schnell!
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                  placeholder="Dein Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                  placeholder="deine@email.de"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                  placeholder="+49 123 456789"
                />
              </div>

              {interestedTemplate && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Interessiert an:</strong> {interestedTemplate}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  {isSubmitting ? 'Wird eingetragen...' : 'Auf Warteliste'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center pt-2">
                Wir behandeln deine Daten vertraulich und senden dir nur eine Benachrichtigung, wenn Plätze verfügbar
                sind.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
