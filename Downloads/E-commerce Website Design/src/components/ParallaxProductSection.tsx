import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ParallaxProductSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  features?: string[];
  reversed?: boolean;
  onExplore?: () => void;
}

export function ParallaxProductSection({
  title,
  subtitle,
  description,
  image,
  badge,
  features,
  reversed = false,
  onExplore
}: ParallaxProductSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1, 1]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-secondary/5 to-primary/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* Content */}
          <motion.div
            style={{ y, scale }}
            className={`space-y-6 ${reversed ? 'lg:col-start-2' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {badge && (
                <Badge variant="secondary" className="w-fit backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {badge}
                </Badge>
              )}
              
              <div className="space-y-2">
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  {title}
                </h2>
                <p className="text-lg text-primary/80">
                  {subtitle}
                </p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                {description}
              </p>
            </motion.div>

            {/* Features */}
            {features && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-3"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4"
            >
              <Button onClick={onExplore} className="group">
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Image with Parallax Effects */}
          <motion.div
            style={{ y: imageY, rotate }}
            className={`relative ${reversed ? 'lg:col-start-1' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-background/90 to-muted/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-primary/10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-80 object-cover"
                  />
                  
                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating Rating */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1"
                  >
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">4.9</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 5, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"
              />
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, -8, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-full blur-2xl"
              />

              {/* Product Stats */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-4 left-8 bg-background/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10"
              >
                <div className="text-xs text-muted-foreground">Starting from</div>
                <div className="font-bold text-primary">$49.99</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}