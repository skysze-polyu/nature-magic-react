/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Variant {
    id: string;
    name: string; 
    price: number;
    image?: string; 
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number; 
  category: string; 
  parentCategory: string; 
  imageUrl: string; 
  gallery?: string[];
  features: string[];
  variants: Variant[];
  ingredients?: string;
  nutritionalAnalysis?: { label: string; value: string }[];
  feedingGuideImg?: string;
  transitionGuide?: string;
}

export interface CartItem extends Product {
    selectedVariant: Variant;
    quantity: number; 
}

export interface JournalArticle {
  id: number;
  slug: string; // Add slug for routing
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  content: React.ReactNode;
}

export interface BrandCore {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
}

// Added missing ChatMessage interface to fix import error in Assistant.tsx
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Fixed ViewState syntax error: changed interface to type and added '=' to resolve arithmetic operation errors
export type ViewState =
  | { type: 'home' }
  | { type: 'collection', parentCategory?: string, subCategory?: string } 
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle }
  | { type: 'brand-story' } 
  | { type: 'policy', policyId: 'faq' | 'contact' | 'shipping' | 'refund' }
  | { type: 'about' }
  | { type: 'checkout' };
