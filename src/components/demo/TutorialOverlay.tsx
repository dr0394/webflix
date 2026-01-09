import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Lightbulb, MousePointer, Check, Eye } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  targetSelector?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  highlightSection?: string;
}

interface TutorialOverlayProps {
  onComplete: () => void;
  onSkip: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const tutorialSteps: TutorialStep[] = [
    {
      title: 'Willkommen zum Website-Editor!',
      description: 'Wir zeigen Ihnen in wenigen Schritten, wie Sie Ihre Website personalisieren können. Das Tutorial dauert nur 1 Minute.',
      position: 'center'
    },
    {
      title: 'Editierbare Texte erkennen',
      description: 'Alle Texte mit einem goldenen Rahmen können Sie bearbeiten. Bewegen Sie die Maus über einen Text, um das Bearbeiten-Symbol zu sehen.',
      targetSelector: '[data-editable="hero_h1"]',
      position: 'bottom',
      highlightSection: 'hero'
    },
    {
      title: 'Text bearbeiten',
      description: 'Klicken Sie auf einen Text mit goldenem Rahmen. Es öffnet sich ein Editor, in dem Sie den Text ändern können.',
      targetSelector: '[data-editable="hero_h2"]',
      position: 'bottom',
      highlightSection: 'hero'
    },
    {
      title: 'Ihre Kontaktdaten',
      description: 'Scrollen Sie nach unten und bearbeiten Sie Ihre Kontaktdaten: Adresse, Telefon und E-Mail.',
      targetSelector: '[data-editable="contact_address"]',
      position: 'top',
      highlightSection: 'contact'
    },
    {
      title: 'Header & Footer anpassen',
      description: 'Vergessen Sie nicht, Ihren Firmennamen im Header (oben) und Footer (unten) anzupassen.',
      targetSelector: '[data-editable="header_logo"]',
      position: 'bottom',
      highlightSection: 'header'
    },
    {
      title: 'Checkliste nutzen',
      description: 'Nutzen Sie die Checkliste (oben rechts), um alle Felder zu sehen und nichts zu vergessen. Der Fortschrittsbalken zeigt Ihren Status.',
      position: 'center'
    },
    {
      title: 'Was bleibt unverändert?',
      description: '✓ Bilder & Galerie\n✓ Bewertungen & Testimonials\n✓ Before/After Slider\n✓ Design & Animationen\n\nNur Texte sind editierbar!',
      position: 'center'
    },
    {
      title: 'Bereit zum Starten!',
      description: 'Klicken Sie auf beliebige Texte mit goldenem Rahmen und passen Sie Ihre Website an. Viel Erfolg!',
      position: 'center'
    }
  ];

  useEffect(() => {
    const step = tutorialSteps[currentStep];
    if (step.targetSelector) {
      const element = document.querySelector(step.targetSelector) as HTMLElement;
      if (element) {
        setHighlightedElement(element);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setHighlightedElement(null);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <>
      {/* Overlay Background */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-opacity">
        {/* Spotlight Effect on Highlighted Element */}
        {highlightedElement && (
          <div
            className="absolute pointer-events-none transition-all duration-500"
            style={{
              top: highlightedElement.getBoundingClientRect().top - 10,
              left: highlightedElement.getBoundingClientRect().left - 10,
              width: highlightedElement.getBoundingClientRect().width + 20,
              height: highlightedElement.getBoundingClientRect().height + 20,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.8), 0 0 30px 10px rgba(203, 170, 110, 0.5)',
              borderRadius: '12px',
              border: '3px solid orange-500',
              animation: 'pulse 2s infinite'
            }}
          />
        )}
      </div>

      {/* Tutorial Card */}
      <div className="fixed z-[101] max-w-2xl w-full mx-auto" style={{
        top: step.position === 'top' ? '20px' : step.position === 'bottom' ? 'auto' : '50%',
        bottom: step.position === 'bottom' ? '20px' : 'auto',
        left: '50%',
        transform: step.position === 'center' ? 'translate(-50%, -50%)' : 'translateX(-50%)'
      }}>
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-[orange-500] rounded-2xl shadow-2xl p-8 mx-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[orange-500] to-[pink-400] flex items-center justify-center">
                {currentStep === tutorialSteps.length - 1 ? (
                  <Check className="w-6 h-6 text-black" />
                ) : (
                  <Lightbulb className="w-6 h-6 text-black" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                <p className="text-sm text-gray-400">Schritt {currentStep + 1} von {tutorialSteps.length}</p>
              </div>
            </div>
            <button
              onClick={onSkip}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[orange-500] to-[pink-400] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {step.description}
            </p>

            {/* Visual Indicator */}
            {step.targetSelector && (
              <div className="mt-4 flex items-center gap-3 p-4 bg-[orange-500]/10 border border-[orange-500]/30 rounded-lg">
                <MousePointer className="w-5 h-5 text-[orange-500] flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  Dieser Bereich ist jetzt hervorgehoben
                </p>
              </div>
            )}

            {currentStep === tutorialSteps.length - 2 && (
              <div className="mt-6 p-5 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <Eye className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold mb-2">Wichtig zu wissen:</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>✓ Bilder bleiben Standard-Stockfotos</li>
                      <li>✓ Bewertungen sind Beispiel-Testimonials</li>
                      <li>✓ Design & Layout bleiben wie gezeigt</li>
                      <li>✓ Sie können später eigene Bilder hochladen</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Zurück
            </button>

            <div className="flex items-center gap-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-8 bg-[orange-500]'
                      : index < currentStep
                      ? 'w-2 bg-[orange-500]/50'
                      : 'w-2 bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-[orange-500] to-[pink-400] text-black font-bold rounded-lg hover:from-[orange-600] hover:to-[orange-500] transition-all flex items-center gap-2"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Jetzt starten!' : 'Weiter'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Skip Button */}
          <div className="mt-4 text-center">
            <button
              onClick={onSkip}
              className="text-sm text-gray-400 hover:text-white transition-colors underline"
            >
              Tutorial überspringen
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8), 0 0 30px 10px rgba(203, 170, 110, 0.5);
          }
          50% {
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8), 0 0 40px 15px rgba(203, 170, 110, 0.7);
          }
        }
      `}</style>
    </>
  );
};

export default TutorialOverlay;
