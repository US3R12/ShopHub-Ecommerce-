import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../../components/Navbar';
import { ProductListing } from '../../components/ProductListing';
import { ShoppingCart } from '../../components/ShoppingCart';
import { Footer } from '../../components/Footer';
import { Product } from '../../types';
import { products } from '../../data/products';

export default function ProductsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const { category } = router.query;

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
        <title>Products - ShopHub</title>
        <meta name="description" content="Browse our complete product catalog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onCategoryClick={handleCategoryClick}
        />

        <main>
          <ProductListing
            products={products}
            selectedCategory={typeof category === 'string' ? category : ''}
            onProductClick={handleProductClick}
            showFilters={true}
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