import React from 'react';
import { Star, Phone, Facebook, Instagram, MessageCircle, Mail } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function GastroLanding() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Café Podest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-stone-50"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] text-white mb-6 drop-shadow-2xl">
            CAFÉ PODEST
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-amber-200 tracking-wide drop-shadow-lg">
            im Waldfrieden
          </p>
          <div className="mt-12">
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white rounded-full font-light tracking-wide transition-all duration-300 hover:scale-105">
              Tisch reservieren
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-stone-50 to-transparent"></div>
      </section>

      {/* Google Rating & Social Section */}
      <section id="rating" className="py-16 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-light text-stone-800">4.8</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= 4
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-amber-200 text-amber-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-stone-600 font-light mb-6">126 Bewertungen</p>

            <button className="text-sm text-stone-800 hover:text-amber-700 font-light tracking-wide transition-colors">
              Jetzt bewerten
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 bg-stone-200/50 rounded-2xl p-6">
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
              aria-label="Telefon"
            >
              <Phone className="w-5 h-5 text-stone-800" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-stone-800" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-stone-800" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
              aria-label="E-Mail"
            >
              <Mail className="w-5 h-5 text-stone-800" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-stone-800" />
            </a>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section id="links" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-6">
            <h2 className="text-sm font-light tracking-widest text-stone-600 mb-4">
              Deine Übersicht
            </h2>
            <div className="w-24 h-px bg-stone-800 mx-auto mb-8"></div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-2">
              Café Podest's <span className="text-stone-400">Links</span>
            </h3>
            <div className="w-full h-px bg-stone-300 mt-8"></div>
          </div>

          <p className="text-center text-stone-600 font-light mb-12">
            Hier findest du alles Wichtige im Überblick
          </p>

          <div className="space-y-3 max-w-2xl mx-auto">
            {[
              'Tisch reservieren',
              'Speisekarte',
              'À la Carte',
              'Jahresprogramm 2025',
              'Wlan Zugang',
              'Öffnungszeiten',
              'Jetzt bei Café Podest anrufen',
              'Zum nächsten Event',
            ].map((link, index) => (
              <button
                key={index}
                className="w-full py-4 px-6 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-light tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-6">
            <button className="py-8 px-6 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <p className="text-stone-800 font-light">Folge uns auf Instagram</p>
            </button>
            <button className="py-8 px-6 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <Facebook className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="text-stone-800 font-light">
                Aktuelles
                <br />
                auf Facebook
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="welcome" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Willkommen
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Café Innenraum"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-light tracking-wide">Unser gemütlicher Innenbereich</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-stone-700 font-light leading-relaxed text-lg">
                Willkommen im Museumscafé am Skulpturenpark Waldfrieden! Mach es dir bei uns
                gemütlich und entdecke unser Café mit einem entspannten 360-Grad-Rundgang.
              </p>
              <p className="text-stone-600 font-light leading-relaxed">
                Schau dich in unseren einladenden Innenräumen um und erlebe die entspannte
                Atmosphäre draußen. Lass dich von der Verbindung von Kunst und Natur inspirieren
                und genieße unsere leckeren Speisen und Getränke.
              </p>
              <button className="mt-6 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-light tracking-wide transition-all duration-300 hover:scale-105">
                360° Rundgang starten
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16">
            {[
              { name: 'KIVAMO', subtitle: 'Kaffeerösterei' },
              { name: 'Weine & Feinkost', subtitle: 'Leidenschaft fürs Genießen' },
              { name: 'Frische Paradies', subtitle: 'Frische Qualität' },
              { name: 'Regional & Bio', subtitle: 'Aus der Region' },
            ].map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="w-full aspect-square bg-stone-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-stone-200 transition-colors">
                  <span className="text-sm font-light text-stone-700">{partner.name}</span>
                </div>
                <p className="text-xs text-stone-500 font-light">{partner.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Über uns
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-16">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
              <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Café Podest"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <h3 className="text-2xl sm:text-3xl font-light text-stone-800">Café Podest</h3>
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-stone-600 font-light text-sm">Museumscafé am Skulpturenpark Waldfrieden</p>
              </div>
            </div>

            <div className="w-full h-px bg-stone-200 mb-8"></div>

            <div className="prose prose-stone max-w-none">
              <p className="text-stone-700 font-light leading-relaxed text-center sm:text-left text-lg mb-4">
                Im Café Podest im Skulpturenpark Waldfrieden verwöhnen wir Sie mit frischen
                Köstlichkeiten, die aus den besten Zutaten zubereitet und mit viel Liebe zum Detail
                verfeinert werden.
              </p>
              <p className="text-stone-600 font-light leading-relaxed text-center sm:text-left">
                Doch das wahre Herzstück unseres Cafés ist unser leidenschaftliches Team, das mit
                Hingabe dafür sorgt, dass jeder Besuch zu einem besonderen Erlebnis wird.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { img: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Frische Backwaren' },
              { img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Barista Kaffee' },
              { img: 'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Hausgemachte Kuchen' },
              { img: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Gemütliche Atmosphäre' },
              { img: 'https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Saisonale Menüs' },
              { img: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Unser Team' },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-light tracking-wide">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Unsere Events
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto mb-6"></div>
            <p className="text-stone-600 font-light max-w-2xl mx-auto">
              Mehrmals im Jahr veranstalten wir exklusive Events bei uns im Café Podest und in der
              Villa Waldfrieden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brunch Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white p-8 h-[450px] flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-light italic mb-4">Brunch</h3>
                  <p className="text-xs font-light mb-6">Jeweils Sonntag von 10:00 - 13:30 Uhr</p>
                  <div className="space-y-2 text-xs font-light">
                    <div className="grid grid-cols-4 gap-2">
                      <span>09. März</span>
                      <span>2025</span>
                      <span>Café Podest</span>
                      <span>34,50€</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <span>20. April</span>
                      <span>2025</span>
                      <span>Café Podest</span>
                      <span>34,50€</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <span>11. Mai</span>
                      <span>2025</span>
                      <span>Villa Waldfrieden</span>
                      <span>54,50€</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <span>14. August</span>
                      <span>2025</span>
                      <span>Café Podest</span>
                      <span>34,50€</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <span>06. September</span>
                      <span>2025</span>
                      <span>Café Podest</span>
                      <span>34,50€</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/30">
                    <h4 className="text-sm font-light mb-3">Adventssonntage</h4>
                    <div className="space-y-2 text-xs font-light">
                      <div className="grid grid-cols-4 gap-2">
                        <span>07. Dezember</span>
                        <span>2025</span>
                        <span>Villa Waldfrieden</span>
                        <span>54,50€</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <span>14. Dezember</span>
                        <span>2025</span>
                        <span>Villa Waldfrieden</span>
                        <span>54,50€</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs italic font-light text-right">
                  CAFÉ PODEST
                  <br />
                  im Waldfrieden
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h4 className="text-xl font-light text-stone-800 mb-3 text-center">Brunch Buffet</h4>
                <p className="text-sm text-stone-600 font-light leading-relaxed text-center">
                  Genieße im einmaligen Ambiente des Skulpturenpark Wuppertal ein reichhaltiges
                  Brunch Buffet. Neben den Klassikern wie z.B. Ei Benedict gibt es weitere
                  saisonale Köstlichkeiten.
                </p>
              </div>
            </div>

            {/* Dinnerabende Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="bg-gradient-to-br from-stone-700 to-stone-900 text-white p-8 h-[450px] flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-light italic mb-4">Dinnerabende</h3>
                  <p className="text-xs font-light mb-6">in der Villa Waldfrieden</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-light mb-2">Gourmet-Abende</h4>
                      <div className="space-y-2 text-xs font-light">
                        <div className="grid grid-cols-4 gap-2">
                          <span>11. April</span>
                          <span>1605 BY CATERING AM DOLL</span>
                          <span></span>
                          <span>89,50€</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <span>07. November</span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/30">
                      <h4 className="text-sm font-light mb-2">Signature-Abende</h4>
                      <div className="space-y-2 text-xs font-light">
                        <div className="grid grid-cols-4 gap-2">
                          <span>09. Mai</span>
                          <span>CAFÉ PODEST & FRIENDS</span>
                          <span></span>
                          <span>69,50€</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <span>05. Dezember</span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/30">
                      <h4 className="text-sm font-light mb-2">Signature-Abende</h4>
                      <div className="space-y-2 text-xs font-light">
                        <div className="grid grid-cols-4 gap-2">
                          <span>13. Juni</span>
                          <span>GEZEILER`S BIINS</span>
                          <span></span>
                          <span>49,50€</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <span>10. Oktober</span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs italic font-light text-right">
                  CAFÉ PODEST
                  <br />
                  im Waldfrieden
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h4 className="text-xl font-light text-stone-800 mb-3 text-center">
                  Dinnerabend in der Villa Waldfrieden
                </h4>
                <p className="text-sm text-stone-600 font-light leading-relaxed text-center">
                  Die Villa Waldfrieden wurde unmittelbar nach dem Zweiten Weltkrieg als Wohnhaus
                  für den Lackfabrikanten Dr. Kurt Herberts erbaut. Einzigartig ist die organische
                  Architektur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Veranstaltungen Section */}
      <section id="veranstaltungen" className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Veranstaltungen
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-[400px] lg:h-auto">
                <img
                  src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Restaurant Außenbereich"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 to-transparent"></div>
              </div>

              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-stone-800 mb-6">
                  Deine Location, für jeden Anlass
                </h3>
                <p className="text-stone-700 font-light leading-relaxed mb-6">
                  Das Restaurant am Skulpturenpark Waldfrieden ist ideal für kleine und große
                  Veranstaltungen geeignet! Ob drinnen oder draußen, wir bieten eine wunderschöne
                  Kulisse für Ihre Feier.
                </p>
                <p className="text-stone-600 font-light leading-relaxed mb-8">
                  Bei uns wird jedes Event individuell und mit viel Liebe zum Detail geplant. Sie
                  können sich darauf verlassen, dass wir nicht nur köstliche Speisen servieren,
                  sondern auch eine unvergessliche Atmosphäre schaffen!
                </p>
                <div>
                  <button className="px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-light tracking-wide transition-all duration-300 hover:scale-105">
                    Jetzt anfragen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Unsere Partner
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto mb-4"></div>
            <p className="text-stone-600 font-light">Qualität die man schmeckt</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                name: 'KIVAMO',
                subtitle: 'Kaffeerösterei',
              },
              {
                name: 'Weine & Feinkost',
                subtitle: 'Leidenschaft fürs Genießen',
              },
              {
                name: 'FRISCHE PARADIES',
                subtitle: 'Premium Qualität',
              },
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-stone-50 rounded-2xl p-10 flex flex-col items-center justify-center hover:bg-stone-100 transition-all duration-300 border border-stone-200 hover:shadow-lg group"
              >
                <div className="w-24 h-24 mb-6 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-stone-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-light text-stone-600 text-center px-2">{partner.name}</span>
                  </div>
                </div>
                <h3 className="text-base font-light text-stone-800 text-center mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-stone-500 font-light text-center">
                  {partner.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social" className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Folge uns
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Instagram className="w-20 h-20 text-white" />
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <h3 className="text-xl sm:text-2xl font-light text-stone-800">
                  @cafepodest.im.waldfrieden
                </h3>
                <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-stone-600 font-light mb-8">
                Entdecke die Welt von Café Podest auch online und bleibe immer auf dem neuesten
                Stand!
              </p>
            </div>

            <div className="flex justify-center">
              <button className="px-10 py-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-lg font-light tracking-wide transition-all duration-300 hover:scale-105 shadow-lg">
                Auf Instagram folgen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Kontakt
            </h2>
            <div className="w-20 h-px bg-amber-600 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-light text-white text-center mb-4">
                Schreibe uns
              </h3>
              <p className="text-sm text-white/90 font-light text-center mb-8">
                Wir freuen uns auf deine Nachricht!
              </p>

              <div className="bg-white rounded-2xl p-6 sm:p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-stone-800 mb-2">
                        Vorname
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-stone-800 mb-2">
                        Nachname
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-stone-800 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                          @
                        </span>
                        <input
                          type="email"
                          className="w-full pl-8 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 font-light"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-light text-stone-800 mb-2">
                        Telefonnummer
                      </label>
                      <input
                        type="tel"
                        placeholder="(+49)"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-stone-800 mb-2">
                      Grunde
                    </label>
                    <select className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 font-light appearance-none bg-white">
                      <option>Wähle aus...</option>
                      <option>Tischreservierung</option>
                      <option>Event Anfrage</option>
                      <option>Allgemeine Anfrage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-stone-800 mb-2">
                      Nachricht
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 font-light resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white hover:bg-stone-100 text-amber-900 rounded-xl font-light tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  >
                    Anfrage senden
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
