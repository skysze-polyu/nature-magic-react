/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 6-Zero Promise卡片组件
 * 用于：減法藝術页面
 */

import React, { useState, useEffect, useRef } from 'react';

interface ZeroCardData {
  number: string;
  title: string;
  desc: string;
}

const ZERO_CARDS: ZeroCardData[] = [
  { number: "01", title: "零穀物", desc: "尊重肉食天性，杜絕無謂的填充。" },
  { number: "02", title: "零膠質", desc: "低溫乳化技術，呈現最自然的濃郁。" },
  { number: "03", title: "零肉粉", desc: "只選鮮肉塊，守護最初的營養能量。" },
  { number: "04", title: "零誘食劑", desc: "鮮肉的香氣即是天性。拒絕虛假的誘惑。" },
  { number: "05", title: "零抗生素", desc: "純淨源頭，確保每一份食物都清澈如初。" },
  { number: "06", title: "零激素", desc: "遵循自然生長，還原生命原始的節奏。" },
];

export const ZeroCards: React.FC = () => {
  return (
    <section className="py-40 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32 max-w-2xl">
          <span className="block text-xs font-bold uppercase tracking-[0.4em] text-[#A8A29E] mb-6">
            Our 6-Zero Promise
          </span>
          <h2 className="text-5xl md:text-8xl font-serif leading-tight">
            不添加，<br/>才是真魔法。
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {ZERO_CARDS.map(card => (
            <ZeroRevealCard key={card.number} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ZeroRevealCard: React.FC<ZeroCardData> = ({ number, title, desc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`relative p-12 rounded-[3rem] bg-white/40 backdrop-blur-md border border-[#2C2A26]/5 transition-all duration-1000 flex flex-col justify-between min-h-[350px] shadow-sm ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="absolute top-8 right-10 text-8xl font-serif text-[#60A5FA]/[0.08]">
        {number}
      </div>
      <div>
        <span className="block text-xs font-bold text-[#A8A29E] mb-6 tracking-[0.4em]">
          {number}
        </span>
        <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C2A26]">
          {title}
        </h3>
      </div>
      <p className="text-lg text-[#5D5A53] font-light leading-relaxed">
        {desc}
      </p>
    </div>
  );
};
