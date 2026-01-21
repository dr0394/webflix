import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        <h1 className="font-montserrat font-bold mb-8 sm:mb-10 md:mb-12 leading-tight">
          <span className="block mb-4 sm:mb-5">
            <span className="text-white font-black tracking-tight text-[32px] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Game changing Websites
            </span>
          </span>
          <span className="block text-base leading-relaxed sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide px-4 sm:px-0">
            <span className="text-gray-300">Webflix bringt dich aufs nächste Level,</span>
            <br className="block" />
            <span className="text-gray-400 font-extralight">mit der perfekten Lösung für deine Online Präsenz.</span>
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {/* Express Websites */}
          <div
            onClick={() => window.location.href = '/custom'}
            className="relative bg-black/60 border-2 border-[#E2E5E9]/30 hover:border-pink-400/80 hover:shadow-2xl hover:shadow-pink-500/40 md:hover:scale-[1.03] transition-all duration-500 cursor-pointer group overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8"
          >
            {/* Animated gradient orbs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-400 to-orange-400 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                  <img
                    src="https://i.imgur.com/cFVa9f4.png"
                    alt=""
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-1">
                    WEBFLIX<br/>WEBSITES
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7 text-white">
                <div className="flex items-center gap-3 group/item">
                  <div className="w-2 h-2 rounded-full bg-[#E2E5E9] group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 flex-shrink-0 shadow-lg shadow-[#E2E5E9]/30 group-hover:shadow-pink-500/50 group-hover/item:scale-125 transition-all"></div>
                  <p className="text-sm sm:text-base md:text-lg font-bold group-hover/item:translate-x-1 transition-transform">Premium-Designs</p>
                </div>
                <div className="flex items-center gap-3 group/item">
                  <div className="w-2 h-2 rounded-full bg-[#E2E5E9] group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 flex-shrink-0 shadow-lg shadow-[#E2E5E9]/30 group-hover:shadow-pink-500/50 group-hover/item:scale-125 transition-all"></div>
                  <p className="text-sm sm:text-base md:text-lg font-bold group-hover/item:translate-x-1 transition-transform">Ab 499€</p>
                </div>
                <div className="flex items-center gap-3 group/item">
                  <div className="w-2 h-2 rounded-full bg-[#E2E5E9] group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-pink-400 flex-shrink-0 shadow-lg shadow-[#E2E5E9]/30 group-hover:shadow-pink-500/50 group-hover/item:scale-125 transition-all"></div>
                  <p className="text-sm sm:text-base md:text-lg font-bold group-hover/item:translate-x-1 transition-transform">48h online</p>
                </div>
              </div>

              <button className="w-full py-3.5 sm:py-4 bg-[#E2E5E9] hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 rounded-xl sm:rounded-2xl font-black text-gray-800 hover:text-white text-sm sm:text-base transition-all duration-300 shadow-2xl shadow-[#E2E5E9]/30 hover:shadow-pink-500/50 group-hover:scale-[1.02] uppercase tracking-wider relative overflow-hidden">
                <span className="relative z-10">Weitere Infos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Individuell Entwickelt */}
          <div
            onClick={() => window.location.href = '/custom'}
            className="relative bg-black/50 border-2 border-[#E2E5E9]/30 hover:border-green-400/80 hover:shadow-2xl hover:shadow-green-500/40 md:hover:scale-[1.03] transition-all duration-500 cursor-pointer group overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8"
          >
            {/* Webflix Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500">
              <img
                src="https://i.imgur.com/2SbjgE7.png"
                alt=""
                className="w-40 h-40 object-contain transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Animated gradient orbs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-emerald-500/20 to-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                  <img
                    src="https://i.imgur.com/WDgHF29.png"
                    alt=""
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-1">
                    CUSTOM<br/>WEBSITES
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7 text-white">
                <div className="flex items-center gap-3 group/item">
                  <div className="w-2 h-2 rounded-full bg-[#E2E5E9] group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 flex-shrink-0 shadow-lg shadow-[#E2E5E9]/30 group-hover:shadow-green-500/50 group-hover/item:scale-125 transition-all"></div>
                  <p className="text-sm sm:text-base md:text-lg font-bold group-hover/item:translate-x-1 transition-transform">Enterprise Designs</p>
                </div>
                <div className="flex items-center gap-3 group/item">
                  <div className="w-2 h-2 rounded-full bg-[#E2E5E9] group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 flex-shrink-0 shadow-lg shadow-[#E2E5E9]/30 group-hover:shadow-green-500/50 group-hover/item:scale-125 transition-all"></div>
                  <p className="text-sm sm:text-base md:text-lg font-bold group-hover/item:translate-x-1 transition-transform">Digitale Komplettlösungen</p>
                </div>
                <div className="flex items-center gap-3 group/item">
                  <div className="w-2 h-2 rounded-full bg-[#E2E5E9] group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 flex-shrink-0 shadow-lg shadow-[#E2E5E9]/30 group-hover:shadow-green-500/50 group-hover/item:scale-125 transition-all"></div>
                  <p className="text-sm sm:text-base md:text-lg font-bold group-hover/item:translate-x-1 transition-transform">Ab 999€</p>
                </div>
              </div>

              <button className="w-full py-3.5 sm:py-4 bg-[#E2E5E9] hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-xl sm:rounded-2xl font-black text-gray-800 hover:text-white text-sm sm:text-base transition-all duration-300 shadow-2xl shadow-[#E2E5E9]/30 hover:shadow-green-500/50 group-hover:scale-[1.02] uppercase tracking-wider relative overflow-hidden">
                <span className="relative z-10">INDIVIDUELL GESTALTEN</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Logos Slider */}
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
          <p className="text-center text-white/60 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8 font-medium">
            Vertraut von über 847 zufriedenen Kunden
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-32 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-32 bg-gradient-to-l from-black/80 to-transparent z-10"></div>

            <div className="flex animate-scroll">
              {[
                'https://cdn.prod.website-files.com/6685978ca68674910cce55d7/6731f71e47d75de47101645a_Jad-Helou_Logo_Schutzraum_wei%C3%9F_RGB-p-500.png',
                'https://aesthetic-home.de/wp-content/uploads/2019/10/logo_color_wide-1.png',
                'https://cdn.prod.website-files.com/64da9115ad6b28ffcb813aa6/667bd1f40dd575e2dfcf5656_NIKO%20Netzwerk%20Inspirations%20Kongress_LOGO_negativ_web-p-500.png',
                'https://lh3.googleusercontent.com/p/AF1QipObwGAC9MNVxS5hiF1TKlHz7FwjAi6xw9G6ug7B=s1360-w1360-h1020-rw',
                'https://shop.rotundkehlchen.de/cdn/shop/files/Rot_u_Kehlchen_Logo_Version_2_rot-2048x989_1_360x.png?v=1731680919',
                'https://i.imgur.com/TaHBycH.png',
                'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/679e01f8613e21e83306ce5c_Logo_weiss-p-800.png',
                'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/6798c531dffdf43d357dfa02_Kein%20Titel%20(768%20x%20215%20px)%20(768%20x%20300%20px)%20(83%20x%2040%20px)%20(1).png'
              ].map((logo, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 mx-2 sm:mx-3 md:mx-4 lg:mx-6 group">
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 md:w-48 md:h-32 lg:w-56 lg:h-36 rounded-lg sm:rounded-xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center p-3 sm:p-4 md:p-6">
                    <img
                      src={logo}
                      alt={`Customer ${index + 1}`}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}

              {[
                'https://cdn.prod.website-files.com/6685978ca68674910cce55d7/6731f71e47d75de47101645a_Jad-Helou_Logo_Schutzraum_wei%C3%9F_RGB-p-500.png',
                'https://aesthetic-home.de/wp-content/uploads/2019/10/logo_color_wide-1.png',
                'https://cdn.prod.website-files.com/64da9115ad6b28ffcb813aa6/667bd1f40dd575e2dfcf5656_NIKO%20Netzwerk%20Inspirations%20Kongress_LOGO_negativ_web-p-500.png',
                'https://lh3.googleusercontent.com/p/AF1QipObwGAC9MNVxS5hiF1TKlHz7FwjAi6xw9G6ug7B=s1360-w1360-h1020-rw',
                'https://shop.rotundkehlchen.de/cdn/shop/files/Rot_u_Kehlchen_Logo_Version_2_rot-2048x989_1_360x.png?v=1731680919',
                'https://i.imgur.com/TaHBycH.png',
                'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/679e01f8613e21e83306ce5c_Logo_weiss-p-800.png',
                'https://cdn.prod.website-files.com/6798aed2feba24aba04b3ff0/6798c531dffdf43d357dfa02_Kein%20Titel%20(768%20x%20215%20px)%20(768%20x%20300%20px)%20(83%20x%2040%20px)%20(1).png'
              ].map((logo, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 mx-2 sm:mx-3 md:mx-4 lg:mx-6 group">
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 md:w-48 md:h-32 lg:w-56 lg:h-36 rounded-lg sm:rounded-xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center p-3 sm:p-4 md:p-6">
                    <img
                      src={logo}
                      alt={`Customer ${index + 1}`}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent"></div>

    </section>
  );
};

export default Hero;