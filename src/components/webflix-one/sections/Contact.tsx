import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactProps } from '../types';

export const Contact: React.FC<ContactProps & { designVariant?: string }> = ({
  title,
  subtitle,
  email,
  phone,
  address,
  mapUrl,
  openingHours,
  designVariant
}) => {
  if (designVariant === 'luxury-contact-elegant') {
    return (
      <section id="contact" className="py-24 bg-[var(--color-secondary,#F8F6EC)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 rounded-full bg-[var(--color-primary,#2E4633)]/10 text-[var(--color-primary,#2E4633)] text-sm font-medium mb-6">
              Kontakt
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">{title}</h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Kontaktinformationen</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[var(--color-primary,#2E4633)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Telefon</p>
                      <a href={`tel:${phone?.replace(/\s/g, '')}`} className="text-[var(--color-primary,#2E4633)] hover:text-[var(--color-accent,#A8C686)] font-medium transition-colors">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[var(--color-primary,#2E4633)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">E-Mail</p>
                      <a href={`mailto:${email}`} className="text-[var(--color-primary,#2E4633)] hover:text-[var(--color-accent,#A8C686)] font-medium transition-colors break-all">
                        {email}
                      </a>
                    </div>
                  </div>

                  {address && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[var(--color-primary,#2E4633)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Adresse</p>
                        <p className="text-gray-600 whitespace-pre-line">{address}</p>
                      </div>
                    </div>
                  )}

                  {openingHours && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--color-accent,#A8C686)] rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[var(--color-primary,#2E4633)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Öffnungszeiten</p>
                        <div className="text-gray-600 space-y-1">
                          {Array.isArray(openingHours) ? (
                            openingHours.map((item: any, idx: number) => (
                              <div key={idx}>
                                <span className="font-medium">{item.day}:</span> {item.hours}
                              </div>
                            ))
                          ) : (
                            <p className="whitespace-pre-line">{openingHours}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.5973894428845!2d7.014761!3d51.455322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI3JzE5LjIiTiA3wrAwMCc1My4xIkU!5e0!3m2!1sde!2sde!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Karte"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Kontakt
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8 border-2 border-sky-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontaktinformationen</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Telefon</p>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sky-600 hover:text-sky-700 font-medium">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">E-Mail</p>
                    <a href={`mailto:${email}`} className="text-sky-600 hover:text-sky-700 font-medium">
                      {email}
                    </a>
                  </div>
                </div>

                {address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Adresse</p>
                      <p className="text-gray-600 whitespace-pre-line">{address}</p>
                    </div>
                  </div>
                )}

                {openingHours && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Öffnungszeiten</p>
                      <div className="text-gray-600 space-y-1">
                        {Array.isArray(openingHours) ? (
                          openingHours.map((item: any, idx: number) => (
                            <div key={idx}>
                              <span className="font-medium">{item.day}:</span> {item.hours}
                            </div>
                          ))
                        ) : (
                          <p className="whitespace-pre-line">{openingHours}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map or Placeholder */}
          <div>
            {mapUrl ? (
              <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="bg-gray-200 rounded-2xl h-full min-h-[400px] flex items-center justify-center">
                <p className="text-gray-500">Google Maps Integration</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
