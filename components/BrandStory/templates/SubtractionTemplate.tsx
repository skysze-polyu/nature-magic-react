/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 減法藝術 模板
 * 整合了科技粒子和香气喷发效果
 */

import React, { useState, useEffect } from 'react';
import { BackButton } from '../modules/Navigation/BackButton';
import { ScientificParticles } from '../modules/Effects/ScientificParticles';
import { ZeroCards } from '../modules/ContentBlocks/ZeroCards';
import { CraftShowcase } from '../modules/ContentBlocks/CraftShowcase';

interface SubtractionTemplateProps {
  onBack: () => void;
}

export const SubtractionTemplate: React.FC<SubtractionTemplateProps> = ({ onBack }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#F5F2EB] text-[#2C2A26] relative overflow-x-hidden">
      {/* 科技粒子效果 */}
      <ScientificParticles scrollY={scrollY} />

      {/* 返回按钮 */}
      <BackButton onClick={onBack} variant="dark" />

      <div className="relative z-10">
        {/* Section 1: Hero */}
        <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#2C2A26] to-transparent mx-auto mb-12 opacity-30"></div>
          <h1 className="text-8xl md:text-[14rem] font-serif leading-none tracking-tighter">
            減法<span className="italic opacity-40">藝術</span>
          </h1>
          <p className="text-xl md:text-3xl font-light italic text-[#5D5A53] max-w-2xl mx-auto mt-8">
            "Sophistication is the ultimate purity."
          </p>
        </section>

        {/* Section 2: 6-Zero卡片 */}
        <ZeroCards />

        {/* Section 3: Craft - 质感乳化 */}
        <CraftShowcase 
          processNumber="PROCESS 01"
          title="質感乳化"
          description="我們研究蛋白質的分子鍵合，不加膠水，創造絲絨般的細膩。"
          image="https://naturemagic.com.hk/cdn/shop/files/Our_Craft_of_Texture.webp?v=1760178069"
          imagePosition="left"
        />

        {/* Section 4: Craft - 风味觉醒（带香气喷发效果） */}
        <section className="bg-white py-48 px-6 rounded-t-[10rem] -mt-24 relative z-30 overflow-hidden">
          <CraftShowcase 
            processNumber="PROCESS 02"
            title="風味覺醒"
            description="追求鮮肉本身的美拉德轉化。這份香氣源於深層研發，而非實驗室香精。"
            image="https://naturemagic.com.hk/cdn/shop/files/Our_Craft_of_Flavor.webp?v=1760178104"
            imagePosition="right"
            withAroma
          />
        </section>

        {/* Final Reflection */}
        <section className="py-60 px-6 bg-[#2C2A26] text-white text-center rounded-t-[10rem] -mt-24 relative z-40">
          <div className="max-w-6xl mx-auto space-y-16">
            <h2 className="text-4xl md:text-7xl font-serif leading-tight">
              "減法的藝術，<br/>
              看見生命最純粹的魔法。"
            </h2>
            <div className="w-px h-32 bg-white/20 mx-auto"></div>
            <button 
              onClick={onBack} 
              className="group inline-flex items-center gap-6 px-16 py-8 bg-[#F5F2EB] text-[#2C2A26] rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white transition-all shadow-2xl"
            >
              Back to Story
              <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
