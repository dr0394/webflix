import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Clock, Star, Award, Beef, Fish, ChefHat, Heart, ShoppingCart, Check, Menu, X, Facebook, Instagram } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProductCategories from './components/ProductCategories';
import WeeklySpecials from './components/WeeklySpecials';
import QualitySection from './components/QualitySection';
import BestellService from './components/BestellService';
import KontaktSection from './components/KontaktSection';

const MetzgereiLanding: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if in preview mode
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  return (
    <div className="min-h-screen bg-white">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <HeroSection />

      {/* Product Categories */}
      <ProductCategories />

      {/* Weekly Specials */}
      <WeeklySpecials />

      {/* Quality Section */}
      <QualitySection />

      {/* Bestellservice */}
      <BestellService />

      {/* Über Uns Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
                <ChefHat className="w-5 h-5 text-[#2D5F3F]" />
                <span className="text-[#2D5F3F] font-semibold">Über uns</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Was wir machen ist <span className="text-[#2D5F3F]">einfach</span>
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Wir vermarkten Fleisch von persönlich ausgesuchten Tieren regionaler Landwirte aus
                artgerechter Tierhaltung, die wir in einem kleinen Landschlachthof stressfrei schlachten.
              </p>

              <h3 className="text-2xl font-bold text-[#2D5F3F] mb-4">
                Was Du davon hast
              </h3>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Du bekommst außergewöhnlich gutes Fleisch, portioniert, vakuumiert und auf Wunsch so
                zugeschnitten, wie Du Dein Fleisch am liebsten magst. Und das zu einem Preis, den man gerne zahlt.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Das gute Gefühl, Fleisch von Tieren aus artgerechter Haltung zu bekommen, ist ebenso kostenlos
                dabei, wie das Wissen, dass Du kein Fleisch aus einer Überproduktion, sondern aus einer
                bedarfsgerechten Schlachtung kaufst.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-4xl font-bold text-[#2D5F3F] mb-2">70+</div>
                  <div className="text-gray-600">Jahre Erfahrung</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-4xl font-bold text-[#2D5F3F] mb-2">100%</div>
                  <div className="text-gray-600">Regional & Frisch</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-4xl font-bold text-[#2D5F3F] mb-2">50+</div>
                  <div className="text-gray-600">Eigene Rezepte</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-4xl font-bold text-[#2D5F3F] mb-2">5⭐</div>
                  <div className="text-gray-600">Kundenbewertung</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Metzgermeister bei der Arbeit"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D5F3F]/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <p className="text-2xl font-bold mb-2">Metzgermeister Hans Zwickels</p>
                    <p className="text-green-100">3. Generation – Leidenschaft fürs Handwerk</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#8BC34A] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#2D5F3F] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Kundenbewertungen */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-[#8BC34A] fill-[#8BC34A]" />
              <span className="text-[#2D5F3F] font-semibold">Kundenstimmen</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Das sagen unsere <span className="text-[#2D5F3F]">zufriedenen Kunden</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Familie Müller",
                text: "Seit Jahren kaufen wir nur noch bei Zwickels ein. Die Qualität ist unschlagbar und die Beratung immer top!",
                rating: 5,
                image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Thomas Schmidt",
                text: "Die Bratwürste sind legendär! Hab schon viele Metzger ausprobiert, aber hier stimmt einfach alles.",
                rating: 5,
                image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Anna Weber",
                text: "Regional, frisch und super lecker. Der Online-Bestellservice ist auch sehr praktisch. Absolut empfehlenswert!",
                rating: 5,
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
            ].map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#8BC34A] fill-[#8BC34A]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-600">Stammkunde</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt Section with Map */}
      <KontaktSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2D5F3F] via-[#3E7C57] to-[#2D5F3F] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#8BC34A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#7CB342] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Überzeugen Sie sich selbst!
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Besuchen Sie uns in unserer Filiale oder bestellen Sie bequem online.
            Wir freuen uns auf Sie!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#8BC34A] hover:bg-[#7CB342] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Online bestellen
            </button>
            <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Filiale besuchen
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MetzgereiLanding;
