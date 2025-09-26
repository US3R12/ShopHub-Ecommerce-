import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ParallaxProductSection } from '../components/ParallaxProductSection';
import { ProductListing } from '../components/ProductListing';
import { ShoppingCart } from '../components/ShoppingCart';
import { Footer } from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import { products } from '../data/products';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  
  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <>
      <Head>
        <title>ShopHub - Premium E-commerce Experience</title>
        <meta name="description" content="Discover amazing products with stunning parallax effects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onCategoryClick={handleCategoryClick}
        />

        <main>
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
            showFilters={false}
            maxProducts={6}
          />
        </main>

        <Footer />

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      </div>
    </>
  );
}