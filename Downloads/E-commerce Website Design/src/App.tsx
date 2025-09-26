import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ParallaxProductSection } from './components/ParallaxProductSection';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { Footer } from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import { Product } from './types';
import { products } from './data/products';
import { Toaster } from './components/ui/sonner';

type View = 'home' | 'products' | 'product-detail' | 'checkout';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('products');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProduct(null);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('');
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleBackToCart = () => {
    setIsCartOpen(true);
  };

  const handleExploreProducts = () => {
    setCurrentView('products');
    setSelectedCategory('');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header
          onCartClick={() => setIsCartOpen(true)}
          onCategoryClick={handleCategoryClick}
        />

        <main>
          {currentView === 'home' && (
            <>
              <HeroSection />
              
              {/* Parallax Product Showcase Sections */}
              <ParallaxProductSection
                title="Latest Electronics"
                subtitle="Cutting-Edge Technology"
                description="Discover the most innovative gadgets and electronics that will transform your daily life. From smart devices to premium audio, find technology that matches your lifestyle."
                image="https://images.unsplash.com/photo-1738520420654-87cd2ad005d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxta2Rlcm4lMjBlbGVjdHJvbmljcyUyMGdhZGdldHN8ZW58MXx8fHwxNzU4MTk5ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                badge="New Arrivals"
                features={[
                  "Latest technology trends",
                  "Premium build quality",
                  "Extended warranty included",
                  "Expert customer support"
                ]}
                onExplore={() => handleCategoryClick('Electronics')}
              />

              <ParallaxProductSection
                title="Fashion Forward"
                subtitle="Style That Defines You"
                description="Express your unique personality with our curated fashion collection. From timeless classics to contemporary trends, find pieces that make you feel confident and stylish."
                image="https://images.unsplash.com/photo-1592867874873-85480a35d2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc1ODIyMDcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                badge="Trending Now"
                features={[
                  "Sustainable materials",
                  "Size-inclusive designs",
                  "Seasonal collections",
                  "Style consultation available"
                ]}
                reversed={true}
                onExplore={() => handleCategoryClick('Clothing')}
              />
              
              <ProductListing
                products={products}
                onProductClick={handleProductClick}
              />
            </>
          )}

          {currentView === 'products' && (
            <ProductListing
              products={products}
              selectedCategory={selectedCategory}
              onProductClick={handleProductClick}
            />
          )}

          {currentView === 'product-detail' && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onBack={handleBackToProducts}
            />
          )}

          {currentView === 'checkout' && (
            <Checkout onBack={handleBackToCart} />
          )}
        </main>

        <Footer />

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />

        <Toaster position="bottom-right" />
      </div>
    </CartProvider>
  );
}