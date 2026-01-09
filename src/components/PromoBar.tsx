import React from 'react';

const PromoBar = () => {
  const logos = [
    'https://cdn.prod.website-files.com/6685978ca68674910cce55d7/6731f71e47d75de47101645a_Jad-Helou_Logo_Schutzraum_wei%C3%9F_RGB-p-500.png',
    'https://aesthetic-home.de/wp-content/uploads/2019/10/logo_color_wide-1.png',
    'https://cdn.prod.website-files.com/64da9115ad6b28ffcb813aa6/667bd1f40dd575e2dfcf5656_NIKO%20Netzwerk%20Inspirations%20Kongress_LOGO_negativ_web-p-500.png',
    'https://lh3.googleusercontent.com/p/AF1QipObwGAC9MNVxS5hiF1TKlHz7FwjAi6xw9G6ug7B=s1360-w1360-h1020-rw',
    'https://shop.rotundkehlchen.de/cdn/shop/files/Rot_u_Kehlchen_Logo_Version_2_rot-2048x989_1_360x.png?v=1731680919',
    'https://i.imgur.com/TaHBycH.png',
    'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/679e01f8613e21e83306ce5c_Logo_weiss-p-800.png',
    'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/6798c531dffdf43d357dfa02_Kein%20Titel%20(768%20x%20215%20px)%20(768%20x%20300%20px)%20(83%20x%2040%20px)%20(1).png'
  ];

  return (
    <div className="bg-gradient-to-b from-black/80 via-black/60 to-black/80 border-y border-white/10 py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-white">
          Zufriedene Kunden
        </h2>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#111111] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#111111] to-transparent z-10"></div>

          <div className="flex animate-scroll">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-3 sm:mx-4"
              >
                <div className="w-32 h-20 sm:w-40 sm:h-24 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center p-3">
                  <img
                    src={logo}
                    alt={`Kundenlogo ${index + 1}`}
                    className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;