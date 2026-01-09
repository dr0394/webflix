import React, { useState } from 'react';
import { X, Eye, Info, CheckCircle, TrendingUp, Users, Heart, Star, Zap, ShoppingCart, MessageCircle, Home } from 'lucide-react';

interface Section {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  psychologyTitle: string;
  psychologyExplanation: string;
  salesPrinciple: string;
  impact: string;
}

interface DemoFrameProps {
  children: React.ReactNode;
  demoName: string;
  sections: Section[];
  onClose?: () => void;
}

export default function DemoFrame({ children, demoName, sections, onClose }: DemoFrameProps) {
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const sidePanelRef = React.useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Remove previous highlight
      document.querySelectorAll('.section-highlight').forEach(el => {
        el.classList.remove('section-highlight');
      });

      // Add highlight to current section
      element.classList.add('section-highlight');
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Remove highlight after 3 seconds
      setTimeout(() => {
        element.classList.remove('section-highlight');
      }, 3000);
    }
  };

  const handleSectionSelect = (section: Section) => {
    setSelectedSection(section);
    scrollToSection(section.id);

    // Scroll side panel to top to show explanation
    if (sidePanelRef.current) {
      sidePanelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#111111]">
      {/* Top Bar - Webflix Branding */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500/95 via-emerald-500/95 to-green-500/95 backdrop-blur-xl border-b border-green-400/30 shadow-2xl">
        <div className="w-full px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Webflix Badge */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/20 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-sm">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-white font-bold text-xs sm:text-sm whitespace-nowrap">Webflix</span>
              </div>
              <div className="hidden md:block text-white/90 text-xs sm:text-sm font-medium truncate max-w-[150px] lg:max-w-none">
                {demoName}
              </div>
            </div>

            {/* Center: Quick Actions - Desktop only */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setShowInfoPanel(!showInfoPanel)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  showInfoPanel
                    ? 'bg-white text-green-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Info className="w-4 h-4" />
                <span className="hidden xl:inline">Verkaufspsychologie</span>
                <span className="xl:hidden">Info</span>
              </button>
            </div>

            {/* Right: CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => window.location.href = '/'}
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Zur Startseite</span>
                <span className="md:hidden">Home</span>
              </button>
              <button
                onClick={() => window.location.href = '/shop'}
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-white/90 text-green-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap"
              >
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Website kaufen</span>
                <span className="md:hidden">Kaufen</span>
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all duration-300"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden mt-2 flex gap-2">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center gap-1.5 bg-white/20 text-white px-3 py-2 rounded-lg font-bold text-xs transition-all duration-300"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Home</span>
            </button>
            <button
              onClick={() => setShowInfoPanel(!showInfoPanel)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ${
                showInfoPanel
                  ? 'bg-white text-green-600'
                  : 'bg-white/20 text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Verkaufspsychologie</span>
              <span className="xs:hidden">Info</span>
            </button>
            <button
              onClick={() => window.location.href = '/shop'}
              className="sm:hidden flex-1 flex items-center justify-center gap-2 bg-white text-green-600 px-3 py-2 rounded-lg font-bold text-xs transition-all duration-300"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Kaufen
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile - Close panel when clicking outside */}
      {showInfoPanel && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          style={{ top: '104px' }}
          onClick={() => setShowInfoPanel(false)}
        />
      )}

      {/* Side Panel - Psychology Explanations */}
      <div
        ref={sidePanelRef}
        className={`fixed right-0 bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] border-l border-green-400/20 shadow-2xl transform transition-transform duration-300 z-40 overflow-y-auto
          top-[104px] h-[calc(100vh-104px)]
          lg:top-[64px] lg:h-[calc(100vh-64px)]
          w-full sm:w-[90vw] md:w-[500px] lg:w-[400px] xl:w-[450px]
          ${showInfoPanel ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Detailed Explanation - MOVED TO TOP */}
          {selectedSection && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-400/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <selectedSection.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                <h4 className="text-base sm:text-lg font-black text-white">{selectedSection.name}</h4>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Psychology Title */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-green-300">Psychologisches Prinzip</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {selectedSection.psychologyTitle}
                  </p>
                </div>

                {/* Explanation */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-green-300">Wie es funktioniert</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {selectedSection.psychologyExplanation}
                  </p>
                </div>

                {/* Sales Principle */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-green-300">Verkaufsprinzip</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {selectedSection.salesPrinciple}
                  </p>
                </div>

                {/* Impact */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-green-300">Erwarteter Effekt</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {selectedSection.impact}
                  </p>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-400/20">
                <button
                  onClick={() => scrollToSection(selectedSection.id)}
                  className="w-full py-2 sm:py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Zur Section springen
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">Verkaufspsychologie</h3>
            </div>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Jede Section dieser Demo ist strategisch platziert, um den Kunden durch eine verkaufspsychologisch optimierte Reise zu führen.
            </p>
          </div>

          {/* Sections List */}
          <div className="space-y-2 sm:space-y-3">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionSelect(section)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                    selectedSection?.id === section.id
                      ? 'bg-green-500/20 border-green-400/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-400/30'
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                      selectedSection?.id === section.id
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 text-green-400'
                    }`}>
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <span className="text-xs font-bold text-green-400">#{index + 1}</span>
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">{section.name}</h4>
                      </div>
                      <p className="text-xs text-white/60 line-clamp-2">{section.psychologyTitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Overall Strategy */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 lg:p-5 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              <h4 className="text-sm sm:text-base font-black text-white">Gesamt-Strategie</h4>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-2 sm:mb-3">
              Diese Demo folgt dem <span className="text-green-400 font-bold">AIDA-Modell</span>:
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold flex-shrink-0">A</span>
                <span><span className="font-bold text-white">Attention</span> - Hero Section zieht Aufmerksamkeit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold flex-shrink-0">I</span>
                <span><span className="font-bold text-white">Interest</span> - Features wecken Interesse</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold flex-shrink-0">D</span>
                <span><span className="font-bold text-white">Desire</span> - Vorher/Nachher erzeugt Verlangen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold flex-shrink-0">A</span>
                <span><span className="font-bold text-white">Action</span> - CTA-Buttons führen zur Handlung</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className={`transition-all duration-300 pt-[104px] lg:pt-[64px] ${
        showInfoPanel ? 'lg:mr-[400px] xl:mr-[450px]' : ''
      }`}>
        <div className="w-full max-w-[1920px] mx-auto">
          {children}
        </div>
      </div>

      {/* Bottom Bar - Mobile CTA - Hidden when panel is open */}
      {!showInfoPanel && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 p-3 border-t border-green-400/30 shadow-2xl">
          <button
            onClick={() => window.location.href = '/shop'}
            className="w-full bg-white hover:bg-white/90 text-green-600 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Website kaufen
          </button>
        </div>
      )}

      {/* Section Indicators */}
      {showInfoPanel && (
        <div className="hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 z-30 space-y-2">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionSelect(section)}
                className={`group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedSection?.id === section.id
                    ? 'bg-green-500 text-white scale-110'
                    : 'bg-white/10 text-green-400 hover:bg-white/20'
                }`}
                title={section.name}
              >
                <IconComponent className="w-4 h-4" />

                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-3 py-2 bg-[#0a0a0a] border border-green-400/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  <div className="text-xs font-bold text-white">{section.name}</div>
                  <div className="text-xs text-white/60 mt-1">#{index + 1}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Global Styles for Section Highlighting */}
      <style>{`
        .section-highlight {
          position: relative;
          animation: pulse-border 2s ease-in-out;
        }

        .section-highlight::before {
          content: '';
          position: absolute;
          inset: -4px;
          border: 3px solid rgb(34, 197, 94);
          border-radius: 12px;
          pointer-events: none;
          animation: pulse-glow 2s ease-in-out;
          z-index: 50;
        }

        @keyframes pulse-border {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.01);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.8);
          }
        }
      `}</style>
    </div>
  );
}
