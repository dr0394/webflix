import React, { useState, useEffect } from 'react';
import { X, Save, Type, Image, AlertCircle, Check } from 'lucide-react';

interface InlineEditorProps {
  elementId: string;
  currentValue: string;
  fieldType: 'text' | 'textarea' | 'image' | 'url';
  label: string;
  onSave: (value: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}

const InlineEditor: React.FC<InlineEditorProps> = ({
  elementId,
  currentValue,
  fieldType,
  label,
  onSave,
  onClose,
  position
}) => {
  const [value, setValue] = useState(currentValue);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSave(value);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed z-50 bg-white rounded-xl shadow-2xl border-2 border-[orange-500] w-96"
      style={{
        top: Math.min(position.y, window.innerHeight - 400),
        left: Math.min(position.x, window.innerWidth - 400),
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[orange-500] to-[pink-400] p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          {fieldType === 'image' ? (
            <Image className="w-5 h-5 text-black" />
          ) : (
            <Type className="w-5 h-5 text-black" />
          )}
          <h3 className="font-bold text-black">{label}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {fieldType === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[orange-500] focus:outline-none resize-none text-gray-900"
            rows={6}
            placeholder={`${label} eingeben...`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[orange-500] focus:outline-none text-gray-900"
            placeholder={`${label} eingeben...`}
          />
        )}

        {fieldType === 'image' && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Bildupload</p>
                <p>Bilder werden später über Google Drive hochgeladen. Notieren Sie hier eine Beschreibung.</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Check className="w-5 h-5" />
                Gespeichert!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Speichern
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};

export default InlineEditor;
