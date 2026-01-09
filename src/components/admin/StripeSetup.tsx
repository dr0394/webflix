import React, { useState } from 'react';
import { ArrowLeft, Package, Check, AlertCircle, Loader2, ExternalLink, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductResult {
  id: string;
  name: string;
  status: 'success' | 'error';
  stripe_product_id?: string;
  stripe_price_id?: string;
  amount?: number;
  type?: string;
  error?: string;
}

interface SetupResponse {
  message: string;
  results: ProductResult[];
  summary: {
    total: number;
    success: number;
    errors: number;
  };
}

const StripeSetup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SetupResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSetup = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/setup-stripe-products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.includes('STRIPE_SECRET_KEY')) {
          throw new Error('Stripe Secret Key ist nicht konfiguriert. Bitte in Supabase Secrets hinzufügen.');
        }
        throw new Error(errorData.error || 'Failed to setup Stripe products');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück</span>
          </button>
          <div className="flex items-center gap-3">
            <img
              src="https://i.imgur.com/2SbjgE7.png"
              alt="Webflix"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">Stripe Setup</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Stripe Produkte <span className="bg-gradient-to-r from-orange-500 to-pink-400 bg-clip-text text-transparent">Setup</span>
            </h1>
            <p className="text-xl text-gray-300">
              Erstelle automatisch alle WebFlix Produkte und Preise in deinem Stripe Account
            </p>
          </div>

          {/* Info Card */}
          {!results && (
            <div className="bg-[#333333] rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Was wird erstellt?</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/40 rounded-xl p-6">
                  <div className="text-3xl font-bold text-orange-500 mb-2">3</div>
                  <div className="text-sm text-gray-400">Basis-Abonnements</div>
                  <div className="text-xs text-gray-500 mt-2">Monatlich, 12M, 24M</div>
                </div>
                <div className="bg-black/40 rounded-xl p-6">
                  <div className="text-3xl font-bold text-orange-500 mb-2">9</div>
                  <div className="text-sm text-gray-400">Monatliche Add-ons</div>
                  <div className="text-xs text-gray-500 mt-2">Recurring Subscriptions</div>
                </div>
                <div className="bg-black/40 rounded-xl p-6">
                  <div className="text-3xl font-bold text-orange-500 mb-2">6</div>
                  <div className="text-sm text-gray-400">Einmalige Add-ons</div>
                  <div className="text-xs text-gray-500 mt-2">One-time Payments</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg">Produkte:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'WebFlix - Monatlich kündbar (49,90€)', 
                    'WebFlix - 12 Monate (0,50€)',
                    'WebFlix - 24 Monate (24,90€)',
                    'WhatsApp Anbindung (4,99€)',
                    'Buchungssystem (19,99€)',
                    'KI Chatbot (9,99€)',
                    'Google Indexierung SEO (14,99€)',
                    'Buchungssystem Setup (49€ einmalig)',
                    'Blog-System (49€ einmalig)',
                    'Meta Tracking (99€ einmalig)',
                    'Google Tracking (99€ einmalig)',
                    'Und 7 weitere...'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <Package className="w-4 h-4 text-orange-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-pink-400/10 border border-orange-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-2">Wichtig:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Stelle sicher, dass dein Stripe Secret Key konfiguriert ist</li>
                      <li>• Die Produkte werden in deinem Live Stripe Account erstellt</li>
                      <li>• Dieser Vorgang kann nicht rückgängig gemacht werden</li>
                      <li>• Bereits existierende Produkte werden NICHT überschrieben</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-3 text-blue-400">So konfigurierst du den Stripe Secret Key:</p>
                    <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                      <li>Gehe zu <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Stripe Dashboard → API Keys</a></li>
                      <li>Kopiere deinen "Secret key" (beginnt mit sk_live_ oder sk_test_)</li>
                      <li>Öffne <a href="https://supabase.com/dashboard/project/zyyzayflwxbcebmvrwqd/settings/vault" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Supabase Secrets</a></li>
                      <li>Erstelle ein neues Secret mit Namen: <code className="bg-black/40 px-2 py-1 rounded">STRIPE_SECRET_KEY</code></li>
                      <li>Füge deinen Stripe Secret Key als Wert ein</li>
                      <li>Komme zurück und klicke auf "Alle Produkte erstellen"</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {!results && (
            <div className="text-center">
              <button
                onClick={handleSetup}
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold text-lg rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Erstelle Produkte...</span>
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    <span>Alle Produkte erstellen</span>
                  </>
                )}
              </button>
              <p className="text-sm text-gray-400 mt-4">
                Dieser Vorgang dauert ca. 30-60 Sekunden
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-500 mb-2">Fehler</h3>
                  <p className="text-gray-300 mb-4">{error}</p>
                  {error.includes('Stripe Secret Key') && (
                    <div className="mt-4 pt-4 border-t border-red-500/30">
                      <p className="text-sm text-gray-400 mb-3">Um fortzufahren:</p>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Öffne <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Stripe API Keys</a></li>
                        <li>Kopiere deinen Secret Key</li>
                        <li>Füge ihn in <a href="https://supabase.com/dashboard/project/zyyzayflwxbcebmvrwqd/settings/vault" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Supabase Secrets</a> als <code className="bg-black/40 px-2 py-1 rounded">STRIPE_SECRET_KEY</code> ein</li>
                        <li>Versuche es erneut</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-[#333333] rounded-2xl p-8">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    results.summary.errors === 0 ? 'bg-green-500' : 'bg-orange-500'
                  }`}>
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{results.message}</h2>
                  <p className="text-gray-400">Stripe Setup abgeschlossen</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black/40 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-white mb-2">{results.summary.total}</div>
                    <div className="text-sm text-gray-400">Gesamt</div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-500 mb-2">{results.summary.success}</div>
                    <div className="text-sm text-gray-400">Erfolgreich</div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-red-500 mb-2">{results.summary.errors}</div>
                    <div className="text-sm text-gray-400">Fehler</div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <a
                    href="https://dashboard.stripe.com/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-semibold rounded-lg transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Produkte in Stripe anzeigen</span>
                  </a>
                  <button
                    onClick={() => setResults(null)}
                    className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Neu starten
                  </button>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="bg-[#333333] rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Detaillierte Ergebnisse</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {results.results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        result.status === 'success'
                          ? 'bg-green-500/5 border-green-500/30'
                          : 'bg-red-500/5 border-red-500/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {result.status === 'success' ? (
                            <Check className="w-5 h-5 text-green-500 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="font-semibold text-white mb-1">{result.name}</div>
                            <div className="text-sm text-gray-400">ID: {result.id}</div>
                            {result.status === 'success' && (
                              <>
                                <div className="text-xs text-gray-500 mt-1">
                                  Product ID: {result.stripe_product_id}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Price ID: {result.stripe_price_id}
                                </div>
                              </>
                            )}
                            {result.status === 'error' && (
                              <div className="text-sm text-red-400 mt-1">{result.error}</div>
                            )}
                          </div>
                        </div>
                        {result.status === 'success' && result.amount && (
                          <div className="text-right">
                            <div className="font-bold text-white">{result.amount.toFixed(2)}€</div>
                            <div className="text-xs text-gray-400">{result.type}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StripeSetup;
