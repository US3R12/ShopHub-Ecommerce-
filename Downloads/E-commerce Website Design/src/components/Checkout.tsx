import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CheckoutProps {
  onBack: () => void;
}

export function Checkout({ onBack }: CheckoutProps) {
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order processing
    toast.success('Order placed successfully!');
    clearCart();
    onBack();
  };

  const tax = total * 0.08;
  const shippingCost = shippingMethod === 'express' ? 15 : 0;
  const finalTotal = total + tax + shippingCost;

  const steps = [
    { id: 1, title: 'Shipping', completed: currentStep > 1 },
    { id: 2, title: 'Payment', completed: currentStep > 2 },
    { id: 3, title: 'Review', completed: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.completed ? '✓' : step.id}
            </div>
            <span className={`ml-2 text-sm ${step.id === currentStep ? 'font-medium' : 'text-muted-foreground'}`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="w-12 h-px bg-border mx-4" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    {/* Shipping Method */}
                    <div className="space-y-3">
                      <Label>Shipping Method</Label>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center space-x-2 p-3 border rounded-md">
                          <RadioGroupItem value="standard" id="standard" />
                          <div className="flex-1">
                            <Label htmlFor="standard">Standard Shipping (5-7 business days)</Label>
                            <p className="text-sm text-muted-foreground">Free</p>
                          </div>
                          <Truck className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md">
                          <RadioGroupItem value="express" id="express" />
                          <div className="flex-1">
                            <Label htmlFor="express">Express Shipping (2-3 business days)</Label>
                            <p className="text-sm text-muted-foreground">$15.00</p>
                          </div>
                          <Truck className="w-5 h-5 text-primary" />
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="button" onClick={() => setCurrentStep(2)} className="w-full">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 p-3 border rounded-md">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <div className="flex-1">
                            <Label htmlFor="credit-card">Credit Card</Label>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                          </div>
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === 'credit-card' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button type="button" onClick={() => setCurrentStep(3)} className="flex-1">
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex space-x-4 p-4 border rounded-md">
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <ImageWithFallback
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} • ${item.product.price} each
                            </p>
                            {(item.selectedColor || item.selectedSize) && (
                              <p className="text-sm text-muted-foreground">
                                {[item.selectedColor, item.selectedSize].filter(Boolean).join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Terms */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>

                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1">
                        <Shield className="w-4 h-4 mr-2" />
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="line-clamp-1">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="pt-4 space-y-2 text-center">
                <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Secure SSL encryption</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                  <Truck className="w-3 h-3" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}