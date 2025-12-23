/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 科技粒子效果组件
 * 用于：減法藝術页面
 */

import React from 'react';

interface ScientificParticlesProps {
  scrollY: number;
}

export const ScientificParticles: React.FC<ScientificParticlesProps> = ({ scrollY }) => {
  const particles = [
    { top: '15%', left: '10%', size: 'w-16 h-16', speed: -0.2, rotate: 0.1 },
    { top: '45%', right: '12%', size: 'w-14 h-14', speed: -0.4, rotate: -0.05 },
    { top: '70%', left: '18%', size: 'w-10 h-10', speed: -0.15, rotate: 0.15 },
    { top: '25%', right: '35%', size: 'w-8 h-8', speed: -0.6, rotate: -0.1 },
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {particles.map((p, i) => (
        <div 
          key={i}
          className="absolute opacity-0 transition-opacity duration-1000"
          style={{ 
            top: p.top, 
            left: p.left || 'auto', 
            right: p.right || 'auto',
            opacity: scrollY > 300 ? 0.6 : 0,
            transform: `translate3d(0, ${scrollY * p.speed}px, 0) rotate(${scrollY * p.rotate}deg)` 
          }}
        >
          <ScientificMolecule />
        </div>
      ))}
    </div>
  );
};

const ScientificMolecule: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full fill-none overflow-visible drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]">
    <path d="M60 80 L100 60 L140 80 L140 120 L100 140 L60 120 Z" stroke="#60A5FA" strokeWidth="2.5" />
    <g stroke="white" strokeWidth="1" opacity="0.8">
      <path d="M100 60 V100 L140 120" />
      <path d="M60 80 L100 100 V140" />
      {[60,100,140].map(x => <circle key={x} cx={x} cy={x===100?60:80} r="3" fill="white" />)}
      {[140,100,60].map(x => <circle key={x} cx={x} cy={x===100?140:120} r="3" fill="white" />)}
    </g>
    <circle cx="100" cy="100" r="2.5" fill="#60A5FA" className="animate-pulse" />
  </svg>
);
