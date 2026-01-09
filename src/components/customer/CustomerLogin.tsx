import React, { useState } from 'react';
import { LogIn, Mail, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user && data.session) {
        console.log('✅ Login successful:', data.user.email);
        console.log('✅ Session created:', data.session.access_token ? 'Yes' : 'No');

        setTimeout(() => {
          navigate('/customer/dashboard');
        }, 100);
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://webflix.info/reset-password',
      });

      if (resetError) throw resetError;

      setResetEmailSent(true);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Kunden-Login</h1>
            <p className="text-gray-400">Zugriff auf Ihr Dashboard</p>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-8 border border-white/10">
            {resetEmailSent ? (
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">E-Mail verschickt!</h3>
                <p className="text-gray-400 mb-6">
                  Wir haben Ihnen eine E-Mail mit einem Link zum Zurücksetzen Ihres Passworts an <strong className="text-white">{email}</strong> gesendet.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Bitte überprüfen Sie auch Ihren Spam-Ordner, falls Sie die E-Mail nicht innerhalb weniger Minuten erhalten.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmailSent(false);
                    setShowResetForm(false);
                  }}
                  className="text-orange-500 hover:underline"
                >
                  Zurück zum Login
                </button>
              </div>
            ) : showResetForm ? (
              <div>
                <h3 className="text-xl font-bold mb-4">Passwort zurücksetzen</h3>
                <p className="text-gray-400 mb-6">
                  Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
                </p>
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">E-Mail-Adresse</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="ihre@email.de"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Wird gesendet...' : 'Reset-Link senden'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetForm(false);
                        setError('');
                      }}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Zurück zum Login
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">E-Mail-Adresse</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="ihre@email.de"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Passwort</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-black/60 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-black font-bold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Anmeldung läuft...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Anmelden</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowResetForm(true)}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Passwort vergessen?
                </button>
              </div>
            </form>
            )}

            {!resetEmailSent && !showResetForm && (
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>Noch kein Konto? <a href="/" className="text-orange-500 hover:underline">Website bestellen</a></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
