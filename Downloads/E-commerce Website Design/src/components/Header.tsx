import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { motion } from 'motion/react';

interface HeaderProps {
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
}

export function Header({ onCartClick, onCategoryClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const categories = ['Electronics', 'Clothing', 'Accessories', 'Bags'];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              className="font-bold text-xl cursor-pointer"
            >
              ShopHub
            </motion.h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                onClick={() => onCategoryClick(category)}
                className="relative overflow-hidden group"
              >
                {category}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100"
                  transition={{ duration: 0.2 }}
                />
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge variant="destructive" className="w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                </motion.div>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-muted/50 border-0"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  onClick={() => {
                    onCategoryClick(category);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  {category}
                </Button>
              ))}
              <Button variant="ghost" className="justify-start">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="ghost" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}