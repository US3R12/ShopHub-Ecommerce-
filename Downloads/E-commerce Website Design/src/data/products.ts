import { Product, Review } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1471174569907-e911cbbd6d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc1ODI4MDAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    brand: 'SoundTech',
    rating: 4.8,
    reviewCount: 124,
    description: 'Experience premium sound quality with active noise cancellation and 30-hour battery life.',
    features: ['Active Noise Cancellation', '30-hour battery', 'Bluetooth 5.0', 'Quick charge'],
    images: [
      'https://images.unsplash.com/photo-1471174569907-e911cbbd6d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc1ODI4MDAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1471174569907-e911cbbd6d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc1ODI4MDAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    inStock: true,
    colors: ['Black', 'White', 'Gray']
  },
  {
    id: '2',
    name: 'Designer Watch Collection',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1751437730397-ef83024b5339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHdhdGNofGVufDF8fHx8MTc1ODI4MDAzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Accessories',
    brand: 'TimeCore',
    rating: 4.6,
    reviewCount: 89,
    description: 'Elegant timepiece with Swiss movement and premium leather strap.',
    features: ['Swiss Movement', 'Sapphire Crystal', 'Water Resistant', 'Premium Leather'],
    images: [
      'https://images.unsplash.com/photo-1751437730397-ef83024b5339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHdhdGNofGVufDF8fHx8MTc1ODI4MDAzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    inStock: true,
    colors: ['Brown', 'Black']
  },
  {
    id: '3',
    name: 'Modern Backpack',
    price: 89.99,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1756037020548-add7922c8e11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYWNrcGFja3xlbnwxfHx8fDE3NTgyODAwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Bags',
    brand: 'UrbanStyle',
    rating: 4.4,
    reviewCount: 56,
    description: 'Stylish and functional backpack perfect for daily commute and travel.',
    features: ['Laptop compartment', 'Water resistant', 'Ergonomic design', 'Multiple pockets'],
    images: [
      'https://images.unsplash.com/photo-1756037020548-add7922c8e11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYWNrcGFja3xlbnwxfHx8fDE3NTgyODAwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    inStock: true,
    colors: ['Black', 'Navy', 'Gray']
  },
  {
    id: '4',
    name: 'Fashion Collection T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1632773003373-6645a802c154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU4MjQ4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Clothing',
    brand: 'StyleForward',
    rating: 4.2,
    reviewCount: 203,
    description: 'Comfortable and stylish t-shirt made from premium organic cotton.',
    features: ['Organic cotton', 'Breathable fabric', 'Regular fit', 'Machine washable'],
    images: [
      'https://images.unsplash.com/photo-1632773003373-6645a802c154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU4MjQ4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray']
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing sound quality! The noise cancellation works perfectly during flights.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    productId: '1',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great headphones, battery life is excellent. Slightly heavy for long sessions.',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '3',
    productId: '2',
    userName: 'Emma Davis',
    rating: 5,
    comment: 'Beautiful watch, feels very premium. The leather strap is very comfortable.',
    date: '2024-01-08',
    verified: true
  }
];