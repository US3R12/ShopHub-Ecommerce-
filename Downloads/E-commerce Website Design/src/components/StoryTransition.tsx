import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function StoryTransition() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="relative py-16 flex flex-col items-center justify-center text-center"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium text-muted-foreground">
          Discover Our Story
        </h3>
        <ChevronDown className="w-6 h-6 mx-auto text-primary" />
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-8"
      />
    </motion.div>
  );
}