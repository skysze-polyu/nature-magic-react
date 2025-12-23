/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const CheckIcon = () => (
    <div className="w-6 h-6 rounded-full bg-[#3A4D39]/10 flex items-center justify-center text-[#3A4D39] mx-auto animate-fade-in-up">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    </div>
);

const CrossIcon = () => (
    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400 mx-auto opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
);

const BrandComparison: React.FC = () => {
    const rows = [
        { label: "Country / Factory", nm: "NZ / PetfoodNZ", ziwi: "NZ / PetfoodNZ", k9: "NZ / PetfoodNZ" },
        { label: "AAFCO Standards", nm: true, ziwi: true, k9: true },
        { label: "100% NZ Proteins", nm: true, ziwi: true, k9: true },
        { label: "Grain-Free", nm: true, ziwi: true, k9: true },
        { label: "Legume-Free", nm: true, ziwi: false, k9: true },
        { label: "Green Lipped Mussel", nm: true, ziwi: true, k9: true },
        { label: "Enhanced Mineral Absorption", nm: true, ziwi: true, k9: false },
        { label: "Complete Vit & Min", nm: true, ziwi: false, k9: false },
        { label: "Ovine Plasma", nm: true, ziwi: false, k9: false },
        { label: "Gum-Free", nm: true, ziwi: true, k9: true },
        { label: "Joint Care Function", nm: true, ziwi: false, k9: false },
        { label: "≥96% Meat Content", nm: true, ziwi: false, k9: true },
        { label: "≥17.95g Meat / 85g", nm: true, ziwi: false, k9: false },
    ];

    return (
        <section className="py-32 px-6 bg-[#F5F2EB]">
            <div className="max-w-5xl mx-auto text-center mb-16">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-4">Competitive Edge</span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2C2A26]">The Gold Standard</h2>
            </div>

            <div className="max-w-6xl mx-auto overflow-x-auto no-scrollbar">
                <div className="min-w-[800px] bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-4 border-b border-[#D6D1C7]/30 bg-[#F5F2EB]/50">
                        <div className="p-8 flex items-center justify-center font-serif text-xl text-[#A8A29E]">Brand</div>
                        <div className="p-8 text-center bg-[#3A4D39]/5 border-x border-[#D6D1C7]/20">
                            <span className="block text-[10px] uppercase font-bold text-[#3A4D39] tracking-widest mb-2">Our Pick</span>
                            <div className="text-xl font-serif text-[#3A4D39]">NATURE MAGIC</div>
                        </div>
                        <div className="p-8 text-center font-serif text-xl text-[#5D5A53]">ZIWI</div>
                        <div className="p-8 text-center font-serif text-xl text-[#8C8881]">K9</div>
                    </div>

                    {rows.map((row, i) => (
                        <div key={i} className="grid grid-cols-4 hover:bg-white/40 transition-colors group">
                            <div className="p-5 pl-12 flex items-center text-sm font-medium text-[#5D5A53] border-b border-[#D6D1C7]/20">
                                {row.label}
                            </div>
                            <div className="p-5 text-center bg-[#3A4D39]/5 border-x border-[#D6D1C7]/20 border-b border-[#D6D1C7]/20">
                                {typeof row.nm === 'boolean' ? <CheckIcon /> : <span className="text-xs font-bold text-[#3A4D39]">{row.nm}</span>}
                            </div>
                            <div className="p-5 text-center border-b border-[#D6D1C7]/20">
                                {typeof row.ziwi === 'boolean' ? (row.ziwi ? <CheckIcon /> : <CrossIcon />) : <span className="text-xs text-[#5D5A53]">{row.ziwi}</span>}
                            </div>
                            <div className="p-5 text-center border-b border-[#D6D1C7]/20">
                                {typeof row.k9 === 'boolean' ? (row.k9 ? <CheckIcon /> : <CrossIcon />) : <span className="text-xs text-[#5D5A53]">{row.k9}</span>}
                            </div>
                        </div>
                    ))}
                    
                    {/* Bottom Summary Callout */}
                    <div className="bg-[#3A4D39] p-10 text-center text-[#F5F2EB]">
                        <p className="text-sm font-light tracking-wide italic">
                            Produced by PetfoodNZ — The same world-class facility, enhanced with Nature Magic's proprietary awakening formula.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandComparison;