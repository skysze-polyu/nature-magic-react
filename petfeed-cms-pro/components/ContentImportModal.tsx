import React, { useState } from 'react';
import { ContentItem } from '../types';
import { X, Loader2, Link as LinkIcon, AlertCircle, CheckCircle, FileText, RefreshCw } from 'lucide-react';

// Simple UUID Generator
const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

interface ContentImportModalProps {
    onClose: () => void;
    onImport: (items: ContentItem[]) => void;
    category: 'brand' | 'pet' | 'series' | 'recipe' | 'home';
    isTC: boolean;
}

const ContentImportModal: React.FC<ContentImportModalProps> = ({ onClose, onImport, category, isTC }) => {
    const [urls, setUrls] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    // ROBUST FETCHING STRATEGY
    const fetchHtmlWithFallback = async (targetUrl: string): Promise<string> => {
        const strategies = [
            async (url: string) => {
                const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
                if (!res.ok) throw new Error(`Status ${res.status}`);
                return await res.text();
            },
            async (url: string) => {
                const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
                if (!res.ok) throw new Error(`Status ${res.status}`);
                const data = await res.json();
                return data.contents;
            }
        ];

        let lastError;
        for (const strategy of strategies) {
            try {
                const html = await strategy(targetUrl);
                if (html && html.length > 500) return html;
            } catch (e) {
                lastError = e;
                continue;
            }
        }
        throw lastError || new Error("All proxies failed");
    };

    // Helper to clean HTML text
    const cleanHtmlText = (htmlContent: string) => {
        let text = htmlContent;
        // 1. Replace <br> with newlines
        text = text.replace(/<br\s*\/?>/gi, '\n');
        // 2. Replace </p> with double newlines (paragraphs)
        text = text.replace(/<\/p>/gi, '\n\n');
        // 3. Remove scripts and styles
        text = text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, "");
        text = text.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gm, "");
        
        // 4. Create temp element to strip remaining tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        
        // 5. Get text content and clean excessive whitespace
        let clean = tempDiv.textContent || tempDiv.innerText || '';
        return clean.replace(/\n\s+\n/g, '\n\n').trim();
    };

    // Parser Logic
    const parseContent = (html: string, url: string): Partial<ContentItem> => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 1. Extract Meta Data
        const title = doc.querySelector('title')?.innerText || 
                      doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
        
        const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                            doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';

        const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || 
                      doc.querySelector('meta[property="og:image:secure_url"]')?.getAttribute('content') || '';

        // 2. Extract Handle/Key from URL
        const cleanUrl = url.replace(/\/$/, '').split('?')[0]; 
        const handle = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);

        // 3. Extract Body Content (Targeting Sectioned Structures)
        let bodyText = '';
        
        // Strategy A: Aggregate Specific Rich Text / Home Sections / Collection Descriptions
        // Extended for Home & Collection pages
        const specificFields = doc.querySelectorAll(`
            .metafield-rich_text_field, 
            .product__description, 
            .rst-content,
            .collection-hero__description,
            .collection-description,
            .rte,
            .index-section .feature-row__text,
            .index-section .rich-text__text,
            .text-column__text,
            .custom-content
        `);
        
        if (specificFields.length > 0) {
            const aggregatedText: string[] = [];
            specificFields.forEach(field => {
                const text = cleanHtmlText(field.innerHTML);
                // Filter out very short/empty strings that might be empty divs
                if (text && text.length > 5) aggregatedText.push(text);
            });
            bodyText = aggregatedText.join('\n\n---\n\n');
        }

        // Strategy B: Accordion Content (Fallback for Ingredient Details)
        if (!bodyText) {
             const accordions = doc.querySelectorAll('.accordion__content, .summary__content, .ingredient-details');
             if (accordions.length > 0) {
                 const aggregatedText: string[] = [];
                 accordions.forEach(acc => {
                     const text = cleanHtmlText(acc.innerHTML);
                     if (text) aggregatedText.push(text);
                 });
                 bodyText = aggregatedText.join('\n\n');
             }
        }

        // Strategy C: Generic Content Containers (Fallback)
        if (!bodyText) {
            const contentSelectors = ['.rte', 'article', '.article-content', '.page-content', 'main'];
            for (const selector of contentSelectors) {
                const el = doc.querySelector(selector);
                if (el) {
                    bodyText = cleanHtmlText(el.innerHTML).substring(0, 800);
                    if (bodyText) break;
                }
            }
        }

        // Fallback to meta description if body is still empty
        if (!bodyText) bodyText = description;

        // 4. Detect Language
        const isChineseUrl = url.includes('/zh/') || url.includes('/zh-hant/') || url.includes('/tc/');

        const result: any = {
            id: uuidv4(),
            key: handle || `import_${Date.now()}`,
            category: category,
            images: image ? [image] : [],
            title: { en: '', zh_hant: '' },
            description: { en: '', zh_hant: '' }
        };

        if (isChineseUrl) {
            result.title.zh_hant = title;
            result.description.zh_hant = bodyText;
        } else {
            result.title.en = title;
            result.description.en = bodyText;
        }

        return result;
    };

    const processImport = async () => {
        setIsLoading(true);
        setLogs([]);
        setProgress(0);

        const urlList = urls.split(/[\n\s,]+/).filter(u => u.trim().length > 0);
        if (urlList.length === 0) {
            addLog("❌ No URLs provided");
            setIsLoading(false);
            return;
        }

        const newItems: ContentItem[] = [];

        for (let i = 0; i < urlList.length; i++) {
            const url = urlList[i];
            setProgress(((i + 1) / urlList.length) * 100);
            
            try {
                addLog(`⏳ Fetching: ${url}...`);
                const html = await fetchHtmlWithFallback(url);
                const itemData = parseContent(html, url);
                
                // @ts-ignore
                newItems.push(itemData);
                addLog(`✅ Parsed: ${itemData.key}`);

            } catch (e) {
                addLog(`⚠️ Failed: ${url} - ${(e as Error).message}`);
            }

            // Small delay
            await new Promise(r => setTimeout(r, 500));
        }

        setIsLoading(false);
        if (newItems.length > 0) {
            onImport(newItems);
            addLog(isTC ? `🎉 完成！抓取 ${newItems.length} 個頁面。` : `🎉 Done! Imported ${newItems.length} pages.`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[#F2F0E9] rounded-3xl shadow-2xl w-full max-w-4xl mx-4 flex flex-col max-h-[90vh] overflow-hidden border border-white/60">
                {/* Header */}
                <div className="p-6 border-b border-gray-300/50 bg-white/40 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-[#1A1A18] flex items-center gap-2">
                            <FileText className="text-[#3A4D39]" /> 
                            {isTC ? "網頁內容提取工具 (Section & Home)" : "Web Content Extractor"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {isTC ? "支援首頁區塊、系列描述、文章內容等結構化抓取。" : "Supports Home sections, Collection desc, and structured content."}
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
                            <LinkIcon size={14} /> {isTC ? "頁面網址 (支援多行)" : "Page URLs"}
                         </label>
                         <textarea 
                            className="flex-1 w-full p-4 rounded-xl bg-white/60 border border-gray-200 text-xs font-mono leading-relaxed resize-none focus:bg-white focus:ring-2 focus:ring-[#3A4D39]/20 transition-all"
                            placeholder={"https://naturemagic.hk/ (Home)\nhttps://naturemagic.hk/collections/dog-food (Collection)\nhttps://naturemagic.hk/pages/our-story"}
                            value={urls}
                            onChange={e => setUrls(e.target.value)}
                            disabled={isLoading}
                         />
                         
                         <div className="mt-4 flex items-center justify-between">
                             <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                 Target: {category.toUpperCase()}
                             </div>
                             <button 
                                onClick={processImport}
                                disabled={isLoading || !urls.trim()}
                                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all
                                    ${isLoading || !urls.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#1A1A18] text-white hover:scale-105 active:scale-95'}
                                `}
                             >
                                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                                {isTC ? "開始提取" : "Start Extract"}
                             </button>
                         </div>
                    </div>

                    {/* Right: Logs */}
                    <div className="w-1/2 p-6 bg-black/5 flex flex-col">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <AlertCircle size={14} /> {isTC ? "提取狀態" : "Extraction Log"}
                        </label>
                        <div className="flex-1 bg-black/80 rounded-xl p-4 overflow-y-auto font-mono text-[10px] text-green-400 leading-5 shadow-inner">
                            {logs.length === 0 && <span className="text-gray-600 italic opacity-50">Waiting for input...</span>}
                            {logs.map((log, i) => (
                                <div key={i} className="border-b border-white/10 pb-1 mb-1 last:border-0 break-all">{log}</div>
                            ))}
                        </div>
                        
                        {/* Progress Bar */}
                        {isLoading && (
                            <div className="mt-4">
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
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
                                 {isTC ? "提取完成" : "Extraction Complete"}
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentImportModal;