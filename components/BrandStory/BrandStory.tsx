/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { STORY_CHAPTERS } from '../constants';
import { JournalArticle } from '../types';

interface BrandStoryProps {
    onChapterClick: (chapter: JournalArticle) => void;
}

const BrandStory: React.FC<BrandStoryProps> = ({ onChapterClick }) => {
  return (
    <div className="min-h-screen bg-[#F5F2EB] animate-fade-in-up">
       
       {/* --- HERO BANNER (Heart & Journey) --- */}
       <section className="relative h-[90vh] flex items-center overflow-hidden">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
            >
                <source src="https://videos.pexels.com/video-files/4770287/4770287-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 w-full">
                <div className="max-w-3xl glass-panel p-10 md:p-16 rounded-[3rem] bg-white/10 border-white/20">
                    <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#F5F2EB] mb-6">Our Origin Story</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">The Heart and <br/><span className="italic">Journey</span></h1>
                    <p className="text-xl text-white/90 font-light leading-relaxed mb-10">
                        From pet expos across Asia to the pristine wilderness of New Zealand, our mission was simple: 
                        To find a nutrition that wasn't just industry—but alchemy.
                    </p>
                    <div className="w-12 h-px bg-white/50"></div>
                </div>
            </div>
       </section>

       {/* --- INTRO SECTION (The Search) --- */}
       <section className="py-32 px-6 md:px-12 max-w-[1200px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-8">The Search for the Best</h2>
            <div className="w-20 h-1 bg-[#3A4D39] mx-auto mb-12 rounded-full"></div>
            <p className="text-xl text-[#5D5A53] font-light leading-loose max-w-3xl mx-auto italic">
                "We discovered the secret: Nature Magic is the in-house brand of the same world-class factory that crafts for ZIWI and K9 Natural. Quality is its only packaging."
            </p>
       </section>

       {/* --- CHAPTER ENTRY POINTS (The 5 Roadblocks) --- */}
       <section className="py-24 bg-[#EBE7DE]">
           <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="max-w-xl">
                        <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#A8A29E] mb-4">Core Chapters</span>
                        <h3 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">The Five Pillars of Magic</h3>
                    </div>
                </div>

                {/* Entry Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {STORY_CHAPTERS.map((chapter, index) => (
                        <div 
                            key={chapter.id} 
                            onClick={() => onChapterClick(chapter)}
                            className={`group cursor-pointer relative overflow-hidden rounded-[2.5rem] bg-white h-[500px] transition-all duration-700 hover:-translate-y-4 shadow-xl ${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                        >
                            <img 
                                src={chapter.image} 
                                alt={chapter.title} 
                                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            
                            <div className="absolute bottom-0 left-0 p-10 md:p-12 w-full text-white">
                                <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-white/60 mb-3">{chapter.category}</span>
                                <h4 className="text-3xl md:text-4xl font-serif mb-4 group-hover:underline underline-offset-8 decoration-1">{chapter.title}</h4>
                                <p className="text-sm font-light text-white/70 max-w-md line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    {chapter.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
           </div>
       </section>

       {/* --- CLOSING (Guiding Principle) --- */}
       <section className="py-40 px-6 md:px-12 bg-[#2C2A26] text-white overflow-hidden relative">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-20">
                <div className="w-full md:w-1/2">
                    <div className="relative aspect-square rounded-full overflow-hidden border-8 border-white/10 p-4">
                        <img 
                            src="https://naturemagic.com.hk/cdn/shop/files/Nature_Magic_HKMO_Team_Founder.png?v=1759564092" 
                            alt="Team Principle" 
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <span className="block text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-6">Guiding Principle</span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-8">Purity is the only Magic.</h2>
                    <p className="text-xl font-light leading-loose text-white/70 mb-10">
                        "As the team bringing Nature Magic to you, our first step wasn't to make noise, but to reaffirm purpose. 
                        We tune out the external hype to focus on the excellence within."
                    </p>
                    <div className="text-sm font-bold uppercase tracking-widest text-white/50">Principal, HKMO Team</div>
                </div>
            </div>
       </section>

    </div>
  );
};

export default BrandStory;