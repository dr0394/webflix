import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '../../demos/autoaufbereitung/components/BeforeAfterSlider';

interface BeforeAfterImage {
  title: string;
  before: string;
  after: string;
  description: string;
}

interface WebflixOneBeforeAfterProps {
  examples: BeforeAfterImage[];
  primaryColor: string;
}

const WebflixOneBeforeAfter: React.FC<WebflixOneBeforeAfterProps> = ({
  examples = [],
  primaryColor = '#3b82f6'
}) => {
  const [selectedExample, setSelectedExample] = useState(0);

  if (examples.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 border font-poppins"
              style={{
                backgroundColor: `${primaryColor}10`,
                color: primaryColor,
                borderColor: `${primaryColor}30`
              }}
            >
              Vorher & Nachher
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-poppins">
              Sehen Sie den Unterschied
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
              Überzeugen Sie sich selbst von der Qualität unserer Arbeit
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="relative backdrop-blur-sm rounded-2xl overflow-hidden border"
            style={{
              backgroundColor: `${primaryColor}10`,
              borderColor: `${primaryColor}30`,
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            <BeforeAfterSlider
              beforeImage={examples[selectedExample].before}
              afterImage={examples[selectedExample].after}
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-bold font-poppins">{examples[selectedExample].title}</h3>
              <p className="text-sm text-gray-300 font-poppins">{examples[selectedExample].description}</p>
            </div>
          </div>

          {/* Example Selection */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            {examples.map((example, index) => (
              <div
                key={index}
                className={`cursor-pointer backdrop-blur-sm rounded-xl overflow-hidden border transition-all hover:scale-105`}
                style={{
                  backgroundColor: `${primaryColor}10`,
                  borderColor: selectedExample === index ? `${primaryColor}80` : `${primaryColor}30`,
                  boxShadow: selectedExample === index ? `0 0 20px ${primaryColor}50` : '0 0 20px rgba(0, 0, 0, 0.5)'
                }}
                onClick={() => setSelectedExample(index)}
              >
                <div className="relative h-32">
                  <div className="absolute inset-0 grid grid-cols-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={example.before}
                        alt={`${example.title} - Vorher`}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-1 left-1 text-white px-1.5 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Vorher
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <img
                        src={example.after}
                        alt={`${example.title} - Nachher`}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-1 right-1 text-white px-1.5 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Nachher
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-lg transform -translate-x-0.5"></div>

                  {selectedExample === index && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}30` }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3
                    className={`text-sm font-bold mb-1 font-poppins transition-colors`}
                    style={{ color: selectedExample === index ? primaryColor : 'white' }}
                  >
                    {example.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-poppins">{example.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebflixOneBeforeAfter;
