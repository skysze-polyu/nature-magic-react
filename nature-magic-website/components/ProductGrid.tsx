/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product, Variant } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onProductClick: (product: Product, variant?: Variant) => void;
  onQuickView?: (product: Product, variant: Variant) => void;
  filterCategory?: string; // This can be Parent (Cat Magic) or Sub (Cat Grain-Free)
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick, onQuickView, filterCategory }) => {
  // If specific filter passed from props, use it. Otherwise 'All'.
  // We keep internal state for local filtering only if "All" mode is active (Home page).
  const [internalFilter, setInternalFilter] = useState('All');

  // Determine what products to show
  const filteredProducts = useMemo(() => {
    if (filterCategory) {
        // Filter by Parent OR Sub Category
        return PRODUCTS.filter(p => p.category === filterCategory || p.parentCategory === filterCategory);
    }
    // Fallback for Home Page usage
    return PRODUCTS; 
  }, [filterCategory, internalFilter]);

  const title = filterCategory ? filterCategory : "The Collection";

  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">{title}</h2>
          
          {filterCategory && (
             <div className="w-24 h-1 bg-[#2C2A26]/10 rounded-full"></div>
          )}
        </div>

        {/* Large Grid */}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {filteredProducts.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={onProductClick}
                    onQuickView={onQuickView}
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-20 opacity-50">
                <p className="text-xl font-serif italic">Coming Soon...</p>
            </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
