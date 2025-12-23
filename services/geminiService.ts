/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} ($${p.price}): ${p.description}. Features: ${p.features.join(', ')}`
  ).join('\n');

  return `You are the AI Concierge for "NATURE MAGIC", a premium New Zealand pet nutrition brand specializing in the "Art of Subtraction" and "Philosophy of Awakening". 
  Your tone is calm, professional, grounded, and sophisticated. Use words like "purity", "bio-available", "nature", and "alchemy".
  
  Key Facts:
  - Manufactured by PetfoodNZ in New Zealand (14 years zero recall).
  - High Meat Content (≥96%).
  - Zero grains, zero gums, zero additives.
  - Features Green Lipped Mussel for joint health.
  
  Product Context:
  ${productContext}
  
  Answer customer questions about specifications, recommendations, and brand philosophy.
  Keep answers concise (under 3 sentences usually). If asked about competitors like ZIWI or K9, highlight that NATURE MAGIC shares the same world-class facility but adds functional joint support and higher meat transparency.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "I'm sorry, I cannot connect to the server right now. (Missing API Key)";
    }

    // Creating a new instance right before call to ensure up-to-date API key is used
    const ai = new GoogleGenAI({ apiKey });
    
    // Initializing chat with history and system instruction using gemini-3-flash-preview
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }]
      }))
    });

    // Send the user message and await response
    const result = await chat.sendMessage({ message: newMessage });
    
    // Directly access the text property as per GenerateContentResponse definition
    return result.text || "I apologize, but I couldn't generate a response at this moment.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I seem to be having trouble reaching our archives at the moment.";
  }
};
