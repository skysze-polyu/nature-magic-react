import React, { useState } from 'react';
import { Product, Currency, Availability, Condition } from '../types';
import { X, DownloadCloud, Loader2, Link as LinkIcon, AlertCircle, CheckCircle, FileJson, RefreshCw } from 'lucide-react';

// Simple UUID Generator
const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

interface ImportModalProps {
    onClose: () => void;
    onImport: (products: Product[]) => void;
    isTC: boolean;
}

const ImportModal: React.FC<ImportModalProps> = ({ onClose, onImport, isTC }) => {
    const [urls, setUrls] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    // Helper to extract JSON-LD Product object from HTML string
    const extractProductFromJsonLd = (html: string) => {
        try {
            const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
            let match;
            while ((match = regex.exec(html)) !== null) {
                try {
                    const content = JSON.parse(match[1]);
                    const graph = content['@graph'] || (Array.isArray(content) ? content : [content]);
                    const product = graph.find((item: any) => item['@type'] === 'Product');
                    if (product) return product;
                } catch (e) { }
            }
        } catch (e) { console.error("HTML Parsing Error", e); }
        return null;
    };

    // ROBUST FETCHING STRATEGY
    const fetchHtmlWithFallback = async (targetUrl: string): Promise<string> => {
        // List of proxies to try in order
        const strategies = [
            // Strategy 1: CORSproxy.io (Direct, usually fast)
            async (url: string) => {
                const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
                if (!res.ok) throw new Error(`Status ${res.status}`);
                return await res.text();
            },
            // Strategy 2: AllOrigins (JSON wrapper)
            async (url: string) => {
                const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
                if (!res.ok) throw new Error(`Status ${res.status}`);
                const data = await res.json();
                return data.contents;
            },
            // Strategy 3: ThingProxy
            async (url: string) => {
                 const res = await fetch(`https://thingproxy.freeboard.io/fetch/${url}`);
                 if (!res.ok) throw new Error(`Status ${res.status}`);
                 return await res.text();
            }
        ];

        let lastError;
        for (const strategy of strategies) {
            try {
                const html = await strategy(targetUrl);
                if (html && html.length > 500) { // Basic validation
                    return html;
                }
            } catch (e) {
                lastError = e;
                continue; // Try next strategy
            }
        }
        throw lastError || new Error("All proxies failed");
    };

    const processImport = async () => {
        setIsLoading(true);
        setLogs([]);
        setProgress(0);

        const urlList = urls.split(/[\n\s,]+/).filter(u => u.trim().length > 0);
        if (urlList.length === 0) {
            addLog(isTC ? "❌ 請輸入網址" : "❌ No URLs provided");
            setIsLoading(false);
            return;
        }

        // 1. Group URLs by Handle
        const handleMap: Record<string, { en?: string, tc?: string }> = {};
        
        urlList.forEach(url => {
            try {
                // Strict Regex to find handle after /products/
                const match = url.match(/\/products\/([^\/\?#]+)/);
                const handle = match ? match[1] : null;

                if (!handle) {
                    console.warn("Could not extract handle from", url);
                    return; 
                }
                
                if (!handleMap[handle]) handleMap[handle] = {};
                
                if (url.includes('/zh/') || url.includes('/zh-hant/')) {
                    handleMap[handle].tc = url;
                } else {
                    handleMap[handle].en = url;
                }
            } catch (e) {
                console.warn("Invalid URL", url);
            }
        });

        const handles = Object.keys(handleMap);
        const total = handles.length;
        const newProducts: Product[] = [];

        addLog(isTC ? `🔍 發現 ${total} 個獨特產品，準備排隊抓取...` : `🔍 Found ${total} unique products, queuing fetch...`);

        // 2. Fetch Data
        for (let i = 0; i < total; i++) {
            const handle = handles[i];
            const { en, tc } = handleMap[handle];
            setProgress(((i + 1) / total) * 100);

            try {
                let productEn: any = null;
                let productTc: any = null;

                // Random delay to avoid rate limiting (500ms - 1500ms)
                const delay = Math.floor(Math.random() * 1000) + 500;
                await new Promise(r => setTimeout(r, delay));

                if (en) {
                    try {
                        addLog(`⏳ Fetching EN: ${handle}...`);
                        const html = await fetchHtmlWithFallback(en);
                        productEn = extractProductFromJsonLd(html);
                        if (productEn) addLog(`📄 OK: EN Data`);
                    } catch (e) { 
                        addLog(`⚠️ Fail EN: ${handle}`); 
                    }
                }

                if (tc) {
                    try {
                        addLog(`⏳ Fetching TC: ${handle}...`);
                        const html = await fetchHtmlWithFallback(tc);
                        productTc = extractProductFromJsonLd(html);
                        if (productTc) addLog(`📄 OK: TC Data`);
                    } catch (e) { 
                        addLog(`⚠️ Fail TC: ${handle}`); 
                    }
                }

                if (!productEn && !productTc) {
                    addLog(`❌ Skipped ${handle}: Unable to fetch or parse`);
                    continue;
                }

                // 3. Map to Schema
                const base = productEn || productTc;
                const baseTc = productTc || productEn;

                const groupId = `GRP_${handle.replace(/-/g, '_').toUpperCase()}`;
                
                let offers = [];
                if (base.offers) {
                    if (base.offers['@type'] === 'AggregateOffer' && Array.isArray(base.offers.offers)) {
                        offers = base.offers.offers;
                    } else if (Array.isArray(base.offers)) {
                        offers = base.offers;
                    } else if (base.offers['@type'] === 'Offer') {
                        offers = [base.offers];
                    }
                }

                if (offers.length === 0) {
                     offers = [{
                        sku: base.sku,
                        price: base.offers?.price,
                        priceCurrency: base.offers?.priceCurrency,
                        name: base.name
                     }];
                }

                let offersTc: any[] = [];
                if (baseTc.offers) {
                    if (baseTc.offers['@type'] === 'AggregateOffer' && Array.isArray(baseTc.offers.offers)) {
                        offersTc = baseTc.offers.offers;
                    } else if (Array.isArray(baseTc.offers)) {
                        offersTc = baseTc.offers;
                    } else if (baseTc.offers['@type'] === 'Offer') {
                        offersTc = [baseTc.offers];
                    }
                }

                offers.forEach((offer: any, idx: number) => {
                    const offerTc = offersTc.find(o => o.sku === offer.sku) || offersTc[idx];

                    let imageLink = '';
                    if (Array.isArray(base.image)) imageLink = base.image[0]?.url || base.image[0];
                    else if (typeof base.image === 'object') imageLink = base.image.url;
                    else if (typeof base.image === 'string') imageLink = base.image;

                    const highlights: any[] = [];
                    if (base.additionalProperty) {
                        base.additionalProperty.forEach((prop: any) => {
                            if (prop.value) highlights.push({ en: prop.value, zh_hant: '' });
                        });
                    }
                    if (baseTc.additionalProperty) {
                         baseTc.additionalProperty.forEach((prop: any, hIdx: number) => {
                             if (highlights[hIdx]) highlights[hIdx].zh_hant = prop.value;
                             else highlights.push({ en: '', zh_hant: prop.value });
                         });
                    }

                    const variantNameEn = offer.name || '';
                    const variantNameTc = offerTc?.name || '';
                    
                    let vTitleEn = variantNameEn.replace(base.name, '').replace(/^[\s-–]+/, '').trim();
                    let vTitleTc = variantNameTc.replace(baseTc.name, '').replace(/^[\s-–]+/, '').trim();
                    
                    let size = vTitleEn; 
                    if (!size) {
                        const sizeMatch = variantNameEn.match(/(\d+\s?(kg|g|lb|oz|ml|l))/i);
                        if (sizeMatch) size = sizeMatch[0];
                    }

                    const p: Product = {
                        id: uuidv4(),
                        sku: offer.sku || `${handle}-${idx}`,
                        item_group_id: groupId,
                        gtin: offer.gtin13 || offer.gtin || '',
                        mpn: offer.mpn || offer.sku || '',
                        brand: base.brand?.name || 'NATURE MAGIC',
                        
                        title: {
                            en: base.name,
                            zh_hant: baseTc.name
                        },
                        description: {
                            en: base.description,
                            zh_hant: baseTc.description
                        },
                        
                        variant_title: {
                            en: vTitleEn,
                            zh_hant: vTitleTc
                        },
                        
                        is_bundle: false,
                        multipack: 0,
                        unit_measure: 0,
                        unit_metric: 'kg',
                        
                        series: { en: '', zh_hant: '' },
                        ingredients: { en: '', zh_hant: '' },
                        guaranteed_analysis: { en: '', zh_hant: '' },
                        feeding_guide: { en: '', zh_hant: '' },
                        transition_guide: { en: '', zh_hant: '' },
                        title_seo: { en: base.name, zh_hant: baseTc.name },
                        description_seo: { en: base.description?.substring(0, 160), zh_hant: baseTc.description?.substring(0, 160) },
                        product_highlights: highlights,
                        
                        link: en || tc || '',
                        image_link: imageLink,
                        
                        price: parseFloat(offer.price) || 0,
                        price_original: 0,
                        currency: (offer.priceCurrency as Currency) || Currency.HKD,
                        availability: offer.availability?.includes('InStock') ? Availability.IN_STOCK : Availability.OUT_OF_STOCK,
                        condition: Condition.NEW,
                        
                        google_product_category: 'Animals & Pet Supplies > Pet Supplies > Pet Food',
                        product_type: 'Pet Food',
                        
                        life_stage: 'all ages',
                        animal_type: base.name.toLowerCase().includes('dog') ? 'dog' : 'cat',
                        food_type: base.name.toLowerCase().includes('wet') ? 'wet' : 'dry',
                        origin: 'New Zealand',
                        flavor: { en: '', zh_hant: '' },
                        size_weight: size || '1 Unit',
                        
                        store_codes: ['HK_MAIN_01'],
                        pickup_method: 'buy',
                        pickup_sla: 'same_day',
                        updatedAt: new Date().toISOString()
                    };
                    newProducts.push(p);
                });
                
                addLog(`✅ Saved ${handle}: ${offers.length} variants`);

            } catch (err) {
                console.error(err);
                addLog(`❌ Fatal Error ${handle}: ${(err as Error).message}`);
            }
        }

        setIsLoading(false);
        if (newProducts.length > 0) {
            onImport(newProducts);
            addLog(isTC ? `🎉 完成！成功導入 ${newProducts.length} 個項目。` : `🎉 Done! Imported ${newProducts.length} items.`);
        } else {
             addLog(isTC ? `⚠️ 導入失敗。請檢查日誌。` : `⚠️ No products imported. Check logs.`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[#F2F0E9] rounded-3xl shadow-2xl w-full max-w-4xl mx-4 flex flex-col max-h-[90vh] overflow-hidden border border-white/60">
                {/* Header */}
                <div className="p-6 border-b border-gray-300/50 bg-white/40 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-[#1A1A18] flex items-center gap-2">
                            <FileJson className="text-[#3A4D39]" /> 
                            {isTC ? "JSON-LD 智能導入 (Pro)" : "Smart JSON-LD Import (Pro)"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {isTC ? "支援多重代理切換，可繞過部分防火牆限制。" : "Supports multi-proxy fallback to bypass firewall blocks."}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 transition-colors">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Input */}
                    <div className="w-1/2 p-6 flex flex-col border-r border-gray-300/50">
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <LinkIcon size={14} /> {isTC ? "貼上網址列表" : "Paste URLs"}
                         </label>
                         <textarea 
                            className="flex-1 w-full p-4 rounded-xl bg-white/60 border border-gray-200 text-xs font-mono leading-relaxed resize-none focus:bg-white focus:ring-2 focus:ring-[#3A4D39]/20 transition-all"
                            placeholder={"https://naturemagic.com.hk/products/product-a..."}
                            value={urls}
                            onChange={e => setUrls(e.target.value)}
                            disabled={isLoading}
                         />
                         
                         <div className="mt-4 flex items-center justify-between">
                             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                 {urls.split('\n').filter(u => u.trim()).length} URLs
                             </div>
                             <button 
                                onClick={processImport}
                                disabled={isLoading || !urls.trim()}
                                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all
                                    ${isLoading || !urls.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#1A1A18] text-white hover:scale-105 active:scale-95'}
                                `}
                             >
                                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                                {isTC ? "開始抓取" : "Start Fetch"}
                             </button>
                         </div>
                    </div>

                    {/* Right: Logs */}
                    <div className="w-1/2 p-6 bg-black/5 flex flex-col">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <AlertCircle size={14} /> {isTC ? "處理日誌" : "Process Log"}
                        </label>
                        <div className="flex-1 bg-black/80 rounded-xl p-4 overflow-y-auto font-mono text-[10px] text-green-400 leading-5 shadow-inner">
                            {logs.length === 0 && <span className="text-gray-600 italic opacity-50">Waiting...</span>}
                            {logs.map((log, i) => (
                                <div key={i} className="border-b border-white/10 pb-1 mb-1 last:border-0 break-all">{log}</div>
                            ))}
                        </div>
                        
                        {/* Progress Bar */}
                        {isLoading && (
                            <div className="mt-4">
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1 uppercase">
                                    <span>Processing...</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-[#3A4D39] transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                        
                        {!isLoading && progress === 100 && (
                             <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 text-xs font-bold">
                                 <CheckCircle size={16} /> 
                                 {isTC ? "完成！" : "Done!"}
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
