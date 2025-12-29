'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-nexus-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-magenta-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-nexus-400/10 blur-3xl"
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-16 md:pt-20 relative z-10">
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--card-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(147, 51, 234, 0.2)',
            color: 'var(--foreground)',
          },
        }}
      />
    </div>
  );
}
