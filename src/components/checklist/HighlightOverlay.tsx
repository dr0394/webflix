import React from 'react';
import { Eye, Info } from 'lucide-react';

interface HighlightZone {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
  description: string;
}

interface HighlightOverlayProps {
  demoUrl: string;
  activeField?: string;
  highlightZones: HighlightZone[];
  isVisible: boolean;
}

export default function HighlightOverlay({
  demoUrl,
  activeField,
  highlightZones,
  isVisible
}: HighlightOverlayProps) {
  const activeZone = highlightZones.find(zone => zone.id === activeField);

  if (!isVisible) return null;

  return (
    <div className="sticky top-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-orange-500/30 overflow-hidden shadow-2xl">
      <div className="bg-gradient-to-r from-orange-500/20 to-pink-400/20 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white">Live Demo Vorschau</h3>
          </div>
          {activeZone && (
            <span className="text-sm text-orange-400 font-medium animate-pulse">
              {activeZone.label}
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full h-[600px] overflow-hidden">
        <iframe
          src={`${demoUrl}?preview=true`}
          className="w-full h-full border-0 scale-75 origin-top-left"
          style={{ width: '133.33%', height: '133.33%' }}
          title="Demo Preview"
        />

        {activeZone && (
          <>
            <div
              className="absolute bg-orange-500/10 backdrop-blur-sm border-4 border-orange-500 rounded-lg animate-pulse pointer-events-none z-10 transition-all duration-300"
              style={{
                top: activeZone.top,
                left: activeZone.left,
                width: activeZone.width,
                height: activeZone.height,
              }}
            >
              <div className="absolute -top-12 left-0 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm whitespace-nowrap flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>{activeZone.label}</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 z-20">
              <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 rounded-xl p-4">
                <p className="text-white text-sm leading-relaxed">
                  <span className="font-bold text-orange-400">Hinweis:</span> {activeZone.description}
                </p>
              </div>
            </div>
          </>
        )}

        {!activeZone && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none z-10">
            <div className="text-center">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">
                Klicken Sie auf ein Formularfeld, um den Bereich in der Demo zu sehen
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
