import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogOut, Save, Plus, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { Industry, Section } from '../types';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([]);
  const [pageId, setPageId] = useState<string>('');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [propsJson, setPropsJson] = useState<string>('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const ADMIN_PASSWORD = 'webflix_admin_2024';

  useEffect(() => {
    if (isAuthenticated) {
      loadIndustries();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedIndustry) {
      loadSections();
    }
  }, [selectedIndustry]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage({ type: 'success', text: 'Successfully logged in' });
    } else {
      setMessage({ type: 'error', text: 'Invalid password' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setSelectedIndustry('');
    setSections([]);
  };

  const loadIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .order('name');

      if (error) throw error;
      setIndustries(data || []);

      if (data && data.length > 0) {
        setSelectedIndustry(data[0].id);
      }
    } catch (error) {
      console.error('Error loading industries:', error);
      setMessage({ type: 'error', text: 'Failed to load industries' });
    }
  };

  const loadSections = async () => {
    if (!selectedIndustry) return;

    try {
      const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('industry_id', selectedIndustry)
        .eq('slug', 'home')
        .maybeSingle();

      if (pageError) throw pageError;

      if (page) {
        setPageId(page.id);

        const { data: sectionsData, error: sectionsError } = await supabase
          .from('sections')
          .select('*')
          .eq('page_id', page.id)
          .order('order');

        if (sectionsError) throw sectionsError;
        setSections(sectionsData || []);
      }
    } catch (error) {
      console.error('Error loading sections:', error);
      setMessage({ type: 'error', text: 'Failed to load sections' });
    }
  };

  const toggleVisibility = async (section: Section) => {
    try {
      const { error } = await supabase
        .from('sections')
        .update({ visible: !section.visible })
        .eq('id', section.id);

      if (error) throw error;

      setSections(prev =>
        prev.map(s => (s.id === section.id ? { ...s, visible: !s.visible } : s))
      );
      setMessage({ type: 'success', text: 'Visibility updated' });
    } catch (error) {
      console.error('Error updating visibility:', error);
      setMessage({ type: 'error', text: 'Failed to update visibility' });
    }
  };

  const deleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    try {
      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;

      setSections(prev => prev.filter(s => s.id !== sectionId));
      setMessage({ type: 'success', text: 'Section deleted' });
    } catch (error) {
      console.error('Error deleting section:', error);
      setMessage({ type: 'error', text: 'Failed to delete section' });
    }
  };

  const startEditing = (section: Section) => {
    setEditingSection(section.id);
    setPropsJson(JSON.stringify(section.props, null, 2));
  };

  const saveProps = async () => {
    if (!editingSection) return;

    try {
      const parsedProps = JSON.parse(propsJson);

      const { error } = await supabase
        .from('sections')
        .update({ props: parsedProps })
        .eq('id', editingSection);

      if (error) throw error;

      setSections(prev =>
        prev.map(s => (s.id === editingSection ? { ...s, props: parsedProps } : s))
      );
      setEditingSection(null);
      setPropsJson('');
      setMessage({ type: 'success', text: 'Props saved successfully' });
    } catch (error) {
      console.error('Error saving props:', error);
      setMessage({ type: 'error', text: 'Failed to save props. Check JSON syntax.' });
    }
  };

  const reorderSections = async (dragIndex: number, dropIndex: number) => {
    const reordered = [...sections];
    const [removed] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, removed);

    const updates = reordered.map((section, index) => ({
      id: section.id,
      order: index
    }));

    setSections(reordered);

    try {
      for (const update of updates) {
        await supabase
          .from('sections')
          .update({ order: update.order })
          .eq('id', update.id);
      }
      setMessage({ type: 'success', text: 'Order updated' });
    } catch (error) {
      console.error('Error reordering sections:', error);
      setMessage({ type: 'error', text: 'Failed to update order' });
      loadSections();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Webflix One Admin</h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Webflix One Admin</h1>

          <div className="flex items-center gap-4">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {industries.map(industry => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Sections</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage sections, visibility, and content for the selected industry
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div key={section.id} className="p-6">
                <div className="flex items-start gap-4">
                  <button
                    className="cursor-move mt-1 text-gray-400 hover:text-gray-600"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move';
                      e.dataTransfer.setData('text/plain', index.toString());
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                      reorderSections(dragIndex, index);
                    }}
                  >
                    <GripVertical className="w-5 h-5" />
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{section.key}</h3>
                        <p className="text-sm text-gray-500">Order: {section.order}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleVisibility(section)}
                          className={`p-2 rounded-lg transition-colors ${
                            section.visible
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={section.visible ? 'Hide section' : 'Show section'}
                        >
                          {section.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>

                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete section"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {editingSection === section.id ? (
                      <div className="space-y-4">
                        <textarea
                          value={propsJson}
                          onChange={(e) => setPropsJson(e.target.value)}
                          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter JSON props..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={saveProps}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingSection(null);
                              setPropsJson('');
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                          {JSON.stringify(section.props, null, 2)}
                        </pre>
                        <button
                          onClick={() => startEditing(section)}
                          className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Edit Props →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
