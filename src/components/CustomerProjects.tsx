import { useState } from 'react';
import { TrendingUp, Target, Award, CheckCircle2, ChevronDown } from 'lucide-react';

export default function CustomerProjects() {
  const [activeTab, setActiveTab] = useState<'webflix' | 'custom'>('webflix');
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleProject = (index: number) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const webflixProjects = [
    {
      title: 'DZ Autopflege',
      category: 'Autoaufbereitung',
      logo: 'https://i.imgur.com/od6vWRK.jpeg',
      link: 'https://dzautopflege.de',
      stats: [
        { label: '70% schnellere Bearbeitung', value: '+70%' },
        { label: '85% Kundenanfragen über Website', value: '+85%' },
        { label: '200 Google Bewertungen', value: '200+' }
      ],
      problem: 'Keine professionelle Online-Präsenz, Kunden mussten telefonisch anfragen, keine Möglichkeit Preise online zu kalkulieren',
      goal: 'Moderne Website mit Reinigungsübersicht für sofortige Preisberechnung und Terminbuchung',
      result: 'Webflix-Design mit interaktivem Fahrzeug-Konfigurator, Vorher-Nachher-Galerie und direkter WhatsApp-Integration'
    },
    {
      title: '',
      category: 'Autoaufbereitung',
      logo: 'https://lh3.googleusercontent.com/p/AF1QipObwGAC9MNVxS5hiF1TKlHz7FwjAi6xw9G6ug7B=s1360-w1360-h1020-rw',
      link: 'https://dtsautopflege.de',
      stats: [
        { label: 'Mehr Anfragen durch 24/7 Präsenz', value: '+65%' },
        { label: 'Schnellere Terminvergabe', value: '+80%' },
        { label: 'Höhere Conversion Rate', value: '+45%' }
      ],
      problem: 'Keine Notdienst-Präsenz online, potenzielle Kunden fanden keine schnelle Kontaktmöglichkeit',
      goal: '24/7 Notdienst-Website mit sofortiger Erreichbarkeit und Service-Übersicht',
      result: 'Webflix-Design mit prominentem Notdienst-Banner, Service-Grid und direkter Kontaktmöglichkeit'
    },
    {
      title: 'ProDetailingM',
      category: 'Autoaufbereitung',
      logo: 'https://i.imgur.com/SFvMioU.jpeg',
      link: 'https://prodetailingm.de',
      stats: [
        { label: 'Online Termine gebucht', value: '+90%' },
        { label: 'Neue Kunden gewonnen', value: '+120%' },
        { label: 'Zeitersparnis bei Verwaltung', value: '+60%' }
      ],
      problem: 'Terminvereinbarung nur telefonisch möglich, keine Online-Präsenz für neue Kunden',
      goal: 'Moderne Website mit Whatsapp-Terminbuchung und Service-Darstellung',
      result: 'Webflix-Design mit hoher Conversion Rate und detaillierter Service-Beschreibung'
    }
  ];

  const customProjects = [
    {
      title: 'Online Coaching System',
      category: 'Coaching-Plattform',
      logo: 'https://i.imgur.com/BhI75xX.png',
      link: 'https://www.coachisi.de',
      stats: [
        { label: 'Automatisierte Prozesse', value: '95%' },
        { label: 'Zeitersparnis pro Woche', value: '20h' },
        { label: 'Mehr Teilnehmer', value: '+150%' }
      ],
      problem: 'Manuelle Verwaltung aller Teilnehmer, keine automatisierte Email-Kommunikation, fehlende Lead-Generierung',
      goal: 'Vollständiges Online-System für Coaching-Business mit Dashboard und Automatisierung',
      result: 'Dashboard zur Verwaltung, Email-Automatisierung, Leadmagnet, generierte PDFs und mehr'
    },
    {
      title: 'Aesthetic Home',
      category: 'Beauty & Ästhetik',
      logo: 'https://aesthetic-home.de/wp-content/uploads/2019/10/logo_color_wide-1.png',
      link: 'https://aesthetic-home.de',
      stats: [
        { label: 'Tägliche Kundenanfragen', value: '100%' },
        { label: 'Buchungen online', value: '+200%' },
        { label: 'Conversion Rate', value: '+180%' }
      ],
      problem: 'Veraltete Website und keine Kundenanfragen trotz hochwertigem Angebot',
      goal: 'Neukundengewinnung durch moderne Online-Präsenz mit Buchungstool',
      result: 'Online-System mit Buchungstool und Tracking – täglich neue Kundenanfragen wie ein Magnet'
    },
    {
      title: 'DiNGDoO',
      category: 'Dienstleister-Plattform',
      logo: 'https://i.imgur.com/TaHBycH.png',
      link: 'https://www.dingdoo.de',
      stats: [
        { label: 'Registrierte Dienstleister', value: '500+' },
        { label: 'Erfolgreiche Matches', value: '2000+' },
        { label: 'Zufriedenheitsrate', value: '98%' }
      ],
      problem: 'Keine effiziente Vermittlung zwischen lokalen Kunden und Dienstleistern',
      goal: 'Intelligente Plattform für lokale Auftragsvermittlung mit starker Markenidentität',
      result: 'Vollständige Plattform mit extravaganten Branding, KI-Matching von Anbietern und Kunden'
    }
  ];

  const projects = activeTab === 'webflix' ? webflixProjects : customProjects;

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#111111] via-black to-[#111111] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="text-white/60 font-semibold text-sm">Erfolgsgeschichten</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Kundenprojekte
            </span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-4">
            Erfolgreiche Websites und Business Systeme für unsere Kunden
          </p>

          <div className="inline-flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 mt-8">
            <button
              onClick={() => setActiveTab('webflix')}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                activeTab === 'webflix'
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Webflix
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                activeTab === 'custom'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-pink-500/50'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              Webflix Custom
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            const isFirstProject = index === 0;
            const shouldShowFull = isFirstProject || isExpanded;

            return (
              <div
                key={project.title}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {!isFirstProject && !isExpanded ? (
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
                        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden flex items-center justify-center p-2 sm:p-3">
                          <img
                            src={project.logo}
                            alt={project.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white truncate">
                            {project.title}
                          </h3>
                          <p className="text-white/60 text-xs sm:text-sm">{project.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-bold text-white text-center text-sm sm:text-base transition-all duration-300 ${
                            activeTab === 'webflix'
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 shadow-lg hover:shadow-pink-500/50'
                              : 'bg-white/10 hover:bg-white/20 shadow-lg'
                          } hover:scale-105`}
                        >
                          Ansehen
                        </a>
                        <button
                          onClick={() => toggleProject(index)}
                          className={`flex-shrink-0 px-3 sm:px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                            activeTab === 'webflix'
                              ? 'bg-white/10 hover:bg-white/20 border-2 border-pink-500/30'
                              : 'bg-white/10 hover:bg-white/20 border-2 border-white/30'
                          }`}
                        >
                          <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`grid grid-cols-1 ${shouldShowFull ? 'lg:grid-cols-2' : ''} gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    <div className={`p-6 sm:p-8 lg:p-10 xl:p-12 ${index % 2 === 1 && shouldShowFull ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden flex items-center justify-center p-2 sm:p-3">
                      <img
                        src={project.logo}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 sm:mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm">{project.category}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {project.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
                      >
                        <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
                          activeTab === 'webflix'
                            ? 'bg-orange-500/10 border border-orange-500/20'
                            : 'bg-white/10 border border-white/20'
                        }`}>
                          <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            activeTab === 'webflix' ? 'text-orange-400' : 'text-white/60'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/70 text-xs sm:text-sm leading-tight">
                            {stat.label}
                          </p>
                        </div>
                        <div className={`flex-shrink-0 text-lg sm:text-xl lg:text-2xl font-black ${
                          activeTab === 'webflix' ? 'text-orange-400' : 'text-white/60'
                        }`}>
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {isFirstProject ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-white text-center text-sm sm:text-base transition-all duration-300 ${
                        activeTab === 'webflix'
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 shadow-lg hover:shadow-pink-500/50'
                          : 'bg-white/10 hover:bg-white/20 shadow-lg'
                      } hover:scale-105`}
                    >
                      Website ansehen
                    </a>
                  ) : (
                    <div className="flex gap-2 sm:gap-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-white text-center text-sm sm:text-base transition-all duration-300 ${
                          activeTab === 'webflix'
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 shadow-lg hover:shadow-pink-500/50'
                            : 'bg-white/10 hover:bg-white/20 shadow-lg'
                        } hover:scale-105`}
                      >
                        Ansehen
                      </a>
                      <button
                        onClick={() => toggleProject(index)}
                        className={`flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                          activeTab === 'webflix'
                            ? 'bg-white/10 hover:bg-white/20 border-2 border-pink-500/30'
                            : 'bg-white/10 hover:bg-white/20 border-2 border-white/30'
                        }`}
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>

                {shouldShowFull && (
                  <div className={`bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="space-y-5 sm:space-y-6">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                          Problem
                        </h4>
                        <p className="text-white/70 leading-relaxed text-xs sm:text-sm">
                          {project.problem}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                          Ziel
                        </h4>
                        <p className="text-white/70 leading-relaxed text-xs sm:text-sm">
                          {project.goal}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                          activeTab === 'webflix'
                            ? 'bg-orange-500/10 border border-orange-500/20'
                            : 'bg-white/10 border border-white/20'
                        }`}>
                          <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            activeTab === 'webflix' ? 'text-orange-400' : 'text-white/60'
                          }`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2 ${
                          activeTab === 'webflix' ? 'text-orange-400' : 'text-white/60'
                        }`}>
                          Ergebnis
                        </h4>
                        <p className="text-white/70 leading-relaxed text-xs sm:text-sm">
                          {project.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
                )}
            </div>
            );
          })}
        </div>

        <div className="text-center mt-10 sm:mt-12 lg:mt-16 px-4">
          {activeTab === 'webflix' ? (
            <button
              onClick={() => window.location.href = '/shop'}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 rounded-xl font-bold text-white text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105"
            >
              Deine Webflix Website starten
            </button>
          ) : (
            <button
              onClick={() => window.location.href = '/custom'}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-white text-sm sm:text-base transition-all duration-300 shadow-lg hover:scale-105"
            >
              Custom-Projekt anfragen
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
