import React, { useState } from 'react';
import { Car, Sparkles, Clock, Euro, ArrowRight, CheckCircle, Star, Zap, Shield, Heart } from 'lucide-react';

interface ConfiguratorStep {
  id: string;
  question: string;
  options: ConfiguratorOption[];
}

interface ConfiguratorOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<any>;
  points: number;
}

interface CleaningPackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  price: string;
  duration: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  minPoints: number;
  maxPoints: number;
}

const CleaningConfigurator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const steps: ConfiguratorStep[] = [
    {
      id: 'vehicle_type',
      question: 'Welchen Fahrzeugtyp haben Sie?',
      options: [
        { id: 'kleinwagen', label: 'Kleinwagen', description: 'Kompakt und wendig', icon: Car, points: 1 },
        { id: 'mittelklasse', label: 'Mittelklasse', description: 'Komfort und Stil', icon: Car, points: 2 },
        { id: 'suv', label: 'SUV/Geländewagen', description: 'Robust und geräumig', icon: Car, points: 3 },
        { id: 'luxus', label: 'Luxusfahrzeug', description: 'Premium und exklusiv', icon: Star, points: 4 },
        { id: 'transporter', label: 'Transporter/Van', description: 'Nutzfahrzeug', icon: Car, points: 3 }
      ]
    },
    {
      id: 'condition',
      question: 'Wie ist der aktuelle Zustand Ihres Fahrzeugs?',
      options: [
        { id: 'sehr_sauber', label: 'Sehr sauber', description: 'Regelmäßig gepflegt', icon: Sparkles, points: 1 },
        { id: 'leicht_verschmutzt', label: 'Leicht verschmutzt', description: 'Normale Nutzungsspuren', icon: Car, points: 2 },
        { id: 'stark_verschmutzt', label: 'Stark verschmutzt', description: 'Längere Zeit nicht gereinigt', icon: Shield, points: 3 },
        { id: 'sehr_verschmutzt', label: 'Sehr stark verschmutzt', description: 'Intensive Reinigung nötig', icon: Zap, points: 4 }
      ]
    },
    {
      id: 'usage',
      question: 'Wie nutzen Sie Ihr Fahrzeug hauptsächlich?',
      options: [
        { id: 'gelegentlich', label: 'Gelegentlich', description: 'Wenige Kilometer pro Jahr', icon: Clock, points: 1 },
        { id: 'taglich', label: 'Täglich', description: 'Beruf und Alltag', icon: Car, points: 2 },
        { id: 'vielfahrer', label: 'Vielfahrer', description: 'Hohe Kilometerleistung', icon: Zap, points: 3 },
        { id: 'gewerblich', label: 'Gewerblich', description: 'Geschäftliche Nutzung', icon: Star, points: 4 }
      ]
    },
    {
      id: 'priorities',
      question: 'Was ist Ihnen am wichtigsten?',
      options: [
        { id: 'preis', label: 'Günstiger Preis', description: 'Beste Preis-Leistung', icon: Euro, points: 1 },
        { id: 'qualitat', label: 'Höchste Qualität', description: 'Premium-Ergebnis', icon: Star, points: 4 },
        { id: 'zeit', label: 'Schnelle Abwicklung', description: 'Zeitsparend', icon: Clock, points: 2 },
        { id: 'umwelt', label: 'Umweltfreundlich', description: 'Nachhaltige Produkte', icon: Heart, points: 3 }
      ]
    },
    {
      id: 'frequency',
      question: 'Wie oft möchten Sie Ihr Fahrzeug reinigen lassen?',
      options: [
        { id: 'einmalig', label: 'Einmalig', description: 'Nur dieses eine Mal', icon: Car, points: 1 },
        { id: 'gelegentlich', label: 'Gelegentlich', description: '2-3 Mal pro Jahr', icon: Clock, points: 2 },
        { id: 'regelmaessig', label: 'Regelmäßig', description: 'Monatlich', icon: Sparkles, points: 3 },
        { id: 'haufig', label: 'Häufig', description: 'Wöchentlich/Bi-weekly', icon: Star, points: 4 }
      ]
    }
  ];

  const packages: CleaningPackage[] = [
    {
      id: 'basic',
      name: 'Basis-Reinigung',
      description: 'Perfekt für den schnellen Frische-Kick',
      services: ['Außenwäsche', 'Felgenreinigung', 'Scheiben innen/außen', 'Staubsaugen'],
      price: 'ab 29,90€',
      duration: '45 Min',
      icon: Car,
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      minPoints: 4,
      maxPoints: 8
    },
    {
      id: 'comfort',
      name: 'Komfort-Reinigung',
      description: 'Die ideale Lösung für regelmäßige Pflege',
      services: ['Außenwäsche', 'Innenraumreinigung', 'Felgenpflege', 'Kunststoffpflege', 'Scheiben-Versiegelung'],
      price: 'ab 45€',
      duration: '90 Min',
      icon: Sparkles,
      color: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
      minPoints: 9,
      maxPoints: 14
    },
    {
      id: 'premium',
      name: 'Premium-Aufbereitung',
      description: 'Vollständige Fahrzeugaufbereitung auf höchstem Niveau',
      services: ['Komplette Außenaufbereitung', 'Tiefenreinigung Innenraum', 'Polieren & Versiegeln', 'Lederpflege', 'Motorwäsche', 'Langzeitschutz'],
      price: 'ab 85€',
      duration: '3 Std',
      icon: Star,
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
      minPoints: 15,
      maxPoints: 20
    }
  ];

  const calculatePoints = (): number => {
    return Object.values(answers).reduce((total, answerId) => {
      for (const step of steps) {
        const option = step.options.find(opt => opt.id === answerId);
        if (option) {
          total += option.points;
        }
      }
      return total;
    }, 0);
  };

  const getRecommendedPackage = (): CleaningPackage => {
    const points = calculatePoints();
    return packages.find(pkg => points >= pkg.minPoints && points <= pkg.maxPoints) || packages[1];
  };

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: optionId };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetConfigurator = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const recommendedPackage = getRecommendedPackage();
    const totalPoints = calculatePoints();

    return (
      <section className="py-24 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
              <CheckCircle className="w-10 h-10 text-slate-700 relative z-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-poppins">
              Ihre perfekte Autoreinigung
            </h2>
            <p className="text-xl text-slate-600 font-montserrat">
              Basierend auf Ihren Angaben empfehlen wir Ihnen:
            </p>
          </div>

          {/* Recommended Package */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-silver-xl p-8 md:p-12 border border-white/50 relative overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${recommendedPackage.gradient} flex items-center justify-center shadow-silver-lg`}>
                  <recommendedPackage.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-slate-900 mb-2 font-poppins">
                  {recommendedPackage.name}
                </h3>
                <p className="text-lg text-slate-600 mb-4 font-montserrat">
                  {recommendedPackage.description}
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4" />
                    <span>{recommendedPackage.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{recommendedPackage.duration}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4 font-poppins">
                    Enthaltene Leistungen:
                  </h4>
                  <ul className="space-y-2">
                    {recommendedPackage.services.map((service, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-montserrat">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50/80 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4 font-poppins">
                    Warum diese Empfehlung?
                  </h4>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Perfekt abgestimmt auf Ihre Bedürfnisse</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Optimales Preis-Leistungs-Verhältnis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Passend zu Ihrem Fahrzeugtyp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Berücksichtigt Ihre Prioritäten</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/configurator'}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-metallic text-slate-700 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-silver-lg hover:shadow-silver-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                  <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
                  <span className="relative z-10 mr-3">Website kaufen</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button
                  onClick={() => window.open('https://wa.me/491751194624?text=Ja%2C%20ich%20habe%20Interesse%20meine%20eigene%20Website%20f%C3%BCr%20399%E2%82%AC%20zu%20bekommen.%20Bitte%20kontaktieren%20Sie%20mich%20f%C3%BCr%20weitere%20Informationen.', '_blank')}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300"
                >
                  Weitere Infos per WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Other Packages */}
          <div className="grid md:grid-cols-3 gap-6">
            {packages.filter(pkg => pkg.id !== recommendedPackage.id).map((pkg) => (
              <div key={pkg.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/80 transition-all duration-300">
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${pkg.gradient} flex items-center justify-center`}>
                    <pkg.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-poppins">{pkg.name}</h4>
                  <p className="text-sm text-slate-600 font-montserrat">{pkg.description}</p>
                </div>
                <div className="text-center text-sm text-slate-500 mb-4">
                  <span>{pkg.price} • {pkg.duration}</span>
                </div>
                <button
                  onClick={() => window.open('https://wa.me/491751194624?text=Ja%2C%20ich%20habe%20Interesse%20meine%20eigene%20Website%20f%C3%BCr%20399%E2%82%AC%20zu%20bekommen.%20Bitte%20kontaktieren%20Sie%20mich%20f%C3%BCr%20weitere%20Informationen.', '_blank')}
                  className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                >
                  Website anfragen
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <section className="py-24 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
            <Sparkles className="w-8 h-8 text-slate-700 relative z-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-poppins">
            Welche Autoreinigung brauchen Sie?
          </h2>
          <p className="text-xl text-slate-600 font-montserrat">
            Beantworten Sie 5 kurze Fragen für Ihre persönliche Empfehlung
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-silver-xl p-8 md:p-12 border border-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
          
          <div className="relative z-10">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-600">
                  Frage {currentStep + 1} von {steps.length}
                </span>
                <span className="text-sm font-medium text-slate-600">
                  {Math.round(progress)}% abgeschlossen
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-2 bg-gradient-metallic rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-poppins">
                {currentStepData.question}
              </h3>
            </div>

            {/* Options */}
            <div className="grid gap-4">
              {currentStepData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="group relative p-6 rounded-2xl border-2 border-slate-200 text-left transition-all duration-300 hover:border-slate-400 hover:shadow-silver-lg hover:scale-[1.02] bg-white/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-20 animate-shimmer"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    {option.icon && (
                      <div className="w-12 h-12 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                        <option.icon className="w-6 h-6 text-slate-700" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-1 font-poppins">
                        {option.label}
                      </h4>
                      {option.description && (
                        <p className="text-sm text-slate-600 font-montserrat">
                          {option.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>

            {/* Back Button */} 
            {currentStep > 0 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  ← Zurück zur vorherigen Frage
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningConfigurator;