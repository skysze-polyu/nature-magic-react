/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState, useRef } from 'react';

const CollectionImmersive: React.FC = () => {
  const [count, setCount] = useState(0);
  const [hasViewed, setHasViewed] = useState(false);
  
  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null); // New track for sequential reveal
  const closerRef = useRef<HTMLDivElement>(null);

  // State
  // 0 to 1: Progress of scrolling through the "Info Track"
  const [revealProgress, setRevealProgress] = useState(0);
  // 0 to 1: Progress of the final "Closer" covering the cards
  const [fanProgress, setFanProgress] = useState(0);

  // Counter Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
            let start = 0;
            const end = 96;
            const duration = 2000;
            const incrementTime = duration / end;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);
        }
    }, { threshold: 0.5 });

    if (heroRef.current) {
        observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [hasViewed]);

  // Scroll Listener for Reveal & Fan Effects
  useEffect(() => {
    const handleScroll = () => {
        const windowHeight = window.innerHeight;

        // 1. Calculate Reveal Progress (based on the invisible Track)
        if (trackRef.current) {
            const trackRect = trackRef.current.getBoundingClientRect();
            // Track starts entering when trackRect.top < windowHeight
            // We want progress 0 when top is at windowHeight
            // We want progress 1 when bottom is at windowHeight (end of track)
            
            // However, to ensure cards start showing as soon as Hero lifts:
            // The Hero lifts as soon as we start scrolling. The Track sits right under the Hero.
            
            // Let's define: 
            // Progress 0: Top of track is at bottom of viewport.
            // Progress 1: Bottom of track is at bottom of viewport.
            
            const trackHeight = trackRect.height;
            const scrolledDistance = windowHeight - trackRect.top;
            
            // Normalize
            let rProgress = scrolledDistance / (trackHeight * 0.8); // 0.8 factor to finish reveal slightly before end
            rProgress = Math.max(0, Math.min(1, rProgress));
            setRevealProgress(rProgress);
        }

        // 2. Calculate Fan/Stacking Progress (based on Closer)
        if (closerRef.current) {
            const closerRect = closerRef.current.getBoundingClientRect();
            const triggerPoint = windowHeight;
            const endPoint = windowHeight * 0.2;
            
            let fProgress = (triggerPoint - closerRect.top) / (triggerPoint - endPoint);
            fProgress = Math.max(0, Math.min(1, fProgress));
            setFanProgress(fProgress);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to generate styles for each card
  // combining sequential reveal AND final fanning
  const getCardStyle = (index: number) => {
      // --- Reveal Logic ---
      // We divide the scroll progress into 4 segments (0.0 - 0.25, 0.25 - 0.5, etc.)
      // Card 1 starts at 0.05
      // Card 2 starts at 0.25
      // Card 3 starts at 0.50
      // Card 4 starts at 0.75
      const startThreshold = 0.05 + (index * 0.22); 
      
      // Calculate opacity for reveal (0 -> 1)
      // Transition window is 0.15 (15% of scroll height)
      let opacity = (revealProgress - startThreshold) / 0.15;
      opacity = Math.max(0, Math.min(1, opacity));

      // Calculate translation for reveal (slide up effect)
      // Moves from 100px down to 0px
      const entryTranslateY = (1 - opacity) * 100;

      // --- Fan/Stack Logic ---
      // If fanProgress > 0, we override/add to the transform
      let fanTransform = '';
      let fanOpacityMod = 1;

      if (fanProgress > 0) {
          const rotation = (index - 1.5) * 10; // -15, -5, 5, 15
          fanTransform = `
            translate3d(0, ${200 * fanProgress}px, 0) 
            scale(${1 - (fanProgress * 0.2)}) 
            rotate(${rotation * fanProgress}deg)
          `;
          fanOpacityMod = 1 - (fanProgress * 0.4);
      }

      // If opacity is 0 (not revealed yet), hide completely
      if (opacity === 0) return { opacity: 0, transform: 'translateY(50px)' };

      return {
          opacity: opacity * fanOpacityMod,
          transform: fanProgress > 0 
            ? fanTransform // When stacking, ignore entry translate
            : `translate3d(0, ${entryTranslateY}px, 0)`, // Normal entry
          transition: fanProgress > 0 ? 'none' : 'opacity 0.5s ease-out, transform 0.5s ease-out',
          zIndex: index,
      };
  };

  return (
    <div className="w-full bg-[#F5F2EB] relative">
        
        {/* --- LAYER 1: FIXED GRID (The Stage) --- */}
        <div className="fixed inset-0 w-full h-screen z-0 flex items-center justify-center pointer-events-none">
            <div className="max-w-[1400px] w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                
                {/* Card 1: 0 Additives */}
                <div 
                    className="glass-panel p-8 md:p-12 rounded-3xl shadow-lg bg-white/60 flex flex-col justify-between h-[320px] origin-bottom"
                    style={getCardStyle(0)}
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-6xl md:text-7xl font-serif text-[#2C2A26] animate-[pulseScale_3s_ease-in-out_infinite]">0</h3>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] border border-[#A8A29E]/30 px-3 py-1 rounded-full">Pure</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-serif text-[#2C2A26] mb-2">0添加</h4>
                        <p className="text-[#5D5A53] font-light text-sm leading-relaxed">
                            不含穀物、膠質與誘食劑。純淨無負擔。
                        </p>
                    </div>
                </div>

                {/* Card 2: 3 Core Ingredients */}
                <div 
                    className="glass-panel p-8 md:p-12 rounded-3xl shadow-lg bg-white/60 flex flex-col justify-between h-[320px] origin-bottom"
                    style={getCardStyle(1)}
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-6xl md:text-7xl font-serif text-[#2C2A26] animate-[pulseScale_3s_ease-in-out_infinite_1s]">3</h3>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] border border-[#A8A29E]/30 px-3 py-1 rounded-full">Core</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-serif text-[#2C2A26] mb-2">3大核心成分</h4>
                        <p className="text-[#5D5A53] font-light text-sm leading-relaxed">
                            綠唇胎貝、牛磺酸、SDAP動物蛋白。
                        </p>
                    </div>
                </div>

                {/* Card 3: Water (Flowing) */}
                <div 
                    className="relative overflow-hidden rounded-3xl shadow-lg h-[320px] origin-bottom"
                    style={getCardStyle(2)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#E0F7FA] bg-[length:200%_200%] animate-[flow_6s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
                    <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end">
                        <h3 className="text-2xl font-serif text-[#2C2A26] mb-2">紐西蘭純淨水源</h3>
                        <p className="text-[#455A64] font-light text-sm">維持體內酸鹼平衡，補充微量元素。</p>
                        {/* Water Ripple SVG */}
                        <div className="absolute top-6 right-6 opacity-30">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#006064" strokeWidth="1">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]"/>
                                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" strokeDasharray="2 2" className="animate-[spin_15s_linear_infinite_reverse]"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card 4: Fern (Expanding) */}
                <div 
                    className="glass-panel p-8 md:p-12 rounded-3xl shadow-lg bg-[#2C2A26] text-[#F5F2EB] flex flex-col justify-between h-[320px] origin-bottom"
                    style={getCardStyle(3)}
                >
                    <div className="self-end w-20 h-20">
                         {/* Animated Fern SVG */}
                         <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-2 overflow-visible">
                             {/* Stem growing */}
                            <path d="M50 100 Q50 60 80 30" className="opacity-50" strokeDasharray="5" />
                            <path d="M50 100 Q50 50 20 40" className="opacity-50" strokeDasharray="5" />
                            {/* Main leaves expanding */}
                            <path d="M50 90 L80 80" className="animate-[draw_3s_ease-out_infinite]"/>
                            <path d="M50 80 L20 75" className="animate-[draw_3s_ease-out_infinite_0.5s]"/>
                            <path d="M50 70 L75 60" className="animate-[draw_3s_ease-out_infinite_1s]"/>
                            <path d="M50 60 L25 55" className="animate-[draw_3s_ease-out_infinite_1.5s]"/>
                            <path d="M50 90 V 20" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif mb-2">銀蕨認證</h3>
                        <p className="text-xs opacity-70 uppercase tracking-widest">FernMark Licence</p>
                    </div>
                </div>

            </div>
        </div>

        {/* --- LAYER 2: SCROLLING HERO (The Curtain) --- */}
        <div ref={heroRef} className="relative z-20 w-full h-screen bg-[#2C2A26] flex items-center justify-center overflow-hidden">
             <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            >
                <source src="https://videos.pexels.com/video-files/4770287/4770287-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 text-center text-[#F5F2EB] mix-blend-screen">
                <h1 className="text-[12rem] md:text-[20rem] font-serif leading-none tracking-tighter">
                    {count}%
                </h1>
                <p className="text-2xl md:text-3xl font-serif mt-[-2rem] md:mt-[-4rem] uppercase tracking-[0.2em] opacity-80">
                    High Meat Content
                </p>
            </div>
            
            <div className="absolute bottom-12 text-white/40 text-sm animate-bounce tracking-widest uppercase">
                Scroll to Discover
            </div>
        </div>

        {/* --- INVISIBLE TRACK (The Pacing Mechanism) --- */}
        {/* Height 300vh gives plenty of time to scroll and see cards appear 1 by 1 */}
        <div ref={trackRef} className="relative z-10 w-full h-[300vh] pointer-events-none"></div>

        {/* --- LAYER 3: THE CLOSER (1 CAN) --- */}
        <div ref={closerRef} className="relative z-30 bg-[#F5F2EB] min-h-screen flex flex-col items-center justify-center py-24 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
             <div className="max-w-4xl mx-auto px-6 text-center">
                 <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#2C2A26] to-transparent mx-auto mb-12 opacity-30"></div>

                 <h2 className="text-9xl md:text-[15rem] font-serif text-[#2C2A26] leading-none mb-6">1 罐</h2>
                 <h3 className="text-xl font-bold uppercase tracking-[0.3em] text-[#A8A29E] mb-12">Total Nutrition</h3>
                 
                 <p className="text-xl md:text-2xl text-[#5D5A53] font-light leading-relaxed max-w-2xl mx-auto mb-16">
                     匯聚純淨肉源與天然營養。<br/>
                     每一口都是對野性本能的致敬，<br/>
                     簡單一罐，全面滿足。
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#D6D1C7] pt-12 text-left md:text-center">
                    <div>
                        <strong className="block text-xl font-serif text-[#2C2A26] mb-2">96% Meat</strong>
                        <p className="text-sm text-[#A8A29E]">滿罐鮮肉</p>
                    </div>
                    <div>
                        <strong className="block text-xl font-serif text-[#2C2A26] mb-2">Hydration</strong>
                        <p className="text-sm text-[#A8A29E]">水分補給</p>
                    </div>
                    <div>
                        <strong className="block text-xl font-serif text-[#2C2A26] mb-2">New Zealand</strong>
                        <p className="text-sm text-[#A8A29E]">純淨產地</p>
                    </div>
                 </div>
             </div>
        </div>

        <style>{`
            @keyframes flow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes draw {
                0% { stroke-dasharray: 0 100; opacity: 0; }
                50% { opacity: 1; }
                100% { stroke-dasharray: 100 100; opacity: 0; }
            }
            @keyframes pulseScale {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `}</style>
    </div>
  );
};

export default CollectionImmersive;