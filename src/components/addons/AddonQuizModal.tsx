import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  weight: number;
  explanation: string;
}

interface AddonQuizModalProps {
  addonName: string;
  questions: Question[];
  onClose: () => void;
}

export default function AddonQuizModal({ addonName, questions, onClose }: AddonQuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRecommendation = () => {
    let totalScore = 0;
    let maxScore = 0;

    answers.forEach((answer, index) => {
      const question = questions[index];
      const optionsCount = question.options.length;
      const weight = question.weight || 1;

      maxScore += (optionsCount - 1) * weight;
      totalScore += answer * weight;
    });

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    if (percentage >= 70) {
      return {
        recommendation: 'Ja, dieses Add-on ist perfekt für Sie!',
        reason: 'Basierend auf Ihren Antworten würden Sie erheblich von diesem Add-on profitieren.',
        color: 'from-green-500 to-emerald-500',
        score: Math.round(percentage)
      };
    } else if (percentage >= 40) {
      return {
        recommendation: 'Dieses Add-on könnte nützlich sein',
        reason: 'Einige Aspekte würden Ihnen helfen, aber es ist nicht zwingend erforderlich.',
        color: 'from-orange-500 to-yellow-500',
        score: Math.round(percentage)
      };
    } else {
      return {
        recommendation: 'Dieses Add-on ist momentan nicht notwendig',
        reason: 'Basierend auf Ihren aktuellen Bedürfnissen wäre dieses Add-on noch nicht optimal.',
        color: 'from-gray-500 to-gray-600',
        score: Math.round(percentage)
      };
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full relative border border-orange-500/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {!showResult ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Brauche ich das Add-on?</h2>
                    <p className="text-gray-400 text-sm">{addonName}</p>
                  </div>
                </div>

                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>Frage {currentStep + 1} von {questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">{currentQuestion.question}</h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        answers[currentStep] === index
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-gray-600 hover:border-gray-500 bg-[#222222]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          answers[currentStep] === index
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-600'
                        }`}>
                          {answers[currentStep] === index && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-gray-200">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Zurück
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={answers[currentStep] === undefined}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    answers[currentStep] !== undefined
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentStep < questions.length - 1 ? 'Weiter' : 'Ergebnis anzeigen'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${calculateRecommendation().color} flex items-center justify-center mx-auto mb-6`}>
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {calculateRecommendation().recommendation}
                </h2>
                <p className="text-gray-300 text-lg mb-4">
                  {calculateRecommendation().reason}
                </p>
                <div className="inline-block bg-white/10 rounded-full px-6 py-2">
                  <span className="text-white font-bold text-lg">Match: {calculateRecommendation().score}%</span>
                </div>
              </div>

              <div className="bg-[#222222] rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ihre Antworten:</h3>
                <div className="space-y-4">
                  {questions.map((q, index) => {
                    const isHighAnswer = answers[index] >= q.options.length - 2;
                    return (
                      <div key={q.id} className="border-l-2 border-orange-500 pl-4">
                        <p className="text-sm text-gray-400 mb-1">{q.question}</p>
                        <p className={`text-sm font-medium ${
                          isHighAnswer ? 'text-green-400' : 'text-orange-400'
                        }`}>
                          {q.options[answers[index]]}
                        </p>
                        {!isHighAnswer && q.explanation && (
                          <p className="text-xs text-gray-500 mt-1 italic">{q.explanation}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all"
                >
                  Schließen
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers([]);
                    setShowResult(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all"
                >
                  Erneut starten
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
