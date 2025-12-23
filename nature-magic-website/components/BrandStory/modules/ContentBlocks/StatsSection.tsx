/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 14年零召回统计模块
 * 用于：品質與承諾页面
 * 来源：Version 3
 */

import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      {/* 左侧：文字+统计卡片 */}
      <div className="space-y-12">
        <div className="glass-panel p-10 md:p-16 rounded-[3rem] bg-white border-none shadow-2xl">
          <span className="text-[10px] font-bold text-[#3A4D39] uppercase tracking-[0.3em] mb-4 block">
            Proven Track Record
          </span>
          <h2 className="text-4xl font-serif text-[#2C2A26] mb-8">
            14 年的安全保障與 <br/>零召回記錄
          </h2>
          <p className="text-[#5D5A53] font-light leading-loose text-lg mb-8">
            在寵物食品行業，「產品召回」是品牌信譽的終極考驗。我們合作夥伴長達 14 年、橫跨全球市場的「零召回」記錄，是其品控穩定性與流程嚴謹性的最強有力證明。
          </p>
          <div className="flex items-center gap-4 text-[#3A4D39] font-bold tracking-widest text-xs uppercase">
            <span className="w-8 h-px bg-[#3A4D39]"></span>
            Uncompromising Standard
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center p-10 bg-white rounded-[2.5rem] shadow-lg border border-white/60">
            <span className="block text-5xl font-serif text-[#3A4D39] mb-3">14 Yrs</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E]">
              Global Zero Recall
            </span>
          </div>
          <div className="text-center p-10 bg-white rounded-[2.5rem] shadow-lg border border-white/60">
            <span className="block text-5xl font-serif text-[#3A4D39] mb-3">$5M</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E]">
              Safety Insurance (USD)
            </span>
          </div>
        </div>
      </div>

      {/* 右侧：认证图片 */}
      <div className="relative rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square group">
        <img 
          src="https://naturemagic.com.hk/cdn/shop/files/Certified_2024.png?v=1762266067" 
          className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
          alt="Certification" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26]/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 p-8 glass-panel rounded-3xl bg-white/90 backdrop-blur-xl">
          <h4 className="font-serif text-xl mb-2">500 萬美金的信心保障</h4>
          <p className="text-xs text-[#5D5A53] leading-relaxed">
            這不僅是一個數字，更是一份量化的商業承諾。源於我們對自身產品安全性的絕對信心。
          </p>
        </div>
      </div>
    </section>
  );
};
