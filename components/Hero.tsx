/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import GlassSurface from './GlassSurface';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      try { window.history.pushState(null, '', `#${targetId}`); } catch (err) {}
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#D6D1C7]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=2000" 
            alt="Dog in misty nature" 
            className="w-full h-full object-cover grayscale contrast-[0.8] brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-[#433E38]/40 mix-blend-multiply"></div>
      </div>

      {/* Liquid Elements (Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/20 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob"></div>
         <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#EBE7DE]/30 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content wrapped in Physical Glass */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="animate-fade-in-up w-full max-w-4xl">
            <GlassSurface borderRadius={40} className="p-12 shadow-2xl" backgroundOpacity={0.08} saturation={1.8}>
                <span className="relative block text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white/90 mb-8 px-6 py-2.5 rounded-full mx-auto w-fit border border-white/30 bg-white/10 backdrop-blur-sm">
                    Wild Caught & Grass Fed
                </span>
                <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white tracking-tight mb-8 drop-shadow-sm">
                    Nature's <span className="italic text-[#f7ffe0] opacity-90">Alchemy.</span>
                </h1>
                <p className="relative max-w-lg mx-auto text-lg md:text-xl text-white/95 font-light leading-relaxed mb-12">
                    Nutrition from the edge of the world. <br/>
                    Pure, potent, and crafted for their wild spirit.
                </p>
                
                <a 
                    href="#products" 
                    onClick={(e) => handleNavClick(e, 'products')}
                    className="relative group px-12 py-4.5 bg-white/20 backdrop-blur-md border border-white/40 text-[#F5F2EB] rounded-[170px] text-xs font-bold uppercase tracking-widest hover:bg-white/30 transition-all duration-500 overflow-hidden shadow-2xl inline-block"
                >
                    <span className="relative z-10">Discover The Magic</span>
                </a>
            </GlassSurface>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
};

export default Hero;