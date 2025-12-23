/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 返回按钮组件
 * 用于：所有品牌故事页面
 */

import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  variant?: 'light' | 'dark';
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  variant = 'light',
  className = ''
}) => {
  const isDark = variant === 'dark';

  return (
    <button 
      onClick={onClick}
      className={`fixed top-12 left-8 z-[100] group flex items-center gap-4 text-xs font-bold uppercase tracking-widest transition-all ${
        isDark 
          ? 'text-[#2C2A26]' 
          : 'text-white/70 hover:text-white'
      } ${className}`}
    >
      <div className={`w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-md ${
        isDark
          ? 'border-[#2C2A26]/20 bg-white/80'
          : 'border-white/20 bg-white/10'
      }`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" strokeWidth={2}/>
        </svg>
      </div>
      {!isDark && <span>Back</span>}
    </button>
  );
};
