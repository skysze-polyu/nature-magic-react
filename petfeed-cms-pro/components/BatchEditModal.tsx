import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { ORIGINS, FOOD_TYPES } from '../constants';
import { X, Save } from 'lucide-react';

interface BatchEditModalProps {
  selectedCount: number;
  onClose: () => void;
  onApply: (updates: Partial<Product>) => void;
  isTC: boolean;
}

const BatchEditModal: React.FC<BatchEditModalProps> = ({ selectedCount, onClose, onApply, isTC }) => {
  const [updates, setUpdates] = useState<Partial<Product>>({});

  const handleChange = (field: keyof Product, value: any) => {
    setUpdates(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg text-gray-800">
             {isTC ? `批量修改 (${selectedCount} 個產品)` : `Batch Edit (${selectedCount} items)`}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={20}/></button>
        </div>

        <div className="p-6 space-y-4">
           <p className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded mb-4">
             {isTC ? "注意：未填寫的欄位將保持原樣。" : "Note: Fields left blank will remain unchanged."}
           </p>

           {/* Brand */}
           <div>
              <label className="block text-xs font-medium text-gray-700">{isTC ? "品牌 (Brand)" : "Brand"}</label>
              <input 
                type="text" 
                className="w-full mt-1 p-2 border rounded text-sm" 
                placeholder={isTC ? "輸入新品牌名稱..." : "Enter new brand..."}
                onChange={e => handleChange('brand', e.target.value)}
              />
           </div>

           {/* Origin & Food Type */}
           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">{isTC ? "產地 (Origin)" : "Origin"}</label>
                <select 
                    className="w-full mt-1 p-2 border rounded text-sm"
                    onChange={e => handleChange('origin', e.target.value)}
                >
                    <option value="">{isTC ? "-- 不變更 --" : "-- No Change --"}</option>
                    {ORIGINS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">{isTC ? "食品類型 (Type)" : "Food Type"}</label>
                <select 
                    className="w-full mt-1 p-2 border rounded text-sm"
                    onChange={e => handleChange('food_type', e.target.value)}
                >
                    <option value="">{isTC ? "-- 不變更 --" : "-- No Change --"}</option>
                    {FOOD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
           </div>

           {/* Pricing Update */}
           <div className="border-t pt-4">
             <h4 className="text-sm font-semibold mb-2">{isTC ? "統一價格設定" : "Price Overrides"}</h4>
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-medium text-gray-700">{isTC ? "新售價 (New Sale Price)" : "New Sale Price"}</label>
                  <input 
                    type="number" 
                    className="w-full mt-1 p-2 border rounded text-sm" 
                    placeholder="0.00"
                    onChange={e => handleChange('price', parseFloat(e.target.value))}
                  />
               </div>
               <div>
                  <label className="block text-xs font-medium text-gray-700">{isTC ? "貨幣 (Currency)" : "Currency"}</label>
                   <select 
                    className="w-full mt-1 p-2 border rounded text-sm"
                    onChange={e => handleChange('currency', e.target.value)}
                  >
                    <option value="">{isTC ? "-- 不變更 --" : "-- No Change --"}</option>
                    <option value={Currency.HKD}>HKD</option>
                    <option value={Currency.MOP}>MOP</option>
                  </select>
               </div>
             </div>
           </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-lg">
           <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
             {isTC ? "取消" : "Cancel"}
           </button>
           <button 
             onClick={() => onApply(updates)} 
             className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-2"
           >
             <Save size={16} /> {isTC ? "應用修改" : "Apply Changes"}
           </button>
        </div>
      </div>
    </div>
  );
};

export default BatchEditModal;