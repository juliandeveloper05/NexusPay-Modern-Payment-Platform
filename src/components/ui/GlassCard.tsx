'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hover = true, glow = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        className={`
          relative overflow-hidden rounded-2xl
          bg-white/70 dark:bg-dark-700/70
          backdrop-blur-xl
          border border-nexus-500/20 dark:border-nexus-500/30
          shadow-glass
          transition-all duration-300
          ${hover ? 'hover:border-nexus-500/40 hover:shadow-glow cursor-pointer' : ''}
          ${glow ? 'shadow-glow animate-pulse-glow' : ''}
          ${className}
        `}
        {...props}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-nexus-500/5 to-magenta-500/5 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
