/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { POLICIES } from '../constants';

interface PolicyPageProps {
  policyId: string;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ policyId }) => {
  const policy = POLICIES.find(p => p.id === policyId) || POLICIES[0];

  // For the FAQ specific layout
  if (policyId === 'faq') {
    return (
      <div className="min-h-screen bg-[#F5F2EB] pt-24 pb-24 animate-fade-in-up">
        {/* --- FAQ MAIN HERO --- */}
        <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
            <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2000" 
                alt="FAQ Background" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
            />
            <div className="relative z-10 text-center px-6">
                <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#A8A29E] mb-4">Support Center</span>
                <h1 className="text-5xl md:text-7xl font-serif text-[#2C2A26]">魔法寶典</h1>
                <p className="mt-6 text-[#5D5A53] font-light max-w-lg mx-auto">
                    尋找關於 NATURE MAGIC 營養、品質以及與 PetfoodNZ 合作關係的解答。
                </p>
            </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6">
            
            {/* --- SECTION 0: BRAND AUTHENTICITY (The PetfoodNZ Advantage) --- */}
            <div className="mb-24">
                <div className="glass-panel p-8 md:p-16 rounded-[3rem] bg-[#3A4D39] text-[#F5F2EB] shadow-2xl border-none relative overflow-hidden">
                    {/* Decorative Watermark */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-serif leading-none select-none">TRUST</div>
                    
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-serif mb-8 flex gap-4">
                            <span className="opacity-50">Q:</span>
                            NATURE MAGIC 由 PetfoodNZ 生產，與 ZIWI、K9 Natural 同廠，成分是否相同？
                        </h2>
                        <div className="flex gap-4">
                            <span className="text-3xl font-serif text-[#A8C3A0] font-bold">A:</span>
                            <div className="space-y-6 text-[#EBE7DE] font-light leading-loose text-lg">
                                <p className="font-medium text-white">這正是 NATURE MAGIC 最大的優勢與核心價值所在。</p>
                                <p>我們是由世界級生產商 <strong>PetfoodNZ</strong> 所自建的官方品牌 (Own Brand)。這給予我們三個獨特的優勢：</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                                        <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-3">源頭的信任</h4>
                                        <p className="text-sm opacity-80">我們與 ZIWI、K9 Natural 等品牌同樣保持最高規格的品質控制體系。提供最高級別的信心和安全保障。</p>
                                    </div>
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                                        <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-3">配方的創新</h4>
                                        <p className="text-sm opacity-80">憑藉對生產線和原料的深入了解，獨立研發出更具功能性的寵物營養方案。</p>
                                    </div>
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                                        <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-3">專注關節護理</h4>
                                        <p className="text-sm opacity-80">獨家添加紐西蘭綠唇貽貝與 4 合 1 循環養護系統，專門為寵物的活動力提供科學支持。</p>
                                    </div>
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                                        <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-3">更高的純肉承諾</h4>
                                        <p className="text-sm opacity-80">我們承諾高達 ≥96% 的純肉含量，徹底滿足毛孩對純肉的渴望。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CATEGORIZED FAQS --- */}
            <div className="space-y-32">
                
                {/* 1. Cats Category */}
                <section id="cats">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-16 bg-[#EBE7DE] rounded-2xl flex items-center justify-center text-3xl">🐈</div>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A8A29E]">Feline Magic</span>
                            <h3 className="text-3xl font-serif text-[#2C2A26]">貓貓法寶</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <FAQItem 
                            question="我的貓很挑食，應該選擇哪種天然貓糧？" 
                            answer="對於挑食的貓咪，我們建議嘗試我們的「經典無穀物系列」。它完美保留了肉類的原始風味與營養，極高的適口性往往能喚醒貓咪的食慾。建議在目前的食物中少量加入，逐步引導牠接受。"
                        />
                        <FAQItem 
                            question="貓咪腸胃敏感，經常軟便或嘔吐，吃什麼好？" 
                            answer="Nature Magic 專注於提供純淨、易消化的營養方案。建議選擇單一蛋白質來源、無穀物的配方。我們的產品剔除了常見的致敏源，旨在從根本上呵護牠們的消化系統。"
                        />
                        <FAQItem 
                            question="貓咪不愛喝水怎麼辦？濕糧有幫助嗎？" 
                            answer="除了乾糧外，提供高水份的寵物濕糧是極佳的補水方式。Nature Magic 濕糧模擬了貓咪在野外的獵物，能讓牠們在進食的同時「不知不覺」地補充水份，保護腎臟健康。"
                        />
                    </div>
                </section>

                {/* 2. Dogs Category */}
                <section id="dogs">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-16 bg-[#EBE7DE] rounded-2xl flex items-center justify-center text-3xl">🐕</div>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A8A29E]">Canine Vitality</span>
                            <h3 className="text-3xl font-serif text-[#2C2A26]">狗狗法寶</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <FAQItem 
                            question="哪種狗糧對狗狗的皮膚敏感和濕疹有幫助？" 
                            answer="建議選擇富含 Omega-3 和 Omega-6 脂肪酸的食譜，例如以魚類為主要蛋白質的配方。我們的產品絕不添加穀物、誘食劑等刺激性成分，旨在由內而外地建立健康的皮膚屏障。"
                        />
                        <FAQItem 
                            question="轉糧時狗狗拉肚子怎麼辦？如何正確幫狗狗過渡？" 
                            answer="我們建議採用「7天轉糧法」：第1-2天混合25%新糧；第3-4天各佔50%；第5-6天混合75%新糧；第7天完全轉換。這能讓腸道益生菌溫和地適應。"
                        />
                        <FAQItem 
                            question="我的老年犬有關節問題，應該選擇什麼？" 
                            answer="對於有關節問題的老年犬，營養支持至關重要。Nature Magic 獨家添加天然葡萄糖胺、軟骨素和綠唇貽貝。建議選擇專為熟齡犬設計的強化配方。"
                        />
                    </div>
                </section>

                {/* 3. Partners Category */}
                <section id="partners">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-16 bg-[#EBE7DE] rounded-2xl flex items-center justify-center text-3xl">🤝</div>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A8A29E]">Collaborations</span>
                            <h3 className="text-3xl font-serif text-[#2C2A26]">合作夥伴常見問題</h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <FAQItem 
                            question="如何成為 Nature Magic 香港或澳門的零售商？" 
                            answer="我們正在尋找志同道合的夥伴！您可以透過 B2B 聯絡表單提交您的店舖資料。我們的團隊在審核後會盡快聯繫您，並提供批發價格與合作方案。"
                        />
                        <FAQItem 
                            question="你們支持一件代發 (Dropshipping) 嗎？" 
                            answer="關於一件代發的合作模式，我們正在積極規劃中，目標是提供最便捷的物流與庫存解決方案。請密切關注 B2B 專區的最新公佈。"
                        />
                    </div>
                </section>

            </div>

            {/* --- CONTACT CTA --- */}
            <div className="mt-40 text-center p-12 bg-white/50 rounded-[3rem] border border-white/60">
                 <h3 className="text-3xl font-serif text-[#2C2A26] mb-4">仍未找到答案？</h3>
                 <p className="text-[#5D5A53] mb-8 font-light">我們的寵物營養專家隨時準備為您提供協助。</p>
                 <button className="px-10 py-4 bg-[#2C2A26] text-[#F5F2EB] rounded-full uppercase tracking-widest text-xs font-bold hover:bg-[#433E38] transition-all shadow-xl">
                    立即聯絡我們
                 </button>
            </div>
        </div>
      </div>
    );
  }

  // Fallback for generic policy pages
  return (
    <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
                 <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-4">Information</span>
                 <h1 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">{policy.title}</h1>
            </div>
            <div className="glass-panel bg-white/50 p-12 rounded-2xl md:min-h-[400px]">
                <div className="prose prose-stone prose-lg font-light text-[#5D5A53]">
                    <p>{policy.content}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

// Internal FAQ Item Component with Accordion Logic
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-[#D6D1C7]/30 last:border-b-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all"
            >
                <div className="flex items-start gap-4">
                    <span className="text-[#3A4D39] text-xl font-serif mt-0.5 opacity-30 group-hover:opacity-100 transition-opacity">?</span>
                    <h4 className="text-lg font-medium text-[#2C2A26] pr-8">{question}</h4>
                </div>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-[#D6D1C7] transition-all duration-500 ${isOpen ? 'bg-[#2C2A26] border-[#2C2A26] text-white rotate-180' : 'bg-transparent text-[#2C2A26]'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                <div className="pl-11 text-[#5D5A53] font-light leading-relaxed text-lg border-l-2 border-[#3A4D39]/10 ml-[18px]">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;