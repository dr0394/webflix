import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, HelpCircle, MessageCircle } from 'lucide-react';

const CheckoutCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    const checkoutData = localStorage.getItem('webflix-checkout');
    if (checkoutData) {
      navigate('/checkout');
    } else {
      navigate('/configurator');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black text-white flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/50">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl -z-10"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            Zahlung abgebrochen
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Sie haben den Zahlungsvorgang abgebrochen. Ihre Bestellung wurde nicht verarbeitet.
        </p>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Was möchten Sie tun?</h2>

          <div className="space-y-4">
            <button
              onClick={handleRetry}
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-xl transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zur Bestellung
            </button>

            <button
              onClick={() => navigate('/configurator')}
              className="w-full px-6 py-3 border border-white/20 hover:border-white/40 rounded-xl text-white/80 hover:text-white transition-all"
            >
              Bestellung ändern
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-pink-400/10 border border-orange-500/30 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            Brauchen Sie Hilfe?
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Wenn Sie Fragen zur Bestellung oder Zahlung haben, kontaktieren Sie uns gerne.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:support@webflix.de"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all"
            >
              E-Mail senden
            </a>
            <a
              href="https://wa.me/491234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 border border-white/20 hover:border-white/40 rounded-xl text-white/80 hover:text-white transition-all"
        >
          Zurück zur Startseite
        </button>
      </div>
    </div>
  );
};

export default CheckoutCancel;
