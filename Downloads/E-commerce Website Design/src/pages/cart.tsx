import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Shopping Cart - ShopHub</title>
          <meta name="description" content="Your shopping cart" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="min-h-screen bg-background">
          <Navbar
            onCartClick={() => {}}
            onCategoryClick={handleCategoryClick}
          />

          <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button onClick={handleContinueShopping} size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </motion.div>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart ({getTotalItems()}) - ShopHub</title>
        <meta name="description" content="Review your selected items" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navbar
          onCartClick={() => {}}
          onCategoryClick={handleCategoryClick}
        />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Shopping Cart</h1>
                  <p className="text-muted-foreground">
                    {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
                  </p>
                </div>
                <Button variant="outline" onClick={handleContinueShopping}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium truncate">{item.product.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.product.brand}
                                  </p>
                                  <Badge variant="outline" className="mt-1 text-xs">
                                    {item.product.category}
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.product.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-12 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    disabled={item.quantity >= 10}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                                
                                <div className="text-right">
                                  <div className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</div>
                                  <div className="text-sm text-muted-foreground">
                                    ${item.product.price} each
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                      </div>
                      <Button 
                        onClick={handleCheckout} 
                        className="w-full" 
                        size="lg"
                      >
                        Proceed to Checkout
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}