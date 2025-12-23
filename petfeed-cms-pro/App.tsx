import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ExportPanel from './components/ExportPanel';
import BatchEditModal from './components/BatchEditModal';
import ImportModal from './components/ImportModal';
import Dashboard from './components/Dashboard';
import ContentCMS from './components/ContentCMS';
import { LogoWide } from './components/BrandAssets';
import { Product } from './types';
import { DEFAULT_PRODUCT } from './constants';
import { 
  Languages, LayoutDashboard, 
  Package, Layers, Utensils, Heart, Sparkles, Box, Grid,
  DownloadCloud, Home
} from 'lucide-react';

// Simple ID Generator
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

type ViewMode = 'dashboard' | 'brand' | 'pet' | 'series' | 'recipe' | 'products' | 'home';

const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ViewMode>('dashboard');
  
  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [productViewMode, setProductViewMode] = useState<'list' | 'form'>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [batchEditIds, setBatchEditIds] = useState<string[] | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  
  // Global Language State
  const [displayLang, setDisplayLang] = useState<'zh_hant' | 'en'>('zh_hant');
  const isTC = displayLang === 'zh_hant';

  // Load Products
  useEffect(() => {
    const saved = localStorage.getItem('petfeed_cms_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load products");
      }
    } else {
       const demoProduct: Product = { 
           ...DEFAULT_PRODUCT, 
           id: uuidv4(), 
           sku: 'DEMO-001', 
           title: {en: 'Premium Dog Food Chicken', zh_hant: '高級雞肉狗糧'},
           brand: 'NATURE MAGIC',
           price: 199 
       };
       setProducts([demoProduct]);
    }
  }, []);

  // Save Products
  useEffect(() => {
    localStorage.setItem('petfeed_cms_products', JSON.stringify(products));
  }, [products]);

  // --- Product Handlers ---
  const handleAddNew = () => {
    setEditingProduct({ ...DEFAULT_PRODUCT, id: uuidv4() });
    setProductViewMode('form');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductViewMode('form');
  };

  const handleDelete = (id: string) => {
    if (window.confirm(isTC ? "確定要刪除此產品嗎？" : "Are you sure?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProducts = (incomingProducts: Product[]) => {
    setProducts(prev => {
        const incomingIds = new Set(incomingProducts.map(p => p.id));
        const filtered = prev.filter(p => !incomingIds.has(p.id));
        return [...filtered, ...incomingProducts];
    });
    setProductViewMode('list');
    setEditingProduct(null);
  };

  const handleApplyBatchEdit = (updates: Partial<Product>) => {
      if (!batchEditIds) return;
      setProducts(prev => prev.map(p => {
          if (batchEditIds.includes(p.id)) {
              const newProps: any = {};
              (Object.keys(updates) as Array<keyof Product>).forEach(key => {
                  const val = updates[key];
                  if (val !== undefined && val !== '') newProps[key] = val;
              });
              return { ...p, ...newProps, updatedAt: new Date().toISOString() };
          }
          return p;
      }));
      setBatchEditIds(null);
  };

  const handleImport = (importedProducts: Product[]) => {
      handleSaveProducts(importedProducts);
      // Wait a moment then close modal for better UX
      setTimeout(() => setShowImportModal(false), 1500);
  };

  // --- Sidebar Component ---
  const NavItem = ({ id, label, icon: Icon }: any) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all rounded-xl mb-1 group font-medium tracking-wide
            ${activeTab === id 
                ? 'bg-[#1A1A18] text-[#F2F0E9] shadow-lg scale-[1.02]' 
                : 'text-gray-600 hover:bg-white/40 hover:text-[#1A1A18] hover:scale-[1.01]'}`}
      >
        <Icon size={16} strokeWidth={1.5} className={activeTab === id ? 'text-[#A3B18A]' : 'text-gray-400 group-hover:text-gray-600'} />
        <span>{label}</span>
      </button>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-transparent font-tenor">
      
      {/* SIDEBAR */}
      <aside className="w-64 liquid-sidebar flex flex-col z-30 shadow-2xl shrink-0">
         <div className="p-6 pb-4 flex flex-col items-start gap-4">
            <div className="w-full max-w-[160px] opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
               <LogoWide />
            </div>
         </div>

         <nav className="flex-1 px-4 overflow-y-auto space-y-0.5 no-scrollbar">
             <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-4 py-2 mt-2 opacity-70">Overview</div>
             <NavItem id="dashboard" label={isTC ? "業務中台" : "Dashboard"} icon={LayoutDashboard} />
             
             <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-4 py-2 mt-4 opacity-70">Brand Content</div>
             <NavItem id="home" label={isTC ? "首頁內容" : "Home Content"} icon={Home} />
             <NavItem id="brand" label={isTC ? "品牌故事" : "Brand Info"} icon={Sparkles} />
             <NavItem id="pet" label={isTC ? "寵物資訊" : "Pet Info"} icon={Heart} />
             <NavItem id="series" label={isTC ? "系列資訊" : "Series Info"} icon={Grid} />
             <NavItem id="recipe" label={isTC ? "配方資訊" : "Recipe Info"} icon={Utensils} />
             
             <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-4 py-2 mt-4 opacity-70">Commerce</div>
             <NavItem id="products" label={isTC ? "產品數據" : "Products"} icon={Package} />
         </nav>

         <div className="p-4 mt-auto">
             <button 
                onClick={() => setDisplayLang(prev => prev === 'zh_hant' ? 'en' : 'zh_hant')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-white/50 bg-white/30 hover:bg-white text-xs font-bold text-gray-700 transition-all shadow-sm hover:shadow-md tracking-wider group"
             >
                <Languages size={14} className="group-hover:scale-110 transition-transform"/>
                {displayLang === 'zh_hant' ? 'EN / 中文' : 'EN / 中文'}
             </button>
         </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* COMPACT HEADER */}
        <header className="h-16 flex items-center justify-between px-6 shrink-0 bg-white/10 backdrop-blur-sm border-b border-white/20 z-20">
             <div className="flex items-center gap-4">
                 <h2 className="text-xl font-medium text-[#1A1A18] tracking-tight">
                    {activeTab === 'dashboard' && (isTC ? 'Business Hub' : 'Business Hub')}
                    {activeTab === 'home' && (isTC ? 'Home Page Content' : 'Home Page Content')}
                    {activeTab === 'brand' && (isTC ? 'Brand Stories' : 'Brand Stories')}
                    {activeTab === 'pet' && (isTC ? 'Pet Categories' : 'Pet Categories')}
                    {activeTab === 'series' && (isTC ? 'Series Management' : 'Series Management')}
                    {activeTab === 'recipe' && (isTC ? 'Recipe Content' : 'Recipe Content')}
                    {activeTab === 'products' && (isTC ? 'Product Database' : 'Product Database')}
                 </h2>
                 <div className="h-4 w-px bg-gray-300"></div>
                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    {activeTab === 'dashboard' ? 'Overview' : 'CMS'}
                 </span>
             </div>
             
             <div className="flex items-center gap-3">
                 {/* INTEGRATED EXPORT TOOLBAR */}
                 {activeTab === 'products' && productViewMode === 'list' && (
                     <>
                        <ExportPanel products={products} displayLang={displayLang} />
                        <div className="h-6 w-px bg-gray-300/50 mx-1"></div>
                        <button 
                            onClick={() => setShowImportModal(true)}
                            className="bg-white/50 hover:bg-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-[#3A4D39] border border-[#3A4D39]/20 transition-all shadow-sm uppercase tracking-wider active:scale-95"
                        >
                            <DownloadCloud size={12} /> {isTC ? "導入" : "Import"}
                        </button>
                     </>
                 )}
             </div>
        </header>

        <div className="flex-1 overflow-hidden p-4 md:px-6 md:pb-6 flex flex-col">
            {activeTab === 'dashboard' && (
                 <div className="overflow-auto h-full no-scrollbar">
                    <Dashboard isTC={isTC} />
                 </div>
            )}
            
            {(activeTab === 'brand' || activeTab === 'pet' || activeTab === 'series' || activeTab === 'recipe' || activeTab === 'home') && (
                <ContentCMS type={activeTab} isTC={isTC} />
            )}

            {activeTab === 'products' && (
                <>
                    {productViewMode === 'list' && (
                      <div className="flex-1 flex flex-col liquid-glass rounded-2xl overflow-hidden border border-white/60 shadow-xl animate-fade-in">
                           <ProductList 
                              products={products} 
                              onEdit={handleEdit} 
                              onDelete={handleDelete}
                              onAddNew={handleAddNew}
                              onBatchEdit={setBatchEditIds}
                              displayLang={displayLang}
                           />
                      </div>
                    )}
                    {productViewMode === 'form' && editingProduct && (
                      <ProductForm 
                        initialData={editingProduct} 
                        allProducts={products}
                        onSave={handleSaveProducts} 
                        onCancel={() => setProductViewMode('list')}
                        displayLang={displayLang}
                      />
                    )}
                </>
            )}
        </div>
      </main>

      {/* Batch Edit Modal */}
      {batchEditIds && (
        <BatchEditModal 
            selectedCount={batchEditIds.length}
            onClose={() => setBatchEditIds(null)}
            onApply={handleApplyBatchEdit}
            isTC={isTC}
        />
      )}

      {/* Import Modal */}
      {showImportModal && (
          <ImportModal 
             onClose={() => setShowImportModal(false)}
             onImport={handleImport}
             isTC={isTC}
          />
      )}
    </div>
  );
};

export default App;