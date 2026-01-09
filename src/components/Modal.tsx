import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // This would be triggered by clicking "Details ansehen" on cards
  // For now, keeping it as a reusable component structure

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-white/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-montserrat font-bold">Gebäudereinigung Pro</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="aspect-video bg-gradient-to-br from-green-500/30 to-orange-500/20 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Template-Vorschau</p>
              <p className="text-gray-400">Professionelle Website für Gebäudereinigung</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {["Template", "Responsive", "SEO-Ready", "48h"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-pink-400/20 text-pink-400 text-sm rounded-full border border-pink-400/30"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-gray-400 mb-6 leading-relaxed">
            Professionelle Website-Lösung für Gebäudereinigungsunternehmen mit Vorher/Nachher-Galerie, 
            Online-Terminbuchung und integriertem Bewertungssystem. Optimiert für lokale SEO und mobile Geräte.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded transition-all duration-200 flex items-center justify-center space-x-2 group">
              <span>Loslegen</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 border border-green-400 text-green-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-400 hover:text-white transition-all duration-200 rounded font-medium">
              Mehr erfahren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;