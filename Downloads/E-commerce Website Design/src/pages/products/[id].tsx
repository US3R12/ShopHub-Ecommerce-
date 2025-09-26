import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Navbar } from '../../components/Navbar';
import { ProductDetail } from '../../components/ProductDetail';
import { ShoppingCart } from '../../components/ShoppingCart';
import { Footer } from '../../components/Footer';
import { Product } from '../../types';
import { products } from '../../data/products';

interface ProductPageProps {
  product: Product | null;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found - ShopHub</title>
          <meta name="description" content="Product not found" />
        </Head>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <button 
              onClick={() => router.push('/products')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Browse Products
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - ShopHub</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onCategoryClick={handleCategoryClick}
        />

        <main>
          <ProductDetail
            product={product}
            onBack={handleBack}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.id.toString() === params?.id) || null;

  return {
    props: {
      product,
    },
  };
};