/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/BrandStory/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import BrandStory from './components/BrandStory';
import PolicyPage from './components/PolicyPage';
import ProductQuickView from './components/ProductQuickView';
import TrustedPartners from './components/TrustedPartners';
import MagicMoment from './components/MagicMoment';
import CertificationsPreview from './components/CertificationsPreview';
import CollectionImmersive from './components/CollectionImmersive';
import PetAnatomyInteractive from './components/PetAnatomyInteractive';
import JointCarePieChart from './components/JointCarePieChart';
import JointCareScience from './components/JointCareScience';
import Spotlight from './components/Spotlight';
import MulticolorCards from './components/MulticolorCards';
import { Product, ViewState, CartItem, Variant, JournalArticle } from './types';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  
  const [quickViewData, setQuickViewData] = useState<{product: Product, initialVariant?: Variant} | null>(null);

  const handleNavigation = (type: string, param?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    switch (type) {
        case 'home':
            setView({ type: 'home' });
            break;
        case 'collection':
            setView({ type: 'collection', parentCategory: param, subCategory: param });
            break;
        case 'brand-story':
            setView({ type: 'brand-story' });
            break;
        case 'journal-detail':
            setView({ type: 'journal', article: param });
            break;
        case 'policy':
            if (param) setView({ type: 'policy', policyId: param });
            break;
        case 'about':
            setView({ type: 'about' });
            break;
        case 'journal':
            const element = document.getElementById('journal');
            if(element) element.scrollIntoView({behavior: 'smooth'});
            else setView({ type: 'home' });
            break;
        default:
            setView({ type: 'home' });
    }
  };

  const addToCart = (product: Product, variant: Variant) => {
    setCartItems(prevItems => {
        const existingIndex = prevItems.findIndex(
            item => item.id === product.id && item.selectedVariant.id === variant.id
        );

        if (existingIndex >= 0) {
            const newItems = [...prevItems];
            newItems[existingIndex].quantity += 1;
            return newItems;
        } else {
            const newItem: CartItem = { ...product, selectedVariant: variant, quantity: 1 };
            return [...prevItems, newItem];
        }
    });
    if (view.type !== 'checkout') setIsCartOpen(true);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
      if (newQuantity < 1) return;
      setCartItems(prevItems => {
          const newItems = [...prevItems];
          newItems[index].quantity = newQuantity;
          return newItems;
      });
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const handleProductClick = (p: Product) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setView({ type: 'product', product: p });
  };

  const handleQuickViewOpen = (p: Product, v: Variant) => {
      setQuickViewData({ product: p, initialVariant: v });
  };
  
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      
      {view.type !== 'checkout' && (
        <Navbar 
            onNavClick={handleNavigation} 
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            currentView={view.type}
            language={language}
            onLanguageChange={setLanguage}
        />
      )}
      
      <main className="relative z-10">
        {view.type === 'home' && (
          <>
            <Hero />
            <TrustedPartners />
            <CertificationsPreview />
            <About />
            <Spotlight 
                title="Best Seller"
                accentTitle="Beef Magic"
                imageUrl="https://naturemagic.com.hk/cdn/shop/files/Pasture-Raised_Chicken.png?v=1763099930&width=940"
            />
            <MulticolorCards onCardClick={(type, param) => handleNavigation(type, param)} />
            <ProductGrid 
                onProductClick={(p) => handleProductClick(p)}
                onQuickView={handleQuickViewOpen}
            />
            <MagicMoment />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'collection' && (
             <div className="min-h-screen pt-24">
                 {(view.subCategory?.includes('Grain-Free')) && (
                     <CollectionImmersive />
                 )}
                 
                 {(view.subCategory?.includes('Joint Care')) && (
                     <>
                        <JointCareScience />
                        <JointCarePieChart />
                     </>
                 )}

                 {view.parentCategory?.includes('Cat') && (
                     <PetAnatomyInteractive petType="cat" />
                 )}
                 {view.parentCategory?.includes('Dog') && (
                     <PetAnatomyInteractive petType="dog" />
                 )}

                 <ProductGrid 
                    filterCategory={view.parentCategory}
                    onProductClick={(p) => handleProductClick(p)}
                    onQuickView={handleQuickViewOpen}
                />
             </div>
        )}

        {view.type === 'brand-story' && (
            <BrandStory onChapterClick={(article) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article });
            }} />
        )}

        {view.type === 'policy' && (
            <PolicyPage policyId={view.policyId} />
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => setView({ type: 'home' })}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => {
                if (view.article.id >= 100) setView({ type: 'brand-story' });
                else setView({ type: 'home' });
            }}
          />
        )}

        {view.type === 'about' && (
          <About />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'home' })}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onAddToCart={addToCart}
            />
        )}
      </main>

      {view.type !== 'checkout' && (
        <Footer 
          onLinkClick={handleNavigation} 
          language={language}
        />
      )}
      
      <Assistant />
      
      {quickViewData && (
          <ProductQuickView 
              product={quickViewData.product}
              initialVariant={quickViewData.initialVariant}
              isOpen={!!quickViewData}
              onClose={() => setQuickViewData(null)}
              onAddToCart={addToCart}
              onViewDetails={(p) => handleProductClick(p)}
          />
      )}
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onAddToCart={addToCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}

export default App;