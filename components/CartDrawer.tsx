/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { CartItem, Product, Variant } from '../types';
import { PRODUCTS } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[]; 
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onAddToCart: (product: Product, variant: Variant) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity, onAddToCart, onCheckout }) => {
  
  const FREE_SHIPPING_THRESHOLD = 200;
  const DISCOUNT_RATE = 0.20; 
  
  const originalSubtotal = items.reduce((sum, item) => sum + (item.selectedVariant.price * item.quantity), 0);
  const discountAmount = originalSubtotal * DISCOUNT_RATE;
  const finalSubtotal = originalSubtotal - discountAmount;
  
  const isFreeShipping = finalSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - finalSubtotal);
  const shippingCost = isFreeShipping ? 0 : 15; 
  const shippingProgress = Math.min(100, (finalSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const finalTotal = finalSubtotal + shippingCost;
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const recommendations = useMemo(() => {
    const cartIds = new Set(items.map(i => i.id));
    return PRODUCTS.filter(p => !cartIds.has(p.id)).slice(0, 2);
  }, [items]);

  return (
    <>
      {/* Backdrop - High Z-index */}
      <div 
        className={`fixed inset-0 bg-[#2C2A26]/40 backdrop-blur-md z-[990] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer - Highest Z-index */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[500px] liquid-glass z-[1000] shadow-2xl transform transition-transform duration-700 ease-in-out border-l border-white/20 flex flex-col !bg-white/80 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Area */}
        <div className="flex flex-col bg-white/30 backdrop-blur-xl">
            <div className="flex items-center justify-between p-8 pb-4">
                <h2 className="text-2xl font-serif text-[#2C2A26]">Magic Bag <span className="text-sm opacity-40 italic ml-2">({totalItemsCount})</span></h2>
                <button 
                    onClick={onClose} 
                    className="w-12 h-12 rounded-full border border-[#2C2A26]/10 flex items-center justify-center hover:bg-black hover:text-white transition-all bg-white/50 backdrop-blur-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="px-8 pb-8">
                <div className="mb-3 text-center text-[11px] uppercase tracking-[0.3em] font-black">
                    {isFreeShipping ? (
                        <span className="text-[#3A4D39] animate-pulse">✓ Shipping is on us!</span>
                    ) : (
                        <span className="text-[#5D5A53]">
                            Add <span className="text-[#2C2A26] font-black">${Math.ceil(remainingForFreeShipping)}</span> for Free Shipping
                        </span>
                    )}
                </div>
                <div className="w-full h-1.5 bg-[#2C2A26]/5 rounded-full overflow-hidden p-[1px]">
                    <div 
                        className="h-full bg-[#2C2A26] rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(44,42,38,0.2)]"
                        style={{ width: `${shippingProgress}%` }}
                    ></div>
                </div>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-8 no-scrollbar">
            
            {/* Cart Items */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-20 opacity-30">
                    <div className="text-6xl">✨</div>
                    <p className="font-serif italic text-xl">The magic is waiting...</p>
                </div>
            ) : (
                items.map((item, idx) => (
                    <div 
                        key={`${item.id}-${idx}`} 
                        className="flex gap-6 group cart-item-stagger"
                        style={{ 
                            animationDelay: `${idx * 80}ms`,
                            opacity: 0
                        }}
                    >
                        <div className="w-24 h-32 bg-white rounded-2xl overflow-hidden shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                            <img src={item.selectedVariant.image || item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-serif text-[#2C2A26] text-lg leading-tight">{item.name}</h3>
                                    <span className="text-base font-serif text-[#3A4D39]">${Math.round(item.selectedVariant.price * (1 - DISCOUNT_RATE) * item.quantity)}</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#A8A29E] bg-[#2C2A26]/5 px-2 py-0.5 rounded-full">
                                    {item.selectedVariant.name}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div className="flex items-center bg-white/40 border border-[#2C2A26]/10 rounded-full p-0.5">
                                    <button 
                                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center text-[#5D5A53] hover:bg-white rounded-full transition-colors font-bold"
                                    >-</button>
                                    <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                                    <button 
                                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-[#5D5A53] hover:bg-white rounded-full transition-colors font-bold"
                                    >+</button>
                                </div>

                                <button onClick={() => onRemoveItem(idx)} className="text-[11px] font-black uppercase tracking-widest text-red-300 hover:text-red-500 transition-colors">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Suggestions */}
            {recommendations.length > 0 && items.length > 0 && (
                <div className="pt-8 border-t border-[#2C2A26]/10">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#A8A29E] mb-6 text-center">Complete the ritual</h3>
                    <div className="space-y-4">
                        {recommendations.map(rec => (
                            <div key={rec.id} className="flex gap-4 items-center bg-white/30 p-4 rounded-[2rem] border border-white/50 group hover:border-[#2C2A26]/20 transition-all">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm">
                                    <img src={rec.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#2C2A26]">{rec.name}</h4>
                                    <span className="text-[10px] font-serif italic text-[#3A4D39] opacity-60">${rec.variants[0].price}</span>
                                </div>
                                <button 
                                    onClick={() => onAddToCart(rec, rec.variants[0])}
                                    className="w-10 h-10 rounded-full bg-[#2C2A26] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth={2.5}/></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Footer Area */}
        <div className="p-8 bg-white/50 backdrop-blur-3xl border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#A8A29E]">Subtotal</span>
                    <span className="font-serif text-lg">${originalSubtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[#3A4D39]">
                    <span className="text-[11px] font-black uppercase tracking-widest">Seasonal Discount</span>
                    <span className="font-serif text-lg">-${Math.round(discountAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-5 mt-2 border-t border-[#2C2A26]/5">
                    <span className="text-xl font-serif text-[#2C2A26]">Total</span>
                    <div className="text-right">
                        <span className="text-3xl font-serif text-[#2C2A26] tracking-tighter">${Math.round(finalTotal)}</span>
                        <span className="block text-[9px] uppercase tracking-widest text-[#A8A29E] mt-1 font-black">HKD Incl. Tax</span>
                    </div>
                </div>
            </div>

            <button 
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full py-5 bg-[#2C2A26] text-white rounded-[170px] text-[13px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all transform active:scale-95 disabled:opacity-30 shadow-2xl mb-4"
            >
                Enter Checkout
            </button>
            <p className="text-center text-[9px] uppercase tracking-[0.2em] text-[#A8A29E] font-bold">Secure Global Fulfillment via NZ Hub</p>
        </div>
      </div>

      <style>{`
        @keyframes staggerSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .cart-item-stagger {
          animation: staggerSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default CartDrawer;