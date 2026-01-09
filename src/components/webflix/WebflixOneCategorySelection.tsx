import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface Category {
  type: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

interface WebflixOneCategorySelectionProps {
  categories: Category[];
  primaryColor: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

const WebflixOneCategorySelection: React.FC<WebflixOneCategorySelectionProps> = ({
  categories = [],
  primaryColor = '#3b82f6',
  sectionTitle = 'Unsere Kategorien',
  sectionSubtitle = 'Wählen Sie die passende Kategorie für Ihr Projekt'
}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: `${primaryColor}15` }}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl animate-float" style={{ backgroundColor: `${primaryColor}15`, animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent font-poppins">
              {sectionTitle}
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-montserrat">
              {sectionSubtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Category Cards - Scrollable on Mobile */}
          <div className="lg:sticky lg:top-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedCategory(index)}
                  className={`group relative cursor-pointer backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-500 hover:scale-105 ${
                    selectedCategory === index ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: selectedCategory === index ? `${primaryColor}20` : `${primaryColor}10`,
                    borderColor: selectedCategory === index ? `${primaryColor}80` : `${primaryColor}30`,
                    ringColor: primaryColor
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: primaryColor }}
                    ></div>

                    {selectedCategory === index && (
                      <div
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-2 font-poppins transition-colors"
                      style={{ color: selectedCategory === index ? primaryColor : 'white' }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-slate-300 text-sm font-montserrat">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Selected Category Details */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-xl rounded-3xl p-8 border relative overflow-hidden"
            style={{
              backgroundColor: `${primaryColor}10`,
              borderColor: `${primaryColor}30`
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: primaryColor }}></div>

            <div className="relative z-10">
              <div className="mb-8">
                <span
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg font-poppins"
                  style={{
                    backgroundColor: primaryColor,
                    color: 'white'
                  }}
                >
                  Gewählte Kategorie
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
                  {categories[selectedCategory].name}
                </h3>
                <p className="text-xl text-slate-300 font-montserrat">
                  {categories[selectedCategory].description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-4 font-poppins">
                  Enthaltene Leistungen:
                </h4>
                {categories[selectedCategory].features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      borderColor: `${primaryColor}30`
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-lg font-semibold font-montserrat">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t" style={{ borderColor: `${primaryColor}30` }}>
                <button
                  className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-poppins"
                  style={{
                    backgroundColor: primaryColor,
                    color: 'white'
                  }}
                >
                  Jetzt anfragen
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebflixOneCategorySelection;
