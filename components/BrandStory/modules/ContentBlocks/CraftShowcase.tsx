/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 工艺展示组件
 * 用于：減法藝術页面
 */

import React from 'react';
import { AromaBurst } from '../Effects/AromaBurst';

interface CraftShowcaseProps {
  processNumber: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: 'left' | 'right';
  withAroma?: boolean;
}

export const CraftShowcase: React.FC<CraftShowcaseProps> = ({ 
  processNumber, 
  title, 
  description, 
  image,
  imagePosition = 'left',
  withAroma = false
}) => {
  return (
    <section className="py-48 px-6 bg-[#2C2A26] text-white rounded-t-[10rem] relative z-20 group overflow-hidden">
      {/* 香气效果（可选） */}
      {withAroma && <AromaBurst />}
      
      <div className={`max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10`}>
        {/* 图片 */}
        <div className={`rounded-[4rem] overflow-hidden shadow-2xl ${imagePosition === 'right' ? 'order-2' : 'order-1 lg:order-1'}`}>
          <img 
            src={image} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]" 
            alt={title} 
          />
        </div>

        {/* 文字 */}
        <div className={`space-y-8 ${imagePosition === 'right' ? 'order-1' : 'order-2 lg:order-2'}`}>
          <span className="text-xs font-bold tracking-[0.6em] text-[#A8C3A0]">
            {processNumber}
          </span>
          <h2 className="text-6xl md:text-9xl font-serif italic">
            {title}
          </h2>
          <p className="text-2xl font-light text-white/70 italic leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
