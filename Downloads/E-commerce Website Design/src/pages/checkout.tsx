import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { Checkout } from '../components/Checkout';
import { Footer } from '../components/Footer';

export default function CheckoutPage() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleBack = () => {
    router.push('/cart');
  };

  return (
    <>
      <Head>
        <title>Checkout - ShopHub</title>
        <meta name="description" content="Complete your order" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navbar
          onCartClick={() => {}}
          onCategoryClick={handleCategoryClick}
        />

        <main>
          <Checkout onBack={handleBack} />
        </main>

        <Footer />
      </div>
    </>
  );
}