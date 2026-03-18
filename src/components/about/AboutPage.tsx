import React from 'react';
import { ArrowLeft, Users, Target, Zap, Heart, Award, TrendingUp, Shield, Sparkles, CheckCircle2, Mail, Phone, MapPin, Star, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: 'Kundenfokus',
      description: 'Dein Erfolg ist unser Erfolg. Wir entwickeln Websites, die deine Zielgruppe begeistern und Kunden gewinnen.'
    },
    {
      icon: Zap,
      title: 'Geschwindigkeit',
      description: 'Deine Website in 72 Stunden live. Keine monatelangen Projekte, sondern schnelle Ergebnisse, die wirken.'
    },
    {
      icon: Heart,
      title: 'Leidenschaft',
      description: 'Wir lieben, was wir tun. Jede Website wird mit höchster Sorgfalt und Liebe zum Detail entwickelt.'
    },
    {
      icon: Shield,
      title: 'Qualität',
      description: '100% Zufriedenheitsgarantie. Wir arbeiten so lange, bis du mit deiner Website vollständig zufrieden bist.'
    }
  ];

  const stats = [
    { number: '847+', label: 'Zufriedene Kunden' },
    { number: '98%', label: 'Kundenzufriedenheit' },
    { number: '72h', label: 'Durchschnittliche Lieferzeit' },
    { number: '4.9', label: 'Durchschnittliche Bewertung' }
  ];

  const teamMembers = [
    {
      name: 'Marcel Waschnewski',
      role: 'Gründer & CEO',
      description: 'Mit seiner Vision, professionelle Websites für jeden zugänglich zu machen, hat Marcel Webflix gegründet und aufgebaut.',
      image: '/Design_ohne_Titel_(73).png'
    },
    {
      name: 'David Liensdorf',
      role: 'Co-Founder & CTO',
      description: 'David ist der technische Kopf hinter Webflix und sorgt dafür, dass jede Website performant, sicher und zukunftssicher ist.',
      image: '/Design_ohne_Titel_(74).png'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Gründung von Webflix', description: 'Mit der Vision, Webdesign demokratisch zu machen' },
    { year: '2021', event: '100+ Websites ausgeliefert', description: 'Schnelles Wachstum durch zufriedene Kunden' },
    { year: '2022', event: 'Expansion des Teams', description: 'Aufbau eines erstklassigen Design & Dev Teams' },
    { year: '2023', event: '500+ zufriedene Kunden', description: 'Etablierung als führende Website-Plattform' },
    { year: '2024', event: 'Neue Features & Tools', description: 'Launch der Webflix Custom Solution' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black text-white">
      <Header showNavigation={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-pink-400/20 border border-pink-400/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400 font-semibold">Über Webflix</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Websites, die </span>
            <span className="bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 bg-clip-text text-transparent">
              begeistern
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Wir sind ein Team von Designern, Entwicklern und Unternehmern mit einer Mission:
            Professionelle Websites für jeden zugänglich zu machen – schnell, einfach und bezahlbar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-pink-400/30 transition-all">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Unsere Geschichte</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Webflix wurde 2020 aus einer einfachen Erkenntnis geboren: Viele Unternehmen und
                  Selbstständige brauchen eine professionelle Website, aber die traditionellen Wege
                  sind zu kompliziert, zu teuer und zu langsam.
                </p>
                <p>
                  Wir haben es uns zur Mission gemacht, diesen Prozess zu revolutionieren. Durch
                  intelligente Templates, bewährte Design-Patterns und einen optimierten Workflow
                  können wir Websites in Rekordzeit liefern – ohne Kompromisse bei Qualität oder
                  Individualität.
                </p>
                <p>
                  Heute vertrauen uns über 847 Kunden aus verschiedensten Branchen. Von der lokalen
                  Autowerkstatt bis zum ambitionierten Coach – wir helfen jedem, online erfolgreich zu sein.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-400/20 rounded-2xl blur-3xl"></div>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Team bei der Arbeit"
                className="relative rounded-2xl w-full h-[400px] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Unsere Werte</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Diese Prinzipien leiten uns bei allem, was wir tun
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-pink-400/30 transition-all group">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Unser Team</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Die Köpfe hinter deiner Website
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-pink-400/30 transition-all group">
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <div className="text-pink-400 font-semibold mb-3">{member.role}</div>
                  <p className="text-white/60 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-white/40 text-sm font-medium tracking-wider uppercase">Google Bewertungen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Das sagen unsere Kunden</h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-white">5.0</span>
            </div>
            <p className="text-white/60 text-lg">Basierend auf Google Bewertungen</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {[
              {
                name: 'Zufriedener Kunde',
                text: 'Absolut professionelle Arbeit! Meine Website war innerhalb kürzester Zeit fertig und sieht fantastisch aus. Das Team war immer erreichbar und hat alle meine Wünsche umgesetzt.',
                date: 'vor 2 Wochen'
              },
              {
                name: 'Lokales Unternehmen',
                text: 'Endlich eine moderne Website, die zu unserem Unternehmen passt. Der gesamte Prozess war unkompliziert und das Ergebnis hat unsere Erwartungen übertroffen.',
                date: 'vor 1 Monat'
              },
              {
                name: 'Selbstständiger',
                text: 'Top Service und eine Website, die wirklich Kunden bringt! Die Zusammenarbeit war super angenehm und das Preis-Leistungs-Verhältnis ist unschlagbar.',
                date: 'vor 1 Monat'
              }
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-400/20 transition-all"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-4 text-sm">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{review.name}</div>
                      <div className="text-white/40 text-xs">{review.date}</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-30" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://maps.app.goo.gl/r6dFBauumST4GPqv9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl transition-all text-white font-medium"
            >
              <span>Alle Bewertungen auf Google ansehen</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Unsere Reise</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Von der ersten Idee bis heute
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-pink-400 to-green-400"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-center gap-8`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-pink-400/30 transition-all">
                      <div className="text-2xl font-bold text-pink-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-2">{milestone.event}</h3>
                      <p className="text-white/60">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 sm:left-1/2 w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-400 rounded-full border-4 border-black transform sm:-translate-x-1/2 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex-1 hidden sm:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-pink-400/10 border border-pink-400/30 rounded-3xl p-8 sm:p-12 text-center">
          <Award className="w-16 h-16 text-pink-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Bereit für deine Website?</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Lass uns gemeinsam dein Online-Projekt starten. Schnell, professionell und genau so, wie du es dir vorstellst.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/configurator')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-pink-500/50 flex items-center justify-center gap-2"
            >
              <span>Website konfigurieren</span>
              <TrendingUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#contact');
                }
              }}
              className="px-8 py-4 border-2 border-white/20 hover:border-pink-400/50 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Kontakt aufnehmen</span>
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center text-white/60">
            <p>© 2025 Webflix. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
