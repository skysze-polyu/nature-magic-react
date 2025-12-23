/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Product, Variant } from '../types';
import BrandComparison from './BrandComparison';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, variant: Variant) => void;
  initialVariant?: Variant;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, initialVariant }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(initialVariant || product.variants[0]);
  const [activeTab, setActiveTab] = useState<'feeding' | 'transition'>('feeding');

  useEffect(() => {
      setSelectedVariant(initialVariant || product.variants[0]);
  }, [product, initialVariant]);

  const displayImage = selectedVariant.image || product.imageUrl;

  return (
    <div className="pt-24 min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          
          {/* Left: Main Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-[#EBE7DE] overflow-hidden rounded-3xl shadow-xl">
              <img 
                key={selectedVariant.id}
                src={displayImage} 
                alt={product.name} 
                className="w-full h-full object-cover animate-fade-in-up"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square bg-[#EBE7DE] rounded-xl overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
          </div>

          {/* Right: Essential Details & Buy Box */}
          <div className="flex flex-col justify-center max-w-xl">
             <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-[0.2em]">{product.category}</span>
                <span className="w-1 h-1 bg-[#D6D1C7] rounded-full"></span>
                <span className="text-xs font-bold text-[#3A4D39] uppercase tracking-widest">In Stock</span>
             </div>
             
             <h1 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-6 leading-tight">{product.name}</h1>
             
             <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-light text-[#2C2A26]">${selectedVariant.price}</span>
                <span className="text-sm text-[#A8A29E] line-through">${Math.round(selectedVariant.price * 1.4)}</span>
                <span className="bg-[#3A4D39] text-white text-[10px] px-2 py-1 rounded uppercase font-bold tracking-tighter">Save 40%</span>
             </div>
             
             <p className="text-[#5D5A53] leading-relaxed font-light text-lg mb-10 pb-10 border-b border-[#D6D1C7]">
               {product.description}
             </p>

             <div className="mb-10">
               <div className="flex justify-between items-end mb-4">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#2C2A26]">Select Quantity / Size</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                 {product.variants.map(variant => (
                   <button 
                     key={variant.id}
                     onClick={() => setSelectedVariant(variant)}
                     className={`px-4 py-4 flex items-center justify-between border rounded-xl transition-all duration-500 ${
                       selectedVariant.id === variant.id 
                         ? 'border-[#2C2A26] bg-[#2C2A26] text-[#F5F2EB] shadow-lg' 
                         : 'border-[#D6D1C7] text-[#5D5A53] hover:border-[#2C2A26] hover:bg-white/50'
                     }`}
                   >
                     <span className="font-medium text-sm">{variant.name}</span>
                     <span className={`text-xs ${selectedVariant.id === variant.id ? 'opacity-70' : 'text-[#A8A29E]'}`}>${variant.price}</span>
                   </button>
                 ))}
               </div>
             </div>

             <div className="flex flex-col gap-6 mb-12">
               <button 
                 onClick={() => onAddToCart(product, selectedVariant)}
                 className="w-full py-5 bg-[#3A4D39] text-[#F5F2EB] uppercase tracking-widest text-sm font-bold hover:bg-[#2A3929] transition-all duration-500 shadow-xl rounded-2xl group relative overflow-hidden"
               >
                 <span className="relative z-10">Add to Magic Bag — ${selectedVariant.price}</span>
                 <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
               </button>
               
               <div className="grid grid-cols-3 gap-4 border-t border-b border-[#D6D1C7] py-6">
                  {[
                    { icon: "📦", label: "Free Shipping", sub: "Orders $200+" },
                    { icon: "🔄", label: "30-Day Return", sub: "Easy exchange" },
                    { icon: "🛡️", label: "Pure Origin", sub: "100% Traceable" }
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                        <div className="text-xl mb-1">{item.icon}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#2C2A26]">{item.label}</div>
                        <div className="text-[9px] text-[#A8A29E] tracking-wide">{item.sub}</div>
                    </div>
                  ))}
               </div>
             </div>

             <div className="space-y-4">
                <AccordionRow 
                    title="Product Highlights" 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>}
                >
                    <ul className="space-y-3">
                        {product.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-[#5D5A53]">
                                <span className="w-1.5 h-1.5 bg-[#3A4D39] rounded-full"></span>
                                {f}
                            </li>
                        ))}
                    </ul>
                </AccordionRow>

                {product.ingredients && (
                    <AccordionRow 
                        title="Ingredient Analysis" 
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.641.32a2 2 0 01-1.789 0l-.641-.32a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.393 1.393a2 2 0 000 2.828l1.393 1.393a2 2 0 002.828 0l1.393-1.393a2 2 0 000-2.828l-1.393-1.393" /></svg>}
                    >
                        <p className="text-sm leading-loose text-[#5D5A53] font-light italic">
                            {product.ingredients}
                        </p>
                    </AccordionRow>
                )}

                {product.nutritionalAnalysis && (
                    <AccordionRow 
                        title="Typical Values" 
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                    >
                        <div className="space-y-2">
                            {product.nutritionalAnalysis.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm border-b border-[#D6D1C7]/50 pb-2">
                                    <span className="text-[#A8A29E] uppercase tracking-wider text-[10px] font-bold">{item.label}</span>
                                    <span className="text-[#2C2A26] font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </AccordionRow>
                )}
             </div>
          </div>
        </div>

        {/* --- BRAND DNA EXPLORATION --- */}
        <section className="mb-40">
            <div className="text-center mb-20">
                <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#A8A29E] mb-6">The DNA of Every Can</span>
                <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">Pure Alchemy</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="relative group">
                    <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                         <img 
                            src="https://naturemagic.com.hk/cdn/shop/files/our_Manufacturer.jpg?v=1762266648" 
                            alt="Facility" 
                            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-[#3A4D39]/20 mix-blend-multiply"></div>
                    </div>
                    <div className="absolute -bottom-8 -right-8 glass-panel p-8 rounded-3xl bg-white/80 border-white/50 shadow-2xl backdrop-blur-xl max-w-xs">
                         <h4 className="font-serif text-2xl text-[#2C2A26] mb-2">14 Years</h4>
                         <p className="text-xs text-[#5D5A53] uppercase tracking-widest font-bold">Zero-Recall Safety Track Record</p>
                    </div>
                </div>
                
                <div className="space-y-12">
                    {[
                        { title: "The Art of Subtraction", desc: "We define our food by what we leave out. Zero grains, zero gums, and zero artificial attractants." },
                        { title: "Ethical Sourcing", desc: "100% New Zealand grass-fed proteins and wild-caught seafood from sustainably managed ecosystems." },
                        { title: "Nutrient Lock™", desc: "Our low-temperature cooking process ensures vital amino acids and enzymes remain bio-available." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-8 items-start">
                            <span className="text-3xl font-serif italic text-[#3A4D39]/30">0{i+1}</span>
                            <div>
                                <h3 className="text-2xl font-serif text-[#2C2A26] mb-3">{item.title}</h3>
                                <p className="text-[#5D5A53] font-light leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- COMPARISON TABLE --- */}
        <BrandComparison />

        {/* --- FAQ SECTION: PETFOODNZ & CORE VALUES --- */}
        <section className="mb-40 py-24 bg-white/40 border-y border-[#D6D1C7]/50">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-4">Common Inquiry</h2>
                    <p className="text-[#A8A29E] font-bold uppercase tracking-widest text-[10px]">Understanding the Essence</p>
                </div>
                
                <div className="space-y-12">
                    <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] bg-[#3A4D39]/5 border-none shadow-sm">
                        <h4 className="text-xl md:text-2xl font-serif text-[#2C2A26] mb-6 flex gap-4">
                            <span className="text-[#3A4D39]">Q:</span>
                            NATURE MAGIC 由 PetfoodNZ 生產，與 ZIWI、K9 Natural 同廠，成分是否相同？
                        </h4>
                        <div className="flex gap-4">
                            <span className="text-2xl font-serif text-[#3A4D39] font-bold">A:</span>
                            <div className="space-y-6 text-[#5D5A53] font-light leading-loose text-lg">
                                <p>這正是 <strong>NATURE MAGIC</strong> 最大的優勢。我們是由世界級生產商 <strong>PetfoodNZ</strong> 所自建的官方品牌。</p>
                                <div className="grid md:grid-cols-2 gap-8 mt-8">
                                    <div className="space-y-3">
                                        <h5 className="font-bold text-[#2C2A26] text-sm uppercase tracking-wider">01. 源頭信任</h5>
                                        <p className="text-sm">保持與頂級品牌同規格的最高品質控制體系，確保食品安全。</p>
                                    </div>
                                    <div className="space-y-3">
                                        <h5 className="font-bold text-[#2C2A26] text-sm uppercase tracking-wider">02. 配方創新</h5>
                                        <p className="text-sm">我們憑藉對生產線的深入了解，獨立研發出更具功能的營養方案。</p>
                                    </div>
                                    <div className="space-y-3">
                                        <h5 className="font-bold text-[#2C2A26] text-sm uppercase tracking-wider">03. 專注關節</h5>
                                        <p className="text-sm">獨家添加紐西蘭綠唇貽貝與 4 合 1 循環養護系統，為活動力提供科學支持。</p>
                                    </div>
                                    <div className="space-y-3">
                                        <h5 className="font-bold text-[#2C2A26] text-sm uppercase tracking-wider">04. 純肉承諾</h5>
                                        <p className="text-sm">承諾高達 ≥96% 的純肉含量，徹底滿足毛孩的食肉本能。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- FEEDING & TRANSITION GUIDES --- */}
        <section className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[4rem] p-8 md:p-24 shadow-2xl overflow-hidden">
             <div className="flex flex-col items-center text-center mb-16">
                 <div className="flex bg-[#D6D1C7]/30 p-1.5 rounded-full mb-12">
                    <button 
                        onClick={() => setActiveTab('feeding')}
                        className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === 'feeding' ? 'bg-[#3A4D39] text-white shadow-lg' : 'text-[#5D5A53] hover:text-[#2C2A26]'}`}
                    >
                        Feeding Guide
                    </button>
                    <button 
                        onClick={() => setActiveTab('transition')}
                        className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === 'transition' ? 'bg-[#3A4D39] text-white shadow-lg' : 'text-[#5D5A53] hover:text-[#2C2A26]'}`}
                    >
                        7-Day Transition
                    </button>
                 </div>
             </div>

             <div className="max-w-5xl mx-auto">
                {activeTab === 'feeding' ? (
                    <div className="animate-fade-in-up space-y-12">
                         <div className="text-center space-y-4 mb-16">
                            <h3 className="text-3xl md:text-5xl font-serif text-[#2C2A26]">Feeding Amount</h3>
                            <p className="text-[#A8A29E] font-medium tracking-widest uppercase text-xs">Guidelines per 24 hours</p>
                         </div>

                         <div className="bg-white/60 rounded-[2rem] overflow-hidden border border-white/40 shadow-sm">
                            <div className="grid grid-cols-2 bg-[#F5F2EB]/80 p-6 md:p-8 border-b border-[#D6D1C7]">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3A4D39]">Dog Weight</span>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3A4D39] text-right">Daily Feeding Amount</span>
                            </div>
                            <div className="divide-y divide-[#D6D1C7]/30">
                                {[
                                    { w: "2.0 - 3.0 kg", a: "104 - 224 g" },
                                    { w: "3.0 - 5.0 kg", a: "140 - 328 g" },
                                    { w: "5.0 - 10.0 kg", a: "206 - 552 g" },
                                    { w: "10.0 - 20.0 kg", a: "346 - 928 g" },
                                    { w: "20.0 - 30.0 kg", a: "580 - 1257 g" },
                                    { w: "30.0 - 40.0 kg", a: "787 - 1559 g" }
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-2 p-6 md:p-8 hover:bg-white/20 transition-colors">
                                        <span className="font-serif text-lg md:text-2xl text-[#5D5A53]">{row.w}</span>
                                        <span className="font-serif text-lg md:text-2xl text-[#2C2A26] text-right font-bold">{row.a}</span>
                                    </div>
                                ))}
                            </div>
                         </div>
                         <p className="text-center text-xs text-[#A8A29E] italic">Portions may vary based on activity level and age. Always provide fresh water.</p>
                    </div>
                ) : (
                    <div className="animate-fade-in-up space-y-16">
                         <div className="text-center space-y-4 mb-20">
                            <h3 className="text-3xl md:text-5xl font-serif text-[#2C2A26]">The Gentle Transition</h3>
                            <p className="text-[#A8A29E] font-medium tracking-widest uppercase text-xs">Patience is the key to gut harmony</p>
                         </div>
                         
                         <div className="relative">
                            <div className="absolute top-[85px] left-[10%] right-[10%] h-px bg-[#D6D1C7] z-0 hidden md:block"></div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                                {[
                                    { days: "Days 1-2", ratio: [25, 75], label: "25% NM" },
                                    { days: "Days 3-4", ratio: [50, 50], label: "50% NM" },
                                    { days: "Days 5-6", ratio: [75, 25], label: "75% NM" },
                                    { days: "Day 7+", ratio: [100, 0], label: "100% Pure" }
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center gap-6">
                                        <div className="text-center">
                                            <span className="font-serif text-xl md:text-2xl text-[#2C2A26] block mb-4">{step.days}</span>
                                            <div className="w-4 h-4 rounded-full border-2 border-[#2C2A26] bg-[#F5F2EB] mx-auto mb-8 hidden md:block relative">
                                                <div className="absolute inset-1 bg-[#2C2A26] rounded-full"></div>
                                            </div>
                                        </div>

                                        <div className="w-24 md:w-32 aspect-square relative">
                                            <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-lg">
                                                <path d="M5 40 Q 5 70 50 70 Q 95 70 95 40 Z" fill="#D6D1C7" opacity="0.4" />
                                                <path d="M5 40 Q 5 65 50 65 Q 95 65 95 40 Z" fill="white" />
                                                <path d={`M10 40 Q 10 60 50 60 Q 90 60 90 40 Z`} fill="#A8A29E" />
                                                {step.ratio[0] > 0 && (
                                                    <path 
                                                        d={step.ratio[0] === 100 
                                                            ? "M10 40 Q 10 60 50 60 Q 90 60 90 40 Z" 
                                                            : `M10 40 Q 10 60 ${10 + (80 * (step.ratio[0]/100))} 60 L ${10 + (80 * (step.ratio[0]/100))} 40 Z`} 
                                                        fill="#3A4D39" 
                                                    />
                                                )}
                                                <text x="50" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" className="pointer-events-none uppercase tracking-tighter">
                                                    {step.ratio[0]}% / {step.ratio[1]}%
                                                </text>
                                            </svg>
                                        </div>
                                        
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A4D39] bg-[#3A4D39]/10 px-3 py-1 rounded-full">{step.label}</span>
                                    </div>
                                ))}
                            </div>
                         </div>

                         <div className="flex justify-center gap-12 pt-12 border-t border-[#D6D1C7]/30">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-sm bg-[#3A4D39]"></div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#2C2A26]">NATURE MAGIC</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-sm bg-[#A8A29E]"></div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#2C2A26]">Old Brand</span>
                            </div>
                         </div>
                    </div>
                )}
             </div>
        </section>

      </div>
    </div>
  );
};

const AccordionRow: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-[#D6D1C7] last:border-b-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 flex items-center justify-between hover:opacity-70 transition-opacity"
            >
                <div className="flex items-center gap-4">
                    <span className="text-[#3A4D39]">{icon}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C2A26]">{title}</span>
                </div>
                <svg className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 animate-fade-in-up">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;