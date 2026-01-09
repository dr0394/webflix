import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';

const Footer = () => {
  const linkGroups = [
    {
      title: "Service",
      links: [
        "Hilfe-Center",
        "Preise",
        "So funktioniert's",
        "Kündigung & Fristen"
      ]
    },
    {
      title: "Unternehmen",
      links: [
        { text: "Impressum", href: "/impressum" },
        { text: "Datenschutz", href: "/datenschutz" },
        { text: "Über uns", href: "/about" },
        { text: "Kontakt", href: "/contact" }
      ]
    },
    {
      title: "Rechtliches",
      links: [
        { text: "AGB", href: "/agb" },
        { text: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
        { text: "Widerrufsrecht", href: "/agb" },
        { text: "Cookie-Einstellungen", href: "#" }
      ]
    }
  ];

  return (
    <footer className="py-12 sm:py-16 px-4 border-t border-white/10 bg-black/20">
      <div className="container mx-auto">
        <div className="mb-8 sm:mb-10">
          <img
            src="https://i.imgur.com/4Hp6B6u.png"
            alt="Webflix"
            className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {linkGroups.map((group, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{group.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {group.links.map((link) => {
                  const linkText = typeof link === 'string' ? link : link.text;
                  const linkHref = typeof link === 'string' ? '#' : link.href;
                  return (
                    <li key={linkText}>
                      <a
                        href={linkHref}
                        className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                      >
                        {linkText}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Fragen? Wir helfen gerne:
            </p>
            <a
              href="/contact"
              className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-lg transition-all text-xs sm:text-sm font-medium"
            >
              Support kontaktieren
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-300 transition-colors">
              <Globe size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Deutsch</span>
              <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5" />
            </div>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm">Webflix Deutschland</p>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 px-4">
            Diese Seite ist durch Google reCAPTCHA abgesichert, um sicherzustellen, dass Sie kein Bot sind.{' '}
            <a href="/contact" className="text-gray-400 hover:text-white transition-colors underline">
              Support kontaktieren
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;