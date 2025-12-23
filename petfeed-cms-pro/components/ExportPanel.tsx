import React from 'react';
import { Product } from '../types';
import { 
  generateMerchantFeed, 
  generateManufacturerFeed, 
  generateLocalListingFeed, 
  generateWebsiteBundle, 
  downloadFile 
} from '../services/exportService';
import { ShoppingBag, Factory, MapPin, Database } from 'lucide-react';

interface ExportPanelProps {
  products: Product[];
  displayLang: 'zh_hant' | 'en';
}

const ExportPanel: React.FC<ExportPanelProps> = ({ products, displayLang }) => {
  
  const handleExport = (type: 'gmc' | 'manufacturer' | 'local' | 'web') => {
    const timestamp = new Date().toISOString().slice(0, 10);
    
    switch (type) {
      case 'gmc':
        const gmcXml = generateMerchantFeed(products);
        downloadFile(gmcXml, `merchant_feed_${timestamp}.xml`, 'application/xml');
        break;
      case 'manufacturer':
        const mfgXml = generateManufacturerFeed(products);
        downloadFile(mfgXml, `manufacturer_feed_${timestamp}.xml`, 'application/xml');
        break;
      case 'local':
        const localCsv = generateLocalListingFeed(products);
        downloadFile(localCsv, `local_inventory_${timestamp}.csv`, 'text/csv');
        break;
      case 'web':
        const webJson = generateWebsiteBundle(products);
        downloadFile(webJson, `full_product_data_${timestamp}.json`, 'application/json');
        break;
    }
  };

  const isTC = displayLang === 'zh_hant';

  const HeaderButton = ({ icon: Icon, label, onClick, colorClass }: any) => (
      <button 
        onClick={onClick} 
        title={label}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 hover:bg-white border border-transparent hover:border-gray-200 transition-all group active:scale-95"
      >
        <div className={`p-0.5 rounded-full ${colorClass} text-white`}>
            <Icon size={10} strokeWidth={3} />
        </div>
        <span className="text-[10px] font-bold text-gray-600 group-hover:text-black whitespace-nowrap tracking-wide hidden xl:inline-block">
            {label}
        </span>
      </button>
  );

  return (
    <div className="flex items-center gap-2">
        <HeaderButton 
            icon={ShoppingBag} 
            label="Merchant" 
            onClick={() => handleExport('gmc')} 
            colorClass="bg-blue-500"
        />
        <HeaderButton 
            icon={Factory} 
            label="Mfg" 
            onClick={() => handleExport('manufacturer')} 
            colorClass="bg-purple-500"
        />
        <HeaderButton 
            icon={MapPin} 
            label="Local" 
            onClick={() => handleExport('local')} 
            colorClass="bg-green-500"
        />
        <HeaderButton 
            icon={Database} 
            label="JSON" 
            onClick={() => handleExport('web')} 
            colorClass="bg-orange-500"
        />
    </div>
  );
};

export default ExportPanel;
