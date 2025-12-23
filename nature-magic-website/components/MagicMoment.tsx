/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { REVIEWS } from '../constants';

const MagicMoment: React.FC = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#EBE7DE]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/30 rounded-full blur-[80px] animate-blob mix-blend-overlay"></div>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="mb-16 text-center">
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-4">Community</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">Magic Moments</h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto gap-8 pb-12 pt-4 px-4 -mx-4 no-scrollbar snap-x snap-mandatory">
            {REVIEWS.map((review, idx) => (
                <div 
                    key={review.id} 
                    className="flex-shrink-0 w-[350px] md:w-[450px] glass-panel bg-white/40 p-10 rounded-3xl snap-center relative group transition-transform duration-500 hover:-translate-y-2 border border-white/40 shadow-lg"
                >
                    {/* Quotation Mark Decoration */}
                    <div className="absolute top-6 left-8 text-6xl font-serif text-[#2C2A26]/10 leading-none">“</div>
                    
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                             {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg 
                                        key={i} 
                                        className={`w-4 h-4 ${i < review.rating ? 'text-[#2C2A26]' : 'text-[#D6D1C7]'}`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-lg md:text-xl text-[#5D5A53] font-light italic leading-relaxed mb-8">
                                {review.text}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 border-t border-[#2C2A26]/10 pt-6">
                            <div className="w-10 h-10 rounded-full bg-[#2C2A26]/5 flex items-center justify-center font-serif italic text-[#2C2A26]">
                                {review.userName.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#2C2A26] uppercase tracking-wide">{review.userName}</h4>
                                <span className="text-xs text-[#A8A29E] block">{review.petName} — {review.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* End Spacer */}
            <div className="w-4 flex-shrink-0"></div>
        </div>
      </div>
    </section>
  );
};

export default MagicMoment;