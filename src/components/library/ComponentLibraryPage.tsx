import React, { useState, useEffect } from 'react';
import { Package, Code, Eye, Copy, Check, Download, Grid3x3, List, Search, Filter, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getDemoTemplates, syncTemplatesAndComponents } from '../../lib/componentScanner';

interface DemoTemplate {
  id: string;
  name: string;
  display_name: string;
  industry: string;
  description: string;
  demo_url: string;
  base_path: string;
}

interface DemoComponent {
  id: string;
  template_id: string;
  name: string;
  display_name: string;
  file_path: string;
  source_code: string;
  component_type: string;
  description: string;
  dependencies: any;
  tags: string[];
  order_index: number;
}

export default function ComponentLibraryPage() {
  const [templates, setTemplates] = useState<DemoTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<DemoTemplate | null>(null);
  const [components, setComponents] = useState<DemoComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<DemoComponent | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      loadComponents(selectedTemplate.id);
    }
  }, [selectedTemplate]);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('demo_templates')
        .select('*')
        .order('display_name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadComponents = async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from('demo_components')
        .select('*')
        .eq('template_id', templateId)
        .order('order_index');

      if (error) throw error;

      const componentsWithCode = await Promise.all(
        (data || []).map(async (comp) => {
          if (!comp.source_code || comp.source_code === '') {
            const code = await loadComponentSourceCode(comp.file_path);
            return { ...comp, source_code: code };
          }
          return comp;
        })
      );

      setComponents(componentsWithCode);
    } catch (error) {
      console.error('Error loading components:', error);
    }
  };

  const loadComponentSourceCode = async (filePath: string): Promise<string> => {
    try {
      const response = await fetch(`/${filePath}`);
      if (!response.ok) {
        return `// Konnte Code nicht laden von: ${filePath}\n// Versuche die Datei manuell zu öffnen im Projekt`;
      }
      const code = await response.text();
      return code;
    } catch (error) {
      console.error('Error loading source code:', error);
      return `// Fehler beim Laden: ${error}\n// Pfad: ${filePath}`;
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncTemplatesAndComponents();
      await loadTemplates();
      if (selectedTemplate) {
        await loadComponents(selectedTemplate.id);
      }
      alert('✓ Templates und Components erfolgreich synchronisiert!');
    } catch (error) {
      console.error('Error syncing:', error);
      alert('Fehler beim Synchronisieren');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadComponent = (component: DemoComponent) => {
    const blob = new Blob([component.source_code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${component.name}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredComponents = components.filter(comp => {
    const matchesSearch = comp.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || comp.component_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const componentTypes = ['all', ...Array.from(new Set(components.map(c => c.component_type)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-[2000px] mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Component Library
              </h1>
              <p className="text-gray-400">
                Durchsuche alle Demo-Components und exportiere Code
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Synchronisiere...' : 'Sync Templates'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  Templates
                </h2>
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setSelectedComponent(null);
                      }}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'bg-blue-500/20 border-2 border-blue-400'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-semibold mb-1">{template.display_name}</div>
                      <div className="text-xs text-gray-400">{template.industry}</div>
                      <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {selectedTemplate ? (
                <div className="space-y-4">
                  <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">{selectedTemplate.display_name}</h2>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Suche Components..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400"
                        >
                          {componentTypes.map(type => (
                            <option key={type} value={type}>
                              {type === 'all' ? 'Alle Typen' : type}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-1 bg-black/40 border border-white/10 rounded-lg p-1">
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
                          >
                            <Grid3x3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
                          >
                            <List className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
                      {filteredComponents.map(component => (
                        <button
                          key={component.id}
                          onClick={() => setSelectedComponent(component)}
                          className={`text-left p-4 rounded-lg border transition-all ${
                            selectedComponent?.id === component.id
                              ? 'bg-purple-500/20 border-purple-400'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-semibold text-lg">{component.display_name}</div>
                            <Package className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="text-sm text-gray-400 mb-2">{component.name}</div>
                          <div className="flex flex-wrap gap-1">
                            {component.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>

                    {filteredComponents.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Keine Components gefunden</p>
                      </div>
                    )}
                  </div>

                  {selectedComponent && (
                    <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{selectedComponent.display_name}</h3>
                          <p className="text-sm text-gray-400">{selectedComponent.file_path}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownloadComponent(selectedComponent)}
                            className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 text-green-300 rounded-lg flex items-center gap-2 transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button
                            onClick={() => handleCopyCode(selectedComponent.source_code)}
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 text-blue-300 rounded-lg flex items-center gap-2 transition-all"
                          >
                            {copiedCode ? (
                              <>
                                <Check className="w-4 h-4" />
                                Kopiert!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Code kopieren
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="bg-black/60 rounded-lg p-4 border border-white/10 max-h-[600px] overflow-auto">
                        {selectedComponent.source_code && selectedComponent.source_code !== '' ? (
                          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                            <code>{selectedComponent.source_code}</code>
                          </pre>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="mb-2">Code noch nicht geladen</p>
                            <p className="text-sm">Datei: {selectedComponent.file_path}</p>
                            <p className="text-xs mt-2 text-gray-600">Wird automatisch beim Auswählen geladen</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center">
                  <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Wähle ein Template</h3>
                  <p className="text-gray-400">Wähle links ein Template aus, um die Components zu sehen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
