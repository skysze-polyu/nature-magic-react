import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment");
  }
  return new GoogleGenAI({ apiKey });
};

// Translate function
export const translateContent = async (text: string, targetLang: 'en' | 'zh_hant'): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `Translate the following pet food product text to ${targetLang === 'en' ? 'English' : 'Traditional Chinese (Hong Kong)'}. 
    Maintain professional e-commerce tone. Only return the translated string.
    Text: "${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Translation failed", error);
    throw error;
  }
};

// Smart Optimization for Google Merchant Center
export const optimizeProductData = async (product: Product): Promise<Partial<Product>> => {
  try {
    const ai = getClient();
    
    const context = JSON.stringify({
      title: product.title.en || product.title.zh_hant,
      description: product.description.en || product.description.zh_hant,
      brand: product.brand,
      animal: product.animal_type
    });

    const prompt = `You are a Google Merchant Center expert. Optimize the title and description for this pet food product.
    1. Title should include Brand + Animal + Flavor + Size. Max 150 chars.
    2. Description should be SEO friendly.
    
    Input Data: ${context}
    
    Return JSON format only matching this schema:
    {
      "title_en": "string",
      "description_en": "string"
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title_en: { type: Type.STRING },
            description_en: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    return {
      title: { ...product.title, en: result.title_en },
      description: { ...product.description, en: result.description_en }
    };

  } catch (error) {
    console.error("Optimization failed", error);
    throw error;
  }
};