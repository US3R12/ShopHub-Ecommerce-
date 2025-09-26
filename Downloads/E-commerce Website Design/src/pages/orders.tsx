import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Package, Calendar, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.99,
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
        price: 299.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 149.98,
    items: [
      {
        id: 2,
        name: 'Smart Fitness Tracker',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200',
        price: 74.99,
        quantity: 2
      }
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-01-25',
    status: 'processing',
    total: 89.99,
    items: [
      {
        id: 3,
        name: 'Organic Cotton T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
        price: 29.99,
        quantity: 3
      }
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'shipped':
      return <Truck className="w-4 h-4 text-blue-600" />;
    case 'processing':
      return <Package className="w-4 h-4 text-yellow-600" />;
    default:
      return <Package className="w-4 h-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OrdersPage() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleReorder = (orderId: string) => {
    // In a real app, this would add all items from the order to cart
    router.push('/products');
  };

  const handleViewDetails = (orderId: string) => {
    // In a real app, this would show detailed order information
    console.log('View details for order:', orderId);
  };

  return (
    <>
      <Head>
        <title>Order History - ShopHub</title>
        <meta name="description" content="View your order history and track shipments" />
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
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Order History</h1>
                <p className="text-muted-foreground">
                  Track and manage your orders
                </p>
              </div>

              {mockOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                  <h2 className="text-xl font-bold mb-2">No orders yet</h2>
                  <p className="text-muted-foreground mb-6">
                    When you place your first order, it will appear here.
                  </p>
                  <Button onClick={() => router.push('/products')}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {mockOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                Order {order.id}
                                {getStatusIcon(order.status)}
                              </CardTitle>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(order.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <CreditCard className="w-4 h-4" />
                                  ${order.total.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <ImageWithFallback
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium truncate">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity} × ${item.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                            
                            <div className="flex gap-2 pt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(order.id)}
                              >
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReorder(order.id)}
                              >
                                Reorder
                              </Button>
                              {order.status === 'shipped' && (
                                <Button variant="outline" size="sm">
                                  Track Package
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}