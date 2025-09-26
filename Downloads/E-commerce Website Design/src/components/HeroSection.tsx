import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                New Collection 2024
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Your
                <span className="block text-primary">Perfect Style</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Explore our curated collection of premium products designed for the modern lifestyle. Quality, style, and innovation in every piece.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  View Collection
                </Button>
              </motion.div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">4.8/5 from 2,000+ reviews</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718043032802-4254f7fcbb5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJvJTIwYmFubmVyJTIwc2hvcHBpbmd8ZW58MXx8fHwxNzU4MjgwMDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Hero Banner"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-6 right-6 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-muted-foreground">On orders over $100</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <div className="text-sm font-medium">30-Day Returns</div>
                <div className="text-xs text-muted-foreground">Hassle-free returns</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />
    </section>
  );
}