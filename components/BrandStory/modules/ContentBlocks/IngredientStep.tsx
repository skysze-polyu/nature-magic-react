/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 食材展示步骤组件
 * 用于：紐西蘭全貌页面
 */

import React, { useState, useEffect, useRef } from 'react';

interface IngredientStepProps {
  title: string;
  desc: string;
  img: string;
  align?: 'left' | 'right';
}

export const IngredientStep: React.FC<IngredientStepProps> = ({ title, desc, img, align = 'left' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setProgress(entry.intersectionRatio);
      },
      { threshold: Array.from({length:101}, (_,i) => i/100) }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // 統一的動畫進度 - 標題和內容一起
  const cardOpacity = Math.max(0, (progress - 0.15) * 1.8);
  const cardTransform = `translate3d(0, ${(1 - progress) * 60}px, 0) scale(${0.98 + progress * 0.02})`;

  return (
    <div ref={ref} className="h-screen flex items-center justify-center px-6 relative z-10">
      <div 
        className={`max-w-6xl w-full flex flex-col md:flex-row items-center gap-16 md:gap-24 ${
          align === 'right' ? 'md:flex-row-reverse' : ''
        }`}
        style={{
          opacity: cardOpacity,
          transform: cardTransform,
          transition: 'all 0.5s ease-out'
        }}
      >
        {/* 圖片層 */}
        <div 
          className="w-full md:w-1/2 aspect-square rounded-[4rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 bg-white/5 backdrop-blur-md p-3"
        >
          <img src={img} className="w-full h-full object-cover rounded-[3.5rem]" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 rounded-[3.5rem] pointer-events-none"></div>
        </div>

        {/* 文字層 */}
        <div className={`w-full md:w-1/2 space-y-8 ${align === 'right' ? 'text-right' : 'text-left'}`}>
          {/* 標題 */}
          <div>
            <h3 className="text-5xl md:text-7xl font-serif italic text-white mb-4 drop-shadow-lg">
              {title}
            </h3>
            <div className={`h-1 bg-gradient-to-r from-[#A8C3A0] to-[#8CA3A3] w-20 ${align === 'right' ? 'ml-auto' : ''}`}></div>
          </div>

          {/* 描述 */}
          <div className="bg-black/25 backdrop-blur-lg p-8 md:p-12 rounded-[2.5rem] border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/95">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
