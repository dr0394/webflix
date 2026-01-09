import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

const team = [
  {
    name: 'Dr. Sarah Müller',
    role: 'Leitende Physiotherapeutin',
    image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Manuelle Therapie, Sportphysiotherapie',
  },
  {
    name: 'Michael Weber',
    role: 'Physiotherapeut',
    image: 'https://images.pexels.com/photos/6274712/pexels-photo-6274712.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Krankengymnastik, Elektrotherapie',
  },
  {
    name: 'Anna Schmidt',
    role: 'Physiotherapeutin',
    image: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialization: 'Lymphdrainage, Massage',
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Unser Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Experten mit Herz und Verstand
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Unser hochqualifiziertes Team steht Ihnen mit langjähriger Erfahrung
            und modernsten Therapiemethoden zur Seite.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-teal-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl border border-teal-200">
            <div className="bg-teal-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <Award className="text-teal-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Zertifizierte Qualität
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Alle unsere Therapeuten verfügen über staatliche Anerkennung und bilden sich
              kontinuierlich fort. Regelmäßige Qualitätssicherung garantiert höchste Standards.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl border border-blue-200">
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="text-blue-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Fortbildungen
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Unser Team nimmt regelmäßig an Fortbildungen teil, um Ihnen stets die
              neuesten und effektivsten Behandlungsmethoden anbieten zu können.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
