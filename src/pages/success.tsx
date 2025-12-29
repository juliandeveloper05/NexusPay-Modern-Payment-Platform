'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Home, Sparkles } from 'lucide-react';
import { Button, GlassCard } from '@/components/ui';

// Confetti animation
function Confetti() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    color: string;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const colors = ['#9333ea', '#d946ef', '#f0abfc', '#a855f7', '#e879f9'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: -20, x: `${particle.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '100vh', opacity: 0, rotate: 360 }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: particle.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}

export default function Success() {
  const router = useRouter();
  const { payment_id, external_reference } = router.query;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 relative">
      <Confetti />
      
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard glow className="p-8 md:p-12 text-center relative overflow-hidden">
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              ¡Pago Exitoso! <Sparkles className="inline w-6 h-6 text-yellow-500" />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400 mb-6"
            >
              Tu pago ha sido procesado correctamente. Recibirás un email con los detalles de tu compra.
            </motion.p>

            {/* Payment details */}
            {payment_id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/50 dark:bg-dark-600/50 rounded-xl p-4 mb-6 text-left"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  ID de Pago
                </p>
                <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                  {payment_id}
                </p>
                {external_reference && (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 mb-1">
                      Referencia
                    </p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">
                      {external_reference}
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/dashboard">
                <Button
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Ver Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" icon={<Home className="w-4 h-4" />}>
                  Volver al Inicio
                </Button>
              </Link>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
