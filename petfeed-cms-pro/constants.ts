import { Availability, Condition, Currency, Product, DashboardLink, ContentItem, OrganizationInfo } from './types';

export const DEFAULT_PRODUCT: Product = {
  id: '',
  sku: '',
  item_group_id: '',
  gtin: '',
  mpn: '',
  brand: 'NATURE MAGIC', // Fixed Default
  title: { en: '', zh_hant: '' },
  description: { en: '', zh_hant: '' },
  series: { en: '', zh_hant: '' },
  
  // Variant Defaults
  variant_title: { en: '', zh_hant: '' },
  is_bundle: false,
  multipack: 0,
  unit_measure: 0,
  unit_metric: 'kg',

  // New Fields
  ingredients: { en: '', zh_hant: '' },
  guaranteed_analysis: { en: '', zh_hant: '' },
  feeding_guide: { en: '', zh_hant: '' },
  transition_guide: { en: '', zh_hant: '' },

  title_seo: { en: '', zh_hant: '' },
  description_seo: { en: '', zh_hant: '' },
  product_highlights: [],
  link: '',
  image_link: 'https://picsum.photos/400/400',
  price: 0,
  price_original: 0,
  currency: Currency.HKD, // Fixed Default
  availability: Availability.IN_STOCK,
  condition: Condition.NEW,
  google_product_category: 'Animals & Pet Supplies > Pet Supplies > Pet Food',
  product_type: '',
  life_stage: 'all ages',
  animal_type: 'dog',
  food_type: 'dry',
  origin: 'USA', 
  flavor: { en: '', zh_hant: '' },
  size_weight: '',
  store_codes: ['HK_MAIN_01'],
  pickup_method: 'buy',
  pickup_sla: 'same_day',
  updatedAt: new Date().toISOString()
};

export const ANIMAL_TYPES = ['dog', 'cat'];
export const FOOD_TYPES = ['dry', 'wet', 'treats', 'supplement'];
export const ORIGINS = ['USA', 'New Zealand', 'Australia', 'Canada', 'Thailand', 'Europe'];

export const GOOGLE_TAXONOMY_ID = 3389; 

// --- NEW CMS DEFAULTS ---

export const DEFAULT_LINKS: DashboardLink[] = [
    // Business
    { id: 'l1', name: 'Meta Business Suite', url: 'https://business.facebook.com/', category: 'business' },
    { id: 'l2', name: 'Apple Business Connect', url: 'https://business.apple.com/', category: 'business' },
    { id: 'l3', name: 'Apple Business Manager', url: 'https://business.apple.com/', category: 'business' },
    { id: 'l4', name: 'Manufacturer Center', url: 'https://manufacturercenter.google.com/', category: 'business' },
    { id: 'l5', name: 'Merchant Center', url: 'https://merchants.google.com/', category: 'business' },
    { id: 'l6', name: 'Google Business Profile', url: 'https://business.google.com/', category: 'business' },
    { id: 'l7', name: 'Google Ads', url: 'https://ads.google.com/', category: 'business' },
    { id: 'l8', name: 'GA4 Analytics', url: 'https://analytics.google.com/', category: 'business' },
    { id: 'l9', name: 'Search Console', url: 'https://search.google.com/search-console', category: 'business' },
    { id: 'l10', name: 'Google Workspace', url: 'https://admin.google.com/', category: 'business' },
    { id: 'l11', name: 'WhatsApp Business', url: 'https://business.whatsapp.com/', category: 'business' },
    // Dev
    { id: 'd1', name: 'Cloudflare', url: 'https://dash.cloudflare.com/', category: 'dev' },
    { id: 'd2', name: 'GitHub', url: 'https://github.com/login', category: 'dev' },
    { id: 'd3', name: 'Airwallex', url: 'https://www.airwallex.com/login', category: 'dev' },
    { id: 'd4', name: 'PayMe for Business', url: 'https://payme.hsbc.com.hk/business-login', category: 'dev' },
    // Sales
    { id: 's1', name: 'HKTVMALL MMS', url: 'https://mms.hktvmall.com/', category: 'sales' },
    { id: 's2', name: 'The Place', url: '', category: 'sales' },
    { id: 's3', name: 'Shopify Admin', url: 'https://admin.shopify.com/', category: 'sales' },
    { id: 's4', name: 'Official Website', url: 'https://naturemagic.hk', category: 'sales' },
];

export const DEFAULT_ORG_INFO: OrganizationInfo = {
    name: 'NATURE MAGIC',
    legalName: 'NATURE MAGIC HONG KONG LIMITED 自然魔法寵物食品香港有限公司',
    url: 'https://naturemagic.hk',
    logo: 'https://naturemagic.hk/cdn/shop/files/NATURE_MAGIC_LOGO_HK.svg?v=1762423193',
    description: 'Nature Magic - Premium Pet Food from New Zealand & USA',
    foundingDate: '2020',
    leiCode: '8755004X0VFLMUR2ED42',
    duns: '773208874',
    email: 'business@naturemagic.hk',
    telephone: '+852 5715 2657',
    address: {
        country: 'HK',
        region: 'Hong Kong',
        locality: 'North Point',
        street: "RM A, 19/F Max Share Ctr, 367-373 King's Rd",
        postalCode: '999077'
    },
    geo: {
        latitude: 22.291,
        longitude: 114.2
    },
    sameAs: [
        "https://www.wikidata.org/wiki/Q137524429",
        "https://www.facebook.com/naturemagichk",
        "https://www.instagram.com/naturemagichk",
        "https://youtube.com/@naturemagichk",
        "https://www.hktvmall.com/hktv/zh/main/s/B1527001",
        "https://theplace.shop/naturemagic"
    ],
    certifications: [
        {
            name: 'RMP Certified (Risk Management Programme)',
            description: 'Manufactured in MPI RMP certified facility',
            id: 'PFNZ2',
            issuer: 'New Zealand Ministry for Primary Industries (MPI)'
        },
        {
            name: 'FDA Registered Facility',
            description: 'Manufactured in US FDA registered facility for export',
            id: '18237267472',
            issuer: 'U.S. Food and Drug Administration'
        },
        {
            name: 'HACCP Certified',
            description: 'Food Safety Management System',
            id: 'HACCP-PFNZ',
            issuer: 'SGS / AssureQuality'
        },
        {
            name: 'FernMark Licence',
            description: '紐西蘭銀蕨認證',
            id: 'NZFM100132',
            issuer: 'New Zealand Government'
        }
    ]
};

// --- DATA MIGRATION TO CONTENT ITEMS ---

const createContent = (key: string, titleEn: string, titleTc: string, cat: ContentItem['category'], extra: Partial<ContentItem> = {}): ContentItem => ({
    id: key,
    key,
    title: { en: titleEn, zh_hant: titleTc },
    description: { en: '', zh_hant: '' },
    images: [],
    category: cat,
    ...extra
});

export const DEFAULT_BRAND_STORIES: ContentItem[] = [
    createContent('brand_petfoodnz', 'PetfoodNZ Manufacture', '紐西蘭製造工藝', 'brand'),
    createContent('brand_quality', 'Quality & Promise', '品質與承諾', 'brand'),
    createContent('brand_nurtured', 'Nurtured Nature', '紐西蘭全貌', 'brand'),
    createContent('brand_subtraction', 'The Art of Subtraction', '減法藝術', 'brand'),
    createContent('brand_awakening', 'The Art of Awakening', '喚醒哲學', 'brand'),
    createContent('brand_texture', 'The Art of Texture', '口感工藝', 'brand'),
];

export const DEFAULT_HOME_INFO: ContentItem[] = [
    createContent('home_hero', 'Home Hero Banner', '首頁主視覺', 'home'),
    createContent('home_intro', 'Brand Introduction', '品牌簡介區塊', 'home'),
    createContent('home_features', 'Key Features', '核心賣點', 'home'),
];

export const DEFAULT_PET_INFO: ContentItem[] = [
    createContent('pet_cat', 'For Cats', '貓用系列', 'pet', {
        feeding_guide: {
             en: 'Feed adult cats 2-3 cans per 4kg of body weight daily. Kittens require up to twice as much. Fresh water should be available at all times.',
             zh_hant: '成貓每4公斤體重每日餵食2-3罐。幼貓需求量可能為成貓的兩倍。請確保隨時提供新鮮飲用水。'
        },
        transition_guide: {
             en: 'For sensitive cats, allow 10-14 days for transition. Mix small amounts of new food into old food initially.',
             zh_hant: '對於腸胃敏感的貓咪，建議預留10-14天的轉換期。初期請將少量新糧混合在舊糧中餵食。'
        }
    }),
    createContent('pet_dog', 'For Dogs', '犬用系列', 'pet', {
        feeding_guide: {
            en: 'Serve at room temperature. Fresh water should be available at all times. Adjust feeding amounts as necessary to maintain optimal weight.',
            zh_hant: '請在室溫下餵食。請確保隨時提供新鮮飲用水。請根據寵物的活動量和體重調整餵食量，以保持理想體態。'
        },
        transition_guide: {
            en: 'Mix increasing amounts of the new food with decreasing amounts of the old food over a 7-day period.',
            zh_hant: '建議在7天內逐漸增加新糧的比例，同時減少舊糧的份量，讓寵物腸胃適應。'
        }
    }),
];

export const DEFAULT_SERIES_INFO: ContentItem[] = [
  createContent('series_joint', 'Joint Care Collection', '關節養護系列', 'series'),
  createContent('series_grainfree', 'Grain Free', '經典無穀系列', 'series'),
  createContent('series_fullcare', 'Full Care Collection', '全方位呵護系列', 'series'),
  createContent('series_wholesome', 'Wholesome Essentials', '無穀高蛋白系列', 'series')
];

export const DEFAULT_RECIPE_INFO: ContentItem[] = [
    createContent('recipe_chicken', 'Chicken', '散養雞', 'recipe', {
        group: 'Joint Care',
        ingredients: {
          en: 'Free-range Chicken, Chicken Broth, Chicken Liver, Green Lipped Mussel, Pumpkin, Glucosamine.',
          zh_hant: '散養雞肉、雞湯、雞肝、綠唇貽貝、南瓜、葡萄糖胺。'
        },
        analysis: {
          en: 'Crude Protein (min) 10%, Crude Fat (min) 5%, Crude Fiber (max) 1%, Moisture (max) 78%.',
          zh_hant: '粗蛋白 (最少) 10%, 粗脂肪 (最少) 5%, 粗纖維 (最多) 1%, 水分 (最多) 78%。'
        }
    }),
    createContent('recipe_beef', 'Beef', '草飼牛', 'recipe', {
        group: 'Joint Care',
        ingredients: {
          en: 'Grass-fed Beef, Beef Broth, Beef Liver, Green Lipped Mussel, Sweet Potato, Chondroitin Sulfate.',
          zh_hant: '草飼牛肉、牛骨湯、牛肝、綠唇貽貝、甘薯、硫酸軟骨素。'
        },
        analysis: {
          en: 'Crude Protein (min) 11%, Crude Fat (min) 6%, Crude Fiber (max) 1.5%, Moisture (max) 75%.',
          zh_hant: '粗蛋白 (最少) 11%, 粗脂肪 (最少) 6%, 粗纖維 (最多) 1.5%, 水分 (最多) 75%。'
        }
    }),
    createContent('recipe_lamb', 'Lamb', '放牧羊', 'recipe', {
        group: 'Joint Care',
        ingredients: {
          en: 'Pasture-raised Lamb, Lamb Broth, Lamb Kidney, Green Lipped Mussel, Peas, Turmeric.',
          zh_hant: '放牧羊肉、羊湯、羊腎、綠唇貽貝、豌豆、薑黃。'
        },
        analysis: {
          en: 'Crude Protein (min) 9.5%, Crude Fat (min) 8%, Crude Fiber (max) 1%, Moisture (max) 76%.',
          zh_hant: '粗蛋白 (最少) 9.5%, 粗脂肪 (最少) 8%, 粗纖維 (最多) 1%, 水分 (最多) 76%。'
        }
    }),
    createContent('recipe_chicken_cod', 'Chicken & Cod', '雞肉鱈魚', 'recipe', {
        group: 'Grain Free',
        ingredients: {
          en: 'Chicken, Cod, Chicken Broth, Peas, Potatoes, Fish Oil, Taurine.',
          zh_hant: '雞肉、鱈魚、雞湯、豌豆、馬鈴薯、魚油、牛磺酸。'
        },
        analysis: {
          en: 'Crude Protein (min) 32%, Crude Fat (min) 15%, Crude Fiber (max) 4%, Moisture (max) 10%.',
          zh_hant: '粗蛋白 (最少) 32%, 粗脂肪 (最少) 15%, 粗纖維 (最多) 4%, 水分 (最多) 10%。'
        }
    }),
    createContent('recipe_beef_cod', 'Beef & Cod', '牛肉鱈魚', 'recipe', {
        group: 'Grain Free',
        ingredients: {
          en: 'Beef, Cod, Beef Broth, Lentils, Chickpeas, Flaxseed, Vitamin E Supplement.',
          zh_hant: '牛肉、鱈魚、牛湯、扁豆、鷹嘴豆、亞麻籽、維生素E補充劑。'
        },
        analysis: {
          en: 'Crude Protein (min) 30%, Crude Fat (min) 14%, Crude Fiber (max) 4.5%, Moisture (max) 10%.',
          zh_hant: '粗蛋白 (最少) 30%, 粗脂肪 (最少) 14%, 粗纖維 (最多) 4.5%, 水分 (最多) 10%。'
        }
    }),
    createContent('recipe_lamb_salmon', 'Lamb & Salmon', '羊肉三文魚', 'recipe', {
        group: 'Grain Free',
        ingredients: {
          en: 'Lamb, Salmon, Lamb Meal, Sweet Potato, Salmon Oil, Dried Chicory Root.',
          zh_hant: '羊肉、三文魚、羊肉粉、甘薯、三文魚油、乾菊苣根。'
        },
        analysis: {
          en: 'Crude Protein (min) 28%, Crude Fat (min) 16%, Crude Fiber (max) 4%, Moisture (max) 10%.',
          zh_hant: '粗蛋白 (最少) 28%, 粗脂肪 (最少) 16%, 粗纖維 (最多) 4%, 水分 (最多) 10%。'
        }
    }),
];