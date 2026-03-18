import React from 'react';
import { ChevronDown, Globe, Star } from 'lucide-react';

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
        { text: "Kontakt", href: "/contact" },
        { text: "Google Bewertungen", href: "https://maps.app.goo.gl/r6dFBauumST4GPqv9", external: true }
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
            src="/Design_ohne_Titel_(72).png"
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
                  const isExternal = typeof link !== 'string' && 'external' in link && link.external;
                  return (
                    <li key={linkText}>
                      <a
                        href={linkHref}
                        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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

          <a
            href="https://maps.app.goo.gl/r6dFBauumST4GPqv9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-3 py-2 transition-all mb-4 md:mb-0"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-xs text-gray-300 font-medium">5.0</span>
          </a>

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