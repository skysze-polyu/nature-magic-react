/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 6个国际认证矩阵模块
 * 用于：品質與承諾页面
 * 来源：Version 3
 */

import React from 'react';

interface Certification {
  title: string;
  sub: string;
  desc: string;
  img: string;
}

const CERTIFICATIONS: Certification[] = [
  { 
    title: "FernMark Licence", 
    sub: "紐西蘭銀蕨認證", 
    desc: "這是最能代表紐西蘭官方認可的標誌。證明了我們純正的「紐西蘭血統」。",
    img: "https://naturemagic.com.hk/cdn/shop/files/FernMark.webp?v=1760938635"
  },
  { 
    title: "FDA Registered", 
    sub: "美國食品藥物管理局", 
    desc: "生產流程均遵循 FDA 的嚴格規範，確保達到人類食品的監管水平。",
    img: "https://naturemagic.com.hk/cdn/shop/files/FDA.webp?v=1760938647"
  },
  { 
    title: "AAFCO Standards", 
    sub: "美國飼料管理協會", 
    desc: "符合或超越 AAFCO 為不同生命階段設定的營養標準。",
    img: "https://naturemagic.com.hk/cdn/shop/files/AAFCO.webp?v=1760938678"
  },
  { 
    title: "HACCP Certified", 
    sub: "危害分析重要管制點", 
    desc: "識別並預防生產過程中所有潛在的生物、化學及物理危害。",
    img: "https://naturemagic.com.hk/cdn/shop/files/HACCP.webp?v=1760938656"
  },
  { 
    title: "MPI Accredited", 
    sub: "紐西蘭初級產業部", 
    desc: "原材料、生產過程均符合紐西蘭嚴格的出口標準，全鏈路可追溯。",
    img: "https://naturemagic.com.hk/cdn/shop/files/MPI.webp?v=1760938664"
  },
  { 
    title: "CE Compliance", 
    sub: "歐洲合格認證", 
    desc: "符合歐盟在安全、衛生、環保和消費者保護等法律法規的要求。",
    img: "https://naturemagic.com.hk/cdn/shop/files/CE.webp?v=1760938671"
  }
];

export const CertMatrix: React.FC = () => {
  return (
    <section className="bg-[#2C2A26] py-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* 标题 */}
        <div className="text-center mb-24">
          <span className="block text-xs font-bold uppercase tracking-[0.4em] text-[#A8A29E] mb-6">
            International Standards
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white">
            國際認證體系與標準
          </h2>
        </div>
        
        {/* 认证卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {CERTIFICATIONS.map((cert, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 p-12 rounded-[3rem] border border-white/10 hover:border-white/30 transition-all group flex flex-col items-center text-center"
            >
              {/* 图标 */}
              <div className="w-24 h-24 bg-white/10 rounded-full mb-8 overflow-hidden p-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <img 
                  src={cert.img} 
                  alt={cert.title} 
                  className="w-full h-full object-contain brightness-110" 
                />
              </div>
              
              {/* 标题 */}
              <h4 className="text-2xl font-serif text-white mb-2">
                {cert.title}
              </h4>
              
              {/* 副标题 */}
              <p className="text-[10px] font-bold text-[#A8C3A0] uppercase tracking-[0.2em] mb-6">
                {cert.sub}
              </p>
              
              {/* 描述 */}
              <p className="text-sm text-white/50 font-light leading-relaxed group-hover:text-white/80 transition-colors">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
