import { Product } from '../types';

// Mock API functions - replace with real API calls

export async function fetchProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be a fetch request
  // return fetch('/api/products').then(res => res.json());
  
  // For now, return empty array as products are imported from data file
  return [];
}

export async function fetchProduct(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be a fetch request
  // return fetch(`/api/products/${id}`).then(res => res.json());
  
  return null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real app, this would be a fetch request
  // return fetch(`/api/products/search?q=${query}`).then(res => res.json());
  
  return [];
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be a fetch request
  // return fetch(`/api/products?category=${category}`).then(res => res.json());
  
  return [];
}

// Order related API functions
export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: {
    type: 'card' | 'paypal' | 'apple_pay';
    last4?: string;
  };
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In a real app, this would be a POST request
  // return fetch('/api/orders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(orderData)
  // }).then(res => res.json());
  
  // Mock response
  return {
    ...orderData,
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchOrders(userId: string): Promise<Order[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be a fetch request
  // return fetch(`/api/orders?userId=${userId}`).then(res => res.json());
  
  return [];
}

export async function fetchOrder(orderId: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real app, this would be a fetch request
  // return fetch(`/api/orders/${orderId}`).then(res => res.json());
  
  return null;
}

// User authentication API functions
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export async function signIn(email: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be a POST request
  // return fetch('/api/auth/signin', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // }).then(res => res.json());
  
  return null;
}

export async function signUp(email: string, password: string, name: string): Promise<User | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In a real app, this would be a POST request
  // return fetch('/api/auth/signup', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password, name })
  // }).then(res => res.json());
  
  return null;
}

export async function signOut(): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would be a POST request
  // return fetch('/api/auth/signout', { method: 'POST' });
}

// Cart sync API (for logged-in users)
export async function syncCart(userId: string, cartItems: any[]): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real app, this would sync cart with backend
  // return fetch(`/api/users/${userId}/cart`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ items: cartItems })
  // });
}

export async function fetchCart(userId: string): Promise<any[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // In a real app, this would fetch cart from backend
  // return fetch(`/api/users/${userId}/cart`).then(res => res.json());
  
  return [];
}