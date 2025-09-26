import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ArrowRight, Star, Award, Users, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useParallax } from '../hooks/useParallax';

interface StorySection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats?: { label: string; value: string; icon?: React.ReactNode }[];
  features?: string[];
  reversed?: boolean;
}

const storySections: StorySection[] = [
  {
    id: 'discover',
    title: 'Discover Your Unique Style',
    subtitle: 'Every Great Story Begins with Discovery',
    description: 'In a world full of choices, finding products that truly resonate with your personality can feel overwhelming. Our carefully curated collection is designed to help you discover pieces that not only meet your needs but also express who you are.',
    image: 'https://images.unsplash.com/photo-1576074435756-13d861835047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwZGV0YWlsc3xlbnwxfHx8fDE3NTgzMDI5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stats: [
      { label: 'Curated Products', value: '2,000+', icon: <Award className="w-5 h-5" /> },
      { label: 'Customer Rating', value: '4.8/5', icon: <Star className="w-5 h-5" /> },
      { label: 'Categories', value: '12+', icon: <ShieldCheck className="w-5 h-5" /> }
    ],
    reversed: false
  },
  {
    id: 'craftsmanship',
    title: 'Where Craftsmanship Meets Innovation',
    subtitle: 'Quality That Stands the Test of Time',
    description: 'Behind every product in our collection lies a story of dedication, skill, and attention to detail. We partner with artisans and innovative brands who share our commitment to excellence, ensuring that every item you receive meets the highest standards.',
    image: 'https://images.unsplash.com/photo-1722411927625-0e478acf502b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3JhZnRzbWFuc2hpcCUyMHdvcmtzaG9wfGVufDF8fHx8MTc1ODMwMjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Hand-selected by our expert team',
      'Rigorous quality testing process',
      'Sustainable and ethical sourcing',
      'Direct partnerships with creators'
    ],
    reversed: true
  },
  {
    id: 'community',
    title: 'Join a Community of Passionate Explorers',
    subtitle: 'Your Journey is Shared with Thousands',
    description: 'When you choose ShopHub, you become part of a vibrant community of individuals who value quality, style, and authentic experiences. Share your discoveries, get inspired by others, and be part of something bigger.',
    image: 'https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwY29tbXVuaXR5fGVufDF8fHx8MTc1ODMwMjkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stats: [
      { label: 'Happy Customers', value: '50,000+', icon: <Users className="w-5 h-5" /> },
      { label: 'Reviews Posted', value: '25,000+', icon: <Star className="w-5 h-5" /> },
      { label: 'Countries Served', value: '25+', icon: <ShieldCheck className="w-5 h-5" /> }
    ],
    reversed: false
  },
  {
    id: 'journey',
    title: 'Your Perfect Shopping Journey Starts Here',
    subtitle: 'Ready to Begin Your Adventure?',
    description: 'Every step of your journey with us is designed to be seamless, enjoyable, and rewarding. From discovery to delivery, we\'re here to ensure your experience exceeds expectations. Your story of great finds and memorable moments begins now.',
    image: 'https://images.unsplash.com/photo-1515959087068-7e79b59ece35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3VybmV5JTIwcGF0aCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTgzMDI5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: [
      'Personalized recommendations',
      'Fast and free shipping',
      'Hassle-free returns',
      '24/7 customer support'
    ],
    reversed: true
  }
];

interface ParallaxSectionProps {
  section: StorySection;
  index: number;
}

function ParallaxSection({ section, index }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-background/95 z-10" />
        <ImageWithFallback
          src={section.image}
          alt={section.title}
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${section.reversed ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Text Content */}
          <motion.div
            style={{ y, scale }}
            className={`space-y-8 ${section.reversed ? 'lg:col-start-2' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="space-y-4"
            >
              <Badge variant="secondary" className="w-fit">
                Chapter {index + 1}
              </Badge>
              
              <div className="space-y-2">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {section.title}
                </h2>
                <p className="text-xl text-primary/80">
                  {section.subtitle}
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {section.description}
              </p>
            </motion.div>

            {/* Stats */}
            {section.stats && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                className="grid grid-cols-3 gap-6"
              >
                {section.stats.map((stat, statIndex) => (
                  <Card key={statIndex} className="bg-background/80 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2 text-primary">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Features */}
            {section.features && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className="space-y-3"
              >
                {section.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 + featureIndex * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTA for last section */}
            {index === storySections.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button size="lg" className="group">
                  Start Shopping
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Explore Categories
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Interactive Element */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
            className={`relative ${section.reversed ? 'lg:col-start-1' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="relative"
            >
              {/* Floating elements */}
              <div className="relative bg-background/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-primary/10">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    {section.stats?.[0]?.icon || <Award className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="text-xl font-bold">
                    {section.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description.slice(0, 120)}...
                  </p>
                  <Button variant="ghost" size="sm" className="group">
                    Learn More
                    <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"
              />
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-full blur-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export function ParallaxStory() {
  return (
    <div className="relative">
      {storySections.map((section, index) => (
        <ParallaxSection
          key={section.id}
          section={section}
          index={index}
        />
      ))}
    </div>
  );
}