import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E&H</span>
              </div>
              <div>
                <div className="text-white font-bold text-xl">E&H Klisch</div>
                <div className="text-amber-400 text-xs">Bau & Handwerk</div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Ihr zuverlässiger Partner für Bau-, Renovierungs- und Sanierungsprojekte seit über 30 Jahren.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400">Leistungen</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Neubau
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Umbau & Sanierung
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Renovierung
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Wartung & Reparatur
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Notdienst 24/7
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                <div className="text-slate-400">
                  Musterstraße 123<br />
                  12345 Musterstadt
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="tel:+49123456789" className="text-slate-400 hover:text-amber-400 transition-colors">
                  0123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@eundh-klisch.de" className="text-slate-400 hover:text-amber-400 transition-colors">
                  info@eundh-klisch.de
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400">Öffnungszeiten</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                <div className="text-slate-400">
                  <div className="font-medium text-white mb-2">Bürozeiten</div>
                  <div>Mo-Fr: 7:00 - 17:00 Uhr</div>
                  <div>Sa: 8:00 - 12:00 Uhr</div>
                </div>
              </li>
              <li className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mt-4">
                <div className="text-amber-400 font-bold mb-1">24/7 Notdienst</div>
                <div className="text-slate-300 text-sm">Auch außerhalb der Geschäftszeiten für Sie da</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 E&H Klisch. Alle Rechte vorbehalten.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                Impressum
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                Datenschutz
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                AGB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
