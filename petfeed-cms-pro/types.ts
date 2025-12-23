
export enum Availability {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
  PREORDER = 'preorder'
}

export enum Condition {
  NEW = 'new',
  REFURBISHED = 'refurbished',
  USED = 'used'
}

export enum Currency {
  HKD = 'HKD',
  MOP = 'MOP'
}

export interface LocalizedString {
  en: string; // English
  zh_hant: string; // Traditional Chinese (Hong Kong/Macau)
}

export interface Product {
  id: string; // Internal UUID
  
  // Basic Identity
  sku: string; // Used as g:id
  item_group_id?: string; // For Variants (Parent ID)
  gtin: string; // Barcode (EAN/UPC)
  mpn: string; // Manufacturer Part Number
  brand: string;
  
  // Content (Bilingual) - Internal / Manufacturer
  title: LocalizedString;
  description: LocalizedString;
  series: LocalizedString; 

  // Variant Specifics
  variant_title: LocalizedString; // Specific name for this variant (e.g. "12 x 85g Box")
  is_bundle: boolean;
  multipack: number;
  
  // Unit Pricing (New for GMC)
  unit_measure: number; // e.g., 1.5
  unit_metric: 'kg' | 'g' | 'lb' | 'oz' | 'ml' | 'l'; // e.g., kg

  // Nutritional & Ingredients (Derived from Recipe CMS)
  ingredients: LocalizedString;
  guaranteed_analysis: LocalizedString;

  // Feeding & Guides (Derived from Pet CMS)
  feeding_guide: LocalizedString;
  transition_guide: LocalizedString;

  // SEO Content - For Merchant Center
  title_seo: LocalizedString;
  description_seo: LocalizedString;
  
  // Highlights (Manufacturer)
  product_highlights: LocalizedString[]; // List of bullet points

  // Links
  link: string; 
  image_link: string; 
  additional_image_links?: string[];
  
  // Pricing & Inventory
  price: number; // The actual selling price
  price_original?: number; // The "Strikethrough" / MSRP price
  currency: Currency;
  availability: Availability;
  condition: Condition;
  
  // Google Taxonomy
  google_product_category: string; 
  product_type: string; 
  
  // Pet Food Specifics
  life_stage: 'puppy' | 'adult' | 'senior' | 'all ages';
  animal_type: 'dog' | 'cat'; // Restricted to Dog/Cat
  food_type: 'dry' | 'wet' | 'treats' | 'supplement'; 
  origin: string; 
  flavor: LocalizedString;
  size_weight: string; // Display text (e.g., "2kg Bag")
  
  // Local Inventory
  store_codes: string[]; 
  pickup_method: 'buy' | 'reserve' | 'not_supported';
  pickup_sla: 'same_day' | 'next_day' | 'multi_day';
  
  updatedAt: string;
}

export interface ExportStats {
  totalProducts: number;
  validGMC: number;
  validManufacturer: number;
  validLocal: number;
}

export interface DashboardLink {
  id: string;
  name: string;
  url: string;
  category: 'business' | 'dev' | 'sales';
  icon?: string;
}

// --- COMPLEX SCHEMA TYPES ---

export interface SchemaAddress {
  country: string;
  region: string;
  locality: string;
  street: string;
  postalCode: string;
}

export interface SchemaGeo {
  latitude: number;
  longitude: number;
}

export interface SchemaCertification {
  name: string;
  description: string;
  id: string; // certificationIdentification
  issuer: string;
}

export interface OrganizationInfo {
  name: string;
  legalName: string;
  url: string;
  logo: string;
  description: string;
  foundingDate: string;
  
  // Identifiers
  leiCode?: string;
  duns?: string;
  
  // Contact
  email: string;
  telephone: string;
  
  // Location
  address: SchemaAddress;
  geo: SchemaGeo;
  
  // Relations
  sameAs: string[];
  certifications: SchemaCertification[];
}

// Enhanced Content Item to support extended attributes
export interface ContentItem {
  id: string;
  key: string; 
  title: LocalizedString;
  description: LocalizedString;
  images: string[];
  category: 'brand' | 'pet' | 'series' | 'recipe' | 'home';
  
  // For Pet Category
  feeding_guide?: LocalizedString;
  transition_guide?: LocalizedString;

  // For Recipe Category
  ingredients?: LocalizedString;
  analysis?: LocalizedString;
  group?: string; // For grouping recipes
}
