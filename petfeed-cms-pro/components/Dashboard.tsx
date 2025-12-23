import React, { useState, useEffect } from 'react';
import { DashboardLink, OrganizationInfo, SchemaCertification } from '../types';
import { DEFAULT_LINKS, DEFAULT_ORG_INFO } from '../constants';
import { LogoSquare, ServiceIcons } from './BrandAssets';
import { ExternalLink, Edit3, Globe, MapPin, Phone, Award, Code2 } from 'lucide-react';

interface DashboardProps {
    isTC: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isTC }) => {
    const [links, setLinks] = useState<DashboardLink[]>([]);
    const [orgInfo, setOrgInfo] = useState<OrganizationInfo>(DEFAULT_ORG_INFO);
    const [editLinkId, setEditLinkId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'general' | 'address' | 'certs'>('general');

    // Load Data
    useEffect(() => {
        const savedLinks = localStorage.getItem('nm_cms_links');
        if (savedLinks) setLinks(JSON.parse(savedLinks));
        else setLinks(DEFAULT_LINKS);

        const savedOrg = localStorage.getItem('nm_cms_org');
        if (savedOrg) setOrgInfo(JSON.parse(savedOrg));
    }, []);

    // Save Data
    useEffect(() => {
        if (links.length > 0) localStorage.setItem('nm_cms_links', JSON.stringify(links));
    }, [links]);

    useEffect(() => {
        localStorage.setItem('nm_cms_org', JSON.stringify(orgInfo));
    }, [orgInfo]);

    const handleLinkUpdate = (id: string, url: string) => {
        setLinks(prev => prev.map(l => l.id === id ? { ...l, url } : l));
    };

    const handleOrgUpdate = (field: keyof OrganizationInfo, value: any) => {
        setOrgInfo(prev => ({ ...prev, [field]: value }));
    };
    
    const handleAddressUpdate = (field: keyof OrganizationInfo['address'], value: any) => {
        setOrgInfo(prev => ({ ...prev, address: { ...prev.address, [field]: value } }));
    };

    const AppGrid = ({ title, category }: any) => (
        <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-2 opacity-80">{title}</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6">
                {links.filter(l => l.category === category).map(link => {
                    // @ts-ignore - dynamic access to icon map
                    const IconComponent = ServiceIcons[link.id];
                    return (
                        <div key={link.id} className="group relative flex flex-col items-center">
                            {/* App Icon */}
                            <a 
                                href={link.url || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-20 h-20 bg-white/40 rounded-[22px] shadow-sm border border-white/60 flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 backdrop-blur-md relative z-10"
                                onClick={(e) => !link.url && e.preventDefault()}
                            >
                                {IconComponent ? <IconComponent /> : <Globe className="text-gray-400"/>}
                                
                                {/* Status Dot if empty URL */}
                                {!link.url && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full border border-white"></span>
                                )}
                            </a>

                            {/* Tooltip Label on Hover */}
                            <div className="absolute top-24 opacity-0 group-hover:opacity-100 transition-opacity text-center z-20 pointer-events-none">
                                <span className="text-[10px] font-bold text-[#1A1A18] bg-white/90 px-2 py-1 rounded shadow-md whitespace-nowrap">
                                    {link.name}
                                </span>
                            </div>

                            {/* Edit Trigger (Subtle) */}
                            <button 
                                onClick={() => setEditLinkId(editLinkId === link.id ? null : link.id)} 
                                className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow border text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            >
                                <Edit3 size={10} />
                            </button>

                            {/* URL Editor Popup */}
                            {editLinkId === link.id && (
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-48 bg-white p-2 rounded-xl shadow-2xl z-50 border border-gray-100 animate-fade-in">
                                    <input 
                                        type="text" 
                                        autoFocus
                                        className="w-full text-xs p-2 rounded-lg bg-gray-50 border border-gray-200 mb-1"
                                        placeholder="https://..."
                                        value={link.url}
                                        onChange={(e) => handleLinkUpdate(link.id, e.target.value)}
                                        onBlur={() => setEditLinkId(null)}
                                        onKeyDown={(e) => e.key === 'Enter' && setEditLinkId(null)}
                                    />
                                    <div className="text-[9px] text-gray-400 text-center">Press Enter to Save</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const generateJsonLd = () => {
       // ... existing logic ...
        const schema = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Corporation",
              "@id": `${orgInfo.url}/#corporation`,
              "name": orgInfo.name,
              "legalName": orgInfo.legalName,
              "url": orgInfo.url,
              "foundingDate": orgInfo.foundingDate,
              "leiCode": orgInfo.leiCode,
              "duns": orgInfo.duns,
              "iso6523Code": [`0199:${orgInfo.leiCode}`, `0060:${orgInfo.duns}`],
              "logo": {
                "@type": "ImageObject",
                "url": orgInfo.logo,
                "width": 1200,
                "height": 630
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": orgInfo.email,
                "contactType": "corporate development",
                "availableLanguage": ["en", "zh-Hant", "zh-Hans"]
              },
              "brand": {
                "@type": "Brand",
                "name": orgInfo.name,
                "alternateName": "自然魔法"
              },
              "parentOrganization": {
                  "@type": "Organization",
                  "name": "PETFOODNZ",
                  "@id": `${orgInfo.url}#petfoodnz`,
                  "url": "https://www.petfoodnz.com",
                  "address": {
                   "@type": "PostalAddress",
                   "addressCountry": "NZ",
                   "postalCode": "4040",
                   "streetAddress": "14 Kahutia Street",
                   "addressLocality":" PO Box 350 Gisborne "
                  }
              },
              "hasCertification": orgInfo.certifications.map(c => ({
                  "@type": "Certification",
                  "name": c.name,
                  "description": c.description,
                  "certificationIdentification": c.id,
                  "issuedBy": { "@type": "Organization", "name": c.issuer }
              })),
              "sameAs": orgInfo.sameAs.filter(s => s)
            },
            {
              "@type": "LocalBusiness",
              "@id": `${orgInfo.url}/#localbusiness`,
              "parentOrganization": { "@id": `${orgInfo.url}/#corporation` },
              "name": orgInfo.name,
              "image": orgInfo.logo,
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": orgInfo.address.country,
                "addressRegion": orgInfo.address.region,
                "addressLocality": orgInfo.address.locality,
                "streetAddress": orgInfo.address.street,
                "postalCode": orgInfo.address.postalCode
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": orgInfo.geo.latitude,
                "longitude": orgInfo.geo.longitude
              },
              "telephone": orgInfo.telephone,
              "email": orgInfo.email,
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "areaServed": [{ "@type": "City", "name": "Hong Kong" }, { "@type": "City", "name": "Macau" }],
              "sameAs": orgInfo.sameAs.filter(s => s)
            },
            {
              "@type": "WebSite",
              "@id": `${orgInfo.url}/#website`,
              "url": orgInfo.url,
              "name": orgInfo.name,
              "publisher": { "@id": `${orgInfo.url}/#corporation` },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${orgInfo.url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${orgInfo.url}#breadcrumb`,
              "name": "網站導航路徑",
              "itemListElement": [{
                  "@type": "ListItem",
                  "position": 1,
                  "name": "首頁",
                  "item": orgInfo.url
                }
              ]
            }
          ]
        };

        const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'organization.jsonld';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="space-y-12 animate-fade-in max-w-7xl mx-auto pb-10">
            {/* App Grid Sections */}
            <div>
                <AppGrid title={isTC ? "業務管理" : "Business Management"} category="business" />
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 opacity-50"></div>
                <AppGrid title={isTC ? "開發部署" : "Dev & Deploy"} category="dev" />
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 opacity-50"></div>
                <AppGrid title={isTC ? "銷售渠道" : "Sales Channels"} category="sales" />
            </div>

            {/* Organization Schema Editor */}
            <div className="liquid-glass rounded-[32px] p-8 relative overflow-hidden border border-white/60 mt-12">
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl shadow-xl overflow-hidden bg-white/80 p-1 border border-white/50">
                            <LogoSquare />
                        </div>
                        <div>
                            <h3 className="text-2xl text-[#1A1A18] flex items-center gap-2 tracking-wide">
                                {isTC ? "企業結構資料" : "Organization Schema"}
                            </h3>
                            <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-widest">Global Identity & Knowledge Graph</p>
                        </div>
                     </div>
                     <button onClick={generateJsonLd} className="bg-[#1A1A18] text-white px-6 py-3 rounded-full hover:bg-black hover:scale-105 transition-all flex items-center gap-2 text-xs font-bold shadow-xl tracking-wider uppercase">
                        <Code2 size={14} /> Generate JSON-LD
                     </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-white/40 p-1.5 rounded-full w-fit backdrop-blur-sm">
                    <button 
                        onClick={() => setActiveTab('general')}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'general' ? 'bg-[#1A1A18] text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        {isTC ? '基本資料' : 'General'}
                    </button>
                    <button 
                        onClick={() => setActiveTab('address')}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'address' ? 'bg-[#1A1A18] text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        {isTC ? '地址與聯絡' : 'Address'}
                    </button>
                    <button 
                        onClick={() => setActiveTab('certs')}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'certs' ? 'bg-[#1A1A18] text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        {isTC ? '證書' : 'Certs'}
                    </button>
                </div>
                
                <div className="space-y-4 relative z-10">
                    {/* GENERAL TAB */}
                    {activeTab === 'general' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Brand Name</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.name} onChange={e => handleOrgUpdate('name', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Legal Name</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.legalName} onChange={e => handleOrgUpdate('legalName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Website URL</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.url} onChange={e => handleOrgUpdate('url', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Founding Date</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.foundingDate} onChange={e => handleOrgUpdate('foundingDate', e.target.value)} />
                            </div>
                             <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">LEI Code</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.leiCode || ''} onChange={e => handleOrgUpdate('leiCode', e.target.value)} />
                            </div>
                             <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">DUNS</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.duns || ''} onChange={e => handleOrgUpdate('duns', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                                <textarea className="w-full p-4 text-sm font-medium" rows={3} value={orgInfo.description} onChange={e => handleOrgUpdate('description', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* ADDRESS TAB */}
                    {activeTab === 'address' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                            <div className="md:col-span-2 flex items-center gap-2 mb-2 text-sm font-bold text-[#1A1A18] uppercase tracking-wide">
                                <MapPin size={16} /> Location Details
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Region</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.address.region} onChange={e => handleAddressUpdate('region', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Locality</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.address.locality} onChange={e => handleAddressUpdate('locality', e.target.value)} />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Street Address</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.address.street} onChange={e => handleAddressUpdate('street', e.target.value)} />
                            </div>
                            
                            <div className="md:col-span-2 flex items-center gap-2 mb-2 text-sm font-bold text-[#1A1A18] uppercase tracking-wide mt-4">
                                <Phone size={16} /> Contact Points
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Telephone</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.telephone} onChange={e => handleOrgUpdate('telephone', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                                <input className="w-full p-4 text-sm font-medium" value={orgInfo.email} onChange={e => handleOrgUpdate('email', e.target.value)} />
                            </div>
                        </div>
                    )}

                    {/* CERTS TAB */}
                    {activeTab === 'certs' && (
                        <div className="animate-fade-in">
                            <div className="md:col-span-2 flex items-center gap-2 mb-4 text-sm font-bold text-[#1A1A18] uppercase tracking-wide">
                                <Award size={16} /> Certifications & Licenses
                            </div>
                            <div className="space-y-3">
                                {orgInfo.certifications.map((cert, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-white/60 border border-white/60 flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <span className="font-bold text-base text-[#1A1A18]">{cert.name}</span>
                                            <span className="text-[10px] bg-[#3A4D39] text-white px-2 py-1 rounded-full font-bold tracking-widest">{cert.id}</span>
                                        </div>
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{cert.issuer}</div>
                                        <div className="text-sm text-gray-600 mt-2 leading-relaxed">{cert.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;