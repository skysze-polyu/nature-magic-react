/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState, useRef } from 'react';

interface SliceData {
  id: string;
  label: string;
  value: number; // Percentage
  color: string;
  activeColor: string;
  labelPosition: 'right' | 'bottom-right' | 'bottom-left' | 'left' | 'top-left' | 'top';
}

const JointCarePieChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Data matching the user's image
  const data: SliceData[] = [
    { id: 'dentistry', label: 'Dentistry', value: 44.5, color: '#A8A29E', activeColor: '#8C8881', labelPosition: 'right' },
    { id: 'urology', label: 'Urology', value: 18.8, color: '#9CA3AF', activeColor: '#6B7280', labelPosition: 'bottom-right' },
    { id: 'soft-tissue', label: 'Soft Tissue Surgery', value: 9.4, color: '#D1D5DB', activeColor: '#9CA3AF', labelPosition: 'bottom-left' },
    { id: 'oncologic', label: 'Oncologic Surgery', value: 8.8, color: '#E5E7EB', activeColor: '#D1D5DB', labelPosition: 'left' },
    { id: 'orthopedic', label: 'Orthopedic Surgery', value: 7.1, color: '#FCD34D', activeColor: '#D97706', labelPosition: 'top-left' }, // Target
    { id: 'otolaryngology', label: 'Otolaryngology', value: 11.4, color: '#F3F4F6', activeColor: '#E5E7EB', labelPosition: 'top' }, // Remainder/Other
  ];

  // The target index to end on (Orthopedic Surgery)
  const targetIndex = 4; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          runAnimationSequence();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const runAnimationSequence = () => {
    let current = 0;
    const interval = setInterval(() => {
      setActiveIndex(current);
      
      if (current === targetIndex) {
        clearInterval(interval);
      } else {
        // Wrap around logic if we wanted to loop, but here we just go 0 -> target based on data order
        // However, based on the image, Orthopedic is later in the circle. 
        // We will animate sequentially through the list.
        current++;
        if (current >= data.length) current = 0; // Just in case logic needs loop
      }
    }, 400); // Speed of the rotation
  };

  // SVG Helper Functions
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  let cumulativePercent = 0;
  // Rotate so the start isn't exactly at 3 o'clock, but maybe -90deg (12 o'clock)
  // Based on image, Dentistry starts top-ish and goes right.
  const startOffset = -0.25; 

  return (
    <div ref={containerRef} className="w-full bg-[#EBE7DE] py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            
            {/* Left Text Content */}
            <div className="md:w-1/3 text-center md:text-left">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-4">Clinical Data</span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-6 leading-tight">
                    Preventative Care
                </h2>
                <p className="text-[#5D5A53] font-light leading-relaxed mb-8">
                    Joint issues are among the leading causes of surgery in pets. Our preventative formula targets the 7.1% risk factor before it becomes a statistic.
                </p>
                <div className="flex items-center gap-4 text-sm text-[#D97706] font-medium bg-[#D97706]/10 px-4 py-3 rounded-lg border border-[#D97706]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    Early intervention is key.
                </div>
            </div>

            {/* Right Chart Visualization */}
            <div className="md:w-2/3 relative flex justify-center items-center">
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                    <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full transform -rotate-90">
                        {data.map((slice, index) => {
                            const startPercent = cumulativePercent;
                            const slicePercent = slice.value / 100;
                            const endPercent = startPercent + slicePercent;
                            
                            // Update for next iteration
                            cumulativePercent += slicePercent;

                            const [startX, startY] = getCoordinatesForPercent(startPercent);
                            const [endX, endY] = getCoordinatesForPercent(endPercent);
                            const largeArcFlag = slicePercent > 0.5 ? 1 : 0;
                            
                            const pathData = `
                                M 0 0
                                L ${startX} ${startY}
                                A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
                                Z
                            `;

                            // Calculate middle angle for translation
                            const midAngle = 2 * Math.PI * (startPercent + slicePercent / 2);
                            const isActive = activeIndex === index;
                            
                            // Translate vector (exploding effect)
                            const transX = Math.cos(midAngle) * 0.1;
                            const transY = Math.sin(midAngle) * 0.1;

                            return (
                                <path
                                    key={slice.id}
                                    d={pathData}
                                    fill={isActive ? slice.activeColor : slice.color}
                                    stroke="#EBE7DE"
                                    strokeWidth="0.02"
                                    style={{
                                        transform: isActive ? `translate(${transX}px, ${transY}px)` : 'translate(0, 0)',
                                        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), fill 0.4s ease'
                                    }}
                                />
                            );
                        })}
                        {/* Center White Circle with Icon */}
                        <circle cx="0" cy="0" r="0.35" fill="white" />
                    </svg>
                    
                    {/* Centered Icon (HTML overlay for easier SVG handling than nested SVGs inside transforms) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 md:w-20 md:h-20 text-[#D97706]">
                             <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                {/* Simplified Fox/Cat Abstract Logo */}
                                <path d="M50 25 C30 25 20 45 20 65 C20 85 35 95 50 95 C65 95 80 85 80 65 C80 45 70 25 50 25 Z M35 45 C35 40 40 40 40 45 Z M65 45 C65 40 60 40 60 45 Z" opacity="0.2"/>
                                <path d="M50 30 L30 60 L70 60 Z" fill="#D97706" />
                             </svg>
                        </div>
                    </div>

                    {/* Labels Overlay */}
                    {data.map((slice, index) => {
                        const isActive = activeIndex === index;
                        // Manual positioning based on labelPosition for cleaner layout than raw math
                        // These positions are relative to the container box
                        const positions: Record<string, string> = {
                            'right': 'top-1/2 -right-8 md:-right-24 translate-x-0 -translate-y-1/2',
                            'bottom-right': 'bottom-0 right-0 translate-y-full md:translate-x-12',
                            'bottom-left': 'bottom-0 left-0 translate-y-full md:-translate-x-12',
                            'left': 'top-2/3 -left-8 md:-left-24 -translate-y-1/2',
                            'top-left': 'top-1/4 -left-8 md:-left-32 -translate-y-1/2', // Target
                            'top': 'top-0 left-1/2 -translate-y-full -translate-x-1/2'
                        };

                        const positionClass = positions[slice.labelPosition];

                        return (
                            <div 
                                key={`label-${slice.id}`}
                                className={`absolute ${positionClass} transition-all duration-500 flex items-center gap-2 pointer-events-none ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-40 scale-90 z-0'}`}
                            >
                                {/* Dot */}
                                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-[#D97706]' : 'bg-[#A8A29E]'}`}></div>
                                
                                {/* Label Text */}
                                <div className="flex flex-col text-left">
                                    <span className={`text-sm md:text-lg font-serif whitespace-nowrap ${isActive ? 'text-[#D97706] font-bold' : 'text-[#5D5A53]'}`}>
                                        {slice.label}
                                    </span>
                                    {isActive && (
                                        <span className="text-2xl md:text-3xl font-bold text-[#2C2A26] animate-fade-in-up">
                                            {slice.value}%
                                        </span>
                                    )}
                                </div>
                                
                                {/* Dotted Line (Visual only, specifically for the target to match image style) */}
                                {slice.id === 'orthopedic' && isActive && (
                                    <div className="absolute right-[-60px] top-1/2 w-16 border-t-2 border-dotted border-[#D97706] hidden md:block"></div>
                                )}
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    </div>
  );
};

export default JointCarePieChart;
