/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { CartItem, Product, Variant } from '../types';
import { PRODUCTS } from '../constants';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onRemoveItem: (index: number) => void;
  onAddToCart: (product: Product, variant: Variant) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onUpdateQuantity, onRemoveItem, onAddToCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showStandardModal, setShowStandardModal] = useState(false);
  const [orderId] = useState(`NM-${Math.floor(Math.random() * 900000 + 100000)}`);

  // Logic Constants
  const DISCOUNT_RATE = 0.20;
  const FREE_SHIPPING_THRESHOLD = 200;

  // Real-time Calculations
  const originalSubtotal = items.reduce((sum, item) => sum + (item.selectedVariant.price * item.quantity), 0);
  const discountAmount = originalSubtotal * DISCOUNT_RATE;
  const finalSubtotal = originalSubtotal - discountAmount;
  const isFreeShipping = finalSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : 15;
  const total = finalSubtotal + shippingCost;

  // Smart Recommendations (Upsells)
  const recommendations = useMemo(() => {
    const cartIds = new Set(items.map(i => i.id));
    return PRODUCTS.filter(p => !cartIds.has(p.id)).slice(0, 2);
  }, [items]);

  const handleSimulatedPayment = () => {
    setShowStandardModal(false);
    setIsProcessing(true);
    // Simulate New Zealand server sync
    setTimeout(() => {
        setIsSuccess(true);
        setIsProcessing(false);
    }, 2500);
  };

  if (isSuccess) {
      return (
        <SuccessView 
            orderId={orderId} 
            onBack={onBack} 
            items={items} 
            total={total} 
            discount={discountAmount}
            shipping={shippingCost}
        />
      );
  }

  if (items.length === 0) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F2EB]">
              <h2 className="text-3xl font-serif mb-6 text-[#2C2A26]">Your Magic Bag is Empty</h2>
              <button onClick={onBack} className="px-10 py-4 bg-[#2C2A26] text-white rounded-full uppercase tracking-widest text-xs font-bold">Return to Selection</button>
          </div>
      );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 bg-[#F5F2EB] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#A8C3A0] rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#60A5FA] rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      {isProcessing && (
          <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
              <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-[#3A4D39]/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-[#3A4D39] rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-serif text-[#2C2A26]">正在與紐西蘭伺服器同步...</h2>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#A8A29E] mt-4">Processing Secure Payment</p>
          </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <button onClick={onBack} className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-[#2C2A26] mb-4">
                    <div className="w-8 h-8 rounded-full border border-[#2C2A26]/10 flex items-center justify-center bg-white/40 group-hover:bg-white transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
                    </div>
                    Back
                </button>
                <h1 className="text-4xl md:text-5xl font-serif text-[#2C2A26]">Checkout</h1>
            </div>
            <div className="flex gap-4">
                <span className="px-4 py-2 bg-[#3A4D39]/10 border border-[#3A4D39]/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#3A4D39]">
                    20% Autumn Discount
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT: DECISION AREA (Items + Upsells) */}
            <div className="lg:col-span-7 space-y-12">
                
                {/* 1. Review List */}
                <section className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-white/40 border-white/60 shadow-xl">
                    <h2 className="text-lg font-serif text-[#2C2A26] mb-8 uppercase tracking-widest">Review Selection</h2>
                    <div className="space-y-6">
                        {items.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex gap-6 items-center p-4 bg-white/50 rounded-2xl border border-white/80 hover:shadow-md transition-all group">
                                <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#EBE7DE] flex-shrink-0">
                                    <img src={item.selectedVariant.image || item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-base text-[#2C2A26]">{item.name}</h3>
                                    <p className="text-[10px] text-[#A8A29E] uppercase tracking-widest font-bold mb-3">{item.selectedVariant.name}</p>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-[#D6D1C7] rounded-full bg-white/80 h-8 px-1">
                                            <button onClick={() => onUpdateQuantity(idx, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-[#5D5A53] hover:bg-black/5 rounded-full transition-colors">-</button>
                                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(idx, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-[#5D5A53] hover:bg-black/5 rounded-full transition-colors">+</button>
                                        </div>
                                        <button onClick={() => onRemoveItem(idx)} className="text-[9px] uppercase font-bold text-red-300 hover:text-red-500 tracking-widest transition-colors">Remove</button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-lg font-serif text-[#3A4D39]">${Math.round(item.selectedVariant.price * (1 - DISCOUNT_RATE) * item.quantity)}</span>
                                    <span className="text-[9px] text-[#A8A29E] line-through uppercase tracking-widest">${item.selectedVariant.price * item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Magic Upsells */}
                {recommendations.length > 0 && (
                    <section className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-[#3A4D39]/5 border-dashed border-[#3A4D39]/20">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-serif text-[#3A4D39] italic">Enhance the Magic?</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recommendations.map(rec => (
                                <div key={rec.id} className="flex gap-4 items-center bg-white/80 p-4 rounded-2xl border border-white/50 shadow-sm group hover:border-[#3A4D39]/30 transition-all">
                                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white">
                                        <img src={rec.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-[#2C2A26]">{rec.name}</h4>
                                        <p className="text-[10px] text-[#A8A29E] uppercase tracking-widest">${rec.variants[0].price}</p>
                                    </div>
                                    <button 
                                        onClick={() => onAddToCart(rec, rec.variants[0])}
                                        className="w-8 h-8 rounded-full bg-[#3A4D39] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth={2}/></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* RIGHT: SUMMARY & PAYMENT (Sticky) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
                
                {/* 3. Summary Panel */}
                <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] bg-[#2C2A26] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                    
                    <h2 className="text-xl font-serif mb-8 flex items-center gap-4">
                        <span className="opacity-40 tracking-widest uppercase text-xs font-sans">Summary</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </h2>

                    <div className="space-y-4 mb-8 text-sm font-light">
                        <div className="flex justify-between">
                            <span className="text-white/40 uppercase tracking-widest text-[9px]">Subtotal</span>
                            <span className="font-serif">${originalSubtotal}</span>
                        </div>
                        <div className="flex justify-between text-[#A8C3A0]">
                            <span className="uppercase tracking-widest text-[9px]">Discount (20% OFF)</span>
                            <span className="font-serif">-${Math.round(discountAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/40 uppercase tracking-widest text-[9px]">Shipping</span>
                            <span className="font-serif">{isFreeShipping ? 'Free' : `$${shippingCost}`}</span>
                        </div>
                        
                        <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-baseline">
                            <span className="text-xl font-serif">Total</span>
                            <div className="text-right">
                                <span className="text-4xl font-serif tracking-tighter text-[#A8C3A0]">${Math.round(total)}</span>
                                <span className="block text-[8px] uppercase tracking-[0.4em] text-white/30 mt-2">HKD</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Checkout Trigger */}
                    <div className="space-y-4">
                        <span className="block text-center text-[9px] uppercase tracking-[0.4em] text-white/40 mb-4">Express Checkout</span>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={handleSimulatedPayment} className="py-3.5 bg-white text-black rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all transform active:scale-95 shadow-xl">
                                <span className="text-lg"></span> <span className="font-bold tracking-tight text-base">Pay</span>
                            </button>
                            <button onClick={handleSimulatedPayment} className="py-3.5 bg-[#4285F4] text-white rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all transform active:scale-95 shadow-xl">
                                <span className="font-bold tracking-tight text-base">GPay</span>
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setShowStandardModal(true)}
                            className="w-full py-4 bg-white/10 border border-white/20 rounded-xl text-[9px] font-bold uppercase tracking-[0.4em] text-white hover:bg-white/20 transition-all mt-2"
                        >
                            Other Payment Methods
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- CONDENSED POPUP MODAL --- */}
      {showStandardModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 animate-fade-in">
              <div className="absolute inset-0 bg-[#2C2A26]/70 backdrop-blur-sm" onClick={() => setShowStandardModal(false)}></div>
              
              <div className="relative w-full max-w-xl bg-[#F5F2EB] rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up-fade">
                  {/* Close Button Only */}
                  <button 
                    onClick={() => setShowStandardModal(false)} 
                    className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full border border-[#D6D1C7] flex items-center justify-center hover:bg-black hover:text-white transition-all bg-white/50 backdrop-blur-sm"
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
                  </button>

                  <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto no-scrollbar">
                        {/* Social Quick Login */}
                        <div className="mb-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A8A29E] mb-6 text-center">Social Login</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <SocialButton icon="Google" color="bg-white border border-gray-200 text-black" text="Google" />
                                <SocialButton icon="Facebook" color="bg-[#1877F2] text-white" text="Facebook" />
                                <SocialButton icon="Apple" color="bg-black text-white" text="Apple ID" />
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute w-full h-px bg-[#D6D1C7]"></div>
                            <span className="relative z-10 bg-[#F5F2EB] px-6 text-[9px] font-bold uppercase tracking-[0.4em] text-[#A8A29E]">Shipping Information</span>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FloatingInput label="First Name" />
                                <FloatingInput label="Last Name" />
                            </div>
                            <FloatingInput label="Phone Number" type="tel" placeholder="+852" />
                            <FloatingInput label="Full Address" />
                            <div className="grid grid-cols-2 gap-4">
                                <FloatingInput label="District" />
                                <FloatingInput label="Region" />
                            </div>
                            <div className="pt-4">
                                <button 
                                    onClick={handleSimulatedPayment}
                                    className="w-full py-5 bg-[#3A4D39] text-white rounded-2xl uppercase tracking-[0.4em] text-[10px] font-bold shadow-2xl hover:bg-[#2A3929] transition-all transform active:scale-[0.98]"
                                >
                                    Confirm Order — ${Math.round(total)}
                                </button>
                                <p className="text-center text-[7px] uppercase tracking-widest text-[#A8A29E] mt-4 opacity-60">
                                    Encrypted by Nature Magic Secure Gateway
                                </p>
                            </div>
                        </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// --- Helper Components ---

const FloatingInput: React.FC<{ label: string; type?: string; placeholder?: string }> = ({ label, type = 'text', placeholder }) => (
    <div className="relative">
        <label className="block text-[8px] uppercase font-bold tracking-[0.2em] text-[#A8A29E] mb-1.5 ml-3">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder}
            className="w-full bg-white/60 border border-[#D6D1C7] rounded-xl px-4 py-3 text-[#2C2A26] placeholder-[#A8A29E]/30 focus:border-[#3A4D39] focus:bg-white transition-all outline-none text-xs"
        />
    </div>
);

const SocialButton: React.FC<{ icon: string; text: string; color: string }> = ({ icon, text, color }) => (
    <button className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold transition-all transform active:scale-95 shadow-sm ${color}`}>
        <span className="text-base">{icon === 'Google' ? 'G' : icon === 'Facebook' ? 'f' : ''}</span>
        <span className="tracking-tight">{text}</span>
    </button>
);

const SuccessView: React.FC<{ 
    orderId: string; 
    onBack: () => void; 
    items: CartItem[]; 
    total: number;
    discount: number;
    shipping: number;
}> = ({ orderId, onBack, items, total, discount, shipping }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] p-4 md:p-8 animate-fade-in-up">
        <div className="max-w-5xl w-full glass-panel bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-12">
            
            {/* Left: Message */}
            <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left relative z-10">
                <div className="w-16 h-16 bg-[#3A4D39] rounded-full flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-2xl shadow-[#3A4D39]/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={3}/></svg>
                </div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.6em] text-[#A8A29E] mb-6">Order Complete</span>
                <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] mb-8 leading-tight">魔法已 <br/><span className="italic opacity-50">準備就緒。</span></h2>
                
                <div className="p-6 bg-[#3A4D39]/5 rounded-2xl border border-[#3A4D39]/10 inline-block mb-10 text-center lg:text-left">
                    <p className="text-[9px] text-[#5D5A53] uppercase tracking-widest font-bold mb-1">Order Tracking ID</p>
                    <p className="text-2xl font-serif text-[#3A4D39] tracking-tighter">{orderId}</p>
                </div>

                <p className="text-base text-[#5D5A53] font-light leading-relaxed mb-12 italic opacity-80">
                    "感謝您選擇 NATURE MAGIC。我們的團隊已開始在紐西蘭為您的毛孩準備這份來自大自然的純淨餽贈。"
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button onClick={onBack} className="px-10 py-4 bg-[#2C2A26] text-white rounded-full uppercase tracking-widest text-[9px] font-bold hover:bg-black transition-all shadow-xl">Back to Home</button>
                    <button className="px-10 py-4 border border-[#2C2A26] text-[#2C2A26] rounded-full uppercase tracking-widest text-[9px] font-bold hover:bg-[#2C2A26] hover:text-white transition-all">Track Order</button>
                </div>
            </div>

            {/* Right: Order Summary Re-confirmation */}
            <div className="lg:w-1/2 bg-[#F5F2EB]/50 rounded-[2rem] p-8 md:p-10 border border-[#D6D1C7]/30">
                <h3 className="text-lg font-serif text-[#2C2A26] mb-8 uppercase tracking-widest border-b border-[#D6D1C7] pb-4">Order Summary</h3>
                
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar mb-8">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                            <div className="w-12 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                <img src={item.selectedVariant.image || item.imageUrl} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xs font-bold text-[#2C2A26]">{item.name}</h4>
                                <p className="text-[9px] text-[#A8A29E] uppercase tracking-widest">Qty: {item.quantity} • {item.selectedVariant.name}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-serif text-[#2C2A26]">${Math.round(item.selectedVariant.price * 0.8 * item.quantity)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-[#D6D1C7] text-xs font-light">
                    <div className="flex justify-between text-[#A8A29E]">
                        <span>Savings</span>
                        <span>-${Math.round(discount)}</span>
                    </div>
                    <div className="flex justify-between text-[#A8A29E]">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-[#D6D1C7]/50">
                        <span className="text-lg font-serif text-[#2C2A26]">Total Paid</span>
                        <div className="text-right">
                            <span className="text-3xl font-serif text-[#3A4D39]">${Math.round(total)}</span>
                            <span className="block text-[8px] uppercase tracking-widest text-[#A8A29E]">HKD</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Background SVG Decor */}
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
                    <circle cx="100" cy="100" r="90" stroke="#3A4D39" strokeWidth="0.5" fill="none" strokeDasharray="10,5" />
                    <circle cx="100" cy="100" r="70" stroke="#3A4D39" strokeWidth="0.5" fill="none" strokeDasharray="5,10" />
                </svg>
            </div>
        </div>
    </div>
);

export default Checkout;