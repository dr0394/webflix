import React from 'react';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Moderne Bürobeleuchtung',
    category: 'Gewerbe',
    image: 'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Smart Home Integration',
    category: 'Privat',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Photovoltaik-Anlage',
    category: 'Energie',
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Elektroinstallation Neubau',
    category: 'Neubau',
    image: 'https://images.pexels.com/photos/1029166/pexels-photo-1029166.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Industrielle Verkabelung',
    category: 'Industrie',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'LED-Außenbeleuchtung',
    category: 'Außen',
    image: 'https://images.pexels.com/photos/1571447/pexels-photo-1571447.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const ProjectsGallery = () => {
  return (
    <section id="projekte" className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Unsere Projekte
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Qualität, die überzeugt
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie eine Auswahl unserer erfolgreich realisierten Projekte.
            Von privaten Wohnungen bis zu großen Industrieanlagen.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <div className="inline-block bg-amber-500 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <div className="flex items-center gap-2 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span className="text-sm font-semibold">Details ansehen</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Sie möchten mehr Referenzen sehen oder ein persönliches Gespräch vereinbaren?
          </p>
          <a
            href="#kontakt"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
