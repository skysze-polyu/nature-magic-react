import React, { useState, useEffect, useRef } from 'react';
import { ContentItem, LocalizedString } from '../types';
import { DEFAULT_BRAND_STORIES, DEFAULT_PET_INFO, DEFAULT_SERIES_INFO, DEFAULT_RECIPE_INFO, DEFAULT_HOME_INFO } from '../constants';
import ContentImportModal from './ContentImportModal';
import { Save, Image as ImageIcon, ChevronRight, BookOpen, Utensils, PenTool, DownloadCloud, Upload, Download, FileJson } from 'lucide-react';

interface ContentCMSProps {
    type: 'brand' | 'pet' | 'series' | 'recipe' | 'home';
    isTC: boolean;
}

const ContentCMS: React.FC<ContentCMSProps> = ({ type, isTC }) => {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showImport, setShowImport] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const storageKey = `nm_cms_content_${type}`;

    // Initialize Data
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved content", e);
                loadDefaults();
            }
        } else {
            loadDefaults();
        }
    }, [type]);

    const loadDefaults = () => {
        let defaults: ContentItem[] = [];
        if (type === 'brand') defaults = DEFAULT_BRAND_STORIES;
        else if (type === 'home') defaults = DEFAULT_HOME_INFO;
        else if (type === 'pet') defaults = DEFAULT_PET_INFO;
        else if (type === 'series') defaults = DEFAULT_SERIES_INFO;
        else if (type === 'recipe') defaults = DEFAULT_RECIPE_INFO;
        setItems(defaults);
    };

    // Auto-Save to LocalStorage
    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(items));
        }
    }, [items, storageKey]);

    const handleUpdate = (id: string, field: keyof ContentItem, lang: keyof LocalizedString, value: string) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                // @ts-ignore - dynamic key access
                const currentObj = item[field] as LocalizedString || { en: '', zh_hant: '' };
                return { ...item, [field]: { ...currentObj, [lang]: value } };
            }
            return item;
        }));
    };

    const handleImageUpdate = (id: string, value: string) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, images: [value] }; 
            }
            return item;
        }));
    };

    // --- IMPORT FROM URL ---
    const handleUrlImport = (importedItems: ContentItem[]) => {
        setItems(prev => {
            const newItems = [...prev];
            importedItems.forEach(imp => {
                const existingIdx = newItems.findIndex(i => i.key === imp.key);
                if (existingIdx >= 0) {
                    // Smart Merge: Only overwrite if empty or explicitly updating
                    const ex = newItems[existingIdx];
                    newItems[existingIdx] = {
                        ...ex,
                        images: imp.images.length > 0 ? imp.images : ex.images,
                        title: {
                            en: imp.title.en || ex.title.en,
                            zh_hant: imp.title.zh_hant || ex.title.zh_hant
                        },
                        description: {
                             en: imp.description.en || ex.description.en,
                             zh_hant: imp.description.zh_hant || ex.description.zh_hant
                        }
                    };
                } else {
                    newItems.push(imp);
                }
            });
            return newItems;
        });
        setTimeout(() => setShowImport(false), 1000);
    };

    // --- DATA PROTECTION: BACKUP & RESTORE ---
    const handleBackup = () => {
        const dataStr = JSON.stringify(items, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `nm_cms_${type}_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleRestoreTrigger = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target?.result as string);
                if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
                    if (window.confirm(isTC ? "確定要還原備份嗎？目前的本地更改將會被覆蓋。" : "Are you sure you want to restore? Current local changes will be overwritten.")) {
                        setItems(parsed);
                        alert(isTC ? "還原成功！" : "Restore successful!");
                    }
                } else {
                    alert(isTC ? "無效的備份檔案。" : "Invalid backup file.");
                }
            } catch (err) {
                console.error(err);
                alert(isTC ? "檔案解析失敗。" : "Failed to parse file.");
            }
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    };

    const activeItem = items.find(i => i.id === selectedId);

    return (
        <div className="flex h-[calc(100vh-140px)] liquid-glass rounded-[32px] overflow-hidden shadow-2xl animate-fade-in border border-white/60">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-white/40 bg-white/30 flex flex-col">
                <div className="p-6 border-b border-white/40 flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-lg text-[#1A1A18] capitalize tracking-wide">
                            {isTC ? '項目列表' : `${type} List`}
                        </h3>
                        <div className="flex gap-2 mt-1">
                            <button 
                                onClick={handleBackup}
                                className="text-[10px] bg-white/50 hover:bg-[#1A1A18] hover:text-white px-2 py-1 rounded-md transition-colors flex items-center gap-1 font-bold text-gray-500 uppercase tracking-widest"
                                title={isTC ? "下載備份 JSON" : "Download Backup JSON"}
                            >
                                <Download size={10} /> {isTC ? "備份" : "Backup"}
                            </button>
                            <button 
                                onClick={handleRestoreTrigger}
                                className="text-[10px] bg-white/50 hover:bg-[#1A1A18] hover:text-white px-2 py-1 rounded-md transition-colors flex items-center gap-1 font-bold text-gray-500 uppercase tracking-widest"
                                title={isTC ? "還原備份 JSON" : "Restore Backup JSON"}
                            >
                                <Upload size={10} /> {isTC ? "還原" : "Restore"}
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="application/json" 
                                onChange={handleRestoreFile} 
                            />
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowImport(true)}
                        className="bg-white/50 hover:bg-white p-2 rounded-full text-[#3A4D39] border border-transparent hover:border-gray-200 transition-all shadow-sm group"
                        title="Import from URL"
                    >
                        <DownloadCloud size={16} />
                    </button>
                </div>
                <div className="overflow-y-auto flex-1 p-4 space-y-2 no-scrollbar">
                    {items.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedId(item.id)}
                            className={`w-full text-left p-4 rounded-xl flex justify-between items-center transition-all duration-300 ${
                                selectedId === item.id 
                                ? 'bg-[#1A1A18] text-white shadow-lg scale-[1.02]' 
                                : 'hover:bg-white/50 text-[#1A1A18]'
                            }`}
                        >
                            <div>
                                <div className="text-sm font-bold tracking-wide">{isTC ? item.title.zh_hant : item.title.en}</div>
                                {item.group && <div className={`text-[10px] mt-1 font-medium uppercase tracking-wider ${selectedId === item.id ? 'text-gray-400' : 'text-gray-500'}`}>{item.group}</div>}
                            </div>
                            <ChevronRight size={16} className={`opacity-60 ${selectedId === item.id ? 'text-white' : ''}`} />
                        </button>
                    ))}
                    {items.length === 0 && (
                        <div className="p-8 text-center text-gray-400 text-xs italic">
                            {isTC ? "尚無內容，請點擊上方按鈕導入。" : "No content. Click import button above."}
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Area */}
            <div className="w-2/3 flex flex-col bg-white/20 backdrop-blur-sm">
                {activeItem ? (
                    <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                        <h2 className="text-xl font-medium text-[#1A1A18] mb-8 pb-4 border-b border-white/60 flex items-center gap-3">
                            <PenTool className="text-[#3A4D39]" size={20}/> {isTC ? '編輯內容' : 'Edit Content'}
                        </h2>

                        <div className="space-y-8">
                            {/* Key (ReadOnly) */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">System Key / Handle</label>
                                <code className="bg-white/50 px-2 py-1 rounded text-xs text-gray-600 font-mono border border-white/60">{activeItem.key}</code>
                            </div>

                            {/* Titles */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Title (EN)</label>
                                    <input 
                                        className="w-full p-4 rounded-xl text-sm bg-white/60" 
                                        value={activeItem.title.en} 
                                        onChange={e => handleUpdate(activeItem.id, 'title', 'en', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">標題 (中文)</label>
                                    <input 
                                        className="w-full p-4 rounded-xl text-sm bg-white/60" 
                                        value={activeItem.title.zh_hant} 
                                        onChange={e => handleUpdate(activeItem.id, 'title', 'zh_hant', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Description / Body (EN)</label>
                                    <textarea 
                                        className="w-full p-4 rounded-xl text-sm bg-white/60 leading-relaxed resize-none" 
                                        rows={8}
                                        value={activeItem.description.en} 
                                        onChange={e => handleUpdate(activeItem.id, 'description', 'en', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">描述 / 內文 (中文)</label>
                                    <textarea 
                                        className="w-full p-4 rounded-xl text-sm bg-white/60 leading-relaxed resize-none" 
                                        rows={8}
                                        value={activeItem.description.zh_hant} 
                                        onChange={e => handleUpdate(activeItem.id, 'description', 'zh_hant', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* --- SPECIAL FIELDS FOR PET INFO (FEEDING GUIDE) --- */}
                            {type === 'pet' && (
                                <div className="bg-orange-50/40 p-6 rounded-2xl border border-orange-100/50 space-y-6">
                                    <h4 className="text-sm font-bold text-orange-900 flex items-center gap-2 uppercase tracking-wide">
                                        <BookOpen size={16}/> {isTC ? "飼養與換糧指南" : "Feeding & Transition Guides"}
                                    </h4>
                                    
                                    {/* Feeding Guide */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[9px] font-bold text-orange-800/60 uppercase tracking-widest mb-2">Feeding Guide (EN)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={4}
                                                value={activeItem.feeding_guide?.en || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'feeding_guide', 'en', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-orange-800/60 uppercase tracking-widest mb-2">每日餵食建議 (中文)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={4}
                                                value={activeItem.feeding_guide?.zh_hant || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'feeding_guide', 'zh_hant', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Transition Guide */}
                                    <div className="grid grid-cols-2 gap-6 border-t border-orange-200/50 pt-6">
                                        <div>
                                            <label className="block text-[9px] font-bold text-orange-800/60 uppercase tracking-widest mb-2">Transition Guide (EN)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={4}
                                                value={activeItem.transition_guide?.en || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'transition_guide', 'en', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-orange-800/60 uppercase tracking-widest mb-2">換糧指南 (中文)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={4}
                                                value={activeItem.transition_guide?.zh_hant || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'transition_guide', 'zh_hant', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- SPECIAL FIELDS FOR RECIPE INFO (INGREDIENTS) --- */}
                            {type === 'recipe' && (
                                <div className="bg-[#E9F0EA]/60 p-6 rounded-2xl border border-[#C5D1C6]/50 space-y-6">
                                    <h4 className="text-sm font-bold text-[#3A4D39] flex items-center gap-2 uppercase tracking-wide">
                                        <Utensils size={16}/> {isTC ? "成分與營養分析" : "Ingredients & Analysis"}
                                    </h4>
                                    
                                    {/* Ingredients */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[9px] font-bold text-[#3A4D39]/60 uppercase tracking-widest mb-2">Ingredients (EN)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={5}
                                                value={activeItem.ingredients?.en || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'ingredients', 'en', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-[#3A4D39]/60 uppercase tracking-widest mb-2">成分 (中文)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={5}
                                                value={activeItem.ingredients?.zh_hant || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'ingredients', 'zh_hant', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Analysis */}
                                    <div className="grid grid-cols-2 gap-6 border-t border-[#C5D1C6]/50 pt-6">
                                        <div>
                                            <label className="block text-[9px] font-bold text-[#3A4D39]/60 uppercase tracking-widest mb-2">Guaranteed Analysis (EN)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={4}
                                                value={activeItem.analysis?.en || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'analysis', 'en', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-[#3A4D39]/60 uppercase tracking-widest mb-2">營養分析 (中文)</label>
                                            <textarea className="w-full p-4 border-none bg-white/60 rounded-xl text-sm resize-none" rows={4}
                                                value={activeItem.analysis?.zh_hant || ''}
                                                onChange={e => handleUpdate(activeItem.id, 'analysis', 'zh_hant', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Image */}
                            <div className="bg-white/40 p-6 rounded-2xl border border-dashed border-gray-400/50 hover:bg-white/60 transition-colors">
                                <label className="block text-[10px] font-bold text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-widest">
                                    <ImageIcon size={14} /> Main Image URL
                                </label>
                                <input 
                                    className="w-full p-3 rounded-xl text-sm mb-4" 
                                    placeholder="https://example.com/image.jpg"
                                    value={activeItem.images[0] || ''}
                                    onChange={e => handleImageUpdate(activeItem.id, e.target.value)}
                                />
                                {activeItem.images[0] && (
                                    <div className="h-48 w-full bg-white/50 rounded-xl overflow-hidden flex items-center justify-center border border-white/60 shadow-inner">
                                        <img src={activeItem.images[0]} alt="Preview" className="h-full object-contain mix-blend-multiply" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm gap-4">
                        <div className="p-6 bg-white/30 rounded-full animate-pulse">
                            <PenTool size={32} />
                        </div>
                        <span className="font-medium tracking-wide">{isTC ? '請從左側選擇項目進行編輯' : 'Select an item from the left to edit'}</span>
                    </div>
                )}
                
                {/* Footer Status */}
                <div className="p-4 bg-white/30 border-t border-white/40 text-[10px] uppercase tracking-widest text-right text-gray-500 flex justify-end items-center gap-2 font-bold">
                    <Save size={12} /> Auto-saving to LocalStorage
                </div>
            </div>

            {/* Import Modal */}
            {showImport && (
                <ContentImportModal 
                    onClose={() => setShowImport(false)}
                    onImport={handleUrlImport}
                    category={type}
                    isTC={isTC}
                />
            )}
        </div>
    );
};

export default ContentCMS;
