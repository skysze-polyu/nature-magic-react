/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 品質與承諾 模板
 * 整合了所有Version 3的增强内容
 */

import React from 'react';
import { BackButton } from '../modules/Navigation/BackButton';
import { StatsSection } from '../modules/ContentBlocks/StatsSection';
import { CertMatrix } from '../modules/ContentBlocks/CertMatrix';

interface QualityTemplateProps {
  onBack: () => void;
}

export const QualityTemplate: React.FC<QualityTemplateProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      {/* Section 1: Hero Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-[#2C2A26]">
        <img 
          src="https://naturemagic.com.hk/cdn/shop/articles/our_Manufacturer_3f0f31da-13e9-4066-b9c9-6b861a9f27e6.jpg?v=1762526344" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.2]" 
          alt="Factory" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26] via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <span className="block text-xs font-bold uppercase tracking-[0.4em] text-[#A8C3A0] mb-6">
            The Official Brand
          </span>
          <h1 className="text-4xl md:text-7xl font-serif mb-8 leading-tight">
            品質與承諾 <br/>
            <span className="italic opacity-80 text-3xl md:text-5xl">Behind the Quality</span>
          </h1>
        </div>

        <BackButton onClick={onBack} variant="light" />
      </section>

      {/* Section 2: Factory Story Slider */}
      <section className="py-24 bg-[#EBE7DE]">
        <div className="max-w-[1800px] mx-auto px-6">
          <QualitySlider />
        </div>
      </section>

      {/* Section 3: 14年零召回统计 */}
      <StatsSection />

      {/* Section 4: 6个国际认证矩阵 */}
      <CertMatrix />
    </div>
  );
};

// 工厂故事轮播组件
const QualitySlider: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] rounded-[4rem] overflow-hidden shadow-2xl bg-[#2C2A26]">
      <img 
        src="https://naturemagic.com.hk/cdn/shop/articles/our_Manufacturer_3f0f31da-13e9-4066-b9c9-6b861a9f27e6.jpg?v=1762526344" 
        className="w-full h-full object-cover opacity-80" 
        alt="Factory" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute bottom-20 left-12 md:left-24 max-w-2xl text-white">
        <h2 className="text-4xl md:text-6xl font-serif mb-6">紐西蘭工藝之巔</h2>
        <p className="text-xl font-light opacity-80 italic">
          Petfood NZ 官方自建品牌，代表了我們對每一罐品質的終極承諾。
        </p>
      </div>
    </div>
  );
};
