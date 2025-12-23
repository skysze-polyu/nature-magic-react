/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { IngredientStep } from '../modules/ContentBlocks/IngredientStep';

interface NurturedTemplateProps {
  onBack: () => void;
}

export const NurturedTemplate: React.FC<NurturedTemplateProps> = ({ onBack }) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vh = window.innerHeight || 800;
  
  // 背景切换 - 延长纯黑区间
  const introEnd = vh * 0.2;           // Intro在1.1vh淡出
  const northStart = vh * 1.8;         // 北岛在2.5vh淡入（延后）
  const transitionStart = vh * 5.0;    // 相应调整（4.5→5.0，保持3vh给3张卡片）
  const southStart = vh * 6.3;         // 相应调整（5.8→6.3）

  return (
    <div className="bg-[#0A0F0D] selection:bg-[#3A4D39] selection:text-white overflow-x-hidden">
      
      {/* --- BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        
        {/* Level 1: Intro (0 - 1.1vh) */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out" 
          style={{ 
            opacity: scrollY < introEnd ? 1 : 0,
            transform: `scale(${1 + scrollY * 0.00001})`
          }}
        >
          <img src="https://naturemagic.com.hk/cdn/shop/articles/Nurtured_by_Nature.webp?v=1762200411" className="w-full h-full object-cover" alt="NZ Landscape" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* 纯黑区间 (1.1vh - 2.5vh): 引言 + Chapter One */}

        {/* Level 2: North Island (2.5vh - 5.0vh) */}
        <div 
          className="absolute inset-0 transition-all duration-700 ease-out" 
          style={{ 
            opacity: scrollY >= northStart && scrollY < transitionStart ? 1 : 0,
            transform: `scale(${1 + (scrollY - northStart) * 0.00003})`
          }}
        >
          <img src="https://naturemagic.com.hk/cdn/shop/files/North_Island.webp?v=1760173233" className="w-full h-full object-cover" alt="North Island" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Level 3: South Island (6.3vh+) */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out" 
          style={{ 
            opacity: scrollY >= southStart ? 1 : 0,
            transform: `scale(${1.1 - (scrollY - southStart) * 0.00003})`
          }}
        >
          <img src="https://naturemagic.com.hk/cdn/shop/files/South_Island.webp?v=1760173233" className="w-full h-full object-cover" alt="South Island" />
          <div className="absolute inset-0 bg-[#0A1210]/70"></div>
        </div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">
        
        {/* 1. Header Banner (0 - 1vh) */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-white to-transparent mb-12 opacity-50"></div>
          <div className="max-w-4xl w-full text-center space-y-10 animate-fade-in-up">
            <h1 className="text-7xl md:text-[11rem] font-serif text-white tracking-tight leading-none">
              紐西蘭<span className="italic opacity-60">全貌</span>
            </h1>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-serif italic text-[#A8C3A0] leading-tight">
                紐西蘭的優渥土壤 和 <br className="hidden md:block"/> Nature Magic 的每個足跡👣
              </h2>
            </div>
          </div>
          <button onClick={onBack} className="absolute top-32 left-8 group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-white">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2} /></svg>
            </div>
            Return
          </button>
        </section>

        {/* 2. Opening Transition (1vh - 2vh) - 引言在纯黑中 */}
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <div className="w-px h-64 bg-gradient-to-b from-white/20 via-white to-transparent mb-12"></div>
          <div className="text-center space-y-8 max-w-3xl">
            <p className="text-2xl md:text-3xl text-white/50 font-light leading-relaxed italic">
              置身於紐西蘭的土壤，每一次呼吸、每一個腳步，每一次眺望，都會察覺於磅礡中自身的渺小。「紐西蘭」已經是自然的形容詞。帶你感受一下來自於這片土地上孕育出的瑰寶！
            </p>
          </div>
        </section>

        {/* 3. Chapter One Title (2vh - 2.5vh) - 还在纯黑中 */}
        <div className="h-[50vh] flex flex-col items-center justify-center">
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mb-8"></div>
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#A8C3A0] mb-4 block">Chapter One</span>
            <h2 className="text-5xl md:text-7xl font-serif italic text-white/90">Volcanic Alchemy</h2>
          </div>
        </div>

        {/* 4. North Island Cards (2.5vh+) - 北岛图已显示 */}
        <div className="relative">
          <IngredientStep 
            title="草飼牛" 
            desc="北島的火山地熱活動，使土壤蘊含有機質與礦物質。由火山灰滋養的牧草，是營養濃縮的精華。"
            img="https://naturemagic.com.hk/cdn/shop/files/Grass-Fed_Beef.webp?v=1760173232"
          />
          <IngredientStep 
            title="放牧羊" 
            desc="北島溫和的氣候與起伏的草坡，為羊群提供了絕佳的自然棲息地。牠們能依循天性成長。"
            img="https://naturemagic.com.hk/cdn/shop/files/Free-Range_Sheep.webp?v=1760173233"
          />
          <IngredientStep 
            title="走地雞" 
            desc="北島牧場完整的生態系統，是牠們的自然食堂。陽光與開闊空間讓牠們肌肉結實，形態飽滿。"
            img="https://naturemagic.com.hk/cdn/shop/files/Pasture-Raised_Chicken.webp?v=1760173232"
          />
        </div>

        {/* 5. Geographic Shift */}
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <div className="w-px h-64 bg-gradient-to-b from-white/20 via-white to-transparent mb-12"></div>
          <div className="text-center space-y-8 max-w-3xl">
            <span className="block text-xs font-bold uppercase tracking-[0.8em] text-[#8CA3A3]">Geographic Shift</span>
            <h2 className="text-6xl md:text-[8rem] font-serif text-white italic leading-none">跨越庫克海峽</h2>
            <p className="text-2xl md:text-3xl text-white/50 font-light leading-relaxed italic">
              離開溫暖的火山沃土，我們向南前行。<br/>
              迎面而來的是來自南極的凜冽與純淨，一個完全不同的藍色世界。
            </p>
          </div>
        </section>

        {/* 6. South Island */}
        <div className="relative">
          <div className="h-[50vh] flex flex-col items-center justify-center">
            <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mb-8"></div>
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#8CA3A3] mb-4 block">Chapter Two</span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-white/90">Antarctic Purity</h2>
            </div>
          </div>
          <IngredientStep title="深海鱈魚" desc="南島周邊的深海，是南極洋流交匯之處。寒冷清澈的水體與豐富養分，練就了其緊實的身軀。" img="https://naturemagic.com.hk/cdn/shop/files/Deep-Sea_Cod.webp?v=1760173232" align="right" />
          <IngredientStep title="深海三文魚" desc="在南島海域冰冷的急流中持續游動，這種強健的自然鍛煉，塑造了其驚人的生命力。" img="https://naturemagic.com.hk/cdn/shop/files/King_Salmon.webp?v=1760173232" align="right" />
          <IngredientStep title="綠唇貽貝" desc="只能附著於南島周邊無污染的礁石上野生生長。是紐西蘭大海饋贈中最珍貴的修復瑰寶。" img="https://naturemagic.com.hk/cdn/shop/files/Green-Lipped_Mussels.webp?v=1760173231" align="right" />
        </div>

        {/* 7. Footer */}
        <div className="relative z-30 bg-[#F5F2EB] shadow-[-20px_-20px_100px_rgba(0,0,0,0.3)] rounded-t-[6rem]">
          <section className="py-48 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
              <div className="relative group overflow-hidden rounded-[4rem] shadow-2xl">
                <img src="https://naturemagic.com.hk/cdn/shop/files/The_Art_of_Subtraction-_Our_Promise_2.webp?v=1760173957" className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" alt="Subtraction Art" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="space-y-12">
                <div className="w-20 h-1 bg-[#3A4D39]"></div>
                <h2 className="text-6xl md:text-8xl font-serif text-[#2C2A26] leading-tight">珍惜食材的<br/><span className="italic opacity-60">減法藝術</span></h2>
                <p className="text-2xl text-[#5D5A53] font-light leading-relaxed max-w-xl">
                  正因為我們擁有這些紐西蘭最珍稀的天然食材，我們更堅持以最少的干預去完成每一餐。保留大地的原味，就是對自然最大的敬意。
                </p>
                <button onClick={onBack} className="group flex items-center gap-6 px-12 py-6 bg-[#2C2A26] text-white rounded-full uppercase tracking-widest text-[10px] font-bold hover:bg-[#3A4D39] transition-all shadow-2xl">
                  Return to Story Hub
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={2} /></svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};