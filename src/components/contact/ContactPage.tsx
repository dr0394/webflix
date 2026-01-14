import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle2, MessageSquare, Zap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'website',
    message: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappNumber = '491751194624';

    let whatsappMessage = `*Neue Kontaktanfrage*\n\n`;
    whatsappMessage += `*Name:* ${formData.name}\n`;
    whatsappMessage += `*E-Mail:* ${formData.email}\n`;

    if (formData.phone) {
      whatsappMessage += `*Telefon:* ${formData.phone}\n`;
    }

    if (formData.company) {
      whatsappMessage += `*Firma:* ${formData.company}\n`;
    }

    const subjectLabels: { [key: string]: string } = {
      'website': 'Neue Website',
      'custom': 'Custom Projekt',
      'webflix': 'Webflix Paket',
      'support': 'Support',
      'other': 'Sonstiges'
    };
    whatsappMessage += `*Betreff:* ${subjectLabels[formData.subject]}\n`;

    if (formData.budget) {
      whatsappMessage += `*Budget:* ${formData.budget}\n`;
    }

    whatsappMessage += `\n*Nachricht:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    await new Promise(resolve => setTimeout(resolve, 500));

    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'website',
        message: '',
        budget: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'E-Mail',
      value: 'info@webflix.de',
      link: 'mailto:info@webflix.de',
      description: 'Schreib uns direkt'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+49 175 1194624',
      link: 'tel:+491751194624',
      description: 'Mo-Fr 9-18 Uhr'
    }
  ];

  const faqs = [
    {
      question: 'Wie schnell bekomme ich eine Antwort?',
      answer: 'In der Regel antworten wir innerhalb von 24 Stunden an Werktagen.'
    },
    {
      question: 'Kann ich auch anrufen?',
      answer: 'Ja, gerne! Wir sind Mo-Fr von 9-18 Uhr telefonisch erreichbar.'
    },
    {
      question: 'Bietet ihr Vor-Ort-Termine an?',
      answer: 'Ja, für größere Projekte oder auf Wunsch kommen wir gerne zu dir.'
    }
  ];

  const reasons = [
    {
      icon: Zap,
      title: 'Schnelle Reaktion',
      description: 'Antwort innerhalb von 24h'
    },
    {
      icon: Users,
      title: 'Persönlicher Kontakt',
      description: 'Direkter Draht zum Team'
    },
    {
      icon: MessageSquare,
      title: 'Kostenlose Beratung',
      description: 'Unverbindliches Erstgespräch'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-black text-white">
      <Header showNavigation={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-pink-400/20 border border-pink-400/30 rounded-full px-6 py-2 mb-6">
            <MessageSquare className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400 font-semibold">Kontakt</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Lass uns </span>
            <span className="bg-gradient-to-r from-orange-400 via-pink-300 to-green-300 bg-clip-text text-transparent">
              sprechen
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Hast du Fragen, Ideen oder möchtest ein Projekt starten? Wir freuen uns auf deine Nachricht!
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-pink-400/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                <p className="text-white/60 text-sm">{reason.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Kontaktiere uns</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-pink-400/30 transition-all group"
                  >
                    <Icon className="w-8 h-8 text-pink-400 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-1">{method.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{method.description}</p>
                    <p className="text-pink-400 font-semibold text-sm">{method.value}</p>
                  </a>
                );
              })}
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-pink-400" />
                <h3 className="font-bold text-lg">Öffnungszeiten</h3>
              </div>
              <div className="space-y-2 text-white/70">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span className="font-semibold text-white">9:00 - 18:00 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span className="font-semibold text-white">10:00 - 14:00 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag</span>
                  <span className="font-semibold text-white">Geschlossen</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-xl mb-4">Häufige Fragen</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-white/60 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Schreib uns eine Nachricht</h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Nachricht gesendet!</h3>
                  <p className="text-white/60">Wir melden uns so schnell wie möglich bei dir.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 transition-colors"
                      placeholder="Max Mustermann"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 transition-colors"
                        placeholder="max@beispiel.de"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 transition-colors"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Firma (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 transition-colors"
                      placeholder="Deine Firma GmbH"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Betreff *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-400/50 transition-colors"
                    >
                      <option value="website">Neue Website</option>
                      <option value="custom">Custom Projekt</option>
                      <option value="webflix">Webflix Paket</option>
                      <option value="support">Support</option>
                      <option value="other">Sonstiges</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget (optional)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-400/50 transition-colors"
                    >
                      <option value="">Budget auswählen</option>
                      <option value="0-500">Unter 500€</option>
                      <option value="500-1000">500€ - 1.000€</option>
                      <option value="1000-2500">1.000€ - 2.500€</option>
                      <option value="2500-5000">2.500€ - 5.000€</option>
                      <option value="5000+">Über 5.000€</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 transition-colors resize-none"
                      placeholder="Erzähl uns von deinem Projekt..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-400 hover:from-orange-600 hover:to-pink-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-pink-500/50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <>
                        <span>Nachricht senden</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/40 text-center">
                    Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.
                  </p>
                </form>
              )}
            </div>
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

export default ContactPage;
