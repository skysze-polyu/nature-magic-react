import { Product } from '../types';

const escapeXML = (str: string) => {
  if (!str) return '';
  return str.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

export const generateMerchantFeed = (products: Product[]) => {
  let xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>PetFood Merchant Feed</title>
<link>http://www.example.com</link>
<description>Pet Food Product Feed</description>
`;

  products.forEach(p => {
    // MERCHANT CENTER: Use SEO Title/Desc if available, fallback to standard
    // Language priority: TC (HK) -> EN
    
    // Construct Main Title. If variant_title exists, append it.
    let baseTitle = p.title_seo.zh_hant || p.title_seo.en || p.title.zh_hant || p.title.en;
    const variantSuffix = p.variant_title.zh_hant || p.variant_title.en;
    if (variantSuffix) {
        baseTitle = `${baseTitle} ${variantSuffix}`;
    }

    const desc = p.description_seo.zh_hant || p.description_seo.en || p.description.zh_hant || p.description.en;

    // Price Logic: 
    let priceTag = `<g:price>${p.price} ${p.currency}</g:price>`;
    if (p.price_original && p.price_original > p.price) {
      priceTag = `<g:price>${p.price_original} ${p.currency}</g:price>
  <g:sale_price>${p.price} ${p.currency}</g:sale_price>`;
    }

    let variantTag = '';
    if (p.item_group_id) {
        variantTag = `<g:item_group_id>${escapeXML(p.item_group_id)}</g:item_group_id>`;
    }

    // Bundle & Multipack
    let bundleTag = p.is_bundle ? '<g:is_bundle>true</g:is_bundle>' : '';
    let multipackTag = p.multipack > 1 ? `<g:multipack>${p.multipack}</g:multipack>` : '';

    // Unit Pricing (New)
    let unitPricingTag = '';
    if (p.unit_measure && p.unit_metric) {
        // GMC format: <g:unit_pricing_measure>1.5 kg</g:unit_pricing_measure>
        unitPricingTag = `<g:unit_pricing_measure>${p.unit_measure} ${p.unit_metric}</g:unit_pricing_measure>`;
        // Base measure is usually derived by Google, but can be explicit if needed. 
        // For simplicity, we stick to mandatory measure.
    }

    xml += `<item>
  <g:id>${escapeXML(p.sku)}</g:id>
  <g:title>${escapeXML(baseTitle)}</g:title>
  <g:description>${escapeXML(desc)}</g:description>
  <g:link>${escapeXML(p.link)}</g:link>
  <g:image_link>${escapeXML(p.image_link)}</g:image_link>
  <g:condition>${p.condition}</g:condition>
  <g:availability>${p.availability}</g:availability>
  ${priceTag}
  <g:brand>${escapeXML(p.brand)}</g:brand>
  <g:gtin>${p.gtin}</g:gtin>
  <g:mpn>${p.mpn}</g:mpn>
  <g:google_product_category>${escapeXML(p.google_product_category)}</g:google_product_category>
  <g:product_type>${escapeXML(p.product_type)}</g:product_type>
  ${variantTag}
  ${bundleTag}
  ${multipackTag}
  ${unitPricingTag}
</item>
`;
  });

  xml += `</channel>\n</rss>`;
  return xml;
};

export const generateManufacturerFeed = (products: Product[]) => {
  let xml = `<?xml version="1.0"?>
<feed xmlns="http://www.google.com/schemas/sitemap-content/1.0" xmlns:g="http://base.google.com/ns/1.0">
<title>PetFood Manufacturer Feed</title>
`;

  products.filter(p => p.gtin).forEach(p => {
    // MANUFACTURER CENTER: Use Standard Title.
    let baseTitle = p.title.en || p.title.zh_hant;
    const variantSuffix = p.variant_title.en || p.variant_title.zh_hant;
    if (variantSuffix) {
        baseTitle = `${baseTitle} ${variantSuffix}`;
    }

    let richDesc = p.description.en || p.description.zh_hant;
    
    // Append Rich Data (English first for Manufacturer Center usually, or mixed)
    if (p.ingredients.en) richDesc += `\n\nIngredients:\n${p.ingredients.en}`;
    if (p.guaranteed_analysis.en) richDesc += `\n\nAnalysis:\n${p.guaranteed_analysis.en}`;
    if (p.feeding_guide.en) richDesc += `\n\nFeeding Guide:\n${p.feeding_guide.en}`;

    // Build Highlights
    const highlights = p.product_highlights.map(h => {
        const text = h.en || h.zh_hant;
        return text ? `<g:product_highlight>${escapeXML(text)}</g:product_highlight>` : '';
    }).join('\n  ');

    xml += `<entry>
  <g:id>${escapeXML(p.sku)}</g:id>
  <g:gtin>${p.gtin}</g:gtin>
  <g:brand>${escapeXML(p.brand)}</g:brand>
  <g:title>${escapeXML(baseTitle)}</g:title>
  <g:description>${escapeXML(richDesc)}</g:description>
  ${highlights}
  <g:product_detail attribute_name="Life Stage" attribute_value="${p.life_stage}"/>
  <g:product_detail attribute_name="Animal Type" attribute_value="${p.animal_type}"/>
  <g:product_detail attribute_name="Food Type" attribute_value="${p.food_type}"/>
  <g:product_detail attribute_name="Origin" attribute_value="${escapeXML(p.origin)}"/>
  <g:product_detail attribute_name="Flavor" attribute_value="${escapeXML(p.flavor.en || p.flavor.zh_hant)}"/>
  <g:suggested_retail_price>${p.price_original || p.price} ${p.currency}</g:suggested_retail_price>
  <g:release_date>${p.updatedAt.split('T')[0]}</g:release_date>
</entry>
`;
  });

  xml += `</feed>`;
  return xml;
};

export const generateLocalListingFeed = (products: Product[]) => {
  // Local inventory is often CSV: store_code, id, price, sale_price, quantity, availability
  const header = "store_code,id,price,sale_price,availability,quantity,pickup_method,pickup_sla\n";
  const rows = products.flatMap(p => 
    p.store_codes.map(store => {
      const qty = p.availability === 'in_stock' ? 10 : 0;
      // If original price exists, price col is original, sale_price is selling. 
      // If no original, price is selling.
      const price = p.price_original ? `${p.price_original} ${p.currency}` : `${p.price} ${p.currency}`;
      const salePrice = p.price_original ? `${p.price} ${p.currency}` : '';

      return `${store},${p.sku},${price},${salePrice},${p.availability},${qty},${p.pickup_method},${p.pickup_sla}`;
    })
  ).join("\n");
  
  return header + rows;
};

export const generateWebsiteBundle = (products: Product[]) => {
  return JSON.stringify(products, null, 2);
};

export const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};