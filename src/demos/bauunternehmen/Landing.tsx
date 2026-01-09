import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Star, ArrowRight, Hammer, Home, Building2, Wrench } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function BauunternehmenLanding() {
  const [selectedService, setSelectedService] = useState('');

  // Check if in preview mode
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  const services = [
    {
      id: 'neubau',
      icon: Building2,
      title: 'Neubau',
      description: 'Massivhäuser und Gewerbebauten in höchster Qualität',
      features: ['Schlüsselfertig', 'Energieeffizient', 'Individuelle Planung']
    },
    {
      id: 'umbau',
      icon: Home,
      title: 'Umbau & Sanierung',
      description: 'Modernisierung und Sanierung von Bestandsimmobilien',
      features: ['Kernsanierung', 'Dachausbau', 'Barrierefreiheit']
    },
    {
      id: 'renovierung',
      icon: Hammer,
      title: 'Renovierung',
      description: 'Innen- und Außenrenovierungen für Wohn- und Geschäftsräume',
      features: ['Malerarbeiten', 'Bodenverlegung', 'Trockenbau']
    },
    {
      id: 'wartung',
      icon: Wrench,
      title: 'Wartung & Reparatur',
      description: 'Schnelle Reparaturen und regelmäßige Wartungsarbeiten',
      features: ['24h-Notdienst', 'Schnelle Reaktion', 'Faire Preise']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-6 py-2 mb-8">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-amber-200 font-semibold">Über 30 Jahre Erfahrung im Bauwesen</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Ihr zuverlässiger Partner für</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Bau & Handwerk
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Von der Planung bis zur Fertigstellung – wir realisieren Ihre Bauprojekte mit Qualität, Präzision und Leidenschaft.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#services"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/50 text-lg flex items-center justify-center gap-2 group"
            >
              <span>Jetzt Beratung anfordern</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+49123456789"
              className="px-8 py-4 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>0123 456 789</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Projekte' },
              { number: '30+', label: 'Jahre Erfahrung' },
              { number: '98%', label: 'Zufriedene Kunden' },
              { number: '24/7', label: 'Notdienst' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-slate-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-slate-900">Unsere</span>{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Leistungen
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Vom Neubau bis zur Renovierung – wir bieten umfassende Bauleistungen aus einer Hand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-8 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-slate-700">
                            <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Warum E&H Klisch?
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Mit über 30 Jahren Erfahrung im Bauwesen sind wir Ihr verlässlicher Partner für alle Bauprojekte.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Erfahrenes Team',
                    description: 'Qualifizierte Fachkräfte mit langjähriger Expertise'
                  },
                  {
                    title: 'Qualitätsgarantie',
                    description: 'Hochwertige Materialien und präzise Ausführung'
                  },
                  {
                    title: 'Termingarantie',
                    description: 'Pünktliche Fertigstellung Ihrer Projekte'
                  },
                  {
                    title: 'Faire Preise',
                    description: 'Transparente Kalkulation ohne versteckte Kosten'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bauprojekt"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-amber-500 rounded-2xl p-8 shadow-2xl max-w-xs">
                <div className="text-white">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-amber-100">Erfolgreich abgeschlossene Projekte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-slate-900">Was unsere</span>{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Kunden sagen
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Michael Schmidt',
                role: 'Hausbesitzer',
                text: 'Die Renovierung unseres Hauses wurde pünktlich und in erstklassiger Qualität durchgeführt. Das Team war professionell und zuverlässig.',
                rating: 5
              },
              {
                name: 'Sarah Weber',
                role: 'Geschäftsführerin',
                text: 'Unser Gewerbebau wurde termingerecht fertiggestellt. Die Zusammenarbeit war unkompliziert und transparent.',
                rating: 5
              },
              {
                name: 'Thomas Müller',
                role: 'Architekt',
                text: 'Eine Zusammenarbeit auf höchstem Niveau. Die Handwerker verstehen ihr Fach und setzen Pläne präzise um.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8 hover:border-amber-400 hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-slate-900">Bereit für Ihr</span>{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Bauprojekt?
            </span>
          </h2>
          <p className="text-xl text-slate-700 mb-12">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-600 mb-1">Telefon</div>
                  <div className="text-lg font-bold text-slate-900">0123 456 789</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-600 mb-1">E-Mail</div>
                  <div className="text-lg font-bold text-slate-900">info@eundh-klisch.de</div>
                </div>
              </div>
            </div>

            <button className="w-full px-8 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/50 text-lg flex items-center justify-center gap-2 group">
              <span>Jetzt Kontakt aufnehmen</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
