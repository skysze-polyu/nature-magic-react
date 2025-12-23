/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState, useRef } from 'react';

interface SpotlightProps {
  title?: string;
  accentTitle?: string;
  imageUrl?: string;
}

const Spotlight: React.FC<SpotlightProps> = ({ 
  title = "Best Seller", 
  accentTitle = "Beef Magic", 
  imageUrl = "https://naturemagic.com.hk/cdn/shop/files/Pasture-Raised_Chicken.png?v=1763099930&width=940" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      // 手机端使用更小的范围，让效果更明显
      const isMobile = windowHeight < 768;
      const range = isMobile ? windowHeight * 0.5 : windowHeight * 0.7;
      const rawProgress = Math.min(1, Math.abs(distanceFromCenter) / range);
      const progress = 1 - rawProgress; 
      
      const easedProgress = Math.sin((progress * Math.PI) / 2);
      // 手机端放大幅度更大
      const maxScale = isMobile ? 0.35 : 0.22;
      const newScale = 1 + (Math.max(0, easedProgress) * maxScale);
      
      setScale(newScale);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={containerRef} className="py-64 px-6 bg-[#F5F2EB] overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center relative min-h-[700px] justify-center">
        
        {/* 1. 【底層】固定圓框背景 (z-index: 0) */}
        {/* 增加了垂直偏移 (mt-32 md:mt-48)，讓圓框下移，給文字留出空間 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 mt-32 md:mt-48">
          <div className="spotlight-base-circle"></div>
        </div>

        {/* 2. 【中層】標題文字 (z-index: 10) */}
        {/* 文字位置上移，並使用負 margin 微微壓在圓框頂部 */}
        <div className="text-center relative z-10 select-none pointer-events-none mb-0 -translate-y-16 md:-translate-y-20">
          <h2 className="flex flex-col items-center">
            <span className="block font-serif text-3xl md:text-5xl text-[#2C2A26] mb-4 italic opacity-80">
              {title}
            </span>
            <span className="block text-7xl md:text-[12rem] font-serif font-bold text-[#3A4D39] leading-[0.7] tracking-tighter uppercase">
              {accentTitle}
            </span>
          </h2>
        </div>

        {/* 3. 【頂層】互動圖片 (z-index: 20) */}
        {/* 圖片位置同步下移，確保與圓框對齊 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-32 md:mt-48 pointer-events-none">
          <div 
            className="spotlight-image-wrapper flex items-center justify-center"
            style={{ '--f': scale } as React.CSSProperties}
          >
            <img 
              src={imageUrl} 
              alt={accentTitle}
              className="spotlight-pop-image object-contain"
            />
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --circle-size: 500px;
          --border-thickness: 8px;
          --brand-green: #3A4D39;
          --bg-cream: #EBE7DE;
        }

        @media (max-width: 768px) {
          :root {
            --circle-size: 340px;
            --border-thickness: 5px;
          }
        }

        /* 固定背景圓框 */
        .spotlight-base-circle {
          width: var(--circle-size);
          height: var(--circle-size);
          border-radius: 50%;
          border: var(--border-thickness) solid var(--brand-green);
          background-color: var(--bg-cream);
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
          position: relative;
        }

        .spotlight-image-wrapper {
          width: var(--circle-size);
          height: var(--circle-size);
        }

        .spotlight-pop-image {
          width: 100%;
          height: 100%;
          transform: scale(var(--f));
          transform-origin: center center;
          
          /* 核心 3D 彈出遮罩：保持與底層圓框完全對齊 */
          --mask-scale: calc(100% / var(--f));
          --mask-offset: calc((1 / var(--f) - 1) * var(--circle-size) / 2);
          
          -webkit-mask: 
            /* 頂部區域：完全開放 */
            linear-gradient(#000 0 0) no-repeat 50% calc(-1 * var(--mask-offset)) / 100% 50%,
            /* 底部區域：強制圓形裁切 */
            radial-gradient(circle closest-side, #000 calc(100% - 1px), transparent 100%) 50% / var(--mask-scale) 100% no-repeat content-box;
          
          mask: 
            linear-gradient(#000 0 0) no-repeat 50% calc(-1 * var(--mask-offset)) / 100% 50%,
            radial-gradient(circle closest-side, #000 calc(100% - 1px), transparent 100%) 50% / var(--mask-scale) 100% no-repeat content-box;
        }
      `}</style>
    </section>
  );
};

export default Spotlight;