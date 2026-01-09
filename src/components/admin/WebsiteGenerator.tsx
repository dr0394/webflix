import React, { useState } from 'react';
import { Globe, Download, Eye, CheckCircle, AlertCircle, Loader, Mail, Copy, FileText, Sparkles, Package, Rocket } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContentInjector } from '../../lib/contentInjector';
import { generatePromptFromChecklist, getPromptSummary } from '../../lib/promptGenerator';
import { generateDeploymentPackage } from '../../lib/deploymentPackageGenerator';

interface WebsiteGeneratorProps {
  order: any;
  checklist: any;
  onGenerated: () => void;
}

export default function WebsiteGenerator({ order, checklist, onGenerated }: WebsiteGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<any>(null);
  const [showDeploymentPackage, setShowDeploymentPackage] = useState(false);
  const [deploymentPackage, setDeploymentPackage] = useState<string>('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const slug = ContentInjector.generateSlug(
        order.order_number,
        checklist.demo_name
      );

      const checklistData = ContentInjector.extractChecklistData(checklist);

      const { data: existingWebsite } = await supabase
        .from('generated_websites')
        .select('*')
        .eq('order_id', order.id)
        .maybeSingle();

      let websiteData;

      if (existingWebsite) {
        const { data, error: updateError } = await supabase
          .from('generated_websites')
          .update({
            injected_content: checklistData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingWebsite.id)
          .select()
          .single();

        if (updateError) throw updateError;
        websiteData = data;
      } else {
        const { data, error: insertError } = await supabase
          .from('generated_websites')
          .insert({
            order_id: order.id,
            customer_email: order.customer_data?.email || order.customer_email,
            slug,
            template_name: checklist.demo_name,
            injected_content: checklistData,
            status: 'draft',
            published_url: `${window.location.origin}/w/${slug}`,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        websiteData = data;
      }

      const tokenResult = await supabase.rpc('generate_website_access_token', {
        p_website_id: websiteData.id,
        p_customer_email: websiteData.customer_email,
      });

      if (tokenResult.error) throw tokenResult.error;

      setGeneratedWebsite({
        ...websiteData,
        accessToken: tokenResult.data,
      });

      onGenerated();
    } catch (err: any) {
      console.error('Error generating website:', err);
      setError(err.message || 'Fehler beim Generieren der Website');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedWebsite) return;

    try {
      const { error: publishError } = await supabase
        .from('generated_websites')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', generatedWebsite.id);

      if (publishError) throw publishError;

      setGeneratedWebsite({
        ...generatedWebsite,
        status: 'published',
      });

      alert('Website erfolgreich veröffentlicht!');
    } catch (err: any) {
      console.error('Error publishing website:', err);
      alert('Fehler beim Veröffentlichen: ' + err.message);
    }
  };

  const handleDownloadZip = async () => {
    if (!generatedWebsite) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-website-zip`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            website_id: generatedWebsite.id,
          }),
        }
      );

      if (!response.ok) throw new Error('Fehler beim Generieren des ZIP');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedWebsite.slug}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      console.error('Error downloading ZIP:', err);
      alert('Fehler beim Download: ' + err.message);
    }
  };

  const handleGeneratePrompt = () => {
    const prompt = generatePromptFromChecklist(checklist, checklist.demo_name);
    setGeneratedPrompt(prompt);
    setShowPrompt(true);
    setShowDeploymentPackage(false);
  };

  const handleGenerateDeploymentPackage = () => {
    const package_ = generateDeploymentPackage(checklist, checklist.demo_name);
    setDeploymentPackage(package_);
    setShowDeploymentPackage(true);
    setShowPrompt(false);
  };

  const handleGenerateForBolt = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-react-website`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            checklist_id: checklist.id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler bei der Code-Generierung');
      }

      const result = await response.json();

      alert(`✓ Code erfolgreich generiert!\n\n${result.files_count} Dateien erstellt\nProjekt: ${result.project_name}\n\nDu kannst die Dateien jetzt in Bolt importieren.`);

      onGenerated();
    } catch (err: any) {
      console.error('Error generating for Bolt:', err);
      setError(err.message || 'Fehler bei der Code-Generierung');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const previewUrl = generatedWebsite
    ? `${generatedWebsite.published_url}?token=${generatedWebsite.accessToken}`
    : '';

  return (
    <div className="space-y-4">
      {!generatedWebsite && !showPrompt && !showDeploymentPackage && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Rocket className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-orange-300 mb-1">⚡ NEU: Automatisierte Code-Generierung</p>
                <p className="text-gray-300">
                  Generiert fertigen React-Code mit allen Dateien, basierend auf der Demo und Checkliste.
                  Einfach in neues Bolt-Projekt kopieren!
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateForBolt}
            disabled={isGenerating}
            className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 disabled:from-gray-500 disabled:to-gray-600 text-black font-bold rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generiere Code...</span>
              </>
            ) : (
              <>
                <Package className="w-5 h-5" />
                <span>🚀 Code für Bolt generieren (EMPFOHLEN)</span>
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-black text-gray-500">Alternative Methoden</span>
            </div>
          </div>

          <button
            onClick={handleGenerateDeploymentPackage}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
          >
            <Rocket className="w-5 h-5" />
            <span>Deployment Package (Manuell)</span>
          </button>

          <button
            onClick={handleGeneratePrompt}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>AI Prompt generieren</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold rounded-lg transition-all flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generiere Website...</span>
              </>
            ) : (
              <>
                <Globe className="w-5 h-5" />
                <span>Website generieren (Legacy)</span>
              </>
            )}
          </button>
        </div>
      )}

      {showDeploymentPackage && deploymentPackage && (
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Rocket className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="font-semibold text-lg">Deployment Package bereit!</h3>
                <p className="text-sm text-gray-400">
                  Kopiere diesen Guide und folge den Schritten im neuen Bolt Projekt
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeploymentPackage(false)}
              className="text-gray-400 hover:text-white"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-black/40 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-blue-400">Vollständiger Deployment Guide</span>
              <button
                onClick={() => copyToClipboard(deploymentPackage)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold text-sm flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>{copySuccess ? 'Kopiert!' : 'Guide kopieren'}</span>
              </button>
            </div>
            <pre className="text-xs text-gray-300 overflow-auto max-h-96 whitespace-pre-wrap font-mono bg-black/60 p-4 rounded">
{deploymentPackage}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-center">
              <Package className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-semibold">Schritt 1</div>
              <div className="text-xs text-gray-400">Guide kopieren</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-center">
              <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-semibold">Schritt 2</div>
              <div className="text-xs text-gray-400">Neues Bolt Projekt</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-center">
              <Rocket className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-semibold">Schritt 3</div>
              <div className="text-xs text-gray-400">Guide ausführen</div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">SCHNELLER WORKFLOW:</strong>
              <br />
              1. Kopiere den kompletten Guide oben
              <br />
              2. Öffne ein neues Bolt Projekt (bolt.new)
              <br />
              3. Folge den Anweisungen im Guide Schritt für Schritt
              <br />
              4. Alle Codes aus den bestehenden Demo-Dateien werden kopiert
              <br />
              5. Kundendaten werden automatisch durch Suchen & Ersetzen eingefügt
              <br />
              <br />
              <strong>Geschätzte Zeit: 15-20 Minuten</strong>
            </p>
          </div>
        </div>
      )}

      {showPrompt && generatedPrompt && (
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-semibold text-lg">Prompt erfolgreich generiert!</h3>
                <p className="text-sm text-gray-400">
                  {getPromptSummary(checklist, checklist.demo_name)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-gray-400 hover:text-white"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-black/40 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-purple-400">System Prompt</span>
                <button
                  onClick={() => copyToClipboard(generatedPrompt.systemPrompt)}
                  className="text-xs px-2 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded"
                >
                  Kopieren
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-auto max-h-40 whitespace-pre-wrap">
                {generatedPrompt.systemPrompt}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(generatedPrompt.componentPrompts).map(([name, prompt]) => (
                <button
                  key={name}
                  onClick={() => copyToClipboard(prompt as string)}
                  className="px-3 py-2 bg-black/40 hover:bg-black/60 rounded text-left text-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{name}</span>
                    <FileText className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-500">Klicken zum Kopieren</span>
                </button>
              ))}
            </div>

            <div className="bg-black/40 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-purple-400">Vollständiger Prompt</span>
                <button
                  onClick={() => copyToClipboard(generatedPrompt.fullPrompt)}
                  className="text-xs px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded font-semibold"
                >
                  Gesamten Prompt kopieren
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-auto max-h-60 whitespace-pre-wrap">
                {generatedPrompt.fullPrompt}
              </pre>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
            <p className="text-sm text-gray-300">
              <strong>Nächste Schritte:</strong>
              <br />
              1. Kopiere den vollständigen Prompt oder einzelne Komponenten-Prompts
              <br />
              2. Verwende Claude oder einen anderen AI-Assistenten zur Code-Generierung
              <br />
              3. Füge den generierten Code in die entsprechenden Dateien ein
              <br />
              4. Teste und passe die Website nach Bedarf an
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-400">Fehler</p>
              <p className="text-sm text-gray-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {generatedWebsite && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="font-semibold text-lg">Website erfolgreich generiert!</h3>
              <p className="text-sm text-gray-400">
                Status: {generatedWebsite.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
              </p>
            </div>
          </div>

          <div className="bg-black/40 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Preview-URL:</span>
              <button
                onClick={() => copyToClipboard(previewUrl)}
                className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded flex items-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copySuccess ? 'Kopiert!' : 'Kopieren'}</span>
              </button>
            </div>
            <div className="bg-black/60 rounded px-3 py-2 font-mono text-xs break-all">
              {previewUrl}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => window.open(previewUrl, '_blank')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Vorschau</span>
            </button>

            {generatedWebsite.status !== 'published' && (
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>Veröffentlichen</span>
              </button>
            )}

            <button
              onClick={handleDownloadZip}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>ZIP Download</span>
            </button>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
            <p className="text-sm text-gray-300">
              <strong>Hinweis:</strong> Der Preview-Link enthält einen Zugangscode und ist 90 Tage gültig.
              Nach der Veröffentlichung ist die Website auch ohne Code erreichbar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
