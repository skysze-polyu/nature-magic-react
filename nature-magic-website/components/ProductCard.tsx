/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { Product, Variant } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product, variant: Variant) => void; // Update to pass variant
  onQuickView?: (product: Product, variant: Variant) => void; // Update to pass variant
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onQuickView }) => {
  // Default to the first variant
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onQuickView) {
          onQuickView(product, selectedVariant);
      }
  };

  const handleVariantClick = (e: React.MouseEvent, variant: Variant) => {
      e.stopPropagation(); // Prevent card click
      setSelectedVariant(variant);
  };

  // Use variant image if available, else product default
  const displayImage = selectedVariant.image || product.imageUrl;
  
  // Calculate a slight scale effect on image change for visual feedback
  const [animTrigger, setAnimTrigger] = useState(0);
  const handleVariantChange = (e: React.MouseEvent, variant: Variant) => {
      handleVariantClick(e, variant);
      setAnimTrigger(prev => prev + 1);
  };

  return (
    <div 
        className="group flex flex-col gap-6 cursor-pointer" 
        onClick={() => onClick(product, selectedVariant)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EBE7DE] rounded-sm">
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-[-25deg] translate-x-[-150%] transition-transform duration-1000 group-hover:animate-[shimmer_1.2s_ease-in-out_infinite] z-20 pointer-events-none"></div>
        
        {/* Product Image */}
        <img 
          key={animTrigger} // Force re-render animation on change
          src={displayImage} 
          alt={`${product.name} ${selectedVariant.name}`} 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 sepia-[0.1] animate-fade-in-up"
        />
        
        {/* Glass Hover overlay & Buttons */}
        <div className="absolute inset-0 bg-[#2C2A26]/0 group-hover:bg-[#2C2A26]/10 backdrop-blur-[2px] transition-all duration-500 flex flex-col items-center justify-center z-30 gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
            
            {/* Quick View Button */}
            {onQuickView && (
                <button 
                    onClick={handleQuickView}
                    className="glass-panel bg-white/90 text-[#2C2A26] hover:bg-[#2C2A26] hover:text-[#F5F2EB] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-medium transition-colors shadow-lg transform hover:scale-105"
                >
                    Quick Add
                </button>
            )}

            {/* View Details Link (Text) */}
            <span className="text-[#F5F2EB] text-xs uppercase tracking-widest border-b border-transparent hover:border-[#F5F2EB] pb-0.5 transition-colors">
                Full Details
            </span>
        </div>
      </div>
      
      <div className="text-center relative z-10 flex flex-col items-center">
        <h3 className="text-2xl font-serif font-medium text-[#2C2A26] mb-1 group-hover:opacity-70 transition-opacity">{product.name}</h3>
        <p className="text-sm font-light text-[#5D5A53] mb-3 tracking-wide">{product.category}</p>
        
        {/* Price Update */}
        <span className="text-sm font-medium text-[#2C2A26] block mb-4 transition-all duration-300">
            ${selectedVariant.price}
        </span>

        {/* Variant Selectors (Always visible or show on hover? Let's keep visible for usability) */}
        <div className="flex gap-2 justify-center flex-wrap px-4">
            {product.variants.map((v) => (
                <button
                    key={v.id}
                    onClick={(e) => handleVariantChange(e, v)}
                    className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border transition-all duration-300 ${
                        selectedVariant.id === v.id 
                            ? 'bg-[#2C2A26] text-[#F5F2EB] border-[#2C2A26]' 
                            : 'bg-transparent text-[#A8A29E] border-[#D6D1C7] hover:border-[#2C2A26] hover:text-[#2C2A26]'
                    }`}
                >
                    {v.name}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
