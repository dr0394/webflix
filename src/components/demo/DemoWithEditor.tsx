import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import InteractiveTutorial from './InteractiveTutorial';
import LivePreviewDemo from './LivePreviewDemo';

interface DemoWithEditorProps {
  demoType: string;
  demoComponent: React.ComponentType;
  demoName: string;
}

const DemoWithEditor: React.FC<DemoWithEditorProps> = ({
  demoType,
  demoComponent: DemoComponent,
  demoName
}) => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [useLivePreview, setUseLivePreview] = useState(true);

  const handleDataChange = (newData: Record<string, any>) => {
    setFormData(newData);
  };

  return (
    <div className="relative">
      {/* Interactive Tutorial */}
      {showTutorial && (
        <InteractiveTutorial
          demoType={demoType}
          demoName={demoName}
          onClose={() => setShowTutorial(false)}
          onDataChange={handleDataChange}
        />
      )}

      {/* Demo Content */}
      <div className="relative">
        {useLivePreview && showTutorial ? (
          <LivePreviewDemo formData={formData} demoType={demoType} />
        ) : (
          <DemoComponent />
        )}

        {/* Floating Edit Button */}
        {!showTutorial && (
          <button
            onClick={() => setShowTutorial(true)}
            className="fixed bottom-8 right-8 z-40 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-400 text-white font-semibold rounded-full shadow-2xl hover:shadow-pink-400/50 hover:scale-105 transition-all flex items-center gap-3"
          >
            <Edit className="w-5 h-5" />
            <span className="font-bold">Inhalte bearbeiten</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DemoWithEditor;
