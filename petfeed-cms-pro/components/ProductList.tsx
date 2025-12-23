import React, { useState } from 'react';
import { Product } from '../types';
import { Edit2, Trash2, Search, Package, ListChecks, Filter, Check } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  onBatchEdit: (selectedIds: string[]) => void;
  displayLang: 'zh_hant' | 'en';
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, onAddNew, onBatchEdit, displayLang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterAnimal, setFilterAnimal] = useState<'all' | 'dog' | 'cat'>('all');

  const isTC = displayLang === 'zh_hant';

  const filtered = products.filter(p => {
    const matchesSearch = 
        p.title.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.title.zh_hant.includes(searchTerm) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterAnimal === 'all' || p.animal_type === filterAnimal;

    return matchesSearch && matchesType;
  });

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length && filtered.length > 0) {
        setSelectedIds(new Set());
    } else {
        setSelectedIds(new Set(filtered.map(p => p.id)));
    }
  };

  const FilterTab = ({ id, label, icon }: { id: 'all' | 'dog' | 'cat', label: string, icon?: string }) => (
      <button 
        onClick={() => setFilterAnimal(id)}
        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border flex items-center gap-1.5
            ${filterAnimal === id 
                ? 'bg-[#1A1A18] text-white border-[#1A1A18] shadow-md' 
                : 'bg-white/40 text-gray-500 border-transparent hover:bg-white hover:text-[#1A1A18]'}`}
      >
          {icon && <span>{icon}</span>}
          {label}
      </button>
  );

  return (
    <div className="h-full flex flex-col bg-white/20 backdrop-blur-sm">
      {/* COMPACT TOOLBAR */}
      <div className="p-3 border-b border-white/40 flex justify-between items-center bg-white/30 backdrop-blur-md shrink-0 gap-4">
        
        {/* Left: Quick Filters */}
        <div className="flex items-center gap-2">
            <FilterTab id="all" label={isTC ? "全部" : "All"} />
            <FilterTab id="dog" label={isTC ? "犬用" : "Dog"} icon="🐕" />
            <FilterTab id="cat" label={isTC ? "貓用" : "Cat"} icon="🐈" />
            
            <div className="h-4 w-px bg-gray-300/50 mx-2"></div>

            {/* Selection Status */}
            {selectedIds.size > 0 && (
                <button 
                    onClick={() => onBatchEdit(Array.from(selectedIds))}
                    className="bg-[#3A4D39] text-white px-3 py-1.5 rounded-full text-[10px] font-bold hover:scale-105 transition-transform flex items-center gap-1.5 shadow-lg tracking-wider uppercase animate-fade-in"
                >
                    <ListChecks size={12} /> {isTC ? `批量修改 (${selectedIds.size})` : `Edit (${selectedIds.size})`}
                </button>
            )}
        </div>

        {/* Right: Search & Add */}
        <div className="flex items-center gap-2">
            <div className="relative group">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#1A1A18] transition-colors" size={12} />
                <input 
                    type="text" 
                    placeholder={isTC ? "搜尋 SKU / 名稱" : "Search..."}
                    className="pl-8 pr-3 py-1.5 rounded-full w-40 focus:w-56 transition-all text-[10px] bg-white/50 border-transparent focus:bg-white shadow-sm placeholder-gray-400 font-bold tracking-wide"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button 
                onClick={onAddNew}
                className="bg-[#1A1A18] text-white p-1.5 pr-3 pl-2 rounded-full text-[10px] font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1.5 tracking-wider shadow-md uppercase"
            >
                <div className="bg-white/20 rounded-full p-0.5"><Package size={10} /></div>
                {isTC ? "新增" : "Add"}
            </button>
        </div>
      </div>
      
      {/* Table Area */}
      <div className="overflow-auto flex-1 no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/40 sticky top-0 z-10 backdrop-blur-md border-b border-white/40 shadow-sm">
            <tr>
              <th className="px-3 py-2 w-8 text-center">
                  <input 
                    type="checkbox" 
                    checked={filtered.length > 0 && selectedIds.size === filtered.length}
                    onChange={toggleAll}
                    className="rounded text-[#1A1A18] focus:ring-[#1A1A18] border-gray-400 w-3 h-3 cursor-pointer"
                  />
              </th>
              <th className="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest w-24">SKU</th>
              <th className="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest w-1/3">
                {isTC ? "產品資料" : "Product Info"}
              </th>
              <th className="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest w-32">
                 {isTC ? "規格" : "Spec"}
              </th>
              <th className="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest w-24">{isTC ? "價格" : "Price"}</th>
              <th className="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest w-20">{isTC ? "狀態" : "Status"}</th>
              <th className="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-right">{isTC ? "操作" : "Action"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/40">
            {filtered.length === 0 ? (
               <tr><td colSpan={7} className="p-10 text-center text-gray-400 italic font-medium text-xs">{isTC ? "沒有找到符合的產品。" : "No matching products found."}</td></tr>
            ) : filtered.map(product => (
              <tr key={product.id} className={`hover:bg-white/60 transition-colors group ${selectedIds.has(product.id) ? 'bg-white/40' : ''}`}>
                <td className="px-3 py-2 text-center">
                    <input 
                        type="checkbox" 
                        checked={selectedIds.has(product.id)}
                        onChange={() => toggleSelection(product.id)}
                        className="rounded text-[#1A1A18] focus:ring-[#1A1A18] border-gray-400 w-3 h-3 cursor-pointer"
                    />
                </td>
                <td className="px-3 py-2 align-top">
                    <div className="font-bold text-[#1A1A18] font-mono text-[10px] bg-white/50 px-1.5 py-0.5 rounded border border-gray-200 inline-block">
                        {product.sku}
                    </div>
                    {product.item_group_id && (
                       <div className="text-[8px] text-gray-400 font-mono mt-1 pl-0.5 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-blue-300"></span>
                          Variant
                       </div>
                    )}
                </td>
                <td className="px-3 py-2 align-top">
                  <div className="font-bold text-[#1A1A18] text-xs leading-tight tracking-wide mb-0.5" title={isTC ? product.title.zh_hant : product.title.en}>
                    {isTC ? (product.title.zh_hant || product.title.en) : (product.title.en || product.title.zh_hant)}
                  </div>
                  <div className="text-[9px] text-gray-500 leading-tight truncate max-w-[200px] opacity-80 font-medium">
                    {isTC ? product.title.en : product.title.zh_hant}
                  </div>
                </td>
                <td className="px-3 py-2 align-top">
                    <div className="flex flex-col gap-1">
                        <div className="text-[9px] font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                            {product.origin}
                            <span className="text-gray-300">•</span>
                            {product.food_type}
                        </div>
                        {product.size_weight && (
                             <span className="text-[9px] text-gray-500 bg-gray-100/50 px-1.5 py-0.5 rounded w-fit">
                                 {product.size_weight}
                             </span>
                        )}
                    </div>
                </td>
                <td className="px-3 py-2 align-top">
                    {product.price_original && product.price_original > product.price ? (
                        <div className="flex flex-col">
                            <span className="text-[9px] text-gray-400 line-through font-sans">{product.currency} {product.price_original}</span>
                            <span className="text-red-700 font-bold text-xs font-sans">{product.currency} {product.price}</span>
                        </div>
                    ) : (
                        <span className="text-[#3A4D39] font-bold text-xs font-sans block mt-1">{product.currency} {product.price}</span>
                    )}
                </td>
                <td className="px-3 py-2 align-top">
                   <div className={`mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border 
                     ${product.availability === 'in_stock' ? 'bg-[#3A4D39]/10 text-[#3A4D39] border-[#3A4D39]/20' : 'bg-red-50 text-red-800 border-red-100'}`}>
                     {product.availability === 'in_stock' ? <Check size={8} strokeWidth={4} /> : null}
                     {product.availability === 'in_stock' ? (isTC ? '現貨' : 'Stock') : (isTC ? '缺貨' : 'Out')}
                   </div>
                </td>
                <td className="px-3 py-2 text-right align-top">
                  <div className="flex justify-end gap-1 mt-0.5">
                    <button onClick={() => onEdit(product)} className="text-gray-400 hover:text-[#1A1A18] p-1.5 rounded-full hover:bg-white transition-all">
                        <Edit2 size={12} />
                    </button>
                    <button onClick={() => onDelete(product.id)} className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-white transition-all">
                        <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-1.5 border-t border-white/40 bg-white/30 text-[8px] font-bold text-gray-400 text-center uppercase tracking-widest backdrop-blur-md shrink-0">
        Showing {filtered.length} products
      </div>
    </div>
  );
};

export default ProductList;
