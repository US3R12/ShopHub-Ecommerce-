import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onProductClick, index }: ProductCardProps) {
  const { addItem } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Create different parallax speeds for variety
  const yOffset = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  // Stagger the animation based on index
  const delay = (index % 3) * 0.1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist!`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        y: yOffset,
        scale,
        rotate: index % 2 === 0 ? rotate : useTransform(rotate, (value) => -value)
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: useTransform(yOffset, (value) => value - 8),
        scale: useTransform(scale, (value) => value * 1.02),
        transition: { duration: 0.2 }
      }}
    >
      <Card 
        className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-background/80 backdrop-blur-sm"
        onClick={() => onProductClick(product)}
      >
        <div className="relative overflow-hidden">
          <motion.div
            style={{ y: imageY }}
            className="w-full h-64 overflow-hidden"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }}
            className="absolute top-3 left-3 flex flex-col gap-2"
          >
            {discount > 0 && (
              <Badge variant="destructive" className="backdrop-blur-sm bg-destructive/90">
                -{discount}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="backdrop-blur-sm bg-secondary/90">
                Out of Stock
              </Badge>
            )}
          </motion.div>

          {/* Wishlist Button with Parallax */}
          <motion.div
            animate={{ 
              rotate: [0, -3, 3, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3
            }}
            className="absolute top-3 right-3"
          >
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/90"
              onClick={handleWishlist}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Quick Add to Cart with Enhanced Animation */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            whileHover={{ y: 0, opacity: 1, scale: 1 }}
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Button 
              className="w-full backdrop-blur-sm bg-primary/90 hover:bg-primary transition-all duration-200"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.div>
              Add to Cart
            </Button>
          </motion.div>

          {/* Decorative Floating Elements */}
          <motion.div
            animate={{ 
              x: [0, 10, 0],
              y: [0, -5, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4
            }}
            className="absolute top-1/2 right-4 w-2 h-2 bg-primary/30 rounded-full blur-sm"
          />
          
          <motion.div
            animate={{ 
              x: [0, -8, 0],
              y: [0, 8, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.6
            }}
            className="absolute bottom-1/3 left-4 w-3 h-3 bg-secondary/40 rounded-full blur-sm"
          />
        </div>

        <CardContent className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
                {product.brand}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>
            
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </motion.div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center space-x-2">
              <span className="font-bold">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
              {product.category}
            </Badge>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}