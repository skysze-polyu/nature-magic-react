/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 香气喷发效果组件
 * 用于：減法藝術页面 - Craft展示区
 */

import React, { useState, useEffect, useRef } from 'react';

export const AromaBurst: React.FC = () => {
  const [isBursting, setIsBursting] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsBursting(true);
        } else {
          setIsBursting(false);
        }
      },
      { threshold: 0.3 }
    );
    
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={triggerRef} className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <div className={`absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full h-[150%] transition-opacity duration-[2s] ${isBursting ? 'opacity-40' : 'opacity-0'}`}>
        <div className="absolute bottom-[10%] left-[30%] w-[40%] h-[70%] animate-[aroma_12s_infinite_linear] blur-[60px] bg-gradient-to-t from-[#60A5FA]/20 via-white/40 to-transparent rounded-full"></div>
        <div className="absolute bottom-[5%] left-[55%] w-[35%] h-[80%] animate-[aroma_15s_infinite_linear_3s] blur-[50px] bg-gradient-to-t from-white/30 via-white/10 to-transparent rounded-full"></div>
      </div>
      
      <style>{`
        @keyframes aroma {
          0% { transform: translateY(30%) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-120%) scale(2.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
