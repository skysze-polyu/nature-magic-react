import React, { useState, useEffect } from 'react';
import { Product, LocalizedString, ContentItem } from '../types';
import { optimizeProductData } from '../services/geminiService';
import { Save, Sparkles, Plus, Trash, Info, Layers, Copy, Utensils, BookOpen, AlertCircle } from 'lucide-react';

// UUID Generator
const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

// --- SUB-COMPONENT: Editable Bilingual Field ---
interface BilingualFieldProps {
  label: string;
  value: LocalizedString;
  onChange: (lang: keyof LocalizedString, val: string) => void;
  activeLangTab: 'en' | 'zh_hant' | 'compare';
  rows?: number;
  isTC: boolean;
}

const BilingualField: React.FC<BilingualFieldProps> = ({ label, value, onChange, activeLangTab, rows = 1, isTC }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          {label}
        </label>
      </div>
      <div className={`grid ${activeLangTab === 'compare' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {(activeLangTab === 'compare' || activeLangTab === 'en') && (
          <div className="relative group">
             <span className="text-[9px] text-gray-400 absolute right-3 top-3 pointer-events-none z-10 font-bold uppercase tracking-widest group-hover:text-[#3A4D39] transition-colors">EN</span>
             {rows > 1 ? (
               <textarea className="w-full p-4 rounded-xl text-sm bg-white/50 focus:bg-white min-h-[120px] leading-relaxed resize-none" rows={rows} value={value?.en || ''} onChange={(e) => onChange('en', e.target.value)} />
             ) : (
               <input type="text" className="w-full p-4 rounded-xl text-sm bg-white/50 focus:bg-white" value={value?.en || ''} onChange={(e) => onChange('en', e.target.value)} />
             )}
          </div>
        )}
        {(activeLangTab === 'compare' || activeLangTab === 'zh_hant') && (
           <div className="relative group">
             <span className="text-[9px] text-gray-400 absolute right-3 top-3 pointer-events-none z-10 font-bold uppercase tracking-widest group-hover:text-[#3A4D39] transition-colors">TC</span>
             {rows > 1 ? (
               <textarea className="w-full p-4 rounded-xl text-sm bg-white/50 focus:bg-white min-h-[120px] leading-relaxed resize-none" rows={rows} value={value?.zh_hant || ''} onChange={(e) => onChange('zh_hant', e.target.value)} />
             ) : (
               <input type="text" className="w-full p-4 rounded-xl text-sm bg-white/50 focus:bg-white" value={value?.zh_hant || ''} onChange={(e) => onChange('zh_hant', e.target.value)} />
             )}
           </div>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Read-Only Display Field ---
const ReadOnlyBilingualDisplay = ({ label, value, isTC }: { label: string, value: LocalizedString, isTC: boolean }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/40 p-4 rounded-xl text-xs text-gray-700 h-full max-h-40 overflow-y-auto border border-white/30 shadow-inner">
                <span className="block text-[9px] text-gray-400 mb-2 font-bold uppercase tracking-widest">EN</span>
                {value.en || <span className="italic text-gray-400 opacity-50">Empty</span>}
            </div>
            <div className="bg-white/40 p-4 rounded-xl text-xs text-gray-700 h-full max-h-40 overflow-y-auto border border-white/30 shadow-inner">
                <span className="block text-[9px] text-gray-400 mb-2 font-bold uppercase tracking-widest">TC</span>
                {value.zh_hant || <span className="italic text-gray-400 opacity-50">未填寫</span>}
            </div>
        </div>
    </div>
);

// -------------------------------------------------------------------

interface ProductFormProps {
  initialData: Product; 
  allProducts: Product[]; 
  onSave: (products: Product[]) => void; 
  onCancel: () => void;
  displayLang: 'zh_hant' | 'en';
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, allProducts, onSave, onCancel, displayLang }) => {
  
  const [commonData, setCommonData] = useState<Product>(initialData);
  const [variants, setVariants] = useState<Product[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'zh_hant' | 'compare'>('compare');

  // CMS Data State
  const [cmsRecipes, setCmsRecipes] = useState<ContentItem[]>([]);
  const [cmsSeries, setCmsSeries] = useState<ContentItem[]>([]);
  const [cmsPets, setCmsPets] = useState<ContentItem[]>([]);

  // Load CMS Data
  useEffect(() => {
    const loadCMS = (key: string, setter: any) => {
        const saved = localStorage.getItem(key);
        if (saved) setter(JSON.parse(saved));
    };
    loadCMS('nm_cms_content_recipe', setCmsRecipes);
    loadCMS('nm_cms_content_series', setCmsSeries);
    loadCMS('nm_cms_content_pet', setCmsPets);
  }, []);

  // Initialization
  useEffect(() => {
    if (initialData.item_group_id) {
        const siblings = allProducts.filter(p => p.item_group_id === initialData.item_group_id);
        if (siblings.length > 0) {
            setCommonData({ ...siblings[0] });
            setVariants(siblings);
            return;
        }
    }
    setCommonData({ ...initialData });
    setVariants([initialData]);
  }, [initialData.id]); 

  // --- BUSINESS LOGIC ENGINE (Updated to use CMS Data) ---
  
  // Logic 1: Flavor (Recipe) -> Ingredients & Analysis
  useEffect(() => {
    const flavorTC = commonData.flavor.zh_hant;
    const flavorEn = commonData.flavor.en;
    
    // Find matching recipe in CMS data
    const recipeMatch = cmsRecipes.find(r => r.title.zh_hant === flavorTC || r.title.en === flavorEn);

    if (recipeMatch) {
        // Auto-fill Ingredients & Analysis if they exist in CMS
        if (recipeMatch.ingredients) {
            updateCommonField('ingredients', recipeMatch.ingredients);
        }
        if (recipeMatch.analysis) {
            updateCommonField('guaranteed_analysis', recipeMatch.analysis);
        }
        
        // Try to infer series/origin from recipe group if available (Legacy/Simplistic logic)
        if (recipeMatch.group) {
             const seriesMatch = cmsSeries.find(s => s.title.en.includes(recipeMatch.group!) || s.title.zh_hant.includes(recipeMatch.group!));
             if (seriesMatch) {
                 updateCommonField('series', seriesMatch.title);
             }
        }
    }
  }, [commonData.flavor.zh_hant, commonData.flavor.en, cmsRecipes]);

  // Logic 2: Animal -> Feeding Guide
  useEffect(() => {
    const animal = commonData.animal_type; // 'dog' or 'cat'
    // Find matching pet info in CMS
    const petMatch = cmsPets.find(p => p.key === `pet_${animal}`);

    if (petMatch) {
        if (petMatch.feeding_guide) updateCommonField('feeding_guide', petMatch.feeding_guide);
        if (petMatch.transition_guide) updateCommonField('transition_guide', petMatch.transition_guide);
    }

  }, [commonData.animal_type, cmsPets]);


  const updateCommonField = (field: keyof Product, value: any) => {
    setCommonData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocalizedChange = (field: keyof Product, lang: keyof LocalizedString, value: string) => {
    setCommonData(prev => ({
      ...prev,
      // @ts-ignore
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  const handleFlavorChange = (recipeId: string) => {
      if (!recipeId) return; 
      const selected = cmsRecipes.find(r => r.id === recipeId);
      if (selected) {
        setCommonData(prev => ({
            ...prev,
            flavor: selected.title
        }));
      }
  };

  const handleSeriesChange = (seriesId: string) => {
       if (!seriesId) return;
       const selected = cmsSeries.find(s => s.id === seriesId);
       if (selected) {
           setCommonData(prev => ({
              ...prev,
              series: selected.title
          }));
       }
  };

  // Variant Management
  const addVariant = () => {
    const newVariant: Product = {
        ...commonData, 
        id: uuidv4(),
        sku: '',
        gtin: '',
        size_weight: '',
        price: 0,
        price_original: 0,
        variant_title: { en: '', zh_hant: '' },
        is_bundle: false,
        multipack: 0,
        unit_measure: 1,
        unit_metric: 'kg',
        updatedAt: new Date().toISOString()
    };
    if (!newVariant.item_group_id && variants.length > 0) {
         const groupId = variants[0].item_group_id || `GRP_${uuidv4().substring(0,8).toUpperCase()}`;
         newVariant.item_group_id = groupId;
         setVariants(prev => prev.map(v => ({ ...v, item_group_id: groupId })));
         setCommonData(prev => ({ ...prev, item_group_id: groupId }));
    }
    setVariants(prev => [...prev, newVariant]);
  };

  const removeVariant = (id: string) => {
      if (variants.length === 1) {
          alert("At least one variant is required.");
          return;
      }
      setVariants(prev => prev.filter(v => v.id !== id));
  };

  const updateVariant = (id: string, field: keyof Product, value: any) => {
      setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const updateVariantLang = (id: string, field: 'variant_title', lang: keyof LocalizedString, value: string) => {
      setVariants(prev => prev.map(v => {
          if (v.id === id) {
              return { ...v, [field]: { ...v[field], [lang]: value } };
          }
          return v;
      }));
  };

  const handleFinalSave = () => {
      const finalProducts = variants.map(v => ({
          ...commonData, 
          id: v.id,
          sku: v.sku,
          gtin: v.gtin,
          size_weight: v.size_weight,
          price: v.price,
          price_original: v.price_original,
          variant_title: v.variant_title,
          is_bundle: v.is_bundle,
          multipack: v.multipack,
          unit_measure: v.unit_measure,
          unit_metric: v.unit_metric,
          item_group_id: variants.length > 1 ? (v.item_group_id || commonData.item_group_id || `GRP_${uuidv4().substring(0,8).toUpperCase()}`) : undefined,
          updatedAt: new Date().toISOString()
      }));

      onSave(finalProducts);
  };

  const addHighlight = () => {
    setCommonData(prev => ({
        ...prev,
        product_highlights: [...prev.product_highlights, { en: '', zh_hant: '' }]
    }));
  };
  const updateHighlight = (index: number, lang: keyof LocalizedString, value: string) => {
    const newHighlights = [...commonData.product_highlights];
    newHighlights[index] = { ...newHighlights[index], [lang]: value };
    setCommonData(prev => ({ ...prev, product_highlights: newHighlights }));
  };
  const removeHighlight = (index: number) => {
    const newHighlights = [...commonData.product_highlights];
    newHighlights.splice(index, 1);
    setCommonData(prev => ({ ...prev, product_highlights: newHighlights }));
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const optimized = await optimizeProductData(commonData);
      setCommonData(prev => ({ ...prev, ...optimized }));
    } catch (e) {
      alert("Optimization failed.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const isTC = displayLang === 'zh_hant';

  return (
    <div className="liquid-glass rounded-[32px] shadow-2xl mx-auto animate-fade-in flex flex-col h-[calc(100vh-140px)] border border-white/60">
      
      {/* HEADER */}
      <div className="flex justify-between items-center p-6 border-b border-white/40 bg-white/30 backdrop-blur-md rounded-t-[32px] z-20">
        <div>
           <h2 className="text-2xl text-[#1A1A18] flex items-center gap-3 tracking-wide">
             <Layers size={22} className="text-[#3A4D39]" />
             {isTC ? '產品編輯' : 'Product Editor'}
           </h2>
           <p className="text-xs text-gray-500 mt-1 font-bold tracking-widest uppercase">
               {isTC ? "主體資訊與變體管理" : "Manage Common Attributes and Variants"}
           </p>
        </div>
        
        <div className="flex gap-3">
           <div className="bg-white/50 p-1 rounded-full flex text-xs shadow-inner">
              <button onClick={() => setActiveLangTab('en')} className={`px-5 py-2 rounded-full transition-all ${activeLangTab === 'en' ? 'bg-[#1A1A18] text-white shadow-lg' : 'text-gray-500 hover:text-gray-800'} font-bold tracking-wider`}>EN</button>
              <button onClick={() => setActiveLangTab('compare')} className={`px-5 py-2 rounded-full transition-all ${activeLangTab === 'compare' ? 'bg-[#1A1A18] text-white shadow-lg' : 'text-gray-500 hover:text-gray-800'} font-bold tracking-wider`}>{isTC ? '對照' : 'Split'}</button>
              <button onClick={() => setActiveLangTab('zh_hant')} className={`px-5 py-2 rounded-full transition-all ${activeLangTab === 'zh_hant' ? 'bg-[#1A1A18] text-white shadow-lg' : 'text-gray-500 hover:text-gray-800'} font-bold tracking-wider`}>中文</button>
           </div>
           
           <button onClick={handleOptimize} disabled={isOptimizing} className="bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2">
             <Sparkles size={14} /> {isTC ? 'AI 優化' : 'Optimize'}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 no-scrollbar">
        <form onSubmit={(e) => { e.preventDefault(); handleFinalSave(); }}>
        
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* --- LEFT COLUMN --- */}
            <div className="md:col-span-4 space-y-6">
               
               <div className="liquid-glass p-6 rounded-2xl bg-white/40 border-white/50">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200/50 pb-2">
                      {isTC ? '核心分類' : 'Core Classification'}
                  </h3>
                  
                  <div className="space-y-6">
                      {/* BRAND (Fixed) */}
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Brand</label>
                          <input disabled type="text" className="w-full p-3 rounded-xl text-sm bg-gray-50 text-gray-500 border-none font-bold tracking-wide" value="NATURE MAGIC" />
                      </div>

                      {/* ANIMAL TYPE */}
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{isTC ? "寵物類別 (Animal)" : "Animal"}</label>
                          <select className="w-full p-3 rounded-xl text-sm bg-white/60 border-none shadow-sm cursor-pointer" value={commonData.animal_type} onChange={e => updateCommonField('animal_type', e.target.value)}>
                              <option value="dog">DOG</option>
                              <option value="cat">CAT</option>
                          </select>
                      </div>

                      {/* FLAVOR (Recipe) - Dynamic from CMS */}
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{isTC ? "口味配方 (Recipe)" : "Flavor / Recipe"}</label>
                          <select 
                             className="w-full p-3 rounded-xl text-sm bg-white/60 border-none shadow-sm cursor-pointer"
                             value={cmsRecipes.find(r => r.title.zh_hant === commonData.flavor.zh_hant)?.id || ''}
                             onChange={e => handleFlavorChange(e.target.value)}
                          >
                              <option value="">{isTC ? "-- 選擇配方 --" : "-- Select Recipe --"}</option>
                              {cmsRecipes.map((r) => (
                                  <option key={r.id} value={r.id}>{isTC ? r.title.zh_hant : r.title.en} {r.group ? `(${r.group})` : ''}</option>
                              ))}
                          </select>
                      </div>

                      {/* SERIES (Collection) - Dynamic from CMS */}
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{isTC ? "系列 (Collection)" : "Series / Collection"}</label>
                          <select 
                             className="w-full p-3 rounded-xl text-sm bg-white/60 border-none shadow-sm cursor-pointer"
                             value={cmsSeries.find(s => s.title.zh_hant === commonData.series.zh_hant)?.id || ''}
                             onChange={e => handleSeriesChange(e.target.value)}
                          >
                               <option value="">{isTC ? "-- 選擇系列 --" : "-- Select Series --"}</option>
                               {cmsSeries.map((s) => (
                                  <option key={s.id} value={s.id}>{isTC ? s.title.zh_hant : s.title.en}</option>
                              ))}
                          </select>
                      </div>
                  </div>
               </div>

               <div className="liquid-glass p-6 rounded-2xl bg-white/30 border-white/40">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200/50 pb-2">
                      {isTC ? '自動化屬性' : 'Auto Attributes'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isTC ? "食品類型" : "Food Type"}</label>
                          <input readOnly className="w-full p-2.5 rounded-lg text-xs bg-white/30 text-gray-600 border-none" value={commonData.food_type} />
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{isTC ? "產地" : "Origin"}</label>
                          <input readOnly className="w-full p-2.5 rounded-lg text-xs bg-white/30 text-gray-600 border-none" value={commonData.origin} />
                      </div>
                      <div className="col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Life Stage</label>
                          <input readOnly className="w-full p-2.5 rounded-lg text-xs bg-white/30 text-gray-600 border-none" value={commonData.life_stage} />
                      </div>
                  </div>
               </div>

            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="md:col-span-8 space-y-8">
               
               {/* 1. MASTER INFO */}
               <div className="liquid-glass p-8 rounded-[24px] bg-white/60">
                  <h3 className="text-lg font-medium text-[#1A1A18] mb-8 flex items-center gap-2">
                      <Info size={20} className="text-[#3A4D39]"/> 
                      {isTC ? '主體資訊' : 'Product Master Information'}
                  </h3>
                  
                  <BilingualField label={isTC ? "產品名稱 (Title)" : "Title"} value={commonData.title} onChange={(l, v) => handleLocalizedChange('title', l, v)} activeLangTab={activeLangTab} isTC={isTC} />
                  <BilingualField label={isTC ? "產品描述 (Description)" : "Description"} value={commonData.description} onChange={(l, v) => handleLocalizedChange('description', l, v)} activeLangTab={activeLangTab} isTC={isTC} rows={4} />

                  {/* Nutritional Info Section (Read-Only) */}
                  <div className="mt-10 pt-8 border-t border-gray-200/50">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-bold text-[#3A4D39] uppercase tracking-widest flex items-center gap-2">
                           <Utensils size={14}/> {isTC ? '營養與成分 (自動讀取)' : 'Nutritional Info (Auto)'}
                        </h3>
                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest bg-white/60 px-3 py-1 rounded-full flex items-center gap-1">
                            <AlertCircle size={10} /> Read-only
                        </div>
                      </div>
                      <div className="bg-[#E9F0EA]/50 p-6 rounded-2xl border border-[#C5D1C6]/30 space-y-2">
                         <ReadOnlyBilingualDisplay label={isTC ? "成分 (Ingredients)" : "Ingredients"} value={commonData.ingredients} isTC={isTC} />
                         <ReadOnlyBilingualDisplay label={isTC ? "營養分析 (Guaranteed Analysis)" : "Guaranteed Analysis"} value={commonData.guaranteed_analysis} isTC={isTC} />
                      </div>
                  </div>

                  {/* Feeding Guide Section (Read-Only) */}
                  <div className="mt-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-bold text-orange-800/80 uppercase tracking-widest flex items-center gap-2">
                           <BookOpen size={14}/> {isTC ? '飼養指南 (自動讀取)' : 'Feeding Guide (Auto)'}
                        </h3>
                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest bg-white/60 px-3 py-1 rounded-full flex items-center gap-1">
                            <AlertCircle size={10} /> Read-only
                        </div>
                      </div>
                      <div className="bg-orange-50/40 p-6 rounded-2xl border border-orange-100/50 space-y-2">
                         <ReadOnlyBilingualDisplay label={isTC ? "每日餵食建議 (Daily Feeding Guide)" : "Feeding Guide"} value={commonData.feeding_guide} isTC={isTC} />
                         <ReadOnlyBilingualDisplay label={isTC ? "換糧指南 (Transition Guide)" : "Transition Guide"} value={commonData.transition_guide} isTC={isTC} />
                      </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-10 pt-8 border-t border-gray-200/50">
                     <label className="block text-[10px] font-bold text-gray-500 mb-4 uppercase tracking-widest">{isTC ? "產品亮點 (Highlights)" : "Product Highlights"}</label>
                     <div className="space-y-3">
                         {commonData.product_highlights.map((h, idx) => (
                             <div key={idx} className="flex gap-3">
                                 <input placeholder="EN" className="flex-1 p-3 rounded-xl text-sm bg-white/60 border-none shadow-sm" value={h.en || ''} onChange={e => updateHighlight(idx, 'en', e.target.value)} />
                                 <input placeholder="中文" className="flex-1 p-3 rounded-xl text-sm bg-white/60 border-none shadow-sm" value={h.zh_hant || ''} onChange={e => updateHighlight(idx, 'zh_hant', e.target.value)} />
                                 <button type="button" onClick={() => removeHighlight(idx)} className="text-gray-400 hover:text-red-500 p-2"><Trash size={16}/></button>
                             </div>
                         ))}
                     </div>
                     <button type="button" onClick={addHighlight} className="mt-4 px-5 py-2 rounded-full border border-dashed border-gray-300 text-xs font-bold text-gray-500 hover:bg-white/50 hover:text-[#1A1A18] transition-colors flex items-center gap-2 uppercase tracking-wide">
                         <Plus size={14}/> {isTC ? "新增亮點" : "Add Highlight"}
                     </button>
                  </div>

                  {/* SEO Optional */}
                  <div className="mt-8">
                     <details className="group">
                        <summary className="cursor-pointer text-[10px] font-bold text-gray-400 hover:text-[#1A1A18] uppercase tracking-widest flex items-center gap-2 select-none transition-colors">
                           <Sparkles size={14} /> {isTC ? "展開 SEO 設定 (Merchant Center)" : "Expand SEO Settings"}
                        </summary>
                        <div className="mt-4 p-6 rounded-2xl bg-white/30 border border-white/40">
                           <BilingualField label={isTC ? "SEO 標題" : "SEO Title"} value={commonData.title_seo} onChange={(l, v) => handleLocalizedChange('title_seo', l, v)} activeLangTab={activeLangTab} isTC={isTC} />
                           <BilingualField label={isTC ? "SEO 描述" : "SEO Description"} value={commonData.description_seo} onChange={(l, v) => handleLocalizedChange('description_seo', l, v)} activeLangTab={activeLangTab} isTC={isTC} rows={2} />
                        </div>
                     </details>
                  </div>
               </div>

               {/* 2. VARIANT MANAGER */}
               <div className="liquid-glass rounded-[24px] overflow-hidden bg-white/40">
                  <div className="p-6 border-b border-white/40 flex justify-between items-center bg-white/30">
                     <h3 className="text-xs font-bold text-[#1A1A18] uppercase tracking-widest flex items-center gap-2">
                         <Copy size={16} /> {isTC ? '變體管理' : 'Variant Management'}
                     </h3>
                     <button type="button" onClick={addVariant} className="bg-[#1A1A18] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black flex items-center gap-1 shadow-md tracking-wider">
                        <Plus size={14} /> {isTC ? "新增變體" : "Add Variant"}
                     </button>
                  </div>
                  
                  <div className="overflow-x-auto p-2">
                     <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">
                           <tr>
                              <th className="p-4 w-8">#</th>
                              <th className="p-4 w-32">{isTC ? "變體標題" : "Variant Title"}</th>
                              <th className="p-4 w-20">{isTC ? "規格" : "Size"}</th>
                              <th className="p-4 w-28">{isTC ? "單位價格" : "Unit Measure"}</th>
                              <th className="p-4 w-16 text-center">{isTC ? "組合" : "Bundle"}</th>
                              <th className="p-4 w-16 text-center">Multi</th>
                              <th className="p-4 w-24">SKU</th>
                              <th className="p-4 w-24">GTIN</th>
                              <th className="p-4 w-24">{isTC ? "售價" : "Price"}</th>
                              <th className="p-4 w-10"></th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/40">
                           {variants.map((variant, index) => (
                              <tr key={variant.id} className="hover:bg-white/40 transition-colors">
                                 <td className="p-4 text-xs text-gray-400 font-mono">{index + 1}</td>
                                 <td className="p-4">
                                    <div className="space-y-2">
                                        <input placeholder="EN Title" className="w-full p-2 border-none bg-white/50 rounded-lg text-xs" value={variant.variant_title.en || ''} onChange={e => updateVariantLang(variant.id, 'variant_title', 'en', e.target.value)} />
                                        <input placeholder="中文標題" className="w-full p-2 border-none bg-white/50 rounded-lg text-xs" value={variant.variant_title.zh_hant || ''} onChange={e => updateVariantLang(variant.id, 'variant_title', 'zh_hant', e.target.value)} />
                                    </div>
                                 </td>
                                 <td className="p-4 align-top">
                                    <input required type="text" className="w-full p-2 border-none bg-white/50 rounded-lg text-xs text-center font-bold" 
                                       placeholder="2kg"
                                       value={variant.size_weight || ''}
                                       onChange={e => updateVariant(variant.id, 'size_weight', e.target.value)}
                                    />
                                 </td>
                                 <td className="p-4 align-top">
                                     <div className="flex gap-1">
                                        <input type="number" step="0.1" className="w-14 p-2 border-none bg-white/50 rounded-lg text-xs text-center" 
                                            value={variant.unit_measure || ''}
                                            onChange={e => updateVariant(variant.id, 'unit_measure', parseFloat(e.target.value))}
                                        />
                                        <select className="w-14 p-2 border-none bg-white/50 rounded-lg text-xs cursor-pointer"
                                            value={variant.unit_metric || 'kg'}
                                            onChange={e => updateVariant(variant.id, 'unit_metric', e.target.value)}
                                        >
                                            <option value="kg">kg</option>
                                            <option value="g">g</option>
                                            <option value="lb">lb</option>
                                            <option value="oz">oz</option>
                                        </select>
                                     </div>
                                 </td>
                                 <td className="p-4 text-center align-top pt-3">
                                    <input type="checkbox" className="w-4 h-4 text-[#1A1A18] rounded focus:ring-[#1A1A18] border-gray-400" 
                                       checked={variant.is_bundle}
                                       onChange={e => updateVariant(variant.id, 'is_bundle', e.target.checked)}
                                    />
                                 </td>
                                 <td className="p-4 align-top">
                                    <input type="number" min="0" className="w-full p-2 border-none bg-white/50 rounded-lg text-xs text-center" 
                                       value={variant.multipack || ''}
                                       placeholder="0"
                                       onChange={e => updateVariant(variant.id, 'multipack', parseInt(e.target.value) || 0)}
                                    />
                                 </td>
                                 <td className="p-4 align-top">
                                    <input required type="text" className="w-full p-2 border-none bg-white/50 rounded-lg text-xs font-sans" 
                                       value={variant.sku || ''}
                                       onChange={e => updateVariant(variant.id, 'sku', e.target.value)}
                                    />
                                 </td>
                                 <td className="p-4 align-top">
                                    <input required type="text" className="w-full p-2 border-none bg-white/50 rounded-lg text-xs font-sans" 
                                       value={variant.gtin || ''}
                                       onChange={e => updateVariant(variant.id, 'gtin', e.target.value)}
                                    />
                                 </td>
                                 <td className="p-4 align-top">
                                    <input required type="number" className="w-full p-2 border-none bg-[#3A4D39]/10 rounded-lg text-xs font-bold text-[#3A4D39] text-center" 
                                       value={variant.price || 0}
                                       onChange={e => updateVariant(variant.id, 'price', parseFloat(e.target.value) || 0)}
                                    />
                                 </td>
                                 <td className="p-4 text-center align-top pt-2">
                                    <button type="button" onClick={() => removeVariant(variant.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-white">
                                       <XIcon />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                     {variants.length === 0 && (
                        <div className="p-10 text-center text-gray-400 text-sm italic font-medium">No variants available.</div>
                     )}
                  </div>
               </div>

            </div>

          </div>

          <div className="sticky bottom-0 bg-[#F2F0E9]/95 backdrop-blur-lg p-6 border-t border-white/40 flex justify-end gap-4 z-30 -mx-8 -mb-8 mt-10">
            <button type="button" onClick={onCancel} className="px-8 py-3 rounded-full border border-gray-400 text-gray-600 hover:bg-white hover:text-black transition-colors font-bold text-xs tracking-wider uppercase">
               {isTC ? "取消" : "Cancel"}
            </button>
            <button type="submit" className="px-10 py-3 rounded-full bg-[#1A1A18] text-white hover:scale-105 active:scale-95 transition-all shadow-xl font-bold text-xs tracking-widest uppercase flex items-center gap-2">
               <Save size={16} /> {isTC ? `儲存 ${variants.length} 個變體` : `Save ${variants.length} Variants`}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default ProductForm;