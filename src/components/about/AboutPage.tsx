import React from 'react';
import { ArrowLeft, Users, Target, Zap, Heart, Award, TrendingUp, Shield, Sparkles, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
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
      description: 'Deine Website in 48 Stunden live. Keine monatelangen Projekte, sondern schnelle Ergebnisse, die wirken.'
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
    { number: '48h', label: 'Durchschnittliche Lieferzeit' },
    { number: '4.9', label: 'Durchschnittliche Bewertung' }
  ];

  const teamMembers = [
    {
      name: 'Max Mustermann',
      role: 'Gründer & CEO',
      description: 'Mit über 10 Jahren Erfahrung im Webdesign hat Max die Vision, Websites für jeden zugänglich zu machen.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Laura Schmidt',
      role: 'Lead Designer',
      description: 'Laura bringt kreative Ideen zum Leben und sorgt dafür, dass jede Website visuell beeindruckend ist.',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Tom Weber',
      role: 'Tech Lead',
      description: 'Tom entwickelt die Technologie, die unsere Websites schnell, sicher und skalierbar macht.',
      image: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=800'
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-pink-400/30 transition-all group">
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      {index === 0 ? (
                        <div className="mb-4">
                          <img
                            src="/chatgpt_image_21._jan._2026,_11_34_15.png"
                            alt="Gründung von Webflix"
                            className="w-32 h-32 rounded-xl object-cover mx-auto sm:mx-0 sm:ml-auto border-2 border-pink-400/30"
                          />
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-pink-400 mb-2">{milestone.year}</div>
                      )}
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
