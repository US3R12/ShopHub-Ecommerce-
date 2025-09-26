export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export type SortOption = 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  rating: number;
  inStock: boolean;
}