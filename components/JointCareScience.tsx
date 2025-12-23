/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

type ScienceNode = 'core' | 'msm' | 'glucosamine' | 'chondroitin';

const JointCareScience: React.FC = () => {
  const [activeNode, setActiveNode] = useState<ScienceNode>('core');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNodeClick = (node: ScienceNode) => {
    setActiveNode(node);
    setIsDrawerOpen(true);
  };

  const content = {
    core: {
      title: "紐西蘭綠唇貽貝",
      subtitle: "啟動與修護 (The Origin)",
      desc: "研究確立為寵物活力啟動的核心原點。富含獨特 Omega-3、氨基酸及天然修護元素。其強效的抗炎潛能，是開啟身體自我修復程序的關鍵信號。",
      color: "bg-[#3A4D39]",
      textColor: "text-[#3A4D39]"
    },
    msm: {
      title: "MSM 有機硫",
      subtitle: "溫和支持 (Comfort)",
      desc: "一種天然有機硫化合物。其專業功能在於提供細胞舒適支持，並具備抗氧化活性。確保寵物在修護過程中的活動意願和生活品質。",
      color: "bg-[#D97706]",
      textColor: "text-[#D97706]"
    },
    glucosamine: {
      title: "葡萄糖胺",
      subtitle: "重建與鞏固 (Rebuild)",
      desc: "軟骨基質的關鍵原料。在體內的主要作用是刺激蛋白聚醣 (Proteoglycan) 的合成，提供關節和結締組織結構重建所需的核心物質。",
      color: "bg-[#8CA3A3]",
      textColor: "text-[#6B8080]"
    },
    chondroitin: {
      title: "軟骨素",
      subtitle: "潤滑與緩衝 (Lubricate)",
      desc: "軟骨基質的重要組成。以其強大的水合能力聞名，維持軟骨的彈性和必要的緩衝功能，確保關節的順暢活動和防磨損保護。",
      color: "bg-[#A8A29E]",
      textColor: "text-[#8C8881]"
    }
  };

  return (
    <section className="bg-[#EBE7DE] py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Text */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
           <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#3A4D39] mb-4">Awakening Philosophy</span>
           <h2 className="text-3xl md:text-5xl font-serif text-[#2C2A26] mb-6">Nature Magic 喚醒哲學</h2>
           <p className="max-w-2xl mx-auto text-[#5D5A53] font-light leading-relaxed hidden md:block">
             啟動寵物內在生命力的核心密碼。我們將紐西蘭綠唇貽貝的啟動力量與三大科學支柱精準整合，形成獨家的「4合1養護循環系統」。
           </p>
           {/* Mobile Hint */}
           <p className="text-[#A8A29E] text-sm md:hidden flex items-center justify-center gap-2 mt-4 animate-pulse">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
             </svg>
             點擊圖示查看詳細成分
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: The Visual Diagram */}
            <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center select-none">
                
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3A4D39" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#D6D1C7" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* --- OUTER CYCLE CIRCLE --- */}
                    <circle 
                        cx="200" 
                        cy="200" 
                        r="140" 
                        fill="none" 
                        stroke="#D6D1C7" 
                        strokeWidth="1" 
                        strokeDasharray="10, 10"
                        className="opacity-60 animate-[spin_60s_linear_infinite]"
                    />
                    <circle 
                        cx="200" 
                        cy="200" 
                        r="130" 
                        fill="none" 
                        stroke="#D6D1C7" 
                        strokeWidth="0.5" 
                        strokeDasharray="5, 5"
                        className="opacity-40 animate-[spin_40s_linear_infinite_reverse]"
                    />
                    
                    {/* Connections */}
                    <path 
                        d="M200 200 L321 130" 
                        stroke={activeNode === 'msm' ? '#D97706' : '#D6D1C7'} 
                        strokeWidth={activeNode === 'msm' ? "3" : "1"} 
                        className="transition-all duration-500"
                        strokeDasharray={activeNode === 'msm' ? "0" : "5,5"}
                    />
                    <path 
                        d="M200 200 L79 130" 
                        stroke={activeNode === 'glucosamine' ? '#6B8080' : '#D6D1C7'} 
                        strokeWidth={activeNode === 'glucosamine' ? "3" : "1"}
                        className="transition-all duration-500"
                        strokeDasharray={activeNode === 'glucosamine' ? "0" : "5,5"}
                    />
                    <path 
                        d="M200 200 L200 340" 
                        stroke={activeNode === 'chondroitin' ? '#8C8881' : '#D6D1C7'} 
                        strokeWidth={activeNode === 'chondroitin' ? "3" : "1"}
                        className="transition-all duration-500"
                        strokeDasharray={activeNode === 'chondroitin' ? "0" : "5,5"}
                    />
                    
                    {/* Particles */}
                    {activeNode === 'core' && (
                        <>
                            <circle r="3" fill="#3A4D39">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M200 200 L321 130" />
                            </circle>
                            <circle r="3" fill="#3A4D39">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M200 200 L79 130" begin="0.5s"/>
                            </circle>
                            <circle r="3" fill="#3A4D39">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M200 200 L200 340" begin="1s"/>
                            </circle>
                        </>
                    )}
                </svg>

                {/* --- CENTRAL NODE --- */}
                <div 
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group tap-highlight-transparent"
                    onClick={() => handleNodeClick('core')}
                >
                    <div className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center transition-all duration-500 ${activeNode === 'core' ? 'scale-110' : 'scale-100 opacity-90'}`}>
                        <div className="absolute inset-0 bg-[#3A4D39]/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-4 bg-[#3A4D39]/10 rounded-full animate-pulse"></div>
                        <div className="relative w-full h-full bg-white rounded-full shadow-2xl border-4 border-[#F5F2EB] flex items-center justify-center overflow-hidden">
                             <img 
                                src="https://images.unsplash.com/photo-1621814728790-a7d9b9361629?auto=format&fit=crop&q=80&w=400" 
                                alt="Green Lipped Mussel" 
                                className="w-full h-full object-cover opacity-90"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#3A4D39]/90 to-transparent"></div>
                             <div className="absolute bottom-6 text-[#F5F2EB] text-center w-full">
                                 <span className="block text-[10px] uppercase tracking-widest mb-1">Origin</span>
                                 <span className="font-serif font-bold text-lg">綠唇胎貝</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* --- SATELLITE 1: MSM --- */}
                <div 
                    className="absolute z-20 top-[32.5%] left-[80.25%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group tap-highlight-transparent"
                    onClick={() => handleNodeClick('msm')}
                >
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full glass-panel flex flex-col items-center justify-center transition-all duration-300 border-2 ${activeNode === 'msm' ? 'bg-[#D97706] text-white border-[#D97706] scale-110 shadow-xl' : 'bg-white/60 text-[#5D5A53] border-white hover:border-[#D97706]'}`}>
                        <span className="text-xs font-bold uppercase tracking-wider mb-1">Comfort</span>
                        <strong className="font-serif text-lg md:text-xl">MSM</strong>
                    </div>
                </div>

                {/* --- SATELLITE 2: Glucosamine --- */}
                <div 
                    className="absolute z-20 top-[32.5%] left-[19.75%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group tap-highlight-transparent"
                    onClick={() => handleNodeClick('glucosamine')}
                >
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full glass-panel flex flex-col items-center justify-center transition-all duration-300 border-2 ${activeNode === 'glucosamine' ? 'bg-[#6B8080] text-white border-[#6B8080] scale-110 shadow-xl' : 'bg-white/60 text-[#5D5A53] border-white hover:border-[#6B8080]'}`}>
                        <span className="text-xs font-bold uppercase tracking-wider mb-1">Rebuild</span>
                        <strong className="font-serif text-lg md:text-xl text-center leading-none">葡萄<br/>糖胺</strong>
                    </div>
                </div>

                 {/* --- SATELLITE 3: Chondroitin --- */}
                 <div 
                    className="absolute z-20 top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group tap-highlight-transparent"
                    onClick={() => handleNodeClick('chondroitin')}
                >
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full glass-panel flex flex-col items-center justify-center transition-all duration-300 border-2 ${activeNode === 'chondroitin' ? 'bg-[#8C8881] text-white border-[#8C8881] scale-110 shadow-xl' : 'bg-white/60 text-[#5D5A53] border-white hover:border-[#8C8881]'}`}>
                        <span className="text-xs font-bold uppercase tracking-wider mb-1">Lubricate</span>
                        <strong className="font-serif text-lg md:text-xl">軟骨素</strong>
                    </div>
                </div>
            </div>

            {/* Right: Detailed Explanation (Desktop ONLY - Hidden on Mobile) */}
            <div className="hidden lg:flex bg-white/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/60 shadow-lg min-h-[300px] flex-col justify-center transition-all duration-500 animate-fade-in-up">
                
                <div className="flex items-center gap-3 mb-6">
                    <div className={`w-3 h-3 rounded-full ${content[activeNode].color} animate-pulse`}></div>
                    <span className={`text-sm font-bold uppercase tracking-[0.2em] ${content[activeNode].textColor}`}>
                        {content[activeNode].subtitle}
                    </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-serif text-[#2C2A26] mb-6">
                    {content[activeNode].title}
                </h3>

                <div className="w-16 h-1 bg-[#2C2A26]/10 mb-8"></div>

                <p className="text-lg text-[#5D5A53] font-light leading-loose">
                    {content[activeNode].desc}
                </p>
            </div>

        </div>

        {/* --- MOBILE SLIDE-UP DRAWER --- */}
        {/* Only visible on mobile/tablet (lg:hidden) */}
        <div 
          className={`fixed inset-0 z-[60] flex items-end justify-center lg:hidden transition-all duration-500 ${isDrawerOpen ? 'visible' : 'invisible'}`}
        >
            {/* Backdrop */}
            <div 
              className={`absolute inset-0 bg-[#2C2A26]/30 backdrop-blur-[2px] transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} 
              onClick={() => setIsDrawerOpen(false)}
            />
            
            {/* Frosted Glass Card */}
            <div 
              className={`relative w-full max-w-lg bg-white/80 backdrop-blur-xl border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2rem] p-8 transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isDrawerOpen ? 'translate-y-0' : 'translate-y-[110%]'}`}
            >
                {/* Drag Handle */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#D6D1C7] rounded-full mb-6"></div>

                {/* Close Button */}
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-6 right-6 p-2 text-[#A8A29E] hover:text-[#2C2A26] transition-colors"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </button>

                {/* Content */}
                <div className="mt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${content[activeNode].color}`}></div>
                        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${content[activeNode].textColor}`}>
                            {content[activeNode].subtitle}
                        </span>
                    </div>

                    <h3 className="text-3xl font-serif text-[#2C2A26] mb-6">
                        {content[activeNode].title}
                    </h3>

                    <p className="text-base text-[#5D5A53] font-light leading-relaxed mb-4">
                        {content[activeNode].desc}
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default JointCareScience;
