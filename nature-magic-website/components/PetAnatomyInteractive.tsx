/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';

interface AnatomyPoint {
  id: string;
  label: string;
  description: string;
  category: 'internal' | 'external';
  // Percentages for top/left position on the SVG canvas
  position: { top: number; left: number };
}

interface PetAnatomyInteractiveProps {
  petType: 'cat' | 'dog';
}

const PetAnatomyInteractive: React.FC<PetAnatomyInteractiveProps> = ({ petType }) => {
  const [activeGroup, setActiveGroup] = useState<'none' | 'internal' | 'external'>('none');
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when pet type changes
  useEffect(() => {
    setActiveGroup('none');
  }, [petType]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const catPoints: AnatomyPoint[] = [
    { id: 'brain', category: 'internal', label: 'Cognitive Health', description: 'Rich in DHA for sharp focus.', position: { top: 22, left: 78 } },
    { id: 'heart', category: 'internal', label: 'Cardiovascular', description: 'Taurine reinforced for a strong heart.', position: { top: 45, left: 60 } },
    { id: 'gut', category: 'internal', label: 'Microbiome', description: 'Prebiotics for digestive ease.', position: { top: 50, left: 35 } },
    { id: 'immune', category: 'internal', label: 'Immunity', description: 'Antioxidant-rich for defense.', position: { top: 55, left: 70 } },
    
    { id: 'joints', category: 'external', label: 'Mobility', description: 'Green Lipped Mussel supports fluid movement.', position: { top: 70, left: 20 } },
    { id: 'coat', category: 'external', label: 'Skin & Coat', description: 'Omega-3 oils for a soft, lustrous barrier.', position: { top: 35, left: 45 } },
  ];

  const dogPoints: AnatomyPoint[] = [
    { id: 'brain', category: 'internal', label: 'Alertness', description: 'Fatty acids for training.', position: { top: 20, left: 20 } },
    { id: 'heart', category: 'internal', label: 'Endurance', description: 'Proteins to fuel active hearts.', position: { top: 40, left: 35 } },
    { id: 'gut', category: 'internal', label: 'Digestion', description: 'Bio-available for sensitive stomachs.', position: { top: 50, left: 55 } },
    
    { id: 'joints', category: 'external', label: 'Agility', description: 'Chondroitin for shock absorption.', position: { top: 70, left: 75 } },
    { id: 'coat', category: 'external', label: 'Protection', description: 'Fats for a weather-resistant coat.', position: { top: 35, left: 50 } },
    { id: 'muscle', category: 'external', label: 'Muscle Tone', description: 'Amino acids for lean power.', position: { top: 45, left: 65 } },
  ];

  const points = petType === 'cat' ? catPoints : dogPoints;

  const toggleGroup = (group: 'internal' | 'external') => {
      setActiveGroup(prev => prev === group ? 'none' : group);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#EBE7DE] py-32 px-6 overflow-hidden relative">
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle moving blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/20 rounded-full blur-[80px] animate-[float_10s_ease-in-out_infinite] mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D6D1C7]/30 rounded-full blur-[60px] animate-[float_12s_ease-in-out_infinite_reverse] mix-blend-multiply"></div>
      </div>

      <div className={`max-w-[1200px] mx-auto relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Header & Toggle */}
        <div className="flex flex-col items-center mb-16 space-y-8">
           <h2 className="text-3xl md:text-5xl font-serif text-[#2C2A26] text-center leading-tight">
             The Science of <br/><span className="italic opacity-80">{petType === 'cat' ? 'Feline' : 'Canine'} Vitality</span>
           </h2>
           <p className="text-[#5D5A53] max-w-lg text-center font-light text-lg">
             Our recipes are engineered to target specific biological systems. Select a system to reveal the benefits.
           </p>

           {/* Dual Switches */}
           <div className="flex gap-6">
               {/* Internal System Switch */}
               <button 
                 onClick={() => toggleGroup('internal')}
                 className={`group flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-500 border backdrop-blur-sm ${
                    activeGroup === 'internal' 
                        ? 'bg-[#2C2A26] text-[#F5F2EB] border-[#2C2A26] shadow-xl scale-105' 
                        : 'bg-white/30 text-[#5D5A53] border-[#D6D1C7] hover:border-[#2C2A26] hover:bg-white/50'
                 }`}
               >
                 <span className={`w-2 h-2 rounded-full bg-current transition-all duration-500 ${activeGroup === 'internal' ? 'animate-pulse' : 'opacity-50'}`}></span>
                 <span className="text-xs font-bold uppercase tracking-[0.15em]">Internal Systems</span>
               </button>

               {/* External Body Switch */}
               <button 
                 onClick={() => toggleGroup('external')}
                 className={`group flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-500 border backdrop-blur-sm ${
                    activeGroup === 'external' 
                        ? 'bg-[#2C2A26] text-[#F5F2EB] border-[#2C2A26] shadow-xl scale-105' 
                        : 'bg-white/30 text-[#5D5A53] border-[#D6D1C7] hover:border-[#2C2A26] hover:bg-white/50'
                 }`}
               >
                 <span className={`w-2 h-2 rounded-full bg-current transition-all duration-500 ${activeGroup === 'external' ? 'opacity-100' : 'opacity-50'}`}></span>
                 <span className="text-xs font-bold uppercase tracking-[0.15em]">Physical Body</span>
               </button>
           </div>
        </div>

        {/* Visualization Container */}
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] max-w-[1000px] mx-auto select-none">
           
           {/* Silhouettes Wrapper with Breathing Animation */}
           <div className="w-full h-full animate-[breathe_8s_ease-in-out_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                    {petType === 'cat' ? (
                        <path 
                        d="M75 25 Q 85 20 90 30 Q 95 35 92 40 Q 85 45 80 45 L 80 85 Q 80 90 75 90 L 70 90 L 70 60 L 50 60 L 40 85 L 35 90 L 30 90 Q 25 90 25 85 L 30 55 Q 20 50 15 40 Q 5 25 15 30 Q 10 15 20 20 Q 25 10 40 25 L 75 25 Z" 
                        fill="#3A4D39" 
                        className="transition-all duration-1000 ease-in-out opacity-90"
                        />
                    ) : (
                        <path 
                        d="M20 20 Q 25 10 30 20 L 35 15 L 40 25 L 70 30 Q 80 30 90 45 L 95 65 L 90 85 Q 85 90 80 85 L 80 70 L 70 60 L 60 65 L 65 85 L 60 90 L 55 85 L 50 65 L 35 60 L 30 85 L 25 90 L 20 85 L 25 50 Q 15 45 15 35 Q 15 25 20 20 Z" 
                        fill="#3A4D39" 
                        className="transition-all duration-1000 ease-in-out opacity-90"
                        />
                    )}
                </svg>
           </div>

           {/* Anchors & Cards */}
           {points.map((point, idx) => {
              const isPointActive = activeGroup === point.category;
              // If we are showing a group, dim the others heavily. If 'none', keep slightly visible.
              const isDimmed = activeGroup !== 'none' && !isPointActive;
              
              return (
                <div 
                    key={point.id}
                    className={`absolute transition-all duration-700 ease-out ${isDimmed ? 'opacity-10 blur-[1px] grayscale pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
                    style={{ top: `${point.position.top}%`, left: `${point.position.left}%` }}
                >
                    {/* The Anchor Point - Clickable only if not dimmed */}
                    <div 
                        className="relative -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center cursor-pointer group"
                    >
                        {/* Pulse Ring - Only animate if active group matches OR none is selected */}
                        <div className={`absolute inset-0 rounded-full border border-white/40 ${isPointActive ? 'scale-150 opacity-0' : 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30'}`}></div>
                        
                        {/* Core Dot */}
                        <div className={`w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)] z-10 transition-transform duration-500 ${isPointActive ? 'scale-125' : 'group-hover:scale-150'}`}></div>
                        
                        {/* SVG Circle graphic around dot */}
                        <svg className={`absolute inset-0 w-full h-full rotate-0 transition-all duration-1000 ease-in-out ${isPointActive ? 'scale-0 opacity-0' : 'scale-100 opacity-60 animate-[spin_12s_linear_infinite]'}`} viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-70" />
                        </svg>
                    </div>

                    {/* The Info Card (Revealed on Active Group Match) */}
                    <div 
                        className={`absolute z-20 top-8 left-1/2 -translate-x-1/2 w-56 md:w-64 glass-panel bg-white/80 p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-white/50 transition-all duration-700 origin-top pointer-events-none
                            ${isPointActive
                                ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
                                : 'opacity-0 scale-90 -translate-y-8 rotate-1'
                            }
                        `}
                        // Add staggered delay for opening based on index for a cascading feel
                        style={{ transitionDelay: isPointActive ? `${idx * 80}ms` : '0ms' }}
                    >
                        {/* Decorative header line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2C2A26] to-transparent opacity-20"></div>
                        
                        <h4 className="text-sm font-bold text-[#2C2A26] uppercase tracking-wide mb-2 flex items-center gap-2">
                             {point.label}
                        </h4>
                        <p className="text-xs text-[#5D5A53] leading-relaxed font-medium">
                            {point.description}
                        </p>
                    </div>
                    
                    {/* Connecting Line - Draws down from the dot to the card */}
                    <div className={`absolute top-0 left-1/2 w-px bg-gradient-to-b from-white to-transparent -translate-x-1/2 transition-all duration-700 ease-in-out ${isPointActive ? 'h-8 opacity-100' : 'h-0 opacity-0'}`}></div>
                </div>
              );
           })}

        </div>
      </div>

      {/* Internal Styles for Custom Keyframes to keep component self-contained */}
      <style>{`
        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -20px); }
        }
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default PetAnatomyInteractive;
