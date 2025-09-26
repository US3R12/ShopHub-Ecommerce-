import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function ShoppingCart({ isOpen, onClose, onCheckout }: ShoppingCartProps) {
  const { items, total, updateQuantity, removeItem } = useCart();

  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Shopping Cart</span>
            {items.length > 0 && (
              <Badge variant="secondary">{items.length}</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Your cart is empty' : `${items.length} item${items.length > 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">Add some products to get started</p>
                </div>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-auto py-6 space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <ImageWithFallback
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0 space-y-2">
                              <div>
                                <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                              </div>

                              {/* Variants */}
                              <div className="flex space-x-2 text-xs">
                                {item.selectedColor && (
                                  <Badge variant="outline">{item.selectedColor}</Badge>
                                )}
                                {item.selectedSize && (
                                  <Badge variant="outline">{item.selectedSize}</Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-8 h-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-8 h-8"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-destructive hover:text-destructive"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(total + total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">
                    🔒 Secure checkout • 🚚 Free shipping on orders over $100
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ↩️ Easy returns within 30 days
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}