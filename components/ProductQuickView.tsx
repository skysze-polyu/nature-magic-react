/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Product, Variant } from '../types';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variant: Variant) => void;
  onViewDetails: (product: Product) => void;
  initialVariant?: Variant;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, isOpen, onClose, onAddToCart, onViewDetails, initialVariant }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(initialVariant || product.variants[0]);

  // Reset variant when product changes or opens
  useEffect(() => {
    setSelectedVariant(initialVariant || product.variants[0]);
  }, [product, initialVariant, isOpen]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate short delay for interaction feel
    setTimeout(() => {
        onAddToCart(product, selectedVariant);
        setIsAdding(false);
        onClose();
    }, 400);
  };

  const displayImage = selectedVariant.image || product.imageUrl;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[60] bg-[#2C2A26]/40 backdrop-blur-md transition-opacity duration-300 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Container - Liquid Glass */}
        <div 
            className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative animate-fade-in-up shadow-2xl bg-white/60 border border-white/40 flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/50 hover:bg-white transition-colors flex items-center justify-center text-[#2C2A26] backdrop-blur-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-[#EBE7DE] relative overflow-hidden min-h-[300px] md:min-h-full group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-[-25deg] translate-x-[-150%] animate-[shimmer_2s_infinite]"></div>
                <img 
                    src={displayImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-2">{product.category}</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2A26] mb-4">{product.name}</h2>
                <div className="text-2xl font-light text-[#2C2A26] mb-6">${selectedVariant.price}</div>
                
                <p className="text-[#5D5A53] font-light leading-relaxed mb-8 border-b border-[#D6D1C7] pb-8">
                    {product.description}
                </p>

                {/* Variant Selector */}
                <div className="mb-6">
                    <span className="block text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-3">Size</span>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.map(v => (
                            <button
                                key={v.id}
                                onClick={() => setSelectedVariant(v)}
                                className={`text-xs px-3 py-2 rounded-md border transition-all ${
                                    selectedVariant.id === v.id
                                    ? 'bg-[#2C2A26] text-[#F5F2EB] border-[#2C2A26]'
                                    : 'border-[#D6D1C7] text-[#5D5A53] hover:border-[#2C2A26]'
                                }`}
                            >
                                {v.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full py-4 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors relative overflow-hidden rounded-lg shadow-lg group"
                    >
                        {isAdding ? 'Adding...' : `Add to Cart - $${selectedVariant.price}`}
                        {/* Button liquid effect */}
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-lg"></div>
                    </button>
                    
                    <button 
                        onClick={() => {
                            onClose();
                            onViewDetails(product);
                        }}
                        className="w-full py-4 bg-transparent border border-[#2C2A26]/20 text-[#2C2A26] uppercase tracking-widest text-sm font-medium hover:bg-white/30 transition-colors rounded-lg"
                    >
                        View Full Details
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductQuickView;
