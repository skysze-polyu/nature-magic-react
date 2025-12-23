/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 品牌故事路由器 - 模块化架构
 * 根据slug加载对应的模板组件
 */

import React from 'react';
import { JournalArticle } from '../../types';
import { QualityTemplate } from './templates/QualityTemplate';
import { NurturedTemplate } from './templates/NurturedTemplate';
import { SubtractionTemplate } from './templates/SubtractionTemplate';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  // 根据slug路由到对应的模板
  switch (article.slug) {
    case 'behind-the-quality':
      return <QualityTemplate onBack={onBack} />;
    
    case 'nurtured-nature':
      return <NurturedTemplate onBack={onBack} />;
    
    case 'the-art-of-subtraction':
      return <SubtractionTemplate onBack={onBack} />;
    
    // 未来可以添加更多模板
    // case 'the-art-of-awakening':
    //   return <AwakeningTemplate onBack={onBack} />;
    
    // case 'the-art-of-texture':
    //   return <TextureTemplate onBack={onBack} />;
    
    // 默认fallback模板
    default:
      return <DefaultTemplate article={article} onBack={onBack} />;
  }
};

// 默认模板（用于尚未设计的章节）
const DefaultTemplate: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <button 
          onClick={onBack} 
          className="absolute top-12 left-8 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-white transition-all"
        >
          Back
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-32">
        <div className="bg-[#F5F2EB] p-8 md:p-16 shadow-xl rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-serif text-[#2C2A26] mb-12 text-center">
            {article.title}
          </h1>
          <div className="prose prose-stone prose-lg mx-auto font-light leading-loose text-[#5D5A53]">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalDetail;
