/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle, BrandCore } from './types';

export const BRAND_NAME = 'NATURE MAGIC';

export const TRANSLATIONS: Record<string, any> = {
  zh: {
    nav: {
      cat: "貓貓魔法",
      dog: "狗狗魔法",
      story: "魔法故事",
      cart: "購物車",
      grainFree: "經典無穀物系列",
      jointCare: "關節養護系列"
    },
    footer: {
      tagline: "純粹的營養美學",
      philosophy: "最有效的魔法，是捨棄一切不必要的添加、「六大零添加」的承諾，它誕生於一個擁有14年零召回安全記錄的世界級工廠。",
      potential: "Nature Magic 致力於喚醒珍貴食材的內在潛能。",
      technology: "我們的核心技術，是一套精密的「協同增效」體系：深入研究紐西蘭食材的獨特天賦，透過精準科學配比，每一口滿足中綻放力量。",
      status: "Nature Magic 奠定「紐西蘭寵物食糧專家」地位的方式：以嚴格的科學技術，喚醒食材內在潛能。",
      shop: "購物區",
      brand: "品牌資訊",
      support: "顧客支援",
      partnerships: "合作夥伴",
      ourStory: "我們的故事"
    }
  },
  en: {
    nav: {
      cat: "Cat Magic",
      dog: "Dog Magic",
      story: "Magic Story",
      cart: "Cart",
      grainFree: "Grain Free Series",
      jointCare: "Joint Care Series"
    },
    footer: {
      tagline: "The Aesthetics of Pure Nutrition",
      philosophy: "The most powerful magic is the removal of all unnecessary additives. Our 'Six-Zero' promise is born in a world-class facility with a 14-year zero-recall safety record.",
      potential: "Nature Magic is dedicated to awakening the inner potential of precious ingredients.",
      technology: "Our core technology is a precise 'Synergistic' system: deep research into the unique talents of New Zealand ingredients, blooming power through scientific ratios.",
      status: "How Nature Magic defines 'NZ Pet Nutrition Specialist': Awakening the potential of ingredients through rigorous science.",
      shop: "Shop",
      brand: "Brand",
      support: "Support",
      partnerships: "Partnerships",
      ourStory: "Our Story"
    }
  }
};

export const POLICIES = [
    { id: 'faq', title: 'FAQ', content: 'Frequently asked questions about Nature Magic and our vision.' },
    { id: 'shipping', title: 'Shipping Policy', content: 'We offer worldwide shipping with care and efficiency.' },
    { id: 'refund', title: 'Refund Policy', content: '30-day return policy for unopened items in original packaging.' },
    { id: 'partnership', title: 'Partnerships', content: 'Connect with us for wholesale and brand partnership opportunities.' }
];

export const REVIEWS = [
    { id: 1, text: "The change in vitality was visible within a week. Luna is more active and her eyes are brighter.", userName: "Sarah L.", petName: "Luna", location: "Central", rating: 5 },
    { id: 2, text: "Finally, a brand that respects the carnivore diet. Kobe's coat has never been shinier.", userName: "Mark T.", petName: "Kobe", location: "Kowloon", rating: 5 },
    { id: 3, text: "The joint care series has been a game changer for our senior retriever. Truly magic.", userName: "Emily W.", petName: "Mochi", location: "Discovery Bay", rating: 5 },
];

export const CERTIFICATIONS = [
    { id: 'nz-made', name: "NZ Made", description: "Authentic New Zealand quality", iconPath: "M12 2L1 21h22L12 2zm0 3.45L19.55 19H4.45L12 5.45z" },
    { id: 'grain-free', name: "Grain Free", description: "No fillers, just pure nutrition", iconPath: "M12 3L2 12h3v8h14v-8h3L12 3zm0 2.83L18.17 12H15v6H9v-6H5.83L12 5.83z" },
    { id: 'natural', name: "100% Natural", description: "Pure ingredients from nature", iconPath: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
    { id: 'gmo-free', name: "GMO Free", description: "Non-genetically modified source", iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
    { id: 'sustainability', name: "Sustainable", description: "Responsibly sourced ingredients", iconPath: "M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" },
    { id: 'human-grade', name: "Human Grade", description: "Highest safety standards factory", iconPath: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" }
];

export const PRODUCTS: Product[] = [
    {
        id: 'cat-joint-beef',
        name: 'Joint Care Beef',
        tagline: 'Grass-fed vitality',
        description: 'New Zealand grass-fed beef with added green lipped mussel for joint support. High protein, high energy.',
        price: 28,
        category: 'Cat Joint Care',
        parentCategory: 'Cat Magic',
        imageUrl: 'https://images.unsplash.com/photo-1591768793355-74d7c836038c?auto=format&fit=crop&q=80&w=800',
        features: ['High protein', 'Joint support', 'No grain'],
        variants: [
            { id: '85g', name: '85g Single', price: 28 },
            { id: '85g-12', name: '85g x 12 Cans', price: 310 }
        ]
    },
    {
        id: 'cat-grain-lamb',
        name: 'Grain Free Lamb',
        tagline: 'Pure pasture lamb',
        description: 'Classic New Zealand pasture-raised lamb. Rich in essential minerals for a vibrant feline life.',
        price: 26,
        category: 'Cat Grain-Free',
        parentCategory: 'Cat Magic',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
        features: ['Pasture Raised', 'Gently Cooked', 'Zero Fillers'],
        variants: [
            { id: '85g-lamb', name: '85g Single', price: 26 },
            { id: '85g-lamb-12', name: '85g x 12 Cans', price: 295 }
        ]
    },
    {
        id: 'dog-grain-salmon',
        name: 'Grain Free Salmon',
        tagline: 'Ocean freshness',
        description: 'Wild-caught New Zealand salmon for sensitive stomachs and shiny coats. Rich in Omega-3.',
        price: 32,
        category: 'Dog Grain-Free',
        parentCategory: 'Dog Magic',
        imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
        features: ['Omega-3 rich', 'Hypoallergenic', '96% Meat'],
        variants: [
            { id: '175g', name: '175g Single', price: 32 },
            { id: '175g-12', name: '175g x 12 Cans', price: 360 }
        ]
    },
    {
        id: 'dog-joint-venison',
        name: 'Joint Care Venison',
        tagline: 'Premium wild venison',
        description: 'Ultra-premium wild venison combined with our signature Joint Care formula for senior mobility.',
        price: 45,
        category: 'Dog Joint Care',
        parentCategory: 'Dog Magic',
        imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
        features: ['Wild Venison', 'Senior Mobility', 'Lean Protein'],
        variants: [
            { id: '175g-v', name: '175g Single', price: 45 },
            { id: '175g-v-12', name: '175g x 12 Cans', price: 499 }
        ]
    }
];

export const STORY_CHAPTERS: JournalArticle[] = [
    {
        id: 101,
        slug: 'behind-the-quality',
        title: "品質與承諾",
        date: "April 20, 2025",
        category: "Safety",
        excerpt: "Nature Magic 是由紐西蘭最大寵物濕糧生產商 Petfood NZ 自建品牌。PetfoodNZ 擁有 14 年零召回歷史。",
        image: "https://naturemagic.com.hk/cdn/shop/articles/our_Manufacturer_3f0f31da-13e9-4066-b9c9-6b861a9f27e6.jpg?v=1762526344",
        content: "Detailed content about PetfoodNZ and manufacturing excellence..."
    },
    {
        id: 102,
        slug: 'nurtured-nature',
        title: "紐西蘭全貌",
        date: "April 18, 2025",
        category: "Origin",
        excerpt: "從紐西蘭南島到北島、從陽光牧場到純淨深海，都是我們製作的自然源泉。",
        image: "https://naturemagic.com.hk/cdn/shop/articles/Nurtured_by_Nature.webp?v=1762200411",
        content: "Exploring the pristine landscapes of NZ..."
    },
    {
        id: 103,
        slug: 'the-art-of-subtraction',
        title: "減法藝術",
        date: "April 15, 2025",
        category: "Philosophy",
        excerpt: "Nature Magic 相信對寵物最有效的魔法，就是不添加。堅持「六大零添加」承諾。",
        image: "https://naturemagic.com.hk/cdn/shop/articles/the-art-of-subtraction-3069668.webp?v=1761802805",
        content: "Philosophy of what we leave out..."
    },
    {
        id: 104,
        slug: 'ethical-sourcing',
        title: "倫理溯源",
        date: "April 12, 2025",
        category: "Ethics",
        excerpt: "我們只選擇尊重自然循環的供應商。每一塊鮮肉都來自人道對待的牧場。",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
        content: "Detailed content about ethical sourcing..."
    },
    {
        id: 105,
        slug: 'nutrient-lock',
        title: "鎖鮮工藝",
        date: "April 10, 2025",
        category: "Technology",
        excerpt: "Nutrient Lock™ 技術，在低溫環境下鎖住鮮肉的天然營養與酶。不妥協的品質。",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1000",
        content: "The science of nutrient retention..."
    }
];

export const BRAND_CORES: BrandCore[] = [
    {
        id: 'quality',
        title: 'Quality & Promise',
        subtitle: 'The NATURE MAGIC Standard',
        content: 'Every ingredient is human-grade, traceable to the source, and tested for purity.',
        image: 'https://images.unsplash.com/photo-1605092676920-8ac5ae40c7c8?auto=format&fit=crop&q=80&w=1000'
    }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        slug: 'art-of-subtraction-journal',
        title: "The Art of Subtraction",
        date: "April 12, 2025",
        category: "Editorial",
        excerpt: "Why what we leave out is as important as what we put in.",
        image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=1000",
        content: "We define our food by subtraction..."
    }
];
