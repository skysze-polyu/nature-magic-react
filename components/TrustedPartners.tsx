/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const TrustedPartners: React.FC = () => {
  // Using text/simple representations to ensure high availability without external SVGs
  const partners = [
    "WHOLE FOODS",
    "EREWHON",
    "VOGUE",
    "GOOP",
    "MONOCLE",
    "KINFOLK",
    "THE NEW YORK TIMES",
    "VET RECOMMENDED",
    "NZ MADE",
  ];

  // Duplicate for seamless marquee
  const displayPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 border-b border-[#D6D1C7] overflow-hidden bg-[#F5F2EB] relative z-10">
      <div className="flex items-center gap-16 md:gap-32 animate-marquee whitespace-nowrap px-6">
        {displayPartners.map((partner, index) => (
          <span 
            key={index} 
            className="text-lg md:text-xl font-serif italic text-[#A8A29E]/60 hover:text-[#2C2A26] transition-colors duration-500 cursor-default select-none tracking-widest"
          >
            {partner}
          </span>
        ))}
      </div>
      
      {/* Fade Edges for Fluidity */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F2EB] to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F5F2EB] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default TrustedPartners;