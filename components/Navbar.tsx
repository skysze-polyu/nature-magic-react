/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BRAND_NAME, STORY_CHAPTERS, TRANSLATIONS } from '../constants';
import GlassSurface from './GlassSurface';

interface NavbarProps {
  onNavClick: (type: string, param?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentView: string;
  language: 'zh' | 'en';
  onLanguageChange: (lang: 'zh' | 'en') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, cartCount, onOpenCart, currentView, language, onLanguageChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const t = TRANSLATIONS[language];
  const isHomePage = currentView === 'home';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, type: string, param?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    onNavClick(type, param);
  };

  const handleCartClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      onOpenCart();
  }

  const isLightMode = mobileMenuOpen || scrolled || !isHomePage;
  const textColorClass = isLightMode ? 'text-[#2C2A26]' : 'text-[#F5F2EB]';
  
  const navItems = [
    {
        title: t.nav.cat,
        id: 'Cat Magic',
        children: [
            { title: t.nav.grainFree, id: 'Cat Grain-Free' },
            { title: t.nav.jointCare, id: 'Cat Joint Care' }
        ]
    },
    {
        title: t.nav.dog,
        id: 'Dog Magic',
        children: [
            { title: t.nav.grainFree, id: 'Dog Grain-Free' },
            { title: t.nav.jointCare, id: 'Dog Joint Care' }
        ]
    },
    {
        title: t.nav.story,
        id: 'Magic Story',
        children: STORY_CHAPTERS.map(ch => ({ title: ch.title, id: ch.slug, type: 'journal-article', data: ch }))
    }
  ];

  return (
    <>
      <nav 
        className={`z-[200] transition-all duration-700 ease-in-out ${scrolled ? 'fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[1400px]' : 'absolute top-0 left-0 right-0 py-8 px-8'} ${mobileMenuOpen ? '!fixed !top-0 !left-0 !translate-x-0 !w-full !rounded-none !bg-[#F5F2EB] !px-8' : ''}`}
      >
        {scrolled && !mobileMenuOpen ? (
            <GlassSurface 
                borderRadius={170} 
                className="px-6 md:px-12 py-5 md:py-3.5 shadow-2xl" 
                backgroundOpacity={0.25}
                distortionScale={-120}
                redOffset={12}
                greenOffset={25}
                blueOffset={38}
                displace={25}
                blur={18}
                saturation={2.2}
            >
                <NavContent 
                    BRAND_NAME={BRAND_NAME} 
                    handleLinkClick={handleLinkClick}
                    navItems={navItems}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    onNavClick={onNavClick}
                    setMobileMenuOpen={setMobileMenuOpen}
                    onLanguageChange={onLanguageChange}
                    language={language}
                    handleCartClick={handleCartClick}
                    cartCount={cartCount}
                    scrolled={scrolled}
                    mobileMenuOpen={mobileMenuOpen}
                    textColorClass={textColorClass}
                    isLightMode={isLightMode}
                    t={t}
                />
            </GlassSurface>
        ) : (
            <div className="mx-auto flex items-center justify-between">
                 <NavContent 
                    BRAND_NAME={BRAND_NAME} 
                    handleLinkClick={handleLinkClick}
                    navItems={navItems}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    onNavClick={onNavClick}
                    setMobileMenuOpen={setMobileMenuOpen}
                    onLanguageChange={onLanguageChange}
                    language={language}
                    handleCartClick={handleCartClick}
                    cartCount={cartCount}
                    scrolled={scrolled}
                    mobileMenuOpen={mobileMenuOpen}
                    textColorClass={textColorClass}
                    isLightMode={isLightMode}
                    t={t}
                />
            </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#F5F2EB] z-[150] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
          <div className="flex flex-col items-center space-y-10 text-xl font-serif font-medium text-[#2C2A26] overflow-y-auto max-h-screen py-24 px-6 w-full">
            {navItems.map((item) => (
                <div key={item.id} className="flex flex-col items-center gap-5">
                    <span className="opacity-40 text-[13px] font-black font-sans tracking-[0.4em] uppercase">{item.title}</span>
                    <div className="flex flex-col items-center gap-3">
                        {item.children.map((child: any) => (
                            <a 
                                key={child.id}
                                href="#" 
                                onClick={(e) => {
                                    if (child.type === 'journal-article') {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        onNavClick('journal-detail', child.data);
                                    } else {
                                        handleLinkClick(e, 'collection', child.id);
                                    }
                                }}
                                className="hover:opacity-60 transition-opacity text-center text-4xl font-serif italic"
                            >
                                {child.title}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
            
            <div className="w-16 h-px bg-[#2C2A26]/10 my-4"></div>

            <div className="flex items-center bg-[#2C2A26]/5 rounded-[170px] p-2 border border-[#2C2A26]/10 mb-6">
                <button onClick={() => onLanguageChange('en')} className={`px-10 py-3.5 rounded-[170px] text-[13px] font-black transition-all ${language === 'en' ? 'bg-[#2C2A26] text-white' : 'text-[#2C2A26] opacity-40'}`}>ENGLISH</button>
                <button onClick={() => onLanguageChange('zh')} className={`px-10 py-3.5 rounded-[170px] text-[13px] font-black transition-all ${language === 'zh' ? 'bg-[#2C2A26] text-white' : 'text-[#2C2A26] opacity-40'}`}>繁體中文</button>
            </div>
            
            <button onClick={handleCartClick} className="hover:bg-[#2C2A26] hover:text-white transition-all text-[13px] font-black uppercase tracking-widest mt-4 px-14 py-5 border-2 border-[#2C2A26] rounded-full">
                {t.nav.cart} ({cartCount})
            </button>
          </div>
      </div>
    </>
  );
};

const NavContent = ({ BRAND_NAME, handleLinkClick, navItems, activeDropdown, setActiveDropdown, onNavClick, setMobileMenuOpen, onLanguageChange, language, handleCartClick, cartCount, scrolled, mobileMenuOpen, textColorClass, isLightMode, t }: any) => (
    <div className="flex items-center justify-between w-full">
          <a href="#" onClick={(e) => handleLinkClick(e, 'home')} className="z-50 relative transition-all duration-500 hover:opacity-80 flex items-center">
            <img 
              src="https://naturemagic.com.hk/cdn/shop/files/NATURE_MAGIC_LOGO_HK.svg?v=1762423193&width=360" 
              alt={BRAND_NAME}
              className={`transition-all duration-500 object-contain ${(!isLightMode && !scrolled) ? 'brightness-0 invert' : ''}`}
              style={{ width: scrolled ? '160px' : '200px', height: '20px' }}
            />
          </a>
          
          <div className={`hidden md:flex items-center gap-12 text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-500 ${textColorClass}`}>
            {navItems.map((item: any) => (
                <div key={item.id} className="relative group h-full" onMouseEnter={() => setActiveDropdown(item.id)} onMouseLeave={() => setActiveDropdown(null)}>
                    <button 
                        onClick={(e) => {
                            if (item.id === 'Magic Story') handleLinkClick(e, 'brand-story');
                            else handleLinkClick(e, 'collection', item.id);
                        }}
                        className="hover:opacity-40 transition-opacity flex items-center gap-2 py-4 focus:outline-none"
                    >
                        {item.title}
                        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div className={`absolute left-1/2 -translate-x-1/2 top-full w-72 pt-0 transition-all duration-300 origin-top pointer-events-none ${activeDropdown === item.id ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-2 invisible'}`}>
                        <div className="p-3 rounded-[2.5rem] liquid-glass-dark shadow-2xl mt-4 overflow-hidden border-white/20">
                            {item.children.map((child: any) => (
                                <a key={child.id} href="#" onClick={(e) => {
                                        if (child.type === 'journal-article') {
                                            e.preventDefault();
                                            onNavClick('journal-detail', child.data);
                                        } else {
                                            handleLinkClick(e, 'collection', child.id);
                                        }
                                    }}
                                    className="block px-8 py-5 text-[#F5F2EB] hover:bg-white/10 rounded-2xl text-[12px] font-bold tracking-widest transition-colors"
                                >
                                    {child.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
          </div>

          <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${textColorClass}`}>
            <div className="hidden lg:flex items-center bg-black/5 rounded-[170px] p-1.5 border border-black/5">
                <button onClick={() => onLanguageChange('en')} className={`px-5 py-2 rounded-[170px] text-[11px] font-black transition-all ${language === 'en' ? 'bg-white text-[#2C2A26] shadow-md' : 'text-current opacity-40 hover:opacity-100'}`}>EN</button>
                <button onClick={() => onLanguageChange('zh')} className={`px-5 py-2 rounded-[170px] text-[11px] font-black transition-all ${language === 'zh' ? 'bg-white text-[#2C2A26] shadow-md' : 'text-current opacity-40 hover:opacity-100'}`}>中</button>
            </div>

            <button onClick={handleCartClick} className={`text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all hidden sm:block px-8 py-3.5 rounded-[170px] border transition-all ${scrolled ? 'bg-[#2C2A26] text-[#F5F2EB] border-[#2C2A26]' : 'bg-transparent border-current'}`}>
              {t.nav.cart} ({cartCount})
            </button>
            
            <button className={`block md:hidden focus:outline-none transition-colors duration-500 p-2 ${textColorClass}`} onClick={() => setMobileMenuOpen((prev: boolean) => !prev)}>
               {mobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
               )}
            </button>
          </div>
    </div>
);

export default Navbar;