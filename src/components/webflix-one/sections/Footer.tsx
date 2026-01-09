import React from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Leaf } from 'lucide-react';

interface FooterProps {
  businessName?: string;
  companyName?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  openingHours?: string;
  socialLinks?: Array<{ platform: string; url: string }> | {
    instagram?: string;
    facebook?: string;
  };
  links?: Array<{ label: string; href: string }>;
  quickLinks?: Array<{ label: string; href: string }>;
  legalLinks?: Array<{ label: string; href: string }>;
  navigationItems?: Array<{ label: string; link: string }>;
  copyright?: string;
  designVariant?: string;
}

export const Footer: React.FC<FooterProps> = ({
  businessName,
  companyName,
  tagline,
  description,
  email,
  phone,
  address,
  openingHours,
  socialLinks,
  links,
  quickLinks,
  legalLinks,
  navigationItems,
  copyright,
  designVariant
}) => {
  const displayName = companyName || businessName || 'Unternehmen';
  const footerLinks = quickLinks || links || navigationItems || [
    { label: 'Home', href: '#hero' },
    { label: 'Leistungen', href: '#services' },
    { label: 'Referenzen', href: '#before-after' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'Kontakt', href: '#contact' }
  ];

  const scrollToSection = (linkHref: string) => {
    if (linkHref.startsWith('#')) {
      const element = document.querySelector(linkHref);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = linkHref;
    }
  };

  if (designVariant === 'luxury-footer-dark') {
    return (
      <footer className="bg-[var(--color-primary,#2E4633)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[var(--color-primary,#2E4633)]" />
                </div>
                <h3 className="text-2xl font-serif font-bold">{displayName}</h3>
              </div>
              {tagline && (
                <p className="text-[var(--color-accent,#A8C686)] mb-4 text-lg">{tagline}</p>
              )}
              <p className="text-white/80 text-sm leading-relaxed max-w-md">
                {description || 'Ihre Experten für professionelle Gartengestaltung. Wir legen Wert auf Qualität, Nachhaltigkeit und Kundenzufriedenheit.'}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-[var(--color-accent,#A8C686)]">Quick Links</h4>
              <div className="space-y-3">
                {footerLinks.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.href || (item as any).link)}
                    className="block text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-[var(--color-accent,#A8C686)]">Kontakt</h4>
              <div className="space-y-4">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm group"
                  >
                    <Phone className="w-4 h-4 text-[var(--color-accent,#A8C686)]" />
                    {phone}
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm group break-all"
                  >
                    <Mail className="w-4 h-4 text-[var(--color-accent,#A8C686)]" />
                    {email}
                  </a>
                )}
                {address && (
                  <div className="flex items-start gap-3 text-white/80 text-sm">
                    <MapPin className="w-4 h-4 text-[var(--color-accent,#A8C686)] mt-0.5 flex-shrink-0" />
                    <span className="whitespace-pre-line">{address}</span>
                  </div>
                )}
              </div>

              {socialLinks && (
                <div className="flex gap-4 mt-6">
                  {Array.isArray(socialLinks) ? (
                    socialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 hover:bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center transition-all"
                      >
                        {link.platform === 'instagram' && <Instagram className="w-5 h-5" />}
                        {link.platform === 'facebook' && <Facebook className="w-5 h-5" />}
                      </a>
                    ))
                  ) : (
                    <>
                      {socialLinks.instagram && (
                        <a
                          href={socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/10 hover:bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center transition-all"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {socialLinks.facebook && (
                        <a
                          href={socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/10 hover:bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center transition-all"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">
                {copyright || `© ${new Date().getFullYear()} ${displayName}. Alle Rechte vorbehalten.`}
              </p>
              {legalLinks && legalLinks.length > 0 && (
                <div className="flex gap-6">
                  {legalLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-2">{businessName}</h3>
            {tagline && (
              <p className="text-gray-400 mb-4">{tagline}</p>
            )}
            <p className="text-gray-400 text-sm leading-relaxed">
              {description || 'Ihre Experten für professionelle Dienstleistungen. Wir legen Wert auf Qualität, Zuverlässigkeit und Kundenzufriedenheit.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {footerLinks.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href || (item as any).link)}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          {(phone || email || address || openingHours) && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <div className="space-y-3">
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {phone}
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {email}
                  </a>
                )}

                {address && (
                  <div className="flex items-start gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="whitespace-pre-line">{address}</span>
                  </div>
                )}

                {openingHours && (
                  <div className="flex items-start gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="whitespace-pre-line">{openingHours}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {copyright || `© ${new Date().getFullYear()} ${businessName}. Alle Rechte vorbehalten.`}
            </p>

            {/* Social Links */}
            {socialLinks && (Object.keys(socialLinks).length > 0) && (
              <div className="flex items-center gap-4">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
